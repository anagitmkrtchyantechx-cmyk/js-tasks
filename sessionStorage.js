const noteArea = document.getElementById("note");
const saveNoteBtn = document.getElementById("save-note");

saveNoteBtn.addEventListener("click", () => {
  sessionStorage.setItem("note", noteArea.value);
});

window.addEventListener("load", () => {
  const savedNote = sessionStorage.getItem("note");
  if (savedNote) noteArea.value = savedNote;
});
