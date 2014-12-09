SharkGame.WorldTypes = {
    marine: {
        name: "Marine",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    },
    chaotic: {
        name: "Chaotic",
        desc: "",
        absentResources: [

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

        ],
        modifiers: {}
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    },
    violent: {
        name: "Violent",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    },
    abandoned: {
        name: "Abandoned",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    },
    shrouded: {
        name: "Shrouded",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    },
    frigid: {
        name: "Frigid",
        desc: "",
        absentResources: [

        ],
        modifiers: {}
    }
};

SharkGame.WorldModifiers = {
    planetaryBoost: function(level, resourceCategory, amount) {
        var w = SharkGame.World;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {

        });
    },
    planetaryIncome: function(level, resourceCategory, amount) {
        var w = SharkGame.World;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {

        });
    },
    planetaryIncomeMultiplier: function(level, resourceCategory, amount) {
        var w = SharkGame.World;
        var resourceList = SharkGame.Resources.getResourcesInCategory(resourceCategory);
        $.each(resourceList, function(i, v) {

        });
    }
};

SharkGame.World = {

    worldResources: {},
    planetLevel: 1,

    init: function() {
        var w = SharkGame.World;
        var rt = SharkGame.ResourceTable;

        // set up defaults
        $.each(rt, function(k, v) {
            w.worldResources[k] = {};
            w.worldResources[k].exists = true;
            w.worldResources[k].boost = 0;
            w.worldResources[k].income = 0;
            w.worldResources[k].incomeMultiplier = 1;
        });

        w.worldResources.sharkonium.exists = false;
    },

    // does this resource exist on this planet?
    doesResourceExist: function(resourceName) {
        return SharkGame.World.worldResources[resourceName].exists;
    }
};