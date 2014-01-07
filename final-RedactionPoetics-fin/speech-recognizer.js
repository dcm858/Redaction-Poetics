var started = 0;

(function($) {

    $(document).ready(function() {
	var recognition = Object;

        try {
            recognition = new webkitSpeechRecognition();//this came with canned pieces, but is useless
            recognition = Object;						// --if object does not exist, code continues on anyway
        } catch(e) {
        }
        recognition.continuous = true;
        recognition.interimResults = true;

        var interimResult = '';
        var textArea = $('#speech-page-content');
        var rhymeArea = $('#speech-page-rhyme');
        var textAreaID = 'speech-page-content';

        $('.speech-mic').click(function(){
        //$('.start').click(function(){
	    if( started == 0 ) {
            	startRecognition();
		started=1;
		var text1 = document.getElementById('speech-page-content');
		text1.value="";	
	    }
	    else {
		recognition.stop();
		var lex = new RiLexicon();
		var text1 = document.getElementById('speech-page-content');
		var text2 = document.getElementById('speech-page-rhyme');
		var rhymes;
		var words = text1.value.split(" "); 
		//var tts = new GoogleTTS('en');
        text2.value = "";
        for(i=0; i<words.length; i++) {
		  	rhymes = lex.rhymes(words[i]);
            var pos = Math.floor(Math.random()*rhymes.length); // Random selection of rhymed word
			if( rhymes[pos] != 'undefined' && rhymes[pos] ) {
				text2.value = text2.value + rhymes[pos] + ' ';
				// speak(rhymes[0]);   // Ignore because we use the full string once completed
			}
		}
		meSpeak.speak(text2.value, { variant:'f5', speed:'100', wordgap:'2' } );
		started=0;	
		}
        });

        $('.speech-mic-works').click(function(){
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