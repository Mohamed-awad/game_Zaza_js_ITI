// Start the game with different id;

/// the global variables and arrays
let container = document.getElementById("container");
//The array of falling rocks and the array of fireballsArray
let fireballsArray = [];
let rocksArray = document.getElementsByClassName("obj");
let currentBall = null;
let currentRock = null;
let fireballsID = 10000;
//Get the width of the window to make the space ship position at the middle exactly
const windowWidth = window.innerWidth;

//========================================Classes==========================================
class SpaceShip {
    constructor(src, id) {
        this.spaceShip = document.createElement("img");
        this.spaceShip.src = src;
        this.spaceShip.id = `${id}`;
        this.spaceShip.style.position = "absolute";
        this.spaceShip.style.top = `${570}px`;
        this.spaceShip.style.width = "125px";
        this.spaceShip.style.height = "140px";
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
        container.appendChild(this.fireBall);
    }
}

//creating the space ship
let createSpaceShip = function () {
    let createdSpaceShip = new SpaceShip("./img/spaceShip.png", 1);
    createdSpaceShip.spaceShip.style.left = `${(windowWidth - createdSpaceShip.spaceShip.offsetWidth) / 2}px`;
    return createdSpaceShip;
};
playerSpaceShip = createSpaceShip();
//Stand Alone Functions
// fire the ball
let fire = function () {
    let fireball = new FireBall("./img/fire.gif");
    fireball.fireBall.style.left = `${playerSpaceShip.spaceShip.offsetLeft +
    (playerSpaceShip.spaceShip.offsetWidth -
        28) / 2}px`;
    fireballsArray.push(fireball);
    let moveUp = function () {
        fireball.fireBall.style.top = `${fireball.fireBall.offsetTop - 10}px`
    };
    setInterval(moveUp, 40);
};
// collision detection
let collision = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(((x1 + w1 - 1) < x2) ||
        ((x2 + w2 - 1) < x1) ||
        ((y1 + h1 - 1) < y2) ||
        ((y2 + h2 - 1) < y1))
};
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
// 1 - keyboard listeners.
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


//====== functions that needed to be fired regularly========
//Fire checker
setInterval(() => {
    if (keyPressed["ControlLeft"]) fire()
}, 150);
//checker for every thing else
setInterval(() => {
    controlSpaceShip();
    //Check for collisions
    for (let i = 0; i < fireballsArray.length; i++) {
        currentBall = document.getElementById(fireballsArray[i].fireBall.id);
        //Remove the fire when it reaches the top
        if (currentBall.offsetTop < 50) {
            currentBall.remove();
            fireballsArray.splice(i, 1);
        }
        for (let j = 0; j < rocksArray.length; j++) {
            currentRock = document.getElementById(rocksArray[j].id);
            //Hit the target
            if (Math.abs((rocksArray[j].offsetTop + rocksArray[j].offsetHeight) - currentBall.offsetTop) < 20 //height intersection
                && currentBall.offsetLeft >= (currentRock.offsetLeft - currentBall.offsetWidth + 5) //left side intersection
                && currentBall.offsetLeft <= (currentRock.offsetLeft + currentRock.offsetWidth))//right side intersection
            {
                currentBall.remove();
                fireballsArray.splice(i, 1);
                currentRock.remove();
                rocksArray.splice(j, 1);
            }
        }
    }
    let spaceShipX = playerSpaceShip.spaceShip.offsetLeft;
    let spaceShipY = playerSpaceShip.spaceShip.offsetTop;
    let spaceShipHeight = playerSpaceShip.spaceShip.offsetHeight;
    for (let k = 0; k < rocksArray.length; k++) {
        let rockX = rocksArray[k].offsetLeft;
        let rockY = rocksArray[k].offsetTop;
        let rockHeight = rocksArray[k].offsetHeight;
        let rockWidth = rocksArray[k].offsetWidth;

        // if (  )
        // {
        //     console.log("collision")
        // }
    }
}, 100);

//this is the collision pleaseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
let coll = function () {
    let spaceShipX = playerSpaceShip.spaceShip.offsetLeft;
    let spaceShipY = playerSpaceShip.spaceShip.offsetTop;
    let spaceShipHeight = playerSpaceShip.spaceShip.offsetHeight;

    console.log(spaceShipX);
    console.log(rocksArray[0].offsetLeft + parseInt(rocksArray[0].style.width));
    if ((spaceShipX + 20 <= rocksArray[0].offsetLeft + parseInt(rocksArray[0].style.width) &&
        spaceShipY + 20 <= rocksArray[0].offsetTop + parseInt(rocksArray[0].style.height))
    // (spaceShipX >rocksArray[0].offsetLeft)
    )
    // spaceShipY <= rocksArray[0].offsetTop + parseInt(rocksArray[0].style.height)) ||
    // (spaceShipX <= rocksArray[0].offsetLeft + parseInt(rocksArray[0].style.width) &&
    // spaceShipY <= rocksArray[0].offsetTop + parseInt(rocksArray[0].style.height)) ){
        console.log("cooooooooolision");
};
setInterval(coll, 2000);

//if(spaceship.life==0) game over
setInterval(() => {
    console.log(keyPressed)
}, 1000);



