SGAI = {};

SGAI.biasedFavourites = {
    fish: 0.1,
    clam: 0,
    sponge: 0.1,
    kelp: 0,
    science: 0
};

SGAI.pickBestAction = function() {
    var h = SharkGame.Home;
    var r = SharkGame.Resources;
    var rt = SharkGame.ResourceTable;
    var bestAction = "none";
    var bestGain = 0;

    $.each(SharkGame.HomeActions, function(actionKey, actionData) {
        if(h.areActionPrereqsMet(actionKey)) {
            var totalValue = SGAI.getActionValue(actionKey);
            if(totalValue > bestGain) {
                bestGain = totalValue;
                bestAction = actionKey;
            }
        }
    });

    return bestAction;
};

SGAI.getActionValue = function(actionName) {
    var h = SharkGame.Home;
    var r = SharkGame.Resources;
    var rt = SharkGame.ResourceTable;
    var actionData = SharkGame.HomeActions[actionName];
    var max = h.getMax(actionData); // returns number
    var cost = h.getCost(actionData, max); // returns resource list
    var totalValue = 0;
    if(r.checkResources(cost) && !$.isEmptyObject(cost)) {  // don't advise to get things we can't afford, or useless free actions
        var costValue = 0;
        var resultValue = 0;
        var incomeValue = 0;
        // figure out cost
        $.each(cost, function(costName, costAmount) {
            costValue += costAmount * rt[costName].value;
        });
        var gainedResources = actionData.effect.resource;
        if(gainedResources) {
            $.each(gainedResources, function(generatorName, generatedAmount) {
                // figure out gained value
                var generatorValue = !(typeof(SGAI.biasedFavourites[generatorName]) === "undefined") ? SGAI.biasedFavourites[generatorName] : rt[generatorName].value;
                resultValue += max * generatedAmount * generatorValue;

                // figure out gained income
                var resourceIncome = rt[generatorName].income;
                if(resourceIncome) {
                    $.each(resourceIncome, function(productionName, productionAmount) {
                        var incomeAmount = r.getProductAmountFromGeneratorResource(generatorName, productionName);
                        var productValue = !(typeof(SGAI.biasedFavourites[productionName]) === "undefined") ? SGAI.biasedFavourites[productionName] : rt[productionName].value;
                        incomeValue += max * incomeAmount * productValue;
                    })
                }
            });
        }
        // todo: figure out how the hell result value factors into this
        totalValue = incomeValue / costValue;
    }
    return totalValue;
};

SGAI.autopilot = function() {
    setInterval(function() {
        var h = SharkGame.Home;
        var l = SharkGame.Log;
        var r = SharkGame.Resources;
        var bestAction = SGAI.pickBestAction();
        if(bestAction !== "none") {
            var calculatedGain = SGAI.getActionValue(bestAction);
            var actionData = SharkGame.HomeActions[bestAction];
            var max = h.getMax(actionData); // returns number
            var cost = h.getCost(actionData, max); // returns resource list
            if(r.checkResources(cost)) {
                r.changeManyResources(cost, true); // take cost
                var resourceChange = r.scaleResourceList(actionData.effect.resource, max);
                r.changeManyResources(resourceChange); // reap benefits
                l.addMessage("Autopilot: Bought " + r.resourceListToString(resourceChange) + " for " + r.resourceListToString(cost) + ". Calculated gain: " + calculatedGain + ".");
            }
        }
    }, 2000);
};