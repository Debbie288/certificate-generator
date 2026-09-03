document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("certificateForm");
    const previewArea = document.getElementById("previewArea");
    const preview = document.getElementById("certificatePreview");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const student = document.getElementById("studentName").value;
        const course = document.getElementById("courseName").value;
        const institution = document.getElementById("institutionName").value;
        const date = document.getElementById("completionDate").value;

        preview.innerHTML = `
            <div style="
                padding:50px;
                text-align:center;
                border:5px solid #c8a45d;
                background:#fffdf7;
                font-family:Georgia,serif;
            ">
                <h2 style="color:#c8a45d;">TEST SUCCESSFUL</h2>

                <h1>${institution}</h1>

                <p>This certificate is awarded to</p>

                <h2>${student}</h2>

                <p>For successfully completing</p>

                <h3>${course}</h3>

                <p>${date}</p>

                <p style="margin-top:30px;">
                    If you can see this certificate,
                    <strong>script.js is working.</strong>
                </p>
            </div>
        `;

        previewArea.style.display = "block";

        previewArea.scrollIntoView({
            behavior: "smooth"
        });
    });

});
