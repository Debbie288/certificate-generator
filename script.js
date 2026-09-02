/* =========================================================
   XYLARION CERTIFICATE GENERATOR
   PREMIUM CERTIFICATE SYSTEM
   SESSION 1 — FOUNDATION
========================================================= */


/* =========================================================
   1. SUPABASE CONNECTION
========================================================= */

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


/* =========================================================
   2. XYLARION PREMIUM DESIGN COLORS
========================================================= */

const XYLARION_DESIGN = {
    navy: '#0B1930',
    gold: '#C8A45D',
    ivory: '#FCFAF4',
    silver: '#B8BDC5'
};


/* =========================================================
   3. SAFE HTML FUNCTION
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return '';
    }

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


/* =========================================================
   4. DESIGN COLOR HELPER
========================================================= */

function xylColor(name) {

    return XYLARION_DESIGN[name] ||
           XYLARION_DESIGN.navy;
}


/* =========================================================
   5. DATE FORMATTER
========================================================= */

function formatCertificateDate(dateValue) {

    if (!dateValue) {
        return '';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


/* =========================================================
   6. CERTIFICATE NUMBER FOUNDATION
========================================================= */

function createTemporaryCertificateNumber() {

    const year = new Date().getFullYear();

    const randomNumber =
        Math.floor(Math.random() * 90000) + 10000;

    return 'CERT-' + year + '-' + randomNumber;
}


/* =========================================================
   7. VERIFICATION URL FOUNDATION
========================================================= */

function createVerificationURL(certNumber) {

    return (
        'https://debbie288.github.io/' +
        'certificate-generator/verify.html?cert=' +
        encodeURIComponent(certNumber)
    );
}


/* =========================================================
   8. QR CODE URL FOUNDATION
========================================================= */

function createQRCodeURL(certNumber) {

    const verificationURL =
        createVerificationURL(certNumber);

    return (
        'https://api.qrserver.com/v1/create-qr-code/' +
        '?size=220x220&data=' +
        encodeURIComponent(verificationURL)
    );
}


/* =========================================================
   9. DOM READY FOUNDATION
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    function () {

        console.log(
            'Xylarion Certificate Generator loaded.'
        );

        console.log(
            'Premium design foundation loaded.'
        );

    }
);
/* =========================================================
   SESSION 2 — PREMIUM CERTIFICATE FRAME
   NAVY + CHAMPAGNE GOLD + IVORY
========================================================= */


/* =========================================================
   10. PREMIUM CERTIFICATE DIMENSIONS
========================================================= */

const CERTIFICATE_WIDTH = 950;
const CERTIFICATE_HEIGHT = 670;


/* =========================================================
   11. SVG FLORAL CORNER ORNAMENT
   Original decorative design
========================================================= */

function createFloralCorner(position = 'top-left') {

    const gold = xylColor('gold');

    const transforms = {
        'top-left': 'translate(0 0)',
        'top-right': 'translate(950 0) scale(-1 1)',
        'bottom-left': 'translate(0 670) scale(1 -1)',
        'bottom-right': 'translate(950 670) scale(-1 -1)'
    };

    return `
        <g transform="${transforms[position] || transforms['top-left']}"
           fill="none"
           stroke="${gold}"
           stroke-width="2">

            <!-- Main curved stem -->
            <path d="M25 115
                     C35 88, 58 58, 95 35
                     C120 20, 145 15, 165 18" />

            <!-- Large leaf -->
            <path d="M55 72
                     C30 52, 28 27, 48 12
                     C75 22, 82 45, 55 72Z"
                  fill="${gold}"
                  opacity="0.16"/>

            <!-- Upper leaf -->
            <path d="M91 45
                     C78 20, 88 5, 108 0
                     C126 16, 120 35, 91 45Z"
                  fill="${gold}"
                  opacity="0.18"/>

            <!-- Decorative leaf -->
            <path d="M118 31
                     C115 10, 130 -2, 149 3
                     C160 18, 148 31, 118 31Z"
                  fill="${gold}"
                  opacity="0.18"/>

            <!-- Lower floral curve -->
            <path d="M30 105
                     C55 120, 82 119, 105 100
                     C126 83, 140 62, 148 40" />

            <!-- Flower -->
            <circle cx="47" cy="87" r="10"
                    fill="${gold}"
                    opacity="0.14"/>

            <circle cx="47" cy="87" r="4"
                    fill="${gold}"
                    stroke="none"/>

            <!-- Petals -->
            <path d="M47 75
                     C39 67, 30 72, 33 82
                     C36 87, 42 88, 47 87Z"
                  fill="${gold}"
                  opacity="0.20"/>

            <path d="M59 79
                     C66 70, 75 75, 71 85
                     C68 90, 60 89, 55 87Z"
                  fill="${gold}"
                  opacity="0.20"/>

            <path d="M54 96
                     C61 105, 56 113, 47 108
                     C42 104, 43 97, 47 92Z"
                  fill="${gold}"
                  opacity="0.20"/>

            <!-- Fine decorative dots -->
            <circle cx="77" cy="63" r="2"
                    fill="${gold}"
                    stroke="none"/>

            <circle cx="101" cy="51" r="2"
                    fill="${gold}"
                    stroke="none"/>

            <circle cx="128" cy="38" r="2"
                    fill="${gold}"
                    stroke="none"/>

        </g>
    `;
}


/* =========================================================
   12. ALL FOUR FLORAL CORNERS
========================================================= */

function createFloralCorners() {

    return `
        ${createFloralCorner('top-left')}
        ${createFloralCorner('top-right')}
        ${createFloralCorner('bottom-left')}
        ${createFloralCorner('bottom-right')}
    `;
}


/* =========================================================
   13. PREMIUM CERTIFICATE BORDER
========================================================= */

function createCertificateBorder() {

    const navy = xylColor('navy');
    const gold = xylColor('gold');

    return `
        <svg
            width="${CERTIFICATE_WIDTH}"
            height="${CERTIFICATE_HEIGHT}"
            viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}"
            xmlns="http://www.w3.org/2000/svg"
            style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:5;
            "
        >

            <!-- Outer navy frame -->
            <rect
                x="8"
                y="8"
                width="${CERTIFICATE_WIDTH - 16}"
                height="${CERTIFICATE_HEIGHT - 16}"
                rx="2"
                fill="none"
                stroke="${navy}"
                stroke-width="14"
            />

            <!-- Main gold border -->
            <rect
                x="25"
                y="25"
                width="${CERTIFICATE_WIDTH - 50}"
                height="${CERTIFICATE_HEIGHT - 50}"
                fill="none"
                stroke="${gold}"
                stroke-width="3"
            />

            <!-- Inner gold line -->
            <rect
                x="34"
                y="34"
                width="${CERTIFICATE_WIDTH - 68}"
                height="${CERTIFICATE_HEIGHT - 68}"
                fill="none"
                stroke="${gold}"
                stroke-width="1"
                opacity="0.75"
            />

            <!-- Decorative corner ornaments -->
            ${createFloralCorners()}

        </svg>
    `;
}


/* =========================================================
   14. CERTIFICATE BACKGROUND
========================================================= */

function createCertificateBackground() {

    const ivory = xylColor('ivory');

    return `
        <div
            style="
                position:absolute;
                inset:0;
                background:
                    radial-gradient(
                        circle at center,
                        #ffffff 0%,
                        ${ivory} 62%,
                        #F5F0E5 100%
                    );
                z-index:0;
            "
        ></div>
    `;
}


/* =========================================================
   15. PREMIUM FRAME BUILDER
========================================================= */

function createPremiumFrame() {

    return `
        ${createCertificateBackground()}
        ${createCertificateBorder()}
    `;
}


/* =========================================================
   SESSION 2 COMPLETE
========================================================= */

console.log(
    'Xylarion Session 2 premium frame loaded.'
);
/* =========================================================
   SESSION 3 — LOGO, EMBLEM & PREMIUM SEAL
========================================================= */


/* =========================================================
   16. CUSTOMER LOGO STORAGE
========================================================= */

let xylCustomerLogo = '';

let xylCustomerLogoName = '';


/* =========================================================
   17. CREATE DEFAULT PROFESSIONAL EMBLEM
   Used when the organization has no logo.
========================================================= */

function createDefaultEmblem() {

    const navy = xylColor('navy');
    const gold = xylColor('gold');

    return `
        <div
            style="
                width:82px;
                height:82px;
                border-radius:50%;
                background:${navy};
                border:4px solid ${gold};
                display:flex;
                align-items:center;
                justify-content:center;
                box-sizing:border-box;
                margin:0 auto;
                box-shadow:
                    0 2px 8px rgba(0,0,0,0.12);
            "
        >

            <div
                style="
                    width:62px;
                    height:62px;
                    border-radius:50%;
                    border:1.5px solid ${gold};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-sizing:border-box;
                "
            >

                <div
                    style="
                        text-align:center;
                        color:${gold};
                        font-family:Georgia, 'Times New Roman', serif;
                        font-size:26px;
                        line-height:1;
                        font-weight:bold;
                    "
                >
                    ✦
                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   18. CREATE CUSTOMER LOGO
========================================================= */

function createCustomerLogo() {

    if (!xylCustomerLogo) {

        return createDefaultEmblem();

    }

    return `
        <div
            style="
                width:100px;
                height:82px;
                display:flex;
                align-items:center;
                justify-content:center;
                margin:0 auto;
            "
        >

            <img
                src="${xylCustomerLogo}"
                alt="Issuer logo"
                style="
                    max-width:100%;
                    max-height:82px;
                    object-fit:contain;
                    display:block;
                "
            >

        </div>
    `;
}


/* =========================================================
   19. PREMIUM GOLD SEAL
========================================================= */

function createPremiumSeal() {

    const navy = xylColor('navy');
    const gold = xylColor('gold');

    return `
        <div
            style="
                width:86px;
                height:86px;
                border-radius:50%;
                background:${gold};
                display:flex;
                align-items:center;
                justify-content:center;
                box-sizing:border-box;
                box-shadow:
                    0 2px 7px rgba(0,0,0,0.15);
            "
        >

            <div
                style="
                    width:70px;
                    height:70px;
                    border-radius:50%;
                    border:2px solid ${navy};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-sizing:border-box;
                    text-align:center;
                    color:${navy};
                    font-family:Georgia, 'Times New Roman', serif;
                "
            >

                <div>

                    <div
                        style="
                            font-size:19px;
                            line-height:1;
                            margin-bottom:4px;
                        "
                    >
                        ✦
                    </div>

                    <div
                        style="
                            font-size:9px;
                            font-weight:bold;
                            letter-spacing:1.4px;
                        "
                    >
                        VERIFIED
                    </div>

                    <div
                        style="
                            font-size:7px;
                            letter-spacing:1px;
                            margin-top:3px;
                        "
                    >
                        CREDENTIAL
                    </div>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   20. ISSUER HEADER
========================================================= */

function createIssuerHeader(institutionName) {

    const navy = xylColor('navy');
    const gold = xylColor('gold');

    return `
        <div
            style="
                position:relative;
                z-index:10;
                text-align:center;
                padding-top:55px;
                padding-left:80px;
                padding-right:80px;
            "
        >

            ${createCustomerLogo()}

            <div
                style="
                    margin-top:9px;
                    color:${navy};
                    font-family:
                        Georgia,
                        'Times New Roman',
                        serif;
                    font-size:24px;
                    font-weight:bold;
                    letter-spacing:1.5px;
                    text-transform:uppercase;
                "
            >
                ${escapeHTML(institutionName || 'Organization Name')}
            </div>

            <div
                style="
                    width:100px;
                    height:2px;
                    background:${gold};
                    margin:9px auto 0;
                "
            ></div>

        </div>
    `;
}


/* =========================================================
   21. LOGO UPLOAD HANDLER
========================================================= */

function setupCustomerLogoUpload() {

    const logoInput =
        document.getElementById('logoUpload');

    if (!logoInput) {
        return;
    }

    logoInput.addEventListener(
        'change',
        function (event) {

            const file =
                event.target.files &&
                event.target.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith('image/')) {

                alert(
                    'Please select an image file for the logo.'
                );

                logoInput.value = '';
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {

                xylCustomerLogo =
                    reader.result;

                xylCustomerLogoName =
                    file.name;

                console.log(
                    'Customer logo loaded:',
                    xylCustomerLogoName
                );

            };

            reader.readAsDataURL(file);

        }
    );
}


/* =========================================================
   22. SESSION 3 INITIALIZATION
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    function () {

        setupCustomerLogoUpload();

        console.log(
            'Xylarion Session 3 logo system loaded.'
        );

    }
);


/* =========================================================
   SESSION 3 COMPLETE
========================================================= */
