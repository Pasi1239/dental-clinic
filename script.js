// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show specific slide
    function showSlide(n) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        currentSlide = (n + testimonials.length) % testimonials.length;
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Initialize slider
    if (testimonials.length > 0) {
        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Next button event
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // Previous button event
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Appointment form submission
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const date = this.querySelector('input[type="date"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !phone || !service || !date) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you, ' + name + '! Your appointment request has been submitted. We will contact you shortly to confirm.');
            
            // In a real implementation, you would use:
            // fetch('your-server-endpoint', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({name, email, phone, service, date, message})
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Appointment booked successfully!');
            //     bookingForm.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('There was an error submitting your request. Please try again.');
            // });
        });
    }
    
    // Set minimum date for appointment to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialize active nav link on page load
    setActiveNavLink();
    
    // Add loading animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature, .doctor-image, .gallery-item').forEach(el => {
        observer.observe(el);
    });
    
    // Gallery lightbox functionality (basic)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Clinic Image">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // Add CSS for lightbox
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .lightbox-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            line-height: 1;
        }
    `;
    document.head.appendChild(lightboxStyle);
    
    // Form input validation styles
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Current year in footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Additional utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Basic phone validation - adjust for your country
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}