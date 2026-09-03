// ==========================================================
// XYLARION LUXURY CERTIFICATE GENERATOR
// (Includes Floral Design, Circular Logo & QR Code)
// ==========================================================

const supabaseUrl = 'https://gdophhworvapqctpmyia.supabase.co';
const supabaseKey = 'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('certificateForm');
    const previewArea = document.getElementById('previewArea');
    const certificatePreview = document.getElementById('certificatePreview');
    const logoUpload = document.getElementById('logoUpload');
    let uploadedLogo = '';

    // Logo Upload (Circular)
    if (logoUpload) {
        logoUpload.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    uploadedLogo = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form Submit
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

        // Build HTML with Luxury Floral Corners & Circular Logo
        const certificateHTML = `
            <div style="width:100%; max-width:900px; margin:0 auto; background:#FDF8F0; border:12px solid #0A1628; padding:18px; box-sizing:border-box; font-family:Georgia, serif; color:#0A1628; position:relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                
                <!-- LUXURY FLORAL CORNERS (SVG) -->
                <svg width="100%" height="100%" style="position:absolute; top:0; left:0; pointer-events:none; z-index:0;">
                    <g fill="#C9A227">
                        <!-- Top Left -->
                        <path d="M0,0 L40,0 C20,10 10,20 0,40 Z" />
                        <path d="M0,0 L0,40 C10,20 20,10 40,0 Z" />
                        <circle cx="10" cy="10" r="5" fill="#0A1628" />
                        <path d="M10,10 C30,30 10,50 30,60" stroke="#C9A227" stroke-width="2" fill="none" />
                        <!-- Top Right -->
                        <path d="M900,0 L860,0 C880,10 890,20 900,40 Z" />
                        <path d="M900,0 L900,40 C890,20 880,10 860,0 Z" />
                        <circle cx="890" cy="10" r="5" fill="#0A1628" />
                        <path d="M890,10 C870,30 890,50 870,60" stroke="#C9A227" stroke-width="2" fill="none" />
                        <!-- Bottom Left -->
                        <path d="M0,636 L40,636 C20,626 10,616 0,596 Z" />
                        <path d="M0,636 L0,596 C10,616 20,626 40,636 Z" />
                        <circle cx="10" cy="626" r="5" fill="#0A1628" />
                        <path d="M10,626 C30,606 10,586 30,576" stroke="#C9A227" stroke-width="2" fill="none" />
                        <!-- Bottom Right -->
                        <path d="M900,636 L860,636 C880,626 890,616 900,596 Z" />
                        <path d="M900,636 L900,596 C890,616 880,626 860,636 Z" />
                        <circle cx="890" cy="626" r="5" fill="#0A1628" />
                        <path d="M890,626 C870,606 890,586 870,576" stroke="#C9A227" stroke-width="2" fill="none" />
                    </g>
                </svg>

                <!-- CONTENT (Above the flowers) -->
                <div style="border:3px solid #C9A227; height:100%; padding:25px 40px; box-sizing:border-box; text-align:center; position:relative; z-index:1;">

                    <!-- CIRCULAR LOGO -->
                    <div style="margin-bottom:10px;">
                        ${uploadedLogo 
                            ? `<img src="${uploadedLogo}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid #C9A227; margin:0 auto; display:block;" />` 
                            : `<div style="width:100px; height:100px; border-radius:50%; background:#0A1628; border:3px solid #C9A227; display:flex; align-items:center; justify-content:center; margin:0 auto;">
                                <span style="color:#C9A227; font-size:45px; font-weight:bold;">X</span>
                              </div>`
                        }
                    </div>

                    <div style="font-size:14px; letter-spacing:2px; margin-bottom:8px; text-transform: uppercase; color:#555;">${institutionName}</div>
                    
                    <h1 style="font-size:32px; margin:10px 0 6px; letter-spacing:2px; color:#0A1628;">CERTIFICATE OF COMPLETION</h1>
                    
                    <div style="width:180px; height:2px; background:#C9A227; margin:0 auto 12px;"></div>
                    
                    <p style="font-size:13px; margin:8px 0;">THIS IS TO CERTIFY THAT</p>
                    
                    <h2 style="font-size:34px; margin:10px 0; color:#0A1628; font-style:italic;">${studentName}</h2>
                    
                    <p style="font-size:14px; margin:6px 0;">HAS SUCCESSFULLY COMPLETED THE COURSE IN</p>
                    
                    <h3 style="font-size:20px; margin:6px 0 14px; color:#C9A227; font-weight:bold;">${courseName}</h3>
                    
                    <p style="font-size:13px; margin-bottom:25px;">AWARDED ON ${formattedDate}</p>

                    <!-- BOTTOM SECTION -->
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:10px; padding:0 10px;">
                        
                        <div style="text-align:left; font-size:12px;">
                            <div>CERTIFICATE NO.</div>
                            <div style="font-weight:bold; margin-top:4px;">${certNumber}</div>
                        </div>

                        <div style="text-align:center;">
                            <img src="${qrCodeUrl}" style="width:90px; height:90px; margin:0 auto 5px; display:block;" />
                            <div style="font-size:10px;">OFFICIAL VERIFICATION</div>
                        </div>

                        <div style="text-align:center;">
                            <div style="font-family:'Brush Script MT', cursive; font-size:22px; margin-bottom:2px; color:#0A1628;">${directorName}</div>
                            <div style="width:110px; height:1px; background:#0A1628; margin:0 auto 4px;"></div>
                            <div style="font-size:11px;">AUTHORIZED SIGNATORY</div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        // Show Preview
        certificatePreview.innerHTML = certificateHTML;
        previewArea.style.display = 'block';
        certificatePreview.scrollIntoView({ behavior: 'smooth' });

        // Save to Supabase
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
