const params = new URLSearchParams(window.location.search);
const idPokemon = params.get('id');

// Fonction pour mettre à jour un Pokémon
async function updatePokemon(id, updatedData) {
    try {
        const response = await fetch(`https://my-json-server.typicode.com/Jmini00/fake-api/pokemons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            const result = await response.json();
            alert("Le Pokémon a été mis à jour avec succès !");
            console.log("Données mises à jour :", result);
            // Optionnel : Rediriger ou mettre à jour l'interface
        } else {
            const errorData = await response.json();
            alert("Erreur : " + errorData.message || "Impossible de mettre à jour le Pokémon.");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
}

// Exemple d'utilisation de la fonction
const updatedPokemonData = {
    name: "Pikachu",
    HP: 50,
    Attack: 55,
    Defense: 40,
    SpAttack: 50,
    SpDefense: 50,
    Speed: 90,
};

updatePokemon(idPokemon, updatedPokemonData);


document.getElementById('update-pokemon-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const updatedPokemonData = {
        name: document.getElementById('name').value.trim(),
        HP: parseInt(document.getElementById('hp').value, 10),
        Attack: parseInt(document.getElementById('attack').value, 10),
        Defense: parseInt(document.getElementById('defense').value, 10),
        SpAttack: parseInt(document.getElementById('spAttack').value, 10),
        SpDefense: parseInt(document.getElementById('spDefense').value, 10),
        Speed: parseInt(document.getElementById('speed').value, 10),
    };

    updatePokemon(idPokemon, updatedPokemonData);
});
