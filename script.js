/* =========================================================
   XYLARION PREMIUM CERTIFICATE GENERATOR
   COMPLETE VERSION
   LUXURY FLORAL + NAVY + CHAMPAGNE GOLD
   QR VERIFICATION + SUPABASE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    /* =====================================================
       SUPABASE
    ===================================================== */

    const SUPABASE_URL =
        "https://gdophhworvapqctpmyia.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    let supabaseClient = null;

    if (
        window.supabase &&
        typeof window.supabase.createClient === "function"
    ) {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );
    }


    /* =====================================================
       COLORS
    ===================================================== */

    const NAVY = "#09172D";
    const NAVY2 = "#122642";
    const GOLD = "#C9A45C";
    const GOLD2 = "#E2C985";
    const IVORY = "#FBF8EF";
    const DARK_GOLD = "#94702D";


    /* =====================================================
       LOGO
    ===================================================== */

    let logoData = "";


    if (logoInput) {

        logoInput.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                logoData = "";
                return;
            }

            if (!file.type.startsWith("image/")) {

                alert("Please upload an image file.");

                this.value = "";
                logoData = "";

                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {

                logoData = event.target.result;

            };

            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       SAFE TEXT
    ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       CERTIFICATE NUMBER
    ===================================================== */

    function createCertificateNumber() {

        const year = new Date().getFullYear();

        const number =
            Math.floor(Math.random() * 900000) + 100000;

        return "CC-" + year + "-" + number;
    }


    /* =====================================================
       DATE
    ===================================================== */

    function formatDate(value) {

        if (!value) return "";

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    }


    /* =====================================================
       VERIFICATION URL
    ===================================================== */

    function createVerificationURL(certNumber) {

        return (
            "https://debbie288.github.io/" +
            "certificate-generator/verify.html?cert=" +
            encodeURIComponent(certNumber)
        );

    }


    /* =====================================================
       QR CODE
    ===================================================== */

    function createQRCode(certNumber) {

        const verificationURL =
            createVerificationURL(certNumber);

        const qrURL =
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=300x300" +
            "&margin=12" +
            "&data=" +
            encodeURIComponent(verificationURL);

        return {
            verificationURL: verificationURL,
            qrURL: qrURL
        };

    }


    /* =====================================================
       LUXURY FLORAL ORNAMENT
    ===================================================== */

    function floralCorner(transform) {

        return `
        <g
            transform="${transform}"
            fill="none"
            stroke="${GOLD}"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            <!-- MAIN VINE -->

            <path
                d="
                M35 205
                C42 160 58 118 92 84
                C126 49 174 31 225 28
                C260 26 294 36 324 55
                "
            />

            <path
                d="
                M50 178
                C90 165 120 140 141 108
                C160 79 170 52 170 25
                "
            />

            <!-- LARGE LEAF -->

            <path
                d="
                M78 151
                C43 136 29 103 48 77
                C83 83 103 111 78 151Z
                "
                fill="${GOLD}"
                opacity=".25"
            />

            <!-- LEAF -->

            <path
                d="
                M112 118
                C82 91 85 57 113 39
                C143 59 144 92 112 118Z
                "
                fill="${GOLD}"
                opacity=".28"
            />

            <!-- UPPER LEAF -->

            <path
                d="
                M153 82
                C133 52 145 24 177 13
                C199 39 189 69 153 82Z
                "
                fill="${GOLD}"
                opacity=".25"
            />

            <!-- LONG LEAF -->

            <path
                d="
                M195 56
                C185 29 204 7 235 10
                C250 35 232 57 195 56Z
                "
                fill="${GOLD}"
                opacity=".23"
            />

            <!-- LOWER VINE -->

            <path
                d="
                M45 198
                C75 214 111 215 140 198
                C166 183 184 158 194 129
                "
            />

            <!-- LOWER LEAF -->

            <path
                d="
                M88 201
                C68 220 72 249 99 259
                C119 239 116 216 88 201Z
                "
                fill="${GOLD}"
                opacity=".25"
            />

            <!-- FLOWER -->

            <g transform="translate(48 178)">

                <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill="${GOLD}"
                    opacity=".18"
                />

                <circle
                    cx="0"
                    cy="0"
                    r="4"
                    fill="${GOLD}"
                    stroke="none"
                />

                <ellipse
                    cx="0"
                    cy="-17"
                    rx="8"
                    ry="15"
                    fill="${GOLD}"
                    opacity=".24"
                />

                <ellipse
                    cx="17"
                    cy="-4"
                    rx="8"
                    ry="15"
                    transform="rotate(55 17 -4)"
                    fill="${GOLD}"
                    opacity=".24"
                />

                <ellipse
                    cx="11"
                    cy="14"
                    rx="8"
                    ry="15"
                    transform="rotate(115 11 14)"
                    fill="${GOLD}"
                    opacity=".24"
                />

                <ellipse
                    cx="-11"
                    cy="14"
                    rx="8"
                    ry="15"
                    transform="rotate(-115 -11 14)"
                    fill="${GOLD}"
                    opacity=".24"
                />

                <ellipse
                    cx="-17"
                    cy="-4"
                    rx="8"
                    ry="15"
                    transform="rotate(-55 -17 -4)"
                    fill="${GOLD}"
                    opacity=".24"
                />

            </g>

            <!-- SMALL FLOWER -->

            <g transform="translate(151 105)">

                <circle
                    cx="0"
                    cy="0"
                    r="5"
                    fill="${GOLD}"
                    stroke="none"
                />

                <circle
                    cx="0"
                    cy="-10"
                    r="6"
                    fill="${GOLD}"
                    opacity=".2"
                />

                <circle
                    cx="10"
                    cy="0"
                    r="6"
                    fill="${GOLD}"
                    opacity=".2"
                />

                <circle
                    cx="0"
                    cy="10"
                    r="6"
                    fill="${GOLD}"
                    opacity=".2"
                />

                <circle
                    cx="-10"
                    cy="0"
                    r="6"
                    fill="${GOLD}"
                    opacity=".2"
                />

            </g>

            <!-- DECORATIVE DOTS -->

            <circle
                cx="108"
                cy="72"
                r="2.5"
                fill="${GOLD}"
                stroke="none"
            />

            <circle
                cx="139"
                cy="48"
                r="2.5"
                fill="${GOLD}"
                stroke="none"
            />

            <circle
                cx="181"
                cy="35"
                r="2.5"
                fill="${GOLD}"
                stroke="none"
            />

        </g>
        `;

    }


    /* =====================================================
       FOUR CORNERS
    ===================================================== */

    function createFloralCorners() {

        return `
        <svg
            viewBox="0 0 1200 850"
            preserveAspectRatio="none"
            style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                z-index:5;
                pointer-events:none;
            "
        >

            ${floralCorner("translate(0 0)")}

            ${floralCorner(
                "translate(1200 0) scale(-1 1)"
            )}

            ${floralCorner(
                "translate(0 850) scale(1 -1)"
            )}

            ${floralCorner(
                "translate(1200 850) scale(-1 -1)"
            )}

        </svg>
        `;

    }


    /* =====================================================
       DEFAULT EMBLEM
    ===================================================== */

    function createDefaultLogo() {

        return `
        <div style="
            width:82px;
            height:82px;
            border-radius:50%;
            background:${NAVY};
            border:4px solid ${GOLD};
            display:flex;
            align-items:center;
            justify-content:center;
            margin:auto;
            box-shadow:
                0 3px 10px rgba(0,0,0,.20);
        ">

            <div style="
                width:66px;
                height:66px;
                border-radius:50%;
                border:1px solid ${GOLD2};
                display:flex;
                align-items:center;
                justify-content:center;
                color:${GOLD2};
                font-size:32px;
            ">
                ✦
            </div>

        </div>
        `;

    }


    /* =====================================================
       LOGO
    ===================================================== */

    function createLogo() {

        if (!logoData) {

            return createDefaultLogo();

        }

        return `
        <div style="
            width:100px;
            height:82px;
            display:flex;
            align-items:center;
            justify-content:center;
            margin:auto;
        ">

            <img
                src="${logoData}"
                alt="Organization logo"
                style="
                    max-width:100%;
                    max-height:82px;
                    object-fit:contain;
                "
            >

        </div>
        `;

    }


    /* =====================================================
       QR DESIGN
    ===================================================== */

    function createLuxuryQR(qrURL, certNumber) {

        return `
        <div style="
            width:150px;
            text-align:center;
        ">

            <div style="
                font-size:10px;
                letter-spacing:2px;
                font-weight:bold;
                color:${DARK_GOLD};
                margin-bottom:6px;
            ">
                VERIFY ONLINE
            </div>

            <div style="
                position:relative;
                width:132px;
                height:132px;
                margin:auto;
                background:white;
                border:3px solid ${GOLD};
                padding:5px;
                box-shadow:
                    0 3px 12px rgba(0,0,0,.16);
            ">

                <div style="
                    position:absolute;
                    inset:3px;
                    border:1px solid ${NAVY};
                    pointer-events:none;
                "></div>

                <img
                    src="${qrURL}"
                    alt="Scan to verify certificate"
                    style="
                        position:relative;
                        z-index:2;
                        width:112px;
                        height:112px;
                        display:block;
                        margin:auto;
                        object-fit:contain;
                    "
                >

            </div>

            <div style="
                margin-top:6px;
                font-size:8px;
                color:#555;
                letter-spacing:1px;
            ">
                SCAN TO VERIFY
            </div>

            <div style="
                margin-top:4px;
                font-size:8px;
                color:${DARK_GOLD};
                word-break:break-all;
            ">
                ${escapeHTML(certNumber)}
            </div>

        </div>
        `;

    }


    /* =====================================================
       SAVE TO SUPABASE
    ===================================================== */

    async function saveCertificate(data) {

        if (!supabaseClient) {

            return {
                success: false,
                error: "Supabase could not be initialized."
            };

        }

        try {

            const { data: savedData, error } =
                await supabaseClient
                    .from("certificates")
                    .upsert(
                        {
                            student_name: data.student_name,
                            course_name: data.course_name,
                            completion_date: data.completion_date,
                            cert_number: data.cert_number,
                            institution: data.institution,
                            director: data.director
                        },
                        {
                            onConflict: "cert_number"
                        }
                    )
                    .select()
                    .maybeSingle();


            if (error) {

                console.error(
                    "Supabase save error:",
                    error
                );

                return {
                    success: false,
                    error: error.message
                };

            }

            return {
                success: true,
                data: savedData
            };

        }

        catch (error) {

            console.error(error);

            return {
                success: false,
                error: error.message
            };

        }

    }


    /* =====================================================
       GENERATE CERTIFICATE
    ===================================================== */

    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        const institution =
            document
                .getElementById("institutionName")
                .value
                .trim();


        const student =
            document
                .getElementById("studentName")
                .value
                .trim();


        const course =
            document
                .getElementById("courseName")
                .value
                .trim();


        const date =
            document
                .getElementById("completionDate")
                .value;


        const certInput =
            document
                .getElementById("certNumber")
                .value
                .trim();


        const director =
            document
                .getElementById("directorName")
                .value
                .trim();


        if (
            !institution ||
            !student ||
            !course ||
            !date ||
            !director
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        const certNumber =
            certInput || createCertificateNumber();


        const formattedDate =
            formatDate(date);


        const qr =
            createQRCode(certNumber);


        /* =================================================
           SHOW CERTIFICATE
        ================================================= */

        preview.innerHTML = `

        <div
            id="xylCertificate"
            style="
                position:relative;
                width:100%;
                max-width:1200px;
                min-height:850px;
                margin:auto;
                overflow:hidden;
                background:
                    radial-gradient(
                        circle at center,
                        #FFFFFF 0%,
                        ${IVORY} 66%,
                        #EEE7D7 100%
                    );
                border:14px solid ${NAVY};
                box-shadow:
                    0 12px 40px rgba(0,0,0,.25);
                color:${NAVY};
                text-align:center;
                font-family:
                    Georgia,
                    'Times New Roman',
                    serif;
            "
        >

            <!-- GOLD FRAME -->

            <div style="
                position:absolute;
                inset:12px;
                border:3px solid ${GOLD};
                z-index:2;
                pointer-events:none;
            "></div>

            <!-- SECOND GOLD FRAME -->

            <div style="
                position:absolute;
                inset:22px;
                border:1px solid ${GOLD};
                z-index:2;
                pointer-events:none;
            "></div>


            <!-- INNER NAVY DETAIL -->

            <div style="
                position:absolute;
                inset:
