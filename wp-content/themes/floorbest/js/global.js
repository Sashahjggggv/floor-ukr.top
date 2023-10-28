!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("scrollMonitor", [], e) : "object" == typeof exports ? exports.scrollMonitor = e() : t.scrollMonitor = e() }(this, function () { return function (t) { function e(o) { if (i[o]) return i[o].exports; var s = i[o] = { exports: {}, id: o, loaded: !1 }; return t[o].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports } var i = {}; return e.m = t, e.c = i, e.p = "", e(0) }([function (t, e, i) { "use strict"; var o = i(1), s = o.isInBrowser, n = i(2), r = new n(s ? document.body : null); r.setStateFromDOM(null), r.listenToDOM(), s && (window.scrollMonitor = r), t.exports = r }, function (t, e) { "use strict"; e.VISIBILITYCHANGE = "visibilityChange", e.ENTERVIEWPORT = "enterViewport", e.FULLYENTERVIEWPORT = "fullyEnterViewport", e.EXITVIEWPORT = "exitViewport", e.PARTIALLYEXITVIEWPORT = "partiallyExitViewport", e.LOCATIONCHANGE = "locationChange", e.STATECHANGE = "stateChange", e.eventTypes = [e.VISIBILITYCHANGE, e.ENTERVIEWPORT, e.FULLYENTERVIEWPORT, e.EXITVIEWPORT, e.PARTIALLYEXITVIEWPORT, e.LOCATIONCHANGE, e.STATECHANGE], e.isOnServer = "undefined" == typeof window, e.isInBrowser = !e.isOnServer, e.defaultOffsets = { top: 0, bottom: 0 } }, function (t, e, i) { "use strict"; function o(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function s(t) { return c ? 0 : t === document.body ? window.innerHeight || document.documentElement.clientHeight : t.clientHeight } function n(t) { return c ? 0 : t === document.body ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) : t.scrollHeight } function r(t) { return c ? 0 : t === document.body ? window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop } var h = i(1), c = h.isOnServer, a = h.isInBrowser, l = h.eventTypes, p = i(3), u = !1; if (a) try { var w = Object.defineProperty({}, "passive", { get: function () { u = !0 } }); window.addEventListener("test", null, w) } catch (t) { } var d = !!u && { capture: !1, passive: !0 }, f = function () { function t(e, i) { function h() { if (a.viewportTop = r(e), a.viewportBottom = a.viewportTop + a.viewportHeight, a.documentHeight = n(e), a.documentHeight !== p) { for (u = a.watchers.length; u--;)a.watchers[u].recalculateLocation(); p = a.documentHeight } } function c() { for (w = a.watchers.length; w--;)a.watchers[w].update(); for (w = a.watchers.length; w--;)a.watchers[w].triggerCallbacks() } o(this, t); var a = this; this.item = e, this.watchers = [], this.viewportTop = null, this.viewportBottom = null, this.documentHeight = n(e), this.viewportHeight = s(e), this.DOMListener = function () { t.prototype.DOMListener.apply(a, arguments) }, this.eventTypes = l, i && (this.containerWatcher = i.create(e)); var p, u, w; this.update = function () { h(), c() }, this.recalculateLocations = function () { this.documentHeight = 0, this.update() } } return t.prototype.listenToDOM = function () { a && (window.addEventListener ? (this.item === document.body ? window.addEventListener("scroll", this.DOMListener, d) : this.item.addEventListener("scroll", this.DOMListener, d), window.addEventListener("resize", this.DOMListener)) : (this.item === document.body ? window.attachEvent("onscroll", this.DOMListener) : this.item.attachEvent("onscroll", this.DOMListener), window.attachEvent("onresize", this.DOMListener)), this.destroy = function () { window.addEventListener ? (this.item === document.body ? (window.removeEventListener("scroll", this.DOMListener, d), this.containerWatcher.destroy()) : this.item.removeEventListener("scroll", this.DOMListener, d), window.removeEventListener("resize", this.DOMListener)) : (this.item === document.body ? (window.detachEvent("onscroll", this.DOMListener), this.containerWatcher.destroy()) : this.item.detachEvent("onscroll", this.DOMListener), window.detachEvent("onresize", this.DOMListener)) }) }, t.prototype.destroy = function () { }, t.prototype.DOMListener = function (t) { this.setStateFromDOM(t) }, t.prototype.setStateFromDOM = function (t) { var e = r(this.item), i = s(this.item), o = n(this.item); this.setState(e, i, o, t) }, t.prototype.setState = function (t, e, i, o) { var s = e !== this.viewportHeight || i !== this.contentHeight; if (this.latestEvent = o, this.viewportTop = t, this.viewportHeight = e, this.viewportBottom = t + e, this.contentHeight = i, s) for (var n = this.watchers.length; n--;)this.watchers[n].recalculateLocation(); this.updateAndTriggerWatchers(o) }, t.prototype.updateAndTriggerWatchers = function (t) { for (var e = this.watchers.length; e--;)this.watchers[e].update(); for (e = this.watchers.length; e--;)this.watchers[e].triggerCallbacks(t) }, t.prototype.createCustomContainer = function () { return new t }, t.prototype.createContainer = function (e) { "string" == typeof e ? e = document.querySelector(e) : e && e.length > 0 && (e = e[0]); var i = new t(e, this); return i.setStateFromDOM(), i.listenToDOM(), i }, t.prototype.create = function (t, e) { "string" == typeof t ? t = document.querySelector(t) : t && t.length > 0 && (t = t[0]); var i = new p(this, t, e); return this.watchers.push(i), i }, t.prototype.beget = function (t, e) { return this.create(t, e) }, t }(); t.exports = f }, function (t, e, i) { "use strict"; function o(t, e, i) { function o(t, e) { if (0 !== t.length) for (E = t.length; E--;)y = t[E], y.callback.call(s, e, s), y.isOne && t.splice(E, 1) } var s = this; this.watchItem = e, this.container = t, i ? i === +i ? this.offsets = { top: i, bottom: i } : this.offsets = { top: i.top || w.top, bottom: i.bottom || w.bottom } : this.offsets = w, this.callbacks = {}; for (var d = 0, f = u.length; d < f; d++)s.callbacks[u[d]] = []; this.locked = !1; var m, v, b, I, E, y; this.triggerCallbacks = function (t) { switch (this.isInViewport && !m && o(this.callbacks[r], t), this.isFullyInViewport && !v && o(this.callbacks[h], t), this.isAboveViewport !== b && this.isBelowViewport !== I && (o(this.callbacks[n], t), v || this.isFullyInViewport || (o(this.callbacks[h], t), o(this.callbacks[a], t)), m || this.isInViewport || (o(this.callbacks[r], t), o(this.callbacks[c], t))), !this.isFullyInViewport && v && o(this.callbacks[a], t), !this.isInViewport && m && o(this.callbacks[c], t), this.isInViewport !== m && o(this.callbacks[n], t), !0) { case m !== this.isInViewport: case v !== this.isFullyInViewport: case b !== this.isAboveViewport: case I !== this.isBelowViewport: o(this.callbacks[p], t) }m = this.isInViewport, v = this.isFullyInViewport, b = this.isAboveViewport, I = this.isBelowViewport }, this.recalculateLocation = function () { if (!this.locked) { var t = this.top, e = this.bottom; if (this.watchItem.nodeName) { var i = this.watchItem.style.display; "none" === i && (this.watchItem.style.display = ""); for (var s = 0, n = this.container; n.containerWatcher;)s += n.containerWatcher.top - n.containerWatcher.container.viewportTop, n = n.containerWatcher.container; var r = this.watchItem.getBoundingClientRect(); this.top = r.top + this.container.viewportTop - s, this.bottom = r.bottom + this.container.viewportTop - s, "none" === i && (this.watchItem.style.display = i) } else this.watchItem === +this.watchItem ? this.watchItem > 0 ? this.top = this.bottom = this.watchItem : this.top = this.bottom = this.container.documentHeight - this.watchItem : (this.top = this.watchItem.top, this.bottom = this.watchItem.bottom); this.top -= this.offsets.top, this.bottom += this.offsets.bottom, this.height = this.bottom - this.top, void 0 === t && void 0 === e || this.top === t && this.bottom === e || o(this.callbacks[l], null) } }, this.recalculateLocation(), this.update(), m = this.isInViewport, v = this.isFullyInViewport, b = this.isAboveViewport, I = this.isBelowViewport } var s = i(1), n = s.VISIBILITYCHANGE, r = s.ENTERVIEWPORT, h = s.FULLYENTERVIEWPORT, c = s.EXITVIEWPORT, a = s.PARTIALLYEXITVIEWPORT, l = s.LOCATIONCHANGE, p = s.STATECHANGE, u = s.eventTypes, w = s.defaultOffsets; o.prototype = { on: function (t, e, i) { switch (!0) { case t === n && !this.isInViewport && this.isAboveViewport: case t === r && this.isInViewport: case t === h && this.isFullyInViewport: case t === c && this.isAboveViewport && !this.isInViewport: case t === a && this.isInViewport && this.isAboveViewport: if (e.call(this, this.container.latestEvent, this), i) return }if (!this.callbacks[t]) throw new Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + u.join(", ")); this.callbacks[t].push({ callback: e, isOne: i || !1 }) }, off: function (t, e) { if (!this.callbacks[t]) throw new Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + u.join(", ")); for (var i, o = 0; i = this.callbacks[t][o]; o++)if (i.callback === e) { this.callbacks[t].splice(o, 1); break } }, one: function (t, e) { this.on(t, e, !0) }, recalculateSize: function () { this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom, this.bottom = this.top + this.height }, update: function () { this.isAboveViewport = this.top < this.container.viewportTop, this.isBelowViewport = this.bottom > this.container.viewportBottom, this.isInViewport = this.top < this.container.viewportBottom && this.bottom > this.container.viewportTop, this.isFullyInViewport = this.top >= this.container.viewportTop && this.bottom <= this.container.viewportBottom || this.isAboveViewport && this.isBelowViewport }, destroy: function () { var t = this.container.watchers.indexOf(this), e = this; this.container.watchers.splice(t, 1); for (var i = 0, o = u.length; i < o; i++)e.callbacks[u[i]].length = 0 }, lock: function () { this.locked = !0 }, unlock: function () { this.locked = !1 } }; for (var d = function (t) { return function (e, i) { this.on.call(this, t, e, i) } }, f = 0, m = u.length; f < m; f++) { var v = u[f]; o.prototype[v] = d(v) } t.exports = o }]) });
//# sourceMappingURL=scrollMonitor.js.map


/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: March 10, 2017
 */
!function(){"use strict";var e,a=function(t,s){function r(e){return Math.floor(e)}function i(){var e=x.params.autoplay,a=x.slides.eq(x.activeIndex);a.attr("data-swiper-autoplay")&&(e=a.attr("data-swiper-autoplay")||x.params.autoplay),x.autoplayTimeoutId=setTimeout(function(){x.params.loop?(x.fixLoop(),x._slideNext(),x.emit("onAutoplay",x)):x.isEnd?s.autoplayStopOnLast?x.stopAutoplay():(x._slideTo(0),x.emit("onAutoplay",x)):(x._slideNext(),x.emit("onAutoplay",x))},e)}function n(a,t){var s=e(a.target);if(!s.is(t))if("string"==typeof t)s=s.parents(t);else if(t.nodeType){var r;return s.parents().each(function(e,a){a===t&&(r=t)}),r?t:void 0}if(0!==s.length)return s[0]}function o(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){x.onResize(!0),x.emit("onObserverUpdate",x,e)})});s.observe(e,{attributes:void 0===a.attributes||a.attributes,childList:void 0===a.childList||a.childList,characterData:void 0===a.characterData||a.characterData}),x.observers.push(s)}function l(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!x.params.allowSwipeToNext&&(x.isHorizontal()&&39===a||!x.isHorizontal()&&40===a))return!1;if(!x.params.allowSwipeToPrev&&(x.isHorizontal()&&37===a||!x.isHorizontal()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(x.container.parents("."+x.params.slideClass).length>0&&0===x.container.parents("."+x.params.slideActiveClass).length)return;var s={left:window.pageXOffset,top:window.pageYOffset},r=window.innerWidth,i=window.innerHeight,n=x.container.offset();x.rtl&&(n.left=n.left-x.container[0].scrollLeft);for(var o=[[n.left,n.top],[n.left+x.width,n.top],[n.left,n.top+x.height],[n.left+x.width,n.top+x.height]],l=0;l<o.length;l++){var p=o[l];p[0]>=s.left&&p[0]<=s.left+r&&p[1]>=s.top&&p[1]<=s.top+i&&(t=!0)}if(!t)return}x.isHorizontal()?(37!==a&&39!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!x.rtl||37===a&&x.rtl)&&x.slideNext(),(37===a&&!x.rtl||39===a&&x.rtl)&&x.slidePrev()):(38!==a&&40!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&x.slideNext(),38===a&&x.slidePrev()),x.emit("onKeyPress",x,a)}}function p(e){var a=0,t=0,s=0,r=0;return"detail"in e&&(t=e.detail),"wheelDelta"in e&&(t=-e.wheelDelta/120),"wheelDeltaY"in e&&(t=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(a=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(a=t,t=0),s=10*a,r=10*t,"deltaY"in e&&(r=e.deltaY),"deltaX"in e&&(s=e.deltaX),(s||r)&&e.deltaMode&&(1===e.deltaMode?(s*=40,r*=40):(s*=800,r*=800)),s&&!a&&(a=s<1?-1:1),r&&!t&&(t=r<1?-1:1),{spinX:a,spinY:t,pixelX:s,pixelY:r}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=0,t=x.rtl?-1:1,s=p(e);if(x.params.mousewheelForceToAxis)if(x.isHorizontal()){if(!(Math.abs(s.pixelX)>Math.abs(s.pixelY)))return;a=s.pixelX*t}else{if(!(Math.abs(s.pixelY)>Math.abs(s.pixelX)))return;a=s.pixelY}else a=Math.abs(s.pixelX)>Math.abs(s.pixelY)?-s.pixelX*t:-s.pixelY;if(0!==a){if(x.params.mousewheelInvert&&(a=-a),x.params.freeMode){var r=x.getWrapperTranslate()+a*x.params.mousewheelSensitivity,i=x.isBeginning,n=x.isEnd;if(r>=x.minTranslate()&&(r=x.minTranslate()),r<=x.maxTranslate()&&(r=x.maxTranslate()),x.setWrapperTransition(0),x.setWrapperTranslate(r),x.updateProgress(),x.updateActiveIndex(),(!i&&x.isBeginning||!n&&x.isEnd)&&x.updateClasses(),x.params.freeModeSticky?(clearTimeout(x.mousewheel.timeout),x.mousewheel.timeout=setTimeout(function(){x.slideReset()},300)):x.params.lazyLoading&&x.lazy&&x.lazy.load(),x.emit("onScroll",x,e),x.params.autoplay&&x.params.autoplayDisableOnInteraction&&x.stopAutoplay(),0===r||r===x.maxTranslate())return}else{if((new window.Date).getTime()-x.mousewheel.lastScrollTime>60)if(a<0)if(x.isEnd&&!x.params.loop||x.animating){if(x.params.mousewheelReleaseOnEdges)return!0}else x.slideNext(),x.emit("onScroll",x,e);else if(x.isBeginning&&!x.params.loop||x.animating){if(x.params.mousewheelReleaseOnEdges)return!0}else x.slidePrev(),x.emit("onScroll",x,e);x.mousewheel.lastScrollTime=(new window.Date).getTime()}return e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function m(a,t){a=e(a);var s,r,i,n=x.rtl?-1:1;s=a.attr("data-swiper-parallax")||"0",r=a.attr("data-swiper-parallax-x"),i=a.attr("data-swiper-parallax-y"),r||i?(r=r||"0",i=i||"0"):x.isHorizontal()?(r=s,i="0"):(i=s,r="0"),r=r.indexOf("%")>=0?parseInt(r,10)*t*n+"%":r*t*n+"px",i=i.indexOf("%")>=0?parseInt(i,10)*t+"%":i*t+"px",a.transform("translate3d("+r+", "+i+",0px)")}function u(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof a))return new a(t,s);var c={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,zoom:!1,zoomMax:3,zoomMin:1,zoomToggle:!0,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,mousewheelEventsTarged:"container",hashnav:!1,hashnavWatchState:!1,history:!1,replaceState:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,touchReleaseOnEdges:!1,uniqueNavElements:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",normalizeSlideIndex:!0,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",paginationClickableClass:"swiper-pagination-clickable",paginationModifierClass:"swiper-pagination-",lazyLoadingClass:"swiper-lazy",lazyStatusLoadingClass:"swiper-lazy-loading",lazyStatusLoadedClass:"swiper-lazy-loaded",lazyPreloaderClass:"swiper-lazy-preloader",notificationClass:"swiper-notification",preloaderClass:"preloader",zoomContainerClass:"swiper-zoom-container",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},g=s&&s.virtualTranslate;s=s||{};var h={};for(var v in s)if("object"!=typeof s[v]||null===s[v]||(s[v].nodeType||s[v]===window||s[v]===document||"undefined"!=typeof Dom7&&s[v]instanceof Dom7||"undefined"!=typeof jQuery&&s[v]instanceof jQuery))h[v]=s[v];else{h[v]={};for(var f in s[v])h[v][f]=s[v][f]}for(var w in c)if(void 0===s[w])s[w]=c[w];else if("object"==typeof s[w])for(var y in c[w])void 0===s[w][y]&&(s[w][y]=c[w][y]);var x=this;if(x.params=s,x.originalParams=h,x.classNames=[],void 0!==e&&"undefined"!=typeof Dom7&&(e=Dom7),(void 0!==e||(e="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7))&&(x.$=e,x.currentBreakpoint=void 0,x.getActiveBreakpoint=function(){if(!x.params.breakpoints)return!1;var e,a=!1,t=[];for(e in x.params.breakpoints)x.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var s=0;s<t.length;s++)(e=t[s])>=window.innerWidth&&!a&&(a=e);return a||"max"},x.setBreakpoint=function(){var e=x.getActiveBreakpoint();if(e&&x.currentBreakpoint!==e){var a=e in x.params.breakpoints?x.params.breakpoints[e]:x.originalParams,t=x.params.loop&&a.slidesPerView!==x.params.slidesPerView;for(var s in a)x.params[s]=a[s];x.currentBreakpoint=e,t&&x.destroyLoop&&x.reLoop(!0)}},x.params.breakpoints&&x.setBreakpoint(),x.container=e(t),0!==x.container.length)){if(x.container.length>1){var T=[];return x.container.each(function(){T.push(new a(this,s))}),T}x.container[0].swiper=x,x.container.data("swiper",x),x.classNames.push(x.params.containerModifierClass+x.params.direction),x.params.freeMode&&x.classNames.push(x.params.containerModifierClass+"free-mode"),x.support.flexbox||(x.classNames.push(x.params.containerModifierClass+"no-flexbox"),x.params.slidesPerColumn=1),x.params.autoHeight&&x.classNames.push(x.params.containerModifierClass+"autoheight"),(x.params.parallax||x.params.watchSlidesVisibility)&&(x.params.watchSlidesProgress=!0),x.params.touchReleaseOnEdges&&(x.params.resistanceRatio=0),["cube","coverflow","flip"].indexOf(x.params.effect)>=0&&(x.support.transforms3d?(x.params.watchSlidesProgress=!0,x.classNames.push(x.params.containerModifierClass+"3d")):x.params.effect="slide"),"slide"!==x.params.effect&&x.classNames.push(x.params.containerModifierClass+x.params.effect),"cube"===x.params.effect&&(x.params.resistanceRatio=0,x.params.slidesPerView=1,x.params.slidesPerColumn=1,x.params.slidesPerGroup=1,x.params.centeredSlides=!1,x.params.spaceBetween=0,x.params.virtualTranslate=!0),"fade"!==x.params.effect&&"flip"!==x.params.effect||(x.params.slidesPerView=1,x.params.slidesPerColumn=1,x.params.slidesPerGroup=1,x.params.watchSlidesProgress=!0,x.params.spaceBetween=0,void 0===g&&(x.params.virtualTranslate=!0)),x.params.grabCursor&&x.support.touch&&(x.params.grabCursor=!1),x.wrapper=x.container.children("."+x.params.wrapperClass),x.params.pagination&&(x.paginationContainer=e(x.params.pagination),x.params.uniqueNavElements&&"string"==typeof x.params.pagination&&x.paginationContainer.length>1&&1===x.container.find(x.params.pagination).length&&(x.paginationContainer=x.container.find(x.params.pagination)),"bullets"===x.params.paginationType&&x.params.paginationClickable?x.paginationContainer.addClass(x.params.paginationModifierClass+"clickable"):x.params.paginationClickable=!1,x.paginationContainer.addClass(x.params.paginationModifierClass+x.params.paginationType)),(x.params.nextButton||x.params.prevButton)&&(x.params.nextButton&&(x.nextButton=e(x.params.nextButton),x.params.uniqueNavElements&&"string"==typeof x.params.nextButton&&x.nextButton.length>1&&1===x.container.find(x.params.nextButton).length&&(x.nextButton=x.container.find(x.params.nextButton))),x.params.prevButton&&(x.prevButton=e(x.params.prevButton),x.params.uniqueNavElements&&"string"==typeof x.params.prevButton&&x.prevButton.length>1&&1===x.container.find(x.params.prevButton).length&&(x.prevButton=x.container.find(x.params.prevButton)))),x.isHorizontal=function(){return"horizontal"===x.params.direction},x.rtl=x.isHorizontal()&&("rtl"===x.container[0].dir.toLowerCase()||"rtl"===x.container.css("direction")),x.rtl&&x.classNames.push(x.params.containerModifierClass+"rtl"),x.rtl&&(x.wrongRTL="-webkit-box"===x.wrapper.css("display")),x.params.slidesPerColumn>1&&x.classNames.push(x.params.containerModifierClass+"multirow"),x.device.android&&x.classNames.push(x.params.containerModifierClass+"android"),x.container.addClass(x.classNames.join(" ")),x.translate=0,x.progress=0,x.velocity=0,x.lockSwipeToNext=function(){x.params.allowSwipeToNext=!1,x.params.allowSwipeToPrev===!1&&x.params.grabCursor&&x.unsetGrabCursor()},x.lockSwipeToPrev=function(){x.params.allowSwipeToPrev=!1,x.params.allowSwipeToNext===!1&&x.params.grabCursor&&x.unsetGrabCursor()},x.lockSwipes=function(){x.params.allowSwipeToNext=x.params.allowSwipeToPrev=!1,x.params.grabCursor&&x.unsetGrabCursor()},x.unlockSwipeToNext=function(){x.params.allowSwipeToNext=!0,x.params.allowSwipeToPrev===!0&&x.params.grabCursor&&x.setGrabCursor()},x.unlockSwipeToPrev=function(){x.params.allowSwipeToPrev=!0,x.params.allowSwipeToNext===!0&&x.params.grabCursor&&x.setGrabCursor()},x.unlockSwipes=function(){x.params.allowSwipeToNext=x.params.allowSwipeToPrev=!0,x.params.grabCursor&&x.setGrabCursor()},x.setGrabCursor=function(e){x.container[0].style.cursor="move",x.container[0].style.cursor=e?"-webkit-grabbing":"-webkit-grab",x.container[0].style.cursor=e?"-moz-grabbin":"-moz-grab",x.container[0].style.cursor=e?"grabbing":"grab"},x.unsetGrabCursor=function(){x.container[0].style.cursor=""},x.params.grabCursor&&x.setGrabCursor(),x.imagesToLoad=[],x.imagesLoaded=0,x.loadImage=function(e,a,t,s,r,i){function n(){i&&i()}var o;e.complete&&r?n():a?(o=new window.Image,o.onload=n,o.onerror=n,s&&(o.sizes=s),t&&(o.srcset=t),a&&(o.src=a)):n()},x.preloadImages=function(){function e(){void 0!==x&&null!==x&&x&&(void 0!==x.imagesLoaded&&x.imagesLoaded++,x.imagesLoaded===x.imagesToLoad.length&&(x.params.updateOnImagesReady&&x.update(),x.emit("onImagesReady",x)))}x.imagesToLoad=x.container.find("img");for(var a=0;a<x.imagesToLoad.length;a++)x.loadImage(x.imagesToLoad[a],x.imagesToLoad[a].currentSrc||x.imagesToLoad[a].getAttribute("src"),x.imagesToLoad[a].srcset||x.imagesToLoad[a].getAttribute("srcset"),x.imagesToLoad[a].sizes||x.imagesToLoad[a].getAttribute("sizes"),!0,e)},x.autoplayTimeoutId=void 0,x.autoplaying=!1,x.autoplayPaused=!1,x.startAutoplay=function(){return void 0===x.autoplayTimeoutId&&(!!x.params.autoplay&&(!x.autoplaying&&(x.autoplaying=!0,x.emit("onAutoplayStart",x),void i())))},x.stopAutoplay=function(e){x.autoplayTimeoutId&&(x.autoplayTimeoutId&&clearTimeout(x.autoplayTimeoutId),x.autoplaying=!1,x.autoplayTimeoutId=void 0,x.emit("onAutoplayStop",x))},x.pauseAutoplay=function(e){x.autoplayPaused||(x.autoplayTimeoutId&&clearTimeout(x.autoplayTimeoutId),x.autoplayPaused=!0,0===e?(x.autoplayPaused=!1,i()):x.wrapper.transitionEnd(function(){x&&(x.autoplayPaused=!1,x.autoplaying?i():x.stopAutoplay())}))},x.minTranslate=function(){return-x.snapGrid[0]},x.maxTranslate=function(){return-x.snapGrid[x.snapGrid.length-1]},x.updateAutoHeight=function(){var e,a=[],t=0;if("auto"!==x.params.slidesPerView&&x.params.slidesPerView>1)for(e=0;e<Math.ceil(x.params.slidesPerView);e++){var s=x.activeIndex+e;if(s>x.slides.length)break;a.push(x.slides.eq(s)[0])}else a.push(x.slides.eq(x.activeIndex)[0]);for(e=0;e<a.length;e++)if(void 0!==a[e]){var r=a[e].offsetHeight;t=r>t?r:t}t&&x.wrapper.css("height",t+"px")},x.updateContainerSize=function(){var e,a;e=void 0!==x.params.width?x.params.width:x.container[0].clientWidth,a=void 0!==x.params.height?x.params.height:x.container[0].clientHeight,0===e&&x.isHorizontal()||0===a&&!x.isHorizontal()||(e=e-parseInt(x.container.css("padding-left"),10)-parseInt(x.container.css("padding-right"),10),a=a-parseInt(x.container.css("padding-top"),10)-parseInt(x.container.css("padding-bottom"),10),x.width=e,x.height=a,x.size=x.isHorizontal()?x.width:x.height)},x.updateSlidesSize=function(){x.slides=x.wrapper.children("."+x.params.slideClass),x.snapGrid=[],x.slidesGrid=[],x.slidesSizesGrid=[];var e,a=x.params.spaceBetween,t=-x.params.slidesOffsetBefore,s=0,i=0;if(void 0!==x.size){"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*x.size),x.virtualSize=-a,x.rtl?x.slides.css({marginLeft:"",marginTop:""}):x.slides.css({marginRight:"",marginBottom:""});var n;x.params.slidesPerColumn>1&&(n=Math.floor(x.slides.length/x.params.slidesPerColumn)===x.slides.length/x.params.slidesPerColumn?x.slides.length:Math.ceil(x.slides.length/x.params.slidesPerColumn)*x.params.slidesPerColumn,"auto"!==x.params.slidesPerView&&"row"===x.params.slidesPerColumnFill&&(n=Math.max(n,x.params.slidesPerView*x.params.slidesPerColumn)));var o,l=x.params.slidesPerColumn,p=n/l,d=p-(x.params.slidesPerColumn*p-x.slides.length);for(e=0;e<x.slides.length;e++){o=0;var m=x.slides.eq(e);if(x.params.slidesPerColumn>1){var u,c,g;"column"===x.params.slidesPerColumnFill?(c=Math.floor(e/l),g=e-c*l,(c>d||c===d&&g===l-1)&&++g>=l&&(g=0,c++),u=c+g*n/l,m.css({"-webkit-box-ordinal-group":u,"-moz-box-ordinal-group":u,"-ms-flex-order":u,"-webkit-order":u,order:u})):(g=Math.floor(e/p),c=e-g*p),m.css("margin-"+(x.isHorizontal()?"top":"left"),0!==g&&x.params.spaceBetween&&x.params.spaceBetween+"px").attr("data-swiper-column",c).attr("data-swiper-row",g)}"none"!==m.css("display")&&("auto"===x.params.slidesPerView?(o=x.isHorizontal()?m.outerWidth(!0):m.outerHeight(!0),x.params.roundLengths&&(o=r(o))):(o=(x.size-(x.params.slidesPerView-1)*a)/x.params.slidesPerView,x.params.roundLengths&&(o=r(o)),x.isHorizontal()?x.slides[e].style.width=o+"px":x.slides[e].style.height=o+"px"),x.slides[e].swiperSlideSize=o,x.slidesSizesGrid.push(o),x.params.centeredSlides?(t=t+o/2+s/2+a,0===s&&0!==e&&(t=t-x.size/2-a),0===e&&(t=t-x.size/2-a),Math.abs(t)<.001&&(t=0),i%x.params.slidesPerGroup==0&&x.snapGrid.push(t),x.slidesGrid.push(t)):(i%x.params.slidesPerGroup==0&&x.snapGrid.push(t),x.slidesGrid.push(t),t=t+o+a),x.virtualSize+=o+a,s=o,i++)}x.virtualSize=Math.max(x.virtualSize,x.size)+x.params.slidesOffsetAfter;var h;if(x.rtl&&x.wrongRTL&&("slide"===x.params.effect||"coverflow"===x.params.effect)&&x.wrapper.css({width:x.virtualSize+x.params.spaceBetween+"px"}),x.support.flexbox&&!x.params.setWrapperSize||(x.isHorizontal()?x.wrapper.css({width:x.virtualSize+x.params.spaceBetween+"px"}):x.wrapper.css({height:x.virtualSize+x.params.spaceBetween+"px"})),x.params.slidesPerColumn>1&&(x.virtualSize=(o+x.params.spaceBetween)*n,x.virtualSize=Math.ceil(x.virtualSize/x.params.slidesPerColumn)-x.params.spaceBetween,x.isHorizontal()?x.wrapper.css({width:x.virtualSize+x.params.spaceBetween+"px"}):x.wrapper.css({height:x.virtualSize+x.params.spaceBetween+"px"}),x.params.centeredSlides)){for(h=[],e=0;e<x.snapGrid.length;e++)x.snapGrid[e]<x.virtualSize+x.snapGrid[0]&&h.push(x.snapGrid[e]);x.snapGrid=h}if(!x.params.centeredSlides){for(h=[],e=0;e<x.snapGrid.length;e++)x.snapGrid[e]<=x.virtualSize-x.size&&h.push(x.snapGrid[e]);x.snapGrid=h,Math.floor(x.virtualSize-x.size)-Math.floor(x.snapGrid[x.snapGrid.length-1])>1&&x.snapGrid.push(x.virtualSize-x.size)}0===x.snapGrid.length&&(x.snapGrid=[0]),0!==x.params.spaceBetween&&(x.isHorizontal()?x.rtl?x.slides.css({marginLeft:a+"px"}):x.slides.css({marginRight:a+"px"}):x.slides.css({marginBottom:a+"px"})),x.params.watchSlidesProgress&&x.updateSlidesOffset()}},x.updateSlidesOffset=function(){for(var e=0;e<x.slides.length;e++)x.slides[e].swiperSlideOffset=x.isHorizontal()?x.slides[e].offsetLeft:x.slides[e].offsetTop},x.currentSlidesPerView=function(){var e,a,t=1;if(x.params.centeredSlides){var s,r=x.slides[x.activeIndex].swiperSlideSize;for(e=x.activeIndex+1;e<x.slides.length;e++)x.slides[e]&&!s&&(r+=x.slides[e].swiperSlideSize,t++,r>x.size&&(s=!0));for(a=x.activeIndex-1;a>=0;a--)x.slides[a]&&!s&&(r+=x.slides[a].swiperSlideSize,t++,r>x.size&&(s=!0))}else for(e=x.activeIndex+1;e<x.slides.length;e++)x.slidesGrid[e]-x.slidesGrid[x.activeIndex]<x.size&&t++;return t},x.updateSlidesProgress=function(e){if(void 0===e&&(e=x.translate||0),0!==x.slides.length){void 0===x.slides[0].swiperSlideOffset&&x.updateSlidesOffset();var a=-e;x.rtl&&(a=e),x.slides.removeClass(x.params.slideVisibleClass);for(var t=0;t<x.slides.length;t++){var s=x.slides[t],r=(a+(x.params.centeredSlides?x.minTranslate():0)-s.swiperSlideOffset)/(s.swiperSlideSize+x.params.spaceBetween);if(x.params.watchSlidesVisibility){var i=-(a-s.swiperSlideOffset),n=i+x.slidesSizesGrid[t];(i>=0&&i<x.size||n>0&&n<=x.size||i<=0&&n>=x.size)&&x.slides.eq(t).addClass(x.params.slideVisibleClass)}s.progress=x.rtl?-r:r}}},x.updateProgress=function(e){void 0===e&&(e=x.translate||0);var a=x.maxTranslate()-x.minTranslate(),t=x.isBeginning,s=x.isEnd;0===a?(x.progress=0,x.isBeginning=x.isEnd=!0):(x.progress=(e-x.minTranslate())/a,x.isBeginning=x.progress<=0,x.isEnd=x.progress>=1),x.isBeginning&&!t&&x.emit("onReachBeginning",x),x.isEnd&&!s&&x.emit("onReachEnd",x),x.params.watchSlidesProgress&&x.updateSlidesProgress(e),x.emit("onProgress",x,x.progress)},x.updateActiveIndex=function(){var e,a,t,s=x.rtl?x.translate:-x.translate;for(a=0;a<x.slidesGrid.length;a++)void 0!==x.slidesGrid[a+1]?s>=x.slidesGrid[a]&&s<x.slidesGrid[a+1]-(x.slidesGrid[a+1]-x.slidesGrid[a])/2?e=a:s>=x.slidesGrid[a]&&s<x.slidesGrid[a+1]&&(e=a+1):s>=x.slidesGrid[a]&&(e=a);x.params.normalizeSlideIndex&&(e<0||void 0===e)&&(e=0),t=Math.floor(e/x.params.slidesPerGroup),t>=x.snapGrid.length&&(t=x.snapGrid.length-1),e!==x.activeIndex&&(x.snapIndex=t,x.previousIndex=x.activeIndex,x.activeIndex=e,x.updateClasses(),x.updateRealIndex())},x.updateRealIndex=function(){x.realIndex=parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index")||x.activeIndex,10)},x.updateClasses=function(){x.slides.removeClass(x.params.slideActiveClass+" "+x.params.slideNextClass+" "+x.params.slidePrevClass+" "+x.params.slideDuplicateActiveClass+" "+x.params.slideDuplicateNextClass+" "+x.params.slideDuplicatePrevClass);var a=x.slides.eq(x.activeIndex);a.addClass(x.params.slideActiveClass),s.loop&&(a.hasClass(x.params.slideDuplicateClass)?x.wrapper.children("."+x.params.slideClass+":not(."+x.params.slideDuplicateClass+')[data-swiper-slide-index="'+x.realIndex+'"]').addClass(x.params.slideDuplicateActiveClass):x.wrapper.children("."+x.params.slideClass+"."+x.params.slideDuplicateClass+'[data-swiper-slide-index="'+x.realIndex+'"]').addClass(x.params.slideDuplicateActiveClass));var t=a.next("."+x.params.slideClass).addClass(x.params.slideNextClass);x.params.loop&&0===t.length&&(t=x.slides.eq(0),t.addClass(x.params.slideNextClass));var r=a.prev("."+x.params.slideClass).addClass(x.params.slidePrevClass);if(x.params.loop&&0===r.length&&(r=x.slides.eq(-1),r.addClass(x.params.slidePrevClass)),s.loop&&(t.hasClass(x.params.slideDuplicateClass)?x.wrapper.children("."+x.params.slideClass+":not(."+x.params.slideDuplicateClass+')[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(x.params.slideDuplicateNextClass):x.wrapper.children("."+x.params.slideClass+"."+x.params.slideDuplicateClass+'[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(x.params.slideDuplicateNextClass),r.hasClass(x.params.slideDuplicateClass)?x.wrapper.children("."+x.params.slideClass+":not(."+x.params.slideDuplicateClass+')[data-swiper-slide-index="'+r.attr("data-swiper-slide-index")+'"]').addClass(x.params.slideDuplicatePrevClass):x.wrapper.children("."+x.params.slideClass+"."+x.params.slideDuplicateClass+'[data-swiper-slide-index="'+r.attr("data-swiper-slide-index")+'"]').addClass(x.params.slideDuplicatePrevClass)),x.paginationContainer&&x.paginationContainer.length>0){var i,n=x.params.loop?Math.ceil((x.slides.length-2*x.loopedSlides)/x.params.slidesPerGroup):x.snapGrid.length;if(x.params.loop?(i=Math.ceil((x.activeIndex-x.loopedSlides)/x.params.slidesPerGroup),i>x.slides.length-1-2*x.loopedSlides&&(i-=x.slides.length-2*x.loopedSlides),i>n-1&&(i-=n),i<0&&"bullets"!==x.params.paginationType&&(i=n+i)):i=void 0!==x.snapIndex?x.snapIndex:x.activeIndex||0,"bullets"===x.params.paginationType&&x.bullets&&x.bullets.length>0&&(x.bullets.removeClass(x.params.bulletActiveClass),x.paginationContainer.length>1?x.bullets.each(function(){e(this).index()===i&&e(this).addClass(x.params.bulletActiveClass)}):x.bullets.eq(i).addClass(x.params.bulletActiveClass)),"fraction"===x.params.paginationType&&(x.paginationContainer.find("."+x.params.paginationCurrentClass).text(i+1),x.paginationContainer.find("."+x.params.paginationTotalClass).text(n)),"progress"===x.params.paginationType){var o=(i+1)/n,l=o,p=1;x.isHorizontal()||(p=o,l=1),x.paginationContainer.find("."+x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+l+") scaleY("+p+")").transition(x.params.speed)}"custom"===x.params.paginationType&&x.params.paginationCustomRender&&(x.paginationContainer.html(x.params.paginationCustomRender(x,i+1,n)),x.emit("onPaginationRendered",x,x.paginationContainer[0]))}x.params.loop||(x.params.prevButton&&x.prevButton&&x.prevButton.length>0&&(x.isBeginning?(x.prevButton.addClass(x.params.buttonDisabledClass),x.params.a11y&&x.a11y&&x.a11y.disable(x.prevButton)):(x.prevButton.removeClass(x.params.buttonDisabledClass),x.params.a11y&&x.a11y&&x.a11y.enable(x.prevButton))),x.params.nextButton&&x.nextButton&&x.nextButton.length>0&&(x.isEnd?(x.nextButton.addClass(x.params.buttonDisabledClass),x.params.a11y&&x.a11y&&x.a11y.disable(x.nextButton)):(x.nextButton.removeClass(x.params.buttonDisabledClass),x.params.a11y&&x.a11y&&x.a11y.enable(x.nextButton))))},x.updatePagination=function(){if(x.params.pagination&&x.paginationContainer&&x.paginationContainer.length>0){var e="";if("bullets"===x.params.paginationType){for(var a=x.params.loop?Math.ceil((x.slides.length-2*x.loopedSlides)/x.params.slidesPerGroup):x.snapGrid.length,t=0;t<a;t++)e+=x.params.paginationBulletRender?x.params.paginationBulletRender(x,t,x.params.bulletClass):"<"+x.params.paginationElement+' class="'+x.params.bulletClass+'"></'+x.params.paginationElement+">";x.paginationContainer.html(e),x.bullets=x.paginationContainer.find("."+x.params.bulletClass),x.params.paginationClickable&&x.params.a11y&&x.a11y&&x.a11y.initPagination()}"fraction"===x.params.paginationType&&(e=x.params.paginationFractionRender?x.params.paginationFractionRender(x,x.params.paginationCurrentClass,x.params.paginationTotalClass):'<span class="'+x.params.paginationCurrentClass+'"></span> / <span class="'+x.params.paginationTotalClass+'"></span>',x.paginationContainer.html(e)),"progress"===x.params.paginationType&&(e=x.params.paginationProgressRender?x.params.paginationProgressRender(x,x.params.paginationProgressbarClass):'<span class="'+x.params.paginationProgressbarClass+'"></span>',x.paginationContainer.html(e)),"custom"!==x.params.paginationType&&x.emit("onPaginationRendered",x,x.paginationContainer[0])}},x.update=function(e){function a(){x.rtl,x.translate;t=Math.min(Math.max(x.translate,x.maxTranslate()),x.minTranslate()),x.setWrapperTranslate(t),x.updateActiveIndex(),x.updateClasses()}if(x){x.updateContainerSize(),x.updateSlidesSize(),x.updateProgress(),x.updatePagination(),x.updateClasses(),x.params.scrollbar&&x.scrollbar&&x.scrollbar.set();var t;if(e){x.controller&&x.controller.spline&&(x.controller.spline=void 0),x.params.freeMode?(a(),x.params.autoHeight&&x.updateAutoHeight()):(("auto"===x.params.slidesPerView||x.params.slidesPerView>1)&&x.isEnd&&!x.params.centeredSlides?x.slideTo(x.slides.length-1,0,!1,!0):x.slideTo(x.activeIndex,0,!1,!0))||a()}else x.params.autoHeight&&x.updateAutoHeight()}},x.onResize=function(e){x.params.onBeforeResize&&x.params.onBeforeResize(x),x.params.breakpoints&&x.setBreakpoint();var a=x.params.allowSwipeToPrev,t=x.params.allowSwipeToNext;x.params.allowSwipeToPrev=x.params.allowSwipeToNext=!0,x.updateContainerSize(),x.updateSlidesSize(),("auto"===x.params.slidesPerView||x.params.freeMode||e)&&x.updatePagination(),x.params.scrollbar&&x.scrollbar&&x.scrollbar.set(),x.controller&&x.controller.spline&&(x.controller.spline=void 0);var s=!1;if(x.params.freeMode){var r=Math.min(Math.max(x.translate,x.maxTranslate()),x.minTranslate());x.setWrapperTranslate(r),x.updateActiveIndex(),x.updateClasses(),x.params.autoHeight&&x.updateAutoHeight()}else x.updateClasses(),s=("auto"===x.params.slidesPerView||x.params.slidesPerView>1)&&x.isEnd&&!x.params.centeredSlides?x.slideTo(x.slides.length-1,0,!1,!0):x.slideTo(x.activeIndex,0,!1,!0);x.params.lazyLoading&&!s&&x.lazy&&x.lazy.load(),x.params.allowSwipeToPrev=a,x.params.allowSwipeToNext=t,x.params.onAfterResize&&x.params.onAfterResize(x)},x.touchEventsDesktop={start:"mousedown",move:"mousemove",end:"mouseup"},window.navigator.pointerEnabled?x.touchEventsDesktop={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(x.touchEventsDesktop={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}),x.touchEvents={start:x.support.touch||!x.params.simulateTouch?"touchstart":x.touchEventsDesktop.start,move:x.support.touch||!x.params.simulateTouch?"touchmove":x.touchEventsDesktop.move,end:x.support.touch||!x.params.simulateTouch?"touchend":x.touchEventsDesktop.end},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===x.params.touchEventsTarget?x.container:x.wrapper).addClass("swiper-wp8-"+x.params.direction),x.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",r="container"===x.params.touchEventsTarget?x.container[0]:x.wrapper[0],i=x.support.touch?r:document,n=!!x.params.nested;if(x.browser.ie)r[t](x.touchEvents.start,x.onTouchStart,!1),i[t](x.touchEvents.move,x.onTouchMove,n),i[t](x.touchEvents.end,x.onTouchEnd,!1);else{if(x.support.touch){var o=!("touchstart"!==x.touchEvents.start||!x.support.passiveListener||!x.params.passiveListeners)&&{passive:!0,capture:!1};r[t](x.touchEvents.start,x.onTouchStart,o),r[t](x.touchEvents.move,x.onTouchMove,n),r[t](x.touchEvents.end,x.onTouchEnd,o)}(s.simulateTouch&&!x.device.ios&&!x.device.android||s.simulateTouch&&!x.support.touch&&x.device.ios)&&(r[t]("mousedown",x.onTouchStart,!1),document[t]("mousemove",x.onTouchMove,n),document[t]("mouseup",x.onTouchEnd,!1))}window[t]("resize",x.onResize),x.params.nextButton&&x.nextButton&&x.nextButton.length>0&&(x.nextButton[a]("click",x.onClickNext),x.params.a11y&&x.a11y&&x.nextButton[a]("keydown",x.a11y.onEnterKey)),x.params.prevButton&&x.prevButton&&x.prevButton.length>0&&(x.prevButton[a]("click",x.onClickPrev),x.params.a11y&&x.a11y&&x.prevButton[a]("keydown",x.a11y.onEnterKey)),x.params.pagination&&x.params.paginationClickable&&(x.paginationContainer[a]("click","."+x.params.bulletClass,x.onClickIndex),x.params.a11y&&x.a11y&&x.paginationContainer[a]("keydown","."+x.params.bulletClass,x.a11y.onEnterKey)),(x.params.preventClicks||x.params.preventClicksPropagation)&&r[t]("click",x.preventClicks,!0)},x.attachEvents=function(){x.initEvents()},x.detachEvents=function(){x.initEvents(!0)},x.allowClick=!0,x.preventClicks=function(e){x.allowClick||(x.params.preventClicks&&e.preventDefault(),x.params.preventClicksPropagation&&x.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},x.onClickNext=function(e){e.preventDefault(),x.isEnd&&!x.params.loop||x.slideNext()},x.onClickPrev=function(e){e.preventDefault(),x.isBeginning&&!x.params.loop||x.slidePrev()},x.onClickIndex=function(a){a.preventDefault();var t=e(this).index()*x.params.slidesPerGroup
;x.params.loop&&(t+=x.loopedSlides),x.slideTo(t)},x.updateClickedSlide=function(a){var t=n(a,"."+x.params.slideClass),s=!1;if(t)for(var r=0;r<x.slides.length;r++)x.slides[r]===t&&(s=!0);if(!t||!s)return x.clickedSlide=void 0,void(x.clickedIndex=void 0);if(x.clickedSlide=t,x.clickedIndex=e(t).index(),x.params.slideToClickedSlide&&void 0!==x.clickedIndex&&x.clickedIndex!==x.activeIndex){var i,o=x.clickedIndex,l="auto"===x.params.slidesPerView?x.currentSlidesPerView():x.params.slidesPerView;if(x.params.loop){if(x.animating)return;i=parseInt(e(x.clickedSlide).attr("data-swiper-slide-index"),10),x.params.centeredSlides?o<x.loopedSlides-l/2||o>x.slides.length-x.loopedSlides+l/2?(x.fixLoop(),o=x.wrapper.children("."+x.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.'+x.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){x.slideTo(o)},0)):x.slideTo(o):o>x.slides.length-l?(x.fixLoop(),o=x.wrapper.children("."+x.params.slideClass+'[data-swiper-slide-index="'+i+'"]:not(.'+x.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){x.slideTo(o)},0)):x.slideTo(o)}else x.slideTo(o)}};var b,C,S,z,M,P,E,I,k,D,L="input, select, textarea, button, video",B=Date.now(),H=[];x.animating=!1,x.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var G,X;x.onTouchStart=function(a){if(a.originalEvent&&(a=a.originalEvent),(G="touchstart"===a.type)||!("which"in a)||3!==a.which){if(x.params.noSwiping&&n(a,"."+x.params.noSwipingClass))return void(x.allowClick=!0);if(!x.params.swipeHandler||n(a,x.params.swipeHandler)){var t=x.touches.currentX="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,s=x.touches.currentY="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY;if(!(x.device.ios&&x.params.iOSEdgeSwipeDetection&&t<=x.params.iOSEdgeSwipeThreshold)){if(b=!0,C=!1,S=!0,M=void 0,X=void 0,x.touches.startX=t,x.touches.startY=s,z=Date.now(),x.allowClick=!0,x.updateContainerSize(),x.swipeDirection=void 0,x.params.threshold>0&&(I=!1),"touchstart"!==a.type){var r=!0;e(a.target).is(L)&&(r=!1),document.activeElement&&e(document.activeElement).is(L)&&document.activeElement.blur(),r&&a.preventDefault()}x.emit("onTouchStart",x,a)}}}},x.onTouchMove=function(a){if(a.originalEvent&&(a=a.originalEvent),!G||"mousemove"!==a.type){if(a.preventedByNestedSwiper)return x.touches.startX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,void(x.touches.startY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY);if(x.params.onlyExternal)return x.allowClick=!1,void(b&&(x.touches.startX=x.touches.currentX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,x.touches.startY=x.touches.currentY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,z=Date.now()));if(G&&x.params.touchReleaseOnEdges&&!x.params.loop)if(x.isHorizontal()){if(x.touches.currentX<x.touches.startX&&x.translate<=x.maxTranslate()||x.touches.currentX>x.touches.startX&&x.translate>=x.minTranslate())return}else if(x.touches.currentY<x.touches.startY&&x.translate<=x.maxTranslate()||x.touches.currentY>x.touches.startY&&x.translate>=x.minTranslate())return;if(G&&document.activeElement&&a.target===document.activeElement&&e(a.target).is(L))return C=!0,void(x.allowClick=!1);if(S&&x.emit("onTouchMove",x,a),!(a.targetTouches&&a.targetTouches.length>1)){if(x.touches.currentX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,x.touches.currentY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,void 0===M){var t;x.isHorizontal()&&x.touches.currentY===x.touches.startY||!x.isHorizontal()&&x.touches.currentX===x.touches.startX?M=!1:(t=180*Math.atan2(Math.abs(x.touches.currentY-x.touches.startY),Math.abs(x.touches.currentX-x.touches.startX))/Math.PI,M=x.isHorizontal()?t>x.params.touchAngle:90-t>x.params.touchAngle)}if(M&&x.emit("onTouchMoveOpposite",x,a),void 0===X&&(x.touches.currentX===x.touches.startX&&x.touches.currentY===x.touches.startY||(X=!0)),b){if(M)return void(b=!1);if(X){x.allowClick=!1,x.emit("onSliderMove",x,a),a.preventDefault(),x.params.touchMoveStopPropagation&&!x.params.nested&&a.stopPropagation(),C||(s.loop&&x.fixLoop(),E=x.getWrapperTranslate(),x.setWrapperTransition(0),x.animating&&x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),x.params.autoplay&&x.autoplaying&&(x.params.autoplayDisableOnInteraction?x.stopAutoplay():x.pauseAutoplay()),D=!1,!x.params.grabCursor||x.params.allowSwipeToNext!==!0&&x.params.allowSwipeToPrev!==!0||x.setGrabCursor(!0)),C=!0;var r=x.touches.diff=x.isHorizontal()?x.touches.currentX-x.touches.startX:x.touches.currentY-x.touches.startY;r*=x.params.touchRatio,x.rtl&&(r=-r),x.swipeDirection=r>0?"prev":"next",P=r+E;var i=!0;if(r>0&&P>x.minTranslate()?(i=!1,x.params.resistance&&(P=x.minTranslate()-1+Math.pow(-x.minTranslate()+E+r,x.params.resistanceRatio))):r<0&&P<x.maxTranslate()&&(i=!1,x.params.resistance&&(P=x.maxTranslate()+1-Math.pow(x.maxTranslate()-E-r,x.params.resistanceRatio))),i&&(a.preventedByNestedSwiper=!0),!x.params.allowSwipeToNext&&"next"===x.swipeDirection&&P<E&&(P=E),!x.params.allowSwipeToPrev&&"prev"===x.swipeDirection&&P>E&&(P=E),x.params.threshold>0){if(!(Math.abs(r)>x.params.threshold||I))return void(P=E);if(!I)return I=!0,x.touches.startX=x.touches.currentX,x.touches.startY=x.touches.currentY,P=E,void(x.touches.diff=x.isHorizontal()?x.touches.currentX-x.touches.startX:x.touches.currentY-x.touches.startY)}x.params.followFinger&&((x.params.freeMode||x.params.watchSlidesProgress)&&x.updateActiveIndex(),x.params.freeMode&&(0===H.length&&H.push({position:x.touches[x.isHorizontal()?"startX":"startY"],time:z}),H.push({position:x.touches[x.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),x.updateProgress(P),x.setWrapperTranslate(P))}}}}},x.onTouchEnd=function(a){if(a.originalEvent&&(a=a.originalEvent),S&&x.emit("onTouchEnd",x,a),S=!1,b){x.params.grabCursor&&C&&b&&(x.params.allowSwipeToNext===!0||x.params.allowSwipeToPrev===!0)&&x.setGrabCursor(!1);var t=Date.now(),s=t-z;if(x.allowClick&&(x.updateClickedSlide(a),x.emit("onTap",x,a),s<300&&t-B>300&&(k&&clearTimeout(k),k=setTimeout(function(){x&&(x.params.paginationHide&&x.paginationContainer.length>0&&!e(a.target).hasClass(x.params.bulletClass)&&x.paginationContainer.toggleClass(x.params.paginationHiddenClass),x.emit("onClick",x,a))},300)),s<300&&t-B<300&&(k&&clearTimeout(k),x.emit("onDoubleTap",x,a))),B=Date.now(),setTimeout(function(){x&&(x.allowClick=!0)},0),!b||!C||!x.swipeDirection||0===x.touches.diff||P===E)return void(b=C=!1);b=C=!1;var r;if(r=x.params.followFinger?x.rtl?x.translate:-x.translate:-P,x.params.freeMode){if(r<-x.minTranslate())return void x.slideTo(x.activeIndex);if(r>-x.maxTranslate())return void(x.slides.length<x.snapGrid.length?x.slideTo(x.snapGrid.length-1):x.slideTo(x.slides.length-1));if(x.params.freeModeMomentum){if(H.length>1){var i=H.pop(),n=H.pop(),o=i.position-n.position,l=i.time-n.time;x.velocity=o/l,x.velocity=x.velocity/2,Math.abs(x.velocity)<x.params.freeModeMinimumVelocity&&(x.velocity=0),(l>150||(new window.Date).getTime()-i.time>300)&&(x.velocity=0)}else x.velocity=0;x.velocity=x.velocity*x.params.freeModeMomentumVelocityRatio,H.length=0;var p=1e3*x.params.freeModeMomentumRatio,d=x.velocity*p,m=x.translate+d;x.rtl&&(m=-m);var u,c=!1,g=20*Math.abs(x.velocity)*x.params.freeModeMomentumBounceRatio;if(m<x.maxTranslate())x.params.freeModeMomentumBounce?(m+x.maxTranslate()<-g&&(m=x.maxTranslate()-g),u=x.maxTranslate(),c=!0,D=!0):m=x.maxTranslate();else if(m>x.minTranslate())x.params.freeModeMomentumBounce?(m-x.minTranslate()>g&&(m=x.minTranslate()+g),u=x.minTranslate(),c=!0,D=!0):m=x.minTranslate();else if(x.params.freeModeSticky){var h,v=0;for(v=0;v<x.snapGrid.length;v+=1)if(x.snapGrid[v]>-m){h=v;break}m=Math.abs(x.snapGrid[h]-m)<Math.abs(x.snapGrid[h-1]-m)||"next"===x.swipeDirection?x.snapGrid[h]:x.snapGrid[h-1],x.rtl||(m=-m)}if(0!==x.velocity)p=x.rtl?Math.abs((-m-x.translate)/x.velocity):Math.abs((m-x.translate)/x.velocity);else if(x.params.freeModeSticky)return void x.slideReset();x.params.freeModeMomentumBounce&&c?(x.updateProgress(u),x.setWrapperTransition(p),x.setWrapperTranslate(m),x.onTransitionStart(),x.animating=!0,x.wrapper.transitionEnd(function(){x&&D&&(x.emit("onMomentumBounce",x),x.setWrapperTransition(x.params.speed),x.setWrapperTranslate(u),x.wrapper.transitionEnd(function(){x&&x.onTransitionEnd()}))})):x.velocity?(x.updateProgress(m),x.setWrapperTransition(p),x.setWrapperTranslate(m),x.onTransitionStart(),x.animating||(x.animating=!0,x.wrapper.transitionEnd(function(){x&&x.onTransitionEnd()}))):x.updateProgress(m),x.updateActiveIndex()}return void((!x.params.freeModeMomentum||s>=x.params.longSwipesMs)&&(x.updateProgress(),x.updateActiveIndex()))}var f,w=0,y=x.slidesSizesGrid[0];for(f=0;f<x.slidesGrid.length;f+=x.params.slidesPerGroup)void 0!==x.slidesGrid[f+x.params.slidesPerGroup]?r>=x.slidesGrid[f]&&r<x.slidesGrid[f+x.params.slidesPerGroup]&&(w=f,y=x.slidesGrid[f+x.params.slidesPerGroup]-x.slidesGrid[f]):r>=x.slidesGrid[f]&&(w=f,y=x.slidesGrid[x.slidesGrid.length-1]-x.slidesGrid[x.slidesGrid.length-2]);var T=(r-x.slidesGrid[w])/y;if(s>x.params.longSwipesMs){if(!x.params.longSwipes)return void x.slideTo(x.activeIndex);"next"===x.swipeDirection&&(T>=x.params.longSwipesRatio?x.slideTo(w+x.params.slidesPerGroup):x.slideTo(w)),"prev"===x.swipeDirection&&(T>1-x.params.longSwipesRatio?x.slideTo(w+x.params.slidesPerGroup):x.slideTo(w))}else{if(!x.params.shortSwipes)return void x.slideTo(x.activeIndex);"next"===x.swipeDirection&&x.slideTo(w+x.params.slidesPerGroup),"prev"===x.swipeDirection&&x.slideTo(w)}}},x._slideTo=function(e,a){return x.slideTo(e,a,!0,!0)},x.slideTo=function(e,a,t,s){void 0===t&&(t=!0),void 0===e&&(e=0),e<0&&(e=0),x.snapIndex=Math.floor(e/x.params.slidesPerGroup),x.snapIndex>=x.snapGrid.length&&(x.snapIndex=x.snapGrid.length-1);var r=-x.snapGrid[x.snapIndex];if(x.params.autoplay&&x.autoplaying&&(s||!x.params.autoplayDisableOnInteraction?x.pauseAutoplay(a):x.stopAutoplay()),x.updateProgress(r),x.params.normalizeSlideIndex)for(var i=0;i<x.slidesGrid.length;i++)-Math.floor(100*r)>=Math.floor(100*x.slidesGrid[i])&&(e=i);return!(!x.params.allowSwipeToNext&&r<x.translate&&r<x.minTranslate())&&(!(!x.params.allowSwipeToPrev&&r>x.translate&&r>x.maxTranslate()&&(x.activeIndex||0)!==e)&&(void 0===a&&(a=x.params.speed),x.previousIndex=x.activeIndex||0,x.activeIndex=e,x.updateRealIndex(),x.rtl&&-r===x.translate||!x.rtl&&r===x.translate?(x.params.autoHeight&&x.updateAutoHeight(),x.updateClasses(),"slide"!==x.params.effect&&x.setWrapperTranslate(r),!1):(x.updateClasses(),x.onTransitionStart(t),0===a||x.browser.lteIE9?(x.setWrapperTranslate(r),x.setWrapperTransition(0),x.onTransitionEnd(t)):(x.setWrapperTranslate(r),x.setWrapperTransition(a),x.animating||(x.animating=!0,x.wrapper.transitionEnd(function(){x&&x.onTransitionEnd(t)}))),!0)))},x.onTransitionStart=function(e){void 0===e&&(e=!0),x.params.autoHeight&&x.updateAutoHeight(),x.lazy&&x.lazy.onTransitionStart(),e&&(x.emit("onTransitionStart",x),x.activeIndex!==x.previousIndex&&(x.emit("onSlideChangeStart",x),x.activeIndex>x.previousIndex?x.emit("onSlideNextStart",x):x.emit("onSlidePrevStart",x)))},x.onTransitionEnd=function(e){x.animating=!1,x.setWrapperTransition(0),void 0===e&&(e=!0),x.lazy&&x.lazy.onTransitionEnd(),e&&(x.emit("onTransitionEnd",x),x.activeIndex!==x.previousIndex&&(x.emit("onSlideChangeEnd",x),x.activeIndex>x.previousIndex?x.emit("onSlideNextEnd",x):x.emit("onSlidePrevEnd",x))),x.params.history&&x.history&&x.history.setHistory(x.params.history,x.activeIndex),x.params.hashnav&&x.hashnav&&x.hashnav.setHash()},x.slideNext=function(e,a,t){if(x.params.loop){if(x.animating)return!1;x.fixLoop();x.container[0].clientLeft;return x.slideTo(x.activeIndex+x.params.slidesPerGroup,a,e,t)}return x.slideTo(x.activeIndex+x.params.slidesPerGroup,a,e,t)},x._slideNext=function(e){return x.slideNext(!0,e,!0)},x.slidePrev=function(e,a,t){if(x.params.loop){if(x.animating)return!1;x.fixLoop();x.container[0].clientLeft;return x.slideTo(x.activeIndex-1,a,e,t)}return x.slideTo(x.activeIndex-1,a,e,t)},x._slidePrev=function(e){return x.slidePrev(!0,e,!0)},x.slideReset=function(e,a,t){return x.slideTo(x.activeIndex,a,e)},x.disableTouchControl=function(){return x.params.onlyExternal=!0,!0},x.enableTouchControl=function(){return x.params.onlyExternal=!1,!0},x.setWrapperTransition=function(e,a){x.wrapper.transition(e),"slide"!==x.params.effect&&x.effects[x.params.effect]&&x.effects[x.params.effect].setTransition(e),x.params.parallax&&x.parallax&&x.parallax.setTransition(e),x.params.scrollbar&&x.scrollbar&&x.scrollbar.setTransition(e),x.params.control&&x.controller&&x.controller.setTransition(e,a),x.emit("onSetTransition",x,e)},x.setWrapperTranslate=function(e,a,t){var s=0,i=0;x.isHorizontal()?s=x.rtl?-e:e:i=e,x.params.roundLengths&&(s=r(s),i=r(i)),x.params.virtualTranslate||(x.support.transforms3d?x.wrapper.transform("translate3d("+s+"px, "+i+"px, 0px)"):x.wrapper.transform("translate("+s+"px, "+i+"px)")),x.translate=x.isHorizontal()?s:i;var n,o=x.maxTranslate()-x.minTranslate();n=0===o?0:(e-x.minTranslate())/o,n!==x.progress&&x.updateProgress(e),a&&x.updateActiveIndex(),"slide"!==x.params.effect&&x.effects[x.params.effect]&&x.effects[x.params.effect].setTranslate(x.translate),x.params.parallax&&x.parallax&&x.parallax.setTranslate(x.translate),x.params.scrollbar&&x.scrollbar&&x.scrollbar.setTranslate(x.translate),x.params.control&&x.controller&&x.controller.setTranslate(x.translate,t),x.emit("onSetTranslate",x,x.translate)},x.getTranslate=function(e,a){var t,s,r,i;return void 0===a&&(a="x"),x.params.virtualTranslate?x.rtl?-x.translate:x.translate:(r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=r.transform||r.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),i=new window.WebKitCSSMatrix("none"===s?"":s)):(i=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?i.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(s=window.WebKitCSSMatrix?i.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),x.rtl&&s&&(s=-s),s||0)},x.getWrapperTranslate=function(e){return void 0===e&&(e=x.isHorizontal()?"x":"y"),x.getTranslate(x.wrapper[0],e)},x.observers=[],x.initObservers=function(){if(x.params.observeParents)for(var e=x.container.parents(),a=0;a<e.length;a++)o(e[a]);o(x.container[0],{childList:!1}),o(x.wrapper[0],{attributes:!1})},x.disconnectObservers=function(){for(var e=0;e<x.observers.length;e++)x.observers[e].disconnect();x.observers=[]},x.createLoop=function(){x.wrapper.children("."+x.params.slideClass+"."+x.params.slideDuplicateClass).remove();var a=x.wrapper.children("."+x.params.slideClass);"auto"!==x.params.slidesPerView||x.params.loopedSlides||(x.params.loopedSlides=a.length),x.loopedSlides=parseInt(x.params.loopedSlides||x.params.slidesPerView,10),x.loopedSlides=x.loopedSlides+x.params.loopAdditionalSlides,x.loopedSlides>a.length&&(x.loopedSlides=a.length);var t,s=[],r=[];for(a.each(function(t,i){var n=e(this);t<x.loopedSlides&&r.push(i),t<a.length&&t>=a.length-x.loopedSlides&&s.push(i),n.attr("data-swiper-slide-index",t)}),t=0;t<r.length;t++)x.wrapper.append(e(r[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass));for(t=s.length-1;t>=0;t--)x.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass))},x.destroyLoop=function(){x.wrapper.children("."+x.params.slideClass+"."+x.params.slideDuplicateClass).remove(),x.slides.removeAttr("data-swiper-slide-index")},x.reLoop=function(e){var a=x.activeIndex-x.loopedSlides;x.destroyLoop(),x.createLoop(),x.updateSlidesSize(),e&&x.slideTo(a+x.loopedSlides,0,!1)},x.fixLoop=function(){var e;x.activeIndex<x.loopedSlides?(e=x.slides.length-3*x.loopedSlides+x.activeIndex,e+=x.loopedSlides,x.slideTo(e,0,!1,!0)):("auto"===x.params.slidesPerView&&x.activeIndex>=2*x.loopedSlides||x.activeIndex>x.slides.length-2*x.params.slidesPerView)&&(e=-x.slides.length+x.activeIndex+x.loopedSlides,e+=x.loopedSlides,x.slideTo(e,0,!1,!0))},x.appendSlide=function(e){if(x.params.loop&&x.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&x.wrapper.append(e[a]);else x.wrapper.append(e);x.params.loop&&x.createLoop(),x.params.observer&&x.support.observer||x.update(!0)},x.prependSlide=function(e){x.params.loop&&x.destroyLoop();var a=x.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&x.wrapper.prepend(e[t]);a=x.activeIndex+e.length}else x.wrapper.prepend(e);x.params.loop&&x.createLoop(),x.params.observer&&x.support.observer||x.update(!0),x.slideTo(a,0,!1)},x.removeSlide=function(e){x.params.loop&&(x.destroyLoop(),x.slides=x.wrapper.children("."+x.params.slideClass));var a,t=x.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],x.slides[a]&&x.slides.eq(a).remove(),a<t&&t--;t=Math.max(t,0)}else a=e,x.slides[a]&&x.slides.eq(a).remove(),a<t&&t--,t=Math.max(t,0);x.params.loop&&x.createLoop(),x.params.observer&&x.support.observer||x.update(!0),x.params.loop?x.slideTo(t+x.loopedSlides,0,!1):x.slideTo(t,0,!1)},x.removeAllSlides=function(){for(var e=[],a=0;a<x.slides.length;a++)e.push(a);x.removeSlide(e)},x.effects={fade:{setTranslate:function(){for(var e=0;e<x.slides.length;e++){var a=x.slides.eq(e),t=a[0].swiperSlideOffset,s=-t;x.params.virtualTranslate||(s-=x.translate);var r=0;x.isHorizontal()||(r=s,s=0);var i=x.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:i}).transform("translate3d("+s+"px, "+r+"px, 0px)")}},setTransition:function(e){if(x.slides.transition(e),x.params.virtualTranslate&&0!==e){var a=!1;x.slides.transitionEnd(function(){if(!a&&x){a=!0,x.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)x.wrapper.trigger(e[t])}})}}},flip:{setTranslate:function(){for(var a=0;a<x.slides.length;a++){var t=x.slides.eq(a),s=t[0].progress;x.params.flip.limitRotation&&(s=Math.max(Math.min(t[0].progress,1),-1));var r=t[0].swiperSlideOffset,i=-180*s,n=i,o=0,l=-r,p=0;if(x.isHorizontal()?x.rtl&&(n=-n):(p=l,l=0,o=-n,n=0),t[0].style.zIndex=-Math.abs(Math.round(s))+x.slides.length,x.params.flip.slideShadows){var d=x.isHorizontal()?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),m=x.isHorizontal()?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===d.length&&(d=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"left":"top")+'"></div>'),t.append(d)),0===m.length&&(m=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"right":"bottom")+'"></div>'),t.append(m)),d.length&&(d[0].style.opacity=Math.max(-s,0)),m.length&&(m[0].style.opacity=Math.max(s,0))}t.transform("translate3d("+l+"px, "+p+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(a){if(x.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),x.params.virtualTranslate&&0!==a){var t=!1;x.slides.eq(x.activeIndex).transitionEnd(function(){if(!t&&x&&e(this).hasClass(x.params.slideActiveClass)){t=!0,x.animating=!1;for(var a=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=0;s<a.length;s++)x.wrapper.trigger(a[s])}})}}},cube:{setTranslate:function(){var a,t=0;x.params.cube.shadow&&(x.isHorizontal()?(a=x.wrapper.find(".swiper-cube-shadow"),0===a.length&&(a=e('<div class="swiper-cube-shadow"></div>'),x.wrapper.append(a)),a.css({height:x.width+"px"})):(a=x.container.find(".swiper-cube-shadow"),0===a.length&&(a=e('<div class="swiper-cube-shadow"></div>'),x.container.append(a))));for(var s=0;s<x.slides.length;s++){var r=x.slides.eq(s),i=90*s,n=Math.floor(i/360);x.rtl&&(i=-i,n=Math.floor(-i/360));var o=Math.max(Math.min(r[0].progress,1),-1),l=0,p=0,d=0;s%4==0?(l=4*-n*x.size,d=0):(s-1)%4==0?(l=0,d=4*-n*x.size):(s-2)%4==0?(l=x.size+4*n*x.size,d=x.size):(s-3)%4==0&&(l=-x.size,d=3*x.size+4*x.size*n),x.rtl&&(l=-l),x.isHorizontal()||(p=l,l=0);var m="rotateX("+(x.isHorizontal()?0:-i)+"deg) rotateY("+(x.isHorizontal()?i:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(o<=1&&o>-1&&(t=90*s+90*o,x.rtl&&(t=90*-s-90*o)),r.transform(m),x.params.cube.slideShadows){var u=x.isHorizontal()?r.find(".swiper-slide-shadow-left"):r.find(".swiper-slide-shadow-top"),c=x.isHorizontal()?r.find(".swiper-slide-shadow-right"):r.find(".swiper-slide-shadow-bottom");0===u.length&&(u=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"left":"top")+'"></div>'),r.append(u)),0===c.length&&(c=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"right":"bottom")+'"></div>'),r.append(c)),u.length&&(u[0].style.opacity=Math.max(-o,0)),c.length&&(c[0].style.opacity=Math.max(o,0))}}if(x.wrapper.css({"-webkit-transform-origin":"50% 50% -"+x.size/2+"px","-moz-transform-origin":"50% 50% -"+x.size/2+"px","-ms-transform-origin":"50% 50% -"+x.size/2+"px","transform-origin":"50% 50% -"+x.size/2+"px"}),x.params.cube.shadow)if(x.isHorizontal())a.transform("translate3d(0px, "+(x.width/2+x.params.cube.shadowOffset)+"px, "+-x.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+x.params.cube.shadowScale+")");else{var g=Math.abs(t)-90*Math.floor(Math.abs(t)/90),h=1.5-(Math.sin(2*g*Math.PI/360)/2+Math.cos(2*g*Math.PI/360)/2),v=x.params.cube.shadowScale,f=x.params.cube.shadowScale/h,w=x.params.cube.shadowOffset;a.transform("scale3d("+v+", 1, "+f+") translate3d(0px, "+(x.height/2+w)+"px, "+-x.height/2/f+"px) rotateX(-90deg)")}var y=x.isSafari||x.isUiWebView?-x.size/2:0;x.wrapper.transform("translate3d(0px,0,"+y+"px) rotateX("+(x.isHorizontal()?0:t)+"deg) rotateY("+(x.isHorizontal()?-t:0)+"deg)")},setTransition:function(e){x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),x.params.cube.shadow&&!x.isHorizontal()&&x.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var a=x.translate,t=x.isHorizontal()?-a+x.width/2:-a+x.height/2,s=x.isHorizontal()?x.params.coverflow.rotate:-x.params.coverflow.rotate,r=x.params.coverflow.depth,i=0,n=x.slides.length;i<n;i++){var o=x.slides.eq(i),l=x.slidesSizesGrid[i],p=o[0].swiperSlideOffset,d=(t-p-l/2)/l*x.params.coverflow.modifier,m=x.isHorizontal()?s*d:0,u=x.isHorizontal()?0:s*d,c=-r*Math.abs(d),g=x.isHorizontal()?0:x.params.coverflow.stretch*d,h=x.isHorizontal()?x.params.coverflow.stretch*d:0;Math.abs(h)<.001&&(h=0),Math.abs(g)<.001&&(g=0),Math.abs(c)<.001&&(c=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0);var v="translate3d("+h+"px,"+g+"px,"+c+"px)  rotateX("+u+"deg) rotateY("+m+"deg)";if(o.transform(v),o[0].style.zIndex=1-Math.abs(Math.round(d)),x.params.coverflow.slideShadows){var f=x.isHorizontal()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),w=x.isHorizontal()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===f.length&&(f=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"left":"top")+'"></div>'),o.append(f)),0===w.length&&(w=e('<div class="swiper-slide-shadow-'+(x.isHorizontal()?"right":"bottom")+'"></div>'),o.append(w)),f.length&&(f[0].style.opacity=d>0?d:0),w.length&&(w[0].style.opacity=-d>0?-d:0)}}if(x.browser.ie){x.wrapper[0].style.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},x.lazy={initialImageLoaded:!1,loadImageInSlide:function(a,t){if(void 0!==a&&(void 0===t&&(t=!0),0!==x.slides.length)){var s=x.slides.eq(a),r=s.find("."+x.params.lazyLoadingClass+":not(."+x.params.lazyStatusLoadedClass+"):not(."+x.params.lazyStatusLoadingClass+")");!s.hasClass(x.params.lazyLoadingClass)||s.hasClass(x.params.lazyStatusLoadedClass)||s.hasClass(x.params.lazyStatusLoadingClass)||(r=r.add(s[0])),0!==r.length&&r.each(function(){var a=e(this);a.addClass(x.params.lazyStatusLoadingClass);var r=a.attr("data-background"),i=a.attr("data-src"),n=a.attr("data-srcset"),o=a.attr("data-sizes");x.loadImage(a[0],i||r,n,o,!1,function(){if(void 0!==x&&null!==x&&x){if(r?(a.css("background-image",'url("'+r+'")'),a.removeAttr("data-background")):(n&&(a.attr("srcset",n),a.removeAttr("data-srcset")),o&&(a.attr("sizes",o),a.removeAttr("data-sizes")),i&&(a.attr("src",i),a.removeAttr("data-src"))),a.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass),s.find("."+x.params.lazyPreloaderClass+", ."+x.params.preloaderClass).remove(),x.params.loop&&t){var e=s.attr("data-swiper-slide-index");if(s.hasClass(x.params.slideDuplicateClass)){var l=x.wrapper.children('[data-swiper-slide-index="'+e+'"]:not(.'+x.params.slideDuplicateClass+")");x.lazy.loadImageInSlide(l.index(),!1)}else{var p=x.wrapper.children("."+x.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');x.lazy.loadImageInSlide(p.index(),!1)}}x.emit("onLazyImageReady",x,s[0],a[0])}}),x.emit("onLazyImageLoad",x,s[0],a[0])})}},load:function(){var a,t=x.params.slidesPerView;if("auto"===t&&(t=0),x.lazy.initialImageLoaded||(x.lazy.initialImageLoaded=!0),x.params.watchSlidesVisibility)x.wrapper.children("."+x.params.slideVisibleClass).each(function(){x.lazy.loadImageInSlide(e(this).index())});else if(t>1)for(a=x.activeIndex;a<x.activeIndex+t;a++)x.slides[a]&&x.lazy.loadImageInSlide(a);else x.lazy.loadImageInSlide(x.activeIndex);if(x.params.lazyLoadingInPrevNext)if(t>1||x.params.lazyLoadingInPrevNextAmount&&x.params.lazyLoadingInPrevNextAmount>1){var s=x.params.lazyLoadingInPrevNextAmount,r=t,i=Math.min(x.activeIndex+r+Math.max(s,r),x.slides.length),n=Math.max(x.activeIndex-Math.max(r,s),0);for(a=x.activeIndex+t;a<i;a++)x.slides[a]&&x.lazy.loadImageInSlide(a);for(a=n;a<x.activeIndex;a++)x.slides[a]&&x.lazy.loadImageInSlide(a)}else{var o=x.wrapper.children("."+x.params.slideNextClass);o.length>0&&x.lazy.loadImageInSlide(o.index());var l=x.wrapper.children("."+x.params.slidePrevClass);l.length>0&&x.lazy.loadImageInSlide(l.index())}},onTransitionStart:function(){x.params.lazyLoading&&(x.params.lazyLoadingOnTransitionStart||!x.params.lazyLoadingOnTransitionStart&&!x.lazy.initialImageLoaded)&&x.lazy.load()},onTransitionEnd:function(){x.params.lazyLoading&&!x.params.lazyLoadingOnTransitionStart&&x.lazy.load()}},x.scrollbar={isTouched:!1,setDragPosition:function(e){var a=x.scrollbar,t=x.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=t-a.track.offset()[x.isHorizontal()?"left":"top"]-a.dragSize/2,r=-x.minTranslate()*a.moveDivider,i=-x.maxTranslate()*a.moveDivider;s<r?s=r:s>i&&(s=i),s=-s/a.moveDivider,x.updateProgress(s),x.setWrapperTranslate(s,!0)},dragStart:function(e){var a=x.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),x.params.scrollbarHide&&a.track.css("opacity",1),x.wrapper.transition(100),a.drag.transition(100),x.emit("onScrollbarDragStart",x)},dragMove:function(e){var a=x.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),x.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),x.emit("onScrollbarDragMove",x))},dragEnd:function(e){var a=x.scrollbar;a.isTouched&&(a.isTouched=!1,x.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),x.emit("onScrollbarDragEnd",x),x.params.scrollbarSnapOnRelease&&x.slideReset())},draggableEvents:function(){return x.params.simulateTouch!==!1||x.support.touch?x.touchEvents:x.touchEventsDesktop}(),enableDraggable:function(){var a=x.scrollbar,t=x.support.touch?a.track:document;e(a.track).on(a.draggableEvents.start,a.dragStart),e(t).on(a.draggableEvents.move,a.dragMove),e(t).on(a.draggableEvents.end,a.dragEnd)},disableDraggable:function(){var a=x.scrollbar,t=x.support.touch?a.track:document;e(a.track).off(a.draggableEvents.start,a.dragStart),e(t).off(a.draggableEvents.move,a.dragMove),e(t).off(a.draggableEvents.end,a.dragEnd)},set:function(){if(x.params.scrollbar){var a=x.scrollbar;a.track=e(x.params.scrollbar),x.params.uniqueNavElements&&"string"==typeof x.params.scrollbar&&a.track.length>1&&1===x.container.find(x.params.scrollbar).length&&(a.track=x.container.find(x.params.scrollbar)),a.drag=a.track.find(".swiper-scrollbar-drag"),0===a.drag.length&&(a.drag=e('<div class="swiper-scrollbar-drag"></div>'),a.track.append(a.drag)),a.drag[0].style.width="",a.drag[0].style.height="",a.trackSize=x.isHorizontal()?a.track[0].offsetWidth:a.track[0].offsetHeight,a.divider=x.size/x.virtualSize,a.moveDivider=a.divider*(a.trackSize/x.size),a.dragSize=a.trackSize*a.divider,x.isHorizontal()?a.drag[0].style.width=a.dragSize+"px":a.drag[0].style.height=a.dragSize+"px",a.divider>=1?a.track[0].style.display="none":a.track[0].style.display="",x.params.scrollbarHide&&(a.track[0].style.opacity=0)}},setTranslate:function(){if(x.params.scrollbar){var e,a=x.scrollbar,t=(x.translate,a.dragSize);e=(a.trackSize-a.dragSize)*x.progress,x.rtl&&x.isHorizontal()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):e<0?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),x.isHorizontal()?(x.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(x.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),x.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){x.params.scrollbar&&x.scrollbar.drag.transition(e)}},x.controller={LinearSpline:function(e,a){var t=function(){var e,a,t;return function(s,r){for(a=-1,e=s.length;e-a>1;)s[t=e+a>>1]<=r?a=t:e=t;return e}}();this.x=e,this.y=a,this.lastIndex=e.length-1;var s,r;this.x.length;this.interpolate=function(e){return e?(r=t(this.x,e),s=r-1,(e-this.x[s])*(this.y[r]-this.y[s])/(this.x[r]-this.x[s])+this.y[s]):0}},getInterpolateFunction:function(e){x.controller.spline||(x.controller.spline=x.params.loop?new x.controller.LinearSpline(x.slidesGrid,e.slidesGrid):new x.controller.LinearSpline(x.snapGrid,e.snapGrid))},setTranslate:function(e,t){function s(a){e=a.rtl&&"horizontal"===a.params.direction?-x.translate:x.translate,"slide"===x.params.controlBy&&(x.controller.getInterpolateFunction(a),i=-x.controller.spline.interpolate(-e)),i&&"container"!==x.params.controlBy||(r=(a.maxTranslate()-a.minTranslate())/(x.maxTranslate()-x.minTranslate()),i=(e-x.minTranslate())*r+a.minTranslate()),x.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,x),a.updateActiveIndex()}var r,i,n=x.params.control;if(Array.isArray(n))for(var o=0;o<n.length;o++)n[o]!==t&&n[o]instanceof a&&s(n[o]);else n instanceof a&&t!==n&&s(n)},setTransition:function(e,t){function s(a){a.setWrapperTransition(e,x),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&(a.params.loop&&"slide"===x.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var r,i=x.params.control;if(Array.isArray(i))for(r=0;r<i.length;r++)i[r]!==t&&i[r]instanceof a&&s(i[r]);else i instanceof a&&t!==i&&s(i)}},x.hashnav={onHashCange:function(e,a){var t=document.location.hash.replace("#","");t!==x.slides.eq(x.activeIndex).attr("data-hash")&&x.slideTo(x.wrapper.children("."+x.params.slideClass+'[data-hash="'+t+'"]').index())},attachEvents:function(a){var t=a?"off":"on";e(window)[t]("hashchange",x.hashnav.onHashCange)},setHash:function(){
        if(x.hashnav.initialized&&x.params.hashnav)if(x.params.replaceState&&window.history&&window.history.replaceState)window.history.replaceState(null,null,"#"+x.slides.eq(x.activeIndex).attr("data-hash")||"");else{var e=x.slides.eq(x.activeIndex),a=e.attr("data-hash")||e.attr("data-history");document.location.hash=a||""}},init:function(){if(x.params.hashnav&&!x.params.history){x.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=x.slides.length;a<t;a++){var s=x.slides.eq(a),r=s.attr("data-hash")||s.attr("data-history");if(r===e&&!s.hasClass(x.params.slideDuplicateClass)){var i=s.index();x.slideTo(i,0,x.params.runCallbacksOnInit,!0)}}x.params.hashnavWatchState&&x.hashnav.attachEvents()}},destroy:function(){x.params.hashnavWatchState&&x.hashnav.attachEvents(!0)}},x.history={init:function(){if(x.params.history){if(!window.history||!window.history.pushState)return x.params.history=!1,void(x.params.hashnav=!0);x.history.initialized=!0,this.paths=this.getPathValues(),(this.paths.key||this.paths.value)&&(this.scrollToSlide(0,this.paths.value,x.params.runCallbacksOnInit),x.params.replaceState||window.addEventListener("popstate",this.setHistoryPopState))}},setHistoryPopState:function(){x.history.paths=x.history.getPathValues(),x.history.scrollToSlide(x.params.speed,x.history.paths.value,!1)},getPathValues:function(){var e=window.location.pathname.slice(1).split("/"),a=e.length;return{key:e[a-2],value:e[a-1]}},setHistory:function(e,a){if(x.history.initialized&&x.params.history){var t=x.slides.eq(a),s=this.slugify(t.attr("data-history"));window.location.pathname.includes(e)||(s=e+"/"+s),x.params.replaceState?window.history.replaceState(null,null,s):window.history.pushState(null,null,s)}},slugify:function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,a,t){if(a)for(var s=0,r=x.slides.length;s<r;s++){var i=x.slides.eq(s),n=this.slugify(i.attr("data-history"));if(n===a&&!i.hasClass(x.params.slideDuplicateClass)){var o=i.index();x.slideTo(o,e,t)}}else x.slideTo(0,e,t)}},x.disableKeyboardControl=function(){x.params.keyboardControl=!1,e(document).off("keydown",l)},x.enableKeyboardControl=function(){x.params.keyboardControl=!0,e(document).on("keydown",l)},x.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},x.params.mousewheelControl&&(x.mousewheel.event=navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var e="onwheel"in document;if(!e){var a=document.createElement("div");a.setAttribute("onwheel","return;"),e="function"==typeof a.onwheel}return!e&&document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0&&(e=document.implementation.hasFeature("Events.wheel","3.0")),e}()?"wheel":"mousewheel"),x.disableMousewheelControl=function(){if(!x.mousewheel.event)return!1;var a=x.container;return"container"!==x.params.mousewheelEventsTarged&&(a=e(x.params.mousewheelEventsTarged)),a.off(x.mousewheel.event,d),x.params.mousewheelControl=!1,!0},x.enableMousewheelControl=function(){if(!x.mousewheel.event)return!1;var a=x.container;return"container"!==x.params.mousewheelEventsTarged&&(a=e(x.params.mousewheelEventsTarged)),a.on(x.mousewheel.event,d),x.params.mousewheelControl=!0,!0},x.parallax={setTranslate:function(){x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){m(this,x.progress)}),x.slides.each(function(){var a=e(this);a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){m(this,Math.min(Math.max(a[0].progress,-1),1))})})},setTransition:function(a){void 0===a&&(a=x.params.speed),x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=e(this),s=parseInt(t.attr("data-swiper-parallax-duration"),10)||a;0===a&&(s=0),t.transition(s)})}},x.zoom={scale:1,currentScale:1,isScaling:!1,gesture:{slide:void 0,slideWidth:void 0,slideHeight:void 0,image:void 0,imageWrap:void 0,zoomMax:x.params.zoomMax},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0},getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var a=e.targetTouches[0].pageX,t=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,r=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s-a,2)+Math.pow(r-t,2))},onGestureStart:function(a){var t=x.zoom;if(!x.support.gestures){if("touchstart"!==a.type||"touchstart"===a.type&&a.targetTouches.length<2)return;t.gesture.scaleStart=t.getDistanceBetweenTouches(a)}if(!(t.gesture.slide&&t.gesture.slide.length||(t.gesture.slide=e(this),0===t.gesture.slide.length&&(t.gesture.slide=x.slides.eq(x.activeIndex)),t.gesture.image=t.gesture.slide.find("img, svg, canvas"),t.gesture.imageWrap=t.gesture.image.parent("."+x.params.zoomContainerClass),t.gesture.zoomMax=t.gesture.imageWrap.attr("data-swiper-zoom")||x.params.zoomMax,0!==t.gesture.imageWrap.length)))return void(t.gesture.image=void 0);t.gesture.image.transition(0),t.isScaling=!0},onGestureChange:function(e){var a=x.zoom;if(!x.support.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;a.gesture.scaleMove=a.getDistanceBetweenTouches(e)}a.gesture.image&&0!==a.gesture.image.length&&(x.support.gestures?a.scale=e.scale*a.currentScale:a.scale=a.gesture.scaleMove/a.gesture.scaleStart*a.currentScale,a.scale>a.gesture.zoomMax&&(a.scale=a.gesture.zoomMax-1+Math.pow(a.scale-a.gesture.zoomMax+1,.5)),a.scale<x.params.zoomMin&&(a.scale=x.params.zoomMin+1-Math.pow(x.params.zoomMin-a.scale+1,.5)),a.gesture.image.transform("translate3d(0,0,0) scale("+a.scale+")"))},onGestureEnd:function(e){var a=x.zoom;!x.support.gestures&&("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2)||a.gesture.image&&0!==a.gesture.image.length&&(a.scale=Math.max(Math.min(a.scale,a.gesture.zoomMax),x.params.zoomMin),a.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale("+a.scale+")"),a.currentScale=a.scale,a.isScaling=!1,1===a.scale&&(a.gesture.slide=void 0))},onTouchStart:function(e,a){var t=e.zoom;t.gesture.image&&0!==t.gesture.image.length&&(t.image.isTouched||("android"===e.device.os&&a.preventDefault(),t.image.isTouched=!0,t.image.touchesStart.x="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,t.image.touchesStart.y="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY))},onTouchMove:function(e){var a=x.zoom;if(a.gesture.image&&0!==a.gesture.image.length&&(x.allowClick=!1,a.image.isTouched&&a.gesture.slide)){a.image.isMoved||(a.image.width=a.gesture.image[0].offsetWidth,a.image.height=a.gesture.image[0].offsetHeight,a.image.startX=x.getTranslate(a.gesture.imageWrap[0],"x")||0,a.image.startY=x.getTranslate(a.gesture.imageWrap[0],"y")||0,a.gesture.slideWidth=a.gesture.slide[0].offsetWidth,a.gesture.slideHeight=a.gesture.slide[0].offsetHeight,a.gesture.imageWrap.transition(0),x.rtl&&(a.image.startX=-a.image.startX),x.rtl&&(a.image.startY=-a.image.startY));var t=a.image.width*a.scale,s=a.image.height*a.scale;if(!(t<a.gesture.slideWidth&&s<a.gesture.slideHeight)){if(a.image.minX=Math.min(a.gesture.slideWidth/2-t/2,0),a.image.maxX=-a.image.minX,a.image.minY=Math.min(a.gesture.slideHeight/2-s/2,0),a.image.maxY=-a.image.minY,a.image.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,a.image.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!a.image.isMoved&&!a.isScaling){if(x.isHorizontal()&&Math.floor(a.image.minX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x<a.image.touchesStart.x||Math.floor(a.image.maxX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x>a.image.touchesStart.x)return void(a.image.isTouched=!1);if(!x.isHorizontal()&&Math.floor(a.image.minY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y<a.image.touchesStart.y||Math.floor(a.image.maxY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y>a.image.touchesStart.y)return void(a.image.isTouched=!1)}e.preventDefault(),e.stopPropagation(),a.image.isMoved=!0,a.image.currentX=a.image.touchesCurrent.x-a.image.touchesStart.x+a.image.startX,a.image.currentY=a.image.touchesCurrent.y-a.image.touchesStart.y+a.image.startY,a.image.currentX<a.image.minX&&(a.image.currentX=a.image.minX+1-Math.pow(a.image.minX-a.image.currentX+1,.8)),a.image.currentX>a.image.maxX&&(a.image.currentX=a.image.maxX-1+Math.pow(a.image.currentX-a.image.maxX+1,.8)),a.image.currentY<a.image.minY&&(a.image.currentY=a.image.minY+1-Math.pow(a.image.minY-a.image.currentY+1,.8)),a.image.currentY>a.image.maxY&&(a.image.currentY=a.image.maxY-1+Math.pow(a.image.currentY-a.image.maxY+1,.8)),a.velocity.prevPositionX||(a.velocity.prevPositionX=a.image.touchesCurrent.x),a.velocity.prevPositionY||(a.velocity.prevPositionY=a.image.touchesCurrent.y),a.velocity.prevTime||(a.velocity.prevTime=Date.now()),a.velocity.x=(a.image.touchesCurrent.x-a.velocity.prevPositionX)/(Date.now()-a.velocity.prevTime)/2,a.velocity.y=(a.image.touchesCurrent.y-a.velocity.prevPositionY)/(Date.now()-a.velocity.prevTime)/2,Math.abs(a.image.touchesCurrent.x-a.velocity.prevPositionX)<2&&(a.velocity.x=0),Math.abs(a.image.touchesCurrent.y-a.velocity.prevPositionY)<2&&(a.velocity.y=0),a.velocity.prevPositionX=a.image.touchesCurrent.x,a.velocity.prevPositionY=a.image.touchesCurrent.y,a.velocity.prevTime=Date.now(),a.gesture.imageWrap.transform("translate3d("+a.image.currentX+"px, "+a.image.currentY+"px,0)")}}},onTouchEnd:function(e,a){var t=e.zoom;if(t.gesture.image&&0!==t.gesture.image.length){if(!t.image.isTouched||!t.image.isMoved)return t.image.isTouched=!1,void(t.image.isMoved=!1);t.image.isTouched=!1,t.image.isMoved=!1;var s=300,r=300,i=t.velocity.x*s,n=t.image.currentX+i,o=t.velocity.y*r,l=t.image.currentY+o;0!==t.velocity.x&&(s=Math.abs((n-t.image.currentX)/t.velocity.x)),0!==t.velocity.y&&(r=Math.abs((l-t.image.currentY)/t.velocity.y));var p=Math.max(s,r);t.image.currentX=n,t.image.currentY=l;var d=t.image.width*t.scale,m=t.image.height*t.scale;t.image.minX=Math.min(t.gesture.slideWidth/2-d/2,0),t.image.maxX=-t.image.minX,t.image.minY=Math.min(t.gesture.slideHeight/2-m/2,0),t.image.maxY=-t.image.minY,t.image.currentX=Math.max(Math.min(t.image.currentX,t.image.maxX),t.image.minX),t.image.currentY=Math.max(Math.min(t.image.currentY,t.image.maxY),t.image.minY),t.gesture.imageWrap.transition(p).transform("translate3d("+t.image.currentX+"px, "+t.image.currentY+"px,0)")}},onTransitionEnd:function(e){var a=e.zoom;a.gesture.slide&&e.previousIndex!==e.activeIndex&&(a.gesture.image.transform("translate3d(0,0,0) scale(1)"),a.gesture.imageWrap.transform("translate3d(0,0,0)"),a.gesture.slide=a.gesture.image=a.gesture.imageWrap=void 0,a.scale=a.currentScale=1)},toggleZoom:function(a,t){var s=a.zoom;if(s.gesture.slide||(s.gesture.slide=a.clickedSlide?e(a.clickedSlide):a.slides.eq(a.activeIndex),s.gesture.image=s.gesture.slide.find("img, svg, canvas"),s.gesture.imageWrap=s.gesture.image.parent("."+a.params.zoomContainerClass)),s.gesture.image&&0!==s.gesture.image.length){var r,i,n,o,l,p,d,m,u,c,g,h,v,f,w,y,x,T;void 0===s.image.touchesStart.x&&t?(r="touchend"===t.type?t.changedTouches[0].pageX:t.pageX,i="touchend"===t.type?t.changedTouches[0].pageY:t.pageY):(r=s.image.touchesStart.x,i=s.image.touchesStart.y),s.scale&&1!==s.scale?(s.scale=s.currentScale=1,s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),s.gesture.slide=void 0):(s.scale=s.currentScale=s.gesture.imageWrap.attr("data-swiper-zoom")||a.params.zoomMax,t?(x=s.gesture.slide[0].offsetWidth,T=s.gesture.slide[0].offsetHeight,n=s.gesture.slide.offset().left,o=s.gesture.slide.offset().top,l=n+x/2-r,p=o+T/2-i,u=s.gesture.image[0].offsetWidth,c=s.gesture.image[0].offsetHeight,g=u*s.scale,h=c*s.scale,v=Math.min(x/2-g/2,0),f=Math.min(T/2-h/2,0),w=-v,y=-f,d=l*s.scale,m=p*s.scale,d<v&&(d=v),d>w&&(d=w),m<f&&(m=f),m>y&&(m=y)):(d=0,m=0),s.gesture.imageWrap.transition(300).transform("translate3d("+d+"px, "+m+"px,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale("+s.scale+")"))}},attachEvents:function(a){var t=a?"off":"on";if(x.params.zoom){var s=(x.slides,!("touchstart"!==x.touchEvents.start||!x.support.passiveListener||!x.params.passiveListeners)&&{passive:!0,capture:!1});x.support.gestures?(x.slides[t]("gesturestart",x.zoom.onGestureStart,s),x.slides[t]("gesturechange",x.zoom.onGestureChange,s),x.slides[t]("gestureend",x.zoom.onGestureEnd,s)):"touchstart"===x.touchEvents.start&&(x.slides[t](x.touchEvents.start,x.zoom.onGestureStart,s),x.slides[t](x.touchEvents.move,x.zoom.onGestureChange,s),x.slides[t](x.touchEvents.end,x.zoom.onGestureEnd,s)),x[t]("touchStart",x.zoom.onTouchStart),x.slides.each(function(a,s){e(s).find("."+x.params.zoomContainerClass).length>0&&e(s)[t](x.touchEvents.move,x.zoom.onTouchMove)}),x[t]("touchEnd",x.zoom.onTouchEnd),x[t]("transitionEnd",x.zoom.onTransitionEnd),x.params.zoomToggle&&x.on("doubleTap",x.zoom.toggleZoom)}},init:function(){x.zoom.attachEvents()},destroy:function(){x.zoom.attachEvents(!0)}},x._plugins=[];for(var Y in x.plugins){var A=x.plugins[Y](x,x.params[Y]);A&&x._plugins.push(A)}return x.callPlugins=function(e){for(var a=0;a<x._plugins.length;a++)e in x._plugins[a]&&x._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},x.emitterEventListeners={},x.emit=function(e){x.params[e]&&x.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(x.emitterEventListeners[e])for(a=0;a<x.emitterEventListeners[e].length;a++)x.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);x.callPlugins&&x.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},x.on=function(e,a){return e=u(e),x.emitterEventListeners[e]||(x.emitterEventListeners[e]=[]),x.emitterEventListeners[e].push(a),x},x.off=function(e,a){var t;if(e=u(e),void 0===a)return x.emitterEventListeners[e]=[],x;if(x.emitterEventListeners[e]&&0!==x.emitterEventListeners[e].length){for(t=0;t<x.emitterEventListeners[e].length;t++)x.emitterEventListeners[e][t]===a&&x.emitterEventListeners[e].splice(t,1);return x}},x.once=function(e,a){e=u(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),x.off(e,t)};return x.on(e,t),x},x.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(a){13===a.keyCode&&(e(a.target).is(x.params.nextButton)?(x.onClickNext(a),x.isEnd?x.a11y.notify(x.params.lastSlideMessage):x.a11y.notify(x.params.nextSlideMessage)):e(a.target).is(x.params.prevButton)&&(x.onClickPrev(a),x.isBeginning?x.a11y.notify(x.params.firstSlideMessage):x.a11y.notify(x.params.prevSlideMessage)),e(a.target).is("."+x.params.bulletClass)&&e(a.target)[0].click())},liveRegion:e('<span class="'+x.params.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=x.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){x.params.nextButton&&x.nextButton&&x.nextButton.length>0&&(x.a11y.makeFocusable(x.nextButton),x.a11y.addRole(x.nextButton,"button"),x.a11y.addLabel(x.nextButton,x.params.nextSlideMessage)),x.params.prevButton&&x.prevButton&&x.prevButton.length>0&&(x.a11y.makeFocusable(x.prevButton),x.a11y.addRole(x.prevButton,"button"),x.a11y.addLabel(x.prevButton,x.params.prevSlideMessage)),e(x.container).append(x.a11y.liveRegion)},initPagination:function(){x.params.pagination&&x.params.paginationClickable&&x.bullets&&x.bullets.length&&x.bullets.each(function(){var a=e(this);x.a11y.makeFocusable(a),x.a11y.addRole(a,"button"),x.a11y.addLabel(a,x.params.paginationBulletMessage.replace(/{{index}}/,a.index()+1))})},destroy:function(){x.a11y.liveRegion&&x.a11y.liveRegion.length>0&&x.a11y.liveRegion.remove()}},x.init=function(){x.params.loop&&x.createLoop(),x.updateContainerSize(),x.updateSlidesSize(),x.updatePagination(),x.params.scrollbar&&x.scrollbar&&(x.scrollbar.set(),x.params.scrollbarDraggable&&x.scrollbar.enableDraggable()),"slide"!==x.params.effect&&x.effects[x.params.effect]&&(x.params.loop||x.updateProgress(),x.effects[x.params.effect].setTranslate()),x.params.loop?x.slideTo(x.params.initialSlide+x.loopedSlides,0,x.params.runCallbacksOnInit):(x.slideTo(x.params.initialSlide,0,x.params.runCallbacksOnInit),0===x.params.initialSlide&&(x.parallax&&x.params.parallax&&x.parallax.setTranslate(),x.lazy&&x.params.lazyLoading&&(x.lazy.load(),x.lazy.initialImageLoaded=!0))),x.attachEvents(),x.params.observer&&x.support.observer&&x.initObservers(),x.params.preloadImages&&!x.params.lazyLoading&&x.preloadImages(),x.params.zoom&&x.zoom&&x.zoom.init(),x.params.autoplay&&x.startAutoplay(),x.params.keyboardControl&&x.enableKeyboardControl&&x.enableKeyboardControl(),x.params.mousewheelControl&&x.enableMousewheelControl&&x.enableMousewheelControl(),x.params.hashnavReplaceState&&(x.params.replaceState=x.params.hashnavReplaceState),x.params.history&&x.history&&x.history.init(),x.params.hashnav&&x.hashnav&&x.hashnav.init(),x.params.a11y&&x.a11y&&x.a11y.init(),x.emit("onInit",x)},x.cleanupStyles=function(){x.container.removeClass(x.classNames.join(" ")).removeAttr("style"),x.wrapper.removeAttr("style"),x.slides&&x.slides.length&&x.slides.removeClass([x.params.slideVisibleClass,x.params.slideActiveClass,x.params.slideNextClass,x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),x.paginationContainer&&x.paginationContainer.length&&x.paginationContainer.removeClass(x.params.paginationHiddenClass),x.bullets&&x.bullets.length&&x.bullets.removeClass(x.params.bulletActiveClass),x.params.prevButton&&e(x.params.prevButton).removeClass(x.params.buttonDisabledClass),x.params.nextButton&&e(x.params.nextButton).removeClass(x.params.buttonDisabledClass),x.params.scrollbar&&x.scrollbar&&(x.scrollbar.track&&x.scrollbar.track.length&&x.scrollbar.track.removeAttr("style"),x.scrollbar.drag&&x.scrollbar.drag.length&&x.scrollbar.drag.removeAttr("style"))},x.destroy=function(e,a){x.detachEvents(),x.stopAutoplay(),x.params.scrollbar&&x.scrollbar&&x.params.scrollbarDraggable&&x.scrollbar.disableDraggable(),x.params.loop&&x.destroyLoop(),a&&x.cleanupStyles(),x.disconnectObservers(),x.params.zoom&&x.zoom&&x.zoom.destroy(),x.params.keyboardControl&&x.disableKeyboardControl&&x.disableKeyboardControl(),x.params.mousewheelControl&&x.disableMousewheelControl&&x.disableMousewheelControl(),x.params.a11y&&x.a11y&&x.a11y.destroy(),x.params.history&&!x.params.replaceState&&window.removeEventListener("popstate",x.history.setHistoryPopState),x.params.hashnav&&x.hashnav&&x.hashnav.destroy(),x.emit("onDestroy"),e!==!1&&(x=null)},x.init(),x}};a.prototype={isSafari:function(){var e=window.navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1,lteIE9:function(){var e=document.createElement("div");return e.innerHTML="<!--[if lte IE 9]><i></i><![endif]-->",1===e.getElementsByTagName("i").length}()},device:function(){var e=window.navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),r=!t&&e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);return{ios:t||r||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}(),passiveListener:function(){var e=!1;try{var a=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveListener",null,a)}catch(e){}return e}(),gestures:function(){return"ongesturestart"in window}()},plugins:{}};for(var t=["jQuery","Zepto","Dom7"],s=0;s<t.length;s++)window[t[s]]&&function(e){e.fn.swiper=function(t){var s;return e(this).each(function(){var e=new a(this,t);s||(s=e)}),s}}(window[t[s]]);var r;r="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,r&&("transitionEnd"in r.fn||(r.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<s.length;t++)r.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(t=0;t<s.length;t++)r.on(s[t],a);return this}),"transform"in r.fn||(r.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in r.fn||(r.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this}),"outerWidth"in r.fn||(r.fn.outerWidth=function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null})),window.Swiper=a}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
//# sourceMappingURL=maps/swiper.jquery.min.js.map

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page resize */
/* 05 - function on page scroll */
/* 06 - swiper sliders */
/* 07 - buttons, clicks, hovers */

var _functions = {}, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, watchers = [],
        is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
        isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
    scrollListOffset;


    /*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
    if(is_Mac) $('body').addClass('mac');
    _functions.pageCalculations();

    setTimeout(function() {
        $('#loader-wrapper').fadeOut(500);
    }, 700);

    $('body').addClass('loaded');
    $('.SelectBox').SumoSelect();

    pageScrolled();

	/*==============================*/
	/* 04 - function on page resize */
	/*==============================*/

	_functions.resizeCall = function(){
		_functions.pageCalculations();
        _functions.initWatchers();
        scrollListOfsetRecalc();
        setTimeout(function() {
            _functions.comparisonItemsHeight();
        }, 50);

	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
        pageScrolled();
        scrollAnchor();
        scrollListFixed();
	};

    function pageScrolled() {
        if ($(window).scrollTop() > 30) {
            $("header").addClass("scrolled");
        } else {
            $("header").removeClass("scrolled");
        }
    };

    // Scroll active
    function scrollAnchor() {
        $('.section-scroll').each(function (i) {
            if ($(this).offset().top - 179 <= winScr) {
                $('.scroll-list li a[href*="#"]:not([href="#"]).active').removeClass('active');
                $('.scroll-list li a').eq(i).addClass('active');
            } else if ((winScr == 0) || (winScr < $('.main-banner').outerHeight() - 180)) {
                $('.scroll-list li').find('a').removeClass('active');
            }
        });
    };

    //calculate scrollListOffset (inits also on resize)
    function scrollListOfsetRecalc() {
        if($('.scroll-list').length) {
            scrollListOffset = $('.scroll-list').parent().offset().top;
        }
    }
    scrollListOfsetRecalc();

    var scrollList = $('.scroll-list');
    function scrollListFixed() {
        if (scrollList.length && (!_ismobile || winW > 991)) {
            if(winScr >= scrollListOffset - 85 ) {
                scrollList.addClass('fixed');
            } else {
                scrollList.removeClass('fixed');
            }
        }
    }
    scrollListFixed();

    //animated number
    _functions.initWatchers = function () {
        if (!$('.animate-scroll').length) return false;
        $('.animate-scroll').each(function (index, element) {
            watchers[index] = scrollMonitor.create(element);
            if (!($(element).closest('.collapse').length && $(element).closest('.collapse').height() === 0)) {
                watchers[index].enterViewport(function () {
                    $(element).addClass('animated');
                    setTimeout(function() {
                        $(element).addClass('animated-complete');
                    }, 1500);
                    watchers[index].destroy();
                });
            }
        });

    };

    _functions.destroyWatchers = function () {
        for (var i = 0; i < watchers.length; i++) watchers[i].destroy();
        watchers = [];
    };

    _functions.initWatchers();


    /*=====================*/
    /* 06 - swiper sliders */
    /*=====================*/

    //comparison swiper state change on load
    if ($('.comparison-swiper-wrap').length) {
        var comparisonSwiperWrap = $('.comparison-swiper-wrap'),
            comparisonSwiper = $('.comparison-swiper-wrap .swiper-container'),
            comparisonSlidesLength = comparisonSwiper.find('.swiper-slide').length;

        if (comparisonSlidesLength == 1) {
            comparisonSwiperWrap.addClass('one-column');
            comparisonSwiper.attr('data-slides-per-view', 1);
            comparisonSwiper.attr('data-lt-slides', 1);
            comparisonSwiper.attr('data-md-slides', 1);
            comparisonSwiper.attr('data-sm-slides', 1);

        } else if (comparisonSlidesLength == 2) {
            comparisonSwiperWrap.addClass('two-column');
            comparisonSwiper.attr('data-slides-per-view', 2);
            comparisonSwiper.attr('data-lt-slides', 2);
        }

        if (winW < 768) {
            comparisonSwiper.attr('data-autoheight', 1);
        }

    }

    //partners swiper add autoplay on mobile
    if ($('.partners-swiper').length && winW < 768) {
        $('.partners-swiper').find('.swiper-container').removeAttr('data-slides-per-column');
    }


    //SWIPER general
    var initIterator = 0;

    function setParams(swiper, dataValue, returnValue) {
        return (swiper.is('[data-' + dataValue + ']')) ? ((typeof swiper.data(dataValue) != "string") ? parseInt(swiper.data(dataValue), 10) : swiper.data(dataValue)) : returnValue;
    }

    _functions.initSwiper = function () {
        $('.swiper-container').not('.initialized').each(function () {
            var $t = $(this);

            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.closest('.swiper-entry').find('.swiper-pagination').addClass('swiper-pagination-' + index);
            $t.closest('.swiper-entry').find('.swiper-button-prev').addClass('swiper-button-prev-' + index);
            $t.closest('.swiper-entry').find('.swiper-button-next').addClass('swiper-button-next-' + index);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                pagination: '.swiper-pagination-' + index,
                paginationType: (winW<991)?'fraction' : setParams($t, 'pagination', 'bullets'),
                paginationClickable: true,
                nextButton: '.swiper-button-next-' + index,
                prevButton: '.swiper-button-prev-' + index,
                paginationElement: 'li',
                slidesPerView: setParams($t, 'slides-per-view', 1),
                // slidesPerGroup: ($t.data('center')!='1')?setParams($t,'slides-per-view',1):1,
                slidesPerColumn: setParams($t, 'slides-per-column', 1),
                autoHeight: setParams($t, 'autoheight', 0),
                loop: setParams($t, 'loop', 0),
                autoplay: !_ismobile ? setParams($t, 'autoplay', 0) : 0,
                centeredSlides: setParams($t, 'center', 0),
                breakpoints: ($t.is('[data-breakpoints]')) ? {
                    767: {slidesPerView: ($t.attr('data-xs-slides') != 'auto') ? parseInt($t.attr('data-xs-slides'), 10) : 'auto'},
                    991: {slidesPerView: ($t.attr('data-sm-slides') != 'auto') ? parseInt($t.attr('data-sm-slides'), 10) : 'auto'},
                    1199: {slidesPerView: ($t.attr('data-md-slides') != 'auto') ? parseInt($t.attr('data-md-slides'), 10) : 'auto'},
                    1469: {slidesPerView: ($t.attr('data-lt-slides') != 'auto') ? parseInt($t.attr('data-lt-slides'), 10) : 'auto'}
                } : {},
                initialSlide: $t.is('[data-initial-last]') ? $t.find('.swiper-slide').length : setParams($t, 'initialslide', 0),
                speed: setParams($t, 'speed', 500),
                parallax: setParams($t, 'parallax', 0),
                slideToClickedSlide: setParams($t, 'clickedslide', 0),
                mousewheelControl: setParams($t, 'mousewheel', 0),
                direction: ($t.is('[data-direction]')) ? $t.data('direction') : 'horizontal',
                spaceBetween: setParams($t, 'space', 0),
                // watchSlidesProgress: true,
                // watchSlidesVisibility: true,
                keyboardControl: ($t.is('[data-keyboard-false]')) ? false : true,
                mousewheelReleaseOnEdges: true,
                preloadImages: false,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: true,
                // loopedSlides: 3,
                // roundLengths: true,
                effect: setParams($t, 'effect', 'slide'),
                observer: ($t.is('[data-observer]')) ? $t.data('direction') : 'true',
                observeParents: true,
                // loopAdditionalSlides: 2,
                fade: {
                    crossFade: true
                },
                paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                    if ($('.swipers-couple-wrapper .swiper-main-bg').length)
                    {
                        return '<span class="zero-current">0</span><span class=" ' + currentClassName + '"></span>' + '/' + '<span class="zero-total">0</span><span class="' + totalClassName + '"></span>';
                    } else {
                        return '<span class=" ' + currentClassName + '"></span>' + '/' + '<span class="' + totalClassName + '"></span>'
                    }
                },
                onTransitionStart: function(swiper) {
                    if ($('.swiper-main-bg .swiper-slide-active').index() > 9) {
                        $('.zero-current').css('display', 'none');
                    } else {
                        $('.zero-current').css('display', 'inline-block');
                    }
                },
                onTransitionEnd: function(swiper) {
                    if ($('.swiper-main-bg .swiper-slide-active').index() > 9) {
                        $('.zero-current').css('display', 'none');
                    } else {
                        $('.zero-current').css('display', 'inline-block');
                    }
                }
            });
            swipers['swiper-' + index].update();
            initIterator++;
        });
        $('.swiper-container.swiper-control-top').each(function () {
            swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom').attr('id')];
        });
        $('.swiper-container.swiper-control-bottom').each(function () {
            swipers['swiper-' + $(this).attr('id')].params.control = swipers['swiper-' + $(this).closest('.swipers-couple-wrapper').find('.swiper-control-top').attr('id')];
        });

        if ($('.swiper-main-bg .swiper-slide').length > 9) {
            $('.zero-total').addClass('hidden');
        }

    };

    //swipers initialization
    _functions.initSwiper();

    //double-swiper-popup

    if ($('.double-swiper-popup').length) {
        var swiperContentControl = swipers['swiper-' + $('.double-swiper-popup .swiper-control-top').attr('id')],
            swiperContentBottom = swipers['swiper-' + $('.double-swiper-popup .swiper-control-bottom').attr('id')];

        swiperContentControl.on('TransitionEnd', function() {
            var activeIndexSw = swiperContentControl.activeIndex;

            $('.double-swiper-popup .swiper-control-bottom .bottom-img-wrap').removeClass('active');
            $('.double-swiper-popup .swiper-control-bottom .swiper-slide').eq(activeIndexSw).find('.bottom-img-wrap').addClass('active');
        });
    }

    $(document).on('click','.bottom-img-wrap', function(){
        var swichIndex = $(this).parent().index();
        $(this).closest('.swiper-entry').find('.bottom-img-wrap').removeClass('active');
        $(this).addClass('active');
        swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-top').attr('id')].slideTo(swichIndex);
    });

    $(document).on('click','.color-large-list li', function(){
        var swichIndex = $(this).index(),
            dataRel = $(this).data('rel');

        swipers['swiper-'+$('.double-swiper-popup .swiper-control-top').attr('id')].slideTo(swichIndex, 0);
        $('.double-swiper-popup .swiper-control-bottom .swiper-slide').eq(swichIndex).find('.bottom-img-wrap').trigger('click');
        _functions.openPopup($('.popup-content[data-rel="'+dataRel+'"]'));
    });

    //end of double-swiper-popup

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

    //open and close popup
    _functions.openPopup = function(foo){
        $('.popup-content').removeClass('active');
        $('.popup-wrapper').addClass('active');
        foo.addClass('active');
        $('html').addClass('overflow-hidden');
    };

    _functions.closePopup = function(){
        $('.popup-wrapper, .popup-content').removeClass('active');
        $('.popup-iframe').html('');
        $('html').removeClass('overflow-hidden');
        $('#video-popup iframe').remove();
    };

    _functions.videoPopup = function(src){
        $('#video-popup .embed-responsive').html('<iframe src="'+src+'"></iframe>');
        _functions.openPopup($('#video-popup'));
    };

    $(document).on('click', '.open-popup', function(e){
        e.preventDefault();
        _functions.openPopup($('.popup-content[data-rel="'+$(this).data('rel')+'"]'));
    });

    $(document).on('click', '.popup-wrapper .js-btn-close, .popup-wrapper .layer-close', function(e){
        e.preventDefault();
        _functions.closePopup();
    });

    $('.video').on('click', function(e){
        e.preventDefault();
        _functions.videoPopup($(this).data('src'));
    });

    //shopping cart popup
    $(document).on('click', '.shopping-cart.not-empty-cart', function() {
        _functions.openPopup($('#shopping-card-popup'));
    });

    // slide toogle btn
    $('.slide-toggle-btn').on('click', function() {
        var $this = $(this),
            textTo = $this.find('span').eq(1),
            origText = $this.data('orig-text'),
            toogleText = $this.data('toggled-text');
        $this.toggleClass('active');
        $this.closest('.slide-toggle-wrap').find('.slide-toggle-item').slideToggle();
        if ($this.hasClass('active')) {
            textTo.text(toogleText);
        } else {
            textTo.text(origText);
        }
    });

    //dropdown mobile
    $('.dropdown-mobile-title').on('click', function() {
        $(this).closest('.dropdown-wrap').toggleClass('active');
    });

    $('.dropdown-toggle li a').on('click', function() {
        var $this = $(this);
        $this.closest('.dropdown-wrap').find('.dropdown-mobile-title').text($this.text());
        $this.closest('.dropdown-wrap').removeClass('active');
    });

//header search state
    $('.icon-wrap.header-search .icon').on('click', function (e) {
        e.stopPropagation();
        $('.header-search-field').toggleClass('active');
    });

    //header search state btnclose from plugin
    $('.proclose').on('click', function () {
        //e.stopPropagation();
        $('.header-search-field').removeClass('active');
    });

    $(document).on('click', function (e) {
/*        if ($(e.target).closest(".header-search-field").length > 0 || $(e.target).closest(".ui-autocomplete").length > 0) {
            return false;
        } else {
            $('.header-search-field').removeClass('active');
        }*/
        $('.proinput input').val('');
        $('.header-search-field').removeClass('active');
    });

/*    $('.search-close').on('click', function() {
        $('.header-search-field').removeClass('active');
    });*/

    //menu-mobile
    $('.hamburger').on('click', function() {
        $('header').toggleClass('active');
        $('html').toggleClass('overflow-hidden');

        $('.filter-btn').toggleClass('filter-btn-hidden');
    });

    //submenu mobile
    $('.toggle-submenu').on('click', function() {
        $(this).toggleClass('active');
        $(this).siblings('ul').slideToggle(300);
        return false;
    });

    //mobile contact in menu
    $('.icon-wrap.contact .icon').on('click', function() {
        if (winW < 1200) {
            $(this).parent().toggleClass('active').find('.info').slideToggle();
            $('header').removeClass('active');
        }
    });

    $(document).on('click', function (e) {
        if (winW < 1200) {
            if ($(e.target).closest(".icon-wrap.contact").length > 0 && winW < 1200) {
                return false;
            } else {
                $('.icon-wrap.contact').removeClass('active').find('.info').slideUp();
            }
        }
    });

    //search autocomplete
    var available_tags = [
        'Спорткомплекс "Спортивна Арена" Тячів пошук"',
        'Об\'єкти транспортного і промислового значення пошук',
        'Монтаж акустичних систем Heradesign пошук',
        'Улаштування підлогових покриттів пошук',
        'Заливка топінгових і бетонних підлог пошук',
        'Заливка топінгових і бетонних підлог пошук',
        'Заливка топінгових і бетонних підлог пошук',
        'Заливка топінгових і бетонних підлог пошук'
    ];

    if ( $('.search-input').length){

        $('.search-input').each(function() {
            $(this).autocomplete({
                source: available_tags,
                minLength: 3
            });
        });
    }

    //scroll-to
    $('.scroll-button').on('click', function(){
        $('html,body').animate({
            scrollTop: $('.scroll-to-block').offset().top - 100
        },1000);
    });

    // shopping-cart mobile
    $('.shopping-cart:not(.not-empty-cart) .icon').on('click', function() {
       if (winW < 1200) {
           $(this).parent().toggleClass('active');
       }
    });

/*    $(document).on('click', function (e) {
        if ($(e.target).closest(".shopping-cart .info").length > 0 ||  $(e.target).closest(".shopping-cart").length > 0 ){
            return false;
        } else {
            $('.shopping-cart:not(.not-empty-cart)').removeClass('active');
        }
    });*/

    // plus-minus product
    $(document).on('click', '.product-detail-amount .minus-btn', function() {
        var $this = $(this);
        var $input = $this.parent().find('input');
        var value = parseInt($input.val(),10);
        if (value != 1) {
            value = value - 1;
        } else {
            value = 1;
        }
        $input.val(value);
        $('.product-detail-amount .add_to_cart_button').attr( 'data-quantity',$input.val());
    });

    $(document).on('click', '.product-detail-amount .plus-btn', function() {
        var $this = $(this);
        var $input = $this.parent().find('input');
        var value = parseInt($input.val(),10);
        $input.val(value + 1);
        $('.product-detail-amount .add_to_cart_button').attr( 'data-quantity',$input.val());
    });

/*    $(document).on('change', '.product-detail-amount input', function() {
    	var value = parseInt($(this).val(),10);
		$('.product-detail-amount .cart-buttons .add_to_cart_button').attr('data-quantity').text(value);
		console.log(value);
	});*/

    //product remove
/*    $(document).on('click', '.product-remove', function() {
        $(this).closest('.product').slideUp(1000, function() {
            $(this).closest('.product').remove();
        });
    });*/

    /* upload file */
    $('body').on('change', '.up-file', function(){
        var format = $(this).val();
        var fileName = format.substring(format.lastIndexOf("\\")+1);
        if(format == ''){
            $('.file-name').text($('.file-name').data('placeholder-text'));
        }else{
            $('.file-name').text(fileName);
        }
    });

    // Filter title
    $('#ajax-filter-section').on('click', '.filter-title', function() {
        $(this).closest('.filter-section').not('.filter-section-disabled').toggleClass('active');
        $(this).closest('.filter-section').not('.filter-section-disabled').find('.filter-content').slideToggle();
    });


    /*slider range*/
    _functions.sliderRange = function(){
	    $(".slider-range" ).each(function(index) {
	        var from = parseInt($(this).data('from'),10),
	            to = parseInt($(this).data('to'),10),
	            min = parseInt($(this).data('min'),10),
	            max = parseInt($(this).data('max'),10);
	        $(this).find(".range").attr("id","slider-range-"+index);
	        $(this).find(".amount-start").attr("id","amount-start-"+index);
	        $(this).find(".amount-end").attr("id","amount-end-"+index);
	        $(this).find(".count-start").attr("data-slider","#slider-range-"+index);
	        $(this).find(".count-end").attr("data-slider","#slider-range-"+index);
	        $("#slider-range-"+index).slider({
	            range: true,
	            min: min,
	            max: max,
	            values: [ from , to ],
	            step: 0.01,
	            slide: function( event, ui ) {
	                $("#amount-start-"+index+" span:first-child").text(ui.values[ 0 ]);
	                $("#amount-end-"+index+" span:first-child").text(ui.values[ 1 ]);
	            }
	        });
	        $("#amount-start-"+index+" span:first-child").text($("#slider-range-"+index).slider("values",0));
	        $("#amount-end-"+index+" span:first-child").text($("#slider-range-"+index).slider("values",1));
	    });
	    _functions.closePopup();
	}
	_functions.sliderRange();


    //filter btn

    $(document).on('click','.filter-btn', function() {
        $(this).closest('.filter-wrap').toggleClass('active');
        $('html').toggleClass('overflow-hidden');
    });

    $(document).on('click','.filter-close-layer', function() {
        $(this).siblings('.filter-wrap').removeClass('active');
        $('html').removeClass('overflow-hidden');
    });

    // radio-toggle-input
    $('.radio-toggle-input').on('change', function() {
        $('.radio-toggle-wrap').each(function() {
            if (!$(this).find('.radio-toggle-input').is(':checked')) {
                $(this).find('.radio-toggle').slideUp();
            } else {
                $(this).find('.radio-toggle').slideDown();
            }
        });
    });

    //sections scroll click
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                if ( $(this).closest('.scroll-list').length ) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 150
                    }, 1000);
                } else {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 90
                    }, 1000);
                }
                return false;
            }
        }
    });

    //comparison table elements height (recalculates cells height depended on inside content height)

    _functions.comparisonItemsHeight = function() {

        if (!(('.comparison-table-wrap').length && winW > 767)) return false;

        var comparisonWrap = $('.comparison-table-wrap'),
            comparisonTables = comparisonWrap.find('table'),
            comparisonNamesRow = $('.comparison-table').find('tr'),
            comparisonNamesCell;

        for (var j = 0; j < comparisonNamesRow.length; j++) {
            comparisonCellsHeight(j);
        }

        function comparisonCellsHeight(num) {
            var cellHeightsArr = [],
                highestHeightValue;

            comparisonTables.each(function() {
                comparisonNamesCell = $(this).find('tr').eq(num).find('td .inner-cell');
                cellHeightsArr.push(comparisonNamesCell.outerHeight());
            });

            highestHeightValue = Math.max.apply(Math, cellHeightsArr);

            comparisonTables.each(function() {
                $(this).find('tr').eq(num).find('td').outerHeight(highestHeightValue);
            });

        }
    }

    _functions.comparisonItemsHeight();

    //button loader EXAMPLE
/*    $('.product-button-wrap .button, .product-detail-amount .button').on('click', function() {
        var $this = $(this);

        $this.append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-loader2.svg" alt="">');
        $this.addClass('loading');

        setTimeout(function() {
            $this.find('.add-to-cart-loader').remove();
            $this.append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-checked.svg" alt="">');

            setTimeout(function() {
                $this.removeClass('loading');
                $this.find('.add-to-cart-loader').fadeOut(400, function() {
                    $(this).remove();
                });
            }, 3000);
        }, 3500);
    });*/

});


/*!
 * VERSION: 1.20.2
 * DATE: 2017-06-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict"; _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) { var d = function (a) { var b, c = [], d = a.length; for (b = 0; b !== d; c.push(a[b++])); return c }, e = function (a, b, c) { var d, e, f = a.cycle; for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length]; delete a.cycle }, f = function (a, b, d) { c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render }, g = 1e-10, h = c._internals, i = h.isSelector, j = h.isArray, k = f.prototype = c.to({}, .1, {}), l = []; f.version = "1.20.2", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function () { return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), c.prototype.invalidate.call(this) }, k.updateTo = function (a, b) { var d, e = this.ratio, f = this.vars.immediateRender || a.immediateRender; b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay)); for (d in a) this.vars[d] = a[d]; if (this._initted || f) if (b) this._initted = !1, f && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) { var g = this._totalTime; this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1) } else if (this._initted = !1, this._init(), this._time > 0 || f) for (var h, i = 1 / (1 - e), j = this._firstPT; j;)h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next; return this }, k.render = function (a, b, d) { this._initted || 0 === this._duration && this.vars.repeat && this.invalidate(); var e, f, i, j, k, l, m, n, o, p = this._dirty ? this.totalDuration() : this._totalDuration, q = this._time, r = this._totalTime, s = this._cycle, t = this._duration, u = this._rawPrevTime; if (a >= p - 1e-7 && a >= 0 ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = t, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (e = !0, f = "onComplete", d = d || this._timeline.autoRemoveChildren), 0 === t && (this._initted || !this.vars.lazy || d) && (this._startTime === this._timeline._duration && (a = 0), (0 > u || 0 >= a && a >= -1e-7 || u === g && "isPause" !== this.data) && u !== a && (d = !0, u > g && (f = "onReverseComplete")), this._rawPrevTime = n = !b || a || u === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === t && u > 0) && (f = "onReverseComplete", e = this._reversed), 0 > a && (this._active = !1, 0 === t && (this._initted || !this.vars.lazy || d) && (u >= 0 && (d = !0), this._rawPrevTime = n = !b || a || u === a ? a : g)), this._initted || (d = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (j = t + this._repeatDelay, this._cycle = this._totalTime / j >> 0, 0 !== this._cycle && this._cycle === this._totalTime / j && a >= r && this._cycle-- , this._time = this._totalTime - this._cycle * j, this._yoyo && 0 !== (1 & this._cycle) && (this._time = t - this._time, o = this._yoyoEase || this.vars.yoyoEase, o && (this._yoyoEase || (o !== !0 || this._initted ? this._yoyoEase = o = o === !0 ? this._ease : o instanceof Ease ? o : Ease.map[o] : (o = this.vars.ease, this._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, this.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)), this.ratio = o ? 1 - o.getRatio((t - this._time) / t) : 0)), this._time > t ? this._time = t : this._time < 0 && (this._time = 0)), this._easeType && !o ? (k = this._time / t, l = this._easeType, m = this._easePower, (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : this._time / t < .5 ? this.ratio = k / 2 : this.ratio = 1 - k / 2) : o || (this.ratio = this._ease.getRatio(this._time / t))), q === this._time && !d && s === this._cycle) return void (r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate"))); if (!this._initted) { if (this._init(), !this._initted || this._gc) return; if (!d && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = q, this._totalTime = r, this._rawPrevTime = u, this._cycle = s, h.lazyTweens.push(this), void (this._lazy = [a, b]); !this._time || e || o ? e && this._ease._calcEnd && !o && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / t) } for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== q && a >= 0 && (this._active = !0), 0 === r && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, d) : f || (f = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === t) && (b || this._callback("onStart"))), i = this._firstPT; i;)i.f ? i.t[i.p](i.c * this.ratio + i.s) : i.t[i.p] = i.c * this.ratio + i.s, i = i._next; this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, d), b || (this._totalTime !== r || f) && this._callback("onUpdate")), this._cycle !== s && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), f && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, d), e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[f] && this._callback(f), 0 === t && this._rawPrevTime === g && n !== g && (this._rawPrevTime = 0)) }, f.to = function (a, b, c) { return new f(a, b, c) }, f.from = function (a, b, c) { return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c) }, f.fromTo = function (a, b, c, d) { return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d) }, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n) { h = h || 0; var o, p, q, r, s = 0, t = [], u = function () { g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l) }, v = g.cycle, w = g.startAt && g.startAt.cycle; for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) { p = {}; for (r in g) p[r] = g[r]; if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) { w = p.startAt = {}; for (r in g.startAt) w[r] = g.startAt[r]; e(p.startAt, a, q) } p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h } return t }, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h) { return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h) }, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i) { return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i) }, f.delayedCall = function (a, b, c, d, e) { return new f(b, 0, { delay: a, onComplete: b, onCompleteParams: c, callbackScope: d, onReverseComplete: b, onReverseCompleteParams: c, immediateRender: !1, useFrames: e, overwrite: 0 }) }, f.set = function (a, b) { return new f(a, 0, b) }, f.isTweening = function (a) { return c.getTweensOf(a, !0).length > 0 }; var m = function (a, b) { for (var d = [], e = 0, f = a._first; f;)f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next; return d }, n = f.getAllTweens = function (b) { return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b)) }; f.killAll = function (a, c, d, e) { null == c && (c = !0), null == d && (d = !0); var f, g, h, i = n(0 != e), j = i.length, k = c && d && e; for (h = 0; j > h; h++)g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1)) }, f.killChildTweensOf = function (a, b) { if (null != a) { var e, g, k, l, m, n = h.tweenLookup; if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a)) for (l = a.length; --l > -1;)f.killChildTweensOf(a[l], b); else { e = []; for (k in n) for (g = n[k].target.parentNode; g;)g === a && (e = e.concat(n[k].tweens)), g = g.parentNode; for (m = e.length, l = 0; m > l; l++)b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1) } } }; var o = function (a, c, d, e) { c = c !== !1, d = d !== !1, e = e !== !1; for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;)g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a) }; return f.pauseAll = function (a, b, c) { o(!0, a, b, c) }, f.resumeAll = function (a, b, c) { o(!1, a, b, c) }, f.globalTimeScale = function (b) { var d = a._rootTimeline, e = c.ticker.time; return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale }, k.progress = function (a, b) { return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() }, k.totalProgress = function (a, b) { return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() }, k.time = function (a, b) { return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time }, k.duration = function (b) { return arguments.length ? a.prototype.duration.call(this, b) : this._duration }, k.totalDuration = function (a) { return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration) }, k.repeat = function (a) { return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat }, k.repeatDelay = function (a) { return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay }, k.yoyo = function (a) { return arguments.length ? (this._yoyo = a, this) : this._yoyo }, f }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) { var d = function (a) { b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate; var c, d, e = this.vars; for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c)); i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger) }, e = 1e-10, f = c._internals, g = d._internals = {}, h = f.isSelector, i = f.isArray, j = f.lazyTweens, k = f.lazyRender, l = _gsScope._gsDefine.globals, m = function (a) { var b, c = {}; for (b in a) c[b] = a[b]; return c }, n = function (a, b, c) { var d, e, f = a.cycle; for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length]; delete a.cycle }, o = g.pauseCallback = function () { }, p = function (a) { var b, c = [], d = a.length; for (b = 0; b !== d; c.push(a[b++])); return c }, q = d.prototype = new b; return d.version = "1.20.2", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) { var f = d.repeat && l.TweenMax || c; return b ? this.add(new f(a, b, d), e) : this.set(a, d, e) }, q.from = function (a, b, d, e) { return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e) }, q.fromTo = function (a, b, d, e, f) { var g = e.repeat && l.TweenMax || c; return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f) }, q.staggerTo = function (a, b, e, f, g, i, j, k) { var l, o, q = new d({ onComplete: i, onCompleteParams: j, callbackScope: k, smoothChildTiming: this.smoothChildTiming }), r = e.cycle; for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++)l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f); return this.add(q, g) }, q.staggerFrom = function (a, b, c, d, e, f, g, h) { return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h) }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) { return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i) }, q.call = function (a, b, d, e) { return this.add(c.delayedCall(0, a, b, d), e) }, q.set = function (a, b, d) { return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d) }, d.exportRoot = function (a, b) { a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0); var e, f, g = new d(a), h = g._timeline; for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;)f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f; return h.add(g, 0), g }, q.add = function (e, f, g, h) { var j, k, l, m, n, o; if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) { if (e instanceof Array || e && e.push && i(e)) { for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++)i(m = e[l]) && (m = new d({ tweens: m })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h; return this._uncache(!0) } if ("string" == typeof e) return this.addLabel(e, f); if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string."; e = c.delayedCall(0, e) } if (b.prototype.add.call(this, e, f), e._time && e.render((this.rawTime() - e._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (n = this, o = n.rawTime() > e._startTime; n._timeline;)o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline; return this }, q.remove = function (b) { if (b instanceof a) { this._remove(b, !1); var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline; return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this } if (b instanceof Array || b && b.push && i(b)) { for (var d = b.length; --d > -1;)this.remove(b[d]); return this } return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b) }, q._remove = function (a, c) { b.prototype._remove.call(this, a, c); var d = this._last; return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this }, q.append = function (a, b) { return this.add(a, this._parseTimeOrLabel(null, b, !0, a)) }, q.insert = q.insertMultiple = function (a, b, c, d) { return this.add(a, b || 0, c, d) }, q.appendMultiple = function (a, b, c, d) { return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d) }, q.addLabel = function (a, b) { return this._labels[a] = this._parseTimeOrLabel(b), this }, q.addPause = function (a, b, d, e) { var f = c.delayedCall(0, o, d, e || this); return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a) }, q.removeLabel = function (a) { return delete this._labels[a], this }, q.getLabelTime = function (a) { return null != this._labels[a] ? this._labels[a] : -1 }, q._parseTimeOrLabel = function (b, c, d, e) { var f, g; if (e instanceof a && e.timeline === this) this.remove(e); else if (e && (e instanceof Array || e.push && i(e))) for (g = e.length; --g > -1;)e[g] instanceof a && e[g].timeline === this && this.remove(e[g]); if (f = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d); if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = f); else { if (g = b.indexOf("="), -1 === g) return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c; c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)), b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f } return Number(b) + c }, q.seek = function (a, b) { return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1) }, q.stop = function () { return this.paused(!0) }, q.gotoAndPlay = function (a, b) { return this.play(a, b) }, q.gotoAndStop = function (a, b) { return this.pause(a, b) }, q.render = function (a, b, c) { this._gc && this._enabled(!0, !1); var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration, o = this._time, p = this._startTime, q = this._timeScale, r = this._paused; if (a >= n - 1e-7 && a >= 0) this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4; else if (1e-7 > a) if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a; else { if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;)d._duration || (f = !1), d = d._next; a = 0, this._initted || (i = !0) } else { if (this._hasPause && !this._forcingPlayhead && !b) { if (a >= o) for (d = this._first; d && d._startTime <= a && !l;)d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !l;)d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev; l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay)) } this._totalTime = this._time = this._rawPrevTime = a } if (this._time !== o && this._first || c || i || l) { if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= o) for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g; else for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) { if (d._active || d._startTime <= o && !d._paused && !d._gc) { if (l === d) { for (l = d._prev; l && l.endTime() > this._time;)l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev; l = null, this.pause() } d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c) } d = g } this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h))) } }, q._hasPausedChild = function () { for (var a = this._first; a;) { if (a._paused || a instanceof d && a._hasPausedChild()) return !0; a = a._next } return !1 }, q.getChildren = function (a, b, d, e) { e = e || -9999999999; for (var f = [], g = this._first, h = 0; g;)g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next; return f }, q.getTweensOf = function (a, b) { var d, e, f = this._gc, g = [], h = 0; for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]); return f && this._enabled(!1, !0), g }, q.recent = function () { return this._recent }, q._contains = function (a) { for (var b = a.timeline; b;) { if (b === this) return !0; b = b.timeline } return !1 }, q.shiftChildren = function (a, b, c) { c = c || 0; for (var d, e = this._first, f = this._labels; e;)e._startTime >= c && (e._startTime += a), e = e._next; if (b) for (d in f) f[d] >= c && (f[d] += a); return this._uncache(!0) }, q._kill = function (a, b) { if (!a && !b) return this._enabled(!1, !1); for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;)c[d]._kill(a, b) && (e = !0); return e }, q.clear = function (a) { var b = this.getChildren(!1, !0, !0), c = b.length; for (this._time = this._totalTime = 0; --c > -1;)b[c]._enabled(!1, !1); return a !== !1 && (this._labels = {}), this._uncache(!0) }, q.invalidate = function () { for (var b = this._first; b;)b.invalidate(), b = b._next; return a.prototype.invalidate.call(this) }, q._enabled = function (a, c) { if (a === this._gc) for (var d = this._first; d;)d._enabled(a, !0), d = d._next; return b.prototype._enabled.call(this, a, c) }, q.totalTime = function (b, c, d) { this._forcingPlayhead = !0; var e = a.prototype.totalTime.apply(this, arguments); return this._forcingPlayhead = !1, e }, q.duration = function (a) { return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration) }, q.totalDuration = function (a) { if (!arguments.length) { if (this._dirty) { for (var b, c, d = 0, e = this._last, f = 999999999999; e;)b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b; this._duration = this._totalDuration = d, this._dirty = !1 } return this._totalDuration } return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this }, q.paused = function (b) { if (!b) for (var c = this._first, d = this._time; c;)c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next; return a.prototype.paused.apply(this, arguments) }, q.usesFrames = function () { for (var b = this._timeline; b._timeline;)b = b._timeline; return b === a._rootFramesTimeline }, q.rawTime = function (a) { return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale }, d }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) { var d = function (b) { a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0 }, e = 1e-10, f = b._internals, g = f.lazyTweens, h = f.lazyRender, i = _gsScope._gsDefine.globals, j = new c(null, null, 1, 0), k = d.prototype = new a; return k.constructor = d, k.kill()._gc = !1, d.version = "1.20.2", k.invalidate = function () { return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this) }, k.addCallback = function (a, c, d, e) { return this.add(b.delayedCall(0, a, d, e), c) }, k.removeCallback = function (a, b) { if (a) if (null == b) this._kill(null, a); else for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;)c[d]._startTime === e && c[d]._enabled(!1, !1); return this }, k.removePause = function (b) { return this.removeCallback(a._internals.pauseCallback, b) }, k.tweenTo = function (a, c) { c = c || {}; var d, e, f, g = { ease: j, useFrames: this.usesFrames(), immediateRender: !1 }, h = c.repeat && i.TweenMax || b; for (e in c) g[e] = c[e]; return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function () { f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || []) }, f }, k.tweenFromTo = function (a, b, c) { c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = { onComplete: this.seek, onCompleteParams: [a], callbackScope: this }, c.immediateRender = c.immediateRender !== !1; var d = this.tweenTo(b, c); return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001) }, k.render = function (a, b, c) { this._gc && this._enabled(!0, !1); var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration, p = this._duration, q = this._time, r = this._totalTime, s = this._startTime, t = this._timeScale, u = this._rawPrevTime, v = this._paused, w = this._cycle; if (a >= o - 1e-7 && a >= 0) this._locked || (this._totalTime = o, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4); else if (1e-7 > a) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q || 0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a; else { if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;)d._duration || (f = !1), d = d._next; a = 0, this._initted || (k = !0) } else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle-- , this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, a = p + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) { if (a = this._time, a >= q || this._repeat && w !== this._cycle) for (d = this._first; d && d._startTime <= a && !m;)d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next; else for (d = this._last; d && d._startTime >= a && !m;)d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev; m && m._startTime < p && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay)) } if (this._cycle !== w && !this._locked) { var x = this._yoyo && 0 !== (1 & w), y = x === (this._yoyo && 0 !== (1 & this._cycle)), z = this._totalTime, A = this._cycle, B = this._rawPrevTime, C = this._time; if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback("onRepeat")), q !== this._time) return; if (y && (this._cycle = w, this._locked = !0, q = x ? p + 1e-4 : -1e-4, this.render(q, !0, !1)), this._locked = !1, this._paused && !v) return; this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B } if (!(this._time !== q && this._first || c || k || m)) return void (r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate"))); if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= q) for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i; else for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) { if (d._active || d._startTime <= q && !d._paused && !d._gc) { if (m === d) { for (m = d._prev; m && m.endTime() > this._time;)m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev; m = null, this.pause() } d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c) } d = i } this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j))) }, k.getActive = function (a, b, c) { null == a && (a = !0), null == b && (b = !0), null == c && (c = !1); var d, e, f = [], g = this.getChildren(a, b, c), h = 0, i = g.length; for (d = 0; i > d; d++)e = g[d], e.isActive() && (f[h++] = e); return f }, k.getLabelAfter = function (a) { a || 0 !== a && (a = this._time); var b, c = this.getLabelsArray(), d = c.length; for (b = 0; d > b; b++)if (c[b].time > a) return c[b].name; return null }, k.getLabelBefore = function (a) { null == a && (a = this._time); for (var b = this.getLabelsArray(), c = b.length; --c > -1;)if (b[c].time < a) return b[c].name; return null }, k.getLabelsArray = function () { var a, b = [], c = 0; for (a in this._labels) b[c++] = { time: this._labels[a], name: a }; return b.sort(function (a, b) { return a.time - b.time }), b }, k.invalidate = function () { return this._locked = !1, a.prototype.invalidate.call(this) }, k.progress = function (a, b) { return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0 }, k.totalProgress = function (a, b) { return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0 }, k.totalDuration = function (b) { return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration) }, k.time = function (a, b) { return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time }, k.repeat = function (a) { return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat }, k.repeatDelay = function (a) { return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay }, k.yoyo = function (a) { return arguments.length ? (this._yoyo = a, this) : this._yoyo }, k.currentLabel = function (a) { return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8) }, d }, !0), function () {
        var a = 180 / Math.PI, b = [], c = [], d = [], e = {}, f = _gsScope._gsDefine.globals, g = function (a, b, c, d) { c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a }, h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", i = function (a, b, c, d) { var e = { a: a }, f = {}, g = {}, h = { c: d }, i = (a + b) / 2, j = (b + c) / 2, k = (c + d) / 2, l = (i + j) / 2, m = (j + k) / 2, n = (m - l) / 8; return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h] }, j = function (a, e, f, g, h) { var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1, x = 0, y = a[0].a; for (j = 0; w > j; j++)n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++ , y = p; n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3])) }, k = function (a, d, e, f) { var h, i, j, k, l, m, n = []; if (f) for (a = [f].concat(a), i = a.length; --i > -1;)"string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2))); if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[0][d]), n; for (i = 0; h > i; i++)j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k)); return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n }, l = function (a, f, g, i, l, m) { var n, o, p, q, r, s, t, u, v = {}, w = [], x = m || a[0]; l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1); for (o in a[0]) w.push(o); if (a.length > 1) { for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)if (o = w[n], Math.abs(x[o] - u[o]) > .05) { t = !1; break } t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3]) } for (b.length = c.length = d.length = 0, n = w.length; --n > -1;)o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m); for (n = b.length; --n > -1;)b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]); if (!i) { for (n = w.length; --n > -1;)if (e[o]) for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++)r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r; for (n = d.length; --n > -1;)d[n] = Math.sqrt(d[n]) } for (n = w.length, q = g ? 4 : 1; --n > -1;)o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q)); return v }, m = function (a, b, c) {
            b = b || "soft"; var d, e, f, h, i, j, k, l, m, n, o, p = {}, q = "cubic" === b ? 3 : 2, r = "soft" === b, s = []; if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";
            for (m in a[0]) s.push(m); for (j = s.length; --j > -1;) { for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++)d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d; for (l = n - q + 1, n = 0, k = 0; l > k; k += q)d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f); i.length = n } return p
        }, n = function (a, b, c) { for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++)j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d }, o = function (a, b) { b = b >> 0 || 6; var c, d, e, f, g = [], h = [], i = 0, j = 0, k = b - 1, l = [], m = []; for (c in a) n(a[c], g, b); for (e = g.length, d = 0; e > d; d++)i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []); return { length: j, lengths: h, segments: l } }, p = _gsScope._gsDefine.plugin({ propName: "bezier", priority: -1, version: "1.3.8", API: 2, global: !0, init: function (a, b, c) { this._target = a, b instanceof Array && (b = { values: b }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10); var d, e, f, g, h, i = b.values || [], j = {}, k = i[0], n = b.autoRotate || c.vars.orientToBezier; this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null; for (d in k) this._props.push(d); for (f = this._props.length; --f > -1;)d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j); if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) { var p = o(this._beziers, this._timeRes); this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length } if (n = this._autoRotate) for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) { for (g = 0; 3 > g; g++)d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1; d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d) } return this._startRatio = c.vars.runBackwards ? 1 : 0, !0 }, set: function (b) { var c, d, e, f, g, h, i, j, k, l, m = this._segCount, n = this._func, o = this._target, p = b !== this._startRatio; if (this._timeRes) { if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) { for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;); this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0] } else if (b < this._l1 && e > 0) { for (; e > 0 && (this._l1 = k[--e]) >= b;); 0 === e && b < this._l1 ? this._l1 = 0 : e++ , this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si] } if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) { for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;); this._s1 = l[e - 1], this._si = e } else if (b < this._s1 && e > 0) { for (; e > 0 && (this._s1 = l[--e]) >= b;); 0 === e && b < this._s1 ? this._s1 = 0 : e++ , this._s2 = l[e], this._si = e } h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0 } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m; for (d = 1 - h, e = this._props.length; --e > -1;)f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i; if (this._autoRotate) { var q, r, s, t, u, v, w, x = this._autoRotate; for (e = x.length; --e > -1;)f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i) } } }), q = p.prototype; p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c) { return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c) }, p._cssRegister = function () { var a = f.CSSPlugin; if (a) { var b = a._internals, c = b._parseToProxy, d = b._setPluginRatio, e = b.CSSPropTween; b._registerComplexSpecialProp("bezier", { parser: function (a, b, f, g, h, i) { b instanceof Array && (b = { values: b }), i = new p; var j, k, l, m = b.values, n = m.length - 1, o = [], q = {}; if (0 > n) return h; for (j = 0; n >= j; j++)l = c(a, m[j], g, h, i, n !== j), o[j] = l.end; for (k in b) q[k] = b[k]; return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h } }) } }, q._mod = function (a) { for (var b, c = this._overwriteProps, d = c.length; --d > -1;)b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b) }, q._kill = function (a) { var b, c, d = this._props; for (b in this._beziers) if (b in a) for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;)d[c] === b && d.splice(c, 1); if (d = this._autoRotate) for (c = d.length; --c > -1;)a[d[c][2]] && d.splice(c, 1); return this._super._kill.call(this, a) }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
        var c, d, e, f, g = function () { a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio }, h = _gsScope._gsDefine.globals, i = {}, j = g.prototype = new a("css"); j.constructor = g, g.version = "1.20.0", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = { top: j, right: j, bottom: j, left: j, width: j, height: j, fontSize: j, padding: j, margin: j, perspective: j, lineHeight: "" }; var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g, t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, w = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, y = /opacity:([^;]*)/i, z = /alpha\(opacity *=.+?\)/i, A = /^(rgb|hsl)/, B = /([A-Z])/g, C = /-([a-z])/gi, D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function (a, b) { return b.toUpperCase() }, F = /(?:Left|Right|Width)/i, G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, I = /,(?=[^\)]*(?:\(|$))/gi, J = /[\s,\(]/i, K = Math.PI / 180, L = 180 / Math.PI, M = {}, N = { style: {} }, O = _gsScope.document || { createElement: function () { return N } }, P = function (a, b) { return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a) }, Q = P("div"), R = P("img"), S = g._internals = { _specialProps: i }, T = (_gsScope.navigator || {}).userAgent || "", U = function () { var a = T.indexOf("Android"), b = P("a"); return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1 }(), V = function (a) { return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1 }, W = function (a) { _gsScope.console && console.log(a) }, X = "", Y = "", Z = function (a, b) { b = b || Q; var c, d, e = b.style; if (void 0 !== e[a]) return a; for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];); return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null }, $ = O.defaultView ? O.defaultView.getComputedStyle : function () { }, _ = g.getStyle = function (a, b, c, d, e) { var f; return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a) }, aa = S.convertToPixels = function (a, c, d, e, f) { if ("px" === e || !e && "lineHeight" !== c) return d; if ("auto" === e || !d) return 0; var h, i, j, k = F.test(c), l = a, m = Q.style, n = 0 > d, o = 1 === d; if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e) if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight); else { if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e; else { if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100; m[k ? "width" : "height"] = d + e } l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0)) } else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a.style.lineHeight = i; return o && (h /= 100), n ? -h : h }, ba = S.calculateOffset = function (a, b, c) { if ("absolute" !== _(a, "position", c)) return 0; var d = "left" === b ? "Left" : "Top", e = _(a, "margin" + d, c); return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0) }, ca = function (a, b) { var c, d, e, f = {}; if (b = b || $(a, null)) if (c = b.length) for (; --c > -1;)e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e)); else for (c in b) (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]); else if (b = a.currentStyle || a.style) for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]); return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f }, da = function (a, b, c, d, e) { var f, g, h, i = {}, j = a.style; for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h))); if (d) for (g in d) "className" !== g && (i[g] = d[g]); return { difs: i, firstMPT: h } }, ea = { width: ["Left", "Right"], height: ["Top", "Bottom"] }, fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ga = function (a, b, c) { if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0; if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0; var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight), e = ea[b], f = e.length; for (c = c || $(a, null); --f > -1;)d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0; return d }, ha = function (a, b) { if ("contain" === a || "auto" === a || "auto auto" === a) return a + " "; (null == a || "" === a) && (a = "0 0"); var c, d = a.split(" "), e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0], f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1]; if (d.length > 3 && !b) { for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++)a.push(ha(d[c])); return a.join(",") } return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a }, ia = function (a, b) { return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0 }, ja = function (a, b) { return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0 }, ka = function (a, b, c, d) { var e, f, g, h, i, j = 1e-6; return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h }, la = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] }, ma = function (a, b, c) { return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0 }, na = g.parseColor = function (a, b) { var c, d, e, f, g, h, i, j, k, l, m; if (a) if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a]; else { if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a]; else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a]; else if ("hsl" === a.substr(0, 3)) if (c = m = a.match(s), b) { if (-1 !== a.indexOf("=")) return a.match(t) } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e); else c = a.match(s) || la.transparent; c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3])) } else c = la.black; return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c }, oa = function (a, b) { var c, d, e, f = a.match(pa) || [], g = 0, h = ""; if (!f.length) return a; for (c = 0; c < f.length; c++)d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")"; return h + a.substr(g) }, pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; for (j in la) pa += "|" + j + "\\b"; pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) { var b, c = a[0] + " " + a[1]; pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0 }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter); var qa = function (a, b, c, d) { if (null == a) return function (a) { return a }; var e, f = b ? (a.match(pa) || [""])[0] : "", g = a.split(f).join("").match(u) || [], h = a.substr(0, a.indexOf(g[0])), i = ")" === a.charAt(a.length - 1) ? ")" : "", j = -1 !== a.indexOf(" ") ? " " : ",", k = g.length, l = k > 0 ? g[0].replace(s, "") : ""; return k ? e = b ? function (a) { var b, m, n, o; if ("number" == typeof a) a += l; else if (d && I.test(a)) { for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++)o[n] = e(o[n]); return o.join(",") } if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--) for (; ++n < k;)m[n] = c ? m[(n - 1) / 2 | 0] : g[n]; return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "") } : function (a) { var b, f, m; if ("number" == typeof a) a += l; else if (d && I.test(a)) { for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++)f[m] = e(f[m]); return f.join(",") } if (b = a.match(u) || [], m = b.length, k > m--) for (; ++m < k;)b[m] = c ? b[(m - 1) / 2 | 0] : g[m]; return h + b.join(j) + i } : function (a) { return a } }, ra = function (a) { return a = a.split(","), function (b, c, d, e, f, g, h) { var i, j = (c + "").split(" "); for (h = {}, i = 0; 4 > i; i++)h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0]; return e.parse(b, h, f, g) } }, sa = (S._setPluginRatio = function (a) { this.plugin.setRatio(a); for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next; if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h.rotation), 1 === a || 0 === a) for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) { if (c = i.t, c.type) { if (1 === c.type) { for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++)e += c["xn" + d] + c["xs" + (d + 1)]; c[f] = e } } else c[f] = c.s + c.xs0; i = i._next } }, function (a, b, c, d, e) { this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d) }), ta = (S._parseToProxy = function (a, b, c, d, e, f) { var g, h, i, j, k, l = d, m = {}, n = {}, o = c._transform, p = M; for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) { if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type)) for (g = d.l; --g > 0;)i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i])); d = d._next } return { proxy: m, end: n, firstMPT: j, pt: k } }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) { this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this) }), ua = function (a, b, c, d, e, f) { var g = new ta(a, b, c, d - c, e, -1, f); return g.b = c, g.e = g.xs0 = d, g }, va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) { c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]); var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "), E = d.split(", ").join(",").split(" "), F = D.length, G = k !== !1; for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" "), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++)if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0); else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2], u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0; else if (v = p.match(s)) { if (w = u.match(t), !w || w.length !== v.length) return h; for (o = 0, n = 0; n < v.length; n++)A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2), 0 === n), o = z + A.length; h["xs" + h.l] += p.substr(o) } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u; if (-1 !== d.indexOf("=") && h.data) { for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)B += h["xs" + m] + h.data["xn" + m]; h.e = B + h["xs" + m] } return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h }, wa = 9; for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;)j["xn" + wa] = 0, j["xs" + wa] = ""; j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) { var g = this, h = g.l; return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++ , g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = { s: b + c }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g) }; var xa = function (a, b) { b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0 }, ya = S._registerComplexSpecialProp = function (a, b, c) { "object" != typeof b && (b = { parser: c }); var d, e, f = a.split(","), g = b.defaultValue; for (c = c || [g], d = 0; d < f.length; d++)b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b) }, za = S._registerPluginProp = function (a) { if (!i[a]) { var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin"; ya(a, { parser: function (a, c, d, e, f, g, j) { var k = h.com.greensock.plugins[b]; return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f) } }) } }; j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) { var g, h, i, j, k, l, m = this.keyword; if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) { for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++)b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m))); b = h.join(", "), c = i.join(", ") } return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f) }, j.parse = function (a, b, c, d, f, g, h) { return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g) }, g.registerSpecialProp = function (a, b, c) { ya(a, { parser: function (a, d, e, f, g, h, i) { var j = new ta(a, e, 0, 0, g, 2, e, !1, c); return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j }, priority: c }) }, g.useSVGTransformAttr = !0; var Aa, Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Ca = Z("transform"), Da = X + "transform", Ea = Z("transformOrigin"), Fa = null !== Z("perspective"), Ga = S.Transform = function () { this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1 }, Ha = _gsScope.SVGElement, Ia = function (a, b, c) { var d, e = O.createElementNS("http://www.w3.org/2000/svg", a), f = /([a-z])([A-Z])/g; for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]); return b.appendChild(e), e }, Ja = O.documentElement || {}, Ka = function () { var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome; return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, { width: 100, height: 50, x: 100 }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d }(), La = function (a, b, c, d, e, f) { var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform, w = Qa(a, !0); v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = { x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0, y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0, width: 0, height: 0 }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" ")) }, Ma = function (a) { var b, c = P("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), d = this.parentNode, e = this.nextSibling, f = this.style.cssText; if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try { b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma } catch (g) { } else this._originalGetBBox && (b = this._originalGetBBox()); return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b }, Na = function (a) { try { return a.getBBox() } catch (b) { return Ma.call(a, !0) } }, Oa = function (a) { return !(!(Ha && a.getCTM && Na(a)) || a.parentNode && !a.ownerSVGElement) }, Pa = [1, 0, 0, 1, 0, 0], Qa = function (a, b) { var c, d, e, f, g, h, i = a._gsTransform || new Ga, j = 1e5, k = a.style; if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = "none" === $(a).display) && a.parentNode || (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Pa; for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;)f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f; return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e }, Ra = S.getTransform = function (a, c, d, e) { if (a._gsTransform && d && !e) return a._gsTransform; var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga, n = m.scaleX < 0, o = 2e-5, p = 1e5, q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0, r = parseFloat(g.defaultTransformPerspective) || 0; if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) { if (16 === f.length) { var s, t, u, v, w, x = f[0], y = f[1], z = f[2], A = f[3], B = f[4], C = f[5], D = f[6], E = f[7], F = f[8], G = f[9], H = f[10], I = f[12], J = f[13], K = f[14], M = f[11], N = Math.atan2(D, H); m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)) } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) { var O = f.length >= 6, P = O ? f[0] : 1, Q = f[1] || 0, R = f[2] || 0, S = O ? f[3] : 1; m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)) } Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m.zOrigin = q; for (h in m) m[h] < o && m[h] > -o && (m[h] = 0) } return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () { Va(a.style, Ca) }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () { a.removeAttribute("transform") }))), m }, Sa = function (a) { var b, c, d = this.data, e = -d.rotation * K, f = e + d.skewX * K, g = 1e5, h = (Math.cos(e) * d.scaleX * g | 0) / g, i = (Math.sin(e) * d.scaleX * g | 0) / g, j = (Math.sin(f) * -d.scaleY * g | 0) / g, k = (Math.cos(f) * d.scaleY * g | 0) / g, l = this.t.style, m = this.t.currentStyle; if (m) { c = i, i = -j, j = -c, b = m.filter, l.filter = ""; var n, o, q = this.t.offsetWidth, r = this.t.offsetHeight, s = "absolute" !== m.position, t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k, u = d.x + q * d.xPercent / 100, v = d.y + r * d.yPercent / 100; if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) { var y, z, A, B = 8 > p ? 1 : -1; for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++)z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px" } } }, Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) { var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data, A = this.t.style, B = z.rotation, C = z.rotationX, D = z.rotationY, E = z.scaleX, F = z.scaleY, G = z.scaleZ, H = z.x, I = z.y, J = z.z, L = z.svg, M = z.perspective, N = z.force3D, O = z.skewY, P = z.skewX; if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")"); if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r; else { if (!(D || C || 1 !== G || M || L)) return void (A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : "")); c = g = 1, d = f = 0 } k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u }; j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f; d._lastParsedTransform = i; var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0; "function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a)); var l, m, n, o, p, s, t, u, v, w = a._gsTransform, x = a.style, y = 1e-6, z = Ba.length, A = i, B = {}, C = "transformOrigin", D = Ra(a, e, !0, A.parseTransform), E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform); if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d._transform = D, E && "string" == typeof E && Ca) m = Q.style,
                    m[Ca] = E, m.display = "block", m.position = "absolute", O.body.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent)); else if ("object" == typeof A) { if (l = { scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX), scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY), scaleZ: ja(A.scaleZ, D.scaleZ), x: ja(A.x, D.x), y: ja(A.y, D.y), z: ja(A.z, D.z), xPercent: ja(A.xPercent, D.xPercent), yPercent: ja(A.yPercent, D.yPercent), perspective: ja(A.transformPerspective, D.perspective) }, p = A.directionalRotation, null != p) if ("object" == typeof p) for (m in p) A[m] = p[m]; else A.rotation = p; "string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY) } for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;)v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n)); return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f
            }, prefix: !0
        }), ya("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), ya("borderRadius", { defaultValue: "0px", parser: function (a, b, c, f, g, h) { b = this.format(b); var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], z = a.style; for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++)this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g); return g }, prefix: !0, formatter: qa("0px 0px 0px 0px", !1, !0) }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", { defaultValue: "0px", parser: function (a, b, c, d, f, g) { return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f) }, prefix: !0, formatter: qa("0px 0px", !1, !0) }), ya("backgroundPosition", { defaultValue: "0 0", parser: function (a, b, c, d, f, g) { var h, i, j, k, l, m, n = "background-position", o = e || $(a, null), q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), r = this.format(b); if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) { for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;)q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%"); q = h.join(" ") } return this.parseComplex(a.style, q, r, f, g) }, formatter: ha }), ya("backgroundSize", { defaultValue: "0 0", formatter: function (a) { return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a) } }), ya("perspective", { defaultValue: "0px", prefix: !0 }), ya("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), ya("transformStyle", { prefix: !0 }), ya("backfaceVisibility", { prefix: !0 }), ya("userSelect", { prefix: !0 }), ya("margin", { parser: ra("marginTop,marginRight,marginBottom,marginLeft") }), ya("padding", { parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft") }), ya("clip", { defaultValue: "rect(0px,0px,0px,0px)", parser: function (a, b, c, d, f, g) { var h, i, j; return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g) } }), ya("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), ya("autoRound,strictUnits", { parser: function (a, b, c, d, e) { return e } }), ya("border", { defaultValue: "0px solid #000", parser: function (a, b, c, d, f, g) { var h = _(a, "borderTopWidth", e, !1, "0px"), i = this.format(b).split(" "), j = i[0].replace(w, ""); return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g) }, color: !0, formatter: function (a) { var b = a.split(" "); return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0] } }), ya("borderWidth", { parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }), ya("float,cssFloat,styleFloat", { parser: function (a, b, c, d, e, f) { var g = a.style, h = "cssFloat" in g ? "cssFloat" : "styleFloat"; return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b) } }); var Ua = function (a) { var b, c = this.t, d = c.filter || _(this.data, "filter") || "", e = this.s + this.c * a | 0; 100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e)) }; ya("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function (a, b, c, d, f, g) { var h = parseFloat(_(a, "opacity", e, !1, "1")), i = a.style, j = "autoAlpha" === c; return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f } }); var Va = function (a, b) { b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b)) }, Wa = function (a) { if (this.t._gsClassPT = this, 1 === a || 0 === a) { this.t.setAttribute("class", 0 === a ? this.b : this.e); for (var b = this.data, c = this.t.style; b;)b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next; 1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null) } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e) }; ya("className", { parser: function (a, b, d, f, g, h, i) { var j, k, l, m, n, o = a.getAttribute("class") || "", p = a.style.cssText; if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) { for (m = {}, n = l.data; n;)m[n.p] = 1, n = n._next; l.setRatio(1) } return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h) } }); var Xa = function (a) { if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) { var b, c, d, e, f, g = this.t.style, h = i.transform.parse; if ("all" === this.e) g.cssText = "", e = !0; else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;)c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c); e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform)) } }; for (ya("clearProps", { parser: function (a, b, d, e, f) { return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f } }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;)za(j[wa]); j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) { if (!a.nodeType) return !1; this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps; var n, p, s, t, u, v, w, x, z, A = a.style; if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) { for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;)s = s._next; x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop() } if (c) { for (; p;) { for (v = p._next, s = t; s && s.pr > p.pr;)s = s._next; (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v } this._firstPT = t } return !0 }, j.parse = function (a, b, c, f) { var g, h, j, l, m, n, o, p, s, t, u = a.style; for (g in b) { if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n, g, this, c, f, b); else { if ("--" === g.substr(0, 2)) { this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g); continue } m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p)) } f && c && !c.plugin && (c.plugin = f) } return c }, j.setRatio = function (a) { var b, c, d, e = this._firstPT, f = 1e-6; if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; e;) { if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type) if (1 === e.type) if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2; else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3; else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4; else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5; else { for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)]; e.t[e.p] = c } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a); else e.t[e.p] = b + e.xs0; e = e._next } else for (; e;)2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next; else for (; e;) { if (2 !== e.type) if (e.r && -1 !== e.type) if (b = Math.round(e.s + e.c), e.type) { if (1 === e.type) { for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)c += e["xn" + d] + e["xs" + (d + 1)]; e.t[e.p] = c } } else e.t[e.p] = b + e.xs0; else e.t[e.p] = e.e; else e.setRatio(a); e = e._next } }, j._enableTransforms = function (a) { this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3 }; var Ya = function (a) { this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0) }; j._addLazySet = function (a, b, c) { var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2); d.e = c, d.setRatio = Ya, d.data = this }, j._linkCSSP = function (a, b, c, d) { return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a }, j._mod = function (a) { for (var b = this._firstPT; b;)"function" == typeof a[b.p] && a[b.p] === Math.round && (b.r = 1), b = b._next }, j._kill = function (b) { var c, d, e, f = b; if (b.autoAlpha || b.alpha) { f = {}; for (d in b) f[d] = b[d]; f.opacity = 1, f.autoAlpha && (f.visibility = 1) } for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;)c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next; return a.prototype._kill.call(this, f) }; var Za = function (a, b, c) { var d, e, f, g; if (a.slice) for (e = a.length; --e > -1;)Za(a[e], b, c); else for (d = a.childNodes, e = d.length; --e > -1;)f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c) }; return g.cascadeTo = function (a, c, d) { var e, f, g, h, i = b.to(a, c, d), j = [i], k = [], l = [], m = [], n = b._internals.reservedProps; for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)if (f = da(m[e], k[e], l[e]), f.firstMPT) { f = f.difs; for (g in d) n[g] && (f[g] = d[g]); h = {}; for (g in f) h[g] = k[e][g]; j.push(b.fromTo(m[e], c, h, f)) } return j }, a.activate([g]), g
    }, !0), function () { var a = _gsScope._gsDefine.plugin({ propName: "roundProps", version: "1.6.0", priority: -1, API: 2, init: function (a, b, c) { return this._tween = c, !0 } }), b = function (a) { for (; a;)a.f || a.blob || (a.m = Math.round), a = a._next }, c = a.prototype; c._onInitAllProps = function () { for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -1;)h[f[g]] = Math.round; for (g = f.length; --g > -1;)for (a = f[g], c = e._firstPT; c;)d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 === c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT = d), c._next = c._prev = null, e._propLookup[a] = i)), c = d; return !1 }, c._add = function (a, b, c, d) { this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b) } }(), function () { _gsScope._gsDefine.plugin({ propName: "attr", API: 2, version: "0.6.1", init: function (a, b, c, d) { var e, f; if ("function" != typeof a.setAttribute) return !1; for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e); return !0 } }) }(), _gsScope._gsDefine.plugin({ propName: "directionalRotation", version: "0.3.1", API: 2, init: function (a, b, c, d) { "object" != typeof b && (b = { rotation: b }), this.finals = {}; var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6; for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e))); return !0 }, set: function (a) { var b; if (1 !== a) this._super.setRatio.call(this, a); else for (b = this._firstPT; b;)b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next } })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) { var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope, f = e.com.greensock, g = 2 * Math.PI, h = Math.PI / 2, i = f._class, j = function (b, c) { var d = i("easing." + b, function () { }, !0), e = d.prototype = new a; return e.constructor = d, e.getRatio = c, d }, k = a.register || function () { }, l = function (a, b, c, d, e) { var f = i("easing." + a, { easeOut: new b, easeIn: new c, easeInOut: new d }, !0); return k(f, a), f }, m = function (a, b, c) { this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a) }, n = function (b, c) { var d = i("easing." + b, function (a) { this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1 }, !0), e = d.prototype = new a; return e.constructor = d, e.getRatio = c, e.config = function (a) { return new d(a) }, d }, o = l("Back", n("BackOut", function (a) { return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1 }), n("BackIn", function (a) { return a * a * ((this._p1 + 1) * a - this._p1) }), n("BackInOut", function (a) { return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2) })), p = i("easing.SlowMo", function (a, b, c) { b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0 }, !0), q = p.prototype = new a; return q.constructor = p, q.getRatio = function (a) { var b = a + (.5 - a) * this._p; return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b }, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c) { return new p(a, b, c) }, b = i("easing.SteppedEase", function (a, b) { a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0 }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a) { return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1 }, q.config = b.config = function (a, c) { return new b(a, c) }, c = i("easing.RoughEase", function (b) { b = b || {}; for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;)c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = { x: c, y: d }; for (j.sort(function (a, b) { return a.x - b.x }), h = new m(1, 1, null), n = l; --n > -1;)g = j[n], h = new m(g.x, g.y, h); this._prev = new m(0, 0, 0 !== h.t ? h : h.next) }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a) { var b = this._prev; if (a > b.t) { for (; b.next && a >= b.t;)b = b.next; b = b.prev } else for (; b.prev && a <= b.t;)b = b.prev; return this._prev = b, b.v + (a - b.t) / b.gap * b.c }, q.config = function (a) { return new c(a) }, c.ease = new c, l("Bounce", j("BounceOut", function (a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375 }), j("BounceIn", function (a) { return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375) }), j("BounceInOut", function (a) { var b = .5 > a; return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5 })), l("Circ", j("CircOut", function (a) { return Math.sqrt(1 - (a -= 1) * a) }), j("CircIn", function (a) { return -(Math.sqrt(1 - a * a) - 1) }), j("CircInOut", function (a) { return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1) })), d = function (b, c, d) { var e = i("easing." + b, function (a, b) { this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2 }, !0), f = e.prototype = new a; return f.constructor = e, f.getRatio = c, f.config = function (a, b) { return new e(a, b) }, e }, l("Elastic", d("ElasticOut", function (a) { return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1 }, .3), d("ElasticIn", function (a) { return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) }, .3), d("ElasticInOut", function (a) { return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1 }, .45)), l("Expo", j("ExpoOut", function (a) { return 1 - Math.pow(2, -10 * a) }), j("ExpoIn", function (a) { return Math.pow(2, 10 * (a - 1)) - .001 }), j("ExpoInOut", function (a) { return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1))) })), l("Sine", j("SineOut", function (a) { return Math.sin(a * h) }), j("SineIn", function (a) { return -Math.cos(a * h) + 1 }), j("SineInOut", function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) })), i("easing.EaseLookup", { find: function (b) { return a.map[b] } }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a, b) {
    "use strict"; var c = {}, d = a.document, e = a.GreenSockGlobals = a.GreenSockGlobals || a; if (!e.TweenLite) {
        var f, g, h, i, j, k = function (a) { var b, c = a.split("."), d = e; for (b = 0; b < c.length; b++)d[c[b]] = d = d[c[b]] || {}; return d }, l = k("com.greensock"), m = 1e-10, n = function (a) { var b, c = [], d = a.length; for (b = 0; b !== d; c.push(a[b++])); return c }, o = function () { }, p = function () { var a = Object.prototype.toString, b = a.call([]); return function (c) { return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b) } }(), q = {}, r = function (d, f, g, h) { this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g; var i = []; this.check = function (j) { for (var l, m, n, o, p = f.length, s = p; --p > -1;)(l = q[f[p]] || new r(f[p], [])).gsClass ? (i[p] = l.gsClass, s--) : j && l.sc.push(this); if (0 === s && g) { if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h) if (e[n] = c[n] = o, "undefined" != typeof module && module.exports) if (d === b) { module.exports = c[b] = o; for (p in c) o[p] = c[p] } else c[b] && (c[b][n] = o); else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () { return o }); for (p = 0; p < this.sc.length; p++)this.sc[p].check() } }, this.check(!0) }, s = a._gsDefine = function (a, b, c, d) { return new r(a, b, c, d) }, t = l._class = function (a, b, c) { return b = b || function () { }, s(a, [], function () { return b }, c), b }; s.globals = e; var u = [0, 0, 1, 1], v = t("easing.Ease", function (a, b, c, d) { this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u }, !0), w = v.map = {}, x = v.register = function (a, b, c, d) { for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;)for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;)h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a }; for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) { if (this._func) return this._params[0] = a, this._func.apply(null, this._params); var b = this._type, c = this._power, d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a); return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2 }, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;)h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut"); w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut; var y = t("events.EventDispatcher", function (a) { this._listeners = {}, this._eventTarget = a || this }); h = y.prototype, h.addEventListener = function (a, b, c, d, e) { e = e || 0; var f, g, h = this._listeners[a], k = 0; for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;)f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1); h.splice(k, 0, { c: b, s: c, up: d, pr: e }) }, h.removeEventListener = function (a, b) { var c, d = this._listeners[a]; if (d) for (c = d.length; --c > -1;)if (d[c].c === b) return void d.splice(c, 1) }, h.dispatchEvent = function (a) { var b, c, d, e = this._listeners[a]; if (e) for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;)d = e[b], d && (d.up ? d.c.call(d.s || c, { type: a, target: c }) : d.c.call(d.s || c)) }; var z = a.requestAnimationFrame, A = a.cancelAnimationFrame, B = Date.now || function () { return (new Date).getTime() }, C = B(); for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;)z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"]; t("Ticker", function (a, b) { var c, e, f, g, h, k = this, l = B(), n = b !== !1 && z ? "auto" : !1, p = 500, q = 33, r = "tick", s = function (a) { var b, d, i = B() - C; i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++ , h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r) }; y.call(k), k.time = k.frame = 0, k.tick = function () { s(!0) }, k.lagSmoothing = function (a, b) { p = a || 1 / m, q = Math.min(b, p, 0) }, k.sleep = function () { null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1)) }, k.wake = function (a) { null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) { return setTimeout(a, 1e3 * (h - k.time) + 1 | 0) }, k === i && (j = !0), s(2) }, k.fps = function (a) { return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c }, k.useRAF = function (a) { return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n }, k.fps(a), setTimeout(function () { "auto" === n && k.frame < 5 && "hidden" !== d.visibilityState && k.useRAF(!1) }, 1500) }), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker; var D = t("core.Animation", function (a, b) { if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, X) { j || i.wake(); var c = this.vars.useFrames ? W : X; c.add(this, c._time), this.vars.paused && this.paused(!0) } }); i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1; var E = function () { j && B() - C > 2e3 && "hidden" !== d.visibilityState && i.wake(); var a = setTimeout(E, 2e3); a.unref && a.unref() }; E(), h.play = function (a, b) { return null != a && this.seek(a, b), this.reversed(!1).paused(!1) }, h.pause = function (a, b) { return null != a && this.seek(a, b), this.paused(!0) }, h.resume = function (a, b) { return null != a && this.seek(a, b), this.paused(!1) }, h.seek = function (a, b) { return this.totalTime(Number(a), b !== !1) }, h.restart = function (a, b) { return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0) }, h.reverse = function (a, b) { return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1) }, h.render = function (a, b, c) { }, h.invalidate = function () { return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this }, h.isActive = function () { var a, b = this._timeline, c = this._startTime; return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - 1e-7 }, h._enabled = function (a, b) { return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1 }, h._kill = function (a, b) { return this._enabled(!1, !1) }, h.kill = function (a, b) { return this._kill(a, b), this }, h._uncache = function (a) { for (var b = a ? this : this.timeline; b;)b._dirty = !0, b = b.timeline; return this }, h._swapSelfInParams = function (a) { for (var b = a.length, c = a.concat(); --b > -1;)"{self}" === a[b] && (c[b] = this); return c }, h._callback = function (a) { var b = this.vars, c = b[a], d = b[a + "Params"], e = b[a + "Scope"] || b.callbackScope || this, f = d ? d.length : 0; switch (f) { case 0: c.call(e); break; case 1: c.call(e, d[0]); break; case 2: c.call(e, d[0], d[1]); break; default: c.apply(e, d) } }, h.eventCallback = function (a, b, c, d) { if ("on" === (a || "").substr(0, 2)) { var e = this.vars; if (1 === arguments.length) return e[a]; null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b) } return this }, h.delay = function (a) { return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay }, h.duration = function (a) { return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration) }, h.totalDuration = function (a) { return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration }, h.time = function (a, b) { return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time }, h.totalTime = function (a, b, c) { if (j || i.wake(), !arguments.length) return this._totalTime; if (this._timeline) { if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) { this._dirty && this.totalDuration(); var d = this._totalDuration, e = this._timeline; if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline) for (; e._timeline;)e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline } this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Z(), this.render(a, b, !1), J.length && Z()) } return this }, h.progress = h.totalProgress = function (a, b) { var c = this.duration(); return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio }, h.startTime = function (a) { return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime }, h.endTime = function (a) { return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale }, h.timeScale = function (a) { if (!arguments.length) return this._timeScale; if (a = a || m, this._timeline && this._timeline.smoothChildTiming) { var b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(); this._startTime = c - (c - this._startTime) * this._timeScale / a } return this._timeScale = a, this._uncache(!1) }, h.reversed = function (a) { return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed }, h.paused = function (a) { if (!arguments.length) return this._paused; var b, c, d = this._timeline; return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this }; var F = t("core.SimpleTimeline", function (a) { D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0 }); h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) {
            var e, f; if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
            a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren) for (f = a._startTime; e && e._startTime > f;)e = e._prev; return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
        }, h._remove = function (a, b) { return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this }, h.render = function (a, b, c) { var d, e = this._first; for (this._totalTime = this._time = this._rawPrevTime = a; e;)d = e._next, (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d }, h.rawTime = function () { return j || i.wake(), this._totalTime }; var G = t("TweenLite", function (b, c, d) { if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target."; this.target = b = "string" != typeof b ? b : G.selector(b) || b; var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType), i = this.vars.overwrite; if (this._overwrite = i = null == i ? V[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : V[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0]) for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++)f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = $(f, this, !1), 1 === i && this._siblings[e].length > 1 && aa(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1); else this._propLookup = {}, this._siblings = $(b, this, !1), 1 === i && this._siblings.length > 1 && aa(b, this, null, 1, this._siblings); (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay))) }, !0), H = function (b) { return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType) }, I = function (a, b) { var c, d = {}; for (c in a) U[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!R[c] || R[c] && R[c]._autoCSS) || (d[c] = a[c], delete a[c]); a.css = d }; h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.20.2", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) { i.lagSmoothing(a, b) }, G.selector = a.$ || a.jQuery || function (b) { var c = a.$ || a.jQuery; return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) }; var J = [], K = {}, L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, M = /[\+-]=-?[\.\d]/, N = function (a) { for (var b, c = this._firstPT, d = 1e-6; c;)b = c.blob ? 1 === a && this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next }, O = function (a, b, c, d) { var e, f, g, h, i, j, k, l = [], m = 0, n = "", o = 0; for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++)k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = { _next: l._firstPT, t: l, p: l.length - 1, s: g, c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0, f: 0, m: o && 4 > o ? Math.round : 0 }), m += k.length; return n += b.substr(m), n && l.push(n), l.setRatio = N, M.test(b) && (l.end = 0), l }, P = function (a, b, c, d, e, f, g, h, i) { "function" == typeof d && (d = d(i || 0, a)); var j, k = typeof a[b], l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b], n = "string" == typeof d && "=" === d.charAt(1), o = { t: a, p: b, s: m, f: "function" === k, pg: 0, n: e || b, m: f ? "function" == typeof f ? f : Math.round : 0, pr: 0, c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0 }; return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = O(m, n ? parseFloat(o.s) + o.c : d, h || G.defaultStringFilter, o), o = { t: j, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: e || b, pr: 0, m: 0 }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0 }, Q = G._internals = { isArray: p, isSelector: H, lazyTweens: J, blobDif: O }, R = G._plugins = {}, S = Q.tweenLookup = {}, T = 0, U = Q.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1, id: 1, yoyoEase: 1 }, V = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 }, W = D._rootFramesTimeline = new F, X = D._rootTimeline = new F, Y = 30, Z = Q.lazyRender = function () { var a, b = J.length; for (K = {}; --b > -1;)a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1); J.length = 0 }; X._startTime = i.time, W._startTime = i.frame, X._active = W._active = !0, setTimeout(Z, 1), D._updateRoot = G.render = function () { var a, b, c; if (J.length && Z(), X.render((i.time - X._startTime) * X._timeScale, !1, !1), W.render((i.frame - W._startTime) * W._timeScale, !1, !1), J.length && Z(), i.frame >= Y) { Y = i.frame + (parseInt(G.autoSleep, 10) || 120); for (c in S) { for (b = S[c].tweens, a = b.length; --a > -1;)b[a]._gc && b.splice(a, 1); 0 === b.length && delete S[c] } if (c = X._first, (!c || c._paused) && G.autoSleep && !W._first && 1 === i._listeners.tick.length) { for (; c && c._paused;)c = c._next; c || i.sleep() } } }, i.addEventListener("tick", D._updateRoot); var $ = function (a, b, c) { var d, e, f = a._gsTweenID; if (S[f || (a._gsTweenID = f = "t" + T++)] || (S[f] = { target: a, tweens: [] }), b && (d = S[f].tweens, d[e = d.length] = b, c)) for (; --e > -1;)d[e] === b && d.splice(e, 1); return S[f].tweens }, _ = function (a, b, c, d) { var e, f, g = a.vars.onOverwrite; return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1 }, aa = function (a, b, c, d, e) { var f, g, h, i; if (1 === d || d >= 4) { for (i = e.length, f = 0; i > f; f++)if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0); else if (5 === d) break; return g } var j, k = b._startTime + m, l = [], n = 0, o = 0 === b._duration; for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || ba(b, 0, o), 0 === ba(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h))); for (f = n; --f > -1;)if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) { if (2 !== d && !_(h, b)) continue; h._enabled(!1, !1) && (g = !0) } return g }, ba = function (a, b, c) { for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) { if (f += d._startTime, e *= d._timeScale, d._paused) return -100; d = d._timeline } return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m }; h._init = function () { var a, b, c, d, e, f, g = this.vars, h = this._overwrittenProps, i = this._duration, j = !!g.immediateRender, k = g.ease; if (g.startAt) { this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {}; for (d in g.startAt) e[d] = g.startAt[d]; if (e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = G.to(this.target, 0, e), j) if (this._time > 0) this._startAt = null; else if (0 !== i) return } else if (g.runBackwards && 0 !== i) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else { 0 !== this._time && (j = !1), c = {}; for (d in g) U[d] && "autoCSS" !== d || (c[d] = g[d]); if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) { if (0 === this._time) return } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null) } if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (f = this._targets.length, a = 0; f > a; a++)this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0); else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0); if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards) for (c = this._firstPT; c;)c.s += c.c, c.c = -c.c, c = c._next; this._onUpdate = g.onUpdate, this._initted = !0 }, h._initProps = function (b, c, d, e, f) { var g, h, i, j, k, l; if (null == b) return !1; K[b._gsTweenID] && Z(), this.vars.css || b.style && b !== a && b.nodeType && R.css && this.vars.autoCSS !== !1 && I(this.vars, b); for (g in this.vars) if (l = this.vars[g], U[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this)); else if (R[g] && (j = new R[g])._onInitTween(b, this.vars[g], this, f)) { for (this._firstPT = k = { _next: this._firstPT, t: j, p: "setRatio", s: 0, c: 1, f: 1, n: g, pg: 1, pr: j._priority, m: 0 }, h = j._overwriteProps.length; --h > -1;)c[j._overwriteProps[h]] = this._firstPT; (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k) } else c[g] = P.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f); return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && aa(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i) }, h.render = function (a, b, c) { var d, e, f, g, h = this._time, i = this._duration, j = this._rawPrevTime; if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m); else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), (!this._initted || this._startAt && this._startAt.progress()) && (c = !0); else if (this._totalTime = this._time = a, this._easeType) { var k = a / i, l = this._easeType, n = this._easePower; (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2 } else this.ratio = this._ease.getRatio(a / i); if (this._time !== h || c) { if (!this._initted) { if (this._init(), !this._initted || this._gc) return; if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void (this._lazy = [a, b]); this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) } for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;)f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next; this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0)) } }, h._kill = function (a, b, c) { if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1); b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b; var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline; if ((p(b) || H(b)) && "number" != typeof b[0]) for (d = b.length; --d > -1;)this._kill(a, b[d], c) && (i = !0); else { if (this._targets) { for (d = this._targets.length; --d > -1;)if (b === this._targets[d]) { h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all"; break } } else { if (b !== this.target) return !1; h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all" } if (h) { if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) { for (f in j) h[f] && (l || (l = []), l.push(f)); if ((l || !a) && !_(this, c, b, l)) return !1 } for (f in j) (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1); !this._firstPT && this._initted && this._enabled(!1, !1) } } return i }, h.invalidate = function () { return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this }, h._enabled = function (a, b) { if (j || i.wake(), a && this._gc) { var c, d = this._targets; if (d) for (c = d.length; --c > -1;)this._siblings[c] = $(d[c], this, !0); else this._siblings = $(this.target, this, !0) } return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1 }, G.to = function (a, b, c) { return new G(a, b, c) }, G.from = function (a, b, c) { return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c) }, G.fromTo = function (a, b, c, d) { return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d) }, G.delayedCall = function (a, b, c, d, e) { return new G(b, 0, { delay: a, onComplete: b, onCompleteParams: c, callbackScope: d, onReverseComplete: b, onReverseCompleteParams: c, immediateRender: !1, lazy: !1, useFrames: e, overwrite: 0 }) }, G.set = function (a, b) { return new G(a, 0, b) }, G.getTweensOf = function (a, b) { if (null == a) return []; a = "string" != typeof a ? a : G.selector(a) || a; var c, d, e, f; if ((p(a) || H(a)) && "number" != typeof a[0]) { for (c = a.length, d = []; --c > -1;)d = d.concat(G.getTweensOf(a[c], b)); for (c = d.length; --c > -1;)for (f = d[c], e = c; --e > -1;)f === d[e] && d.splice(c, 1) } else if (a._gsTweenID) for (d = $(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1); return d || [] }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) { "object" == typeof b && (c = b, b = !1); for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;)d[e]._kill(c, a) }; var ca = t("plugins.TweenPlugin", function (a, b) { this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ca.prototype }, !0); if (h = ca.prototype, ca.version = "1.19.0", ca.API = 2, h._firstPT = null, h._addTween = P, h.setRatio = N, h._kill = function (a) { var b, c = this._overwriteProps, d = this._firstPT; if (null != a[this._propName]) this._overwriteProps = []; else for (b = c.length; --b > -1;)null != a[c[b]] && c.splice(b, 1); for (; d;)null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next; return !1 }, h._mod = h._roundProps = function (a) { for (var b, c = this._firstPT; c;)b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next }, G._onPluginEvent = function (a, b) { var c, d, e, f, g, h = b._firstPT; if ("_onInitAllProps" === a) { for (; h;) { for (g = h._next, d = e; d && d.pr > h.pr;)d = d._next; (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g } h = b._firstPT = e } for (; h;)h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next; return c }, ca.activate = function (a) { for (var b = a.length; --b > -1;)a[b].API === ca.API && (R[(new a[b])._propName] = a[b]); return !0 }, s.plugin = function (a) { if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition."; var b, c = a.propName, d = a.priority || 0, e = a.overwriteProps, f = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" }, g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () { ca.call(this, c, d), this._overwriteProps = e || [] }, a.global === !0), h = g.prototype = new ca(c); h.constructor = g, g.API = a.API; for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]); return g.version = a.version, ca.activate([g]), g }, f = a._gsQueue) { for (g = 0; g < f.length; g++)f[g](); for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h) } j = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

/*! ScrollMagic v2.0.2 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://janpaepke.github.io/ScrollMagic */
!function (e, t) { "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t() }(this, function () { "use strict"; var e = function () { }; e.version = "2.0.2", e.Controller = function (n) { var i, o, s = "ScrollMagic.Controller", a = { f: "FORWARD", r: "REVERSE", p: "PAUSED" }, l = t.defaults, c = this, u = r.extend({}, l, n), f = [], d = !1, g = 0, h = a.p, p = !0, v = 0, m = !0, w = function () { for (var e in u) l.hasOwnProperty(e) || delete u[e]; if (u.container = r.get.elements(u.container)[0], !u.container) throw s + " init failed."; p = u.container === window || u.container === document.body || !document.body.contains(u.container), p && (u.container = window), v = u.vertical ? r.get.height(u.container) : r.get.width(u.container), u.container.addEventListener("resize", x), u.container.addEventListener("scroll", x), u.refreshInterval = parseInt(u.refreshInterval) || l.refreshInterval, y() }, y = function () { u.refreshInterval > 0 && (o = window.setTimeout(z, u.refreshInterval)) }, E = function () { return u.vertical ? r.get.scrollTop(u.container) : r.get.scrollLeft(u.container) }, S = function (e) { u.vertical ? p ? window.scrollTo(r.get.scrollLeft(), e) : u.container.scrollTop = e : p ? window.scrollTo(e, r.get.scrollTop()) : u.container.scrollLeft = e }, b = function () { if (m && d) { g = c.scrollPos(); var e = r.type.Array(d) ? d : f.slice(0); h === a.r && e.reverse(), e.forEach(function (e) { e.update(!0) }), 0 === e.length && u.loglevel >= 3, d = !1 } }, F = function () { i = r.rAF(b) }, x = function (e) { if ("resize" == e.type) v = u.vertical ? r.get.height(u.container) : r.get.width(u.container), h = a.p; else { var t = g; g = c.scrollPos(); var n = g - t; 0 !== n && (h = n > 0 ? a.f : a.r) } d || (d = !0, F()) }, z = function () { if (!p && v != (u.vertical ? r.get.height(u.container) : r.get.width(u.container))) { var e; try { e = new Event("resize", { bubbles: !1, cancelable: !1 }) } catch (t) { e = document.createEvent("Event"), e.initEvent("resize", !1, !1) } u.container.dispatchEvent(e) } f.forEach(function (e) { e.refresh() }), y() }; this._options = u; var T = function (e) { if (e.length <= 1) return e; var t = e.slice(0); return t.sort(function (e, t) { return e.scrollOffset() > t.scrollOffset() ? 1 : -1 }), t }; return this.addScene = function (t) { if (r.type.Array(t)) t.forEach(function (e) { c.addScene(e) }); else if (t instanceof e.Scene) if (t.controller() !== c) t.addTo(c); else if (f.indexOf(t) < 0) { f.push(t), f = T(f), t.on("shift.controller_sort", function () { f = T(f) }); for (var n in u.globalSceneOptions) t[n] && t[n].call(t, u.globalSceneOptions[n]) } return c }, this.removeScene = function (e) { if (r.type.Array(e)) e.forEach(function (e) { c.removeScene(e) }); else { var t = f.indexOf(e); t > -1 && (e.off("shift.controller_sort"), f.splice(t, 1), e.remove()) } return c }, this.updateScene = function (t, n) { return r.type.Array(t) ? t.forEach(function (e) { c.updateScene(e, n) }) : n ? t.update(!0) : d !== !0 && t instanceof e.Scene && (d = d || [], -1 == d.indexOf(t) && d.push(t), d = T(d), F()), c }, this.update = function (e) { return x({ type: "resize" }), e && b(), c }, this.scrollTo = function (t) { if (r.type.Number(t)) S.call(u.container, t); else if (t instanceof e.Scene) t.controller() === c ? c.scrollTo(t.scrollOffset()) : log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", t); else if (r.type.Function(t)) S = t; else { var n = r.get.elements(t)[0]; if (n) { var i = u.vertical ? "top" : "left", o = r.get.offset(u.container), s = r.get.offset(n); p || (o[i] -= c.scrollPos()), c.scrollTo(s[i] - o[i]) } else log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", t) } return c }, this.scrollPos = function (e) { return arguments.length ? (r.type.Function(e) && (E = e), c) : E.call(c) }, this.info = function (e) { var t = { size: v, vertical: u.vertical, scrollPos: g, scrollDirection: h, container: u.container, isDocument: p }; return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t }, this.loglevel = function (e) { return arguments.length ? (u.loglevel != e && (u.loglevel = e), c) : u.loglevel }, this.enabled = function (e) { return arguments.length ? (m != e && (m = !!e, c.updateScene(f, !0)), c) : m }, this.destroy = function (e) { window.clearTimeout(o); for (var t = f.length; t--;)f[t].destroy(e); return u.container.removeEventListener("resize", x), u.container.removeEventListener("scroll", x), r.cAF(i), null }, w(), c }; var t = { defaults: { container: window, vertical: !0, globalSceneOptions: {}, loglevel: 2, refreshInterval: 100 } }; e.Controller.addOption = function (e, n) { t.defaults[e] = n }, e.Controller.extend = function (t) { var n = this; e.Controller = function () { return n.apply(this, arguments), this.$super = r.extend({}, this), t.apply(this, arguments) || this }, r.extend(e.Controller, n), e.Controller.prototype = n.prototype, e.Controller.prototype.constructor = e.Controller }, e.Scene = function (t) { var i, o, s = "data-scrollmagic-pin-spacer", a = n.defaults, l = this, c = r.extend({}, a, t), u = "BEFORE", f = 0, d = { start: 0, end: 0 }, g = 0, h = !0, p = function () { for (var e in c) a.hasOwnProperty(e) || delete c[e]; for (var t in a) F(t); S(), l.on("change.internal", function (e) { "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? w() : "reverse" === e.what && l.update()) }).on("shift.internal", function () { v(), l.update() }) }; this.addTo = function (t) { return t instanceof e.Controller && o != t && (o && o.removeScene(l), o = t, S(), m(!0), w(!0), v(), o.info("container").addEventListener("resize", y), t.addScene(l), l.trigger("add", { controller: o }), l.update()), l }, this.enabled = function (e) { return arguments.length ? (h != e && (h = !!e, l.update(!0)), l) : h }, this.remove = function () { if (o) { o.info("container").removeEventListener("resize", y); var e = o; o = void 0, e.removeScene(l), l.trigger("remove") } return l }, this.destroy = function (e) { return l.trigger("destroy", { reset: e }), l.remove(), l.off("*.*"), null }, this.update = function (e) { if (o) if (e) if (o.enabled() && h) { var t, n = o.info("scrollPos"); t = c.duration > 0 ? (n - d.start) / (d.end - d.start) : n >= d.start ? 1 : 0, l.trigger("update", { startPos: d.start, endPos: d.end, scrollPos: n }), l.progress(t) } else z && "DURING" === u && R(!0); else o.updateScene(l, !1); return l }, this.refresh = function () { return m(), w(), l }, this.progress = function (e) { if (arguments.length) { var t = !1, n = u, r = o ? o.info("scrollDirection") : "PAUSED", i = c.reverse || e >= f; if (0 === c.duration ? (t = f != e, f = 1 > e && i ? 0 : 1, u = 0 === f ? "BEFORE" : "DURING") : 0 >= e && "BEFORE" !== u && i ? (f = 0, u = "BEFORE", t = !0) : e > 0 && 1 > e && i ? (f = e, u = "DURING", t = !0) : e >= 1 && "AFTER" !== u ? (f = 1, u = "AFTER", t = !0) : "DURING" !== u || i || R(), t) { var s = { progress: f, state: u, scrollDirection: r }, a = u != n, d = function (e) { l.trigger(e, s) }; a && "DURING" !== n && (d("enter"), d("BEFORE" === n ? "start" : "end")), d("progress"), a && "DURING" !== u && (d("BEFORE" === u ? "start" : "end"), d("leave")) } return l } return f }; var v = function () { d = { start: g + c.offset }, o && c.triggerElement && (d.start -= o.info("size") * c.triggerHook), d.end = d.start + c.duration }, m = function (e) { if (i) { var t = "duration"; b(t, i.call(l)) && !e && (l.trigger("change", { what: t, newval: c[t] }), l.trigger("shift", { reason: t })) } }, w = function (e) { var t = 0, n = c.triggerElement; if (o && n) { for (var i = o.info(), a = r.get.offset(i.container), u = i.vertical ? "top" : "left"; n.parentNode.hasAttribute(s);)n = n.parentNode; var f = r.get.offset(n); i.isDocument || (a[u] -= o.scrollPos()), t = f[u] - a[u] } var d = t != g; g = t, d && !e && l.trigger("shift", { reason: "triggerElementPosition" }) }, y = function () { c.triggerHook > 0 && l.trigger("shift", { reason: "containerResize" }) }, E = r.extend(n.validate, { duration: function (e) { if (r.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) { var t = parseFloat(e) / 100; e = function () { return o ? o.info("size") * t : 0 } } if (r.type.Function(e)) { i = e; try { e = parseFloat(i()) } catch (n) { e = -1 } } if (e = parseFloat(e), !r.type.Number(e) || 0 > e) throw i ? (i = void 0, 0) : 0; return e } }), S = function (e) { e = arguments.length ? [e] : Object.keys(E), e.forEach(function (e) { var t; if (E[e]) try { t = E[e](c[e]) } catch (n) { t = a[e] } finally { c[e] = t } }) }, b = function (e, t) { var n = !1, r = c[e]; return c[e] != t && (c[e] = t, S(e), n = r != c[e]), n }, F = function (e) { l[e] || (l[e] = function (t) { return arguments.length ? ("duration" === e && (i = void 0), b(e, t) && (l.trigger("change", { what: e, newval: c[e] }), n.shifts.indexOf(e) > -1 && l.trigger("shift", { reason: e })), l) : c[e] }) }; this.controller = function () { return o }, this.state = function () { return u }, this.scrollOffset = function () { return d.start }, this.triggerPosition = function () { var e = c.offset; return o && (e += c.triggerElement ? g : o.info("size") * l.triggerHook()), e }; var x = {}; this.on = function (e, t) { return r.type.Function(t) && (e = e.trim().split(" "), e.forEach(function (e) { var n = e.split("."), r = n[0], i = n[1]; "*" != r && (x[r] || (x[r] = []), x[r].push({ namespace: i || "", callback: t })) })), l }, this.off = function (e, t) { return e ? (e = e.trim().split(" "), e.forEach(function (e) { var n = e.split("."), r = n[0], i = n[1] || "", o = "*" === r ? Object.keys(x) : [r]; o.forEach(function (e) { for (var n = x[e] || [], r = n.length; r--;) { var o = n[r]; !o || i !== o.namespace && "*" !== i || t && t != o.callback || n.splice(r, 1) } n.length || delete x[e] }) }), l) : l }, this.trigger = function (t, n) { if (t) { var r = t.trim().split("."), i = r[0], o = r[1], s = x[i]; s && s.forEach(function (t) { o && o !== t.namespace || t.callback.call(l, new e.Event(i, t.namespace, l, n)) }) } return l }; var z, T; l.on("shift.internal", function (e) { var t = "duration" === e.reason; ("AFTER" === u && t || "DURING" === u && 0 === c.duration) && R(), t && C() }).on("progress.internal", function () { R() }).on("add.internal", function () { C() }).on("destroy.internal", function (e) { l.removePin(e.reset) }); var R = function (e) { if (z && o) { var t = o.info(); if (e || "DURING" !== u) { var n = { position: T.inFlow ? "relative" : "absolute", top: 0, left: 0 }, i = r.css(z, "position") != n.position; T.pushFollowers ? c.duration > 0 && ("AFTER" === u && 0 === parseFloat(r.css(T.spacer, "padding-top")) ? i = !0 : "BEFORE" === u && 0 === parseFloat(r.css(T.spacer, "padding-bottom")) && (i = !0)) : n[t.vertical ? "top" : "left"] = c.duration * f, r.css(z, n), i && C() } else { "fixed" != r.css(z, "position") && (r.css(z, { position: "fixed" }), C()); var s = r.get.offset(T.spacer, !0), a = c.reverse || 0 === c.duration ? t.scrollPos - d.start : Math.round(f * c.duration * 10) / 10; s[t.vertical ? "top" : "left"] += a, r.css(z, { top: s.top, left: s.left }) } } }, C = function () { if (z && o && T.inFlow) { var e = "DURING" === u, t = o.info("vertical"), n = T.spacer.children[0], i = r.isMarginCollapseType(r.css(T.spacer, "display")), s = {}; T.relSize.width || T.relSize.autoFullWidth ? e ? r.css(z, { width: r.get.width(T.spacer) }) : r.css(z, { width: "100%" }) : (s["min-width"] = r.get.width(t ? z : n, !0, !0), s.width = e ? s["min-width"] : "auto"), T.relSize.height ? e ? r.css(z, { height: r.get.height(T.spacer) - c.duration }) : r.css(z, { height: "100%" }) : (s["min-height"] = r.get.height(t ? n : z, !0, !i), s.height = e ? s["min-height"] : "auto"), T.pushFollowers && (s["padding" + (t ? "Top" : "Left")] = c.duration * f, s["padding" + (t ? "Bottom" : "Right")] = c.duration * (1 - f)), r.css(T.spacer, s) } }, L = function () { o && z && "DURING" === u && !o.info("isDocument") && R() }, D = function () { o && z && "DURING" === u && ((T.relSize.width || T.relSize.autoFullWidth) && r.get.width(window) != r.get.width(T.spacer.parentNode) || T.relSize.height && r.get.height(window) != r.get.height(T.spacer.parentNode)) && C() }, N = function (e) { o && z && "DURING" === u && !o.info("isDocument") && (e.preventDefault(), o.scrollTo(o.info("scrollPos") - (e[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"] / 3 || 30 * -e.detail))) }; this.setPin = function (e, t) { var n = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" }; if (t = r.extend({}, n, t), e = r.get.elements(e)[0], !e) return l; if ("fixed" === r.css(e, "position")) return l; if (z) { if (z === e) return l; l.removePin() } z = e; var i = z.parentNode.style.display, o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"]; z.parentNode.style.display = "none"; var a = "absolute" != r.css(z, "position"), c = r.css(z, o.concat(["display"])), u = r.css(z, ["width", "height"]); z.parentNode.style.display = i, !a && t.pushFollowers && (t.pushFollowers = !1); var f = z.parentNode.insertBefore(document.createElement("div"), z), d = r.extend(c, { position: a ? "relative" : "absolute", boxSizing: "content-box", mozBoxSizing: "content-box", webkitBoxSizing: "content-box" }); if (a || r.extend(d, r.css(z, ["width", "height"])), r.css(f, d), f.setAttribute(s, ""), r.addClass(f, t.spacerClass), T = { spacer: f, relSize: { width: "%" === u.width.slice(-1), height: "%" === u.height.slice(-1), autoFullWidth: "auto" === u.width && a && r.isMarginCollapseType(c.display) }, pushFollowers: t.pushFollowers, inFlow: a }, !z.___origStyle) { z.___origStyle = {}; var g = z.style, h = o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]); h.forEach(function (e) { z.___origStyle[e] = g[e] || "" }) } return T.relSize.width && r.css(f, { width: u.width }), T.relSize.height && r.css(f, { height: u.height }), f.appendChild(z), r.css(z, { position: a ? "relative" : "absolute", margin: "auto", top: "auto", left: "auto", bottom: "auto", right: "auto" }), (T.relSize.width || T.relSize.autoFullWidth) && r.css(z, { boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box" }), window.addEventListener("scroll", L), window.addEventListener("resize", L), window.addEventListener("resize", D), z.addEventListener("mousewheel", N), z.addEventListener("DOMMouseScroll", N), R(), l }, this.removePin = function (e) { if (z) { if ("DURING" === u && R(!0), e || !o) { var t = T.spacer.children[0]; if (t.hasAttribute(s)) { var n = T.spacer.style, i = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"]; margins = {}, i.forEach(function (e) { margins[e] = n[e] || "" }), r.css(t, margins) } T.spacer.parentNode.insertBefore(t, T.spacer), T.spacer.parentNode.removeChild(T.spacer), z.parentNode.hasAttribute(s) || (r.css(z, z.___origStyle), delete z.___origStyle) } window.removeEventListener("scroll", L), window.removeEventListener("resize", L), window.removeEventListener("resize", D), z.removeEventListener("mousewheel", N), z.removeEventListener("DOMMouseScroll", N), z = void 0 } return l }; var O, A = []; return l.on("destroy.internal", function (e) { l.removeClassToggle(e.reset) }), this.setClassToggle = function (e, t) { var n = r.get.elements(e); return 0 !== n.length && r.type.String(t) ? (A.length > 0 && l.removeClassToggle(), O = t, A = n, l.on("enter.internal_class leave.internal_class", function (e) { var t = "enter" === e.type ? r.addClass : r.removeClass; A.forEach(function (e) { t(e, O) }) }), l) : l }, this.removeClassToggle = function (e) { return e && A.forEach(function (e) { r.removeClass(e, O) }), l.off("start.internal_class end.internal_class"), O = void 0, A = [], l }, p(), l }; var n = { defaults: { duration: 0, offset: 0, triggerElement: void 0, triggerHook: .5, reverse: !0, loglevel: 2 }, validate: { offset: function (e) { if (e = parseFloat(e), !r.type.Number(e)) throw 0; return e }, triggerElement: function (e) { if (e = e || void 0) { var t = r.get.elements(e)[0]; if (!t) throw 0; e = t } return e }, triggerHook: function (e) { var t = { onCenter: .5, onEnter: 1, onLeave: 0 }; if (r.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1)); else { if (!(e in t)) throw 0; e = t[e] } return e }, reverse: function (e) { return !!e } }, shifts: ["duration", "offset", "triggerHook"] }; e.Scene.addOption = function (e, t, r, i) { e in n.defaults || (n.defaults[e] = t, n.validate[e] = r, i && n.shifts.push(e)) }, e.Scene.extend = function (t) { var n = this; e.Scene = function () { return n.apply(this, arguments), this.$super = r.extend({}, this), t.apply(this, arguments) || this }, r.extend(e.Scene, n), e.Scene.prototype = n.prototype, e.Scene.prototype.constructor = e.Scene }, e.Event = function (e, t, n, r) { r = r || {}; for (var i in r) this[i] = r[i]; return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this }; var r = e._util = function (e) { var t, n = {}, r = function (e) { return parseFloat(e) || 0 }, i = function (t) { return t.currentStyle ? t.currentStyle : e.getComputedStyle(t) }, o = function (t, n, o, s) { if (n = n === document ? e : n, n === e) s = !1; else if (!f.DomElement(n)) return 0; t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); var a = (o ? n["offset" + t] || n["outer" + t] : n["client" + t] || n["inner" + t]) || 0; if (o && s) { var l = i(n); a += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight) } return a }, s = function (e) { return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (e) { return e[1].toUpperCase() }) }; n.extend = function (e) { for (e = e || {}, t = 1; t < arguments.length; t++)if (arguments[t]) for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]); return e }, n.isMarginCollapseType = function (e) { return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1 }; var a = 0, l = ["ms", "moz", "webkit", "o"], c = e.requestAnimationFrame, u = e.cancelAnimationFrame; for (t = 0; !c && t < l.length; ++t)c = e[l[t] + "RequestAnimationFrame"], u = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"]; c || (c = function (t) { var n = (new Date).getTime(), r = Math.max(0, 16 - (n - a)), i = e.setTimeout(function () { t(n + r) }, r); return a = n + r, i }), u || (u = function (t) { e.clearTimeout(t) }), n.rAF = c.bind(e), n.cAF = u.bind(e); var f = n.type = function (e) { return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase() }; f.String = function (e) { return "string" === f(e) }, f.Function = function (e) { return "function" === f(e) }, f.Array = function (e) { return Array.isArray(e) }, f.Number = function (e) { return !f.Array(e) && e - parseFloat(e) + 1 >= 0 }, f.DomElement = function (e) { return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName }; var d = n.get = {}; return d.elements = function (t) { var n = []; if (f.String(t)) try { t = document.querySelectorAll(t) } catch (r) { return n } if ("nodelist" === f(t) || f.Array(t)) for (var i = 0, o = n.length = t.length; o > i; i++) { var s = t[i]; n[i] = f.DomElement(s) ? s : d.elements(s) } else (f.DomElement(t) || t === document || t === e) && (n = [t]); return n }, d.scrollTop = function (t) { return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0 }, d.scrollLeft = function (t) { return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0 }, d.width = function (e, t, n) { return o("width", e, t, n) }, d.height = function (e, t, n) { return o("height", e, t, n) }, d.offset = function (e, t) { var n = { top: 0, left: 0 }; if (e && e.getBoundingClientRect) { var r = e.getBoundingClientRect(); n.top = r.top, n.left = r.left, t || (n.top += d.scrollTop(), n.left += d.scrollLeft()) } return n }, n.addClass = function (e, t) { t && (e.classList ? e.classList.add(t) : e.className += " " + t) }, n.removeClass = function (e, t) { t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")) }, n.css = function (e, t) { if (f.String(t)) return i(e)[s(t)]; if (f.Array(t)) { var n = {}, r = i(e); return t.forEach(function (e) { n[e] = r[s(e)] }), n } for (var o in t) { var a = t[o]; a == parseFloat(a) && (a += "px"), e.style[s(o)] = a } }, n }(window || {}); return e });

/*! ScrollMagic v2.0.2 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://janpaepke.github.io/ScrollMagic */
!function (e, n) { "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n) : "object" == typeof exports ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax)) : n(e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic, e.TweenMax || e.TweenLite, e.TimelineMax || e.TimelineLite) }(this, function (e, n, r) { "use strict"; e.Scene.addOption("tweenChanges", !1, function (e) { return !!e }), e.Scene.extend(function () { var e, t = this; t.on("progress.plugin_gsap", function () { i() }), t.on("destroy.plugin_gsap", function (e) { t.removeTween(e.reset) }); var i = function () { if (e) { var n = t.progress(), r = t.state(); e.repeat && -1 === e.repeat() ? "DURING" === r && e.paused() ? e.play() : "DURING" === r || e.paused() || e.pause() : n != e.progress() && (0 === t.duration() ? n > 0 ? e.play() : e.reverse() : t.tweenChanges() && e.tweenTo ? e.tweenTo(n * e.duration()) : e.progress(n).pause()) } }; t.setTween = function (o, a, s) { var u; arguments.length > 1 && (arguments.length < 3 && (s = a, a = 1), o = n.to(o, a, s)); try { u = r ? new r({ smoothChildTiming: !0 }).add(o) : o, u.pause() } catch (p) { return t } return e && t.removeTween(), e = u, o.repeat && -1 === o.repeat() && (e.repeat(-1), e.yoyo(o.yoyo())), i(), t }, t.removeTween = function (n) { return e && (n && e.progress(0).pause(), e.kill(), e = void 0), t } }) });

jQuery(function ($) {

    if (_ismobile) return false;

    var controller = new ScrollMagic.Controller();

    //banner scroll parallax
    var bannersParallaxL = $('.banner-parallax').length;

    for (var k=0; k<bannersParallaxL; k++) {
        new ScrollMagic.Scene({
            triggerElement: $('.banner-parallax')[k],
            triggerHook: 1,
            duration: $(window).height()+$($('.banner-parallax')[k]).outerHeight()
        })
            .setTween(
                new TimelineMax().fromTo(
                    $($('.banner-parallax')[k]).find('.bg-image'),
                    1,
                    { y: '-200px', scale:1.1},
                    {y: '200px', scale:1.1, ease: Linear.easeNone}
                )
            )
            .addTo(controller);
    }

    // load top-banner animation
    if($('.top-banner.banner-parallax').length){
        var timelineTopBanner = new TimelineMax(),
            topBanner = $('.top-banner.banner-parallax .bg-entry');
        timelineTopBanner.fromTo(topBanner, 1.5,
            {autoAlpha:0.5, scale:1.3},
            {autoAlpha:1, scale:1.17}
        );
    }

});






jQuery(function ($) {


     $(document).ajaxComplete(function( event, xhr, settings ){
        if( jQuery.type( settings.data ) === "string" ){
            if( settings.data.split('&')[0] == 'action=process_form_submission' ){
                if( xhr.responseJSON && xhr.responseJSON.success ){
					_functions.openPopup($('.popup-content[data-rel="3"]'));
                } else {
                	_functions.openPopup($('.popup-content[data-rel="4"]'));
                }
            }
        }
    });


	//BLOG posts AJAX function
	function load_blog_posts(){
		var cur_page = getUrlParameter('cur_page');
		var category = getUrlParameter('category');
		$.post( ajaxurl, {
	        'action' 		: 'load_blog_posts',
	        'cur_page' 		: cur_page,
	        'category'		: category
		})
		.done(function(response) {			
			$('#ajax-container').html(response);
			var max_num_page = $('.blogposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-container").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}





    //Filter Categories by menu
    $(document).on('click', '.catts li a', function() {
    	$('.catts li a').each(function () { 
		  $(this).parent().removeClass('active');
		});
        $(this).parent().addClass('active');
		var paramname = $('.catts').attr('data-type');
		var this_val_prod = $(this).attr('data-category');
    	if (this_val_prod){
    		this_val_prod = '['+this_val_prod+']';
    	} else { 
    		this_val_prod = '[all_' + paramname + ']';
    	}
    	setGetParameter(paramname, this_val_prod);
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
    	load_blog_posts();
    });

    //Filter Categories by item click
    $(document).on('click', '.product-category a', function(e) {
    	e.preventDefault;
		var paramname = $(this).parent().attr('data-type');
		var category_attr = $(this).attr('data-category');
		var this_val_prod = $(this).attr('data-category');
    	if (this_val_prod){
    		this_val_prod = '['+this_val_prod+']';
    	} else { 
    		this_val_prod = '[all_' + paramname + ']';
    	}
    	setGetParameter(paramname, this_val_prod);
    	$('.catts li a').each(function () { 
    		var menu_category = $(this).data('category');
			$(this).parent().removeClass('active');
        if(menu_category == category_attr){
        	$(this).parent().addClass('active');
        }
		});
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
    	load_blog_posts();
    });


	$(document).on('click','.blog-pagination .page-pagin li a',function(e){
		e.preventDefault;
        var clickPage = $(this).data('page');
        paramname = 'cur_page';
        setGetParameter(paramname, clickPage);
        load_blog_posts();
        return false;
    });

	//Get URL Parametr
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
	//Change URL Parametr
    function setGetParameter(paramName, paramValue){
        var url = window.location.href;
        var hash = location.hash;
        url = url.replace(hash, '');
        if (url.indexOf(paramName + "=") >= 0){
            var prefix = url.substring(0, url.indexOf(paramName));
            var suffix = url.substring(url.indexOf(paramName));
            suffix = suffix.substring(suffix.indexOf("=") + 1);
            suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
            url = prefix + paramName + "=" + paramValue + suffix;
        } else {
	        if (url.indexOf("?") < 0)
	            url += "?" + paramName + "=" + paramValue;
	        else
	            url += "&" + paramName + "=" + paramValue;
        }
        history.pushState('', '', url + hash);
    }

    //REMOVE URL PARAMETR
    function removeParam(key) {
	    var url = document.location.href;
	    var params = url.split('?');
	    if (params.length == 1) return;

	    url = params[0] + '?';
	    params = params[1];
	    params = params.split('&');

	    $.each(params, function (index, value) {
	        var v = value.split('=');
	        if (v[0] != key) url += value + '&';
	    });

	    url = url.replace(/&$/, '');
	    url = url.replace(/\?$/, '');

	    history.pushState('', '', url);
	}


	$(document).on('click','.go-to-category',function(e){
		e.preventDefault;
        var blogcat = $(this).data('blogcat');
        var homeurl = document.origin;
        var newurl = homeurl+'/blog/?cur_page=1&category=['+blogcat+']';
        window.location.href = newurl;
    });

/*    $(document).on('click','.go-to-projects',function(e){
		e.preventDefault;
        var projectcat = $(this).data('projectcat');
        var homeurl = document.origin;
        var newurl = homeurl+'/projects/?cur_page=1&category=['+projectcat+']';
        window.location.href = newurl;
    });*/
	$(document).on('click', '.go-to-projects', function (e) {
		e.preventDefault;
		Cookies.set('project-scroll', '1');
	    var dataCat = '['+$(this).data('projectcat')+']';
	    location.href = '/projects/' + '?category=' + dataCat;
	});


	document.addEventListener( 'wpcf7mailsent', function( event ) {
	    if ( '463' == event.detail.contactFormId ) {
	        jQuery('.popup-wrapper, .popup-content[data-rel="6"]').addClass('active');
	    }
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
	    if ( '489' == event.detail.contactFormId ) {
	        jQuery('.popup-wrapper, .popup-content[data-rel="61"]').addClass('active');
	    }
	}, false );

	document.addEventListener( 'wpcf7submit', function( event ) {
	    if ( '489' == event.detail.contactFormId ) {
	    	var vacancy_title = $('.top-banner').data('title');
	    	$('.cv_subject').val(vacancy_title);
	    	var dataPlaceholderText = $('.file-name').data('placeholder-text');
	    	$('.file-name').text(dataPlaceholderText);
	    }
	}, false );

	document.addEventListener( 'wpcf7mailsent', function( event ) {
	    if ( '522' == event.detail.contactFormId ) {
	        jQuery('.popup-wrapper, .popup-content[data-rel="7"]').addClass('active');
	    }
	}, false );

	$(document).on('focus', '#wpcf7-f489-o1 input', function() {
		$(this).removeClass('wpcf7-not-valid');
	});
	$(document).on('focus', '#wpcf7-f489-o1 textarea', function() {
		$(this).removeClass('wpcf7-not-valid');
	});
	$(document).on('focus', '#wpcf7-f522-o1 input', function() {
		$(this).removeClass('wpcf7-not-valid');
	});
	$(document).on('focus', '#wpcf7-f522-o1 textarea', function() {
		$(this).removeClass('wpcf7-not-valid');
	});
	$(document).on('focus', '#wpcf7-f463-o1 input', function() {
		$(this).removeClass('wpcf7-not-valid');
	});
	$(document).on('focus', '#wpcf7-f463-o1 textarea', function() {
		$(this).removeClass('wpcf7-not-valid');
	});




	//PROJECTS AJAX function
	function load_projects(){
		var cur_page = getUrlParameter('cur_page');
		var category = getUrlParameter('category');
		var project_type = getUrlParameter('type');
		$.post( ajaxurl, {
	        'action' 		: 'load_projects',
	        'cur_page' 		: cur_page,
	        'category'		: category,
	        'project_type'	: project_type
		})
		.done(function(response) {			
			$('#ajax-container-projects').html(response);
			var max_num_page = $('.projectposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-container-projects").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}

    //Filter projects by categories
    $(document).on('change', '.filter-category input', function() {
		var paramname = $('.filter-category').data('filtertype');
    	$('.filter-category input').each(function() {
			var this_val_prod = '';
			$('.filter-category').find('input:checked').each(function () {
	    			this_val_prod += $(this).data('cat')+'+';
			});
	    	if (this_val_prod){
	    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
	    	} else { 
	    		this_val_prod = '[all]';
	    	}
	    	setGetParameter(paramname, this_val_prod);
    	});
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
    	load_projects();

    });

    //Filter projects by type
    $(document).on('change', '.filter-type input', function() {
		var paramname = $('.filter-type').data('filtertype');
    	$('.filter-type input').each(function() {
			var this_val_prod = '';
			$('.filter-type').find('input:checked').each(function () {
	    			this_val_prod += $(this).data('type')+'+';
			});
	    	if (this_val_prod){
	    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
	    	} else { 
	    		this_val_prod = '[all]';
	    	}
	    	setGetParameter(paramname, this_val_prod);
    	});
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
    	load_projects();
    	_functions.closePopup();
    });



	$(document).on('click','.projects-pagination .page-pagin li a',function(e){
		e.preventDefault;
        var clickPage = $(this).data('page');
        paramname = 'cur_page';
        setGetParameter(paramname, clickPage);
        load_projects();
        return false;
    });

    //Filter Categories by project item click
    $(document).on('click', '.project-category a', function(e) {
    	e.preventDefault;
    	var paramname = $(this).parent().data('type');
    	var category_attr = $(this).data('category');
    	var this_val_prod = $(this).data('category');
    	if (this_val_prod){
    		this_val_prod = '['+this_val_prod+']';
    	} else { 
    		this_val_prod = '[all_' + paramname + ']';
    	}
    	setGetParameter(paramname, this_val_prod);
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
        checked_categories();
    	load_projects();
    });



	function checked_categories(){
		var category = getUrlParameter('category');
		$('.filter-category').find('input').each(function () {
	    	var input_datacat = $(this).data('cat');
	    	if(category) {
		    	if(category.includes(input_datacat)){
		    		$(this).prop('checked', true);
		    	}
	    	}
		});
	}

	function checked_types(){
		var project_type = getUrlParameter('type');
		$('.filter-type').find('input').each(function () {
	    	var input_datatype = $(this).data('type');
	    	if(project_type) {
		    	if(project_type.includes(input_datatype)){
		    		$(this).prop('checked', true);
		    	}
	    	}
		});
	}

	$(window ).load(function() {
		checked_categories();
		checked_types();
	});


	$(document).on('click','.category-products .page-pagin li a',function(e){
		e.preventDefault;
        var clickPage = $(this).data('page');
        paramname = 'cur_page';
        setGetParameter(paramname, clickPage);
        load_category_products();
        return false;
    });

	//category products AJAX function
	function load_category_products(){
		var cur_page = getUrlParameter('cur_page');
		var brand = getUrlParameter('brand');
		var price_range = getUrlParameter('price_range');
		var catID = $('.filter').attr('data-filter');
		var url_parameters = window.location.search;

		$.post( ajaxurl, {
	        'action' 		: 'load_category_products',
	        'cur_page' 		: cur_page,
	        'brand'			: brand,
	        'price_range'	: price_range,
	        'catID'			: catID,
	        'url_parameters': url_parameters,
		})
		.done(function(response) {
		console.log(response);	
			$('#ajax-products-container').html(response);
			var max_num_page = $('.blogposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-products-container").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}



//load products in category by click 
$(document).on('click', '.filter .custom-filter input', function() {
	$('.filter .custom-filter').each(function() {
		var this_wrap = $(this);
		var paramname = this_wrap.attr('data-filter');
		var this_val_prod = '';
    	$(this_wrap).find('input:checked').each(function () {
    		this_val_prod += $(this).attr('data-value')+'+';
		});
    	if (this_val_prod){
    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
    		setGetParameter(paramname, this_val_prod);    		
    	} else {
    		removeParam(paramname);
    	}
	});
	load_filter_section();
	load_category_products();
	_functions.closePopup();
});

//color list
$('#ajax-filter-section').on('click', '.filter .custom-filter .color-list li', function() {
	$(this).find('input').prop( "checked", true );
    $(this).toggleClass('active');
    	$('.filter .custom-filter .color-list li').each(function() {
		var this_wrap = $(this).parent();
		var paramname = this_wrap.attr('data-filter-color');
		var this_val_prod = '';
    	$(this_wrap).find('.active').each(function () {
    		this_val_prod += $(this).find('input').attr('data-value')+'+';
		});
    	if (this_val_prod){
    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
    		setGetParameter(paramname, this_val_prod);    		
    	} else {
    		removeParam(paramname);
    	}
	});
	load_category_products();
    load_filter_section();
});



	//filter products AJAX update
	function load_filter_section(){
		var cur_page = getUrlParameter('cur_page');
		var brand = getUrlParameter('brand');
		var price_range = getUrlParameter('price_range');
		var catID = $('.filter').attr('data-filter');
		var url_parameters = window.location.search;

		$.post( ajaxurl, {
	        'action' 		: 'load_filter_section',
	        'cur_page' 		: cur_page,
	        'brand'			: brand,
	        'price_range'	: price_range,
	        'catID'			: catID,
	        'url_parameters': url_parameters,
		})
		.done(function(response) {			
			$('#ajax-filter-section').html(response);
			_functions.sliderRange();
			checkFilterChosen();
			checkFilterColor();
			//var max_num_page = $('.blogposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-products-container").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}


	//checked filter items on load
	function checkFilterChosen(){
		var url_parameters = window.location.search;
	    if(url_parameters){
			$('.filter .custom-filter').each(function() {			
				$(this).find('input').each(function () {
	    		var inputValue = $(this).attr('data-value');
	    		if(url_parameters.includes(inputValue)){
				    $(this).prop("checked", true);
				}
				});
			});			
	    }
	}
	checkFilterChosen();

	//checked partners filter items on load
	function checkPartnersFilterChosen(){
		var url_parameters = window.location.search;
	    if(url_parameters){
			$('.filter-partners .custom-filter').each(function() {			
				$(this).find('input').each(function () {
	    		var inputValue = $(this).attr('data-value');
	    		var filterType = $(this).attr('data-type');
	    		var url_paramname = getUrlParameter(filterType);
	    		if(url_paramname){
	    			if(url_paramname.includes(inputValue)){
				    	$(this).prop("checked", true);
					}
	    		}
				});
			});			
	    }
	}
	checkPartnersFilterChosen();
	
	//checked filter colors on load
	function checkFilterColor(){
		var url_parameters = window.location.search;
	    if(url_parameters){
			$('.filter .custom-filter .color-list li').each(function() {			
	    		var colorValue = $(this).find('input').attr('data-value');
	    		
	    		if(url_parameters.includes(colorValue)){
				    $(this).addClass('active');
				}
			});			
	    }
	}
	checkFilterColor();

	//checked partners filter colors on load
	function checkPartnersFilterColor(){
		var url_parameters = window.location.search;
	    if(url_parameters){
			$('.filter-partners .custom-filter .color-list li').each(function() {			
	    		var colorValue = $(this).find('input').attr('data-value');
	    		if(url_parameters.includes(colorValue)){
				    $(this).addClass('active');
				}
			});			
	    }
	}
	checkPartnersFilterColor();


	//filter products by price range
	$(document).on( "slidechange", '.filter .slider-range', function( event, ui ) {
		var min = $(":first-child", ".slider-range .amount-start" ).text();
		var max = $(":first-child", ".slider-range .amount-end" ).text();
		var paramname = 'price_range';
		this_val_prod = '['+min+'+'+max+']';
		setGetParameter(paramname, this_val_prod);
		load_category_products();
    	load_filter_section();
	} );

	//filter products by price range
	$(document).on( "slidechange", '.filter-partners .slider-range', function( event, ui ) {
		var min = $(":first-child", ".slider-range .amount-start" ).text();
		var max = $(":first-child", ".slider-range .amount-end" ).text();
		var paramname = 'price_range';
		this_val_prod = '['+min+'+'+max+']';
		setGetParameter(paramname, this_val_prod);
		load_partners_products();
    	load_partners_filter_section();
	} );








/////////////////////////////////////////////////// PARTNER PRODUCTS AJAX
	//filter products AJAX update
	function load_partners_filter_section(){
		var cur_page = getUrlParameter('cur_page');
		var product_cat = getUrlParameter('product_cat');
		var price_range = getUrlParameter('price_range');
		var partnerID = $('.filter-partners').attr('data-partnerfilter');
		var url_parameters = window.location.search;

		$.post( ajaxurl, {
	        'action' 		: 'load_partners_filter_section',
	        'cur_page' 		: cur_page,
	        'product_cat'	: product_cat,
	        'price_range'	: price_range,
	        'partnerID'		: partnerID,
	        'url_parameters': url_parameters,
		})
		.done(function(response) {			
			$('#ajax-filter-section').html(response);
			_functions.sliderRange();
			checkPartnersFilterChosen();
			checkPartnersFilterColor();
			//var max_num_page = $('.blogposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-products-container").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}


	function load_partners_products(){
		var cur_page = getUrlParameter('cur_page');
		var product_cat = getUrlParameter('product_cat');
		var price_range = getUrlParameter('price_range');
		var partnerID = $('.filter-partners').attr('data-partnerfilter');
		var url_parameters = window.location.search;

		$.post( ajaxurl, {
	        'action' 		: 'load_partners_products',
	        'cur_page' 		: cur_page,
	        'product_cat'	: product_cat,
	        'price_range'	: price_range,
	        'partnerID'		: partnerID,
	        'url_parameters': url_parameters,
		})
		.done(function(response) {			
			$('#ajax-products-container').html(response);
			var max_num_page = $('.blogposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#ajax-products-container").offset().top - 60
			  }, 1000);
			}, 100);
		});
	}

	//load partners products by click 
	$(document).on('click', '.filter-partners .custom-filter input', function() {
		$('.filter-partners .custom-filter').each(function() {
			var this_wrap = $(this);
			var paramname = this_wrap.attr('data-filter');
			var this_val_prod = '';
	    	$(this_wrap).find('input:checked').each(function () {
	    		this_val_prod += $(this).attr('data-value')+'+';
			});
	    	if (this_val_prod){
	    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
	    		setGetParameter(paramname, this_val_prod);
        		setGetParameter('cur_page', '1');    		
	    	} else {
	    		removeParam(paramname);
	    	}
		});
		load_partners_filter_section();
		load_partners_products();
	});


	$(document).on('click','.partners-products .page-pagin li a',function(e){
		e.preventDefault;
        var clickPage = $(this).data('page');
        paramname = 'cur_page';
        setGetParameter(paramname, clickPage);
        load_partners_products();
        return false;
    });



















	//Cart AJAX count === оновлення кількості товарів в міні-карт (цифра)
	var stop_ajax_cart = 1, is_add_cart = '';
	$(document).on('click', '.ajax_add_to_cart', function() {
		stop_ajax_cart = 2;
		is_add_cart = 'added';
		//$('.cart_count_loading').css('opacity', '1');
		$(this).append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-loader2.svg" alt="">');
	});
	//=== оновлення кількості товарів в міні-карт (цифра)
	$(document).ajaxComplete(function(){
		if(stop_ajax_cart == 2 && is_add_cart == 'added'){
			$.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'cart_count_ajax'
				},
				dataType: 'json',
				complete: function(response) {
					$('.ajax_add_to_cart').find('.add-to-cart-loader').remove();
					//$(this).append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-checked.svg" alt="">');
					//console.log('add-to-cart-loader removed');
					var json_cart = response.responseJSON;
					$('.shopping-cart').addClass('not-empty-cart');
					$('.shopping-cart .goods-amount').text(json_cart.cart_count);
					//get_cart();
					//$('.cart_count_loading').css('opacity', '0');
				}
			});			
			stop_ajax_cart = 1, is_add_cart = '';			
		}
	});








    /* ==========================================
        Add to cart product.
    ========================================== */
    $(document).on('click', '.add_to_cart_button', function(e){
        e.preventDefault();
        var product_id   = $(this).data('product_id'),
            quantity     = $(this).data('quantity');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajaxurl,
            data: {
                action         : 'prod_add_to_cart',
                'product_id'   : product_id,
                'quantity'     : quantity
            },
            complete: function(response){
                var data = response.responseJSON;
                if( data.result == 'true' && !data.eror){
                    $(document.body).trigger('wc_fragments_refreshed');
                }
            }
        });
		return false;
    });


    /* ==========================================
      Update Cart.
    ========================================== */
    $(document).ready(function() {
        $('body').bind("wc_fragments_refreshed", get_cart);
    });

    function get_cart(){
        if( window.wc_add_to_cart_params != undefined ){
            $.post({
                url: wc_add_to_cart_params.ajax_url,
                dataType: 'JSON',
                data: {action: 'woomenucart_ajax'},
                success: function(data, textStatus, XMLHttpRequest) {
                    $('.shopping-cart .goods-amount').text(data.cart_count);
                    $('#shopping-card-popup .cart-wrap').html(data);
                    $('#edit_shopping_cart .cart-wrap').html(data);
                }
            });
        }
    }


    /* ==========================================
      Update checkout page edit order.
    ========================================== */
    $(document).ready(function() {
        $('body').bind("wc_fragments_refreshed", get_editcart);
    });

    function get_editcart(){
        if( window.wc_add_to_cart_params != undefined ){
            $.post({
                url: wc_add_to_cart_params.ajax_url,
                dataType: 'JSON',
                data: {action: 'woomenueditcart_ajax'},
                success: function(data, textStatus, XMLHttpRequest) {
                    //$('.shopping-cart .goods-amount').text(data.cart_count);
                    $('#checkout_products').html(data);
                }
            });
        }
    }    


	/* ==========================================
        Remove product block from mini-cart.
    ========================================== */
	$(document).on('click', '.product .product-remove', function(e){
		var that            = $(this),
			productId       = that.data('cart-item-key'),
			cart_count_ajax = parseInt($('.shopping-cart .goods-amount').text()),
			quantity        = parseInt(that.closest('.product').find('.product-count .quantity .cin-input').val());
		$.post( ajaxurl, {
				'action'    : 'remove_item_from_cart1',
				'product_id' : productId
			})
			.done(function(response) {
				$('.shopping-cart .goods-amount').text(cart_count_ajax - quantity);
				that.closest('.product').slideUp();
				var left_qty = cart_count_ajax - quantity;
				if(left_qty <= 0){
					_functions.closePopup();
					$('.shopping-cart').removeClass('not-empty-cart');
					if (window.location.pathname == "/checkout/") {
					    window.location.reload();
					}
				}
				$(document.body).trigger('wc_fragments_refreshed');					
			});

	});


    $(document).on('click', '.product-count .cin-increment', function(e) {
    	$(this).parent().append('<img class="mini-cart-loader" src="/wp-content/themes/floorbest/img/ajaxloader.gif" alt="">');
      	$('.cart-total-title').append('<img class="mini-cart-loader-cart-total" src="/wp-content/themes/floorbest/img/ajaxloader.gif" alt="">');
         var $input = $(this).siblings('.cin-input'),
            val = parseInt($input.val()),
            max = parseInt($input.attr('max')),
            step = parseInt($input.attr('step'));
         var temp = val + step;
        $input.val(temp <= max ? temp : max);
    });
                    
    $(document).on('click', '.product-count .cin-decrement', function(e) {
    	console.log('click decrement');
        var $input = $(this).siblings('.cin-input'),
            val = parseInt($input.val()),
            min = parseInt($input.attr('min')),
            step = parseInt($input.attr('step'));
        var temp = val - step;
        $input.val(temp >= min ? temp : min);
    });

    //continue buy button click
	$(document).on('click', '.continue_buy', function(e) {
    	e.preventDefault();
    	$('.layer-close').click();
    });

    //save_cart button click
	$(document).on('click', '.save_cart', function(e) {
    	e.preventDefault();
    	$('.layer-close').click();
    });

    /* ==========================================
        Remove one product from mini-cart.
    ========================================== */
 	$(document).on('click', '.product .quantity .cin-decrement', function(e){
		var that            = $(this), 
     		productId       = that.data('cart-item-key'),
      		cart_count_ajax = parseInt($('.shopping-cart .goods-amount').text()),
      		quantity        = parseInt(that.closest('.quantity').find('.cin-input').val()) + 1;
      		$(this).parent().append('<img class="mini-cart-loader" src="/wp-content/themes/floorbest/img/ajaxloader.gif" alt="">');
      		$('.cart-total-title').append('<img class="mini-cart-loader-cart-total" src="/wp-content/themes/floorbest/img/ajaxloader.gif" alt="">');
		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: {
				action       : 'remove_item_from_cart_one',
				'product_id' : productId,
				'quantity'   : quantity,
			},
			success: function(res){
				console.log('remove one product success');
				$('.shopping-cart .goods-amount').text(cart_count_ajax - 1);
          		$(document.body).trigger('wc_fragments_refreshed');
         	}
		});
    });


 	//NOVA POSHTA departments
    $('.department_delivery').select2();
    $('.city_delivery').on('change',function (){
        $.post( ajaxurl, {
                'action'    : 'get_np_deps',
                'id' : $(this).val(),
            })
            .done(function(response) {
                $('select.department_delivery option').remove();
                $('select.department_delivery').append(response).select2();
            })
            .fail(function(request, status, error) {
                showError(request.responseText);
            })

    }).select2();


	//checkout validation on submit click
	$(document).on('click', '.checkout_submit', function(e){
		e.preventDefault;
		var func_return;

		//check if choose courier delivery
		if($('.courier_del .courier_del_input').is(':checked')){
			$(".courier_del_fields input").each(function(){
				if($(this).val().length == 0){
					$(this).addClass('novalid_field');
				} else {
					$(this).removeClass('novalid_field');
				}
			});
		}

		//check if choose nova poshta
		if($('.np_del .np_del_input').is(':checked')){
			var city_delivery_value = $('.city_delivery').val();
			if(city_delivery_value){
				$('.city-selection .select2-selection').removeClass('novalid_field');
			} else {
				$('.city-selection .select2-selection').addClass('novalid_field');
			}
			var department_delivery_value = $('.department_delivery').val();
			if(department_delivery_value && !$('.department_delivery option:selected').is('.make-a-choose')){
				$('.department-selection .select2-selection').removeClass('novalid_field');
			} else {
				$('.department-selection .select2-selection').addClass('novalid_field');
			}

		}

		//check all courier delivery fields
		$('.order-contact-details input').each(function(){
			if($(this).is('.novalid_field')){
				func_return = 'false';
			}
		});
		//check all nova poshta fields
		$('.city-selection .select2-selection').each(function(){
			if($(this).is('.novalid_field')){
				func_return = 'false';
			}
		});
		$('.department-selection .select2-selection').each(function(){
			if($(this).is('.novalid_field')){
				func_return = 'false';
			}
		});
		if(func_return == 'false'){
			return false;	
		}

	});

	//checkout validate on change
	$(document).on('change', '.city_delivery', function() {
		$('.city-selection .select2-selection').removeClass('novalid_field');	
	});
	$(document).on('change', '.department_delivery', function() {
		$('.department-selection .select2-selection').removeClass('novalid_field');	
	});
	$('.order-contact-details input').each(function(){
		$(this).keyup(function() {
			$(this).removeClass('novalid_field');
		});
	});





//compare functions
var cookieList = function (cookieName) {
    var items = Cookies.getJSON(cookieName) || [];
    return {
        add: function (val) {
            items.push(val);
            Cookies.set(cookieName, items);
        },
        remove: function (val){
        	items.splice($.inArray(val, items),1);
			Cookies.set(cookieName, items);
        },
        exists: function (val) {
            return items.indexOf(val) > -1
        }
    }
}

var list = new cookieList("comparelist");
//if its a mobile device use 'touchstart'
if( _ismobile ) {
    deviceEventType = 'touchstart'
} else {
//If its not a mobile device use 'click'
    deviceEventType = 'click'
}

$(document).on('click', '.fl-add-to-compare', function () {
    var prod_id = $(this).data('productid');
    var exists = list.exists(JSON.stringify(prod_id));
    var $this = $(this);
    if(!exists){
    	list.add(JSON.stringify(prod_id));
    	$('.compare-btn').addClass('active');
        $this.append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-loader2.svg" alt="">');
        $this.addClass('loading');

        setTimeout(function() {
            $this.find('.add-to-cart-loader').remove();
            //$this.append('<img class="add-to-cart-loader" src="/wp-content/themes/floorbest/img/icon-checked.svg" alt="">');
            $this.find('.add-to-compare-check').addClass('compare-active');
            var compare_array = Cookies.getJSON('comparelist');
    		$('.compare-btn .compare-count').text(compare_array.length);
        }, 3500);
    } else {
    	list.remove(JSON.stringify(prod_id));
    	$this.find('.add-to-compare-check').removeClass('compare-active');
		var compare_array = Cookies.getJSON('comparelist');
    	$('.compare-btn .compare-count').text(compare_array.length);
    	if(compare_array.length <= 0){
    		$('.compare-btn').removeClass('active');
    	}
    }
});

$(document).on('click', '.fl-remove-from-compare', function () {
    var prod_id = $(this).data('productid');
    list.remove(JSON.stringify(prod_id));
    var compare_array = Cookies.getJSON('comparelist');
    if(compare_array.length > 0){
    	location.reload();
    } else {
    	window.history.back();
    }
});



$(document).on('click', '.project-cat', function (e) {
	e.preventDefault;
	Cookies.set('project-scroll', '1');
    var dataCat = '['+$(this).data('cat')+']';
    location.href = location.href + '/projects/' + '?category=' + dataCat;
});


//SEARCH AJAX FILTER function
	function search_filter(){
		var cur_page = getUrlParameter('cur_page');
		var search_type = getUrlParameter('search_type');
		var search_query = getUrlParameter('s');
		$.post( ajaxurl, {
	        'action' 		: 'search_filter',
	        'cur_page' 		: cur_page,
	        'search_type'	: search_type,
	        'search_query'	: search_query
		})
		.done(function(response) {			
			$('#search_ajax').html(response);
			//var max_num_page = $('.projectposts').attr('data-max-page');
			setTimeout(function(){
				$('html, body').animate({
			    scrollTop: $("#search_ajax").offset().top - 200
			  }, 1000);
			}, 100);
		});
	}

    //Filter search results
    $(document).on('change', '.filter-search input', function() {
		var paramname = 'search_type';
    	$('.filter-search input').each(function() {
			var this_val_prod = '';
			$('.filter-search').find('input:checked').each(function () {
	    			this_val_prod += $(this).data('type')+'+';
			});
	    	if (this_val_prod){
	    		this_val_prod = '['+this_val_prod.substring(0, this_val_prod.length - 1)+']';
	    		setGetParameter(paramname, this_val_prod);
	    	} else { 
	    		removeParam(paramname);
	    	}
    	});
    	paramname = 'cur_page';
        setGetParameter(paramname, '1');
    	search_filter();
    });
    

	$(document).on('click','.search-pagination .page-pagin li a',function(e){
		e.preventDefault;
        var clickPage = $(this).data('page');
        paramname = 'cur_page';
        setGetParameter(paramname, clickPage);
        search_filter();
        return false;
    });

    $(window).load(function() {
    	var url_parameters = window.location.search;
	    if(url_parameters){
			$('.filter .filter-search').each(function() {			
				$(this).find('input').each(function () {
	    		var inputValue = $(this).attr('data-type');
	    		if(url_parameters.includes(inputValue)){
				    $(this).prop("checked", true);
				}
				});
			});			
	    }
    });

    //click on search button on search form on search page
	$(document).on('click','.page-search-submit',function(){
		//e.preventDefault;
		var searchValue = $('#ajaxsearchlite2 .probox .proinput .orig').val();
		var s_parameter = getUrlParameter('s');
		var currentUrl = decodeURIComponent(location.href);
		var newUrl = currentUrl.replace(s_parameter, searchValue);
		location.href = newUrl;
	});	


	//scroll to projects content if user from front page
	var projectCookie = Cookies.get('project-scroll');
	if(projectCookie){
		$('html, body').animate({
            scrollTop: $("#projects-content").offset().top-80
        }, 100);
		Cookies.remove('project-scroll');
	}


	//$("#phone").mask("+38(099) 999-99-99");
	// INPUTMASK
    $('.input-mask').inputmask({
        clearMaskOnLostFocus: false
    });


	$(document).on('click', '.checkout-button-block .checkout_submit', function() {
		$(this).parent().append('<img class="checkout-submit-loader" src="/wp-content/themes/floorbest/img/ajaxloader.gif" alt="">');
		setTimeout(function() {
			$(document).find('.checkout-submit-loader').remove();
        }, 2500);
    	
    });
   




});