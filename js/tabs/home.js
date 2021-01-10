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
            message: "&nbsp<br>&nbsp",
        },
        {
            unlock: { resource: { fish: 5 } },
            message: "You attract the attention of a shark. Maybe they can help you catch fish!<br>&nbsp",
        },
        {
            unlock: { resource: { shark: 1 } },
            message: "More sharks swim over, curious and watchful.<br>&nbsp",
        },
        {
            unlock: { resource: { fish: 15 } },
            message: "Some rays drift over.<br>&nbsp",
        },
        {
            unlock: { resource: { shark: 1, ray: 1 } },
            message: "You have quite the group going now.<br>&nbsp",
        },
        {
            unlock: { resource: { shark: 4, ray: 4 } },
            message: "Some curious crabs come over.<br>&nbsp",
        },
        {
            unlock: { resource: { shark: 1, ray: 1, crab: 1 } },
            message: "Your new tribe is at your command!<br>&nbsp",
        },
        {
            unlock: { resource: { shark: 1, crystal: 10 } },
            message: "The crystals are shiny. Some sharks stare at them curiously.<br>&nbsp",
        },
        {
            unlock: { resource: { scientist: 1 } },
            message: "The science sharks swim in their own school.<br>&nbsp",
        },
        {
            unlock: { upgrade: ["crystalContainer"] },
            message: "More discoveries are needed.<br>&nbsp",
        },
        {
            unlock: { resource: { nurse: 1 } },
            message: "The shark community grows with time.<br>&nbsp",
        },
        {
            unlock: { upgrade: ["exploration"] },
            message: "You hear faint songs and cries in the distance.<br>&nbsp",
        },
        {
            unlock: { upgrade: ["automation"] },
            message: "Machines to do things for you.<br>Machines to do things faster than you or any shark.",
        },
        {
            unlock: { upgrade: ["farExploration"] },
            message: "This place is not your home. You remember a crystal blue ocean.<br>The chasms beckon.",
        },
        {
            unlock: { upgrade: ["gateDiscovery"] },
            message: "The gate beckons. The secret must be unlocked.<br>&nbsp",
        },
        // LATER RUNS
        // INITIAL WORLD STATUSES
        {
            unlock: { world: "chaotic" },
            message: "Overwhelming reinforcements. Overwhelming everything. So hard to focus.<br>&nbsp",
        },
        {
            unlock: { world: "haven" },
            message: "The oceans are rich with life. But it's still not home.<br>&nbsp",
        },
        {
            unlock: { world: "marine" },
            message: "The fish never run dry here. This place feels so familiar.<br>&nbsp",
        },
        {
            unlock: { world: "tempestuous" },
            message: "The storm never ends, and many are lost to its violent throes.<br>&nbsp",
        },
        {
            unlock: { world: "violent" },
            message: "Bursts of plenty from the scorching vents, but so hot.<br>No place for the young.",
        },
        {
            unlock: { world: "abandoned" },
            message: "The tar clogs the gills of everyone here.<br>This dying world drags everyone down with it.",
        },
        {
            unlock: { world: "shrouded" },
            message: "The crystals are easier to find, but the darkness makes it hard to find anything else.<br>&nbsp",
        },
        {
            unlock: { world: "frigid" },
            message: "So cold. Hard to move. Hard to do things.<br>&nbsp",
        },

        // BANKED ESSENCE
        {
            unlock: { resource: { essence: 10 } },
            message:
                "The other sharks obey and respect you, but they seem to fear you.<br>It is not clear if you are truly a shark anymore, or something... else.",
        },
        // NEW ANIMALS
        {
            unlock: { resource: { shrimp: 50 } },
            message: "The shrimps are tiny, but hard-working.<br>They live for their sponge hives.",
        },
        {
            unlock: { resource: { lobster: 20 } },
            message: "The lobsters work, but seem carefree.<br>They worry about nothing.",
        },
        {
            unlock: { resource: { eel: 10 } },
            message: "The eels chatter among their hiding places.<br>They like the sharks.",
        },
        {
            unlock: { resource: { dolphin: 5 } },
            message:
                "The dolphin pods that work with us speak of an star-spanning empire of their kind.<br>They ask where our empire is. And they smile.",
        },
        {
            unlock: { resource: { octopus: 8 } },
            message:
                "The octopuses speak of production and correct action. They speak of unity through efficiency.<br>They regard us with cold, neutral eyes.",
        },
        {
            unlock: { resource: { whale: 1 } },
            message:
                "The whales speak rarely to us, working in silence as they sing to the ocean.<br>What do they sing for?",
        },
        {
            unlock: { resource: { chimaera: 5 } },
            message:
                "The chimaeras are ancient kin of the shark kind, reunited through wild coincidence.<br>What peerless wonders have they found in the dark?",
        },
        // UNIQUE STATUSES
        {
            unlock: { resource: { chorus: 1 } },
            message: "The whale song fills you with the same feeling as the gates. But so much smaller.<br>&nbsp",
        },
        // DANGER STATUSES
        {
            unlock: { world: "abandoned", resource: { tar: 20 } },
            message: "The tar clogging the machines and killing everything!<br>Maybe a different machine can save us?",
        },
        {
            unlock: { world: "abandoned", resource: { tar: 200 } },
            message: "Only machines will remain. All is lost.<br><span class='smallDesc'>All is lost.</span>",
        },
        {
            unlock: { world: "frigid", resource: { ice: 50 } },
            message: "Something has to be done before the ice destroys us all!<br>Maybe a machine can save us?",
        },
        {
            unlock: { world: "frigid", resource: { ice: 250 } },
            message: "So cold. So hungry.<br><span class='smallDesc'>So hopeless.</span>",
        },
        /* {
            unlock: { world: "ethereal" },
            message: "The water glows strangely.<br>It feels familiar.",
        },
        {
            unlock: { world: "stone" },
            message:
                "The cold, jagged seafloor looks ancient, yet pristine.<br>Sponges thrive in great numbers on the rocks.",
        }, */
    ],

    init() {
        const h = SharkGame.Home;

        // rename home tab
        const tabName = SharkGame.WorldTypes[SharkGame.World.worldType].name + " Ocean";
        SharkGame.Home.tabName = tabName;

        // register tab
        SharkGame.Tabs[h.tabId] = {
            id: h.tabId,
            name: h.tabName,
            discovered: h.tabDiscovered,
            code: h,
        };
        // populate action discoveries (and reset removals)
        $.each(SharkGame.HomeActions, (actionName, actionData) => {
            actionData.discovered = false;
            actionData.newlyDiscovered = false;
            actionData.isRemoved = false;
        });

        h.currentExtraMessageIndex = -1;
        h.currentButtonTab = "all";
    },

    switchTo() {
        const h = SharkGame.Home;
        const content = $("#content");
        const tabMessage = $("<div>").attr("id", "tabMessage");
        content.append(tabMessage);
        h.currentExtraMessageIndex = -1;
        h.updateMessage(true);
        // button tabs
        const buttonTabDiv = $("<div>").attr("id", "homeTabs");
        content.append(buttonTabDiv);
        h.createButtonTabs();
        // help button
        const helpButtonDiv = $("<div>");
        helpButtonDiv.css({ margin: "auto", clear: "both" });
        SharkGame.Button.makeButton(
            "helpButton",
            "&nbsp Toggle hover descriptions &nbsp",
            helpButtonDiv,
            h.toggleHelp
        ).addClass("min-block");
        content.append(helpButtonDiv);
        // button list
        const buttonList = $("<div>").attr("id", "buttonList");
        content.append(buttonList);
        if (SharkGame.Settings.current.buttonDisplayType === "pile") {
            buttonList.addClass("pileArrangement");
        } else {
            buttonList.removeClass("pileArrangement");
        }
        // background art!
        if (SharkGame.Settings.current.showTabImages) {
            tabMessage.css("background-image", "url('" + h.tabBg + "')");
        }
    },

    discoverActions() {
        const h = SharkGame.Home;
        $.each(SharkGame.HomeActions, (actionName, actionData) => {
            actionData.discovered = h.areActionPrereqsMet(actionName);
            actionData.newlyDiscovered = false;
        });
    },

    createButtonTabs() {
        const buttonTabDiv = $("#homeTabs");
        const buttonTabList = $("<ul>").attr("id", "homeTabsList");
        buttonTabDiv.empty();
        let tabAmount = 0;

        // add a header for each discovered category
        // make it a link if it's not the current tab
        $.each(SharkGame.HomeActionCategories, (k, v) => {
            const onThisTab = SharkGame.Home.currentButtonTab === k;

            let categoryDiscovered = false;
            if (k === "all") {
                categoryDiscovered = true;
            } else {
                $.each(v.actions, (_, actionName) => {
                    categoryDiscovered = categoryDiscovered || SharkGame.HomeActions[actionName].discovered;
                });
            }

            if (categoryDiscovered) {
                const tabListItem = $("<li>");
                if (onThisTab) {
                    tabListItem.html(v.name);
                } else {
                    tabListItem.append(
                        $("<a>")
                            .attr("id", "buttonTab-" + k)
                            .attr("href", "javascript:;")
                            .html(v.name)
                            .on("click", function callback() {
                                const tab = $(this).attr("id").split("-")[1];
                                SharkGame.Home.changeButtonTab(tab);
                            })
                    );
                    if (v.hasNewItem) {
                        tabListItem.addClass("newItemAdded");
                    }
                }
                buttonTabList.append(tabListItem);
                tabAmount++;
            }
        });
        // finally at the very end just throw the damn list away if it only has two options
        // "all" + another category is completely pointless
        if (tabAmount > 2) {
            buttonTabDiv.append(buttonTabList);
        }
    },

    updateTab(tabToUpdate) {
        // return if we're looking at all buttons, no change there
        if (SharkGame.Home.currentButtonTab === "all") {
            return;
        }
        SharkGame.HomeActionCategories[tabToUpdate].hasNewItem = true;
        const tabItem = $("#buttonTab-" + tabToUpdate);
        if (tabItem.length > 0) {
            tabItem.parent().addClass("newItemAdded");
        } else {
            SharkGame.Home.createButtonTabs();
        }
    },

    changeButtonTab(tabToChangeTo) {
        const h = SharkGame.Home;
        SharkGame.HomeActionCategories[tabToChangeTo].hasNewItem = false;
        if (tabToChangeTo === "all") {
            $.each(SharkGame.HomeActionCategories, (k, v) => {
                v.hasNewItem = false;
            });
        }
        h.currentButtonTab = tabToChangeTo;
        $("#buttonList").empty();
        h.createButtonTabs();
    },

    updateMessage(suppressAnimation) {
        const h = SharkGame.Home;
        const r = SharkGame.Resources;
        const u = SharkGame.Upgrades.getUpgradeTable();
        const wi = SharkGame.WorldTypes[SharkGame.World.worldType];
        let selectedIndex = h.currentExtraMessageIndex;
        $.each(h.extraMessages, (messageIndex, extraMessage) => {
            let showThisMessage = true;
            // check if should show this message
            if (extraMessage.unlock) {
                if (extraMessage.unlock.resource) {
                    $.each(extraMessage.unlock.resource, (key, resource) => {
                        showThisMessage = showThisMessage && r.getResource(key) >= resource;
                    });
                }
                if (extraMessage.unlock.upgrade) {
                    $.each(extraMessage.unlock.upgrade, (i, upgrade) => {
                        showThisMessage = showThisMessage && u[upgrade].purchased;
                    });
                }
                if (extraMessage.unlock.world) {
                    showThisMessage = showThisMessage && SharkGame.World.worldType === extraMessage.unlock.world;
                }
            }
            if (showThisMessage) {
                selectedIndex = messageIndex;
            }
        });
        // only edit DOM if necessary
        if (h.currentExtraMessageIndex !== selectedIndex) {
            h.currentExtraMessageIndex = selectedIndex;
            const tabMessage = $("#tabMessage");
            let sceneDiv;
            if (SharkGame.Settings.current.showTabImages) {
                sceneDiv = $("#tabSceneImage");
                if (sceneDiv.size() === 0) {
                    sceneDiv = $("<div>").attr("id", "tabSceneImage");
                }
            }
            let message = "You are a shark in a " + wi.shortDesc + " sea.";
            message += "<br><span id='extraMessage' class='medDesc'>&nbsp<br>&nbsp</span>";
            tabMessage.html(message).prepend(sceneDiv);

            const extraMessageSel = $("#extraMessage");
            if (!suppressAnimation && SharkGame.Settings.current.showAnimations) {
                extraMessageSel.animate({ opacity: 0 }, 200, () => {
                    $(extraMessageSel).animate({ opacity: 1 }, 200).html(h.extraMessages[selectedIndex].message);
                });
                sceneDiv.animate({ opacity: 0 }, 500, () => {
                    if (SharkGame.Settings.current.showTabImages) {
                        SharkGame.changeSprite(
                            SharkGame.spriteHomeEventPath,
                            "homesea-" + (selectedIndex + 1),
                            sceneDiv,
                            "homesea-missing"
                        );
                    }
                    $(sceneDiv).animate({ opacity: 1 }, 500);
                });
            } else {
                extraMessageSel.html(h.extraMessages[selectedIndex].message);
                if (SharkGame.Settings.current.showTabImages) {
                    SharkGame.changeSprite(
                        SharkGame.spriteHomeEventPath,
                        "homesea-" + (selectedIndex + 1),
                        sceneDiv,
                        "homesea-missing"
                    );
                }
            }
        }
    },

    update() {
        const h = SharkGame.Home;
        const r = SharkGame.Resources;
        const w = SharkGame.World;

        // for each button entry in the home tab,
        $.each(SharkGame.HomeActions, (actionName, actionData) => {
            const actionTab = h.getActionCategory(actionName);
            const onTab = actionTab === h.currentButtonTab || h.currentButtonTab === "all";
            if (onTab && !actionData.isRemoved) {
                const button = $("#" + actionName);
                if (button.length === 0) {
                    if (actionData.discovered || h.areActionPrereqsMet(actionName)) {
                        if (!actionData.discovered) {
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
                if (!actionData.discovered) {
                    if (h.areActionPrereqsMet(actionName)) {
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

    updateButton(actionName) {
        const h = SharkGame.Home;
        const r = SharkGame.Resources;
        const amountToBuy = SharkGame.Settings.current.buyAmount;

        const button = $("#" + actionName);
        const actionData = SharkGame.HomeActions[actionName];

        if (actionData.removedBy) {
            if (SharkGame.Home.shouldRemoveHomeButton(actionData)) {
                button.remove();
                actionData.isRemoved = true;
                actionData.discovered = true;
                return;
            }
        }
        let amount = amountToBuy;
        let actionCost;
        if (amountToBuy < 0) {
            const max = Math.floor(h.getMax(actionData));
            // convert divisor from a negative number to a positive fraction
            const divisor = 1 / (Math.floor(amountToBuy) * -1);
            amount = max * divisor;
            amount = Math.floor(amount);
            if (amount < 1) amount = 1;
            actionCost = h.getCost(actionData, amount);
        } else {
            actionCost = h.getCost(actionData, amountToBuy);
        }
        // disable button if resources can't be met
        let enableButton;
        if ($.isEmptyObject(actionCost)) {
            enableButton = true; // always enable free buttons
        } else {
            enableButton = r.checkResources(actionCost);
        }

        let label = actionData.name;
        if (!$.isEmptyObject(actionCost) && amount > 1) {
            label += " (" + SharkGame.Main.beautify(amount) + ")";
        }

        // check for any infinite quantities
        let infinitePrice = false;
        _.each(actionCost, (num) => {
            if (num === Number.POSITIVE_INFINITY) {
                infinitePrice = true;
            }
        });
        if (infinitePrice) {
            label += "<br>Maxed out";
        } else {
            const costText = r.resourceListToString(actionCost, !enableButton);
            if (costText !== "") {
                label += "<br>Cost: " + costText;
            }
        }

        button.prop("disabled", !enableButton);
        button.html(label);

        const spritename = "actions/" + actionName;
        if (SharkGame.Settings.current.iconPositions !== "off") {
            const iconDiv = SharkGame.changeSprite(
                SharkGame.spriteIconPath,
                spritename,
                null,
                "general/missing-action"
            );
            if (iconDiv) {
                iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                if (!enableButton) {
                    button.prepend($("<div>").append(iconDiv).addClass("tint"));
                } else {
                    button.prepend(iconDiv);
                }
            }
        }
    },

    areActionPrereqsMet(actionName) {
        const r = SharkGame.Resources;
        const w = SharkGame.World;
        let prereqsMet = true; // assume true until proven false
        const action = SharkGame.HomeActions[actionName];
        // check to see if this action should be forcibly removed
        if (action.removedBy) {
            prereqsMet = !SharkGame.Home.shouldRemoveHomeButton(action);
        }
        // check resource prerequisites
        if (action.prereq.resource) {
            prereqsMet = prereqsMet && r.checkResources(action.prereq.resource, true);
        }
        // check if resource cost exists
        if (action.cost) {
            $.each(action.cost, (i, v) => {
                const costResource = v.resource;
                prereqsMet = prereqsMet && w.doesResourceExist(costResource);
            });
        }
        // check special worldtype prereqs
        if (action.prereq.world) {
            prereqsMet = prereqsMet && w.worldType === action.prereq.world;
        }

        // check the special worldtype exclusions
        if (action.prereq.notWorlds) {
            prereqsMet = prereqsMet && !action.prereq.notWorlds.includes(w.worldType);
        }

        const ups = SharkGame.Upgrades.getUpgradeTable();

        // check upgrade prerequisites
        if (action.prereq.upgrade) {
            $.each(action.prereq.upgrade, (_, v) => {
                if (ups[v]) {
                    prereqsMet = prereqsMet && ups[v].purchased;
                } else {
                    prereqsMet = false;
                }
            });
        }
        // check if resulting resource exists
        if (action.effect.resource) {
            $.each(action.effect.resource, (k, v) => {
                prereqsMet = prereqsMet && w.doesResourceExist(k);
            });
        }
        return prereqsMet;
    },
    
    shouldRemoveHomeButton(action){
        let disable = false;
        $.each(action.removedBy, (kind, by) => {
            switch (kind) {
                case "otherActions":
                    $.each(by, (k, v) => {
                        disable = disable || areActionPrereqsMet(v);
                    });
                    break;
                case "upgrades":
                    $.each(by, (k, v) => {
                        disable = disable || SharkGame.Upgrades.getUpgradeTable()[v].purchased;
                    });
                    break;
            }
        });
        return disable;
    },

    addButton(actionName) {
        const h = SharkGame.Home;
        const buttonListSel = $("#buttonList");
        const actionData = SharkGame.HomeActions[actionName];

        const buttonSelector = SharkGame.Button.makeHoverscriptButton(actionName, actionData.name, buttonListSel, h.onHomeButton, h.onHomeHover, h.onHomeUnhover);
        h.updateButton(actionName);
        if (SharkGame.Settings.current.showAnimations) {
            buttonSelector.hide().css("opacity", 0).slideDown(50).animate({ opacity: 1.0 }, 50);
        }
        if (actionData.newlyDiscovered) {
            buttonSelector.addClass("newlyDiscovered");
        }
    },

    getActionCategory(actionName) {
        let categoryName = "";
        $.each(SharkGame.HomeActionCategories, (categoryKey, categoryValue) => {
            if (categoryName !== "") {
                return;
            }
            $.each(categoryValue.actions, (k, v) => {
                if (categoryName !== "") {
                    return;
                }
                if (actionName === v) {
                    categoryName = categoryKey;
                }
            });
        });
        return categoryName;
    },

    onHomeButton() {
        const h = SharkGame.Home;
        const r = SharkGame.Resources;
        const amountToBuy = SharkGame.Settings.current.buyAmount;
        // get related entry in home button table
        const button = $(this);
        const buttonName = button.attr("id");
        const action = SharkGame.HomeActions[buttonName];
        let actionCost = {};
        let amount = 0;
        if (amountToBuy < 0) {
            // unlimited mode, calculate the highest we can go
            let max = h.getMax(action);
            // floor max
            max = Math.floor(max);
            if (max > 0) {
                // convert divisor from a negative number to a positive fraction
                const divisor = 1 / (Math.floor(amountToBuy) * -1);
                amount = max * divisor;
                // floor amount
                amount = Math.floor(amount);
                // make it worth entering this function
                if (amount < 1) amount = 1;
                actionCost = h.getCost(action, amount);
            }
        } else {
            actionCost = h.getCost(action, amountToBuy);
            amount = amountToBuy;
        }

        if ($.isEmptyObject(actionCost)) {
            // free action
            // do not repeat or check for costs
            if (action.effect.resource) {
                r.changeManyResources(action.effect.resource);
            }
            SharkGame.Log.addMessage(SharkGame.choose(action.outcomes));
        } else if (amount > 0) {
            // cost action
            // check cost, only proceed if sufficient resources (prevention against lazy cheating, god, at least cheat in the right resources)
            if (r.checkResources(actionCost)) {
                // take cost
                r.changeManyResources(actionCost, true);
                // execute effects
                if (action.effect.resource) {
                    let resourceChange;
                    if (amount !== 1) {
                        resourceChange = r.scaleResourceList(action.effect.resource, amount);
                    } else {
                        resourceChange = action.effect.resource;
                    }
                    r.changeManyResources(resourceChange);
                }
                // print outcome to log
                if (!action.multiOutcomes || amount === 1) {
                    SharkGame.Log.addMessage(SharkGame.choose(action.outcomes));
                } else {
                    SharkGame.Log.addMessage(SharkGame.choose(action.multiOutcomes));
                }
            } else {
                SharkGame.Log.addMessage("You can't afford that!");
            }
        }
        if (button.hasClass("newlyDiscovered")) {
            action.newlyDiscovered = false;
            button.removeClass("newlyDiscovered");
        }
        // disable button until next frame
        button.prop("disabled", true);
    },
    
    onHomeHover() {
        if (!SharkGame.Settings.current.showTabHelp) {
            return;
        }
        const button = $(this);
        const actionName = button.attr("id");
        const effects = SharkGame.HomeActions[actionName].effect;
        let validGenerators = {};
        if (effects.resource) {
            $.each(effects.resource, (resource, amount) => {
                if (SharkGame.ResourceMap.get(resource).income) {
                    $.each(SharkGame.ResourceMap.get(resource).income, (incomeResource, income) => {
                        const generatedAmount = SharkGame.Resources.arbitraryProductAmountFromGeneratorResource(resource, incomeResource, 1);
                        if (generatedAmount !== 0 && SharkGame.World.doesResourceExist(incomeResource)) {
                            validGenerators[incomeResource] = generatedAmount;
                        }
                    });
                }
            });
        }

        let appendedProduce = false;
        let appendedConsume = false;
        let text = "";

        $.each(validGenerators, (incomeResource, amount) => {
            if (amount > 0) {
                if (!appendedProduce) {
                    appendedProduce = true;
                    text += "<span class='littleTooltipText'>PRODUCES</span>";
                }
                text += "<br/>" + SharkGame.Main.beautifyIncome(amount, " " + SharkGame.Resources.getResourceName(incomeResource)).bold();
            }
        });

        $.each(validGenerators, (incomeResource, amount) => {
            if (amount < 0) {
                if (!appendedConsume) {
                    appendedConsume = true;
                    if (!appendedProduce) {
                        text += "<span class='littleTooltipText'>CONSUMES</span>";
                    } else {
                        text += "<br/> <span class='littleTooltipText'>CONSUMES</span>";
                    }
                }
                text += "<br/>" + SharkGame.Main.beautifyIncome(-amount, " " + SharkGame.Resources.getResourceName(incomeResource)).bold();
            }
        });

        if (SharkGame.HomeActions[actionName].helpText) {
            if (text !== "") {
                text += "<br><span class='medDesc'>" + SharkGame.HomeActions[actionName].helpText + "</span>";
            } else {
                text += "<span class='medDesc'>" + SharkGame.HomeActions[actionName].helpText + "</span>";
            }
        }

        if (text !== "") {
            document.getElementById('tooltipbox').style.display = 'block';
            document.getElementById('tooltipbox').innerHTML = text;
        }
    },
    
    onHomeUnhover() {
        document.getElementById('tooltipbox').style.display = 'none';
        document.getElementById("tooltipbox").innerHTML = "";
    },

    getCost(action, amount) {
        const calcCost = {};
        const rawCost = action.cost;

        $.each(rawCost, (costIndex, costObj) => {
            const resource = SharkGame.PlayerResources.get(action.max);
            let currAmount = resource.amount;
            if (resource.jobs) {
                $.each(resource.jobs, (_, v) => {
                    currAmount += SharkGame.Resources.getResource(v);
                });
            }
            const costFunction = costObj.costFunction;
            const k = costObj.priceIncrease;
            let cost = 0;
            switch (costFunction) {
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
            if (Math.abs(cost - Math.round(cost)) < SharkGame.EPSILON) {
                cost = Math.round(cost);
            }
            calcCost[costObj.resource] = cost;
        });
        return calcCost;
    },

    getMax(action) {
        let max = 1;
        if (action.max) {
            const resource = SharkGame.PlayerResources.get(action.max);
            let currAmount = resource.amount;
            if (resource.jobs) {
                $.each(resource.jobs, (_, v) => {
                    currAmount += SharkGame.Resources.getResource(v);
                });
            }
            max = Number.MAX_VALUE;
            const rawCost = action.cost;
            $.each(rawCost, (_, v) => {
                const costResource = SharkGame.PlayerResources.get(v.resource);

                const costFunction = v.costFunction;
                const k = v.priceIncrease;
                let subMax = -1;
                switch (costFunction) {
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
                if (Math.abs(subMax - Math.round(subMax)) < SharkGame.EPSILON) {
                    subMax = Math.round(subMax);
                }
                max = Math.min(max, subMax);
            });
        }
        return Math.floor(max);
    },

    toggleHelp() {
        SharkGame.Settings.current.showTabHelp = !SharkGame.Settings.current.showTabHelp;
    },
};
