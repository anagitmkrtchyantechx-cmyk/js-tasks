const countdownBtn = document.getElementById("start-countdown");
const countdownDiv = document.getElementById("countdown");

countdownBtn.addEventListener("click", () => {
  let count = 5;
  countdownDiv.textContent = count;

  function tick() {
    if (count > 0) {
      count--;
      countdownDiv.textContent = count;
      setTimeout(tick, 1000);
    } else {
      countdownDiv.textContent = "Go!";
    }
  }
  setTimeout(tick, 1000);
});
