const supabaseUrl = 'https://gdophhworvapqctpmyia.supabase.co';
const supabaseKey = 'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('certificateForm');
    const previewArea = document.getElementById('previewArea');
    const certificatePreview = document.getElementById('certificatePreview');

    if (!form || !certificatePreview) {
        alert('Error: Form elements not found!');
        return;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const institutionName = document.getElementById('institutionName').value.trim();
        const studentName = document.getElementById('studentName').value.trim();
        const courseName = document.getElementById('courseName').value.trim();
        const completionDate = document.getElementById('completionDate').value;
        let certNumber = document.getElementById('certNumber').value.trim();
        const directorName = document.getElementById('directorName').value.trim();

        if (!institutionName || !studentName || !courseName || !completionDate || !directorName) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!certNumber) {
            const year = new Date().getFullYear();
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            certNumber = 'XYL-' + year + '-' + random;
        }

        const dateObj = new Date(completionDate + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const verifyURL = 'https://debbie288.github.io/certificate-generator/verify.html?cert=' + encodeURIComponent(certNumber);
        const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(verifyURL);

        const certificateHTML = `
            <div style="width:100%; max-width:800px; margin:0 auto; background: #FDFBF7; border: 14px solid #0A1628; box-sizing: border-box; font-family: 'Georgia', serif; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="border: 4px solid #C9A227; margin: 10px; box-sizing: border-box;">
                    <div style="border: 1px solid #C9A227; margin: 8px; padding: 30px; box-sizing: border-box; text-align: center;">
                        <div style="width:70px; height:70px; margin:0 auto 10px; border-radius:50%; background:#0A1628; border:3px solid #C9A227; display:flex; align-items:center; justify-content:center;">
                            <span style="color:#C9A227; font-size:35px; font-weight:bold;">X</span>
                        </div>
                        <div style="font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #555; margin-bottom: 5px;">${institutionName}</div>
                        <h1 style="font-size: 28px; letter-spacing: 3px; color: #0A1628; margin: 5px 0;">CERTIFICATE OF COMPLETION</h1>
                        <div style="width: 150px; height: 2px; background: #C9A227; margin: 0 auto 15px;"></div>
                        <p style="font-size: 14px; color: #555; margin-bottom: 5px;">This is to certify that</p>
                        <h2 style="font-size: 30px; color: #0A1628; font-style: italic; margin: 5px 0;">${studentName}</h2>
                        <p style="font-size: 14px; color: #555; margin-bottom: 5px;">has successfully completed</p>
                        <h3 style="font-size: 22px; color: #0A1628; margin: 5px 0;">${courseName}</h3>
                        <p style="font-size: 13px; margin-top: 10px;">Awarded on <strong>${formattedDate}</strong></p>
                        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 25px;">
                            <div style="text-align: left; font-size: 11px;">
                                <div style="color: #555;">Certificate ID</div>
                                <div style="font-weight: bold;">${certNumber}</div>
                            </div>
                            <div style="text-align: center;">
                                <img src="${qrCodeUrl}" style="width: 80px; height: 80px;">
                                <div style="font-size: 10px; margin-top: 5px;">Scan to Verify</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color:#0A1628;">${directorName}</div>
                                <div style="width: 100px; height: 1px; background: #0A1628; margin: 0 auto;"></div>
                                <div style="font-size: 10px; margin-top: 3px;">Authorized Signatory</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        certificatePreview.innerHTML = certificateHTML;
        previewArea.style.display = 'block';
        certificatePreview.scrollIntoView({ behavior: 'smooth' });

        try {
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

            if (error) {
                console.error('Error saving:', error);
                alert('⚠️ Certificate generated, but NOT saved to database.');
            } else {
                console.log('Certificate saved!');
                alert('✅ Certificate generated and saved successfully!');
            }
        } catch (err) {
            alert('❌ Unexpected error: ' + err.message);
        }
    });
});
