// data.js
// This file is loaded on every page. It holds the sample resources and a few
// helper functions for saving things in the browser (localStorage).

// Names of the keys we use inside localStorage
const KEYS = {
  resources: "arr_resources",
  interests: "arr_interests",
  course: "arr_course",
  bookmarks: "arr_bookmarks",
  ratings: "arr_ratings",
  feedback: "arr_feedback"
};

// Sample resource catalogue (the admin page can add or remove resources)
const sampleResources = [
  {
    id: 1,
    title: "Introduction to Algorithms (CLRS)",
    type: "Book",
    course: "Data Structures",
    topics: ["algorithms", "data structures"],
    description: "A detailed textbook on sorting, searching, trees and graphs.",
    link: ""
  },
  {
    id: 2,
    title: "CS50 Introduction to Computer Science",
    type: "Video",
    course: "Programming Basics",
    topics: ["programming", "c language", "python"],
    description: "Beginner friendly lecture series from Harvard with practice problems.",
    link: "https://cs50.harvard.edu/x/"
  },
  {
    id: 3,
    title: "HTML and CSS Crash Course",
    type: "Video",
    course: "Web Technologies",
    topics: ["web development", "html", "css"],
    description: "Learn how to build and style simple web pages step by step.",
    link: "https://developer.mozilla.org/en-US/docs/Learn"
  },
  {
    id: 4,
    title: "The Modern JavaScript Tutorial",
    type: "Article",
    course: "Web Technologies",
    topics: ["web development", "javascript"],
    description: "Free online tutorial that covers JavaScript from the basics to DOM and events.",
    link: "https://javascript.info/"
  },
  {
    id: 5,
    title: "Database Design Notes",
    type: "Notes",
    course: "Database Systems",
    topics: ["databases", "sql"],
    description: "Short notes on ER diagrams, keys and normalization.",
    link: ""
  },
  {
    id: 6,
    title: "SQL Practice Tutorial",
    type: "Article",
    course: "Database Systems",
    topics: ["sql", "databases"],
    description: "Write SELECT, JOIN and GROUP BY queries with examples.",
    link: "https://www.w3schools.com/sql/"
  },
  {
    id: 7,
    title: "Operating System Concepts",
    type: "Book",
    course: "Operating Systems",
    topics: ["operating systems", "scheduling", "memory management"],
    description: "Covers processes, CPU scheduling, deadlocks and virtual memory.",
    link: ""
  },
  {
    id: 8,
    title: "Computer Networking: A Top-Down Approach",
    type: "Book",
    course: "Computer Networks",
    topics: ["networking", "internet protocols"],
    description: "Explains the internet layer by layer, from applications down to links.",
    link: "https://gaia.cs.umass.edu/kurose_ross/"
  },
  {
    id: 9,
    title: "Machine Learning by Andrew Ng",
    type: "Video",
    course: "Machine Learning",
    topics: ["machine learning", "python", "maths"],
    description: "Popular introduction to regression, classification and neural networks.",
    link: "https://www.coursera.org/learn/machine-learning"
  },
  {
    id: 10,
    title: "Discrete Mathematics Notes",
    type: "Notes",
    course: "Discrete Mathematics",
    topics: ["maths", "logic", "algorithms"],
    description: "Revision notes on sets, relations, graphs and proofs.",
    link: ""
  },
  {
    id: 11,
    title: "Python for Everybody",
    type: "Video",
    course: "Programming Basics",
    topics: ["python", "programming"],
    description: "Gentle course that teaches Python to complete beginners.",
    link: "https://www.py4e.com/"
  },
  {
    id: 12,
    title: "Object Oriented Programming in Java",
    type: "Article",
    course: "Object Oriented Programming",
    topics: ["java", "oop", "programming"],
    description: "Classes, objects, inheritance and polymorphism with small examples.",
    link: ""
  }
];

// A few starting ratings so the recommendations have something to work with
const sampleRatings = {
  "1": [5, 4, 5],
  "2": [5, 5, 4],
  "3": [4, 4],
  "4": [5, 4],
  "5": [3, 4],
  "6": [4, 3],
  "7": [4, 3, 4],
  "8": [4, 5],
  "9": [5, 5, 5],
  "10": [3, 3],
  "11": [5, 4],
  "12": [4]
};


// ---------- saving and loading ----------

function loadData(key, fallback) {
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return fallback;
  }
  return JSON.parse(saved);
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


// ---------- resources ----------

function getResources() {
  return loadData(KEYS.resources, sampleResources);
}

function saveResources(list) {
  saveData(KEYS.resources, list);
}

// Collects every topic used by the resources, without repeats, A to Z
function getAllTopics() {
  const resources = getResources();
  const topics = [];
  for (let i = 0; i < resources.length; i++) {
    for (let j = 0; j < resources[i].topics.length; j++) {
      if (!topics.includes(resources[i].topics[j])) {
        topics.push(resources[i].topics[j]);
      }
    }
  }
  return topics.sort();
}

function getAllCourses() {
  const resources = getResources();
  const courses = [];
  for (let i = 0; i < resources.length; i++) {
    if (!courses.includes(resources[i].course)) {
      courses.push(resources[i].course);
    }
  }
  return courses.sort();
}


// ---------- interests and course ----------

function getInterests() {
  return loadData(KEYS.interests, []);
}

function getCourse() {
  return loadData(KEYS.course, "");
}


// ---------- bookmarks ----------

function getBookmarks() {
  return loadData(KEYS.bookmarks, []);
}

// Adds the id if it is not saved yet, otherwise removes it
function toggleBookmark(id) {
  const bookmarks = getBookmarks();
  const position = bookmarks.indexOf(id);
  if (position === -1) {
    bookmarks.push(id);
  } else {
    bookmarks.splice(position, 1);
  }
  saveData(KEYS.bookmarks, bookmarks);
}


// ---------- ratings ----------

function getRatings() {
  return loadData(KEYS.ratings, sampleRatings);
}

function addRating(id, stars) {
  const ratings = getRatings();
  if (!ratings[id]) {
    ratings[id] = [];
  }
  ratings[id].push(stars);
  saveData(KEYS.ratings, ratings);
}

function getRatingCount(id) {
  const list = getRatings()[id] || [];
  return list.length;
}

function getAverageRating(id) {
  const list = getRatings()[id] || [];
  if (list.length === 0) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i];
  }
  return total / list.length;
}


// ---------- feedback ----------

function getFeedback() {
  return loadData(KEYS.feedback, []);
}

function addFeedback(entry) {
  const all = getFeedback();
  all.push(entry);
  saveData(KEYS.feedback, all);
}


// ---------- helpers used to draw the page ----------

// Stops text typed by a user from being treated as HTML
function escapeText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Builds the HTML for one resource card.
// extraHTML is optional, pages can use it to add more details to the card.
function buildResourceCard(resource, extraHTML) {
  const isSaved = getBookmarks().includes(resource.id);
  const average = getAverageRating(resource.id);
  const count = getRatingCount(resource.id);

  let tagsHTML = "";
  for (let i = 0; i < resource.topics.length; i++) {
    tagsHTML += `<span class="tag">${escapeText(resource.topics[i])}</span>`;
  }

  let ratingText = "Not rated yet";
  if (count > 0) {
    ratingText = `${average.toFixed(1)} / 5 (${count} ratings)`;
  }

  let linkHTML = "";
  if (resource.link) {
    linkHTML = `<p><a href="${escapeText(resource.link)}" target="_blank" rel="noopener">Open resource</a></p>`;
  }

  const buttonClass = isSaved ? "bookmark-btn saved" : "bookmark-btn";
  const buttonText = isSaved ? "Bookmarked" : "Bookmark";

  return `
    <div class="card">
      <h3>${escapeText(resource.title)}</h3>
      <p class="meta">${escapeText(resource.type)} | ${escapeText(resource.course)}</p>
      <p>${escapeText(resource.description)}</p>
      <div>${tagsHTML}</div>
      <p class="rating-text">${ratingText}</p>
      ${linkHTML}
      ${extraHTML || ""}
      <button class="${buttonClass}" data-id="${resource.id}">${buttonText}</button>
    </div>
  `;
}

// Makes the bookmark buttons inside a container work.
// afterToggle is the function that redraws the page after a click.
function setupBookmarkButtons(container, afterToggle) {
  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("bookmark-btn")) {
      toggleBookmark(Number(event.target.dataset.id));
      afterToggle();
    }
  });
}
