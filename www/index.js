var site = {

    currentPage: ko.observable(),
    pages: ko.observableArray(),

    goto: function(Direction) {
        site.currentPage(Direction);
        pager.navigate(Direction);
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

});
