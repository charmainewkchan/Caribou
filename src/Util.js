function Util() {}

Util.validTime = function(startTime, endTime) {
    console.log("startime min = " + parseInt(startTime.substring(3,5)))
    console.log("endtime min = " + parseInt(endTime.substring(3,5)))
    console.log("bool = " + ((parseInt(startTime.substring(0,2)) > parseInt(endTime.substring(0,2))) && (parseInt(startTime.substring(3,5)) > parseInt(endTime.substring(3,5)))))
    if ((parseInt(startTime.substring(0,2)) > parseInt(endTime.substring(0,2))) || ((parseInt(startTime.substring(0,2)) == parseInt(endTime.substring(0,2))) && (parseInt(startTime.substring(3,5)) > parseInt(endTime.substring(3,5))))) {
      return false;
    } else {
      return true;
    }
  }

Util.timeTo12Hour = function(time) {
    var mins = parseInt(time.substring(3,5))
    var hours = parseInt(time.substring(0,2))


    if (mins < 10) {
    	mins = "0" + mins
    }


    if (hours >= 12) {
      hours = hours - 12;

      if (hours < 10) {
        hours = "0" + hours
      }
      return (hours + ":" + mins + " PM");
    }

    // else  
    if (hours == 0) {
        hours = 12;
    }

    if (hours < 10) {
      hours = "0" + hours
    }

    return (hours + ":" + mins + " AM");
  }
 
Util.timeTo24Hour = function(time) {
    var mins = parseInt(time.substring(3,5))
    var hours = parseInt(time.substring(0,2))
    var c = parseInt(time.substring(6,8))  //hh:mm cc

    if (mins < 10) {
    	mins = "0" + mins
    }

    if (c == "AM")
      return (hours + ":" + mins)
    else {
      if (hours != 12) {
      	hours += 12
      }
      return (hours+":"+mins)
    }
  }

export default Util