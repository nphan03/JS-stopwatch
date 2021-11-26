/* how to get the time: use currentTime minus startTime minus stopDuration
    if stop in between: get stopTime,
    resume: calculate stopDuration (+=currentTime - stopTime), then start interval
*/

var time=document.getElementById('time');
var startbtn=document.getElementById('start');
var stopbtn=document.getElementById('stop');
var resetbtn=document.getElementById('reset');

var startTime=null;
var stopTime=null;
var stopDuration=0;
var interval = null;

var printTime = (millisec,sec,min,hrs) => {
  time.innerHTML=String(hrs).padStart(2,'0') + ":" + String(min).padStart(2,'0') + ":" + String(sec).padStart(2,'0') + ":" + String(millisec).padStart(3,'0');
};

function start(){
  if(startTime == null){ //check that clock is not running. NOT RUNNING: get startTime
    startTime = new Date();
  }
  if(stopTime != null){ 
    stopDuration += (new Date() - stopTime);
  }
  interval = setInterval(counter, 10);
}

function stop(){
  stopTime = new Date();
  clearInterval(interval);
}
function reset(){
  stopDuration=0;
  startTime=null;
  stopTime=null;
  printTime(0,0,0,0);
  clearInterval(interval);
}

function counter(){
    var currentTime = new Date();
    var timeLapse = new Date(currentTime - startTime - stopDuration);
    var millisec = timeLapse.getUTCMilliseconds(),
        sec      = timeLapse.getUTCSeconds(),
        min      = timeLapse.getUTCMinutes(),
        hrs      = timeLapse.getUTCHours();
    printTime(millisec, sec, min, hrs);
}

printTime(0,0,0,0);
startbtn.addEventListener("click", () => start());
stopbtn.addEventListener("click", () => stop());
resetbtn.addEventListener("click", () => reset());