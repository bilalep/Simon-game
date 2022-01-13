
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


if (!started){
    $(document).keydown(function (){
        nextSequence();
        $("#level-title").text("Level "+level);
    })
    started = true;
}


$(".btn").click(function (){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence (){
    level++;

    $("#level-title").text("Level "+level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    var randomChosenElement = $("#" + randomChosenColor);

    gamePattern.push(randomChosenColor);

    randomChosenElement.animate({opacity: 0});
    randomChosenElement.animate({opacity: 1});
    playSound(randomChosenColor);
}


function playSound(name){
    var colorAudio = new Audio("sounds/"+name+".mp3");
    colorAudio.play();
}

function animatePress(currentColor){
    var currentElement = $("#"+currentColor);
    currentElement.addClass("pressed");
    setTimeout(function (){
        currentElement.removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (currentLevel === gamePattern.length - 1){
            setTimeout(function (){
                nextSequence();
                userClickedPattern = [];
            },1000)
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}