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

$api = new Behance($config->get('behance.clientId'));
$api->render();