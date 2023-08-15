<?php
require_once './src/Database/JsonDatabase.php';
require_once './src/Helpers/AnonymizerHelper.php';
require_once './src/Services/UserService.php';

$jsonDatabase = new JsonDatabase('Users.json');
$userService = new UserService($jsonDatabase);

$userId = mt_rand(1, 3);
$anonymizedUser = $userService->fetchAndAnonymizeUser($userId);

if ($anonymizedUser) {
    print_r($anonymizedUser);
} else {
    echo "User not found.";
}
