$(document).ready(function(){
    var stickyNavTop = $('.sidebar').offset().top - 115;

    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('.sidebar').addClass('sticky');
            $('.header').addClass('mini-header');
        } else {
            $('.sidebar').removeClass('sticky');
            $('.header').removeClass('mini-header');
        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });
});