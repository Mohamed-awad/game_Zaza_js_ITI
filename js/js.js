// get container
let container = document.getElementById("container");

// get score div
let scoreDiv = document.getElementById("score");

// get life div
let lifeDiv = document.getElementById("live");

// get level div
let levelDiv = document.getElementById("level");

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
lifeDiv.innerHTML = `<h3>Life: ${currentCoin} </h3>`;
scoreDiv.innerHTML = `<h3>Score: ${currentScore} </h3>`;
levelDiv.innerHTML = `<h3>Level: ${currentLevel} </h3>`;

// ship 
let ship = null;

// start rock
let classImg = document.createElement("img");

let rocksArray = [];
const windowWidth = container.offsetWidth

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
    this.rock.style.position = "absolute";
    this.rock.style.top = "-100px";
    this.rock.style.left = `${this.fallingPosition}px`;
    this.rock.style.width="100px";
    this.rock.style.height="100px";
    this.rock.style.margin="15px";
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
        this.rock.offsetLeft >= ship.spaceShip.offsetLeft &&
        this.rock.offsetLeft <= ship.spaceShip.offsetLeft+ ship.spaceShip.offsetWidth &&
        this.rock.offsetTop >= ship.spaceShip.offsetTop &&
        this.rock.offsetTop <= ship.spaceShip.offsetTop+ ship.spaceShip.offsetHeight  
        ) 
      {
        // deleting rock
        clearInterval(this.interval);
        container.removeChild(this.rock);
        rocksArray.splice(0, 1);
        delete(this.rock);
        delete(this.interval);
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
    this.coin.style.position = "absolute";
    this.coin.style.top = "-100px"; 
    this.coin.style.left = `${this.fallingPosition}px`;
    this.coin.style.width="75px";
    this.coin.style.height="75px";
    this.coin.style.margin="20px";
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
        lifeDiv.innerHTML = `<h3>Life: ${currentCoin} </h3>`;
      }
    }
  }
};
// end coin

// start ship

class Ship
{
  constructor(src)
  {
    this.spaceShip = classImg.cloneNode(true);
    this.spaceShip.src = src;
    this.spaceShip.style.position = "absolute";
    this.spaceShip.style.width="125px";
    this.spaceShip.style.height="140px";
    this.spaceShip.style.top = `${window.innerHeight - 140}px`;
    this.spaceShip.style.left = `${(windowWidth - 125) / 2}px`;
    container.appendChild(this.spaceShip);
  }

  move(event)
  {
    if (event.code === "ArrowRight")
    {
      if(this.spaceShip.offsetLeft < windowWidth-this.spaceShip.offsetWidth-15)
      {
        this.spaceShip.style.left = `${this.spaceShip.offsetLeft + 20}px`;
      }
    }
    else if (event.code === "ArrowLeft")
    {
      if (this.spaceShip.offsetLeft > 20)
      {
        this.spaceShip.style.left = `${this.spaceShip.offsetLeft - 20}px`;
      }
    }
    else if (event.code === "ArrowDown")
    {
      if (this.spaceShip.offsetTop < window.innerHeight-140) {
        this.spaceShip.style.top = `${this.spaceShip.offsetTop + 20}px`;
      }
    }
    else if (event.code === "ArrowUp")
    {
      if (this.spaceShip.offsetTop > 10)
      {
        this.spaceShip.style.top = `${this.spaceShip.offsetTop - 20}px`;
      }
    }
    else if (event.code === "ControlLeft")
    {
      let fire = new FireBall('./img/fire.gif');
    }
    
  }
};

document.addEventListener("keydown", ()=>{ship.move(event)});

// end ship

// start fire ball

class FireBall {
  constructor(src) {
    this.fireBall = classImg.cloneNode(true);
    this.fireBall.src = src;
    this.fireBall.style.position = "absolute";
    this.fireBall.style.top = `${ship.spaceShip.offsetTop - 15}px`;
    this.fireBall.style.left = `${ship.spaceShip.offsetLeft +
                            (ship.spaceShip.offsetWidth - this.fireBall.width) / 2}px`;
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
          this.fireBall.offsetTop >= rocksArray[i].rock.offsetTop &&
          this.fireBall.offsetTop <= rocksArray[i].rock.offsetTop+ rocksArray[i].rock.offsetHeight  
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
          scoreDiv.innerHTML = `<h3>Score: ${currentScore} </h3>`;

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
          levelDiv.innerHTML = `<h3>Level: ${currentLevel} </h3>`;

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
            this.fireBall.offsetTop >= coinArray[i].coin.offsetTop &&
            this.fireBall.offsetTop <= coinArray[i].coin.offsetTop+ coinArray[i].coin.offsetHeight  
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
            lifeDiv.innerHTML = `<h3>Life: ${currentCoin} </h3>`;

            break;
          }
        }
      }
    }
  }
};

// end fire ball

function play()
{
  // creating a space ship
  ship = new Ship('./img/spaceShip.png');
  setInterval(() => {new Rock("./img/rock1.gif");}, 1000);
  setInterval(() => {new Coin("./img/live.gif");}, 10000);
}

play();

