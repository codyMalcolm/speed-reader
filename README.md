# codyMalcolm's Speed Reader

## This is a simple spritzer

### Versions

#### v0.93b (08/12/2018):

Bug fix:
- changed hotkey for rewind to "9" because Mozilla uses "/" for something else

#### v0.93a (08/12/2018):

New features:
- now splits words longer than 13 characters

Bug fixes:
- corrected the program to properly handle tabs and carriage returns
- no longer strips hyphens, and only splits hyphenated words if they are greater than 13 total characters
- now splits words longer than 13 characters into chunks not longer than 13 characters and hyphenates them

#### v0.92 (08/12/2018):

New features:
- add a pause hotkey ("\*")
- add a rewind 5 hotkey ("/")

Bug fixes:
- stopped speed from increasing when run multiple times without any other buttons being pressed

Bug patch:
- stopped extra long words from completely crashing the playback. For now, the word will not display. In v0.93 longer words will be split and shorter words with hypens will keep their hyphens.

#### v0.91 (08/12/2018):

New features:
- added a short extra delay at the end of each sentence
- added a second rewind button
- playback will now have a small delay for words that end with "."

Bug fixes:
- when paused, words now stop on the current word instead of advancing one more
- fixed a bug that would cause an error if certain buttons were pressed before input was entered


#### v0.9:

Initial deploy, currently a few bugs.

Known issues:
* Words greater than 30 characters will throw an error that will freeze the play
* '-'s are stripped out
* The styling needs a lot of work
