// interests.js - lets the user choose the topics they are interested in

const topicList = document.getElementById("topic-list");
const saveButton = document.getElementById("save-interests");
const clearButton = document.getElementById("clear-interests");
const message = document.getElementById("message");
const savedBox = document.getElementById("saved-interests");

// Draw one checkbox for every topic, ticking the ones saved earlier
function showTopics() {
  const topics = getAllTopics();
  const interests = getInterests();
  let html = "";

  for (let i = 0; i < topics.length; i++) {
    let checked = "";
    if (interests.includes(topics[i])) {
      checked = "checked";
    }
    html += `
      <label class="topic-option">
        <input type="checkbox" value="${escapeText(topics[i])}" ${checked}>
        ${escapeText(topics[i])}
      </label>`;
  }
  topicList.innerHTML = html;
}

// Show the saved interests as small tags
function showSavedInterests() {
  const interests = getInterests();

  if (interests.length === 0) {
    savedBox.innerHTML = "<p>You have not saved any interests yet.</p>";
    return;
  }

  let html = "";
  for (let i = 0; i < interests.length; i++) {
    html += `<span class="tag">${escapeText(interests[i])}</span>`;
  }
  savedBox.innerHTML = html;
}

saveButton.addEventListener("click", function () {
  const boxes = topicList.querySelectorAll("input[type='checkbox']");
  const chosen = [];

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      chosen.push(boxes[i].value);
    }
  }

  saveData(KEYS.interests, chosen);
  message.textContent = "Your interests were saved.";
  message.className = "message success";
  showSavedInterests();
});

clearButton.addEventListener("click", function () {
  saveData(KEYS.interests, []);
  message.textContent = "Your interests were cleared.";
  message.className = "message success";
  showTopics();
  showSavedInterests();
});

showTopics();
showSavedInterests();
