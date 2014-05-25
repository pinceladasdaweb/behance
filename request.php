<?php

require_once( './api/Api.php' );

$user      = isset($_GET['user']) ? $_GET['user'] : NULL;
$client_id = '<YOUR CLIENT ID HERE>';

$api = new Behance_Api( $client_id );

$a = json_decode($api->getUserProfile( $user ), true);
$b = json_decode($api->getUserProjects( $user ), true);
$merged = array();

$merged = array_merge($a, $b);

$json = json_encode($merged);

echo $json;