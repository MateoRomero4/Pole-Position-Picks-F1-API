const express = require('express');
const app = express();
const fs = require('fs');
var cors = require('cors')


app.use(express.json());
app.use(cors())

const ABU_DHABI_GRAND_PRIX = require('./data/grand_prix/ABU_DHABI_GRAND_PRIX.json');
const AUSTRALIAN_GRAND_PRIX = require('./data/grand_prix/AUSTRALIAN_GRAND_PRIX.json');
const AUSTRIAN_GRAND_PRIX = require('./data/grand_prix/AUSTRIAN_GRAND_PRIX.json');
const AZERBAIJAN_GRAND_PRIX = require('./data/grand_prix/AZERBAIJAN_GRAND_PRIX.json');
const BAHRAIN_GRAND_PRIX = require('./data/grand_prix/BAHRAIN_GRAND_PRIX.json');
const BELGIAN_GRAND_PRIX = require('./data/grand_prix/BELGIAN_GRAND_PRIX.json');
const BRAZILIAN_GRAND_PRIX = require('./data/grand_prix/BRAZILIAN_GRAND_PRIX.json');
const BRITISH_GRAND_PRIX = require('./data/grand_prix/BRITISH_GRAND_PRIX.json');
const CANADIAN_GRAND_PRIX = require('./data/grand_prix/CANADIAN_GRAND_PRIX.json');
const CHINESE_GRAND_PRIX = require('./data/grand_prix/CHINESE_GRAND_PRIX.json');
const DUTCH_GRAND_PRIX = require('./data/grand_prix/DUTCH_GRAND_PRIX.json');
const EIFEL_GRAND_PRIX = require('./data/grand_prix/EIFEL_GRAND_PRIX.json');
const EMILIA_ROMAGNA_GRAND_PRIX = require('./data/grand_prix/EMILIA_ROMAGNA_GRAND_PRIX.json');
const EUROPEAN_GRAND_PRIX = require('./data/grand_prix/EUROPEAN_GRAND_PRIX.json');
const FRENCH_GRAND_PRIX = require('./data/grand_prix/FRENCH_GRAND_PRIX.json');
const GERMAN_GRAND_PRIX = require('./data/grand_prix/GERMAN_GRAND_PRIX.json');
const HUNGARIAN_GRAND_PRIX = require('./data/grand_prix/HUNGARIAN_GRAND_PRIX.json');
const INDIAN_GRAND_PRIX = require('./data/grand_prix/INDIAN_GRAND_PRIX.json');
const ITALIAN_GRAND_PRIX = require('./data/grand_prix/ITALIAN_GRAND_PRIX.json');
const JAPANESE_GRAND_PRIX = require('./data/grand_prix/JAPANESE_GRAND_PRIX.json');
const KOREAN_GRAND_PRIX = require('./data/grand_prix/KOREAN_GRAND_PRIX.json');
const MALAYSIAN_GRAND_PRIX = require('./data/grand_prix/MALAYSIAN_GRAND_PRIX.json');
const MEXICAN_GRAND_PRIX = require('./data/grand_prix/MEXICAN_GRAND_PRIX.json');
const MIAMI_GRAND_PRIX = require('./data/grand_prix/MIAMI_GRAND_PRIX.json');
const MONACO_GRAND_PRIX = require('./data/grand_prix/MONACO_GRAND_PRIX.json');
const PORTUGUESE_GRAND_PRIX = require('./data/grand_prix/PORTUGUESE_GRAND_PRIX.json');
const QATAR_GRAND_PRIX = require('./data/grand_prix/QATAR_GRAND_PRIX.json');
const RUSSIAN_GRAND_PRIX = require('./data/grand_prix/RUSSIAN_GRAND_PRIX.json');
const SAKHIR_GRAND_PRIX = require('./data/grand_prix/SAKHIR_GRAND_PRIX.json');
const SAUDI_ARABIAN_GRAND_PRIX = require('./data/grand_prix/SAUDI_ARABIAN_GRAND_PRIX.json');
const SINGAPORE_GRAND_PRIX = require('./data/grand_prix/SINGAPORE_GRAND_PRIX.json');
const SPANISH_GRAND_PRIX = require('./data/grand_prix/SPANISH_GRAND_PRIX.json');
const TURKISH_GRAND_PRIX = require('./data/grand_prix/TURKISH_GRAND_PRIX.json');
const TUSCAN_GRAND_PRIX = require('./data/grand_prix/TUSCAN_GRAND_PRIX.json');
const UNITED_STATES_GRAND_PRIX = require('./data/grand_prix/UNITED_STATES_GRAND_PRIX.json');

const TEAM_COLOR = require('./data/colors/TEAM_COLOR.json');

const TEAM_LOGOS = {
    'alfa-romeo': './data/logos/alfa-romeo.svg',
    'alphatauri': './data/logos/alphatauri.svg',
    'alpine-f1-team': './data/logos/alpine.svg',
    'aston-martin': './data/logos/aston-martin.svg',
    'ferrari': './data/logos/ferrari.svg',
    'haas-f1-team': './data/logos/haas-f1-team.svg',
    'mclaren': './data/logos/mclaren.svg',
    'mercedes': './data/logos/mercedes.svg',
    'red-bull': './data/logos/red-bull.svg',
    'williams': './data/logos/williams.svg',
}

const GRAND_PRIX_DATA = {
    'abu-dhabi': ABU_DHABI_GRAND_PRIX,
    'australian': AUSTRALIAN_GRAND_PRIX,
    'austrian': AUSTRIAN_GRAND_PRIX,
    'azerbaijan': AZERBAIJAN_GRAND_PRIX,
    'bahrain': BAHRAIN_GRAND_PRIX,
    'belgian': BELGIAN_GRAND_PRIX,
    'brazilian': BRAZILIAN_GRAND_PRIX,
    'british': BRITISH_GRAND_PRIX,
    'canadian': CANADIAN_GRAND_PRIX,
    'chinese': CHINESE_GRAND_PRIX,
    'dutch': DUTCH_GRAND_PRIX,
    'eifel': EIFEL_GRAND_PRIX,
    'emilia-romagna': EMILIA_ROMAGNA_GRAND_PRIX,
    'european': EUROPEAN_GRAND_PRIX,
    'french': FRENCH_GRAND_PRIX,
    'german': GERMAN_GRAND_PRIX,
    'hungarian': HUNGARIAN_GRAND_PRIX,
    'indian': INDIAN_GRAND_PRIX,
    'italian': ITALIAN_GRAND_PRIX,
    'japanese': JAPANESE_GRAND_PRIX,
    'korean': KOREAN_GRAND_PRIX,
    'malaysian': MALAYSIAN_GRAND_PRIX,
    'mexican': MEXICAN_GRAND_PRIX,
    'miami': MIAMI_GRAND_PRIX,
    'monaco': MONACO_GRAND_PRIX,
    'portuguese': PORTUGUESE_GRAND_PRIX,
    'qatar': QATAR_GRAND_PRIX,
    'russian': RUSSIAN_GRAND_PRIX,
    'sakhir': SAKHIR_GRAND_PRIX,
    'saudi-arabian': SAUDI_ARABIAN_GRAND_PRIX,
    'singapore': SINGAPORE_GRAND_PRIX,
    'spanish': SPANISH_GRAND_PRIX,
    'turkish': TURKISH_GRAND_PRIX,
    'tuscan': TUSCAN_GRAND_PRIX,
    'united-states': UNITED_STATES_GRAND_PRIX,
}

app.get('/', (req, res) => {
      res.json('Welcome to Pole Position Picks F1');
  });

  app.get('/average-results/:raceKey/:driver', (req, res) => {
    const { raceKey, driver } = req.params;

    if (GRAND_PRIX_DATA.hasOwnProperty(raceKey)) {
        const raceData = GRAND_PRIX_DATA[raceKey];
        if (raceData && typeof raceData === 'object') {
            const averageResults = calculateAverageResults(raceData, driver);
            res.json(averageResults);
        } else {
            res.status(400).json({ error: 'Invalid data structure for race' });
        }
    } else {
        res.status(404).json({ error: 'Race not found' });
    }
    });


function calculateAverageResults(driverData, driver) {
    const race = Object.keys(driverData);
    const raceName = race[0]
    const formattedDriver = driver.charAt(0).toUpperCase() + driver.slice(1).toLowerCase();

    if (driverData[raceName][formattedDriver]) {
        const results = driverData[raceName][formattedDriver];

        if (Array.isArray(results) && results.length > 0) {
            const average = (results.reduce((sum, result) => sum + result, 0) / results.length).toFixed(2);

            return { average };
        } else {
            return { error: 'No results available for the specified driver' };
        }
    } else {
        return { error: 'Driver not found in the race data' };
    }
}


app.get('/team-color/:team', (req, res) => {
    const { team } = req.params;

    if (TEAM_COLOR["TEAM_COLOR"].hasOwnProperty(team)) {
        const color = TEAM_COLOR["TEAM_COLOR"][team];

        if (color) {
            res.json(color);
        } else {
            res.status(400).json({ error: 'Invalid data structure for color' });
        }
    } else {
        res.status(404).json({ error: 'Color not found' });
    }
    });

    app.get('/team-logo/:team', (req, res) => {
        const { team } = req.params;
    
        if (TEAM_LOGOS.hasOwnProperty(team)) {
            const filePath = TEAM_LOGOS[team];
    
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'Error reading SVG file' });
                } else {
                    res.send(data);
                }
            });
        } else {
            res.status(404).json({ error: 'Team logo not found' });
        }
    });
    

  
const port = process.env.PORT ?? 3000;
app.listen(port, () =>  console.log(`Escuchando en puerto ${port}...`));
