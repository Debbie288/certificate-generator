/* =========================================================
   XYLARION PREMIUM CERTIFICATE GENERATOR
   Complete Replacement Script
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");
    const certNumberInput = document.getElementById("certNumber");

    if (!form || !preview) {
        console.error("Certificate generator elements not found.");
        return;
    }

    /* Remove old Powered By footer */
    const footer = document.querySelector("footer");
    if (footer) footer.remove();


    /* =========================
       SUPABASE
    ========================= */

    const SUPABASE_URL =
        "https://gdophhworvapqctpmyia.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    let db = null;

    if (window.supabase) {
        db = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );
    }


    /* =========================
       LOGO
    ========================= */

    let logoData = "";

    if (logoInput) {

        logoInput.addEventListener("change", function () {

            const file = this.files && this.files[0];

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


    /* =========================
       HELPERS
    ========================= */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function titleCase(text) {

        text = String(text || "").trim();

        if (!text) return "";

        return text
            .toLowerCase()
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }


    function generateCertificateNumber() {

        const year = new Date().getFullYear();

        const random =
            Math.floor(100000 + Math.random() * 900000);

        return `XYL-${year}-${random}`;
    }


    function formatDate(dateString) {

        if (!dateString) return "";

        const date = new Date(dateString + "T00:00:00");

        if (isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }


    function verificationURL(certNumber) {

        return (
            "https://debbie288.github.io/" +
            "certificate-generator/verify.html?cert=" +
            encodeURIComponent(certNumber)
        );
    }


    function qrURL(certNumber) {

        return (
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=300x300&margin=12&data=" +
            encodeURIComponent(verificationURL(certNumber))
        );
    }


    /* =========================
       ORNAMENT
    ========================= */

    function ornamentSVG() {

        return `
        <svg
            class="corner-ornaments"
            viewBox="0 0 1200 850"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            <defs>

                <g id="floral">

                    <path
                        d="M20 145 C25 90 55 45 120 20"
                        fill="none"
                        stroke="#C8A45D"
                        stroke-width="3"
                    />

                    <path
                        d="M45 105 C75 105 92 91 108 65"
                        fill="none"
                        stroke="#C8A45D"
                        stroke-width="2"
                    />

                    <path
                        d="M65 72 C92 73 110 60 124 40"
                        fill="none"
                        stroke="#C8A45D"
                        stroke-width="2"
                    />

                    <ellipse
                        cx="55"
                        cy="105"
                        rx="17"
                        ry="7"
                        transform="rotate(-28 55 105)"
                        fill="#C8A45D"
                    />

                    <ellipse
                        cx="76"
                        cy="83"
                        rx="17"
                        ry="7"
                        transform="rotate(-30 76 83)"
                        fill="#C8A45D"
                    />

                    <ellipse
                        cx="94"
                        cy="62"
                        rx="16"
                        ry="7"
                        transform="rotate(-38 94 62)"
                        fill="#C8A45D"
                    />

                    <ellipse
                        cx="40"
                        cy="126"
                        rx="16"
                        ry="7"
                        transform="rotate(25 40 126)"
                        fill="#C8A45D"
                    />

                    <circle
                        cx="28"
                        cy="143"
                        r="10"
                        fill="#C8A45D"
                    />

                    <circle
                        cx="28"
                        cy="143"
                        r="4"
                        fill="#FCFAF4"
                    />

                    <path
                        d="M25 150 C35 166 53 173 70 170"
                        fill="none"
                        stroke="#C8A45D"
                        stroke-width="2"
                    />

                    <ellipse
                        cx="52"
                        cy="165"
                        rx="18"
                        ry="7"
                        transform="rotate(22 52 165)"
                        fill="#C8A45D"
                    />

                </g>

            </defs>

            <!-- TOP LEFT -->
            <use href="#floral" />

            <!-- TOP RIGHT -->
            <use
                href="#floral"
                transform="translate(1200 0) scale(-1 1)"
            />

            <!-- BOTTOM LEFT -->
            <use
                href="#floral"
                transform="translate(0 850) scale(1 -1)"
            />

            <!-- BOTTOM RIGHT -->
            <use
                href="#floral"
                transform="translate(1200 850) scale(-1 -1)"
            />

        </svg>
        `;
    }


    /* =========================
       CERTIFICATE CSS
    ========================= */

    function certificateStyles() {

        return `
        <style>

        .xyl-certificate {
            position: relative;
            width: 100%;
            max-width: 1200px;
            aspect-ratio: 1200 / 850;
            margin: 20px auto;
            background: #FCFAF4;
            color: #0B1930;
            overflow: hidden;
            box-sizing: border-box;
            border: 10px solid #0B1930;
            font-family: Georgia, "Times New Roman", serif;
            box-shadow: 0 15px 45px rgba(0,0,0,.18);
        }

        .xyl-inner-border {
            position: absolute;
            inset: 15px;
            border: 2px solid #C8A45D;
            pointer-events: none;
            z-index: 2;
        }

        .xyl-inner-border::after {
            content: "";
            position: absolute;
            inset: 7px;
            border: 1px solid rgba(200,164,93,.55);
        }

        .corner-ornaments {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        }

        .xyl-content {
            position: absolute;
            inset: 45px 65px 40px;
            z-index: 5;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .xyl-logo-wrap {
            width: 112px;
            height: 112px;
            border-radius: 50%;
            background: #fff;
            border: 5px solid #C8A45D;
            outline: 2px solid #0B1930;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-top: 2px;
            margin-bottom: 13px;
            box-shadow: 0 5px 18px rgba(0,0,0,.12);
        }

        .xyl-logo {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 8px;
            box-sizing: border-box;
        }

        .xyl-logo-placeholder {
            font-size: 34px;
            font-weight: bold;
            color: #C8A45D;
        }

        .xyl-institution {
            font-size: clamp(17px, 2vw, 25px);
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #0B1930;
            margin-bottom: 8px;
        }

        .xyl-small-line {
            width: 260px;
            height: 2px;
            background: #C8A45D;
            margin: 4px auto 12px;
        }

        .xyl-cert-intro {
            font-size: clamp(11px, 1.2vw, 16px);
            letter-spacing: 4px;
            color: #555;
            margin-top: 3px;
        }

        .xyl-title {
            font-size: clamp(35px, 5vw, 62px);
            line-height: .95;
            letter-spacing: 7px;
            color: #0B1930;
            margin: 8px 0 3px;
            font-weight: bold;
        }

        .xyl-subtitle {
            font-size: clamp(15px, 1.7vw, 23px);
            letter-spacing: 5px;
            color: #C8A45D;
            font-weight: bold;
        }

        .xyl-student {
            font-family: Georgia, "Times New Roman", serif;
            font-size: clamp(28px, 4vw, 50px);
            font-weight: bold;
            color: #0B1930;
            margin: 15px 0 3px;
            padding: 0 20px 7px;
            border-bottom: 2px solid #C8A45D;
        }

        .xyl-completed {
            font-size: clamp(11px, 1.1vw, 15px);
            color: #666;
            letter-spacing: 2px;
            margin-top: 7px;
        }

        .xyl-course {
            font-size: clamp(18px, 2vw, 28px);
            color: #0B1930;
            font-weight: bold;
            margin-top: 4px;
        }

        .xyl-bottom {
            width: 100%;
            margin-top: auto;
            display: grid;
            grid-template-columns: 1fr 190px 1fr;
            align-items: end;
            gap: 20px;
        }

        .xyl-bottom-left,
        .xyl-bottom-right {
            min-width: 0;
        }

        .xyl-bottom-left {
            text-align: left;
        }

        .xyl-bottom-right {
            text-align: center;
        }

        .xyl-label {
            font-size: 11px;
            letter-spacing: 2px;
            color: #777;
            font-weight: bold;
        }

        .xyl-number {
            font-size: 15px;
            color: #0B1930;
            font-weight: bold;
            margin-top: 4px;
            word-break: break-all;
        }

        .xyl-date {
            font-size: 12px;
            color: #555;
            margin-top: 5px;
        }

        .xyl-qr-box {
            width: 155px;
            height: 155px;
            background: #fff;
            border: 3px solid #C8A45D;
            padding: 8px;
            box-sizing: border-box;
            margin: 0 auto 4px;
            box-shadow: 0 3px 12px rgba(0,0,0,.10);
        }

        .xyl-qr {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }

        .xyl-verify {
            font-size: 10px;
            letter-spacing: 2px;
            color: #0B1930;
            font-weight: bold;
        }

        .xyl-sign-line {
            width: 180px;
            border-top: 2px solid #0B1930;
            margin: 0 auto 5px;
        }

        .xyl-signature {
            font-family: "Brush Script MT", "Segoe Script", cursive;
            font-size: 28px;
            color: #0B1930;
            margin-bottom: 0;
        }

        .xyl-authorized {
            font-size: 10px;
            letter-spacing: 1.5px;
            color: #777;
            text-transform: uppercase;
        }

        .xyl-seal {
            position: absolute;
            right: 22px;
            bottom: 19px;
            width: 86px;
            height: 86px;
            border-radius: 50%;
            background: #C8A45D;
            color: #0B1930;
            border: 4px solid #0B1930;
            outline: 3px solid #C8A45D;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: bold;
            transform: rotate(-8deg);
            box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }

        .xyl-seal-main {
            font-size: 15px;
            letter-spacing: 1px;
        }

        .xyl-seal-small {
            font-size: 8px;
            letter-spacing: 1px;
            margin-top: 2px;
        }

        .xyl-actions {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 18px auto;
            flex-wrap: wrap;
        }

        .xyl-action-btn {
            border: none;
            padding: 12px 22px;
            border-radius: 6px;
            cursor: pointer;
            background: #0B1930;
            color: white;
            font-weight: bold;
            font-size: 14px;
        }

        .xyl-action-btn:hover {
            opacity: .88;
        }

        .xyl-success {
            text-align: center;
            margin: 12px auto;
            color: #176b35;
            font-weight: bold;
            font-size: 14px;
        }

        .xyl-warning {
            text-align: center;
            margin: 12px auto;
            color: #a05a00;
            font-weight: bold;
            font-size: 13px;
        }

        @media (max-width: 700px) {

            .xyl-certificate {
                border-width: 6px;
            }

            .xyl-inner-border {
                inset: 9px;
            }

            .xyl-content {
                inset: 30px 30px 25px;
            }

            .xyl-logo-wrap {
                width: 75px;
                height: 75px;
                border-width: 3px;
                margin-bottom: 6px;
            }

            .xyl-title {
                letter-spacing: 3px;
            }

            .xyl-student {
                margin-top: 8px;
                padding-bottom: 4px;
            }

            .xyl-bottom {
                grid-template-columns: 1fr 125px 1fr;
                gap: 6px;
            }

            .xyl-qr-box {
                width: 110px;
                height: 110px;
                padding: 6px;
            }

            .xyl-seal {
                width: 55px;
                height: 55px;
                right: 7px;
                bottom: 7px;
                border-width: 2px;
                outline-width: 2px;
            }

            .xyl-seal-main {
                font-size: 9px;
            }

            .xyl-seal-small {
                font-size: 5px;
            }

            .xyl-sign-line {
                width: 100px;
            }

            .xyl-signature {
                font-size: 20px;
            }
        }

        @media print {

            @page {
                size: A4 landscape;
                margin: 0;
            }

            body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
            }

            body * {
                visibility: hidden !important;
            }

            #certificatePreview,
            #certificatePreview * {
                visibility: visible !important;
            }

            #certificatePreview {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .xyl-certificate {
                width: 100% !important;
                max-width: none !important;
                height: 100vh !important;
                aspect-ratio: auto !important;
                margin: 0 !important;
                box-shadow: none !important;
            }

            .xyl-actions,
            .xyl-success,
            .xyl-warning {
                display: none !important;
            }
        }

        </style>
        `;
    }


    /* =========================
       SAVE TO SUPABASE
    ========================= */

    async function saveCertificate(data, autoGenerated) {

        if (!db) {
            throw new Error(
                "Supabase is not available. Make sure the Supabase script is loaded."
            );
        }

        let attempts = 0;

        while (attempts < 3) {

            const { error } = await db
                .from("certificates")
                .insert({
                    student_name: data.student,
                    course_name: data.course,
                    completion_date: data.date,
                    cert_number: data.certNumber,
                    institution: data.institution,
                    director: data.director
                });

            if (!error) {
                return data.certNumber;
            }

            /*
              If an automatically generated number somehow already exists,
              create another one and try again.
            */

            if (
                autoGenerated &&
                (error.code === "23505" ||
                 String(error.message).toLowerCase().includes("duplicate"))
            ) {
                data.certNumber = generateCertificateNumber();
                attempts++;
                continue;
            }

            throw error;
        }

        throw new Error("Could not create a unique certificate number.");
    }


    /* =========================
       RENDER CERTIFICATE
    ========================= */

    function renderCertificate(data) {

        const safeInstitution =
            escapeHTML(data.institution);

        const safeStudent =
            escapeHTML(data.student);

        const safeCourse =
            escapeHTML(data.course);

        const safeDirector =
            escapeHTML(data.director);

        const safeNumber =
            escapeHTML(data.certNumber);

        const prettyDate =
            escapeHTML(formatDate(data.date));

        const qr =
            qrURL(data.certNumber);

        const logoHTML = logoData
            ? `<img class="xyl-logo" src="${logoData}" alt="Institution Logo">`
            : `<div class="xyl-logo-placeholder">X</div>`;

        preview.innerHTML = `

            ${certificateStyles()}

            <div class="xyl-certificate">

                <div class="xyl-inner-border"></div>

    
