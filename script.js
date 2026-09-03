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

/* REMOVE POWERED BY */
const footer = document.querySelector("footer");
if (footer) footer.remove();

/* LOAD PREMIUM SCRIPT FONT */
const font = document.createElement("link");
font.rel = "stylesheet";
font.href =
"https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@400;500;600;700&display=swap";
document.head.appendChild(font);

/* LOGO */
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

/* FLORAL CORNERS */
function flowers() {

return `
<svg viewBox="0 0 1200 850"
style="
position:absolute;
inset:0;
width:100%;
height:100%;
pointer-events:none;
z-index:2;
">

<g fill="none"
stroke="#C9A24E"
stroke-width="4"
stroke-linecap="round">

<!-- TOP LEFT -->
<path d="M25 175 C55 95 120 45 215 30"/>
<path d="M45 145 C90 120 110 70 120 25"/>
<path d="M75 110 C35 80 40 35 75 20 C110 55 105 90 75 110Z"
fill="#C9A24E" opacity=".45"/>
<path d="M120 75 C100 40 125 8 160 12 C175 48 150 70 120 75Z"
fill="#C9A24E" opacity=".4"/>
<path d="M165 50 C160 20 190 5 215 22 C220 50 195 65 165 50Z"
fill="#C9A24E" opacity=".4"/>
<path d="M55 165 C105 150 135 180 140 225"/>
<path d="M70 155 C45 180 50 215 80 230 C100 195 95 170 70 155Z"
fill="#C9A24E" opacity=".4"/>

<!-- TOP RIGHT -->
<g transform="translate(1200 0) scale(-1 1)">
<path d="M25 175 C55 95 120 45 215 30"/>
<path d="M45 145 C90 120 110 70 120 25"/>
<path d="M75 110 C35 80 40 35 75 20 C110 55 105 90 75 110Z"
fill="#C9A24E" opacity=".45"/>
<path d="M120 75 C100 40 125 8 160 12 C175 48 150 70 120 75Z"
fill="#C9A24E" opacity=".4"/>
<path d="M165 50 C160 20 190 5 215 22 C220 50 195 65 165 50Z"
fill="#C9A24E" opacity=".4"/>
</g>

<!-- BOTTOM LEFT -->
<g transform="translate(0 850) scale(1 -1)">
<path d="M25 175 C55 95 120 45 215 30"/>
<path d="M45 145 C90 120 110 70 120 25"/>
<path d="M75 110 C35 80 40 35 75 20 C110 55 105 90 75 110Z"
fill="#C9A24E" opacity=".45"/>
<path d="M120 75 C100 40 125 8 160 12 C175 48 150 70 120 75Z"
fill="#C9A24E" opacity=".4"/>
</g>

<!-- BOTTOM RIGHT -->
<g transform="translate(1200 850) scale(-1 -1)">
<path d="M25 175 C55 95 120 45 215 30"/>
<path d="M45 145 C90 120 110 70 120 25"/>
<path d="M75 110 C35 80 40 35 75 20 C110 55 105 90 75 110Z"
fill="#C9A24E" opacity=".45"/>
<path d="M120 75 C100 40 125 8 160 12 C175 48 150 70 120 75Z"
fill="#C9A24E" opacity=".4"/>
</g>

</g>
</svg>`;
}

/* GENERATE */
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

        /* SAVE CERTIFICATE FIRST */
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

        /* QR */
        await loadQR();

        const verificationURL =
        "https://debbie288.github.io/certificate-generator/verify.html?cert="
        + encodeURIComponent(certNumber);

        /* LOGO */
        const logoHTML = logoData
        ? `
        <div class="logoCircle">
            <img src="${logoData}">
        </div>
        `
        : `
        <div class="logoCircle">
            <span>✦</span>
        </div>
        `;

        /* CERTIFICATE */
        preview.innerHTML = `

<style>

.certificate {
    width:1200px;
    height:850px;
    position:relative;
    overflow:hidden;
    background:
      radial-gradient(circle at center,
      #fffdf7 0%,
      #faf5e8 70%,
      #f0e6ce 100%);
    border:12px solid #071A35;
    box-sizing:border-box;
    color:#071A35;
    font-family:"Cormorant Garamond",Georgia,serif;
}

.goldBorder {
    position:absolute;
    inset:12px;
    border:3px solid #C9A24E;
}

.goldBorder2 {
    position:absolute;
    inset:21px;
    border:1px solid #C9A24E;
}

.content {
    position:relative;
    z-index:5;
    height:100%;
    text-align:center;
    padding:42px 70px;
    box-sizing:border-box;
}

.logoCircle {
    width:112px;
    height:112px;
    border-radius:50%;
    border:3px solid #C9A24E;
    outline:1px solid #C9A24E;
    outline-offset:5px;
    margin:0 auto 15px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fffdf7;
    overflow:hidden;
}

.logoCircle img {
    width:88px;
    height:88px;
    object-fit:contain;
}

.logoCircle span {
    font-size:48px;
    color:#C9A24E;
}

.institution {
    font-size:28px;
    font-weight:700;
    letter-spacing:5px;
    text-transform:uppercase;
}

.line {
    width:420px;
    height:2px;
    background:#C9A24E;
    margin:13px auto 20px;
}

.title {
    font-size:57px;
    font-weight:600;
    letter-spacing:4px;
    line-height:1;
}

.subtitle {
    font-size:24px;
    letter-spacing:6px;
    color:#A27727;
    margin-top:10px;
}

.ornament {
    color:#C9A24E;
    font-size:25px;
    margin:8px 0;
}

.certify {
    font-size:17px;
    letter-spacing:4px;
    margin-top:5px;
}

.student {
    font-family:"Great Vibes",cursive;
    font-size:70px;
    color:#071A35;
    margin:3px 0 0;
}

.studentLine {
    width:520px;
    height:2px;
    background:#C9A24E;
    margin:0 auto 12px;
}

.completed {
    font-size:17px;
    letter-spacing:3px;
}

.course {
    font-size:38px;
    color:#A27727;
    margin-top:4px;
}

.awarded {
    font-size:17px;
    letter-spacing:2px;
    margin-top:5px;
}

.bottom {
    position:absolute;
    left:75px;
    right:75px;
    bottom:48px;
    display:grid;
    grid-template-columns:1fr 210px 1fr;
    align-items:end;
    column-gap:55px;
}

.certNo {
    text-align:center;
}

.smallGold {
    color:#A27727;
    font-size:15px;
    font-weight:bold;
    letter-spacing:2px;
}

.number {
    font-size:20px;
    margin-top:8px;
    border-top:1px solid #C9A24E;
    border-bottom:1px solid #C9A24E;
    padding:7px;
}

.qrBox {
    text-align:center;
}

.qrFrame {
    width:150px;
    height:150px;
    margin:auto;
    padding:9px;
    background:white;
    border:3px solid #C9A24E;
    box-shadow:0 2px 8px rgba(0,0,0,.15);
    box-sizing:border-box;
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
    font-size:13px;
    font-weight:bold;
    letter-spacing:2px;
}

.signature {
    text-align:center;
}

.signatureName {
    font-family:"Great Vibes",cursive;
    font-size:40px;
    border-bottom:1px solid #071A35;
    padding-bottom:3px;
}

.signatureTitle {
    margin-top:7px;
    font-size:16px;
    letter-spacing:2px;
}

.seal {
    position:absolute;
    right:55px;
    bottom:45px;
    width:105px;
    height:105px;
    border-radius:50%;
    background:
      radial-gradient(circle,
      #f6dc91,
      #C9A24E 55%,
      #9B7024);
    border:4px solid #C9A24E;
    box-shadow:0 3px 9px rgba(0,0,0,.2);
    display:flex;
    align-items:center;
    justify-content:center;
}

.sealInner {
    width:78px;
    height:78px;
    border:2px solid #071A35;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#071A35;
    font-size:30px;
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

@media print {

    body * {
        visibility:hidden;
    }

    .certificate,
    .certificate * {
        visibility:visible;
    }

    .certificate {
        position:absolute;
        left:0;
        top:0;
        width:1200px;
        height:850px;
    }

    .printBtn {
        display:none;
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

        <div class="bottom">

            <div class="certNo">

                <div class="smallGold">
                    CERTIFICATE NUMBER
                </div>

                <div class="number">
                    ${certNumber}
                </div>

            </div>

            <div class="qrBox">

                <div class="qrFrame">
                    <div id="qrCode"></div>
                </div>

                <div class="verifyText">
                    OFFICIAL VERIFICATION
                </div>

            </div>

            <div class="signature">

                <div class="signatureName">
                    ${director}
                </div>

                <div class="signatureTitle">
                    AUTHORIZED SIGNATORY
                </div>

            </div>

        </div>

        <div class="seal">
            <div class="sealInner">
                ♕
            </div>
        </div>

    </div>

</div>

<button class="printBtn" onclick="window.print()">
    🖨️ Save Certificate as PDF
</button>
`;

        /* CREATE QR */
        new QRCode(document.getElementById("qrCode"), {
            text: verificationURL,
            width:128,
            height:128,
            correctLevel:QRCode.CorrectLevel.H
        });

        previewArea.style.display = "block";

        previewArea.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

        console.log("Certificate:", certNumber);
        console.log("Verification:", verificationURL);

    }

    catch (error) {

        console.error(error);

        alert(
            "Certificate could not be generated.\n\n" +
            error.message
        );
    }

});

});
