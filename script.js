// Countdown

const newYear = new Date("Jan 1, 2026 00:00:00").getTime();

const countdown = setInterval(() => {

    const now = new Date().getTime();
    const distance = newYear - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60))
        / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60))
        / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdown);

        document.getElementById("countdown").innerHTML =
            "<h2>🎆 CHÚC MỪNG NĂM MỚI 🎆</h2>";
    }

}, 1000);


// Button message

const btn = document.getElementById("celebrateBtn");
const message = document.getElementById("message");

btn.addEventListener("click", () => {

    const wishes = [
        "🌟 Chúc bạn năm mới vui vẻ!",
        "💖 Vạn sự như ý!",
        "🎉 Học giỏi - Thành công!",
        "🔥 Code không bug!",
        "🍀 May mắn cả năm!"
    ];

    const random =
        wishes[Math.floor(Math.random() * wishes.length)];

    message.innerHTML = random;
});


// Fireworks

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;

        this.size = Math.random() * 4 + 1;
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw() {
        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();
    }
}

function createFirework(x, y) {

    const colors = [
        "#ff0000",
        "#ffff00",
        "#00ff00",
        "#00ffff",
        "#ff00ff",
        "#ffffff"
    ];

    for (let i = 0; i < 80; i++) {

        particles.push(
            new Particle(
                x,
                y,
                colors[Math.floor(Math.random() * colors.length)]
            )
        );
    }
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {

        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

setInterval(() => {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    createFirework(x, y);

}, 700);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});