// get container
let container = document.getElementById("container");

// get score div
let scoreDiv = document.getElementById("scoreValue");

// get life div
let lifeDiv = document.getElementById("liveValue");

// get level div
let levelDiv = document.getElementById("levelValue");

//get time dive
let timelDiv = document.getElementById("timeValue");

// local storage for coins and score and level
let currentLevel = localStorage.getItem('level');
if(currentLevel === null)
    currentLevel = 1;
let currentScore = localStorage.getItem('score');
if(currentScore === null)
    currentScore = 0;
let currentCoin = localStorage.getItem('coin');
if(currentCoin === null)
    currentCoin = 10;

// set level and life and score to dom
lifeDiv.innerText=`Live : ${currentCoin}`;
scoreDiv.innerText=`Score : ${currentScore}`;
levelDiv.innerText=`Level : ${currentLevel}`;

//Timer
let sec1 = null;
let sec2 = null;
let min1 = null;
let min2 = null;
// ship
let ship = null;
//Controlling
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
// start rock
let classImg = document.createElement("img");

let rocksArray = [];
const windowWidth = container.offsetWidth

//this var for array that contain the object of imgs for collision between space ship and rock
let spaceCrashArray = [];
//this class for creat img and style for it after collision
class imgcollisionSpace_Rocks {
    constructor() {
        this.spaceCrashImg = document.createElement("img");
        this.spaceCrashImg.src = "./img/111.jpg";
        this.spaceCrashImg.setAttribute("style",`position:absolute;
                                        top:${ship.spaceShip.offsetTop + 20}px;
                                        width:100px; height:100px;
                                        left:${ship.spaceShip.offsetLeft - 50 + ship.spaceShip.offsetWidth / 2}px`);
        container.appendChild(this.spaceCrashImg);
        spaceCrashArray.push(this.spaceCrashImg);
    }
}


class Rock
{
    constructor(src)
    {
        this.fallingPosition = Math.floor(Math.random() * windowWidth);
        while(this.fallingPosition<=150 || this.fallingPosition>=windowWidth-150)
        {
            this.fallingPosition = Math.floor(Math.random() * windowWidth);
        }
        this.rock = classImg.cloneNode(true);
        this.rock.src = src;
        this.rock.setAttribute("style",`position:absolute;top:-100px;width:100px;height:100px;margin:15px;
                                        left:${this.fallingPosition}px`);
        container.appendChild(this.rock);
        rocksArray.push(this);
        this.interval= setInterval(()=>{this.moveDown()}, 120);
    }
    moveDown()
    {
        if (this.rock.offsetTop + this.rock.offsetHeight > window.innerHeight - 20)
        {
            clearInterval(this.interval);
            container.removeChild(this.rock);
            rocksArray.splice(0, 1);
            delete(this.rock);
            delete(this.interval);
        }
        else
        {

            this.rock.style.top = `${this.rock.offsetTop + 10}px`;
            // collision with ship
            if (
                this.rock.offsetLeft + this.rock.offsetWidth >= ship.spaceShip.offsetLeft &&
                this.rock.offsetLeft <= ship.spaceShip.offsetLeft+ ship.spaceShip.offsetWidth &&
                this.rock.offsetTop + this.rock.offsetHeight >= ship.spaceShip.offsetTop &&
                this.rock.offsetTop <= ship.spaceShip.offsetTop+ ship.spaceShip.offsetHeight
            )
            {
                imgcollisionSpace_Rocks.spaceCrashVolcano = new imgcollisionSpace_Rocks;
                // deleting rock
                clearInterval(this.interval);
                container.removeChild(this.rock);
                rocksArray.splice(0, 1);
                delete(this.rock);
                delete(this.interval);
                setTimeout(()=>{
                for (let j = 0; j < spaceCrashArray.length; j++) {
                    imgcollisionSpace_Rocks.currentVolcano = spaceCrashArray[j];
                    imgcollisionSpace_Rocks.currentVolcano.remove();
                    spaceCrashArray.splice(j, 1);
                    }
                },3000);
            }
        }
    }
};

// end rock

// start coin

let coinArray= [];
class Coin {
    constructor(src) {
        this.fallingPosition = Math.floor(Math.random() * windowWidth);
        while(this.fallingPosition<=150 || this.fallingPosition>=windowWidth-150)
        {
            this.fallingPosition = Math.floor(Math.random() * windowWidth);
        }
        this.coin = classImg.cloneNode(true);
        this.coin.src = src;
        this.coin.setAttribute("style",`position:absolute;top:-100px;width:75px;height:75px;margin:20px;left:
                                    ${this.fallingPosition}px`);
        container.appendChild(this.coin);
        coinArray.push(this);
        this.interval= setInterval(()=>{this.moveDown()}, 120);
    }

    moveDown()
    {
        if (this.coin.offsetTop + this.coin.offsetHeight > window.innerHeight - 20)
        {
            clearInterval(this.interval);
            container.removeChild(this.coin);
            coinArray.splice(0, 1);
            delete(this.coin);
            delete(this.interval);
        }
        else
        {
            this.coin.style.top = `${this.coin.offsetTop + 10}px`;
            // collision with ship
            if (
                this.coin.offsetLeft >= ship.spaceShip.offsetLeft &&
                this.coin.offsetLeft <= ship.spaceShip.offsetLeft+ ship.spaceShip.offsetWidth &&
                this.coin.offsetTop >= ship.spaceShip.offsetTop &&
                this.coin.offsetTop <= ship.spaceShip.offsetTop+ ship.spaceShip.offsetHeight
            )
            {
                // deleting coin
                clearInterval(this.interval);
                container.removeChild(this.coin);
                coinArray.splice(0, 1);
                delete(this.coin);
                delete(this.interval);

                // increase coin
                currentCoin++;
                localStorage.setItem('coin', currentCoin);
                lifeDiv.innerText=`Live :${currentCoin}`;
            }
        }
    }
};
// end coin

// start ship

class Ship {
    constructor(src) {
        this.spaceShip = classImg.cloneNode(true);
        this.spaceShip.src = src;
        this.spaceShip.setAttribute("style",`position:absolute;top:${window.innerHeight - 140}px;left:${(windowWidth - 125) / 2}px;
                                               width:125px;height:140px`);
        container.appendChild(this.spaceShip);
    }
}
// end ship

// start fire ball

class FireBall {
    constructor(src) {
        this.fireBall = classImg.cloneNode(true);
        this.fireBall.src = src;
        this.fireBall.setAttribute("style",`top:${ship.spaceShip.offsetTop - 15}px;left:
       ${ship.spaceShip.offsetLeft +(ship.spaceShip.offsetWidth - 25) / 2}px;position:absolute`);
        container.appendChild(this.fireBall);
        this.interval= setInterval(()=>{this.moveUp()}, 40);
    }

    moveUp()
    {
        // remove when arrive to the top
        if(this.fireBall.offsetTop < 50)
        {
            clearInterval(this.interval);
            container.removeChild(this.fireBall);
            delete(this.fireBall);
            delete(this.interval);
        }
        else
        {
            this.fireBall.style.top = `${this.fireBall.offsetTop - 10}px`;
            // collision for rocks
            let flag = 1;
            for(let i = 0; i < rocksArray.length; i++)
            {
                if (
                    this.fireBall.offsetLeft >= rocksArray[i].rock.offsetLeft &&
                    this.fireBall.offsetLeft <= rocksArray[i].rock.offsetLeft+ rocksArray[i].rock.offsetWidth &&
                    (rocksArray[i].rock.offsetTop + rocksArray[i].rock.offsetHeight) - this.fireBall.offsetTop > 8 &&
                    (rocksArray[i].rock.offsetTop + rocksArray[i].rock.offsetHeight) - this.fireBall.offsetTop <70
                )
                {
                    // deleting fire ball
                    clearInterval(this.interval);
                    container.removeChild(this.fireBall);
                    delete(this.fireBall);
                    delete(this.interval);
                    // deleting rock
                    clearInterval(rocksArray[i].interval);
                    container.removeChild(rocksArray[i].rock);
                    rocksArray.splice(i, 1);

                    // increase score
                    currentScore++;
                    localStorage.setItem('score', currentScore);
                    scoreDiv.innerText=`Score : ${currentScore}`;

                    // increase level
                    if(currentScore >= 500)
                    {
                        currentLevel = 3;
                    }
                    else if (currentScore >= 200)
                    {
                        currentLevel = 2;
                    }
                    else
                    {
                        currentLevel = 1;
                    }
                    localStorage.setItem('score', currentLevel);
                    levelDiv.innerText=`Level : ${currentLevel}`;

                    // change flag because fire not exist any more
                    flag = 0;
                    break;
                }
            }

            if(flag)
            {
                // collision for coins
                for(let i = 0; i < coinArray.length; i++)
                {
                    if (
                        this.fireBall.offsetLeft >= coinArray[i].coin.offsetLeft &&
                        this.fireBall.offsetLeft <= coinArray[i].coin.offsetLeft+ coinArray[i].coin.offsetWidth &&
                        (coinArray[i].coin.offsetTop + coinArray[i].coin.offsetHeight) - this.fireBall.offsetTop > 8 &&
                        (coinArray[i].coin.offsetTop + coinArray[i].coin.offsetHeight) - this.fireBall.offsetTop <70
                    )
                    {
                        // deleting fire ball
                        clearInterval(this.interval);
                        container.removeChild(this.fireBall);
                        delete(this.fireBall);
                        delete(this.interval);
                        // deleting coin
                        clearInterval(coinArray[i].interval);
                        container.removeChild(coinArray[i].coin);
                        coinArray.splice(i, 1);

                        // increase coin
                        currentCoin++;
                        localStorage.setItem('coin', currentCoin);
                        lifeDiv.innerHTML = `<h3>Life : ${currentCoin} </h3>`;

                        break;
                    }
                }
            }
        }
    }
}

// end fire ball

let controlSpaceShip = function () {
    //This function is called each time frame to check for the pressed key from the array
    // FOR Example : KeyPressed["ArrowRight"] check for the value of the key "ArrowRight" in the array
    //               The ArrowRight key is assigned automatically using the event.code as it's explained
    //               in the event listeners functions
    if (keyPressed["ArrowRight"]) {
        if (ship.spaceShip.offsetLeft < 1400) {
            ship.spaceShip.style.left = `${ship.spaceShip.offsetLeft += 20}px`;
        }
    }
    if (keyPressed["ArrowLeft"]) {
        if (ship.spaceShip.offsetLeft > 20) {
            ship.spaceShip.style.left = `${ship.spaceShip.offsetLeft -= 20}px`;
        }
    }
    if (keyPressed["ArrowDown"]) {
        if (ship.spaceShip.offsetTop < 570) {
            ship.spaceShip.style.top = `${ship.spaceShip.offsetTop += 20}px`;
        }
    }
    if (keyPressed["ArrowUp"]) {
        if (ship.spaceShip.offsetTop > 10) {
            ship.spaceShip.style.top = `${ship.spaceShip.offsetTop -= 20}px`;
        }
    }
};
let timer = function()
{
    sec1+=1;
    if (sec1 ===10)
    {
        sec1 = 0;
        sec2+=1;
    }
    if(sec2 ===6)
    {
        sec2 = 0;
        min1 +=1;
    }
    if(min1 === 10)
    {
        min1 = 0;
        min2+=1
    }
    document.getElementById("timeValue").innerText=`${min2}${min1}:${sec2}${sec1}`
};
function play()
{

    // creating a space ship
    ship = new Ship('./img/spaceShip.png');
    let fire = null;
    sec1 = 0;
    sec2 = 0;
    min1 = 0;
    min2 = 0;
    setInterval(() => {new Rock("./img/rock1.gif");}, 1000);
    setInterval(() => {new Coin("./img/live.gif");}, 10000);
    setInterval(() => {
        if (keyPressed["ControlLeft"]) fire = new FireBall('./img/fire.gif');
    }, 150);
    setInterval(controlSpaceShip,50);
    setInterval(timer,1000);
}

play();
