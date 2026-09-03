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
                    box-shadow:
                        0 3px 12px rgba(0,0,0,.18);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">

                    <img
                        src="${logoData}"
                        alt="Organization Logo"
                        style="
                            width:100%;
                            height:100%;
                            border-radius:50%;
                            object-fit:contain;
                            display:block;
                        "
                    >

                </div>

            `;

        }


        return `

            <div style="
                width:105px;
                height:105px;
                margin:0 auto 12px;
                border-radius:50%;
                background:${COLORS.navy};
                border:5px solid ${COLORS.gold};
                box-shadow:
                    0 3px 12px rgba(0,0,0,.20);
                display:flex;
                align-items:center;
                justify-content:center;
            ">

                <div style="
                    width:86px;
                    height:86px;
                    border-radius:50%;
                    border:2px solid ${COLORS.gold};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:${COLORS.gold};
                    font-family:Georgia,serif;
                    font-size:42px;
                ">
                    ✦
                </div>

            </div>

        `;
    }


    /* =====================================================
       14. GOLD SEAL
    ===================================================== */

    function createGoldSeal() {

        return `

            <div style="
                width:100px;
                height:100px;
                border-radius:50%;
                background:
                    radial-gradient(
                        circle,
                        #F3D67A 0%,
                        ${COLORS.gold} 45%,
                        ${COLORS.darkGold} 100%
                    );
                border:4px solid ${COLORS.gold};
                box-shadow:
                    0 4px 12px rgba(0,0,0,.20);
                display:flex;
                align-items:center;
                justify-content:center;
                flex-shrink:0;
            ">

                <div style="
                    width:82px;
                    height:82px;
                    border-radius:50%;
                    border:2px solid ${COLORS.navy};
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    text-align:center;
                    color:${COLORS.navy};
                    font-family:Georgia,serif;
                ">

                    <div>

                        <div style="
                            font-size:24px;
                            margin-bottom:3px;
                        ">
                            ♛
                        </div>

                        <div style="
                            font-size:9px;
                            font-weight:bold;
                            letter-spacing:1px;
                        ">
                            VERIFIED
                        </div>

                        <div style="
                            font-size:7px;
                            letter-spacing:1px;
                            margin-top:2px;
                        ">
                            CREDENTIAL
                        </div>

                    </div>

                </div>

            </div>

        `;
    }


    /* =====================================================
       15. SAVE CERTIFICATE TO SUPABASE
    ===================================================== */

    async function saveCertificate(data) {

        if (!supabaseClient) {

            return {
                success: false,
                error:
                    "Supabase connection is not available."
            };
        }


        try {

            const result =
                await supabaseClient
                    .from("certificates")
                    .insert([
                        {
                            student_name:
                                data.studentName,

                            course_name:
                                data.courseName,

                            completion_date:
                                data.completionDate,

                            cert_number:
                                data.certNumber,

                            institution:
                                data.institution,

                            director:
                                data.director
                        }
                    ]);


            if (result.error) {

                return {
                    success: false,
                    error:
                        result.error.message
                };
            }


            return {
                success: true,
                data: result.data
            };

        }

        catch (error) {

            return {
                success: false,
                error:
                    error.message ||
                    "Unknown database error."
            };

        }

    }


    /* =====================================================
       16. CERTIFICATE HTML
    ===================================================== */

    function createCertificate(data) {

        const qrURL =
            createQRCodeURL(
                data.certNumber
            );


        return `

        <div
            id="printableCertificate"
            style="
                position:relative;
                width:1200px;
                min-height:850px;
                max-width:100%;
                margin:0 auto;
                overflow:hidden;
                background:
                    radial-gradient(
                        circle at center,
                        #FFFFFF 0%,
                        ${COLORS.ivory} 68%,
                        #F1E8D2 100%
                    );
                border:12px solid ${COLORS.navy};
                box-shadow:
                    0 10px 35px rgba(0,0,0,.20);
                color:${COLORS.navy};
                text-align:center;
                font-family:
                    Georgia,
                    'Times New Roman',
                    serif;
                box-sizing:border-box;
            "
        >


            <!-- =================================================
                 GOLD BORDER
            ================================================== -->

            <div style="
                position:absolute;
                inset:13px;
                border:3px solid ${COLORS.gold};
                pointer-events:none;
                z-index:2;
            "></div>


            <div style="
                position:absolute;
                inset:23px;
                border:1px solid ${COLORS.gold};
                pointer-events:none;
                z-index:2;
            "></div>


            <!-- =================================================
                 FLOWERS
            ================================================== -->

            ${createFloralCorners()}


            <!-- =================================================
                 MAIN CONTENT
            ================================================== -->

            <div style="
                position:relative;
                z-index:10;
                padding:
                    42px
                    80px
                    28px;
            ">


                <!-- LOGO -->

                ${createLogo()}


                <!-- INSTITUTION -->

                <div style="
                    font-size:23px;
                    font-weight:bold;
                    letter-spacing:4px;
                    text-transform:uppercase;
                    margin-bottom:12px;
                ">
                    ${escapeHTML(
                        data.institution
                    )}
                </div>


                <!-- GOLD ORNAMENT LINE -->

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:12px;
                    margin-bottom:16px;
                ">

                    <div style="
                        width:105px;
                        height:1px;
                        background:${COLORS.gold};
                    "></div>

                    <div style="
                        width:8px;
                        height:8px;
                        background:${COLORS.gold};
                        transform:rotate(45deg);
                    "></div>

                    <div style="
                        width:105px;
                        height:1px;
                        background:${COLORS.gold};
                    "></div>

                </div>


                <!-- TITLE -->

                <div style="
                    font-size:58px;
                    line-height:1;
                    letter-spacing:5px;
                    font-weight:normal;
                    color:${COLORS.navy};
                ">
                    CERTIFICATE
                </div>


                <div style="
                    font-size:27px;
                    letter-spacing:6px;
                    color:${COLORS.darkGold};
                    margin-top:9px;
                    margin-bottom:11px;
                ">
                    OF COMPLETION
                </div>


                <!-- ORNAMENT -->

                <div style="
                    color:${COLORS.gold};
                    font-size:25px;
                    margin-bottom:8px;
                ">
                    ─── ❦ ───
                </div>


                <!-- THIS IS TO CERTIFY -->

                <div style="
                    font-size:16px;
                    letter-spacing:4px;
                    font-weight:bold;
                    margin-bottom:8px;
                ">
                    THIS IS TO CERTIFY THAT
                </div>


                <!-- STUDENT -->

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:18px;
                    margin:0 auto 12px;
                    width:82%;
                ">

                    <div style="
                        flex:1;
                        height:1px;
                        background:${COLORS.gold};
                    "></div>

                    <div style="
                        font-size:45px;
                        color:${COLORS.darkGold};
                        white-space:nowrap;
                    ">
                        ${escapeHTML(
                            data.studentName
                        )}
                    </div>

                    <div style="
                        flex:1;
                        height:1px;
                        background:${COLORS.gold};
                    "></div>

                </div>


                <!-- COMPLETION -->

                <div style="
                    font-size:15px;
                    letter-spacing:3px;
                    font-weight:bold;
                    margin-top:4px;
                ">
                    HAS SUCCESSFULLY COMPLETED THE COURSE IN
                </div>


                <!-- COURSE -->

                <div style="
                    font-size:31px;
                    color:${COLORS.navy};
                    margin-top:7px;
                    margin-bottom:4px;
                ">
                    ${escapeHTML(
                        data.courseName
                    )}
                </div>


                <!-- COURSE ORNAMENT -->

                <div style="
                    color:${COLORS.gold};
                    font-size:20px;
                    margin-bottom:5px;
                ">
                    ─── ❦ ───
                </div>


                <!-- DATE -->

                <div style="
                    font-size:15px;
                    letter-spacing:2px;
                    margin-bottom:20px;
                ">

                    AWARDED ON

                    <span style="
                        color:${COLORS.darkGold};
                        font-size:17px;
                        margin-left:9px;
                    ">
                        ${escapeHTML(
                            data.formattedDate
                        )}
                    </span>

                </div>


                <!-- =================================================
                     BOTTOM SECTION
                     LEFT = NUMBER
                     CENTER = QR
                     RIGHT = SIGNATURE + SEAL
                ================================================== -->

                <div style="
                    display:grid;
                    grid-template-columns:
                        1fr
                        190px
                        1fr;
                    align-items:center;
                    gap:45px;
                    width:88%;
                    margin:0 auto;
                    min-height:165px;
                ">


                    <!-- LEFT -->

                    <div style="
                        text-align:center;
                    ">

                        <div style="
                            font-size:14px;
                            font-weight:bold;
                            letter-spacing:2px;
                            color:${COLORS.darkGold};
                        ">
                            CERTIFICATE NO.
                        </div>

                        <div style="
                            margin-top:9px;
                            padding:8px 5px;
                            border-top:
                                1px solid ${COLORS.gold};
                            border-bottom:
                                1px solid ${COLORS.gold};
                            font-size:17px;
                            letter-spacing:1px;
                        ">
                            ${escapeHTML(
                                data.certNumber
                            )}
                        </div>

                    </div>


                    <!-- CENTER QR -->

                    <div style="
                        text-align:center;
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        justify-content:center;
                    ">

                        <div style="
                            display:inline-flex;
                            align-items:center;
                            justify-content:center;
                            padding:8px;
                            background:#FFFFFF;
                            border:3px solid ${COLORS.gold};
                            box-shadow:
                                0 2px 8px rgba(0,0,0,.15);
                        ">

                            <img
                                src="${qrURL}"
                                alt="Certificate Verification QR Code"
                                style="
                                    width:125px;
                                    height:125px;
                                    display:block;
                                "
                            >

                        </div>


                        <div style="
                            margin-top:7px;
                            font-size:11px;
                            font-weight:bold;
                            letter-spacing:2px;
                            color:${COLORS.darkGold};
                        ">
                            SCAN TO VERIFY
                        </div>

                    </div>


                    <!-- RIGHT -->

                    <div style="
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        gap:15px;
                        text-align:center;
                    ">


                        <!-- SIGNATURE -->

                        <div style="
                            min-width:155px;
                        ">

                            <div style="
                                font-family:
                                    'Brush Script MT',
                                    'Segoe Script',
                                    cursive;
                                font-size:30px;
                                color:${COLORS.navy};
                                margin-bottom:4px;
                            ">
                                ${escapeHTML(
                                    data.director
                                )}
                            </div>

                            <div style="
                                width:155px;
                                height:1px;
                                background:${COLORS.gold};
                                margin:auto;
                            "></div>

                            <div style="
                                margin-top:7px;
                                font-size:12px;
                                letter-spacing:1px;
                                font-weight:bold;
                            ">
                                AUTHORIZED SIGNATORY
                            </div>

                        </div>


                        <!-- SEAL -->

                        ${createGoldSeal()}

                    </div>

                </div>


                <!-- BOTTOM ORNAMENT -->

                <div style="
                    margin-top:12px;
                    color:${COLORS.gold};
                    font-size:19px;
                ">
                    ───── ❦ ─────
                </div>


            </div>

        </div>

        `;
    }


    /* =====================================================
       17. PRINT / SAVE AS PDF
    ===================================================== */

    function createPrintButton() {

        const oldButtons =
            document.getElementById(
                "certificateActions"
            );

        if (oldButtons) {
            oldButtons.remove();
        }


        const actions =
            document.createElement("div");

        actions.id =
            "certificateActions";

        actions.style.cssText = `
            display:flex;
            justify-content:center;
            gap:12px;
            flex-wrap:wrap;
            margin-top:20px;
        `;


        actions.innerHTML = `

            <button
                type="button"
                id="printCertificateBtn"
                style="
                    padding:13px 22px;
                    border:none;
                    border-radius:8px;
                    background:#0B1930;
                    color:white;
                    font-size:15px;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                🖨️ Print / Save PDF
            </button>

        `;


        previewArea.appendChild(actions);


        document
            .getElementById(
                "printCertificateBtn"
            )
            .addEventListener(
                "click",
                function () {

                    printCertificate();

                }
            );

    }


    /* =====================================================
       18. PRINT FUNCTION
    ===================================================== */

    function printCertificate() {

        const certificate =
            document.getElementById(
                "printableCertificate"
            );

        if (!certificate) {

            alert(
                "Please generate a certificate first."
            );

            return;
        }


        const printWindow =
            window.open(
                "",
                "_blank"
            );


        if (!printWindow) {

            alert(
                "Please allow pop-ups to print the certificate."
            );

            return;
        }


        printWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    Certificate
                </title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                >

                <style>

                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }

                    html,
                    body {
                        margin:0;
                        padding:0;
                        width:100%;
                        height:100%;
                        background:white;
                    }

                    body {
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    }

                    #printCertificate {
                        width:100vw;
                        height:100vh;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    }

                    #printCertificate > div {
                        width:96vw !important;
                        max-width:none !important;
                        transform:none !important;
                    }

                </style>

            </head>

            <body>

                <div id="printCertificate">

                    ${certificate.outerHTML}

                </div>

                <script>

                    window.onload = function() {

                        setTimeout(
                            function() {

                                window.print();

                            },
                            700
                        );

                    };

                <\/script>

            </body>

            </html>

        `);


        printWindow.document.close();

    }


    /* =====================================================
       19. FORM SUBMISSION
    ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM DATA
            --------------------------------------------- */

            const institution =
                properCase(
                    document
                        .getElementById(
                            "institutionName"
                        )
                        .value
                );


            const studentName =
                properCase(
                    document
                        .getElementById(
                            "studentName"
                        )
                        .value
                );


            const courseName =
                properCase(
                    document
                        .getElementById(
                            "courseName"
                        )
                        .value
                );


            const completionDate =
                document
                    .getElementById(
                        "completionDate"
                    )
                    .value;


            const certInput =
                document
                    .getElementById(
                        "certNumber"
                    )
                    .value
                    .trim();


            const director =
                properCase(
                    document
                        .getElementById(
                            "directorName"
                        )
                        .value
                );


            const certNumber =
                certInput ||
                createCertificateNumber();


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (
                !institution ||
                !studentName ||
                !courseName ||
                !completionDate ||
                !director
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;
            }


            /* ---------------------------------------------
               DATA OBJECT
            --------------------------------------------- */

            const certificateData = {

                institution:
                    institution,

                studentName:
                    studentName,

                courseName:
                    courseName,

                completionDate:
                    completionDate,

                formattedDate:
                    formatDate(
                        completionDate
                    ),

                certNumber:
                    certNumber,

                director:
                    director

            };


            /* ---------------------------------------------
               SHOW PREVIEW
            --------------------------------------------- */

            preview.innerHTML =
                createCertificate(
                    certificateData
                );


            previewArea.style.display =
                "block";


            createPrintButton();


            /* ---------------------------------------------
               SCROLL TO CERTIFICATE
            --------------------------------------------- */

            setTimeout(
                function () {

                    previewArea.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                100
            );


            /* ---------------------------------------------
               SAVE TO SUPABASE
            --------------------------------------------- */

            const saveResult =
                await saveCertificate(
                    certificateData
                );


            if (saveResult.success) {

                console.log(
                    "Certificate saved successfully:",
                    certificateData.certNumber
                );

            } else {

                console.error(
                    "Certificate save failed:",
                    saveResult.error
                );


                alert(
                    "Certificate generated successfully, but it could not be saved to the verification database.\n\n" +
                    "Database message:\n" +
                    saveResult.error
                );

            }

        }
    );


    /* =====================================================
       20. INITIAL MESSAGE
    ===================================================== */

    console.log(
        "Xylarion Premium Certificate Generator loaded successfully."
    );

});
       
