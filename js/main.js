var SharkGame = SharkGame || {};


// CORE VARIABLES AND HELPER FUNCTIONS
$.extend(SharkGame, {
    GAME_NAMES: ["Five Seconds A Shark",
        "Next Shark Game",
        "Next Shark Game: Barkfest",
        "Sharky Clicker",
        "Weird Oceans",
        "You Have To Name The Shark Game",
        "Shark A Lark",
        "Bark Shark",
        "Fin Idle",
        "Ray of Dreams",
        "Shark Saver",
        "Shoal Sharker",
        "Shark Souls",
        "Saucy Sharks",
        "Sharkfall",
        "Heart of Sharkness",
        "Sharks and Recreation",
        "Alone in the Shark",
        "Sharkpocalypse",
        "Shark of Darkness",
        "Strange Oceans"
    ],
    GAME_NAME: null,
    ACTUAL_GAME_NAME: "Shark Game",
    VERSION: 0.71,
    VERSION_NAME: "Stranger Oceans",
    EPSILON: 1E-6, // floating point comparison is a joy

    INTERVAL: (1000 / 10), // 20 FPS
    dt: (1 / 10),
    before: new Date(),

    timestampLastSave: false,
    timestampGameStart: false,
    timestampRunStart: false,
    timestampRunEnd: false,

    sidebarHidden: true,
    paneGenerated: false,

    gameOver: false,
    wonGame: false,

    credits: "<p>This game was originally created in 3 days for Seamergency 2014.<br/>" +
    "<span class='smallDesc'>(Technically it was 4 days, but sometimes plans go awry.)</span></p>" +
    "<p>It was made by <a href='http://cirri.al'>Cirr</a> who needs to update his website.<br/>" +
    "He has a rarely updated <a href='https://twitter.com/Cirrial'>Twitter</a> though.</p>" +
    "<p>Additional code and credit help provided by Dylan and Sam Red.<br/>" +
    "<span class='smallDesc'>Dylan is also graciously hosting this game.</span></p>",


    ending: "<p>Congratulations! You did it.<br/>You saved the sharks!</p>" +
    "<p>The gate leads away from this strange ocean...</p>" +
    "<p>Back home to the oceans you came from!</p>" +
    "<h3>Or are they?</h3>",

    help: "<p>This game is a game about discovery, resources, and does not demand your full attention. " +
    "You are free to pay as much attention to the game as you want. " +
    "It will happily run in the background, and works even while closed.</p>" +
    "<p>To begin, you should catch fish. Once you have some fish, more actions will become available. " +
    "If you have no idea what these actions do, click the \"Toggle descriptions\" button for more information.</p>" +
    "<p>If you are ever stuck, try actions you haven't yet tried. " +
    "Remember, though, that sometimes patience is the only way forward. Patience and ever escalating numbers.</p>",

    donate: "<p>You can <a href='http://www.sharktrust.org/en/donate' target='_blank'>donate to help save sharks and mantas</a>!</p>" +
    "<p>Seems only fitting, given this game was made for a charity stream!</p>" +
    "<p><span class='smallDescAllowClicks'>(But if you'd rather, you can also " +
    "<a href='https://www.paypal.com/cgi-bin/" +
    "webscr?cmd=_donations&business=G3WPPAYAWTJCJ&lc=GB&" +
    "item_name=Shark%20Game%20Developer%20Support&" +
    "item_number=Shark%20Game%20Support&no_note=1&" +
    "no_shipping=1&currency_code=USD&" +
    "bn=PP%2dDonationsBF%3adonate%2epng%3aNonHosted' " +
    "target='_blank'>support the developer</a>" +
    " if you'd like.)</span></p>",

    spriteIconPath: "img/sharksprites.png",
    spriteHomeEventPath: "img/sharkeventsprites.png",

    choose: function(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    },
    log10: function(val) {
        return Math.log(val) / Math.LN10;
    },
    plural: function(number) {
        return (number === 1) ? "" : "s";
    },
    colorLum: function(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if(hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for(i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    },
    getImageIconHTML: function(imagePath, width, height) {
        if(!imagePath) {
            imagePath = "http://placekitten.com/g/" + Math.floor(width) + "/" + Math.floor(height);
        }
        var imageHtml = "";
        if(SharkGame.Settings.current.iconPositions !== "off") {
            imageHtml += "<img width=" + width + " height=" + height + " src='" + imagePath + "' class='button-icon-" + SharkGame.Settings.current.iconPositions + "'>";
        }
        return imageHtml;
    },
    changeSprite: function(spritePath, imageName, imageDiv, backupImageName) {
        var spriteData = SharkGame.Sprites[imageName];
        if(!imageDiv) {
            imageDiv = $('<div>');
        }

        // if the original sprite data is undefined, try loading the backup
        if(!spriteData) {
            spriteData = SharkGame.Sprites[backupImageName];
        }

        if(spriteData) {
            imageDiv.css('background-image', 'url(' + spritePath + ')');
            imageDiv.css('background-position', "-" + spriteData.frame.x + "px -" + spriteData.frame.y + "px");
            imageDiv.width(spriteData.frame.w);
            imageDiv.height(spriteData.frame.h);
        } else {
            imageDiv.css('background-image', 'url("//placehold.it/50x50")');
            imageDiv.width(50);
            imageDiv.height(50);
        }
        return imageDiv;
    }

});

SharkGame.TitleBar = {
    saveLink: {
        name: "save",
        main: true,
        onClick: function() {
            try {
                try {
                    SharkGame.Save.saveGame();
                } catch(err) {
                    SharkGame.Log.addError(err);
                    console.log(err);
                }
                SharkGame.Log.addMessage("Saved game.");
            } catch(err) {
                SharkGame.Log.addError(err.message);
            }

        }
    },

    optionsLink: {
        name: "options",
        main: true,
        onClick: function() {
            SharkGame.Main.showOptions();
        }
    },

    changelogLink: {
        name: "changelog",
        main: false,
        onClick: function() {
            SharkGame.Main.showChangelog();
        }
    },

    helpLink: {
        name: "help",
        main: true,
        onClick: function() {
            SharkGame.Main.showHelp();
        }
    },

    skipLink: {
        name: "skip",
        main: true,
        onClick: function() {
            if(SharkGame.Main.isFirstTime()) {  // save people stranded on home world
                if(confirm("Do you want to reset your game?")) {
                    // just reset
                    SharkGame.Main.init();
                }
            } else {
                if(confirm("Is this world causing you too much trouble? Want to go back to the gateway?")) {
                    SharkGame.wonGame = false;
                    SharkGame.Main.endGame();
                }
            }
        }
    },

    creditsLink: {
        name: "credits",
        main: false,
        onClick: function() {
            SharkGame.Main.showPane("Credits", SharkGame.credits);
        }
    },

    donateLink: {
        name: "donate",
        main: false,
        onClick: function() {
            SharkGame.Main.showPane("Donate", SharkGame.donate);
        }
    }
};

SharkGame.Tabs = {
    current: 'home'
};

SharkGame.Main = {

    tickHandler: -1,
    autosaveHandler: -1,

    beautify: function(number, suppressDecimals) {

        var formatted;

        if(number === Number.POSITIVE_INFINITY) {
            formatted = "infinite";
        } else if(number < 1 && number >= 0) {
            if(suppressDecimals) {
                formatted = "0";
            } else {
                if(number > 0.001) {
                    formatted = number.toFixed(2) + "";
                } else {
                    if(number > 0.0001) {
                        formatted = number.toFixed(3) + "";
                    } else {
                        formatted = 0;
                    }
                }
            }
        } else {
            var negative = false;
            if(number < 0) {
                negative = true;
                number *= -1;
            }
            var suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];
            var digits = Math.floor(SharkGame.log10(number));
            var precision = 2 - (Math.floor(SharkGame.log10(number)) % 3);
            // in case the highest supported suffix is not specified
            precision = Math.max(0, precision);
            var suffixIndex = Math.floor(digits / 3);


            var suffix;
            if(suffixIndex >= suffixes.length) {
                formatted = "lots";
            } else {
                suffix = suffixes[suffixIndex];
                // fix number to be compliant with suffix
                if(suffixIndex > 0) {
                    number /= Math.pow(1000, suffixIndex);
                }
                if(suffixIndex === 0) {
                    formatted = (negative ? "-" : "") + Math.floor(number) + suffix;
                } else if(suffixIndex > 0) {
                    formatted = (negative ? "-" : "") + number.toFixed(precision) + suffix;
                } else {
                    formatted = (negative ? "-" : "") + number.toFixed(precision);
                }
            }
        }
        return formatted;
    },

    formatTime: function(milliseconds) {
        var numSeconds = milliseconds / 1000;
        var formatted = "";
        if(numSeconds > 60) {
            var numMinutes = Math.floor(numSeconds / 60);
            if(numMinutes > 60) {
                var numHours = Math.floor(numSeconds / 3600);
                if(numHours > 24) {
                    var numDays = Math.floor(numHours / 24);
                    if(numDays > 7) {
                        var numWeeks = Math.floor(numDays / 7);
                        if(numWeeks > 4) {
                            var numMonths = Math.floor(numWeeks / 4);
                            if(numMonths > 12) {
                                var numYears = Math.floor(numMonths / 12);
                                formatted += numYears + "Y, ";
                            }
                            numMonths %= 12;
                            formatted += numMonths + "M, ";
                        }
                        numWeeks %= 4;
                        formatted += numWeeks + "W, ";
                    }
                    numDays %= 7;
                    formatted += numDays + "D, ";
                }
                numHours %= 24;
                formatted += numHours + ":";
            }
            numMinutes %= 60;
            formatted += (numMinutes < 10 ? ("0" + numMinutes) : numMinutes) + ":";
        }
        numSeconds %= 60;
        numSeconds = Math.floor(numSeconds);
        formatted += (numSeconds < 10 ? ("0" + numSeconds) : numSeconds);
        return formatted;
    },

    // credit where it's due, i didn't write this (regexes fill me with fear), pulled from
    // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

        // also functions as a reset
    init: function() {
        var currDate = new Date();
        SharkGame.before = currDate;
        if(SharkGame.GAME_NAME === null) {
            SharkGame.GAME_NAME = SharkGame.choose(SharkGame.GAME_NAMES);
            document.title = SharkGame.ACTUAL_GAME_NAME + ": " + SharkGame.GAME_NAME;
        }
        $('#sidebar').hide();
        var overlay = $('#overlay');
        overlay.hide();
        $('#gameName').html("- " + SharkGame.GAME_NAME + " -");
        $('#versionNumber').html("v " + SharkGame.VERSION + " — " + SharkGame.VERSION_NAME);
        SharkGame.sidebarHidden = true;
        SharkGame.gameOver = false;

        // remove any errant classes
        $('#pane').removeClass("gateway");
        overlay.removeClass("gateway");

        // initialise timestamps to something sensible
        SharkGame.timestampLastSave = SharkGame.timestampLastSave || currDate.getTime();
        SharkGame.timestampGameStart = SharkGame.timestampGameStart || currDate.getTime();
        SharkGame.timestampRunStart = SharkGame.timestampRunStart || currDate.getTime();

        // preserve settings or set defaults
        $.each(SharkGame.Settings, function(k, v) {
            if(k === "current") {
                return;
            }
            var currentSetting = SharkGame.Settings.current[k];
            if(typeof(currentSetting) === "undefined") {
                SharkGame.Settings.current[k] = v.defaultSetting
            }
        });

        // initialise and reset resources
        SharkGame.Resources.init();

        // initialise world
        // MAKE SURE GATE IS INITIALISED AFTER WORLD!!
        SharkGame.World.init();
        SharkGame.World.apply();

        SharkGame.Gateway.init();
        SharkGame.Gateway.applyArtifacts(); // if there's any effects to carry over from a previous run

        // reset log
        SharkGame.Log.clearMessages();

        // initialise tabs
        SharkGame.Home.init();
        SharkGame.Lab.init();
        SharkGame.Stats.init();
        SharkGame.Recycler.init();
        SharkGame.Gate.init();
        SharkGame.Reflection.init();

        SharkGame.Main.setUpTitleBar();

        SharkGame.Tabs.current = "home";

        // load save game data if present
        if(SharkGame.Save.savedGameExists()) {
            try{
                SharkGame.Save.loadGame();
                SharkGame.Log.addMessage("Loaded game.");
            } catch(err) {
                SharkGame.Log.addError(err.message);
            }
        }

        // rename a game option if this is a first time run
        if(SharkGame.Main.isFirstTime()) {
            SharkGame.TitleBar.skipLink.name = "reset";
            SharkGame.Main.setUpTitleBar();
        }

        // discover actions that were present in last save
        SharkGame.Home.discoverActions();

        // set up tab after load
        SharkGame.Main.setUpTab();


        if(SharkGame.Main.tickHandler === -1) {
            SharkGame.Main.tickHandler = setInterval(SharkGame.Main.tick, SharkGame.INTERVAL);
        }

        if(SharkGame.Main.autosaveHandler === -1) {
            SharkGame.Main.autosaveHandler = setInterval(SharkGame.Main.autosave, SharkGame.Settings.current.autosaveFrequency * 60000);
        }
    },

    tick: function() {
        if(SharkGame.gameOver) {
            // tick gateway stuff
            SharkGame.Gateway.update();
        } else {
            // tick main game stuff
            var now = new Date();
            var elapsedTime = (now.getTime() - SharkGame.before.getTime());

            var r = SharkGame.Resources;
            var m = SharkGame.Main;

            // check if the sidebar needs to come back
            if(SharkGame.sidebarHidden) {
                m.showSidebarIfNeeded();
            }

            if(elapsedTime > SharkGame.INTERVAL) {
                // Compensate for lost time.
                m.processSimTime(SharkGame.dt * (elapsedTime / SharkGame.INTERVAL));

            } else {
                m.processSimTime(SharkGame.dt);
            }
            r.updateResourcesTable();

            var tabCode = SharkGame.Tabs[SharkGame.Tabs.current].code;
            tabCode.update();

            m.checkTabUnlocks();

            SharkGame.before = new Date();
        }
    },

    checkTabUnlocks: function() {
        $.each(SharkGame.Tabs, function(k, v) {
            if(k === "current" || v.discovered) {
                return;
            }
            var reqsMet = true;

            // check resources
            if(v.discoverReq.resource) {
                reqsMet = reqsMet && SharkGame.Resources.checkResources(v.discoverReq.resource, true);
            }

            // check upgrades
            if(v.discoverReq.upgrade) {
                $.each(v.discoverReq.upgrade, function(_, value) {
                    if(SharkGame.Upgrades[value]) {
                        reqsMet = reqsMet && SharkGame.Upgrades[value].purchased;
                    } else {
                        reqsMet = false; // can't have a nonexistent upgrade
                    }
                });
            }

            if(reqsMet) {
                // unlock tab!
                SharkGame.Main.discoverTab(k);
                SharkGame.Log.addDiscovery("Discovered " + v.name + "!");
            }
        });
    },

    processSimTime: function(numberOfSeconds) {
        var r = SharkGame.Resources;

        // income calculation
        r.processIncomes(numberOfSeconds);
    },

    autosave: function() {
        try {
            SharkGame.Save.saveGame();
            SharkGame.Log.addMessage("Autosaved.");
        } catch(err) {
            SharkGame.Log.addError(err.message);
            console.log(err.trace);
        }
    },

    setUpTitleBar: function() {
        var titleMenu = $('#titlemenu');
        var subTitleMenu = $('#subtitlemenu');
        titleMenu.empty();
        subTitleMenu.empty();
        $.each(SharkGame.TitleBar, function(k, v) {
            var option = "<li><a id='" + k + "' href='javascript:;'>" + v.name + "</a></li>";
            if(v.main) {
                titleMenu.append(option);
            } else {
                subTitleMenu.append(option);
            }
            $('#' + k).click(v.onClick);
        });
    },

    setUpTab: function() {
        var tabs = SharkGame.Tabs;
        // empty out content div
        var content = $('#content');
        content.empty();
        content.append('<div id="contentMenu"><ul id="tabList"></ul><ul id="tabButtons"></ul></div><div id="tabBorder" class="clear-fix"></div>');

        SharkGame.Main.createTabNavigation();
        SharkGame.Main.createBuyButtons();

        // set up tab specific stuff
        var tab = tabs[tabs.current];
        var tabCode = tab.code;
        tabCode.switchTo();
    },

    createTabMenu: function() {
        SharkGame.Main.createTabNavigation();
        SharkGame.Main.createBuyButtons();
    },

    createTabNavigation: function() {
        var tabs = SharkGame.Tabs;
        var tabList = $('#tabList');
        tabList.empty();
        // add navigation
        // check if we have more than one discovered tab, else bypass this
        var numTabsDiscovered = 0;
        $.each(tabs, function(k, v) {
            if(v.discovered) {
                numTabsDiscovered++;
            }
        });
        if(numTabsDiscovered > 1) {
            // add a header for each discovered tab
            // make it a link if it's not the current tab
            $.each(tabs, function(k, v) {
                var onThisTab = (SharkGame.Tabs.current === k);
                if(v.discovered) {
                    var tabListItem = $('<li>');
                    if(onThisTab) {
                        tabListItem.html(v.name);
                    } else {
                        tabListItem.append($('<a>')
                                .attr("id", "tab-" + k)
                                .attr("href", "javascript:;")
                                .html(v.name)
                                .click(function() {
                                    var tab = ($(this).attr("id")).split("-")[1];
                                    SharkGame.Main.changeTab(tab);
                                })
                        );
                    }
                    tabList.append(tabListItem);
                }
            })
        }
    },

    createBuyButtons: function(customLabel) {
        // add buy buttons
        var buttonList = $('#tabButtons');
        buttonList.empty();
        $.each(SharkGame.Settings.buyAmount.options, function(_, v) {
            var amount = v;
            var disableButton = (v === SharkGame.Settings.current.buyAmount);
            buttonList.prepend($('<li>')
                .append($('<button>')
                    .addClass("min")
                    .attr("id", "buy-" + v)
                    .prop("disabled", disableButton)
            ));
            var label = customLabel ? customLabel + " " : "buy ";
            if(amount < 0) {
                if(amount < -2) {
                    label += "1/3 max"
                } else if(amount < -1) {
                    label += "1/2 max"
                } else if(amount < 0) {
                    label += "max"
                }
            } else {
                label += SharkGame.Main.beautify(amount);
            }
            $('#buy-' + v).html(label)
                .click(function() {
                    var thisButton = $(this);
                    SharkGame.Settings.current.buyAmount = parseInt(thisButton.attr("id").slice(4));
                    $("button[id^='buy-']").prop("disabled", false);
                    thisButton.prop("disabled", true);
                });
        });
    },

    changeTab: function(tab) {
        SharkGame.Tabs.current = tab;
        SharkGame.Main.setUpTab();
    },

    discoverTab: function(tab) {
        SharkGame.Tabs[tab].discovered = true;
        // force a total redraw of the navigation
        SharkGame.Main.createTabMenu();
    },


    showSidebarIfNeeded: function() {
        // if we have any non-zero resources, show sidebar
        // if we have any log entries, show sidebar
        if(SharkGame.Resources.haveAnyResources() || SharkGame.Log.haveAnyMessages()) {
            // show sidebar
            if(SharkGame.Settings.current.showAnimations) {
                $('#sidebar').show("500");
            } else {
                $('#sidebar').show();
            }
            // flag sidebar as shown
            SharkGame.sidebarHidden = false;
        }
    },

    showOptions: function() {
        var optionsContent = SharkGame.Main.setUpOptions();
        SharkGame.Main.showPane("Options", optionsContent);
    },

    setUpOptions: function() {
        var optionsTable = $('<table>').attr("id", "optionTable");
        // add settings specified in settings.js
        $.each(SharkGame.Settings, function(key, value) {
            if(key === "current" || !value.show) {
                return;
            }
            var row = $('<tr>');

            // show setting name
            row.append($('<td>')
                    .addClass("optionLabel")
                    .html(value.name + ":" +
                    "<br/><span class='smallDesc'>" + "(" + value.desc + ")" + "</span>")
            );

            var currentSetting = SharkGame.Settings.current[key];

            // show setting adjustment buttons
            $.each(value.options, function(k, v) {
                var isCurrentSetting = (k == value.options.indexOf(currentSetting));
                row.append($('<td>').append($('<button>')
                        .attr("id", "optionButton-" + key + "-" + k)
                        .addClass("option-button")
                        .prop("disabled", isCurrentSetting)
                        .html((typeof v === "boolean") ? (v ? "on" : "off") : v)
                        .click(SharkGame.Main.onOptionClick)
                ));
            });

            optionsTable.append(row);
        });

        // SAVE IMPORT/EXPORT
        // add save import/export
        var row = $('<tr>');
        row.append($('<td>')
                .html("Import/Export Save:<br/><span class='smallDesc'>(You should probably save first!) Import or export save as text. Keep it safe!</span>")
        );
        row.append($('<td>').append($('<button>')
                .html("import")
                .addClass("option-button")
                .click(function() {
                    var importText = $('#importExportField').val();
                    if(importText === "") {
                        SharkGame.hidePane();
                        SharkGame.Log.addError("You need to paste something in first!");
                    } else if(confirm("Are you absolutely sure? This will override your current save.")) {
                        SharkGame.Save.importData(importText);
                    }
                })
        ));
        row.append($('<td>').append($('<button>')
                .html("export")
                .addClass("option-button")
                .click(function() {
                    $('#importExportField').val(SharkGame.Save.exportData());
                })
        ));
        // add the actual text box
        row.append($('<td>').attr("colSpan", 4)
            .append($('<input>')
                .attr("type", "text")
                .attr("id", "importExportField")
        ));
        optionsTable.append(row);


        // SAVE WIPE
        // add save wipe
        row = $('<tr>');
        row.append($('<td>')
                .html("Wipe Save<br/><span class='smallDesc'>(Completely wipe your save and reset the game. COMPLETELY. FOREVER.)</span>")
        );
        row.append($('<td>').append($('<button>')
                .html("wipe")
                .addClass("option-button")
                .click(function() {
                    if(confirm("Are you absolutely sure you want to wipe your save?\nIt'll be gone forever!")) {
                        SharkGame.Save.deleteSave();
                        SharkGame.Gateway.deleteArtifacts(); // they're out of the save data, but not the working game memory!
                        SharkGame.Resources.reconstructResourcesTable();
                        SharkGame.World.worldType = "start"; // nothing else will reset this
                        SharkGame.World.planetLevel = 1;
                        SharkGame.Main.init(); // reset
                    }
                })
        ));
        optionsTable.append(row);
        return optionsTable;
    },

    onOptionClick: function() {
        var buttonLabel = $(this).attr("id");
        var settingInfo = buttonLabel.split("-");
        var settingName = settingInfo[1];
        var optionIndex = parseInt(settingInfo[2]);

        // change setting to specified setting!
        SharkGame.Settings.current[settingName] = SharkGame.Settings[settingName].options[optionIndex];

        // update relevant table cell!
//        $('#option-' + settingName)
//            .html("(" + ((typeof newSetting === "boolean") ? (newSetting ? "on" : "off") : newSetting) + ")");

        // enable all buttons
        $('button[id^="optionButton-' + settingName + '"]').prop("disabled", false);

        // disable this button
        $(this).attr("disabled", "true");

        // if there is a callback, call it, else call the no op
        (SharkGame.Settings[settingName].onChange || $.noop)();
    },

    showChangelog: function() {
        var changelogContent = $('<div>').attr("id", "changelogDiv");
        $.each(SharkGame.Changelog, function(version, changes) {
            var segment = $('<div>').addClass("paneContentDiv");
            segment.append($('<h3>').html(version + ": "));
            var changeList = $('<ul>');
            $.each(changes, function(_, v) {
                changeList.append($('<li>').html(v));
            });
            segment.append(changeList);
            changelogContent.append(segment);
        });
        SharkGame.Main.showPane("Changelog", changelogContent);
    },

    showHelp: function() {
        var helpDiv = $('<div>');
        helpDiv.append($('<div>').append(SharkGame.help).addClass("paneContentDiv"));
        SharkGame.Main.showPane("Help", helpDiv);
    },

    endGame: function(loadingFromSave) {
        // stop autosaving
        clearInterval(SharkGame.Main.autosaveHandler);
        SharkGame.Main.autosaveHandler = -1;

        // flag game as over
        SharkGame.gameOver = true;

        // grab end game timestamp
        SharkGame.timestampRunEnd = (new Date()).getTime();

        // kick over to passage
        SharkGame.Gateway.enterGate(loadingFromSave);
    },

    purgeGame: function() {
        // empty out all the containers!
        $('#status').empty();
        SharkGame.Log.clearMessages();
        $('#content').empty();
    },

    loopGame: function() {
        if(SharkGame.gameOver) {
            SharkGame.gameOver = false;
            SharkGame.wonGame = false;
            SharkGame.Main.hidePane();

            // copy over all special category resources
            // artifacts are preserved automatically within gateway file
            var backup = {};
            _.each(SharkGame.ResourceCategories.special.resources, function(resourceName) {
                backup[resourceName] = {amount: SharkGame.Resources.getResource(resourceName), totalAmount: SharkGame.Resources.getTotalResource(resourceName)};
            });

            SharkGame.Save.deleteSave(); // otherwise it will be loaded during main init and fuck up everything!!
            SharkGame.Main.init();
            SharkGame.Log.addMessage(SharkGame.World.getWorldEntryMessage());

            // restore special resources
            $.each(backup, function(resourceName, resourceData) {
                SharkGame.Resources.setResource(resourceName, resourceData.amount);
                SharkGame.Resources.setTotalResource(resourceName, resourceData.totalAmount);
            });

            SharkGame.timestampRunStart = (new Date()).getTime();
            try {
                SharkGame.Save.saveGame();
                SharkGame.Log.addMessage("Game saved.");
            } catch(err) {
                SharkGame.Log.addError(err.message);
                console.log(err.trace);
            }
        }
    },

    buildPane: function() {
        var pane;
        pane = $('<div>').attr("id", "pane");
        $('body').append(pane);

        // set up structure of pane
        var titleDiv = $('<div>').attr("id", "paneHeader");
        titleDiv.append($('<div>').attr("id", "paneHeaderTitleDiv"));
        titleDiv.append($('<div>')
            .attr("id", "paneHeaderCloseButtonDiv")
            .append($('<button>')
                .attr("id", "paneHeaderCloseButton")
                .addClass("min")
                .html("&nbsp x &nbsp")
                .click(SharkGame.Main.hidePane)
        ));
        pane.append(titleDiv);
        pane.append($('<div>').attr("id", "paneHeaderEnd").addClass("clear-fix"));
        pane.append($('<div>').attr("id", "paneContent"));

        pane.hide();
        SharkGame.paneGenerated = true;
        return pane;
    },

    showPane: function(title, contents, hideCloseButton, fadeInTime, customOpacity) {
        var pane;

        // GENERATE PANE IF THIS IS THE FIRST TIME
        if(!SharkGame.paneGenerated) {
            pane = SharkGame.Main.buildPane();
        } else {
            pane = $('#pane');
        }

        // begin fading in/displaying overlay if it isn't already visible
        var overlay = $("#overlay");
        // is it already up?
        fadeInTime = fadeInTime || 600;
        if(overlay.is(':hidden')) {
            // nope, show overlay
            var overlayOpacity = customOpacity || 0.5;
            if(SharkGame.Settings.current.showAnimations) {
                overlay.show()
                    .css("opacity", 0)
                    .animate({opacity: overlayOpacity}, fadeInTime);
            } else {
                overlay.show()
                    .css("opacity", overlayOpacity);
            }
            // adjust overlay height
            overlay.height($(document).height());
        }

        // adjust header
        var titleDiv = $('#paneHeaderTitleDiv');
        var closeButtonDiv = $('#paneHeaderCloseButtonDiv');

        if(!title || title === "") {
            titleDiv.hide();
        } else {
            titleDiv.show();
            if(!hideCloseButton) {
                // put back to left
                titleDiv.css({"float": "left", "text-align": "left", "clear": "none"});
                titleDiv.html("<h3>" + title + "</h3>");
            } else {
                // center
                titleDiv.css({"float": "none", "text-align": "center", "clear": "both"});
                titleDiv.html("<h2>" + title + "</h2>");
            }
        }
        if(hideCloseButton) {
            closeButtonDiv.hide();
        } else {
            closeButtonDiv.show();
        }

        // adjust content
        var paneContent = $('#paneContent');
        paneContent.empty();

        paneContent.append(contents);
        if(SharkGame.Settings.current.showAnimations && customOpacity) {
            pane.show()
                .css("opacity", 0)
                .animate({opacity: 1.0}, fadeInTime);
        } else {
            pane.show();
        }
    },

    hidePane: function() {
        $('#overlay').hide();
        $('#pane').hide();
    },

    isFirstTime: function() {
        return SharkGame.World.worldType === "start" && !(SharkGame.Resources.getTotalResource("essence") > 0);
    },

    // DEBUG FUNCTIONS
    discoverAll: function() {
        $.each(SharkGame.Tabs, function(k, v) {
            if(k !== "current") {
                SharkGame.Main.discoverTab(k);
            }
        });
    }
};

SharkGame.Button = {
    makeButton: function(id, name, div, handler) {
        return $("<button>").html(name)
            .attr("id", id)
            .appendTo(div)
            .click(handler);
    },

    replaceButton: function(id, name, handler) {
        return $('#' + id).html(name)
            .unbind('click')
            .click(handler);
    }
};

SharkGame.FunFacts = [
    "Shark Game's initial bare minimum code came from an abandoned idle game about bees. Almost no trace of bees remains!",
    "The existence of resources that create resources that create resources in this game were inspired by Derivative Clicker!",
    "Kitten Game was an inspiration for this game! This surprises probably no one. The very first message the game gives you is a nod of sorts.",
    "There have been social behaviours observed in lemon sharks, and evidence that suggests they prefer company to being alone.",
    "Sea apples are a type of sea cucumber.",
    "Magic crystals are probably not real.",
    "There is nothing suspicious about the machines.",
    "There are many species of sharks that investigate things with their mouths. This can end badly for the subject of investigation.",
    "Some shark species display 'tonic immobility' when rubbed on the nose. They stop moving, appear deeply relaxed, and can stay this way for up to 15 minutes before swimming away.",
    "In some shark species eggs hatch within their mothers, and in some of these species the hatched babies eat unfertilised or even unhatched eggs.",
    "Rays can be thought of as flattened sharks.",
    "Rays are pancakes of the sea. (note: probably not true)",
    "Chimaera are related to sharks and rays and have a venomous spine in front of their dorsal fin.",
    "More people are killed by lightning every year than by sharks.",
    "There are real eusocial shrimps that live as a community in sponges on reefs, complete with queens.",
    "White sharks have been observed to have a variety of body language signals to indicate submission and dominance towards each other without violence.",
    "Sharks with lasers were overdone, okay?",
    "There is a surprising deficit of cookie in this game.",
    "Remoras were banished from the oceans in the long bygone eras. The sharks hope they never come back.",
    "A kiss from a shark can make you immortal. But only if they want you to be immortal.",
    "A shark is worth one in the bush, and a bunch in the sea water. Don't put sharks in bushes."
];

SharkGame.Changelog = {
    "0.8 - Name Pending (2015/??/??)" :[
        "Went back over the git repo history and added dates to changelog histories. No hiding my having dropped this for over half a year now! <span class='medDesc'>(it has been a while)</span>"
    ],
    "0.71 (2014/12/20)": [
        "Fixed and introduced and fixed a whole bunch of horrible game breaking bugs. If your save was lost, I'm sorry.",
        "Made the recycler stop lying about what could be made.",
        "Made the recycler not pay out so much for animals.",
        "Options are no longer reset after completing a run for real this time.",
        "Bunch of tweaked gate costs.",
        "One new machine, and one new job.",
        "Ten new post-chasm-exploration technologies to invest copious amounts of science into."
    ],
    "0.7 - Stranger Oceans (2014/12/19)": [
        "WHOLE BUNCH OF NEW STUFF ADDED.",
        "Resource system slightly restructured for something in the future.",
        "New worlds with some slight changes to availabilities, gate demands, and some other stuff.",
        "Categories added to Home Sea tab for the benefit of trying to make sense of all the buttons.",
        "Newly added actions show up in highlights for your convenience.",
        "The way progress continues beyond the gate is now... a little tweaked.",
        "Options are no longer reset after completing a run.",
        "Artifacts exist.",
        "Images are a work in progress. Apologies for the placeholder graphics in these trying times.",
        "Partial production when there's insufficient resources for things that take costs. Enjoy watching your incomes slow to a trickle!"
    ],
    "0.62 (2014/12/12)": [
        "Fixed infinity resource requirement for gate.",
        "Attempted to fix resource table breaking in some browsers for some sidebar widths."
    ],
    "0.61 (2014/12/12)": [
        "Added categories for buttons in the home sea, because there are going to be so many buttons.",
        "Miscellaneous shuffling of files.",
        "Some groundwork laid for v0.7, which will be the actual official release."
    ],
    "0.6 - Return of Shark (2014/12/8)": [
        "Major graphical update!",
        "Now features graphics sort of!",
        "Some UI rearrangements:" +
        "<ul><li>Researched techs now show in lab instead of grotto.</li>" +
        "<li>General stats now on right of grotto instead of left.</li>" +
        "<li>Large empty space in grotto right column reserved for future use!</li></ul>",
        "Pointless version subtitle!",
        "<span class='medDesc'>Added a donate link. Hey, sharks gotta eat.</span>"
    ],
    "0.59 (2014/09/30)": [
        "Bunch of small fixes and tweaks!",
        "End of run time now shown at the end of a run.",
        "A couple of fixes for issues only found in IE11.",
        "Fixed a bug that could let people buy hundreds of things for cheap by overwhelming the game's capacity for input. Hopefully fixed, anyway.",
        "Gaudy social media share menu shoehorned in below the game title. Enjoy!"
    ],
    "0.531 (2014/08/20)": [
        "Banned sea apples from the recycler because the feedback loop is actually far more crazy powerful than I was expecting. Whoops!"
    ],
    "0.53 (2014/08/18)": [
        "Changed Recycler so that residue into new machines is linear, but into new resources is constant."
    ],
    "0.52 (2014/08/18)": [
        "Emergency bug-fixes.",
        "Cost to assemble residue into new things is now LINEAR (gets more expensive as you have more things) instead of CONSTANT."
    ],
    "0.51 (2014/08/18)": [
        "Edited the wording of import/export saving.",
        "Made machine recycling less HORRIBLY BROKEN in terms of how much a machine is worth."
    ],
    "0.5 (2014/08/18)": [
        "Added the Grotto - a way to better understand what you've accomplished so far.",
        "Added the Recycler. Enjoy discovering its function!",
        "Added sand machines for more machine sand goodness.",
        "Fixed oscillation/flickering of resources when at zero with anything providing a negative income.",
        "Added 'support' for people stumbling across the page with scripts turned off.",
        "Upped the gate kelp requirement by 10x, due to request.",
        "Added time tracking. Enjoy seeing how much of your life you've invested in this game.",
        "Added grouping for displaying resources on the left.",
        "Added some help and action descriptions.",
        "Added some text to the home tab to let people have an idea of where they should be heading in the very early game.",
        "Thanks to assistance from others, the saves are now much, much smaller than before.",
        "Made crab broods less ridiculously explosive.",
        "Adjusted some resource colours.",
        "Added a favicon, probably.",
        "<span class='medDesc'>Added an overdue copyright notice I guess.</span>"
    ],
    "0.48 (2014/08-ish)": [
        "Saves are now compressed both in local storage and in exported strings.",
        "Big costs significantly reduced.",
        "Buy 10, Buy 1/3 max and Buy 1/2 max buttons added.",
        "Research impact now displayed on research buttons.",
        "Resource effectiveness multipliers now displayed in table." +
        "<ul><li>These are not multipliers for how much of that resource you are getting.</li></ul>",
        "Some dumb behind the scenes things to make the code look nicer.",
        "Added this changelog!",
        "Removed upgrades list on the left. It'll come back in a future version.",
        "Added ray and crab generating resources, and unlocking techs."
    ],
    "0.47 (2014/08-ish)": [
        "Bulk of game content added.",
        "Last update for Seamergency 2014!"
    ],
    "0.4 (2014/08-ish)": [
        "Added Laboratory tab.",
        "Added the end of the game tab."
    ],
    "0.3 (2014/08-ish)": [
        "Added description to options.",
        "Added save import/export.",
        "Added the ending panel."
    ],
    "0.23 (2014/08-ish)": [
        "Added autosave.",
        "Income system overhauled.",
        "Added options panel."
    ],
    "0.22 (2014/08-ish)": [
        "Offline mode added. Resources will increase even with the game off!",
        "(Resource income not guaranteed to be 100% accurate.)"
    ],
    "0.21 (2014/08-ish)": [
        "Save and load added."
    ],
    "<0.21 (2014/08-ish)": [
        "A whole bunch of stuff.",
        "Resource table, log, initial buttons, the works."
    ]
};

$(document).ready(function() {
    $('#game').show();
    SharkGame.Main.init();

    // ctrl+s saves
    $(window).bind('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    SharkGame.Save.saveGame();
                    break;
                case 'o':
                    event.preventDefault();
                    SharkGame.Main.showOptions();
                    break;
            }
        }
    });
});