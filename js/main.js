// Main application logic

document.addEventListener('DOMContentLoaded', () => {
    // Clean up old data first
    playLimitManager.cleanupOldData();
    
    // Initialize language
    initializeLanguage();
    
    // Update play limit indicators
    playLimitManager.updateModeIndicators();
    
    // Initialize first game (classic mode)
    switchMode('classic');
    
    // Set up mode switching
    setupModeButtons();
    
    // Update daily progress on load
    updateDailyProgressOnLoad();
    
    // Update cooldown indicators every minute
    setInterval(() => {
        playLimitManager.updateModeIndicators();
    }, 60000); // Update every minute
});

// Language Management
function initializeLanguage() {
    const langSelect = document.getElementById('languageSelect');
    const savedLang = getCurrentLanguage();
    
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            
            // Reinitialize current game to update UI
            if (currentGame) {
                const mode = currentGame.mode;
                switchMode(mode);
            }
            
            // Update indicators with new language
            playLimitManager.updateModeIndicators();
            
            // Update about modal content
            updateAboutModalContent();
        });
    }
    
    updatePageLanguage();
    updateAboutModalContent();
}

// Update About Modal Content
function updateAboutModalContent() {
    const aboutList = document.querySelector('.about-list');
    if (!aboutList) return;
    
    const lang = getCurrentLanguage();
    const trans = translations[lang];
    
    aboutList.innerHTML = `
        <li><strong>${trans.mode.classic}:</strong> ${trans.about.classicDesc}</li>
        <li><strong>${trans.mode.pixel}:</strong> ${trans.about.pixelDesc}</li>
        <li><strong>${trans.mode.emoji}:</strong> ${trans.about.emojiDesc}</li>
        <li><strong>${trans.mode.description}:</strong> ${trans.about.descriptionDesc}</li>
    `;
}

// Mode Management
function setupModeButtons() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        item.addEventListener('click', () => {
            const mode = item.getAttribute('data-mode');
            
            // Check if mode is locked
            if (!playLimitManager.canPlayMode(mode)) {
                playLimitManager.showCooldownMessage(mode);
                return;
            }
            
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
    // Check if mode is available
    if (!playLimitManager.canPlayMode(mode)) {
        playLimitManager.showCooldownMessage(mode);
        return;
    }
    
    // Update progress item states
    document.querySelectorAll('.progress-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-mode') === mode) {
            item.classList.add('active');
        }
    });
    
    // Hide all game modes
    document.querySelectorAll('.game-mode').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected mode
    const selectedMode = document.getElementById(`${mode}-mode`);
    if (selectedMode) {
        selectedMode.classList.add('active');
    }
    
    // Initialize game for this mode
    currentGame = new BrawlStarsGame(mode);
    
    // Initialize search for this mode
    initializeSearch(mode);
}

// Update daily progress on page load
function updateDailyProgressOnLoad() {
    const modes = ['classic', 'pixel', 'emoji', 'description'];
    
    modes.forEach(mode => {
        const key = `brawlstars_${mode}_${new Date().toISOString().split('T')[0]}`;
        const saved = localStorage.getItem(key);
        const item = document.querySelector(`.progress-item[data-mode="${mode}"]`);
        
        if (saved && item) {
            const state = JSON.parse(saved);
            if (state.won) {
                item.classList.add('completed');
            }
        }
    });
}

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('cooldown-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    if (modal && modalTitle && modalText) {
        modalTitle.textContent = title;
        modalText.textContent = message;
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('cooldown-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Setup modal close handlers on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cooldown-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ============================================================
// Error-Tracking — sendet Browser-Fehler ans HQ
// ============================================================
(function () {
    const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
    const SITE_ID = 'brawlmystery';

    function sendError(type, message, stack) {
        fetch(API + '/api/errors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                site_id:    SITE_ID,
                error_type: type,
                message:    String(message || 'Unknown error').slice(0, 500),
                stack:      stack ? String(stack).slice(0, 2000) : null,
                path:       window.location.pathname,
            }),
        }).catch(() => {}); // Fehler beim Fehler-Report ignorieren
    }

    window.addEventListener('error', function (e) {
        sendError('RuntimeError', e.message, e.error ? e.error.stack : null);
    });

    window.addEventListener('unhandledrejection', function (e) {
        sendError(
            'UnhandledRejection',
            e.reason ? String(e.reason).slice(0, 400) : 'Unhandled promise rejection',
            null
        );
    });
})();

// ============================================================
// Kontakt / Vorschläge — anonymes Einreichen von Ideen
// ============================================================
function openSuggestionModal() {
    const existing = document.getElementById('bm-suggestion-modal');
    if (existing) { existing.style.display = 'flex'; return; }

    const lang  = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'de';
    const texts = {
        de: { title:'💡 Idee einreichen', placeholder:'Füge den neuen Modus ... hinzu, der so funktioniert: ...',
              btn:'Absenden', hint:'Anonym · Max. 500 Zeichen', ok:'Danke für deinen Vorschlag! 🎉',
              err:'Fehler – bitte später erneut versuchen.', cooldown:'Bitte warte eine Stunde bevor du weitere Vorschläge einreichst.', close:'Schließen' },
        en: { title:'💡 Submit Idea', placeholder:'Add a new mode ... that works like this: ...',
              btn:'Submit', hint:'Anonymous · Max. 500 characters', ok:'Thanks for your suggestion! 🎉',
              err:'Error – please try again later.', cooldown:'Please wait an hour before submitting more suggestions.', close:'Close' },
        fr: { title:'💡 Soumettre une idée', placeholder:'Ajoute un nouveau mode ... qui fonctionne comme ça : ...',
              btn:'Envoyer', hint:'Anonyme · Max. 500 caractères', ok:'Merci pour ta suggestion ! 🎉',
              err:'Erreur – veuillez réessayer plus tard.', cooldown:'Veuillez attendre une heure avant de soumettre d'autres suggestions.', close:'Fermer' },
        es: { title:'💡 Enviar idea', placeholder:'Añade un nuevo modo ... que funciona así: ...',
              btn:'Enviar', hint:'Anónimo · Máx. 500 caracteres', ok:'¡Gracias por tu sugerencia! 🎉',
              err:'Error – inténtalo más tarde.', cooldown:'Por favor espera una hora antes de enviar más sugerencias.', close:'Cerrar' },
        it: { title:'💡 Invia idea', placeholder:'Aggiungi una nuova modalità ... che funziona così: ...',
              btn:'Invia', hint:'Anonimo · Max. 500 caratteri', ok:'Grazie per il tuo suggerimento! 🎉',
              err:'Errore – riprova più tardi.', cooldown:'Attendi un\'ora prima di inviare altri suggerimenti.', close:'Chiudi' },
    };
    const t = texts[lang] || texts.de;

    const overlay = document.createElement('div');
    overlay.id = 'bm-suggestion-modal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:20000;display:flex;align-items:center;justify-content:center;padding:20px';
    overlay.innerHTML = `
        <div style="background:#0f0f1e;border:2px solid rgba(249,115,22,.5);border-radius:16px;padding:28px 28px 24px;max-width:480px;width:100%;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.7)">
            <button onclick="document.getElementById('bm-suggestion-modal').style.display='none'" style="position:absolute;top:12px;right:14px;background:none;border:none;color:#a1a1aa;font-size:22px;cursor:pointer;line-height:1">&times;</button>
            <div style="font-size:17px;font-weight:800;color:#f97316;margin-bottom:14px">${t.title}</div>
            <textarea id="bm-sugg-text" rows="5" placeholder="${t.placeholder}" maxlength="500"
                style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(249,115,22,.35);border-radius:10px;padding:12px 14px;color:#f1f1f1;font-size:14px;font-family:inherit;resize:vertical;outline:none"></textarea>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;flex-wrap:wrap;gap:8px">
                <span style="font-size:11px;color:#71717a">${t.hint}</span>
                <button id="bm-sugg-btn" onclick="submitSuggestion()" style="padding:9px 20px;background:#f97316;border:none;border-radius:8px;color:#fff;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit">${t.btn}</button>
            </div>
            <div id="bm-sugg-status" style="margin-top:10px;font-size:13px;display:none"></div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display='none'; });
    document.getElementById('bm-sugg-text').focus();
}

window.openSuggestionModal = openSuggestionModal;

window.submitSuggestion = async function () {
    const API     = 'https://webcontrol-hq-api.karol-paschek.workers.dev';
    const SITE_ID = 'brawlmystery';
    const text    = (document.getElementById('bm-sugg-text')?.value || '').trim();
    const status  = document.getElementById('bm-sugg-status');
    const btn     = document.getElementById('bm-sugg-btn');
    if (!text || text.length < 5) return;

    btn.disabled = true; btn.textContent = '…';
    status.style.display = 'none';

    try {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'de';
        const res  = await fetch(API + '/api/suggestions', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ site_id: SITE_ID, suggestion: text, category: lang }),
        });
        const data = await res.json();
        const texts = {
            de: { ok:'Danke für deinen Vorschlag! 🎉', err:'Fehler – bitte später erneut versuchen.',
                  cooldown:'Bitte warte eine Stunde bevor du weitere Vorschläge einreichst.' },
            en: { ok:'Thanks! 🎉', err:'Error – try again later.', cooldown:'Please wait an hour.' },
            fr: { ok:'Merci ! 🎉', err:'Erreur.', cooldown:'Veuillez attendre une heure.' },
            es: { ok:'¡Gracias! 🎉', err:'Error.', cooldown:'Espera una hora.' },
            it: { ok:'Grazie! 🎉', err:'Errore.', cooldown:'Attendi un\'ora.' },
        };
        const t = texts[lang] || texts.de;
        if (res.status === 429 || data.error) {
            status.textContent    = res.status === 429 ? t.cooldown : t.err;
            status.style.color    = '#ef4444';
            status.style.display  = 'block';
            btn.disabled = false;
            btn.textContent = texts[lang]?.btn || 'Absenden';
        } else {
            status.textContent   = t.ok;
            status.style.color   = '#10b981';
            status.style.display = 'block';
            if (document.getElementById('bm-sugg-text'))
                document.getElementById('bm-sugg-text').value = '';
            // Modal nach 2s schließen
            setTimeout(() => {
                const m = document.getElementById('bm-suggestion-modal');
                if (m) m.style.display = 'none';
            }, 2000);
        }
    } catch (e) {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'de';
        status.textContent   = lang === 'de' ? 'Fehler – bitte später erneut versuchen.' : 'Error – try again later.';
        status.style.color   = '#ef4444';
        status.style.display = 'block';
        btn.disabled = false;
    }
};
