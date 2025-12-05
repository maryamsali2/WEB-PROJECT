// ============================
// GET TEACHER ID FROM URL
// ============================
const params = new URLSearchParams(window.location.search);
const teacherId = params.get("id");

// ============================
// TEACHERS DATA
// ============================
const teachers = {
  "aqeela-Mohammed": {
    name: "Aqeela Mohammed",
    img: "./img/aqeelaMohammed.jpg",
    grade: "Primary School",
    phone: "+973 3884 5298",

    subjects: {
      "Arabic": [
        { day: "Monday", times: ["4:00 PM"] },
        { day: "Wednesday", times: ["3:00 PM", "5:30 PM"] }
      ],
      "Islamic Education": [
        { day: "Saturday", times: ["10:00 AM", "4:00 PM"] }
      ]
    }
  },

  "zainab-Alsaegh": {
    name: "Zainab Alsaegh",
    img: "./img/zainabAlsaegh.jpeg",
    grade: "Primary School",
    phone: "+973 3922 3344",

    subjects: {
      "Arabic": [
        { day: "Tuesday", times: ["4:00 PM", "6:00 PM"] }
      ]
    }
  },

  "Sajeda": {
    name: "Sajeda Abdulla",
    img: "./img/sajedaAbdulla.jpeg",
    grade: "Grades 7–12",
    phone: "+973 3399 8877",

    subjects: {
      "Musical Arts": [
        { day: "Sunday", times: ["1:00 PM", "2:30 PM"] },
        { day: "Tuesday", times: ["1:45 PM", "2:30 PM", "4:00 PM"] },
      ]
    }
  },

  "maryam-ali": {
    name: "Maryam Ali",
    img: "./img/maryamAli.jpeg",
    grade: "Primary School",
    phone: "+973 3965 9374",

    subjects: {
      "Arabic": [
        { day: "Monday", times: ["1:00 PM", "3:00 PM", "7:00 PM"] },
        { day: "Wednesday", times: ["5:00 PM", "5:45 PM"] }
      ]
    }
  },

  "sadeq-Aljadd": {
    name: "Sadeq Ajadd",
    img: "./img/sadeqAljadd.jpeg",
    grade: "Primary School",
    phone: "+973 3892 7474",

    subjects: {
      "Arabic": [
        { day: "Sunday", times: ["3:00 PM", "4:00 PM"] }
      ],
      "Social-studies": [
        { day: "Tuesday", times: ["5:00 PM", "6:00 PM"] }
      ],
      "Islamic Education": [
        { day: "Thursday", times: ["4:00 PM", "5:00 PM"] }
      ]
    }
  },

  "essa-abbas": {
    name: "Essa Abbas Shaheen",
    img: "./img/eissaAbbas.jpeg",
    grade: "University & Professional",
    phone: "+973 3665 5223",

    subjects: {
      "Business Administration": [
        { day: "Monday", times: ["4:00 PM", "7:00 PM"] }
      ],
      "Marketing": [
        { day: "Thursday", times: ["3:00 PM", "6:30 PM"] }
      ],
      "Human Resources": [
        { day: "Thursday", times: ["7:00 PM"] }
      ]
    }
  }
};

// ============================
// PAGE ELEMENTS
// ============================
const teacherImg = document.getElementById("teacherImg");
const teacherName = document.getElementById("teacherName");
const teacherGrade = document.getElementById("teacherGrade");
const teacherPhone = document.getElementById("teacherPhone");
const subjectSelect = document.getElementById("subjectSelect");
const scheduleBody = document.getElementById("scheduleBody");
const bookBtn = document.getElementById("bookBtn");
const studentEmail = document.getElementById("studentEmail");

// ============================
// LOAD TEACHER DATA
// ============================
const teacher = teachers[teacherId];

if (!teacher) {
  teacherName.textContent = "Teacher not found";
  throw new Error("Invalid ID");
}

// Fill teacher data
teacherImg.src = teacher.img;
teacherName.textContent = teacher.name;
teacherGrade.textContent = teacher.grade;
teacherPhone.textContent = teacher.phone;

// ============================
// FILL SUBJECT DROPDOWN
// ============================
Object.keys(teacher.subjects).forEach(sub => {
  const option = document.createElement("option");
  option.value = sub;
  option.textContent = sub;
  subjectSelect.appendChild(option);
});

// ============================
// LOAD SCHEDULE WHEN SUBJECT CHANGES
// ============================
let selectedSubject = "";
let selectedDay = "";
let selectedTime = "";

subjectSelect.addEventListener("change", () => {
  selectedSubject = subjectSelect.value;
  loadSchedule(selectedSubject);
});

function loadSchedule(subjectName) {
  scheduleBody.innerHTML = ""; // clear table

  teacher.subjects[subjectName].forEach(row => {
    row.times.forEach(time => {
      const tr = document.createElement("tr");
      tr.classList.add("session-row");

      tr.innerHTML = `
        <td>${row.day}</td>
        <td>${time}</td>
      `;

      tr.addEventListener("click", () => selectTime(row.day, time, tr));
      scheduleBody.appendChild(tr);
    });
  });
}

function selectTime(day, time, rowElement) {
  document.querySelectorAll(".session-row").forEach(r => r.classList.remove("selected"));
  rowElement.classList.add("selected");

  selectedDay = day;
  selectedTime = time;
}


// ============================
// BOOK BUTTON
// ============================
bookBtn.addEventListener("click", () => {

  // Check login status
  const loggedIn = localStorage.getItem("userLoggedIn");

  console.log("User Logged In Value:", loggedIn);

  // If NULL or FALSE → user not logged in
  if (loggedIn !== "true") {
    alert("⚠️ You must be logged in before booking a session.");

    // OPTIONAL: redirect user to login page
    window.location.href = "home.html"; 
    return;
  }

  // Check if user selected required fields
  if (!selectedSubject || !selectedDay || !selectedTime) {
    alert("Please select a subject, day, and time before booking.");
    return;
  }

  // SUCCESS
  alert(
    `🎉 Booking Confirmed!\n\nTeacher: ${teacher.name}\nSubject: ${selectedSubject}\nDay: ${selectedDay}\nTime: ${selectedTime}`
  );
});
