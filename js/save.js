SharkGame.Save = {

    saveFileName: "sharkGameSave",

    saveGame: function () {
        // populate save data object
        var saveData = {};
        saveData.version = SharkGame.VERSION;
        saveData.resources = {};
        saveData.tabs = {};
        saveData.settings = {};
        saveData.upgrades = {};
        saveData.gateCostsMet = {};

        $.each(SharkGame.ResourceTable, function (i, v) {
            saveData.resources[i] = {
                amount: v.amount,
                totalAmount: v.totalAmount
            };
        });

        $.each(SharkGame.Upgrades, function (i, v) {
            saveData.upgrades[i] = v.purchased;
        });

        $.each(SharkGame.Tabs, function (i, v) {
            saveData.tabs[i] = {
                discovered: v.discovered
            }
        });
        saveData.tabs.current = SharkGame.Tabs.current;

        $.each(SharkGame.Gate.costsMet, function (i,v) {
            saveData.gateCostsMet[i] = v;
        });

        $.each(SharkGame.Settings, function (i, v) {
            if ( i !== "current" ) {
                saveData.settings[i] = SharkGame.Settings.current[i];
            }
        });

        // add timestamp
        saveData.timestamp = (new Date()).getTime();

        // save save-data object via JSON
        var saveString = pako.deflate(JSON.stringify(saveData), {to:'string'});
        localStorage.setItem(SharkGame.Save.saveFileName, saveString);
    },

    loadGame: function (importSaveData) {

        var saveDataString = importSaveData || localStorage.getItem(SharkGame.Save.saveFileName);

        if(saveDataString.charAt(0) === 'x') {
            // decompress string
            saveDataString = pako.inflate(saveDataString, {to:'string'});
        }

        var saveData;
        try {
            saveData = JSON.parse(saveDataString);
        } catch(err) {
            var errMessage = "Couldn't load save data!\n";
            if(importSaveData) {
                errMessage += "You imported a garbage bunch of letters you encoded into ASCII85 for some reason. You were warned! You were warned to keep it safe!!";
            }  else {
                errMessage += "Something has gone terribly, terribly wrong. Your local storage save is broken. My condolences.";
            }
            alert(errMessage);
        }

        if ( saveData ) {
            // go through it
            if ( SharkGame.VERSION > saveData.version ) {
                // migration stuff goes here
                if ( saveData.version < 0.21 ) {
                    // added timestamp
                    // just add current timestamp to save data
                    saveData.timestamp = new Date();
                }
                if ( saveData.version < 0.23 ) {
                    // erase old bad settings stuff
                    saveData.settings = null;

                    // convert incomes
                    if ( typeof saveData.incomes !== "undefined" ) {
                        $.each(saveData.incomes, function (i, v) {
                            saveData.resources[i].incomeMultiplier = v.multiplier;
                        });
                    }
                }
                if ( saveData.version < 0.3 ) {
                    // clear old tab visited settings IF THEY ARE SET
                    $.each(SharkGame.Tabs, function (i, v) {
                        if ( i === "home" ) {
                            return;
                        }
                        if(saveData.tabs[i]) {
                            saveData.tabs[i].discovered = false;
                        }
                    });
                    saveData.tabs.current = "home";
                }


                // let player know update went fine
                SharkGame.Log.addMessage("Updated save data from v " + saveData.version + " to " + SharkGame.VERSION + ".");
            }

            if ( saveData.resources ) {
                $.each(saveData.resources, function (i, v) {
                    // check that this isn't an old resource that's been removed from the game for whatever reason
                    if(SharkGame.ResourceTable[i]) {
                        SharkGame.ResourceTable[i].amount = isNaN(v.amount) ? 0 : v.amount;
                        SharkGame.ResourceTable[i].totalAmount = isNaN(v.totalAmount) ? 0 : v.amount;
                    }
                });
            }

            // hacky kludge: force table creation
            SharkGame.Resources.reconstructResourcesTable();

            if(saveData.upgrades) {
                $.each(saveData.upgrades, function(i, v) {
                    if(saveData.upgrades[i]) {
                        SharkGame.Lab.addUpgrade(i);
                    }
                });
            }

            if ( saveData.tabs ) {
                $.each(saveData.tabs, function (i, v) {
                    SharkGame.Tabs[i].discovered = v.discovered;
                });
                if ( saveData.tabs.current ) {
                    SharkGame.Tabs.current = saveData.tabs.current;
                }
            }

            if(saveData.gateCostsMet) {
                $.each(saveData.gateCostsMet, function(i,v) {
                    // only pay attention to valid costs
                    if(SharkGame.Gate.costs[i]) {
                        SharkGame.Gate.costsMet[i] = v;
                    }
                });
            }

            if ( saveData.settings ) {
                $.each(saveData.settings, function (i, v) {
                    SharkGame.Settings.current[i] = v;
                    // update anything tied to this setting right off the bat
                    (SharkGame.Settings[i].onChange || $.noop)();
                });
            }
            if ( (typeof saveData.timestamp !== "number") ) {
                // create a surrogate timestamp
                saveData.timestamp = (new Date()).getTime();
            }

            // if offline mode is enabled
            if ( SharkGame.Settings.current.offlineModeActive ) {
                // get times elapsed since last save game
                var now = (new Date()).getTime();
                var secondsElapsed = (now - saveData.timestamp) / 1000;
                if ( secondsElapsed < 0 ) {
                    // something went hideously wrong or someone abused a system clock somewhere
                    secondsElapsed = 0;
                }

                // process this
                SharkGame.Resources.recalculateIncomeTable();
                SharkGame.Main.processSimTime(secondsElapsed);

                // acknowledge long time gaps
                if ( secondsElapsed > 3600 ) {
                    var notification = "Welcome back! It's been ";
                    var numHours = Math.floor(secondsElapsed / 3600);
                    if ( numHours > 24 ) {
                        var numDays = Math.floor(numHours / 24);
                        if ( numDays > 7 ) {
                            var numWeeks = Math.floor(numDays / 7);
                            if(numWeeks > 4) {
                                var numMonths = Math.floor(numWeeks / 4);
                                if ( numMonths > 12 ) {
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
        }
    },

    importData: function (data) {
        // decode from ascii85
        var saveData;
        try {
            saveData = ascii85.decode(data);
        } catch(err) {
            alert("That's not encoded properly. Are you sure that's a real save export string?");
        }
        // load the game from this save data string
        SharkGame.Save.loadGame(saveData);
        // refresh current tab
        SharkGame.Main.setUpTab();
    },

    exportData: function () {
        // get save
        var saveData = localStorage.getItem(SharkGame.Save.saveFileName);
        if(saveData === "") {
            SharkGame.Save.saveGame();
            saveData = localStorage.getItem(SharkGame.Save.saveFileName);
        }
        // encode save
        return ascii85.encode(saveData);
    },

    savedGameExists: function () {
        return (localStorage.getItem(SharkGame.Save.saveFileName) !== null);
    },

    deleteSave: function () {
        localStorage.removeItem(SharkGame.Save.saveFileName);
    }
};