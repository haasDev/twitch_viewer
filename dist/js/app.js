var app = angular.module('TwitchStreams', []);
app.controller('MainCtrl', function($scope, $http) {

  $scope.streams = [];
  // Local variables
  var streamers = ["freecodecamp", "GeoffStorbeck", "terakilobyte", "habathcx","RobotCaleb","medrybw","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"];
  var cb = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
  var url = 'https://api.twitch.tv/kraken/';

  // Get information for streamers
  streamers.forEach(function(stream) {

    // Temporary object
    var obj = {};

    // Check if streaming
    $.getJSON(url + 'streams/' + stream + cb).success(function(data) {
      var streaming = (data.stream === null) ? false : true;
      if (streaming) {
        obj.status = 'green fa fa-check';
        var streamTitle = data.stream.channel.status;

        if (streamTitle.length > 36) {
          streamTitle = streamTitle.substring(0,33);
          streamTitle += '...';
        }
        obj.desc = streamTitle;
      } else {
        obj.status = 'red fa fa-exclamation';
        data.streamTitle = '';
      }
      obj.username = stream;
      obj.url = stream;

      // Get user name and image
      $.getJSON(url + 'users/' + stream + cb).success(function(data) {
        obj.channel = data.display_name;
        obj.logo = data.logo;
        $scope.streams.push(obj);
        $scope.$apply();
      });
    });
  });
});
