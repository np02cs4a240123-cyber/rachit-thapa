// -------------------------
// Skill Bar Animation
// -------------------------
const skillBars = document.querySelectorAll('.skill-bar span');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
};

window.addEventListener('load', animateSkills);


// -------------------------
// Contact Form Validation & Local Storage
// -------------------------
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Validation
    if (name.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        successMessage.style.color = "red";
        successMessage.textContent = "Please fill out all fields!";
        successMessage.style.display = "block";
        return;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
        successMessage.style.color = "red";
        successMessage.textContent = "Enter a valid email!";
        successMessage.style.display = "block";
        return;
    }

    // Save data to localStorage
    saveFormData();

    // Success message
    successMessage.style.color = "var(--yellow)";
    successMessage.textContent = "Thank you! Your message has been sent.";
    successMessage.style.display = "block";

    // Reset form fields
    name.value = "";
    email.value = "";
    message.value = "";

    // Update saved data display
    showSavedData();
});

// Save form data to localStorage
const saveFormData = () => {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    localStorage.setItem('contactForm', JSON.stringify(formData));
};

// Optional console output
console.log("Saved form data:", localStorage.getItem("contactForm"));


// -------------------------
// LOAD SAVED FORM DATA ON PAGE LOAD
// -------------------------
window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("contactForm"));
    if (saved) {
        document.getElementById("name").value = saved.name;
        document.getElementById("email").value = saved.email;
        document.getElementById("message").value = saved.message;
    }

    // Display saved data on load
    showSavedData();
});


// -------------------------
// DISPLAY SAVED FORM DATA BELOW THE FORM
// -------------------------
function showSavedData() {
    const saved = JSON.parse(localStorage.getItem("contactForm"));
    const box = document.getElementById("savedDataDisplay");

    if (!box) return; // in case the element doesn't exist

    if (!saved) {
        box.innerHTML = "<p>No saved messages yet.</p>";
        return;
    }

    box.innerHTML = `
        <h3>Last Submitted Message:</h3>
        <p><strong>Name:</strong> ${saved.name}</p>
        <p><strong>Email:</strong> ${saved.email}</p>
        <p><strong>Message:</strong> ${saved.message}</p>
    `;
}



// -------------------------
// Make Entire Project Card Clickable
// -------------------------
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.querySelector('.project-link').getAttribute('href');
        window.open(link, "_blank");
    });
});


// -------------------------
// IMAGE SLIDER
// -------------------------
let index = 0;

const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;

document.getElementById('nextBtn').addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    slides.style.transform = `translateX(-${index * 30}%)`;
});

document.getElementById('prevBtn').addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${index * 30}%)`;
});


// -------------------------
// CANVAS DRAWING
// -------------------------
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FFC300"; // yellow

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

// Clear Canvas Button
document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


// -------------------------
// DARK / LIGHT MODE TOGGLE
// -------------------------
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    themeToggle.textContent = "⚫";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
        themeToggle.textContent = "⚫"; // sun icon
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "⚪"; // moon icon
        localStorage.setItem("theme", "light");
    }
});


// -------------------------
// BACK TO TOP BUTTON
// -------------------------
const backToTop = document.getElementById("backToTop");

// Show button when scrolling
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Smooth scroll to top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
