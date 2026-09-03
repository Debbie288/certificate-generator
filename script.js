/* =========================================================
   XYLARION PREMIUM CERTIFICATE GENERATOR
   COMPLETE REPLACEMENT SCRIPT
   Luxury Gold + Navy + Floral Ornaments
   Center QR + Logo + Supabase + PDF
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    let logoData = "";

    /* =====================================================
       SUPABASE
    ===================================================== */

    const SUPABASE_URL =
        "https://gdophhworvapqctpmyia.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww";

    const db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


    /* =====================================================
       LOGO
    ===================================================== */

    if (logoInput) {

        logoInput.addEventListener("change", () => {

            const file = logoInput.files[0];

            if (!file) {
                logoData = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image.");
                logoInput.value = "";
                logoData = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = e => {
                logoData = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    }


    /* =====================================================
       CAPITALIZATION
    ===================================================== */

    function properCase(text) {

        return text
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }


    /* =====================================================
       CERTIFICATE NUMBER
    ===================================================== */

    function createCertificateNumber() {

        const year = new Date().getFullYear();

        const random =
            Math.floor(100000 + Math.random() * 900000);

        return `CC-${year}-${random}`;
    }


    /* =====================================================
       DATE
    ===================================================== */

    function formatDate(value) {

        if (!value) return "";

        const date = new Date(value + "T00:00:00");

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }


    /* =====================================================
       QR CODE
    ===================================================== */

    function qrCode(certNumber) {

        const verifyURL =
            "https://debbie288.github.io/certificate-generator/verify.html?cert="
            + encodeURIComponent(certNumber);

        const qrURL =
            "https://api.qrserver.com/v1/create-qr-code/"
            + "?size=300x300"
            + "&margin=12"
            + "&data="
            + encodeURIComponent(verifyURL);

        return {
            verifyURL,
            qrURL
        };
    }


    /* =====================================================
       ORNAMENTAL CORNERS
    ===================================================== */

    function ornaments() {

        return `
        <svg
            viewBox="0 0 1200 850"
            preserveAspectRatio="none"
            style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                z-index:1;
                pointer-events:none;
            "
        >

        <g
            fill="none"
            stroke="#C8A45D"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        >

            <!-- TOP LEFT -->

            <path d="
                M35 180
                C55 115 105 65 180 45
                C230 30 275 38 320 65
            "/>

            <path d="
                M55 145
                C95 125 120 88 125 48
            "/>

            <path d="
                M75 118
                C45 92 45 58 70 40
                C103 60 105 92 75 118
            "
            fill="#C8A45D"
            opacity=".28"/>

            <path d="
                M112 82
                C95 50 110 22 142 18
                C158 48 146 72 112 82
            "
            fill="#C8A45D"
            opacity=".25"/>

            <path d="
                M155 60
                C152 32 178 12 204 22
                C212 48 188 66 155 60
            "
            fill="#C8A45D"
            opacity=".25"/>


            <!-- BOTTOM LEFT -->

            <g transform="translate(0 850) scale(1 -1)">

                <path d="
                    M35 180
                    C55 115 105 65 180 45
                    C230 30 275 38 320 65
                "/>

                <path d="
                    M55 145
                    C95 125 120 88 125 48
                "/>

                <path d="
                    M75 118
                    C45 92 45 58 70 40
                    C103 60 105 92 75 118
                "
                fill="#C8A45D"
                opacity=".28"/>

                <path d="
                    M112 82
                    C95 50 110 22 142 18
                    C158 48 146 72 112 82
                "
                fill="#C8A45D"
                opacity=".25"/>

            </g>


            <!-- TOP RIGHT -->

            <g transform="translate(1200 0) scale(-1 1)">

                <path d="
                    M35 180
                    C55 115 105 65 180 45
                    C230 30 275 38 320 65
                "/>

                <path d="
                    M55 145
                    C95 125 120 88 125 48
                "/>

                <path d="
                    M75 118
                    C45 92 45 58 70 40
                    C103 60 105 92 75 118
                "
                fill="#C8A45D"
                opacity=".28"/>

                <path d="
                    M112 82
                    C95 50 110 22 142 18
                    C158 48 146 72 112 82
                "
                fill="#C8A45D"
                opacity=".25"/>

            </g>


            <!-- BOTTOM RIGHT -->

            <g transform="translate(1200 850) scale(-1 -1)">

                <path d="
                    M35 180
                    C55 115 105 65 180 45
                    C230 30 275 38 320 65
                "/>

                <path d="
                    M55 145
                    C95 125 120 88 125 48
                "/>

                <path d="
                    M75 118
                    C45 92 45 58 70 40
                    C103 60 105 92 75 118
                "
                fill="#C8A45D"
                opacity=".28"/>

                <path d="
                    M112 82
                    C95 50 110 22 142 18
                    C158 48 146 72 112 82
                "
                fill="#C8A45D"
                opacity=".25"/>

            </g>

        </g>

        </svg>
        `;
    }


    /* =====================================================
       SAVE CERTIFICATE
    ===================================================== */

    async function saveCertificate(data) {

        try {

            const { error } = await db
                .from("certificates")
                .upsert({
                    student_name: data.student,
                    course_name: data.course,
                    completion_date: data.date,
                    cert_number: data.certNumber,
                    institution: data.institution,
                    director: data.director
                }, {
                    onConflict: "cert_number"
                });

            if (error) {
                console.warn(
                    "Certificate save warning:",
                    error.message
                );
            }

        } catch (error) {

            console.warn(
                "Could not save certificate:",
                error
            );
        }
    }


    /* =====================================================
       GENERATE CERTIFICATE
    ===================================================== */

    form.addEventListener("submit", async event => {

        event.preventDefault();


        /* ---------------------------------------------
           GET FORM VALUES
        --------------------------------------------- */

        const institution =
            properCase(
                document.getElementById("institutionName").value
            );

        const student =
            properCase(
                document.getElementById("studentName").value
            );

        const course =
            properCase(
                document.getElementById("courseName").value
            );

        const date =
            document.getElementById("completionDate").value;

        const director =
            properCase(
                document.getElementById("directorName").value
            );

        const certInput =
            document.getElementById("certNumber").value.trim();

        const certNumber =
            certInput || createCertificateNumber();

        const dateText =
            formatDate(date);

        const qr =
            qrCode(certNumber);


        /* ---------------------------------------------
           LOGO
        --------------------------------------------- */

        const logo = logoData

            ? `
                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:90px;
                    margin-bottom:8px;
                ">
                    <img
                        src="${logoData}"
                        alt="Organization Logo"
                        style="
                            max-width:145px;
                            max-height:85px;
                            width:auto;
                            height:auto;
                            object-fit:contain;
                            display:block;
                        "
                    >
                </div>
              `

            : `
                <div style="
                    height:90px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin-bottom:8px;
                ">
                    <div style="
                        font-size:46px;
                        color:#C8A45D;
                    ">
                        ✦
                    </div>
                </div>
              `;


        /* ---------------------------------------------
           CERTIFICATE HTML
        --------------------------------------------- */

        preview.innerHTML = `

        <div
            id="certificateToPrint"
            style="
                position:relative;
                width:1200px;
                height:850px;
                max-width:100%;
                margin:auto;
                overflow:hidden;
                background:
                    radial-gradient(
                        circle at center,
                        #FFFFFF 0%,
                        #FCFAF5 65%,
                        #F1E9D8 100%
                    );
                border:12px solid #0B1930;
                color:#0B1930;
                font-family:Georgia,'Times New Roman',serif;
                text-align:center;
                box-shadow:0 12px 35px rgba(0,0,0,.18);
            "
        >

            <!-- GOLD BORDERS -->

            <div style="
                position:absolute;
                inset:12px;
                border:3px solid #C8A45D;
                z-index:2;
                pointer-events:none;
            "></div>

            <div style="
                position:absolute;
                inset:22px;
                border:1px solid #C8A45D;
                z-index:2;
                pointer-events:none;
            "></div>


            <!-- FLOWERS -->

            ${ornaments()}


            <!-- MAIN CONTENT -->

            <div style="
                position:relative;
                z-index:5;
                padding:42px 75px 28px;
            ">


                <!-- LOGO -->

                ${logo}


                <!-- INSTITUTION -->

                <div style="
                    font-size:22px;
                    font-weight:bold;
                    letter-spacing:4px;
                    text-transform:uppercase;
                    margin-top:2px;
                ">
                    ${institution}
                </div>


                <!-- GOLD DIVIDER -->

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:12px;
                    margin:12px auto 18px;
                ">

                    <div style="
                        width:150px;
                        height:1px;
                        background:#C8A45D;
                    "></div>

                    <div style="
                        width:8px;
                        height:8px;
                        background:#C8A45D;
                        transform:rotate(45deg);
                    "></div>

                    <div style="
                        width:150px;
                        height:1px;
                        background:#C8A45D;
                    "></div>

                </div>


                <!-- CERTIFY -->

                <div style="
                    font-size:14px;
                    font-weight:bold;
                    letter-spacing:5px;
                ">
                    THIS IS TO CERTIFY THAT
                </div>


                <!-- TITLE -->

                <div style="
                    font-size:58px;
                    line-height:1;
                    letter-spacing:7px;
                    margin-top:10px;
                ">
                    CERTIFICATE
                </div>


                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:15px;
                    margin-top:10px;
                ">

                    <div style="
                        width:130px;
                        height:2px;
                        background:#C8A45D;
                    "></div>

                    <div style="
                        font-size:24px;
                        letter-spacing:5px;
                        color:#9A7028;
                    ">
                        OF COMPLETION
                    </div>

                    <div style="
                        width:130px;
                        height:2px;
                        background:#C8A45D;
                    "></div>

                </div>


                <div style="
                    color:#C8A45D;
                    font-size:22px;
                    margin:7px 0 10px;
                ">
                    ❦
                </div>


                <!-- STUDENT -->

                <div style="
                    width:72%;
                    margin:auto;
                    padding:10px 20px;
                    border-top:2px solid #C8A45D;
                    border-bottom:2px solid #C8A45D;
                ">

                    <div style="
                        font-size:36px;
                        font-weight:bold;
                    ">
                        ${student}
                    </div>

                </div>


                <!-- COURSE TEXT -->

                <div style="
                    margin-top:12px;
                    font-size:13px;
                    letter-spacing:3px;
                    font-weight:bold;
                ">
                    HAS SUCCESSFULLY COMPLETED
                </div>


                <div style="
                    margin-top:5px;
                    font-size:27px;
                    color:#9A7028;
                    font-weight:normal;
                ">
                    ${course}
                </div>


                <div style="
                    margin:4px 0;
                    color:#C8A45D;
                    font-size:18px;
                ">
                    ─── ❦ ───
                </div>


                <!-- DATE -->

                <div style="
                    font-size:13px;
                    letter-spacing:2px;
                    margin-top:2px;
                ">
                    AWARDED ON

                    <span style="
                        color:#9A7028;
                        font-size:16px;
                        margin-left:8px;
                    ">
                        ${dateText}
                    </span>
                </div>


                <!-- BOTTOM AREA -->

                <div style="
                    display:grid;
                    grid-template-columns:1fr 230px 1fr;
                    align-items:end;
                    gap:45px;
                    margin:22px 55px 0;
                ">


                    <!-- CERTIFICATE NUMBER -->

                    <div style="
                        text-align:center;
                        padding-top:20px;
                    ">

                        <div style="
                            color:#9A7028;
                            font-size:13px;
                            font-weight:bold;
                            letter-spacing:2px;
                        ">
                            CERTIFICATE NO.
                        </div>

                        <div style="
                            margin-top:7px;
                            padding:7px;
                            border-top:1px solid #C8A45D;
                            border-bottom:1px solid #C8A45D;
                            font-size:15px;
                        ">
                            ${certNumber}
                        </div>

                    </div>


                    <!-- CENTER QR -->

                    <div style="
                        text-align:center;
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        justify-content:flex-end;
                    ">

                        <div style="
                            padding:9px;
                            background:#FFFFFF;
                            border:3px solid #C8A45D;
                            box-shadow:
                                0 2px 8px rgba(0,0,0,.16);
                            display:inline-flex;
                        ">

                            <img
                                src="${qr.qrURL}"
                                alt="Scan to verify certificate"
                                style="
                                    width:125px;
                                    height:125px;
                                    display:block;
                                "
                            />

                        </div>

                        <div style="
                            margin-top:6px;
                            font-size:11px;
                            font-weight:bold;
                 
