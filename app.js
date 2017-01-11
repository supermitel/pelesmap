/**
 * Created by root on 11.01.2017.
 */
$(document).ready(function () {

    $(window).on('load', function (e) {
        var svgdoc = document.getElementById("map").contentDocument;
        //console.log(svgdoc);

        var rooms=[];
        var snapMap = Snap(svgdoc);

       // console.log(snapMap);

        var setupF = function () {
            try{
                for(var i = 1; i <= 21; i++){
                    // console.log("gettig: " + "#Room"+("0"+i).slice(-2));

                    rooms[i] = snapMap.select("#Room"+("0"+i).slice(-2)).addClass("room");

                    rooms[i].click(function () {
                        try{snapMap.select(".selected").removeClass("selected");}catch(e){};
                        this.addClass("selected");
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

        }

        setupF();
    });

})