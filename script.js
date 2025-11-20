// ELEMENTS (all const at the top)

const openSignin = document.getElementById('openSignin');
const openLogin = document.getElementById('openLogin');

const signinOverlay = document.getElementById('signinOverlay');
const loginOverlay = document.getElementById('loginOverlay');

const closeBtns = document.querySelectorAll('.closeBtn');

const signInForm = document.getElementById('signInForm');
const loginForm = document.getElementById('loginForm');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const mobileInput = document.getElementById('mobile');
const emailInput = document.getElementById('email');

const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');

const bookmarkButtons = document.querySelectorAll('.bookmarkBtn');




// OPEN POPUPS

openSignin.addEventListener('click', () => signinOverlay.style.display = 'flex');
openLogin.addEventListener('click', () => loginOverlay.style.display = 'flex');



// CLOSE BUTTONS

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const overlayId = btn.dataset.close;
    document.getElementById(overlayId).style.display = 'none';
  });
});

// CLOSE WHEN CLICKING OUTSIDE POPUP
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('overlay')) {
    e.target.style.display = 'none';
  }
});



// SIGN IN VALIDATION

signInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const first = firstNameInput.value.trim();
  const last = lastNameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const email = emailInput.value.trim();

  if (first.length < 3 || last.length < 3) {
    alert("First and Last name must be at least 3 characters.");
    return;
  }

  if (!/^[0-9]{8}$/.test(mobile)) {
    alert("Mobile must be exactly 8 digits.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Enter a valid email.");
    return;
  }

  alert("Sign-In successful!");
  signinOverlay.style.display = 'none';
  signInForm.reset();
});



// LOGIN VALIDATION

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmailInput.value.trim();
  const pass = loginPasswordInput.value.trim();

  if (pass.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  alert("Login successful!");
  loginOverlay.style.display = 'none';
  loginForm.reset();
});



// bookmark or saving with the localstorage 
const icons = document.querySelectorAll('.bookmark-icon');

icons.forEach(icon => {
  let id = icon.getAttribute('data-id');

  // لو موجود في التخزين → يرجع Saved
  if (localStorage.getItem(id) === "saved") {
    icon.classList.add("saved");
    icon.classList.remove("bi-bookmark");
    icon.classList.add("bi-bookmark-fill");
  }

  icon.addEventListener('click', () => {
    if (icon.classList.contains("saved")) {
      icon.classList.remove("saved");
      icon.classList.remove("bi-bookmark-fill");
      icon.classList.add("bi-bookmark");
      localStorage.removeItem(id);
    } else {
      icon.classList.add("saved");
      icon.classList.remove("bi-bookmark");
      icon.classList.add("bi-bookmark-fill");
      localStorage.setItem(id, "saved");
    }
  });
});

