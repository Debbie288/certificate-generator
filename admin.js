// ==========================================================
// CERTIFICATE GENERATOR - ADMIN DASHBOARD
// COMPLETE admin.js
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

        console.log(
            'ADMIN.JS LOADED'
        );

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
        } =
            await supabaseClient
                .auth
                .getUser();


        if (error) {

            console.error(
                'Auth error:',
                error
            );

            window.location.href =
                'admin-login.html';

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


        setText(
            'adminEmail',
            user.email
        );


        setText(
            'settingsEmail',
            user.email
        );


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
// LOAD CERTIFICATES
// ==========================================================

async function loadCertificates() {

    console.log(
        'Loading certificates from Supabase...'
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .from('certificates')
            .select(
                'id, student_name, course_name, completion_date, cert_number, institution, director, created_at'
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
        [
            ...allCertificates
        ];


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
            certificate => {

                if (
                    !certificate.completion_date
                ) {

                    return false;
                }


                const date =
                    new Date(
                        certificate.completion_date +
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
// RECENT CERTIFICATES
// ==========================================================

function displayRecentCertificates() {

    const body =
        document.getElementById(
            'recentCertificatesBody'
        );


    if (!body)
        return;


    body.innerHTML =
        '';


    const recent =
        allCertificates.slice(
            0,
            5
        );


    if (
        recent.length ===
        0
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
                        certificate.cert_number ||
                        '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.student_name ||
                        '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.course_name ||
                        '—'
                    )}
                </td>

                <td>
                    ${formatDate(
                        certificate.completion_date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.institution ||
                        '—'
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


    if (!body)
        return;


    body.innerHTML =
        '';


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
                            certificate.cert_number ||
                            '—'
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        certificate.student_name ||
                        '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.course_name ||
                        '—'
                    )}
                </td>

                <td>
                    ${formatDate(
                        certificate.completion_date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.institution ||
                        '—'
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        certificate.director ||
                        '—'
                    )}
                </td>

                <td>

                    <button
                        class="secondary-button"
                        onclick="viewCertificate('${certificate.id}')"
                    >
                        👁️ View
                    </button>

                    <button
                        class="secondary-button"
                        onclick="editCertificate('${certificate.id}')"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="secondary-button"
                        onclick="deleteCertificate('${certificate.id}')"
                    >
                        🗑️ Delete
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
// SECTION 2 OF 4
// VIEW + EDIT + DELETE
// ==========================================================


// ==========================================================
// VIEW CERTIFICATE
// ==========================================================

window.viewCertificate = function (id) {

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
// EDIT CERTIFICATE
// ==========================================================

window.editCertificate = async function (id) {

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


    const studentName =
        prompt(
            'Student name:',
            certificate.student_name || ''
        );


    if (
        studentName ===
        null
    ) {

        return;
    }


    const courseName =
        prompt(
            'Course name:',
            certificate.course_name || ''
        );


    if (
        courseName ===
        null
    ) {

        return;
    }


    const completionDate =
        prompt(
            'Completion date (YYYY-MM-DD):',
            certificate.completion_date || ''
        );


    if (
        completionDate ===
        null
    ) {

        return;
    }


    const institution =
        prompt(
            'Institution:',
            certificate.institution || ''
        );


    if (
        institution ===
        null
    ) {

        return;
    }


    const director =
        prompt(
            'Director:',
            certificate.director || ''
        );


    if (
        director ===
        null
    ) {

        return;
    }


    const confirmed =
        confirm(
            'Save these changes to this certificate?'
        );


    if (!confirmed)
        return;


    const {
        error
    } =
        await supabaseClient
            .from('certificates')
            .update({

                student_name:
                    studentName.trim(),

                course_name:
                    courseName.trim(),

                completion_date:
                    completionDate,

                institution:
                    institution.trim(),

                director:
                    director.trim()

            })
            .eq(
                'id',
                id
            );


    if (error) {

        console.error(
            'UPDATE ERROR:',
            error
        );


        alert(
            '❌ Update failed:\n\n' +
            error.message
        );


        return;
    }


    alert(
        '✅ Certificate updated successfully!'
    );


    await loadCertificates();
};


// ==========================================================
// DELETE CERTIFICATE
// ==========================================================

window.deleteCertificate = async function (id) {

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


    const confirmed =
        confirm(

            '⚠️ DELETE CERTIFICATE?\n\n' +

            'Certificate: ' +
            (
                certificate.cert_number ||
                'Unknown'
            ) +

            '\nStudent: ' +
            (
                certificate.student_name ||
                'Unknown'
            ) +

            '\n\nThis action cannot be undone.'

        );


    if (!confirmed)
        return;


    const {
        error
    } =
        await supabaseClient
            .from('certificates')
            .delete()
            .eq(
                'id',
                id
            );


    if (error) {

        console.error(
            'DELETE ERROR:',
            error
        );


        alert(
            '❌ Delete failed:\n\n' +
            error.message
        );


        return;
    }


    alert(
        '✅ Certificate deleted successfully!'
    );


    await loadCertificates();
};


// ==========================================================
// CLOSE CERTIFICATE MODAL
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


    if (
        closeButton &&
        modal
    ) {

        closeButton.addEventListener(
            'click',
            function () {

                modal.classList.remove(
                    'show'
                );

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


// ==========================================================
// NAVIGATION
// ==========================================================

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            '.nav-item'
        );


    navItems.forEach(
        item => {

            item.addEventListener(
                'click',
                function () {

                    const section =
                        item.dataset.section;


                    showSection(
                        section
                    );


                    navItems.forEach(
                        nav =>
                            nav.classList.remove(
                                'active'
                            )
                    );


                    item.classList.add(
                        'active'
                    );

                }
            );

        }
    );


    const sectionButtons =
        document.querySelectorAll(
            '[data-section-button]'
        );


    sectionButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                function () {

                    showSection(
                        button.dataset.sectionButton
                    );

                }
            );

        }
    );
}


// ==========================================================
// SHOW SECTION
// ==========================================================

function showSection(
    sectionId
) {

    const sections =
        document.querySelectorAll(
            '.page-section'
        );


    sections.forEach(
        section => {

            section.classList.remove(
                'active-section'
            );

        }
    );


    const selected =
        document.getElementById(
            sectionId
        );


    if (selected) {

        selected.classList.add(
            'active-section'
        );

    }


    const titles = {

        dashboardSection:
            'Dashboard',

        certificatesSection:
            'Certificates',

        analyticsSection:
            'Analytics',

        activitySection:
            'Activity',

        settingsSection:
            'Settings'

    };


    setText(
        'pageTitle',
        titles[sectionId] ||
        'Dashboard'
    );


    const sidebar =
        document.getElementById(
            'sidebar'
        );


    if (
        window.innerWidth <=
        800
    ) {

        if (sidebar) {

            sidebar.classList.remove(
                'open'
            );

        }
    }
}
