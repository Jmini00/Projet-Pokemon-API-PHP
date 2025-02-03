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

    $item->name = $data->name;
    $item->hp = $data->hp;
    $item->attack = $data->attack;
    $item->defense = $data->defense;
    $item->sp_attack = $data->sp_attack;
    $item->sp_defense = $data->sp_defense;
    $item->speed = $data->speed;

    if($item->createPokemon()){
        echo json_encode("Nouveau Pokemon enregistré");
    } else{
        echo json_encode("Erreur à l'ajout du nouveau Pokemon");
    }
?>