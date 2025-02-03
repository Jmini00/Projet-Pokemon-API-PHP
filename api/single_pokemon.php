<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json;");
    
    include_once '../database/database.php';
    include_once '../class/pokemon.php';

    $database = new DB();
    $db = $database->getConnection();

    $item = new Pokemon($db);

    $item->id = isset($_GET['id']) ? $_GET['id'] : die();
  
    $item->getOnePokemon();

    if($item->name!= null){
        $pokemon_Arr = array(
            "id" =>  $item->id,
            "name" => $item->name,
            "hp" => $item->hp,
            "attack" => $item->attack,
            "defense" => $item->defense,
            "sp_attack" => $item->sp_attack,
            "sp_defense" => $item->sp_defense,
            "speed" => $item->speed

        );
      
        http_response_code(200);
        echo json_encode($pokemon_Arr);
    }
      
    else{
        http_response_code(404);
        echo json_encode("Pokemon introuvable");
    }
?>