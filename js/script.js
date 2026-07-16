// ---------- Destellos en el fondo ----------
const sky = document.getElementById('sky');
const GLINT_COUNT = 40;

for (let i = 0; i < GLINT_COUNT; i++) {
  const glint = document.createElement('span');
  glint.className = 'glint';
  glint.style.top = Math.random() * 100 + '%';
  glint.style.left = Math.random() * 100 + '%';
  glint.style.animationDelay = (Math.random() * 4) + 's';
  glint.style.animationDuration = (2.5 + Math.random() * 3) + 's';
  sky.appendChild(glint);
}

// ---------- Música de fondo ----------
// Nota: los navegadores bloquean el autoplay con sonido, por eso
// necesitamos que el invitado presione el botón para iniciar.
const audio = document.getElementById('bgAudio');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

musicToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {
      // Si no hay archivo de audio cargado todavía, no truena la página
      console.warn('Agrega tu canción en assets/audio/theme.mp3');
    });
    musicIcon.textContent = '❚❚';
    musicToggle.classList.add('playing');
  } else {
    audio.pause();
    musicIcon.textContent = '♪';
    musicToggle.classList.remove('playing');
  }
});

// ---------- Personalizar nombre del pasajero ----------
const guestNameInput = document.getElementById('guestName');
const stubNumber = document.querySelector('.stub-number');

guestNameInput.addEventListener('input', () => {
  const raw = guestNameInput.value.trim();
  if (raw.length > 0) {
    // Genera un "número de vuelo" a partir de las iniciales, solo por diversión
    const initials = raw
      .split(' ')
      .filter(Boolean)
      .map(w => w[0].toUpperCase())
      .join('')
      .slice(0, 2) || 'MX';
    stubNumber.textContent = `${initials}-021-${String(raw.length).padStart(2, '0')}05`;
  } else {
    stubNumber.textContent = 'MX-021-1105';
  }
});

// ---------- Link de playlist ----------
// IMPORTANTE: reemplaza este link cuando tengas tu playlist colaborativa de Spotify
const PLAYLIST_URL = 'https://open.spotify.com/playlist/3nkMDehs4MQCsOMXbQuqbr?si=AFgCan4BQ3Sc1y7swNrvZw&utm_source=copy-link&pt=fdb57159393f1bd26dc25a20e909cc14&pi=CH1GmO2AQtuBB';
document.getElementById('playlistLink').setAttribute('href', PLAYLIST_URL);