const container = document.getElementById("sessionsContainer");

// 🔒 أول شيء: إذا مو مسجّل دخول → رجّعيه للهوم
const loggedIn = localStorage.getItem("userLoggedIn");
if (loggedIn !== "true") {
  alert("⚠️ You must login first to view your bookings.");
  window.location.href = "home.html";
}

// نجيب اليوزر الحالي من localStorage
const currentUser = localStorage.getItem("currentUser");

// نقرأ كل الحجوزات من localStorage
const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

// نفلتر حجوزات هذا اليوزر فقط
const userBookings = allBookings.filter(b => b.email === currentUser);

// لو ما فيه حجوزات
if (userBookings.length === 0) {
  container.innerHTML = `
    <p class="no-bookings">You have no bookings yet. Book a session first.</p>
  `;
} else {
 
userBookings.forEach((b, index) => {
  container.innerHTML += `
    <div class="session-card">
      <img src="${b.img}" class="teacher-photo">

      <p><strong>Teacher:</strong> ${b.teacher}</p>
      <p><strong>Subject:</strong> ${b.subject}</p>
      <p><strong>Day:</strong> ${b.day}</p>
      <p><strong>Time:</strong> ${b.time}</p>

      <button class="delete-btn" data-index="${index}">Delete</button>
    </div>
  `;
});


  // DELETE BOOKING
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const bookingToDelete = userBookings[index];

      // نحذف من allBookings بناءً على البيانات
      const updatedBookings = allBookings.filter(b => {
        return !(
          b.email === bookingToDelete.email &&
          b.teacher === bookingToDelete.teacher &&
          b.subject === bookingToDelete.subject &&
          b.day === bookingToDelete.day &&
          b.time === bookingToDelete.time
        );
      });

      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      alert("Booking deleted successfully!");
      location.reload();
    });
  });
}
