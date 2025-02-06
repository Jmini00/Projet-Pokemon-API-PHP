<?php

/*   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../database/database.php';
    include_once '../class/pokemon.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new Pokemon($db);

    $stmt = $items->getPokemons();
    $itemCount = $stmt->rowCount();

    if($itemCount > 0){
        
        $pokemonArr = array();
       

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "name" => $name,
                "hp" => $hp,
                "attack" => $attack,
                "defense" => $defense,
                "sp_attack" => $sp_attack,
                "sp_defense" => $sp_defense,
                "speed" => $speed

            );

            array_push($pokemonArr, $e);
        }
        echo json_encode($pokemonArr);
    }*/
    

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../database/database.php';
include_once '../class/pokemon.php';

$database = new DB();
$db = $database->getConnection();

$items = new Pokemon($db);

// Récupération des paramètres `page` et `limit`
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$offset = ($page - 1) * $limit;

$stmt = $items->getPokemonsPaginated($limit, $offset);
$totalPokemons = $items->getTotalPokemons(); // Une nouvelle méthode à ajouter pour récupérer le total

$itemCount = $stmt->rowCount();

if ($itemCount > 0) {
    $pokemonArr = array();
    $pokemonArr['data'] = array();
    $pokemonArr['pagination'] = array(
        'page' => $page,
        'limit' => $limit,
        'total' => $totalPokemons,
        'pages' => ceil($totalPokemons / $limit),
    );

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "name" => $name,
            "hp" => $hp,
            "attack" => $attack,
            "defense" => $defense,
            "sp_attack" => $sp_attack,
            "sp_defense" => $sp_defense,
            "speed" => $speed,
        );
        array_push($pokemonArr['data'], $e);
    }
    echo json_encode($pokemonArr);
} else {
    echo json_encode(["message" => "No Pokemons found."]);
}
?>
