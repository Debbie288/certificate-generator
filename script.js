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
            certNumber = 'CERT-' + year + '-' + random;
        }

        const dateObj = new Date(completionDate + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const verifyURL = 'https://debbie288.github.io/certificate-generator/verify.html?cert=' + encodeURIComponent(certNumber);
        const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(verifyURL);

        const certificateHTML = `
            <div style="width:100%; max-width:900px; margin:0 auto; background:#FDF8F0; border:12px solid #0A1628; padding:18px; box-sizing:border-box; font-family:Georgia, serif; color:#0A1628; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="border:3px solid #C9A227; height:100%; padding:25px 40px; box-sizing:border-box; text-align:center; position:relative; z-index:1;">
                    <div style="width:100px; height:100px; border-radius:50%; background:#0A1628; border:3px solid #C9A227; display:flex; align-items:center; justify-content:center; margin:0 auto;">
                        <span style="color:#C9A227; font-size:45px; font-weight:bold;">X</span>
                    </div>
                    <div style="font-size:14px; letter-spacing:2px; margin-bottom:8px; text-transform:uppercase; color:#555;">${institutionName}</div>
                    <h1 style="font-size:32px; margin:10px 0 6px; letter-spacing:2px; color:#0A1628;">CERTIFICATE OF COMPLETION</h1>
                    <div style="width:180px; height:2px; background:#C9A227; margin:0 auto 12px;"></div>
                    <p style="font-size:13px; margin:8px 0;">THIS IS TO CERTIFY THAT</p>
                    <h2 style="font-size:34px; margin:10px 0; color:#0A1628; font-style:italic;">${studentName}</h2>
                    <p style="font-size:14px; margin:6px 0;">HAS SUCCESSFULLY COMPLETED THE COURSE IN</p>
                    <h3 style="font-size:20px; margin:6px 0 14px; color:#C9A227; font-weight:bold;">${courseName}</h3>
                    <p style="font-size:13px; margin-bottom:25px;">AWARDED ON ${formattedDate}</p>

                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:10px; padding:0 10px;">
                        <div style="text-align:left; font-size:12px;"><div>CERTIFICATE NO.</div><div style="font-weight:bold; margin-top:4px;">${certNumber}</div></div>
                        <div style="text-align:center;"><img src="${qrCodeUrl}" style="width:90px; height:90px; margin:0 auto 5px; display:block;" /><div style="font-size:10px;">OFFICIAL VERIFICATION</div></div>
                        <div style="text-align:center;"><div style="font-family:'Brush Script MT', cursive; font-size:22px; margin-bottom:2px; color:#0A1628;">${directorName}</div><div style="width:110px; height:1px; background:#0A1628; margin:0 auto 4px;"></div><div style="font-size:11px;">AUTHORIZED SIGNATORY</div></div>
                    </div>
                </div>
            </div>
        `;

        certificatePreview.innerHTML = certificateHTML;
        previewArea.style.display = 'block';
        certificatePreview.scrollIntoView({ behavior: 'smooth' });

        try {
            const { error } = await supabase.from('certificates').insert([
                { student_name: studentName, course_name: courseName, completion_date: completionDate, cert_number: certNumber, institution: institutionName, director: directorName }
            ]);

            if (error) {
                console.error('Error saving:', error);
                alert('⚠️ Certificate generated, but NOT saved to database.');
            } else {
                alert('✅ Certificate generated and saved successfully!');
            }
        } catch (err) {
            alert('❌ Unexpected error: ' + err.message);
        }
    });
});
