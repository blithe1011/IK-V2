$(function(){
	var SITE = (function(){

		function debugCheck() {
			if(window.location.href.indexOf("debug") > -1) {
				$('body').addClass('debug');
			}
		}

		var checkMobile = function(){
			var isTouch = ('ontouchstart' in document.documentElement);
			if ( isTouch ) {
				$('body').addClass('document-touch');
			}
			else {
				$('body').addClass('document-no-touch');
			};
		};

		 var carousel = {
			 el: $('.carousel-overlay'),
			 visible: false,
			 openTrigger: $('.project-images .media'),
			 closeTrigger: $('.js-carousel-close'),
			 status: $('.carousel-status'),
			 caption: $('.carousel-caption'),
		 }

		 function carouselShow() {
			 var imageIndex = $(this).closest('.project-image').index();
			 carousel.el.addClass('-open');
			 carousel.visible = true;
			 $carousel.flickity( 'selectCell', imageIndex, false, true );
		 }

		 function carouselHide() {
			 carousel.el.removeClass('-open');
			 carousel.visible = false;
		 }

		function checkScrollPos() {
			var yScrollPos = window.pageYOffset;

			if(yScrollPos >  20) {
				$('.overview.-fixed').removeClass('-hidden');
			}
			else {
				$('.overview.-fixed').addClass('-hidden');
			}
		}

		// function orientHorizontal(mouseX) {
		// 	var mouseXpx = mouseX + 'px';
		// 	var itemOffset = $('.item').offset().left;
		// 	var percentItem = $('.hover-image').width() - 0;
		// 	var percentMouse = mouseX - itemOffset ; // page gutter
		// 	var mouseXpercent = (percentMouse / percentItem * 100) + '%';
		// 	$('.hover-image').css('background-position-x', mouseXpercent );
		// }

		function setupAccordian() {
			$('.item-drawer').each(function( index ) {
				$(this).attr( 'data-content-height', $(this).outerHeight() );
			});
		}

		function jumpToSection(section) {
			highlightSection(section);
			scrollToIndex(section);
		}

		if (window.location.href.indexOf("?projects") > -1) {
			jumpToSection('projects');
		}

		if (window.location.href.indexOf("?ethos") > -1) {
			jumpToSection('ethos');
		}

		if (window.location.href.indexOf("?studio") > -1) {
			jumpToSection('studio');
		}

		function toggleDrawer() {

			if ( $(this).hasClass('-open') ) {
				$(this).removeClass('-open');
			} else {
				$('.item').removeClass('-open');
				$(this).addClass('-open');
			}
		}

		function highlightSection(section) {
			var sectionIndex = '#' + section + '-index';
			$(sectionIndex).addClass('-opening-highlight');
		}

		function highlightOff() {
			$('.index').removeClass('-opening-highlight');
		}


		function scrollToIndex(section) {
			var highlightClass = 'highlight-' + section;
			var index = '#' + section + '-index';
			var indexOffset = $(index).offset();
			var indexOffsetTop = indexOffset.top - 20;

			$('html, body').animate({
				 scrollTop: indexOffsetTop
		 }, 0);
		}

		var $carousel = $('.carousel').flickity({
			cellAlign: 'left',
			cellSelector: '.carousel-cell',
			contain: true,
			prevNextButtons: true,
			wrapAround: true,
			pageDots: false,
			draggable: true,
			imagesLoaded: true,
			accessibility: true,
			selectedAttraction: 0.025,
			friction: 0.28
		});

		var flkty = $carousel.data('flickity');

		function updateStatus() {
			var cellNumber = flkty.selectedIndex + 1;
			carousel.status.text( cellNumber + ' / ' + flkty.slides.length );
		}

		function updateCaption() {
			var cellNumber = flkty.selectedIndex;
			var cellCaption = $('.carousel-cell').eq(cellNumber).data('caption');
			carousel.caption.text( cellCaption );
		}


		function flickityNext() {
			$carousel.flickity( 'next');
		}

		function randomLogo(permutations) {
			var randomNumber = Math.floor(Math.random() * permutations) + 1;
			var configClass = '-flex-logo-' + randomNumber;
			$('.js-logo').removeClass('-config-waiting').addClass(configClass);

			// // random flips
			// var flipNumber = Math.floor(Math.random() * 6) + 1;
			// var flipNumber2 = Math.floor(Math.random() * 10) + 1;
			// $('.js-logo').find('.letter').eq(flipNumber).addClass('-flip');
			// $('.js-logo').find('.letter').eq(flipNumber2).addClass('-flip');

		}

		var configNumber = 0;



		function cycleFlexLogo() {
			var oldAltClass = '-alt-' + configNumber;
			$('.js-flex-logo').removeClass(oldAltClass)
			configNumber++;
			if (configNumber === 3) {
				configNumber = 0;
			};
			var newAltClass = '-alt-' + configNumber;
			$('.js-flex-logo').addClass(newAltClass);
		}


		function flickitySelect() {
			updateStatus();
			updateCaption();
		}

		function onResize() {
			setupAccordian();
		}

		function onScroll() {
			checkScrollPos();
		}

		function layout() {
			checkScrollPos();
		}

		function init() {
			debugCheck();
			checkMobile();
			randomLogo(3);
			layout();
		}

		$(window).scroll( onScroll );
		window.addEventListener('resize', onResize);
		// $(window).on('mousemove', function(e){ orientHorizontal(e.pageX) } );
		$('.index .item').on('tap click', toggleDrawer );
		$('.index .item').on('mouseover', highlightOff );
		// $('.js-flex-logo').on('mouseover mouseleave', cycleFlexLogo );
		carousel.openTrigger.on('click', carouselShow );
		carousel.closeTrigger.on('click', carouselHide );
		$carousel.on( 'select.flickity', flickitySelect );
		$('.js-carousel-next').on( 'tap click', function() {
		  $carousel.flickity('next');
		});

		$('.moaa-logo.dynamic .t1').on('mouseover', function() {
			$('.moaa-logo.dynamic').addClass('flex-1')
		} );
		$('.moaa-logo.dynamic .t1').on('mouseleave', function() {
			$('.moaa-logo.dynamic').removeClass('flex-1')
		} );
		$('.moaa-logo.dynamic .t2').on('mouseover', function() {
			$('.moaa-logo.dynamic').addClass('flex-2')
		} );
		$('.moaa-logo.dynamic .t2').on('mouseleave', function() {
			$('.moaa-logo.dynamic').removeClass('flex-2')
		} );
		$('.moaa-logo.dynamic .t3').on('mouseover', function() {
			$('.moaa-logo.dynamic').addClass('flex-3')
		} );
		$('.moaa-logo.dynamic .t3').on('mouseleave', function() {
			$('.moaa-logo.dynamic').removeClass('flex-3')
		} );
		$('.moaa-logo.dynamic .t4').on('mouseover', function() {
			$('.moaa-logo.dynamic').addClass('flex-4')
		} );
		$('.moaa-logo.dynamic .t4').on('mouseleave', function() {
			$('.moaa-logo.dynamic').removeClass('flex-4')
		} );

		$(window).keyup(function(e) {
			if (e.keyCode == 27) { // escape key maps to keycode `27`
				carouselHide();
			}
		});

		// return an object that exposes our greeting function publicly
		return {
			init: init
		};

	})();
	SITE.init();

});
