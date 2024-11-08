import { backend } from "declarations/backend";

const quoteText = document.getElementById("quoteText");
const startTimerBtn = document.getElementById("startTimer");
const stopTimerBtn = document.getElementById("stopTimer");
const newQuoteBtn = document.getElementById("newQuote");
const intervalInput = document.getElementById("intervalInput");
const loading = document.getElementById("loading");

let isTimerRunning = false;

async function updateQuote() {
    loading.classList.remove("d-none");
    try {
        const [quote, color] = await backend.getNewQuote();
        quoteText.style.opacity = 0;
        setTimeout(() => {
            quoteText.textContent = quote;
            quoteText.style.color = color;
            quoteText.style.opacity = 1;
        }, 500);
    } catch (error) {
        console.error("Error fetching quote:", error);
    } finally {
        loading.classList.add("d-none");
    }
}

async function startTimer() {
    const interval = parseInt(intervalInput.value);
    if (interval < 1 || interval > 60) {
        alert("Please enter an interval between 1 and 60 seconds");
        return;
    }

    loading.classList.remove("d-none");
    try {
        await backend.startTimer(interval);
        isTimerRunning = true;
        startTimerBtn.disabled = true;
        stopTimerBtn.disabled = false;
        intervalInput.disabled = true;
        await updateQuote();
    } catch (error) {
        console.error("Error starting timer:", error);
    } finally {
        loading.classList.add("d-none");
    }
}

async function stopTimer() {
    loading.classList.remove("d-none");
    try {
        await backend.stopTimer();
        isTimerRunning = false;
        startTimerBtn.disabled = false;
        stopTimerBtn.disabled = true;
        intervalInput.disabled = false;
    } catch (error) {
        console.error("Error stopping timer:", error);
    } finally {
        loading.classList.add("d-none");
    }
}

async function checkTimerStatus() {
    try {
        isTimerRunning = await backend.isTimerRunning();
        startTimerBtn.disabled = isTimerRunning;
        stopTimerBtn.disabled = !isTimerRunning;
        intervalInput.disabled = isTimerRunning;
    } catch (error) {
        console.error("Error checking timer status:", error);
    }
}

startTimerBtn.addEventListener("click", startTimer);
stopTimerBtn.addEventListener("click", stopTimer);
newQuoteBtn.addEventListener("click", updateQuote);

// Initial status check
checkTimerStatus();
