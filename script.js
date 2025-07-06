var timeout

const scroll = new LocomotiveScroll({
    // el element ka scroll lagena onthe first element of the html joh hai apna main class
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnim(){
    let t1=gsap.timeline();

    t1.from("nav",{
        y:'-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut

    })
    t1.to(".boundingelem",{
        y:'0',
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut, 
        stagger:.2
    })

    t1.from(".herofooter",{
        y:'-10',
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut
    
    })
}
function updateClock() {
    const now = new Date();

    // Convert to IST
    const istOffset = 5.5 * 60; // IST is UTC+5:30
    const localOffset = now.getTimezoneOffset();
    const istTime = new Date(now.getTime() + (istOffset + localOffset) * 60000);

    let hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm} IST`;

    document.getElementById('clock').textContent = formattedTime;
  }

  setInterval(updateClock, 1000); // Update every second
  updateClock(); // Run once on load
  
// jab mouse move ho toh hum skew kar paye,aur max and min skew define kar paaye ,jab mouse move ho toh skew ki value badhe,and jab mouse stable hojaye toh sjew hata lo
function circleskewkaro(){
    // define karlo default skew valuee
    let xscale=1;
    let yscale=1;

    // previous value ke liye 
    let xprev=0
    let yprev=0
    window.addEventListener("mousemove",function(details){
        // var timeout use kiya
        clearTimeout(timeout)

        xprev=details.clientX;
        yprev=details.clientY;
        
       xscale= gsap.utils.clamp(0.8,1.2,details.clientX - xprev)
       yscale=  gsap.utils.clamp(0.8,1.2,details.clientY - yprev)

       circleMouseFollower(xscale,yscale)

       timeout= setTimeout(() => {
              document.querySelector("#minicircle").style.transform =`translate(${details.clientX}px,${details.clientY}px) scale(1,1)`
       },100);
    })
}

function circleMouseFollower(xscale,yscale){
        window.addEventListener("mousemove",function(details){
            document.querySelector("#minicircle").style.transform =`translate(${details.clientX}px,${details.clientY}px) scale(${xscale},${yscale})`
        })
}

circleMouseFollower()
firstPageAnim()
circleskewkaro()

// teeno elem ko select karo and phir uspe mouse move lagao,jab mouse move ho toh pata karo ki mouse kaha pe hai jiska matlab mouse ki x and y position pata karo ,ab x and y ki jagah img ko show karo and img move karao,move karte waqt rotare bhi karo,jaise jaise move ho waise waise vrotation bhi tej ho

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0
    var diffrot=0

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:0.8
            })
    })
    elem.addEventListener("mousemove",function(dets){
        // boundingclient is used for getting the client values of a particulr div
        var diff = dets.clientY - elem.getBoundingClientRect().top
        diffrot= dets.clientX -rotate
        rotate=dets.clientX

       
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        })
    })
})