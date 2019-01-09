///////////////////
// get container
let container = document.getElementById("container");

// get score div
let scoreDiv = document.getElementById("scoreValue");

// get life div
let lifeDiv = document.getElementById("liveValue");

// get level div
let levelDiv = document.getElementById("levelValue");
//
let gameOverDiv = document.getElementsByClassName("gameOver")[0];
//start of for the mybadge
let bg=document.getElementById('badge');
let badge = document.createElement('img');
//end of for the badge

// coins and score and level
let currentLevel = 1 ;
let currentScore = 0;
let currentCoin = 10;
let highestCoin = 0;
// Add audios
let fireSound = function()
{
    let audio = document.getElementById("fireSound");
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
};

let play_collision_rock = function()
{
    let audio = document.getElementById("explosion");
    audio.currentTime = 0;
    audio.play();
};



let playGameSound = function(mode){
    let audio = document.getElementById("lowsound");
    audio.volume = 0.4;
    if (mode === "play") {
        audio.play();
    }
    else {
        audio.pause();
        audio.currentTime = 0;    }
};

let playMainMenu = function (mode){
    let audio = document.getElementById("mainMenu");
    audio.volume = 0.3;
    if (mode === "play") {
        audio.play();
    }
    else {
        audio.pause();
        audio.currentTime = 0;
    }

};
playMainMenu("play");
let divaudio = function()
{
    let divadui = document.getElementById("plyspell");
    divadui.currentTime = 0;
    divadui.play();
};

let clickMenu = function()
{
    let audio = document.getElementById("menuClick");
    audio.currentTime = 0;
    audio.play();
};

let levelUpSound = function()
{
    let audio = document.getElementById("levelUp");
    audio.play();
};

//Timer
let sec1 = null;
let sec2 = null;
let min1 = null;
let min2 = null;
let totalSeconds = null;
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
};
document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyReleased);

//Playing intervals
let timeInterval  = null ;
let rockInterval = null;
let controlInterval = null ;
let liveInterval =null ;
let fireInterval = null;
// start rock
let classImg = document.createElement("img");
let rocksArray = [];
//SuperPower
let superPower = null;
let finishSuperPowerFlag=null;

//fire and rock speed;
let rockTimeInterval=Math.floor((Math.random() * 200) + 750);
let fireTimeInterval=150;

//player class
class Player
{
    constructor(src){
        //this.name = name;
        this.highScore = null;
        this.survivalTime = null;
        this.lives = null;
        this.src=src;

    }
}
let playerOne = new Player("./img/spaceShip1.png");
let playerTwo = new Player("./img/spaceShip2.png");
let playerThree = new Player("./img/spaceShip3.png");
let playersArr=[playerOne,playerTwo,playerThree];
let currentPlayer = playerOne;
//this var for array that contain the object of imgs for collision between space ship and rock
let spaceCrashArray = [];
//this class for creat img and style for it after collision
class imgcollisionSpace_Rocks {
    constructor() {
        this.spaceCrashImg = document.createElement("img");
        this.spaceCrashImg.src = "./img/111.png";
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
        this.fallingPosition = Math.floor(Math.random() * (window.innerWidth -250))+100;
        this.rock = classImg.cloneNode(true);
        this.rock.src = src;
        this.rock.setAttribute("style",`position:absolute;top:-100px;width:100px;height:100px;margin:15px;
                                        left:${this.fallingPosition}px`);
        container.appendChild(this.rock);
        rocksArray.push(this);
        //for level
        let speedOfRock=0;
        if(currentLevel === 1)
        {
            speedOfRock=120;
        }
        else if(currentLevel === 2)
        {
            speedOfRock=90;
        }
        else if(currentLevel === 3)
        {
            speedOfRock=60;
        }
        //end for level
        this.interval= setInterval(()=>{this.moveDown()}, speedOfRock);//here
    }
    moveDown()
    {
        if (this.rock.offsetTop + this.rock.offsetHeight > window.innerHeight - 40)
        {
            clearInterval(this.interval);
            container.removeChild(this.rock);
            rocksArray.splice(0, 1);
            if (currentCoin!==0){
                currentCoin --;}
            lifeDiv.innerText=`Live : ${currentCoin}`;
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
                play_collision_rock();
                clearInterval(this.interval);
                container.removeChild(this.rock);
                rocksArray.splice(0, 1);
                delete(this.rock);
                delete(this.interval);
                if (currentCoin!==0){
                    currentCoin --;}
                lifeDiv.innerText=`Live : ${currentCoin}`;
                setTimeout(()=>{
                    for (let j = 0; j < spaceCrashArray.length; j++) {
                imgcollisionSpace_Rocks.currentVolcano = spaceCrashArray[j];
                imgcollisionSpace_Rocks.currentVolcano.remove();
                spaceCrashArray.splice(j, 1);
            }
            },200);
            }
        }
    }
}

// end rock

// start coin

let coinArray= [];
class Coin {
    constructor(src) {
        this.fallingPosition = Math.floor(Math.random() * (window.innerWidth -250))+100;
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
        if (this.coin.offsetTop + this.coin.offsetHeight > window.innerHeight - 40)
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
                // this.coin.offsetLeft >= ship.spaceShip.offsetLeft &&
                // this.coin.offsetLeft <= ship.spaceShip.offsetLeft+ ship.spaceShip.offsetWidth &&
                // this.coin.offsetTop >= ship.spaceShip.offsetTop &&
                // this.coin.offsetTop <= ship.spaceShip.offsetTop+ ship.spaceShip.offsetHeight

                this.coin.offsetLeft + this.coin.offsetWidth >= ship.spaceShip.offsetLeft &&
                this.coin.offsetLeft <= ship.spaceShip.offsetLeft+ ship.spaceShip.offsetWidth &&
                this.coin.offsetTop + this.coin.offsetHeight >= ship.spaceShip.offsetTop &&
                this.coin.offsetTop <= ship.spaceShip.offsetTop+ ship.spaceShip.offsetHeight

        )
            {
                divaudio();
                // deleting coin
                clearInterval(this.interval);
                container.removeChild(this.coin);
                coinArray.splice(0, 1);
                delete(this.coin);
                delete(this.interval);

                // increase coin
                currentCoin++;
                highestCoin++;
                superPower = true;
                lifeDiv.innerText=`Live : ${currentCoin}`;
            }
        }
    }
}
// end coin

// start ship

class Ship {
    constructor(src) {
        this.spaceShip = classImg.cloneNode(true);
        this.spaceShip.src = src;
        this.spaceShip.setAttribute("style",`position:absolute;top:${window.innerHeight - 170}px;left:${(window.innerWidth - 155) / 2}px;
                                               width:125px;height:140px`);
        container.appendChild(this.spaceShip);
    }
}
// end ship

// start fire ball

class FireBall {
    constructor(src,mode) {
        this.fireBall = classImg.cloneNode(true);
        this.fireBall.src = src;
        this.fireBall.style.position = "absolute";
        if (mode === "default")
        {
            this.fireBall.style.top = `${ship.spaceShip.offsetTop - 15}px`;
            this.fireBall.style.left = `${ship.spaceShip.offsetLeft +
            (ship.spaceShip.offsetWidth - 28) / 2}px`;


        }
        else if (mode ==="right")
        {
            this.fireBall.style.top = `${ship.spaceShip.offsetTop +39 }px`;
            this.fireBall.style.left = `${ship.spaceShip.offsetLeft +
            (ship.spaceShip.offsetWidth -28) / 2 - 41}px`;

        }
        else
        {
            this.fireBall.style.top = `${ship.spaceShip.offsetTop +39 }px`;
            this.fireBall.style.left = `${ship.spaceShip.offsetLeft +
            (ship.spaceShip.offsetWidth -28) / 2 + 41}px`;
        }
        container.appendChild(this.fireBall);

        //start level here
        let fireBallSpeed=0;
        if(currentLevel===1)
        {
            fireBallSpeed=20;
        }
        else if(currentLevel===2)
        {
            fireBallSpeed=15;
        }
        else if(currentLevel===3)
        {
            fireBallSpeed=10;
        }
        //end level here
        this.interval= setInterval(()=>{this.moveUp(mode)}, fireBallSpeed);
        fireSound();
    }

    moveUp(mode)
    {
        // remove when arrive to the top
        if(this.fireBall.offsetTop < 30||(this.fireBall.offsetLeft>window.innerWidth-40)||this.fireBall.offsetLeft<30)
        {
            clearInterval(this.interval);
            container.removeChild(this.fireBall);
            delete(this.fireBall);
            delete(this.interval);
        }
        else
        {
            //super power conditions
            if (mode==="default") {
                this.fireBall.style.top = `${this.fireBall.offsetTop - 10}px`;
            }
            else if (mode === "right")
            {
                this.fireBall.style.top = `${this.fireBall.offsetTop - 10}px`;
                this.fireBall.style.left= `${this.fireBall.offsetLeft - 5}px`;
            }
            else {
                this.fireBall.style.top = `${this.fireBall.offsetTop - 10}px`;
                this.fireBall.style.left= `${this.fireBall.offsetLeft + 5}px`;
            }
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
                    play_collision_rock();
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
                    scoreDiv.innerText=`Score : ${currentScore}`;

                    // increase level
                    if(currentScore >= 200)
                    {
                        currentLevel = 3;
                        levelUpSound();
                        if(currentScore==200)
                        {
                          badge.src="./img/startrek2.gif";
                          //badge.classList.add("mybadge");
                          //bg.appendChild(badge);
                        }
                    }
                    else if (currentScore >= 100)
                    {
                        currentLevel = 2;
                        levelUpSound();
                        if(currentScore==100)
                        {
                          badge.src="./img/startrek.gif";
                          badge.classList.add("mybadge");
                          bg.appendChild(badge);
                        }
                    }
                    else
                    {
                        currentLevel = 1;
                    }
                    levelDiv.innerText=`Level : ${currentLevel} /3 `;

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
                        divaudio();
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
                        highestCoin++;
                        superPower = true;
                        lifeDiv.innerText=`Live : ${currentCoin}`;
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
    //for level


    let movePixel=0;
    if(currentLevel===1)
    {
        movePixel=20;
        rockTimeInterval=Math.floor((Math.random() * 200) + 750);
        fireTimeInterval=150;
    }
    else if(currentLevel===2)
    {
        movePixel=30;
        rockTimeInterval=Math.floor((Math.random() * 150) + 600);
        fireTimeInterval=130;
    }
    else if (currentLevel===3) {
        rockTimeInterval=Math.floor((Math.random() * 150) + 400);
        fireTimeInterval=100;
        movePixel=40;
    }
    //end for level
    if (keyPressed["ArrowRight"]) {
        if (ship.spaceShip.offsetLeft < (window.innerWidth-ship.spaceShip.offsetWidth-30)) {
            ship.spaceShip.style.left = `${ship.spaceShip.offsetLeft += movePixel}px`;
        }
    }
    if (keyPressed["ArrowLeft"]) {
        if (ship.spaceShip.offsetLeft > 20) {
            ship.spaceShip.style.left = `${ship.spaceShip.offsetLeft -= movePixel}px`;
        }
    }
    if (keyPressed["ArrowDown"]) {
        if (ship.spaceShip.offsetTop < (window.innerHeight-ship.spaceShip.offsetHeight-30)) {
            ship.spaceShip.style.top = `${ship.spaceShip.offsetTop += movePixel}px`;
        }
    }
    if (keyPressed["ArrowUp"]) {
        if (ship.spaceShip.offsetTop > 10) {
            ship.spaceShip.style.top = `${ship.spaceShip.offsetTop -= movePixel}px`;
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
    totalSeconds++;
    document.getElementById("timeValue").innerText=`${min2}${min1}:${sec2}${sec1}`
};

let getHighScore = function(){
    /////////Calculating high score and making the divs///////
    let highScoreArr =[];


    if (playersArr[0].survivalTime!=null || playersArr[1].survivalTime!=null || playersArr[2].survivalTime!=null){
        let highestScoren=Math.max(...playersArr.map(f => f.highScore));
        let highestLivesn = Math.max(...playersArr.map(f => f.lives));
        let highestTimen = Math.max(...playersArr.map(f => f.survivalTime));

        let highestScorePlayer = playersArr.filter(obj => {
            return obj.highScore === highestScoren;
    })[0].src;
        let highestLivePlayer = playersArr.filter(obj => {
            return obj.lives === highestLivesn;
    })[0].src;
        let highestTimePlayer = playersArr.filter(obj => {
            return obj.survivalTime === highestTimen;
    })[0].src;

        document.getElementById("highestScore").innerHTML=`<h3 id = "highestScore" class="scoreValue" style="display: inline;float: left">
The highest Score is ${highestScoren} for <img class = "high"src=${highestScorePlayer} width="40px"></h3>`;

        document.getElementById("highestLive").innerHTML=`<h3 id = "highestScore" class="scoreValue" style="display: inline;float: left">
The highest Lives is ${highestLivesn} for <img class = "high"src=${highestLivePlayer} width="40px"></h3>`;

        document.getElementById("highestTime").innerHTML=`<h3 id = "highestScore" class="scoreValue" style="display: inline;float: left">
The highest Survival Time is ${highestTimen} for <img class = "high"src=${highestTimePlayer} width="40px"></h3>`;
    }
}


let gameOver = function(player) {
    clearInterval(rockInterval);
    clearInterval(controlInterval);
    clearInterval(liveInterval);
    clearInterval(fireInterval);
    clearInterval(timeInterval);
    //Checking high score
    if (currentScore>player.highScore){
        player.highScore = currentScore;
        console.log("new High Score")
    }
    if (highestCoin>player.lives){
        player.lives = highestCoin;
    }
    if (totalSeconds>player.survivalTime){
        player.survivalTime=totalSeconds;
    }
    gameOverDiv.style.display = "block";
    //local storage
    localStorage.setItem("playersData",JSON.stringify(playersArr));
    // adding the div and onclick function to play or main menu and summary
};
let playersLS = JSON.parse(localStorage.getItem('playersData'));

if (playersLS != null &&(playersLS[0].survivalTime!=null||playersLS[1].survivalTime!=null||playersLS[2].survivalTime!=null)){
    playersArr=playersLS;
}
playerOne = playersArr[0];
playerTwo=playersArr[1];
playerThree=playersArr[2];
function play(player)
{
    playMainMenu("stop");
    playGameSound("play");
    document.body.style.backgroundImage = "url('./img/giphy.gif')";
    finishSuperPowerFlag=true;
    container.style.display="block";
    document.getElementById("index").style.display="none";
    document.getElementsByClassName("gameOver")[0].style.display="none";
    // creating a space ship
    ship = new Ship(player.src); //playerSpaceshipSrc
    let fire = null;
    let rightFire=null;
    let leftFire = null;
    currentLevel = 1;
    currentScore = 0;
    currentCoin = 10;
    highestCoin = 0;
    sec1 = 0;
    sec2 = 0;
    min1 = 0;
    min2 = 0;
    totalSeconds = 0;
    lifeDiv.innerText=`Live : ${currentCoin}`;
    scoreDiv.innerText=`Score : ${currentScore}`;
    levelDiv.innerText=`Level : ${currentLevel} / 3`;
    document.getElementById("timeValue").innerText=`${min2}${min1}:${sec2}${sec1}`

    //end of for levels
    rockInterval = setInterval(() => {new Rock("./img/rock1.gif");}, rockTimeInterval);//here
    liveInterval = setInterval(() => {new Coin("./img/live.gif");}, 10000);
    fireInterval = setInterval(() => {
        if (keyPressed["ControlLeft"]) {
    fire = new FireBall('./img/fire.gif',"default");
    fireSound();
}
    if (superPower && keyPressed["ControlLeft"]){
        fire = new FireBall('./img/fire.gif',"default");
        rightFire = new FireBall('./img/fire.gif',"right")  ;
        leftFire = new FireBall('./img/fire.gif',"left")  ;
        fireSound();
        if(finishSuperPowerFlag) {
            finishSuperPowerFlag = true;
        }
    }
    if (superPower && finishSuperPowerFlag){ //to justify when the power interval end
        finishSuperPowerFlag=false;
        setTimeout(()=>{superPower=false;finishSuperPowerFlag=true;},5000);
    }
}, fireTimeInterval);
    controlInterval = setInterval(()=> {
        controlSpaceShip();
    if(currentCoin<=0){
        gameOver(currentPlayer);
    }
},50);
    timeInterval = setInterval(timer,1000);


}


///========================Main Menu=================================//
getHighScore();

let playNow = document.getElementById("playbtn");
 playNow.addEventListener("mouseover" , clickMenu);
let exitSound = document.getElementById("clos");
exitSound.addEventListener("mouseover" , clickMenu);

let fircharacter = document.getElementById("firchar");
let secondcharacter = document.getElementById("secchar");
let thirdcharacter = document.getElementById("thirchar");

fircharacter.addEventListener("mouseover" , clickMenu);
secondcharacter.addEventListener("mouseover" , clickMenu);
thirdcharacter.addEventListener("mouseover" , clickMenu);


function closeWin() {
    if(confirm("are you sure?")){
        close();
    }
}

let s1=document.getElementById("firchar");
let s2=document.getElementById("secchar");
let s3=document.getElementById("thirchar");
function select(ch)
{
    switch(ch)
    {
        case 1:
            s1.classList.add('selected');
            s2.classList.remove('selected');
            s3.classList.remove('selected');
            currentPlayer = playerOne;
            break;
        case 2:
            s1.classList.remove('selected');
            s2.classList.add('selected');
            s3.classList.remove('selected');
            currentPlayer = playerTwo;
            break;
        case 3:
            s1.classList.remove('selected');
            s2.classList.remove('selected');
            s3.classList.add('selected');
            currentPlayer = playerThree;
            break;
    }
}
let redir = document.getElementById("playbtn");

let redi = function()
{
    play(currentPlayer);
};
redir.addEventListener("click" , redi);

s1.addEventListener('click', ()=>{select(1)});
s2.addEventListener('click', ()=>{select(2)});
s3.addEventListener('click', ()=>{select(3)});


//get game over div
let gameOverBtn = document.getElementById("goHome");

let goHome = function(){
    container.removeChild(ship.spaceShip);
    document.getElementById("container").style.display="none";
    gameOverDiv.style.display = "none";
    document.getElementById("index").style.display="block";
    getHighScore();
    playGameSound("stop");
    playMainMenu("play");

};


gameOverBtn.addEventListener("click",goHome);


//get  playAgain
let playAgainBtn = document.getElementById("playagain");

playAgainBtn.addEventListener("click",()=>{
    container.removeChild(ship.spaceShip);
    play(currentPlayer);
});
