/**
 * Sélectionner les details d'un pokemon
 */

        const params = new URLSearchParams(window.location.search)
        const idPokemon = params.get('id')

async function readSinglePokemon(id) {
    try {
        
        const pokemonResponse = await fetch(`api/single_pokemon.php?id=${id}`);
        const pokemon = await pokemonResponse.json();
 
        const template = document.querySelector('#pokemon-template').content
        const pokemonDetail = document.importNode(template, true)
        const formUpdate = document.querySelector('#update-pokemon-form')

        pokemonDetail.querySelector('.pokemonCard').id = `pokemon-${pokemon.id}`
        pokemonDetail.querySelector('.img-fluid').src = `assets/img/images/${pokemon.id}.png`
        pokemonDetail.querySelector('.img-fluid').alt = pokemon.name
        pokemonDetail.querySelector('.img-fluid').title = `#${pokemon.id} ${pokemon.name}`
        pokemonDetail.querySelector('.card-title').textContent = `#${pokemon.id} ${pokemon.name}`
        pokemonDetail.querySelector('.card-text-hp').textContent = `HP : ${pokemon.hp}`
        pokemonDetail.querySelector('.card-text-attack').textContent = `Attaque : ${pokemon.attack}`
        pokemonDetail.querySelector('.card-text-defense').textContent = `Defense : ${pokemon.defense}`
        pokemonDetail.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${pokemon.sp_attack}`
        pokemonDetail.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${pokemon.sp_defense}`
        pokemonDetail.querySelector('.card-text-speed').textContent = `Vitesse : ${pokemon.speed}`

        formUpdate.querySelector('#name').value = `${pokemon.name}`
        formUpdate.querySelector('#hp').value = `${pokemon.hp}`
        formUpdate.querySelector('#attack').value = `${pokemon.attack}`
        formUpdate.querySelector('#defense').value = `${pokemon.defense}`
        formUpdate.querySelector('#spattack').value = `${pokemon.sp_attack}`
        formUpdate.querySelector('#spdefense').value = `${pokemon.sp_defense}`
        formUpdate.querySelector('#speed').value = `${pokemon.speed}`

        document.querySelector('#pokemons-grid').appendChild(pokemonDetail)

    }catch (error) {
        console.error('Erreur:', error);
    }
}

readSinglePokemon(idPokemon);


async function readPokemonsSprites() {
    try {
        const response = await fetch('api/read.php');
        const pokemons = await response.json();
            const ul = document.querySelector('section ul');

        pokemons.forEach(pokemon => {

            const li = document.createElement('li')
            li.innerHTML = `<a href="pokemon.html?id=${pokemon.id}"><img src="assets/img/thumbnails/${pokemon.id}.png" alt="${pokemon.name}" title="${pokemon.name}" width="40"></a>`

            ul.appendChild(li)
        })
    
    } catch (error) {
        console.error('Erreur:', error);
    }
}

readPokemonsSprites();

/*const params = new URLSearchParams(window.location.search)
const idPokemon = params.get('id')
fetch(`single_pokemon.php?id=${idPokemon}`)
    .then(response => response.json())
    .then(pokemon => {
        const template = document.querySelector('#pokemon-template').content
        const pokemonDetail = document.importNode(template, true)

        pokemonDetail.querySelector('.img-fluid').src = `assets/img/images/${pokemon.id}.png`
        pokemonDetail.querySelector('.img-fluid').alt = pokemon.name
        pokemonDetail.querySelector('.img-fluid').title = `#${pokemon.id} ${pokemon.name}`
        pokemonDetail.querySelector('.card-title').textContent = `#${pokemon.id} ${pokemon.name}`
        pokemonDetail.querySelector('.card-text-hp').textContent = `HP : ${pokemon.hp}`
        pokemonDetail.querySelector('.card-text-attack').textContent = `Attaque : ${pokemon.attack}`
        pokemonDetail.querySelector('.card-text-defense').textContent = `Defense : ${pokemon.defense}`
        pokemonDetail.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${pokemon.sp_attack}`
        pokemonDetail.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${pokemon.sp_defense}`
        pokemonDetail.querySelector('.card-text-speed').textContent = `Vitesse : ${pokemon.speed}`

        document.querySelector('#pokemons-grid').appendChild(pokemonDetail)
    })
    .catch(error => console.error(error))*/
