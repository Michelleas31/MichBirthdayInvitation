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
  document.getElementById('nameWarning').hidden = true;
});

// ---------- Link de playlist ----------
// IMPORTANTE: reemplaza este link cuando tengas tu playlist colaborativa de Spotify
const PLAYLIST_URL = 'https://open.spotify.com/playlist/3nkMDehs4MQCsOMXbQuqbr?si=AFgCan4BQ3Sc1y7swNrvZw&utm_source=copy-link&pt=fdb57159393f1bd26dc25a20e909cc14&pi=CH1GmO2AQtuBB';
document.getElementById('playlistLink').setAttribute('href', PLAYLIST_URL);

// =====================================================================
// RSVP: confirmar / declinar + registro en Google Sheets
// =====================================================================

// IMPORTANTE: reemplaza esto con la URL de tu Google Apps Script Web App
// (instrucciones completas en el README, sección "Configurar el control de invitados")
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx9xjWRawADDLLJx33PnAn8jzKy6sgFm5qTQryNksU7Nz9RjT0HqMMZ3Bsx-9ijjQRL_w/exec';

const ticketEl = document.getElementById('ticket');
const rsvpBlock = document.getElementById('rsvpBlock');
const confirmedTag = document.getElementById('confirmedTag');
const declinedTag = document.getElementById('declinedTag');
const nameWarning = document.getElementById('nameWarning');

const btnConfirm = document.getElementById('btnConfirm');
const btnDecline = document.getElementById('btnDecline');

const modalOverlay = document.getElementById('modalOverlay');
const modalText = document.getElementById('modalText');
const modalPrimaryBtn = document.getElementById('modalPrimaryBtn');
const modalSecondaryBtn = document.getElementById('modalSecondaryBtn');

const videoOverlay = document.getElementById('videoOverlay');
const confirmVideo = document.getElementById('confirmVideo');
const videoSkipBtn = document.getElementById('videoSkipBtn');

// Evita que un invitado envíe el RSVP dos veces por accidente.
let rsvpLocked = false;

function getGuestName() {
  return guestNameInput.value.trim();
}

function requireName() {
  const name = getGuestName();
  if (!name) {
    nameWarning.hidden = false;
    guestNameInput.focus();
    return null;
  }
  return name;
}

// Envía el registro a la hoja de Google Sheets.
// Usamos mode "no-cors" a propósito: Google Apps Script no siempre
// responde con headers CORS, y aquí no necesitamos leer la respuesta,
// solo que el dato llegue y se guarde.
async function submitRSVP(name, status) {
  if (SHEET_URL.includes('PEGA_AQUI')) {
    console.warn('Configura SHEET_URL en script.js para guardar las respuestas en tu hoja.');
    return;
  }
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ name, status, timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.warn('No se pudo registrar en la hoja de invitados:', err);
  }
}

// ---------- Flujo: confirmar asistencia ----------
btnConfirm.addEventListener('click', () => {
  if (rsvpLocked) return;
  const name = requireName();
  if (!name) return;

  rsvpLocked = true;
  btnConfirm.disabled = true;
  btnDecline.disabled = true;
  guestNameInput.disabled = true;

  submitRSVP(name, 'confirmado');
  playConfirmVideo();
});

function playConfirmVideo() {
  videoOverlay.hidden = false;
  confirmVideo.currentTime = 0;
  confirmVideo.play().catch(() => {
    console.warn('Agrega tu video en assets/video/confirm.mp4');
  });
}

function finishConfirmVideo() {
  videoOverlay.hidden = true;
  confirmVideo.pause();
  showPrintedTicket();
}

confirmVideo.addEventListener('ended', finishConfirmVideo);
videoSkipBtn.addEventListener('click', finishConfirmVideo);

function showPrintedTicket() {
  rsvpBlock.hidden = true;
  confirmedTag.hidden = false;
  ticketEl.classList.add('is-printed');
  ticketEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---------- Flujo: no podré ir (2 pasos de confirmación) ----------
let declineStep = 0;

btnDecline.addEventListener('click', () => {
  if (rsvpLocked) return;
  const name = requireName();
  if (!name) return;

  declineStep = 1;
  openModal('¿Estás segura y consciente de que quedarás en mi lista negra por siempre?');
});

function openModal(text) {
  modalText.textContent = text;
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
  declineStep = 0;
}

modalPrimaryBtn.addEventListener('click', () => {
  if (declineStep === 1) {
    declineStep = 2;
    openModal('Serás mi enemigo mortal 💀');
  } else if (declineStep === 2) {
    rsvpLocked = true;
    btnConfirm.disabled = true;
    btnDecline.disabled = true;
    guestNameInput.disabled = true;

    submitRSVP(getGuestName(), 'no asistirá');

    closeModal();
    rsvpBlock.hidden = true;
    declinedTag.hidden = false;
  }
});

modalSecondaryBtn.addEventListener('click', closeModal);