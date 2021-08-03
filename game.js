var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startedToToggle = false ;
var level = 0;

//detect when a keyboord key is pressed
$(document).on("keydown",function(){
  if(!startedToToggle){
    $("#level-title").text("Level "+level);
    nextSequence();
    startedToToggle = true;
  }
});

//handler function when a button is clicked
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//creating sequence of pressing the buttons
function nextSequence(){
  userClickedPattern =[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game over, Press Any Key To Restart");
    startOver();
  }

}
//Restarting the game
function startOver(){
  startedToToggle = false;
  level = 0;
  gamePattern =[];
}
//Sound played when a button is pressed
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//Animations when user clicks
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
