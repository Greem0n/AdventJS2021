//variables
var minutesInput,minutes, secondsInput, seconds, startButton, circle, timer, settings

//methods
window.addEventListener("load",()=>{
    circle = document.getElementsByClassName('ring')[0]
    startButton = document.getElementsByClassName('start')[0]
    settings = document.getElementsByClassName('settings')[0]
    minutesInput = document.getElementsByClassName('minutes')[0].firstElementChild
    secondsInput = document.getElementsByClassName('seconds')[0].firstElementChild
    startButton.addEventListener('click',startTimer)
    settings.addEventListener('click',enableSettings)
    minutesInput.addEventListener('change',changeValue)
    secondsInput.addEventListener('change',changeValue)
})

var startTimer=()=>{
    disableSettings()
    minutes = minutesInput.value
    seconds = secondsInput.value
    startButton.textContent = "PAUSE"
    startButton.removeEventListener('click',startTimer)
    startButton.addEventListener('click',pauseTimer)
    timer = setInterval(() => {
    if (seconds>0) {
        seconds = --seconds
        if (seconds<10) {
            seconds = `0${seconds}`
        }
    }else if(seconds ==0){
        seconds = 59
        minutes = --minutes
        if (minutes<10) {
            minutes = `0${minutes}`
        }
    }
    if (minutes==0&&seconds==0) {
        circle.classList.add('ending')
        endTimer()
    }
    minutesInput.value=`${minutes}`
    secondsInput.value = `${seconds}`
}, 1000);
}
var pauseTimer = ()=>{
    clearInterval(timer)
    startButton.textContent = "START"
    startButton.removeEventListener('click',pauseTimer)
    startButton.addEventListener('click',startTimer)
}

var enableSettings =()=>{
    pauseTimer()
    minutesInput.disabled = false
    secondsInput.disabled = false
    settings.removeEventListener('click',enableSettings)
    settings.addEventListener('click',disableSettings)
}

var disableSettings=()=>{
    minutesInput.disabled = true
    secondsInput.disabled = true
    settings.removeEventListener('click',disableSettings)
    settings.addEventListener('click',enableSettings)
}

var changeValue =(event)=>{
    let input = event.target
    let newValue = event.target.value
    input.value = newValue
}

var endTimer=()=>{
    pauseTimer()
    startButton.removeEventListener('click',pauseTimer)
}