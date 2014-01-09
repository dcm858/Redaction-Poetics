var started = 0;

(function($) {

    $(document).ready(function() {
	var recognition = Object;

        try {
            //recognition = new webkitSpeechRecognition();//the original of this file came with canned pieces, almost all of which are gone--but is useless
            recognition = Object;		// --if object does not exist, code continues on anyway
        } catch(e) {				//error trap ?
        }
        recognition.continuous = true;
        recognition.interimResults = true;

        var interimResult = '';		//variables for initial recognized speech, eventual rhymed speech 
        var textArea = $('#speech-page-content');
        var rhymeArea = $('#speech-page-rhyme');
        var textAreaID = 'speech-page-content';   //string identifier for text area - necessary for function call later on

        $('.speech-mic').click(function(){ //speech recogfunction executed when click on microphone
        //$('.start').click(function(){
	    if( started == 0 ) {
            	startRecognition();
		started=1;
		var text1 = document.getElementById('speech-page-content'); //
		text1.value="";	
	    }
	    else {
		recognition.stop();
		var lex = new RiLexicon();   //the RiTa dictionary
		var text1 = document.getElementById('speech-page-content'); //the recognized speech, such as it is...
		var text2 = document.getElementById('speech-page-rhyme');  ///to be rhymed
		var rhymes;
		var words = text1.value.split(" "); //pulling out words from text1 and putting them into an array.
		//var tts = new GoogleTTS('en');
        	text2.value = "";  
        	for(i=0; i<words.length; i++) {   //for the array words, go through and find rhymed words for each.
			rhymes = lex.rhymes(words[i]); // for words[i], and element of words array--single word--
			//find all the rhymed words in the lexicon & put them into the array called rhymes
            		var pos = Math.floor(Math.random()*rhymes.length); // the position of the randomly selected 
            		//(floor rounds down the fraction from random) rhymed word
            		//within the rhymes array; pull out a random rhymed word from entire array of rhymed words
			if( rhymes[pos] != 'undefined' && rhymes[pos] ) {    //prevent results that came back as "undefined" from being spoken
				text2.value = text2.value + rhymes[pos] + ' '; //add the rhymed word to the text2 area, separated by speces
				// speak(rhymes[0]);   // Ignore because I use the full string once completed
			}
		}
		meSpeak.speak(text2.value, { variant:'f5', speed:'100', wordgap:'2' } );
		//tts capability, voice selection, speed, gap btwn wds
		started=0;	
	}
        });

        $('.speech-mic-works').click(function(){ //part of the required workflow tts/stt--There was some commentary online abt how to get around it, but I'm not advanced enough yet to attempt it.
        //$('.stop').click(function(){
            recognition.stop();
        });

        var startRecognition = function() {  //speech recognition of rhymed words
            $('.speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
            textArea.focus();
            recognition.start();
        };

        recognition.onresult = function (event) {
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos);
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textAreaID, event.results[i][0].transcript);
                } else {
                    isFinished = false;
                    insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                }
            }
        };

        recognition.onend = function() {
            $('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
        };
    });
})(jQuery);
