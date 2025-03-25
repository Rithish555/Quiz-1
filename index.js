/*------------------------------------------------------Globals Start----------------------------------------------------------------*/

const countdown = document.getElementById("countdown");
const header = document.getElementById("header");
const timer = document.getElementById("time2");
const buttonbottom = document.getElementById("buttonsbottoms");
const nameinput = document.getElementById("namess");
const headingname = document.getElementById("headingname");
const crctans = ["opts2","opts1","opts3","opts1","opts1","opts0","opts1","opts0","opts1","opts1"];
const playernames = JSON.parse(sessionStorage.getItem("name"));
headingname.textContent=`Hi ${playernames}`;
let count=4;
let countq=0;
let score=0;
let counttime=120;
const anss=[];
let newdiv;
newdiv = document.createElement("p");
newdiv.className = "quest";
newdiv.style.color="brown";
newdiv.style.fontSize="xx-large";
newdiv.style.fontWeight="900";
newdiv.style.textAlign="center";
newdiv.style.marginTop="100px";
document.body.insertBefore(newdiv,buttonbottom);

/*------------------------------------------------------Globals End----------------------------------------------------------------*/



/*-----------------------------------------------------Functions Start---------------------------------------------------------------*/

function validatename(event){
    const nameelem=nameinput.value?nameinput.value.trim():"";
    if (nameelem===""){
        event.preventDefault();
        alert("Enter your name before proceeding!");
    }
}

function countdowns(){
    headingname.remove();
    header.textContent="The Quiz Starts In";
    const headds=document.getElementById("heading1id");
    const butts=document.getElementById("yess");
    countdown.innerHTML="5";
    headds.remove();
    butts.remove();
    const interval = setInterval(()=>{
        countdown.innerHTML=`${count}`;
        count--;
        if(count<0){
            clearInterval(interval);
        }
    },1000);
    setTimeout(()=>{
        starttimer();
    },4000);
    setTimeout(()=>{
        header.textContent= "Questions:";
        countdown.remove();
        questions();
    },5000);
}

function prev(){
    saveans();
    countq--;
    ansdiv.remove();
    questions();
}

function next(){
    saveans();
    countq++;
    ansdiv.remove();
    questions();
}

function questions(){
    if(countq<0){
        countq=9;
    }
    if(countq>9){
        countq=0;
    }
    
    const quest = ["1)What is the capital of France?","2)How many planets are there in our solar system?","3)Which is the largest ocean on Earth?","4)What is the smallest country in the world by land area?","5)Who was the first person to travel into space?","6)What is the national currency of Japan?","7)Which planet in our solar system has the most moons?","8)What is the heaviest naturally occurring element?","9)Which country is known as the 'Land of the Rising Sun'?","10)In which year did the Titanic sink?"];
    const ans = [["A) Rome","B) Madrid","C) Paris","D) Berlin"],["A) 7","B) 8","C) 9","D) 10"],["A) Atlantic Ocean","B) Indian Ocean","C) Arctic Ocean","D) Pacific Ocean"],["A) Monaco","B) Vatican City","C) San Marino","D) Liechtenstein"],["A) Neil Armstrong","B) Yuri Gagarin","C) Buzz Aldrin","D) Alan Shepard"],["A) Yen","B) Won","C) Yuan","D) Peso"],["A) Jupiter","B) Saturn","C) Uranus","D) Neptune"],["A) Uranium","B) Osmium","C) Lead","D) Gold"],["A) China","B) Japan","C) South Korea","D) Thailand"],["A) 1910","B) 1912","C) 1914","D) 1920"]];
    newdiv.textContent=quest[countq];
    ansdiv = document.createElement("div");
    ansdiv.style.marginTop="70px";
    ansdiv.className="ansdiv";
    ans[countq].forEach((element,index)=>{
        const isChecked = (anss[countq] === `opts${index}` ? "checked": "");
        const radbutt = `<input class="butts" type="radio" name="opts" id="opts${index}" value="opt${index}" ${isChecked}>
                         <label for="opts${index}" class="labelbutts">${element}</label>`
        ansdiv.innerHTML += radbutt;
    });
    document.body.insertBefore(ansdiv,buttonbottom);
}

function saveans(){
    const selectedOption = document.querySelector('input[name="opts"]:checked');
    if (selectedOption) {
        anss[countq] = selectedOption.id;
    }
}

function starttimer(){
    const inter = setInterval(()=>{
        timer.innerHTML=`${counttime}`;
        counttime--;
        if(counttime<0){
            clearInterval(inter);
            submit();
        }
    },1000);
}

function submit(){
    saveans();
    buttonbottom.remove();
    newdiv.remove();
    timer.remove();
    ansdiv.remove();
    for(let j=0;j<10;j++){
        if(anss[j]==crctans[j]){
            score+=1;
        }
    }
    if(score>7){
        header.textContent= `Congratulations ${playernames}`;
    }
    else if(score>5 && score<=7){
        header.textContent= `${playernames} your performance is Good`;
    }
    else if(score>2 && score<=5){
        header.textContent= `Try hard ${playernames}`;
    }
    else if(score<2){
        header.textContent= `${playernames} your performance is Poor`;
    }
    const scoresmsg = document.createElement("p");
    scoresmsg.style.color="rgb(150, 26, 184)";
    scoresmsg.style.fontSize="40px";
    scoresmsg.style.textAlign="center";
    scoresmsg.style.fontWeight="900";
    scoresmsg.style.marginTop="40px";
    document.body.append(scoresmsg);
    scoresmsg.textContent = "You Got:";
    const scores = document.createElement("p");
    scores.style.color="rgb(150, 26, 184)";
    scores.style.fontSize="40px";
    scores.style.textAlign="center";
    scores.style.fontWeight="900";
    scores.style.marginTop="40px";
    document.body.append(scores);
    scores.textContent = `${score}/10`;
    scores.textContent = `${score}/10`;
}

function storage(){
    namearr=[nameinput.value];
    sessionStorage.setItem("name",JSON.stringify(namearr));
    const playername = JSON.parse(sessionStorage.getItem("name"));
}


/*------------------------------------------------------Functions End----------------------------------------------------------------*/



