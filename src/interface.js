$(document).ready(function() {
  var thermostat = new Thermostat();
  getState();

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    $('#current-city').val("");
    $('#city').text(city);
    thermostat.setCity(city);
    displayWeather(city);
    updateCity();
  })

  $('#up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#reset').click(function() {
    thermostat.reset();
    updateTemperature();
  });

  $('#power-saver').click(function() {
    thermostat.saverToggle();
    updateSaverState();
    updateTemperature();
  });

  function updateSaverState() {
    $('#power-saver').text(thermostat.saverState ());
    $('#power-saver').attr('class', thermostat.saverState());
    updateState();
  }
  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.energy());
    updateTemp();
  }

  function displayWeather(city) {
    $('#city').text(city);
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
     $('#current-temperature').text(data.main.temp);
     $('#city').text(data.name + ":" + data.sys.country);
    })
  }

  function getState() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:9292/thermostat", true);
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        info = JSON.parse(this.response);
        displayWeather(info['city']);
        thermostat._setTemperature(info["temp"]);
        thermostat._setSaverState(info["state"]);
        updateTemperature();
        updateSaverState();
      }
    };
    xhttp.send();
  }

  function updateTemp() {
    var xhttp = new XMLHttpRequest();
    var url = 'http://localhost:9292/thermostat/update/temp';
    var param_array = {};
    param_array["temp"] = thermostat.getCurrentTemperature();
    var params = JSON.stringify(param_array);
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.send(params);
  }

  function updateState() {
    var xhttp = new XMLHttpRequest();
    var url = 'http://localhost:9292/thermostat/update/state';
    var param_array = {};
    param_array["state"] = thermostat.saver;
    var params = JSON.stringify(param_array);
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.send(params);
  }

  function updateCity() {
    var xhttp = new XMLHttpRequest();
    var url = 'http://localhost:9292/thermostat/update/city';
    var param_array = {};
    param_array["city"] = thermostat.city;
    var params = JSON.stringify(param_array);
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.send(params);
  }
});
