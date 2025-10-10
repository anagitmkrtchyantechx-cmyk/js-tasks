const jokeBtn = document.getElementById("get-joke");
const jokeDiv = document.getElementById("joke");

jokeBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    jokeDiv.textContent = data.joke;
  } catch (err) {
    jokeDiv.textContent = "Failed to fetch joke.";
  }
});
