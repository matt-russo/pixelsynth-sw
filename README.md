# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group


## TO DO

### Functionality/Layout
* move control panel to separate (non-overlay) panel
* separate SOUND/IMAGE headers so everything is visible
* fix border issue on bottom right (brightness contrast misalignment, aspect ratio issue?)
* choose/upload new default images
* add other scales/voicings (hexatonic, some kind of lydian voicing...)
* quantize rotation? or remove it?
* fix width of image drop down (long image names pushed it over edge)
* try vertical downsizing to number of scale steps (or averaging) so data from all rows is used?
* very high freq seems too loud on nNotes>0, is this a bug?

### Accessibility
* revisit keyboard commands
* check/add alt text
* alternative to dials? (or just increment with keyboard?)
* research other requirements


### Aesthetics
* alternate colour scheme/landing page graphic to distinguish from original


### Completed modifications
* default play mode is off
* removed draw layer, control and event handlers
* Image Control: removed repetitions, spacing, offset, clearbackground
* maintain colour images (changed toGreyscale to getImageData) (not using colour but could think about a colour mode)
* alternate default note choices (more limited starting range)
* amplitude compensation to reduce higher frequencies
* added convolution reverb
* enlarged and centered indicators on playhead

### Other
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
  * maybe using reduced greyscale data would speed things up?
* get custom URL?
