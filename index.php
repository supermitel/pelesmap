<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 10.01.2017
 * Time: 14:46
 */

require __DIR__ . '/vendor/autoload.php';
?>

<!DOCTYPE html>
<head>
    <title>PelesMap</title>
    <meta charset="UTF-16">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="globalstyle.css"/>
    <script src="/snap.svg.js"></script>
    <script src="/vendor/components/jquery/jquery.js"></script>
    <script src="app.js"></script>
    <script src="/vendor/components/angular.js"></script>
</head>
<body>
    <div class="wrapper">
        <div class="mapContainer">
            <object type="image/svg+xml" data="Assets/demomap.svg" id = "map" style="width: 100%">
            </object>
            <div class = "infoPanel">

            </div>
        </div>
    </div>
</body>
