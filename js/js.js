let playaudio = function()
{
    let audio = document.getElementById("playsound");
    audio.play();
}

let bb = document.getElementById("playbtn");

bb.addEventListener("mouseover" , playaudio);

let lowsounds = document.getElementById("lowsound");
lowsounds.volume = .1;

let divaudio = function()
{
    let divadui = document.getElementById("plyspell");
    divadui.play();
}

let fircharacter = document.getElementById("firchar");
let secondcharacter = document.getElementById("secchar");
let thirdcharacter = document.getElementById("thirchar");

fircharacter.addEventListener("mouseover" , divaudio);
secondcharacter.addEventListener("mouseover" , divaudio);
thirdcharacter.addEventListener("mouseover" , divaudio);


function closeWin() {
    if(confirm("are you sure?")){
        close();
    }
  }


  let redir = document.getElementById("playbtn");
  let ship_num = 1;
  let redi = function()
  {
    window.location.href= 'game.html?data='+ship_num;

  }


redir.addEventListener("click" , redi)
let s1=document.getElementById("firchar");
let s2=document.getElementById("secchar");
let s3=document.getElementById("thirchar");
function select(ch)
{
    ship_num = ch;
    switch(ch)
    {
        case 1:
        s1.classList.add('selected');
        s2.classList.remove('selected');
        s3.classList.remove('selected');
        break;
        case 2:
        s1.classList.remove('selected');
        s2.classList.add('selected');
        s3.classList.remove('selected');
        break;
        case 3:
        s1.classList.remove('selected');
        s2.classList.remove('selected');
        s3.classList.add('selected');
        break;
    }    
}
s1.addEventListener('click', ()=>{select(1)});
s2.addEventListener('click', ()=>{select(2)});
s3.addEventListener('click', ()=>{select(3)});



/*  new   */ 














