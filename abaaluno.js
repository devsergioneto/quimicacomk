/* aluno02.js */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentSections = document.querySelectorAll('.content');

    function showContent(pageId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetContent = document.getElementById(`${pageId}-content`);
        const targetLink = document.querySelector(`.main-nav a[data-page="${pageId}"]`);

        if (targetContent) {
            targetContent.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showContent(pageId);
        });
    });

    // Define a página inicial ativa
    const initialPage = 'dashboard';
    showContent(initialPage);
});