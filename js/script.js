// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const header = document.querySelector('.header');
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.menu li a');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const sections = document.querySelectorAll('section');

    // Toggle menu on mobile
    menuBtn.addEventListener('click', function() {
        navigation.classList.toggle('active');
        menuBtn.classList.toggle('active');
        if (menuBtn.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navigation.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        header.classList.toggle('sticky', window.scrollY > 0);
        scrollToTopBtn.classList.toggle('active', window.scrollY > 500);
        
        // Active menu item based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to top button
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Animation for skill bars
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-per');
    
    function showSkills() {
        skillBars.forEach(skill => {
            skill.style.width = skill.dataset.width;
        });
    }
    
    function resetSkills() {
        skillBars.forEach(skill => {
            skill.style.width = 0;
        });
    }
    
    // Initialize skill bars animation
    let skillsAnimated = false;
    
    window.addEventListener('scroll', function() {
        const skillSectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        
        if (skillSectionPos < screenPos) {
            if (!skillsAnimated) {
                showSkills();
                skillsAnimated = true;
            }
        } else {
            resetSkills();
            skillsAnimated = false;
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Simple form validation
        if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Update the form action to your formspree endpoint
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        
        // Send the form data using fetch API to a form handling service
        fetch('https://formspree.io/f/mnnzkpzz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Your message has been sent successfully!');
                this.reset();
            } else {
                alert('Oops! There was a problem sending your message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem sending your message.');
        });
    });

    // Typing animation for home section
    const typingElement = document.querySelector('.home-content h3');
    const textToType = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(function() {
        if (i < textToType.length) {
            typingElement.textContent += textToType.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);

    // Project hover effect
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.overlay').style.opacity = '1';
        });
        
        box.addEventListener('mouseleave', function() {
            this.querySelector('.overlay').style.opacity = '0';
        });
    });
});