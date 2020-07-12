const buttonColours = ["green", "red", "yellow", "blue"]
let userClickedPattern = new Array();
let gamePattern = new Array();
let level;

function init() {
    gamePattern = new Array();
    level = -1;
    userClickedPattern = new Array();
    $(document).on("keydown",startGame);
    }

function startGame()    {
    $(document).off("keydown");
    nextSequence();
    }


// function iterate(randomNumber) {
//     // alert(randomNumber);
//     buttonFlashSound(randomNumber);
//   }


function nextSequence() {
    setTimeout(function(){ 
        level ++;
        $("#level-title").text(`Level ${level}`);
        const randomNumber = Math.floor(Math.random()*4); 
        gamePattern.push(buttonColours[randomNumber]);
        setTimeout(function() {
            buttonFlashSound(buttonColours[randomNumber])
        },500);
        /* gamePattern.forEach(iterate);  //array loop to work on repeating gamePattern[] */
        userClick(); // 
        // console.log(gamePattern, "- game pattern array");
        return randomNumber; // returns actual color value instead of number for some reason
        }, 1000);
        
    }


// Makes button flash/emit sound
function buttonFlashSound(color)  {
    switch (color) {
        case "green": 
        $("#green").fadeOut(250).fadeIn(250);
            const green = new Audio('/sounds/green.mp3');
            green.play();
            break;
        case "red": 
            $("#red").fadeOut(250).fadeIn(250);
            const red = new Audio('/sounds/red.mp3');
            red.play();
            break;
        case "yellow": 
            $("#yellow").fadeOut(250).fadeIn(250);
            const yellow = new Audio('/sounds/yellow.mp3');
            yellow.play();
            break;
        default:
            $("#blue").fadeOut(250).fadeIn(250);
            const blue = new Audio('/sounds/blue.mp3');
            blue.play();
            break;
    };
}



//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
function userClick () {
        $(".btn").one("click", function (event) {
            const userChosenColour = (event.target.id); // records click event as ID
            userClickedPattern.push(userChosenColour); // records user's clicks to array
            buttonFlashSound(userChosenColour); // calls function to animate/sound
            switch (userChosenColour) { //creates button clicked animation
                case "green": 
                $("#green").addClass("pressed");
                setTimeout(function() {$("#green").removeClass("pressed")}, 150);
                   break; 
                case "red": 
                $("#red").addClass("pressed");
                setTimeout(function() {$("#red").removeClass("pressed")}, 150); 
                   break;
                case "yellow": 
                $("#yellow").addClass("pressed");
                setTimeout(function() {$("#yellow").removeClass("pressed")}, 150);
                   break;        
                default:
                 $("#blue").addClass("pressed");
                 setTimeout(function() {$("#blue").removeClass("pressed")}, 150);
                 break;
            }        
            // console.log(userClickedPattern, "- clicked color array");
            currentLevel = userClickedPattern.length-1;
            $(".btn").off(); // required at end of function; otherwise, ghost clicks occur
            checkAnswer();
    });    
}

// Checks arrays for matching indexes
function checkAnswer()  {
    const array1 = userClickedPattern.length;
    const array2 = gamePattern.length;

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel] && array1 !== array2)    {
        userClick();
        console.log("back to userClick()"); 
    }else if(userClickedPattern[currentLevel] === gamePattern[currentLevel] && array1 === array2)  {
        console.log("went to nextSequence()");
        userClickedPattern = new Array();
        nextSequence();
    }else{
        const wrong = new Audio('/sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over")}, 500);
        $("#level-title").text(`Game Over sucka! Press any key to Restart`);
        init();
    }
    // console.log(`${currentLevel} - userClickedPattern array index`);
}

