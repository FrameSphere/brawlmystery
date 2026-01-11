// Main application logic

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    initializeLanguage();
    
    // Initialize first game (classic mode)
    switchMode('classic');
    
    // Set up mode switching
    setupModeButtons();
    
    // Update daily progress on load
    updateDailyProgressOnLoad();
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
        });
    }
    
    updatePageLanguage();
}

// Mode Management
function setupModeButtons() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        item.addEventListener('click', () => {
            const mode = item.getAttribute('data-mode');
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
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
