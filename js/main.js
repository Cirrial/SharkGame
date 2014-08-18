var SharkGame = SharkGame || {};

// CORE VARIABLES AND HELPER FUNCTIONS
$.extend(SharkGame, {
    GAME_NAMES: ["Five Seconds A Shark",
        "Next Shark Game",
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
        "Saucy Sharks"
    ],
    GAME_NAME: null,
    VERSION: 0.53,
    EPSILON: 1E-6, // floating point comparison is a joy

    INTERVAL: (1000 / 10), // 10 FPS
    dt: (1 / 10),
    before: null,

    timestampLastSave: null,
    timestampGameStart: null,
    timestampRunStart: null,

    sidebarHidden: true,
    titlebarGenerated: false,
    paneGenerated: false,

    gameOver: false,

    credits: "<p>This game was originally created in 3 days for <a href='http://www.twitch.tv/seamergency'>Seamergency 2014</a>.<br/>" +
        "<span class='smallDesc'>(Technically it was 4 days, but sometimes plans go awry.)</span></p>" +
        "<p>It was made by <a href='http://cirri.al'>Cirr</a> who needs to update his website.<br/>" +
        "He has a rarely updated <a href='https://twitter.com/Cirrial'>Twitter</a> though.</p>" +
        "<p>Additional code and credit help, as well as hosting, provided by Dylan.</p>" +
        "<p>Thank you for playing! You're all awesome!</p>",

    ending: "<p>Congratulations! You did it.<br/>You saved the sharks!</p>" +
        "<p>The gate leads away from this strange ocean...</p>" +
        "<p>Back home to the oceans you came from!</p>" +
        "<h3>Or are they?</h3>",

    help: "<p>This game is a game about discovery, resources, and does not demand your full attention. You are free to pay as much attention to the game as you want. " +
        "It will happily run in the background, and works even while closed.</p>" +
        "<p>To begin, you should catch fish. Once you have some fish, more actions will become available. " +
        "If you have no idea what these actions do, click the \"Toggle descriptions\" button for more information.</p>" +
        "<p>If you are ever stuck, try actions you haven't yet tried. Remember, though, that sometimes patience is the only way forward. Patience and ever escalating numbers.</p>",

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
    }
});

SharkGame.TitleBar = {
    saveLink: {
        name: "save",
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
        onClick: function() {
            SharkGame.Main.showOptions();
        }
    },

    changelogLink: {
        name: "changelog",
        onClick: function() {
            SharkGame.Main.showChangelog();
        }
    },

    helpLink: {
        name: "help",
        onClick: function() {
            SharkGame.Main.showHelp();
        }
    },

    resetLink: {
        name: "reset",
        onClick: function() {
            var message = "Are you absolutely sure you want to reset?\n";
            var essence = SharkGame.Resources.getResource("essence");
            if(essence > 0) {
                message += "You'll keep your essence, but lose everything else.";
            } else {
                message += "You'll lose absolutely everything. NO bonuses for this.";
            }
            if(confirm(message)) {
                SharkGame.Save.deleteSave();
                SharkGame.Main.init(); // reset
                SharkGame.Resources.changeResource("essence", essence);
                try {
                    SharkGame.Save.saveGame();
                } catch(err) {
                    SharkGame.Log.addError(err);
                    console.log(err.trace);
                }
            }
        }
    },

    wipeLink: {
        name: "wipe save",
        onClick: function() {
            if(confirm("Are you absolutely sure you want to wipe your save?\nIt'll be gone forever!")) {
                SharkGame.Save.deleteSave();
                SharkGame.Main.init(); // reset
            }
        }
    }

};

SharkGame.Tabs = {
    current: 'home'
};

SharkGame.Main = {

    tickHandler: null,
    autosaveHandler: null,

    beautify: function(number, suppressDecimals) {

        var formatted;

        if(number < 1 && number >= 0) {
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
                number /= Math.pow(1000, suffixIndex);

                if(suffixIndex == 0) {
                    formatted = (negative ? "-" : "") + Math.floor(number) + suffix;
                } else {
                    formatted = (negative ? "-" : "") + number.toFixed(precision) + suffix;
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

    // also functions as a reset
    init: function() {
        var currDate = new Date();
        SharkGame.before = currDate;
        if(SharkGame.GAME_NAME === null) {
            SharkGame.GAME_NAME = SharkGame.choose(SharkGame.GAME_NAMES);
        }
        $('#sidebar').hide();
        $('#overlay').hide();
        $('#gameName').html("- " + SharkGame.GAME_NAME + " -");
        $('#versionNumber').html("v " + SharkGame.VERSION);
        SharkGame.sidebarHidden = true;
        SharkGame.gameOver = false;

        // initialise timestamps to something sensible
        SharkGame.timestampLastSave = SharkGame.timestampLastSave || currDate.getTime();
        SharkGame.timestampGameStart = SharkGame.timestampGameStart || currDate.getTime();
        SharkGame.timestampRunStart = SharkGame.timestampRunStart || currDate.getTime();

        // reset settings
        SharkGame.Settings.current = {};
        $.each(SharkGame.Settings, function(k, v) {
            if(k === "current") {
                return;
            }
            SharkGame.Settings.current[k] = SharkGame.Settings.current[k] || v.defaultSetting;
        });

        // initialise and reset resources
        SharkGame.Resources.init();

        // reset log
        SharkGame.Log.clearMessages();

        // initialise tabs
        SharkGame.Home.init();
        SharkGame.Lab.init();
        SharkGame.Stats.init();
        SharkGame.Recycler.init();
        SharkGame.Gate.init();

        if(!SharkGame.titlebarGenerated) {
            SharkGame.Main.setUpTitleBar();
        }

        SharkGame.Tabs.current = "home";

        // load save game data if present
        if(SharkGame.Save.savedGameExists()) {
            try {
                SharkGame.Save.loadGame();
                SharkGame.Log.addMessage("Loaded game.");
            } catch(err) {
                SharkGame.Log.addError(err.message);
                console.log(err.trace);
            }
        }

        // set up tab after load
        SharkGame.Main.setUpTab();

        if(SharkGame.Main.tickHandler == null) {
            SharkGame.Main.tickHandler = setInterval(SharkGame.Main.tick, SharkGame.INTERVAL);
        }

        if(SharkGame.Main.autosaveHandler == null) {
            SharkGame.Main.autosaveHandler = setInterval(SharkGame.Main.autosave, SharkGame.Settings.current.autosaveFrequency * 60000);
        }
    },

    tick: function() {
        if(SharkGame.gameOver) {
            return;
        }
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
    },

    checkTabUnlocks: function() {
        $.each(SharkGame.Tabs, function(k, v) {
            if(k === "current" || v.discovered) {
                return;
            }
            var reqsMet = true;

            // check resources
            if(v.discoverReq.resource) {
                reqsMet = reqsMet && SharkGame.Resources.checkResources(v.discoverReq.resource);
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
        var m = SharkGame.Main;

        // currently just does income calculation, but who knows what terrible things could happen in future
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
        $.each(SharkGame.TitleBar, function(k, v) {
            titleMenu.append("<li><a id='" + k + "' href='#'>" + v.name + "</a></li>");
            $('#' + k).click(v.onClick);
        });

        SharkGame.titlebarGenerated = true;
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
        var tabCode = tabs[tabs.current].code;
        tabCode.switchTo();

        document.title = "[" + tabs[tabs.current].name + "] " + SharkGame.GAME_NAME;
    },

    createTabMenu: function() {
        SharkGame.Main.createTabNavigation();
        SharkGame.Main.createBuyButtons();
    },

    createTabNavigation: function() {
        var tabs = SharkGame.Tabs;
        $('#tabList').empty();
        // add navigation
        // check if we have more than one discovered tab, else bypass this
        var numTabsDiscovered = 0;
        $.each(tabs, function(k, v) {
            if(v.discovered) {
                numTabsDiscovered++;
            }
        })
        if(numTabsDiscovered > 1) {
            var tabList = $('#tabList');
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
                                .attr("href", "#")
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
                    .attr("id", "optionLabel")
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

        // add save import/export
        var row = $('<tr>');
        row.append($('<td>')
                .html("Import/Export Save:<br/><span class='smallDesc'>(You should probably save first!) Import or export save as text. Keep your save safe!</span>")
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

        return optionsTable;
    },

    onOptionClick: function() {
        var buttonLabel = $(this).attr("id");
        var settingInfo = buttonLabel.split("-");
        var settingName = settingInfo[1];
        var optionIndex = parseInt(settingInfo[2]);

        // change setting to specified setting!
        var newSetting = SharkGame.Settings[settingName].options[optionIndex];
        SharkGame.Settings.current[settingName] = newSetting;

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

    endGame: function() {
        // stop ticking, foreverrrr
        clearInterval(SharkGame.Main.tickHandler);
        SharkGame.Main.tickHandler = null;
        // stop autosaving too
        clearInterval(SharkGame.Main.autosaveHandler);
        SharkGame.Main.autosaveHandler = null;

        // bring up overlay, but much darker
        var docHeight = $(document).height();
        var overlay = $('#overlay');
        overlay.height(docHeight);
        if(SharkGame.Settings.current.showAnimations) {
            overlay.show()
                .css("opacity", 0)
                .animate({opacity: 0.8}, 4000, "swing", SharkGame.Main.showEnding);
        } else {
            overlay.show()
                .css("opacity", 0.8);
            SharkGame.Main.showEnding();
        }

        // flag game as over
        SharkGame.gameOver = true;
    },

    showEnding: function() {
        var endPane = $('<div>');
        endPane.append($('<div>').append(SharkGame.ending).addClass("paneContentDiv"));
        endPane.append($('<div>').append(SharkGame.credits).addClass("paneContentDiv"));
        var buttonDiv = $('<div>').attr("id", "endButton").addClass("paneContentDiv");
        endPane.append(buttonDiv);
        SharkGame.Button.makeButton("closeEnding", "Enter the New Ocean", buttonDiv, SharkGame.Main.loopGame);
        SharkGame.Main.showPane("The End", endPane, true, 4000, 0.8);
    },

    loopGame: function() {
        if(SharkGame.gameOver) {
            SharkGame.gameOver = false;
            SharkGame.Main.hidePane();
            SharkGame.Save.deleteSave();
            var essence = SharkGame.Resources.getResource("essence");
            essence++;
            SharkGame.Main.init();
            SharkGame.Log.addMessage("Something feels different about you. The gate feels as though it has changed you.");
            SharkGame.Resources.changeResource("essence", essence);
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

    // DEBUG FUNCTIONS
    discoverAll: function() {
        $.each(SharkGame.Tabs, function(k, v) {
            if(k !== "current") {
                SharkGame.Main.discoverTab(k);
            }
        });
    }
}
;

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

SharkGame.Changelog = {
    "0.53": [
        "Changed Recycler so that residue into new machines is linear, but into new rsources is constant."
    ],
    "0.52": [
        "Emergency bug-fixes.",
        "Cost to assemble residue into new things is now LINEAR (gets more expensive as you have more things) instead of CONSTANT."
    ],
    "0.51": [
        "Edited the wording of import/export saving.",
        "Made machine recycling less HORRIBLY BROKEN in terms of how much a machine is worth."
    ],
    "0.5": [
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
    "0.48": [
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
    "0.47": [
        "Bulk of game content added.",
        "Last update for Seamergency 2014!"
    ],
    "0.4": [
        "Added Laboratory tab.",
        "Added the end of the game tab."
    ],
    "0.3": [
        "Added description to options.",
        "Added save import/export.",
        "Added the ending panel."
    ],
    "0.23": [
        "Added autosave.",
        "Income system overhauled.",
        "Added options panel."
    ],
    "0.22": [
        "Offline mode added. Resources will increase even with the game off!",
        "(Resource income not guaranteed to be 100% accurate.)"
    ],
    "0.21": [
        "Save and load added."
    ],
    "<0.21": [
        "A whole bunch of stuff.",
        "Resource table, log, initial buttons, the works."
    ]
};


$(document).ready(function() {
    $('#game').show();
    SharkGame.Main.init();
});