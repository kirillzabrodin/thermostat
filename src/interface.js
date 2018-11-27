$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  updateSaverState();

  displayWeather('London');
  $('#city').text("London");

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    displayWeather(city);
    $('#city').text(city);
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
  }
  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.energy());
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
     $('#current-temperature').text(data.main.temp);
    })
  }
});
