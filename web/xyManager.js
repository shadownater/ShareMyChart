/**
 * @description - constructor for the xyManager, which manages which buttons are pushed
 */
var xyManager = function() {
    //console.log("xymanager created");
    var x_value;
    var y_value;
    var x_name;
    var y_name;

};

/**
 * @description - gets the value of x, y as an array (their id relates to their paramter)
 * @returns {Array}
 */
xyManager.prototype.getArray = function(){
    var xy_array = [];
    xy_array.push(this.x_value);
    xy_array.push(this.y_value);
    return xy_array;
};

/**
 * @description - sets the value of the given x, y button pushed
 * @param button - has a value in the form of x-3, y-4, etc
 * @param testValue - literally only here so backendtest doesnt move forward
 */
xyManager.prototype.setValue = function(button, testValue){
  if(button.indexOf('x') != -1){
      this.setX( button, testValue );
  }else this.setY( button, testValue );

};
/**
 * @description - sets the x_name and x_value
 * @param xValue - the button's id to that parameter (x-0, etc)
 * @param testValue - literally only there to prevent test from going to ui parts
 */
xyManager.prototype.setX = function(xValue, testValue){
    //check if value is already at 0
    this.x_name = xValue;
    //console.log(xValue);
   // if(xValue == null){
     //   return;
    //}else {
        var x_val = xValue.substring(xValue.lastIndexOf("-") + 1);

        this.x_value = x_val;

        if (this.isSet()) {
            //call something to create the graph
            //console.log("x=" + this.x_value + " y=" + this.y_value);
            if(typeof testValue=='undefined') this.startGraphing();
        }
    //}
};
/**
 * @description - sets the y value
 * @param yValue - the button's parameter id (y-0, etc)
 * @param testValue - literally only there so tests don't go to ui parts
 */
xyManager.prototype.setY = function(yValue, testValue){
    this.y_name = yValue;
   // if(yValue == null) {
     //   return;
    //}else{
        var y_val = yValue.substring(yValue.lastIndexOf("-") + 1)

        this.y_value = y_val;
        if (this.isSet()) {
            //call something to create the graph
            //console.log("x=" + this.x_value + " y=" + this.y_value);
            if(typeof testValue=='undefined') this.startGraphing();
        }
    //}
};

/**
 * @description - checks if both the x and y
 * @returns {boolean}
 */
xyManager.prototype.isSet = function(){
    if(typeof this.x_value == 'undefined' || typeof this.y_value == 'undefined' || this.x_value == null || this.y_value ==null){
        return false;
    }else{
        //console.log(this.x_value);
        //console.log(this.y_value);
        return true;
    }
};
/**
 * @description - Gets the y value
 * @returns {string}
 */
xyManager.prototype.getY = function(){
    return this.y_value;
};
/**
 * @description - Gets the x value
 * @returns {string}
 */
xyManager.prototype.getX = function(){
    return this.x_value;
};
/**
 * @description - Gets the x name
 * @returns {string}
 */
xyManager.prototype.getXName = function(){
    return this.x_name;
};

/**
 * @description - Gets the y name
 * @returns {string}
 */
xyManager.prototype.getYName = function(){
  return this.y_name;
};

/**
 * @description - Calls the functions to start graph ui things
 *
 */
xyManager.prototype.startGraphing = function(){
    GlobalDataArray.clear();
    GetLink(this.x_value, this.y_value, GlobalStore);
    //pickGraphTypes(this.x_value, this.y_value);
    var xType = pManager.getType(this.x_value);
    var yType = pManager.getType(this.y_value);
    initFilter();
    getParaType(xType,yType);
};

/**
 * @description - clears the xymanager
 */
xyManager.prototype.clearManager = function(){
  this.x_name =null;
  this.y_name=null;
  this.x_value=null;
  this.y_value=null;
};

/**
 * clears the x names and values
 */
xyManager.prototype.clearX = function(){
    this.x_name = null;
    this.x_value = null;
}

/**
 * @description -show the current x value at the top right part of the page
 * clears the y names and values
 */
xyManager.prototype.clearY = function(){
    this.y_name = null;
    this.y_value = null;
}
/**
 * show the current x value at the top right part of the page
 */
xyManager.prototype.placeCoordinateX = function(){
    var place = document.getElementById("xParameter");
    //if(place.hasChildNodes()){
        xymanager.clearCoordinateX();
    //}
    var index = this.getX();
    var text = pManager.getRealName(index);
    //text = "X | " + text.charAt(0).toUpperCase() + text.slice(1);
    text = text.charAt(0).toUpperCase() + text.slice(1);
    var name = document.createTextNode(text);
    place.append(name);
};

/**
 * @description - show the current y value at the top right part of the page
 */
xyManager.prototype.placeCoordinateY = function(){
    var place = document.getElementById("yParameter");
    //if(place.hasChildNodes()){
        xymanager.clearCoordinateY();
    //}
    var index = this.getY();
    var text = pManager.getRealName(index);
    //text = "Y | " + text.charAt(0).toUpperCase() + text.slice(1);
    text = text.charAt(0).toUpperCase() + text.slice(1);
    var name = document.createTextNode(text);
    place.append(name);

};

/**
 * @description - clear the x value shown at top right of the page
 */
xyManager.prototype.clearCoordinateX = function(){
    var place = document.getElementById("xParameter");
    if(place.textContent.length > 5){
        place.textContent = "";
        place.textContent = " X | ";
    }

};

/**
 * @description - clear the y value shown at top right of the page
 */
xyManager.prototype.clearCoordinateY = function(){
    var place = document.getElementById("yParameter");
    if(place.textContent.length > 5){
        place.textContent = "";
        place.textContent = " Y | ";
    }

};