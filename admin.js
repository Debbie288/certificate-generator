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
// ==========================================================
// SECTION 3 OF 4
// NAVIGATION + FILTERS
// ==========================================================


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


// ==========================================================
// MOBILE MENU
// ==========================================================

function setupMenu() {

    const menuButton =
        document.getElementById(
            'menuButton'
        );


    const sidebar =
        document.getElementById(
            'sidebar'
        );


    if (
        menuButton &&
        sidebar
    ) {

        menuButton.addEventListener(
            'click',
            function () {

                sidebar.classList.toggle(
                    'open'
                );
            }
        );
    }
}


// ==========================================================
// LOGOUT
// ==========================================================

function setupLogout() {

    const button =
        document.getElementById(
            'logoutButton'
        );


    if (!button)
        return;


    button.addEventListener(
        'click',
        async function () {

            const confirmed =
                confirm(
                    'Are you sure you want to logout?'
                );


            if (!confirmed)
                return;


            const {
                error
            } =
                await supabaseClient.auth.signOut();


            if (error) {

                alert(
                    'Logout failed: ' +
                    error.message
                );

                return;
            }


            window.location.href =
                'admin-login.html';
        }
    );
}


// ==========================================================
// FILTER SETUP
// ==========================================================

function setupFilters() {

    const searchInput =
        document.getElementById(
            'searchInput'
        );


    const courseFilter =
        document.getElementById(
            'courseFilter'
        );


    const institutionFilter =
        document.getElementById(
            'institutionFilter'
        );


    const dateFrom =
        document.getElementById(
            'dateFrom'
        );


    const dateTo =
        document.getElementById(
            'dateTo'
        );


    const clearButton =
        document.getElementById(
            'clearFilters'
        );


    [
        searchInput,
        courseFilter,
        institutionFilter,
        dateFrom,
        dateTo
    ]
        .filter(Boolean)
        .forEach(
            element => {

                element.addEventListener(
                    'input',
                    applyFilters
                );

                element.addEventListener(
                    'change',
                    applyFilters
                );
            }
        );


    if (clearButton) {

        clearButton.addEventListener(
            'click',
            function () {

                if (searchInput)
                    searchInput.value = '';

                if (courseFilter)
                    courseFilter.value = '';

                if (institutionFilter)
                    institutionFilter.value = '';

                if (dateFrom)
                    dateFrom.value = '';

                if (dateTo)
                    dateTo.value = '';


                applyFilters();
            }
        );
    }
}


// ==========================================================
// APPLY FILTERS
// ==========================================================

function applyFilters() {

    const search =
        (
            document.getElementById(
                'searchInput'
            )?.value || ''
        )
        .toLowerCase()
        .trim();


    const course =
        document.getElementById(
            'courseFilter'
        )?.value || '';


    const institution =
        document.getElementById(
            'institutionFilter'
        )?.value || '';


    const dateFrom =
        document.getElementById(
            'dateFrom'
        )?.value || '';


    const dateTo =
        document.getElementById(
            'dateTo'
        )?.value || '';


    filteredCertificates =
        allCertificates.filter(
            certificate => {

                const searchable = [

                    certificate.student_name,

                    certificate.course_name,

                    certificate.cert_number,

                    certificate.institution

                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();


                if (
                    search &&
                    !searchable.includes(
                        search
                    )
                ) {

                    return false;
                }


                if (
                    course &&
                    certificate.course_name !==
                    course
                ) {

                    return false;
                }


                if (
                    institution &&
                    certificate.institution !==
                    institution
                ) {

                    return false;
                }


                if (
                    dateFrom &&
                    certificate.completion_date <
                    dateFrom
                ) {

                    return false;
                }


                if (
                    dateTo &&
                    certificate.completion_date >
                    dateTo
                ) {

                    return false;
                }


                return true;
            }
        );


    displayCertificates();
}


// ==========================================================
// COURSE FILTER
// ==========================================================

function populateCourseFilter() {

    const select =
        document.getElementById(
            'courseFilter'
        );


    if (!select)
        return;


    const current =
        select.value;


    select.innerHTML =
        '<option value="">All Courses</option>';


    const courses =
        [
            ...new Set(
                allCertificates
                    .map(
                        cert =>
                            cert.course_name
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    courses.forEach(
        course => {

            const option =
                document.createElement(
                    'option'
                );


            option.value =
                course;


            option.textContent =
                course;


            select.appendChild(
                option
            );
        }
    );


    select.value =
        current;
}


// ==========================================================
// INSTITUTION FILTER
// ==========================================================

function populateInstitutionFilter() {

    const select =
        document.getElementById(
            'institutionFilter'
        );


    if (!select)
        return;


    const current =
        select.value;


    select.innerHTML =
        '<option value="">All Institutions</option>';


    const institutions =
        [
            ...new Set(
                allCertificates
                    .map(
                        cert =>
                            cert.institution
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    institutions.forEach(
        institution => {

            const option =
                document.createElement(
                    'option'
                );


            option.value =
                institution;


            option.textContent =
                institution;


            select.appendChild(
                option
            );
        }
    );


    select.value =
        current;
                }
// ==========================================================
// SECTION 4 OF 4
// ANALYTICS + EXPORT + HELPERS
// ==========================================================


// ==========================================================
// ANALYTICS
// ==========================================================

function updateAnalytics() {

    if (
        allCertificates.length ===
        0
    ) {

        setText(
            'popularCourse',
            '—'
        );


        setText(
            'latestCertificate',
            '—'
        );


        const analytics =
            document.getElementById(
                'courseAnalytics'
            );


        if (analytics) {

            analytics.innerHTML = `
                <div class="empty-state">
                    No certificate data available yet.
                </div>
            `;
        }


        return;
    }


    const courseCounts =
        {};


    allCertificates.forEach(
        certificate => {

            const course =
                certificate.course_name ||
                'Unknown';


            courseCounts[course] =
                (
                    courseCounts[course] ||
                    0
                ) + 1;
        }
    );


    const sortedCourses =
        Object.entries(
            courseCounts
        )
        .sort(
            (
                a,
                b
            ) =>
                b[1] -
                a[1]
        );


    const popular =
        sortedCourses[0];


    setText(
        'popularCourse',
        popular
            ? `${popular[0]} (${popular[1]})`
            : '—'
    );


    const latest =
        allCertificates[0];


    setText(
        'latestCertificate',
        latest
            ? (
                latest.cert_number ||
                latest.student_name ||
                '—'
            )
            : '—'
    );


    const analytics =
        document.getElementById(
            'courseAnalytics'
        );


    if (!analytics)
        return;


    analytics.innerHTML = '';


    sortedCourses.forEach(
        item => {

            const row =
                document.createElement(
                    'div'
                );


            row.style.padding =
                '12px 0';


            row.style.borderBottom =
                '1px solid #eee';


            row.innerHTML = `

                <strong>
                    ${escapeHTML(
                        item[0]
                    )}
                </strong>

                <span style="float:right;">
                    ${item[1]}
                </span>

            `;


            analytics.appendChild(
                row
            );
        }
    );
}


// ==========================================================
// BUTTONS
// ==========================================================

function setupButtons() {

    const refresh =
        document.getElementById(
            'refreshCertificates'
        );


    if (refresh) {

        refresh.addEventListener(
            'click',
            async function () {

                refresh.textContent =
                    '⏳ Loading...';


                await loadCertificates();


                refresh.textContent =
                    '🔄 Refresh';
            }
        );
    }


    const exportButton =
        document.getElementById(
            'exportCSV'
        );


    if (exportButton) {

        exportButton.addEventListener(
            'click',
            exportCSV
        );
    }
}


// ==========================================================
// EXPORT CSV
// ==========================================================

function exportCSV() {

    if (
        filteredCertificates.length ===
        0
    ) {

        alert(
            'There are no certificates to export.'
        );

        return;
    }


    const headers = [

        'Certificate Number',

        'Student Name',

        'Course',

        'Completion Date',

        'Institution',

        'Director'

    ];


    const rows =
        filteredCertificates.map(
            certificate => [

                certificate.cert_number,

                certificate.student_name,

                certificate.course_name,

                certificate.completion_date,

                certificate.institution,

                certificate.director

            ]
        );


    const csv = [

        headers,

        ...rows

    ]
        .map(
            row =>
                row
                    .map(
                        value =>
                            `"${String(
                                value ?? ''
                            )
                            .replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(',')
        )
        .join('\n');


    const blob =
        new Blob(
            [csv],
            {
                type:
                    'text/csv;charset=utf-8;'
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            'a'
        );


    link.href =
        url;


    link.download =
        'certificates.csv';


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );
}


// ==========================================================
// CERTIFICATE COUNT
// ==========================================================

function updateCertificateCount() {

    const element =
        document.getElementById(
            'certificateCount'
        );


    if (!element)
        return;


    const count =
        filteredCertificates.length;


    element.textContent =
        count +
        (
            count === 1
                ? ' certificate'
                : ' certificates'
        );
}


// ==========================================================
// FORMAT DATE
// ==========================================================

function formatDate(
    date
) {

    if (!date)
        return '—';


    const parsed =
        new Date(
            date +
            'T00:00:00'
        );


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return date;
    }


    return parsed.toLocaleDateString(
        'en-US',
        {
            year:
                'numeric',

            month:
                'long',

            day:
                'numeric'
        }
    );
}


// ==========================================================
// SET TEXT
// ==========================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;
    }
}


// ==========================================================
// ESCAPE HTML
// ==========================================================

function escapeHTML(
    value
) {

    return String(
        value ?? ''
    )
    .replace(
        /&/g,
        '&amp;'
    )
    .replace(
        /</g,
        '&lt;'
    )
    .replace(
        />/g,
        '&gt;'
    )
    .replace(
        /"/g,
        '&quot;'
    )
    .replace(
        /'/g,
        '&#039;'
    );
}


// ==========================================================
// DATABASE ERROR
// ==========================================================

function showDatabaseError(
    error
) {

    console.error(
        'Database error:',
        error
    );


    const message =
        error?.message ||
        'Unknown Supabase error';


    alert(
        '❌ Could not load certificates from Supabase.\n\n' +
        message +
        '\n\n' +
        'If your certificates table contains data, we may need to fix the Supabase SELECT policy.'
    );
}


// ==========================================================
// GENERAL ERROR
// ==========================================================

function showError(
    message
) {

    alert(
        '❌ ' +
        message
    );
}


// ==========================================================
// READY
// ==========================================================

console.log(
    'Certificate Admin Dashboard JS ready.'
);
