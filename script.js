// Get stored problems or empty array
let problems = JSON.parse(localStorage.getItem("problems")) || [];

// Register student
function register() {
  localStorage.setItem("student", rname.value + "," + rpass.value);
  alert("Registered successfully");
  window.location = "index.html";
}

// Login student/teacher (simple prototype)
function login() {
  let role = document.getElementById("role").value;
  if (role === "student") window.location = "student.html";
  else window.location = "teacher.html";
}

// Post problem (visible to everyone)
function postProblem() {
  if(problem.value.trim() === "") {
    alert("Enter a problem first");
    return;
  }
  problems.push({ text: problem.value, reply: "" });
  localStorage.setItem("problems", JSON.stringify(problems));
  alert("Problem submitted");
  showProblems();
  problem.value = "";
}

// Show all problems (student view)
function showProblems() {
  let div = document.getElementById("studentProblems");
  div.innerHTML = "";
  problems.forEach(p => {
    div.innerHTML += `<div class="box">
      <b>Problem:</b> ${p.text}<br>
      <b>Reply:</b> ${p.reply || "Pending"}
    </div>`;
  });
}

// Show all problems (teacher view)
function showTeacherProblems() {
  let div = document.getElementById("teacherProblems");
  div.innerHTML = "";
  problems.forEach((p, i) => {
    div.innerHTML += `<div class="box">
      <b>Problem:</b> ${p.text}<br>
      <b>Reply:</b> ${p.reply || "Pending"}<br>
      <input placeholder="Type reply here" onchange="reply(${i}, this.value)">
    </div>`;
  });
}

// Teacher reply
function reply(i, text) {
  problems[i].reply = text;
  localStorage.setItem("problems", JSON.stringify(problems));
  showProblems(); // Update student view automatically
}

// Initialize pages
if (document.getElementById("studentProblems")) showProblems();
if (document.getElementById("teacherProblems")) showTeacherProblems();
