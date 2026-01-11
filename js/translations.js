// Translations
const translations = {
    de: {
        mode: {
            classic: 'Klassisch',
            pixel: 'Pixel',
            emoji: 'Emoji',
            description: 'Beschreibung'
        },
        searchPlaceholder: 'Suche Brawler...',
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        correct: '🎉 Richtig! Der Brawler war',
        wrong: '❌ Falsch! Der richtige Brawler war',
        stats: {
            rarity: 'Seltenheit',
            role: 'Rolle',
            range: 'Reichweite',
            speed: 'Geschwindigkeit',
            health: 'Gesundheit',
            releaseYear: 'Jahr'
        }
    },
    en: {
        mode: {
            classic: 'Classic',
            pixel: 'Pixel',
            emoji: 'Emoji',
            description: 'Description'
        },
        searchPlaceholder: 'Search Brawler...',
        imprint: 'Imprint',
        privacy: 'Privacy',
        correct: '🎉 Correct! The Brawler was',
        wrong: '❌ Wrong! The correct Brawler was',
        stats: {
            rarity: 'Rarity',
            role: 'Role',
            range: 'Range',
            speed: 'Speed',
            health: 'Health',
            releaseYear: 'Year'
        }
    },
    es: {
        mode: {
            classic: 'Clásico',
            pixel: 'Píxel',
            emoji: 'Emoji',
            description: 'Descripción'
        },
        searchPlaceholder: 'Buscar Brawler...',
        imprint: 'Aviso legal',
        privacy: 'Privacidad',
        correct: '🎉 ¡Correcto! El Brawler era',
        wrong: '❌ ¡Incorrecto! El Brawler correcto era',
        stats: {
            rarity: 'Rareza',
            role: 'Rol',
            range: 'Alcance',
            speed: 'Velocidad',
            health: 'Salud',
            releaseYear: 'Año'
        }
    },
    fr: {
        mode: {
            classic: 'Classique',
            pixel: 'Pixel',
            emoji: 'Emoji',
            description: 'Description'
        },
        searchPlaceholder: 'Rechercher Brawler...',
        imprint: 'Mentions légales',
        privacy: 'Confidentialité',
        correct: '🎉 Correct! Le Brawler était',
        wrong: '❌ Faux! Le bon Brawler était',
        stats: {
            rarity: 'Rareté',
            role: 'Rôle',
            range: 'Portée',
            speed: 'Vitesse',
            health: 'Santé',
            releaseYear: 'Année'
        }
    },
    it: {
        mode: {
            classic: 'Classico',
            pixel: 'Pixel',
            emoji: 'Emoji',
            description: 'Descrizione'
        },
        searchPlaceholder: 'Cerca Brawler...',
        imprint: 'Note legali',
        privacy: 'Privacy',
        correct: '🎉 Corretto! Il Brawler era',
        wrong: '❌ Sbagliato! Il Brawler corretto era',
        stats: {
            rarity: 'Rarità',
            role: 'Ruolo',
            range: 'Portata',
            speed: 'Velocità',
            health: 'Salute',
            releaseYear: 'Anno'
        }
    }
};

// Descriptions for description mode
const descriptions = {
    de: {
        'Shelly': 'Eine Kämpferin mit einer Schrotflinte, die auf kurze Distanz großen Schaden verursacht.',
        'Nita': 'Beschwört einen Bären, der Gegner angreift und Schaden verursacht.',
        'Colt': 'Feuert schnelle Schüsse aus großer Entfernung ab.',
        'Bull': 'Ein Tank mit viel Gesundheit, der auf kurze Distanz kämpft.',
        'El Primo': 'Ein Nahkämpfer mit hoher Gesundheit und starken Fäusten.',
        'Barley': 'Wirft Flaschen, die Gegner über Zeit Schaden zufügen.',
        'Poco': 'Ein Heiler, der Verbündete mit Musik heilt.',
        'Rosa': 'Eine Nahkämpferin, die sich mit einem Schild schützen kann.',
        'Jessie': 'Platziert einen Geschützturm, der automatisch Gegner angreift.',
        'Brock': 'Schießt Raketen, die Flächenschaden verursachen.',
        'Dynamike': 'Wirft Dynamit, das nach kurzer Zeit explodiert.',
        'Tick': 'Wirft Minen, die nach kurzer Zeit explodieren.',
        '8-Bit': 'Ein langsamer Roboter mit hohem Schaden und einer Verstärkungs-Turret.',
        'Rico': 'Schießt Kugeln, die von Wänden abprallen.',
        'Darryl': 'Ein Piratenfass, das mit seiner Super rollt und Gegner überrascht.',
        'Penny': 'Platziert eine Kanone, die Gegner aus der Ferne bombardiert.',
        'Carl': 'Wirft einen Bumerang-Pickel, der zu ihm zurückkehrt.',
        'Jacky': 'Schwingt einen Presslufthammer und zerstört Gegner im Nahkampf.',
        'Gus': 'Ein Geisterkind, das Verbündete mit Ballons heilt.',
        'Bo': 'Platziert Minen, die explodieren, wenn Gegner in die Nähe kommen.',
        'Emz': 'Sprüht eine giftige Wolke, die Gegner verlangsamt.',
        'Stu': 'Ein akrobatischer Stuntman, der ständig herumspringt.',
        'Piper': 'Eine elegante Scharfschützin mit großer Reichweite.',
        'Pam': 'Eine starke Unterstützerin mit einer Heilungsstation.',
        'Frank': 'Ein langsamer aber mächtiger Tank mit großer Reichweite.',
        'Bibi': 'Schwingt einen Baseball-Schläger mit großer Wucht.',
        'Bea': 'Eine Biene, die verstärkte Schüsse abfeuert.',
        'Nani': 'Ein Roboter mit präzisen Lasergeschossen.',
        'Edgar': 'Ein schneller Assassine mit Selbstheilung.',
        'Griff': 'Ein gieriger Ladenbesitzer mit Münz-Angriffen.',
        'Grom': 'Wirft Radio-Bomben, die Wände überwinden.',
        'Bonnie': 'Kann zwischen Kanone und Schnellfeuer wechseln.',
        'Hank': 'Ein Krebs-Brawler mit starken Blasen-Angriffen.',
        'Pearl': 'Eine Meerjungfrau mit mächtigen Dreizack-Angriffen.',
        'Mortis': 'Ein schneller Assassine mit Dash-Angriffen.',
        'Tara': 'Kann Gegner mit einem schwarzen Loch zusammenziehen.',
        'Max': 'Erhöht die Geschwindigkeit aller Verbündeten.',
        'Mr. P': 'Ein Pinguin-Butler, der Porter beschwört.',
        'Sprout': 'Eine Pflanze, die Wände erschaffen kann.',
        'Byron': 'Ein Alchemist, der Verbündete heilt und Gegner vergiftet.',
        'Squeak': 'Wirft klebrige Bomben, die an Gegnern haften.',
        'Gray': 'Ein Künstler, der Portale erschaffen kann.',
        'Willow': 'Kann Gegner kontrollieren mit ihrer Mind-Control.',
        'Doug': 'Eine lebende Mülltonne mit Würstchen-Angriffen.',
        'Chuck': 'Ein Zugführer mit starken Schienen-Angriffen.',
        'Charlie': 'Eine Spinne, die Gegner mit Netzen fängt.',
        'Gene': 'Kann Gegner mit seiner magischen Hand zu sich ziehen.',
        'Spike': 'Ein Kaktus, der stachelige Projektile wirft.',
        'Crow': 'Ein Assassine, der Gegner vergiftet.',
        'Leon': 'Kann sich unsichtbar machen und Gegner überraschen.',
        'Sandy': 'Erzeugt einen Sandsturm, der Verbündete unsichtbar macht.',
        'Amber': 'Sprüht Feuer, das Gegner kontinuierlich Schaden zufügt.',
        'Meg': 'Kann in einen großen Roboter verwandeln.',
        'Chester': 'Ein Joker mit zufälligen Angriffen und Fähigkeiten.',
        'Cordelius': 'Kann Gegner in eine Schattendimension ziehen.',
        'Gale': 'Bläst Gegner mit starken Schneestürmen weg.',
        'Surge': 'Wird mit jedem Upgrade stärker während des Matches.',
        'Colette': 'Verursacht prozentualen Schaden basierend auf Gegner-Leben.',
        'Lou': 'Friert Gegner ein mit seinen Eis-Angriffen.',
        'Ruffs': 'Ein Weltraum-Hund, der Power-Ups verteilt.',
        'Belle': 'Markiert Gegner, damit sie mehr Schaden nehmen.',
        'Buzz': 'Ein Rettungsschwimmer mit starkem Haken-Angriff.',
        'Ash': 'Wird wütender und stärker, je mehr Schaden er nimmt.',
        'Lola': 'Erschafft einen Klon von sich selbst.',
        'Fang': 'Ein Kampfsportler mit mächtigen Tritt-Combos.',
        'Eve': 'Eine Alien-Königin, die fliegende Eier beschwört.',
        'Janet': 'Eine Artistin, die durch die Luft fliegt.',
        'Otis': 'Ein Künstler, der Gegner stumm schaltet.',
        'Sam': 'Ein Roboter mit ausfahrbaren Knall-Armen.',
        'Buster': 'Ein Filmemacher mit Schild-Fähigkeiten.',
        'Mandy': 'Schießt kraftvolle Bonbon-Geschosse.',
        'R-T': 'Ein Roboter mit verschiedenen Bein-Modi.',
        'Maisie': 'Eine Scharfschützin mit aufladbaren Schüssen.'
    },
    en: {
        'Shelly': 'A fighter with a shotgun that deals massive damage at close range.',
        'Nita': 'Summons a bear that attacks enemies and deals damage.',
        'Colt': 'Fires rapid shots from long range.',
        'Bull': 'A tank with high health that fights at close range.',
        'El Primo': 'A melee fighter with high health and strong fists.',
        'Barley': 'Throws bottles that damage enemies over time.',
        'Poco': 'A healer who heals allies with music.',
        'Rosa': 'A melee fighter who can protect herself with a shield.',
        'Jessie': 'Places a turret that automatically attacks enemies.',
        'Brock': 'Shoots rockets that deal area damage.',
        'Dynamike': 'Throws dynamite that explodes after a short time.',
        'Tick': 'Throws mines that explode after a short time.',
        '8-Bit': 'A slow robot with high damage and a damage-boosting turret.',
        'Rico': 'Shoots bullets that bounce off walls.',
        'Darryl': 'A pirate barrel that rolls with his super and surprises enemies.',
        'Penny': 'Places a cannon that bombards enemies from afar.',
        'Carl': 'Throws a boomerang pickaxe that returns to him.',
        'Jacky': 'Swings a jackhammer and destroys enemies in melee.',
        'Gus': 'A ghost child that heals allies with balloons.',
        'Bo': 'Places mines that explode when enemies get close.',
        'Emz': 'Sprays a toxic cloud that slows enemies.',
        'Stu': 'An acrobatic stuntman who constantly jumps around.',
        'Piper': 'An elegant sniper with great range.',
        'Pam': 'A strong support with a healing turret.',
        'Frank': 'A slow but powerful tank with great range.',
        'Bibi': 'Swings a baseball bat with great force.',
        'Bea': 'A bee that fires supercharged shots.',
        'Nani': 'A robot with precise laser shots.',
        'Edgar': 'A fast assassin with self-healing.',
        'Griff': 'A greedy shopkeeper with coin attacks.',
        'Grom': 'Throws radio bombs that overcome walls.',
        'Bonnie': 'Can switch between cannon and rapid fire.',
        'Hank': 'A crab brawler with powerful bubble attacks.',
        'Pearl': 'A mermaid with mighty trident attacks.',
        'Mortis': 'A fast assassin with dashing attacks.',
        'Tara': 'Can pull enemies together with a black hole.',
        'Max': 'Increases the speed of all allies.',
        'Mr. P': 'A penguin butler who summons porters.',
        'Sprout': 'A plant that can create walls.',
        'Byron': 'An alchemist who heals allies and poisons enemies.',
        'Squeak': 'Throws sticky bombs that attach to enemies.',
        'Gray': 'An artist who can create portals.',
        'Willow': 'Can control enemies with her mind-control.',
        'Doug': 'A living trash can with hot dog attacks.',
        'Chuck': 'A train conductor with powerful rail attacks.',
        'Charlie': 'A spider that catches enemies with webs.',
        'Gene': 'Can pull enemies to him with his magic hand.',
        'Spike': 'A cactus that throws spiky projectiles.',
        'Crow': 'An assassin who poisons enemies.',
        'Leon': 'Can become invisible and surprise enemies.',
        'Sandy': 'Creates a sandstorm that makes allies invisible.',
        'Amber': 'Sprays fire that continuously damages enemies.',
        'Meg': 'Can transform into a large robot.',
        'Chester': 'A joker with random attacks and abilities.',
        'Cordelius': 'Can pull enemies into a shadow dimension.',
        'Gale': 'Blows enemies away with strong snowstorms.',
        'Surge': 'Gets stronger with each upgrade during the match.',
        'Colette': 'Deals percentage damage based on enemy health.',
        'Lou': 'Freezes enemies with his ice attacks.',
        'Ruffs': 'A space dog that distributes power-ups.',
        'Belle': 'Marks enemies so they take more damage.',
        'Buzz': 'A lifeguard with a strong hook attack.',
        'Ash': 'Gets angrier and stronger the more damage he takes.',
        'Lola': 'Creates a clone of herself.',
        'Fang': 'A martial artist with powerful kick combos.',
        'Eve': 'An alien queen who summons flying eggs.',
        'Janet': 'An acrobat who flies through the air.',
        'Otis': 'An artist who silences enemies.',
        'Sam': 'A robot with extendable knockback arms.',
        'Buster': 'A filmmaker with shield abilities.',
        'Mandy': 'Shoots powerful candy projectiles.',
        'R-T': 'A robot with different leg modes.',
        'Maisie': 'A sniper with chargeable shots.'
    }
};

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'de';
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

// Update all translatable elements
function updatePageLanguage() {
    const lang = getCurrentLanguage();
    const trans = translations[lang];
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = trans;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = trans;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.placeholder = value;
        }
    });
}

// Get translation
function t(key) {
    const lang = getCurrentLanguage();
    const trans = translations[lang];
    const keys = key.split('.');
    let value = trans;
    
    for (const k of keys) {
        value = value[k];
        if (!value) return key;
    }
    
    return value;
}

// Get description
function getDescription(brawlerName) {
    const lang = getCurrentLanguage();
    const desc = descriptions[lang] || descriptions['en'];
    return desc[brawlerName] || '';
}
