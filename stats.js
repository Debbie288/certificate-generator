// ==========================================
// CERTIFICATE GENERATOR
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
// SUPABASE CLIENT
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
// FORMAT NUMBER
// ==========================================

function formatStatsNumber(value) {
    return Number(value || 0).toLocaleString('en-US');
}


// ==========================================
// UPDATE ELEMENT
// ==========================================

function updateStatsElement(id, value) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        formatStatsNumber(value);
}


// ==========================================
// LOAD STATISTICS
// ==========================================

async function loadCertificateStatistics() {

    console.log(
        '📊 Loading professional dashboard statistics...'
    );


    if (!statsSupabase) {

        console.error(
            '❌ Supabase client is unavailable.'
        );

        return;
    }


    try {

        // ======================================
        // 1. TOTAL CERTIFICATES
        // ======================================

        const {
            count: totalCertificates,
            error: totalError
        } =
            await statsSupabase
                .from('certificates')
                .select('*', {
                    count: 'exact',
                    head: true
                });


        if (totalError) {
            throw totalError;
        }


        updateStatsElement(
            'totalCertificates',
            totalCertificates
        );


        // ======================================
        // 2. THIS MONTH
        // ======================================

        // Current date in the user's local browser
        // timezone.

        const now =
            new Date();


        const startOfMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );


        const startOfNextMonth =
            new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                1
            );


        const {
            count: monthlyCertificates,
            error: monthlyError
        } =
            await statsSupabase
                .from('certificates')
                .select('*', {
                    count: 'exact',
                    head: true
                })
                .gte(
                    'created_at',
                    startOfMonth.toISOString()
                )
                .lt(
                    'created_at',
                    startOfNextMonth.toISOString()
                );


        if (monthlyError) {
            throw monthlyError;
        }


        updateStatsElement(
            'monthlyCertificates',
            monthlyCertificates
        );


        // ======================================
        // 3. GET COURSE + INSTITUTION DATA
        // ======================================

        const {
            data: certificateRows,
            error: rowsError
        } =
            await statsSupabase
                .from('certificates')
                .select(
                    'course_name, institution, cert_number, created_at'
                );


        if (rowsError) {
            throw rowsError;
        }


        const records =
            Array.isArray(certificateRows)
                ? certificateRows
                : [];


        // ======================================
        // 4. UNIQUE COURSES
        // ======================================

        const courses =
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


            if (!courses.has(key)) {

                courses.set(
                    key,
                    course
                );

            }

        });


        const totalCourses =
            courses.size;


        updateStatsElement(
            'totalCourses',
            totalCourses
        );


        // ======================================
        // 5. UNIQUE INSTITUTIONS
        // ======================================

        const institutions =
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


            if (!institutions.has(key)) {

                institutions.set(
                    key,
                    institution
                );

            }

        });


        const totalInstitutions =
            institutions.size;


        updateStatsElement(
            'totalInstitutions',
            totalInstitutions
        );


        // ======================================
        // 6. ANALYTICS TOTAL
        // ======================================

        const analyticsTotal =
            document.getElementById(
                'analyticsTotal'
            );


        if (analyticsTotal) {

            analyticsTotal.textContent =
                formatStatsNumber(
                    totalCertificates
                );

        }


        // ======================================
        // 7. COURSE COUNTS
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


        const sortedCourses =
            Object.values(courseCounts)
                .sort(function (a, b) {

                    return b.count - a.count;

                });


        // ======================================
        // 8. MOST POPULAR COURSE
        // ======================================

        const popularCourse =
            document.getElementById(
                'popularCourse'
            );


        if (popularCourse) {

            popularCourse.textContent =
                sortedCourses.length > 0
                    ? sortedCourses[0].name
                    : '—';

        }


        // ======================================
        // 9. LATEST CERTIFICATE
        // ======================================

        const sortedRecords =
            [...records].sort(
                function (a, b) {

                    return new Date(
                        b.created_at || 0
                    ) - new Date(
                        a.created_at || 0
                    );

                }
            );


        const latest =
            sortedRecords[0];


        const latestCertificate =
            document.getElementById(
                'latestCertificate'
            );


        if (latestCertificate) {

            latestCertificate.textContent =
                latest &&
                latest.cert_number
                    ? latest.cert_number
                    : '—';

        }


        // ======================================
        // 10. COURSE ANALYTICS
        // ======================================

        const courseAnalytics =
            document.getElementById(
                'courseAnalytics'
            );


        if (courseAnalytics) {

            if (
                sortedCourses.length === 0
            ) {

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
                                            margin-bottom:10px;
                                        "
                                    >

                                        <strong>
                                            ${escapeStatsHTML(
                                                course.name
                                            )}
                                        </strong>

                                        <strong>
                                            ${course.count}
                                        </strong>

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
        // SUCCESS MESSAGE IN CONSOLE
        // ======================================

        console.log(
            '✅ Statistics loaded successfully.'
        );

        console.log({
            totalCertificates:
                totalCertificates,

            thisMonth:
                monthlyCertificates,

            totalCourses:
                totalCourses,

            totalInstitutions:
                totalInstitutions
        });

    }


    catch (error) {

        console.error(
            '❌ Failed to load dashboard statistics:',
            error
        );

    }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeStatsHTML(value) {

    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


// ==========================================
// START
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
// RUN
// ==========================================

startCertificateStatistics();


// ==========================================
// ALLOW MANUAL REFRESH
// ==========================================

window.refreshCertificateStatistics =
    loadCertificateStatistics;
