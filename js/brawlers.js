// Brawlers data with complete stats
const brawlers = [
    // Starting Brawlers
    {
        id: 1,
        name: 'Shelly',
        rarity: 'Starting',
        role: 'Damage Dealer',
        range: 'Short',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/shelly.jpg'
    },
    
    // Rare Brawlers
    {
        id: 2,
        name: 'Nita',
        rarity: 'Rare',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/nita.png'
    },
    {
        id: 3,
        name: 'Colt',
        rarity: 'Rare',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/colt.png'
    },
    {
        id: 4,
        name: 'Bull',
        rarity: 'Rare',
        role: 'Tank',
        range: 'Short',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2017,
        image: 'images/brawlers/bull.png'
    },
    {
        id: 5,
        name: 'El Primo',
        rarity: 'Rare',
        role: 'Tank',
        range: 'Short',
        speed: 'Fast',
        health: 'Very High',
        releaseYear: 2017,
        image: 'images/brawlers/el-primo.jpg'
    },
    {
        id: 6,
        name: 'Barley',
        rarity: 'Rare',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/barley.png'
    },
    {
        id: 7,
        name: 'Poco',
        rarity: 'Rare',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'High',
        releaseYear: 2017,
        image: 'images/brawlers/poco.png'
    },
    {
        id: 8,
        name: 'Rosa',
        rarity: 'Rare',
        role: 'Tank',
        range: 'Short',
        speed: 'Fast',
        health: 'High',
        releaseYear: 2019,
        image: 'images/brawlers/rosa.jpg'
    },
    
    // Super Rare Brawlers
    {
        id: 9,
        name: 'Jessie',
        rarity: 'Super Rare',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/jessie.png'
    },
    {
        id: 10,
        name: 'Dynamike',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/dynamike.jpg'
    },
    {
        id: 11,
        name: 'Tick',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Very Low',
        releaseYear: 2019,
        image: 'images/brawlers/tick.png'
    },
    {
        id: 12,
        name: '8-Bit',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Slow',
        health: 'High',
        releaseYear: 2019,
        image: 'images/brawlers/8-bit.png'
    },
    {
        id: 13,
        name: 'Rico',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/rico.png'
    },
    {
        id: 14,
        name: 'Darryl',
        rarity: 'Super Rare',
        role: 'Tank',
        range: 'Short',
        speed: 'Normal',
        health: 'High',
        releaseYear: 2017,
        image: 'images/brawlers/darryl.jpg'
    },
    {
        id: 15,
        name: 'Penny',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2018,
        image: 'images/brawlers/penny.png'
    },
    {
        id: 16,
        name: 'Carl',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2019,
        image: 'images/brawlers/carl.jpg'
    },
    {
        id: 17,
        name: 'Jacky',
        rarity: 'Super Rare',
        role: 'Tank',
        range: 'Short',
        speed: 'Fast',
        health: 'High',
        releaseYear: 2020,
        image: 'images/brawlers/jacky.png'
    },
    {
        id: 18,
        name: 'Gus',
        rarity: 'Super Rare',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2022,
        image: 'images/brawlers/gus.jpg'
    },
    {
        id: 19,
        name: 'Bo',
        rarity: 'Super Rare',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/bo.png'
    },
    {
        id: 20,
        name: 'Emz',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2019,
        image: 'images/brawlers/emz.png'
    },
    {
        id: 21,
        name: 'Stu',
        rarity: 'Super Rare',
        role: 'Assassin',
        range: 'Medium',
        speed: 'Very Fast',
        health: 'Low',
        releaseYear: 2021,
        image: 'images/brawlers/stu.jpg'
    },
    {
        id: 22,
        name: 'Brock',
        rarity: 'Super Rare',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/brock.png'
    },
    
    // Epic Brawlers
    {
        id: 23,
        name: 'Piper',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/piper.jpg'
    },
    {
        id: 24,
        name: 'Pam',
        rarity: 'Epic',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2017,
        image: 'images/brawlers/pam.png'
    },
    {
        id: 25,
        name: 'Frank',
        rarity: 'Epic',
        role: 'Tank',
        range: 'Medium',
        speed: 'Slow',
        health: 'Very High',
        releaseYear: 2018,
        image: 'images/brawlers/frank.png'
    },
    {
        id: 26,
        name: 'Bibi',
        rarity: 'Epic',
        role: 'Tank',
        range: 'Short',
        speed: 'Very Fast',
        health: 'High',
        releaseYear: 2019,
        image: 'images/brawlers/bibi.png'
    },
    {
        id: 27,
        name: 'Bea',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2019,
        image: 'images/brawlers/bea.png'
    },
    {
        id: 28,
        name: 'Nani',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2020,
        image: 'images/brawlers/nani.jpg'
    },
    {
        id: 29,
        name: 'Edgar',
        rarity: 'Epic',
        role: 'Assassin',
        range: 'Short',
        speed: 'Very Fast',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/edgar.png'
    },
    {
        id: 30,
        name: 'Griff',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2021,
        image: 'images/brawlers/griff.jpg'
    },
    {
        id: 31,
        name: 'Grom',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2021,
        image: 'images/brawlers/grom.jpg'
    },
    {
        id: 32,
        name: 'Bonnie',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Fast',
        health: 'Low',
        releaseYear: 2022,
        image: 'images/brawlers/bonnie.png'
    },
    {
        id: 33,
        name: 'Hank',
        rarity: 'Epic',
        role: 'Tank',
        range: 'Short',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2023,
        image: 'images/brawlers/hank.png'
    },
    {
        id: 34,
        name: 'Pearl',
        rarity: 'Epic',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/pearl.png'
    },
    
    // Mythic Brawlers
    {
        id: 35,
        name: 'Mortis',
        rarity: 'Mythic',
        role: 'Assassin',
        range: 'Short',
        speed: 'Very Fast',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/mortis.jpg'
    },
    {
        id: 36,
        name: 'Tara',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2017,
        image: 'images/brawlers/tara.jpg'
    },
    {
        id: 37,
        name: 'Max',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Very Fast',
        health: 'Low',
        releaseYear: 2019,
        image: 'images/brawlers/max.jpg'
    },
    {
        id: 38,
        name: 'Mr. P',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/mr-p.jpg'
    },
    {
        id: 39,
        name: 'Sprout',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2020,
        image: 'images/brawlers/sprout.png'
    },
    {
        id: 40,
        name: 'Byron',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2020,
        image: 'images/brawlers/byron.png'
    },
    {
        id: 41,
        name: 'Squeak',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2021,
        image: 'images/brawlers/squeak.png'
    },
    {
        id: 42,
        name: 'Gray',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2022,
        image: 'images/brawlers/gray.png'
    },
    {
        id: 43,
        name: 'Willow',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2023,
        image: 'images/brawlers/willow.png'
    },
    {
        id: 44,
        name: 'Doug',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Medium',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/doug.png'
    },
    {
        id: 45,
        name: 'Chuck',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/chuck.jpg'
    },
    {
        id: 46,
        name: 'Charlie',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Medium',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/charlie.png'
    },
    {
        id: 47,
        name: 'Gene',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2019,
        image: 'images/brawlers/gene.jpg'
    },
    
    // Legendary Brawlers
    {
        id: 48,
        name: 'Spike',
        rarity: 'Legendary',
        role: 'Damage Dealer',
        range: 'Medium',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2017,
        image: 'images/brawlers/spike.jpg'
    },
    {
        id: 49,
        name: 'Crow',
        rarity: 'Legendary',
        role: 'Assassin',
        range: 'Long',
        speed: 'Very Fast',
        health: 'Very Low',
        releaseYear: 2017,
        image: 'images/brawlers/crow.jpg'
    },
    {
        id: 50,
        name: 'Leon',
        rarity: 'Legendary',
        role: 'Assassin',
        range: 'Long',
        speed: 'Very Fast',
        health: 'Medium',
        releaseYear: 2018,
        image: 'images/brawlers/leon.jpg'
    },
    {
        id: 51,
        name: 'Sandy',
        rarity: 'Legendary',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'High',
        releaseYear: 2019,
        image: 'images/brawlers/sandy.png'
    },
    {
        id: 52,
        name: 'Amber',
        rarity: 'Legendary',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2020,
        image: 'images/brawlers/amber.png'
    },
    {
        id: 53,
        name: 'Meg',
        rarity: 'Legendary',
        role: 'Tank',
        range: 'Medium',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2021,
        image: 'images/brawlers/meg.jpg'
    },
    {
        id: 54,
        name: 'Chester',
        rarity: 'Legendary',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2022,
        image: 'images/brawlers/chester.png'
    },
    {
        id: 55,
        name: 'Cordelius',
        rarity: 'Legendary',
        role: 'Assassin',
        range: 'Medium',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/cordelius.png'
    },
    
    // Chromatic Brawlers
    {
        id: 56,
        name: 'Gale',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/gale.png'
    },
    {
        id: 57,
        name: 'Surge',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/surge.jpg'
    },
    {
        id: 58,
        name: 'Colette',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/colette.jpg'
    },
    {
        id: 59,
        name: 'Lou',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2020,
        image: 'images/brawlers/lou.jpg'
    },
    {
        id: 60,
        name: 'Ruffs',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2021,
        image: 'images/brawlers/ruffs.jpg'
    },
    {
        id: 61,
        name: 'Belle',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2021,
        image: 'images/brawlers/belle.png'
    },
    {
        id: 62,
        name: 'Buzz',
        rarity: 'Mythic',
        role: 'Assassin',
        range: 'Short',
        speed: 'Normal',
        health: 'High',
        releaseYear: 2021,
        image: 'images/brawlers/buzz.png'
    },
    {
        id: 63,
        name: 'Ash',
        rarity: 'Mythic',
        role: 'Tank',
        range: 'Short',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2021,
        image: 'images/brawlers/ash.jpg'
    },
    {
        id: 64,
        name: 'Lola',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2021,
        image: 'images/brawlers/lola.png'
    },
    {
        id: 65,
        name: 'Fang',
        rarity: 'Mythic',
        role: 'Assassin',
        range: 'Short',
        speed: 'Fast',
        health: 'Medium',
        releaseYear: 2022,
        image: 'images/brawlers/fang.png'
    },
    {
        id: 66,
        name: 'Eve',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2022,
        image: 'images/brawlers/eve.png'
    },
    {
        id: 67,
        name: 'Janet',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2022,
        image: 'images/brawlers/janet.png'
    },
    {
        id: 68,
        name: 'Otis',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2022,
        image: 'images/brawlers/otis.png'
    },
    {
        id: 69,
        name: 'Sam',
        rarity: 'Mythic',
        role: 'Assassin',
        range: 'Short',
        speed: 'Fast',
        health: 'High',
        releaseYear: 2022,
        image: 'images/brawlers/sam.jpg'
    },
    {
        id: 70,
        name: 'Buster',
        rarity: 'Mythic',
        role: 'Tank',
        range: 'Short',
        speed: 'Normal',
        health: 'Very High',
        releaseYear: 2022,
        image: 'images/brawlers/buster.png'
    },
    {
        id: 71,
        name: 'Mandy',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2022,
        image: 'images/brawlers/mandy.png'
    },
    {
        id: 72,
        name: 'R-T',
        rarity: 'Mythic',
        role: 'Support',
        range: 'Long',
        speed: 'Normal',
        health: 'Medium',
        releaseYear: 2023,
        image: 'images/brawlers/r-t.png'
    },
    {
        id: 73,
        name: 'Maisie',
        rarity: 'Mythic',
        role: 'Damage Dealer',
        range: 'Very Long',
        speed: 'Normal',
        health: 'Low',
        releaseYear: 2023,
        image: 'images/brawlers/maisie.png'
    }
];

// Stat comparison values for higher/lower logic
const statValues = {
    rarity: {
        'Starting': 0,
        'Rare': 1,
        'Super Rare': 2,
        'Epic': 3,
        'Mythic': 4,
        'Legendary': 5
    },
    range: {
        'Short': 0,
        'Medium': 1,
        'Long': 2,
        'Very Long': 3
    },
    speed: {
        'Slow': 0,
        'Normal': 1,
        'Fast': 2,
        'Very Fast': 3
    },
    health: {
        'Very Low': 0,
        'Low': 1,
        'Medium': 2,
        'High': 3,
        'Very High': 4
    }
};
