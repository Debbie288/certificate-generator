document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("certificateForm");
  const previewArea = document.getElementById("previewArea");
  const preview = document.getElementById("certificatePreview");
  const logoInput = document.getElementById("logoUpload");

  if (!form || !preview || !previewArea) {
    console.error("Certificate form elements were not found.");
    return;
  }

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


  /* =========================
     CAPITALIZE TEXT
  ========================= */

  function properCase(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }


  /* =========================
     CERTIFICATE NUMBER
  ========================= */

  function makeCertificateNumber() {
    const year = new Date().getFullYear();
    const number = Math.floor(100000 + Math.random() * 900000);

    return `CC-${year}-${number}`;
  }


  /* =========================
     DATE
  ========================= */

  function formatDate(value) {
    if (!value) return "";

    const date = new Date(value + "T00:00:00");

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }


  /* =========================
     VERIFICATION URL
  ========================= */

  function getVerificationURL(certNumber) {

    const base =
      "https://debbie288.github.io/certificate-generator/verify.html";

    return base + "?cert=" + encodeURIComponent(certNumber);
  }


  /* =========================
     QR CODE
  ========================= */

  function getQRURL(certNumber) {

    const verificationURL =
      getVerificationURL(certNumber);

    return (
      "https://api.qrserver.com/v1/create-qr-code/" +
      "?size=300x300" +
      "&margin=12" +
      "&data=" +
      encodeURIComponent(verificationURL)
    );
  }


  /* =========================
     ORNAMENTS
  ========================= */

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
          pointer-events:none;
          z-index:1;
        "
      >

        <g
          fill="none"
          stroke="#C9A45C"
          stroke-width="3"
          stroke-linecap="round"
        >

          <!-- TOP LEFT -->

          <path d="
            M35 190
            C45 115 100 60 190 40
            C235 30 280 35 330 60
          "/>

          <path d="
            M55 155
            C105 125 125 85 130 45
          "/>

          <path d="
            M92 125
            C55 100 58 65 82 40
            C120 65 120 100 92 125
          "
          fill="#C9A45C"
          opacity=".35"/>

          <path d="
            M135 88
            C112 55 130 25 160 22
            C180 52 165 78 135 88
          "
          fill="#C9A45C"
          opacity=".30"/>

          <path d="
            M180 60
            C170 30 195 12 220 25
            C225 50 208 67 180 60
          "
          fill="#C9A45C"
          opacity=".25"/>


          <!-- TOP RIGHT -->

          <g transform="translate(1200 0) scale(-1 1)">

            <path d="
              M35 190
              C45 115 100 60 190 40
              C235 30 280 35 330 60
            "/>

            <path d="
              M55 155
              C105 125 125 85 130 45
            "/>

            <path d="
              M92 125
              C55 100 58 65 82 40
              C120 65 120 100 92 125
            "
            fill="#C9A45C"
            opacity=".35"/>

            <path d="
              M135 88
              C112 55 130 25 160 22
              C180 52 165 78 135 88
            "
            fill="#C9A45C"
            opacity=".30"/>

            <path d="
              M180 60
              C170 30 195 12 220 25
              C225 50 208 67 180 60
            "
            fill="#C9A45C"
            opacity=".25"/>

          </g>


          <!-- BOTTOM LEFT -->

          <g transform="translate(0 850) scale(1 -1)">

            <path d="
              M35 190
              C45 115 100 60 190 40
              C235 30 280 35 330 60
            "/>

            <path d="
              M55 155
              C105 125 125 85 130 45
            "/>

            <path d="
              M92 125
              C55 100 58 65 82 40
              C120 65 120 100 92 125
            "
            fill="#C9A45C"
            opacity=".35"/>

          </g>


          <!-- BOTTOM RIGHT -->

          <g transform="translate(1200 850) scale(-1 -1)">

            <path d="
              M35 190
              C45 115 100 60 190 40
              C235 30 280 35 330 60
            "/>

            <path d="
              M55 155
              C105 125 125 85 130 45
            "/>

            <path d="
              M92 125
              C55 100 58 65 82 40
              C120 65 120 100 92 125
            "
            fill="#C9A45C"
            opacity=".35"/>

          </g>

        </g>
      </svg>
    `;
  }


  /* =========================
     GENERATE CERTIFICATE
  ========================= */

  form.addEventListener("submit", event => {

    event.preventDefault();

    try {

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

      const certInput =
        document.getElementById("certNumber").value.trim();

      const director =
        properCase(
          document.getElementById("directorName").value
        );

      if (!institution || !student || !course || !date || !director) {
        alert("Please complete all required fields.");
        return;
      }

      const certNumber =
        certInput || makeCertificateNumber();

      const formattedDate =
        formatDate(date);

      const verificationURL =
        getVerificationURL(certNumber);

      const qrURL =
        getQRURL(certNumber);


      /* =========================
         LOGO
      ========================= */

      const logo = logoData

        ? `
          <div style="
            width:118px;
            height:118px;
            margin:0 auto 12px;
            border-radius:50%;
            background:#fff;
            border:5px solid #C9A45C;
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;
            box-shadow:0 3px 12px rgba(0,0,0,.15);
          ">
            <img
              src="${logoData}"
              style="
                width:94px;
                height:94px;
                object-fit:contain;
                display:block;
              "
            >
          </div>
        `

        : `
          <div style="
            width:118px;
            height:118px;
            margin:0 auto 12px;
            border-radius:50%;
            border:5px solid #C9A45C;
            background:#0B1930;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#C9A45C;
            font-size:45px;
            font-family:Georgia,serif;
            box-shadow:0 3px 12px rgba(0,0,0,.15);
          ">
            ✦
          </div>
        `;


      /* =========================
         CERTIFICATE HTML
      ========================= */

      preview.innerHTML = `

        <div id="printCertificate"
          style="
            position:relative;
            width:1200px;
            height:850px;
            max-width:100%;
            margin:0 auto;
            overflow:hidden;

            background:
              radial-gradient(
                circle at center,
                #ffffff 0%,
                #fcfaf4 62%,
                #f1eadb 100%
              );

            border:12px solid #0B1930;
            box-shadow:0 12px 35px rgba(0,0,0,.20);

            color:#0B1930;
            font-family:Georgia,'Times New Roman',serif;
            text-align:center;
          "
        >

          <!-- GOLD INNER BORDERS -->

          <div style="
            position:absolute;
            inset:13px;
            border:3px solid #C9A45C;
            z-index:2;
            pointer-events:none;
          "></div>

          <div style="
            position:absolute;
            inset:22px;
            border:1px solid #C9A45C;
            z-index:2;
            pointer-events:none;
          "></div>


          ${ornaments()}


          <!-- MAIN CONTENT -->

          <div style="
            position:relative;
            z-index:5;
            height:100%;
            padding:38px 70px 25px;
          ">

            ${logo}


            <!-- INSTITUTION -->

            <div style="
              font-size:22px;
              font-weight:bold;
              letter-spacing:4px;
              text-transform:uppercase;
              margin-bottom:10px;
            ">
              ${institution}
            </div>


            <div style="
              width:240px;
              height:2px;
              background:#C9A45C;
              margin:0 auto 14px;
            "></div>


            <!-- CERTIFY -->

            <div style="
              font-size:14px;
              font-weight:bold;
              letter-spacing:4px;
              margin-top:4px;
            ">
              THIS IS TO CERTIFY THAT
            </div>


            <!-- TITLE -->

            <div style="
              font-size:57px;
              line-height:1;
              letter-spacing:7px;
              margin-top:9px;
              font-weight:normal;
            ">
              CERTIFICATE
            </div>


            <div style="
              display:flex;
              align-items:center;
              justify-content:center;
              gap:15px;
              margin-top:9px;
            ">

              <span style="
                width:115px;
                height:2px;
                background:#C9A45C;
              "></span>

              <span style="
                color:#9A7028;
                font-size:23px;
                letter-spacing:4px;
              ">
                OF COMPLETION
              </span>

              <span style="
                width:115px;
                height:2px;
                background:#C9A45C;
              "></span>

            </div>


            <div style="
              color:#C9A45C;
              font-size:21px;
              margin:6px 0 8px;
            ">
              ❦
            </div>


            <!-- STUDENT -->

            <div style="
              width:70%;
              margin:0 auto;
              padding:8px 20px 10px;
              border-top:2px solid #C9A45C;
              border-bottom:2px solid #C9A45C;
            ">

              <div style="
                font-size:38px;
                font-weight:bold;
                line-height:1.15;
              ">
                ${student}
              </div>

            </div>


            <div style="
              margin-top:11px;
              font-size:13px;
              letter-spacing:3px;
              font-weight:bold;
            ">
              HAS SUCCESSFULLY COMPLETED THE
            </div>


            <!-- COURSE -->

            <div style="
              margin-top:6px;
              font-size:28px;
              color:#9A7028;
              font-weight:normal;
            ">
              ${course}
            </div>


            <div style="
              color:#C9A45C;
              font-size:17px;
              margin:2px 0;
            ">
              ─── ❦ ───
            </div>


            <!-- DATE -->

            <div style="
              font-size:13px;
              letter-spacing:2px;
              margin-top:1px;
            ">
              AWARDED ON

              <span style="
                color:#9A7028;
                font-size:16px;
                margin-left:8px;
              ">
                ${formattedDate}
              </span>
            </div>


            <!-- BOTTOM -->

            <div style="
              position:absolute;
              left:80px;
              right:80px;
              bottom:35px;

              display:grid;
              grid-template-columns:1fr 190px 1fr;
              align-items:end;
              column-gap:70px;
            ">


              <!-- CERTIFICATE NUMBER -->

              <div style="
                text-align:center;
              ">

                <div style="
                  color:#9A7028;
                  font-size:12px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                ">
                  CERTIFICATE NO.
                </div>

                <div style="
                  margin-top:7px;
                  padding:7px 4px;
                  border-top:1px solid #C9A45C;
                  border-bottom:1px solid #C9A45C;
                  font-size:15px;
                ">
                  ${certNumber}
                </div>

              </div>


              <!-- CENTER QR -->

              <div style="
                text-align:center;
              ">

                <div style="
                  display:inline-block;
                  padding:8px;
                  background:#fff;
                  border:4px solid #C9A45C;
                  box-shadow:0 3px 10px rgba(0,0,0,.15);
                ">

                  <img
                    src="${qrURL}"
                    alt="QR Code"
                    style="
                      display:block;
                      width:135px;
                      height:135px;
                    "
                    onerror="
                      this.parentElement.innerHTML=
                      '<div style=&quot;width:135px;height:135px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;&quot;>QR unavailable</div>';
                    "
                  >

                </div>

                <div style="
                  margin-top:5px;
                  color:#9A7028;
                  font-size:11px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                ">
                  SCAN TO VERIFY
                </div>

              </div>


              <!-- SIGNATURE -->

              <div style="
                text-align:center;
                position:relative;
              ">

                <div style="
                  height:35px;
                  border-bottom:1px solid #0B1930;
                  font-family:cursive;
                  font-size:25px;
                  font-style:italic;
                  white-space:nowrap;
                  overflow:hidden;
                ">
                  ${director}
                </div>

                <div style="
                  margin-top:6px;
                  font-size:12px;
                ">
                  Authorized Signatory
                </div>


                <!-- SEAL -->

                <div style="
                  position:absolute;
                  right:-25px;
                  bottom:12px;

                  width:72px;
                  height:72px;
                  border-radius:50%;

                  background:
                    radial-gradient(
                      circle,
                      #f7dfa0 0%,
                      #C9A45C 55%,
                      #93691e 100%
                    );

                  border:3px solid #C9A45C;

                  display:flex;
                  align-items:center;
                  justify-content:center;

                  box-shadow:0 2px 8px rgba(0,0,0,.22);
                ">

                  <div style="
                    width:55px;
                    height:55px;
                    border:2px solid #0B1930;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#0B1930;
                    font-size:23px;
                  ">
                    ♕
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        <!-- DOWNLOAD BUTTON -->

        <div id="certificateActions"
          style="
            text-align:center;
            margin-top:20px;
          "
        >

          <button
            type="button"
            id="downloadCertificate"
            style="
              background:#0B1930;
              color:#fff;
              border:2px solid #C9A45C;
              padding:13px 28px;
              border-radius:8px;
              font-size:16px;
              font-weight:bold;
              cursor:pointer;
            "
          >
            📄 Save Certificate as PDF
          </button>

        </div>
      `;


      previewArea.style.display = "block";

      previewArea.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });


      /* =========================
         PDF / PRINT
      ========================= */

      const downloadButton =
        document.getElementById("downloadCertificate");

      downloadButton.addEventListener("click", () => {

        const actions =
          document.getElementById("certificateActions");

        if (actions) actions.style.display = "none";

        const oldTitle = document.title;

        document.title =
          "Certificate-" + certNumber;

        window.print();

        setTimeout(() => {

          document.title = oldTitle;

          if (actions) {
            actions.style.display = "block";
          }

        }, 1000);

      });


      console.log("Certificate generated:", certNumber);
      console.log("Verification URL:", verificationURL);

    }

    catch (error) {

      console.error(error);

      alert(
        "The certificate could not be generated. " +
        "Please refresh the page and try again."
      );

    }

  });

});
