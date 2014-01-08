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

        var interimResult = '';
        var textArea = $('#speech-page-content');
        var rhymeArea = $('#speech-page-rhyme');
        var textAreaID = 'speech-page-content';

        $('.speech-mic').click(function(){ //this is a reqmt of javascript api tts/stt functioning--tried to remove, as other have also tried, to no avail. Will try later, when more advanced.
        //$('.start').click(function(){
	    if( started == 0 ) {
            	startRecognition();
		started=1;
		var text1 = document.getElementById('speech-page-content');
		text1.value="";	
	    }
	    else {
		recognition.stop();
		var lex = new RiLexicon();   //the RiTa dictionary
		var text1 = document.getElementById('speech-page-content'); //the recognized speech, such as it is...
		var text2 = document.getElementById('speech-page-rhyme');  ///to be rhymed
		var rhymes;
		var words = text1.value.split(" "); 
		//var tts = new GoogleTTS('en');
        text2.value = "";
        for(i=0; i<words.length; i++) {
		  	rhymes = lex.rhymes(words[i]);
            var pos = Math.floor(Math.random()*rhymes.length); // Random selection of rhymed word-uses the length of the array to limit # of rhymed words (math.floor), & picks by position
			if( rhymes[pos] != 'undefined' && rhymes[pos] ) {
				text2.value = text2.value + rhymes[pos] + ' ';
				// speak(rhymes[0]);   // Ignore because I use the full string once completed
			}
		}
		meSpeak.speak(text2.value, { variant:'f5', speed:'100', wordgap:'2' } );//tts capability, voice selection, speed, gap btwn wds
		started=0;	
		}
        });

        $('.speech-mic-works').click(function(){ //part of the required workflow tts/stt--There was some commentary online abt how to get around it, but I'm not advanced enough yet to attempt it.
        //$('.stop').click(function(){
            recognition.stop();
        });

        var startRecognition = function() {
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
