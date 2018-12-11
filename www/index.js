var site = {

    loadAll: function() {
        var serverData = $.ajax({
            url: 'api/getserverdata',
            dataType: 'json',
            type: 'post',
            async: false
        }).responseJSON;

        // serverData.palyerslist.forEach(function (player, index, players) {
        //     var hours = Math.floor(player.time / 60 / 60)
        //     var minutes = Math.floor((player.time - hours * 60 * 60) / 60)
        //     var time = {
        //         hours: hours,
        //         minutes: minutes
        //     }
        //     players[index].time = time;
        // })

    }
}



$( document ).ready(function() {

    setTimeout(function() {
        $('.ttop').tooltip();
    }, 500);


    setTimeout(function() {
        // m_chat.init();
    }, 200);
    setTimeout(site.loadAll, 200);
    setInterval(site.loadAll, 5000);
});
