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

        $.each(SharkGame.ResourceTable, function(i, v) {
            saveData.resources[i] = {
                amount: v.amount,
                totalAmount: v.totalAmount
            };
        });

        $.each(SharkGame.Upgrades, function(i, v) {
            saveData.upgrades[i] = v.purchased;
        });

        $.each(SharkGame.Tabs, function(i, v) {
            saveData.tabs[i] = {
                discovered: v.discovered
            }
        });
        saveData.tabs.current = SharkGame.Tabs.current;

        $.each(SharkGame.Gate.costsMet, function(i, v) {
            saveData.gateCostsMet[i] = v;
        });

        $.each(SharkGame.Settings, function(i, v) {
            if(i !== "current") {
                saveData.settings[i] = SharkGame.Settings.current[i];
            }
        });

        // add timestamp
        saveData.timestamp = (new Date()).getTime();

        // Thanks to Dylan for this part!
        var templateVersion = 3;
        var bp = SharkGame.Save.createBlueprint(SharkGame.Save.templates[templateVersion], templateVersion);
        var flatData = SharkGame.Save.flattenData(bp, saveData);
        //console.log(flatData);
        var saveString = pako.deflate(JSON.stringify(flatData), {to: 'string'});

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
            SharkGame.Log.addError("Tried to load game, but no game to load.");
            return;
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
                //flat save
                var saveVersion = saveData[0];
                var template = SharkGame.Save.templates[saveVersion];
                if(template === null) throw new Error("Unknown save version.");
                var bp = SharkGame.Save.createBlueprint(template, saveVersion);
                saveData = SharkGame.Save.expandData(bp, saveData);
            } catch(err) {
                throw new Error("Couldn't unpack packed data. Reason: " + err.message);
            }
        }

        if(saveData) {
            // go through it
            if(SharkGame.VERSION > saveData.version) {
                // migration stuff goes here
                if(saveData.version < 0.21) {
                    // added timestamp
                    // just add current timestamp to save data
                    saveData.timestamp = new Date();
                }
                if(saveData.version < 0.23) {
                    // erase old bad settings stuff
                    saveData.settings = null;

                    // DISREGARD: NONE OF THE INCOME MULTIPLIER STUFF IS SAVED NOW
                    /*// convert incomes
                     if ( typeof saveData.incomes !== "undefined" ) {
                     $.each(saveData.incomes, function (k, v) {
                     saveData.resources[k].incomeMultiplier = v.multiplier;
                     });
                     }*/
                }
                if(saveData.version < 0.3) {
                    // clear old tab visited settings IF THEY ARE SET
                    $.each(SharkGame.Tabs, function(k, v) {
                        if(k === "home") {
                            return;
                        }
                        if(saveData.tabs[k]) {
                            saveData.tabs[k].discovered = false;
                        }
                    });
                    saveData.tabs.current = "home";
                }
                if(saveData.version < 0.5) {
                    // whole bunch of stuff added

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
                    SharkGame.Tabs[k].discovered = v.discovered;
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
                    SharkGame.Settings.current[k] = v;
                    // update anything tied to this setting right off the bat
                    (SharkGame.Settings[k].onChange || $.noop)();
                });
            }
            if((typeof saveData.timestamp !== "number")) {
                // create a surrogate timestamp
                saveData.timestamp = (new Date()).getTime();
            }

            // if offline mode is enabled
            if(SharkGame.Settings.current.offlineModeActive) {
                // get times elapsed since last save game
                var now = (new Date()).getTime();
                var secondsElapsed = (now - saveData.timestamp) / 1000;
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
    createBlueprint: function(template, saveVersion) {
        function createPart(t) {
            var bp = [];
            $.each(t, function(k, v) {
                if(typeof v === "object") {
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

        return {saveVersion: saveVersion, bp: createPart(template)};
    },

    flattenData: function(blueprint, source) {
        var out = [];

        function flattenPart(bp, src) {
            $.each(bp, function(_, slot) {
                if(typeof slot === "object") {
                    flattenPart(slot[1], src[slot[0]]);
                } else {
                    var elem = src[slot];
                    if(typeof elem === "number" && slot !== "timestamp") {
                        elem = Number(elem.toPrecision(5));
                    }
                    out.push(elem);
                }
            });
        }

        out.push(blueprint.saveVersion);
        flattenPart(blueprint.bp, source);
        return out;
    },

    expandData: function(blueprint, data) {
        if(blueprint.saveVersion !== data.shift()) {
            throw new Error("Wrong save version.");
        }
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

        return expandPart(blueprint.bp);
    },

    templates: {
        "3": {"version": 0, "resources": {"essence": {"amount": 0, "totalAmount": 0}, "shark": {"amount": 0, "totalAmount": 0}, "ray": {"amount": 0, "totalAmount": 0}, "crab": {"amount": 0, "totalAmount": 0}, "scientist": {"amount": 0, "totalAmount": 0},
            "nurse": {"amount": 0, "totalAmount": 0}, "laser": {"amount": 0, "totalAmount": 0}, "maker": {"amount": 0, "totalAmount": 0}, "planter": {"amount": 0, "totalAmount": 0}, "brood": {"amount": 0, "totalAmount": 0}, "crystalMiner": {"amount": 0,
                "totalAmount": 0}, "autoTransmuter": {"amount": 0, "totalAmount": 0}, "fishMachine": {"amount": 0, "totalAmount": 0}, "science": {"amount": 0, "totalAmount": 0}, "fish": {"amount": 0, "totalAmount": 0}, "sand": {"amount": 0, "totalAmount": 0},
            "crystal": {"amount": 0, "totalAmount": 0}, "kelp": {"amount": 0, "totalAmount": 0}, "seaApple": {"amount": 0, "totalAmount": 0}, "sharkonium": {"amount": 0, "totalAmount": 0}}, "tabs": {"current": "home", "home": {"discovered": false},
            "lab": {"discovered": false}, "gate": {"discovered": false}}, "settings": {"buyAmount": 0, "offlineModeActive": false, "autosaveFrequency": 0, "logMessageMax": 0, "sidebarWidth": "0%", "showAnimations": false, "colorCosts": false},
            "upgrades": {"crystalBite": false, "crystalSpade": false, "crystalContainer": false, "underwaterChemistry": false, "seabedGeology": false, "thermalVents": false, "laserRays": false, "automation": false, "engineering": false,
                "kelpHorticulture": false, "xenobiology": false, "biology": false, "rayBiology": false, "crabBiology": false, "sunObservation": false, "transmutation": false, "exploration": false, "farExploration": false, "gateDiscovery": false},
            "gateCostsMet": {"fish": false, "sand": false, "crystal": false, "kelp": false, "seaApple": false, "sharkonium": false}, "timestamp": 0}
    }
};