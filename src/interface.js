$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  updateSaverState();

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
});
