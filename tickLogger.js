const startTick = document.getElementById("start-ticking");
const stopTick = document.getElementById("stop-ticking");
const tickLog = document.getElementById("tick-log");
let tickInterval;

startTick.addEventListener("click", () => {
  tickLog.textContent = "";
  tickInterval = setInterval(() => {
    tickLog.textContent += "Tick ";
  }, 1000);
});

stopTick.addEventListener("click", () => {
  clearInterval(tickInterval);
});
