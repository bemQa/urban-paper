let scrollTop = $(window).scrollTop();

$(window).scroll(function (evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function () {
    // анимация меню
    $('.menu').click(function (e) {
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active'): this.classList.add('active');

        $('.header').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header, .menu').removeClass('active');
            }
        });
    });

    // якоря для ссылок
    $('body').on('click', '.anchor[href^="#"]', function () {
        $('.header').removeClass('active');
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top - 150;
        $('html, body').animate({
            scrollTop: destination
        }, 500, 'swing');
        return false;
    });

    // аккордеон
    function openAccordion() {
        let wrap = $('.accordion-wrap');
        let accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
            let $this = $(this);
            let $parent = $(this).parent();
            let content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // открытие модалок
    $('body').on('click','.js-open-modal', function(e){
        e.preventDefault();
        let id = $(this).attr('href');
        Fancybox.show(
            [{src: id}],
            {
                defaultType: "inline", 
                // dragToClose: false,
                // touchMove: false,
                // backdropClick: false
            }
        );
    });

    // маски
    if ($('.phone-mask').length) {
        $('.phone-mask').inputmask({
            mask: "+79999999999",
            "clearIncomplete": true
        });
    }

    // select2
    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else if($('.select').length == 1) {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
        $('.select-search').select2({
            dropdownParent: $('.select')
        });
    }

    // fancybox
    Fancybox.bind("[data-fancybox]", {
        defaultType: "inline",
        // dragToClose: false,
        // touchMove: false,
        // backdropClick: false
    });

    // тултипы
    $('body').on('click', '.tooltip-trigger', function(e){
        e.preventDefault();
        let $this = $(this);
        let tooltip = $this.siblings('.tooltip');
        tooltip.toggleClass('show');
        $('body').on('click', function (e) {
            let div = $($this, tooltip);

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                tooltip.removeClass('show');
            }
        });
    });

    // sliders
    const collection_slider = new Swiper('.collection-slider', {
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // скрытие полей сдэк
    if ($('.js-cdek-ch').length) {
        $('.js-cdek-ch').each(function() {
            if ($(this).is(':checked') && $(this).data('value') == 1) {
                if($('.js-cdek-field').is(':visible')) {
                    $('.js-cdek-field').hide();
                }
                if($('.js-cdek-field').is(':hidden')) {
                    $('.js-cdek-field').show();
                }
            }
        })
        $('body').on('change', '.js-cdek-ch', function(e) {
            if ($(this).is(':checked') && $(this).data('value') == 1) {
                $('.js-cdek-field').hide();
            } else {
                $('.js-cdek-field').show();
            }
        });
    }

    // parallax
    let parallax = document.querySelectorAll('.parallax');
    if(parallax.length) {
        let parallax_instance = new SimpleParallax(parallax, {
            // delay: 0.2,
            orientation: 'down',
            scale: 1.4,
            // maxTransition: 60,
            transition: 'transform'
        });
        if($(window).innerWidth() <= 480) {
            parallax_instance.destroy();
        }
    }

    // animation
    function scrollWaypointInit(items, trigger) {
        items.each(function() {
            var element = $(this),
                osAnimationClass = element.data("animation"),
                osAnimationDelay = element.attr('data-animation-delay');
    
            element.css({
                '-webkit-animation-delay': osAnimationDelay,
                '-moz-animation-delay': osAnimationDelay,
                'animation-delay': osAnimationDelay
            });
    
            var trigger = (trigger) ? trigger : element;
    
            trigger.waypoint(function() {
                element.addClass('animate__animated').addClass('animate__' + osAnimationClass);
            }, {
                // triggerOnce: true,
                offset: '80%'
            });
        });
    }

    scrollWaypointInit($('.animateMe'));

    // CLICK ON LABEL -> CHECK PREV CHECKBOX
    $('body').on('click', '.dropdown-item-text', function() {
        $(this).siblings('.dropdown-ch').click();
    });

    $('body').on('click', function (e) {
        let div = $('.dropdown-item, .dropdown-list');

        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.dropdown-box').removeClass('active');
        }
    });

    // CUSTOM SELECT
    $('.dropdown-link').each(function() {
        let placeholder = $(this).data('placeholder');
        $(this).html(`<span>${placeholder}</span>`);
    });

    $('.dropdown-link').click(function() {
        let box = $(this).closest('.dropdown-box');
        if (!box.hasClass('active')) {
            $('.dropdown-box.active').removeClass('active');
            box.addClass('active');
        } else {
            $('.dropdown-box.active').removeClass('active');
        }

        return false;
    });

    $('.dropdown-ch').change(function() {
        let box = $(this).closest('.dropdown-box');
        let link = box.find('.dropdown-link');
        let selected = [];
        box.find('.dropdown-ch:checked').each(function() {
            let text = $(this).siblings('.dropdown-item-text').html();
            selected.push(text);
        });

        if (selected != '') {
            link.html(selected.join(', '));
            link.addClass('chosen');
        } else {
            link.html(link.data('placeholder'));
            link.removeClass('chosen');
        }

    });

    $('.dropdown-box').each(function() {
        let link = $(this).find('.dropdown-link');
        let placeholder = link.data('placeholder');
        let selected = [];

        $(this).find('.dropdown-ch:checked').each(function() {
            let text = $(this).siblings('.dropdown-item-text').html();
            selected.push(text);
        });

        if (selected != '') {
            link.html(selected.join(', '));
        } else {
            link.html(`<span>${placeholder}</span>`);
        }
    });
});