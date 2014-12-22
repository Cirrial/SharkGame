SharkGame.Gate = {

    tabId: "gate",
    tabDiscovered: false,
    tabName: "Strange Gate",
    tabBg: "img/bg/bg-gate.png",

    discoverReq: {
        upgrade: [
            "gateDiscovery"
        ]
    },

    message: "A foreboding circular structure, closed shut.<br/>There are many slots, and a sign you know to mean 'insert items here'.",
    messageOneSlot: "A foreboding circular structure, closed shut.<br/>One slot remains.",
    messageOpened: "A foreboding circular structure, wide open.<br/>The water glows and shimmers within it. A gentle tug pulls at you.",
    messagePaid: "The slot accepts your donation and ceases to be.",
    messageCantPay: "The slot spits everything back out. You get the sense it wants more at once.",
    messageAllPaid: "The last slot closes. The structure opens. The water glows and shimmers within it.<br/>A gentle tug pulls at you.",
    messageEnter: "You swim through the gate...",

    sceneClosedImage: "img/events/misc/scene-gate-closed.png",
    sceneAlmostOpenImage: "img/events/misc/scene-gate-one-slot.png",
    sceneOpenImage: "img/events/misc/scene-gate-open.png",

    costsMet: null,
    costs: null,

    init: function() {
        var g = SharkGame.Gate;
        // register tab
        SharkGame.Tabs[g.tabId] = {
            id: g.tabId,
            name: g.tabName,
            discovered: g.tabDiscovered,
            discoverReq: g.discoverReq,
            code: g
        };
        g.opened = false;
    },

    createSlots: function(gateSlots, planetLevel, gateCostMultiplier) {
        var g = SharkGame.Gate;
        // create costs
        g.costs = {};
        $.each(gateSlots, function(k, v) {
            g.costs[k] = Math.floor(v * planetLevel * gateCostMultiplier);
        });

        // create costsMet
        g.costsMet = {};
        $.each(g.costs, function(k, v) {
            g.costsMet[k] = false;
        });
    },

    switchTo: function() {
        var g = SharkGame.Gate;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        content.append($('<div>').attr("id", "buttonList"));

        if(!g.shouldBeOpen()) {
            var amountOfSlots = 0;
            var buttonList = $('#buttonList');
            $.each(g.costs, function(k, v) {
                if(!g.costsMet[k]) {
                    var resourceName = SharkGame.Resources.getResourceName(k);
                    SharkGame.Button.makeButton("gateCost-" + k, "Insert " + resourceName + " into " + resourceName + " slot", buttonList, SharkGame.Gate.onGateButton);
                    amountOfSlots++;
                }
            });
        } else {
            SharkGame.Button.makeButton("gateEnter", "Enter gate", $('#buttonList'), g.onEnterButton);
        }

        var message = g.shouldBeOpen() ? g.messageOpened : (amountOfSlots > 1 ? g.message : g.messageOneSlot);
        var tabMessageSel = $('#tabMessage');
        if(SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + g.getSceneImagePath() + "' id='tabSceneImageEssence'>" + message;
            tabMessageSel.css("background-image", "url('" + g.tabBg + "')");
        }
        tabMessageSel.html(message);
    },

    update: function() {
    },

    onGateButton: function() {
        var g = SharkGame.Gate;
        var r= SharkGame.Resources;
        var resourceId = ($(this).attr("id")).split("-")[1];

        var message = "";
        var cost = g.costs[resourceId] * (SharkGame.Resources.getResource("numen") + 1);
        if(r.getResource(resourceId) >= cost) {
            SharkGame.Gate.costsMet[resourceId] = true;
            SharkGame.Resources.changeResource(resourceId, -cost);
            $(this).remove();
            if(g.shouldBeOpen()) {
                message = g.messageAllPaid;
                // add enter gate button
                SharkGame.Button.makeButton("gateEnter", "Enter gate", $('#buttonList'), g.onEnterButton);
            } else {
                message = g.messagePaid;
            }
        } else {
            message = g.messageCantPay + "<br/>";
            var diff = cost - r.getResource(resourceId);
            message += SharkGame.Main.beautify(diff) + " more.";
        }
        if(SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + g.getSceneImagePath() + "' id='tabSceneImageEssence'>" + message;
        }
        $('#tabMessage').html(message);
    },

    onEnterButton: function() {
        $('#tabMessage').html(SharkGame.Gate.messageEnter);
        $(this).remove();
        SharkGame.wonGame = true;
        SharkGame.Main.endGame();
    },

    shouldBeOpen: function() {
        var g = SharkGame.Gate;
        var won = true;
        $.each(g.costsMet, function(_, v) {
            won = won && v;
        });
        return won;
    },

    getSceneImagePath: function() {
        var g = SharkGame.Gate;
        var amountOfSlots = 0;
        $.each(g.costsMet, function(k, v) {
            if(v) amountOfSlots++;
        });
        amountOfSlots = _.size(g.costs) - amountOfSlots;
        var sceneImagePath = g.shouldBeOpen() ? g.sceneOpenImage : (amountOfSlots > 1 ? g.sceneClosedImage : g.sceneAlmostOpenImage);
        return sceneImagePath;
    }
};