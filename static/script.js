// Generador de luces/linternas flotantes
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('lanterns');
  if (container) {
    const lanternCount = 22;
    for (let i = 0; i < lanternCount; i++) {
      createLantern(container);
    }
  }
});

function createLantern(container) {
  const lantern = document.createElement('div');
  lantern.classList.add('lantern');

  const leftPos = Math.random() * 100;
  const duration = Math.random() * 8 + 7;
  const delay = Math.random() * 10;
  const scale = Math.random() * 0.6 + 0.6;

  lantern.style.left = `${leftPos}%`;
  lantern.style.animationDuration = `${duration}s`;
  lantern.style.animationDelay = `${delay}s`;
  lantern.style.transform = `scale(${scale})`;

  container.appendChild(lantern);
}

// Lógica para mover el botón "NO" al acercar el cursor o tocar la pantalla
function moveNoButton() {
  const noBtn = document.getElementById('noBtn');
  const group = document.getElementById('buttonsGroup');
  
  if (!noBtn || !group) return;

  const rect = group.getBoundingClientRect();
  
  const maxX = rect.width - noBtn.offsetWidth - 10;
  const maxY = 220;

  const randomX = Math.floor(Math.random() * (maxX - 10)) + 5;
  const randomY = Math.floor(Math.random() * maxY) - (maxY / 2);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Mostrar mensaje de éxito y confetti
function celebrate() {
  const questionBox = document.getElementById('questionBox');
  const celebrationBox = document.getElementById('celebrationBox');

  if (questionBox && celebrationBox) {
    questionBox.style.display = 'none';
    celebrationBox.style.display = 'block';
    startConfetti();
  }
}

// Animación de Confetti
function startConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f1c40f', '#e67e22', '#e056fd', '#2ecc71', '#3498db', '#ffffff'];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 150,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    update();
  }

  function update() {
    particles.forEach((p, i) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(0.5);
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y > canvas.height) {
        particles[i] = {
          x: Math.random() * canvas.width,
          y: -20,
          r: p.r,
          d: p.d,
          color: p.color,
          tilt: p.tilt,
          tiltAngleIncremental: p.tiltAngleIncremental,
          tiltAngle: p.tiltAngle
        };
      }
    });
  }

  setInterval(draw, 20);
}
