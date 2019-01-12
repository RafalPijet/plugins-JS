"use strict";
(function() {
    var elem = document.querySelector(".main-carousel");
    var result = document.getElementById("carousel");
    var restartButton = document.querySelector(".restart");
    var progressBar = document.querySelector(".progress-bar");
    var template = document.getElementById("template-slide-item").innerHTML;
    var map = null;
    var check = true;

    Mustache.parse(template);

    for (var i = 0; i < slideData.length; i++) {
        var generatedSlide = Mustache.render(template, slideData[i]);
        result.insertAdjacentHTML("beforeEnd", generatedSlide);
    }
    
    var flkty = new Flickity(elem, {
        cellAlign: "left",
        contain: true,
        hash: true,
        pageDots: false,
        imageLoaded: true,
        percentPosition: false
    });

    restartButton.addEventListener("click", function() {
        flkty.selectCell(0);
    })

    result.addEventListener("mousemove", function() {
        check = true;
    })

    flkty.on("scroll", function(progress) {
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + "%";
    })

    flkty.on("change", function (index) {
        if (check) {
            map.panTo(slideData[index].coords);
            map.setZoom(16);
        } else {
            map.setZoom(12);
        }
    })

    function createMarker(pos, i) {
        var marker = new google.maps.Marker({
            position: pos,
            map: map
        });

        google.maps.event.addListener(marker, "click", function () {
            check = false;
            map.setZoom(12);
            flkty.selectCell(i);
        });
    }

    window.initMap = function() {
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 12, center: slideData[0].coords});

        for (var i = 0; i < slideData.length; i++) {
            createMarker(slideData[i].coords, i);
        }
    }
})();