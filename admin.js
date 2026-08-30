// ==========================================
// SUPABASE ADMIN DASHBOARD
// ==========================================

const SUPABASE_URL =
    'https://gdophhworvapqctpmyia.supabase.co';

const SUPABASE_KEY =
    'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// GLOBAL DATA
// ==========================================

let certificates = [];


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    async function () {

        // Check admin login
        await checkAdmin();

        // Setup dashboard
        setupNavigation();
        setupMenu();
        setupLogout();
        setupFilters();
        setupButtons();

        // Load certificates
        await loadCertificates();

    }
);


// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

async function checkAdmin() {

    const {
        data,
        error
    } = await supabaseClient.auth.getUser();

    if (
        error ||
        !data ||
        !data.user
    ) {

        window.location.href =
            'login.html';

        return;
    }


    const email =
        data.user.email || 'Administrator';


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
            email;
    }


    if (settingsEmail) {
        settingsEmail.textContent =
            email;
    }
}


// ==========================================
// NAVIGATION
// ==========================================

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            '.nav-item'
        );


    navItems.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function () {

                    const section =
                        button.dataset.section;

                    showSection(section);

                }
            );

        }
    );


    const sectionButtons =
        document.querySelectorAll(
            '[data-section-button]'
        );


    sectionButtons.forEach(
        function (button) {

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


// ==========================================
// SHOW SECTION
// ==========================================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            '.page-section'
        );


    sections.forEach(
        function (section) {

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


    const navItems =
        document.querySelectorAll(
            '.nav-item'
        );


    navItems.forEach(
        function (item) {

            item.classList.remove(
                'active'
            );


            if (
                item.dataset.section ===
                sectionId
            ) {

                item.classList.add(
                    'active'
                );

            }

        }
    );


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


    const pageTitle =
        document.getElementById(
            'pageTitle'
        );


    if (pageTitle) {

        pageTitle.textContent =
            titles[sectionId] ||
            'Dashboard';

    }


    // Close mobile menu
    document
        .getElementById('sidebar')
        ?.classList.remove(
            'mobile-open'
        );
}


// ==========================================
// MOBILE MENU
// ==========================================

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
                    'mobile-open'
                );

            }
        );

    }
}


// ==========================================
// LOGOUT
// ==========================================

function setupLogout() {

    const logoutButton =
        document.getElementById(
            'logoutButton'
        );


    if (!logoutButton) return;


    logoutButton.addEventListener(
        'click',
        async function () {

            const confirmLogout =
                confirm(
                    'Are you sure you want to logout?'
                );


            if (!confirmLogout) {
                return;
            }


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
                'login.html';

        }
    );
}


// ==========================================
// LOAD CERTIFICATES
// ==========================================

async function loadCertificates() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from('certificates')
            .select('*')
            .order(
                'completion_date',
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            'Certificate loading error:',
            error
        );


        alert(
            'Could not load certificates.\n\n' +
            error.message
        );

        return;
    }


    certificates =
        data || [];


    updateDashboard();
    updateCertificateTable();
    updateFilters();
    updateAnalytics();

}


// ==========================================
// DASHBOARD STATISTICS
// ==========================================

function updateDashboard() {

    const total =
        certificates.length;


    setText(
        'totalCertificates',
        total
    );


    const now =
        new Date();


    const currentMonth =
        now.getMonth();


    const currentYear =
        now.getFullYear();


    const monthly =
        certificates.filter(
            function (certificate) {

                if (
                    !certificate.completion_date
                ) {
                    return false;
                }


                const date =
                    new Date(
                        certificate.completion_date
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
        'monthlyCertificates',
        monthly
    );


    const courses =
        new Set();


    const institutions =
        new Set();


    certificates.forEach(
        function (certificate) {

            if (
                certificate.course_name
            ) {

                courses.add(
                    certificate.course_name
                );

            }


            if (
                certificate.institution
            ) {

                institutions.add(
                    certificate.institution
                );

            }

        }
    );


    setText(
        'totalCourses',
        courses.size
    );


    setText(
        'totalInstitutions',
        institutions.size
    );


    // Recent certificates

    const recent =
        certificates.slice(
            0,
            10
        );


    const body =
        document.getElementById(
            'recentCertificatesBody'
        );


    if (!body) return;


    body.innerHTML = '';


    if (!recent.length) {

        body.innerHTML =
            `
            <tr>
                <td colspan="5">
                    No certificates yet.
                </td>
            </tr>
            `;

        return;
    }


    recent.forEach(
        function (certificate) {

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


// ==========================================
// CERTIFICATE TABLE
// ==========================================

function updateCertificateTable() {

    const body =
        document.getElementById(
            'certificatesBody'
        );


    if (!body) return;


    const filtered =
        getFilteredCertificates();


    body.innerHTML = '';


    setText(
        'certificateCount',
        filtered.length +
        (
            filtered.length === 1
                ? ' certificate'
                : ' certificates'
        )
    );


    if (!filtered.length) {

        body.innerHTML =
            `
            <tr>
                <td colspan="7">
                    No certificates found.
                </td>
            </tr>
            `;

        return;
    }


    filtered.forEach(
        function (certificate) {

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
                        class="table-action view-button"
                        data-id="${certificate.id}"
                    >
                        View
                    </button>

                    <button
                        class="table-action delete-button"
                        data-id="${certificate.id}"
                    >
                        Delete
                    </button>

                </td>

            `;


            body.appendChild(
                row
            );

        }
    );


    // View buttons

    document
        .querySelectorAll(
            '.view-button'
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    'click',
                    function () {

                        openCertificate(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    // Delete buttons

    document
        .querySelectorAll(
            '.delete-button'
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    'click',
                    function () {

                        deleteCertificate(
                            button.dataset.id
                        );

                    }
                );

            }
        );
}


// ==========================================
// FILTERS
// ==========================================

function setupFilters() {

    const search =
        document.getElementById(
            'searchInput'
        );

    const course =
        document.getElementById(
            'courseFilter'
        );

    const institution =
        document.getElementById(
            'institutionFilter'
        );

    const from =
        document.getElementById(
            'dateFrom'
        );

    const to =
        document.getElementById(
            'dateTo'
        );

    const clear =
        document.getElementById(
            'clearFilters'
        );


    [
        search,
        course,
        institution,
        from,
        to
    ].forEach(
        function (element) {

            if (!element) return;


            element.addEventListener(
                'input',
                updateCertificateTable
            );


            element.addEventListener(
                'change',
                updateCertificateTable
            );

        }
    );


    if (clear) {

        clear.addEventListener(
            'click',
            function () {

                if (search)
                    search.value = '';

                if (course)
                    course.value = '';

                if (institution)
                    institution.value = '';

                if (from)
                    from.value = '';

                if (to)
                    to.value = '';


                updateCertificateTable();

            }
        );

    }
}


// ==========================================
// FILTER DATA
// ==========================================

function getFilteredCertificates() {

    const search =
        (
            document
                .getElementById(
                    'searchInput'
                )
                ?.value || ''
        )
        .toLowerCase()
        .trim();


    const course =
        document
            .getElementById(
                'courseFilter'
            )
            ?.value || '';


    const institution =
        document
            .getElementById(
                'institutionFilter'
            )
            ?.value || '';


    const from =
        document
            .getElementById(
                'dateFrom'
            )
            ?.value || '';


    const to =
        document
            .getElementById(
                'dateTo'
            )
            ?.value || '';


    return certificates.filter(
        function (certificate) {

            const searchable = [

                certificate.student_name,

                certificate.course_name,

                certificate.cert_number,

                certificate.institution,

                certificate.director

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
                from &&
                certificate.completion_date <
                from
            ) {
                return false;
            }


            if (
                to &&
                certificate.completion_date >
                to
            ) {
                return false;
            }


            return true;

        }
    );
}


// ==========================================
// UPDATE FILTER OPTIONS
// ==========================================

function updateFilters() {

    const courseSelect =
        document.getElementById(
            'courseFilter'
        );


    const institutionSelect =
        document.getElementById(
            'institutionFilter'
        );


    if (courseSelect) {

        const current =
            courseSelect.value;


        const courses =
            [
                ...new Set(
                    certificates
                        .map(
                            c =>
                                c.course_name
                        )
                        .filter(Boolean)
                )
            ]
            .sort();


        courseSelect.innerHTML =
            '<option value="">All Courses</option>';


        courses.forEach(
            function (course) {

                const option =
                    document.createElement(
                        'option'
                    );


                option.value =
                    course;

                option.textContent =
                    course;


                courseSelect.appendChild(
                    option
                );

            }
        );


        courseSelect.value =
            current;
    }


    if (institutionSelect) {

        const current =
            institutionSelect.value;


        const institutions =
            [
                ...new Set(
                    certificates
                        .map(
                            c =>
                                c.institution
                        )
                        .filter(Boolean)
                )
            ]
            .sort();


        institutionSelect.innerHTML =
            '<option value="">All Institutions</option>';


        institutions.forEach(
            function (institution) {

                const option =
                    document.createElement(
                        'option'
                    );


                option.value =
                    institution;

                option.textContent =
                    institution;


                institutionSelect.appendChild(
                    option
                );

            }
        );


        institutionSelect.value =
            current;
    }
}


// ==========================================
// ANALYTICS
// ==========================================

function updateAnalytics() {

    setText(
        'analyticsTotal',
        
