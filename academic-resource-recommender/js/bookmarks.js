// bookmarks.js - shows the resources the user has saved

const resources = getResources();
const summary = document.getElementById("bookmark-summary");
const bookmarkList = document.getElementById("bookmark-list");

function showBookmarks() {
  const savedIds = getBookmarks();
  let html = "";
  let count = 0;

  for (let i = 0; i < resources.length; i++) {
    if (savedIds.includes(resources[i].id)) {
      html += buildResourceCard(resources[i]);
      count++;
    }
  }

  if (count === 0) {
    html = '<p class="empty-text">You have no bookmarks yet. Open the <a href="catalogue.html">catalogue</a> and bookmark a resource to see it here.</p>';
  }

  summary.textContent = "You have saved " + count + " resource(s).";
  bookmarkList.innerHTML = html;
}

setupBookmarkButtons(bookmarkList, showBookmarks);
showBookmarks();
