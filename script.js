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
let userSignedUp = localStorage.getItem("userSignedUp") === "true";

// ==========================
// UI UPDATE FUNCTION
// ==========================
function updateUI() {
  if (userLoggedIn) {
    logoutBtn.style.display = "inline-block";
    openSignup.style.display = "none";
    openLogin.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    openSignup.style.display = "inline-block";
    openLogin.style.display = "inline-block";
  }
}

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

// Close buttons
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).style.display = "none";
  });
});

// ==========================
// SIGN UP LOGIC
// ==========================
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();

  if (firstName.length < 3) return alert("First name must be at least 3 letters.");
  if (lastName.length < 3) return alert("Last name must be at least 3 letters.");
  if (!/^\d{8}$/.test(mobile)) return alert("Mobile number must be exactly 8 digits.");

  if (localStorage.getItem(`user_${email}`)) {
    alert("This email is already registered. Please LOGIN.");
    signupOverlay.style.display = "none";
    loginOverlay.style.display = "flex";
    return;
  }

  const userData = { firstName, lastName, mobile, email };
  localStorage.setItem(`user_${email}`, JSON.stringify(userData));
  localStorage.setItem("userSignedUp", "true");
  userSignedUp = true;

  alert("Account created successfully! Please LOGIN.");

  signupOverlay.style.display = "none";
  loginOverlay.style.display = "flex";

  updateUI();
});

// ==========================
// LOGIN LOGIC
// ==========================
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value.trim();
  const existingUser = localStorage.getItem(`user_${loginEmail}`);

  if (!existingUser) return alert("No account found with this email. Please SIGN UP first.");

  localStorage.setItem("userLoggedIn", "true");
  userLoggedIn = true;

  loginOverlay.style.display = "none";
  alert("Logged in successfully!");

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
// CLOSE POPUP ON OUTSIDE CLICK
// ==========================
window.addEventListener("click", (e) => {
  if (e.target === signupOverlay) signupOverlay.style.display = "none";
  if (e.target === loginOverlay) loginOverlay.style.display = "none";
});

// ==========================
// READ MORE (GO TO DETAILS)
// ==========================
document.querySelectorAll(".read-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const trainerId = btn.dataset.id;
    window.location.href = "details.html?id=" + trainerId;
  });
});
