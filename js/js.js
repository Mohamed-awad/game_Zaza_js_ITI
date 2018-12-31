// Start the game with different id;
/// the global variables and arrays
let container = document.getElementById("container");
//The array of falling rocks and the array of fireballs
let fireballs = [];
let fireballsID = 10000;
let currentBall = null;
let rocksArray = [];
let rockId = 0;
let currentRock = null;
let playerSpaceShip = null; // constructing it to be used in fire ball class
//Creating arrays off high score // array of survival time // array of rocks destroyed
let scores = {
    highScore:[],
    highestSurvivalTime :[],
    highestRockDestroyed:[]
};
let currentLevel = null;
let currentScore = null;
let currentSurvivalTime = null;


//Get the width of the window to make the space ship position at the middle exactly
const windowWidth = container.offsetWidth;
//class rocks
class Rocks {
    constructor(src) {
        let fallingPosition = Math.floor(Math.random() * windowWidth);
        this.rock = document.createElement("img");
        this.rock.src = src;
        this.rock.id = `${rockId++}`;
        this.rock.style.position = "absolute";
        this.rock.style.top = "-100px";
        this.rock.style.left = `${fallingPosition}px`;
        this.rock.style.width="150px";
        this.rock.style.height="150px";
        this.lives = null;
        container.appendChild(this.rock);
        rocksArray.push(this.rock);
    }
}

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
        console.log(this.spaceShip.offsetWidth);
    }
}

class FireBall {
    constructor(src) {
        this.fireBall = document.createElement("img");
        this.fireBall.src = src;
        this.fireBall.id = `${fireballsID++}`;
        this.fireBall.style.position = "absolute";
        this.fireBall.style.top = `${playerSpaceShip.spaceShip.offsetTop - 15}px`;
        this.fireBall.style.left = `${playerSpaceShip.spaceShip.offsetLeft + (playerSpaceShip.spaceShip.offsetWidth - this.fireBall.width) / 2}px`;
        container.appendChild(this.fireBall);
    }
}

//====================Global stand Alone Functions==============
// check the current level
let levelUp = function () {
    if (currentScore > 0) {
        return 1;
    } else if (currentScore >= 200 && currentScore < 600) {
        return 2;
    } else if (currentScore >= 600 && currentScore < 1200){
        return 3;
    }
    else {
        return 4;
    }
};

//Adding the firing functions
let fire = function () {
    let fireball = new FireBall("./img/fire.gif");
    fireballs.push(fireball);
    let moveUp = function () {
        fireball.fireBall.style.top = `${fireball.fireBall.offsetTop - 10}px`
    };
    setInterval(moveUp, 40);
};
//Falling rocks
let fallenRock = null;
let chosenRock = function (level) {
        switch (level) {
            case 1:
                fallenRock = new Rocks("./img/rock1.gif");
                break;
            case 2:
                fallenRock = new Rocks("./img/rock2.gif");
                break;
            case 3:
                fallenRock = new Rocks("./img/3.jpg");
                break;
        }
        return fallenRock;
    };
let fallingRocks = function (level) {
    let currentFallingRock = chosenRock(level);
    let fallingInterval = null;
    switch (level) { // chooses the speed
        case 1 :
            fallingInterval = 100;
            break;
        case 2 :
            fallingInterval = 80;
            break;
        case 3 :
            fallingInterval = 60;
            break;
        case 4 :
            fallingInterval = 40;
            break
    }
    let moveDown = function () {
        currentFallingRock.rock.style.top = `${currentFallingRock.rock.offsetTop + 10}px`
    };
    setInterval(moveDown, fallingInterval);
};

//-------------keyboard listeners--------------
let keyPressed = [];
let keyPress = function (event) {
    keyPressed[event.code] = true;

};
let keyReleased = function (event) {
    keyPressed[event.code] = false;
    console.log(keyPressed);
};

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyReleased);


//======================Playing the game ======================
let play = function()
{
    //----------Session variables -------------
    playerSpaceShip = new SpaceShip("./img/spaceShip.png", -1);
    currentLevel = 1;
    currentScore = 0;
    currentSurvivalTime = 0;
    //Start falling rocks
    setTimeout(()=>{
                    setInterval(()=>{fallingRocks(1)},500)
    },3000);

//Event Functions
    let controlSpaceShip = function (event) {
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



//====== functions that needed to be fired regularly========
//Fire checker
    setInterval(() => {
        if (keyPressed["ControlLeft"]) fire()
    }, 150);
//checker for every thing else
    setInterval(() => {
        controlSpaceShip();
        for (let i = 0; i < fireballs.length; i++) {
            currentBall = document.getElementById(fireballs[i].fireBall.id);
            if (currentBall.offsetTop < 50) {
                currentBall.remove();
                fireballs.splice(i, 1);
            }
            for (let j = 0; j < rocksArray.length; j++) {
                currentRock = document.getElementById(rocksArray[j].id);
                //Check fire collision
                if (Math.abs((currentRock.offsetTop + currentRock.offsetHeight) - currentBall.offsetTop) < 20
                    && currentBall.offsetLeft >= (currentRock.offsetLeft - currentBall.offsetWidth + 5)
                    && currentBall.offsetLeft <= (currentRock.offsetLeft + currentRock.offsetWidth)) {
                    currentBall.remove();
                    fireballs.splice(i, 1);
                    currentRock.remove();
                    rocksArray.splice(j, 1);
                }
                //Check when rock reach the end of the screen
            }
        }
        for (let k = 0; k < rocksArray.length; k++) {
            let rockAtBottom = document.getElementById(rocksArray[k].id);
            if (rockAtBottom.offsetTop + rockAtBottom.offsetHeight > window.innerHeight - 70) {
                rockAtBottom.remove();
                rocksArray.splice(k, 1);
            }
        }

        //Check the current level
        currentLevel = levelUp();

    }, 100);
};
play();