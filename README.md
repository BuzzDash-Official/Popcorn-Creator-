<script>
// --- CONFIGURATION DE TES CHAÎNES ---
const API_KEY = 'TA_CLE_GOOGLE_CLOUD_ICI'; // Remplace par ta vraie clé

const CONFIG = {
  science: { id: 'UCaNlbnghtwlsGF-KzAFThqA', label: 'Science (Dr Nozman)', icon: '🔬' },
  trailers: { id: 'UC_i8X3p8oZNaik8X513Zn1Q', label: 'Bandes-Annonces FR', icon: '🎬' },
  docs: { id: 'UCwI-JbGNsojunnHbFAc0M4Q', label: 'Documentaires ARTE', icon: '🌍' }
};

// --- LE MOTEUR DE MISE À JOUR ---
async function fetchSmartUpdates(category) {
  const settings = CONFIG[category];
  const today = new Date().toDateString();
  
  // 1. Vérifier si on a déjà mis à jour aujourd'hui
  const cachedData = localStorage.getItem(`popcorn_${category}`);
  const cachedDate = localStorage.getItem(`popcorn_date_${category}`);

  if (cachedData && cachedDate === today) {
    console.log(`[${category}] Utilisation du stock local du jour.`);
    return JSON.parse(cachedData);
  }

  // 2. Sinon, on utilise la clé Google Cloud pour synchroniser
  console.log(`[${category}] Nouvelle synchronisation avec YouTube...`);
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${settings.id}&part=snippet,id&order=date&maxResults=10&type=video`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.items && data.items.length > 0) {
      // On enregistre les 10 dernières vidéos et la date
      localStorage.setItem(`popcorn_${category}`, JSON.stringify(data.items));
      localStorage.setItem(`popcorn_date_${category}`, today);
      return data.items;
    }
  } catch (e) {
    console.error("Quota épuisé ou erreur réseau. Mode secours activé.");
    return cachedData ? JSON.parse(cachedData) : null;
  }
}

// --- AFFICHAGE DYNAMIQUE ---
async function loadCategory(category) {
  const grid = document.getElementById('grid');
  const heroZone = document.getElementById('hero-zone');
  const settings = CONFIG[category];

  document.getElementById('sec-title').textContent = settings.label.toUpperCase();
  heroZone.innerHTML = '';
  grid.innerHTML = `<div class="loader-wrap"><div class="spinner"></div><p>Mise à jour du projecteur...</p></div>`;

  const videos = await fetchSmartUpdates(category);

  if (!videos) {
    grid.innerHTML = "<p class='err-box'>Impossible de charger les vidéos. Vérifie ta clé API.</p>";
    return;
  }

  grid.innerHTML = "";
  
  // La vidéo la plus récente (index 0) va dans le grand écran HERO
  const topVid = videos[0];
  const topId = topVid.id.videoId;
  renderHero(topId, topVid.snippet.title, settings.icon);

  // Les 9 suivantes vont dans la grille
  videos.slice(1).forEach(v => {
    const id = v.id.videoId;
    const title = v.snippet.title;
    grid.innerHTML += `
      <div class="vcard" onclick="openPlayer('${id}','${title.replace(/'/g," ")}')">
        <div class="thumb-box">
          <img class="vthumb" src="https://img.youtube.com/vi/${id}/mqdefault.jpg">
          <div class="voverlay"><div class="play-circle"></div></div>
        </div>
        <div class="vbody"><div class="vtitle">${title}</div></div>
      </div>`;
  });
}

function renderHero(id, title, icon) {
  document.getElementById('hero-zone').innerHTML = `
    <div class="hero" onclick="openPlayer('${id}','${title.replace(/'/g," ")}')">
      <img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" onerror="this.src='https://img.youtube.com/vi/${id}/hqdefault.jpg'">
      <div class="hero-grad"></div>
      <div class="hero-info">
        <span class="hero-badge">${icon} DERNIÈRE SORTIE</span>
        <div class="hero-title">${title}</div>
        <button class="hero-play">▶ Regarder l'exclusivité</button>
      </div>
    </div>`;
}

// --- INITIALISATION ---
function displayManual() {
  // Par défaut au démarrage, on charge les "À LA UNE" ou la Science
  loadCategory('science');
}

// Gestion des clics menu (ajoute ces onclick dans ton HTML)
// onclick="activateNav(this); loadCategory('science')"
// onclick="activateNav(this); loadCategory('trailers')"
// onclick="activateNav(this); loadCategory('docs')"

setTimeout(displayManual, 5500); // Lancement après l'intro

function openPlayer(id, title) {
  document.getElementById('player').src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  document.getElementById('modal-ttl').textContent = title;
  document.getElementById('modal').classList.add('open');
}
</script>
