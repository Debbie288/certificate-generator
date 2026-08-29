document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("certificateForm");
  const previewArea = document.getElementById("previewArea");
  const certificatePreview = document.getElementById("certificatePreview");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document
      .getElementById("studentName")
      .value
      .trim();

    const courseName = document
      .getElementById("courseName")
      .value
      .trim();

    const completionDate = document
      .getElementById("completionDate")
      .value;

    const certNumber = document
      .getElementById("certNumber")
      .value
      .trim();

    if (!studentName || !courseName || !completionDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format the date
    const date = new Date(completionDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Create certificate
    certificatePreview.innerHTML = `
      <div class="certificate">
        <div class="certificate-border">

          <div class="certificate-header">
            <div class="certificate-icon">🎓</div>
            <h2>CERTIFICATE</h2>
            <h3>OF COMPLETION</h3>
          </div>

          <div class="certificate-body">
            <p class="presented">This certificate is proudly presented to</p>

            <h1 class="student-name">${studentName}</h1>

            <p class="completion-text">
              For successfully completing the course
            </p>

            <h2 class="course-name">${courseName}</h2>

            <p class="completion-text">
              Completed on ${formattedDate}
            </p>
          </div>

          <div class="certificate-footer">

            <div class="signature">
              <div class="signature-line"></div>
              <p>Authorized Signature</p>
            </div>

            <div class="certificate-number">
              <p>Certificate No.</p>
              <strong>${certNumber || "N/A"}</strong>
            </div>

            <div class="signature">
              <div class="signature-line"></div>
              <p>Director / Instructor</p>
            </div>

          </div>

        </div>
      </div>

      <button type="button" id="printCertificateBtn">
        🖨️ Print / Save Certificate
      </button>
    `;

    // Show preview
    previewArea.style.display = "block";

    // Print certificate
    document
      .getElementById("printCertificateBtn")
      .addEventListener("click", () => {
        window.print();
      });

    // Scroll to preview
    previewArea.scrollIntoView({
      behavior: "smooth"
    });
  });
});
