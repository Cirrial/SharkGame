SharkGame.Settings = {

    current: {},

    buyAmount: {
        defaultSetting: 1,
        show: false,
        options: [
            1,
            10,
            100,
            -3,
            -2,
            -1
        ]
    },

    showTabHelp: {
        defaultSetting: false,
        show: false,
        options: [
            true,
            false
        ]
    },

    offlineModeActive: {
        defaultSetting: true,
        name: "Offline Mode",
        desc: "Let your numbers increase even with the game closed!",
        show: true,
        options: [
            true,
            false
        ]
    },

    autosaveFrequency: {
        // times given in minutes
        defaultSetting: 5,
        name: "Autosave Frequency",
        desc: "Number of minutes between autosaves.",
        show: true,
        options: [
            1,
            2,
            5,
            10,
            30
        ],
        onChange: function() {
            clearInterval(SharkGame.Main.autosaveHandler);
            SharkGame.Main.autosaveHandler = setInterval(SharkGame.Main.autosave, SharkGame.Settings.current.autosaveFrequency * 60000);
            SharkGame.Log.addMessage("Now autosaving every " + SharkGame.Settings.current.autosaveFrequency + " minute" + SharkGame.plural(SharkGame.Settings.current.autosaveFrequency) + ".");
        }
    },

    logMessageMax: {
        defaultSetting: 10,
        name: "Max Log Messages",
        desc: "How many messages to show before removing old ones.",
        show: true,
        options: [
            5,
            10,
            15,
            20,
            25,
            30,
            50
        ],
        onChange: function() {
            SharkGame.Log.correctLogLength();
        }
    },

    sidebarWidth: {
        defaultSetting: "25%",
        name: "Sidebar Width",
        desc: "How much screen estate the sidebar should take.",
        show: true,
        options: [
            "20%",
            "25%",
            "30%",
            "35%",
            "40%",
            "45%",
            "50%"
        ],
        onChange: function() {
            var sidebar = $('#sidebar');
            if(SharkGame.Settings.current.showAnimations) {
                sidebar.animate({width: SharkGame.Settings.current.sidebarWidth}, "100");
            } else {
                sidebar.width(SharkGame.Settings.current.sidebarWidth);
            }
        }
    },

    showAnimations: {
        defaultSetting: true,
        name: "Show Animations",
        desc: "Show animations or don't. YOU DECIDE.",
        show: true,
        options: [
            true,
            false
        ]
    },

    colorCosts: {
        defaultSetting: true,
        name: "Color Resource Names",
        desc: "When displaying costs, color names of stuff.",
        show: true,
        options: [
            true,
            false
        ],
        onChange: function() {
            SharkGame.Resources.rebuildTable = true;
        }
    }
};