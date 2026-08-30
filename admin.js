// ==========================================================
// CERTIFICATE GENERATOR - ADMIN DASHBOARD
// admin.js
// SECTION 1 OF 4
// ==========================================================

// ==========================================================
// SUPABASE SETUP
// ==========================================================

const supabaseUrl =
    'https://gdophhworvapqctpmyia.supabase.co';

const supabaseKey =
    'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';

const supabaseClient =
    window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );


// ==========================================================
// GLOBAL DATA
// ==========================================================

let allCertificates = [];
let filteredCertificates = [];


// ==========================================================
// START DASHBOARD
// ==========================================================

document.addEventListener(
    'DOMContentLoaded',
    async function () {

        console.log('ADMIN.JS LOADED');

        setupNavigation();
        setupMenu();
        setupLogout();
        setupCertificateModal();
        setupFilters();
        setupButtons();

        await checkAdmin();
    }
);


// ==========================================================
// CHECK ADMIN LOGIN
// ==========================================================

async function checkAdmin() {

    try {

        const {
            data: {
                user
            },
            error
        } = await supabaseClient.auth.getUser();


        if (error) {

            console.error(
                'Auth error:',
                error
            );

            return;
        }


        if (!user) {

            alert(
                'Please log in as administrator.'
            );

            window.location.href =
                'admin-login.html';

            return;
        }


        console.log(
            'Logged in admin:',
            user.email
        );


        const adminEmail =
            document.getElementById(
                'adminEmail'
            );

        const settingsEmail =
            document.getElementById(
                'settingsEmail'
            );


        if (adminEmail) {

            adminEmail.textContent =
                user.email;
        }


        if (settingsEmail) {

            settingsEmail.textContent =
                user.email;
        }


        await loadCertificates();

    }

    catch (error) {

        console.error(
            'Admin check failed:',
            error
        );

        showError(
            'Unable to check administrator login.'
        );
    }
}


// ==========================================================
// LOAD CERTIFICATES FROM SUPABASE
// ==========================================================

async function loadCertificates() {

    console.log(
        'Loading certificates from Supabase...'
    );


    const {
        data,
        error
    } = await supabaseClient
        .from('certificates')
        .select(
            'id, student_name, course_name, completion_date, cert_number, institution, director'
        )
        .order(
            'completion_date',
            {
                ascending: false
            }
        );


    if (error) {

        console.error(
            'SUPABASE CERTIFICATE ERROR:',
            error
        );

        showDatabaseError(
            error
        );

        return;
    }


    allCertificates =
        data || [];


    filteredCertificates =
        [...allCertificates];


    console.log(
        'Certificates loaded:',
        allCertificates
    );


    updateDashboardStats();

    displayRecentCertificates();

    displayCertificates();

    updateAnalytics();

    populateCourseFilter();

    populateInstitutionFilter();

    updateCertificateCount();
}


// ==========================================================
// DASHBOARD STATISTICS
// ==========================================================

function updateDashboardStats() {

    const total =
        allCertificates.length;


    const courses =
        new Set(
            allCertificates
                .map(
                    cert =>
                        cert.course_name
                )
                .filter(Boolean)
        );


    const institutions =
        new Set(
            allCertificates
                .map(
                    cert =>
                        cert.institution
                )
                .filter(Boolean)
        );


    const now =
        new Date();


    const currentMonth =
        now.getMonth();


    const currentYear =
        now.getFullYear();


    const thisMonth =
        allCertificates.filter(
            cert => {

                if (
                    !cert.completion_date
                ) {
                    return false;
                }


                const date =
                    new Date(
                        cert.completion_date +
                        'T00:00:00'
                    );


                return (
                    date.getMonth() ===
                        currentMonth &&
                    date.getFullYear() ===
                        currentYear
                );
            }
        ).length;


    setText(
        'totalCertificates',
        total
    );


    setText(
        'monthlyCertificates',
        thisMonth
    );


    setText(
        'totalCourses',
        courses.size
    );


    setText(
        'totalInstitutions',
        institutions.size
    );


    setText(
        'analyticsTotal',
        total
    );
}
// ==========================================================
// SECTION 2 OF 4
// RECENT CERTIFICATES + ALL CERTIFICATES
// ==========================================================


// ==========================================================
// RECENT CERTIFICATES
// ==========================================================

function displayRecentCertificates() {

    const body =
        document.getElementById(
            'recentCertificatesBody'
        );


    if (!body) return;


    body.innerHTML = '';


    const recent =
        allCertificates.slice(
            0,
            5
        );


    if (
        recent.length === 0
    ) {

        body.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;padding:30px;">
                    No certificates found.
                </td>
            </tr>
        `;

        return;
    }


    recent.forEach(
        certificate => {

            const row =
                document.createElement(
                    'tr'
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        certificate.cert_number || '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.student_name || '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.course_name || '—'
                    )}
                </td>

                <td>
                    ${formatDate(
                        certificate.completion_date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.institution || '—'
                    )}
                </td>

            `;


            body.appendChild(
                row
            );
        }
    );
}


// ==========================================================
// DISPLAY ALL CERTIFICATES
// ==========================================================

function displayCertificates() {

    const body =
        document.getElementById(
            'certificatesBody'
        );


    if (!body) return;


    body.innerHTML = '';


    if (
        filteredCertificates.length ===
        0
    ) {

        body.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;padding:30px;">
                    No certificates found.
                </td>
            </tr>
        `;

        updateCertificateCount();

        return;
    }


    filteredCertificates.forEach(
        certificate => {

            const row =
                document.createElement(
                    'tr'
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            certificate.cert_number || '—'
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        certificate.student_name || '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.course_name || '—'
                    )}
                </td>

                <td>
                    ${formatDate(
                        certificate.completion_date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.institution || '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.director || '—'
                    )}
                </td>

                <td>

                    <button
                        class="secondary-button"
                        onclick="viewCertificate('${certificate.id}')"
                    >
                        👁️ View
                    </button>

                </td>

            `;


            body.appendChild(
                row
            );
        }
    );


    updateCertificateCount();
}


// ==========================================================
// VIEW CERTIFICATE
// ==========================================================

window.viewCertificate =
    function (id) {

        const certificate =
            allCertificates.find(
                cert =>
                    String(cert.id) ===
                    String(id)
            );


        if (!certificate) {

            alert(
                'Certificate not found.'
            );

            return;
        }


        const modal =
            document.getElementById(
                'certificateModal'
            );


        const details =
            document.getElementById(
                'certificateDetails'
            );


        if (!modal || !details)
            return;


        details.innerHTML = `

            <div style="line-height:1.8;">

                <p>
                    <strong>Certificate Number:</strong>
                    ${escapeHTML(
                        certificate.cert_number || '—'
                    )}
                </p>

                <p>
                    <strong>Student:</strong>
                    ${escapeHTML(
                        certificate.student_name || '—'
                    )}
                </p>

                <p>
                    <strong>Course:</strong>
                    ${escapeHTML(
                        certificate.course_name || '—'
                    )}
                </p>

                <p>
                    <strong>Completion Date:</strong>
                    ${formatDate(
                        certificate.completion_date
                    )}
                </p>

                <p>
                    <strong>Institution:</strong>
                    ${escapeHTML(
                        certificate.institution || '—'
                    )}
                </p>

                <p>
                    <strong>Director:</strong>
                    ${escapeHTML(
                        certificate.director || '—'
                    )}
                </p>

            </div>

        `;


        modal.classList.add(
            'show'
        );
    };


// ==========================================================
// CLOSE MODAL
// ==========================================================

function setupCertificateModal() {

    const modal =
        document.getElementById(
            'certificateModal'
        );


    const closeButton =
        document.getElementById(
            'closeModal'
        );


    if (closeButton) {

        closeButton.addEventListener(
            'click',
            function () {

                if (modal) {

                    modal.classList.remove(
                        'show'
                    );
                }
            }
        );
    }


    if (modal) {

        modal.addEventListener(
            'click',
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.remove(
                        'show'
                    );
                }
            }
        );
    }
}
