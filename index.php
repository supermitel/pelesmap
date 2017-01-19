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
    <link rel="stylesheet" href="/vendor/components/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="/vendor/drmonty/ekko-lightbox/css/ekko-lightbox.css"/>
    <script src="/snap.svg.js"></script>
    <script src="/vendor/components/jquery/jquery.js"></script>
    <script src="/vendor/components/bootstrap/js/bootstrap.js"></script>
    <!-- <script src="/vendor/drmonty/ekko-lightbox/js/ekko-lightbox.js"></script> -->
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/grid.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/version.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/detector.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/formatinf.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/errorlevel.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/bitmat.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/datablock.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/bmparser.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/datamask.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/rsdecoder.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/gf256poly.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/gf256.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/decoder.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/qrcode.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/findpat.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/alignpat.js"></script>
    <script type="text/javascript" src="vendor/mindweb/jsqrcode/src/databr.js"></script>
    <script src="app.js"></script>
</head>
<body>
    <div class="wrapper">
        <div class="mapContainer">
            <object type="image/svg+xml" data="Assets/demomap.svg" id = "map" style="width: 100%">
            </object>
            <div class = "infoPanel">
                <h1 id = "roomName"></h1>
                <p id = "roomDescription"></p>
                <img id = "roomMainPicture" style="width: 480px; height: auto;">
            </div>

            <div id="locationModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Scan the room QRcode or enter it below</h4>
                        </div>
                        <div class="modal-body">
                            <video autoplay="true" id="qrPreview">

                            </video>
                            <canvas id = "secretCanvas"></canvas>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</body>
