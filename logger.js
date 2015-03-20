/*
*   loggger.js
*   
*   A logger librarry which provides a wrapper for the browsers console, 
*   as well as communication with hipchat and the LoggerService App
*
*   author: Jeremy Huff
*
*   USAGE: 
*

    var logger = new Logger({
        appName: "Logger Test App",
        maxLevel: "debug",
        error: "on",
        notifyHipchat: "on"
    });

    logger.out("out test");
    logger.debug("debug test");
    logger.info("info test");
    logger.warn("warn test");
    logger.error("error test");

*   
*/

var Logger = function(settings) {
     
    if(!settings) settings = {};

    this.appName = settings.appName ? settings.appName : "Uknown Application"
    
    this.notifyHipchat = settings.notifyHipchat == "off" ? false : true;

    this.notifyLoggerService = settings.notifyLoggerService == "off" ? false : true;
    
    // Enumish string to int conversion for log levels
    this.levels = {
        off: 0,
        out: 1,
        debug: 2,
        info: 3,
        warn: 4,
        error: 5
    };
    
    // The ability to turn off selected instances
    this.off = {
        out: settings.out == "off" ? true : false,
        debug: settings.debug == "off" ? true : false,
        info: settings.info == "off" ? true : false,
        warn: settings.warn == "off" ? true : false,
        error: settings.error == "off" ? true : false
    };
    
    // The ability to turn on selected instances
    this.on = {
        out: settings.out == "on" ? true : false,
        debug: settings.debug == "on" ? true : false,
        info: settings.info == "on" ? true : false,
        warn: settings.warn == "on" ? true : false,
        error: settings.error == "on" ? true : false
    };
    
    // This is the mac log level that will be displayed, not including 
    // specific log levels that have been turned on/off
    this.maxLevel = settings.maxLevel ? this.levels[settings.maxLevel] : this.levels["error"];
    
    return this
}

Logger.prototype = {
    
    out: function(message) {
        var skip = false;
        
        if(this.maxLevel < this.levels["out"]) skip = true;
        if(this.off.out) skip = true;
        if(this.on.out) skip = false;
        
        if(skip) return;
        
        var date = new Date();
        var displayDate = date.getUTCFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();
        
        console.log(" ");
        console.log("[OUT] " + displayDate + " - " + message );

    },
    
    debug: function(message) {
       var skip = false;
        
        if(this.maxLevel < this.levels["debug"]) skip = true;
        if(this.off.debug) skip = true;
        if(this.on.debug) skip = false;
        
        if(skip) return;
        
        var date = new Date();
        var displayDate = date.getUTCFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();
        
        console.log(" ");
        console.debug("***** DEBUG *****");
        console.log(displayDate);
        console.log(message);
    },
    
    info: function(message) {
        var skip = false;
        
        if(this.maxLevel < this.levels["info"]) skip = true;
        if(this.off.info) skip = true;
        if(this.on.info) skip = false;
        
        if(skip) return;
        
        var date = new Date();
        var displayDate = date.getUTCFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();

        console.log(" ");
        console.info("***** INFO *****");
        console.log(displayDate);
        console.log(message);
    },
    
    warn: function(message) {
        var skip = false;
        
        if(this.maxLevel < this.levels["warn"]) skip = true;
        if(this.off.warn) skip = true;
        if(this.on.warn) skip = false;
        
        if(skip) return;
        
        var date = new Date();
        var displayDate = date.getUTCFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();
        
        console.log(" ");
        console.warn("***** WARN *****");
        console.log(displayDate);
        console.log(message);
    },
    
    error: function(message, toLoggerService, toHipchat) {
        
        var date = new Date();
        var displayDate = date.getUTCFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() +" "+ date.getHours() +":"+ date.getMinutes();
        var err = new Error(message);

        if(toHipchat !== false) this.hipchat(err.stack);
        if(toLoggerService !== false) this.loggerService(err.stack);
        
        var skip = false;
        
        if(this.maxLevel < this.levels["error"]) skip = true;
        if(this.off.error) skip = true;
        if(this.on.error) skip = false;
        
        if(skip) return;
        
        console.log(" ");
        console.error("***** ERROR *****");
        console.log(displayDate);
        console.log(err.stack);
    },

    hipchat: function(message) {
        var url = 'http://api.hipchat.com/v1/rooms/message?format=json&auth_token=###&room_id=###&message_format=html&from='+this.appName+'&notify=1&color=red&message='+message;
        if(this.notifyHipchat) this.ajax(url, "POST");   
    },

    loggerService: function(stack) {
        var url = 'http://localhost:9001/log?appname='+this.appName+'&stack='+stack;
        if(this.notifyLoggerService) this.ajax(url, "GET");
    },

    ajax: function(url, method) {      
        var request = new XMLHttpRequest();
        request.open(method, url, true);
        request.send(null);
    }
    
}