let timerHour = 0;
let timerMinute = 0;
let timerSecond = 0;

let timer = 0;
let timeInterval;

const timerDisplay = document.querySelector(".timer");
const popup = document.getElementById("timePopup");

const inputHour = document.getElementById("inputHour");
const inputMinute = document.getElementById("inputMinute");
const inputSecond = document.getElementById("inputSecond");

const setTime = document.getElementById("setTime");
const cancel = document.getElementById("cancel");

let totalTime = 0;
let currentTime = 0;
let percent = 0;

const alarmSound = new Audio("sounds/alarm.mp3");

const addTrailingZero = (num)=> {
    return num < 10 ? "0" + num : num;
};

timerDisplay.addEventListener("click", () => {
    $('#timePopup').show();
});

setTime.addEventListener("click", () => {
    timerHour = parseInt(inputHour.value) || 0;
    timerMinute = parseInt(inputMinute.value) || 0;
    timerSecond = parseInt(inputSecond.value) || 0;

    $('#timer_hour').html(addTrailingZero(timerHour));
    $('#timer_minute').html(addTrailingZero(timerMinute));
    $('#timer_second').html(addTrailingZero(timerSecond));

    $('#timePopup').hide();
});

cancel.addEventListener("click", () => {
    $('#timePopup').hide();
});

const Timer = () => {
    timerSecond--;
    if(timerSecond == -1) {
        timerMinute--;
        timerSecond = 59;
    }
    if(timerMinute == -1) {
        timerHour--;
        timerMinute = 59;
    }

    $('#timer_hour').html(addTrailingZero(timerHour));
    $('#timer_minute').html(addTrailingZero(timerMinute));
    $('#timer_second').html(addTrailingZero(timerSecond));

    currentTime = timerHour*3600 + timerMinute*60 + timerSecond;
    percent = (currentTime/totalTime) * 100;
    $('.bar-fill').css('width', percent + '%');

    TimeUp();
};

const TimeUp = () => {
    if (
        (timerHour == 0) &&
        (timerMinute == 0) && 
        (timerSecond == 0)
    ) {
        $('#timer_hour').html(addTrailingZero(timerHour));
        $('#timer_minute').html(addTrailingZero(timerMinute));
        $('#timer_second').html(addTrailingZero(timerSecond));

        ResetTimer();
        alarmSound.play();
    }
};

const ResetTimer = () => {
    StopTimer();

    timerHour = 0;
    timerMinute = 0;
    timerSecond = 0;

    timer = 0;

    $('#timer_hour').html(addTrailingZero(timerHour));
    $('#timer_minute').html(addTrailingZero(timerMinute));
    $('#timer_second').html(addTrailingZero(timerSecond));

    $('#barFill').css('width', '100%');
};

const StartTimer = () => {
    totalTime = timerHour*3600 + timerMinute*60 + timerSecond;

    if(!(timerHour == 0 && timerMinute == 0 && timerSecond == 0)) {
        timeInterval = setInterval(Timer, 1000);

        $('.start-button').hide();
        $('.stop-button').show();
    }
};

const StopTimer = () => {
    clearInterval(timeInterval);

    $('.start-button').show();
    $('.stop-button').hide();
};

$('.start-button').click(function (){
    StartTimer();
});

$('.reset-button').click(function (){
    ResetTimer();

    alarmSound.pause();
    alarmSound.currentTime = 0;
});

$('.stop-button').click(function (){
    StopTimer();
});