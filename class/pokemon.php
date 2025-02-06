<?php
    class Pokemon{

        // conn
        private $conn;

        // table
        private $dbTable = "pokemon";

        // col
        public $id;
        public $name;
        public $hp;
        public $attack;
        public $defense;
        public $sp_attack;
        public $sp_defense;
        public $speed;

        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET pokemons
        public function getPokemons(){
            $sqlQuery = "SELECT id, name, hp, attack, defense, sp_attack, sp_defense, speed
               FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // Pagination
        public function getPokemonsPaginated($limit, $offset) {
            $sqlQuery = "SELECT * FROM " . $this->dbTable . " LIMIT :limit OFFSET :offset";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt;
        }
        
        // Calcul total
        public function getTotalPokemons() {
            $sqlQuery = "SELECT COUNT(*) as total FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['total'];
        }
        
        // CREATE pokemon
        public function createPokemon(){
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                    name = :name, 
                    hp = :hp, 
                    attack = :attack,
                    defense = :defense,
                    sp_attack = :sp_attack,
                    sp_defense = :sp_defense,
                    speed = :speed";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->hp=htmlspecialchars(strip_tags($this->hp));
            $this->attack=htmlspecialchars(strip_tags($this->attack));
            $this->defense=htmlspecialchars(strip_tags($this->defense));
            $this->sp_attack=htmlspecialchars(strip_tags($this->sp_attack));
            $this->sp_defense=htmlspecialchars(strip_tags($this->sp_defense));
            $this->speed=htmlspecialchars(strip_tags($this->speed));

            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":hp", $this->hp);
            $stmt->bindParam(":attack", $this->attack);
            $stmt->bindParam(":defense", $this->defense);
            $stmt->bindParam(":sp_attack", $this->sp_attack);
            $stmt->bindParam(":sp_defense", $this->sp_defense);
            $stmt->bindParam(":speed", $this->speed);

        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

       // GET un pokemon
       public function getOnePokemon(){
        $sqlQuery = "SELECT
                    id, 
                    name,
                    hp, 
                    attack, 
                    defense,
                    sp_attack,
                    sp_defense,
                    speed
                  FROM
                    ". $this->dbTable ."
                WHERE 
                   id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->name = $dataRow['name'];
        $this->hp = $dataRow['hp'];
        $this->attack = $dataRow['attack'];
        $this->defense = $dataRow['defense'];
        $this->sp_attack = $dataRow['sp_attack'];
        $this->sp_defense = $dataRow['sp_defense'];
        $this->speed = $dataRow['speed'];

    }      
        

        // UPDATE pokemon
        public function updatePokemon(){
            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                    name = :name, 
                    hp = :hp, 
                    attack = :attack,
                    defense = :defense,
                    sp_attack = :sp_attack,
                    sp_defense = :sp_defense,
                    speed = :speed
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->hp=htmlspecialchars(strip_tags($this->hp));
            $this->attack=htmlspecialchars(strip_tags($this->attack));
            $this->defense=htmlspecialchars(strip_tags($this->defense));
            $this->sp_attack=htmlspecialchars(strip_tags($this->sp_attack));
            $this->sp_defense=htmlspecialchars(strip_tags($this->sp_defense));
            $this->speed=htmlspecialchars(strip_tags($this->speed));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":hp", $this->hp);
            $stmt->bindParam(":attack", $this->attack);
            $stmt->bindParam(":defense", $this->defense);
            $stmt->bindParam(":sp_attack", $this->sp_attack);
            $stmt->bindParam(":sp_defense", $this->sp_defense);
            $stmt->bindParam(":speed", $this->speed);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE pokemon
        function deletePokemon(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>