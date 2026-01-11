// Game Logic for Brawl Stars Guess

class BrawlStarsGame {
    constructor(mode) {
        this.mode = mode;
        this.maxAttempts = 8;
        this.attempts = 0;
        this.guesses = [];
        this.gameOver = false;
        this.won = false;
        
        // Get daily brawler for this mode
        this.dailyBrawler = this.getDailyBrawler();
        
        // Load saved game state
        this.loadGameState();
        
        // Initialize UI
        this.initializeUI();
    }
    
    getDailyBrawler() {
        // Use current date and mode as seed for different brawler per mode
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        // Different seed per mode
        const modeSeeds = {
            'classic': seed,
            'pixel': seed + 1000,
            'emoji': seed + 2000,
            'description': seed + 3000
        };
        
        const modeSeed = modeSeeds[this.mode] || seed;
        const index = modeSeed % brawlers.length;
        return brawlers[index];
    }
    
    getStorageKey() {
        const today = new Date().toISOString().split('T')[0];
        return `brawlstars_${this.mode}_${today}`;
    }
    
    loadGameState() {
        const saved = localStorage.getItem(this.getStorageKey());
        if (saved) {
            const state = JSON.parse(saved);
            this.attempts = state.attempts;
            this.guesses = state.guesses;
            this.gameOver = state.gameOver;
            this.won = state.won;
        }
    }
    
    saveGameState() {
        const state = {
            attempts: this.attempts,
            guesses: this.guesses,
            gameOver: this.gameOver,
            won: this.won
        };
        localStorage.setItem(this.getStorageKey(), JSON.stringify(state));
        this.updateDailyProgress();
    }
    
    initializeUI() {
        this.renderGuesses();
        
        if (this.gameOver) {
            this.showResult();
        }
        
        this.initializeModeUI();
    }
    
    initializeModeUI() {
        switch (this.mode) {
            case 'classic':
                this.initializeClassicMode();
                break;
            case 'pixel':
                this.initializePixelMode();
                break;
            case 'emoji':
                this.initializeEmojiMode();
                break;
            case 'description':
                this.initializeDescriptionMode();
                break;
        }
    }
    
    initializeClassicMode() {
        // Classic mode shows guess grid
        const container = document.getElementById('guesses');
        if (container && this.guesses.length === 0 && !this.gameOver) {
            // Show header
            this.createGuessHeader();
        }
    }
    
    createGuessHeader() {
        const container = document.getElementById('guesses');
        if (!container) return;
        
        const header = document.createElement('div');
        header.className = 'guess-header';
        
        // Add Brawler image header
        const imageHeader = document.createElement('div');
        imageHeader.className = 'guess-header-cell';
        imageHeader.textContent = 'Brawler';
        header.appendChild(imageHeader);
        
        const headers = ['rarity', 'role', 'range', 'speed', 'health', 'releaseYear'];
        headers.forEach(stat => {
            const cell = document.createElement('div');
            cell.className = 'guess-header-cell';
            cell.textContent = t(`stats.${stat}`);
            header.appendChild(cell);
        });
        
        container.appendChild(header);
    }
    
    initializePixelMode() {
        const canvas = document.getElementById('pixel-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = 400;
            canvas.height = 400;
            
            // Stärkere Verpixelung am Anfang (80 -> 8 Pixel)
            // Verbesserung: 80, 60, 40, 25, 15, 10, 6, 4 (8 Versuche)
            const pixelSizes = [80, 60, 40, 25, 15, 10, 6, 4];
            const pixelSize = this.gameOver ? 1 : (pixelSizes[this.attempts] || 4);
            
            // Draw pixelated image
            const w = canvas.width / pixelSize;
            const h = canvas.height / pixelSize;
            
            ctx.drawImage(img, 0, 0, w, h);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
            
            if (this.gameOver) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
        
        img.onerror = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffd700';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Image not available', canvas.width / 2, canvas.height / 2);
        };
        
        img.src = this.dailyBrawler.image;
    }
    
    initializeEmojiMode() {
        const display = document.getElementById('emoji-display');
        if (display) {
            // Generate emoji based on brawler characteristics
            const emojis = this.generateEmoji(this.dailyBrawler);
            display.textContent = emojis;
        }
    }
    
    generateEmoji(brawler) {
        // Emoji mapping for all brawlers
        const emojiMap = {
            'Shelly': '🔫💥',
            'Nita': '🐻⚡',
            'Colt': '🔫🎯',
            'Bull': '🐂💪',
            'El Primo': '💪🤼',
            'Barley': '🍺🔥',
            'Poco': '🎸💀',
            'Rosa': '🌹🥊',
            'Jessie': '🔧⚡',
            'Brock': '🚀💣',
            'Dynamike': '💣⛏️',
            'Tick': '⏰💣',
            '8-Bit': '👾🎮',
            'Rico': '⚡🔵',
            'Darryl': '🛢️🏴‍☠️',
            'Penny': '💰⚓',
            'Carl': '⛏️🪨',
            'Jacky': '🔨💎',
            'Gus': '👻🎈',
            'Bo': '🏹🦅',
            'Emz': '📱💜',
            'Stu': '🎬🏎️',
            'Piper': '☂️💣',
            'Pam': '🔧💪',
            'Frank': '🔨😡',
            'Bibi': '⚾🏏',
            'Bea': '🐝🎯',
            'Nani': '🤖👁️',
            'Edgar': '🧣⚡',
            'Griff': '💰🏦',
            'Grom': '👮💣',
            'Bonnie': '🎪🦷',
            'Hank': '🦀🡄',
            'Pearl': '🧜‍♀️🔱',
            'Mortis': '⚰️🦇',
            'Tara': '🔮✨',
            'Max': '⚡🏃‍♀️',
            'Mr. P': '🐧🎩',
            'Sprout': '🌱💚',
            'Byron': '💉🧪',
            'Squeak': '🐶💧',
            'Gray': '🎨🖌️',
            'Willow': '🐸💤',
            'Doug': '🔔🏠',
            'Chuck': '🚂⚙️',
            'Charlie': '🕷️🕸️',
            'Gene': '🧞‍♂️✨',
            'Spike': '🌵🌟',
            'Crow': '🦅🗡️',
            'Leon': '🦎👻',
            'Sandy': '😴💨',
            'Amber': '🔥🎪',
            'Meg': '🤖👧',
            'Chester': '🃏🎭',
            'Cordelius': '🍄🌙',
            'Gale': '❄️💨',
            'Surge': '⚡🤖',
            'Colette': '📒💜',
            'Lou': '❄️🍦',
            'Ruffs': '🐕🚀',
            'Belle': '⚡💰',
            'Buzz': '🏖️🦈',
            'Ash': '🗑️🔥',
            'Lola': '🎬⭐',
            'Fang': '🥋👟',
            'Eve': '🥚👽',
            'Janet': '🎪🎠',
            'Otis': '🎨🐙',
            'Sam': '🦾🔩',
            'Buster': '🎬📽️',
            'Mandy': '🍬🎯',
            'R-T': '🤖📡',
            'Maisie': '🔫🎯'
        };
        return emojiMap[brawler.name] || '❓❓';
    }
    
    initializeDescriptionMode() {
        const descText = document.getElementById('description-text');
        if (descText) {
            const description = getDescription(this.dailyBrawler.name);
            
            // Reveal description word by word based on attempts
            const words = description.split(' ');
            const revealCount = Math.min(words.length, Math.ceil(words.length * (this.attempts + 1) / this.maxAttempts));
            const revealed = words.slice(0, revealCount).join(' ');
            const hidden = words.slice(revealCount).map(() => '___').join(' ');
            
            descText.textContent = revealed + (hidden ? ' ' + hidden : '');
            
            if (this.gameOver) {
                descText.textContent = description;
            }
        }
    }
    
    makeGuess(brawlerName) {
        if (this.gameOver) return;
        
        const guessed = brawlers.find(b => b.name.toLowerCase() === brawlerName.toLowerCase());
        if (!guessed) return;
        
        // Check if already guessed
        if (this.guesses.some(g => g.name === guessed.name)) {
            return;
        }
        
        this.attempts++;
        const isCorrect = guessed.id === this.dailyBrawler.id;
        
        // Compare stats
        const comparison = this.compareStats(guessed, this.dailyBrawler);
        
        this.guesses.push({
            name: guessed.name,
            correct: isCorrect,
            stats: {
                rarity: guessed.rarity,
                role: guessed.role,
                range: guessed.range,
                speed: guessed.speed,
                health: guessed.health,
                releaseYear: guessed.releaseYear
            },
            comparison: comparison
        });
        
        if (isCorrect) {
            this.won = true;
            this.gameOver = true;
        } else if (this.attempts >= this.maxAttempts) {
            this.gameOver = true;
        }
        
        this.saveGameState();
        this.updateUI();
    }
    
    compareStats(guessed, target) {
        const comparison = {};
        
        // Rarity
        const rarityGuess = statValues.rarity[guessed.rarity];
        const rarityTarget = statValues.rarity[target.rarity];
        comparison.rarity = rarityGuess === rarityTarget ? 'correct' : (rarityGuess < rarityTarget ? 'higher' : 'lower');
        
        // Role
        comparison.role = guessed.role === target.role ? 'correct' : 'wrong';
        
        // Range
        const rangeGuess = statValues.range[guessed.range];
        const rangeTarget = statValues.range[target.range];
        comparison.range = rangeGuess === rangeTarget ? 'correct' : (rangeGuess < rangeTarget ? 'higher' : 'lower');
        
        // Speed
        const speedGuess = statValues.speed[guessed.speed];
        const speedTarget = statValues.speed[target.speed];
        comparison.speed = speedGuess === speedTarget ? 'correct' : (speedGuess < speedTarget ? 'higher' : 'lower');
        
        // Health
        const healthGuess = statValues.health[guessed.health];
        const healthTarget = statValues.health[target.health];
        comparison.health = healthGuess === healthTarget ? 'correct' : (healthGuess < healthTarget ? 'higher' : 'lower');
        
        // Release Year
        comparison.releaseYear = guessed.releaseYear === target.releaseYear ? 'correct' : (guessed.releaseYear < target.releaseYear ? 'higher' : 'lower');
        
        return comparison;
    }
    
    updateUI() {
        if (this.mode === 'pixel') {
            this.initializePixelMode();
        } else if (this.mode === 'description') {
            this.initializeDescriptionMode();
        }
        
        this.renderGuesses();
        
        if (this.gameOver) {
            this.showResult();
        }
    }
    
    renderGuesses() {
        if (this.mode === 'classic') {
            this.renderClassicGuesses();
        } else {
            this.renderSimpleGuesses();
        }
    }
    
    renderClassicGuesses() {
        const container = document.getElementById('guesses');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create header if guesses exist
        if (this.guesses.length > 0) {
            this.createGuessHeader();
        }
        
        // Render each guess
        this.guesses.forEach(guess => {
            const row = document.createElement('div');
            row.className = 'guess-row';
            
            // Add Brawler image cell
            const imageCell = document.createElement('div');
            imageCell.className = 'brawler-image-cell';
            const img = document.createElement('img');
            img.src = brawlers.find(b => b.name === guess.name)?.image || '';
            img.alt = guess.name;
            imageCell.appendChild(img);
            row.appendChild(imageCell);
            
            const stats = ['rarity', 'role', 'range', 'speed', 'health', 'releaseYear'];
            stats.forEach(stat => {
                const cell = document.createElement('div');
                cell.className = 'guess-cell';
                cell.textContent = guess.stats[stat];
                
                const comp = guess.comparison[stat];
                if (comp === 'correct') {
                    cell.classList.add('correct');
                } else if (comp === 'higher') {
                    cell.classList.add('higher');
                } else if (comp === 'lower') {
                    cell.classList.add('lower');
                }
                
                row.appendChild(cell);
            });
            
            container.appendChild(row);
        });
    }
    
    renderSimpleGuesses() {
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const container = document.getElementById(`${prefix}guesses`);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.guesses.forEach(guess => {
            const div = document.createElement('div');
            div.className = `guess-item ${guess.correct ? 'correct' : 'wrong'}`;
            div.innerHTML = `
                <span>${guess.name}</span>
                <span>${guess.correct ? '✅' : '❌'}</span>
            `;
            container.appendChild(div);
        });
    }
    
    showResult() {
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const resultEl = document.getElementById(`${prefix}result`);
        if (!resultEl) return;
        
        if (this.won) {
            resultEl.className = 'result-message success';
            resultEl.textContent = `${t('correct')} ${this.dailyBrawler.name}!`;
        } else {
            resultEl.className = 'result-message failure';
            resultEl.textContent = `${t('wrong')} ${this.dailyBrawler.name}.`;
        }
    }
    
    updateDailyProgress() {
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
}

// Initialize search functionality
function initializeSearch(mode) {
    let searchInput, resultsContainer;
    
    // Get correct IDs based on mode
    if (mode === 'classic') {
        searchInput = document.getElementById('brawler-search');
        resultsContainer = document.getElementById('search-results');
    } else {
        searchInput = document.getElementById(`${mode}-search`);
        resultsContainer = document.getElementById(`${mode}-results`);
    }
    
    if (!searchInput || !resultsContainer) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 1) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        const matches = brawlers.filter(b => 
            b.name.toLowerCase().startsWith(query)
        );
        
        if (matches.length === 0) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        resultsContainer.innerHTML = '';
        matches.forEach(brawler => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            
            const icon = document.createElement('img');
            icon.className = 'search-result-icon';
            icon.src = brawler.image;
            icon.alt = brawler.name;
            
            const name = document.createElement('span');
            name.className = 'search-result-name';
            name.textContent = brawler.name;
            
            div.appendChild(icon);
            div.appendChild(name);
            
            div.addEventListener('click', () => {
                currentGame.makeGuess(brawler.name);
                searchInput.value = '';
                resultsContainer.classList.remove('active');
            });
            resultsContainer.appendChild(div);
        });
        
        resultsContainer.classList.add('active');
    });
    
    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase();
            const matches = brawlers.filter(b => 
                b.name.toLowerCase().startsWith(query)
            );
            
            if (matches.length > 0) {
                currentGame.makeGuess(matches[0].name);
                searchInput.value = '';
                resultsContainer.classList.remove('active');
            }
        }
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

// Global game instance
let currentGame = null;
