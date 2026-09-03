/* =========================================================
   XYLARION PREMIUM CERTIFICATE GENERATOR
   FULL SCRIPT.JS
   Luxury Navy + Gold + Ivory
   Floral Corners + Circular Logo + QR Verification
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SUPABASE
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
        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );
    }


    /* =====================================================
       2. ELEMENTS
    ===================================================== */

    const form =
        document.getElementById("certificateForm");

    const previewArea =
        document.getElementById("previewArea");

    const preview =
        document.getElementById("certificatePreview");

    const logoInput =
        document.getElementById("logoUpload");


    if (!form || !previewArea || !preview) {

        console.error(
            "Xylarion: Required certificate elements were not found."
        );

        return;
    }


    /* =====================================================
       3. COLORS
    ===================================================== */

    const COLORS = {

        navy: "#0B1930",

        gold: "#C9A44F",

        darkGold: "#9A7028",

        lightGold: "#E4C978",

        ivory: "#FCFAF3",

        white: "#FFFFFF"

    };


    /* =====================================================
       4. LOGO STORAGE
    ===================================================== */

    let logoData = "";


    /* =====================================================
       5. SAFE HTML
    ===================================================== */

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {
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
       6. CAPITALIZE TEXT
    ===================================================== */

    function properCase(value) {

        if (!value) {
            return "";
        }

        return value
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });
    }


    /* =====================================================
       7. DATE FORMAT
    ===================================================== */

    function formatDate(value) {

        if (!value) {
            return "";
        }

        const date =
            new Date(value + "T00:00:00");

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return value;
        }

        return date.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    }


    /* =====================================================
       8. CERTIFICATE NUMBER
    ===================================================== */

    function createCertificateNumber() {

        const year =
            new Date().getFullYear();

        const random =
            Math.floor(
                Math.random() * 900000
            ) + 100000;

        return (
            "CC-" +
            year +
            "-" +
            random
        );
    }


    /* =====================================================
       9. VERIFICATION URL
    ===================================================== */

    function createVerificationURL(
        certificateNumber
    ) {

        return (
            "https://debbie288.github.io/" +
            "certificate-generator/verify.html?cert=" +
            encodeURIComponent(
                certificateNumber
            )
        );
    }


    /* =====================================================
       10. QR CODE
    ===================================================== */

    function createQRCodeURL(
        certificateNumber
    ) {

        const verificationURL =
            createVerificationURL(
                certificateNumber
            );

        return (
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=300x300" +
            "&margin=12" +
            "&data=" +
            encodeURIComponent(
                verificationURL
            )
        );
    }


    /* =====================================================
       11. LOGO UPLOAD
    ===================================================== */

    if (logoInput) {

        logoInput.addEventListener(
            "change",
            function () {

                const file =
                    this.files &&
                    this.files[0];

                if (!file) {

                    logoData = "";

                    return;
                }


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please upload an image file."
                    );

                    this.value = "";

                    logoData = "";

                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        logoData =
                            event.target.result;

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       12. LUXURY FLORAL CORNERS
       Inspired by the supplied reference design
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
                pointer-events:none;
                z-index:3;
            "
        >

            <defs>

                <linearGradient
                    id="goldFlower"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >
                    <stop
                        offset="0%"
                        stop-color="${COLORS.lightGold}"
                    />

                    <stop
                        offset="45%"
                        stop-color="${COLORS.gold}"
                    />

                    <stop
                        offset="100%"
                        stop-color="${COLORS.darkGold}"
                    />
                </linearGradient>

            </defs>


            <!-- =================================================
                 TOP LEFT
            ================================================== -->

            <g
                fill="url(#goldFlower)"
                stroke="${COLORS.darkGold}"
                stroke-width="1.4"
            >

                <path
                    d="
                    M25 25
                    C80 25 130 45 165 85
                    C205 130 205 190 160 225
                    C120 255 65 235 45 190
                    C25 145 30 80 25 25
                    Z
                    "
                    opacity=".96"
                />

                <path
                    d="
                    M50 45
                    C80 65 105 95 110 135
                    C115 175 95 205 65 220
                    "
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="3"
                />

                <path
                    d="
                    M80 65
                    C45 70 30 50 35 25
                    C65 28 83 40 80 65
                    Z
                    "
                />

                <path
                    d="
                    M110 85
                    C80 80 68 60 78 35
                    C105 43 118 60 110 85
                    Z
                    "
                />

                <path
                    d="
                    M140 110
                    C112 98 108 75 125 55
                    C150 68 158 88 140 110
                    Z
                    "
                />

                <path
                    d="
                    M68 120
                    C38 105 30 80 43 60
                    C70 72 82 95 68 120
                    Z
                    "
                />

                <path
                    d="
                    M95 155
                    C65 145 52 120 62 100
                    C90 108 104 132 95 155
                    Z
                    "
                />

                <!-- flower -->

                <circle
                    cx="105"
                    cy="145"
                    r="24"
                    fill="none"
                    stroke-width="4"
                />

                <ellipse
                    cx="105"
                    cy="121"
                    rx="14"
                    ry="25"
                />

                <ellipse
                    cx="105"
                    cy="169"
                    rx="14"
                    ry="25"
                />

                <ellipse
                    cx="81"
                    cy="145"
                    rx="25"
                    ry="14"
                />

                <ellipse
                    cx="129"
                    cy="145"
                    rx="25"
                    ry="14"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="8"
                    fill="${COLORS.gold}"
                />

            </g>


            <!-- =================================================
                 TOP RIGHT
            ================================================== -->

            <g
                transform="translate(1200 0) scale(-1 1)"
            >

                <path
                    d="
                    M25 25
                    C80 25 130 45 165 85
                    C205 130 205 190 160 225
                    C120 255 65 235 45 190
                    C25 145 30 80 25 25
                    Z
                    "
                    fill="url(#goldFlower)"
                    stroke="${COLORS.darkGold}"
                    stroke-width="1.4"
                />

                <path
                    d="
                    M50 45
                    C80 65 105 95 110 135
                    C115 175 95 205 65 220
                    "
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="3"
                />

                <path
                    d="
                    M80 65
                    C45 70 30 50 35 25
                    C65 28 83 40 80 65
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <path
                    d="
                    M110 85
                    C80 80 68 60 78 35
                    C105 43 118 60 110 85
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <path
                    d="
                    M140 110
                    C112 98 108 75 125 55
                    C150 68 158 88 140 110
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="24"
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="4"
                />

                <ellipse
                    cx="105"
                    cy="121"
                    rx="14"
                    ry="25"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="105"
                    cy="169"
                    rx="14"
                    ry="25"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="81"
                    cy="145"
                    rx="25"
                    ry="14"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="129"
                    cy="145"
                    rx="25"
                    ry="14"
                    fill="url(#goldFlower)"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="8"
                    fill="${COLORS.gold}"
                />

            </g>


            <!-- =================================================
                 BOTTOM LEFT
            ================================================== -->

            <g
                transform="translate(0 850) scale(1 -1)"
                fill="url(#goldFlower)"
                stroke="${COLORS.darkGold}"
                stroke-width="1.4"
            >

                <path
                    d="
                    M25 25
                    C80 25 130 45 165 85
                    C205 130 205 190 160 225
                    C120 255 65 235 45 190
                    C25 145 30 80 25 25
                    Z
                    "
                />

                <path
                    d="
                    M50 45
                    C80 65 105 95 110 135
                    C115 175 95 205 65 220
                    "
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="3"
                />

                <path
                    d="
                    M80 65
                    C45 70 30 50 35 25
                    C65 28 83 40 80 65
                    Z
                    "
                />

                <path
                    d="
                    M110 85
                    C80 80 68 60 78 35
                    C105 43 118 60 110 85
                    Z
                    "
                />

                <path
                    d="
                    M140 110
                    C112 98 108 75 125 55
                    C150 68 158 88 140 110
                    Z
                    "
                />

                <circle
                    cx="105"
                    cy="145"
                    r="24"
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="4"
                />

                <ellipse
                    cx="105"
                    cy="121"
                    rx="14"
                    ry="25"
                />

                <ellipse
                    cx="105"
                    cy="169"
                    rx="14"
                    ry="25"
                />

                <ellipse
                    cx="81"
                    cy="145"
                    rx="25"
                    ry="14"
                />

                <ellipse
                    cx="129"
                    cy="145"
                    rx="25"
                    ry="14"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="8"
                />

            </g>


            <!-- =================================================
                 BOTTOM RIGHT
            ================================================== -->

            <g
                transform="translate(1200 850) scale(-1 -1)"
            >

                <path
                    d="
                    M25 25
                    C80 25 130 45 165 85
                    C205 130 205 190 160 225
                    C120 255 65 235 45 190
                    C25 145 30 80 25 25
                    Z
                    "
                    fill="url(#goldFlower)"
                    stroke="${COLORS.darkGold}"
                    stroke-width="1.4"
                />

                <path
                    d="
                    M50 45
                    C80 65 105 95 110 135
                    C115 175 95 205 65 220
                    "
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="3"
                />

                <path
                    d="
                    M80 65
                    C45 70 30 50 35 25
                    C65 28 83 40 80 65
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <path
                    d="
                    M110 85
                    C80 80 68 60 78 35
                    C105 43 118 60 110 85
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <path
                    d="
                    M140 110
                    C112 98 108 75 125 55
                    C150 68 158 88 140 110
                    Z
                    "
                    fill="url(#goldFlower)"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="24"
                    fill="none"
                    stroke="${COLORS.darkGold}"
                    stroke-width="4"
                />

                <ellipse
                    cx="105"
                    cy="121"
                    rx="14"
                    ry="25"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="105"
                    cy="169"
                    rx="14"
                    ry="25"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="81"
                    cy="145"
                    rx="25"
                    ry="14"
                    fill="url(#goldFlower)"
                />

                <ellipse
                    cx="129"
                    cy="145"
                    rx="25"
                    ry="14"
                    fill="url(#goldFlower)"
                />

                <circle
                    cx="105"
                    cy="145"
                    r="8"
                    fill="${COLORS.gold}"
                />

            </g>

        </svg>

        `;
    }


    /* =====================================================
       13. CIRCULAR LOGO
    ===================================================== */

    function createLogo() {

        if (logoData) {

            return `

                <div style="
                    width:105px;
                    height:105px;
                    margin:0 auto 12px;
                    border-radius:50%;
                    border:5px solid ${COLORS.gold};
                    background:#fff;
                    padding:6px;
                    bo
