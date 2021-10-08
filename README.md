# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group


## TO DO

### Functionality/Layout
* move control panel to separate (non-overlay) panel
* separate SOUND/IMAGE panels so everything is visible
* fix width of image drop down (long image names pushed it over edge)
* try vertical downsizing to number of scale steps (or averaging) so data from all rows is used?
* control motion of dials with keyboard commands (to match current state)
* choose/upload new default images
* add other scales/voicings (hexatonic, some kind of lydian voicing...)
* add app name overlay (now that landing page is removed)




### Accessibility
* set up keyboard commands (spacebar is currently set to play/pause)
* check/add alt text
* alternative to dials? (can increment with keyboard)
* audio marker for edges of image?
* improve colour contrast/font/font size
* research other requirements

### Aesthetics
* alternate colour scheme/landing page graphic to distinguish from original


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
* set up key commands:
  * spacebar : play/pause
  * i : invert image
  * c: increase contrast
  * x : decrease decrease contrast
  * b : brighter
  * d : darker

### Other/Bugs
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
  * maybe using reduced greyscale data would speed things up?
* very high freq seems too loud on nNotes>60, is this a bug?
* get custom URL?
* mobile version
