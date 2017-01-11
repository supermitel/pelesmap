/**
 * Created by root on 11.01.2017.
 */
$(document).ready(function () {
    svgdoc = document.getElementById("map").contentDocument;
    //console.log(svgdoc);
    snapMap = Snap(svgdoc);
    var rooms=[];
    var aux=[];
    for(var i = 1; i <= 21; i++){
       // console.log("gettig: " + "#Room"+("0"+i).slice(-2));
        rooms[i] = snapMap.select("#Room"+("0"+i).slice(-2));
        rooms[i].addClass("room");
        rooms[i].click(function () {
            try{snapMap.select(".selected").removeClass("selected");}catch(e){};
            this.addClass("selected");
        })
    }
})