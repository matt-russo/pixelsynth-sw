# pixelsynth-sw
Olivia Jack's [PixelSynth](https://ojack.xyz/PIXELSYNTH/), modified for Sonification World Chat's "Learn" Working Group by [SYSTEM Sounds](https://system-sounds.com)

[Live Version](https://matt-russo.github.io/pixelsynth-sw/)

## TO DO

### Functionality/Layout
* find a way to distinguish relative major/minor scales or consolidate
* add uploaded file to dropdown and select? (tricky)
* record audio to mp3 (https://github.com/higuma/web-audio-recorder-js, https://blog.addpipe.com/using-webaudiorecorder-js-to-record-audio-on-your-website/)
* redesign to maintain image aspect ratio?
* more compact or responsive control panel so 'close controls' button doesn't get hidden (need better way to align labels with controls)

### Accessibility
* move focus to button with tab (not working in safari)
* accessible upload link (not sure how to do this, might be OK as is)
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
* set minimum speed to zero (so direction is always left-right), increased max speed on dial (can go faster with keyboard commands)
* averaging brightness over nearby pixels to catch bright spots in between scanning rows
* added hexatonic scale
* removed stylization on page title (easier for screen readers)
* added 'how it works' button and accordian panel
* added alt text to images (same name that appears in drop down list)
* set up key commands:
  * spacebar or p: play/pause
  * up-down arrows: faster-slower
  * i : invert image (would n be better? beside the other commands)
  * c: increase contrast
  * x : decrease decrease contrast
  * b : brighter
  * v : darker (chose v since it's beside b)
  * h : open/close 'how it works' box
* increasing colour contrasts
  * changed #444 to #757575 to reach minimum colour contrast with white and black
  * changed #FO6 to #DB005B to reach minimum colour contrast with white
  * changed #ccc to white (on #444 for close controls text)
* changed "Courier new" to "Verdana"
* added audio marker for left edge of image (called startClick)
* added volume slider

### Other/Bugs
* is spacebar starting play on all browsers?
* does speedup/down keys work when not playing on all browsers?
* hearing some crackling artifact:
  * reducing image resolution didn't help
  * no change with p5 instead of native oscillators
  * just too many audio streams?
* very high freq seems too loud on nNotes>60, is this a bug?
* get custom URL?
* mobile version? (no sound on iOS, is audio context starting?)
* on Feb. 1, sliders and toggles didn't visually respond in Safari (same with original pixel synth, deprecation in nexusUI?), OK on Feb. 2
