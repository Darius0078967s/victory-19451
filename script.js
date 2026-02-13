document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true, // Анимация проигрывается только один раз
        offset: 100
    });

    // 2. Инициализация Swiper (Галерея)
    // Проверяем, есть ли слайдер на странице
    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
    }

    // 3. Анимированные счётчики
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Чем меньше, тем быстрее

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Вычисляем шаг приращения
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString(); // Форматирование с пробелами
                }
            };
            updateCount();
        });
    };

    // Запуск счётчиков только когда они видны (Intersection Observer)
    let statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // 4. Мобильная навигация (закрытие меню при клике на ссылку)
    const navLinks = document.querySelectorAll('.nav-item');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
    
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if(menuToggle.classList.contains('show')) {
               bsCollapse.toggle();
            }
        });
    });
});