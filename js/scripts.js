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

    // навигационное меню на текстовых страницах
    $(window).on('scroll load', function () {
        let top = $(window).scrollTop();
        $('.anchor-block').each(function() {
            let destination = $(this).offset().top - 250;
            if(top >= destination) {
                let id = $(this).attr('id');
                $('.text-block-nav-link.anchor[href^="#"]').removeClass('active');
                $('.text-block-nav-link.anchor[href^="#'+ id +'"]').addClass('active');
            }
        });
    }).trigger('scroll');
    if ((window.location.hash !== '' && window.location.hash !== '#!') && $('.text-block-nav-menu').length) {
        setTimeout(function() {
            let goto = $(window.location.hash).offset().top;
            $('html, body').animate({ scrollTop: goto }, 600, 'swing');
        }, 100);
    }

    // попап отзывов
    $('body').on('click', '.review-open', function(e) {
        let img = $(this).find('.review-person-img img').attr('src');
        let name = $(this).find('.review-person-name').html();
        let status = $(this).find('.review-person-status').html();
        let text = $(this).find('.review-text').html();
        $('#modal_review_img img').attr('src', img);
        $('#modal_review_name').html(name);
        $('#modal_review_status').html(status);
        $('#modal_review_text').html(text);
    });

    // history-element scroll
    if($('.history-element').length) {
        $(window).on('scroll load', function () {
            let top = $(window).scrollTop();
            $('.history-element').each(function() {
                let destination = $(this).offset().top-400;
                if(top >= destination) {
                    $(this).addClass('scrolled');
                } else {
                    $(this).removeClass('scrolled');
                }
            });
        }).trigger('scroll');
    }

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

    const trainings_slider = new Swiper('.trainings-slider', {
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const shop_slider = new Swiper('.shop-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: true,
    });

    const shop_inner_slider = new Swiper('.shop-inner-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 5,
                loop: false,
                freeMode: true,
            }
        },
    });

    const travel_slider = new Swiper('.travel-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: true,
    });

    const travel_inner_slider = new Swiper('.travel-inner-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 2,
                loop: false,
                freeMode: true,
            }
        },
    });

    const news_slider = new Swiper('.news-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 3,
                loop: false,
                freeMode: true,
            }
        },
    });

    const experts_slider = new Swiper('.experts-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 4,
                loop: false,
                freeMode: true,
            }
        },
    });

    const services_slider = new Swiper('.services-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 2,
                loop: false,
                freeMode: true,
            }
        },
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

    const review_slider = new Swiper('.reviews-slider', {
        slidesPerView: 'auto',
        loop: true,
        freeMode: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 'auto',
                loop: true,
                freeMode: false,
            },
            481: {
                slidesPerView: 3,
                loop: false,
                freeMode: true,
            }
        },
    });

    // only mobile sliders
    let init = false;
    let swiper;
    function travel_page_slider() {
        if (window.innerWidth <= 480) {
            if (!init && $('.travel-page-slider').length) {
                init = true;
                swiper = new Swiper(".travel-page-slider", {
                    slidesPerView: 'auto',
                    loop: true,
                    freeMode: true,
                });
            }
        } else if (init && $('.travel-page-slider').length) {
            swiper.destroy();
            init = false;
        }
    }
    travel_page_slider();
    window.addEventListener("resize", travel_page_slider);
    
    function courses_page_cards() {
        if (window.innerWidth <= 480) {
            if (!init && $('.courses-page-cards').length) {
                init = true;
                swiper = new Swiper(".courses-page-cards", {
                    slidesPerView: 'auto',
                    loop: true,
                    freeMode: true,
                });
            }
        } else if (init && $('.courses-page-cards').length) {
            swiper.destroy();
            init = false;
        }
    }
    courses_page_cards();
    window.addEventListener("resize", courses_page_cards);

    function services_list_slider() {
        if (window.innerWidth <= 480) {
            if (!init && $('.services-list-slider-mobile').length) {
                init = true;
                swiper = new Swiper(".services-list-slider-mobile", {
                    slidesPerView: 'auto',
                    loop: true,
                    freeMode: false,
                });
            }
        } else if (init && $('.services-list-slider-mobile').length) {
            swiper.destroy();
            init = false;
        }
    }
    services_list_slider();
    window.addEventListener("resize", services_list_slider);

    function photo_gallery_slider() {
        if (window.innerWidth <= 480) {
            if (!init && $('.photo-gallery-slider').length) {
                init = true;
                swiper = new Swiper(".photo-gallery-slider", {
                    slidesPerView: 'auto',
                    loop: true,
                    freeMode: false,
                });
            }
        } else if (init && $('.photo-gallery-slider').length) {
            swiper.destroy();
            init = false;
        }
    }
    photo_gallery_slider();
    window.addEventListener("resize", photo_gallery_slider);

    // кнопки +-
    $('.btn-number').parents('.order-element-product-count-info').append('<div class="tooltip-input-count"></div>');
    $('body').on('click', '.btn-number', function(e) {
        var type = $(this).attr('data-type');
        var field = $(this).attr('data-field');
        var input = $(this).parent().find('input[name ='+field+']');
        var min = input.attr('min');
        var min_count = input.attr('min-count');
        var max = input.attr('max');
        min = parseInt(min);
        min_count = parseInt(min_count);
        max = parseInt(max);
        var currentVal;
        var value = input.val();
        if (type == 'minus') {
            if (value > min) {
                if (value <= min_count) {
                    currentVal = parseInt(value) - min_count;
                    input.val(currentVal).change();
                } else {
                    currentVal = parseInt(value) - 1;
                    input.val(currentVal).change();
                }
            }
        }
        if (type == 'plus') {
            if (value < max) {
                if (value < min_count) {
                    currentVal = parseInt(value) + min_count;
                    input.val(currentVal).change();
                } else {
                    currentVal = parseInt(value) + 1;
                    input.val(currentVal).change();
                }
            }
        }

        let tooltip = $(this).parents('.order-element-product-count-info').find('.tooltip-input-count');
        if ($(this).hasClass('btn-plus disabled-btn')) {
            tooltip.addClass('show').text('Нельзя добавить больше товаров в заказ');
            setTimeout(function() {
                tooltip.removeClass('show');
            }, 2000);
        }
    });
    $('body').on('change keyup', '.input-number', function() {
        window.updateCartButtons(this);
    });

    window.updateCartButtons = function(item) {
        var min = $(item).attr('min');
        var max = $(item).attr('max');
        var val = $(item).val();
        var name = $(item).parent().find('.input-number').attr('name');
        if (val == min) {
            $(item).parent().find(".btn-number[data-type='minus'][data-field='" + name + "']").attr('disabled', 'true');
        } else $(item).parent().find(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
        if (val == max) {
            $(item).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").addClass('disabled-btn');
        } else $(item).parent().find(".btn-number[data-type='plus'][data-field='" + name + "']").removeClass('disabled-btn');
    }

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
        new SimpleParallax(parallax, {
            delay: 0.5,
            orientation: 'down',
            scale: 1.2,
            // transition: 'linear'
        });
    }
});