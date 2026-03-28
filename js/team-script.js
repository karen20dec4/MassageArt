
$(function() {
    'use strict';

/*--------------------------------------------------------------
    Team section animation
--------------------------------------------------------------*/
    $('#left-1, #right-1, #left-2, #right-2').css({
        'opacity': 0
    });
    
    $('#left-1').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            $('#left-1').addClass('fadeInLeft');
            $('#right-1').addClass('fadeInRight');
        });
    });


    $('#left-2').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            $('#left-2').addClass('fadeInLeft');
            $('#right-2').addClass('fadeInRight');
        });
    });



/*--------------------------------------------------------------
    About team section animation
--------------------------------------------------------------*/
    $('#right').css({
        'opacity': 0
    });
    
    $('#right').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            $('#right').addClass('fadeInRight');
        });
    });



/*--------------------------------------------------------------
    Tema skill progress bar setting
--------------------------------------------------------------*/
    $('.team-skill').each(function () {
        var $this = $(this);
        var myVal = $(this).data("value");

        $this.appear(function() {
            function progress(percent, $element) {
                var progressBarWidth = percent * $element.width() / 100;
                $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
            }       

            progress(95, $('#facial-care'));
            progress(90, $('#body-massage'));
            progress(85, $('#hair-treatment'));
            progress(93, $('#manicure'));

        });
    });

}); //end of document.ready
