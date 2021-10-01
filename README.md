# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group


## TO DO

### Functionality/Basic Design
* resize image to window height or width
* change control panel to separate (non-overlay) panel
* fix SOUND/IMAGE placement bug on small windows
* choose/upload default images
* add hexatonic scales

### Accessibility
* keyboard commands
* alt text
* alternative to dials?
* research other requirements


### Aesthetics
* alternate colour scheme/landing page graphic to distinguish from original


### Completed modifications
* default play mode is off
* removed draw layer, control and listeners
* Image Control: removed repetitions, spacing, offset, rotation, clearbackground
* maintain colour images
* alternate default note choices
* amplitude compensation to reduce higher frequencies
* convolution reverb


### Other
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
