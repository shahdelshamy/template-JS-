         //Appear The Settings
document.querySelector(".settings .setting-icon").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings").classList.toggle("opened");
}

          //Change Colors In Settings
let colorList = document.querySelectorAll(".color-list li");
if(localStorage.getItem("colors")){
    colorList.forEach(function(list){
        list.classList.remove("active");
        if(list.getAttribute("data-color") == localStorage.getItem("colors")){
            list.classList.add("active");
        }
    });
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("colors"));
}
colorList.forEach(function(li){
    li.onclick = function(e){
        document.documentElement.style.setProperty("--main-color",e.target.getAttribute("data-color"))
        localStorage.setItem("colors",e.target.getAttribute("data-color"));
        colorList.forEach(function(list){
            list.classList.remove("active");
        });
        e.target.classList.add("active");
    }
})

         //Change Background In Settings
let countInterval;
let randomBackground = document.querySelectorAll(".background button");
randomBackground.forEach(button => {

    button.onclick = function(e){
        randomBackground.forEach(button => {
            button.classList.remove("active");
        })
        e.target.classList.add("active");

        if(e.target.getAttribute("data-background") == "yes"){
            localStorage.setItem("randomBackground","yes");
            randemizeImage();
        }
        else if(e.target.getAttribute("data-background") == "no"){
            let image = document.querySelector(".landing-page").style.backgroundImage;
            localStorage.setItem("randomBackground","no");
            localStorage.setItem("image",image);
            clearInterval(countInterval);
        }
    }
    
});

let bullets = document.querySelectorAll(".bullets");
let bulletsSetting = document.querySelectorAll(".bulletsSettings button");

              //Check The Local Storage Of Bullets
if(localStorage.getItem("showBullets") === "yes"){
    bullets.forEach(ele =>{
        ele.style.display = "block";
    });
    bulletsSetting.forEach(ele =>{
        ele.classList.remove("active");
        if(ele.classList.contains(localStorage.getItem("showBullets"))){
            ele.classList.add("active");
        }
    })

}
else if(localStorage.getItem("showBullets") === "no"){
    bullets.forEach(ele =>{
        ele.style.display = "none";
    });
    bulletsSetting.forEach(ele =>{
        ele.classList.remove("active");
        if(ele.classList.contains(localStorage.getItem("showBullets"))){
            ele.classList.add("active");
        }
    })
}

               // Show The Bullets Or Not From Setting 
bulletsSetting.forEach(bullet =>{
    bullet.onclick = function(e){
        handleActive(e);
        if(e.target.getAttribute("data-show") === "yes"){
            bullets.forEach(ele =>{
                ele.style.display = "block";
            });
            localStorage.setItem("showBullets",e.target.getAttribute("data-show"));
        }
        else{
            bullets.forEach(ele =>{
                ele.style.display = "none";
            });  
            localStorage.setItem("showBullets",e.target.getAttribute("data-show")); 
        }
        
    }
    
});

               //Reset Button In Setting

let reset = document.querySelector(".reset");
reset.addEventListener("click",(e)=>{
    localStorage.clear();
    reset.classList.toggle("unable");
    window.location.reload();
})

               // localStorage.removeItem("randomBackground");
let landingPage = document.querySelector(".landing-page");
function randemizeImage(){
    let images = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
    countInterval = setInterval(function(){
    let randomNum = Math.floor(Math.random() * images.length);
    landingPage.style.backgroundImage = 'url("../imgs/'+images[randomNum]+'")';
    },1000);
};
            //Randemize The Image In Landing Page
randemizeImage();

console.log(localStorage.getItem("randomBackground"));
if(localStorage.getItem("randomBackground") !== null){
    randomBackground.forEach(function(button){
        button.classList.remove("active");
        if(button.getAttribute("data-background") == localStorage.getItem("randomBackground")){
            button.classList.add("active");
        }
    })
    if(localStorage.getItem("randomBackground") === "no"){
        landingPage.style.backgroundImage = localStorage.getItem("image");
        clearInterval(countInterval);
    }
}
             // Our Skills
let skills = document.querySelector(".skills-content");
window.onscroll = function(){

let skillsOffsetTop = skills.offsetTop;

let skillHeight = skills.offsetHeight;

let windowHeight = this.innerHeight;

let windowScrollUp = this.scrollY;

if(windowScrollUp > (skillsOffsetTop+skillHeight-windowHeight)){
    let spans = document.querySelectorAll(".skills-content .skill-process span");
spans.forEach(function(span){
    span.style.width = span.getAttribute("data-skill");
})
}
}

         //Gallery and popup
let images = document.querySelectorAll(".gallery-content img");

images.forEach(img=>{
    img.addEventListener("click",(e)=>{

        let overlay = document.createElement("div");

        overlay.className = "overlayMade" ;
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popupBox";

        if(img.alt !== null){

            let title = document.createElement("h3");
            title.className = "imageTitle";

            let titleText =document.createTextNode(img.alt);
            title.appendChild(titleText);
            popupBox.appendChild(title)
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src; 
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let close = document.createElement("span");
        close.className = "close";
        let closeText = document.createTextNode("X");
        close.appendChild(closeText);
        popupBox.appendChild(close);

        close.onclick = (event)=>{
            close.parentElement.remove();
            overlay.remove();
        }
    })
})




bullets.forEach(bullet =>{
bullet.addEventListener("click",(e)=>{
    document.querySelector(e.target.getAttribute("data-section")).scrollIntoView({
        behavior:'smooth'
    });
});
}

)

      // handling Active class
function handleActive(event){
    event.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active");
    });
    event.target.classList.add("active");
}



