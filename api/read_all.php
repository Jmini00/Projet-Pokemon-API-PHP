<?php
header("Access-Control-Allow-Origin: *");
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
    }
    ?>