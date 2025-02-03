/**
 * Suppression d'un pokemon
 */
async function deletePokemon(id) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce Pokémon ?");
    if (!confirmation) return;

    try {
        const response = await fetch(`https://my-json-server.typicode.com/Jmini00/fake-api/pokemons/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert("Le Pokémon a été supprimé avec succès !");
            // Optionnel : redirige ou met à jour l'interface
            //const pokemonElement = document.querySelector(`#pokemon-${id}`);
            //if (pokemonElement) pokemonElement.remove(); // Supprime le Pokémon du DOM
            window.location.href = "index.html"; // Exemple : redirection vers la page d'accueil
        } else {
            const errorData = await response.json();
            alert("Erreur : " + errorData.message || "Impossible de supprimer le Pokémon.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
}

// Exemple d'appel à la fonction
deletePokemon(idPokemon);