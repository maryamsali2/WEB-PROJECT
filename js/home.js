// ==========================
// ELEMENTS
// ==========================
const openSignup = document.getElementById("openSignin");
const openLogin = document.getElementById("openLogin");

const signupOverlay = document.getElementById("signinOverlay");
const loginOverlay = document.getElementById("loginOverlay");

const closeBtns = document.querySelectorAll(".closeBtn");

const signupForm = document.getElementById("signInForm");
const loginForm = document.getElementById("loginForm");

const logoutBtn = document.getElementById("logoutBtn");


// ==========================
// LOGIN STATE
// ==========================
let userLoggedIn = localStorage.getItem("userLoggedIn") === "true";


// ==========================
// OPEN POPUPS
// ==========================
openSignup.addEventListener("click", () => {
  alert("If you already have an account, please LOGIN.");
  signupOverlay.style.display = "flex";
});

openLogin.addEventListener("click", () => {
  loginOverlay.style.display = "flex";
});

// Close popups when X button is clicked
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).style.display = "none";
  });
});


// ==========================
// SIGN UP LOGIC
// ==========================
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();

  // Basic validation
  if (firstName.length < 3) return alert("First name must be at least 3 letters.");
  if (lastName.length < 3) return alert("Last name must be at least 3 letters.");
  if (!/^\d{8}$/.test(mobile)) return alert("Mobile number must be exactly 8 digits.");

  // Check if user already exists
  if (localStorage.getItem(`user_${email}`)) {
    alert("This email is already registered. Please LOGIN.");
    signupOverlay.style.display = "none";
    loginOverlay.style.display = "flex";
    return;
  }

  // Save new user
  const userData = { firstName, lastName, mobile, email };
  localStorage.setItem(`user_${email}`, JSON.stringify(userData));

  alert("Account created successfully! Please LOGIN.");

  signupOverlay.style.display = "none";
  loginOverlay.style.display = "flex";
});


// ==========================
// LOGIN LOGIC
// ==========================
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value.trim();
  const user = localStorage.getItem(`user_${loginEmail}`);

  if (!user) return alert("No account found. Please SIGN UP.");

  const userData = JSON.parse(user);

  // Save logged-in user
  localStorage.setItem("currentUser", loginEmail);
  localStorage.setItem("userLoggedIn", "true");

  alert(`Welcome, ${userData.firstName}!`);

  loginOverlay.style.display = "none";

  // Update UI to hide login and sign up buttons
  updateUI();
});


// ==========================
// CLOSE POPUP ON OUTSIDE CLICK
// ==========================
window.addEventListener("click", e => {
  if (e.target === signupOverlay) signupOverlay.style.display = "none";
  if (e.target === loginOverlay) loginOverlay.style.display = "none";
});


// ==========================
// LOGOUT LOGIC
// ==========================
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("currentUser");

  alert("You have been logged out.");

  updateUI();
  window.location.href = "home.html";
});


// ==========================
// UPDATE UI BASED ON LOGIN STATE
// ==========================
function updateUI() {
  const loggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (loggedIn) {
    openSignup.style.display = "none";
    openLogin.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    openSignup.style.display = "inline-block";
    openLogin.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}


// ==========================
// RUN UI UPDATE ON PAGE LOAD
// ==========================
updateUI();
