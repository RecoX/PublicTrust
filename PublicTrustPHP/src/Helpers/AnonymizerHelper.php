<?php
function anonymizeEmail($email) {
    $parts = explode('@', $email);
    $username = $parts[0];
    $domain = $parts[1];
    $anonUsername = 'anonymous_' . substr(md5($username), 0, 4);
    $anonEmail = $anonUsername . '@' . $domain;
    return $anonEmail;
}
