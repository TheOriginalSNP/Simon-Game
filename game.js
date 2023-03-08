const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];

const userClickedPattern = [];

let gameStarted = false;

let level = 0;

$(document).on("keypress", function() {
    if (gameStarted === false) {
        nextSequence();
        $("h1").text("Level " + level);
        gameStarted = true;
    }
  });


$(".btn").on("click", function () {
    const userChoseColor = $(this).attr("id")
    userClickedPattern.push(userChoseColor);
    playSound(userChoseColor);
    animatePress(userChoseColor)
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random(buttonColors.length) * 4);
    const randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}