// Tracks the current tab position
var currentTab = 0;
showTab(currentTab); // Display the first tab initially

// Displays the appropriate tab based on the current tab index
function showTab(n) {
  let tabs = document.getElementsByClassName("tab");

  // Hide all tabs initially
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
    
  }

  // Show all tabs in "Summary" view
  if (n >= tabs.length - 1) {
    document.getElementsByTagName("h1")[0].innerHTML = "Summary";

    // Show all tabs when displaying the summary
    for (let i = 0; i < tabs.length; i++) {
      applyTabStyles(tabs[i]);
      tabs[i].style.display = "block";
      const inputs = tabs[i].getElementsByTagName("input");
      const selects = tabs[i].getElementsByTagName("select");

      for (let input of inputs) {
        input.setAttribute("disabled", true);
      }

      for (let select of selects) {
        // applyTabStyles(select);
        select.style.display = "block";
        select.style.zIndex = "10";
        select.style.color = "white";
        select.setAttribute("disabled", true);
      }
    }

    // Change button text to "Submit" and handle form submission
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").onclick = function () {
      if (validateForm()) {
        saveDataToLocalStorage();
      } else {
        alert("Please fill all required fields before submission.");
      }
    };
  } else {
    // Display User Details for individual tabs
    document.getElementsByTagName("h1")[0].innerHTML = "User Details";
    tabs[n].style.display = "block";
    const inputs =  tabs[n].getElementsByTagName("input");
    const selects =  tabs[n].getElementsByTagName("select");
    for (let input of inputs) {
      input.removeAttribute("disabled");
    }

    for (let select of selects) {
      select.removeAttribute("disabled");
    }

    // Hide 'Previous' button on the first tab
    document.getElementById("prevBtn").style.display =
      n === 0 ? "none" : "inline";

    // Change 'Next' button behavior to move forward
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").onclick = function () {
      nextPrev(1);
    };
  }

  // Progress bar logic
  increaseProgress(n);
}

// Applies styles to tab sections
function applyTabStyles(tab) {
  Object.assign(tab.style, {
    display: "block",
    background: "transparent",
    zIndex: "10",
  });
}

// Handles tab navigation logic
function nextPrev(n) {
  let tabs = document.getElementsByClassName("tab");

  // Prevent moving to the next tab if the current tab fails validation
  if (n === 1 && !validateForm(currentTab)) {
    return false;
  }

  // Hide the current tab
  tabs[currentTab].style.display = "none";

  // Adjust the current tab index
  currentTab = currentTab + n;

  // Ensure currentTab stays within valid range
  if (currentTab >= tabs.length) {
    currentTab = tabs.length - 1;
  } else if (currentTab < 0) {
    currentTab = 0;
  }

  // Display the updated tab
  showTab(currentTab);
}

// Validates all form fields across all tabs
function validateAllInputs() {
  const allInputs = document.querySelectorAll("#regForm input, #regForm select");
  let isValid = true;

  allInputs.forEach((input) => {
    if (input.hasAttribute("required") && input.value.trim() === "") {
      input.classList.add("invalid"); // Highlight invalid inputs
      isValid = false;
    } else {
      input.classList.remove("invalid"); // Remove error styling if corrected
    }
  });

  return isValid;
}

// Tracks and updates the progress bar
var currentProgress = 0;
function increaseProgress(n) {
  const progressBar = document.getElementById("progress");

  // Progress logic: Increase or decrease progress
  if (currentProgress < 100 && n !== null) {
    n >= 1 ? (currentProgress += 50) : (currentProgress -= 50);
    progressBar.style.width = currentProgress + "%";
  }

  // Handle final stage to prevent over-completion
  if (currentProgress === 100 && n == 1) {
    currentProgress -= 50;
    progressBar.style.width = currentProgress + "%";
  }
}

// Saves form data to localStorage for persistence
function saveDataToLocalStorage() {
  const formData = {};
  const tabs = document.getElementsByClassName("tab");

  // Collect inputs from all tabs
  for (let i = 0; i < tabs.length; i++) {
    const inputs = tabs[i].getElementsByTagName("input");

    for (let j = 0; j < inputs.length; j++) {
      formData[inputs[j].name] = inputs[j].value;
    }

    // Save gender selection separately
    const selects = document.getElementsByTagName("select");
    formData["Gender"] = selects[0].value;
  }

  // Save data in local storage and reset form
  localStorage.setItem("formData", JSON.stringify(formData));
  clearForm();
  alert("Form data saved successfully!");
}

// Resets progress bar to zero
const resetProgress = () => {
  currentProgress = 0;
  document.getElementById("progress").style.width = currentProgress + "%";
};

// Clears the form after submission
const clearForm = () => {
  const inputs = document.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  showTab(0); // Return to the first tab
  resetProgress();
};

// Validates specific fields within each tab
function validateForm(tabs) {
  const name = document.getElementById("name").value;
  const addr = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;

  // Error message containers
  const nameErr = document.getElementById("name-error");
  const addrErr = document.getElementById("address-error");
  const emailErr = document.getElementById("email-error");
  const conErr = document.getElementById("contact-error");
  const genErr = document.getElementById("gender-error");
  const dobErr = document.getElementById("dob-error");

  // Clear previous error messages
  nameErr.textContent = "";
  addrErr.textContent = "";
  emailErr.textContent = "";
  conErr.textContent = "";
  genErr.textContent = "";
  dobErr.textContent = "";

  let isValid = true;

  // Tab 1 Validation
  if (tabs == 0) {
    if (name === "" || /\d/.test(name)) {
      nameErr.textContent = "Please enter your name properly.";
      document.getElementById("name").classList.add("invalid");
      isValid = false;
    } else {
      document.getElementById("name").classList.remove("invalid");
    }

    if (gender === "") {
      genErr.textContent = "Please select your Gender.";
      document.getElementById("gender").classList.add("invalid");
      isValid = false;
    } else {
      document.getElementById("gender").classList.remove("invalid");
    }

    if (dob === "") {
      dobErr.textContent = "Please enter your DOB.";
      document.getElementById("dob").classList.add("invalid");
      isValid = false;
    } else {
      document.getElementById("dob").classList.remove("invalid");
    }
  }

  // Tab 2 Validation
  if (tabs == 1) {
    if (addr === "") {
      addrErr.textContent = "Please enter your address.";
      isValid = false;
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
      emailErr.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (contact === "" || contact.length < 10 || !/^[6-9]\d{9}$/g.test(contact)) {
      conErr.textContent = "Please enter a contact number with 10 digits.";
      isValid = false;
    }
  }

  return isValid; // Return validation status
}
