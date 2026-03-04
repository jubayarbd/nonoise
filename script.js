// script.js



document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Default to Dark Theme since it's the requested primary vibe
    let isDark = true;

    // Check local storage for user's preference
    if (localStorage.getItem('theme') === 'light') {
        isDark = false;
    }

    // Apply initial theme
    applyTheme(isDark);

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateNavbar(); // Refresh navbar appearance based on new theme
    });

    function applyTheme(dark) {
        if (dark) {
            document.documentElement.classList.add('dark');
            themeIcon.classList.remove('fa-moon', 'text-indigo-600');
            themeIcon.classList.add('fa-sun', 'text-amber-400');
        } else {
            document.documentElement.classList.remove('dark');
            themeIcon.classList.remove('fa-sun', 'text-amber-400');
            themeIcon.classList.add('fa-moon', 'text-indigo-600');
        }
    }

    // 2. Navbar effects on scroll
    const navbar = document.getElementById('navbar');

    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.remove('glass-panel');
            if (document.documentElement.classList.contains('dark')) {
                navbar.classList.add('nav-scrolled-dark');
                navbar.classList.remove('nav-scrolled-light');
            } else {
                navbar.classList.add('nav-scrolled-light');
                navbar.classList.remove('nav-scrolled-dark');
            }
        } else {
            navbar.classList.remove('nav-scrolled-dark', 'nav-scrolled-light');
            navbar.classList.add('glass-panel');
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
