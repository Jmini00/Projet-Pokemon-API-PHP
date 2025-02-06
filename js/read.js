/**
 * Sélectionner les données issues d'une BDD
 */

/*async function readPokemons() {
    try {
        const response = await fetch('api/read.php');
        const pokemons = await response.json();
            const grid = document.getElementById('pokemons-grid');
            const template = document.getElementById('pokemon-template').content;
            const ul = document.querySelector('section ul');

            // Exécute le code dans X millisecondes
            setTimeout(() => {
                // Masquer le loader
                document.querySelector('.loader').classList.add('hide')
                grid.style.animation = "fadeIn 4s";
                ul.style.animation = "fadeIn 3s";
                
        pokemons.forEach(pokemon => {
            const pokemonNode = document.importNode(template, true)
            pokemonNode.querySelector('.myCard').id = `pokemon-${pokemon.id}`
            pokemonNode.querySelector('.card-img-top').src = `assets/img/images/${pokemon.id}.png`
            pokemonNode.querySelector('.card-img-top').alt = `Pokemon ${pokemon.name}`
            pokemonNode.querySelector('.card-img-top').title = `#${pokemon.id} ${pokemon.name}` 
            pokemonNode.querySelector('.pokemon').href = `pokemon.html?id=${pokemon.id}`

            pokemonNode.querySelector('.card-title').textContent = `#${pokemon.id} ${pokemon.name}`
            pokemonNode.querySelector('.card-text-hp').textContent = `HP : ${pokemon.hp}`
            pokemonNode.querySelector('.card-text-attack').textContent = `Attaque : ${pokemon.attack}`
            pokemonNode.querySelector('.card-text-defense').textContent = `Defense : ${pokemon.defense}`
            pokemonNode.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${pokemon.sp_attack}`
            pokemonNode.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${pokemon.sp_defense}`
            pokemonNode.querySelector('.card-text-speed').textContent = `Vitesse : ${pokemon.speed}`

            //const ul = document.querySelector('section ul')
            const li = document.createElement('li')
            li.innerHTML = `<a href="pokemon.html?id=${pokemon.id}"><img class="img" src="assets/img/thumbnails/${pokemon.id}.png" alt="${pokemon.name}" title="${pokemon.name}" width="40"></a>`

            grid.appendChild(pokemonNode)
            ul.appendChild(li)
        })
        // Lance le moteur de recherche une fois que les cartes sont générées
        searchPokemon();
    },3000)
    clearTimeout();

    } catch (error) {
        console.error('Erreur:', error);
    }
}

readPokemons();*/

/**
 * Moteur de recherche par nom
 */
function searchPokemon() {
    const search = document.getElementById('search');
    const pokemonCards = document.querySelectorAll('#pokemons-grid .myCard');
    const pokemonLists = document.querySelectorAll('section ul li');

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase().trim();

        pokemonCards.forEach(pokemonCard => {
            const pokemonName = pokemonCard.querySelector('.card-title').textContent.toLowerCase();
            // Vérifie si l'artiste correspond à la recherche
            if (pokemonName.includes(query)) {
                pokemonCard.style.display = ''; // Affiche la carte
                //pokemonCard.classList.remove('hidden');
                //pokemonCard.classList.add('visible');
            } else {
                pokemonCard.style.display = 'none'; // Masque la carte
                //pokemonCard.classList.remove('visible');
                //pokemonCard.classList.add('hidden');
            }
        });

        pokemonLists.forEach(pokemonList => {
            const pokemonLiName = pokemonList.querySelector('.img').title.toLowerCase();
            
            if (pokemonLiName.includes(query)) {
                pokemonList.style.display = '';
            } else {
                pokemonList.style.display = 'none';
            }
        })
    });
}


/**
 * Affichage des Pokemons avec pagination
 */
//let currentPage = 1;
const limit = 10;

// Récupére la page dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const pageFromURL = parseInt(urlParams.get('page')) || 1; // Utilise 1 si aucun paramètre n'est présent
let currentPage = pageFromURL;

async function fetchPokemons(page = 1, limit = 10) {
    try {
        const response = await fetch(`api/read.php?page=${page}&limit=${limit}`);
        const result = await response.json();

        if (result.data && result.pagination) {
            displayPokemons(result.data);
            displayPagination(result.pagination);
        } else {
            console.error("Aucun Pokémon trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
    }
}


function displayPokemons(pokemons) {
    const grid = document.getElementById('pokemons-grid');
            const template = document.getElementById('pokemon-template').content;
            const ul = document.querySelector('section ul');

            grid.innerHTML = ""; // Réinitialise la grille
            ul.innerHTML = ""; // Réinitialise la liste

            // Exécute le code dans X millisecondes
            setTimeout(() => {
                // Masquer le loader
                document.querySelector('.loader').classList.add('hide')
                grid.style.animation = "fadeIn 4s";
                ul.style.animation = "fadeIn 3s";
                
        pokemons.forEach(pokemon => {
            const pokemonNode = document.importNode(template, true)
            pokemonNode.querySelector('.myCard').id = `pokemon-${pokemon.id}`
            pokemonNode.querySelector('.card-img-top').src = `assets/img/images/${pokemon.id}.png`
            pokemonNode.querySelector('.card-img-top').alt = `Pokemon ${pokemon.name}`
            pokemonNode.querySelector('.card-img-top').title = `#${pokemon.id} ${pokemon.name}` 
            pokemonNode.querySelector('.pokemon').href = `pokemon.html?id=${pokemon.id}`

            pokemonNode.querySelector('.card-title').textContent = `#${pokemon.id} ${pokemon.name}`
            pokemonNode.querySelector('.card-text-hp').textContent = `HP : ${pokemon.hp}`
            pokemonNode.querySelector('.card-text-attack').textContent = `Attaque : ${pokemon.attack}`
            pokemonNode.querySelector('.card-text-defense').textContent = `Defense : ${pokemon.defense}`
            pokemonNode.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${pokemon.sp_attack}`
            pokemonNode.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${pokemon.sp_defense}`
            pokemonNode.querySelector('.card-text-speed').textContent = `Vitesse : ${pokemon.speed}`

            //const ul = document.querySelector('section ul')
            const li = document.createElement('li')
            li.innerHTML = `<a href="pokemon.html?id=${pokemon.id}"><img class="img" src="assets/img/thumbnails/${pokemon.id}.png" alt="${pokemon.name}" title="${pokemon.name}" width="40"></a>`

            grid.appendChild(pokemonNode)
            ul.appendChild(li)
    })
    // Lance le moteur de recherche une fois que les cartes sont générées
    searchPokemon();
},3000)
clearTimeout();
}


function updateURL(page) {
    const url = new URL(window.location);
    url.searchParams.set('page', page); // Met à jour ou ajoute le paramètre `page`
    history.pushState({}, '', url); // Modifie l'URL sans recharger la page
}

function displayPagination(pagination) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = "";

    // Bouton "Précédent"
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${pagination.page === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    prevLi.addEventListener('click', () => {
        if (pagination.page > 1) {
            currentPage -= 1;
            fetchPokemons(currentPage, limit);
            updateURL(currentPage); // Met à jour l'URL
        }
    });
    paginationContainer.appendChild(prevLi);

    // Boutons de pages
    for (let i = 1; i <= pagination.pages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === pagination.page ? 'active' : ''}`;
        pageLi.innerHTML = `
            <a class="page-link" href="#">${i}</a>
        `;
        pageLi.addEventListener('click', () => {
            currentPage = i;
            fetchPokemons(currentPage, limit);
            updateURL(currentPage); // Met à jour l'URL
        });
        paginationContainer.appendChild(pageLi);
    }

    // Bouton "Suivant"
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`;
    nextLi.innerHTML = `
        <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    nextLi.addEventListener('click', () => {
        if (pagination.page < pagination.pages) {
            currentPage += 1;
            fetchPokemons(currentPage, limit);
            updateURL(currentPage); // Met à jour l'URL
        }
    });
    paginationContainer.appendChild(nextLi);
}

// Initial Fetch
fetchPokemons(currentPage, limit);
