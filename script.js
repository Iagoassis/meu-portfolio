document.addEventListener('DOMContentLoaded', () => {
    
    // ================= 1. NAVEGAÇÃO DINÂMICA (SPA) =================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navMenu = document.getElementById('nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });

    // ================= 2. MENU MOBILE RESPONSIVO =================
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // ================= 3. TEMA CLARO/ESCURO =================
    const themeToggle = document.getElementById('theme-toggle');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('theme', newTheme);
        
        const nomeTema = newTheme === 'dark' ? 'Escuro' : 'Claro';
        showToast(`Tema ${nomeTema} ativado!`, 'info');
    });

    // ================= 4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO =================
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');
        let isValid = true;

        [nome, email, mensagem].forEach(el => el.classList.remove('error'));

        if (nome.value.trim() === '') {
            nome.classList.add('error');
            isValid = false;
        }

        if (mensagem.value.trim() === '') {
            mensagem.classList.add('error');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            showToast('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
        } else {
            showToast('Por favor, preencha todos os campos corretamente.', 'error');
        }
    });

    // ================= 5. SISTEMA DE NOTIFICAÇÕES =================
    function showToast(message, type) {
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }
});