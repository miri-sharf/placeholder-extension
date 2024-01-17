// content.js

// Set to store processed inputs to avoid duplication.
const processedInputs = new Set();

// Function to create the button and append it inside the input.
function createButtonAndAppend(input, label) {
  if (processedInputs.has(input)) {
    return;
  }
  processedInputs.add(input);
  console.log("Label text", label && label.innerText);
  console.log("Input placeholder", input.placeholder);
  if (
    label &&
    label.innerText
      .toLowerCase()
      .includes(input.placeholder.toLowerCase().trim())
  ) {
    const button = createButton();
    setupButtonClickListener(button, input);
    appendButtonToInput(input, button);
    input.parentNode.insertBefore(button, input.nextSibling);

    console.log("Button added!!!!");
  }
}

// Function to create a button element.
function createButton() {
  const button = document.createElement("button");
  button.style.border = "1px solid black";
  button.style.cursor = "pointer";
  button.style.backgroundColor = "#00cc99";
  button.style.borderRadius = "2px";
  button.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="25px" height="25px" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">

 <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
 fill="#FFFFFF" stroke="none">
 <path d="M1343 4390 c-120 -73 -77 -248 64 -264 163 -20 236 -51 317 -136 61
 -64 90 -115 111 -197 23 -86 23 -2380 0 -2466 -21 -81 -50 -132 -107 -194 -82
 -86 -166 -123 -311 -138 -45 -5 -66 -13 -92 -36 -79 -70 -66 -187 25 -234 41
 -21 152 -19 244 5 117 30 225 91 320 180 l81 78 81 -77 c95 -90 203 -151 320
 -181 92 -24 203 -26 244 -5 91 47 104 164 25 234 -26 23 -47 31 -92 36 -138
 15 -209 44 -292 121 -31 29 -69 74 -84 101 -59 110 -57 59 -57 1343 0 1284 -2
 1233 57 1343 15 27 53 72 84 101 84 78 147 103 302 122 114 13 174 142 106
 228 -33 41 -71 56 -147 56 -160 0 -332 -74 -466 -200 l-81 -78 -81 77 c-134
 127 -306 201 -468 201 -53 0 -79 -5 -103 -20z"/>
 <path d="M1210 3561 c-194 -27 -359 -148 -445 -326 -56 -117 -57 -130 -53
 -705 3 -515 3 -526 25 -584 69 -182 210 -315 393 -371 32 -10 106 -19 180 -22
 117 -4 128 -3 169 19 103 54 108 188 9 248 -27 16 -51 20 -128 20 -53 0 -119
 6 -147 13 -77 20 -146 76 -182 149 l-31 61 0 496 0 496 24 51 c29 62 82 115
 144 144 37 18 73 24 179 29 122 6 134 9 159 31 77 73 69 184 -17 235 -37 22
 -178 30 -279 16z"/>
 <path d="M2526 3560 c-115 -36 -138 -192 -39 -257 25 -17 80 -18 723 -23 l695
 -5 47 -23 c63 -32 116 -85 144 -146 l24 -51 0 -497 0 -496 -33 -63 c-38 -75
 -110 -132 -188 -148 -33 -7 -281 -11 -712 -11 -639 0 -663 -1 -694 -20 -46
 -28 -66 -64 -67 -120 -1 -53 18 -87 68 -124 27 -21 36 -21 729 -21 653 0 706
 1 762 18 188 58 329 190 398 373 22 58 22 69 25 579 3 571 2 596 -53 710 -73
 150 -195 255 -365 311 -51 17 -108 18 -745 21 -386 1 -703 -2 -719 -7z"/>
 </g>
 </svg>
 `;
  return button;
}

// Function to set up click event listener for the button.
function setupButtonClickListener(button, input) {
  button.addEventListener("click", function () {
    if (input.value === input.placeholder) {
      input.value = "";
    } else {
      input.value = input.placeholder;
    }

    const changeEvent = new Event("change", { bubbles: true });
    input.dispatchEvent(changeEvent);

    const form = input.closest("form");
    if (form) {
      form.submit();
    }
  });
}

// Function to append the button inside the input.
function appendButtonToInput(input, button) {
  button.style.position = "absolute";
  button.style.right = "0";
  button.style.top = "0";
  button.style.height = "100%";

  input.style.position = "relative";
  input.appendChild(button);
}

// Function to find the label associated with the input.
function findLabelAboveInput(input) {
  const inputId = input.id;
  if (inputId) {
    const label = document.querySelector(`label[for="${inputId}"]`);
    if (label) {
      return label;
    }
  }

  const inputPlaceholder = input.placeholder.toLowerCase().trim();
  let currentElement = input.parentElement;

  while (currentElement) {
    const elementText = currentElement.innerText.toLowerCase().trim();
    if (elementText.includes(inputPlaceholder)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
}

// Function to search for inputs with the specified placeholder condition and add buttons.
function searchAndAddButtons() {
  const inputsWithPlaceholder = document.querySelectorAll("input[placeholder]");
  inputsWithPlaceholder.forEach(function (input) {
    const label = findLabelAboveInput(input);
    createButtonAndAppend(input, label);
  });
}

// Function to handle mutations and trigger button addition.
function handleMutations(mutations) {
  searchAndAddButtons();
}

// Create a MutationObserver to observe changes to the DOM.
const observer = new MutationObserver(handleMutations);

// Initial search and button addition.
searchAndAddButtons();

// Observe changes to the DOM and handle mutations.
observer.observe(document.body, { childList: true, subtree: true });

// Note: Avoid using a periodic search interval if possible, as MutationObserver should handle dynamic changes.
// If you still want to use a periodic interval, consider adjusting the interval duration based on your needs.
// setInterval(searchAndAddButtons, 5000);
