/**
 * Insertion d'un pokemon
 */
document.getElementById('add-pokemon-form').addEventListener('submit', async function createPokemon() {
    
    const name = document.getElementById('name').value.trim();
    const HP = parseInt(document.getElementById('hp').value.trim());
    const attack = parseInt(document.getElementById('attack').value.trim());
    const defense = parseInt(document.getElementById('defense').value.trim());
    const spattack = parseInt(document.getElementById('spattack').value.trim());
    const spdefense = parseInt(document.getElementById('spdefense').value.trim());
    const speed = parseInt(document.getElementById('speed').value.trim());
    
    try {
        const response = await fetch('api/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                hp: HP,
                attack: attack,
                defense: defense,
                sp_attack: spattack,
                sp_defense: spdefense,
                speed: speed
            }),
        });

        if (response.ok) {
            const result = await response.json();
            //alert("Le Pokémon a été ajouté avec succès !");
            //console.log("Nouveau Pokémon ajouté :", result);

            // Vérifie si le serveur renvoie les données nécessaires
            if (!result || !result.id) {
                throw new Error("Les données retournées par le serveur sont incomplètes.");
            }

            // Actualiser l'interface ou rediriger
            const li = document.createElement('li')
            li.innerHTML = `<a href="pokemon.html?id=${result.id}"><img src="assets/img/thumbnails/${result.id}.png" alt="${name}" title="${name}" width="40"></a>`

            const template = document.getElementById('pokemon-template').content;
            const card = document.importNode(template, true);
            card.querySelector('.myCard').id = `pokemon-${result.id}`
            card.querySelector('.card-img-top').src = `assets/img/images/${result.id}.png`
            card.querySelector('.card-img-top').alt = `Pokemon ${name}`
            card.querySelector('.card-img-top').title = `#${result.id} ${name}` 
            card.querySelector('.pokemon').href = `pokemon.html?id=${result.id}`

            card.querySelector('.card-title').textContent = `#${result.id} ${name}`
            card.querySelector('.card-text-hp').textContent = `HP : ${HP}`
            card.querySelector('.card-text-attack').textContent = `Attaque : ${attack}`
            card.querySelector('.card-text-defense').textContent = `Defense : ${defense}`
            card.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${spattack}`
            card.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${spdefense}`
            card.querySelector('.card-text-speed').textContent = `Vitesse : ${speed}`

            document.querySelector('section ul').appendChild(li);
            document.querySelector('#pokemons-grid').appendChild(card);

            // Réinitialiser le formulaire
            document.getElementById('add-pokemon-form').reset();

            // Afficher une alerte de succès
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bravo',
                text: 'Pokemon ajouté avec succès !',
                showConfirmButton: false,
                timer: 2000,
            });

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Erreur',
                text: data.message || "Une erreur s'est produite lors de l'ajout du vinyle.",
                showConfirmButton: true,
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
    }
});

//createPokemon();

// Exemple d'utilisation de la fonction
/*const newPokemonData = {
    name: "Bulbasaur",
    HP: 45,
    Attack: 49,
    Defense: 49,
    SpAttack: 65,
    SpDefense: 65,
    Speed: 45,
};*/

/*addPokemon(newPokemonData);*/

/*
document.getElementById('add-pokemon-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const HP = parseInt(document.getElementById('hp').value.trim());
    const attack = parseInt(document.getElementById('attack').value.trim());
    const defense = parseInt(document.getElementById('defense').value.trim());
    const spattack = parseInt(document.getElementById('spattack').value.trim());
    const spdefense = parseInt(document.getElementById('spdefense').value.trim());
    const speed = parseInt(document.getElementById('speed').value.trim());

    fetch('api/create.php', {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
                hp: HP,
                attack: attack,
                defense: defense,
                sp_attack: spattack,
                sp_defense: spdefense,
                speed: speed
        })
        })

        .then(response => response.json())
        .then(data => {
        
        if(data && data.id) {
            const li = document.createElement('li')
            li.innerHTML = `<a href="pokemon.html?id=${data.id}"><img src="assets/img/thumbnails/${data.id}.png" alt="${name}" title="${name}" width="40"></a>`

            const template = document.getElementById('pokemon-template').content;
            const card = document.importNode(template, true);
            card.querySelector('.myCard').id = `pokemon-${data.id}`
            card.querySelector('.card-img-top').src = `assets/img/images/${data.id}.png`
            card.querySelector('.card-img-top').alt = `Pokemon ${name}`
            card.querySelector('.card-img-top').title = `#${data.id} ${name}` 
            card.querySelector('.pokemon').href = `pokemon.html?id=${data.id}`

            card.querySelector('.card-title').textContent = `#${data.id} ${name}`
            card.querySelector('.card-text-hp').textContent = `HP : ${HP}`
            card.querySelector('.card-text-attack').textContent = `Attaque : ${attack}`
            card.querySelector('.card-text-defense').textContent = `Defense : ${defense}`
            card.querySelector('.card-text-spattack').textContent = `Attaque Spéciale : ${spattack}`
            card.querySelector('.card-text-spdefense').textContent = `Défense Spéciale : ${spdefense}`
            card.querySelector('.card-text-speed').textContent = `Vitesse : ${speed}`

            document.querySelector('section ul').appendChild(li);
            document.querySelector('#pokemons-grid').appendChild(card);

            // Réinitialiser le formulaire
            document.getElementById('add-pokemon-form').reset();

            // Afficher une alerte de succès
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bravo',
                text: 'Pokemon ajouté avec succès !',
                showConfirmButton: false,
                timer: 2000,
            });

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Erreur',
                text: data.message || "Une erreur s'est produite lors de l'ajout du vinyle.",
                showConfirmButton: true,
            });
        }
    }) .catch(error => console.error(error))
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de soumettre le formulaire pour le moment.',
            showConfirmButton: true,
        });
    }
);*/

