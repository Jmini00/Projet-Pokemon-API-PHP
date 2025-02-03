<?php
 
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
 header("Access-Control-Max-Age: 3600");
 header("Access-Control-Allow-Headers: Content-Type,
    Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

    include_once '../database/database.php';
    include_once '../class/pokemon.php';
    
    $database = new DB();
    $db = $database->getConnection();
    
    $item = new Pokemon($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    $item->name = $data->name;
    $item->hp = $data->hp;
    $item->attack = $data->attack;
    $item->defense = $data->defense;
    $item->sp_attack = $data->sp_attack;
    $item->sp_defense = $data->sp_defense;
    $item->speed = $data->speed;

    
    if($item->updatePokemon()){
        echo json_encode("Pokemon mis à jour");
    } else{
        echo json_encode("Mise à jour du Pokemon impossible");
    }
?>