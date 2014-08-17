SharkGame.Recycler = {

    tabId: "recycler",
    tabDiscovered: false,
    tabName: "Recycler",

    discoverReq: {
        upgrade: [
            "recyclerDiscovery"
        ]
    },

    message: "The recycler allows for the repurposing of any and all of your unwanted materials.<br/><span class='medDesc'>Feed the machines. Feed them.</span>",

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
        $('#tabMessage').html(r.message);
    },

    update: function() {
    }
};