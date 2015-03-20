Logger.js
=========

A Logger Webservice for logging errors thrown in front end applications

Usage
-----

### Setup:
First this spring app must be deployed. For testing it can be cloned locally and launched with:

```Shell
mvn clean spring-boot:run
```

After it is running you must link to the front end library from your html document using a script tag. If you are running locally the default location of the javascript library would be "//localhost:9001/js/logger.js". After this is done you can instatiate Logger in any js document that appears lower in the html.

### Instantiation:

You can instantiate an instance of the logger by calling new on the constructor and
passing it initial settings. All settings have default values so no setting object is
required.

```Javascript
var logger = new Logger(settingsObj);
```

### Settings:

An example setting object would look like:

```Javascript
var settingsObj = {
        appName: "My Apps Name",
        maxLevel: "debug",
        error: "on",
        notifyHipchat: "on"
    }
```

All setting values are:

- <strong>appName</strong>: This name will be used in hipchat to designate the app which originated the error, and in the Logger Service to name the log file which the error will be written in. It defaults to "Uknown Application"

- <strong>maxLevel</strong>: This indicated the max log level that the application will operate at. The
potential values are "off", "out", "debug", "warn" and "error". This defaults to "error"

- <strong>error</strong>: can be set to "on" or "off" and will override maxLevel

- <strong>warn</strong>: can be set to "on" or "off" and will override maxLevel

- <strong>info</strong>: can be set to "on" or "off" and will override maxLevel

- <strong>debug</strong>: can be set to "on" or "off" and will override maxLevel

- <strong>out</strong>: can be set to "on" or "off" and will override maxLevel

- <strong>notifyHipchat</strong>: this can be set to "on" or "off" and toggles whether errors will be 
broadcast to hipchat. This defaults to "on"

- <strong>notifyLoggerService</strong>: this can be set to "on" or "off" and toggles whether errors will be 
broadcast to Logger Service. This defaults to "on"

### Logging:

```Javascript
logger.out("my output message message");
logger.info("my info message");
logger.debug("my debug message");
logger.warn("my warning message");
logger.error("my error message");
```

.error() takes an additional two boolean arguments, the first to toggle Logger Service broadcast and the second to turn toggle Hipchat broadcast. When set to false, either of these arguments will override your settings.




