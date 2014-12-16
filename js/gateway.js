SharkGame.Gateway = {

    transitioning: false,

    allowedWorlds: [
        "marine",
        "chaotic",
        "haven",
        "tempestuous",
        "violent",
        "abandoned",
        "shrouded",
        "frigid"
    ],

    init: function() {

    },

    enterGate: function() {
        var m = SharkGame.Main;
        var g = SharkGame.Gateway;

        // PREPARE ARTIFACTS

        // PREPARE PLANETS

        // SAVE
        SharkGame.Save.saveGame();

        // PREPARE GATEWAY PANE
        // set up classes
        var pane;
        if(!SharkGame.paneGenerated) {
            pane = SharkGame.Main.buildPane();
        } else {
            pane = $('#pane');
        }
        pane.addClass("gateway");

        var overlay = $('#overlay');
        overlay.addClass("gateway");
        var docHeight = $(document).height();

        // make overlay opaque
        overlay.height(docHeight);
        if(SharkGame.Settings.current.showAnimations) {
            overlay.show()
                .css("opacity", 0)
                .animate({opacity: 1.0}, 1000, "swing", function() {  // put back to 4000
                    g.cleanUp();
                    g.showGateway();
                });
        } else {
            overlay.show()
                .css("opacity", 1.0);
            g.cleanUp();
            g.showGateway();
        }
    },

    cleanUp: function() {
        var m = SharkGame.Main;
        // empty out the game stuff behind
        m.purgeGame();
        // resize overlay
        var docHeight = $(window).height();
        $('#overlay').height(docHeight);
    },

    showGateway: function() {
        var m = SharkGame.Main;
        var r = SharkGame.Resources;
        var g = SharkGame.Gateway;

        // get some useful numbers
        var essenceHeld = r.getResource("essence");
        var essenceEverHeld = r.getTotalResource("essence");
        var numenHeld = r.getResource("numen");

        // construct the gateway content
        var gatewayContent = $('<div>');
        gatewayContent.append($('<p>').html("You are a shark in the space between worlds."));
        gatewayContent.append($('<p>').html("Something unseen says,").addClass("medDesc"));
        gatewayContent.append($('<em>').attr("id", "gatewayVoiceMessage").html(g.getVoiceMessage()));
        gatewayContent.append($('<p>').html("You have <span id='essenceCount'>" + m.beautify(essenceHeld) + "</span> essence."));
        if(numenHeld > 0) {
            var numenName = (numenHeld > 1) ? "numina" : "numen";
            gatewayContent.append($('<p>').html("You also have <span id='numenCount'>" + m.beautify(numenHeld) + "</span> " + numenName + ", and you radiate divinity."));
        }
        gatewayContent.append($('<p>').attr("id", "gatewayStatusMessage").addClass("medDesc"));






        m.showPane("GATEWAY", gatewayContent, true, 500, true);
        g.transitioning = false;
    },


    activateArtifact: function(artifactName, artifactLevel) {
        var artifactData = SharkGame.Artifacts[artifactName];
        if(artifactData) {

        }
    },

    getVoiceMessage: function() {
        var message = "";
        var messagePool = [];
        var allMessages = SharkGame.Gateway.Messages;
        // the point of this function is to add to the message pool all available qualifying messages and then pick one
        var totalEssence = SharkGame.Resources.getTotalResource("essence");
        var lastPlanet = SharkGame.World.worldType;

        // determine which essence based messages should go into the pool
        _.each(allMessages.essenceBased, function(v) {
            var min = 0;
            if(v.min) {
                min = v.min;
            }
            var max = Number.MAX_VALUE;
            if(v.max) {
                max = v.max;
            }
            if(totalEssence >= min && totalEssence <= max) {
                _.each(v.messages, function(message) {
                    messagePool.push(message);
                });
            }
        });

        // determine which planet based messages should go into the pool
        var planetPool = allMessages.lastPlanetBased[lastPlanet];
        if(planetPool) {
            _.each(planetPool, function(message) {
                messagePool.push(message);
            });
        }

        // finally just add all the generics into the pool
        _.each(allMessages.generic, function(message) {
            messagePool.push(message);
        });

        message = SharkGame.choose(messagePool);
        return "\"" + message + "\"";
    }

};


SharkGame.Gateway.Messages = {
    essenceBased: [
        {
            max: 1, messages: [
            "Hello, newcomer.",
            "Ah. Welcome, new one.",
            "Your journey has only just begun.",
            "Welcome to the end of the beginning."
        ]
        },
        {
            min: 2, max: 10, messages: [
            "Your aptitude grows, I see.",
            "Your presence is weak, but it grows stronger.",
            "What new sights have you seen in these journeys?",
            "How are you finding your voyage?",
            "Have you noticed how few can follow you through the gates?"
        ]
        },
        {
            min: 11, max: 30, messages: [
            "How quickly do you travel through worlds?",
            "You are becoming familiar with this.",
            "Back so soon?",
            "Welcome back, to the space between spaces."
        ]
        },
        {
            min: 31, max: 50, messages: [
            "You are a traveller like any other.",
            "I see you here more than ever. Can you see me?",
            "Well met, shark friend.",
            "You remind me of myself, from a long, long time ago.",
            "Welcome back to irregular irreality."
        ]
        },
        {
            min: 51, max: 200, messages: [
            "What do you seek?",
            "Have you found your home yet?",
            "Surely your home lies but a jump or two away?",
            "Have you ever returned to one of the worlds you've been before?",
            "Can you find anyone else that journeys so frequently as you?",
            "You have become so strong. So powerful.",
            "I remember when you first arrived here, with confusion and terror in your mind."
        ]
        },
        {
            min: 201, messages: [
            "Your devotion to the journey is alarming.",
            "You exceed anything I've ever known.",
            "You are a force of will within the shell of a shark.",
            "It surprises me how much focus and dedication you show. Perhaps you may settle in your next world?",
            "Does your home exist?",
            "Is there an end to your quest?",
            "Why are you still searching? Many others would have surrendered to the odds by this point."
        ]
        }
    ],
    lastPlanetBased: {
        start: [
            "No other world you find will be as forgiving, newcomer.",
            "You have left the best of all possible worlds.",
            "It's all more difficult from here."
        ],
        marine: [
            "Did your last ocean feel all too familiar?",
            "Like your origins, but too different still.",
            "Was that world not your home?",
            "A blue world. A dream of a former life, perhaps."
        ],
        chaotic: [
            "You have survived the stranger world.",
            "A world on the brink of existence. Halfway between here and oblivion.",
            "You were given allies, yes, but at what cost?",
            "What a strange demand for the gate to possess.",
            "You are relieved the chaos is over, correct?"
        ],
        haven: [
            "A beautiful paradise. It may be a while before you find a world so peaceful.",
            "Did you ruin the world that fed you? There is no judgement here, only curiosity.",
            "A rare gem of a world. You will miss it, before long.",
            "What shining atoll do you leave behind? Those who could not follow you will surely live happily."
        ],
        tempestuous: [
            "You braved the maelstrom and came from it unscathed.",
            "A surprising victory from a veteran of the seas.",
            "Charge through the whirlpool. Give no quarter to the storm.",
            "The turbulent seas were no match for your prowess."
        ],
        violent: [
            "The boiling ocean only stirred you on.",
            "So hard to survive, yet so lucrative. A deadly balance.",
            "This is not the harshest world you will endure, surely.",
            "You are forged from the geothermal vents."
        ],
        abandoned: [
            "Do your previous worlds resemble this?",
            "Was that your first or second visit to that world?",
            "Do you wonder who abandoned the machines?",
            "What thoughts lie within your mind?",
            "Did you ever know this world before its death?"
        ],
        shrouded: [
            "The veil of mystery has yet to be pierced.",
            "Did the chimaeras recognise who you were?",
            "What did you learn from the dark world?",
            "Would you know your home if you found it?"
        ],
        frigid: [
            "Congratulations. Nature cannot touch you.",
            "Did you prefer arctic waters?",
            "Few worlds are so harsh. Fewer survive.",
            "You are a worthy traveller."
        ]
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
        "You wish to get back here so quickly?"
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
        "There is no space in this universe you cannot make your own."
    ]
};