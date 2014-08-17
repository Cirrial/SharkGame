SharkGame.Save = {

    saveFileName: "sharkGameSave",

    saveGame: function(suppressSavingToStorage, dontFlat) {
        // populate save data object
        var saveData = {};
        saveData.version = SharkGame.VERSION;
        saveData.resources = {};
        saveData.tabs = {};
        saveData.settings = {};
        saveData.upgrades = {};
        saveData.gateCostsMet = {};

        $.each(SharkGame.ResourceTable, function(k, v) {
            saveData.resources[k] = {
                amount: v.amount,
                totalAmount: v.totalAmount
            };
        });

        $.each(SharkGame.Upgrades, function(k, v) {
            saveData.upgrades[k] = v.purchased;
        });

        $.each(SharkGame.Tabs, function(k, v) {
            saveData.tabs[k] = {
                discovered: v.discovered
            }
        });
        saveData.tabs.current = SharkGame.Tabs.current;

        $.each(SharkGame.Gate.costsMet, function(k, v) {
            saveData.gateCostsMet[k] = v;
        });

        $.each(SharkGame.Settings, function(k, v) {
            if(k !== "current") {
                saveData.settings[k] = SharkGame.Settings.current[k];
            }
        });

        // add timestamp
        //saveData.timestamp = (new Date()).getTime();
        saveData.timestampLastSave = (new Date()).getTime();
        saveData.timestampGameStart = SharkGame.timestampGameStart;
        saveData.timestampRunStart = SharkGame.timestampRunStart;

        if(dontFlat) {
            saveData.saveVersion = SharkGame.Save.saveUpdaters.length - 1;
        } else {
            //make a current-version template
            var saveVersion = SharkGame.Save.saveUpdaters.length - 1;
            var template = {};
            for(var i = 0; i <= saveVersion; i++) {
                var updater = SharkGame.Save.saveUpdaters[i];
                template = updater(template);
            }
            //flatten
            var flatData = SharkGame.Save.flattenData(template, saveData);
            flatData.unshift(saveVersion);
            var saveString = pako.deflate(JSON.stringify(flatData), {to: 'string'});
        }

        if(!suppressSavingToStorage) {
            try {
                localStorage.setItem(SharkGame.Save.saveFileName, saveString);
            } catch(err) {
                throw new Error("Couldn't save to local storage. Reason: " + err.message);
            }
        }
        return saveString;
    },

    loadGame: function(importSaveData) {
        var saveData;
        var saveDataString = importSaveData || localStorage.getItem(SharkGame.Save.saveFileName);

        if(!saveDataString) {
            throw new Error("Tried to load game, but no game to load.");
        }

        // if first letter of string is x, data is compressed and needs uncompressing.
        if(saveDataString.charAt(0) === 'x') {
            // decompress string
            try {
                saveDataString = pako.inflate(saveDataString, {to: 'string'});
            } catch(err) {
                throw new Error("Saved data is compressed, but it can't be decompressed. Can't load.");
            }
        }

        // if first letter of string is { or [, data is json
        if(saveDataString.charAt(0) === '{' || saveDataString.charAt(0) === '[') {
            try {
                saveData = JSON.parse(saveDataString);
            } catch(err) {
                var errMessage = "Couldn't load save data. It didn't parse correctly.";
                if(importSaveData) {
                    errMessage += " Did you paste the entire string?";
                }
                throw new Error(errMessage);
            }
        }

        // if first letter of string was [, data was packed, unpack it
        if(saveDataString.charAt(0) === '[') {
            try {
                //check version
                var currentVersion = SharkGame.Save.saveUpdaters.length - 1;
                var saveVersion = saveData.shift()
                if(typeof saveVersion !== "number" || saveVersion % 1 !== 0 || saveVersion < 0 || saveVersion > currentVersion) {
                    throw new Error("Invalid save version!");
                }
                //create matching template
                var template = {};
                for(var i = 0; i <= saveVersion; i++) {
                    var updater = SharkGame.Save.saveUpdaters[i];
                    template = updater(template);
                }
                //unpack
                saveData = SharkGame.Save.expandData(template, saveData);
                saveData.saveVersion = saveVersion;
            } catch(err) {
                throw new Error("Couldn't unpack packed save data. Reason: " + err.message);
            }
        }

        if(saveData) {
            // go through it

            //check for updates
            var currentVersion = SharkGame.Save.saveUpdaters.length - 1;
            saveData.saveVersion = saveData.saveVersion || 0;
            if(saveData.saveVersion < currentVersion) {
                for(i = saveData.saveVersion + 1; i <= currentVersion; i++) {
                    var updater = SharkGame.Save.saveUpdaters[i];
                    saveData = updater(saveData);
                    saveData.saveVersion = i;
                }
                // let player know update went fine
                SharkGame.Log.addMessage("Updated save data from v " + saveData.version + " to " + SharkGame.VERSION + ".");
            }

            if(saveData.resources) {
                $.each(saveData.resources, function(k, v) {
                    // check that this isn't an old resource that's been removed from the game for whatever reason
                    if(SharkGame.ResourceTable[k]) {
                        SharkGame.ResourceTable[k].amount = isNaN(v.amount) ? 0 : v.amount;
                        SharkGame.ResourceTable[k].totalAmount = isNaN(v.totalAmount) ? 0 : v.amount;
                    }
                });
            }

            // hacky kludge: force table creation
            SharkGame.Resources.reconstructResourcesTable();

            if(saveData.upgrades) {
                $.each(saveData.upgrades, function(k, v) {
                    if(saveData.upgrades[k]) {
                        SharkGame.Lab.addUpgrade(k);
                    }
                });
            }

            if(saveData.tabs) {
                $.each(saveData.tabs, function(k, v) {
                    if(SharkGame.Tabs[k]) {
                        SharkGame.Tabs[k].discovered = v.discovered;
                    }
                });
                if(saveData.tabs.current) {
                    SharkGame.Tabs.current = saveData.tabs.current;
                }
            }

            if(saveData.gateCostsMet) {
                $.each(saveData.gateCostsMet, function(k, v) {
                    // only pay attention to valid costs
                    if(SharkGame.Gate.costs[k]) {
                        SharkGame.Gate.costsMet[k] = v;
                    }
                });
            }

            if(saveData.settings) {
                $.each(saveData.settings, function(k, v) {
                    if(SharkGame.Settings.current[k] !== undefined) {
                        SharkGame.Settings.current[k] = v;
                        // update anything tied to this setting right off the bat
                        (SharkGame.Settings[k].onChange || $.noop)();
                    }
                });
            }

            var currTimestamp = (new Date()).getTime();
            // create surrogate timestamps if necessary
            if((typeof saveData.timestampLastSave !== "number")) {
                saveData.timestampLastSave = currTimestamp;
            }
            if((typeof saveData.timestampGameStart !== "number")) {
                saveData.timestampGameStart = currTimestamp;
            }
            if((typeof saveData.timestampRunStart !== "number")) {
                saveData.timestampRunStart = currTimestamp;
            }

            // if offline mode is enabled
            if(SharkGame.Settings.current.offlineModeActive) {
                // get times elapsed since last save game
                var now = (new Date()).getTime();
                var secondsElapsed = (now - saveData.timestampLastSave) / 1000;
                if(secondsElapsed < 0) {
                    // something went hideously wrong or someone abused a system clock somewhere
                    secondsElapsed = 0;
                }

                // process this
                SharkGame.Resources.recalculateIncomeTable();
                SharkGame.Main.processSimTime(secondsElapsed);

                // acknowledge long time gaps
                if(secondsElapsed > 3600) {
                    var notification = "Welcome back! It's been ";
                    var numHours = Math.floor(secondsElapsed / 3600);
                    if(numHours > 24) {
                        var numDays = Math.floor(numHours / 24);
                        if(numDays > 7) {
                            var numWeeks = Math.floor(numDays / 7);
                            if(numWeeks > 4) {
                                var numMonths = Math.floor(numWeeks / 4);
                                if(numMonths > 12) {
                                    var numYears = Math.floor(numMonths / 12);
                                    notification += "almost " + ( numYears === 1 ? "a" : numYears ) + " year" + SharkGame.plural(numYears) + ", thanks for remembering this exists!"
                                } else {
                                    notification += "like " + (numMonths === 1 ? "a" : numMonths ) + " month" + SharkGame.plural(numMonths) + ", it's getting kinda crowded.";
                                }
                            } else {
                                notification += "about " + (numWeeks === 1 ? "a" : numWeeks) + " week" + SharkGame.plural(numWeeks) + ", you were gone a while!";
                            }
                        } else {
                            notification += (numDays === 1 ? "a" : numDays ) + " day" + SharkGame.plural(numDays) + ", and look at all the stuff you have now!";
                        }
                    } else {
                        notification += (numHours === 1 ? "an" : numHours ) + " hour" + SharkGame.plural(numHours) + " since you were seen around here!";
                    }
                    SharkGame.Log.addMessage(notification);
                }
            }
        } else {
            throw new Error("Couldn't load saved game. I don't know how to break this to you, but I think your save is corrupted.");
        }
    },

    importData: function(data) {
        // decode from ascii85
        var saveData;
        try {
            saveData = ascii85.decode(data);
        } catch(err) {
            SharkGame.Log.addError("That's not encoded properly. Are you sure that's a real save export string?");
        }
        // load the game from this save data string
        try {
            SharkGame.Save.loadGame(saveData);
        } catch(err) {
            SharkGame.Log.addError(err.message);
        }
        // refresh current tab
        SharkGame.Main.setUpTab();
    },

    exportData: function() {
        // get save
        var saveData = localStorage.getItem(SharkGame.Save.saveFileName);
        if(saveData === null) {
            saveData = SharkGame.Save.saveGame(true);
        }
        // encode save
        return ascii85.encode(saveData);
    },

    savedGameExists: function() {
        return (localStorage.getItem(SharkGame.Save.saveFileName) !== null);
    },

    deleteSave: function() {
        localStorage.removeItem(SharkGame.Save.saveFileName);
    },

    // Thanks to Dylan for managing to crush saves down to a much smaller size!
    createBlueprint: function(template) {
        function createPart(t) {
            var bp = [];
            $.each(t, function(k, v) {
                if(typeof v === "object" && v !== null) {
                    bp.push([k, createPart(v)]);
                } else {
                    bp.push(k);
                }
            });
            bp.sort(function(a, b) {
                a = typeof a === "object" ? a[0] : a;
                b = typeof b === "object" ? b[0] : b;
                return a > b;
            });
            return bp;
        }

        return createPart(template);
    },

    flattenData: function(template, source) {
        var out = [];

        function flattenPart(bp, src) {
            $.each(bp, function(_, slot) {
                if(typeof slot === "object") {
                    flattenPart(slot[1], src[slot[0]]);
                } else {
                    var elem = src[slot];
                    if(typeof elem === "number" && slot !== "timestampLastSave" && slot !== "timestampGameStart" && slot !== "timestampRunStart") {
                        elem = Number(elem.toPrecision(5));
                    }
                    out.push(elem);
                }
            });
        }

        flattenPart(SharkGame.Save.createBlueprint(template), source);
        return out;
    },

    expandData: function(template, data) {
        function expandPart(bp) {
            var out = {}; //todo: array support
            $.each(bp, function(_, slot) {
                if(typeof slot === "object") {
                    out[slot[0]] = expandPart(slot[1]);
                } else {
                    out[slot] = data.shift();
                }
            });
            return out;
        }

        return expandPart(SharkGame.Save.createBlueprint(template));
    },

    saveUpdaters: [ //used to update saves and to make templates
        function(save) {
            //no one is converting a real save to version 0, so it doesn't need real values
            save.version = null;
            save.timestamp = null;
            save.resources = {};
            $.each(["essence", "shark", "ray", "crab", "scientist", "nurse", "laser", "maker", "planter", "brood", "crystalMiner", "autoTransmuter", "fishMachine", "science", "fish", "sand", "crystal", "kelp", "seaApple", "sharkonium"], function(i, v) {
                save.resources[v] = {amount: null, totalAmount: null};
            });
            save.upgrades = {};
            $.each(["crystalBite", "crystalSpade", "crystalContainer", "underwaterChemistry", "seabedGeology", "thermalVents", "laserRays", "automation", "engineering", "kelpHorticulture", "xenobiology", "biology", "rayBiology", "crabBiology", "sunObservation", "transmutation", "exploration", "farExploration", "gateDiscovery"], function(i, v) {
                save.upgrades[v] = null;
            });
            save.tabs = {"current": null, "home": {"discovered": null}, "lab": {"discovered": null}, "gate": {"discovered": null}};
            save.settings = {"buyAmount": null, "offlineModeActive": null, "autosaveFrequency": null, "logMessageMax": null, "sidebarWidth": null, "showAnimations": null, "colorCosts": null};
            save.gateCostsMet = {"fish": null, "sand": null, "crystal": null, "kelp": null, "seaApple": null, "sharkonium": null};
            return save;
        },

        // future updaters for save versions beyond the base:
        // they get passed the result of the previous updater and it continues in a chain
        // and they start based on the version they were save

        function(save) {
            save = $.extend(true, save, {
                "resources": {"sandDigger": {"amount": 0, "totalAmount": 0}},
                "settings": {"showTabHelp": false, "groupResources": false},
                "timestampLastSave": null,
                "timestampGameStart": null,
                "timestampRunStart": null
            });
            delete save.timestamp;
            return save;
        }
    ]
};