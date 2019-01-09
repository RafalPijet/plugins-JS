"use strict";
(function() {
    var elem = document.querySelector(".main-carousel");
    var restartButton = document.querySelector(".restart");
    var progressBar = document.querySelector(".progress-bar");
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