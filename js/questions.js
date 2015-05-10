var numberOfQuestions = 5;

/* function initSounds(classElement, soundFile) {
        var selectElement = document.createElement('audio');
        selectElement.setAttribute('src', './audio/' + soundFile + '.mp3');
        selectElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()

        $.get();

        selectElement.addEventListener("load", function() {
            selectElement.play();
        }, true);

		$(classElement).click(function() {
            selectElement.play();
        });
}

function playSound(soundFile) {
        var soundElement = document.createElement('audio');
        soundElement.setAttribute('src', './audio/' + soundFile + '.mp3');
        soundElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()

        $.get();

        soundElement.addEventListener("load", function() {
            soundElement.play();
        }, true);

/* 		$(soundElement).click(function() {
            soundElement.play();
        }); */
// } */
	
$(document).ready(function loadQuestions(){
	localStorage.clear();
	addQuestion(1, "What is the capital of Brazil?","Rio de Janiero","Sau Paulo","Brazilia","Canberra","Brazilia");
	addQuestion(2, "Who invented the internet?","Bill Gates","Steve Jobs","Stephen Hawkings","Tim Berners-Lee","Tim Berners-Lee");
	addQuestion(3, "Which country is the largest importer of natural gas?","Japan","United States","Australia","United Kingdom","Japan");
	addQuestion(4, "Which Marvel comic super hero is a member of The Avengers?","Wolverine","Iron-man","Spider-man","Groot","Iron-man");
	addQuestion(5, "What is the maximum speed limit (in kilometres per hour) in the Northern Territory?","100","150","110","120","110");
	addQuestion(6, "Which F1 driver holds the record for the most wins at the Monaco Grand Prix?","Daniel Ricciardo","Ayrton Senna","Michael Schumacher","Mark Webber","Ayrton Senna");
	addQuestion(7, "Which of the following sites is featured in the film 'The Social Network'?","Friendster","MySpace","Twitter","Facebook","Facebook");
	addQuestion(8, "Which rider is the youngest Moto GP champion?","Valentino Rossi","Mick Doohan","Marc Marquez","Casey Stoner","Marc Marquez");
	addQuestion(9, "The Abbey Road is the title of an album by which popular group?","Bee Gees","The Beatles","Simon and Garfunkel","The Bread","The Beatles");
	addQuestion(10, "Which neighbouring country is geographically closest to Australia?","New Zealand","East Timor","Indonesia","Papua New Guinea","East Timor");
	
	randomizeQuestion();
	
	retrieveQuestion(1);
	
	// initSounds('.select','select');
});

function randomizeQuestion(){
	var firstIndex=0, secondIndex=0, firstQuestion, secondQuestion;
	for(var i=1; i<=numberOfQuestions; i++){
		firstIndex = Math.floor(Math.random() * (localStorage.length - 1)) + 1;
		/* console.log(firstIndex); */
		secondIndex = Math.floor(Math.random() * (localStorage.length - 1)) + 1;
		/* console.log(secondIndex); */
		if(firstIndex!=secondIndex && firstIndex!=null && secondIndex!=null){
			firstQuestion = (JSON.parse(localStorage.getItem('Question ' + firstIndex)));
			firstQuestion.number = secondIndex;
			
			secondQuestion = (JSON.parse(localStorage.getItem('Question ' + secondIndex)));
			secondQuestion.number = firstIndex;
			
			localStorage.setItem('Question ' + firstIndex, JSON.stringify(secondQuestion));
			localStorage.setItem('Question ' + secondIndex, JSON.stringify(firstQuestion));
		}
	}
}

function addQuestion(number,text,option1, option2,option3,option4,correctanswer){
	var question = {};
	question.number = number;
	question.text = text;
	question.option1 = option1; 
	question.option2 = option2;
	question.option3 = option3;
	question.option4 = option4;
	question.correctanswer = correctanswer;
	question.answer = "";
	question.score = 0;
	localStorage.setItem('Question ' + number, JSON.stringify(question));
}	

function retrieveQuestion(number){
	
	/* console.log("number" + number%2); */
	/* if(number < localStorage.length){ */
	if(number < numberOfQuestions){
		document.getElementById("finalize" + (number%2)).href="#quiz_page" + ((number+1)%2) ;
	}else{
		document.getElementById("finalize" + (number%2)).href="#review";
	}
	var Question = (JSON.parse(localStorage.getItem("Question " + number)));
	var j, temp;
	for(var i=1; i<=4; i++){
		j = Math.floor(Math.random() * 3) + 1;
		if(i!=j){
			temp=Question["option" + i];
			Question["option" + i] = Question["option" + j];
			Question["option" + j] = temp;
		}
	}
	document.getElementById("choices"+ (number%2)).reset();
	document.getElementById("number" + (number%2)).innerHTML = "Question " + Question.number;
	document.getElementById("question" + (number%2)).innerHTML = Question.text;
	document.getElementById("option1" + (number%2)).innerHTML = Question.option1;
	document.getElementById("option2" + (number%2)).innerHTML = Question.option2;
	document.getElementById("option3" + (number%2)).innerHTML = Question.option3;
	document.getElementById("option4" + (number%2)).innerHTML = Question.option4;
}
$(document).on('click','.select',function(){
	document.getElementById("clickSound").play();
});

$(document).on('click','#proceed',function(){
	document.getElementById("finalize1").href="#quiz_page1";
	document.getElementById("finalize0").href="#quiz_page1";
	randomizeQuestion();
	retrieveQuestion(1);
});

$(document).on('click','#new_quiz',function(){
	document.getElementById("finalize1").href="#quiz_page1";
	document.getElementById("finalize0").href="#quiz_page1";
	randomizeQuestion();
	retrieveQuestion(1);
});
	 
$(document).on('click','#finalize0',function(){
	finalizeAnswer(0);
});

$(document).on('click','#finalize1',function(){
	finalizeAnswer(1);
});

function finalizeAnswer(index){
	// initSounds('#finalize' + index,'wrong');
	var answer;		
	if(document.getElementById("radio-choice-v-2a" + index).checked){
		answer = document.getElementById("option1" + index).innerHTML;
	}else if(document.getElementById("radio-choice-v-2b" + index).checked){
		answer = document.getElementById("option2" + index).innerHTML;
	}else if(document.getElementById("radio-choice-v-2c" + index).checked){
		answer = document.getElementById("option3" + index).innerHTML;
	}else if(document.getElementById("radio-choice-v-2d" + index).checked){
		answer = document.getElementById("option4" + index).innerHTML;
	}else if(document.getElementById("radio-choice-v-2e" + index).checked){
		answer = "Don't Know";
	}
	
	var question = JSON.parse(localStorage.getItem(document.getElementById("number" + index).innerHTML));
	question.answer = answer;
	if(answer!="Don't Know"){
		if(question.answer == question.correctanswer){
			question.score = 1;
			// initSounds('#finalize' + index,'correct');
		}else{
			question.score = -1;
			
		}
	}else{
		question.score = 0;
		
	}
	localStorage.setItem('Question ' + question.number, JSON.stringify(question));
	if(question.score==1){
		// playSound('correct');
		document.getElementById("correctSound").play();
	}else{
		// playSound('wrong');
		document.getElementById("wrongSound").play();
	}
	/* if(question.number<localStorage.length){ */
	if(question.number<numberOfQuestions){
		retrieveQuestion(question.number + 1);
	}
	/* if(question.number == localStorage.length){ */
	if(question.number == numberOfQuestions){
		var reviewContents = "";
		var summaryContents = "";
		/* for(var i=1; i<=localStorage.length; i++){ */
		for(var i=1; i<=numberOfQuestions; i++){
			question = JSON.parse(localStorage.getItem("Question " + i));
			reviewContents+="<tr><td>" + question.text + "</td><td>" + question.answer + "</td></tr>";
			summaryContents+="<tr><td>" + question.text + "</td><td>" + question.answer + "</td><td>" + question.correctanswer + "</td><td>" + question.score + "</td></tr>";
		 }
		 document.getElementById("reviewanswer").innerHTML = reviewContents;
		 document.getElementById("summaryAnswer").innerHTML = summaryContents;
	}
}

$(document).on('click','#view_score',function(){
	var score = 0;
	/* for(var i=1; i<=localStorage.length; i++){ */
	for(var i=1; i<=numberOfQuestions; i++){
		question = JSON.parse(localStorage.getItem("Question " + i));
		/* console.log(question.answer + " " + question.correctanswer + " " + question.score); */
		score = score + question.score;
	}
	/* document.getElementById("score").innerHTML = score + " / " + localStorage.length;
	document.getElementById("totalscore").innerHTML = score + " / " + localStorage.length; */
	document.getElementById("score").innerHTML = score + " / " + numberOfQuestions;
	document.getElementById("totalscore").innerHTML = score + " / " + numberOfQuestions;
	if(score>0){
		// playSound('winner');
		document.getElementById("winnerSound").play();
	}else{
		// playSound('loser');
		document.getElementById("loserSound").play();
	}
});


