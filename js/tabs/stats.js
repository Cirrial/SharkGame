SharkGame.Stats = {

    tabId: "stats",
    tabDiscovered: false,
    tabName: "Storage Grotto",

    discoverReq: {
        upgrade: [
            "statsDiscovery"
        ]
    },

    message: "The grotto is a place to keep a better track of resources, and more importantly, dispose of those you don't need anymore.",

    init: function() {
        var s = SharkGame.Stats;
        // register tab
        SharkGame.Tabs[s.tabId] = {
            id: s.tabId,
            name: s.tabName,
            discovered: s.tabDiscovered,
            discoverReq: s.discoverReq,
            code: s
        };
    },

    switchTo: function() {
        var s = SharkGame.Stats;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        content.append($('<div>').attr("id", "buttonList"));

        $('#tabMessage').html(s.message);
    },

    update: function() {
    }
};