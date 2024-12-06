document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Insert the mobile menu toggle button
    header.insertBefore(mobileMenuToggle, nav);

    // Toggle menu visibility
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
        });
    });
});