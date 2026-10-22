
/* =====================================================
   GAZIR DARGAH FOIZABAD FAZIL B.A. MADRASHA
   Main JavaScript
   HTML + CSS + Vanilla JavaScript
   ===================================================== */

"use strict";

/* =========================
   1. MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu?.classList.remove("active");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});


/* =========================
   2. CURRENT YEAR
========================= */

const yearElement = document.querySelector("#current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   3. NOTICE DATA
========================= */

const notices = [
    {
        id: 1,
        title: "নতুন শিক্ষাবর্ষে ভর্তি কার্যক্রম",
        category: "admission",
        date: "2026-10-15",
        description:
            "প্লে গ্রুপ, প্রাথমিক, দাখিল, আলিম ও ফাজিল (বি.এ.) শ্রেণিতে ভর্তি সংক্রান্ত তথ্যের জন্য মাদ্রাসা অফিসে যোগাযোগ করুন।"
    },
    {
        id: 2,
        title: "শিক্ষার্থীদের নিয়মিত উপস্থিতি",
        category: "academic",
        date: "2026-10-12",
        description:
            "সকল শিক্ষার্থীকে নিয়মিত ক্লাসে উপস্থিত থাকার জন্য নির্দেশ দেওয়া হলো।"
    },
    {
        id: 3,
        title: "অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি",
        category: "general",
        date: "2026-10-10",
        description:
            "শিক্ষার্থীদের পড়াশোনার অগ্রগতি নিয়ে অভিভাবকদের মাদ্রাসা অফিসের সঙ্গে যোগাযোগ করতে অনুরোধ করা হচ্ছে।"
    },
    {
        id: 4,
        title: "পরীক্ষার প্রস্তুতি ও রুটিন",
        category: "exam",
        date: "2026-10-08",
        description:
            "পরীক্ষার রুটিন ও প্রস্তুতি সংক্রান্ত হালনাগাদ তথ্যের জন্য সংশ্লিষ্ট শিক্ষকের সঙ্গে যোগাযোগ করুন।"
    }
];


/* =========================
   4. RENDER NOTICES
========================= */

const noticeContainer = document.querySelector("#notice-list");
const noticeFilter = document.querySelector("#notice-filter");

function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function renderNotices(category = "all") {
    if (!noticeContainer) return;

    const filteredNotices =
        category === "all"
            ? notices
            : notices.filter((notice) => notice.category === category);

    if (filteredNotices.length === 0) {
        noticeContainer.innerHTML =
            '<p class="empty-state">এই বিভাগে কোনো বিজ্ঞপ্তি পাওয়া যায়নি।</p>';
        return;
    }

    noticeContainer.innerHTML = filteredNotices
        .map(
            (notice) => `
                <article class="notice-card">
                    <div class="notice-date">
                        ${formatDate(notice.date)}
                    </div>

                    <div class="notice-content">
                        <h3>${notice.title}</h3>
                        <p>${notice.description}</p>
                    </div>

                    <span class="notice-category">
                        ${getCategoryName(notice.category)}
                    </span>
                </article>
            `
        )
        .join("");
}

function getCategoryName(category) {
    const categories = {
        admission: "ভর্তি",
        academic: "একাডেমিক",
        exam: "পরীক্ষা",
        general: "সাধারণ"
    };

    return categories[category] || "অন্যান্য";
}

if (noticeFilter) {
    noticeFilter.addEventListener("change", (event) => {
        renderNotices(event.target.value);
    });
}

renderNotices();


/* =========================
   5. ADMISSION FORM
========================= */

const admissionForm = document.querySelector("#admission-form");
const admissionMessage = document.querySelector("#admission-message");

if (admissionForm) {
    admissionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!admissionForm.checkValidity()) {
            admissionForm.reportValidity();
            return;
        }

        const formData = new FormData(admissionForm);

        const applicant = {
            name: formData.get("studentName"),
            guardian: formData.get("guardianName"),
            phone: formData.get("phone"),
            className: formData.get("className"),
            submittedAt: new Date().toISOString()
        };

        /*
          DEMO ONLY:
          This form does not send data to a server.
          Connect a secure backend before production use.
        */

        console.log("Demo admission application:", applicant);

        if (admissionMessage) {
            admissionMessage.textContent =
                "ফর্মটি পরীক্ষা করা হয়েছে। এটি ডেমো, তাই আবেদনটি মাদ্রাসায় পাঠানো হয়নি। ভর্তি নিশ্চিত করতে অফিসে যোগাযোগ করুন।";

            admissionMessage.classList.add("success-message");
        }

        admissionForm.reset();
    });
}


/* =========================
   6. DEMO ROLE-BASED LOGIN
========================= */

/*
  DEMO ONLY — NOT SECURE AUTHENTICATION.

  Demo accounts:
  Super Admin: admin / admin123
  Sub-Admin: subadmin / sub123
  Student: student / student123
  Guardian: guardian / guardian123
  Librarian: librarian / library123
  Teacher: teacher / teacher123

  Never use these demo credentials in production.
*/

const demoUsers = [
    {
        username: "admin",
        password: "admin123",
        role: "Super Admin",
        name: "Super Administrator"
    },
    {
        username: "subadmin",
        password: "sub123",
        role: "Sub-Admin",
        name: "Sub Administrator"
    },
    {
        username: "student",
        password: "student123",
        role: "Student",
        name: "Demo Student"
    },
    {
        username: "guardian",
        password: "guardian123",
        role: "Guardian",
        name: "Demo Guardian"
    },
    {
        username: "librarian",
        password: "library123",
        role: "Librarian",
        name: "Demo Librarian"
    },
    {
        username: "teacher",
        password: "teacher123",
        role: "Teacher / Staff",
        name: "Demo Teacher"
    }
];

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const logoutButton = document.querySelector("#logout-button");

function showLoginMessage(message, isError = true) {
    if (!loginMessage) return;

    loginMessage.textContent = message;
    loginMessage.classList.toggle("error-message", isError);
    loginMessage.classList.toggle("success-message", !isError);
}

function showDashboard(user) {
    if (loginPanel) loginPanel.hidden = true;
    if (dashboard) dashboard.hidden = false;

    const userNameElement = document.querySelector("#dashboard-user");
    const userRoleElement = document.querySelector("#dashboard-role");
    const dashboardContent = document.querySelector("#dashboard-content");

    if (userNameElement) {
        userNameElement.textContent = user.name;
    }

    if (userRoleElement) {
        userRoleElement.textContent = user.role;
    }

    if (dashboardContent) {
        dashboardContent.innerHTML = `
            <h3>স্বাগতম, ${user.name}</h3>
            <p>আপনার ডেমো ভূমিকা: ${user.role}</p>
            <p>
                এটি একটি নমুনা ড্যাশবোর্ড।
                এখানে বাস্তব শিক্ষার্থী, শিক্ষক, ফলাফল বা আর্থিক তথ্য সংরক্ষিত নেই।
            </p>
        `;
    }
}

function resetDashboard() {
    if (dashboard) dashboard.hidden = true;
    if (loginPanel) loginPanel.hidden = false;

    if (loginForm) loginForm.reset();

    showLoginMessage("");
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);

        const username = String(formData.get("username") || "").trim();
        const password = String(formData.get("password") || "");

        const user = demoUsers.find(
            (account) =>
                account.username === username &&
                account.password === password
        );

        if (!user) {
            showLoginMessage(
                "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়। ডেমো অ্যাকাউন্ট ব্যবহার করুন।"
            );
            return;
        }

        showLoginMessage("ডেমো লগইন সফল হয়েছে।", false);
        showDashboard(user);
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", resetDashboard);
}


/* =========================
   7. SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   8. BACK TO TOP BUTTON
========================= */

const backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   9. CONTACT FORM
========================= */

const contactForm = document.querySelector("#contact-form");
const contactMessage = document.querySelector("#contact-message");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        /*
          DEMO ONLY:
          This form does not email anyone or save messages.
        */

        if (contactMessage) {
            contactMessage.textContent =
                "ফর্মটি যাচাই করা হয়েছে। এটি ডেমো, তাই বার্তাটি পাঠানো হয়নি। সরাসরি মাদ্রাসায় যোগাযোগ করুন।";

            contactMessage.classList.add("success-message");
        }

        contactForm.reset();
    });
}


/* =========================
   10. REVEAL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================
   11. ACTIVE NAVIGATION LINK
========================= */

const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a[href^='#']");

if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navigationLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* =========================
   12. INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log(
        "Gazir Dargah Foizabad Fazil B.A. Madrasha website loaded successfully."
    );
});
