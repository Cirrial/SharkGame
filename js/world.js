SharkGame.WorldModifiers = {
    planetaryIncome: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].income = level * amount;
    },
    planetaryIncomeMultiplier: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].incomeMultiplier = level * amount;
    },
    planetaryIncomeReciprocalMultiplier: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].incomeMultiplier = (1 / (level * amount));
    },
    planetaryResourceBoost: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].boostMultiplier = level  * amount;
    },
    planetaryResourceReciprocalBoost: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].boostMultiplier = level  * amount;
    },
    planetaryStartingResources: function(level, resourceName, amount) {
        SharkGame.World.changeResource(resourceName, level  * amount);
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
            wr[k].boostMultiplier = 1;
        });

        w.applyWorldProperties(w.planetLevel);
    },

    applyWorldProperties: function(level) {
        var w = SharkGame.World;
        var g = SharkGame.Gate;
        var wr = w.worldResources;
        var worldInfo = SharkGame.WorldTypes[w.worldType];
        // disable resources not allowed on planet
        $.each(worldInfo.absentResources, function(i, v) {
            wr[v].exists = false;
        });

        // set up gate costs
        $.each(worldInfo.gateCosts, function(k, v) {
            g.costs[k] = v * w.planetLevel;
        });

        // apply world modifiers
        $.each(worldInfo.modifiers, function(i, v) {
            if(SharkGame.Resources.isCategory(v)) {
                var resourceList = SharkGame.Resources.getResourcesInCategory(v);
                $.each(resourceList, function(i, v) {
                    SharkGame.WorldModifiers[v.modifier](level, v.resource, v.amount);
                });
            } else {
                SharkGame.WorldModifiers[v.modifier](level, v.resource, v.amount);
            }
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

    getWorldIncomeMultiplier: function(resourceName) {
        return SharkGame.World.worldResources[resourceName].incomeMultiplier;
    },

    getWorldBoostMultiplier: function(resourceName) {
        return SharkGame.World.worldResources[resourceName].boostMultiplier;
    }
};