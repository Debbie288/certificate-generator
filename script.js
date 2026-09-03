document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    let logoData = "";

    // ==============================
    // LOGO
    // ==============================

    if (logoInput) {
        logoInput.addEventListener("change", e => {
            const file = e.target.files[0];

            if (!file) {
                logoData = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image.");
                logoInput.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = e => {
                logoData = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    }

    // ==============================
    // CAPITALIZE
    // ==============================

    function properCase(text) {
        return text
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    // ==============================
    // CERTIFICATE NUMBER
    // ==============================

    function generateNumber() {
        const year = new Date().getFullYear();
        const number = Math.floor(100000 + Math.random() * 900000);

        return `CC-${year}-${number}`;
    }

    // ==============================
    // DATE
    // ==============================

    function formatDate(value) {
        if (!value) return "";

        return new Date(value + "T00:00:00")
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
    }

    // ==============================
    // QR CODE
    // ==============================

    function createQR(certNumber) {

        const verificationURL =
            "https://debbie288.github.io/certificate-generator/verify.html?cert=" +
            encodeURIComponent(certNumber);

        const qrURL =
            "https://api.qrserver.com/v1/create-qr-code/?" +
            "size=300x300&margin=12&data=" +
            encodeURIComponent(verificationURL);

        return {
            verificationURL,
            qrURL
        };
    }

    // ==============================
    // ORNAMENTS
    // ==============================

    function ornaments() {

        return `
        <svg class="ornaments"
             viewBox="0 0 1200 850"
             preserveAspectRatio="none">

            <g fill="none"
               stroke="#C8A45D"
               stroke-width="3"
               stroke-linecap="round">

                <!-- TOP LEFT -->
                <path d="M35 185
                         C55 110 120 55 215 38
                         C255 30 285 35 320 55"/>

                <path d="M55 150
                         C95 130 120 90 125 48"/>

                <path d="M75 125
                         C40 90 50 52 85 35
                         C110 70 105 100 75 125Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M120 90
                         C100 55 120 25 155 22
                         C170 55 155 80 120 90Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M170 62
                         C160 32 190 10 215 25
                         C220 52 205 68 170 62Z"
                      fill="#C8A45D"
                      opacity=".22"/>


                <!-- TOP RIGHT -->
                <g transform="translate(1200 0) scale(-1 1)">

                    <path d="M35 185
                             C55 110 120 55 215 38
                             C255 30 285 35 320 55"/>

                    <path d="M55 150
                             C95 130 120 90 125 48"/>

                    <path d="M75 125
                             C40 90 50 52 85 35
                             C110 70 105 100 75 125Z"
                          fill="#C8A45D"
                          opacity=".22"/>

                    <path d="M120 90
                             C100 55 120 25 155 22
                             C170 55 155 80 120 90Z"
                          fill="#C8A45D"
                          opacity=".22"/>

                    <path d="M170 62
                             C160 32 190 10 215 25
                             C220 52 205 68 170 62Z"
                          fill="#C8A45D"
                          opacity=".22"/>
                </g>


                <!-- BOTTOM LEFT -->
                <g transform="translate(0 850) scale(1 -1)">

                    <path d="M35 185
                             C55 110 120 55 215 38
                             C255 30 285 35 320 55"/>

                    <path d="M55 150
                             C95 130 120 90 125 48"/>

                    <path d="M75 125
                             C40 90 50 52 85 35
                             C110 70 105 100 75 125Z"
                          fill="#C8A45D"
                          opacity=".22"/>

                    <path d="M120 90
                             C100 55 120 25 155 22
                             C170 55 155 80 120 90Z"
                          fill="#C8A45D"
                          opacity=".22"/>
                </g>


                <!-- BOTTOM RIGHT -->
                <g transform="translate(1200 850) scale(-1 -1)">

                    <path d="M35 185
                             C55 110 120 55 215 38
                             C255 30 285 35 320 55"/>

                    <path d="M55 150
                             C95 130 120 90 125 48"/>

                    <path d="M75 125
                             C40 90 50 52 85 35
                             C110 70 105 100 75 125Z"
                          fill="#C8A45D"
                          opacity=".22"/>

                    <path d="M120 90
                             C100 55 120 25 155 22
                             C170 55 155 80 120 90Z"
                          fill="#C8A45D"
                          opacity=".22"/>
                </g>

            </g>
        </svg>
        `;
    }

    // ==============================
    // GENERATE
    // ==============================

    form.addEventListener("submit", e => {

        e.preventDefault();

        const institution =
            properCase(document.getElementById("institutionName").value);

        const student =
            properCase(document.getElementById("studentName").value);

        const course =
            properCase(document.getElementById("courseName").value);

        const date =
            document.getElementById("completionDate").value;

        const certInput =
            document.getElementById("certNumber").value.trim();

        const director =
            properCase(document.getElementById("directorName").value);

        const certNumber =
            certInput || generateNumber();

        const formattedDate =
            formatDate(date);

        const qr =
            createQR(certNumber);

        // ==============================
        // LOGO
        // ==============================

        const logo = logoData
            ? `
                <img src="${logoData}"
                     class="certificate-logo"
                     alt="Organization Logo">
              `
            : "";

        // ==============================
        // CERTIFICATE
        // ==============================

        preview.innerHTML = `

        <div class="premium-certificate">

            ${ornaments()}

            <div class="outer-border"></div>
            <div class="inner-border"></div>

            <div class="certificate-content">

                <!-- LOGO -->

                ${logo}

                <!-- INSTITUTION -->

                <div class="institution">
                    ${institution}
                </div>

                <div class="gold-divider">
                    <span></span>
                    ◆
                    <span></span>
                </div>

                <!-- CERTIFICATE -->

                <div class="small-heading">
                    THIS IS TO CERTIFY THAT
                </div>

                <div class="title">
                    CERTIFICATE
                </div>

                <div class="subtitle">
                    OF COMPLETION
                </div>

                <div class="flourish">❦</div>

                <!-- STUDENT -->

                <div class="student-name">
                    ${student}
                </div>

                <div class="completed">
                    HAS SUCCESSFULLY COMPLETED THE
                </div>

                <div class="course">
                    ${course}
                </div>

                <div class="date">
                    AWARDED ON
                    <strong>${formattedDate}</strong>
                </div>

                <!-- BOTTOM -->

                <div class="bottom-section">

                    <!-- LEFT -->

                    <div class="certificate-number">

                        <div class="gold-label">
                            CERTIFICATE NO.
                        </div>

                        <div class="number">
                            ${certNumber}
                        </div>

                    </div>


                    <!-- CENTER QR -->

                    <div class="qr-section">

                        <div class="qr-frame">

                            <div class="qr-corner tl"></div>
                            <div class="qr-corner tr"></div>
                            <div class="qr-corner bl"></div>
                            <div class="qr-corner br"></div>

                            <img
                                src="${qr.qrURL}"
                                alt="Scan to Verify"
                                class="qr-code"
                            >

                        </div>

                        <div class="qr-label">
                            SCAN TO VERIFY
                        </div>

                    </div>


                    <!-- RIGHT -->

                    <div class="signature">

                        <div class="signature-line">
                            ${director}
                        </div>

                        <div class="signature-title">
                            AUTHORIZED SIGNATORY
                        </div>

                        <div class="seal">
                            <div>
                                ★
                            </div>
                            <span>OFFICIAL</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        `;

        previewArea.style.display = "block";

        previewArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        console.log("Certificate:", certNumber);
        console.log("QR verification:", qr.verificationURL);

    });

});
