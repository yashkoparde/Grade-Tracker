let profiles = [];
let exams = {};

const addProfile = () => {
  const name = document.getElementById('studentName').value.trim();
  if (name === '') {
    alert('Enter a valid name!');
    return;
  }

  profiles.push(name);
  document.getElementById('studentName').value = '';
  renderProfiles();
};

const renderProfiles = () => {
  const profilesContainer = document.getElementById('profiles');
  profilesContainer.innerHTML = profiles
    .map(
      (profile, index) =>
        `<div class="col-md-4">
          <div class="card bg-light shadow">
            <div class="card-body">
              <h5>${profile}</h5>
              <button class="btn btn-danger btn-sm mt-2" onclick="deleteProfile(${index})">Delete</button>
            </div>
          </div>
        </div>`
    )
    .join('');
};

const deleteProfile = (index) => {
  profiles.splice(index, 1);
  renderProfiles();
};

const addExam = () => {
  const examName = document.getElementById('examName').value.trim();
  const subjectName = document.getElementById('subjectName').value.trim();
  const marks = parseFloat(document.getElementById('marksObtained').value);
  const total = parseFloat(document.getElementById('totalMarks').value);

  if (!examName || !subjectName || isNaN(marks) || isNaN(total) || marks > total) {
    alert('Enter valid data!');
    return;
  }

  if (!exams[examName]) exams[examName] = [];
  exams[examName].push({ subjectName, marks, total });

  document.getElementById('examName').value = '';
  document.getElementById('subjectName').value = '';
  document.getElementById('marksObtained').value = '';
  document.getElementById('totalMarks').value = '';
  
  renderExams();
};

const renderExams = () => {
  const slabsContainer = document.getElementById('examSlabs');
  slabsContainer.innerHTML = Object.keys(exams)
    .map((exam) => {
      const subjects = exams[exam]
        .map(
          (sub, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${sub.subjectName}</td>
          <td>${sub.marks}</td>
          <td>${sub.total}</td>
          <td>${((sub.marks / sub.total) * 100).toFixed(2)}%</td>
        </tr>`
        )
        .join('');

      const totalPercentage = (
        exams[exam].reduce((sum, sub) => sum + sub.marks, 0) /
        exams[exam].reduce((sum, sub) => sum + sub.total, 0)
      ).toFixed(2);

      return `
        <div class="card shadow">
          <div class="card-header bg-info text-white">
            <h5>${exam} (Overall: ${totalPercentage}%)</h5>
          </div>
          <div class="card-body">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Total</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                ${subjects}
              </tbody>
            </table>
            <div>
              ${
                totalPercentage > 75
                  ? '<p class="text-success">🎉 Congratulations! Keep up the great work!</p>'
                  : '<p class="text-warning">⚠️ Consider focusing on weak subjects. You can do it!</p>'
              }
            </div>
          </div>
        </div>`;
    })
    .join('');
};
