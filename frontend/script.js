// Navbar background on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Send data to backend
function sendData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

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
    .then(async response => {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to send message");
        }

        alert("Message Sent SUCCESSFULLY ");
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        alert("Error sending message ");
        console.error(error);
    });
}