SharkGame.Gate = {
    tabId: "gate",
    tabDiscovered: false,
    tabName: "Strange Gate",
    tabBg: "img/bg/bg-gate.png",

    discoverReq: {
        upgrade: ["gateDiscovery"],
    },

    message:
        "A foreboding circular structure, closed shut.<br/>There are many slots, and a sign you know to mean 'insert items here'.",
    messageOneSlot: "A foreboding circular structure, closed shut.<br/>One slot remains.",
    messageOpened:
        "A foreboding circular structure, wide open.<br/>The water glows and shimmers within it. A gentle tug pulls at you.",
    messagePaid: "The slot accepts your donation and ceases to be.",
    messageCantPay: "The slot spits everything back out. You get the sense it wants more at once.",
    messageAllPaid:
        "The last slot closes. The structure opens. The water glows and shimmers within it.<br/>A gentle tug pulls at you.",
    messageEnter: "You swim through the gate...",

    sceneClosedImage: "img/events/misc/scene-gate-closed.png",
    sceneAlmostOpenImage: "img/events/misc/scene-gate-one-slot.png",
    sceneOpenImage: "img/events/misc/scene-gate-open.png",

    costsMet: null,
    costs: null,

    init() {
        const gt = SharkGame.Gate;
        // register tab
        SharkGame.Tabs[gt.tabId] = {
            id: gt.tabId,
            name: gt.tabName,
            discovered: gt.tabDiscovered,
            discoverReq: gt.discoverReq,
            code: gt,
        };
        gt.opened = false;
    },

    createSlots(gateSlots, planetLevel, gateCostMultiplier) {
        const gt = SharkGame.Gate;
        // create costs
        gt.costs = {};
        $.each(gateSlots, (k, v) => {
            gt.costs[k] = Math.floor(v * planetLevel * gateCostMultiplier);
        });

        // create costsMet
        gt.costsMet = {};
        $.each(gt.costs, (k, v) => {
            gt.costsMet[k] = false;
        });
    },

    switchTo() {
        const gt = SharkGame.Gate;
        const content = $("#content");
        content.append($("<div>").attr("id", "tabMessage"));
        content.append($("<div>").attr("id", "buttonList"));

        let amountOfSlots = 0;
        if (!gt.shouldBeOpen()) {
            const buttonList = $("#buttonList");
            $.each(gt.costs, (k, v) => {
                if (!gt.costsMet[k]) {
                    const resourceName = r.getResourceName(k);
                    SharkGame.Button.makeHoverscriptButton(
                        "gateCost-" + k,
                        "Insert " + m.beautify(v) + " " + resourceName + " into " + resourceName + " slot",
                        buttonList,
                        gt.onGateButton,
                        gt.onHover,
                        gt.onUnhover
                    );
                    amountOfSlots++;
                }
            });
        } else {
            SharkGame.Button.makeButton("gateEnter", "Enter gate", $("#buttonList"), gt.onEnterButton);
        }

        let message = gt.shouldBeOpen() ? gt.messageOpened : amountOfSlots > 1 ? gt.message : gt.messageOneSlot;
        const tabMessageSel = $("#tabMessage");
        if (SharkGame.Settings.current.showTabImages) {
            message =
                "<img width=400 height=200 src='" + gt.getSceneImagePath() + "' id='tabSceneImageEssence'>" + message;
            tabMessageSel.css("background-image", "url('" + gt.tabBg + "')");
        }
        tabMessageSel.html(message);
    },
    
    onHover() {
        const gt = SharkGame.Gate;
        const button = $(this);
        const resourceName = button.attr("id").split("-")[1];
        const amount = r.getResource(resourceName);
        const required = gt.costs[resourceName];
        if (amount < required) {
            button.html("Need <span class='click-passthrough' style='color:#FFDE0A'>" + m.beautify(required - amount) + "</span> more " + r.getResourceName(resourceName) + " for " + r.getResourceName(resourceName) + " slot");
        } else {
            button.html("<span class='click-passthrough' style='color:#FFDE0A'>Insert " + m.beautify(required) + "</span> " + r.getResourceName(resourceName) + " into " + r.getResourceName(resourceName) + " slot");
        }
    },
    
    onUnhover() {
        const gt = SharkGame.Gate;
        const button = $(this);
        const resourceName = button.attr("id").split("-")[1];
        const required = gt.costs[resourceName];
        button.html("Insert " + m.beautify(required) + " " + r.getResourceName(resourceName) + " into " + r.getResourceName(resourceName) + " slot");
    },

    update() {},

    onGateButton() {
        const gt = SharkGame.Gate;
        const resourceId = $(this).attr("id").split("-")[1];

        let message = "";
        const cost = gt.costs[resourceId] * (r.getResource("numen") + 1);
        if (r.getResource(resourceId) >= cost) {
            gt.costsMet[resourceId] = true;
            r.changeResource(resourceId, -cost);
            $(this).remove();
            if (gt.shouldBeOpen()) {
                message = gt.messageAllPaid;
                // add enter gate button
                SharkGame.Button.makeButton("gateEnter", "Enter gate", $("#buttonList"), gt.onEnterButton);
            } else {
                message = gt.messagePaid;
            }
        } else {
            message = gt.messageCantPay + "<br/>";
            const diff = cost - r.getResource(resourceId);
            message += m.beautify(diff) + " more.";
        }
        if (SharkGame.Settings.current.showTabImages) {
            message =
                "<img width=400 height=200 src='" + gt.getSceneImagePath() + "' id='tabSceneImageEssence'>" + message;
        }
        $("#tabMessage").html(message);
    },

    onEnterButton() {
        $("#tabMessage").html(SharkGame.Gate.messageEnter);
        $(this).remove();
        SharkGame.wonGame = true;
        m.endGame();
    },

    shouldBeOpen() {
        const gt = SharkGame.Gate;
        let won = true;
        $.each(gt.costsMet, (_, v) => {
            won = won && v;
        });
        return won;
    },

    getSceneImagePath() {
        const gt = SharkGame.Gate;
        let amountOfSlots = 0;
        $.each(gt.costsMet, (k, v) => {
            if (v) amountOfSlots++;
        });
        amountOfSlots = _.size(gt.costs) - amountOfSlots;
        const sceneImagePath = gt.shouldBeOpen()
            ? gt.sceneOpenImage
            : amountOfSlots > 1
            ? gt.sceneClosedImage
            : gt.sceneAlmostOpenImage;
        return sceneImagePath;
    },
};
