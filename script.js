document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    const SUPABASE_URL = "https://gdophhworvapqctpmyia.supabase.co";
    const SUPABASE_KEY = "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    const db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    let logo = "";

    /* Remove old free-tool footer */
    const footer = document.querySelector("footer");
    if (footer) footer.remove();

    /* Logo */
    if (logoInput) {
        logoInput.addEventListener("change", () => {
            const file = logoInput.files[0];

            if (!file) {
                logo = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file.");
                logoInput.value = "";
                logo = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = e => {
                logo = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    }

    /* Capitalize only when text is all lower/upper case */
    function pretty(text) {
        text = text.trim().replace(/\s+/g, " ");

        if (!text) return "";

        if (
            text === text.toLowerCase() ||
            text === text.toUpperCase()
        ) {
            return text
                .toLowerCase()
                .replace(/\b\w/g, c => c.toUpperCase());
        }

        return text;
    }

    /* Prevent HTML injection */
    function safe(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* Certificate number */
    function certificateNumber() {
        const year = new Date().getFullYear();
        const number = Math.floor(100000 + Math.random() * 900000);
        return "CERT-" + year + "-" + number;
    }

    /* Date */
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

    /* Verification URL */
    function verificationURL(cert) {
        const url = new URL("verify.html", window.location.href);
        url.searchParams.set("cert", cert);
        return url.href;
    }

    /* QR code */
    function qrCode(cert) {
        return (
            "https://api.qrserver.com/v1/create-qr-code/" +
            "?size=180x180&margin=8&data=" +
            encodeURIComponent(verificationURL(cert))
        );
    }

    /* Luxury floral decoration */
    function ornaments() {
        return `
        <svg class="ornaments" viewBox="0 0 1200 850"
             preserveAspectRatio="none">

            <g fill="none" stroke="#C8A45D"
              stroke-width="3" opacity=".85">

                <path d="M20 190 C70 70 150 35 270 20
                         C160 65 125 115 95 205"/>

                <path d="M1180 190 C1130 70 1050 35 930 20
                         C1040 65 1075 115 1105 205"/>

                <path d="M20 660 C70 780 150 815 270 830
                         C160 785 125 735 95 645"/>

                <path d="M1180 660 C1130 780 1050 815 930 830
                         C1040 785 1075 735 1105 645"/>

                <path d="M35 150 C100 115 135 75 160 25"/>
                <path d="M1165 150 C1100 115 1065 75 1040 25"/>
                <path d="M35 700 C100 735 135 775 160 825"/>
                <path d="M1165 700 C1100 735 1065 775 1040 825"/>
            </g>

            <g fill="#C8A45D" opacity=".8">

                <ellipse cx="85" cy="120" rx="18" ry="7"
                    transform="rotate(-35 85 120)"/>
                <ellipse cx="120" cy="82" rx="20" ry="7"
                    transform="rotate(-55 120 82)"/>
                <ellipse cx="165" cy="48" rx="22" ry="8"
                    transform="rotate(-25 165 48)"/>

                <ellipse cx="1115" cy="120" rx="18" ry="7"
                    transform="rotate(35 1115 120)"/>
                <ellipse cx="1080" cy="82" rx="20" ry="7"
                    transform="rotate(55 1080 82)"/>
                <ellipse cx="1035" cy="48" rx="22" ry="8"
                    transform="rotate(25 1035 48)"/>

                <ellipse cx="85" cy="730" rx="18" ry="7"
                    transform="rotate(35 85 730)"/>
                <ellipse cx="120" cy="768" rx="20" ry="7"
                    transform="rotate(55 120 768)"/>
                <ellipse cx="165" cy="802" rx="22" ry="8"
                    transform="rotate(25 165 802)"/>

                <ellipse cx="1115" cy="730" rx="18" ry="7"
                    transform="rotate(-35 1115 730)"/>
                <ellipse cx="1080" cy="768" rx="20" ry="7"
                    transform="rotate(-55 1080 768)"/>
                <ellipse cx="1035" cy="802" rx="22" ry="8"
                    transform="rotate(-25 1035 802)"/>
            </g>

            <g fill="none" stroke="#C8A45D" stroke-width="2">
                <circle cx="55" cy="55" r="12"/>
                <circle cx="1145" cy="55" r="12"/>
                <circle cx="55" cy="795" r="12"/>
                <circle cx="1145" cy="795" r="12"/>
            </g>
        </svg>`;
    }

    /* Gold seal */
    function seal() {
        return `
        <div class="seal">
            <div class="seal-inner">
                <strong>★</strong>
                <span>CERTIFIED</span>
                <small>EXCELLENCE</small>
            </div>
        </div>`;
    }

    /* Print styling */
    function addPrintStyle() {
        if (document.getElementById("certificatePrintStyle")) return;

        const style = document.createElement("style");
        style.id = "certificatePrintStyle";

        style.textContent = `
        .certificate {
            position: relative;
            width: 100%;
            max-width: 1100px;
            aspect-ratio: 297 / 210;
            margin: auto;
            overflow: hidden;
            background: #FCFAF4;
            color: #0B1930;
            border: 10px solid #0B1930;
            box-shadow: 0 12px 35px rgba(0,0,0,.18);
            font-family: Georgia, "Times New Roman", serif;
        }

        .certificate:before {
            content: "";
            position: absolute;
            inset: 10px;
            border: 2px solid #C8A45D;
            pointer-events: none;
        }

        .certificate:after {
            content: "";
            position: absolute;
            inset: 17px;
            border: 1px solid #C8A45D;
            pointer-events: none;
        }

        .ornaments {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .cert-content {
            position: relative;
            z-index: 2;
            height: 100%;
            padding: 5% 8%;
            text-align: center;
            display: flex;
            flex-direction: column;
        }

        .logo {
            width: 92px;
            height: 92px;
            margin: 0 auto 8px;
            border-radius: 50%;
            border: 4px solid #C8A45D;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 3px 12px rgba(0,0,0,.15);
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .logo-default {
            font-size: 38px;
            color: #C8A45D;
        }

        .institution {
            font-size: clamp(18px, 2.4vw, 30px);
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #0B1930;
        }

        .line {
            width: 170px;
            height: 2px;
            background: #C8A45D;
            margin: 8px auto;
        }

        .certificate-title {
            font-size: clamp(28px, 4vw, 50px);
            letter-spacing: 6px;
            margin: 5px 0;
            text-transform: uppercase;
            color: #0B1930;
        }

        .subtitle {
            font-size: clamp(11px, 1.5vw, 17px);
            letter-spacing: 3px;
            color: #777;
            margin-bottom: 8px;
        }

        .student {
            font-size: clamp(25px, 4vw, 48px);
            font-weight: bold;
            font-style: italic;
            color: #0B1930;
            margin: 5px 0;
        }

        .presented {
            font-size: clamp(11px, 1.4vw, 16px);
            color: #555;
        }

        .course {
            font-size: clamp(16px, 2.3vw, 27px);
            font-weight: bold;
            color: #C8A45D;
            margin: 5px auto;
            max-width: 75%;
        }

        .date {
            font-size: clamp(11px, 1.4vw, 16px);
            margin-top: 4px;
            color: #555;
        }

        .bottom {
            margin-top: auto;
            display: grid;
            grid-template-columns: 1fr 180px 1fr;
            align-items: end;
            gap: 25px;
            padding: 0 3%;
        }

        .bottom-side {
            min-height: 110px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .cert-number {
            text-align: left;
            font-family: Arial, sans-serif;
            font-size: 12px;
            letter-spacing: 1px;
            color: #555;
        }

        .qr {
            width: 145px;
            height: 145px;
            margin: auto;
            background: white;
            padding: 7px;
            border: 2px solid #C8A45D;
        }

        .qr img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .signature {
            text-align: right;
            position: relative;
            min-height: 110px;
        }

        .signature-line {
            border-top: 1px solid #0B1930;
            width: 160px;
            margin: 0 0 5px auto;
        }

        .director {
            font-size: 15px;
            font-weight: bold;
        }

        .authorized {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #777;
            letter-spacing: 1px;
        }

        .seal {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 3px solid #C8A45D;
            background: #FCFAF4;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 125px;
            bottom: 15px;
            transform: rotate(-12deg);
        }

        .seal-inner {
            width: 61px;
            height: 61px;
            border-radius: 50%;
            border: 1px solid #C8A45D;
            text-align: center;
            padding-top: 8px;
            color: #C8A45D;
        }

        .seal strong {
            display: block;
            font-size: 14px;
        }

        .seal span,
        .seal small {
            display: block;
            font-family: Arial, sans-serif;
            font-size: 6px;
            letter-spacing: 1px;
        }

        .actions {
            text-align: center;
            margin: 18px 0;
        }

        .pdf-button {
            background: #0B1930;
            color: white;
            border: 0;
            padding: 12px 25px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }

        .status {
            text-align: center;
            margin: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }

        @media print {
            @page {
                size: A4 landscape;
                margin: 0;
            }

            body {
                margin: 0 !important;
                background: white !important;
            }

            .container > h1,
            .container > p,
            #certificateForm,
            #previewArea > h2,
            .actions,
            .status {
                display: none !important;
            }

            #previewArea {
                display: block !important;
                margin: 0 !important;
            }

            #certificatePreview {
                width: 100vw !important;
            }

            .certificate {
                max-width: none !important;
                width: 100vw !important;
                height: 100vh !important;
                aspect-ratio: auto !important;
                box-shadow: none !important;
                margin: 0 !important;
            }
        }

        @media (max-width: 700px) {
            .certificate {
                min-width: 650px;
            }
        }
        `;

        document.head.appendChild(style);
    }

    addPrintStyle();

    /* Generate */
    form.addEventListener("submit", async event => {

        event.preventDefault();

        const institution = pretty(
            document.getElementById("institutionName").value
        );

        const student = pretty(
            document.getElementById("studentName").value
        );

        const course = pretty(
            document.getElementById("courseName").value
        );

        const date = document.getElementById("completionDate").value;

        const certInput =
            document.getElementById("certNumber").value.trim();

        const director = pretty(
            document.getElementById("directorName").value
        );

        const cert = certInput || certificateNumber();

        if (!institution || !student || !course || !date || !director) {
            alert("Please complete all required fields.");
            return;
        }

        const button = document.getElementById("generateBtn");

        button.disabled = true;
        button.textContent = "Generating...";

        const logoHTML = logo
            ? `<img src="${logo}" alt="Organization Logo">`
            : `<div class="logo-default">✦</div>`;

        preview.innerHTML = `
            <div class="certificate">

                ${ornaments()}

                <div class="cert-content">

                    <div class="logo">
                        ${logoHTML}
                    </div>

                    <div class="institution">
                        ${safe(institution)}
                    </div>

                    <div class="line"></div>

                    <div class="certificate-title">
                        Certificate
                    </div>

                    <div class="subtitle">
                        OF COMPLETION
                    </div>

                    <div class="presented">
                        This certificate is proudly presented to
                    </div>

                    <div class="student">
                        ${safe(student)}
                    </div>

                    <div class="presented">
                        for successfully completing
                    </div>

                    <div class="course">
                        ${safe(course)}
                    </div>

                    <div class="date">
                        Completed on ${safe(formatDate(date))}
                    </div>

                    <div class="bottom">

                        <div class="bottom-side">
                            <div class="cert-number">
                                Certificate No.<br>
                                <strong>${safe(cert)}</strong>
                            </div>
                        </div>

                        <div class="qr">
                            <img
                                src="${qrCode(cert)}"
                                alt="Certificate Verification QR Code"
                            >
                        </div>

                        <div class="bottom-side signature">

                            ${seal()}

                            <div class="signature-line"></div>

                            <div class="director">
                                ${safe(director)}
                            </div>

                            <div class="authorized">
                                AUTHORIZED SIGNATORY
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div class="status" id="saveStatus">
                Saving certificate...
            </div>

            <div class="actions">
                <button class="pdf-button" id="pdfButton">
                    🖨️ Save / Print PDF
                </button>
            </div>
        `;

        previewArea.style.display = "block";

        document.getElementById("pdfButton").addEventListener(
            "click",
            () => window.print()
        );

        /* Save to Supabase */
        try {

            const { error } = await db
                .from("certificates")
                .insert({
                    student_name: student,
                    course_name: course,
                    completion_date: date,
                    cert_number: cert,
                    institution: institution,
                    director: director
                });

            const status = document.getElementById("saveStatus");

            if (error) {
                console.error("Supabase error:", error);

                status.innerHTML =
                    "⚠️ Certificate generated, but it could not be saved for online verification.";

                status.style.color = "#b00020";

            } else {

                status.innerHTML =
                    "✓ Certificate saved and ready for verification.";

                status.style.color = "#176b35";
            }

        } catch (error) {

            console.error(error);

            document.getElementById("saveStatus").innerHTML =
                "⚠️ Certificate generated, but online saving failed.";

        }

        button.disabled = false;
        button.textContent = "🎓 Generate Certificate";

        previewArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

});
