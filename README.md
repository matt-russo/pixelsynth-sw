# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group


## TO DO

### Functionality/Layout
* try vertical downsizing to number of scale steps (or averaging) so data from all rows is used?
* choose/upload new default images
* find a way to distinguish relative major/minor scales or consolidate
* add uploaded file to dropdown and select? (tricky)

### Accessibility
* accessible upload link (not sure how to do this)
* research other requirements
  * ARIA: https://www.deque.com/blog/a11y-support-series-part-1-aria-tab-panel-accessibility/
  * contrast ratio > 4.5:1 for normal text, 3:1 for >18px fontsize (https://webaim.org/resources/contrastchecker/)

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
* averaging brightness over nearby pixels to catch bright spots in between scanning rows
* added hexatonic scale
* removed stylization on page title (easier for screen readers)
* added 'how it works' button
* added alt text to images (same name that appears in drop down list)
* set up key commands:
  * spacebar or p: play/pause
  * up-down arrows: faster-slower
  * i : invert image (would n be better? beside the other commands)
  * c: increase contrast
  * x : decrease decrease contrast
  * b : brighter
  * v : darker (chose v since it's beside b)
* increasing colour contrasts
  * changed #444 to #757575 to reach minimum colour contrast with white and black
  * changed #FO6 to #DB005B to reach minimu colour contrast with white
  * changed #ccc to white (on #444 for close controls text)
* changed "Courier new" to "Verdana"
* added audio marker for left edge of image (called startClick)

### Other/Bugs
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
  * just too many audio streams?
* very high freq seems too loud on nNotes>60, is this a bug?
* get custom URL?
* mobile version? (no sound on iOS, is audio context starting?)
