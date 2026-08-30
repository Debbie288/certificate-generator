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
    let certNumber = document.getElementById('certNumber').value.trim();
    const directorName = document.getElementById('directorName').value.trim();
    const template = document.getElementById('templateSelect').value;

    // Auto-generate certificate number if left blank
    if (!certNumber) {
      const date = new Date();
      const year = date.getFullYear();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      certNumber = `CERT-${year}-${random}`;
    }

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

    // Template styles
    let templateStyles = {
      border: '12px double #1e293b',
      bgColor: '#ffffff',
      titleColor: '#1e293b',
      nameColor: '#2563eb',
      accentColor: '#2563eb',
      shadow: '0 4px 12px rgba(0,0,0,0.1)'
    };

    if (template === 'gold') {
      templateStyles = {
        border: '12px double #FFD700',
        bgColor: '#fefcf0',
        titleColor: '#8B6914',
        nameColor: '#B8860B',
        accentColor: '#FFD700',
        shadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
      };
    } else if (template === 'modern') {
      templateStyles = {
        border: '12px solid #2563eb',
        bgColor: '#f0f7ff',
        titleColor: '#1e293b',
        nameColor: '#2563eb',
        accentColor: '#2563eb',
        shadow: '0 4px 20px rgba(37, 99, 235, 0.2)'
      };
    } else if (template === 'elegant') {
      templateStyles = {
        border: '12px solid #ec4899',
        bgColor: '#fdf2f8',
        titleColor: '#831843',
        nameColor: '#be185d',
        accentColor: '#ec4899',
        shadow: '0 4px 20px rgba(236, 72, 153, 0.2)'
      };
    }

    // Generate QR Code URL
    const qrData = `https://debbie288.github.io/certificate-generator/verify.html?cert=${certNumber}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

    // Certificate HTML with all features
    const certificateHTML = `
      <div style="
        border: ${templateStyles.border};
        padding: 2.5rem;
        max-width: 800px;
        margin: 0 auto;
        background: ${templateStyles.bgColor};
        text-align: center;
        font-family: 'Times New Roman', serif;
        border-radius: 8px;
        box-shadow: ${templateStyles.shadow};
      ">
        <!-- Logo -->
        ${uploadedLogo ? `<img src="${uploadedLogo}" alt="Logo" style="max-width: 120px; max-height: 80px; margin-bottom: 1rem;" />` : ''}
        
        <!-- Institution Name -->
        <h1 style="font-size: 2rem; color: ${templateStyles.titleColor}; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 2px;">${institutionName}</h1>
        <p style="font-size: 1rem; color: #64748b; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Certificate of Completion</p>
        
        <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 0.5rem;">This certificate is proudly awarded to</p>
        <h2 style="font-size: 2.8rem; color: ${templateStyles.nameColor}; margin: 0.5rem 0; border-bottom: 3px solid ${templateStyles.accentColor}; padding-bottom: 0.5rem; display: inline-block;">${studentName}</h2>
        
        <p style="font-size: 1.1rem; margin: 1.5rem 0;">for successfully completing</p>
        <h3 style="font-size: 2rem; color: ${templateStyles.titleColor}; margin: 0.5rem 0;">${courseName}</h3>
        
        <p style="font-size: 1rem; margin: 1.5rem 0;">on</p>
        <p style="font-size: 1.3rem; font-weight: bold; color: ${templateStyles.titleColor};">${formattedDate}</p>
        
        <!-- Certificate Number -->
        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #64748b;">Certificate Number: ${certNumber}</p>
        
        <!-- NEW: QR Code -->
        <div style="margin-top: 1rem;">
          <img src="${qrCodeUrl}" alt="QR Code" style="max-width: 120px; max-height: 120px;" />
          <p style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.25rem;">Scan to verify</p>
        </div>
        
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
        
        <!-- "Powered by" inside certificate -->
        <p style="margin-top: 1.5rem; font-size: 0.7rem; color: #94a3b8;">
          Verified at: debbie288.github.io/certificate-generator/verify?cert=${certNumber}
        </p>
        
        <button onclick="window.print()" style="
          margin-top: 2rem;
          padding: 0.8rem 2rem;
          background: ${templateStyles.accentColor};
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s;
        ">
          🖨️ Print / Save as PDF
        </button>
      </div>
    `;

    // Show preview
    certificatePreview.innerHTML = certificateHTML;
    previewArea.style.display = 'block';

    // Scroll to preview
    previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 🔴 NEW: Save to Supabase (uncomment when Supabase is set up)
    /*
    // For Supabase, add this code after generating the certificate
// Save to Supabase
const supabaseUrl = 'https://ovnlwzfwlepsewymlvdy.supabase.co';
const supabaseKey = 'sb_publishable_Q8vbLCgokanKi2OTCsFiag_Ad9bV5ts';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function saveCertificate() {
  const studentName = document.getElementById('studentName').value;
  const courseName = document.getElementById('courseName').value;
  const completionDate = document.getElementById('completionDate').value;
  const certNumber = document.getElementById('certNumber').value;
  const institutionName = document.getElementById('institutionName').value;
  const directorName = document.getElementById('directorName').value;

  const { error } = await supabase
    .from('certificates')
    .insert([
      {
        student_name: studentName,
        course_name: courseName,
        completion_date: completionDate,
        cert_number: certNumber,
        institution: institutionName,
        director: directorName
      }
    ]);
    
  if (error) console.error('Error saving:', error);
  else console.log('Certificate saved!');
}
