document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('certificateForm');
  const previewArea = document.getElementById('previewArea');
  const certificatePreview = document.getElementById('certificatePreview');
  const logoUpload = document.getElementById('logoUpload');
  let uploadedLogo = '';

  // Listen for logo upload
  logoUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedLogo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const institutionName = document.getElementById('institutionName').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const courseName = document.getElementById('courseName').value.trim();
    const completionDate = document.getElementById('completionDate').value;
    const certNumber = document.getElementById('certNumber').value.trim() || 'Auto-generated';
    const directorName = document.getElementById('directorName').value.trim();

    // Validate required fields
    if (!institutionName || !studentName || !courseName || !completionDate || !directorName) {
      alert('Please fill in all required fields (*).');
      return;
    }

    // Format date nicely
    const dateObj = new Date(completionDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Certificate HTML with logo support
    const certificateHTML = `
      <div style="
        border: 12px double #1e293b;
        padding: 2.5rem;
        max-width: 800px;
        margin: 0 auto;
        background: white;
        text-align: center;
        font-family: 'Times New Roman', serif;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      ">
        <!-- Logo -->
        ${uploadedLogo ? `<img src="${uploadedLogo}" alt="Logo" style="max-width: 120px; max-height: 80px; margin-bottom: 1rem;" />` : ''}
        
        <!-- Institution Name -->
        <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 2px;">${institutionName}</h1>
        <p style="font-size: 1rem; color: #64748b; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Certificate of Completion</p>
        
        <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 0.5rem;">This certificate is proudly awarded to</p>
        <h2 style="font-size: 2.8rem; color: #2563eb; margin: 0.5rem 0; border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem; display: inline-block;">${studentName}</h2>
        
        <p style="font-size: 1.1rem; margin: 1.5rem 0;">for successfully completing</p>
        <h3 style="font-size: 2rem; color: #1e293b; margin: 0.5rem 0;">${courseName}</h3>
        
        <p style="font-size: 1rem; margin: 1.5rem 0;">on</p>
        <p style="font-size: 1.3rem; font-weight: bold; color: #1e293b;">${formattedDate}</p>
        
        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #64748b;">Certificate Number: ${certNumber}</p>
        
        <!-- Signatures -->
        <div style="margin-top: 2rem; border-top: 2px solid #e2e8f0; padding-top: 1.5rem; display: flex; justify-content: space-around;">
          <div>
            <p style="font-weight: bold; margin-bottom: 0.5rem;">Director</p>
            <p style="font-style: italic; color: #1e293b;">${directorName}</p>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.25rem;">_____________________</p>
          </div>
          <div>
            <p style="font-weight: bold; margin-bottom: 0.5rem;">Date</p>
            <p style="font-style: italic; color: #1e293b;">${formattedDate}</p>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.25rem;">_____________________</p>
          </div>
        </div>
        
        <button onclick="window.print()" style="
          margin-top: 2rem;
          padding: 0.8rem 2rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s;
        "
        onmouseover="this.style.background='#1d4ed8'"
        onmouseout="this.style.background='#2563eb'">
          🖨️ Print / Save as PDF
        </button>
      </div>
    `;

    // Show preview
    certificatePreview.innerHTML = certificateHTML;
    previewArea.style.display = 'block';

    // Scroll to preview
    previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
