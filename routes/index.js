
/*
 * GET home page.
 */

var http = require("http");
var numberOfCityInHeader = 11;

getRandomCities = function(number)
{
  cities =["Istanbul", "Moscow", "London", "Saint Petersburg", "Berlin", "Madrid", "Kiev", "Rome", "Paris", "Bucharest", "Hamburg", "Minsk", "Warsaw", "Vienna", "Barcelona", "Budapest", "Kharkiv", "Munich", "Milan", "Stockholm", "Nizhniy Novgorod", "Prague", "Sofia", "Kazan", "Samara", "Belgrade", "Copenhagen", "Dublin", "Brussels", "Rostov-na-Donu", "Dnipropetrovsk", "Ufa", "Cologne", "Odesa", "Donetsk" , "Perm", "Volgograd", "Naples", "Birmingham", "Valencia", "Oslo", "Turin", "Voronezh", "Saratov", "Zaporizhzhya", "Marseille", "Amsterdam", "Krakow", "Athens", "Lodz"];
  res = [];
  for(var i=0;i<number;i++)
    res.push(cities[Math.floor(Math.random()*50)]);
  return res;
}


gencity = function(city){
  var options = {
    host:"maps.googleapis.com",
    port:80,
    path:"/maps/api/geocode/json?address="+escape(city+", Europe")+"&sensor=true"
  }
  return options;
}

exports.index = function(req, res){
  res.render('index', { title: 'Express',  background:true, error:false, cities: getRandomCities(numberOfCityInHeader) });
};

exports.search = function(req, res){
  var city;
  if(typeof(req.query["city"]) !== "undefined")
  {
    city = req.query["city"];
    console.log(req.query["city"]);
  }
  else
    city = req.param('city', null);
  if((typeof(city) === "Undefined")||(city === ""))
  {
    city = getRandomCities(1);
    city = city[0];
  }
  http.get(gencity(city), function(googleres){
    var pagedata="";
    googleres.setEncoding("utf-8");
    googleres.on('data', function(chunk){
      pagedata += chunk;
    });

    googleres.on('end', function(){
      result = JSON.parse(pagedata);
      if (result.status=="ZERO_RESULTS")
        res.render('index', { title: 'Express',  background:true , error:true, cities: getRandomCities(numberOfCityInHeader)});
      else{
        var location = result.results[0].geometry.location;
        res.render('search', {title: 'Search', lat: location.lat, lng: location.lng, background:false, cities: getRandomCities(numberOfCityInHeader), city:result.results[0].formatted_address});
      }
    });
  });
}

