<?php

class UserService {
    private $database;
    
    public function __construct(DatabaseInterface $database) {
        $this->database = $database;
    }
    
    public function fetchAndAnonymizeUser($userId) {
        $user = $this->database->fetchUserById($userId);
        
        if ($user) {
            // Anonymize email address
            $user['email'] = anonymizeEmail($user['email']);
            return $user;
        }
        
        return null;
    }
}
