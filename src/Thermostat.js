'use strict';
function Thermostat() {
  this.MINIMUM_TEMPERATURE = 10;
  this.MEDIUM_TEMPERATURE = 18;
  this.MAXIMUM_TEMPERATURE_SAVER_OFF = 32;
  this.MAXIMUM_TEMPERATURE_SAVER_ON = 25;
  this.DEFAULT_TEMP = 20
  this.temp = this.DEFAULT_TEMP
  this.saver = true
  this.city = "London"

}

Thermostat.prototype.setCity = function (city) {
  this.city = city;
};

Thermostat.prototype._setTemperature = function (num) {
  this.temp = num
};

Thermostat.prototype.up = function () {
  if(this.isMaximumTemperature()) {
    return;
  }
  this.temp ++;
};

Thermostat.prototype.down = function () {
  if(this.isMinimumTemperature()) {
    return;
  }
  this.temp --;
};

Thermostat.prototype.saverToggle = function () {
  if(this.temp > this.MAXIMUM_TEMPERATURE_SAVER_ON) {
    this.temp = this.MAXIMUM_TEMPERATURE_SAVER_ON;
  }
  this.saver = !this.saver;
};

Thermostat.prototype._setSaverState = function (state) {
  if(state === true || state === false) {
    this.saver = state;
  }
};

Thermostat.prototype.saverState = function () {
  if(this.saver === true) {
    return "on";
  }
  return "off";
};

Thermostat.prototype.reset = function () {
  this.temp = this.DEFAULT_TEMP;
};

Thermostat.prototype.energy = function () {
  if (this.temp < this.MEDIUM_TEMPERATURE) {
     return "low-usage";
  }
  if (this.temp >= this.MEDIUM_TEMPERATURE && this.temp < this.MAXIMUM_TEMPERATURE_SAVER_ON) {
     return "medium-usage";
  }
  return "high-usage";
};

Thermostat.prototype.getCurrentTemperature = function () {
  return this.temp;
};

Thermostat.prototype.isMinimumTemperature = function () {
  return this.MINIMUM_TEMPERATURE >= this.temp;
};

Thermostat.prototype.maxTemperature = function () {
  if(this.saver === false) {
    return this.MAXIMUM_TEMPERATURE_SAVER_OFF;
  }
  return this.MAXIMUM_TEMPERATURE_SAVER_ON;
};

Thermostat.prototype.isMaximumTemperature = function () {
  return this.temp >= this.maxTemperature();
};

Thermostat.prototype.isPowerSaverOn = function () {
  return this.saver;
};
