let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;

let level = 0;

$(document).on("keypress", function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});


$(".btn").on("click", function () {
    let userChoseColor = $(this).attr("id")
    userClickedPattern.push(userChoseColor);
    playSound(userChoseColor);
    animatePress(userChoseColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        let lose = new Audio("sounds/wrong.mp3");
        lose.play();
        startOver()
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, i * 500);
    }
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}