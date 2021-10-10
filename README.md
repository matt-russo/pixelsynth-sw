# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group


## TO DO

### Functionality/Layout
* try vertical downsizing to number of scale steps (or averaging) so data from all rows is used?
* choose/upload new default images
* add other scales/voicings (hexatonic, some kind of lydian voicing...)
* add how it works info


### Accessibility
* check/add alt text
* audio marker for edges of image?
* improve colour contrast/font/font size
* access upload link
* research other requirements

### Completed modifications
* default play mode is now set to 'off'
* removed draw canvas, disabled draw control and event handlers
* Image Control: removed repetitions, spacing, offset, clearbackground, rotation
* maintain colour images (changed toGreyscale to getImageData) (not using colour but could think about a colour mode)
* alternate default note choices (more limited starting range)
* amplitude compensation to reduce ammount of higher frequencies
* added convolution reverb
* enlarged and centered indicators on playhead
* removed landing page (so no mouse click is required to start)
* changed 'background image' to 'select image'
* combined SOUND/IMAGE panels, changed header to PIXELSYNTH
* set minium speed to zero (so direction is always left-right), increased max speed on dial (can go faster with keyboard commands)
* set up key commands:
  * spacebar : play/pause
  * i : invert image (would n be better? beside the other commands)
  * c: increase contrast
  * x : decrease decrease contrast
  * b : brighter
  * v : darker (chose v since it's beside b)

### Other/Bugs
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
  * maybe using reduced greyscale data would speed things up?
* very high freq seems too loud on nNotes>60, is this a bug?
* get custom URL?
* mobile version? (no sound on iOS, is audio context starting?)
