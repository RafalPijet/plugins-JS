"use strict";
(function() {
    var elem = document.querySelector(".main-carousel");
    var result = document.getElementById("carousel");
    var restartButton = document.querySelector(".restart");
    var progressBar = document.querySelector(".progress-bar");
    var template = document.getElementById("template-slide-item").innerHTML;
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

    flkty.on("scroll", function(progress) {
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + "%";
    })

})();