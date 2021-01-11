/* eslint-disable-next-line no-var, no-use-before-define */
var SharkGame = SharkGame || {};

window.onmousemove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.getElementById("tooltipbox").style.top = y - 20 + "px";
    document.getElementById("tooltipbox").style.left = x + 15 + "px";
};

// CORE VARIABLES AND HELPER FUNCTIONS
$.extend(SharkGame, {
    GAME_NAMES: [
        "Five Seconds A Shark",
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
        "Strange Oceans",
        "A New Frontier",
        "Lobster's Paradise",
        "Revenge of the Crabs",
        "Shark Box",
        "Dolphin Heroes",
        "Maws",
        "Sharky's Awkward Escapade: Part 6",
    ],
    GAME_NAME: null,
    ACTUAL_GAME_NAME: "Shark Game",
    VERSION: 0.1,
    ORIGINAL_VERSION: 0.71,
    VERSION_NAME: "New is Old",
    EPSILON: 1e-6, // floating point comparison is a joy
    // agreed, already had to deal with it on recycler revisions
    // did you know that reducing a float like 1.2512351261 to 1.25 by literally removing the decimal and multiplying by 100 gives you something like 125.0000001?

    INTERVAL: 1000 / 10, // 20 FPS // I'm pretty sure 1000 / 10 comes out to 10 FPS
    dt: 1 / 10,
    before: new Date(),

    timestampLastSave: false,
    timestampGameStart: false,
    timestampRunStart: false,
    timestampRunEnd: false,

    sidebarHidden: true,
    paneGenerated: false,

    gameOver: false,
    wonGame: false,
    
    cheatsAndDebug: {
        pause: false,
        stop: false,
    },

    credits:
        "<p>This game was originally created in 3 days for Seamergency 2014.<br/>" +
        "<span class='smallDesc'>(Technically it was 4 days, but sometimes plans go awry.)</span></p>" +
        "<p>It was made by <a href='http://cirri.al'>Cirr</a> who needs to update his website.<br/>" +
        "He has a rarely updated <a href='https://twitter.com/Cirrial'>Twitter</a> though.</p>" +
        "<p>Additional code and credit help provided by Dylan and Sam Red.<br/>" +
        "<span class='smallDesc'>Dylan is also graciously hosting the original game.</span></p>" +
        "<p><a href='https://github.com/spencers145/SharkGame'>Mod</a> created by base4/spencers145,<br/>" +
        "with sprite help from <a href='https://twitter.com/vhs_static'>@vhs_static</a> and friends." +
        '<br/><span style="color: rgba(0,0,0,0);">With some help by <a href="https://github.com/Toby222" style="color: rgba(0,0,0,0);">Toby</a></span>',

    ending:
        "<p>Congratulations! You did it.<br/>You saved the sharks!</p>" +
        "<p>The gate leads away from this strange ocean...</p>" +
        "<p>Back home to the oceans you came from!</p>" +
        "<h3>Or are they?</h3>",

    help:
        "<p>This game is a game about discovery, resources, and does not demand your full attention. " +
        "You are free to pay as much attention to the game as you want. " +
        "It will happily run in the background, and works even while closed.</p>" +
        "<p>To begin, you should catch fish. Once you have some fish, more actions will become available. " +
        'If you have no idea what these actions do, click the "Toggle descriptions" button for more information.</p>' +
        "<p>If you are ever stuck, try actions you haven't yet tried. " +
        "Remember, though, that sometimes patience is the only way forward. Patience and ever escalating numbers.</p>" +
        "<p>If you are here because you think you have encountered a bug of some kind, report it on the <a href='https://discord.gg/nN7BQDJR2G' target='blank_'>discord</a>.</p>",

    donate:
        "<p>You can <a href='https://www.sharktrust.org/Listing/Category/donate' target='_blank'>donate to help save sharks and mantas</a>!</p>" +
        "<p>Seems only fitting, given this game was made for a charity stream!</p>" +
        "<p><span class='smallDescAllowClicks'>(But if you'd rather, you can also " +
        "<a href='https://www.paypal.com/cgi-bin/" +
        "webscr?cmd=_donations&business=G3WPPAYAWTJCJ&lc=GB&" +
        "item_name=Shark%20Game%20Developer%20Support&" +
        "item_number=Shark%20Game%20Support&no_note=1&" +
        "no_shipping=1&currency_code=USD&" +
        "bn=PP%2dDonationsBF%3adonate%2epng%3aNonHosted' " +
        "target='_blank'>support the original developer</a>" +
        " if you'd like.)</span></p>",

    spriteIconPath: "img/sharksprites.png",
    spriteHomeEventPath: "img/sharkeventsprites.png",

    choose(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    },
    plural(number) {
        return number === 1 ? "" : "s";
    },
    colorLum(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        let rgb = "#";
        for (let i = 0; i < 3; i++) {
            let c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    },
    getImageIconHTML(imagePath, width, height) {
        if (!imagePath) {
            imagePath = "http://placekitten.com/g/" + Math.floor(width) + "/" + Math.floor(height);
        }
        let imageHtml = "";
        if (SharkGame.Settings.current.iconPositions !== "off") {
            imageHtml +=
                "<img width=" +
                width +
                " height=" +
                height +
                " src='" +
                imagePath +
                "' class='button-icon-" +
                SharkGame.Settings.current.iconPositions +
                "'>";
        }
        return imageHtml;
    },
    changeSprite(spritePath, imageName, imageDiv, backupImageName) {
        let spriteData = SharkGame.Sprites[imageName];
        if (!imageDiv) {
            imageDiv = $("<div>");
        }

        // if the original sprite data is undefined, try loading the backup
        if (!spriteData) {
            spriteData = SharkGame.Sprites[backupImageName];
        }

        if (spriteData) {
            imageDiv.css("background-image", "url(" + spritePath + ")");
            imageDiv.css("background-position", "-" + spriteData.frame.x + "px -" + spriteData.frame.y + "px");
            imageDiv.width(spriteData.frame.w);
            imageDiv.height(spriteData.frame.h);
        } else {
            imageDiv.css("background-image", 'url("//placehold.it/50x50")');
            imageDiv.width(50);
            imageDiv.height(50);
        }
        return imageDiv;
    },
});

SharkGame.TitleBar = {
    saveLink: {
        name: "save",
        main: true,
        onClick() {
            try {
                try {
                    SharkGame.Save.saveGame();
                } catch (err) {
                    SharkGame.Log.addError(err);
                    console.log(err);
                }
                SharkGame.Log.addMessage("Saved game.");
            } catch (err) {
                SharkGame.Log.addError(err.message);
            }
        },
    },

    optionsLink: {
        name: "options",
        main: true,
        onClick() {
            m.showOptions();
        },
    },

    changelogLink: {
        name: "changelog",
        main: false,
        onClick() {
            m.showChangelog();
        },
    },

    helpLink: {
        name: "help",
        main: true,
        onClick() {
            m.showHelp();
        },
    },

    skipLink: {
        name: "skip",
        main: true,
        onClick() {
            if (m.isFirstTime()) {
                // save people stranded on home world
                if (confirm("Do you want to reset your game?")) {
                    // just reset
                    m.init();
                }
            } else {
                if (confirm("Is this world causing you too much trouble? Want to go back to the gateway?")) {
                    SharkGame.wonGame = false;
                    m.endGame();
                }
            }
        },
    },

    creditsLink: {
        name: "credits",
        main: false,
        onClick() {
            m.showPane("Credits", SharkGame.credits);
        },
    },

    donateLink: {
        name: "donate",
        main: false,
        onClick() {
            m.showPane("Donate", SharkGame.donate);
        },
    },

    discordLink: {
        name: "discord",
        main: false,
        link: "https://discord.gg/nN7BQDJR2G",
    },
};

SharkGame.Tabs = {
    current: "home",
};

SharkGame.Main = {
    tickHandler: -1,
    autosaveHandler: -1,

    beautify(number, suppressDecimals, toPlaces) {
        let formatted;

        let negative = false;
        if (number < 0) {
            negative = true;
            number *= -1;
        }

        if (number === Number.POSITIVE_INFINITY) {
            formatted = "infinite";
        } else if (number < 1 && number >= 0) {
            if (suppressDecimals) {
                formatted = "0";
            } else if (number >= 0.01) {
                formatted = number.toFixed(2) + "";
            } else if (number >= 0.001) {
                formatted = number.toFixed(3) + "";
            } else if (number >= 0.0001) {
                formatted = number.toFixed(4) + "";
            } else if (number >= 0.00001) {
                // number > 0.00001 && negative -> number > 0.00001 && number < 0 -> false
                formatted = number.toFixed(5) + "";
            } else {
                formatted = "0";
            }

            if (negative) {
                formatted = "-" + formatted;
            }
        } else {
            const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];
            const digits = Math.floor(Math.log10(number));
            // Max for a case where the supported suffix is not specified
            const precision = Math.max(0, 2 - (digits % 3));
            const suffixIndex = Math.floor(digits / 3);

            let suffix;
            if (suffixIndex >= suffixes.length) {
                formatted = "lots";
            } else {
                suffix = suffixes[suffixIndex];
                // fix number to be compliant with suffix
                if (suffixIndex > 0) {
                    number /= Math.pow(1000, suffixIndex);
                }
                let formattedNumber;
                if (suffixIndex === 0) {
                    if (toPlaces && toPlaces - digits > 0 && number !== Math.floor(number)) {
                        formattedNumber = number.toFixed(toPlaces - digits);
                    } else {
                        formattedNumber = Math.floor(number);
                    }
                } else if (suffixIndex > 0) {
                    formattedNumber = number.toFixed(precision) + suffix;
                } else {
                    formattedNumber = number.toFixed(precision);
                }
                formatted = (negative ? "-" : "") + formattedNumber;
            }
        }

        return formatted;
    },

    beautifyIncome(number, also) {
        if (!also) {
            also = "";
        }
        if (Math.abs(number) < 0.001 && Math.abs(number) > 0.000001) {
            number *= 3600;
            number = number.toFixed(3);
            number += also;
            number += "/h";
        } else if (Math.abs(number) >= 0.001) {
            number = m.beautify(number, false, 2);
            number += also;
            number += "/s";
        } else {
            return 0;
        }
        return number;
    },

    formatTime(milliseconds) {
        const numSeconds = Math.floor(milliseconds / 1000);
        const numMinutes = Math.floor(numSeconds / 60);
        const numHours = Math.floor(numMinutes / 60);
        const numDays = Math.floor(numHours / 24);
        const numWeeks = Math.floor(numDays / 7);
        const numMonths = Math.floor(numWeeks / 4);
        const numYears = Math.floor(numMonths / 12);

        const formatSeconds = (numSeconds % 60).toString(10).padStart(2, "0");
        const formatMinutes = numMinutes > 0 ? (numMinutes % 60).toString(10).padStart(2, "0") + ":" : "";
        const formatHours = numHours > 0 ? (numHours % 24).toString() + ":" : "";
        const formatDays = numDays > 0 ? (numDays % 7).toString() + "D, " : "";
        const formatWeeks = numWeeks > 0 ? (numWeeks % 4).toString() + "W, " : "";
        const formatMonths = numMonths > 0 ? (numMonths % 12).toString() + "M, " : "";
        const formatYears = numYears > 0 ? numYears.toString() + "Y, " : "";

        return formatYears + formatMonths + formatWeeks + formatDays + formatHours + formatMinutes + formatSeconds;
    },

    // credit where it's due, i didn't write this (regexes fill me with fear), pulled from
    // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript/196991#196991
    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },

    // also functions as a reset
    init() {
        const now = _.now();
        SharkGame.before = now;
        if (SharkGame.GAME_NAME === null) {
            SharkGame.GAME_NAME = SharkGame.choose(SharkGame.GAME_NAMES);
            document.title = SharkGame.ACTUAL_GAME_NAME + ": " + SharkGame.GAME_NAME;
        }
        $("#sidebar").hide();
        const overlay = $("#overlay");
        overlay.hide();
        $("#gameName").html("- " + SharkGame.GAME_NAME + " -");
        $("#versionNumber").html(
            "New Frontiers v " +
                SharkGame.VERSION +
                " - " +
                SharkGame.VERSION_NAME +
                "<br/> Mod of v " +
                SharkGame.ORIGINAL_VERSION
        );
        SharkGame.sidebarHidden = true;
        SharkGame.gameOver = false;

        // remove any errant classes
        $("#pane").removeClass("gateway");
        overlay.removeClass("gateway");

        // initialise timestamps to something sensible
        SharkGame.timestampLastSave = SharkGame.timestampLastSave || now;
        SharkGame.timestampGameStart = SharkGame.timestampGameStart || now;
        SharkGame.timestampRunStart = SharkGame.timestampRunStart || now;

        // preserve settings or set defaults
        $.each(SharkGame.Settings, (k, v) => {
            if (k === "current") {
                return;
            }
            const currentSetting = SharkGame.Settings.current[k];
            if (typeof currentSetting === "undefined") {
                SharkGame.Settings.current[k] = v.defaultSetting;
            }
        });

        // create the tooltip box

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
        if (SharkGame.Save.savedGameExists()) {
            try {
                SharkGame.Save.loadGame();
                SharkGame.Log.addMessage("Loaded game.");
            } catch (err) {
                SharkGame.Log.addError(err.message);
            }
        }

        // rename a game option if this is a first time run
        if (m.isFirstTime()) {
            SharkGame.TitleBar.skipLink.name = "reset";
            m.setUpTitleBar();
        } else {
            // and then remember to actually set it back once it's not
            SharkGame.TitleBar.skipLink.name = "skip";
            m.setUpTitleBar();
        }

        // discover actions that were present in last save
        h.discoverActions();

        // set up tab after load
        m.setUpTab();

        if (m.tickHandler === -1) {
            m.tickHandler = setInterval(m.tick, SharkGame.INTERVAL);
        }

        if (m.autosaveHandler === -1) {
            m.autosaveHandler = setInterval(m.autosave, SharkGame.Settings.current.autosaveFrequency * 60000);
        }
    },

    tick() {
        if (SharkGame.cheatsAndDebug.pause) {
            SharkGame.before = _.now();
            return;
        }
        if (SharkGame.cheatsAndDebug.stop) {
            return;
        }
        if (SharkGame.gameOver) {
            // tick gateway stuff
            g.update();
        } else {
            // tick main game stuff
            const now = _.now();
            const elapsedTime = now - SharkGame.before;
            // check if the sidebar needs to come back
            if (SharkGame.sidebarHidden) {
                m.showSidebarIfNeeded();
            }

            if (elapsedTime > SharkGame.INTERVAL) {
                // Compensate for lost time.
                m.processSimTime(SharkGame.dt * (elapsedTime / SharkGame.INTERVAL));
            } else {
                if (CaD.chunky) {
                    return;
                }
                m.processSimTime(SharkGame.dt);
            }
            r.updateResourcesTable();

            const tabCode = SharkGame.Tabs[SharkGame.Tabs.current].code;
            tabCode.update();

            m.checkTabUnlocks();

            SharkGame.before = now;
        }
    },

    checkTabUnlocks() {
        $.each(SharkGame.Tabs, (k, v) => {
            if (k === "current" || v.discovered) {
                return;
            }
            let reqsMet = true;

            // check resources
            if (v.discoverReq.resource) {
                reqsMet = reqsMet && r.checkResources(v.discoverReq.resource, true);
            }

            // discover which upgrade table is in use

            const ups = SharkGame.Upgrades.getUpgradeTable();

            // check upgrades
            if (v.discoverReq.upgrade) {
                $.each(v.discoverReq.upgrade, (_, value) => {
                    if (ups[value]) {
                        reqsMet = reqsMet && ups[value].purchased;
                    } else {
                        reqsMet = false; // can't have a nonexistent upgrade
                    }
                });
            }

            if (reqsMet) {
                // unlock tab!
                m.discoverTab(k);
                SharkGame.Log.addDiscovery("Discovered " + v.name + "!");
            }
        });
    },

    processSimTime(numberOfSeconds) {
        // income calculation
        r.processIncomes(numberOfSeconds);
    },

    autosave() {
        try {
            SharkGame.Save.saveGame();
            SharkGame.Log.addMessage("Autosaved.");
        } catch (err) {
            SharkGame.Log.addError(err.message);
            console.log(err.trace);
        }
    },

    setUpTitleBar() {
        const titleMenu = $("#titlemenu");
        const subTitleMenu = $("#subtitlemenu");
        titleMenu.empty();
        subTitleMenu.empty();
        $.each(SharkGame.TitleBar, (k, v) => {
            let option;
            if (v.link) {
                option = "<li><a id='" + k + "' href='" + v.link + "' target='_blank'>" + v.name + "</a></li>";
            } else {
                option = "<li><a id='" + k + "' href='javascript:;'>" + v.name + "</a></li>";
            }
            if (v.main) {
                titleMenu.append(option);
            } else {
                subTitleMenu.append(option);
            }
            $("#" + k).on("click", v.onClick);
        });
    },

    setUpTab() {
        const tabs = SharkGame.Tabs;
        // empty out content div
        const content = $("#content");
        content.empty();
        content.append(
            '<div id="contentMenu"><ul id="tabList"></ul><ul id="tabButtons"></ul></div><div id="tabBorder" class="clear-fix"></div>'
        );

        m.createTabNavigation();
        m.createBuyButtons();

        // set up tab specific stuff
        const tab = tabs[tabs.current];
        const tabCode = tab.code;
        tabCode.switchTo();
    },

    createTabMenu() {
        m.createTabNavigation();
        m.createBuyButtons();
    },

    createTabNavigation() {
        const tabs = SharkGame.Tabs;
        const tabList = $("#tabList");
        tabList.empty();
        // add navigation
        // check if we have more than one discovered tab, else bypass this
        let numTabsDiscovered = 0;
        $.each(tabs, (k, v) => {
            if (v.discovered) {
                numTabsDiscovered++;
            }
        });
        if (numTabsDiscovered > 1) {
            // add a header for each discovered tab
            // make it a link if it's not the current tab
            $.each(tabs, (k, v) => {
                const onThisTab = SharkGame.Tabs.current === k;
                if (v.discovered) {
                    const tabListItem = $("<li>");
                    if (onThisTab) {
                        tabListItem.html(v.name);
                    } else {
                        tabListItem.append(
                            $("<a>")
                                .attr("id", "tab-" + k)
                                .attr("href", "javascript:;")
                                .html(v.name)
                                .on("click", function callback() {
                                    const tab = $(this).attr("id").split("-")[1];
                                    m.changeTab(tab);
                                })
                        );
                    }
                    tabList.append(tabListItem);
                }
            });
        }
    },

    createBuyButtons(customLabel) {
        // add buy buttons
        const buttonList = $("#tabButtons");
        buttonList.empty();
        $.each(SharkGame.Settings.buyAmount.options, (_, amount) => {
            const disableButton = amount === SharkGame.Settings.current.buyAmount;
            buttonList.prepend(
                $("<li>").append(
                    $("<button>")
                        .addClass("min")
                        .attr("id", "buy-" + amount)
                        .prop("disabled", disableButton)
                )
            );
            let label = customLabel ? customLabel + " " : "buy ";
            if (amount < 0) {
                if (amount < -2) {
                    label += "1/3 max";
                } else if (amount < -1) {
                    label += "1/2 max";
                } else {
                    label += "max";
                }
            } else {
                label += m.beautify(amount);
            }
            $("#buy-" + amount)
                .html(label)
                .on("click", function callback() {
                    const thisButton = $(this);
                    SharkGame.Settings.current.buyAmount = parseInt(thisButton.attr("id").slice(4));
                    $("button[id^='buy-']").prop("disabled", false);
                    thisButton.prop("disabled", true);
                });
        });
    },

    changeTab(tab) {
        SharkGame.Tabs.current = tab;
        m.setUpTab();
    },

    discoverTab(tab) {
        SharkGame.Tabs[tab].discovered = true;
        // force a total redraw of the navigation
        m.createTabMenu();
    },

    showSidebarIfNeeded() {
        // if we have any non-zero resources, show sidebar
        // if we have any log entries, show sidebar
        if (r.haveAnyResources() || SharkGame.Log.haveAnyMessages()) {
            // show sidebar
            if (SharkGame.Settings.current.showAnimations) {
                $("#sidebar").show("500");
            } else {
                $("#sidebar").show();
            }
            // flag sidebar as shown
            SharkGame.sidebarHidden = false;
        }
    },

    showOptions() {
        const optionsContent = m.setUpOptions();
        m.showPane("Options", optionsContent);
    },

    setUpOptions() {
        const optionsTable = $("<table>").attr("id", "optionTable");
        // add settings specified in settings.js
        $.each(SharkGame.Settings, (key, value) => {
            if (key === "current" || !value.show) {
                return;
            }
            const row = $("<tr>");

            // show setting name
            row.append(
                $("<td>")
                    .addClass("optionLabel")
                    .html(value.name + ":" + "<br/><span class='smallDesc'>(" + value.desc + ")</span>")
            );

            const currentSetting = SharkGame.Settings.current[key];

            // show setting adjustment buttons
            $.each(value.options, (k, v) => {
                const isCurrentSetting = k === value.options.indexOf(currentSetting);
                row.append(
                    $("<td>").append(
                        $("<button>")
                            .attr("id", "optionButton-" + key + "-" + k)
                            .addClass("option-button")
                            .prop("disabled", isCurrentSetting)
                            .html(typeof v === "boolean" ? (v ? "on" : "off") : v)
                            .on("click", m.onOptionClick)
                    )
                );
            });

            optionsTable.append(row);
        });

        // SAVE IMPORT/EXPORT
        // add save import/export
        let row = $("<tr>");
        row.append(
            $("<td>").html(
                "Import/Export Save:<br/><span class='smallDesc'>(You should probably save first!) Import or export save as text. Keep it safe!</span>"
            )
        );
        row.append(
            $("<td>").append(
                $("<button>")
                    .html("import")
                    .addClass("option-button")
                    .on("click", function callback() {
                        const importText = $("#importExportField").val();
                        if (importText === "") {
                            SharkGame.hidePane();
                            SharkGame.Log.addError("You need to paste something in first!");
                        } else if (confirm("Are you absolutely sure? This will override your current save.")) {
                            SharkGame.Save.importData(importText);
                        }
                    })
            )
        );
        row.append(
            $("<td>").append(
                $("<button>")
                    .html("export")
                    .addClass("option-button")
                    .on("click", function callback() {
                        $("#importExportField").val(SharkGame.Save.exportData());
                    })
            )
        );
        // add the actual text box
        row.append(
            $("<td>").attr("colSpan", 4).append($("<input>").attr("type", "text").attr("id", "importExportField"))
        );
        optionsTable.append(row);

        // SAVE WIPE
        // add save wipe
        row = $("<tr>");
        row.append(
            $("<td>").html(
                "Wipe Save<br/><span class='smallDesc'>(Completely wipe your save and reset the game. COMPLETELY. FOREVER.)</span>"
            )
        );
        row.append(
            $("<td>").append(
                $("<button>")
                    .html("wipe")
                    .addClass("option-button")
                    .on("click", () => {
                        if (confirm("Are you absolutely sure you want to wipe your save?\nIt'll be gone forever!")) {
                            SharkGame.Save.deleteSave();
                            g.deleteArtifacts(); // they're out of the save data, but not the working game memory!
                            r.reconstructResourcesTable();
                            w.worldType = "start"; // nothing else will reset this
                            w.planetLevel = 1;
                            m.init(); // reset
                        }
                    })
            )
        );
        optionsTable.append(row);
        return optionsTable;
    },

    onOptionClick() {
        const buttonLabel = $(this).attr("id");
        const settingInfo = buttonLabel.split("-");
        const settingName = settingInfo[1];
        const optionIndex = parseInt(settingInfo[2]);

        // change setting to specified setting!
        SharkGame.Settings.current[settingName] = SharkGame.Settings[settingName].options[optionIndex];

        // update relevant table cell!
        // $('#option-' + settingName)
        //     .html("(" + ((typeof newSetting === "boolean") ? (newSetting ? "on" : "off") : newSetting) + ")");

        // enable all buttons
        $('button[id^="optionButton-' + settingName + '"]').prop("disabled", false);

        // disable this button
        $(this).attr("disabled", "true");

        // if there is a callback, call it, else call the no op
        (SharkGame.Settings[settingName].onChange || $.noop)();
    },

    showChangelog() {
        const changelogContent = $("<div>").attr("id", "changelogDiv");
        $.each(SharkGame.Changelog, (version, changes) => {
            const segment = $("<div>").addClass("paneContentDiv");
            segment.append($("<h3>").html(version + ": "));
            const changeList = $("<ul>");
            $.each(changes, (_, v) => {
                changeList.append($("<li>").html(v));
            });
            segment.append(changeList);
            changelogContent.append(segment);
        });
        m.showPane("Changelog", changelogContent);
    },

    showHelp() {
        const helpDiv = $("<div>");
        helpDiv.append($("<div>").append(SharkGame.help).addClass("paneContentDiv"));
        m.showPane("Help", helpDiv);
    },

    endGame(loadingFromSave) {
        // stop autosaving
        clearInterval(m.autosaveHandler);
        m.autosaveHandler = -1;

        // flag game as over
        SharkGame.gameOver = true;

        // grab end game timestamp
        SharkGame.timestampRunEnd = _.now();

        // kick over to passage
        g.enterGate(loadingFromSave);
    },

    purgeGame() {
        // empty out all the containers!
        $("#status").empty();
        SharkGame.Log.clearMessages();
        $("#content").empty();
    },

    loopGame() {
        if (SharkGame.gameOver) {
            SharkGame.gameOver = false;
            SharkGame.wonGame = false;
            m.hidePane();

            // copy over all special category resources
            // artifacts are preserved automatically within gateway file
            const backup = {};
            _.each(SharkGame.ResourceCategories.special.resources, (resourceName) => {
                backup[resourceName] = {
                    amount: r.getResource(resourceName),
                    totalAmount: r.getTotalResource(resourceName),
                };
            });

            SharkGame.Save.deleteSave(); // otherwise it will be loaded during main init and fuck up everything!!
            m.init();
            SharkGame.Log.addMessage(w.getWorldEntryMessage());

            // restore special resources
            $.each(backup, (resourceName, resourceData) => {
                r.setResource(resourceName, resourceData.amount);
                r.setTotalResource(resourceName, resourceData.totalAmount);
            });

            SharkGame.timestampRunStart = _.now();
            try {
                SharkGame.Save.saveGame();
                SharkGame.Log.addMessage("Game saved.");
            } catch (err) {
                SharkGame.Log.addError(err.message);
                console.log(err.trace);
            }
        }
    },

    buildPane() {
        const pane = $("<div>").attr("id", "pane");
        $("body").append(pane);

        // set up structure of pane
        const titleDiv = $("<div>").attr("id", "paneHeader");
        titleDiv.append($("<div>").attr("id", "paneHeaderTitleDiv"));
        titleDiv.append(
            $("<div>")
                .attr("id", "paneHeaderCloseButtonDiv")
                .append(
                    $("<button>")
                        .attr("id", "paneHeaderCloseButton")
                        .addClass("min")
                        .html("&nbsp x &nbsp")
                        .on("click", m.hidePane)
                )
        );
        pane.append(titleDiv);
        pane.append($("<div>").attr("id", "paneHeaderEnd").addClass("clear-fix"));
        pane.append($("<div>").attr("id", "paneContent"));

        pane.hide();
        SharkGame.paneGenerated = true;
        return pane;
    },

    showPane(title, contents, hideCloseButton, fadeInTime, customOpacity) {
        let pane;

        // GENERATE PANE IF THIS IS THE FIRST TIME
        if (!SharkGame.paneGenerated) {
            pane = m.buildPane();
        } else {
            pane = $("#pane");
        }

        // begin fading in/displaying overlay if it isn't already visible
        const overlay = $("#overlay");
        // is it already up?
        fadeInTime = fadeInTime || 600;
        if (overlay.is(":hidden")) {
            // nope, show overlay
            const overlayOpacity = customOpacity || 0.5;
            if (SharkGame.Settings.current.showAnimations) {
                overlay.show().css("opacity", 0).animate({ opacity: overlayOpacity }, fadeInTime);
            } else {
                overlay.show().css("opacity", overlayOpacity);
            }
            // adjust overlay height
            overlay.height($(document).height());
        }

        // adjust header
        const titleDiv = $("#paneHeaderTitleDiv");
        const closeButtonDiv = $("#paneHeaderCloseButtonDiv");

        if (!title || title === "") {
            titleDiv.hide();
        } else {
            titleDiv.show();
            if (!hideCloseButton) {
                // put back to left
                titleDiv.css({ float: "left", "text-align": "left", clear: "none" });
                titleDiv.html("<h3>" + title + "</h3>");
            } else {
                // center
                titleDiv.css({ float: "none", "text-align": "center", clear: "both" });
                titleDiv.html("<h2>" + title + "</h2>");
            }
        }
        if (hideCloseButton) {
            closeButtonDiv.hide();
        } else {
            closeButtonDiv.show();
        }

        // adjust content
        const paneContent = $("#paneContent");
        paneContent.empty();

        paneContent.append(contents);
        if (SharkGame.Settings.current.showAnimations && customOpacity) {
            pane.show().css("opacity", 0).animate({ opacity: 1.0 }, fadeInTime);
        } else {
            pane.show();
        }
    },

    hidePane() {
        $("#overlay").hide();
        $("#pane").hide();
    },

    isFirstTime() {
        return w.worldType === "start" && !(r.getTotalResource("essence") > 0);
    },

    // DEBUG FUNCTIONS
    discoverAll() {
        $.each(SharkGame.Tabs, (k, v) => {
            if (k !== "current") {
                m.discoverTab(k);
            }
        });
    },
    
    getDeterminer(name) {
        firstLetter = name.charAt(0);
        if ("aeiou".includes(firstLetter)) {
            return "an";
            //note to self: make the next line not suck
            // Possibly add an "uncountable" property to resources somehow? Manual works fine though
        } else if (!["algae", "coral", "spronge", "delphinium", "coralglass", "sharkonium", "residue", "tar", "ice", "science"].includes(name)) {
            return "a";
        } else {
            return "";
        }
    },
};

SharkGame.Button = {
    makeHoverscriptButton(id, name, div, handler, hhandler, huhandler) {
        return $("<button>")
            .html(name)
            .attr("id", id)
            .addClass("hoverbutton")
            .appendTo(div)
            .on("click", handler)
            .on("mouseenter", hhandler)
            .on("mouseleave", huhandler);
    },

    makeButton(id, name, div, handler) {
        return $("<button>").html(name).attr("id", id).appendTo(div).on("click", handler);
    },

    replaceButton(id, name, handler) {
        return $("#" + id)
            .html(name)
            .off("click")
            .on("click", handler);
    },
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
    "A shark is worth one in the bush, and a bunch in the sea water. Don't put sharks in bushes.",
];

SharkGame.Changelog = {
    "<a href='https://github.com/spencers145/SharkGame'>New Frontiers</a> 0.1 - New is Old (2021/1/7)": [
        "22 NEW SPRITES! More are coming but we couldn't finish all the sprites in time!",
        "TRUE OFFLINE PROGRESS! Days are compressed to mere seconds with RK4 calculation.",
        "Attempted to rebalance worlds, especially frigid and abandoned, by making hazardous materials more threatening and meaningful.",
        "Halved the effectiveness of the 3 basic shark machines (except sand digger, which is 2/3 as productive), but added a new upgrade to counterbalance it.",
        "Added recycler efficiency system. The more you recycle at once, the more you lose in the process. Added an upgrade which makes the mechanic less harsh.",
        "Added new UI elements to the Recycler to make it less of a guessing game and more of a cost-benefit analysis.",
        "Increased the effectiveness of many machines.",
        "Greatly improved number formatting.",
        "World shaper has been disabled because it will probably break plans for future game balance.",
        "Distant foresight now has a max level of 5, and reveals 20% of world properties per level, up to 100% at level 5.",
        "Fixed exploits, bugs, and buggy exploits and exploitable bugs. No more crystals -> clams & sponges -> science & clams -> crystals loop.",
        "No more science from sponges.",
        "Removed jellyfish from a bunch of worlds where the resource was a dead end.",
    ],
    "0.71 (2014/12/20)": [
        "Fixed and introduced and fixed a whole bunch of horrible game breaking bugs. If your save was lost, I'm sorry.",
        "Made the recycler stop lying about what could be made.",
        "Made the recycler not pay out so much for animals.",
        "Options are no longer reset after completing a run for real this time.",
        "Bunch of tweaked gate costs.",
        "One new machine, and one new job.",
        "Ten new post-chasm-exploration technologies to invest copious amounts of science into.",
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
        "Partial production when there's insufficient resources for things that take costs. Enjoy watching your incomes slow to a trickle!",
    ],
    "0.62 (2014/12/12)": [
        "Fixed infinity resource requirement for gate.",
        "Attempted to fix resource table breaking in some browsers for some sidebar widths.",
    ],
    "0.61 (2014/12/12)": [
        "Added categories for buttons in the home sea, because there are going to be so many buttons.",
        "Miscellaneous shuffling of files.",
        "Some groundwork laid for v0.7, which will be the actual official release.",
    ],
    "0.6 - Return of Shark (2014/12/8)": [
        "Major graphical update!",
        "Now features graphics sort of!",
        "Some UI rearrangements:" +
            "<ul><li>Researched techs now show in lab instead of grotto.</li>" +
            "<li>General stats now on right of grotto instead of left.</li>" +
            "<li>Large empty space in grotto right column reserved for future use!</li></ul>",
        "Pointless version subtitle!",
        "<span class='medDesc'>Added a donate link. Hey, sharks gotta eat.</span>",
    ],
    "0.59 (2014/09/30)": [
        "Bunch of small fixes and tweaks!",
        "End of run time now shown at the end of a run.",
        "A couple of fixes for issues only found in IE11.",
        "Fixed a bug that could let people buy hundreds of things for cheap by overwhelming the game's capacity for input. Hopefully fixed, anyway.",
        "Gaudy social media share menu shoehorned in below the game title. Enjoy!",
    ],
    "0.531 (2014/08/20)": [
        "Banned sea apples from the recycler because the feedback loop is actually far more crazy powerful than I was expecting. Whoops!",
    ],
    "0.53 (2014/08/18)": [
        "Changed Recycler so that residue into new machines is linear, but into new resources is constant.",
    ],
    "0.52 (2014/08/18)": [
        "Emergency bug-fixes.",
        "Cost to assemble residue into new things is now LINEAR (gets more expensive as you have more things) instead of CONSTANT.",
    ],
    "0.51 (2014/08/18)": [
        "Edited the wording of import/export saving.",
        "Made machine recycling less HORRIBLY BROKEN in terms of how much a machine is worth.",
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
        "<span class='medDesc'>Added an overdue copyright notice I guess.</span>",
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
        "Added ray and crab generating resources, and unlocking techs.",
    ],
    "0.47 (2014/08-ish)": ["Bulk of game content added.", "Last update for Seamergency 2014!"],
    "0.4 (2014/08-ish)": ["Added Laboratory tab.", "Added the end of the game tab."],
    "0.3 (2014/08-ish)": ["Added description to options.", "Added save import/export.", "Added the ending panel."],
    "0.23 (2014/08-ish)": ["Added autosave.", "Income system overhauled.", "Added options panel."],
    "0.22 (2014/08-ish)": [
        "Offline mode added. Resources will increase even with the game off!",
        "(Resource income not guaranteed to be 100% accurate.)",
    ],
    "0.21 (2014/08-ish)": ["Save and load added."],
    "<0.21 (2014/08-ish)": ["A whole bunch of stuff.", "Resource table, log, initial buttons, the works."],
};

$(() => {
    $("#game").show();
    m.init();

    // ctrl+s saves
    $(window).on("keydown", (event) => {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.key).toLowerCase()) {
                case "s":
                    event.preventDefault();
                    SharkGame.Save.saveGame();
                    break;
                case "o":
                    event.preventDefault();
                    m.showOptions();
                    break;
            }
        }
    });
});
