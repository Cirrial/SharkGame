SharkGame.Reflection = {

    tabId: "reflection",
    tabDiscovered: false,
    tabName: "Reflection",
    tabBg: "img/bg/bg-gate.png",

    sceneImage: "//placehold.it/400x200",

    discoverReq: {
        resource: {
            essence: 1
        }
    },

    message: "You may not remember everything, but you are something more than a shark now." +
    "</br><span='medDesc'>Reflect upon the changes in yourself and reality you have made here.</span>",

    init: function() {
        var r = SharkGame.Reflection;
        // register tab
        SharkGame.Tabs[r.tabId] = {
            id: r.tabId,
            name: r.tabName,
            discovered: r.tabDiscovered,
            discoverReq: r.discoverReq,
            code: r
        };
    },

    switchTo: function() {
        var r = SharkGame.Reflection;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        content.append($('<div>').attr("id", "artifactList"));
        var message = r.message;

        if(SharkGame.Settings.current.showTabImages) {
            message = "<img width=400 height=200 src='" + r.sceneImage + "' id='tabSceneImage'>" + message;
        }
        $('#tabMessage').html(message).css("background-image", "url('" + r.tabBg + "')");

        r.updateArtifactList();
    },

    update: function() {

    },

    updateArtifactList: function() {
        var m = SharkGame.Main;
        var listSel = $('#artifactList');
        $.each(SharkGame.Artifacts, function(artifactKey, artifactData) {
            if(artifactData.level > 0) {
                var item = $('<div>').addClass("artifactDiv");
                item.append("<em>" + artifactData.name + "</em>" +
                "<br><span class='medDesc'>(Power: " + m.beautify(artifactData.level) + ")</span>" +
                "<br>" + artifactData.desc);
                listSel.append(item);

                var spritename = "artifacts/" + artifactKey;
                if(SharkGame.Settings.current.iconPositions !== "off") {
                    var iconDiv = SharkGame.changeSprite(spritename);
                    if(iconDiv) {
                        iconDiv.addClass("button-icon-" + SharkGame.Settings.current.iconPositions);
                        iconDiv.addClass("gatewayButton");
                        item.prepend(iconDiv);
                    }
                }
            }
        });
        if($('#artifactList > div').length === 0) {
            listSel.append("<p><em>You have no artifacts to show.</em></p>");
        }
    }
};