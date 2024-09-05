const playButton = document.querySelector(".play");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".lap-clear-button");
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec"); 
const laps = document.querySelector(".laps");

let isPlay = false;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;

let minInterval, secInterval, centiInterval;

const startStopwatch = () => {
    minInterval = setInterval(() => {
        minute.textContent = `${String(++minCounter).padStart(2, '0')} :`;
    }, 60000);

    secInterval = setInterval(() => {
        secCounter = (secCounter + 1) % 60;
        second.textContent = `${String(secCounter).padStart(2, '0')} :`;
    }, 1000);

    centiInterval = setInterval(() => {
        centiCounter = (centiCounter + 1) % 100;
        centiSecond.textContent = String(centiCounter).padStart(2, '0');
    }, 10);
};

const stopStopwatch = () => {
    clearInterval(minInterval);
    clearInterval(secInterval);
    clearInterval(centiInterval);
};

const toggleStopwatch = () => {
    if (isPlay) {
        stopStopwatch();
        playButton.textContent = 'Play';
    } else {
        startStopwatch();
        playButton.textContent = 'Pause';
    }
    isPlay = !isPlay;
    toggleButtons();
};

const resetStopwatch = () => {
    stopStopwatch();
    isPlay = false;
    minCounter = secCounter = centiCounter = lapItem = 0;
    minute.textContent = "00 :";
    second.textContent = "00 :";
    centiSecond.textContent = "00";
    playButton.textContent = 'Play';
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    laps.innerHTML = '';  // Clear laps
    clearButton.classList.add("hidden");
};

const recordLap = () => {
    const li = document.createElement("li");
    li.className = "lap-item";
    li.innerHTML = `<span>#${++lapItem}</span><span>${minute.textContent}${second.textContent}${centiSecond.textContent}</span>`;
    laps.appendChild(li);
    clearButton.classList.remove("hidden");
};

const clearLaps = () => {
    laps.innerHTML = '';
    clearButton.classList.add("hidden");
};

const toggleButtons = () => {
    if (isPlay) {
        lapButton.classList.remove("hidden");
        resetButton.classList.remove("hidden");
    } else {
        lapButton.classList.add("hidden");
    }
};

playButton.addEventListener("click", toggleStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
clearButton.addEventListener("click", clearLaps);