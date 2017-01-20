/**
 * Created by root on 11.01.2017.
 */
$(document).ready(function () {
    $(window).on('load', function (e) {
        var svgdoc = document.getElementById("map").contentDocument;

        var rooms=[];
        var snapMap = Snap(svgdoc);

        var castleInfo = null;
        $.getJSON( "/Data/castledata.json", function( data ) {
            castleInfo = data;
            updateRoomData(castleInfo);
        });

        var currentLevel = 1;
        var currentRoomInfo = null;

        try{
            for(var i = 1; i <= 21; i++){
                // console.log("gettig: " + "#Room"+("0"+i).slice(-2));

                rooms[i] = snapMap.select("#Room"+("0"+i).slice(-2)).addClass("room");
                rooms[i].roomNumber = i;

                rooms[i].click(function () {
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

        var getRoomInfo = function (level, room) {
            var levelId = "L"+("0"+level).slice(-2);
            var roomId = levelId + "R"+("0"+room).slice(-2);
            var levelInfo = castleInfo.levels[level-1];
            for(var r in levelInfo.rooms){
                if(levelInfo.rooms[r].id == roomId)
                    return levelInfo.rooms[r];
            }
            return null;
        }
        
        var updateRoomData = function (room) {
            $("#roomName").text(room.name);
            $("#roomDescription").text(decodeURI(room.description));
            $("#roomMainPicture").attr('src', room.pictures[0].url);
            $("#roomMainPictureContainer").attr('href', room.pictures[0].url);
            $('#roomSmallPictures').empty();
            $('#exhibitPictures').empty();
            for(var i = 1; i < room.pictures.length; i++){
                    var newPictureContainer = $('<a class="col-sm-3" data-toggle="lightbox" data-gallery="room">').attr('href', room.pictures[i].url);
                    var newPicture = $('<img class="img-fluid">').attr('src', room.pictures[i].url).attr('alt', room.pictures[i].label);
                    newPictureContainer.append(newPicture);
                    $('#roomSmallPictures').append(newPictureContainer);

            }
            for(var i = 0; i < room.exhibit.length; i++){
                var newPictureContainer = $('<a class="col-sm-2" data-toggle="lightbox" data-gallery="exhibit">').attr('href', room.exhibit[i].pictures[0].url);
                var newPicture = $('<img class="img-fluid">').attr('src', room.exhibit[i].pictures[0].url).attr('alt', room.exhibit[i].pictures[0].label);
                newPictureContainer.append(newPicture);
                $('#exhibitPictures').append(newPictureContainer);
            }
        }

        var selectRoom = function (room) {
            try{snapMap.select(".selected").removeClass("selected");}catch(e){};
            room.addClass("selected");
            if(castleInfo == null)
                return;
            //console.log(castleInfo);
            //TODO: treat castle name box as room for general info
            currentRoomInfo = getRoomInfo(currentLevel, room.roomNumber);
            updateRoomData(currentRoomInfo);

            $('html, body').animate({
                scrollTop: $("#infoPanel").offset().top
            }, 760);
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

        //var video = $('#qrPreview')
        var video = document.querySelector("#qrPreview");
        var savedStream = null;
        var live = false;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        $('#locationModal').on('show.bs.modal', function () {
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({video:{ facingMode: "environment" }}, handleVideo, videoError);
                }
        })

        function roomIdDecode(code) {
            currentLevel = code.split("R")[0].split("L")[1];
            return parseInt(code.split("R")[1]);
        }

        function handleVideo(stream) {
            savedStream = stream;
            video.src = window.URL.createObjectURL(stream);
            live = true;
            scanQR(function(data){
                //alert(data);
                var decoded = roomIdDecode(data);
                if(decoded == undefined)
                    alert(data + "not reconized as room code");
                selectRoom(rooms[decoded]);
            });
        }

        function videoError(e) {
            console.log(e);
        }
        $('#locationModal').on('hidden.bs.modal', function () {
            var track = savedStream.getTracks()[0];  // if only one media track
            track.stop();
            clearInterval(modalInterval);
            live= false;
        })

        var modalInterval;
        var canvas = $('#secretCanvas').get(0);
        var context = canvas.getContext('2d');
        var w = canvas.width, h = canvas.height;

        var scanQR = function (callback){
            var verif = null;
            modalInterval = setInterval(function () {
                if(live){
                    context.drawImage(video,0,0,w,h);
                    var uri = canvas.toDataURL("image/png"); // convert canvas to data URI
                    qrcode.callback = function(data){
                        if(data.split(" ")[0] != "error"){
                            if(data == verif)
                            {
                                $('#locationModal').modal('hide');
                                callback(data);
                            }
                            else
                                verif = data;
                        }
                    }
                    qrcode.decode(uri);
                }
               // console.log("kicking");
            }, 200)
        }
        $('#goTopButton').click(function () {
            $('html, body').animate({
                scrollTop: $("#mapContainer").offset().top
            }, 760);
        })

        $('#roomMainPicture').click(function () {
            openGallery(currentRoomInfo);
        })
        
        var openGallery = function () {

        }

        //$('body').css('background-image', 'url("/Assets/background.jpg")');
    
    });

    // LightBox stuff (for image gallery)

    $(document).on('click', '[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                if (window.console) {
                    return console.log('Checking our the events huh?');
                }
            },
            onNavigate: function(direction, itemIndex) {
                if (window.console) {
                    return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                }
            }
        });
    });
    //Programmatically call
    $('#open-image').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    $('#open-youtube').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    });
    // navigateTo
    $(document).on('click', '[data-toggle="lightbox"][data-gallery="navigateTo"]', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                this.modal().on('click', '.modal-footer a', function(e) {
                    e.preventDefault();
                    this.navigateTo(2);
                }.bind(this));
            }
        });
    });


})