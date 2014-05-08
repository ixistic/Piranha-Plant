var url = 'https://goinstant.net/0bcdfd48b1a6/PiranhaPlant';
var connect = goinstant.connect(url);
connect.then(function(result) {
    var conn = result.connection;
    var lobby = result.rooms[0];
});
var data = lobby.key('/');
data.get().then(function(results)) {
    results = {name: 'iXisTiC',score: '100'};
}