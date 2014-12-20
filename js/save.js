SharkGame.Save = {

    saveFileName: "sharkGameSave",

    saveGame: function(suppressSavingToStorage, dontFlat) {
        // populate save data object
        var saveString = "";
        var saveData = {};
        saveData.version = SharkGame.VERSION;
        saveData.resources = {};
        saveData.tabs = {};
        saveData.settings = {};
        saveData.upgrades = {};
        saveData.gateCostsMet = [];
        saveData.world = {type: SharkGame.World.worldType, level: SharkGame.World.planetLevel};
        saveData.artifacts = {};
        saveData.gateway = {betweenRuns: SharkGame.gameOver, wonGame: SharkGame.wonGame};

        $.each(SharkGame.PlayerResources, function(k, v) {
            saveData.resources[k] = {
                amount: v.amount,
                totalAmount: v.totalAmount
            };
        });

        $.each(SharkGame.Upgrades, function(k, v) {
            saveData.upgrades[k] = v.purchased;
        });

        $.each(SharkGame.Tabs, function(k, v) {
            if(k !== "current") {
                saveData.tabs[k] = v.discovered;
            } else {
                saveData.tabs.current = v;
            }
        });

        var gateCostTypes = [];
        $.each(SharkGame.Gate.costsMet, function(name, met) {
            gateCostTypes.push(name);
        });
        gateCostTypes.sort();

        $.each(gateCostTypes, function(i, name) {
            saveData.gateCostsMet[i] = SharkGame.Gate.costsMet[name];
        });

        $.each(SharkGame.Settings, function(k, v) {
            if(k !== "current") {
                saveData.settings[k] = SharkGame.Settings.current[k];
            }
        });

        $.each(SharkGame.Artifacts, function(k, v) {
            saveData.artifacts[k] = v.level;
        });

        // add timestamp
        //saveData.timestamp = (new Date()).getTime();
        saveData.timestampLastSave = (new Date()).getTime();
        saveData.timestampGameStart = SharkGame.timestampGameStart;
        saveData.timestampRunStart = SharkGame.timestampRunStart;
        saveData.timestampRunEnd = SharkGame.timestampRunEnd;

        if(dontFlat) {
            saveData.saveVersion = SharkGame.Save.saveUpdaters.length - 1;
            saveString = JSON.stringify(saveData);
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
            saveString = pako.deflate(JSON.stringify(flatData), {to: 'string'});
        }

        if(!suppressSavingToStorage) {
            try {
                // convert compressed data to ascii85 for friendlier browser support (IE11 doesn't like weird binary data)
                var convertedSaveString = ascii85.encode(saveString);
                localStorage.setItem(SharkGame.Save.saveFileName, convertedSaveString);
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

        // if first letter of string is <, data is encoded in ascii85, decode it.
        if(saveDataString.substring(0, 2) === "<~") {
            try {
                saveDataString = ascii85.decode(saveDataString);
            } catch(err) {
                throw new Error("Saved data looked like it was encoded in ascii85, but it couldn't be decoded. Can't load. Your save: " + saveDataString)
            }
        }

        // if first letter of string is x, data is compressed and needs uncompressing.
        if(saveDataString.charAt(0) === 'x') {
            // decompress string
            try {
                saveDataString = pako.inflate(saveDataString, {to: 'string'});
            } catch(err) {
                throw new Error("Saved data is compressed, but it can't be decompressed. Can't load. Your save: " + saveDataString);
            }
        }

        // if first letter of string is { or [, data is json
        if(saveDataString.charAt(0) === '{' || saveDataString.charAt(0) === '[') {
            try {
                saveData = JSON.parse(saveDataString);
            } catch(err) {
                var errMessage = "Couldn't load save data. It didn't parse correctly. Your save: " + saveDataString;
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
                var saveVersion = saveData.shift();
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
                var saveDataFlat = saveData;
                saveData = SharkGame.Save.expandData(template, saveDataFlat.slice());
                saveData.saveVersion = saveVersion;

                function checkTimes(data) {
                    return (data.timestampLastSave > 1e12 && data.timestampLastSave < 2e12 &&
                    data.timestampGameStart > 1e12 && data.timestampGameStart < 2e12 &&
                    data.timestampRunStart > 1e12 && data.timestampRunStart < 2e12)
                }

                //check if the template was sorted wrong when saving
                if(saveVersion <= 5 && !checkTimes(saveData)) {
                    saveData = SharkGame.Save.expandData(template, saveDataFlat.slice(), true);
                    saveData.saveVersion = saveVersion;
                }

                if(!checkTimes(saveData)) {
                    throw new Error("Order appears to be corrupt.");
                }
            } catch(err) {
                throw new Error("Couldn't unpack packed save data. Reason: " + err.message + ". Your save: " + saveDataString);
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
                    if(SharkGame.PlayerResources[k]) {
                        SharkGame.PlayerResources[k].amount = isNaN(v.amount) ? 0 : v.amount;
                        SharkGame.PlayerResources[k].totalAmount = isNaN(v.totalAmount) ? 0 : v.totalAmount;
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

            // load artifacts (need to have the terraformer and cost reducer loaded before world init)
            if(saveData.artifacts) {
                SharkGame.Gateway.init();
                $.each(saveData.artifacts, function(k, v) {
                    SharkGame.Artifacts[k].level = v;
                });
            }

            // load world type and level and apply world properties
            if(saveData.world) {
                SharkGame.World.init();
                SharkGame.World.worldType = saveData.world.type;
                SharkGame.World.planetLevel = saveData.world.level;
                SharkGame.World.apply();
                SharkGame.Home.init();
            }

            // apply artifacts (world needs to be init first before applying other artifacts, but special ones need to be _loaded_ first)
            if(saveData.artifacts) {
                SharkGame.Gateway.applyArtifacts(true);
            }

            if(saveData.tabs) {
                $.each(saveData.tabs, function(k, v) {
                    if(SharkGame.Tabs[k]) {
                        SharkGame.Tabs[k].discovered = v;
                    }
                });
                if(saveData.tabs.current) {
                    SharkGame.Tabs.current = saveData.tabs.current;
                }
            }

            var gateCostTypes = [];
            $.each(SharkGame.Gate.costsMet, function(name, met) {
                gateCostTypes.push(name);
            });
            gateCostTypes.sort();

            if(gateCostTypes) {
                $.each(gateCostTypes, function(i, name) {
                    SharkGame.Gate.costsMet[name] = saveData.gateCostsMet[i];
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
            if((typeof saveData.timestampRunEnd !== "number")) {
                saveData.timestampRunEnd = currTimestamp;
            }

            SharkGame.timestampLastSave = saveData.timestampLastSave;
            SharkGame.timestampGameStart = saveData.timestampGameStart;
            SharkGame.timestampRunStart = saveData.timestampRunStart;
            SharkGame.timestampRunEnd = saveData.timestampRunEnd;

            // load existence in in-between state,
            // else check for offline mode and process
            var simulateOffline = SharkGame.Settings.current.offlineModeActive;
            if(saveData.gateway) {
                if(saveData.gateway.betweenRuns) {
                    simulateOffline = false;
                    SharkGame.wonGame = saveData.gateway.wonGame;
                    SharkGame.Main.endGame(true);
                }
            }

            // if offline mode is enabled
            if(simulateOffline) {
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
            throw new Error("Couldn't load saved game. I don't know how to break this to you, but I think your save is corrupted. Your save: " + saveDataString);
        }
    },

    importData: function(data) {
        // decode from ascii85
        var saveData;
        try {
            saveData = ascii85.decode(data);
        } catch(err) {
            SharkGame.Log.addError("That's not encoded properly. Are you sure that's the full save export string?");
        }
        // load the game from this save data string
        try {
            SharkGame.Save.loadGame(saveData);
        } catch(err) {
            SharkGame.Log.addError(err.message);
            console.log(err.trace);
        }
        // refresh current tab
        SharkGame.Main.setUpTab();
    },

    exportData: function() {
        // get save
        var saveData = localStorage.getItem(SharkGame.Save.saveFileName);
        if(saveData === null) {
            try {
                saveData = SharkGame.Save.saveGame(true);
            } catch(err) {
                SharkGame.Log.addError(err.message);
                console.log(err.trace);
            }
        }
        // check if save isn't encoded
        if(saveData.substring(0, 2) !== "<~") {
            // encode it
            saveData = ascii85.encode(saveData);
        }
        return saveData;
    },

    savedGameExists: function() {
        return (localStorage.getItem(SharkGame.Save.saveFileName) !== null);
    },

    deleteSave: function() {
        localStorage.removeItem(SharkGame.Save.saveFileName);
    },

    // Thanks to Dylan for managing to crush saves down to a much smaller size!
    createBlueprint: function(template, sortWrong) {
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
                if(sortWrong) {
                    return a > b;  //mercy on my soul
                } else {
                    return a > b ? 1 : -1;
                }
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
                    if(typeof elem === "number" && slot.indexOf("timestamp") === -1) {
                        elem = Number(elem.toPrecision(5));
                    }
                    out.push(elem);
                }
            });
        }

        flattenPart(SharkGame.Save.createBlueprint(template), source);
        return out;
    },

    expandData: function(template, data, sortWrong) {
        function expandPart(bp) {
            var out = {}; //todo: array support
            $.each(bp, function(_, slot) {
                if(typeof slot === "object") {
                    out[slot[0]] = expandPart(slot[1]);
                } else {
                    if(data.length === 0) throw new Error("Incorrect save length.");
                    out[slot] = data.shift();
                }
            });
            return out;
        }

        var expanded = expandPart(SharkGame.Save.createBlueprint(template, sortWrong));
        if(data.length !== 0) throw new Error("Incorrect save length.");
        return expanded;
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
            save.tabs = {
                "current": null,
                "home": {"discovered": null},
                "lab": {"discovered": null},
                "gate": {"discovered": null}
            };
            save.settings = {
                "buyAmount": null,
                "offlineModeActive": null,
                "autosaveFrequency": null,
                "logMessageMax": null,
                "sidebarWidth": null,
                "showAnimations": null,
                "colorCosts": null
            };
            save.gateCostsMet = {
                "fish": null,
                "sand": null,
                "crystal": null,
                "kelp": null,
                "seaApple": null,
                "sharkonium": null
            };
            return save;
        },

        // future updaters for save versions beyond the base:
        // they get passed the result of the previous updater and it continues in a chain
        // and they start based on the version they were saved
        function(save) {
            save = $.extend(true, save, {
                "resources": {"sandDigger": {"amount": 0, "totalAmount": 0}, "junk": {"amount": 0, "totalAmount": 0}},
                "upgrades": {statsDiscovery: null, recyclerDiscovery: null},
                "settings": {"showTabHelp": false, "groupResources": false},
                "timestampLastSave": save.timestamp,
                "timestampGameStart": null,
                "timestampRunStart": null
            });
            // reformat tabs
            save.tabs = {
                "current": save.tabs["current"],
                "home": save.tabs["home"].discovered,
                "lab": save.tabs["lab"].discovered,
                "gate": save.tabs["gate"].discovered,
                "stats": false,
                "recycler": false
            };
            delete save.timestamp;
            return save;
        },

        // v0.6
        function(save) {
            // add new setting to list of saves
            save = $.extend(true, save, {
                "settings": {"iconPositions": "top"}
            });
            return save;
        },

        // v0.7
        function(save) {
            save = $.extend(true, save, {
                "settings": {"showTabImages": true},
                "tabs": {"reflection": false},
                "timestampRunEnd": null
            });
            _.each(["shrimp", "lobster", "dolphin", "whale", "chimaera", "octopus", "eel", "queen", "berrier", "biologist", "pit", "worker", "harvester", "philosopher", "treasurer", "chorus", "transmuter", "explorer", "collector", "scavenger", "technician", "sifter", "skimmer", "purifier", "heater", "spongeFarmer", "berrySprayer", "glassMaker", "silentArchivist", "tirelessCrafter", "clamCollector", "sprongeSmelter", "seaScourer", "prostheticPolyp", "sponge", "jellyfish", "clam", "coral", "algae", "coralglass", "delphinium", "spronge", "tar", "ice"], function(v) {
                save.resources[v] = {amount: 0, totalAmount: 0};
            });
            _.each(["environmentalism", "thermalConditioning", "coralglassSmelting", "industrialGradeSponge", "aquamarineFusion", "coralCircuitry", "sprongeBiomimicry", "dolphinTechnology", "spongeCollection", "jellyfishHunting", "clamScooping", "pearlConversion", "crustaceanBiology", "eusociality", "wormWarriors", "cetaceanAwareness", "dolphinBiology", "delphinePhilosophy", "coralHalls", "eternalSong", "eelHabitats", "creviceCreches", "bioelectricity", "chimaeraMysticism", "abyssalEnigmas", "octopusMethodology", "octalEfficiency"], function(v) {
                save.upgrades[v] = false;
            });
            save.world = {type: "start", level: 1};
            save.artifacts = {};
            _.each(["permanentMultiplier", "planetTerraformer", "gateCostReducer", "planetScanner", "sharkMigrator", "rayMigrator", "crabMigrator", "shrimpMigrator", "lobsterMigrator", "dolphinMigrator", "whaleMigrator", "eelMigrator", "chimaeraMigrator", "octopusMigrator", "sharkTotem", "rayTotem", "crabTotem", "shrimpTotem", "lobsterTotem", "dolphinTotem", "whaleTotem", "eelTotem", "chimaeraTotem", "octopusTotem", "progressTotem", "carapaceTotem", "inspirationTotem", "industryTotem", "wardingTotem"], function(v) {
                save.artifacts[v] = 0;
            });
            save.gateway = {betweenRuns: false};
            return save;
        },

        // a little tweak here and there
        function(save) {
            save = $.extend(true, save, {
                "settings": {"buttonDisplayType": "list"}
            });
            return save;
        },
        function(save) {
            save = $.extend(true, save, {
                "gateway": {"wonGame": false}
            });
            return save;
        },
        function(save) {
            // forgot to add numen to saved resources (which is understandable given it can't actually be legitimately achieved at this point)
            save.resources["numen"] = {amount: 0, totalAmount: 0};
            // completely change how gate slot status is saved
            save.gateCostsMet = [false, false, false, false, false, false];
            return save;
        },

        // v 0.71
        function(save) {
            _.each(["eggBrooder", "diver"], function(v) {
                save.resources[v] = {amount: 0, totalAmount: 0};
            });
            _.each(["agriculture", "ancestralRecall", "utilityCarapace", "primordialSong", "leviathanHeart", "eightfoldOptimisation", "mechanisedAlchemy", "mobiusShells", "imperialDesigns"], function(v) {
                save.upgrades[v] = false;
            });
            return save;
        }
    ]
};