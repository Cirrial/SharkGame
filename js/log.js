SharkGame.Log = {

    initialised: false,
    messages: [],

    init: function () {
        var l = SharkGame.Log;
        // create log
        $('#log').append("<button id='clearLog' class='min'></button><h3>Log<h3/><ul id='messageList'></ul>");
        // add clear button
        SharkGame.Button.replaceButton("clearLog", "&nbsp x &nbsp", l.clearMessages);
        l.initialised = true;
    },

    addMessage: function (message) {
        var l = SharkGame.Log;
        var s = SharkGame.Settings.current;
        var showAnims = s.showAnimations;

        if ( !l.initialised ) {
            l.init();
        }
        var messageList = $('#messageList');

        var messageItem = $('<li>').html(message);
        if (showAnims) {
            messageItem.hide()
                .css("opacity", 0)
                .prependTo('#messageList')
                .slideDown(50)
                .animate({opacity: 1.0}, 100);
        } else {
            messageItem.prependTo('#messageList');
        }
        l.messages.push(messageItem);

        SharkGame.Log.correctLogLength();

        // adjust opacities because why not
//        var alpha = 1;
//        var delta = 1 / l.MESSAGES_MAX;
//        messageList.find('li').each(function(i, v) {
//            $(this).css("opacity", alpha);
//            alpha += delta;
//        });

    },

    correctLogLength: function() {
        var l = SharkGame.Log;
        var showAnims = SharkGame.Settings.current.showAnimations;
        var logMax = SharkGame.Settings.current.logMessageMax;

        if ( l.messages.length >= logMax) {
            while(l.messages.length > logMax) {
                // remove oldest message
                if (showAnims) {
                    l.messages[0].animate({opacity: 0.0}, 100, "swing", function () {
                        this.remove()
                    });
                } else {
                    l.messages[0].remove();
                }

                // shift array (remove first item)
                l.messages.shift();
            }
        }
    },

    clearMessages: function () {
        var l = SharkGame.Log;
        // remove each element from page
        $.each(l.messages, function (i, v) {
            v.remove();
        });
        // wipe array
        l.messages = [];
    },

    haveAnyMessages: function () {
        return SharkGame.Log.messages.length > 0;
    }
};