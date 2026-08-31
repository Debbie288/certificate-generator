// ==========================================
// / CERTIFICATE GENERATOR
// PROFESSIONAL DASHBOARD STATISTICS
// ==========================================


// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const STATS_SUPABASE_URL =
    'https://gdophhworvapqctpmyia.supabase.co';

const STATS_SUPABASE_KEY =
    'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';


// ==========================================
// CREATE SUPABASE CLIENT
// ==========================================

let statsSupabase = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === 'function'
) {

    statsSupabase =
        window.supabase.createClient(
            STATS_SUPABASE_URL,
            STATS_SUPABASE_KEY
        );

}


// ==========================================
// SAFE TEXT FUNCTION
// ==========================================

function statsEscapeHTML(value) {

    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


// ==========================================
// FORMAT NUMBER
// ==========================================

function statsFormatNumber(number) {

    return Number(number || 0)
        .toLocaleString('en-US');

}


// ==========================================
// SET DASHBOARD VALUE
// ==========================================

function setStatsValue(id, value) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        statsFormatNumber(value);

}


// ==========================================
// LOAD DASHBOARD STATISTICS
// ==========================================

async function loadCertificateStatistics() {

    console.log(
        '📊 Loading certificate statistics...'
    );


    // ------------------------------------------
    // CHECK SUPABASE
    // ------------------------------------------

    if (!statsSupabase) {

        console.error(
            '❌ Supabase client could not be created.'
        );

        return;

    }


    try {

        // --------------------------------------
        // GET CERTIFICATES
        // --------------------------------------

        const {
            data: certificates,
            error
        } =
            await statsSupabase
                .from('certificates')
                .select('*');


        // --------------------------------------
        // HANDLE DATABASE ERROR
        // --------------------------------------

        if (error) {

            console.error(
                '❌ Statistics database error:',
                error
            );

            return;

        }


        const records =
            Array.isArray(certificates)
                ? certificates
                : [];


        console.log(
            '📊 Certificates found:',
            records.length
        );


        // ======================================
        // TOTAL CERTIFICATES
        // ======================================

        const totalCertificates =
            records.length;


        setStatsValue(
            'totalCertificates',
            totalCertificates
        );


        // ======================================
        // THIS MONTH
        // ======================================

        const now =
            new Date();

        const currentMonth =
            now.getMonth();

        const currentYear =
            now.getFullYear();


        const monthlyCertificates =
            records.filter(function (certificate) {

                const dateValue =
                    certificate.created_at ||
                    certificate.completion_date;


                if (!dateValue) {
                    return false;
                }


                const date =
                    new Date(dateValue);


                return (
                    date.getMonth() === currentMonth &&
                    date.getFullYear() === currentYear
                );

            }).length;


        setStatsValue(
            'monthlyCertificates',
            monthlyCertificates
        );


        // ======================================
        // UNIQUE COURSES
        // ======================================

        const courseMap =
            new Map();


        records.forEach(function (certificate) {

            const course =
                String(
                    certificate.course_name || ''
                ).trim();


            if (!course) {
                return;
            }


            const key =
                course.toLowerCase();


            if (!courseMap.has(key)) {

                courseMap.set(
                    key,
                    course
                );

            }

        });


        const totalCourses =
            courseMap.size;


        setStatsValue(
            'totalCourses',
            totalCourses
        );


        // ======================================
        // UNIQUE INSTITUTIONS
        // ======================================

        const institutionMap =
            new Map();


        records.forEach(function (certificate) {

            const institution =
                String(
                    certificate.institution || ''
                ).trim();


            if (!institution) {
                return;
            }


            const key =
                institution.toLowerCase();


            if (!institutionMap.has(key)) {

                institutionMap.set(
                    key,
                    institution
                );

            }

        });


        const totalInstitutions =
            institutionMap.size;


        setStatsValue(
            'totalInstitutions',
            totalInstitutions
        );


        // ======================================
        // ANALYTICS TOTAL
        // ======================================

        const analyticsTotal =
            document.getElementById(
                'analyticsTotal'
            );


        if (analyticsTotal) {

            analyticsTotal.textContent =
                statsFormatNumber(
                    totalCertificates
                );

        }


        // ======================================
        // COURSE FREQUENCY
        // ======================================

        const courseCounts =
            {};


        records.forEach(function (certificate) {

            const course =
                String(
                    certificate.course_name || ''
                ).trim();


            if (!course) {
                return;
            }


            const key =
                course.toLowerCase();


            if (!courseCounts[key]) {

                courseCounts[key] = {

                    name: course,

                    count: 0

                };

            }


            courseCounts[key].count++;

        });


        // ======================================
        // SORT COURSES
        // ======================================

        const sortedCourses =
            Object.values(courseCounts)
                .sort(function (a, b) {

                    return b.count - a.count;

                });


        // ======================================
        // MOST POPULAR COURSE
        // ======================================

        const popularCourseElement =
            document.getElementById(
                'popularCourse'
            );


        if (popularCourseElement) {

            if (sortedCourses.length > 0) {

                popularCourseElement.textContent =
                    sortedCourses[0].name;

            } else {

                popularCourseElement.textContent =
                    '—';

            }

        }


        // ======================================
        // LATEST CERTIFICATE
        // ======================================

        const sortedByDate =
            [...records].sort(
                function (a, b) {

                    const dateA =
                        new Date(
                            a.created_at ||
                            a.completion_date ||
                            0
                        );

                    const dateB =
                        new Date(
                            b.created_at ||
                            b.completion_date ||
                            0
                        );


                    return dateB - dateA;

                }
            );


        const latestCertificate =
            sortedByDate[0];


        const latestElement =
            document.getElementById(
                'latestCertificate'
            );


        if (latestElement) {

            latestElement.textContent =
                latestCertificate
                    ? (
                        latestCertificate.cert_number ||
                        '—'
                    )
                    : '—';

        }


        // ======================================
        // COURSE ANALYTICS DISPLAY
        // ======================================

        const courseAnalytics =
            document.getElementById(
                'courseAnalytics'
            );


        if (courseAnalytics) {

            if (sortedCourses.length === 0) {

                courseAnalytics.innerHTML = `

                    <div class="empty-state">

                        No certificate data available yet.

                    </div>

                `;

            } else {

                courseAnalytics.innerHTML =
                    sortedCourses
                        .map(function (course) {

                            const percentage =
                                totalCertificates > 0
                                    ? Math.round(
                                        (
                                            course.count /
                                            totalCertificates
                                        ) * 100
                                    )
                                    : 0;


                            return `

                                <div
                                    style="
                                        padding:16px;
                                        margin-bottom:12px;
                                        border:1px solid #e5e7eb;
                                        border-radius:12px;
                                        background:#ffffff;
                                    "
                                >

                                    <div
                                        style="
                                            display:flex;
                                            justify-content:space-between;
                                            align-items:center;
                                            gap:15px;
                                            margin-bottom:10px;
                                        "
                                    >

                                        <strong
                                            style="
                                                color:#111827;
                                            "
                                        >
                                            ${statsEscapeHTML(
                                                course.name
                                            )}
                                        </strong>

                                        <span
                                            style="
                                                font-weight:700;
                                                color:#2563eb;
                                            "
                                        >
                                            ${course.count}
                                        </span>

                                    </div>


                                    <div
                                        style="
                                            width:100%;
                                            height:8px;
                                            background:#e5e7eb;
                                            border-radius:20px;
                                            overflow:hidden;
                                        "
                                    >

                                        <div
                                            style="
                                                width:${percentage}%;
                                                height:100%;
                                                background:#2563eb;
                                                border-radius:20px;
                                                transition:width .5s ease;
                                            "
                                        ></div>

                                    </div>


                                    <div
                                        style="
                                            margin-top:6px;
                                            font-size:12px;
                                            color:#6b7280;
                                        "
                                    >
                                        ${percentage}% of certificates
                                    </div>

                                </div>

                            `;

                        })
                        .join('');

            }

        }


        // ======================================
        // DASHBOARD COMPLETE
        // ======================================

        console.log(
            '✅ Dashboard statistics loaded successfully.',
            {
                totalCertificates:
                    totalCertificates,

                thisMonth:
                    monthlyCertificates,

                totalCourses:
                    totalCourses,

                totalInstitutions:
                    totalInstitutions
            }
        );


    }

    catch (error) {

        console.error(
            '❌ Statistics failed:',
            error
        );

    }

}


// ==========================================
// START STATISTICS
// ==========================================

function startCertificateStatistics() {

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            loadCertificateStatistics
        );

    } else {

        loadCertificateStatistics();

    }

}


// ==========================================
// START
// ==========================================

startCertificateStatistics();


// ==========================================
// OPTIONAL GLOBAL REFRESH
// ==========================================

window.refreshCertificateStatistics =
    loadCertificateStatistics;
