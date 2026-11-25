// ratings.js - students can rate a resource from 1 to 5 stars

const resources = getResources();
const form = document.getElementById("rating-form");
const resourceSelect = document.getElementById("resource-select");
const message = document.getElementById("message");
const tableBody = document.getElementById("rating-table-body");

function fillResourceSelect() {
  for (let i = 0; i < resources.length; i++) {
    resourceSelect.innerHTML += `<option value="${resources[i].id}">${escapeText(resources[i].title)}</option>`;
  }
}

function showRatingTable() {
  let html = "";
  for (let i = 0; i < resources.length; i++) {
    const count = getRatingCount(resources[i].id);
    let average = "-";
    if (count > 0) {
      average = getAverageRating(resources[i].id).toFixed(1);
    }
    html += `
      <tr>
        <td>${escapeText(resources[i].title)}</td>
        <td>${average}</td>
        <td>${count}</td>
      </tr>`;
  }
  tableBody.innerHTML = html;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedStars = document.querySelector("input[name='stars']:checked");

  if (resourceSelect.value === "") {
    message.textContent = "Please choose a resource.";
    message.className = "message error";
    return;
  }
  if (selectedStars === null) {
    message.textContent = "Please choose a star rating.";
    message.className = "message error";
    return;
  }

  addRating(Number(resourceSelect.value), Number(selectedStars.value));
  message.textContent = "Thank you! Your rating was added.";
  message.className = "message success";
  form.reset();
  showRatingTable();
});

fillResourceSelect();
showRatingTable();
