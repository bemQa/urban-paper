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
    const courses_cards = new Swiper('.courses-cards', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: true,
        
        // breakpoints: {
        //     480: {
        //         slidesPerView: 1,
        //     },
        // },
    });

    const product_slider_navs = new Swiper(".product-slider-navs", {
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        watchSlidesProgress: true,
        direction: "vertical",
        grabCursor: true,
    });
    const product_slider = new Swiper(".product-slider", {
        // slidesPerView: 1,
        loop: true,
        // direction: "vertical",
        thumbs: {
            swiper: product_slider_navs,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
            },
        },
    });

    const text_page_slider = new Swiper('.text-page-slider', {
        slidesPerView: 1,
        loop: true,
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
});