(function($){
	"use strict";
	jQuery(document).on('ready', function () {

        // Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 120){  
                $('.navbar-area').addClass("is-sticky");
            }
            else{
                $('.navbar-area').removeClass("is-sticky");
            }
        });
		
		// Mean Menu
		jQuery('.mean-menu').meanmenu({
			meanScreenWidth: "991"
        });

        // Sidebar Modal
        $(".burger-menu").on('click',  function() {
			$('.sidebar-modal').toggleClass('active');
		});
        $(".sidebar-modal-close-btn").on('click',  function() {
			$('.sidebar-modal').removeClass('active');
        });

        // Search Popup JS
        $('.close-btn').on('click',function() {
            $('.search-overlay').fadeOut();
            $('.search-btn').show();
            $('.close-btn').removeClass('active');
        });
        $('.search-btn').on('click',function() {
            $(this).hide();
            $('.search-overlay').fadeIn();
            $('.close-btn').addClass('active');
        });

        // Home Sliders
		$('.home-sliders').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			mouseDrag: true,
			items:1,
			autoHeight:true,
			dots: true,
			autoplay: true,
			smartSpeed: 500,
			autoplayHoverPause: true,
			navText: [
				"<i class='flaticon-left'></i>",
				"<i class='flaticon-right-1'></i>",
			],
		});

		//Slider Text Animation
		$(".home-sliders").on("translate.owl.carousel", function(){
            $(".main-banner-content span, .main-banner-content h1, .main-banner-content .typewrite").removeClass("animated fadeInUp").css("opacity", "0");
            $(".main-banner-content p").removeClass("animated fadeInDown").css("opacity", "0");
            $(".main-banner-content a").removeClass("animated fadeInDown").css("opacity", "0");
            $(".banner-image").removeClass("animated slideInUp").css("opacity", "0");
        });
        
        $(".home-sliders").on("translated.owl.carousel", function(){
            $(".main-banner-content span, .main-banner-content h1, .main-banner-content .typewrite").addClass("animated fadeInUp").css("opacity", "1");
            $(".main-banner-content p").addClass("animated fadeInDown").css("opacity", "1");
            $(".main-banner-content a").addClass("animated fadeInDown").css("opacity", "1");
            $(".banner-image").addClass("animated slideInUp").css("opacity", "1");
		});
		

		// Clients Slider
		$('.clients-slider').owlCarousel({
			loop: true,
			nav: false,
			dots: true,
			autoplayHoverPause: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 0,
            navText: [
                "<i class='flaticon-left'></i>",
                "<i class='flaticon-right'></i>"
            ],
            responsive: {
				0: {
					items: 1
				},
				576: {
					items: 1
				},
				768: {
					items: 1
				},
				1200: {
					items: 1
				}
			}
		});

		// Partner-slider
		$('.partner-slider').owlCarousel({
			loop: true,
			nav: false,
			dots: false,
			smartSpeed: 2000,
			margin: 30,
			autoplayHoverPause: true,
            autoplay: true,
			responsive: {
				0: {
					items: 2
				},
				576: {
					items: 3
				},
				768: {
					items: 4
				},
				1200: {
					items: 5
				}
			}
        });

        // Tabs
        (function ($) {
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            $('.tab ul.tabs li a').on('click', function (g) {
                var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                g.preventDefault();
            });
		})(jQuery);
		
		// Odometer JS
        $('.odometer').appear(function(e) {
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
		});

		// Go to Top
        $(function(){
            // Scroll Event
            $(window).on('scroll', function(){
                var scrolled = $(window).scrollTop();
                if (scrolled > 600) $('.go-top').addClass('active');
                if (scrolled < 600) $('.go-top').removeClass('active');
            });  
            // Click Event
            $('.go-top').on('click', function() {
                $("html, body").animate({ scrollTop: "0" },  500);
            });
            // Click Event on Join to us now
            $('.join-us').on('click', function() {
                $("html, body").animate({ scrollTop: "0" },  500);
            });
		});
    
        // FAQ Accordion
        $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
                // Adds Active Class
                $(this).toggleClass('active');
                // Expand or Collapse This Panel
                $(this).next().slideToggle('fast');
                // Hide The Other Panels
                $('.accordion-content').not($(this).next()).slideUp('fast');
                // Removes Active Class From Other Titles
                $('.accordion-title').not($(this)).removeClass('active');		
            });
        });

        // Subscribe form
		$(".newsletter-form").validator().on("submit", function (event) {
			if (event.isDefaultPrevented()) {
			// handle the invalid form...
				formErrorSub();
				submitMSGSub(false, "Please enter your email correctly.");
			} else {
				// everything looks good!
				event.preventDefault();
			}
		});
		function callbackFunction (resp) {
			if (resp.result === "success") {
				formSuccessSub();
			}
			else {
				formErrorSub();
			}
		}
		function formSuccessSub(){
			$(".newsletter-form")[0].reset();
			submitMSGSub(true, "Thank you for subscribing!");
			setTimeout(function() {
				$("#validator-newsletter").addClass('hide');
			}, 4000)
		}
		function formErrorSub(){
			$(".newsletter-form").addClass("animated shake");
			setTimeout(function() {
				$(".newsletter-form").removeClass("animated shake");
			}, 1000)
		}
		function submitMSGSub(valid, msg){
			if(valid){
				var msgClasses = "validation-success";
			} else {
				var msgClasses = "validation-danger";
			}
			$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
		}
		// AJAX MailChimp
		$(".newsletter-form").ajaxChimp({
			url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
			callback: callbackFunction
		});
		
		// Count Time 
        function makeTimer() {
            var endTime = new Date("april  30, 2020 17:00:00 PDT");			
            var endTime = (Date.parse(endTime)) / 1000;
            var now = new Date();
            var now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#days").html(days + "<span>Days</span>");
            $("#hour").html(hours + "<span>Hours</span>");
            $("#minu").html(minutes + "<span>minutes</span>");
            $("#seco").html(seconds + "<span>seconds</span>");
        }
		setInterval(function() { makeTimer(); }, 300);

		//skill
		jQuery('.skill-bar').each(function() {
			jQuery(this).find('.progress-content').animate({
			width:jQuery(this).attr('data-percentage')
			},2000);
			
			jQuery(this).find('.progress-number-mark').animate(
			{left:jQuery(this).attr('data-percentage')},
			{
				duration: 2000,
				step: function(now, fx) {
				var data = Math.round(now);
				jQuery(this).find('.percent').html(data + '%');
				}
			});  
		});

		// Popup Video
		$('.popup-youtube').magnificPopup({
			disableOn: 320,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		// Tabs
        (function ($) {
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            $('.tab ul.tabs li a').on('click', function (g) {
                var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                g.preventDefault();
            });
		})(jQuery);

		// Count Time 
        function makeTimer() {
            var endTime = new Date("September 30, 2020 17:00:00 PDT");			
            var endTime = (Date.parse(endTime)) / 1000;
            var now = new Date();
            var now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
        }
        setInterval(function() { makeTimer(); }, 1000);


	});
    
    


	// WOW JS
	$(window).on ('load', function (){
        if ($(".wow").length) { 
            var wow = new WOW({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       20,          // distance to the element when triggering the animation (default is 0)
            mobile:       true, // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
          });
          wow.init();
        }
    });


}(jQuery));

$(() => {

    $(window).load(() => {
        $(".tatx-loading").hide("slow");
        $("body").css("overflow-y", "auto");
    });

    $(window).click(function(e) {

        if($(".navbar-collapse").hasClass("show")) {
            $('.navbar-collapse').collapse("hide")
            e.preventDefault();
        }

    });


    $('.navbar-collapse').click(function(event){
        event.stopPropagation();
    });

    $(window).on('scroll', () => {
        if($(window).width() >= 992) {
            if ($(this).scrollTop() > 220)  {
                $('.pageConst').removeClass("pageTatx").addClass("bg-white o_shadow animated fadeInDown")
           }
           else  {
               $('.pageConst').removeClass("bg-white o_shadow animated fadeInDown").addClass("pageTatx")
           }
        }
    });

    $(window).resize(() => {
        if($(window).width() <= 991) {
            $(".pageConst").removeClass("pageTatx").addClass("bg-white o_shadow");
        } else  $('.pageConst').removeClass("bg-white o_shadow animated fadeInDown").addClass("pageTatx")
    })

    $('[data-toggle="tooltip"]').tooltip()
	 /* ===================================
       Owl Carousel
      ====================================== */

    //Testimonial Slider

    $("#testimonial-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        autoplay: true,
        dots: true,
        dotsContainer: "#testimonials-avatar",
        autoplayTimeout: 6000,
        responsive: {
            1280: {
                items: 1,
            },
            600: {
                items: 1,
            },
            320: {
                items: 1,
            },
        }
    });


    $('[data-position]').each(function () {
       var position = $(this).data('position').split(',')
      $(this).css({top: position[0], right: position[1], bottom: position[2], left: position[3]})
    });


    $('.partners-slider').owlCarousel({
        items: 5,
        autoplay: 1500,
        smartSpeed: 1500,
        autoplayHoverPause: true,
        slideBy: 1,
        loop: true,
        margin: 30,
        dots: false,
        nav: false,
        responsive: {
            1200: {
                items: 4,
            },
            768: {
                items: 3,
            },
            480: {
                items: 2,
            },
            320: {
                items: 1,
            },
        }
    });

	 $('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
})