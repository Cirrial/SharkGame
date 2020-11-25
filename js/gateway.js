SharkGame.Gateway = {
    NUM_ARTIFACTS_TO_SHOW: 3,
    NUM_PLANETS_TO_SHOW: 3,
    transitioning: false,
    selectedWorld: "",

    allowedWorlds: ["marine", "chaotic", "haven", "tempestuous", "violent", "abandoned", "shrouded", "frigid"],

    completedWorlds: [],

    artifactPool: [],
    planetPool: [],

    init() {
        // initialise artifact levels to 0 if they don't have a level
        // OTHERWISE KEEP THE EXISTING LEVEL
        _.each(SharkGame.Artifacts, (artifactData) => {
            if (!artifactData.level) {
                artifactData.level = 0;
            }
            artifactData.alreadyApplied = false;
        });
    },

    update() {
        const g = SharkGame.Gateway;
        g.updateArtifactButtons();

        const overlay = $("#overlay");
        const docHeight = $(window).height();
        overlay.height(docHeight);
    },

    enterGate(loadingFromSave) {
        const m = SharkGame.Main;
        const g = SharkGame.Gateway;

        // AWARD ESSENCE (and mark world completion)
        let essenceReward = 0;
        if (!loadingFromSave) {
            if (SharkGame.wonGame) {
                essenceReward = 1 + Math.floor(SharkGame.World.planetLevel / 5);
                g.markWorldCompleted(SharkGame.World.worldType);
            } else {
                essenceReward = 0;
            }
            SharkGame.Resources.changeResource("essence", essenceReward);
        }

        // PREPARE ARTIFACTS
        g.prepareArtifactSelection(g.NUM_ARTIFACTS_TO_SHOW);

        // PREPARE PLANETS
        g.preparePlanetSelection(g.NUM_PLANETS_TO_SHOW);

        // SAVE
        SharkGame.Save.saveGame();

        // PREPARE GATEWAY PANE
        // set up classes
        let pane;
        if (!SharkGame.paneGenerated) {
            pane = SharkGame.Main.buildPane();
        } else {
            pane = $("#pane");
        }
        pane.addClass("gateway");

        const overlay = $("#overlay");
        overlay.addClass("gateway");
        const docHeight = $(document).height();

        // make overlay opaque
        overlay.height(docHeight);
        if (SharkGame.Settings.current.showAnimations) {
            overlay
                .show()
                .css("opacity", 0)
                .animate({ opacity: 1.0 }, 1000, "swing", () => {
                    // put back to 4000
                    g.cleanUp();
                    g.showGateway(essenceReward);
                });
        } else {
            overlay.show().css("opacity", 1.0);
            g.cleanUp();
            g.showGateway(essenceReward);
        }
    },

    cleanUp() {
        const m = SharkGame.Main;
        // empty out the game stuff behind
        m.purgeGame();
        // resize overlay
        const docHeight = $(window).height();
        $("#overlay").height(docHeight);
    },

    showGateway(essenceRewarded) {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const g = SharkGame.Gateway;

        // get some useful numbers
        const essenceHeld = r.getResource("essence");
        const numenHeld = r.getResource("numen");

        // construct the gateway content
        const gatewayContent = $("<div>");
        gatewayContent.append($("<p>").html("You are a shark in the space between worlds."));
        if (!SharkGame.wonGame) {
            gatewayContent.append(
                $("<p>")
                    .html("It is not clear how you have ended up here, but you remember a bitter defeat.")
                    .addClass("medDesc")
            );
        }
        gatewayContent.append($("<p>").html("Something unseen says,").addClass("medDesc"));
        gatewayContent.append($("<em>").attr("id", "gatewayVoiceMessage").html(g.getVoiceMessage()));
        if (essenceRewarded > 0) {
            gatewayContent.append(
                $("<p>").html(
                    "Entering this place has changed you, granting you <span class='essenceCount'>" +
                        m.beautify(essenceRewarded) +
                        "</span> essence."
                )
            );
        }
        gatewayContent.append(
            $("<p>").html(
                "You have <span id='essenceHeldDisplay' class='essenceCount'>" +
                    m.beautify(essenceHeld) +
                    "</span> essence."
            )
        );
        if (numenHeld > 0) {
            const numenName = numenHeld > 1 ? "numina" : "numen";
            gatewayContent.append(
                $("<p>").html(
                    "You also have <span class='numenCount'>" +
                        m.beautify(numenHeld) +
                        "</span> " +
                        numenName +
                        ", and you radiate divinity."
                )
            );
        }
        gatewayContent.append($("<p>").attr("id", "gatewayStatusMessage").addClass("medDesc"));

        // show end time
        const endRunInfoDiv = $("<div>");
        g.showRunEndInfo(endRunInfoDiv);
        gatewayContent.append(endRunInfoDiv);

        // add navigation buttons
        const navButtons = $("<div>").addClass("gatewayButtonList");
        SharkGame.Button.makeButton("backToGateway", "artifacts", navButtons, () => {
            g.switchViews(g.showArtifacts);
        });
        SharkGame.Button.makeButton("backToGateway", "worlds", navButtons, () => {
            g.switchViews(g.showPlanets);
        });
        gatewayContent.append(navButtons);

        m.showPane("GATEWAY", gatewayContent, true, 500, true);
        g.transitioning = false;
    },

    showRunEndInfo(containerDiv) {
        const m = SharkGame.Main;
        containerDiv.append(
            $("<p>")
                .html("<em>Time spent within last ocean:</em><br/>")
                .append(m.formatTime(SharkGame.timestampRunEnd - SharkGame.timestampRunStart))
        );
    },

    showArtifacts() {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const g = SharkGame.Gateway;

        const essenceHeld = r.getResource("essence");

        // construct the gateway content
        const gatewayContent = $("<div>");
        gatewayContent.append($("<p>").html("Your will flows into solid shapes beyond your control.<br>Focus."));
        gatewayContent.append(
            $("<p>").html(
                "You have <span id='essenceHeldDisplay' class='essenceCount'>" +
                    m.beautify(essenceHeld) +
                    "</span> essence."
            )
        );
        gatewayContent.append($("<p>").attr("id", "gatewayStatusMessage").addClass("medDesc"));

        // show artifact pool
        if (_.size(g.artifactPool) === 0) {
            // we exhausted the pool (!!!)
            gatewayContent.append(
                $("<p>").append(
                    $("<em>").html(
                        '"You may not have achieved perfection, but it would take a deity to improve your capabilities further."'
                    )
                )
            );
        } else {
            // there's something to show
            const artifactPool = $("<div>").addClass("gatewayButtonList");
            _.each(g.artifactPool, (artifactName) => {
                SharkGame.Button.makeButton("artifact-" + artifactName, artifactName, artifactPool, g.onArtifactButton);
            });
            gatewayContent.append(artifactPool);
            g.updateArtifactButtons();
        }

        // add return to gateway button
        const returnButtonDiv = $("<div>");
        SharkGame.Button.makeButton("backToGateway", "return to gateway", returnButtonDiv, () => {
            g.switchViews(g.showGateway);
        });
        gatewayContent.append(returnButtonDiv);

        m.showPane("ARTIFACTS", gatewayContent, true, 500, true);
        g.transitioning = false;
    },

    showPlanets() {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const g = SharkGame.Gateway;

        // construct the gateway content
        const gatewayContent = $("<div>");
        gatewayContent.append($("<p>").html("Other worlds await."));

        // show planet pool
        const planetPool = $("<div>").addClass("gatewayButtonList");
        _.each(g.planetPool, function callback(planetInfo) {
            SharkGame.Button.makeButton(
                "planet-" + planetInfo.type,
                planetInfo.type + " " + planetInfo.level,
                planetPool,
                function callback() {
                    g.selectedWorld = $(this).attr("id").split("-")[1];
                    g.switchViews(g.confirmWorld);
                }
            ).addClass("planetButton");
        });
        gatewayContent.append(planetPool);

        // add return to gateway button
        const returnButtonDiv = $("<div>");
        SharkGame.Button.makeButton("backToGateway", "return to gateway", returnButtonDiv, () => {
            g.switchViews(g.showGateway);
        });
        gatewayContent.append(returnButtonDiv);

        m.showPane("WORLDS", gatewayContent, true, 500, true);
        g.transitioning = false;
        g.updatePlanetButtons();
    },

    confirmWorld() {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const g = SharkGame.Gateway;

        const selectedWorldData = SharkGame.WorldTypes[g.selectedWorld];
        let planetLevel = 1;
        _.each(g.planetPool, (generatedWorld) => {
            if (generatedWorld.type === g.selectedWorld) {
                planetLevel = generatedWorld.level;
            }
        });

        // construct the gateway content
        const gatewayContent = $("<div>");
        gatewayContent.append($("<p>").html("Travel to the " + selectedWorldData.name + " World?"));

        // add world image
        const spritename = "planets/" + g.selectedWorld;
        const iconDiv = SharkGame.changeSprite(SharkGame.spriteIconPath, spritename, null, "planets/missing");
        if (iconDiv) {
            iconDiv.addClass("planetDisplay");
            const containerDiv = $("<div>").attr("id", "planetContainer");
            containerDiv.append(iconDiv);
            gatewayContent.append(containerDiv);
        }

        const attributeDiv = $("<div>");
        g.showPlanetAttributes(selectedWorldData, planetLevel, attributeDiv);
        gatewayContent.append(attributeDiv);

        // add confirm button
        const confirmButtonDiv = $("<div>");
        SharkGame.Button.makeButton("progress", "proceed", confirmButtonDiv, () => {
            // kick back to main to start up the game again
            SharkGame.World.worldType = g.selectedWorld;
            SharkGame.World.planetLevel = planetLevel;
            SharkGame.Main.loopGame();
        });
        gatewayContent.append(confirmButtonDiv);

        // add return to planets button
        const returnButtonDiv = $("<div>");
        SharkGame.Button.makeButton("backToGateway", "reconsider", returnButtonDiv, () => {
            g.switchViews(g.showPlanets);
        });
        gatewayContent.append(returnButtonDiv);

        m.showPane("CONFIRM", gatewayContent, true, 500, true);
        g.transitioning = false;
    },

    switchViews(callback) {
        const g = SharkGame.Gateway;
        if (!g.transitioning) {
            g.transitioning = true;
            if (SharkGame.Settings.current.showAnimations) {
                $("#pane").animate({ opacity: 0.0 }, 500, "swing", callback);
            } else {
                callback();
            }
        }
    },

    prepareArtifactSelection(numArtifacts) {
        const g = SharkGame.Gateway;
        // empty existing pool
        g.artifactPool = [];

        // create pool of qualified artifacts
        const qualifiedArtifactPool = [];
        $.each(SharkGame.Artifacts, (artifactName, artifactData) => {
            let qualified = false;
            if (artifactData.required) {
                _.each(artifactData.required, (resourceName) => {
                    qualified = qualified || SharkGame.World.doesResourceExist(resourceName);
                });
            } else {
                qualified = true;
            }

            // check max level
            if (artifactData.max) {
                if (artifactData.level >= artifactData.max) {
                    qualified = false;
                }
            }

            if (qualified) {
                qualifiedArtifactPool.push(artifactName);
            }
        });

        // Reduce number of artifacts added to pool to however many we can actually have
        numArtifacts = Math.min(numArtifacts, qualifiedArtifactPool.length);
        // pull random items from the pool
        for (let i = 0; i < numArtifacts; i++) {
            const choice = SharkGame.choose(qualifiedArtifactPool);
            const index = qualifiedArtifactPool.indexOf(choice);
            // take it out of the qualified pool (avoid duplicates)
            qualifiedArtifactPool.splice(index, 1);
            // add choice to pool
            g.artifactPool.push(choice);
        }
    },

    onArtifactButton() {
        const button = $(this);
        const buttonName = button.attr("id");
        const artifactName = buttonName.split("-")[1];
        const artifactData = SharkGame.Artifacts[artifactName];
        const cost = artifactData.cost(artifactData.level);
        const essence = SharkGame.Resources.getResource("essence");
        if (essence >= cost) {
            SharkGame.Resources.changeResource("essence", -cost);
            artifactData.level++;
            const gatewayStatusMessageSel = $("#gatewayStatusMessage");
            if (artifactData.level >= artifactData.max) {
                gatewayStatusMessageSel.html(
                    "You reach the limit of the " + artifactData.name + ". You cannot improve it further."
                );
            } else {
                gatewayStatusMessageSel.html(
                    "Your will crystallises into the " + artifactData.name + ", at power " + artifactData.level + "."
                );
            }
            $("#essenceHeldDisplay").html(SharkGame.Main.beautify(SharkGame.Resources.getResource("essence")));
        }
        // disable button until next frame
        button.prop("disabled", true);
    },

    updateArtifactButtons() {
        const g = SharkGame.Gateway;
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        const essenceHeld = r.getResource("essence");
        _.each(g.artifactPool, (artifactName) => {
            const button = $("#artifact-" + artifactName);
            if (button.length > 0) {
                const artifactData = SharkGame.Artifacts[artifactName];
                const cost = artifactData.cost(artifactData.level);
                const maxedOut = artifactData.level >= artifactData.max;
                let enableButton = true;
                if (essenceHeld < cost || maxedOut) {
                    enableButton = false;
                }
                const purchaseLevel = maxedOut ? "Max" : artifactData.level + 1;
                let label =
                    artifactData.name +
                    "<br><span class='medDesc'>( Pwr <span class='essenceCountBrighter'>" +
                    purchaseLevel +
                    "</span> )</span>" +
                    "<br>" +
                    artifactData.desc +
                    "<br><br><span class='medDesc'>" +
                    artifactData.flavour +
                    "</span><br>";
                if (!maxedOut) {
                    label +=
                        "</span><br>Cost: <span class='essenceCountBrighter'>" + m.beautify(cost) + "</span> essence";
                }
                button.prop("disabled", !enableButton).html(label);

                const spritename = "artifacts/" + artifactName;
                if (SharkGame.Settings.current.iconPositions !== "off") {
                    const iconDiv = SharkGame.changeSprite(
                        SharkGame.spriteIconPath,
                        spritename,
                        null,
                        "general/missing-artifact"
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
            }
        });
    },

    preparePlanetSelection(numPlanets) {
        const g = SharkGame.Gateway;
        // empty existing pool
        g.planetPool = [];

        // create pool of qualified types
        const qualifiedPlanetTypes = g.allowedWorlds.slice(0);

        // pull random types from the pool
        // for each type pulled, generated a random level for the planet
        // then add to the planet pool
        for (let i = 0; i < numPlanets; i++) {
            const choice = SharkGame.choose(qualifiedPlanetTypes);
            const index = qualifiedPlanetTypes.indexOf(choice);
            // take it out of the qualified pool (avoid duplicates)
            qualifiedPlanetTypes.splice(index, 1);

            // generate random level
            const newLevel = Math.floor(Math.max(SharkGame.World.planetLevel + (Math.random() * 10 - 5), 1));

            // add choice to pool
            g.planetPool.push({
                type: choice,
                level: newLevel,
            });
        }
    },

    updatePlanetButtons() {
        const g = SharkGame.Gateway;
        const r = SharkGame.Resources;
        const m = SharkGame.Main;
        _.each(g.planetPool, (planetData) => {
            const buttonSel = $("#planet-" + planetData.type);
            if (buttonSel.length > 0) {
                let planetLevel = 1;
                _.each(g.planetPool, (generatedWorld) => {
                    if (generatedWorld.type === planetData.type) {
                        planetLevel = generatedWorld.level;
                    }
                });
                const deeperPlanetData = SharkGame.WorldTypes[planetData.type];
                const label =
                    deeperPlanetData.name +
                    "<br><span class='medDesc'>( Climate Level " +
                    m.beautify(planetLevel) +
                    " )</span>" +
                    "<br>" +
                    deeperPlanetData.desc;

                buttonSel.html(label);

                const spritename = "planets/" + planetData.type;
                if (SharkGame.Settings.current.iconPositions !== "off") {
                    const iconDiv = SharkGame.changeSprite(
                        SharkGame.spriteIconPath,
                        spritename,
                        null,
                        "planets/missing"
                    );
                    if (iconDiv) {
                        iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                        buttonSel.prepend(iconDiv);
                    }
                }
            }
        });
    },

    applyArtifacts(force) {
        // handle general effects
        // special effects are handled by horrible spaghetti code sprinkled between this, World, and Resources
        $.each(SharkGame.Artifacts, (artifactName, artifactData) => {
            if (artifactData.effect && (!artifactData.alreadyApplied || force)) {
                artifactData.effect(artifactData.level);
                artifactData.alreadyApplied = true;
            }
        });
    },

    getVoiceMessage() {
        let message = "";
        const messagePool = [];
        const allMessages = SharkGame.Gateway.Messages;
        // the point of this function is to add to the message pool all available qualifying messages and then pick one
        const totalEssence = SharkGame.Resources.getTotalResource("essence");
        const lastPlanet = SharkGame.World.worldType;

        // if the game wasn't won, add loss messages
        if (!SharkGame.wonGame) {
            _.each(allMessages.loss, (message) => {
                messagePool.push(message);
            });
        } else {
            // determine which essence based messages should go into the pool
            _.each(allMessages.essenceBased, (v) => {
                let min = 0;
                if (v.min) {
                    min = v.min;
                }
                let max = Number.MAX_VALUE;
                if (v.max) {
                    max = v.max;
                }
                if (totalEssence >= min && totalEssence <= max) {
                    _.each(v.messages, (message) => {
                        messagePool.push(message);
                    });
                }
            });

            // determine which planet based messages should go into the pool
            const planetPool = allMessages.lastPlanetBased[lastPlanet];
            if (planetPool) {
                _.each(planetPool, (message) => {
                    messagePool.push(message);
                });
            }

            // finally just add all the generics into the pool
            _.each(allMessages.generic, (message) => {
                messagePool.push(message);
            });
        }

        message = SharkGame.choose(messagePool);
        return '"' + message + '"';
    },

    // GOD THIS IS A MESS
    // I'M SO SORRY FUTURE ME AND ANYONE ELSE READING THIS

    // jesus christ you better be sorry what the hell is this
    showPlanetAttributes(worldData, planetLevel, contentDiv) {
        // add known attributes
        const knownAttributeMax = SharkGame.Gateway.getMaxWorldQualitiesToShow();
        if (knownAttributeMax > 0) {
            const totalAttributes = _.size(worldData.modifiers);
            contentDiv.append(
                $("<p>").html(
                    "Known modifiers (" +
                        Math.floor(totalAttributes === 0 ? 1 : Math.min(1, knownAttributeMax / totalAttributes) * 100) +
                        "%):"
                )
            );
            const modifierList = $("<ul>").addClass("gatewayPropertyList");
            for (let i = 0; i < Math.min(knownAttributeMax, totalAttributes); i++) {
                const modifier = worldData.modifiers[i];
                const target = modifier.resource;
                let resourceName = "";
                if (SharkGame.Resources.isCategory(target)) {
                    resourceName = SharkGame.ResourceCategories[target].name;
                } else {
                    resourceName = SharkGame.Main.toTitleCase(SharkGame.ResourceMap.get(target).name);
                }
                modifierList.append(
                    $("<li>")
                        .html(
                            SharkGame.WorldModifiers[modifier.modifier].name +
                                " - " +
                                resourceName +
                                " (" +
                                modifier.amount +
                                ")"
                        )
                        .addClass("medDesc")
                );
            }
            contentDiv.append(modifierList);

            // if all modifiers are revealed, carry over to the gate requirements and abandoned resources
            const bonusPoints = knownAttributeMax - totalAttributes;
            if (bonusPoints > 0) {
                const gateSlots = _.size(worldData.gateCosts);
                contentDiv.append(
                    $("<p>").html(
                        "Known gate requirements (" + Math.floor(Math.min(1, bonusPoints / gateSlots) * 100) + "%):"
                    )
                );
                const gateList = $("<ul>").addClass("gatewayPropertyList");
                const gateKeySet = _.keys(worldData.gateCosts);
                for (let i = 0; i < Math.min(bonusPoints, gateSlots); i++) {
                    const gateSlot = gateKeySet[i];
                    const gateCost = Math.floor(
                        worldData.gateCosts[gateSlot] * planetLevel * SharkGame.World.getGateCostMultiplier()
                    );
                    const resourceName = SharkGame.Main.toTitleCase(SharkGame.ResourceMap.get(gateSlot).singleName);
                    gateList.append(
                        $("<li>")
                            .html(resourceName + ": " + SharkGame.Main.beautify(gateCost))
                            .addClass("medDesc")
                    );
                }
                contentDiv.append(gateList);
                const totalBannedResources = _.size(worldData.absentResources);
                contentDiv.append(
                    $("<p>").html(
                        "Known absences (" + Math.floor(Math.min(1, bonusPoints / totalBannedResources) * 100) + "%):"
                    )
                );
                const bannedList = $("<ul>").addClass("gatewayPropertyList");
                for (let i = 0; i < Math.min(bonusPoints, totalBannedResources); i++) {
                    const bannedResource = worldData.absentResources[i];
                    const resourceName = SharkGame.ResourceMap.get(bannedResource).singleName;
                    bannedList.append($("<li>").html(resourceName).addClass("smallDesc"));
                }
                contentDiv.append(bannedList);
            }
        }
    },

    getMaxWorldQualitiesToShow() {
        const psLevel = SharkGame.Artifacts.planetScanner.level;
        return psLevel > 0 ? psLevel + 1 : 0;
    },

    deleteArtifacts() {
        _.each(SharkGame.Artifacts, (artifactData) => {
            artifactData.level = 0;
        });
    },

    markWorldCompleted(world) {
        if (!SharkGame.Gateway.completedWorlds.includes(world)) {
            SharkGame.Gateway.completedWorlds.push(world);
        }
    },
};

SharkGame.Gateway.Messages = {
    essenceBased: [
        {
            max: 1,
            messages: [
                "Hello, newcomer.",
                "Ah. Welcome, new one.",
                "Your journey has only just begun.",
                "Welcome to the end of the beginning.",
            ],
        },
        {
            min: 2,
            max: 10,
            messages: [
                "Your aptitude grows, I see.",
                "Your presence is weak, but it grows stronger.",
                "What new sights have you seen in these journeys?",
                "How are you finding your voyage?",
                "Have you noticed how few can follow you through the gates?",
            ],
        },
        {
            min: 11,
            max: 30,
            messages: [
                "How quickly do you travel through worlds?",
                "You are becoming familiar with this.",
                "Back so soon?",
                "Welcome back, to the space between spaces.",
            ],
        },
        {
            min: 31,
            max: 50,
            messages: [
                "You are a traveller like any other.",
                "I see you here more than ever. Can you see me?",
                "Well met, shark friend.",
                "You remind me of myself, from a long, long time ago.",
                "Welcome back to irregular irreality.",
            ],
        },
        {
            min: 51,
            max: 200,
            messages: [
                "What do you seek?",
                "Have you found your home yet?",
                "Surely your home lies but a jump or two away?",
                "Have you ever returned to one of the worlds you've been before?",
                "Can you find anyone else that journeys so frequently as you?",
                "You have become so strong. So powerful.",
                "I remember when you first arrived here, with confusion and terror in your mind.",
            ],
        },
        {
            min: 201,
            messages: [
                "Your devotion to the journey is alarming.",
                "You exceed anything I've ever known.",
                "You are a force of will within the shell of a shark.",
                "It surprises me how much focus and dedication you show. Perhaps you may settle in your next world?",
                "Does your home exist?",
                "Is there an end to your quest?",
                "Why are you still searching? Many others would have surrendered to the odds by this point.",
            ],
        },
    ],
    lastPlanetBased: {
        start: [
            "No other world you find will be as forgiving, newcomer.",
            "You have left the best of all possible worlds.",
            "It's all more difficult from here.",
        ],
        marine: [
            "Did your last ocean feel all too familiar?",
            "Like your origins, but too different still.",
            "Was that world not your home?",
            "A blue world. A dream of a former life, perhaps.",
        ],
        chaotic: [
            "You have survived the stranger world.",
            "A world on the brink of existence. Halfway between here and oblivion.",
            "You were given allies, yes, but at what cost?",
            "What a strange demand for the gate to possess.",
            "You are relieved the chaos is over, correct?",
        ],
        haven: [
            "A beautiful paradise. It may be a while before you find a world so peaceful.",
            "Did you ruin the world that fed you? There is no judgement here, only curiosity.",
            "A rare gem of a world. You will miss it, before long.",
            "What shining atoll do you leave behind? Those who could not follow you will surely live happily.",
        ],
        tempestuous: [
            "You braved the maelstrom and came from it unscathed.",
            "A surprising victory from a veteran of the seas.",
            "Charge through the whirlpool. Give no quarter to the storm.",
            "The turbulent seas were no match for your prowess.",
        ],
        violent: [
            "The boiling ocean only stirred you on.",
            "So hard to survive, yet so lucrative. A deadly balance.",
            "This is not the harshest world you will endure, surely.",
            "You are forged from the geothermal vents.",
        ],
        abandoned: [
            "Do your previous worlds resemble this?",
            "Was that your first or second visit to that world?",
            "Do you wonder who abandoned the machines?",
            "What thoughts lie within your mind?",
            "Did you ever know this world before its death?",
        ],
        shrouded: [
            "The veil of mystery has yet to be pierced.",
            "Did the chimaeras recognise who you were?",
            "What did you learn from the dark world?",
            "Would you know your home if you found it?",
        ],
        frigid: [
            "Congratulations. Nature cannot touch you.",
            "Did you prefer arctic waters?",
            "Few worlds are so harsh. Fewer survive.",
            "You are a worthy traveller.",
        ],
    },
    loss: [
        "No matter. You will succeed in future, no doubt.",
        "Never give in. Never surrender. Empty platitudes, perhaps, but sound advice nonetheless.",
        "Mistakes are filled with lessons. Learn never to repeat them.",
        "How does it feel to know that everyone who trusted you has perished?",
        "Another world dies. Was this one significant to you?",
        "A sad event. There is plenty of time to redeem yourself.",
        "What a pity. What a shame. I hear the mournful cries of a dying ocean.",
        "You can do better. You will do better. Believe.",
        "You wish to get back here so quickly?",
        "You and everything you knew has died. Perhaps not you. Perhaps not.",
        "One more try, perhaps?",
    ],
    generic: [
        "There is no warmth or cold here. Only numbness.",
        "What do you seek?",
        "We are on the edge of infinity, peering into a boundless sea of potential.",
        "You may not see me. Do not worry. I can see you.",
        "What am I? Oh, it is not so important. Not so soon.",
        "Is this the dream of a shark between worlds, or are the worlds a dream and this place your reality?",
        "A crossroads. Decisions. Decisions that cannot be shaken so lightly.",
        "There are such sights to behold for the ones who can see here.",
        "You are to the ocean what we are to the pathways.",
        "You swim through liquid eternity. You are now, always, and forever.",
        "The prodigal shark returns.",
        "Your constant drive to continue fuels your capacity to overcome.",
        "There is no space in this universe you cannot make your own.",
    ],
};
