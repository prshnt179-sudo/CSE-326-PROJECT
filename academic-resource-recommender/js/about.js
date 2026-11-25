// about.js - shows or hides the list of project functions

const toggleButton = document.getElementById("toggle-functions");
const functionList = document.getElementById("function-list");

toggleButton.addEventListener("click", function () {
  if (functionList.classList.contains("hidden")) {
    functionList.classList.remove("hidden");
    toggleButton.textContent = "Hide project functions";
  } else {
    functionList.classList.add("hidden");
    toggleButton.textContent = "Show project functions";
  }
});
