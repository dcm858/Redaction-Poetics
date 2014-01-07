Redaction-Poetics: Final
=================
Midterm vs. Final:

I began working on this poetry-mangling of everyday speech with the midterm project.  That project basically amounted to research and figuring out in a basic way how to rhyme speech to text and send that text back out rhymed robotic speech. 

I was going to include the midterm here so that a comparison could be made and the difference could become apparent, but the work I did on the midterm was mostly in researching, looking at Python and trying to assess whether or not I could create something reasonable in the amount of time I had, trying out examples using RiTa Processing, and finally, coalescing my development effort around the Javascript web speech API, speech-to-text, RiTa Javacript version. I was able to generate speech to text and text to speech that was rhymed.  

In my midterm version, all of this work resulted in a meager single-page form that generated a single line of non-stop text, snaking through the form, relentlessly rhyming every single sound, alphabetically, stuck on the A's. And the male robotic voice was almost, but not quite, unintelligible.

In the final, I was able to figure out how to split the spoken text and rhyme individual words in Javascript.  I cleaned up the page, but I would still like to get rid of the need for the microphone graphic and the stop sign.  These would seem to be just graphic elements, but from what I can tell, they are necessary--click on the mike, click on the stop--within the code.  I tried eliminating them and my application broke.  

I would like to do more, to try out meters, and alliteration, but this is as far as I've gotten up till now. 

Final Code Remarks:

Code for a speech-to-text and text-to-speech project utilizing Javascript and the RiTa Javascript text processing libraries. 

Will only run properly on the Chrome browser and may be subject the outtages of Google translation servers. I have only run it in localhost mode so far--no daring Information Superhighway dashes yet.

This repository includes files derived from the google Javascript web speech API. That being said, it was challenging figure out what to do with what was available, both before and after my learning about RiTa.  

I've included all pieces I worked with, including RiTa and the Mbrola speech libraries.  

Initially I thought I would be able to use both the google speech-to-text chrome extension and google text-to-speech on the other side of the RiTa rhyming.  I still think it may be possible, but when I finally worked it out, it seemed that the easiest way for me to use the RiTa rhyming capability with the Javascript web speech capabilities was to integrate the "Mespeak" text to speech engine and select a customizable voice from the Mbrola voice libraries. (Enables customization of pitch, speed, spacing in between words, as well as 50 versions of accented English speech). 

I believe that Google uses Mespeak, and has built further upon it.  However, it was easier for me to implement the rhyming capability in a segmented fashion: (1) Google Chrome speech-to-text--the Javascript Web speech API;(2)RiTa Lexicon and Rhyme libraries in Javascript; (3) Mespeak with mbrola voice.  

The bulk of the work I did exists in the speechrecognizer.js file. This is where the separation of the individual words and rhyming happens.  In the final version I also edited the the look of the page, added text, color--minimal.



