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

        site.currnetMap(serverData.map);
        site.playersAmount(serverData.playersamount);
        site.maxPlayers(serverData.maxplayers);
        site.playersList(serverData.palyerslist);
    }
}



$( document ).ready(function() {

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
    pager.navigate("statistics");

    setTimeout(site.loadAll, 200);

});
