const notes = document.getElementById("notes-area");
const notesTitle = document.getElementById("notes-title")
const pageTitle = document.getElementById("title")
const headerText = document.querySelector("#header h1")
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");
const downloadButton = document.getElementById("download-notes")

// Deletes all of the text/notes
clearButton.onclick = function() {
  notes.value = "";
  notesTitle.value = "";
}

// Adds the notes title to the header
// notesTitle.addEventListener("change", headerTitleChange)

// Puts the title of the notes on the header and title of the page
function headerTitleChange() {
  headerText.innerHTML = "E-Notes - " + notesTitle.value;
  pageTitle.innerHTML = "E-NOTES - " + notesTitle.value.toUpperCase();
  if (notesTitle.value == "") {
    headerText.innerHTML = "E-Notes";
    pageTitle.innerHTML = "E-NOTES";
  }
}

// Saves the notes when you click save button
saveButton.onclick = function() {
  headerTitleChange()
  localStorage.setItem("dataNotes", notes.value);
  localStorage.setItem("dataTitle", notesTitle.value);
  let savedNotes = localStorage.getItem("dataNotes");
  let savedTitle = localStorage.getItem("dataTitle");
  if (notes.value == savedNotes) {
    if (notesTitle.value == savedTitle) {
      alert("Successfully saved " + savedTitle);
    } else {
      alert("An error occured while saving notes & title");
    }
  }
}

// Loads your notes and title that you have previously worked on if you saved them
function load() {
  let savedNotes = localStorage.getItem("dataNotes");
  let savedTitle = localStorage.getItem("dataTitle");
  if (savedNotes) {
    notes.value = savedNotes;
  }
  if (savedTitle) {
    notesTitle.value = savedTitle;
    headerTitleChange()
  }
}

load()

downloadButton.onclick = download

function download() {
  if (notes.value & notesTitle.value != "") {
    let filename = "e-notes-" + notesTitle.value;
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(notes.value));
    element.setAttribute("download", filename);

    element.style.display = "none";

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  } else {
    alert("You cannot download nothing(make sure you have a title and some notes :P)");
  }
}
