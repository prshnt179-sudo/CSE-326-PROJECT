// recommendations.js - gives each resource a score using simple rules
// and shows the best matches.

const resources = getResources();
const courseSelect = document.getElementById("course-select");
const interestInfo = document.getElementById("interest-info");
const resultList = document.getElementById("recommendation-list");

// Rule points (change these numbers to change how the engine behaves)
const POINTS_PER_TOPIC = 3;
const POINTS_FOR_COURSE = 4;
const POINTS_FOR_HIGH_RATING = 1;

function fillCourseSelect() {
  const courses = getAllCourses();
  const savedCourse = getCourse();

  for (let i = 0; i < courses.length; i++) {
    let selected = "";
    if (courses[i] === savedCourse) {
      selected = "selected";
    }
    courseSelect.innerHTML += `<option value="${escapeText(courses[i])}" ${selected}>${escapeText(courses[i])}</option>`;
  }
}

// Works out the score of one resource and the reasons for it
function scoreResource(resource, interests, course) {
  let score = 0;
  const reasons = [];

  // Rule 1: +3 for every topic that matches an interest
  for (let i = 0; i < resource.topics.length; i++) {
    if (interests.includes(resource.topics[i])) {
      score += POINTS_PER_TOPIC;
      reasons.push("Matches your interest in " + resource.topics[i]);
    }
  }

  // Rule 2: +4 if it belongs to the selected course
  if (course !== "" && resource.course === course) {
    score += POINTS_FOR_COURSE;
    reasons.push("Belongs to your course, " + course);
  }

  // Rule 3: +1 extra if students rated it 4 or more (only for relevant resources)
  if (score > 0 && getAverageRating(resource.id) >= 4) {
    score += POINTS_FOR_HIGH_RATING;
    reasons.push("Rated highly by other students");
  }

  return { score: score, reasons: reasons };
}

function showRecommendations() {
  const interests = getInterests();
  const course = courseSelect.value;
  saveData(KEYS.course, course);

  interestInfo.textContent = interests.length > 0
    ? "Your interests: " + interests.join(", ")
    : "You have not chosen any interests yet.";

  if (interests.length === 0 && course === "") {
    resultList.innerHTML = '<p class="empty-text">Choose a course above or <a href="interests.html">pick your interests</a> to get recommendations.</p>';
    return;
  }

  // score every resource and keep the ones that matched something
  const scored = [];
  for (let i = 0; i < resources.length; i++) {
    const result = scoreResource(resources[i], interests, course);
    if (result.score > 0) {
      scored.push({ resource: resources[i], score: result.score, reasons: result.reasons });
    }
  }

  // highest score first
  scored.sort(function (a, b) {
    return b.score - a.score;
  });

  if (scored.length === 0) {
    resultList.innerHTML = '<p class="empty-text">Nothing matched yet. Try choosing more interests.</p>';
    return;
  }

  let html = "";
  for (let i = 0; i < scored.length && i < 6; i++) {
    let reasonHTML = "";
    for (let j = 0; j < scored[i].reasons.length; j++) {
      reasonHTML += "<li>" + escapeText(scored[i].reasons[j]) + "</li>";
    }
    const extra = `<p class="score">Score: ${scored[i].score}</p><ul class="reasons">${reasonHTML}</ul>`;
    html += buildResourceCard(scored[i].resource, extra);
  }
  resultList.innerHTML = html;
}

courseSelect.addEventListener("change", showRecommendations);
setupBookmarkButtons(resultList, showRecommendations);

fillCourseSelect();
showRecommendations();
