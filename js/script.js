
// BOOK YOUR SESSION 

document.querySelectorAll(".book-session").forEach(btn => {
    btn.addEventListener("click", () => {
        const teacherId = btn.dataset.id;
        window.location.href = "session.html?id=" + teacherId;
    });
});



// search bar 
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card-horizontal");

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const teacherName = card.querySelector("h3").textContent.toLowerCase();

    if (teacherName.includes(value)) {
      card.style.display = "flex"; // يظهر
    } else {
      card.style.display = "none"; // يختفي
    }
  });
});
