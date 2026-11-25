// tags.js - browse resources by course tag or topic tag

const courseTags = document.getElementById("course-tags");
const topicTags = document.getElementById("topic-tags");
const heading = document.getElementById("tag-heading");
const resultList = document.getElementById("tag-results");

const resources = getResources();

// remember what the user clicked last so we can redraw after a bookmark click
let selectedType = "";
let selectedValue = "";

// Make one clickable button for every name in the list
function makeTagButtons(names, type) {
  let html = "";
  for (let i = 0; i < names.length; i++) {
    html += `<button class="tag-button" data-type="${type}" data-value="${escapeText(names[i])}">${escapeText(names[i])}</button>`;
  }
  return html;
}

function showResultsForTag() {
  if (selectedValue === "") {
    return;
  }

  heading.textContent = "Resources tagged: " + selectedValue;
  let html = "";

  for (let i = 0; i < resources.length; i++) {
    let isMatch = false;
    if (selectedType === "course") {
      isMatch = resources[i].course === selectedValue;
    } else {
      isMatch = resources[i].topics.includes(selectedValue);
    }
    if (isMatch) {
      html += buildResourceCard(resources[i]);
    }
  }
  resultList.innerHTML = html;
}

function handleTagClick(event) {
  if (!event.target.classList.contains("tag-button")) {
    return;
  }
  selectedType = event.target.dataset.type;
  selectedValue = event.target.dataset.value;

  // highlight only the clicked button
  const allButtons = document.querySelectorAll(".tag-button");
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("active-tag");
  }
  event.target.classList.add("active-tag");

  showResultsForTag();
}

courseTags.innerHTML = makeTagButtons(getAllCourses(), "course");
topicTags.innerHTML = makeTagButtons(getAllTopics(), "topic");

courseTags.addEventListener("click", handleTagClick);
topicTags.addEventListener("click", handleTagClick);
setupBookmarkButtons(resultList, showResultsForTag);
