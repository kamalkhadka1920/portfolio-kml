// Navbar background on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// Typing animation
const roles = ["Software Engineer", "Web Developer", "Programmer"];
let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let deleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        currentText = currentRole.substring(0, charIndex + 1);
        charIndex++;
    } else {
        currentText = currentRole.substring(0, charIndex - 1);
        charIndex--;
    }

    typingElement.textContent = currentText;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeEffect, 1400);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, deleting ? 90 : 180);
}

typeEffect();

// Send data to backend
function sendData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return;
    }

    fetch("https://portfolio-kml.onrender.com/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
        .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            alert("Message Sent Successfully 🚀");
            document.getElementById("contactForm").reset();
        })
        .catch((error) => {
            alert("Error sending message ❌");
            console.error(error);
        });
}

// Mobile menu toggle
function toggleMenu(button) {
    const menu = document.querySelector(".nav-links");
    if (!menu || !button) return;

    menu.classList.toggle("active");
    button.classList.toggle("active");
}

function closeMenu() {
    const menu = document.querySelector(".nav-links");
    const button = document.querySelector(".menu-toggle");

    if (menu) menu.classList.remove("active");
    if (button) button.classList.remove("active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
    const menu = document.querySelector(".nav-links");
    const button = document.querySelector(".menu-toggle");

    if (!menu || !button) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedButton = button.contains(e.target);

    if (!clickedInsideMenu && !clickedButton) {
        menu.classList.remove("active");
        button.classList.remove("active");
    }
});