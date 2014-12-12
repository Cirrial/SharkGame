SharkGame.Home = {

    tabId: "home",
    tabDiscovered: true,
    tabName: "Home Sea",
    tabBg: "img/bg/bg-homesea.png",

    homeMessage: "You are a shark in a strange blue sea.",
    currentExtraMessageIndex: -1,

    // Priority: later messages display if available, otherwise earlier ones.
    extraMessages: [
        // FIRST RUN
        {
            message: "&nbsp<br/>&nbsp",
            imageIndex: 1
        },
        {
            unlock: {resource: {fish: 5}},
            message: "You attract the attention of a shark. Maybe they can help you catch fish!<br/>&nbsp",
            imageIndex: 2
        },
        {
            unlock: {resource: {shark: 1}},
            message: "More sharks swim over, curious and watchful.<br/>&nbsp",
            imageIndex: 3
        },
        {
            unlock: {resource: {fish: 15}},
            message: "Some rays drift over.<br/>&nbsp",
            imageIndex: 4
        },
        {
            unlock: {resource: {shark: 1, ray: 1}},
            message: "You have quite the group going now.<br/>&nbsp",
            imageIndex: 5
        },
        {
            unlock: {resource: {shark: 4, ray: 4}},
            message: "Some curious crabs come over.<br/>&nbsp",
            imageIndex: 6
        },
        {
            unlock: {resource: {shark: 1, ray: 1, crab: 1}},
            message: "Your new tribe is at your command!<br/>&nbsp",
            imageIndex: 7
        },
        {
            unlock: {resource: {shark: 1, crystal: 10}},
            message: "The crystals are shiny. Some sharks stare at them curiously.<br/>&nbsp",
            imageIndex: 8
        },
        {
            unlock: {resource: {scientist: 1}},
            message: "The science sharks swim in their own school.<br/>&nbsp",
            imageIndex: 9
        },
        {
            unlock: {upgrade: ["crystalContainer"]},
            message: "More discoveries are needed.<br/>&nbsp",
            imageIndex: 10
        },
        {
            unlock: {resource: {nurse: 1}},
            message: "The shark community grows with time.<br/>&nbsp",
            imageIndex: 11
        },
        {
            unlock: {upgrade: ["exploration"]},
            message: "You hear faint songs and cries in the distance.<br/>&nbsp",
            imageIndex: 12
        },
        {
            unlock: {upgrade: ["automation"]},
            message: "Machines to do things for you.<br/>Machines to do things faster than you or any shark.",
            imageIndex: 13
        },
        {
            unlock: {upgrade: ["farExploration"]},
            message: "This place is not your home. You remember a crystal blue ocean.<br/>The chasms beckon.",
            imageIndex: 14
        },
        {
            unlock: {upgrade: ["gateDiscovery"]},
            message: "The gate beckons. The secret must be unlocked.<br/>&nbsp",
            imageIndex: 15
        }
        // LATER RUNS

    ],

    init: function() {
        var h = SharkGame.Home;
        // register tab
        SharkGame.Tabs[h.tabId] = {
            id: h.tabId,
            name: h.tabName,
            discovered: h.tabDiscovered,
            code: h
        };
    },

    switchTo: function() {
        var h = SharkGame.Home;
        var content = $('#content');
        var tabMessage = $('<div>').attr("id", "tabMessage");
        content.append(tabMessage);
        h.currentExtraMessageIndex = -1;
        h.updateMessage(true);
        var helpButtonDiv = $('<div>');
        helpButtonDiv.css({margin: "auto", clear: "both"});
        SharkGame.Button.makeButton("helpButton", "&nbsp Toggle descriptions &nbsp", helpButtonDiv, h.toggleHelp).addClass("min-block");
        content.append(helpButtonDiv);
        content.append($('<div>').attr("id", "buttonList"));
        tabMessage.css("background-image", "url('" + h.tabBg + "')");
    },

    updateMessage: function(suppressAnimation) {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var u = SharkGame.Upgrades;
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
            }
            if(showThisMessage) {
                selectedIndex = i;
            }
        });
        // only edit DOM if necessary
        if(h.currentExtraMessageIndex !== selectedIndex) {
            h.currentExtraMessageIndex = selectedIndex;
            var tabMessage = $('#tabMessage');
            var sceneDiv = $('#tabSceneImage');
            if(sceneDiv.size() === 0) {
                sceneDiv = $('<div>').attr("id", "tabSceneImage");
            }
            var message = h.homeMessage;
            message += "<br/><span id='extraMessage' class='medDesc'>&nbsp<br/>&nbsp</span>";
            tabMessage.html(message).prepend(sceneDiv);

            var extraMessageSel = $('#extraMessage');
            if(!suppressAnimation && SharkGame.Settings.current.showAnimations) {
                extraMessageSel.animate({opacity: 0}, 200, function() {
                    var thisSel = $(this);
                    thisSel.animate({opacity: 1}, 200).html(h.extraMessages[selectedIndex].message);
                });
                sceneDiv.animate({opacity: 0}, 500, function() {
                    var thisSel = $(this);
                    SharkGame.changeSprite("homesea-" + h.extraMessages[selectedIndex].imageIndex, sceneDiv);
                    thisSel.animate({opacity: 1}, 500);
                });
            } else {
                extraMessageSel.html(h.extraMessages[selectedIndex].message);
                SharkGame.changeSprite("homesea-" + h.extraMessages[selectedIndex].imageIndex, sceneDiv);
            }
        }
    },

    update: function() {
        var h = SharkGame.Home;
        var r = SharkGame.Resources;
        var w = SharkGame.World;
        var amountToBuy = SharkGame.Settings.current.buyAmount;

        // cache a selector
        var buttonList = $('#buttonList');

        // for each button entry in the home tab,
        $.each(SharkGame.HomeActions, function(actionName, actionData) {
            // check if a button exists
            var button = $('#' + actionName);
            if(button.length === 0) {
                if(h.areActionPrereqsMet(actionName)) {
                    // a new action that did not have a button has been made possible, time to remake the button list
                    var buttonSelector = SharkGame.Button.makeButton(actionName, actionData.name, buttonList, h.onHomeButton);
                    if(SharkGame.Settings.current.showAnimations) {
                        buttonSelector.hide()
                            .css("opacity", 0)
                            .slideDown(50)
                            .animate({opacity: 1.0}, 50);
                    }
                    //h.remakeButtons();
                }
            } else {
                // button exists
                // disable or enable button based on cost being met
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
                var costText = r.resourceListToString(actionCost, !enableButton);
                if(costText != "") {
                    label += "<br/>Cost: " + costText;
                }
                if(SharkGame.Settings.current.showTabHelp) {
                    if(actionData.helpText) {
                        label += "<br/><span class='medDesc'>" + actionData.helpText + "</span>";
                    }
                }
                button.prop("disabled", !enableButton)
                button.html(label);


                var spritename = "actions/" + actionName;
                if(!enableButton) {
                    spritename += "-disabled";
                }
                if(SharkGame.Settings.current.iconPositions !== "off") {
                    var iconDiv = SharkGame.changeSprite(spritename);
                    if(iconDiv) {
                        iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                        button.prepend(iconDiv);
                    }
                }
            }
        });

        // update home message
        h.updateMessage();
    },

    areActionPrereqsMet: function(actionName) {
        var r = SharkGame.Resources;
        var w = SharkGame.World;
        var prereqsMet = true; // assume true until proven false
        var action = SharkGame.HomeActions[actionName];
        // check resource prerequisites
        if(action.prereq.resource) {
            prereqsMet = prereqsMet && r.checkResources(action.prereq.resource);
        }
        // check if resource cost exists
        if(action.cost) {
            $.each(action.cost, function(i, v) {
                var costResource = v.resource;
                prereqsMet = prereqsMet && w.doesResourceExist(costResource);
            })
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

    remakeButtons: function() {
        var buttonListSel = $('#buttonList');
        buttonListSel.empty();


        // add button
        var buttonSelector = SharkGame.Button.makeButton(key, value.name, buttonList, h.onHomeButton);
        if(SharkGame.Settings.current.showAnimations) {
            buttonSelector.hide()
                .css("opacity", 0)
                .slideDown(50)
                .animate({opacity: 1.0}, 50);
        }
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
            }
            calcCost[v.resource] = cost;
        });
        return calcCost;
    },


    getMax: function(action) {
        var max = -1;
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