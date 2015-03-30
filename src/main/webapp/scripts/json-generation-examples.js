$(function() {
	$("#btn_city1").click(function(e) {
		getCities("city-type-1", "json-city-table-1");
	});
	$("#btn_city2").click(function(e) {
		getCities("city-type-2", "json-city-table-2");
	});
	$("#btn_city3").click(function(e) {
		$.ajax({
			method: "GET",
			url: "show-city-types",
			dataType: "json",
			success: showCityTypes
		});
	});
	$("#btn_city4").click(function(e) {
		var data = "cityNames=" + makeJsonString(getRandomCities());
		$.ajax({
			method: "POST",
			url: "show-cities-3",
			dataType: "json",
			data: data,
			success: function (data, statusText, jqXHR, resultRegion) {
				showCities(data, statusText, jqXHR, "json-city-table-3");
			}
		});
	});
});

function getCities(selectId, resultRegionId) {
	var data = "cityType=" + $("#" + selectId).val();
	
	$.ajax({
		method: "POST",
		url: "show-cities-1",
		data: data,
		dataType: "json",
		success: function (data, statusText, jqXHR, resultRegion) {
			showCities(data, statusText, jqXHR, resultRegionId);
		}
	});
}

function showCities(data, statusText, jqXHR, resultRegionId) {
	var headings = ["City", "Time", "Population"];
	var rows = new Array();
	for (var i = 0; i < data.length; i++) {
		var city = data[i];
		rows[i] = [city.name, city.time, city.pop];
	}
	$("#" + resultRegionId).html(getTable(headings, rows));
}

function showCityTypes(data, statusText, jqXHR) {
    var headings = new Array();
    var row1Entries = new Array();
    var i = 0;
    for(var cityType in data) {
      headings[i] = cityType;
      row1Entries[i] = getBulletedList(data[cityType]);
      i++;
    }
    var rows = [row1Entries];
    $("#city-types").html(getTable(headings, rows));
}

var cityNames = 
  ["New York", "Los Angeles", "Chicago", "Houston",
   "Phoenix", "Philadelphia", "San Antonio", "San Diego",
   "Dallas", "San Jose", "Detroit", "Jacksonville", 
   "Indianapolis", "San Francisco", "Columbus", "Austin", 
   "Memphis", "Fort Worth", "Baltimore", "Charlotte", 
   "El Paso", "Milwaukeee", "Boston", "Seattle", 
   "Washington DC", "Denver", "Louisville", "Las Vegas", 
   "Nashville", "Oklahoma City", "Miami"];

function getRandomCities() {
  var randomCities = new Array();
  var j = 0;
  for(var i=0; i<cityNames.length; i++) {
    if(Math.random() < 0.25) {
      randomCities[j++] = cityNames[i];
    }
  }
  return(randomCities);
}
