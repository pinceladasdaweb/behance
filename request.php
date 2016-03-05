<?php

require_once './vendor/autoload.php';

$helperLoader  = new SplClassLoader('Helpers', './vendor');
$behanceLoader = new SplClassLoader('Behance', './vendor');

$helperLoader->register();
$behanceLoader->register();

use Helpers\Config;
use Behance\Behance;

$config = new Config;
$config->load('./config/config.php');

$api  = new Behance($config->get('behance.clientId'));
$user = isset($_GET['user']) ? $_GET['user'] : '';

$a = json_decode($api->getUserProfile( $user ), true);
$b = json_decode($api->getUserProjects( $user ), true);

$merged = array();
$merged = array_merge($a, $b);
$json   = json_encode($merged);

header('Content-type: application/json');

echo $json;