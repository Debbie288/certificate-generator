/* =====================================================
   XYLARION CERTIFICATE GENERATOR
   CLEAN SESSION 1
   Premium Certificate + Floral Design
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");
    const logoInput = document.getElementById("logoUpload");

    let logoData = "";

    /* -------------------------------
       LOGO UPLOAD
    -------------------------------- */

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

            reader.onload = function (event) {
                logoData = event.target.result;
            };

            reader.readAsDataURL(file);
        });
    }


    /* -------------------------------
       CERTIFICATE NUMBER
    -------------------------------- */

    function certificateNumber() {

        const year = new Date().getFullYear();

        const number =
            Math.floor(Math.random() * 90000) + 10000;

        return "CERT-" + year + "-" + number;
    }


    /* -------------------------------
       DATE FORMAT
    -------------------------------- */

    function formatDate(value) {

        if (!value) return "";

        const date = new Date(value);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }


    /* -------------------------------
       FLORAL CORNERS
    -------------------------------- */

    function floralCorners() {

        return `
        <svg
            viewBox="0 0 950 670"
            style="
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:5;
            "
        >

            <!-- TOP LEFT -->
            <g fill="none"
               stroke="#C8A45D"
               stroke-width="2">

                <path d="M30 125
                         C45 85,75 55,115 35
                         C135 25,155 20,175 20"/>

                <path d="M55 82
                         C35 65,35 40,55 25
                         C78 38,80 60,55 82Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M92 52
                         C82 30,95 10,115 5
                         C130 25,120 45,92 52Z"
                      fill="#C8A45D"
                      opacity=".20"/>

                <path d="M125 35
                         C125 15,142 5,158 12
                         C165 28,150 40,125 35Z"
                      fill="#C8A45D"
                      opacity=".20"/>

                <circle cx="55" cy="100"
                        r="7"
                        fill="#C8A45D"
                        opacity=".25"/>

                <circle cx="55" cy="100"
                        r="3"
                        fill="#C8A45D"/>

            </g>


            <!-- TOP RIGHT -->
            <g transform="translate(950 0) scale(-1 1)"
               fill="none"
               stroke="#C8A45D"
               stroke-width="2">

                <path d="M30 125
                         C45 85,75 55,115 35
                         C135 25,155 20,175 20"/>

                <path d="M55 82
                         C35 65,35 40,55 25
                         C78 38,80 60,55 82Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M92 52
                         C82 30,95 10,115 5
                         C130 25,120 45,92 52Z"
                      fill="#C8A45D"
                      opacity=".20"/>

                <path d="M125 35
                         C125 15,142 5,158 12
                         C165 28,150 40,125 35Z"
                      fill="#C8A45D"
                      opacity=".20"/>

                <circle cx="55" cy="100"
                        r="7"
                        fill="#C8A45D"
                        opacity=".25"/>

            </g>


            <!-- BOTTOM LEFT -->
            <g transform="translate(0 670) scale(1 -1)"
               fill="none"
               stroke="#C8A45D"
               stroke-width="2">

                <path d="M30 125
                         C45 85,75 55,115 35
                         C135 25,155 20,175 20"/>

                <path d="M55 82
                         C35 65,35 40,55 25
                         C78 38,80 60,55 82Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M92 52
                         C82 30,95 10,115 5
                         C130 25,120 45,92 52Z"
                      fill="#C8A45D"
                      opacity=".20"/>

            </g>


            <!-- BOTTOM RIGHT -->
            <g transform="translate(950 670) scale(-1 -1)"
               fill="none"
               stroke="#C8A45D"
               stroke-width="2">

                <path d="M30 125
                         C45 85,75 55,115 35
                         C135 25,155 20,175 20"/>

                <path d="M55 82
                         C35 65,35 40,55 25
                         C78 38,80 60,55 82Z"
                      fill="#C8A45D"
                      opacity=".22"/>

                <path d="M92 52
                         C82 30,95 10,115 5
                         C130 25,120 45,92 52Z"
                      fill="#C8A45D"
                      opacity=".20"/>

            </g>

        </svg>
        `;
    }


    /* -------------------------------
       GENERATE CERTIFICATE
    -------------------------------- */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const institution =
            document.getElementById("institutionName").value.trim();

        const student =
            document.getElementById("studentName").value.trim();

        const course =
            document.getElementById("courseName").value.trim();

        const date =
            document.getElementById("completionDate").value;

        const certInput =
            document.getElementById("certNumber").value.trim();

        const director =
            document.getElementById("directorName").value.trim();

        const template =
            document.getElementById("templateSelect").value;


        const certNumber =
            certInput || certificateNumber();


        const logo = logoData
            ? `<img src="${logoData}"
                    style="
                        max-width:100px;
                        max-height:70px;
                        object-fit:contain;
                        margin-bottom:10px;
                    ">`
            : `
                <div style="
                    width:70px;
                    height:70px;
                    border-radius:50%;
                    background:#0B1930;
                    border:3px solid #C8A45D;
                    color:#C8A45D;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    margin:0 auto 10px;
                    font-size:28px;
                ">
                    ✦
                </div>
            `;


        preview.innerHTML = `

        <div style="
            position:relative;
            width:100%;
            max-width:950px;
            min-height:670px;
            margin:auto;
            overflow:hidden;
            box-sizing:border-box;

            background:
                radial-gradient(
                    circle at center,
                    #FFFFFF 0%,
                    #FCFAF4 65%,
                    #F3EEDF 100%
                );

            border:14px solid #0B1930;
            box-shadow:
                0 8px 30px rgba(0,0,0,.18);

            color:#0B1930;
            text-align:center;
            font-family:Georgia, "Times New Roman", serif;
        ">

            ${floralCorners()}

            <div style="
                position:relative;
                z-index:10;
                padding:65px 50px 45px;
            ">

                ${logo}

                <div style="
                    font-size:25px;
                    font-weight:bold;
                    letter-spacing:2px;
                    text-transform:uppercase;
                ">
                    ${institution}
                </div>

                <div style="
                    width:110px;
                    height:3px;
                    background:#C8A45D;
                    margin:12px auto 28px;
                "></div>


                <div style="
                    font-size:16px;
                    letter-spacing:3px;
                    text-transform:uppercase;
                ">
                    Certificate of Completion
                </div>


                <div style="
                    margin-top:25px;
                    font-size:16px;
                ">
                    This certificate is proudly presented to
                </div>


                <div style="
                    margin:15px 0;
                    font-size:40px;
                    font-weight:bold;
                    color:#0B1930;
                ">
                    ${student}
                </div>


                <div style="
                    font-size:16px;
                    margin-bottom:10px;
                ">
                    for successfully completing
                </div>


                <div style="
                    font-size:27px;
                    font-weight:bold;
                    color:#8B6B2E;
                    margin-bottom:25px;
                ">
                    ${course}
                </div>


                <div style="
                    font-size:15px;
                ">
                    Completed on ${formatDate(date)}
                </div>


                <div style="
                    display:flex;
                    justify-content:space-around;
                    align-items:flex-end;
                    margin-top:55px;
                    gap:30px;
                ">

                    <div style="width:220px;">
                        <div style="
                            border-top:1px solid #0B1930;
                            padding-top:8px;
                            font-size:14px;
                        ">
                            ${director}
                        </div>
                        <div style="
                            font-size:12px;
                            color:#666;
                            margin-top:3px;
                        ">
                            Director / Authorized Signature
                        </div>
                    </div>


                    <div style="
                        width:90px;
                        height:90px;
                        border-radius:50%;
                        background:#C8A45D;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        box-sizing:border-box;
                    ">

                        <div style="
                            width:72px;
                            height:72px;
                            border:2px solid #0B1930;
                            border-radius:50%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            color:#0B1930;
                            font-size:22px;
                        ">
                            ✦
                        </div>

                    </div>


                    <div style="width:220px;">
                        <div style="
                            border-top:1px solid #0B1930;
                            padding-top:8px;
                            font-size:13px;
                        ">
                            ${certNumber}
                        </div>
                        <div style="
                            font-size:12px;
                            color:#666;
                            margin-top:3px;
                        ">
                            Certificate Number
                        </div>
                    </div>

                </div>

            </div>

        </div>
        `;


        previewArea.style.display = "block";

        previewArea.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

        console.log(
            "Xylarion certificate generated:",
            certNumber,
            template
        );

    });

});
