// Start the game with different id;

/// the global variables and arrays
let container = document.getElementById("container");
//The array of falling rocks and the array of fireballs
let fireballs = [];
let sq = document.getElementsByClassName("obj");
let currentBall = null;
let currentRock = null;
let fireballsID = 10000;
//Get the width of the window to make the space ship position at the middle exactly
const windowWidth = window.innerWidth;
//using window height to make rocks fall
let windoHeight = window.innerHeight;


//this from samman file


let rocksArray = [];
let rockId = 0;
let fallingPosition = null;

//class rocks

class Rocks {
    constructor(src) {
        this.rock = document.createElement("img");
        this.rock.src = src;
        this.rock.id = `${rockId++}`;
        // this.rock.className = "obj";
        this.rock.style.position = "absolute";
        this.rock.style.top = "-100px";
        this.rock.style.left = `${fallingPosition}px`;
        this.rock.style.width="150px";
        this.rock.style.height="150px";
        container.appendChild(this.rock);
    }
}

//function levels and fallen

let counter = 0;
let determineLevel = function(ch)
{
    fallingPosition = Math.floor(Math.random()*windowWidth)

    // if(fallingPosition >= window.innerWidth){
    //     fallingPosition -= 100;
    // }else if(fallingPosition <= 100){
    //     fallingPosition += 100;
    // }else{
    //     fallingPosition = fallingPosition;
    // }

    fallingPosition = Math.floor(Math.random()*windowWidth);
    let movedown = function () {
        fallenRock.rock.style.top = `${fallenRock.rock.offsetTop + 10}px`
    };
    let fallenRock;
    let chh = ch;
    console.log("ch", ch);
    switch (chh) {
        case 1:
            fallenRock = new Rocks("./img/rock.jpg");
            setInterval(movedown, 80);
            console.log("aaaaaaaaa");
            break;
        case 2:
            fallenRock = new Rocks("./img/2.jpg");
            setInterval(movedown, 60);
            break;
        case 3:
            fallenRock = new Rocks("./img/3.jpg");
            setInterval(movedown, 40);
            break;

    }
    rocksArray.push(fallenRock);
}




let startFall = function(){
    if(counter < 7){
        determineLevel(1);
        counter++;
    }else if(counter >= 7 && counter < 15){
        determineLevel(2);
        counter++;
    }else{
        determineLevel(3);
    }
}
var interval = setInterval(startFall,1000)
let deletRocks = function(){
    let counterArray=0;
    while (rocksArray[counterArray].rock.style.bottom == "-100px"){
        rocksArray.shift();
    }
};



// let spaceShip = document.getElementById("spaceShip");

// let addTheSpaceShip = function () {
//
//
//     spaceShip.style.display = "inline-block";
//     spaceShip.style.left = `px`;
// };
// addTheSpaceShip();

class SpaceShip {
    constructor(src,id) {
        this.spaceShip = document.createElement("img");
        this.spaceShip.src = src;
        this.spaceShip.id = `${id}`;
        this.spaceShip.style.position = "absolute";
        this.spaceShip.style.top = `${570}px`;
        this.spaceShip.style.left = `${(windowWidth - this.spaceShip.offsetWidth) / 2}px`;
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
//creating the
let playerSpaceShip = new SpaceShip("./img/spaceShip.png",1);
//Stand Alone Functions
let fire = function () {
    let fireball = new FireBall("./img/fire.gif");
    fireballs.push(fireball);
    let moveUp = function () {
        fireball.fireBall.style.top = `${fireball.fireBall.offsetTop - 10}px`
    };
    setInterval(moveUp, 40);
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
    if (keyPressed["Space"]) fire()
}, 150);
//checker for every thing else
setInterval(() => {
    controlSpaceShip();
    for (let i = 0; i < fireballs.length; i++) {
        currentBall = document.getElementById(fireballs[i].fireBall.id);
        if (currentBall.offsetTop < 50) {
            currentBall.remove();
            fireballs.splice(i,1);
        }
        for (let j = 0;j<sq.length;j++) {
            currentRock = document.getElementById(sq[j].id);
            if ( Math.abs((sq[j].offsetTop + sq[j].offsetHeight) - currentBall.offsetTop) <20
                && currentBall.offsetLeft >= (currentRock.offsetLeft-currentBall.offsetWidth+5)
                && currentBall.offsetLeft <= (currentRock.offsetLeft+currentRock.offsetWidth))
            {
                currentBall.remove();
                fireballs.splice(i,1);
                currentRock.remove();
                sq.splice(j,1);
            }
        }
    }

}, 100);

