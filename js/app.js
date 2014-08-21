$(document).ready( function () {
/* Global variables*/
var total = 0;
var totalCorrect = 0;

/* Object constructor */
function questionObject (question, option1, option2, option3, option4, answer, answerValue) {
               this.question = question,
               this.option1 = option1,
               this.option2 = option2,
               this.option3 = option3,
               this.option4 = option4,
               this.answer = answer,
               this.answerValue = answerValue
}

/* Objects */
var question1 = new questionObject('Which of the following in the national flag of South Africa',
	                                 '../images/zalarge.gif','../images/namibia-flag.gif','../images/swaziland-flag.gif', 
	                                 '../images/bwlarge.gif',"../images/zalarge.gif", 1 );

var question2 = new questionObject('How many official languages does South Africa have', '1', '5', '8', '11', 
	                                'South Africa has 11 official languages: Afrikaans, English, Ndebele, Northern Sotho, Sotho, Swazi, Tswana, Tsonga, Venda, Xhosa and Zulu',4 );

var question3 = new questionObject('How many South Africans have won the Nobel prize','0','3','5', '10', 'South Africa has 10 Nobel prize winners', 4)

var question4 = new questionObject('Can you name the famous South African tech entrepenuer','Mark Shuttleworth','Elon Musk','Roelof Botha','All the Above','All the above', 4)

var questionArray = new Array (question1,question2,question3,question4);

/*loads the game*/
$('#playButton').mousedown( function (e) {
e.preventDefault();
$('#frontPage').fadeOut(0);
$('#mainPage').fadeIn(2000);
});

/*Plays the game*/
function onLoad () {
$('.question1').text(question1.question); 
$('#choice1').text(question1.option1); 
$('#choice2').text(question1.option2); 
$('#choice3').text(question1.option3); 
$('#choice4').text(question1.option4); 
$('.answer').css({opacity:0});
}

function nextQ () {
$('.question1').text(questionArray[total].question); 
$('#choice1').text(questionArray[total].option1); 
$('#choice2').text(questionArray[total].option2); 
$('#choice3').text(questionArray[total].option3); 
$('#choice4').text(questionArray[total].option4); 
$('#qI').text(total+1);
}

function answerQ () {
var animation = $('.answer').text(questionArray[total].answer);
animation.animate({opacity:0.9},600)
}

function evaluate () {
	  total += 1; 
      scoreContainer();  
      nextQ();
      answerQ(); 
      
}

/* Shows the score */
 function scoreContainer () {
 		if (totalCorrect === 0)	{
             $('.score').css({opacity:0});
 		  } else if (totalCorrect === 1) {
             $('.four').animate({opacity:1},600);
 		  } else if (totalCorrect === 2) {
             $('.three').animate({opacity:1},600);
             $('.four').animate({opacity:1},600);
 		  } else if (totalCorrect === 3) {
 		  	$('.two').animate({opacity:1},600);
 		  	$('.three').animate({opacity:1},600);
 		  	$('.four').animate({opacity:1},600);
 		  } else if (totalCorrect === 4) {
 		  	$('.one').animate({opacity:1},600);
 		  	$('.two').animate({opacity:1},600);
 		  	$('.three').animate({opacity:1},600);
 		  	$('.four').animate({opacity:1},600);		  	
 		  } else {
 		  	$('.score').css({opacity:0});
 		  };
}

/* Restarts the game*/
var replay = function () {
	var playAgain = confirm('You answered ' + totalCorrect + ' questions correctly.\nWould you like to play again?');
    if (playAgain) {
        onLoad();
        $('.score').css({opacity:0});
    } else {
     $('#frontPage').fadeIn(1000);
     $('#mainPage').fadeOut(1000);
    }
}

/*Submits the answer*/
$('#submitButton').on('mousedown', function(e) {
e.preventDefault();
var radioSelection = $('input[name="options"]:checked').val();
if (radioSelection === questionArray[total].answerValue) {
      totalCorrect += 1;     
      } 
      evaluate(); 
         
});

onLoad();  




















});