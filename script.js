document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    const SUPABASE_URL = "https://gdophhworvapqctpmyia.supabase.co";
    const SUPABASE_KEY = "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    let logoData = "";

    /* REMOVE POWERED BY FOOTER */
    const footer = document.querySelector("footer");
    if (footer) footer.remove();

    /* PREMIUM FONTS */
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
        "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600;700&display=swap";

    document.head.appendChild(font);

    /* LOGO UPLOAD */
    logoInput?.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            logoData = "";
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = e => {
            logoData = e.target.result;
        };

        reader.readAsDataURL(file);
    });

    /* CAPITALIZE */
    function properCase(text) {

        return text
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    /* CERTIFICATE NUMBER */
    function generateNumber() {

        const year = new Date().getFullYear();
        const num = Math.floor(100000 + Math.random() * 900000);

        return `BFA-${year}-${num}`;
    }

    /* DATE */
    function formatDate(value) {

        if (!value) return "";

        return new Date(value + "T00:00:00").toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    }

    /* LOAD QR LIBRARY */
    function loadQR() {

        return new Promise((resolve, reject) => {

            if (window.QRCode) {
                resolve();
                return;
            }

            const script = document.createElement("script");

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }

    /* =========================================================
       STRONG PREMIUM GOLD FLORAL ORNAMENT
       ========================================================= */

    function flowers() {

        return `
        <svg
            viewBox="0 0 1200 850"
            preserveAspectRatio="none"
            style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:2;
            "
        >

            <defs>

                <linearGradient
                    id="goldFlower"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stop-color="#F7D889"/>
                    <stop offset="35%" stop-color="#D7AF55"/>
                    <stop offset="70%" stop-color="#C9A24E"/>
                    <stop offset="100%" stop-color="#9B7024"/>
                </linearGradient>

                <filter id="goldGlow">
                    <feGaussianBlur
                        stdDeviation="1.5"
                        result="blur"
                    />
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

            </defs>

            <g
                fill="none"
                stroke="url(#goldFlower)"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                filter="url(#goldGlow)"
            >

                <!-- =================================================
                     TOP LEFT
                     ================================================= -->

                <path d="M20 205 C45 125 105 55 235 25"/>
                <path d="M35 175 C85 150 115 95 130 25"/>
                <path d="M60 145 C35 105 40 60 75 32"/>
                <path d="M100 105 C105 65 135 35 175 20"/>

                <!-- LARGE FLOWER -->
                <g transform="translate(73 72)">

                    <ellipse
                        cx="0"
                        cy="-28"
                        rx="14"
                        ry="34"
                        fill="url(#goldFlower)"
                        opacity=".72"
                    />

                    <ellipse
                        cx="27"
                        cy="-8"
                        rx="14"
                        ry="34"
                        transform="rotate(55)"
                        fill="url(#goldFlower)"
                        opacity=".68"
                    />

                    <ellipse
                        cx="-27"
                        cy="-8"
                        rx="14"
                        ry="34"
                        transform="rotate(-55)"
                        fill="url(#goldFlower)"
                        opacity=".68"
                    />

                    <ellipse
                        cx="20"
                        cy="22"
                        rx="13"
                        ry="31"
                        transform="rotate(125)"
                        fill="url(#goldFlower)"
                        opacity=".65"
                    />

                    <ellipse
                        cx="-20"
                        cy="22"
                        rx="13"
                        ry="31"
                        transform="rotate(-125)"
                        fill="url(#goldFlower)"
                        opacity=".65"
                    />

                    <circle
                        cx="0"
                        cy="0"
                        r="10"
                        fill="#F6DC91"
                    />

                </g>

                <!-- LEAVES -->
                <path
                    d="M115 112 C80 88 62 65 70 38 C102 52 119 76 115 112Z"
                    fill="url(#goldFlower)"
                    opacity=".55"
                />

                <path
                    d="M145 78 C120 48 125 25 150 12 C170 37 167 59 145 78Z"
                    fill="url(#goldFlower)"
                    opacity=".5"
                />

                <path
                    d="M80 160 C45 145 30 120 42 96 C70 110 84 132 80 160Z"
                    fill="url(#goldFlower)"
                    opacity=".5"
                />

                <path
                    d="M155 125 C180 95 207 91 226 108 C206 132 181 139 155 125Z"
                    fill="url(#goldFlower)"
                    opacity=".55"
                />

                <!-- =================================================
                     TOP RIGHT
                     ================================================= -->

                <g transform="translate(1200 0) scale(-1 1)">

                    <path d="M20 205 C45 125 105 55 235 25"/>
                    <path d="M35 175 C85 150 115 95 130 25"/>
                    <path d="M60 145 C35 105 40 60 75 32"/>
                    <path d="M100 105 C105 65 135 35 175 20"/>

                    <g transform="translate(73 72)">

                        <ellipse
                            cx="0"
                            cy="-28"
                            rx="14"
                            ry="34"
                            fill="url(#goldFlower)"
                            opacity=".72"
                        />

                        <ellipse
                            cx="27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <ellipse
                            cx="-27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(-55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <ellipse
                            cx="20"
                            cy="22"
                            rx="13"
                            ry="31"
                            transform="rotate(125)"
                            fill="url(#goldFlower)"
                            opacity=".65"
                        />

                        <ellipse
                            cx="-20"
                            cy="22"
                            rx="13"
                            ry="31"
                            transform="rotate(-125)"
                            fill="url(#goldFlower)"
                            opacity=".65"
                        />

                        <circle
                            cx="0"
                            cy="0"
                            r="10"
                            fill="#F6DC91"
                        />

                    </g>

                    <path
                        d="M115 112 C80 88 62 65 70 38 C102 52 119 76 115 112Z"
                        fill="url(#goldFlower)"
                        opacity=".55"
                    />

                    <path
                        d="M145 78 C120 48 125 25 150 12 C170 37 167 59 145 78Z"
                        fill="url(#goldFlower)"
                        opacity=".5"
                    />

                    <path
                        d="M80 160 C45 145 30 120 42 96 C70 110 84 132 80 160Z"
                        fill="url(#goldFlower)"
                        opacity=".5"
                    />

                    <path
                        d="M155 125 C180 95 207 91 226 108 C206 132 181 139 155 125Z"
                        fill="url(#goldFlower)"
                        opacity=".55"
                    />

                </g>

                <!-- =================================================
                     BOTTOM LEFT
                     ================================================= -->

                <g transform="translate(0 850) scale(1 -1)">

                    <path d="M20 205 C45 125 105 55 235 25"/>
                    <path d="M35 175 C85 150 115 95 130 25"/>

                    <g transform="translate(73 72)">

                        <ellipse
                            cx="0"
                            cy="-28"
                            rx="14"
                            ry="34"
                            fill="url(#goldFlower)"
                            opacity=".72"
                        />

                        <ellipse
                            cx="27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <ellipse
                            cx="-27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(-55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <circle
                            cx="0"
                            cy="0"
                            r="10"
                            fill="#F6DC91"
                        />

                    </g>

                    <path
                        d="M115 112 C80 88 62 65 70 38 C102 52 119 76 115 112Z"
                        fill="url(#goldFlower)"
                        opacity=".55"
                    />

                    <path
                        d="M145 78 C120 48 125 25 150 12 C170 37 167 59 145 78Z"
                        fill="url(#goldFlower)"
                        opacity=".5"
                    />

                </g>

                <!-- =================================================
                     BOTTOM RIGHT
                     ================================================= -->

                <g transform="translate(1200 850) scale(-1 -1)">

                    <path d="M20 205 C45 125 105 55 235 25"/>
                    <path d="M35 175 C85 150 115 95 130 25"/>

                    <g transform="translate(73 72)">

                        <ellipse
                            cx="0"
                            cy="-28"
                            rx="14"
                            ry="34"
                            fill="url(#goldFlower)"
                            opacity=".72"
                        />

                        <ellipse
                            cx="27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <ellipse
                            cx="-27"
                            cy="-8"
                            rx="14"
                            ry="34"
                            transform="rotate(-55)"
                            fill="url(#goldFlower)"
                            opacity=".68"
                        />

                        <circle
                            cx="0"
                            cy="0"
                            r="10"
                            fill="#F6DC91"
                        />

                    </g>

                    <path
                        d="M115 112 C80 88 62 65 70 38 C102 52 119 76 115 112Z"
                        fill="url(#goldFlower)"
                        opacity=".55"
                    />

                    <path
                        d="M145 78 C120 48 125 25 150 12 C170 37 167 59 145 78Z"
                        fill="url(#goldFlower)"
                        opacity=".5"
                    />

                </g>

            </g>

            <!-- SMALL GOLD DECORATIVE DOTS -->

            <g fill="#C9A24E" opacity=".85">

                <circle cx="255" cy="38" r="4"/>
                <circle cx="270" cy="52" r="3"/>
                <circle cx="285" cy="66" r="4"/>

                <circle cx="945" cy="38" r="4"/>
                <circle cx="930" cy="52" r="3"/>
                <circle cx="915" cy="66" r="4"/>

                <circle cx="255" cy="812" r="4"/>
                <circle cx="270" cy="798" r="3"/>
                <circle cx="285" cy="784" r="4"/>

                <circle cx="945" cy="812" r="4"/>
                <circle cx="930" cy="798" r="3"/>
                <circle cx="915" cy="784" r="4"/>

            </g>

        </svg>
        `;
    }

    /* =========================================================
       GENERATE
       ========================================================= */

    form.addEventListener("submit", async e => {

        e.preventDefault();

        const institution = properCase(
            document.getElementById("institutionName").value
        );

        const student = properCase(
            document.getElementById("studentName").value
        );

        const course = properCase(
            document.getElementById("courseName").value
        );

        const date =
            document.getElementById("completionDate").value;

        const director = properCase(
            document.getElementById("directorName").value
        );

        let certNumber =
            document.getElementById("certNumber").value.trim();

        if (!certNumber) {
            certNumber = generateNumber();
        }

        const formattedDate = formatDate(date);

        try {

            /* SAVE TO SUPABASE FIRST */

            const { error } = await supabaseClient
                .from("certificates")
                .insert([{
                    student_name: student,
                    course_name: course,
                    completion_date: date,
                    cert_number: certNumber,
                    institution: institution,
                    director: director
                }]);

            if (error) {

                if (
                    error.code === "23505" ||
                    error.message.toLowerCase().includes("duplicate")
                ) {

                    alert(
                        "This certificate number already exists. Please use another number."
                    );

                    return;
                }

                throw error;
            }

            /* LOAD QR */

            await loadQR();

            /* VERIFICATION URL */

            const verificationURL =
                "https://debbie288.github.io/certificate-generator/verify.html?cert="
                + encodeURIComponent(certNumber);

            /* LOGO */

            const logoHTML = logoData
                ? `
                    <div class="logo">
                        <img
                            src="${logoData}"
                            alt="Institution Logo"
                        >
                    </div>
                `
                : `
                    <div class="logo">
                        <span>✦</span>
                    </div>
                `;

            /* =================================================
               CERTIFICATE
               ================================================= */

            preview.innerHTML = `

            <style>

                * {
                    box-sizing:border-box;
                }

                .certificate {

                    width:1200px;
                    height:850px;

                    position:relative;

                    overflow:hidden;

                    background:
                        radial-gradient(
                            circle at center,
                            #fffdf7 0%,
                            #faf5e8 65%,
                            #f0e6ce 100%
                        );

                    border:12px solid #071A35;

                    color:#071A35;

                    font-family:
                        "Cormorant Garamond",
                        Georgia,
                        serif;

                    -webkit-print-color-adjust:exact;
                    print-color-adjust:exact;
                }

                /* OUTER GOLD BORDER */

                .goldBorder {

                    position:absolute;

                    inset:12px;

                    border:4px solid #C9A24E;

                    pointer-events:none;

                    box-shadow:
                        inset 0 0 0 1px #E5C875;
                }

                /* INNER GOLD BORDER */

                .goldBorder2 {

                    position:absolute;

                    inset:22px;

                    border:1px solid #C9A24E;

                    pointer-events:none;
                }

                /* MAIN CONTENT */

                .content {

                    position:relative;

                    z-index:5;

                    width:100%;
                    height:100%;

                    text-align:center;

                    padding:42px 70px;

                    box-sizing:border-box;
                }

                /* LOGO */

                .logo {

                    width:112px;
                    height:112px;

                    border:3px solid #C9A24E;

                    outline:1px solid #C9A24E;

                    outline-offset:5px;

                    margin:0 auto 15px;

                    display:flex;

                    align-items:center;
                    justify-content:center;

                    background:#fffdf7;

                    overflow:hidden;
                }

                .logo img {

                    width:88px;
                    height:88px;

                    object-fit:contain;
                }

                .logo span {

                    font-size:48px;

                    color:#C9A24E;
                }

                /* INSTITUTION */

                .institution {

                    font-size:28px;

                    font-weight:700;

                    letter-spacing:5px;

                    text-transform:uppercase;
                }

                .line {

                    width:420px;

                    height:2px;

                    background:#C9A24E;

                    margin:13px auto 20px;
                }

                /* TITLE */

                .title {

                    font-size:57px;

                    font-weight:600;

                    letter-spacing:4px;

                    line-height:1;
                }

                .ornament {

                    color:#C9A24E;

                    font-size:27px;

                    font-weight:bold;

                    margin:8px 0;
                }

                .certify {

                    font-size:17px;

                    letter-spacing:4px;

                    margin-top:5px;
                }

                /* STUDENT */

                .student {

                    font-family:
                        "Great Vibes",
                        cursive;

                    font-size:70px;

                    color:#071A35;

                    margin:3px 0 0;
                }

                .studentLine {

                    width:520px;

                    height:2px;

                    background:#C9A24E;

                    margin:0 auto 12px;
                }

                .completed {

                    font-size:17px;

                    letter-spacing:3px;
                }

                .course {

                    font-size:38px;

                    color:#A27727;

                    margin-top:4px;
                }

                .awarded {

                    font-size:17px;

                    letter-spacing:2px;

                    margin-top:5px;
                }

                /* =================================================
                   BOTTOM
                   LEFT = NUMBER
                   CENTER = QR
                   RIGHT = SIGNATURE
                   ================================================= */

                .bottom {

                    position:absolute;

                    left:75px;
                    right:75px;

                    bottom:48px;

                    height:185px;

                    display:grid;

                    grid-template-columns:
                        1fr
                        210px
                        1fr;

                    grid-template-areas:
                        "number qr signature";

                    align-items:end;

                    column-gap:45px;

                    z-index:10;
                }

                /* NUMBER */

                .certNo {

                    grid-area:number;

                    text-align:center;

                    width:100%;
                }

                .smallGold {

                    color:#A27727;

                    font-size:15px;

                    font-weight:bold;

                    letter-spacing:2px;
                }

                .number {

                    font-size:20px;

                    margin-top:8px;

                    border-top:1px solid #C9A24E;

                    border-bottom:1px solid #C9A24E;

                    padding:7px;
                }

                /* QR CENTER */

                .qrBox {

                    grid-area:qr;

                    width:210px;

                    text-align:center;

                    display:flex;

                    flex-direction:column;

                    align-items:center;

                    justify-content:flex-end;
                }

                .qrFrame {

                    width:150px;

                    height:150px;

                    margin:0 auto;

                    padding:9px;

                    background:#ffffff;

                    border:3px solid #C9A24E;

                    box-shadow:
                        0 2px 8px rgba(0,0,0,.15);

                    display:flex;

                    align-items:center;

                    justify-content:center;
                }

                #qrCode {

                    width:128px;

                    height:128px;

                    display:flex;

                    align-items:center;

                    justify-content:center;
                }

                #qrCode img,
                #qrCode canvas {

                    width:128px !important;

                    height:128px !important;

                    display:block !important;
                }

                .verifyText {

                    margin-top:7px;

                    color:#A27727;

                    font-size:13px;

                    font-weight:bold;

                    letter-spacing:2px;

                    white-space:nowrap;
                }

                /* SIGNATURE RIGHT */

                .signature {

                    grid-area:signature;

                    text-align:center;

                    width:100%;

                    padding-left:10px;
                }

                .signatureName {

                    font-family:
                        "Great Vibes",
                        cursive;

                    font-size:40px;

                    border-bottom:1px solid #071A35;

                    padding-bottom:3px;

                    min-width:230px;

                    display:inline-block;
                }

                .signatureTitle {

                    margin-top:7px;

                    font-size:16px;

                    letter-spacing:2px;
                }

                /* GOLD SEAL */

                .seal {

                    position:absolute;

                    right:55px;

                    bottom:45px;

                    width:105px;

                    height:105px;

                    border-radius:50%;

                    background:
                        radial-gradient(
                            circle,
                            #f6dc91 0%,
                            #D4AE58 45%,
                            #C9A24E 65%,
                            #9B7024 100%
                        );

                    border:4px solid #C9A24E;

                    box-shadow:
                        0 3px 9px rgba(0,0,0,.2);

                    display:flex;

                    align-items:center;
                    justify-content:center;

                    z-index:20;

                    -webkit-print-color-adjust:exact;
                    print-color-adjust:exact;
                }

                .sealInner {

                    width:78px;
                    height:78px;

                    border:2px solid #071A35;

                    border-radius:50%;

                    display:flex;

                    align-items:center;
                    justify-content:center;

                    color:#071A35;

                    font-size:30px;
                }

                /* PRINT BUTTON */

                .printBtn {

                    display:block;

                    margin:25px auto;

                    padding:13px 28px;

                    border:0;

                    border-radius:8px;

                    background:#071A35;

                    color:white;

                    font-weight:bold;

                    font-size:16px;

                    cursor:pointer;
                }

                /* =================================================
                   PDF / PRINT
                   ================================================= */

                @page {

                    size:A4 landscape;

                    margin:0;
                }

                @media print {

                    html,
                    body {

                        width:297mm !important;

                        height:210mm !important;

                        margin:0 !important;

                        padding:0 !important;

                        background:white !important;

                        overflow:hidden !important;
                    }

                    body * {

                        visibility:hidden;
                    }

                    #certificatePreview,
                    #certificatePreview * {

                        visibility:visible;
                    }

                    #certificatePreview {

                        position:absolute !important;

                        left:0 !important;

                        top:0 !important;

                        width:297mm !important;

                        height:210mm !important;

                        margin:0 !important;

                        padding:0 !important;
                    }

                    .certificate {

                        position:absolute !important;

                        left:0 !important;

                        top:0 !important;

                        width:297mm !important;

                        height:210mm !important;

                        margin:0 !important;

                        overflow:hidden !important;

                        box-shadow:none !important;

                        page-break-inside:avoid !important;

                        break-inside:avoid !important;

                        -webkit-print-color-adjust:exact !important;

                        print-color-adjust:exact !important;
                    }

                    .printBtn {

                        display:none !important;
                    }
                }

            </style>

            <div class="certificate">

                <!-- GOLD BORDERS -->

                <div class="goldBorder"></div>

                <div class="goldBorder2"></div>

                <!-- STRONG GOLD FLORAL DESIGN -->

                ${flowers()}

                <div class="content">

                    <!-- CUSTOMER LOGO -->

                    ${logoHTML}

                    <!-- INSTITUTION -->

                    <div class="institution">
                        ${institution}
                    </div>

                    <div class="line"></div>

                    <!-- TITLE -->

                    <div class="title">
                        CERTIFICATE OF COMPLETION
                    </div>

                    <div class="ornament">
                        ✦ ─── ❦ ─── ✦
                    </div>

                    <!-- CERTIFICATION -->

                    <div class="certify">
                        THIS IS TO CERTIFY THAT
                    </div>

                    <!-- STUDENT -->

                    <div class="student">
                        ${student}
                    </div>

                    <div class="studentLine"></div>

                    <!-- COURSE -->

                    <div class="completed">
                        HAS SUCCESSFULLY COMPLETED THE COURSE IN
                    </div>

                    <div class="course">
                        ${course}
                    </div>

                    <div class="awarded">
                        AWARDED ON ${formattedDate.toUpperCase()}
                    </div>

                    <!-- =================================================
                         BOTTOM THREE SECTIONS
                         ================================================= -->

                    <div class="bottom">

                        <!-- LEFT -->

                        <div class="certNo">

                            <div class="smallGold">
                                CERTIFICATE NUMBER
                            </div>

                            <div class="number">
                                ${certNumber}
                            </div>

                        </div>

                        <!-- CENTER -->

                        <div class="qrBox">

                            <div class="qrFrame">

                                <div id="qrCode"></div>

                            </div>

                            <div class="verifyText">
                                OFFICIAL VERIFICATION
                                
