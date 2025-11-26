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

    // Save data
    saveFormData();

    successMessage.style.color = "var(--yellow)";
    successMessage.textContent = "Thank you! Your message has been sent.";
    successMessage.style.display = "block";

    // Reset form fields
    name.value = "";
    email.value = "";
    message.value = "";
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

// Show saved form data in console (optional)
console.log("Saved form data:", localStorage.getItem("contactForm"));


// -------------------------
// Make Entire Project Card Clickable
// -------------------------
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.querySelector('.project-link').getAttribute('href');
        window.open(link, "_blank");
    });
});
