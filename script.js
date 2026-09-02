/* =========================================================
   XYLARION CERTIFICATE GENERATOR
   PREMIUM CERTIFICATE SYSTEM
   SESSION 1 — FOUNDATION
========================================================= */


/* =========================================================
   1. SUPABASE CONNECTION
========================================================= */

const supabaseUrl =
    'https://gdophhworvapqctpmyia.supabase.co';

const supabaseKey =
    'sb_publishable_PUMkwRHzr6lwQQzTQyO1bQ_DCmmQ9ww';

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === 'function'
) {
    supabaseClient = window.supabase.createClient(
        supabaseUrl,
        supabaseKey
    );
}


/* =========================================================
   2. XYLARION PREMIUM DESIGN COLORS
========================================================= */

const XYLARION_DESIGN = {
    navy: '#0B1930',
    gold: '#C8A45D',
    ivory: '#FCFAF4',
    silver: '#B8BDC5'
};


/* =========================================================
   3. SAFE HTML FUNCTION
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return '';
    }

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


/* =========================================================
   4. DESIGN COLOR HELPER
========================================================= */

function xylColor(name) {

    return XYLARION_DESIGN[name] ||
           XYLARION_DESIGN.navy;
}


/* =========================================================
   5. DATE FORMATTER
========================================================= */

function formatCertificateDate(dateValue) {

    if (!dateValue) {
        return '';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


/* =========================================================
   6. CERTIFICATE NUMBER FOUNDATION
========================================================= */

function createTemporaryCertificateNumber() {

    const year = new Date().getFullYear();

    const randomNumber =
        Math.floor(Math.random() * 90000) + 10000;

    return 'CERT-' + year + '-' + randomNumber;
}


/* =========================================================
   7. VERIFICATION URL FOUNDATION
========================================================= */

function createVerificationURL(certNumber) {

    return (
        'https://debbie288.github.io/' +
        'certificate-generator/verify.html?cert=' +
        encodeURIComponent(certNumber)
    );
}


/* =========================================================
   8. QR CODE URL FOUNDATION
========================================================= */

function createQRCodeURL(certNumber) {

    const verificationURL =
        createVerificationURL(certNumber);

    return (
        'https://api.qrserver.com/v1/create-qr-code/' +
        '?size=220x220&data=' +
        encodeURIComponent(verificationURL)
    );
}


/* =========================================================
   9. DOM READY FOUNDATION
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    function () {

        console.log(
            'Xylarion Certificate Generator loaded.'
        );

        console.log(
            'Premium design foundation loaded.'
        );

    }
);
