var site = {

    currentPage: ko.observable(),
    pages: ko.observableArray(),
    currnetMap: ko.observable(),
    maxPlayers: ko.observable(),
    playersAmount: ko.observable(),
    playersList: ko.observableArray(),

    goto: function(Direction) {
        site.currentPage(Direction);
        pager.navigate(Direction);
    },

    loadAll: function() {
        var serverData = $.ajax({
            url: 'api/getserverdata',
            dataType: 'json',
            type: 'post',
            async: false
        }).responseJSON;

        console.log("update");

        serverData.palyerslist.forEach(function (player, index, players) {
            var hours = Math.floor(player.time / 60 / 60)
            var minutes = Math.floor((player.time - hours * 60 * 60) / 60)
            var time = {
                hours: hours,
                minutes: minutes
            }
            players[index].time = time;
        })

        console.log(serverData.palyerslist);
        site.currnetMap(serverData.map);
        site.playersAmount(serverData.playersamount);
        site.maxPlayers(serverData.maxplayers);
        site.playersList(serverData.palyerslist);
    }
}



$( document ).ready(function() {

    setTimeout(function() {
        $('.ttop').tooltip();
    }, 500);

    var pager = new Pager($, ko)
    window.pager = pager
    pager.useHTML5history = true
    pager.Href5.history = History
    pager.extendWithPage(site)
    ko.applyBindings(site)
    pager.startHistoryJs()
    History.Adapter.bind(window, "statechange", function() {
        site.currentPage(pager.page.route[0])
    })

    site.goto("statistics");

    setTimeout(site.loadAll, 200);
    setInterval(site.loadAll, 5000);
});
