
//squares

// import Synthesizer from './synthesizer.js';
// import ScaleMaker  from 'scale-maker';
// import Controls from './controls.js';
// import ImageCanvas from './imageCanvas.js';
// import DrawCanvas from './drawCanvas.js';


var synth, controls, imageCanvas, drawCanvas;

var prevTime, data;
var colPos = 0;
var isPlaying = false;



var settings = {
  brightness: 0.5,
  contrast : 0.5,
  invert: false,
  // repetitions : {
  //   x: 0,
  //   y: 0,
  // },
  // offset: {
  //   x: 0,
  //   y: 0
  // },
  // spacing: {
  //   x: 0.16,
  //   y: 0.16
  // },
  rotation: 0,
  play: false,
  speed: 0.2,
  // drawMode: true,
  // stroke_width: 0.1,
  // stroke_repetitions: 0.3,
  // stroke_opacity: 1.0,
  // eraser: 0,
  // stroke_offset: {
  //   x: 0.6,
  //   y: 0.6
  // },
  scale: {
    numSteps: 30,
    note: "C",
    octave: 2,
    type: 'majorPentatonic'
  },

  reverb: 0.25,
  maxGain: 0.75
};

var synthObj = {};
//var numSteps = 30;

//var isPlaying = false;


var scaleFrequencies;
//var settings.speed = 60;
var playheadCanvas, imageData, ctx, playheadCtx, ongoingTouches, mouse, touchObject, backgroundColor;
var oscillators, audioCtx, compressor, reverbUrl,reverb,reverbGain;
// timing params
var requestId, startTime;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

//var scaleFrequencies = ScaleMaker.makeScale('chinesePentatonic', 'A#3', numSteps).inHertz;

//console.log(settings.scale);

window.onload = function(){
  // var l = document.getElementById("landing");
  // l.onclick = init;
 init();
};

function handlePlay(){
 prevTime = audioCtx.currentTime;
 settings.play = true;
 nx.widgets["play"].set({value: settings.play});
// console.log(audioCtx);
 if(audioCtx.resume){
    audioCtx.resume();
 } else {
  //browser doesnt support resume()
 }

  requestId = requestAnimationFrame(nextStep);
}

function regenerateSynth(){
  synth.endSynth();
  //synth.endP5Synth();
  var note = settings.scale.note + "" + settings.scale.octave;
  //console.log(settings.scale.numSteps);
  scaleFrequencies = makeScale(settings.scale.type, note, parseInt(settings.scale.numSteps)).inHertz;
  synth = new Synthesizer(scaleFrequencies, compressor, audioCtx);
}

function handleStop(){
  settings.play = false;
  nx.widgets["play"].set({value: settings.play});
  //native oscillaators
  if(audioCtx.suspend){
   // audioCtx.resume();
    audioCtx.suspend();
  } else {
    //browser doesnt support suspend()
    // synth.zeroGains();
    var gainVals = [];
    for(var i = 0; i < settings.scale.numSteps; i++){
      gainVals[i] = 0;
    }
    synth.updateGains(gainVals);
    cancelAnimationFrame(requestId);
  }

  //for p5
  // var gainVals = [];
  // for(var i = 0; i < settings.scale.numSteps; i++){
  //   gainVals[i] = 0;
  // }
  // synth.updateP5Gains(gainVals);
}

function init(){
  //log("init");
  //document.body.removeChild(document.getElementById("landing"));
  ongoingTouches = new Array();

  touchObject = {};
  oscillators = {};

   imageCanvas = new ImageCanvas(settings, handlePlay);
   //drawCanvas = new DrawCanvas(settings);
   playheadCanvas = document.createElement("canvas");
   playheadCanvas.width = window.innerWidth;
   playheadCanvas.height = window.innerHeight;
   playheadCanvas.style.position = "fixed";
   playheadCanvas.style.top = "0px";
   playheadCanvas.style.left = "0px";
   playheadCtx = playheadCanvas.getContext('2d');
   backgroundColor = "rgba(242, 35, 12, 0.1)";

   //loadSound("../impulse/ArbroathAbbeySacristy.m4a");
   initAudioCtx();

   document.body.appendChild(playheadCanvas);
   controls = new Controls(imageCanvas, drawCanvas, settings, handlePlay, handleStop, regenerateSynth);
   setEventHandlers();

   document.body.onkeydown = function(e){
     console.log(e.keyCode + " pressed");
     if(e.keyCode == 32){ // space bar
       if(settings.play){
         settings.play = false;
         handleStop();
       } else {
         settings.play = true;
         handlePlay();
       }
     } else if(e.keyCode == 38){ // up key
       settings.speed +=0.1;
       nx.widgets["speed"].set({value: settings.speed});
     } else if(e.keyCode == 40){ //down key
       settings.speed -=0.1;
       settings.speed = Math.max(settings.speed,0);
       nx.widgets["speed"].set({value: settings.speed});
     } else if(e.keyCode == 73){ // i key
       imageCanvas.settings.invert = !imageCanvas.settings.invert;
       imageCanvas.invert();
     } else if(e.keyCode == 67){ //c key
       imageCanvas.increaseContrast();
     } else if(e.keyCode == 88){ //x key
       imageCanvas.decreaseContrast();
     } else if(e.keyCode == 66){//b key
       imageCanvas.brighter();
     } else if(e.keyCode == 86){ //v key (left of b)
       imageCanvas.darker();
     }
  }

}

function setEventHandlers(){
  console.log("setting event handlers");
  // playheadCanvas.addEventListener("touchstart", handleTouchStart, false);
  // playheadCanvas.addEventListener("touchend", handleTouchEnd, false);
  // playheadCanvas.addEventListener("touchcancel", handleTouchCancel, false);
  // playheadCanvas.addEventListener("touchmove", handleTouchMove, false);
  // playheadCanvas.addEventListener("mousedown", handleMouseStart, false);
  // playheadCanvas.addEventListener("mousemove", handleMouseMove, false);
  // playheadCanvas.addEventListener("mouseup", handleMouseUp, false);
  // playheadCanvas.addEventListener("mouseout", handleMouseUp, false);
  // playheadCanvas.addEventListener("mouseleave", handleMouseUp, false);
  window.addEventListener("resize", onResize);
}



function initAudioCtx(){
  audioCtx = new window.AudioContext();
  reverbjs.extend(audioCtx);
  compressor = audioCtx.createDynamicsCompressor(); //gain node is connected to compressor
  // compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
  // compressor.knee.setValueAtTime(40, audioCtx.currentTime);
  // compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
  // compressor.attack.setValueAtTime(0, audioCtx.currentTime);
  // compressor.release.setValueAtTime(0.25, audioCtx.currentTime);
  compressor.connect(audioCtx.destination); //dry signal

  reverbGain = audioCtx.createGain();
  reverbGain.connect(audioCtx.destination);
  //gain.connect(this.ctx.destination);
  reverbGain.gain.value = settings.reverb;
  reverbUrl = "../impulse/ArbroathAbbeySacristy.m4a";//"http://reverbjs.org/Library/AbernyteGrainSilo.m4a"; //"../impulse/ArbroathAbbeySacristy.m4a"
  reverb = audioCtx.createReverbFromUrl(reverbUrl, function() {
    reverb.connect(reverbGain);
  });
  compressor.connect(reverb);

  scaleFrequencies = makeScale(settings.scale.type, 'C3', settings.scale.numSteps).inHertz;
  synth = new Synthesizer(scaleFrequencies, compressor, audioCtx);

  //testing p5 osc
  // osc = new p5.Oscillator(20,'sine'); // set frequency and type
  // osc.amp(.9);
  // osc.freq(200);
  // osc.start();
}

function nextStep(){
  //var col = Math.floor(audioCtx.currentTime*settings.speed);
  //var step = Math.floor((audioCtx.currentTime - prevTime)*(settings.speed*400-200));
  var step = Math.floor((audioCtx.currentTime - prevTime)*(settings.speed*700)); //so minimum speed is 0
  var col = colPos + step;
  if(col>=imageCanvas.canvas.width){
    while(col>=imageCanvas.canvas.width){
      col-=imageCanvas.canvas.width;
    }
  }
  if(col < 0) col+=imageCanvas.canvas.width;

  playheadCtx.clearRect(0, 0, playheadCanvas.width, playheadCanvas.height);
  playheadCtx.fillStyle = "rgba(255, 0, 102, 1)";
  playheadCtx.fillRect(col-5, 0, 10, imageCanvas.canvas.height);
  playheadCtx.fillStyle = "rgba(153, 255, 204, 1)";

  var gainVals = [];
  for(var i = 0; i < settings.scale.numSteps; i++){
    var row = Math.floor((i+0.5)*imageCanvas.canvas.height/settings.scale.numSteps);
    var off = (row*imageCanvas.canvas.width+col)*4;
    var val;

    //using greyscale brightness of color data
    val = settings.maxGain*(imageCanvas.imageData[off]+imageCanvas.imageData[off+1]+imageCanvas.imageData[off+2])/(255*3);
    //0.299r + 0.587g + 0.114b //original colour weighting
    //val = settings.maxGain*(0.299*imageCanvas.imageData[off]+0.587*imageCanvas.imageData[off+1]+0.114*imageCanvas.imageData[off+2])/(255*3);


    //using one element of greyscale data + draw canvas
    //val = (imageCanvas.imageData[off]+drawCanvas.imageData[off]*(drawCanvas.imageData[off+3]/255))/255;
    //val = (imageCanvas.imageData[off])/255;
      // console.log(val);
      // console.log(row);
       // }
    //playheadCtx.fillRect(col-5, row, 10, val*20);
    playheadCtx.fillRect(col-5, row - val*20/2, 10, val*20);
    gainVals[i] = val;
       // if(val > 0) synth.playNote(i, val);
    }
  //if (col%20==0){synth.updateGains(gainVals);}; //try throlling, didn't help with artifact
  //synth.updateGains(gainVals);
  if (settings.play===true) {synth.updateGains(gainVals)};
  //if (settings.play===true) {synth.updateP5Gains(gainVals);};
  requestId = requestAnimationFrame(nextStep);
  colPos = col;
  prevTime = audioCtx.currentTime;
}


function handleMouseStart(e){
  // isScrubbing = true;
  // console.log(e.pageX);
  // colPos = e.pageX;
  // console.log(colPos);
  drawCanvas.startStroke(e.pageX, e.pageY);
}

function handleMouseMove(e){
  // if(isScrubbing){
  //    colPos = e.pageX;
  //  }
   drawCanvas.continueStroke(e.pageX, e.pageY);
}

function handleMouseUp(){
  //isScrubbing = false;
  drawCanvas.endStroke();
}

function handleTouchStart(e) {
  // isScrubbing = true;
  //  var touches = e.changedTouches;
  if(e.touches!=undefined){
    // colPos = e.touches[0].pageX;
    drawCanvas.startStroke(e.touches[0].pageX, e.touches[0].pageY);
  }
}

function onResize(){
  imageCanvas.resize(window.innerWidth, window.innerHeight);
  //drawCanvas.resize(window.innerWidth, window.innerHeight);
  playheadCanvas.width = window.innerWidth;
  playheadCanvas.height = window.innerHeight;
}

function handleTouchMove(e) {
  drawCanvas.continueStroke(e.touches[0].pageX, e.touches[0].pageY);

}

function handleTouchEnd(e) {
  drawCanvas.endStroke();
}

function handleTouchCancel(e) {

}
