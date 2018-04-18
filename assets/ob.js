/* home */
$(function() {
	$('#fullpage').fullpage({
		scrollOverflow: true,
		navigation: true,
		navigationPosition: 'right'
	});
});

/* event listeners */
document.body.addEventListener('mouseover', function(e) {
	if(e.target.classList.contains('fondle')) {
		document.querySelector('#'+e.target.dataset.link).classList.add('not-so-shy-anymore')
	}
});
document.body.addEventListener('mouseout', function(e) {
	if(e.target.classList.contains('fondle')) {
		document.querySelector('#'+e.target.dataset.link).classList.remove('not-so-shy-anymore')
	}
});
document.body.addEventListener('click', function(e){
	if(e.target.classList.contains('sis-toggle')) {
		if(e.target.parentNode.parentNode.classList.contains('toggled')){
			e.target.parentNode.parentNode.classList.remove('toggled')
			document.body.style.overflow = 'auto'
		} else {
			e.target.parentNode.parentNode.classList.add('toggled')
			document.body.style.overflow = 'hidden'
		}
	}
	if(e.target.classList.contains('popup-button') || e.target.parentNode.classList.contains('popup-button')) {

		var target, popups = document.querySelectorAll('.popup')

		for(var p in popups){
			if(popups[p].style != undefined){ popups[p].classList.remove('open') }
		}

		if(e.target.parentNode.classList.contains('popup-button')){
			target = e.target.parentNode.dataset.target
		} else {
			target = e.target.dataset.target
		}
		document.getElementById(target).classList.add('open')
	}
	if(e.target.classList.contains('close-button')) {
		e.target.parentNode.classList.remove('open')
	}
})

/* scroll animations */
var scrolls = document.querySelectorAll('[data-scroll]')
for(var s in scrolls){
	if(scrolls[s].style != undefined){ scrolls[s].classList.add('no') }
}
/*window.addEventListener('mouseover', function(ev){
	if(ev.target.classList.contains('with-scroll')){
		ev.target.focus()
	}
})*/
window.addEventListener('scroll', function(){
	var st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
		wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		c = wh / 2;

	for(var s in scrolls){
		if(scrolls[s].style != undefined){
			if(scrolls[s].dataset.scroll == 'soft'){
				if(scrolls[s].getBoundingClientRect().top < c + 150) {
					scrolls[s].classList.remove('no')
				} else {
					scrolls[s].classList.add('no')
				}
			} else {
				if(scrolls[s].getBoundingClientRect().top < c) {
					scrolls[s].classList.remove('no')
				} else {
					scrolls[s].classList.add('no')
				}
			}
			if(scrolls[s].dataset.scroll == 'intro'){
				if(scrolls[s].getBoundingClientRect().top < c + 400 && scrolls[s].dataset.opened == 'false') {
					scrolls[s].classList.add('open')
					scrolls[s].dataset.opened = 'true'
				} else {

				}
			}
		}
	}
})

/* gallery */
setTimeout(function(){
	var galleries = document.querySelectorAll('.gallery')
	for(var g in galleries){
		if(galleries[g].style != undefined){
			var imgs = galleries[g].querySelectorAll('img'), _w = 0;
			for(var i in imgs){
				if(imgs[i].style != undefined){
					_w += imgs[i].offsetWidth
					imgs[i].style.left = (-15 + Math.floor(Math.random() * 30)) + 'px'
					imgs[i].style.top = (-15 + Math.floor(Math.random() * 30)) + 'px'
				}
			}
			galleries[g].style.width = _w + 'px'
		}
	}
}, 5000)

/* video background */
var timeoutId, video_aspect = 1440 / 800;

function video_background() {
	var window_aspect = window.innerWidth / window.innerHeight,
		videos = document.querySelectorAll('.home video');

	for(var v in videos){
		if(videos[v].style != undefined){
			if (window_aspect > video_aspect) {
				videos[v].style.width = (window_aspect / video_aspect) * 102 + '%';
				videos[v].style.height = (window_aspect / video_aspect) * 102 + '%';
			} else {
				videos[v].style.width = 'auto'
				videos[v].style.height = 100 + '%'
			}
		}
	}
}

window.addEventListener('resize', function() {
	video_background()
});

video_background()

/* coloring prototype */
/*var units = document.querySelectorAll('.sis-unit'), unit_width = 0;
for(var u in units){
	if(units[u].style != undefined){ unit_width += units[u].offsetWidth }
}
document.querySelector('.sis-body').style.width = unit_width + 'px'

setTimeout(function(){
	document.querySelector('.sis-body-wrapper').scrollLeft = 0
}, 1500)*/
