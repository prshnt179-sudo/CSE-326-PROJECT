// admin.js - admin login, add resources, delete resources, view feedback
// NOTE: this password check is only for the project demo. A real website
// must check the password on a server.

const ADMIN_PASSWORD = "admin123";

const loginBox = document.getElementById("login-box");
const adminPanel = document.getElementById("admin-panel");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const logoutButton = document.getElementById("logout-button");

const addForm = document.getElementById("add-form");
const addMessage = document.getElementById("add-message");
const tableBody = document.getElementById("admin-table-body");
const feedbackCount = document.getElementById("feedback-count");
const resetButton = document.getElementById("reset-button");


// ---------- login ----------

function showCorrectScreen() {
  if (sessionStorage.getItem("arr_admin") === "yes") {
    loginBox.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    showResourceTable();
  } else {
    loginBox.classList.remove("hidden");
    adminPanel.classList.add("hidden");
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const typed = document.getElementById("password").value;

  if (typed === ADMIN_PASSWORD) {
    sessionStorage.setItem("arr_admin", "yes");
    loginForm.reset();
    loginMessage.textContent = "";
    showCorrectScreen();
  } else {
    loginMessage.textContent = "Wrong password. Try again.";
    loginMessage.className = "message error";
  }
});

logoutButton.addEventListener("click", function () {
  sessionStorage.removeItem("arr_admin");
  showCorrectScreen();
});


// ---------- resource table ----------

function showResourceTable() {
  const resources = getResources();
  let html = "";

  for (let i = 0; i < resources.length; i++) {
    html += `
      <tr>
        <td>${escapeText(resources[i].title)}</td>
        <td>${escapeText(resources[i].type)}</td>
        <td>${escapeText(resources[i].course)}</td>
        <td><button class="delete-btn" data-id="${resources[i].id}">Delete</button></td>
      </tr>`;
  }
  tableBody.innerHTML = html;
  feedbackCount.textContent = getFeedback().length;
}

tableBody.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const id = Number(event.target.dataset.id);
  if (!confirm("Delete this resource?")) {
    return;
  }

  // keep every resource except the deleted one
  const remaining = [];
  const resources = getResources();
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].id !== id) {
      remaining.push(resources[i]);
    }
  }
  saveResources(remaining);

  // also remove it from the saved bookmarks
  const bookmarks = getBookmarks();
  const position = bookmarks.indexOf(id);
  if (position !== -1) {
    bookmarks.splice(position, 1);
    saveData(KEYS.bookmarks, bookmarks);
  }

  showResourceTable();
});


// ---------- add a new resource ----------

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const type = document.getElementById("type").value;
  const course = document.getElementById("course").value.trim();
  const topicsText = document.getElementById("topics").value.trim();
  const description = document.getElementById("description").value.trim();
  const link = document.getElementById("link").value.trim();

  if (title === "" || course === "" || topicsText === "" || description === "") {
    addMessage.textContent = "Please fill in title, course, topics and description.";
    addMessage.className = "message error";
    return;
  }
  if (link !== "" && !link.startsWith("http")) {
    addMessage.textContent = "The link must start with http:// or https://";
    addMessage.className = "message error";
    return;
  }

  // "python, maths" becomes ["python", "maths"]
  const topics = [];
  const parts = topicsText.split(",");
  for (let i = 0; i < parts.length; i++) {
    const topic = parts[i].trim().toLowerCase();
    if (topic !== "") {
      topics.push(topic);
    }
  }

  const resources = getResources();

  // new id = biggest existing id + 1
  let newId = 1;
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].id >= newId) {
      newId = resources[i].id + 1;
    }
  }

  resources.push({
    id: newId,
    title: title,
    type: type,
    course: course,
    topics: topics,
    description: description,
    link: link
  });
  saveResources(resources);

  addMessage.textContent = "Resource added.";
  addMessage.className = "message success";
  addForm.reset();
  showResourceTable();
});


// ---------- reset ----------

resetButton.addEventListener("click", function () {
  if (confirm("Go back to the original sample resources?")) {
    localStorage.removeItem(KEYS.resources);
    showResourceTable();
  }
});

showCorrectScreen();
