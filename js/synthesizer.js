class Synthesizer {
	constructor(frequencies, compressor, ctx){
		this.frequencies = frequencies;
		// this.ampcomp = [];
		// for (let i=0;i<this.frequencies.length;i++) {
		// 	this.ampcomp.push(Math.pow(this.frequencies[0]/this.frequencies[i],0.33));
		// };
		// console.log(this.frequencies);
		// console.log(this.ampcomp);
		this.ctx = ctx;
		this.oscillators = [];
		this.compressor = compressor;
		this.initOscillators(frequencies);
		//this.p5oscillators = [];
		//this.initP5Oscillators(frequencies);
		//this.loadSound("../impulse/ArbroathAbbeySacristy.m4a");
	}

	playNote(index, gainVal){
		var osc = this.ctx.createOscillator();
		osc.type = 'sine';
	//	//console.log(osc.frequency);
		osc.frequency.value = this.frequencies[this.frequencies.length-1-index];
		var gain = this.ctx.createGain();
    	gain.connect(this.compressor);
			//gain.connect(this.ctx.destination);
    	gain.gain.value = 0;
    	osc.connect(gain);
    	gain.gain.linearRampToValueAtTime(gainVal, this.ctx.currentTime+0.1);
    	gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime+0.8);
    	osc.start();
    	osc.stop(this.ctx.currentTime+ 0.8);
	}
	initOscillators(frequencies){
		//console.log(frequencies);
  		for(var i = 0; i < frequencies.length; i++){
    		var osc = this.ctx.createOscillator();
   			osc.type = 'sine';
   			var gain = this.ctx.createGain();
    		gain.connect(this.compressor);
    		gain.gain.value = 0.0;
				osc.connect(gain);
    		osc.frequency.value = frequencies[frequencies.length-1-i];
    		//console.log(osc);
    		osc.start(this.ctx.currentTime);
				var ampComp = Math.pow(frequencies[0]/osc.frequency.value,1.0); //0.33 is standard correction of ELC but highs are still harsh
    		this.oscillators[i] = {osc: osc, gain: gain, val: 0, ampComp: ampComp};
  		}
  		//console.log(this.oscillators);, 0
	}
	initP5Oscillators(frequencies){
		//console.log(frequencies);
  		for(var i = 0; i < frequencies.length; i++){
    		var osc = new p5.Oscillator('sine'); // set frequency and type

				osc.amp(0);
				var oscFreq=frequencies[frequencies.length-1-i];
				osc.freq(oscFreq);
    		//console.log(osc);
    		osc.start(this.ctx.currentTime);
				var ampComp = Math.pow(frequencies[0]/oscFreq,1.0); //0.33 is standard correction of ELC but highs are still harsh
    		this.p5oscillators[i] = {osc: osc,  val: 0, ampComp: ampComp};
  		}
  		//console.log(this.oscillators);, 0
	}
	updateGains(gainVals){
		for(var i = 0; i < gainVals.length; i++){
			if(this.oscillators[i].val!=gainVals[i]){
					var ampComp = this.oscillators[i].ampComp;
      		this.oscillators[i].val=gainVals[i];
					//this.oscillators[i].gain.gain.value = gainVals[i]*ampComp;
      		this.oscillators[i].gain.gain.cancelScheduledValues(this.ctx.currentTime);
        	this.oscillators[i].gain.gain.linearRampToValueAtTime(gainVals[i]*ampComp, this.ctx.currentTime+0.1);
      	}
		}
	}

	updateP5Gains(gainVals){
		for(var i = 0; i < gainVals.length; i++){
			if(this.p5oscillators[i].val!=gainVals[i]){
					var ampComp = this.p5oscillators[i].ampComp;
      		this.p5oscillators[i].val=gainVals[i];
					this.p5oscillators[i].osc.amp(ampComp*gainVals[i]);
					//this.oscillators[i].gain.gain.value = gainVals[i]*ampComp;
      		//this.p5oscillators[i].gain.gain.cancelScheduledValues(this.ctx.currentTime);
        	//this.p5oscillators[i].gain.gain.linearRampToValueAtTime(gainVals[i]*ampComp, this.ctx.currentTime+0.1);
      	}
		}
	}


	endSynth(){
		//console.log(this.oscillators);
		for(var i = 0; i < this.oscillators.length; i++){
			this.oscillators[i].gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime+0.8);
			this.oscillators[i].osc.stop(this.ctx.currentTime+0.8);
		}
	}
	endP5Synth(){
		//console.log(this.oscillators);
		for(var i = 0; i < this.oscillators.length; i++){
			//this.p5oscillators[i].osc.amp(0);
			this.p5oscillators[i].osc.stop(this.ctx.currentTime+0.8);
		}
	}

}

//export { Synthesizer as default}
