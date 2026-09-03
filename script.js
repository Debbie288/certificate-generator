document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    const SUPABASE_URL =
        "https://gdophhworvapqctpmyia.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    let logoData = "";

    /* REMOVE POWERED BY */
    const footer = document.querySelector("footer");
    if (footer) footer.remove();

    /* PREMIUM FONTS */
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
        "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600;700&display=swap";
    document.head.appendChild(font);

    /* LOGO */
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
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                logoData = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    }

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
        const number =
            Math.floor(100000 + Math.random() * 900000);

        return `BFA-${year}-${number}`;
    }

    /* DATE */
    function formatDate(value) {

        if (!value) return "";

        return new Date(value + "T00:00:00")
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
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

    /* STRONG GOLD FLORAL DESIGN */
    function flowers() {

        return `
        <svg
            class="floral"
            viewBox="0 0 1200 850"
            preserveAspectRatio="none"
        >

        <g
            fill="none"
            stroke="#C9A24E"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            <!-- TOP LEFT -->
            <path d="M25 190 C45 105 115 45 230 25"/>
            <path d="M45 155 C90 125 115 70 120 25"/>
            <path d="M70 120 C30 90 35 40 75 18
                     C115 55 105 95 70 120Z"
                  fill="#C9A24E"
                  opacity=".55"/>

            <path d="M115 80 C95 42 120 8 160 12
                     C178 50 150 76 115 80Z"
                  fill="#C9A24E"
                  opacity=".5"/>

            <path d="M165 55 C160 20 195 3 220 22
                     C225 55 195 70 165 55Z"
                  fill="#C9A24E"
                  opacity=".5"/>

            <path d="M65 160 C115 145 150 180 150 230"/>

            <path d="M75 155 C45 180 50 220 85 238
                     C105 198 100 170 75 155Z"
                  fill="#C9A24E"
                  opacity=".5"/>

            <circle cx="48" cy="180" r="9"
                    fill="#C9A24E"/>

            <!-- TOP RIGHT -->
            <g transform="translate(1200 0) scale(-1 1)">
                <path d="M25 190 C45 105 115 45 230 25"/>
                <path d="M45 155 C90 125 115 70 120 25"/>

                <path d="M70 120 C30 90 35 40 75 18
                         C115 55 105 95 70 120Z"
                      fill="#C9A24E"
                      opacity=".55"/>

                <path d="M115 80 C95 42 120 8 160 12
                         C178 50 150 76 115 80Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <path d="M165 55 C160 20 195 3 220 22
                         C225 55 195 70 165 55Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <path d="M65 160 C115 145 150 180 150 230"/>

                <path d="M75 155 C45 180 50 220 85 238
                         C105 198 100 170 75 155Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <circle cx="48" cy="180" r="9"
                        fill="#C9A24E"/>
            </g>

            <!-- BOTTOM LEFT -->
            <g transform="translate(0 850) scale(1 -1)">
                <path d="M25 190 C45 105 115 45 230 25"/>
                <path d="M45 155 C90 125 115 70 120 25"/>

                <path d="M70 120 C30 90 35 40 75 18
                         C115 55 105 95 70 120Z"
                      fill="#C9A24E"
                      opacity=".55"/>

                <path d="M115 80 C95 42 120 8 160 12
                         C178 50 150 76 115 80Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <path d="M165 55 C160 20 195 3 220 22
                         C225 55 195 70 165 55Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <circle cx="48" cy="180" r="9"
                        fill="#C9A24E"/>
            </g>

            <!-- BOTTOM RIGHT -->
            <g transform="translate(1200 850) scale(-1 -1)">
                <path d="M25 190 C45 105 115 45 230 25"/>
                <path d="M45 155 C90 125 115 70 120 25"/>

                <path d="M70 120 C30 90 35 40 75 18
                         C115 55 105 95 70 120Z"
                      fill="#C9A24E"
                      opacity=".55"/>

                <path d="M115 80 C95 42 120 8 160 12
                         C178 50 150 76 115 80Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <path d="M165 55 C160 20 195 3 220 22
                         C225 55 195 70 165 55Z"
                      fill="#C9A24E"
                      opacity=".5"/>

                <circle cx="48" cy="180" r="9"
                        fill="#C9A24E"/>
            </g>

        </g>

        <!-- GOLD CENTER ORNAMENTS -->

        <g fill="#C9A24E">

            <circle cx="600" cy="42" r="5"/>
            <circle cx="600" cy="808" r="5"/>

            <path d="M575 42
                     Q600 15 625 42
                     Q600 69 575 42Z"
                  opacity=".65"/>

            <path d="M575 808
                     Q600 781 625 808
                     Q600 835 575 808Z"
                  opacity=".65"/>

        </g>

        </svg>
        `;
    }

    /* GENERATE */
    form.addEventListener("submit", async e => {

        e.preventDefault();

        const button =
            document.getElementById("generateBtn");

        if (button) {
            button.disabled = true;
            button.textContent = "⏳ Generating...";
        }

        try {

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

            /* SAVE TO SUPABASE */

            const { error } =
                await supabaseClient
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
                    error.message
                        .toLowerCase()
                        .includes("duplicate")
                ) {

                    alert(
                        "This certificate number already exists. Please enter another number."
                    );

                    return;
                }

                throw error;
            }

            /* LOAD QR */

            await loadQR();

            const verificationURL =
                "https://debbie288.github.io/certificate-generator/verify.html?cert="
                + encodeURIComponent(certNumber);

            /* CUSTOMER LOGO */

            const logoHTML = logoData
                ? `
                <div class="logo">
                    <img src="${logoData}" alt="Organization Logo">
                </div>
                `
                : `
                <div class="logo emptyLogo">
                    <span>✦</span>
                </div>
                `;

            /* CERTIFICATE */

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
                        #fffef9 0%,
                        #fbf7ed 65%,
                        #f0e5c9 100%
                    );

                border:12px solid #071A35;

                color:#071A35;

                font-family:
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                box-shadow:
                    0 12px 35px rgba(0,0,0,.20);

                margin:auto;
            }

            .floral {
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:1;
            }

            .goldBorder {
                position:absolute;
                inset:12px;
                border:3px solid #C9A24E;
                z-index:2;
                pointer-events:none;
            }

            .goldBorder2 {
                position:absolute;
                inset:21px;
                border:1px solid #C9A24E;
                z-index:2;
                pointer-events:none;
            }

            .content {
                position:relative;
                z-index:5;
                width:100%;
                height:100%;
                text-align:center;
                padding:38px 75px;
            }

            .logo {
                width:95px;
                height:95px;
                margin:0 auto 9px;
                display:flex;
                align-items:center;
                justify-content:center;
                overflow:hidden;
                background:white;
                border:3px solid #C9A24E;
                box-shadow:
                    0 2px 8px rgba(0,0,0,.15);
            }

            .logo img {
                width:100%;
                height:100%;
                object-fit:contain;
            }

            .emptyLogo {
                color:#C9A24E;
                font-size:42px;
            }

            .institution {
                font-size:27px;
                font-weight:700;
                letter-spacing:5px;
                text-transform:uppercase;
            }

            .line {
                width:390px;
                height:2px;
                background:#C9A24E;
                margin:9px auto 13px;
            }

            .title {
                font-size:55px;
                font-weight:600;
                letter-spacing:4px;
                line-height:1;
            }

            .ornament {
                color:#C9A24E;
                font-size:24px;
                margin:5px 0;
            }

            .certify {
                font-size:16px;
                letter-spacing:4px;
                margin-top:2px;
            }

            .student {
                font-family:"Great Vibes",cursive;
                font-size:68px;
                line-height:1;
                margin-top:1px;
            }

            .studentLine {
                width:500px;
                height:2px;
                background:#C9A24E;
                margin:2px auto 9px;
            }

            .completed {
                font-size:16px;
                letter-spacing:3px;
            }

            .course {
                font-size:35px;
                color:#A27727;
                margin-top:3px;
            }

            .awarded {
                font-size:15px;
                letter-spacing:2px;
                margin-top:4px;
            }

            /*
               BOTTOM THREE-COLUMN LAYOUT
               LEFT = NUMBER
               CENTER = QR
               RIGHT = SIGNATURE
            */

            .bottom {
                position:absolute;
                left:80px;
                right:80px;
                bottom:35px;

                display:grid;

                grid-template-columns:
                    1fr
                    190px
                    1fr;

                align-items:end;

                column-gap:70px;
            }

            .certNo {
                text-align:center;
            }

            .smallGold {
                color:#A27727;
                font-size:14px;
                font-weight:bold;
                letter-spacing:2px;
            }

            .number {
                font-size:18px;
                margin-top:6px;
                padding:6px;
                border-top:1px solid #C9A24E;
                border-bottom:1px solid #C9A24E;
            }

            /* CENTER QR */

            .qrBox {
                width:190px;
                text-align:center;
                justify-self:center;
            }

            .qrFrame {
                width:150px;
                height:150px;
                margin:auto;
                padding:9px;
                background:white;
                border:4px solid #C9A24E;
                outline:1px solid #C9A24E;
                outline-offset:4px;
                box-shadow:
                    0 3px 10px rgba(0,0,0,.18);
            }

            #qrCode {
                width:128px;
                height:128px;
                margin:auto;
            }

            #qrCode img,
            #qrCode canvas {
                width:128px !important;
                height:128px !important;
                display:block;
            }

            .verifyText {
                margin-top:7px;
                color:#A27727;
                font-size:12px;
                font-weight:bold;
                letter-spacing:2px;
            }

            /* RIGHT SIGNATURE */

            .signature {
                text-align:center;
                justify-self:end;
                width:220px;
            }

            .signatureName {
                font-family:"Great Vibes",cursive;
                font-size:39px;
                line-height:1;
                border-bottom:1px solid #071A35;
                padding-bottom:5px;
            }

            .signatureTitle {
                margin-top:6px;
                font-size:15px;
                letter-spacing:2px;
            }

            /* GOLD SEAL */

            .seal {
                position:absolute;
                right:52px;
                bottom:42px;

                width:92px;
                height:92px;

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        #f7df99 0%,
                        #C9A24E 55%,
                        #956C20 100%
                    );

                border:4px solid #C9A24E;

                box-shadow:
                    0 3px 9px rgba(0,0,0,.22);

                display:flex;
                align-items:center;
                justify-content:center;
            }

            .sealInner {
                width:67px;
                height:67px;

                border:2px solid #071A35;
                border-radius:50%;

                display:flex;
                align-items:center;
                justify-content:center;

                color:#071A35;
                font-size:28px;
            }

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

            /* PRINT / PDF */

            @page {
                size:landscape;
                margin:0;
            }

            @media print {

                html,
                body {
                    width:100%;
                    height:100%;
                    margin:0 !important;
                    padding:0 !important;
                    background:white;
                }

                body * {
                    visibility:hidden;
                }

                #certificatePreview,
                #certificatePreview * {
                    visibility:visible;
                }

                #certificatePreview {
                    position:absolute;
                    left:0;
                    top:0;
                    width:100%;
                    margin:0;
                    padding:0;
                }

                .certificate {
                    width:1200px !important;
                    height:850px !important;
                    margin:0 !important;
                    box-shadow:none !important;
                    transform:none !important;
                }

                .printBtn {
                    display:none !important;
                }

                .floral,
                .goldBorder,
                .goldBorder2,
                .seal {
                    -webkit-print-color-adjust:exact !important;
                    print-color-adjust:exact !important;
                }

            }

            </style>

            <div class="certificate">

                <div class="goldBorder"></div>
                <div class="goldBorder2"></div>

                ${flowers()}

                <div class="content">

                    ${logoHTML}

                    <div class="institution">
                        ${institution}
                    </div>

                          <div class="line"></div>

                    <div class="title">
                        CERTIFICATE OF COMPLETION
                    </div>

                    <div class="ornament">
                        ─── ❦ ───
                    </div>

                    <div class="certify">
                        THIS IS TO CERTIFY THAT
                    </div>

                    <div class="student">
                        ${student}
                    </div>

                    <div class="studentLine"></div>

                    <div class="completed">
                        HAS SUCCESSFULLY COMPLETED THE COURSE IN
                    </div>

                    <div class="course">
                        ${course}
                    </div>

                    <div class="awarded">
                        AWARDED ON ${formattedDate.toUpperCase()}
                    </div>

                    <!-- BOTTOM -->

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
                            </div>

                        </div>

                        <!-- RIGHT -->

                        <div class="signature">

                            <div class="signatureName">
                                ${director}
                            </div>

                            <div class="signatureTitle">
                                AUTHORIZED SIGNATORY
                            </div>

                        </div>

                    </div>

                    <!-- SEAL -->

                    <div class="seal">

                        <div class="sealInner">
                            ♕
                        </div>

                    </div>

                </div>

            </div>

            <button
                class="printBtn"
                onclick="window.print()"
            >
                🖨️ Save Certificate as PDF
            </button>
            `;

            /* CREATE QR */

            new QRCode(
                document.getElementById("qrCode"),
                {
                    text: verificationURL,
                    width:128,
                    height:128,
                    correctLevel:
                        QRCode.CorrectLevel.H
                }
            );

            /* SHOW */

            previewArea.style.display = "block";

            previewArea.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

            console.log(
                "Certificate generated:",
                certNumber
            );

            console.log(
                "Verification URL:",
                verificationURL
            );

        }

        catch (error) {

            console.error(
                "Certificate generation error:",
                error
            );

            alert(
                "Certificate could not be generated.\n\n" +
                error.message
            );

        }

        finally {

            if (button) {
                button.disabled = false;
                button.textContent =
                    "🎓 Generate Certificate";
            }

        }

    });

});
