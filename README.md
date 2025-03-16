
## Clone the Repository

git clone https://github.com/your-username/user-details-form.git

cd user-details-form

## Files Overview

HTML File: index.html – Contains the form structure.
CSS File: style.css – Contains the styling for the form.
JavaScript File: script.js – Contains the logic for the form’s navigation, validation, progress tracking, and localStorage.


## Running the project

To run the project, simply open index.html in your web browser.

## Form Structure

### Step 1: User Details
Name (Required)

Gender (Required)

Date of Birth (Required)

### Step 2: Contact Information

Address (Required)

Email (Required, valid email format)

Phone Number (Required, must be 10 digits)

### Step 3: Summary View

Displays a summary of the entered information.

All fields are disabled for editing in this view.


## Key Features and Functions

####showTab(n):
 Displays the tab corresponding to the index n. Hides all tabs and only shows the one selected.
#### nextPrev(n):
 Moves to the next or previous tab. It checks validation before moving forward and updates the progress bar.
#### validateForm():
 Validates fields in the current tab before allowing navigation to the next tab.
#### saveDataToLocalStorage():
 Saves the form data to localStorage for persistence.
#### applyTabStyles():
 Applies CSS styling to each tab when navigating.
#### increaseProgress(n): 
 Updates the progress bar based on the current tab index.

#### Progress Bar 
To keep track of the filled tab of form.
#### Local Storage Handling
 

