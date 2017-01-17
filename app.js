/**
 * Created by root on 11.01.2017.
 */
$(document).ready(function () {
    $(window).on('load', function (e) {
        var svgdoc = document.getElementById("map").contentDocument;

        var rooms=[];
        var snapMap = Snap(svgdoc);

        try{
            for(var i = 1; i <= 21; i++){
                // console.log("gettig: " + "#Room"+("0"+i).slice(-2));

                rooms[i] = snapMap.select("#Room"+("0"+i).slice(-2)).addClass("room");

                rooms[i].click(function () {
                    try{snapMap.select(".selected").removeClass("selected");}catch(e){};
                    this.addClass("selected");
                    selectRoom(this);
                })
                rooms[i].mouseover(function () {
                    this.animate({fill:"white", opacity:"0.5"}, 200);
                })
                rooms[i].mouseout(function () {
                    this.animate({fill:"white", opacity:"0.1"}, 200);
                })
            }
        }
        catch (e){
            alert(e);
        }

        var selectRoom = function (room) {

        }

        var locationButton = snapMap.select("#location");
        locationButton.mouseover(function () {
            this.animate({fill:"red", opacity:"0.9"}, 100);
        })
        locationButton.mouseout(function () {
            this.animate({fill:"black", opacity:"0.9"}, 100);
        })
        locationButton.click(function (e) {
            $("#locationModal").modal('toggle');
        })

       // var video = $('#qrPreview')
        var video = document.querySelector("#qrPreview");
        var savedStream = null;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        $('#locationModal').on('show.bs.modal', function () {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({video:{ facingMode: "environment" }}, handleVideo, videoError);
                }
        })


        function handleVideo(stream) {
            savedStream = stream;
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            console.log(e);
        }
        $('#locationModal').on('hidden.bs.modal', function () {
            var track = savedStream.getTracks()[0];  // if only one media track
            track.stop();
        })
    });

})