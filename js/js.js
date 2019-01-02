// the global variables and arrays

let container = document.getElementById("container");
//The array of falling rocks and the array of fireballs
/* We made an array of fire ball and rocks for the following reasons :
    1 - keep track of each object in the screen
    2 - loop through them to check some conditions of collisions
 */
// the variables declared by null will be used through out the program
let fireballs = [];
let fireballsID = 100000; // this id will increment gradually for each object constructed
let currentBall = null;
let rocksArray = [];
let rockId = 0;
//2/1/2019 by abdo
let liveId=0;
let liveArray= [];
//end of 2/1/2019
let live=10; //start from live 10 if reach to 0 game over
let currentRock = null;
let playerSpaceShip = null; // this variable must be declared here so we will use it in fireball class
//Creating arrays off high score // array of survival time // array of rocks destroyed
let scores = {
    highScore:[], // each index represents a player !!!IMPORTANT
    highestSurvivalTime :[],
    highestRockDestroyed:[]
};
let currentLevel = 1;
let currentScore = 0;
let currentSurvivalTime = null;


//Get the width of the window to make the space ship position at the middle exactly
const windowWidth = container.offsetWidth;

class Rocks {
    constructor(src) {
        let fallingPosition = Math.floor(Math.random() * windowWidth);
        while(fallingPosition<=100 || fallingPosition>=windowWidth-100)
        {
        	 fallingPosition = Math.floor(Math.random() * windowWidth);
        }
        this.rock = document.createElement("img");
        this.rock.src = src;
        this.rock.id = `${rockId++}`;
        this.rock.style.position = "absolute";
        this.rock.style.top = "-100px"; // THIS CAN BE CHANGED AS THIS MAKES THE ROCK GET FROM THE TOP OF SCREEN
        this.rock.style.left = `${fallingPosition}px`;
        this.rock.style.width="100px";
        this.rock.style.height="100px";
        this.rock.style.margin="15px";
        this.lives = null; // at each level this value will be changed
        container.appendChild(this.rock);
        rocksArray.push(this.rock);
    }
}

/*2/1/2019 this class represent the fallen coins*/ 
class Lives {
    constructor(src) {
        let fallingPosition = Math.floor(Math.random() * windowWidth);
        while(fallingPosition<=100 || fallingPosition>=windowWidth-100)
        {
        	 fallingPosition = Math.floor(Math.random() * windowWidth);
        }
        this.live = document.createElement("img");
        this.live.src = src;
        this.live.id = `${liveId++}`;
        this.live.style.position = "absolute";
        this.live.style.top = "-100px"; // THIS CAN BE CHANGED AS THIS MAKES THE ROCK GET FROM THE TOP OF SCREEN
        this.live.style.left = `${fallingPosition}px`;
        this.live.style.width="75px";
        this.live.style.height="75px";
        this.live.style.margin="20px";
        container.appendChild(this.live);
        liveArray.push(this.live);
    }
}
//end of 2/1/2019
class SpaceShip {
    constructor(src,id) {
        this.spaceShip = document.createElement("img");
        this.spaceShip.src = src;
        this.spaceShip.id = `${id}`;
        this.spaceShip.style.position = "absolute";
        this.spaceShip.style.top = `${570}px`;
        this.spaceShip.style.left = `${(windowWidth - 125) / 2}px`;
        this.spaceShip.style.width="125px";
        this.spaceShip.style.height="140px";
        container.appendChild(this.spaceShip);
    }
}

class FireBall {
    constructor(src) {
        this.fireBall = document.createElement("img");
        this.fireBall.src = src;
        this.fireBall.id = `${fireballsID++}`;
        this.fireBall.style.position = "absolute";
        this.fireBall.style.top = `${playerSpaceShip.spaceShip.offsetTop - 15}px`;
        this.fireBall.style.left = `${playerSpaceShip.spaceShip.offsetLeft +
                                (playerSpaceShip.spaceShip.offsetWidth - this.fireBall.width) / 2}px`;
        container.appendChild(this.fireBall);
        fireballs.push(this.fireBall);
    }
}

//====================Global stand Alone Functions==============
// This function returns a number to the GLOBAL variable which is currentLevel
// this functions is checked every frame of the game (50ms)
let levelUp = function () {
    if (currentScore >= 0 && currentScore<100) {
        return 1;
    } else if (currentScore >= 100 && currentScore < 200) {
        return 2;
    } else{
        return 3;
    }
 
};

//Adding the firing functions
let fire = function () {
    let fireball = new FireBall("./img/fire.gif");
    let moveUp = function () {
        fireball.fireBall.style.top = `${fireball.fireBall.offsetTop - 10}px`
    };
    setInterval(moveUp, 40);
};

//Falling rocks
// ABDO PARTS
let fallenRock = null;
//this array used in the first level choose randmly the x position for the rock [4 collumn]
/*let fallingPositionLevel1 = [(container.offsetWidth/5),
    ((container.offsetWidth/5)*2),
    ((container.offsetWidth/5)*3),
    ((container.offsetWidth/5)*4)];
//this array used in the second level choose randmly the x position for the rock [7 collumn]
let fallingPositionLevel2 = [(container.offsetWidth/8),
    ((container.offsetWidth/8)*2),
    ((container.offsetWidth/8)*3),
    ((container.offsetWidth/8)*4),
    ((container.offsetWidth/8)*5),
    ((container.offsetWidth/8)*6),
    ((container.offsetWidth/8)*7)];
//this array used in the third level choose randmly the x position for the rock [10 collumn]
let fallingPositionLevel3 = [(container.offsetWidth/10),
    ((container.offsetWidth/10)*2),
    ((container.offsetWidth/10)*3),
    ((container.offsetWidth/10)*4),
    ((container.offsetWidth/10)*5),
    ((container.offsetWidth/10)*6),
    ((container.offsetWidth/10)*7),
    ((container.offsetWidth/10)*8),
    ((container.offsetWidth/10)*9),
    ((container.offsetWidth/10)*10)];*/
let fallingRocks = function (level) {
    let  currentFallingRock = null;
    let fallingInterval = null;
    switch (level) { //check the level to choose the image
        case 1:
            currentFallingRock = new Rocks("./img/rock1.gif");
            break;
        case 2:
            currentFallingRock = new Rocks("./img/rock2.gif");
            break;
        case 3:
            currentFallingRock = new Rocks("./img/rock2.gif");
            break;
    }
    switch (level) { // chooses the speed
        case 1 :
            fallingInterval = 120;
            break;
        case 2 :
            fallingInterval = 100;
            break;
        case 3 :
            fallingInterval = 80;
            break;
    }
    let moveDown = function () {
        currentFallingRock.rock.style.top = `${currentFallingRock.rock.offsetTop + 10}px`
    };
    setInterval(moveDown, fallingInterval);
};
//start of 2/1/2019
let fallingLive = function () {
    let fallingLive = new Lives("./img/live.gif");
    let moveDown = function(){
        fallingLive.live.style.top = `${fallingLive.live.offsetTop + 10}px`
    }
    setInterval(moveDown , 150);
};
//end of 2/1/2019

//-------------keyboard listeners--------------
// The aim of these listener is to check whether a key board button is pressed or no
// for better controlling the game This array is also checked at every frame of the game
let keyPressed = [];
let keyPress = function (event) {
    keyPressed[event.code] = true;  // event code returns the pressed key as a string i.e Space,LeftArrow, etc
                                    // this make the event code a key in the array and assign it to true
};
let keyReleased = function (event) {
    keyPressed[event.code] = false; // it returns false when key is released
    console.log(keyPressed);
};

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyReleased);


//=============================Playing the game ===========================
/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$                             IMPORTANT NOTE                                        $$
$$ The play function will accept a variable from 0 to 2 which represents each player $$
$$ so that at the game over we check the high sore of this player which is stored in $$
$$ the scores arrays AND Each index of the array represent the player number         $$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

let play = function() //
{
    //----------Session variables -------------
    playerSpaceShip = new SpaceShip("./img/spaceShip.png", -1); // creating a space ship
    currentSurvivalTime = 0;
    //Start falling rocks
    //THIS MAKES THE GAME WAIT FOR 1 SECOND THEN THE FALLING OF ROCKS STARTS
    setTimeout(()=>{
        intervl= setInterval(()=>{fallingRocks(currentLevel)},500) // 500 REPRESENTS THE INTERVAL BETWEEN EACH ROCK
    },1000);
    //start of 2/1/2019
    setTimeout(()=>{
        intervl= setInterval(fallingLive,5000)
    },2000);
    //end of 2/1/2019
//Event Functions
    let controlSpaceShip = function () {
        //This function is called each time frame to check for the pressed key from the array
        // FOR Example : KeyPressed["ArrowRight"] check for the value of the key "ArrowRight" in the array
        //               The ArrowRight key is assigned automatically using the event.code as it's explained
        //               in the event listeners functions
        if (keyPressed["ArrowRight"]) {
            if (playerSpaceShip.spaceShip.offsetLeft < 1400) {
                playerSpaceShip.spaceShip.style.left = `${playerSpaceShip.spaceShip.offsetLeft += 20}px`;
            }
        }
        if (keyPressed["ArrowLeft"]) {
            if (playerSpaceShip.spaceShip.offsetLeft > 20) {
                playerSpaceShip.spaceShip.style.left = `${playerSpaceShip.spaceShip.offsetLeft -= 20}px`;
            }
        }
        if (keyPressed["ArrowDown"]) {
            if (playerSpaceShip.spaceShip.offsetTop < 570) {
                playerSpaceShip.spaceShip.style.top = `${playerSpaceShip.spaceShip.offsetTop += 20}px`;
            }
        }
        if (keyPressed["ArrowUp"]) {
            if (playerSpaceShip.spaceShip.offsetTop > 10) {
                playerSpaceShip.spaceShip.style.top = `${playerSpaceShip.spaceShip.offsetTop -= 20}px`;
            }
        }
    };
//===================================================================
// The Game movement
//-------------------
/*
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&         THIS IS THE MOST IMPORTANT PART OF THE GAME PLAY                        &&&
&&&   In this section we write the conditions the will be check at each frame       &&&
&&&   of the game, the game screen is refreshed every 50ms (which is determined     &&&
&&&   in the variable playingFrames the Playing frames time interval would be       &&&
&&&   CLEARED when the game is over                                                 &&&
&&&   SO PLEASE : write all the check conditions in the playingFrames interval      &&&
&&&   Further explanation will be at the function                                   &&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
 */
//====== functions that needed to be fired regularly========
//Fire checker (The checker frame is slower than the playing frame so that the spaceship fire slower than
//the playing frames (150 ms ) this makes space between each fire
    setInterval(() => {
        if (keyPressed["ControlLeft"]) fire()
    }, 150);
//THIS IS THE MAIN INTERVAL IT CHECKS FOR EVERY THING ELSE
    let playingFrames = setInterval(() => {
        controlSpaceShip(); // It updates the position of spaceship according to keyPressed array
        //The following loop loops through all fireballs and rocks to check for collisions
        for (let i = 0; i < fireballs.length; i++) {
            currentBall = document.getElementById(fireballs[i].id); // this get the current ball of the loop
            if (currentBall.offsetTop < 50) { // this check when ball hit the ceiling
                currentBall.remove(); //this remove the ball from the DOM
                fireballs.splice(i, 1); // this romve the ball from the array
            }
            for (let j = 0; j < rocksArray.length; j++) { // this loops for each rock corresponding to each fireball
                currentRock = document.getElementById(rocksArray[j].id);
                //Check fire collision
                if (Math.abs((currentRock.offsetTop + currentRock.offsetHeight) - currentBall.offsetTop) < 20
                    && currentBall.offsetLeft >= (currentRock.offsetLeft - currentBall.offsetWidth + 5)
                    && currentBall.offsetLeft <= (currentRock.offsetLeft + currentRock.offsetWidth)) {
                    currentBall.remove();
                    fireballs.splice(i, 1);
                    currentRock.remove();
                    rocksArray.splice(j, 1);
                    currentScore++;
                    document.getElementById("score").innerHTML=`<h3>Score :${currentScore}</h3>`;
                }
            }
            //start 2/1/2019
            for (let j = 0; j < liveArray.length; j++) { // this loops for each live corresponding to each fireball
                currentlive = document.getElementById(liveArray[j].id);
                //Check fire collision
                if (Math.abs((currentlive.offsetTop + currentlive.offsetHeight) - currentBall.offsetTop) < 20
                    && currentBall.offsetLeft >= (currentlive.offsetLeft - currentBall.offsetWidth + 5)
                    && currentBall.offsetLeft <= (currentlive.offsetLeft + currentlive.offsetWidth)) {
                    currentBall.remove();
                    fireballs.splice(i, 1);
                    currentlive.remove();
                    liveArray.splice(j, 1);
                    live++;
                    document.getElementById("live").innerHTML=`<h3>Live :${live}</h3>`;
                }
            }
            //end 2/1/2019
        }
        //Check when rock reach the end of the screen it loops through rockArray
        for (let k = 0; k < rocksArray.length; k++) {
            let rockAtBottom = document.getElementById(rocksArray[k].id);
            if (rockAtBottom.offsetTop + rockAtBottom.offsetHeight > window.innerHeight - 70) {
                rockAtBottom.remove();
                rocksArray.splice(k, 1);
                live--;
                document.getElementById("live").innerHTML=`<h3>Live :${live}</h3>`;
            }
            //IMPORTANT ROCK-SPACESHIP collision checker will be written here as each rock is checked in this loop
        }
        //Check the current level and assign it to the global variable current level

        //start 2/1/2019 by abdo
        //Check when live reach the end of the screen it loops through liveArray
        for (let k = 0; k < liveArray.length; k++) {
            let liveAtBottom = document.getElementById(liveArray[k].id);
            if (liveAtBottom.offsetTop + liveAtBottom.offsetHeight > window.innerHeight - 70) {
                liveAtBottom.remove();
                liveArray.splice(k, 1);
            }
        }
        //end 2/1/2019
        currentLevel = levelUp();
        document.getElementById("level").innerHTML=`<h3>Level :${currentLevel}</h3>`;
    }, 40);
};
play();