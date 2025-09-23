import { count, increment, reset } from './counter.js';

const countElement = document.getElementById('countId');
const incrementElement = document.getElementById('incrementId');
const resetElement = document.getElementById('resetId');
const formElement = document.getElementById('formId');
const inputElement = document.getElementById('nameInputId');
const messageElement = document.getElementById('messageId');

let currentCount = count;
countElement.textContent = count;

incrementElement.addEventListener('click', () => {
  currentCount = increment();
  countElement.textContent = currentCount; 
});

resetElement.addEventListener('click', () => {
  currentCount = reset();
  countElement.textContent = currentCount; 
});


formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    const value = inputElement.value.trim();

    if (value.length < 3) {
      throw new Error("Input must be at least 3 characters.");
    }

    messageElement.textContent = `Welcome, ${value}!`;
    inputElement.value = "";

  } catch (error) {
    messageElement.textContent = `Error: ${error.message}`;
    console.error(error);
  }
});

