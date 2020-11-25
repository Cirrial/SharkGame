SharkGame.Reflection = {
    tabId: "reflection",
    tabDiscovered: false,
    tabName: "Reflection",
    tabBg: "img/bg/bg-gate.png",

    sceneImage: "img/events/misc/scene-reflection.png",

    discoverReq: {
        resource: {
            essence: 1,
        },
    },

    message:
        "You may not remember everything, but you are something more than a shark now." +
        "</br><span='medDesc'>Reflect upon the changes in yourself and reality you have made here.</span>",

    init() {
        const r = SharkGame.Reflection;
        // register tab
        SharkGame.Tabs[r.tabId] = {
            id: r.tabId,
            name: r.tabName,
            discovered: r.tabDiscovered,
            discoverReq: r.discoverReq,
            code: r,
        };
    },

    switchTo() {
        const r = SharkGame.Reflection;
        const content = $("#content");
        content.append($("<div>").attr("id", "tabMessage"));
        content.append($("<div>").attr("id", "artifactList"));
        let message = r.message;
        const tabMessageSel = $("#tabMessage");
        if (SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + r.sceneImage + "' id='tabSceneImageEssence'>" + message;
            tabMessageSel.css("background-image", "url('" + r.tabBg + "')");
        }
        tabMessageSel.html(message);

        r.updateArtifactList();
    },

    update() {},

    updateArtifactList() {
        const m = SharkGame.Main;
        const listSel = $("#artifactList");
        $.each(SharkGame.Artifacts, (artifactKey, artifactData) => {
            if (artifactData.level > 0) {
                const maxedOut = artifactData.level >= artifactData.max;
                const item = $("<div>").addClass("artifactDiv");
                let artifactLabel = artifactData.name + "<br><span class='medDesc'>";
                if (maxedOut) {
                    artifactLabel += "(Maximum Power)";
                } else {
                    artifactLabel += "(Power: " + m.beautify(artifactData.level) + ")";
                }
                artifactLabel += "</span><br><em>" + artifactData.flavour + "</em>";

                item.append(artifactLabel);
                listSel.append(item);

                const spritename = "artifacts/" + artifactKey;
                if (SharkGame.Settings.current.iconPositions !== "off") {
                    const iconDiv = SharkGame.changeSprite(
                        SharkGame.spriteIconPath,
                        spritename,
                        null,
                        "general/missing-artifact"
                    );
                    if (iconDiv) {
                        iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                        iconDiv.addClass("gatewayButton");
                        item.prepend(iconDiv);
                    }
                }
            }
        });
        if ($("#artifactList > div").length === 0) {
            listSel.append("<p><em>You have no artifacts to show.</em></p>");
        }
    },
};
