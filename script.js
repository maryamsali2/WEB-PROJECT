// ==========================
// ELEMENTS
// ==========================
const bookmarkIcons = document.querySelectorAll('[data-id]');
const openSignin = document.getElementById('openSignin');
const openLogin = document.getElementById('openLogin');
const signinOverlay = document.getElementById('signinOverlay');
const loginOverlay = document.getElementById('loginOverlay');
const closeBtns = document.querySelectorAll('.closeBtn');
const signInForm = document.getElementById('signInForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');








// ==========================
// LOGIN STATE
// ==========================
let userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

// ==========================
// UI UPDATE FUNCTION
// ==========================
function updateUI() {
  if (userLoggedIn) {
    logoutBtn.style.display = "inline-block";
    openSignin.style.display = "none";
    openLogin.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    openSignin.style.display = "inline-block";
    openLogin.style.display = "inline-block";
    // Reset bookmarks display for logged-out users
    bookmarkIcons.forEach(icon => {
      icon.classList.remove("saved", "bi-bookmark-fill");
      icon.classList.add("bi-bookmark");
    });
  }
}

// ==========================
// POPUPS
// ==========================
openSignin.addEventListener('click', () => signinOverlay.style.display = 'block');
openLogin.addEventListener('click', () => loginOverlay.style.display = 'block');

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.close).style.display = 'none';
  });
});

// ==========================
// SIGN IN
// ==========================
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem("userLoggedIn", "true");
  userLoggedIn = true;

  alert("Account created! You can now save bookmarks.");
  signinOverlay.style.display = "none";

  loadBookmarksState();
  updateUI();
});

// ==========================
// LOGIN
// ==========================
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem("userLoggedIn", "true");
  userLoggedIn = true;

  alert("Logged in successfully!");
  loginOverlay.style.display = "none";

  loadBookmarksState();
  updateUI();
});

// ==========================
// LOGOUT
// ==========================
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("userLoggedIn", "false");
  userLoggedIn = false;

  alert("You have logged out.");
  updateUI();
});

// ==========================
// BOOKMARK SAVE/LOAD
// ==========================
function loadBookmarksState() {
  if (!userLoggedIn) return;

  bookmarkIcons.forEach(icon => {
    const id = icon.getAttribute("data-id");
    const saved = localStorage.getItem(id) === "saved";

    icon.classList.toggle("saved", saved);
    icon.classList.toggle("bi-bookmark", !saved);
    icon.classList.toggle("bi-bookmark-fill", saved);
  });
}

// Load bookmarks on page load
loadBookmarksState();
updateUI(); // Ensure buttons are correct on page load

// ==========================
// BOOKMARK CLICK LOGIC
// ==========================
bookmarkIcons.forEach(icon => {
  const id = icon.getAttribute("data-id");

  icon.addEventListener("click", () => {
    if (!userLoggedIn) {
      alert("Please log in first!");
      return;
    }

    const saved = icon.classList.toggle("saved");
    icon.classList.toggle("bi-bookmark", !saved);
    icon.classList.toggle("bi-bookmark-fill", saved);

    if (saved) {
      localStorage.setItem(id, "saved");
    } else {
      localStorage.removeItem(id);
    }
  });
});



