// catalogue.js - search and filter the resource catalogue

const resources = getResources();

const searchBox = document.getElementById("search-box");
const typeFilter = document.getElementById("type-filter");
const courseFilter = document.getElementById("course-filter");
const resultCount = document.getElementById("result-count");
const resultList = document.getElementById("resource-list");

// Put every course into the course drop-down
function fillCourseFilter() {
  const courses = getAllCourses();
  for (let i = 0; i < courses.length; i++) {
    courseFilter.innerHTML += `<option value="${escapeText(courses[i])}">${escapeText(courses[i])}</option>`;
  }
}

// Checks if one resource matches what the user typed and selected
function matchesFilters(resource) {
  const searchText = searchBox.value.toLowerCase().trim();
  const wholeText = (resource.title + " " + resource.description + " " + resource.topics.join(" ")).toLowerCase();

  if (searchText !== "" && !wholeText.includes(searchText)) {
    return false;
  }
  if (typeFilter.value !== "" && resource.type !== typeFilter.value) {
    return false;
  }
  if (courseFilter.value !== "" && resource.course !== courseFilter.value) {
    return false;
  }
  return true;
}

function showResources() {
  let html = "";
  let count = 0;

  for (let i = 0; i < resources.length; i++) {
    if (matchesFilters(resources[i])) {
      html += buildResourceCard(resources[i]);
      count++;
    }
  }

  if (count === 0) {
    html = '<p class="empty-text">No resources match your search. Try a different word or clear the filters.</p>';
  }

  resultCount.textContent = "Showing " + count + " of " + resources.length + " resources";
  resultList.innerHTML = html;
}

searchBox.addEventListener("input", showResources);
typeFilter.addEventListener("change", showResources);
courseFilter.addEventListener("change", showResources);
setupBookmarkButtons(resultList, showResources);

fillCourseFilter();
showResources();
