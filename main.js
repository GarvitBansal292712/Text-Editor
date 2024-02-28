const textarea = document.getElementById("textarea");
const panel = document.getElementById("tools")
const modal = document.getElementById("dkmodal")
// Array of common font families
const fontFamilies = [
  "Arial",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Lucida Console",
  "Impact",
  "Comic Sans MS",
  "Arial Black",
  "Garamond",
  "Palatino Linotype",
  "Book Antiqua",
  "Lucida Sans Unicode",
  "Geneva",
  "MS Sans Serif",
  "MS Serif",
  "Lucida Grande",
];

// Function to generate options for font selector
function generateFontOptions() {
  var fontSelector = document.getElementById("fontSelector");

  // Loop through fontFamilies array and create an option for each font
  fontFamilies.forEach(function (fontFamily) {
    var option = document.createElement("option");
    option.text = fontFamily;
    option.value = fontFamily;
    fontSelector.appendChild(option);
  });
}

// Call the function to generate font options when the page loads
window.onload = function () {
  generateFontOptions();
};

// Function to apply selected font family to textarea
function selectfonts() {
  var fontSelector = document.getElementById("fontSelector");
  var selectedFont = fontSelector.options[fontSelector.selectedIndex].value;
  var textarea = document.getElementById("textarea");
  textarea.style.fontFamily = selectedFont;
}

///Font Size Input

function fontsize(e) {
  let value = e.value;
  textarea.style.fontSize = value + "px";
}

///Bold Style Button

function bold(e) {
  if (textarea.style.fontWeight == "bold") {
    textarea.style.fontWeight = "normal";
    e.classList.remove("active");
  } else {
    textarea.style.fontWeight = "bold";
    e.classList.add("active");
  }
}

///Underline Text Decoration Button

function underline(e) {
  if (textarea.style.textDecoration == "none") {
    textarea.style.textDecoration = "underline";
    e.classList.add("active");
} else {
    textarea.style.textDecoration = "none";
    e.classList.remove("active");
  }
}

///Italic Font Style Button

function italic(e) {
  if (textarea.style.fontStyle == "italic") {
    textarea.style.fontStyle = "normal";
    e.classList.remove("active");
  } else {
    textarea.style.fontStyle = "italic";
    e.classList.add("active");
  }
}

///Case Toogle Button

function casetoggle(e) {
    let caseswitch = document.getElementById("caseswitch");
    
    if (textarea.style.textTransform === "lowercase") {
        textarea.style.textTransform = "uppercase";
        caseswitch.innerHTML = "A"

        e.classList.add("active");
    } else {
        textarea.style.textTransform = "lowercase";
        e.classList.remove("active"); // Remove the "active" class when switching to lowercase
        caseswitch.innerHTML = "aA"

    }
}


///Right Align Button

function rightalign(e) {
  if (
    textarea.style.textAlign == "left" ||
    textarea.style.textAlign == "center"
  ) {
    textarea.style.textAlign = "right";
    e.classList.add("active");
  } else {
    textarea.style.textAlign = "left";
    e.classList.remove("active");
  }
}

///Left Align Button

function leftalign(e) {
  if (
    textarea.style.textAlign == "right" ||
    textarea.style.textAlign == "center"
  ) {
    textarea.style.textAlign = "left";
    e.classList.add("active");
  } else {
    e.classList.remove("active");
  }
}
///Center Align Button

function centeralign(e) {
  if (
    textarea.style.textAlign == "left" ||
    textarea.style.textAlign == "right"
  ) {
    textarea.style.textAlign = "center";
    e.classList.add("active");
  } else {
    textarea.style.textAlign = "left";
    e.classList.remove("active");
  }
}

///Remove Text Button

function remove(e) {
  textarea.style.fontWeight = "normal";
  textarea.style.textDecoration = "normal";
  textarea.style.fontStyle = "normal";
  textarea.style.textAlign = "left";
  textarea.style.textTransform = "capitalize";
  textarea.value = "";
  e.classList.remove("active");
}

function copy() {
  var copyText = document.getElementById("textarea");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
}

function color(e) {
  let value = e.value;
  textarea.style.color = value;
}

let currentMode = "sun"; // Initial mode is light mode

function modes() {
  let toggle = document.getElementById("colormode");

  if (currentMode === "sun") {
    // Toggle to dark mode
    toggle.innerHTML = '<i class="fa-solid fa-moon moonlight"></i>';
    document.body.classList.add("dark-mode");
    textarea.classList.add("darkmd");
    panel.classList.add("darkpanel");
    modal.classList.add("darkmodal");
    currentMode = "moon";
  } else {
    // Toggle to light mode
    toggle.innerHTML = '<i class="fa-solid fa-sun rotate"></i>';
    document.body.classList.remove("dark-mode");
    textarea.classList.remove("darkmd");
    panel.classList.remove("darkpanel");
    modal.classList.remove("darkmodal");
    currentMode = "sun";
  }
}



var undoStack = [];
var redoStack = [];

function saveState() {
    undoStack.push(textarea.value);
    redoStack = []; // Clear redo stack when a new action is performed
}

function undo() {
    if (undoStack.length > 0) {
        redoStack.push(textarea.value);
        textarea.value = undoStack.pop();
    }
}

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(textarea.value);
        textarea.value = redoStack.pop();
    }
}

// Example of saving state on input change (optional)
textarea.addEventListener('input', function() {
    saveState();
});