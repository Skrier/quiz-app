$(document).ready( function () {
/* Global variables*/
var total = 1;
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
var question1 = new questionObject('Which of the following in the national flag of South Africa?',
	                                 "<img class='flagImage' src='images/zalarge.gif' alt='flag' />", "<img class='flagImage' src='images/namibia-flag.gif' alt='flag'/>", "<img class='flagImage' src='images/swaziland-flag.gif' alt='flag'/>", 
	                                 "<img class='flagImage' src='images/bwlarge.gif' alt'flag' />","<img class='flagImage' src='images/zalarge.gif' alt='flag'/>", 1 );

var question2 = new questionObject('How many official languages does South Africa have?', '1', '5', '8', '11', 
	                                'South Africa has 11 official languages: Afrikaans, English, Ndebele, Northern Sotho, Sotho, Swazi, Tswana, Tsonga, Venda, Xhosa and Zulu.',4 );

var question3 = new questionObject('How many South Africans have won the Nobel prize?','0','3','5', '10', 'South Africa has 10 Nobel prize winners.', 4)

var question4 = new questionObject('Can you name the famous South African tech entrepeneur?','Mark Shuttleworth','Elon Musk','Roelof Botha','All the Above','All the above.', 4)

var questionArray = new Array (question1,question2,question3,question4);

/*loads the game*/
$('#playButton').mousedown( function (e) {
e.preventDefault();
$('#frontPage').fadeOut(0);
$('#mainPage').fadeIn(2000);
});

function nextQ () {
$('.question1').html(questionArray[total-1].question); 
$('#choice1').html(questionArray[total-1].option1); 
$('#choice2').html(questionArray[total-1].option2); 
$('#choice3').html(questionArray[total-1].option3); 
$('#choice4').html(questionArray[total-1].option4); 
$('#qI').html(total);
console.log(total);
}

function answerQ () {
$('.answer').css({opacity:0.4});
$('.answer').html(questionArray[total-1].answer);
$('.answer').animate({opacity:0.9},1000);
}

function evaluate () {
      scoreContainer();        
      answerQ();
      total += 1;  
      nextQ();      
}

/* Shows the score */
 function scoreContainer () {
 		if (totalCorrect === 0)	{
             $('.score').css({opacity:1});
 		  } else if (totalCorrect === 1) {
             $('.four').animate({opacity:0},1000);
 		  } else if (totalCorrect === 2) {
             $('.three').animate({opacity:0},1000);
             $('.four').animate({opacity:0},1000);
 		  } else if (totalCorrect === 3) {
 		  	$('.two').animate({opacity:0},1000);
 		  	$('.three').animate({opacity:0},1000);
 		  	$('.four').animate({opacity:0},1000);
 		  } else if (totalCorrect === 4) {
 		  	$('.one').animate({opacity:0},1000);
 		  	$('.two').animate({opacity:0},1000);
 		  	$('.three').animate({opacity:0},1000);
 		  	$('.four').animate({opacity:0},1000);		  	
 		  } else {
 		  	$('.score').css({opacity:1});
 		  };
}

/* Restarts the game*/
var replay = function () {
	var playAgain = 'You answered ' + totalCorrect  + ' questions correctly.\nWould you like to play again?';
	$('.optionsCont').hide();
  $('.question1').html(playAgain);
  $('#questionNo').hide();
  $('#answerContainer').hide();
  $('#submitButton').hide();
  $('#yesButton').show();
  $('#noButton').show();

}

function clearRadionButton () {
	var radioB = $('.radioB');
	for (var x = 0; x < radioB.length; x +=1 ) {
			if (radioB[x].type = 'radio') {
				radioB[x].checked = false;
			}
		} 
}

function endGame () {
       clearRadionButton();	
        totalCorrect = 0;
    	  total = 1;
          $('.optionsCont').show();
          $('#questionNo').show();
          $('#answerContainer').show();
          $('#submitButton').show();
          $('#yesButton').hide();
          $('#noButton').hide();
      	  $('.answer').html(' ');    	
          $('.score').animate({opacity:1},750);
          onload();
}

function submitAnswer () {
	    var radioSelection = +$('input[name="options"]:checked').val();
        if (radioSelection === questionArray[total-1].answerValue) {
		      totalCorrect += 1;     
		      } 
		      evaluate();
		      clearRadionButton();		        
}

/*Buttons*/
$('#submitButton').on('mousedown', function(e) {
e.preventDefault();
var answerText = $('.answer').val();
if (total <= 3) {
		    submitAnswer();
        } else if (total === 4) {
          $('#submitButton').val('See Results?');
          $('#submitButton').css('width', '150px');
          submitAnswer();
          
        }
  else if (total > 4) {
        replay();
	} 
});

$('#yesButton').on('mousedown', function(e) {
e.preventDefault();
$('#submitButton').css('width', '95px');
$('#submitButton').val('Submit');
endGame();

});

$('#noButton').on('mousedown', function(e) {
e.preventDefault();
$('#submitButton').css('width', '95px');
$('#submitButton').val('Submit');
endGame();
 $('#frontPage').fadeIn(1000);
 $('#mainPage').fadeOut(10);	
 $('#playButton').css('background','#006400');
});

function onload () {
$('.answer').css({opacity:0});
nextQ();   
}
 
onload();
});

