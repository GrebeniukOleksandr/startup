// header menu
const heroSection = document.querySelector('.hero');
const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header_menu-logo');
const headerMenuItems = document.querySelectorAll('.header_menu-link');
const menuToggle = document.querySelector('.header_menu-toggle');
const toggleIcon = document.querySelectorAll('.header_menu-icon');
let isScrolling;

menuToggle.addEventListener('click', () => {
    header.classList.toggle('open');
});
function checkHeroSection() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if(window.scrollY > 0) {
        header.style.top = '-100px';
    } else {
        header.style.top = '0px';
    }
    if (heroBottom <= 40) {
        headerMenuItems.forEach((link) => {
            link.style.color = '#c0301c';
        });
        toggleIcon.forEach((color) => {
            color.style.backgroundColor = '#c0301c';
        })
        headerLogo.style.color = '#c0301c';
        header.style.backgroundColor = '#fff';
    } else {
        headerMenuItems.forEach((link) => {
            link.style.color = '';
        });
        toggleIcon.forEach((color) => {
            color.style.backgroundColor = '';
        })
        header.style.backgroundColor = '';
        headerLogo.style.color = '';
    }
    const sections = ['hero','service', 'about', 'work', 'blog', 'slider', 'contact'];
    let activeSectionFound = false; 
    headerMenuItems.forEach(link => link.classList.remove('active-link'));
    for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(`#${sections[i]}`);
        if (section) {
            const sectionTop = section.offsetTop - 10;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            const heroLink = document.querySelector('a.header_menu-link[href="#hero"]');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && !activeSectionFound) {
                const activeLink = document.querySelector(`a[href="#${sections[i]}"]`);
                if (activeLink && !activeLink.classList.contains('header_menu-logo')) {
                    activeLink.classList.add('active-link'); 
                    activeSectionFound = true;
                    heroLink.classList.remove('active-start');
                } else if (scrollPosition >= sectionTop && sections[i] === 'hero' && heroLink) {
                    heroLink.classList.add('active-start');
                }
            }
        }
    }
}
checkHeroSection(); 
document.addEventListener('scroll', () => {
    checkHeroSection(); 
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        header.style.top = '0';
    }, 150);
});
// hero_form
const heroForm = document.querySelector('.hero_form');
const openHeroForm = document.querySelector('.hero_content-link');
const heroFormBtn = document.querySelector('.hero_form-btn');
const btnContainer = heroFormBtn.parentElement;
const logoLink = document.querySelector('.header_menu-logo');
const nameInput = document.querySelector('#nameregistr');

let isDragging = false;
let startBtn = 0;

const startDrag = (e) => {
    isDragging = true;
    startBtn = e.clientX || e.touches[0].clientX;
    const containerWidth = btnContainer.offsetWidth;

    const moveHandler = (event) => {
        if (!isDragging) return;
        const clientX = event.clientX || event.touches[0].clientX;
        let newLeft = clientX - startBtn;
        newLeft = Math.max(0, Math.min(newLeft, containerWidth - heroFormBtn.offsetWidth));
        heroFormBtn.style.transform = `translateX(${newLeft}px)`;
        if (newLeft >= containerWidth - heroFormBtn.offsetWidth) {
            if (nameInput.value.trim() === '') {
                nameInput.focus();
                heroFormBtn.style.transform = 'translateX(0)';
                isDragging = false;
                return;
            }
            logoLink.textContent = `Hello, ${nameInput.value}`;
            heroForm.style.opacity = '0';
            heroForm.style.zIndex = '-1';
            nameInput.value = '';
        }
    };

    const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('touchend', stopDrag);
        heroFormBtn.style.transform = 'translateX(0)';
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', stopDrag);
};

heroFormBtn.addEventListener('mousedown', startDrag);
heroFormBtn.addEventListener('touchstart', startDrag);

openHeroForm.addEventListener('click', () => {
    heroForm.style.opacity = '1';
    heroForm.style.zIndex = '99';
});

document.addEventListener('click', (event) => {
    if (!heroForm.contains(event.target) && !openHeroForm.contains(event.target)) {
        heroForm.style.opacity = '0';
        heroForm.style.zIndex = '-1';
    }
});

heroFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
});

// scroll menu
const headerMenuLinks = document.querySelectorAll('.header_menu-link');
const offerLink = document.querySelector('.offer_link');
headerMenuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        header.classList.remove('open');
    });
    offerLink.addEventListener('click', (event) =>{
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    })
});

// parallax effect
const parallaxElement = document.querySelector('.hero');
function getCenterOfElement(element) {
    const rect = element.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    return { centerX: elementCenterX, centerY: elementCenterY };
}
const { centerX, centerY } = getCenterOfElement(parallaxElement);
parallaxElement.addEventListener('mousemove', function(event) {
    const rect = parallaxElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        const percentX = Math.round((mouseX / rect.width) * 100);
        const percentY = Math.round((mouseY / rect.height) * 100);
        parallaxElement.style.backgroundPosition = `${percentX}% ${percentY}%`;
    }
});
parallaxElement.addEventListener('mouseleave', function() {
    parallaxElement.style.backgroundPosition = `50% 50%`;
});

// chit_click
let chit_click = 0;
const chitClickElement = document.querySelector('.chit_click');
const serviceSubTitle = document.querySelectorAll('.service_item-subtitle');

function handleClick(event) {
    event.preventDefault();
    chit_click++;
    
    if (chit_click === 3) {
        serviceSubTitle.forEach(function(text){
            text.style.color = 'red'; 
            text.style.fontWeight = 'bold';
        });
    }
}
if ('ontouchstart' in window) {
    chitClickElement.addEventListener('touchstart', handleClick);
} else {
    chitClickElement.addEventListener('click', handleClick);
}

// slider
const items = document.querySelectorAll('.about_slider-item');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const sliderScroll = document.querySelector('.about_slider');
let currentIndex = 0;
let startX;
function getVisibleSlides() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
        return 4;
    } else if (screenWidth > 880) {
        return 3; 
    } else if (screenWidth > 585) {
        return 2;
    } else {
        return 1; 
    }
}
function updateSlider() {
    const visibleSlides = getVisibleSlides();
    
    items.forEach((item, i) => {
        const order = (i - currentIndex + items.length) % items.length;
        item.style.order = order;

        if (order < visibleSlides) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlider();
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateSlider();
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
window.addEventListener('resize', updateSlider); 
updateSlider();
sliderScroll.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});
sliderScroll.addEventListener('touchend', (event) => {
    const currentX = event.changedTouches[0].clientX; 
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 20) { 
        if (diffX > 0) {
            nextSlide(); 
        } else {
            prevSlide(); 
        }
    }
    startX = null; 
});

// filter
const buttons = document.querySelectorAll('.work_btn button');
const workItems = document.querySelectorAll('.work_item');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        localStorage.setItem('selectedFilter', filter);
        workItems.forEach(item => {
            if (item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
window.addEventListener('load', () => {
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedFilter) {
        const activeButton = document.querySelector(`button[data-filter="${savedFilter}"]`);
        if (activeButton) {
            buttons.forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        }
        workItems.forEach(item => {
            if (item.classList.contains(savedFilter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        workItems.forEach(item => {
            item.style.display = 'block';
        });
    }
});

// parallax offer
const parallaxOfferElement = document.querySelector('.offer');
function getCenterOfElement(element) {
    const rect = element.getBoundingClientRect();
    const elementOfferCenterX = rect.left + rect.width / 2;
    const elementOfferCenterY = rect.top + rect.height / 2;
    return { centerOfferX: elementOfferCenterX, centerOfferY: elementOfferCenterY };
}
parallaxOfferElement.addEventListener('mousemove', function(event) {
    const rect = parallaxOfferElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        const percentOfferX = Math.round((mouseX / rect.width) * 100);
        const percentOfferY = Math.round((mouseY / rect.height) * 100);
        parallaxOfferElement.style.backgroundPosition = `${percentOfferX}% ${percentOfferY}%`;
    }
});
parallaxOfferElement.addEventListener('mouseleave', function() {
    parallaxOfferElement.style.backgroundPosition = `50% 50%`;
});

// read more
const readMoreButtons = document.querySelectorAll('.blog_post-more');
const articles = document.querySelectorAll('.blog_post-article');
readMoreButtons.forEach((button,i) => {
    button.addEventListener('click', function() {
        const article = this.previousElementSibling; 
        if (article.style.maxHeight === '500px') {
            article.style.maxHeight = '67px';
            this.textContent = 'read more';
        } else {
            article.style.maxHeight = '500px';
            this.textContent = 'hidden text';
        }
        if (i === 0 ) {
            this.style.color = '#c0301c';
        }
    });
});

// banner marquee 
if(window.innerWidth < 960){
    const bannerMarquee = document.querySelector('.slider_banner-content');
    const spanElement = document.querySelector('.slider_banner-content span');
    const cloneSpan = spanElement.cloneNode(true);
    bannerMarquee.appendChild(cloneSpan);
}

// slider quote
const quotes = document.querySelectorAll('.slider_quote');
const dots = document.querySelectorAll('.slider_quotes-dot');
let currentQuote = 0;
let autoSliderInterval;
function showQuote(index) {
    quotes.forEach((quote, i) => {
        quote.classList.toggle('show', i === index);
        dots[i].classList.toggle('show', i === index );
    })
    currentQuote = index;
}
function nextQuote() {
    showQuote((currentQuote + 1) % quotes.length);
}
function startAutoSlide() {
    autoSlideInterval = setInterval(nextQuote, 3000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
startAutoSlide();
document.getElementById('slider_quotes').addEventListener('mouseover', stopAutoSlide);
document.getElementById('slider_quotes').addEventListener('mouseout', startAutoSlide);
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        showQuote(parseInt(e.target.getAttribute('data-index')));
    });
});

// show/hidden block slider
const service = document.querySelector('.service');
const about = document.querySelector('.about');
const work = document.querySelector('.work');
const slider = document.querySelector('.slider');
const blog = document.querySelector('.blog');
const contact = document.querySelector('.contact');

const observerOptions = window.innerWidth > 960 ? { threshold: 0.1 } : { threshold: 0.01 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-content');
        }
    });
}, observerOptions);

observer.observe(service);
observer.observe(about);
observer.observe(work);
observer.observe(slider);
observer.observe(blog);
observer.observe(contact);


// form save
const form = document.getElementById('form');
const send = document.getElementById('send');
const reject = document.getElementById('popup_reject');
const popap = document.getElementById('popup');
const accent = document.getElementById('popup_accept');
const popupName = document.getElementById('popup_name');
const popupEmail = document.getElementById('popup_email');
const popupSubject = document.getElementById('popup_subject');
const popupCompany = document.getElementById('popup_company');
const popupMessage = document.getElementById('popup_message');

// Функція для валідації форми
function focusFirstEmptyField() {
    const fields = ['name', 'email', 'subject', 'company', 'message'];

    for (const field of fields) {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.focus();
            return false;
        }
    }
    return true;
}

send.addEventListener('click', function (event) {
    event.preventDefault();
    if (!focusFirstEmptyField()) {
        return;
    }
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;
    popupName.textContent = name;
    popupEmail.textContent = email;
    popupSubject.textContent = subject;
    popupCompany.textContent = company;
    popupMessage.textContent = message;
    popap.style.display = 'block';
});

accent.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('subject', subject);
    localStorage.setItem('company', company);
    localStorage.setItem('message', message);
    popap.style.display = 'none';
});

reject.addEventListener('click', function (event) {
    event.preventDefault();
    popap.style.display = 'none';
});
document.addEventListener('click', function (event) {
    if (popap.style.display === 'block') {
        if (!popap.contains(event.target) && event.target !== send) {
            popap.style.display = 'none';
        }
    }
});
window.addEventListener('load', function () {
    if (localStorage.getItem('name')) {
        document.getElementById('name').value = localStorage.getItem('name');
        document.getElementById('email').value = localStorage.getItem('email');
        document.getElementById('subject').value = localStorage.getItem('subject');
        document.getElementById('company').value = localStorage.getItem('company');
        document.getElementById('message').value = localStorage.getItem('message');
    }
});
