Redaction-Poetics: Interim midterm version and Final
=================

Code for a speech-to-text and text-to-speech project utilizing Javascript and the RiTa Javascript text processing libraries. 

Will only run properly on the Chrome browser and may be subject the outtages of Google translation servers.

This repository includes files derived from the google Javascript web speech API. That being said, it was challenging figure out what to do with what was available, both before and after my learning about RiTa.  

I've included all pieces I worked with, including RiTa and the Mbrola speech libraries.  

Initially I thought I would be able to use both the google speech-to-text chrome extension and google text-to-speech on the other side of the RiTa rhyming.  I still think it may be possible, but when I finally worked it out, it seemed that the easiest way for me to use the RiTa rhyming capability with the Javascript web speech capabilities was to integrate the "Mespeak" text to speech engine and select a customizable voice from the Mbrola voice libraries. (Enables customization of pitch, speed, spacing in between words, as well as 50 versions of accented English speech). 

I believe that Google uses Mespeak, and has built further upon it.  However, it was easier for me to implement the rhyming capability in a segmented fashion: (1) Google Chrome speech-to-text--the Javascript Web speech API;(2)RiTa Lexicon and Rhyme libraries in Javascript; (3) Mespeak with mbrola voice.  

The work I did exists in the speechrecognizer.js file. This is where the separation of the individual words and rhyming happens.  In the final version I also edited the the look of the page, added text, color--minimal.



