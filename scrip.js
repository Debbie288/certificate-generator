// ==========================================
// SUPABASE SETUP
// ==========================================

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


// ==========================================
// CERTIFICATE GENERATOR
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const form =
        document.getElementById('certificateForm');

    const previewArea =
        document.getElementById('previewArea');

    const certificatePreview =
        document.getElementById('certificatePreview');

    const logoUpload =
        document.getElementById('logoUpload');

    let uploadedLogo = '';


    // ==========================================
    // CHECK IMPORTANT ELEMENTS
    // ==========================================

    if (!form || !certificatePreview) {

        alert(
            '❌ Certificate form could not be loaded.'
        );

        return;
    }


    // ==========================================
    // LOGO UPLOAD
    // ==========================================

    if (logoUpload) {

        logoUpload.addEventListener(
            'change',
            function (event) {

                const file =
                    event.target.files[0];

                if (!file) return;

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


    // ==========================================
    // FORM SUBMISSION
    // ==========================================

    form.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            try {

                // ==========================================
                // GET FORM VALUES
                // ==========================================

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


                // ==========================================
                // VALIDATION
                // ==========================================

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


                // ==========================================
                // GENERATE CERTIFICATE NUMBER
                // ==========================================

                if (!certNumber) {

                    const year =
                        new Date().getFullYear();

                    const random =
                        Math.floor(
                            Math.random() * 10000
                        )
                        .toString()
                        .padStart(4, '0');

                    certNumber =
                        'CERT-' +
                        year +
                        '-' +
                        random;
                }


                // ==========================================
                // FORMAT DATE
                // ==========================================

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


                // ==========================================
                // TEMPLATE DESIGN
                // ==========================================

                let borderColor =
                    '#b8860b';

                let bgColor =
                    '#fffdf5';

                let titleColor =
                    '#6b4f0a';

                let nameColor =
                    '#9a6b00';

                let accentColor =
                    '#d4af37';

                let secondaryColor =
                    '#7c6f57';


                if (template === 'modern') {

                    borderColor =
                        '#1d4ed8';

                    bgColor =
                        '#f8fbff';

                    titleColor =
                        '#172554';

                    nameColor =
                        '#1d4ed8';

                    accentColor =
                        '#2563eb';

                    secondaryColor =
                        '#64748b';
                }


                else if (template === 'elegant') {

                    borderColor =
                        '#9d174d';

                    bgColor =
                        '#fff8fb';

                    titleColor =
                        '#701a3a';

                    nameColor =
                        '#be185d';

                    accentColor =
                        '#db2777';

                    secondaryColor =
                        '#7c5264';
                }


                // ==========================================
                // QR CODE
                // ==========================================

                const verifyURL =
                    'https://debbie288.github.io/certificate-generator/verify.html?cert=' +
                    encodeURIComponent(certNumber);

                const qrCodeURL =
                    'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' +
                    encodeURIComponent(verifyURL);


                // ==========================================
                // LOGO
                // ==========================================

                const logoHTML =
                    uploadedLogo
                        ? `
                            <img
                                src="${uploadedLogo}"
                                alt="Institution Logo"
                                style="
                                    width:90px;
                                    height:90px;
                                    object-fit:contain;
                                    margin-bottom:12px;
                                "
                            >
                        `
                        :
                        `
                            <div style="
                                width:72px;
                                height:72px;
                                margin:0 auto 12px;
                                border:2px solid ${accentColor};
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-size:32px;
                                color:${accentColor};
                            ">
                                ★
                            </div>
                        `;


                // ==========================================
                // CERTIFICATE HTML
                // ==========================================

                const certificateHTML = `

                    <div style="
                        max-width:900px;
                        margin:20px auto;
                        padding:12px;
                        background:${accentColor};
                        box-shadow:
                            0 10px 35px
                            rgba(0,0,0,0.18);
                    ">

                        <div style="
                            position:relative;
                            background:${bgColor};
                            border:3px solid ${borderColor};
                            padding:45px 50px;
                            text-align:center;
                            font-family:
                                Georgia,
                                'Times New Roman',
                                serif;
                        ">


                            <!-- Decorative Border -->

                            <div style="
                                position:absolute;
                                top:12px;
                                left:12px;
                                right:12px;
                                bottom:12px;
                                border:
                                    1px solid
                                    ${accentColor};
                                pointer-events:none;
                            "></div>


                            <!-- Logo -->

                            ${logoHTML}


                            <!-- Institution -->

                            <div style="
                                font-size:14px;
                                letter-spacing:4px;
                                text-transform:uppercase;
                                color:${secondaryColor};
                                margin-bottom:10px;
                            ">
                                ${institutionName}
                            </div>


                            <!-- Main Title -->

                            <h1 style="
                                margin:5px 0;
                                font-size:42px;
                                letter-spacing:3px;
                                text-transform:uppercase;
                                color:${titleColor};
                                font-weight:700;
                            ">
                                Certificate
                            </h1>


                            <div style="
                                font-size:18px;
                                letter-spacing:5px;
                                text-transform:uppercase;
                                color:${accentColor};
                                margin-bottom:28px;
                            ">
                                of Completion
                            </div>


                            <!-- Award Text -->

                            <p style="
                                font-size:16px;
                                color:${secondaryColor};
                                margin:10px 0;
                            ">
                                This certificate is proudly
                                presented to
                            </p>


                            <!-- Student Name -->

                            <h2 style="
                                margin:15px 0 8px;
                                font-size:38px;
                                color:${nameColor};
                                font-weight:700;
                            ">
                                ${studentName}
                            </h2>


                            <div style="
                                width:65%;
                                height:2px;
                                background:${accentColor};
                                margin:0 auto 22px;
                            "></div>


                            <!-- Course -->

                            <p style="
                                font-size:16px;
                                color:${secondaryColor};
                                margin-bottom:10px;
                            ">
                                for successfully completing
                            </p>


                            <h3 style="
                                font-size:25px;
                                color:${titleColor};
                                margin:8px 0 22px;
                                font-weight:600;
                            ">
                                ${courseName}
                            </h3>


                            <!-- Date -->

                            <p style="
                                font-size:14px;
                                color:${secondaryColor};
                                margin-bottom:5px;
                            ">
                                Completed on
                            </p>


                            <p style="
                                font-size:18px;
                                font-weight:bold;
                                color:${titleColor};
                                margin-bottom:22px;
                            ">
                                ${formattedDate}
                            </p>


                            <!-- =====================================
                                 PROFESSIONAL SIGNATURE / QR SECTION
                                 ===================================== -->

                            <div style="
                                display:flex;
                                justify-content:space-between;
                                align-items:flex-end;
                                gap:30px;
                                margin-top:30px;
                            ">


                                <!-- Director Signature -->

                                <div style="
                                    flex:1;
                                    text-align:center;
                                ">

                                    <div style="
                                        font-family:cursive;
                                        font-size:24px;
                                        font-style:italic;
                                        color:#222;
                                        margin-bottom:6px;
                                    ">
                                        ${directorName}
                                    </div>

                                    <div style="
                                        border-top:
                                            1px solid #555;
                                        padding-top:7px;
                                        font-size:12px;
                                        color:${secondaryColor};
                                    ">
                                        Authorized Director
                                    </div>

                                </div>


                                <!-- QR CODE -->

                                <div style="
                                    width:150px;
                                    text-align:center;
                                ">

                                    <img
                                        src="${qrCodeURL}"
                                        alt="
                                            Certificate
                                            Verification QR Code
                                        "
                                        style="
                                            width:105px;
                                            height:105px;
                                            display:block;
                                            margin:
                                                0 auto 5px;
                                        "
                                    >

                                    <div style="
                                        font-size:9px;
                                        color:${secondaryColor};
                                        letter-spacing:1px;
                                    ">
                                        SCAN TO VERIFY
                                    </div>

                                </div>


                                <!-- Certificate ID -->

                                <div style="
                                    flex:1;
                                    text-align:center;
                                ">

                                    <div style="
                                        font-size:14px;
                                        font-weight:bold;
                                        color:${titleColor};
                                        margin-bottom:8px;
                                    ">
                                        ${certNumber}
                                    </div>

                                    <div style="
                                        border-top:
                                            1px solid #555;
                                        padding-top:7px;
                                        font-size:12px;
                                        color:${secondaryColor};
                                    ">
                                        Certificate ID
                                    </div>

                                </div>

                            </div>


                            <!-- Verification URL -->

                            <p style="
                                margin-top:25px;
                                font-size:9px;
                                color:#999;
                                word-break:break-all;
                            ">
                                Verify authenticity:
                                debbie288.github.io/
                                certificate-generator/
                                verify.html?cert=${certNumber}
                            </p>


                            <!-- Print Button -->

                            <button
                                type="button"
                                id="printCertificateButton"
                                style="
                                    margin-top:20px;
                                    padding:12px 25px;
                                    background:${acce
