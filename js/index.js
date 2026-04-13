/* =============================================
   js/index.js — Birthday Page Logic
   Developed by GrabCharles
   ============================================= */

// ─── CONFIG ──────────────────────────────────
// Add as many video paths as you receive!
// The candles will auto-adjust to match this array.
const GREETING_VIDEOS = [
    'css/videos/default.mp4',
    'css/videos/default.mp4',
    'css/videos/default.mp4',
    'css/videos/default.mp4',
    'css/videos/default.mp4',
];

// Candle colors (cycles if more candles than colors)
const CANDLE_COLORS = [
    'linear-gradient(to bottom, #ff85a1, #d4547a)',
    'linear-gradient(to bottom, #b39ddb, #7e57c2)',
    'linear-gradient(to bottom, #80deea, #00acc1)',
    'linear-gradient(to bottom, #fff176, #f9a825)',
    'linear-gradient(to bottom, #a5d6a7, #388e3c)',
    'linear-gradient(to bottom, #ffcc80, #fb8c00)',
];
// ─────────────────────────────────────────────

const bgMusic = document.getElementById('bgMusic');
const giftBox = document.getElementById('giftBox');
const landingPage = document.getElementById('landingPage');
const birthdayPage = document.getElementById('birthdayPage');
const candlesRow = document.getElementById('candlesRow');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');

// ─── GIFT BOX CLICK ──────────────────────────
giftBox.addEventListener('click', () => {
    bgMusic.play().catch(() => { });
    giftBox.style.animation = 'none';
    giftBox.style.transform = 'scale(1.15)';

    setTimeout(() => {
        landingPage.style.transition = 'opacity 0.8s ease';
        landingPage.style.opacity = '0';
        setTimeout(() => {
            landingPage.classList.add('hidden');
            birthdayPage.classList.remove('hidden');
            birthdayPage.style.opacity = '0';
            birthdayPage.style.transition = 'opacity 0.8s ease';
            requestAnimationFrame(() => {
                birthdayPage.style.opacity = '1';
            });
            buildCake();
            spawnPetals();
            spawnSparkles();
        }, 800);
    }, 300);
});

// ─── BUILD CAKE CANDLES ──────────────────────
function buildCake() {
    candlesRow.innerHTML = '';
    GREETING_VIDEOS.forEach((videoSrc, index) => {
        const color = CANDLE_COLORS[index % CANDLE_COLORS.length];
        const wrap = document.createElement('div');
        wrap.className = 'candle-wrap';
        wrap.title = `Message #${index + 1}`;
        wrap.innerHTML = `
            <div class="flame" id="flame-${index}"></div>
            <div class="candle-wick"></div>
            <div class="candle-body" style="background: ${color}"></div>
        `;
        wrap.addEventListener('click', () => openVideo(videoSrc, index));
        candlesRow.appendChild(wrap);
    });
}

// ─── OPEN VIDEO MODAL ────────────────────────
function openVideo(src, index) {
    // Briefly blow out the candle
    const flame = document.getElementById(`flame-${index}`);
    if (flame) {
        flame.classList.add('out');
        setTimeout(() => flame.classList.remove('out'), 3000);
    }

    // Pause background music while video plays
    bgMusic.pause();

    modalVideo.src = src;
    modalVideo.load();
    videoModal.classList.remove('hidden');
    modalVideo.play().catch(() => { });
}

// ─── CLOSE MODAL ─────────────────────────────
function closeModal() {
    modalVideo.pause();
    modalVideo.src = '';
    videoModal.classList.add('hidden');

    // Resume background music
    bgMusic.play().catch(() => { });
}

modalClose.addEventListener('click', closeModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ─── FALLING PETALS ──────────────────────────
function spawnPetals() {
    const container = document.getElementById('petals');
    const petals = ['🌸', '🌺', '🌷', '💮', '🩷', '🌼'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.textContent = petals[Math.floor(Math.random() * petals.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (5 + Math.random() * 7) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        container.appendChild(p);
    }
}

// ─── SPARKLES ────────────────────────────────
function spawnSparkles() {
    const container = document.getElementById('sparkles');
    const sparks = ['✨', '⭐', '💫', '🌟', '💥'];
    for (let i = 0; i < 12; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.textContent = sparks[Math.floor(Math.random() * sparks.length)];
        s.style.left = Math.random() * 95 + '%';
        s.style.top = Math.random() * 95 + '%';
        s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        s.style.animationDelay = (Math.random() * 3) + 's';
        s.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
        container.appendChild(s);
    }
}