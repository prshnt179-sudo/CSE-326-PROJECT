// home.js - fills in the numbers and shows the top rated resources

const resources = getResources();
const topBox = document.getElementById("top-resources");

function showNumbers() {
  document.getElementById("total-resources").textContent = resources.length;
  document.getElementById("total-topics").textContent = getAllTopics().length;
  document.getElementById("total-bookmarks").textContent = getBookmarks().length;
}

function showTopResources() {
  // slice() makes a copy so the original list is not re-ordered
  const sorted = resources.slice().sort(function (a, b) {
    return getAverageRating(b.id) - getAverageRating(a.id);
  });

  let html = "";
  for (let i = 0; i < 3 && i < sorted.length; i++) {
    html += buildResourceCard(sorted[i]);
  }
  topBox.innerHTML = html;
}

function refreshPage() {
  showNumbers();
  showTopResources();
}

setupBookmarkButtons(topBox, refreshPage);
refreshPage();
