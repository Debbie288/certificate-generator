document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");

    if (!form) {
        alert("❌ Form not found!");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const institution = document.getElementById("institutionName").value;
        const student = document.getElementById("studentName").value;
        const course = document.getElementById("courseName").value;
        const date = document.getElementById("completionDate").value;
        const director = document.getElementById("directorName").value;

        preview.innerHTML = `
            <div style="
                padding:50px;
                margin-top:20px;
                border:8px solid #C8A45D;
                background:#FCFAF4;
                text-align:center;
                font-family:Georgia,serif;
            ">
                <h1 style="color:#0B1930;">CERTIFICATE OF COMPLETION</h1>

                <p>This certificate is proudly presented to</p>

                <h2 style="font-size:32px;color:#0B1930;">
                    ${student}
                </h2>

                <p>for successfully completing</p>

                <h3>${course}</h3>

                <p>Issued by: ${institution}</p>

                <p>Date: ${date}</p>

                <br>

                <p>________________________</p>
                <p>${director}</p>
            </div>
        `;

        previewArea.style.display = "block";

        alert("✅ TEST SUCCESSFUL — Certificate generated!");
    });
});
