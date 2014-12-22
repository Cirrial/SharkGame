SharkGame.Recycler = {

    tabId: "recycler",
    tabDiscovered: false,
    tabName: "Recycler",
    tabBg: "img/bg/bg-recycler.png",

    sceneImage: "img/events/misc/scene-recycler.png",

    discoverReq: {
        upgrade: [
            "recyclerDiscovery"
        ]
    },

    message: "The recycler allows for the repurposing of any and all of your unwanted materials.<br/><span class='medDesc'>Feed the machines. Feed them.</span>",

    recyclerInputMessages: [
        "The machines grind and churn.",
        "Screech clunk chomp munch erp.",
        "Clunk clunk clunk screeeeech.",
        "The recycler hungrily devours the stuff you offer.",
        "The offerings are no more.",
        "Viscous, oily mess sloshes within the machine.",
        "The recycler reprocesses."
    ],

    recyclerOutputMessages: [
        "A brand new whatever!",
        "The recycler regurgitates your demand, immaculately formed.",
        "How does a weird blackish gel become THAT?",
        "Some more stuff to use! Maybe even to recycle!",
        "Gifts from the machine! Gifts that may have cost a terrible price!",
        "How considerate of this unfeeling, giant apparatus! It provides you stuff at inflated prices!"
    ],

    allowedCategories: {
        machines: "linear",
        stuff: "constant",
        processed: "constant",
        animals: "constant"
    },

    bannedResources: [
        "essence",
        "junk",
        "science",
        "seaApple"
    ],

    init: function() {
        var y = SharkGame.Recycler;
        // register tab
        SharkGame.Tabs[y.tabId] = {
            id: y.tabId,
            name: y.tabName,
            discovered: y.tabDiscovered,
            discoverReq: y.discoverReq,
            code: y
        };
    },

    switchTo: function() {
        var y = SharkGame.Recycler;
        var m = SharkGame.Main;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        var container = $('<div>').attr("id", "recyclerContainer");
        container.append($('<div>').attr("id", "inputButtons"));
        container.append($('<div>').attr("id", "junkDisplay"));
        container.append($('<div>').attr("id", "outputButtons"));
        content.append(container);
        content.append($('<div>').addClass("clear-fix"));
        var message = y.message;
        var tabMessageSel = $('#tabMessage');
        if(SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + y.sceneImage + "' id='tabSceneImageRed'>" + message;
            tabMessageSel.css("background-image", "url('" + y.tabBg + "')");
        }
        tabMessageSel.html(message);

        m.createBuyButtons("eat");
        y.createButtons();
    },

    update: function() {
        var y = SharkGame.Recycler;

        y.updateJunkDisplay();
        y.updateButtons();
    },

    updateJunkDisplay: function() {
        var r = SharkGame.Resources;
        var y = SharkGame.Recycler;
        var m = SharkGame.Main;

        var junkAmount = r.getResource("junk");

        var junkDisplay = $('#junkDisplay');
        junkDisplay.html("CONTENTS:<br/><br/>" + m.beautify(junkAmount) + "<br/><br/>RESIDUE");
    },

    updateButtons: function() {
        var r = SharkGame.Resources;
        var y = SharkGame.Recycler;
        var m = SharkGame.Main;
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0) {
                var inputButton = $('#input-' + k);
                var outputButton = $('#output-' + k);
                var resourceAmount = r.getResource(k);

                // determine amounts for input and what would be retrieved from output
                var selectedAmount = SharkGame.Settings.current.buyAmount;
                var forceSingular = selectedAmount === 1;
                var inputAmount = selectedAmount;
                var outputAmount = selectedAmount;
                var maxOutputAmount = y.getMaxToBuy(k);
                if(selectedAmount < 0) {
                    var divisor = Math.floor(selectedAmount) * -1;
                    inputAmount = resourceAmount / divisor;
                    outputAmount = maxOutputAmount / divisor;

                    inputAmount = Math.floor(inputAmount);
                    outputAmount = Math.floor(outputAmount);
                }

                // update input button
                var disableButton = (resourceAmount < inputAmount) || (inputAmount <= 0);
                var label = "Recycle ";
                if(inputAmount > 0) {
                    label += m.beautify(inputAmount) + " ";
                }
                label += r.getResourceName(k, disableButton, forceSingular);
                inputButton.html(label).prop("disabled", disableButton);

                // update output button
                disableButton = (maxOutputAmount < outputAmount) || (outputAmount <= 0);
                label = "Convert to ";
                if(outputAmount > 0) {
                    label += m.beautify(outputAmount) + " ";
                }
                label += r.getResourceName(k, disableButton, forceSingular);
                outputButton.html(label).prop("disabled", disableButton);
            }
        });
    },

    createButtons: function() {
        var r = SharkGame.Resources;
        var y = SharkGame.Recycler;
        var m = SharkGame.Main;
        var inputButtonDiv = $('#inputButtons');
        var outputButtonDiv = $('#outputButtons');
        $.each(SharkGame.ResourceTable, function(k, v) {
            if(r.getTotalResource(k) > 0
                && y.allowedCategories[r.getCategoryOfResource(k)]
                && y.bannedResources.indexOf(k) === -1) {
                SharkGame.Button.makeButton("input-" + k, "Recycle " + r.getResourceName(k), inputButtonDiv, y.onInput);
                SharkGame.Button.makeButton("output-" + k, "Convert to " + r.getResourceName(k), outputButtonDiv, y.onOutput);
            }
        });
    },

    onInput: function() {
        var r = SharkGame.Resources;
        var l = SharkGame.Log;
        var y = SharkGame.Recycler;
        var button = $(this);
        var resourceName = button.attr("id").split("-")[1];
        var resourceAmount = r.getResource(resourceName);
        var junkPerResource = SharkGame.ResourceTable[resourceName].value;

        var selectedAmount = SharkGame.Settings.current.buyAmount;
        var amount = selectedAmount;
        if(selectedAmount < 0) {
            var divisor = Math.floor(selectedAmount) * -1;
            amount = resourceAmount / divisor;
            amount = Math.floor(amount);
        }

        if(resourceAmount >= amount) {
            r.changeResource(resourceName, -amount);
            r.changeResource("junk", amount * junkPerResource);
            r.changeResource("tar", amount * junkPerResource * 0.00001);
            l.addMessage(SharkGame.choose(y.recyclerInputMessages));
        } else {
            l.addMessage("You don't have enough for that!");
        }

        // disable button until next frame
        button.prop("disabled", true);
    },

    onOutput: function() {
        var r = SharkGame.Resources;
        var l = SharkGame.Log;
        var y = SharkGame.Recycler;
        var button = $(this);
        var resourceName = button.attr("id").split("-")[1];
        var junkAmount = r.getResource("junk");
        var junkPerResource = SharkGame.ResourceTable[resourceName].value;

        var selectedAmount = SharkGame.Settings.current.buyAmount;
        var amount = selectedAmount;
        if(selectedAmount < 0) {
            var divisor = Math.floor(selectedAmount) * -1;
            amount = y.getMaxToBuy(resourceName) / divisor;
        }

        var currentResourceAmount = r.getResource(resourceName);
        var junkNeeded;

        var costFunction = y.allowedCategories[r.getCategoryOfResource(resourceName)];
        if(costFunction === "linear") {
            junkNeeded = SharkGame.MathUtil.linearCost(currentResourceAmount, currentResourceAmount + amount, junkPerResource);
        } else if(costFunction === "constant") {
            junkNeeded = SharkGame.MathUtil.constantCost(currentResourceAmount, currentResourceAmount + amount, junkPerResource);
        }

        if(junkAmount >= junkNeeded) {
            r.changeResource(resourceName, amount);
            r.changeResource("junk", -junkNeeded);
            l.addMessage(SharkGame.choose(y.recyclerOutputMessages));
        } else {
            l.addMessage("You don't have enough for that!");
        }

        // disable button until next frame
        button.prop("disabled", true);
    },

    getMaxToBuy: function(resource) {
        var r = SharkGame.Resources;
        var y = SharkGame.Recycler;
        var resourceAmount = SharkGame.Resources.getResource(resource);
        var junkAmount = SharkGame.Resources.getResource("junk");
        var junkPricePerResource = SharkGame.ResourceTable[resource].value;
        var category = r.getCategoryOfResource(resource);
        var max = 0;
        if(y.allowedCategories[category]) {
            var costFunction = y.allowedCategories[category];
            if(costFunction === "linear") {
                max = SharkGame.MathUtil.linearMax(resourceAmount, junkAmount, junkPricePerResource) - resourceAmount;
            } else if(costFunction === "constant") {
                max = SharkGame.MathUtil.constantMax(resourceAmount, junkAmount, junkPricePerResource) - resourceAmount;
            }
        }
        return Math.floor(max);
    }
};