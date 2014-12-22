SharkGame.Home = {

    tabId: "home",
    tabDiscovered: true,
    tabName: "Home Sea",
    tabBg: "img/bg/bg-homesea.png",

    currentButtonTab: null,
    currentExtraMessageIndex: null,

    // Priority: later messages display if available, otherwise earlier ones.
    extraMessages: [
        // FIRST RUN
        {
            message: "&nbsp<br>&nbsp"
        },
        {
            unlock: {resource: {fish: 5}},
            message: "You attract the attention of a shark. Maybe they can help you catch fish!<br>&nbsp"
        },
        {
            unlock: {resource: {shark: 1}},
            message: "More sharks swim over, curious and watchful.<br>&nbsp"
        },
        {
            unlock: {resource: {fish: 15}},
            message: "Some rays drift over.<br>&nbsp"
        },
        {
            unlock: {resource: {shark: 1, ray: 1}},
            message: "You have quite the group going now.<br>&nbsp"
        },
        {
            unlock: {resource: {shark: 4, ray: 4}},
            message: "Some curious crabs come over.<br>&nbsp"
        },
        {
            unlock: {resource: {shark: 1, ray: 1, crab: 1}},
            message: "Your new tribe is at your command!<br>&nbsp"
        },
        {
            unlock: {resource: {shark: 1, crystal: 10}},
            message: "The crystals are shiny. Some sharks stare at them curiously.<br>&nbsp"
        },
        {
            unlock: {resource: {scientist: 1}},
            message: "The science sharks swim in their own school.<br>&nbsp"
        },
        {
            unlock: {upgrade: ["crystalContainer"]},
            message: "More discoveries are needed.<br>&nbsp"
        },
        {
            unlock: {resource: {nurse: 1}},
            message: "The shark community grows with time.<br>&nbsp"
        },
        {
            unlock: {upgrade: ["exploration"]},
            message: "You hear faint songs and cries in the distance.<br>&nbsp"
        },
        {
            unlock: {upgrade: ["automation"]},
            message: "Machines to do things for you.<br>Machines to do things faster than you or any shark."
        },
        {
            unlock: {upgrade: ["farExploration"]},
            message: "This place is not your home. You remember a crystal blue ocean.<br>The chasms beckon."
        },
        {
            unlock: {upgrade: ["gateDiscovery"]},
            message: "The gate beckons. The secret must be unlocked.<br>&nbsp"
        },
        // LATER RUNS
        // INITIAL WORLD STATUSES
        {
            unlock: {world: "chaotic"},
            message: "Overwhelming reinforcements. Overwhelming everything. So hard to focus.<br>&nbsp"
        },
        {
            unlock: {world: "haven"},
            message: "The oceans are rich with life. But it's still not home.<br>&nbsp"
        },
        {
            unlock: {world: "marine"},
            message: "The fish never run dry here. This place feels so familiar.<br>&nbsp"
        },
        {
            unlock: {world: "tempestuous"},
            message: "The storm never ends, and many are lost to its violent throes.<br>&nbsp"
        },
        {
            unlock: {world: "violent"},
            message: "Bursts of plenty from the scorching vents, but so hot.<br>No place for the young."
        },
        {
            unlock: {world: "abandoned"},
            message: "The tar clogs the gills of everyone here.<br>This dying world drags everyone down with it."
        },
        {
            unlock: {world: "shrouded"},
            message: "The crystals are easier to find, but the darkness makes it hard to find anything else.<br>&nbsp"
        },
        {
            unlock: {world: "frigid"},
            message: "So cold. The food supplies freeze quickly here. Too hard to chew.<br>&nbsp"
        },
        // BANKED ESSENCE
        {
            unlock: {resource: {essence: 10}},
            message: "The other sharks obey and respect you, but they seem to fear you.<br>It is not clear if you are truly a shark anymore, or something... else."
        },
        // NEW ANIMALS
        {
            unlock: {resource: {shrimp: 50}},
            message: "The shrimps are tiny, but hard-working.<br>They live for their sponge hives."
        },
        {
            unlock: {resource: {lobster: 20}},
            message: "The lobsters work, but seem carefree.<br>They worry about nothing."
        },
        {
            unlock: {resource: {eel: 10}},
            message: "The eels chatter among their hiding places.<br>They like the sharks."
        },
        {
            unlock: {resource: {dolphin: 5}},
            message: "The dolphin pods that work with us speak of an star-spanning empire of their kind.<br>They ask where our empire is. And they smile."
        },
        {
            unlock: {resource: {octopus: 8}},
            message: "The octopuses speak of production and correct action. They speak of unity through efficiency.<br>They regard us with cold, neutral eyes."
        },
        {
            unlock: {resource: {whale: 1}},
            message: "The whales speak rarely to us, working in silence as they sing to the ocean.<br>What do they sing for?"
        },
        {
            unlock: {resource: {chimaera: 5}},
            message: "The chimaeras are ancient kin of the shark kind, reunited through wild coincidence.<br>What peerless wonders have they found in the dark?"
        },
        // UNIQUE STATUSES
        {
            unlock: {resource: {chorus: 1}},
            message: "The whale song fills you with the same feeling as the gates. But so much smaller.<br>&nbsp"
        },
        // DANGER STATUSES
        {
            unlock: {world: "abandoned", resource: {tar: 20}},
            message: "The tar is killing everything!<br>Maybe a machine can save us?"
        },
        {
            unlock: {world: "abandoned", resource: {tar: 200}},
            message: "Only machines will remain. All is lost.<br><span class='smallDesc'>All is lost.</span>"
        },
        {
            unlock: {world: "frigid", resource: {ice: 50}},
            message: "Something has to be done before the ice destroys us all!<br>Maybe a machine can save us?"
        },
        {
            unlock: {world: "frigid", resource: {ice: 200}},
            message: "So cold. So hungry.<br><span class='smallDesc'>So hopeless.</span>"
        }
    ],

    init: function() {
        var h = SharkGame.Home;

        // rename home tab
        var tabName = SharkGame.WorldTypes[SharkGame.World.worldType].name + " Ocean";
        SharkGame.Home.tabName = tabName;

        // register tab
        SharkGame.Tabs[h.tabId] = {
            id: h.tabId,
            name: h.tabName,
            discovered: h.tabDiscovered,
            code: h
        };
        // populate action discoveries
        $.each(SharkGame.HomeActions, function(actionName, actionData) {
            actionData.discovered = false;
            actionData.newlyDiscovered = false;
        });

        h.currentExtraMessageIndex = -1;
        h.currentButtonTab = "all";
    },

    switchTo: function() {
        var h = SharkGame.Home;
        var content = $('#content');
        var tabMessage = $('<div>').attr("id", "tabMessage");
        content.append(tabMessage);
        h.currentExtraMessageIndex = -1;
        h.updateMessage(true);
        // button tabs
        var buttonTabDiv = $('<div>').attr("id", "homeTabs");
        content.append(buttonTabDiv);
        h.createButtonTabs();
        // help button
        var helpButtonDiv = $('<div>');
        helpButtonDiv.css({margin: "auto", clear: "both"});
        SharkGame.Button.makeButton("helpButton", "&nbsp Toggle descriptions &nbsp", helpButtonDiv, h.toggleHelp).addClass("min-block");
        content.append(helpButtonDiv);
        // button list
        var buttonList = $('<div>').attr("id", "buttonList");
        content.append(buttonList);
        if(SharkGame.Settings.current.buttonDisplayType === "pile") {
            buttonList.addClass("pileArrangement");
        } else {
            buttonList.removeClass("pileArrangement");
        }
        // background art!
        if(SharkGame.Settings.current.showTabImages) {
            tabMessage.css("background-image", "url('" + h.tabBg + "')");
        }
    },

    discoverActions: function() {
        var h = SharkGame.Home;
        $.each(SharkGame.HomeActions, function(actionName, actionData) {
            actionData.discovered = h.areActionPrereqsMet(actionName);
            actionData.newlyDiscovered = false;
        });
    },

    createButtonTabs: function() {
        var buttonTabDiv = $('#homeTabs');
        var buttonTabList = $('<ul>').attr("id", "homeTabsList");
        buttonTabDiv.empty();
        var tabAmount = 0;

        // add a header for each discovered category
        // make it a link if it's not the current tab
        $.each(SharkGame.HomeActionCategories, function(k, v) {
            var onThisTab = (SharkGame.Home.currentButtonTab === k);

            var categoryDiscovered = false;
            if(k === "all") {
                categoryDiscovered = true;
            } else {
                $.each(v.actions, function(_, actionName) {
                    categoryDiscovered = categoryDiscovered || SharkGame.HomeActions[actionName].discovered;
                });
            }

            if(categoryDiscovered) {
                var tabListItem = $('<li>');
                if(onThisTab) {
                    tabListItem.html(v.name);
                } else {
                    tabListItem.append($('<a>')
                            .attr("id", "buttonTab-" + k)
                            .attr("href", "javascript:;")
                            .html(v.name)
                            .click(function() {
                                var tab = ($(this).attr("id")).split("-")[1];
                                SharkGame.Home.changeButtonTab(tab);
                            })
                    );
                    if(v.hasNewItem) {
                        tabListItem.addClass("newItemAdded");
                    }
                }
                buttonTabList.append(tabListItem);
                tabAmount++;
            }
        });
        // finally at the very end just throw the damn list away if it only has two options
        // "all" + another category is completely pointless
        if(tabAmount > 2) {
            buttonTabDiv.append(buttonTabList);
        }
    },

    updateTab: function(tabToUpdate) {
        // return if we're looking at all buttons, no change there
        if(SharkGame.Home.currentButtonTab === "all") {
            return;
        }
        SharkGame.HomeActionCategories[tabToUpdate].hasNewItem = true;
        var tabItem = $('#buttonTab-' + tabToUpdate);
        if(tabItem.length > 0) {
            tabItem.parent().addClass("newItemAdded");
        } else {
            SharkGame.Home.createButtonTabs();
        }
    },

    changeButtonTab: function(tabToChangeTo) {
        var h = SharkGame.Home;
        SharkGame.HomeActionCategories[tabToChangeTo].hasNewItem = false;
        if(tabToChangeTo === "all") {
            $.each(SharkGame.HomeActionCategories, function(k, v) {
                v.hasNewItem = false;
            })
        }
        h.currentButtonTab = tabToChangeTo;
        $('#buttonList').empty();
        h.createButtonTabs();
    },

    updateMessage: function(suppressAnimation) {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var u = SharkGame.Upgrades;
        var wi = SharkGame.WorldTypes[SharkGame.World.worldType];
        var selectedIndex = h.currentExtraMessageIndex;
        $.each(h.extraMessages, function(i, v) {
            var showThisMessage = true;
            // check if should show this message
            if(v.unlock) {
                if(v.unlock.resource) {
                    $.each(v.unlock.resource, function(k, v) {
                        showThisMessage = showThisMessage && (r.getResource(k) >= v);
                    });
                }
                if(v.unlock.upgrade) {
                    $.each(v.unlock.upgrade, function(i, v) {
                        showThisMessage = showThisMessage && u[v].purchased;
                    });
                }
                if(v.unlock.world) {
                    showThisMessage = showThisMessage && SharkGame.World.worldType === v.unlock.world;
                }
            }
            if(showThisMessage) {
                selectedIndex = i;
            }
        });
        // only edit DOM if necessary
        if(h.currentExtraMessageIndex !== selectedIndex) {
            h.currentExtraMessageIndex = selectedIndex;
            var tabMessage = $('#tabMessage');
            if(SharkGame.Settings.current.showTabImages) {
                var sceneDiv = $('#tabSceneImage');
                if(sceneDiv.size() === 0) {
                    sceneDiv = $('<div>').attr("id", "tabSceneImage");
                }
            }
            var message = "You are a shark in a " + wi.shortDesc + " sea.";
            message += "<br><span id='extraMessage' class='medDesc'>&nbsp<br>&nbsp</span>";
            tabMessage.html(message).prepend(sceneDiv);

            var extraMessageSel = $('#extraMessage');
            if(!suppressAnimation && SharkGame.Settings.current.showAnimations) {
                extraMessageSel.animate({opacity: 0}, 200, function() {
                    var thisSel = $(this);
                    thisSel.animate({opacity: 1}, 200).html(h.extraMessages[selectedIndex].message);
                });
                sceneDiv.animate({opacity: 0}, 500, function() {
                    var thisSel = $(this);
                    if(SharkGame.Settings.current.showTabImages) {
                        SharkGame.changeSprite(SharkGame.spriteHomeEventPath, "homesea-" + (selectedIndex + 1), sceneDiv, "homesea-missing");
                    }
                    thisSel.animate({opacity: 1}, 500);
                });
            } else {
                extraMessageSel.html(h.extraMessages[selectedIndex].message);
                if(SharkGame.Settings.current.showTabImages) {
                    SharkGame.changeSprite(SharkGame.spriteHomeEventPath, "homesea-" + (selectedIndex + 1), sceneDiv, "homesea-missing");
                }
            }
        }
    },

    update: function() {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var w = SharkGame.World;


        // for each button entry in the home tab,
        $.each(SharkGame.HomeActions, function(actionName, actionData) {
            var actionTab = h.getActionCategory(actionName);
            var onTab = (actionTab === h.currentButtonTab) || (h.currentButtonTab === "all");
            if(onTab) {
                var button = $('#' + actionName);
                if(button.length === 0) {
                    if(actionData.discovered || h.areActionPrereqsMet(actionName)) {
                        if(!actionData.discovered) {
                            actionData.discovered = true;
                            actionData.newlyDiscovered = true;
                        }
                        h.addButton(actionName);
                    }
                } else {
                    // button exists
                    h.updateButton(actionName);
                }
            } else {
                if(!actionData.discovered) {
                    if(h.areActionPrereqsMet(actionName)) {
                        actionData.discovered = true;
                        actionData.newlyDiscovered = true;
                        h.updateTab(actionTab);
                    }
                }
            }
        });

        // update home message
        h.updateMessage();
    },

    updateButton: function(actionName) {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var amountToBuy = SharkGame.Settings.current.buyAmount;

        var button = $('#' + actionName);
        var actionData = SharkGame.HomeActions[actionName];

        var amount = amountToBuy;
        var actionCost;
        if(amountToBuy < 0) {
            var max = Math.floor(h.getMax(actionData));
            // convert divisor from a negative number to a positive fraction
            var divisor = 1 / (Math.floor((amountToBuy)) * -1);
            amount = max * divisor;
            amount = Math.floor(amount);
            if(amount < 1) amount = 1;
            actionCost = h.getCost(actionData, amount);
        } else {
            actionCost = h.getCost(actionData, amountToBuy);
        }
        // disable button if resources can't be met
        var enableButton;
        if($.isEmptyObject(actionCost)) {
            enableButton = true; // always enable free buttons
        } else {
            enableButton = r.checkResources(actionCost);
        }

        var label = actionData.name;
        if(!$.isEmptyObject(actionCost) && amount > 1) {
            label += " (" + SharkGame.Main.beautify(amount) + ")";
        }

        // check for any infinite quantities
        var infinitePrice = false;
        _.each(actionCost, function(num) {
            if(num === Number.POSITIVE_INFINITY) {
                infinitePrice = true;
            }
        });
        if(infinitePrice) {
            label += "<br>Maxed out";
        } else {
            var costText = r.resourceListToString(actionCost, !enableButton);
            if(costText != "") {
                label += "<br>Cost: " + costText;
            }
        }

        if(SharkGame.Settings.current.showTabHelp) {
            if(actionData.helpText) {
                label += "<br><span class='medDesc'>" + actionData.helpText + "</span>";
            }
        }
        button.prop("disabled", !enableButton)
        button.html(label);


        var spritename = "actions/" + actionName;
        if(SharkGame.Settings.current.iconPositions !== "off") {
            var iconDiv = SharkGame.changeSprite(SharkGame.spriteIconPath, spritename, null, "general/missing-action");
            if(iconDiv) {
                iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                if(!enableButton) {
                    button.prepend($('<div>').append(iconDiv).addClass("tint"));
                } else {
                    button.prepend(iconDiv);
                }
            }
        }
    },

    areActionPrereqsMet: function(actionName) {
        var r = SharkGame.Resources;
        var w = SharkGame.World;
        var prereqsMet = true; // assume true until proven false
        var action = SharkGame.HomeActions[actionName];
        // check resource prerequisites
        if(action.prereq.resource) {
            prereqsMet = prereqsMet && r.checkResources(action.prereq.resource, true);
        }
        // check if resource cost exists
        if(action.cost) {
            $.each(action.cost, function(i, v) {
                var costResource = v.resource;
                prereqsMet = prereqsMet && w.doesResourceExist(costResource);
            })
        }
        // check special worldtype prereqs
        if(action.prereq.world) {
            prereqsMet = prereqsMet && w.worldType === action.prereq.world;
        }
        // check upgrade prerequisites
        if(action.prereq.upgrade) {
            $.each(action.prereq.upgrade, function(_, v) {
                prereqsMet = prereqsMet && SharkGame.Upgrades[v].purchased;
            });
        }
        // check if resulting resource exists
        if(action.effect.resource) {
            $.each(action.effect.resource, function(k, v) {
                prereqsMet = prereqsMet && w.doesResourceExist(k);
            })
        }
        return prereqsMet;
    },

    addButton: function(actionName) {
        var h = SharkGame.Home;
        var buttonListSel = $('#buttonList');
        var actionData = SharkGame.HomeActions[actionName];

        var buttonSelector = SharkGame.Button.makeButton(actionName, actionData.name, buttonListSel, h.onHomeButton);
        h.updateButton(actionName);
        if(SharkGame.Settings.current.showAnimations) {
            buttonSelector.hide()
                .css("opacity", 0)
                .slideDown(50)
                .animate({opacity: 1.0}, 50);
        }
        if(actionData.newlyDiscovered) {
            buttonSelector.addClass("newlyDiscovered");
        }
    },

    getActionCategory: function(actionName) {
        var categoryName = "";
        $.each(SharkGame.HomeActionCategories, function(categoryKey, categoryValue) {
            if(categoryName !== "") {
                return;
            }
            $.each(categoryValue.actions, function(k, v) {
                if(categoryName !== "") {
                    return;
                }
                if(actionName == v) {
                    categoryName = categoryKey;
                }
            });
        });
        return categoryName;
    },

    onHomeButton: function() {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var amountToBuy = SharkGame.Settings.current.buyAmount;
        // get related entry in home button table
        var button = $(this);
        var buttonName = button.attr("id");
        var action = SharkGame.HomeActions[buttonName];
        var actionCost = {};
        var amount = 0;
        if(amountToBuy < 0) {
            // unlimited mode, calculate the highest we can go
            var max = h.getMax(action);
            // floor max
            max = Math.floor(max);
            if(max > 0) {
                // convert divisor from a negative number to a positive fraction
                var divisor = 1 / (Math.floor((amountToBuy)) * -1);
                amount = max * divisor;
                // floor amount
                amount = Math.floor(amount);
                // make it worth entering this function
                if(amount < 1) amount = 1;
                actionCost = h.getCost(action, amount);
            }
        } else {
            actionCost = h.getCost(action, amountToBuy);
            amount = amountToBuy;
        }

        if($.isEmptyObject(actionCost)) {
            // free action
            // do not repeat or check for costs
            if(action.effect.resource) {
                r.changeManyResources(action.effect.resource);
            }
            SharkGame.Log.addMessage(SharkGame.choose(action.outcomes));
        } else if(amount > 0) {
            // cost action
            // check cost, only proceed if sufficient resources (prevention against lazy cheating, god, at least cheat in the right resources)
            if(r.checkResources(actionCost)) {
                // take cost
                r.changeManyResources(actionCost, true);
                // execute effects
                if(action.effect.resource) {
                    var resourceChange;
                    if(amount !== 1) {
                        resourceChange = r.scaleResourceList(action.effect.resource, amount);
                    } else {
                        resourceChange = action.effect.resource;
                    }
                    r.changeManyResources(resourceChange);
                }
                // print outcome to log
                if(!(action.multiOutcomes) || (amount == 1)) {
                    SharkGame.Log.addMessage(SharkGame.choose(action.outcomes));
                } else {
                    SharkGame.Log.addMessage(SharkGame.choose(action.multiOutcomes));
                }
            } else {
                SharkGame.Log.addMessage("You can't afford that!");
            }
        }
        if(button.hasClass("newlyDiscovered")) {
            action.newlyDiscovered = false;
            button.removeClass("newlyDiscovered");
        }
        // disable button until next frame
        button.prop("disabled", true);
    },

    getCost: function(action, amount) {
        var calcCost = {};
        var rawCost = action.cost;

        $.each(rawCost, function(i, v) {
            var resource = SharkGame.PlayerResources[action.max];
            var currAmount = resource.amount;
            if(resource.jobs) {
                $.each(resource.jobs, function(_, v) {
                    currAmount += SharkGame.Resources.getResource(v);
                });
            }
            var costFunction = v.costFunction;
            var k = v.priceIncrease;
            var cost = 0;
            switch(costFunction) {
                case "constant":
                    cost = SharkGame.MathUtil.constantCost(currAmount, currAmount + amount, k);
                    break;
                case "linear":
                    cost = SharkGame.MathUtil.linearCost(currAmount, currAmount + amount, k);
                    break;
                case "unique":
                    cost = SharkGame.MathUtil.uniqueCost(currAmount, currAmount + amount, k);
                    break;
            }
            calcCost[v.resource] = cost;
        });
        return calcCost;
    },


    getMax: function(action) {
        var max = 1;
        if(action.max) {
            var resource = SharkGame.PlayerResources[action.max];
            var currAmount = resource.amount;
            if(resource.jobs) {
                $.each(resource.jobs, function(_, v) {
                    currAmount += SharkGame.Resources.getResource(v);
                });
            }
            max = Number.MAX_VALUE;
            var rawCost = action.cost;
            $.each(rawCost, function(_, v) {
                var costResource = SharkGame.PlayerResources[v.resource];

                var costFunction = v.costFunction;
                var k = v.priceIncrease;
                var subMax = -1;
                switch(costFunction) {
                    case "constant":
                        subMax = SharkGame.MathUtil.constantMax(currAmount, costResource.amount, k) - currAmount;
                        break;
                    case "linear":
                        subMax = SharkGame.MathUtil.linearMax(currAmount, costResource.amount, k) - currAmount;
                        break;
                    case "unique":
                        subMax = SharkGame.MathUtil.uniqueMax(currAmount, costResource.amount, k) - currAmount;
                        break;
                }
                max = Math.min(max, subMax);
            });
        }
        return Math.floor(max);
    },

    toggleHelp: function() {
        SharkGame.Settings.current.showTabHelp = !SharkGame.Settings.current.showTabHelp;
    }
};