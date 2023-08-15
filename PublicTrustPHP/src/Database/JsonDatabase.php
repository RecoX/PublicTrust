<?php
require_once 'DatabaseInterface.php';

class JsonDatabase implements DatabaseInterface {
    private $dataPath;
    
    public function __construct($dataPath) {
        $this->dataPath = $dataPath;
    }
    
    public function fetchUserById($id) {
        $jsonData = file_get_contents($this->dataPath);
        $users = json_decode($jsonData, true);
        foreach ($users as $user) {
            if ($user['id'] == $id) {
                return $user;
            }
        }
        return null;
    }
}
