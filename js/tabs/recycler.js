SharkGame.Recycler = {

    tabId: "recycler",
    tabDiscovered: false,
    tabName: "Universal Recycler",

    discoverReq: {
        upgrade: [
            "recyclerDiscovery"
        ]
    },

    init: function() {
        var r = SharkGame.Recycler;
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
        var r = SharkGame.Recycler;
        var content = $('#content');
        content.append($('<div>').attr("id", "tabMessage"));
        content.append($('<div>').attr("id", "buttonList"));
        $('#tabMessage').html(message);
    },

    update: function() {
    }
};