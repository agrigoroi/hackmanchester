
/*
 * GET home page.
 */

var http = require("http");

gencity = function(city){
  var options = {
    host:"maps.googleapis.com",
    port:80,
    path:"/maps/api/geocode/json?address="+city+"&sensor=false"
  }
  return options;
}

exports.index = function(req, res){
  res.render('index', { title: 'Express',  background:'true' });
};

exports.search = function(req, res){
  http.get(gencity(req.param('city', null)), function(googleres){
    var pagedata="";
    googleres.setEncoding("utf-8");
    googleres.on('data', function(chunk){
      pagedata += chunk;
    });

    googleres.on('end', function(){
      result = JSON.parse(pagedata);
      var location = result.results[0].geometry.location;
      res.render('search', {title: 'Search', lat: location.lat, lng: location.lng, background:'false'});
    });
  });
}

