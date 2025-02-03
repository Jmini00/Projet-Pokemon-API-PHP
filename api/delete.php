<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, 
   Access-Control-Allow-Headers, Authorization, X-Requested-With");


   include_once '../database/database.php';
   include_once '../class/pokemon.php';

$database = new DB();
$db = $database->getConnection();

$item = new Pokemon($db);

$item->id = isset($_GET['id']) ? $_GET['id'] : die();

if($item->deletePokemon()){
echo json_encode("Pokemon supprimé");
} else{
echo json_encode("Suppression du Pokemon impossible");
}
?>