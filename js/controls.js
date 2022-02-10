var images=[
{name: "galactic (xray)", value: "galactic_xray.jpg",altText: "X-ray image of the galactic core taken by the Chandra X-Ray Telescope"},
{name: "galactic (optical)", value: "galactic_optical.jpg",altText: "Optical image of the galactic core taken by the Hubble Space Telescope"},
{name: "galactic (infrared)", value: "galactic_ir.jpg",altText: "Infrared image of the galactic core taken by the Spitzer Telescope"},
// {name: "bar graph", value: "exoplanetDetectionsByYear.jpg"},
// {name: "scatter plot", value: "trappistLightCurve-single.jpg"},
// {name: "stacked scatter plots", value: "trappistLightCurves.jpg"},
{name: "skyline", value: "skyline.png",altText: "Skyline of city buildings on the edge of the water"},
{name: "stairway", value: "stairway.png",altText: "Looking down the middle of a rectangular spiral staircase"},
{name: "night sky", value: "nightsky.jpg",altText: "Artistic rendering of stars and a full moon above cloud tops"},
{name: "moire", value: "moire2.jpg",altText: "Abstract moire patter of curving lines"},
{name: "swoosh", value: "swoosh.jpeg",altText: "Vertical and bending lines, simialr to a fingerprint"},
{ name: "contour", value: "contour.jpg",altText: "Abstract line art in bottom half"},
{ name: "bird", value: "bird.png",altText: "Geometric bird art with wings on each side"},
{ name: "dots", value: "newsdots.jpg",altText: "Grid of white dots, getting bigger toward the bottom"},
{ name: "basquiat", value: "basquiat.jpg",altText: "Basquiat line drawing with test and crown shape"},
{ name: "keith haring", value: "haring2.jpeg",altText: "Keith Haring art with 3 and a half figrues on bottom and signature on top left"},
{ name: "maze", value: "maze.png",altText: "Maze made of up vertical and horizontal lines"}
//{name: "text", value: "text.png"} //missing file
];

var scales = ['major',
'naturalMinor',
'harmonicMinor',
'melodicMinor',
'chromatic',
'wholeTone',
'majorPentatonic',
'minorPentatonic',
'kuomiPentatonic',
'chinesePentatonic',
'majorHexatonic',
'minorHexatonic'];

var notes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#"
];

var numNotes = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80
];


// var headerElements = ["image", "sound", "draw"];
var headerElements = ["sound","image"];
var headerElements = ["pixelsynth"];
var panelElements = [];
var container, icon;
class Controls {
	constructor(imageCanvas, drawCanvas, settings, handlePlay, handleStop, regenerateSynth){
		this.settings = settings;
		this.imageCanvas = imageCanvas;
		this.drawCanvas = drawCanvas;
		this.handlePlay = handlePlay;
		this.handleStop = handleStop;
		this.regenerateSynth = regenerateSynth;
		this.createHeader();
		//this.createControls();
		//console.log(this.imageCanvas);
		//nx.onload = function() {
  // Slider will not jump to touch position.
  //slider1.mode = "relative"
  //  slider1.hslider = true
  // slider1.draw();
// }
	}
	createHeader(){
	   container = document.createElement('div');
	   container.id = "controls";
	   container.className = "container-style";
	   document.body.appendChild(container);
	   var header = document.createElement("div");
     header.id = "header";
     container.appendChild(header);

     for(var i = 0; i < headerElements.length; i++){
       var button = document.createElement('div');
       button.innerHTML = headerElements[i];
       button.className = "header-button";
       button.id = i;
       button.onclick = this.handleMenuChange;
       header.appendChild(button);
       headerElements[i]= button;
     }
     headerElements[0].className += " selected";
     // this.createSoundPanel(container);
     // this.createImagePanel(container);
     this.createSoundImagePanel(container);
     //this.createDrawPanel(container);
     //panelElements[1].className = "panel hide";
     // panelElements[2].className = "panel hide";
     var div = document.createElement('div');
     div.id = "close-button";
     div.innerHTML = "close controls";
     div.onclick = this.hideMenu;
     container.appendChild(div);
     icon = document.createElement('div');
     icon.className = "icon hidden";
     icon.onclick = this.showMenu;
     document.body.appendChild(icon);
	}

	hideMenu(){
		//console.log(this.container);
		console.log("hiding");
		icon.className = "icon";
		container.className = "container-style hidden";
	}

	showMenu(){
		 icon.className = "icon hidden";
		container.className = "container-style";
	}

	// createImagePanel(container){
	// 	var panel = document.createElement('div');
	// 	panel.className = "panel";
	//   container.appendChild(panel);
  //
	//  	this.addDropdown(images, panel, "select image: ", "galactic_xray.jpg", this.selectImage.bind(this));
	//  	var label = document.createElement("LABEL");
	//  	label.className= "upload-container";
	//  	var span = document.createElement("SPAN");
	//  	span.innerHTML = "...or upload from file";
  //
	//  	var x = document.createElement("INPUT");
	//  	x.setAttribute("type", "file");
	// 	x.onchange = this.uploadFile.bind(this);
	//  	label.appendChild(x);
	//  	label.appendChild(span);
	//  	panel.appendChild(label);
	//  	this.addDial("invert", "toggle", panel, this.updateSetting.bind(this), {value: this.settings.invert}, "invert");
	// 	this.addDial("brightness", "dial", panel, this.updateSetting.bind(this), {value: this.settings.brightness}, "calculatePixels");
	//   this.addDial("contrast", "dial", panel, this.updateSetting.bind(this), {value: this.settings.contrast}, "calculatePixels");
	//     //this.addDial("repetitions", "position", panel, this.updateSetting.bind(this), {x: this.settings.repetitions.x, y: this.settings.repetitions.y}, "drawRepetitions");
	//     //this.addDial("spacing", "position", panel, this.updateSetting.bind(this), {x: this.settings.spacing.x, y: this.settings.spacing.y}, "drawRepetitions");
	//    	//this.addDial("offset", "position", panel, this.updateSetting.bind(this), {x: this.settings.offset.x, y: this.settings.offset.y}, "drawRepetitions");
	//   // 	this.addDial("reset", "button", panel, this.invert.bind(this));
	//    	//this.addDial("clear image", "button", panel, this.imageCanvas.clearImage.bind(this.imageCanvas));
	//    	//this.addDial("rotation", "dial", panel, this.updateSetting.bind(this), {value: this.settings.rotation}, "drawRepetitions");
	//   	//this.addDial("clear background", "button", panel, this.updateSetting.bind(this), {}, "clearImage");
  //
	//   nx.colorize('#DB005B');
	// 	nx.colorize("fill", "#757575");
	//   panelElements.push(panel);
	// }
  //
	// createSoundPanel(container){
  //   var panel = document.createElement('div');
	// 	panel.className = "panel";
	//   container.appendChild(panel);
	//   this.addDial("play", "toggle", panel, this.togglePlay.bind(this));
  //   this.addDial("speed", "dial", panel, this.updateSetting.bind(this), {value: this.settings.speed});
  //   this.addDropdown(scales, panel, "scale: ", this.settings.scale.type, this.selectScale.bind(this));
  //   this.addDropdown(notes, panel, "start note: ", this.settings.scale.note, this.selectKey.bind(this));
  //   var octaves = [];
  //   for(var i = 0; i < 9; i++){
  //     octaves.push(i);
  //   }
  //   this.addDropdown(octaves, panel, "start octave: ", this.settings.scale.octave, this.selectOctave.bind(this));
  //   this.addDropdown(numNotes, panel, "number of notes: ", this.settings.scale.numSteps, this.selectNum.bind(this));
  //
  //   panelElements.push(panel);
	// }

  createSoundImagePanel(containter) {
    var panel = document.createElement('div');
		panel.className = "panel";
	  container.appendChild(panel);
	  this.addDial("play", "toggle", panel, this.togglePlay.bind(this));
    this.addDial("speed", "slider", panel, this.updateSetting.bind(this), {value: this.settings.speed});
    //this.addDial("volume", "slider", panel, this.updateSetting.bind(this), {value: this.settings.volume});
    this.addDropdown(scales, panel, "scale: ", this.settings.scale.type, this.selectScale.bind(this));
    this.addDropdown(notes, panel, "start note: ", this.settings.scale.note, this.selectKey.bind(this));
    var octaves = [];
    for(var i = 0; i < 9; i++){
      octaves.push(i);
    }
    this.addDropdown(octaves, panel, "start octave: ", this.settings.scale.octave, this.selectOctave.bind(this));
    this.addDropdown(numNotes, panel, "number of notes: ", this.settings.scale.numSteps, this.selectNum.bind(this));

    this.addDropdown(images, panel, "select image: ", "galactic_xray.jpg", this.selectImage.bind(this));
	 	var label = document.createElement("LABEL");
	 	label.className= "upload-container";
	 	var span = document.createElement("SPAN");
	 	span.innerHTML = "...or upload from file";

	 	var x = document.createElement("INPUT");
	 	x.setAttribute("type", "file");
		x.onchange = this.uploadFile.bind(this);
	 	label.appendChild(x);
	 	label.appendChild(span);
	 	panel.appendChild(label);
		this.addDial("brightness", "slider", panel, this.updateSetting.bind(this), {value: this.settings.brightness}, "calculatePixels");
	  this.addDial("contrast", "slider", panel, this.updateSetting.bind(this), {value: this.settings.contrast}, "calculatePixels");
    this.addDial("invert", "toggle", panel, this.updateSetting.bind(this), {value: this.settings.invert}, "invert");

    nx.colorize('#DB005B');
		nx.colorize("fill", "#757575");
    panelElements.push(panel);
  }
	// createDrawPanel(container){
	// 	var panel = document.createElement('div');
	// 	panel.className = "panel";
	//   container.appendChild(panel);
	//   this.addDial("stroke_width", "dial", panel, this.updateSetting.bind(this), {value: this.settings.stroke_width});
	//   this.addDial("stroke_repetitions", "dial", panel, this.updateSetting.bind(this), {value: this.settings.stroke_repetitions});
	//  	this.addDial("stroke_opacity", "dial", panel, this.updateSetting.bind(this), {value: this.settings.stroke_opacity});
  //
	//   this.addDial("eraser", "toggle", panel, this.updateSetting.bind(this), {value: this.settings.eraser});
	//   this.addDial("stroke_offset", "position", panel, this.updateSetting.bind(this), {x: this.settings.stroke_offset.x, y: this.settings.stroke_offset.y});
  //
	//   this.addDial("clear drawing", "button", panel, this.drawCanvas.clear.bind(this.drawCanvas));
  //
	//   	panelElements.push(panel);
	// }

	togglePlay(){
		if(this.settings.play){
			this.handleStop();
		} else {
			this.handlePlay();
		}
	}

	toggleDraw(){

	}

	handleMenuChange(e){
		//console.log(e.target);
		for(var i = 0; i < headerElements.length; i++){
			headerElements[i].className = "header-button";
		}
		for(var i = 0; i < panelElements.length; i++){
			panelElements[i].className = "panel hide";
		}
		headerElements[e.target.id].className += " selected";
		panelElements[e.target.id].className = "panel";
	}

	updateSpeed(e){
		this.settings.pixel_step = e.value*400 - 200;
		//console.log(this.settings.pixel_step);
	}


	updateSetting(label, canvasEvent, e){
		//console.log(label);
		//console.log(e);
		//console.log(canvasEvent);
		if('value' in e){
			//console.log("setting eraser to" + e.value);
			this.settings[label]= e.value;
			//console.log(this.settings[label]);
		} else if (e.press){
			//this.settings[label]= e.value;
		} else if (e.x && this.settings[label]) {
			this.settings[label].x = e.x;
			this.settings[label].y = e.y;
		}
		if(canvasEvent!=null) {
			var fn = this.imageCanvas[canvasEvent].bind(this.imageCanvas);
			fn();
		}
	}

	addDial(label, type, container, handler, startVal, canvasHandler){
		var dialHolder = document.createElement('div');
		dialHolder.style.padding = "4px";
		dialHolder.style.display = "inline-block";
		var testDial = document.createElement('canvas');
		if(type=="position"){
			dialHolder.style.padding = "3px";
			testDial.width = 56;
			testDial.height = 56;
			var l = label.replace(/_/g,' ');
			this.addLabel(l, dialHolder, "dropdown-label");
		} else if(type=="toggle"){
			testDial.className = "small-canvas";
      testDial.width = 56;
			testDial.height = 56;
			var l = label.replace(/_/g,' ');
			this.addLabel(l, dialHolder, "label");
		} else {
      testDial.className = "small-canvas";
      testDial.width = 28;
			testDial.height = 56;
			var l = label.replace(/_/g,' ');
			this.addLabel(l, dialHolder, "label");
    }
		testDial.setAttribute("nx", type);
		testDial.setAttribute("label", label);
		testDial.id = label;


		container.appendChild(dialHolder);

		dialHolder.appendChild(testDial);
		nx.transform(testDial);
		nx.widgets[label].on('*', handler.bind(this,label, canvasHandler));
		if(startVal){
			nx.widgets[label].set(startVal);
		 }
	}

	addDropdown(options, container, label, value, handler){
		var dropdown=document.createElement("select");
    //dropdown.setAttribute("id", label); //could access this later to add uploaded files to dropdown
	 	for(var i = 0; i < options.length; i++){
		   	var op = new Option();
		   	if(options[i].value){
		   		op.value = options[i].value;
		   		op.text = options[i].name;
          op.alt = options[i].altText;
		   	}else{
		   		op.value = options[i];
		   		op.text = options[i];
          op.alt = options[i];
		   	}
		   	dropdown.options.add(op);
	   	}
	   	dropdown.onchange = handler;
	   	dropdown.value = value;
      //dropdown.name = "test";
	   	this.addLabel(label, container, "header-label");
	   	container.appendChild(dropdown);
      //dropdown.insertAdjacentHTML("afterend", "This is my caption.");
	}

	addLabel(text, container, className){
		 var label=document.createElement("div");
	   label.className = className;
	   label.innerHTML = text;

	   container.appendChild(label);
	}

	selectImage(e){
		//console.log(this.imageCanvas);
    var imageName = e.target.options[e.target.selectedIndex].alt;
    //var imageName = e.target.options[e.target.selectedIndex].innerHTML;
  	this.imageCanvas.loadImage("./images/" + e.target.value,imageName);
	}

	selectKey(e){
	  //console.log(e.target.value);
	  this.settings.scale.note = e.target.value;
	  this.regenerateSynth();
 	}

  selectOctave(e){
    this.settings.scale.octave = e.target.value;
    this.regenerateSynth();
  }

  selectNum(e){
  	//console.log(e.target.value);
    this.settings.scale.numSteps = e.target.value;
    this.regenerateSynth();
  ////console.log(scale);
  }

selectScale(e){
  //console.log(e.target.value);
 this.settings.scale.type = e.target.value;
 this.regenerateSynth();
}


	uploadFile(e){
  // TO DO : VALIDATE FILE
  		var file = URL.createObjectURL(e.target.files[0]);
  		this.imageCanvas.loadImage(file);
	}


	show(){

	}

	hide(){

	}
}

//export { Controls as default}
