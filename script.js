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

                    border:1px solid 
