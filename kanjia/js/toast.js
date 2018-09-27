;
(function() {
    $.toast = function(text) {
        $("body").append($("<div class='toast'>" + text + "</div>"));
        $(".toast").fadeIn(300);
        setTimeout(function() {
            $(".toast").fadeOut(300);
            setTimeout(function() {
                $(".toast").remove()
            }, 300)
        }, 1000);
        $(document).on("click", ".toast", function() {
            $(this).fadeOut(300);
            setTimeout(function() {
                $(".toast").remove()
            }, 300)
        });
    }
})(jQuery);