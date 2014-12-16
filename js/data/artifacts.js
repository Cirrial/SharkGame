SharkGame.Artifacts = {
    dummy: {
        name: "Dummy",
        desc: "A testing artifact. Shouldn't see this.",
        // level: 0,
        max: 0,
        cost: 0,
        increase: 0,
        effect: function() {

        }
    },

    permanentMultiplier: {
        name: "Permanent Multiplier",

    }
};

SharkGame.Artifacts.Modifiers = {
    artifactIncome: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].income += level * amount;
    },
    artifactIncomeMultiplier: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].incomeMultiplier *= level * amount;
    },
    artifactIncomeReciprocalMultiplier: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].incomeMultiplier *= (1 / (level * amount));
    },
    artifactResourceBoost: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].boostMultiplier *= level  * amount;
    },
    artifactResourceReciprocalBoost: function(level, resourceName, amount) {
        var wr = SharkGame.World.worldResources;
        wr[resourceName].boostMultiplier *= level  * amount;
    },
    artifactStartingResources: function(level, resourceName, amount) {
        var bonus = level * amount;
        var res = SharkGame.Resources.getTotalResource(resourceName);
        if(res < amount) {
            SharkGame.Resources.changeResource(resourceName, bonus);
        }
    }
};