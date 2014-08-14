SharkGame.Gate = {

    tabId: "gate",
    tabDiscovered: false,
    tabName: "Strange Gate",

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

    costsMet: {},
    costs: {
        fish: 1E9,
        sand: 1E9,
        crystal: 1E9,
        kelp: 1E5,
        seaApple: 1E6,
        sharkonium: 1E8
    },

    init: function () {
        var g = SharkGame.Gate;
        // register tab
        SharkGame.Tabs[g.tabId] = {
            id: g.tabId,
            name: g.tabName,
            discovered: g.tabDiscovered,
            discoverReq: g.discoverReq,
            code: g
        };

        // create costsMet
        var costsMet = g.costsMet = {};
        $.each(g.costs, function(i,v) {
            costsMet[i] = false;
        });

        g.opened = false;
    },

    switchTo: function () {
        var g = SharkGame.Gate;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        content.append($('<div>').attr("id", "buttonList"));

        if(!g.shouldBeOpen()) {
            var amountOfSlots = 0;
            var buttonList = $('#buttonList');
            $.each(g.costs, function(i,v) {
                if( !g.costsMet[i] ) {
                    var resourceName = SharkGame.Resources.getResourceName(i);
                    SharkGame.Button.makeButton("gateCost-" + i, "Insert " + resourceName + " into " + resourceName + " slot", buttonList, SharkGame.Gate.onGateButton);
                    amountOfSlots++;
                }
            });
        } else {
            SharkGame.Button.makeButton("gateEnter", "Enter gate", $('#buttonList'), g.onEnterButton);
        }

        var message = g.shouldBeOpen() ? g.messageOpened : (amountOfSlots > 1 ? g.message : g.messageOneSlot);
        $('#tabMessage').html(message);
    },

    update: function() {
    },

    onGateButton: function () {
        var g = SharkGame.Gate;
        var resourceId = ($(this).attr("id")).split("-")[1];

        var message = "";
        var cost = g.costs[resourceId] * (SharkGame.Resources.getResource("essence") + 1);
        if(SharkGame.ResourceTable[resourceId].amount >= cost ) {
            SharkGame.Gate.costsMet[resourceId] = true;
            SharkGame.Resources.changeResource(resourceId, -cost);
            $(this).remove();
            if( g.shouldBeOpen()) {
                message = g.messageAllPaid;
                // add enter gate button
                SharkGame.Button.makeButton("gateEnter", "Enter gate", $('#buttonList'), g.onEnterButton);
            } else {
                message = g.messagePaid;
            }
        } else {
            message = g.messageCantPay + "<br/>";
            var diff = cost - SharkGame.ResourceTable[resourceId].amount;
            message += SharkGame.Main.beautify(diff) + " more.";
        }
        $('#tabMessage').html(message);
    },

    onEnterButton: function () {
        $('#tabMessage').html(SharkGame.Gate.messageEnter);
        $(this).remove();
        SharkGame.Main.endGame();
    },

    shouldBeOpen: function () {
        var g = SharkGame.Gate;
        var won = true;
        $.each(g.costsMet, function(i,v) {
            won = won && v;
        });
        return won;
    }
};