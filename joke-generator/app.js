const API_URL = "https://v2.jokeapi.dev/joke/Any?safe-mode&type=single,twopart";
const jokeText = document.querySelector("#jokeText");
const jokeDelivery = document.querySelector("#jokeDelivery");
const jokeType = document.querySelector("#jokeType");
const newJokeButton = document.querySelector("#newJokeButton");
const copyButton = document.querySelector("#copyButton");
const errorMessage = document.querySelector("#errorMessage");
const status = document.querySelector("#status");
let currentJoke = "";

function setLoading(loading) {
  newJokeButton.disabled = loading;
  newJokeButton.innerHTML = loading ? "Finding a joke…" : 'Tell me a joke <span aria-hidden="true">→</span>';
  status.textContent = loading ? "Loading" : "";
}

function showJoke(joke) {
  const isTwoPart = joke.type === "twopart";
  currentJoke = isTwoPart ? `${joke.setup}\n\n${joke.delivery}` : joke.joke;
  jokeType.textContent = isTwoPart ? "Two-part joke" : "One-liner";
  jokeText.textContent = isTwoPart ? joke.setup : joke.joke;
  jokeDelivery.textContent = isTwoPart ? joke.delivery : "";
  copyButton.disabled = false;
  errorMessage.hidden = true;
}

async function fetchJoke() {
  setLoading(true);
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const joke = await response.json();
    if (joke.error) throw new Error(joke.message || "The API returned an error");
    showJoke(joke);
  } catch (error) {
    errorMessage.hidden = false;
    status.textContent = "Offline";
    copyButton.disabled = true;
  } finally {
    setLoading(false);
  }
}

async function copyJoke() {
  if (!currentJoke) return;
  try {
    await navigator.clipboard.writeText(currentJoke);
    status.textContent = "Copied!";
    window.setTimeout(() => { status.textContent = ""; }, 1600);
  } catch {
    status.textContent = "Copy unavailable";
  }
}

newJokeButton.addEventListener("click", fetchJoke);
copyButton.addEventListener("click", copyJoke);
