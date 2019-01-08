var Player = (function () {
    var _Player = function (player_data) {
        this.name = player_data.name
        this.score = player_data.score

        var hours = Math.floor(player_data.time / 60 / 60)
        var minutes = Math.floor((player_data.time - hours * 60 * 60) / 60)
        this.time = {
            hours: hours,
            minutes: minutes
        }
        
        ko.track(this)
    }
    return _Player
})()

var Statistics = (function () {
    var _Statistics = function () {
        this.map_name = ""
        this.max_players = 0
        this.players_count = 0
        this.players = []

        ko.track(this)
    }
    _Statistics.prototype.getServerData = function () {
        var serverData = $.ajax({
            url: 'api/getserverdata',
            dataType: 'json',
            type: 'post',
            async: false
        }).responseJSON;

        this.map_name = serverData.map
        this.max_players = serverData.maxplayers
        console.log(serverData)
        this.players = serverData.palyerslist.map(function(player_data) {
            return new Player(player_data)
        })
        this.players_count = this.players.length
    }

    return _Statistics
})()
window.Statistics = new Statistics()

$(document).ready(function () {
    ko.applyBindings(window.Statistics, document.getElementById("statistics"));
    Statistics.getServerData()
    setInterval(function(){
        Statistics.getServerData()
    }, 10 * 1000)
});
