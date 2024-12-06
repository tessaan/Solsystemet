const API_BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
let apiNyckel = ''; // API-nyckel som hämtas från servern

// Hämtar API-nyckeln från servern
async function hämtaApiNyckel() {
    const respons = await fetch(`${API_BASE_URL}/keys`, { method: 'POST' });
    const data = await respons.json();
    apiNyckel = data.key;
    console.log('API-nyckel:', apiNyckel);
    hämtaHimlakroppar();
}

// Hämtar data om himlakroppar från API:et
async function hämtaHimlakroppar() {
    if (!apiNyckel) return;
    const respons = await fetch(`${API_BASE_URL}/bodies`, {
        method: 'GET',
        headers: {
            'x-zocom': apiNyckel,
        },
    });
    const data = await respons.json();
    visaHimlakroppar(data.bodies);
}

// Visar himlakroppar på sidan
function visaHimlakroppar(himlakroppar) {
    const innehåll = document.getElementById('content');
    innehåll.innerHTML = ''; // Rensar tidigare innehåll

    himlakroppar.forEach(kropp => {
        const kort = document.createElement('div');
        kort.className = 'himlakropp';
        kort.innerHTML = `
            <h2>${kropp.name}</h2>
            <p>Typ: ${kropp.type}</p>
            <p>Avstånd från solen: ${kropp.distance} km</p>
        `;
        innehåll.appendChild(kort);
    });
}

// Sökfunktion för att filtrera himlakroppar efter namn
function sökHimlakroppar() {
    const sökning = document.getElementById('sökfält').value.toLowerCase();
    const allaKort = document.querySelectorAll('.himlakropp');
    allaKort.forEach(kort => {
        const namn = kort.querySelector('h2').textContent.toLowerCase();
        kort.style.display = namn.includes(sökning) ? '' : 'none';
    });
}

// Anropa funktionen för att hämta API-nyckeln
hämtaApiNyckel();
