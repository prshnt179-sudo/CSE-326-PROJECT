// feedback.js - collects feedback about the recommendations

const form = document.getElementById("feedback-form");
const message = document.getElementById("message");
const feedbackList = document.getElementById("feedback-list");

function showFeedback() {
  const all = getFeedback();

  if (all.length === 0) {
    feedbackList.innerHTML = '<p class="empty-text">No feedback has been sent from this browser yet.</p>';
    return;
  }

  let html = "";
  // newest first, so we loop from the end
  for (let i = all.length - 1; i >= 0; i--) {
    html += `
      <div class="feedback-item">
        <p><strong>${escapeText(all[i].name)}</strong> <span class="meta">on ${escapeText(all[i].date)}</span></p>
        <p class="meta">Were the recommendations helpful? ${escapeText(all[i].helpful)}</p>
        <p>${escapeText(all[i].message)}</p>
      </div>`;
  }
  feedbackList.innerHTML = html;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const helpful = document.getElementById("helpful").value;
  const text = document.getElementById("feedback-text").value.trim();

  // simple validation
  if (name === "") {
    message.textContent = "Please enter your name.";
    message.className = "message error";
    return;
  }
  if (email !== "" && !email.includes("@")) {
    message.textContent = "Please enter a valid email address.";
    message.className = "message error";
    return;
  }
  if (text.length < 10) {
    message.textContent = "Please write at least 10 characters of feedback.";
    message.className = "message error";
    return;
  }

  addFeedback({
    name: name,
    email: email,
    helpful: helpful,
    message: text,
    date: new Date().toLocaleDateString()
  });

  message.textContent = "Thank you for your feedback!";
  message.className = "message success";
  form.reset();
  showFeedback();
});

showFeedback();
