//THIS IS THE SMOOTH SCROLL EFFECT

function softScroll() {
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 800);
                    return false;
                }
            }
        });
    });
}



//THIS IS THE STICKY MENU


function stickyMenu(){
    var windowScrollTop = function () {
        return window.pageYOffset;
    };

    var Menu = (function (scrollOffset) {
        var Menu = function () {
            this.element = document.getElementById('nav');
            this.docked = false;
            this.initialOffsetTop = 0;

            this.resetInitialOffsetTop();
        }

        Menu.prototype = {
            offsetTop: function () {
                return this.element.offsetTop;
            },
            resetInitialOffsetTop: function () {
                this.initialOffsetTop = this.offsetTop();
            },

            dock: function () {
                this.element.className = 'docked';
                this.docked = true;
            },
            undock: function () {
                this.element.className = this.element.className.replace('docked', '');
                this.docked = false;
            },

            toggleDock: function () {
                if (this.docked === false && (this.offsetTop() - scrollOffset() < 0)) {
                    this.dock();
                } else if (this.docked === true && (scrollOffset() <= this.initialOffsetTop)) {
                    this.undock();
                }
            }
        };

        return Menu;
    })(windowScrollTop);


    var menu = new Menu();


    window.onscroll = function () {
        menu.toggleDock();
    };

    var updateMenuTop = function () {
        // Shortly dock to reset the initial Y-offset
        menu.undock();
        menu.resetInitialOffsetTop();

        // If appropriate, undock again based on the new value
        menu.toggleDock();
    };

    var zoomListeners = [updateMenuTop];

    (function () {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];

        var lastWidth = 0;

        function pollZoomFireEvent() {
            var widthNow = w.innerWidth || e.clientWidth || g.clientWidth;

            if (lastWidth == widthNow) {
                return;
            }

            lastWidth = widthNow;

            for (i = zoomListeners.length - 1; i >= 0; --i) {
                zoomListeners[i]();
            }
        }

        setInterval(pollZoomFireEvent, 100);
    })();
}


//Mobile Menu

function menuHide() {
    $('#drop-down').toggleClass('active');
} 



function hamburgerMenu(){
    $('#hamburger').click(function () {
            menuHide();
        });
    $('#mobileLinkAbout').click(function () {
            menuHide();
        });
    $('#mobileLinkSkill').click(function () {
            menuHide();
        });
    $('#mobileLinkPortfolio').click(function () {
            menuHide();
        });
    $('#mobileLinkContact').click(function () {
            menuHide();
        });
}


//DOCUMENT READY STUFF


$(document).ready(function () {
    softScroll();
    stickyMenu();
    hamburgerMenu();
});