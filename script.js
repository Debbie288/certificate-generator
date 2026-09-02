// ============================================================
// XYLARION CERTIFICATE GENERATOR
// Professional Certificate Design
// Supabase + QR Verification + Logo Upload + Print/PDF
// ============================================================


// ============================================================
// SUPABASE SETUP
// ============================================================

const supabaseUrl =
    'https://gdophhworvapqctpmyia.supabase.co';

const supabaseKey =
    'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === 'function'
) {
    supabaseClient = window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );
}


// ============================================================
// SAFE HTML TEXT
// ============================================================

function escapeHTML(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


// ============================================================
// MAIN
// ============================================================

document.addEventListener(
    'DOMContentLoaded',
    function () {

        const form =
            document.getElementById('certificateForm');

        const previewArea =
            document.getElementById('previewArea');

        const certificatePreview =
            document.getElementById('certificatePreview');

        const logoUpload =
            document.getElementById('logoUpload');

        let uploadedLogo = '';


        // ========================================================
        // CHECK FORM
        // ========================================================

        if (!form || !certificatePreview) {

            alert(
                '❌ Certificate form could not be loaded.'
            );

            return;
        }


        // ========================================================
        // LOGO UPLOAD
        // ========================================================

        if (logoUpload) {

            logoUpload.addEventListener(
                'change',
                function (event) {

                    const file =
                        event.target.files[0];

                    if (!file) return;

                    if (!file.type.startsWith('image/')) {

                        alert(
                            '⚠️ Please upload an image file for the logo.'
                        );

                        return;
                    }

                    const reader =
                        new FileReader();

                    reader.onload =
                        function (e) {

                            uploadedLogo =
                                e.target.result;
                        };

                    reader.readAsDataURL(file);
                }
            );
        }


        // ========================================================
        // SUBMIT
        // ========================================================

        form.addEventListener(
            'submit',
            async function (event) {

                event.preventDefault();


                try {


                    // ====================================================
                    // GET VALUES
                    // ====================================================

                    const institutionName =
                        document
                            .getElementById('institutionName')
                            ?.value
                            .trim() || '';


                    const studentName =
                        document
                            .getElementById('studentName')
                            ?.value
                            .trim() || '';


                    const courseName =
                        document
                            .getElementById('courseName')
                            ?.value
                            .trim() || '';


                    const completionDate =
                        document
                            .getElementById('completionDate')
                            ?.value || '';


                    let certNumber =
                        document
                            .getElementById('certNumber')
                            ?.value
                            .trim() || '';


                    const directorName =
                        document
                            .getElementById('directorName')
                            ?.value
                            .trim() || '';


                    const template =
                        document
                            .getElementById('templateSelect')
                            ?.value || 'gold';


                    // ====================================================
                    // VALIDATION
                    // ====================================================

                    if (
                        !institutionName ||
                        !studentName ||
                        !courseName ||
                        !completionDate ||
                        !directorName
                    ) {

                        alert(
                            '⚠️ Please fill in Institution, Student Name, Course, Completion Date and Director.'
                        );

                        return;
                    }


                    // ====================================================
                    // CERTIFICATE NUMBER
                    // ====================================================

                    if (!certNumber) {

                        const year =
                            new Date().getFullYear();

                        const randomNumber =
                            Math.floor(
                                Math.random() * 90000
                            ) + 10000;

                        certNumber =
                            'CERT-' +
                            year +
                            '-' +
                            randomNumber;
                    }


                    // ====================================================
                    // DATE
                    // ====================================================

                    const dateObj =
                        new Date(
                            completionDate +
                            'T00:00:00'
                        );

                    const formattedDate =
                        dateObj.toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        );


                    // ====================================================
                    // PROFESSIONAL COLORS
                    // ====================================================

                    let navy =
                        '#0A1628';

                    let gold =
                        '#C9A227';

                    let cream =
                        '#FDFBF7';

                    let softCream =
                        '#F8F1E3';

                    let gray =
                        '#555555';


                    if (template === 'modern') {

                        navy =
                            '#123A63';

                        gold =
                            '#B88A18';

                        cream =
                            '#F8FBFF';

                        softCream =
                            '#EEF5FC';

                        gray =
                            '#52606D';
                    }


                    else if (template === 'elegant') {

                        navy =
                            '#4A2032';

                        gold =
                            '#B88A18';

                        cream =
                            '#FFF9FA';

                        softCream =
                            '#F8EEF1';

                        gray =
                            '#705A63';
                    }


                    // ====================================================
                    // ESCAPE TEXT
                    // ====================================================

                    const safeInstitution =
                        escapeHTML(institutionName);

                    const safeStudent =
                        escapeHTML(studentName);

                    const safeCourse =
                        escapeHTML(courseName);

                    const safeDirector =
                        escapeHTML(directorName);

                    const safeCertNumber =
                        escapeHTML(certNumber);


                    // ====================================================
                    // VERIFICATION URL
                    // ====================================================

                    const verifyURL =
                        'https://debbie288.github.io/certificate-generator/verify.html?cert=' +
                        encodeURIComponent(certNumber);


                    // ====================================================
                    // QR CODE
                    // ====================================================

                    const qrCodeURL =
                        'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' +
                        encodeURIComponent(verifyURL);


                    // ====================================================
                    // LOGO
                    //
                    // CUSTOMER LOGO IF UPLOADED
                    // OTHERWISE NEUTRAL CREDENTIAL EMBLEM
                    // ====================================================

                    let logoHTML = '';


                    if (uploadedLogo) {

                        logoHTML = `

                            <img
                                src="${uploadedLogo}"
                                alt="Organization Logo"
                                style="
                                    width:78px;
                                    height:78px;
                                    object-fit:contain;
                                    display:block;
                                    margin:0 auto 7px;
                                "
                            >

                        `;
                    }

                    else {

                        logoHTML = `

                            <div style="
                                width:72px;
                                height:72px;
                                margin:0 auto 7px;
                                border-radius:50%;
                                background:${navy};
                                border:4px solid ${gold};
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                box-sizing:border-box;
                            ">

                                <div style="
                                    width:54px;
                                    height:54px;
                                    border:1.5px solid ${gold};
                                    border-radius:50%;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    box-sizing:border-box;
                                ">

                                    <span style="
                                        color:${gold};
                                        font-family:Georgia, serif;
                                        font-size:31px;
                                        font-weight:bold;
                                    ">
                                        ★
                                    </span>

                                </div>

                            </div>

                        `;
                    }


                    // ====================================================
                    // CERTIFICATE
                    // ====================================================

                    const certificateHTML = `

                        <div
                            id="xylarionCertificate"
                            style="
                                width:950px;
                                height:670px;
                                max-width:100%;
                                margin:20px auto;
                                background:
                                    linear-gradient(
                                        135deg,
                                        ${cream} 0%,
                                        ${softCream} 100%
                                    );
                                border:14px solid ${navy};
                                box-sizing:border-box;
                                font-family:
                                    Georgia,
                                    'Times New Roman',
                                    serif;
                                color:${navy};
                                position:relative;
                                overflow:hidden;
                                box-shadow:
                                    0 12px 35px
                                    rgba(0,0,0,0.20);
                            "
                        >

                            <!-- ================================= -->
                            <!-- OUTER GOLD CORNERS -->
                            <!-- ================================= -->

                            <div style="
                                position:absolute;
                                top:0;
                                left:0;
                                width:90px;
                                height:90px;
                                border-top:4px solid ${gold};
                                border-left:4px solid ${gold};
                            "></div>

                            <div style="
                                position:absolute;
                                top:0;
                                right:0;
                                width:90px;
                                height:90px;
                                border-top:4px solid ${gold};
                                border-right:4px solid ${gold};
                            "></div>

                            <div style="
                                position:absolute;
                                bottom:0;
                                left:0;
                                width:90px;
                                height:90px;
                                border-bottom:4px solid ${gold};
                                border-left:4px solid ${gold};
                            "></div>

                            <div style="
                                position:absolute;
                                bottom:0;
                                right:0;
                                width:90px;
                                height:90px;
                                border-bottom:4px solid ${gold};
                                border-right:4px solid ${gold};
                            "></div>


                            <!-- ================================= -->
                            <!-- INNER BORDER -->
                            <!-- ================================= -->

                            <div style="
                                border:4px solid ${gold};
                                margin:12px;
                                height:calc(100% - 24px);
                                box-sizing:border-box;
                                position:relative;
                            ">

                                <div style="
                                    border:1.5px solid ${gold};
                                    margin:8px;
                                    height:calc(100% - 16px);
                                    padding:18px 45px;
                                    box-sizing:border-box;
                                    text-align:center;
                                    position:relative;
                                ">


                                    <!-- ================================= -->
                                    <!-- LOGO -->
                                    <!-- ================================= -->

                                    <div style="
                                        margin-bottom:2px;
                                    ">

                                        ${logoHTML}

                                    </div>


                                    <!-- ================================= -->
                                    <!-- ORGANIZATION -->
                                    <!-- ================================= -->

                                    <div style="
                                        font-family:
                                            Arial,
                                            Helvetica,
                                            sans-serif;
                                        font-size:10px;
                                        letter-spacing:3px;
                                        text-transform:uppercase;
                                        color:${gray};
                                        margin-bottom:5px;
                                    ">
                                        ${safeInstitution}
                                    </div>


                                    <!-- ================================= -->
                                    <!-- TITLE -->
                                    <!-- ================================= -->

                                    <h1 style="
                                        font-size:31px;
                                        letter-spacing:4px;
                                        margin:7px 0 5px;
                                        font-weight:normal;
                                        color:${navy};
                                    ">
                                        CERTIFICATE OF COMPLETION
                                    </h1>


                                    <div style="
                                        width:180px;
                                        height:2px;
                                        background:${gold};
                                        margin:0 auto 12px;
                                    "></div>


                                    <!-- ================================= -->
                                    <!-- INTRO -->
                                    <!-- ================================= -->

                                    <p style="
                                        font-size:14px;
                                        margin:0 0 6px;
                                        letter-spacing:1px;
                                        color:${gray};
                                    ">
                                        This is to
