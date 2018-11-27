'use strict';

describe('Thermostat', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function(){
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('has a default power saver state of off', function() {
    expect(thermostat.isPowerSaverOn()).toEqual(true);
  });

  describe("#up",function(){

    it('increases temp by 1',function(){
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });

    it("can't go above 25 in power saver mode",function(){
      while(thermostat.getCurrentTemperature() < 25) {
        thermostat.up();
      }
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });

    it("can't go above 32 not in power saver mode",function(){
      thermostat.saverToggle();
      while(thermostat.getCurrentTemperature() < 32) {
        thermostat.up();
      }
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });

  });

  describe("#down",function(){

    it('decreases temp by 1',function(){
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });

    it("can't go below 10",function(){
      while(thermostat.getCurrentTemperature() > 10) {
        thermostat.down();
      }
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });

  });

  describe("#reset",function(){

    it("it resets temperature to 20",function(){
      while(thermostat.getCurrentTemperature() > 10) {
        thermostat.down();
      }
      thermostat.reset();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

  });

  describe("#usage",function(){

    it("it says low if temp below 18",function(){
      while(thermostat.getCurrentTemperature() > 17) {
        thermostat.down();
      }
      expect(thermostat.energy()).toEqual('low-usage');
    });

    it("it says medium if temp below 25",function(){
      while(thermostat.getCurrentTemperature() > 25) {
        thermostat.up();
      }
      expect(thermostat.energy()).toEqual('medium-usage');
    });

    it("it says high if temp above 25",function(){
      thermostat.saverToggle();
      while(thermostat.getCurrentTemperature() < 26) {
        thermostat.up();
      }
      expect(thermostat.energy()).toEqual('high-usage');
    });

  });

});
