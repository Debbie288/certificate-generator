/* =====================================================
XYLARION PREMIUM CERTIFICATE GENERATOR
SESSION 1
Luxury Gold + Navy + Ornamental Floral Design
QR Code Included
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("certificateForm");  
const previewArea = document.getElementById("previewArea");  
const preview = document.getElementById("certificatePreview");  
const logoInput = document.getElementById("logoUpload");  

let logoData = "";  

/* =========================  
   LOGO UPLOAD  
========================= */  

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


/* =========================  
   CERTIFICATE NUMBER  
========================= */  

function createCertificateNumber() {  

    const year = new Date().getFullYear();  

    const number =  
        Math.floor(Math.random() * 900000) + 100000;  

    return "CC-" + year + "-" + number;  
}  


/* =========================  
   DATE  
========================= */  

function formatDate(value) {  

    if (!value) return "";  

    const date = new Date(value);  

    return date.toLocaleDateString("en-US", {  
        year: "numeric",  
        month: "long",  
        day: "numeric"  
    });  
}  


/* =========================  
   QR CODE  
========================= */  

function createQRCode(certNumber) {  

    const verificationURL =  
        "https://debbie288.github.io/certificate-generator/verify.html?cert="  
        + encodeURIComponent(certNumber);  

    const qrURL =  
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data="  
        + encodeURIComponent(verificationURL);  

    return {  
        verificationURL: verificationURL,  
        qrURL: qrURL  
    };  
}  


/* =========================  
   LUXURY ORNAMENTAL CORNERS  
========================= */  

function ornamentalCorners() {  

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

        <!-- TOP LEFT -->  
        <g fill="none"  
           stroke="#C8A45D"  
           stroke-width="4"  
           stroke-linecap="round"  
           stroke-linejoin="round">  

            <path d="M35 180  
                     C55 120 100 75 175 48  
                     C225 30 270 35 315 58"/>  

            <path d="M48 145  
                     C82 125 112 90 122 48"/>  

            <path d="M75 118  
                     C45 92 42 58 68 38  
                     C105 58 111 91 75 118Z"  
                  fill="#C8A45D"  
                  opacity=".30"/>  

            <path d="M110 82  
                     C92 48 108 20 142 16  
                     C160 49 145 73 110 82Z"  
                  fill="#C8A45D"  
                  opacity=".28"/>  

            <path d="M155 60  
                     C150 30 177 8 205 20  
                     C215 50 188 67 155 60Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <path d="M70 153  
                     C110 148 139 170 145 207"/>  

            <path d="M83 150  
                     C55 165 48 197 63 221  
                     C92 207 101 177 83 150Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <circle cx="53" cy="177" r="8"  
                    fill="#C8A45D"/>  

            <circle cx="53" cy="177" r="15"  
                    opacity=".35"/>  
        </g>  


        <!-- TOP RIGHT -->  
        <g transform="translate(1200 0) scale(-1 1)"  
           fill="none"  
           stroke="#C8A45D"  
           stroke-width="4"  
           stroke-linecap="round"  
           stroke-linejoin="round">  

            <path d="M35 180  
                     C55 120 100 75 175 48  
                     C225 30 270 35 315 58"/>  

            <path d="M48 145  
                     C82 125 112 90 122 48"/>  

            <path d="M75 118  
                     C45 92 42 58 68 38  
                     C105 58 111 91 75 118Z"  
                  fill="#C8A45D"  
                  opacity=".30"/>  

            <path d="M110 82  
                     C92 48 108 20 142 16  
                     C160 49 145 73 110 82Z"  
                  fill="#C8A45D"  
                  opacity=".28"/>  

            <path d="M155 60  
                     C150 30 177 8 205 20  
                     C215 50 188 67 155 60Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <path d="M70 153  
                     C110 148 139 170 145 207"/>  

            <path d="M83 150  
                     C55 165 48 197 63 221  
                     C92 207 101 177 83 150Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <circle cx="53" cy="177" r="8"  
                    fill="#C8A45D"/>  

            <circle cx="53" cy="177" r="15"  
                    opacity=".35"/>  
        </g>  


        <!-- BOTTOM LEFT -->  
        <g transform="translate(0 850) scale(1 -1)"  
           fill="none"  
           stroke="#C8A45D"  
           stroke-width="4"  
           stroke-linecap="round"  
           stroke-linejoin="round">  

            <path d="M35 180  
                     C55 120 100 75 175 48  
                     C225 30 270 35 315 58"/>  

            <path d="M48 145  
                     C82 125 112 90 122 48"/>  

            <path d="M75 118  
                     C45 92 42 58 68 38  
                     C105 58 111 91 75 118Z"  
                  fill="#C8A45D"  
                  opacity=".30"/>  

            <path d="M110 82  
                     C92 48 108 20 142 16  
                     C160 49 145 73 110 82Z"  
                  fill="#C8A45D"  
                  opacity=".28"/>  

            <path d="M155 60  
                     C150 30 177 8 205 20  
                     C215 50 188 67 155 60Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <circle cx="53" cy="177" r="8"  
                    fill="#C8A45D"/>  
        </g>  


        <!-- BOTTOM RIGHT -->  
        <g transform="translate(1200 850) scale(-1 -1)"  
           fill="none"  
           stroke="#C8A45D"  
           stroke-width="4"  
           stroke-linecap="round"  
           stroke-linejoin="round">  

            <path d="M35 180  
                     C55 120 100 75 175 48  
                     C225 30 270 35 315 58"/>  

            <path d="M48 145  
                     C82 125 112 90 122 48"/>  

            <path d="M75 118  
                     C45 92 42 58 68 38  
                     C105 58 111 91 75 118Z"  
                  fill="#C8A45D"  
                  opacity=".30"/>  

            <path d="M110 82  
                     C92 48 108 20 142 16  
                     C160 49 145 73 110 82Z"  
                  fill="#C8A45D"  
                  opacity=".28"/>  

            <path d="M155 60  
                     C150 30 177 8 205 20  
                     C215 50 188 67 155 60Z"  
                  fill="#C8A45D"  
                  opacity=".25"/>  

            <circle cx="53" cy="177" r="8"  
                    fill="#C8A45D"/>  
        </g>  

    </svg>  
    `;  
}  


/* =========================  
   FORM SUBMIT  
========================= */  

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

    const certNumber =  
        certInput || createCertificateNumber();  

    const formattedDate = formatDate(date);  

    const qr = createQRCode(certNumber);  


    /* =========================  
       LOGO  
    ========================= */  

    const logo = logoData  

        ? `  
            <img  
                src="${logoData}"  
                style="  
                    width:90px;  
                    height:70px;  
                    object-fit:contain;  
                    display:block;  
                    margin:0 auto 8px;  
                "  
            >  
          `  

        : `  
            <div style="  
                width:82px;  
                height:82px;  
                border-radius:50%;  
                background:#0B1930;  
                border:5px solid #C8A45D;  
                display:flex;  
                align-items:center;  
                justify-content:center;  
                margin:0 auto 8px;  
                color:#C8A45D;  
                font-size:38px;  
                font-family:Georgia,serif;  
                box-shadow:0 2px 8px rgba(0,0,0,.20);  
            ">  
                ✦  
            </div>  
          `;  


    /* =========================  
       CERTIFICATE  
    ========================= */  

    preview.innerHTML = `  

    <div style="  
        position:relative;  
        width:100%;  
        max-width:1200px;  
        min-height:850px;  
        margin:auto;  
        overflow:hidden;  
        box-sizing:border-box;  

        background:  
            radial-gradient(  
                circle at center,  
                #FFFFFF 0%,  
                #FCFAF4 70%,  
                #F3EEDF 100%  
            );  

        border:12px solid #0B1930;  

        box-shadow:  
            0 10px 35px rgba(0,0,0,.20);  

        color:#0B1930;  
        text-align:center;  

        font-family:  
            Georgia,  
            'Times New Roman',  
            serif;  
    ">  

        <!-- INNER GOLD BORDER -->  

        <div style="  
            position:absolute;  
            inset:12px;  
            border:3px solid #C8A45D;  
            pointer-events:none;  
            z-index:2;  
        "></div>  


        <!-- SECOND INNER BORDER -->  

        <div style="  
            position:absolute;  
            inset:21px;  
            border:1px solid #C8A45D;  
            pointer-events:none;  
            z-index:2;  
        "></div>  


        <!-- ORNAMENTAL FLOWERS -->  

        ${ornamentalCorners()}  


        <!-- CONTENT -->  

        <div style="  
            position:relative;  
            z-index:10;  
            padding:55px 80px 35px;  
        ">  


            <!-- LOGO -->  

            ${logo}  


            <!-- INSTITUTION -->  

            <div style="  
                font-size:20px;  
                font-weight:bold;  
                letter-spacing:4px;  
                text-transform:uppercase;  
                margin-top:4px;  
            ">  
                ${institution}  
            </div>  


            <!-- SMALL GOLD LINE -->  

            <div style="  
                display:flex;  
                justify-content:center;  
                align-items:center;  
                gap:12px;  
                margin:13px auto 17px;  
            ">  

                <div style="  
                    width:105px;  
                    height:1px;  
                    background:#C8A45D;  
                "></div>  

                <div style="  
                    width:7px;  
                    height:7px;  
                    background:#C8A45D;  
                    transform:rotate(45deg);  
                "></div>  

                <div style="  
                    width:105px;  
                    height:1px;  
                    background:#C8A45D;  
                "></div>  

            </div>  


            <!-- THIS IS TO CERTIFY -->  

            <div style="  
                font-size:15px;  
                letter-spacing:4px;  
                font-weight:bold;  
                margin-top:5px;  
            ">  
                THIS IS TO CERTIFY THAT  
            </div>  


            <!-- MAIN TITLE -->  

            <div style="  
                font-size:58px;  
                line-height:1;  
                letter-spacing:6px;  
                font-weight:normal;  
                margin-top:12px;  
                color:#0B1930;  
            ">  
                CERTIFICATE  
            </div>  


            <!-- OF COMPLETION -->  

            <div style="  
                display:flex;  
                align-items:center;  
                justify-content:center;  
                gap:15px;  
                margin-top:12px;  
            ">  

                <div style="  
                    width:125px;  
                    height:2px;  
                    background:#C8A45D;  
                "></div>  

                <div style="  
                    font-size:25px;  
                    letter-spacing:5px;  
                    color:#9A7028;  
                ">  
                    OF COMPLETION  
                </div>  

                <div style="  
                    width:125px;  
                    height:2px;  
                    background:#C8A45D;  
                "></div>  

            </div>  


            <!-- SMALL ORNAMENT -->  

            <div style="  
                color:#C8A45D;  
                font-size:22px;  
                margin:8px 0 12px;  
            ">  
                ❦  
            </div>  


            <!-- RECIPIENT -->  

            <div style="  
                position:relative;  
                width:75%;  
                margin:0 auto;  
                padding:13px 25px;  
                border-top:2px solid #C8A45D;  
                border-bottom:2px solid #C8A45D;  
                box-sizing:border-box;  
            ">  

                <div style="  
                    position:absolute;  
                    left:-8px;  
                    top:50%;  
                    transform:translateY(-50%);  
                    color:#C8A45D;  
                    font-size:24px;  
                ">  
                    ❧  
                </div>  

                <div style="  
                    position:absolute;  
                    right:-8px;  
                    top:50%;  
                    transform:translateY(-50%) scaleX(-1);  
                    color:#C8A45D;  
                    font-size:24px;  
                ">  
                    ❧  
                </div>  

                <div style="  
                    font-size:36px;  
                    font-weight:bold;  
                    color:#0B1930;  
                ">  
                    ${student}  
                </div>  

            </div>  


            <!-- COMPLETION TEXT -->  

            <div style="  
                margin-top:15px;  
                font-size:14px;  
                letter-spacing:3px;  
                font-weight:bold;  
            ">  
                HAS SUCCESSFULLY COMPLETED THE  
            </div>  


            <!-- COURSE -->  

            <div style="  
                margin-top:7px;  
                font-size:30px;  
                color:#9A7028;  
            ">  
                ${course}  
            </div>  


            <!-- COURSE ORNAMENT -->  

            <div style="  
                color:#C8A45D;  
                font-size:20px;  
                margin:5px 0;  
            ">  
                ─── ❦ ───  
            </div>  


            <!-- DATE -->  

            <div style="  
                margin-top:2px;  
                font-size:14px;  
                letter-spacing:2px;  
            ">  
                AWARDED ON  
                <span style="  
                    color:#9A7028;  
                    font-size:17px;  
                    margin-left:10px;  
                ">  
                    ${formattedDate}  
                </span>  
            </div>  


            <!-- BOTTOM INFORMATION -->  

            <div style="  
                display:flex;  
                justify-content:space-between;  
                align-items:flex-end;  
                gap:25px;  
                margin-top:20px;  
                padding:0 35px;  
            ">  


                <!-- CERTIFICATE NUMBER -->  

                <div style="  
                    width:210px;  
                    text-align:center;  
                ">  

                    <div style="  
                        color:#9A7028;  
                        font-size:14px;  
                        font-weight:bold;  
                        letter-spacing:1px;  
                    ">  
                        CERTIFICATE NO.  
                    </div>  

                    <div style="  
                        margin-top:7px;  
                        padding:8px 3px;  
                        border-top:1px solid #C8A45D;  
                        border-bottom:1px solid #C8A45D;  
                        font-size:16px;  
                    ">  
                        ${certNumber}  
                    </div>  

                </div>  


                <!-- QR CODE -->  

                <div style="  
                    width:170px;  
                    text-align:center;  
                ">  

                    <div style="  
                        display:inline-flex;  
                        padding:7px;  
                        background:#FFFFFF;  
                        border:3px solid #C8A45D;  
                        box-shadow:0 2px 5px rgba(0,0,0,.15);  
                    ">  

                        <img  
                            src="${qr.qrURL}"  
                            alt="Certificate Verification QR Code"  
                            style="  
                                width:120px;  
                                height:120px;  
                                display:block;  
                                image-rendering:auto;  
                            "  
                        />  

                    </div>  

                    <div style="  
                        margin-top:5px;  
                        color:#9A7028;  
                        font-size:12px;  
                        font-weight:bold;  
                        letter-spacing:2px;  
                    ">  
                        OFFICIAL VERIFICATION  
                    </div>  

                </div>  


                <!-- SIGNATURE -->  

                <div style="  
                    width:210px;  
                    text-align:center;  
                ">  

                    <div style="  
                        height:35px;  
                        border-bottom:1px solid #0B1930;  
                        font-family:cursive;  
                        font-size:25px;  
                        font-style:italic;  
                    ">  
                        ${director}  
                    </div>  

                    <div style="  
                        margin-top:7px;
                            font-size:13px;
                        ">
                            Authorized Signatory
                        </div>

                    </div>

                </div>


                <!-- GOLD SEAL -->

                <div style="
                    position:absolute;
                    right:15px;
                    bottom:18px;
                    width:92px;
                    height:92px;
                    border-radius:50%;
                    background:
                        radial-gradient(
                            circle,
                            #F3D889 0%,
                            #C8A45D 55%,
                            #9A7028 100%
                        );
                    border:4px solid #C8A45D;
                    box-shadow:0 2px 8px rgba(0,0,0,.25);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">

                    <div style="
                        width:68px;
                        height:68px;
                        border:2px solid #0B1930;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        color:#0B1930;
                        font-size:30px;
                    ">
                        ♕
                    </div>

                </div>

            </div>

        </div>
        `;


        /* =========================
           SHOW PREVIEW
        ========================= */

        previewArea.style.display = "block";

        previewArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        console.log(
            "Certificate generated:",
            certNumber
        );

        console.log(
            "Verification URL:",
            qr.verificationURL
        );

    });

});  
  
