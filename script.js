document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("certificateForm");
  const previewArea = document.getElementById("previewArea");
  const preview = document.getElementById("certificatePreview");
  const logoInput = document.getElementById("logoUpload");

  let logoData = "";

  /* =========================
     LOGO
  ========================= */

  if (logoInput) {
    logoInput.addEventListener("change", () => {
      const file = logoInput.files[0];

      if (!file) {
        logoData = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image.");
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


  /* =========================
     CAPITALIZE TEXT
  ========================= */

  function properText(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }


  /* =========================
     CERTIFICATE NUMBER
  ========================= */

  function makeCertNumber() {
    const year = new Date().getFullYear();
    const num = Math.floor(100000 + Math.random() * 900000);
    return `CC-${year}-${num}`;
  }


  /* =========================
     DATE
  ========================= */

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


  /* =========================
     QR CODE
  ========================= */

  function makeQR(certNumber) {

    const verifyURL =
      "https://debbie288.github.io/certificate-generator/verify.html?cert=" +
      encodeURIComponent(certNumber);

    const qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=" +
      encodeURIComponent(verifyURL);

    return {
      verifyURL,
      qrURL
    };
  }


  /* =========================
     ORNAMENT
  ========================= */

  function ornaments() {
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
           stroke="#C8A45D"
           stroke-width="3"
           stroke-linecap="round">

          <path d="M35 180
                   C55 115 110 65 180 45
                   C230 30 275 38 320 65"/>

          <path d="M45 145
                   C80 120 105 85 120 45"/>

          <path d="M75 120
                   C45 95 45 60 70 38
                   C105 60 108 92 75 120Z"
                fill="#C8A45D"
                opacity=".28"/>

          <path d="M110 82
                   C95 48 110 20 145 17
                   C160 48 145 72 110 82Z"
                fill="#C8A45D"
                opacity=".25"/>

          <path d="M155 62
                   C150 32 177 10 205 20
                   C215 48 188 68 155 62Z"
                fill="#C8A45D"
                opacity=".23"/>

          <circle cx="52" cy="177" r="8"
                  fill="#C8A45D"/>

        </g>

        <use href="#none"></use>

        <g transform="translate(1200 0) scale(-1 1)">
          <path d="M35 180
                   C55 115 110 65 180 45
                   C230 30 275 38 320 65"
                fill="none"
                stroke="#C8A45D"
                stroke-width="3"/>

          <path d="M75 120
                   C45 95 45 60 70 38
                   C105 60 108 92 75 120Z"
                fill="#C8A45D"
                opacity=".28"/>

          <circle cx="52" cy="177" r="8"
                  fill="#C8A45D"/>
        </g>

        <g transform="translate(0 850) scale(1 -1)">
          <path d="M35 180
                   C55 115 110 65 180 45
                   C230 30 275 38 320 65"
                fill="none"
                stroke="#C8A45D"
                stroke-width="3"/>

          <path d="M75 120
                   C45 95 45 60 70 38
                   C105 60 108 92 75 120Z"
                fill="#C8A45D"
                opacity=".28"/>
        </g>

        <g transform="translate(1200 850) scale(-1 -1)">
          <path d="M35 180
                   C55 115 110 65 180 45
                   C230 30 275 38 320 65"
                fill="none"
                stroke="#C8A45D"
                stroke-width="3"/>

          <path d="M75 120
                   C45 95 45 60 70 38
                   C105 60 108 92 75 120Z"
                fill="#C8A45D"
                opacity=".28"/>
        </g>

      </svg>
    `;
  }


  /* =========================
     GENERATE
  ========================= */

  form.addEventListener("submit", event => {

    event.preventDefault();

    const institution = properText(
      document.getElementById("institutionName").value
    );

    const student = properText(
      document.getElementById("studentName").value
    );

    const course = properText(
      document.getElementById("courseName").value
    );

    const date =
      document.getElementById("completionDate").value;

    const enteredCert =
      document.getElementById("certNumber").value.trim();

    const director = properText(
      document.getElementById("directorName").value
    );

    const certNumber =
      enteredCert || makeCertNumber();

    const qr = makeQR(certNumber);

    const dateText = formatDate(date);


    /* =========================
       LOGO
    ========================= */

    const logo = logoData
      ? `
        <div style="
          width:110px;
          height:110px;
          margin:0 auto 10px;
          border-radius:50%;
          border:5px solid #C8A45D;
          padding:5px;
          background:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          box-shadow:0 3px 10px rgba(0,0,0,.18);
        ">
          <img src="${logoData}"
            style="
              width:100%;
              height:100%;
              object-fit:contain;
              border-radius:50%;
            ">
        </div>
      `
      : `
        <div style="
          width:110px;
          height:110px;
          margin:0 auto 10px;
          border-radius:50%;
          background:#0B1930;
          border:6px solid #C8A45D;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#C8A45D;
          font-size:42px;
          box-shadow:0 3px 10px rgba(0,0,0,.2);
        ">
          ✦
        </div>
      `;


    /* =========================
       CERTIFICATE DESIGN
    ========================= */

    preview.innerHTML = `

      <div id="printCertificate"
        style="
          position:relative;
          width:1200px;
          min-height:850px;
          margin:auto;
          overflow:hidden;
          background:
            radial-gradient(
              circle at center,
              #ffffff 0%,
              #fcfaf4 68%,
              #f1ead9 100%
            );
          border:12px solid #0B1930;
          color:#0B1930;
          font-family:Georgia, 'Times New Roman', serif;
          text-align:center;
          box-sizing:border-box;
        ">

        <div style="
          position:absolute;
          inset:12px;
          border:3px solid #C8A45D;
          z-index:1;
        "></div>

        <div style="
          position:absolute;
          inset:22px;
          border:1px solid #C8A45D;
          z-index:1;
        "></div>

        ${ornaments()}

        <div style="
          position:relative;
          z-index:5;
          padding:42px 75px 30px;
        ">

          ${logo}

          <div style="
            font-size:21px;
            font-weight:bold;
            letter-spacing:4px;
            text-transform:uppercase;
          ">
            ${institution}
          </div>

          <div style="
            margin:12px auto 18px;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:12px;
          ">
            <span style="
              width:110px;
              height:2px;
              background:#C8A45D;
            "></span>

            <span style="
              width:8px;
              height:8px;
              background:#C8A45D;
              transform:rotate(45deg);
            "></span>

            <span style="
              width:110px;
              height:2px;
              background:#C8A45D;
            "></span>
          </div>


          <div style="
            font-size:15px;
            letter-spacing:4px;
            font-weight:bold;
          ">
            THIS IS TO CERTIFY THAT
          </div>


          <div style="
            margin-top:12px;
            font-size:57px;
            letter-spacing:7px;
            line-height:1;
          ">
            CERTIFICATE
          </div>


          <div style="
            margin-top:13px;
            display:flex;
            justify-content:center;
            align-items:center;
            gap:15px;
          ">

            <span style="
              width:125px;
              height:2px;
              background:#C8A45D;
            "></span>

            <span style="
              font-size:25px;
              letter-spacing:5px;
              color:#9A7028;
            ">
              OF COMPLETION
            </span>

            <span style="
              width:125px;
              height:2px;
              background:#C8A45D;
            "></span>

          </div>


          <div style="
            margin:9px 0 12px;
            color:#C8A45D;
            font-size:23px;
          ">
            ❦
          </div>


          <div style="
            width:70%;
            margin:auto;
            padding:12px 25px;
            border-top:2px solid #C8A45D;
            border-bottom:2px solid #C8A45D;
          ">

            <div style="
              font-size:37px;
              font-weight:bold;
            ">
              ${student}
            </div>

          </div>


          <div style="
            margin-top:15px;
            font-size:14px;
            letter-spacing:3px;
            font-weight:bold;
          ">
            HAS SUCCESSFULLY COMPLETED THE
          </div>


          <div style="
            margin-top:8px;
            font-size:30px;
            color:#9A7028;
          ">
            ${course}
          </div>


          <div style="
            margin:5px 0;
            color:#C8A45D;
            font-size:20px;
          ">
            ─── ❦ ───
          </div>


          <div style="
            font-size:14px;
            letter-spacing:2px;
          ">
            AWARDED ON
            <span style="
              color:#9A7028;
              font-size:17px;
              margin-left:8px;
            ">
              ${dateText}
            </span>
          </div>


          <!-- BOTTOM -->

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr 1fr;
            align-items:end;
            gap:50px;
            margin-top:27px;
            padding:0 45px;
          ">


            <!-- NUMBER -->

            <div style="
              text-align:center;
              padding-bottom:5px;
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
                padding:7px;
                border-top:1px solid #C8A45D;
                border-bottom:1px solid #C8A45D;
                font-size:16px;
              ">
                ${certNumber}
              </div>

            </div>


            <!-- QR CENTER -->

            <div style="
              text-align:center;
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
            ">

              <div style="
                background:#fff;
                padding:9px;
                border:3px solid #C8A45D;
                display:inline-block;
                box-shadow:0 2px 7px rgba(0,0,0,.15);
              ">

                <img
                  src="${qr.qrURL}"
                  crossorigin="anonymous"
                  style="
                    width:120px;
                    height:120px;
                    display:block;
                  "
                  alt="QR Verification"
                >

              </div>

              <div style="
                margin-top:6px;
                color:#9A7028;
                font-size:11px;
                letter-spacing:2px;
                font-weight:bold;
              ">
                SCAN TO VERIFY
              </div>

            </div>


            <!-- SIGNATURE -->

            <div style="
              text-align:center;
              padding-bottom:5px;
            ">

              <div style="
                height:38px;
                border-bottom:1px solid #0B1930;
                font-family:cursive;
                font-size:25px;
                font-style:italic;
                display:flex;
                justify-content:center;
                align-items:flex-end;
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
            right:48px;
            bottom:8px;
            width:92px;
            height:92px;
            border-radius:50%;
            background:
              radial-gradient(
                circle,
                #F6DD98,
                #C8A45D 58%,
                #987025
              );
            border:4px solid #C8A45D;
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 3px 9px rgba(0,0,0,.25);
          ">

            <div style="
              width:68px;
              height:68px;
              border:2px solid #0B1930;
              border-radius:50%;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:30px;
            ">
              ♕
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


    console.log("Certificate:", certNumber);
    console.log("Verification:", qr.verifyURL);

  });

});
