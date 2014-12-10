SharkGame.WorldTypes = {
    marine: {
        name: "Marine",
        desc: "",
        absentResources: [],
        modifiers: []
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
        modifiers: [

        ]
    },
    tempestuous: {
        name: "Tempestuous",
        desc: "",
        absentResources: [

        ],
        modifiers: [

        ]
    },
    violent: {
        name: "Violent",
        desc: "",
        absentResources: [

        ],
        modifiers: [

        ]
    },
    abandoned: {
        name: "Abandoned",
        desc: "",
        absentResources: [

        ],
        modifiers: [

        ]
    },
    shrouded: {
        name: "Shrouded",
        desc: "",
        absentResources: [

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
    }

};

SharkGame.World = {

    worldType: "marine",
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
        return SharkGame.World.worldResources[resourceName].exists;
    }
};