document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('certificateForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const courseName = document.getElementById('courseName').value.trim();
    const completionDate = document.getElementById('completionDate').value;
    const certNumber = document.getElementById('certNumber').value.trim();

    if (!studentName || !courseName || !completionDate) {
      alert('Please fill in all required fields (*).');
      return;
    }

    console.log('🎓 Certificate Data:');
    console.log('Student:', studentName);
    console.log('Course:', courseName);
    console.log('Date:', completionDate);
    console.log('Certificate Number:', certNumber || '(not provided)');

    alert('Certificate data logged! Check the browser console (F12).');
  });
});
