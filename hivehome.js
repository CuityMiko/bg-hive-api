var Hive = require('./index.js');
var util = require('util');

var hive = new Hive();
var controller;

function EventHandler()
{
    if (controller != undefined)
    {
        var Modes = controller.Mode;

        controller.on('update', function(data){
             console.log(data);
            hive.Logout();
        });

        controller.on('accepted', function(){
            controller.GetState();
        });

        controller.on('error', function(response){
            console.log(response);
            hive.Logout();
        });

        controller.on('complete', function(response){
            console.log(response);
            hive.Logout();
        });
    }
}

hive.on('login', function(hubs){
        hubs[0].HeatingController(function(thermostat){
            console.log('-> Got a controller');
            controller = thermostat;
            EventHandler();

            //var request = {control:{control:controller.Mode.Schedule}};

            controller.SetState({targetTemperature:{temperatureUnit:'C', temperature:'19'}});
        })
});

hive.on('logout', function(){
    console.log('-> Closed');
});

hive.Login();
