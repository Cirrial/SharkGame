SharkGame.WorldTypes = {
    start: {
        name: "Start",
        desc: "",
        absentResources: [
            "tar",
            "ice",
            "shrimp",
            "lobster",
            "dolphin",
            "whale",
            "chimaera",
            "octopus",
            "eel",
            "queen",
            "berrier",
            "biologist",
            "warren",
            "seeker",
            "harvester",
            "savant",
            "treasurer",
            "chorus",
            "transmuter",
            "explorer",
            "collector",
            "scavenger",
            "technician",
            "sifter",
            "purifier",
            "heater",
            "spongeFarmer",
            "berrySprayer",
            "glassMaker",
            "silentArchivist",
            "tirelessCrafter",
            "clamCollector",
            "sprongeSmelter",
            "seaScourer",
            "prostheticPolyp",
            "sponge",
            "jellyfish",
            "clam",
            "coral",
            "algae",
            "coralglass",
            "delphinium",
            "spronge"
        ],
        modifiers: []
    },
    marine: {
        name: "Marine",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    chaotic: {
        name: "Chaotic",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [
            { modifier: "planetaryIncome", category: "frenzy", amount: 0.1 },
            { modifier: "planetaryIncome", category: "animals", amount: -0.1 },
            { modifier: "planetaryIncome", category: "stuff", amount: -0.1 }
        ]
    },
    haven: {
        name: "Haven",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    violent: {
        name: "Violent",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    abandoned: {
        name: "Abandoned",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    shrouded: {
        name: "Shrouded",
        desc: "",
        absentResources: [
            "ice"
        ],
        modifiers: [

        ]
    },
    frigid: {
        name: "Frigid",
        desc: "",
        absentResources: [

        ],
        modifiers: [

        ]
    }
};

SharkGame.WorldModifiers = {
    planetaryIncome: function(level, resourceCategory, amount) {
        var wr = SharkGame.World.worldResources;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {
            wr[v].income = level * amount;
        });
    },
    planetaryIncomeMultiplier: function(level, resourceCategory, amount) {
        var wr = SharkGame.World.worldResources;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {
            wr[v].incomeMultiplier = level * amount;
        });
    },
    planetaryIncomeReciprocalMultiplier: function(level, resourceCategory, amount) {
        var wr = SharkGame.World.worldResources;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {
            wr[v].incomeMultiplier = (1/level  * amount);
        });
    }
};

SharkGame.World = {

    worldType: "start",
    worldResources: {},
    planetLevel: 1,

    init: function() {
        var w = SharkGame.World;
        var wr = w.worldResources;
        var rt = SharkGame.ResourceTable;

        // set up defaults
        $.each(rt, function(k, v) {
            wr[k] = {};
            wr[k].exists = true;
            wr[k].income = 0;
            wr[k].incomeMultiplier = 1;
        });

        w.applyWorldProperties(w.planetLevel);
    },

    applyWorldProperties: function(level) {
        var w = SharkGame.World;
        var wr = w.worldResources;
        var worldInfo = SharkGame.WorldTypes[w.worldType];
        // disable resources not allowed on planet
        $.each(worldInfo.absentResources, function(i, v) {
            wr[v].exists = false;
        });

        // apply world modifiers
        $.each(worldInfo.modifiers, function(i, v) {
            SharkGame.WorldModifiers[v.modifier](level, v.category, v.amount);
        });
    },

    // does this resource exist on this planet?
    doesResourceExist: function(resourceName) {
        var info = SharkGame.World.worldResources[resourceName];
        if(!info) {
            return false;
        }
        return info.exists;
    },

    getWorldMultiplier: function(resourceName) {
        return SharkGame.World.worldResources[resourceName].incomeMultiplier;
    }
};