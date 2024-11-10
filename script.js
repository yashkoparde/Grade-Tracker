let profiles = JSON.parse(localStorage.getItem("profiles")) || {};
let currentProfile = null;

function createProfile() {
  const profileName = document.getElementById("profile-name").value.trim();
  if (profileName && !profiles[profileName]) {
    profiles[profileName] = [];
    localStorage.setItem("profiles", JSON.stringify(profiles));
    document.getElementById("profile-name").value = "";
    displayProfiles();
  } else {
    alert("Profile name is either empty or already exists.");
  }
}

function displayProfiles() {
  const profilesList = document.getElementById("profiles");
  profilesList.innerHTML = "";
  for (let profile in profiles) {
    const li = document.createElement("li");

    // Profile name
    const profileName = document.createElement("span");
    profileName.textContent = profile;
    profileName.onclick = () => openProfile(profile);
    li.appendChild(profileName);

    // Delete button for each profile
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-profile-button");
    deleteButton.onclick = (event) => {
      event.stopPropagation();  // Prevent opening profile on delete
      deleteProfile(profile);
    };
    li.appendChild(deleteButton);

    profilesList.appendChild(li);
  }
}

function deleteProfile(profile) {
  if (confirm(`Are you sure you want to delete the profile "${profile}"?`)) {
    delete profiles[profile];
    localStorage.setItem("profiles", JSON.stringify(profiles));
    displayProfiles();
  }
}

function openProfile(profile) {
  currentProfile = profile;
  document.getElementById("profile-section").style.display = "none";
  document.getElementById("profile-list").style.display = "none";
  document.getElementById("tracker-section").style.display = "block";
  document.getElementById("tracker-header").textContent = `${profile}'s Grades`;
  displayGrades();
}

function goBack() {
  currentProfile = null;
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("profile-list").style.display = "block";
  document.getElementById("tracker-section").style.display = "none";
}

function addGrade() {
  const exam = document.getElementById("exam-name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const grade = document.getElementById("grade").value;
  if (exam && subject && grade) {
    profiles[currentProfile].push({ exam, subject, grade: parseInt(grade), remark: "", futurePlan: "" });
    localStorage.setItem("profiles", JSON.stringify(profiles));
    document.getElementById("exam-name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("grade").value = "";
    displayGrades();
  } else {
    alert("Please fill out all fields.");
  }
}

function displayGrades() {
  const gradesTable = document.querySelector("#grades-table tbody");
  gradesTable.innerHTML = "";
  profiles[currentProfile].forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.exam}</td>
      <td>${entry.subject}</td>
      <td><input type="number" value="${entry.grade}" onchange="updateEntry(${index}, 'grade', this.value)" min="0" max="100"></td>
      <td><input type="text" value="${entry.remark}" onchange="updateEntry(${index}, 'remark', this.value)"></td>
      <td><input type="text" value="${entry.futurePlan}" onchange="updateEntry(${index}, 'futurePlan', this.value)"></td>
      <td><button class="delete-button" onclick="deleteGrade(${index})">Delete</button></td>
    `;
    gradesTable.appendChild(row);
  });
}

function updateEntry(index, field, value) {
  profiles[currentProfile][index][field] = value;
  localStorage.setItem("profiles", JSON.stringify(profiles));
}

function deleteGrade(index) {
  profiles[currentProfile].splice(index, 1);
  localStorage.setItem("profiles", JSON.stringify(profiles));
  displayGrades();
}

// Initial display of profiles
displayProfiles();
