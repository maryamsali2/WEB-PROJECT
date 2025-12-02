// ========== DETAILS PAGE SCRIPT ==========

// get id from URL
const params = new URLSearchParams(window.location.search);
const trainerId = params.get("id");

// select output box
const box = document.getElementById("trainer-details");

// variables
let img, name, exp, lang, vehicle, gear, rating;

// trainer 1
if (trainerId === "jassim-ali") {
    img = "img/jassim.png"; // your image path
    name = "Jassim Ali";
    exp = "5 years";
    lang = "English, Arabic";
    vehicle = "Car, Bus, Bike";
    gear = "Manual / Automatic";
    rating = "★★★★★";
}

// trainer 2
else if (trainerId === "ali-salman") {
    img = "img/ali.png"; // your image path
    name = "Ali Salman";
    exp = "10 years";
    lang = "Arabic";
    vehicle = "Car";
    gear = "Automatic";
    rating = "★★★★☆";
}

// not found
else {
    box.innerHTML = "<p>Trainer not found.</p>";
}

// show result
if (img) {
    box.innerHTML =
      "<img src='" + img + "' style='width:200px;border-radius:10px;margin-bottom:15px;'>" +
      "<h2>" + name + "</h2>" +
      "<p><strong>Experience:</strong> " + exp + "</p>" +
      "<p><strong>Languages:</strong> " + lang + "</p>" +
      "<p><strong>Vehicle Types:</strong> " + vehicle + "</p>" +
      "<p><strong>Gear Type:</strong> " + gear + "</p>" +
      "<p><strong>Rating:</strong> " + rating + "</p>" +
      "<button onclick='history.back()' style='padding:10px 20px;margin-top:20px;'>Back</button>";
}


// comments system 
// ====== ELEMENTS ======
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");
const commentsList = document.getElementById("commentsList");

const popup = document.getElementById("loginPopup");
const closePopup = document.getElementById("closePopup");

// ====== LOGIN CHECK ======
const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

 
// ====== STORAGE KEY ======
const STORAGE_KEY = `comments_${trainerId}`;

// ====== LOAD COMMENTS ======
let comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ====== DISPLAY COMMENTS ======
function displayComments() {
  commentsList.innerHTML = "<h3>All Comments</h3>";

  comments.forEach((comment, index) => {
    const div = document.createElement("div");
    div.classList.add("comment");

    div.innerHTML = `
      <p>${comment.text}</p>
      <small>${comment.date}</small>
      ${comment.owner ? `
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      ` : ""}
    `;

    commentsList.appendChild(div);
  });
}

// ====== ADD COMMENT ======
submitComment.addEventListener("click", () => {
  if (!userLoggedIn) {
    popup.style.display = "flex";
    return;
  }

  const text = commentInput.value.trim();
  if (text === "") return alert("Write a comment first!");

  const now = new Date();
  const dateString = now.toLocaleString();

  comments.push({
    text: text,
    date: dateString,
    owner: true // only comments made while logged in can be edited/deleted
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  commentInput.value = "";
  displayComments();
});

// ====== EDIT & DELETE ======
commentsList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
    comments.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    displayComments();
  }

  if (e.target.classList.contains("edit-btn")) {
    const newText = prompt("Edit comment:", comments[index].text);
    if (newText && newText.trim() !== "") {
      comments[index].text = newText.trim();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
      displayComments();
    }
  }
});

// ====== POPUP CLOSE ======
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// load comments initially
displayComments();
