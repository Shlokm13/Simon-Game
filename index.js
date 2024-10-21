
var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var level=0;
var started=false;

$(document).keypress(function(){
  if(!started)
  {
    nextSequence();
    started=true;
  }
})

$(".btn").click(function(){
   
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
   if(gamePattern[currentLevel]===userClickedPattern)
   {
      if(gamePattern.length===userClickedPattern.length)
      {
         setTimeout(function(){
           nextSequence()
         },1000);
      }
   }
   else{
      
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
       $("body").removeClass("game-over");
    },200)
     
    $("level-title").text("Game Over, Press any Key to Restart");

    startOver();
   }
}

function nextSequence()
{
   userClickedPattern=[];
   level++;
   $("#level-title").text("Level "+level);
  
   var randonNo=Math.floor(Math.random()*4);
   var randomChosenColor=buttonColors[randonNo];
   gamePattern.push(randomChosenColor);

   $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
}


function animatePress(currentColor)
{
   $("#"+currentColor).addClass("pressed");
   setTimeout(function() {
      $("#"+currentColor).removeClass("pressed")
   },100);
}

function playSound(name)
{
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}

function startOver()
{
   level=0;
   gamePattern=[];
   started=false;
}