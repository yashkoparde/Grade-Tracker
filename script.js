let grades = [];

const addGrade = () => {
  const subject = document.getElementById('subject').value;
  const marks = parseFloat(document.getElementById('marks').value);
  const total = parseFloat(document.getElementById('total').value);

  if (!subject || isNaN(marks) || isNaN(total) || marks > total) {
    alert('Please enter valid data!');
    return;
  }

  const percentage = ((marks / total) * 100).toFixed(2) + '%';
  grades.push({ subject, marks, total, percentage });

  renderGrades();
};

const renderGrades = () => {
  const tableBody = document.getElementById('grades-table');
  tableBody.innerHTML = grades
    .map(
      (grade, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${grade.subject}</td>
      <td>${grade.marks}</td>
      <td>${grade.total}</td>
      <td>${grade.percentage}</td>
    </tr>
  `
    )
    .join('');
};
