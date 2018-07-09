/* default */
window.addEventListener('load', function(){

	if(document.querySelector('.home h1')){
		document.querySelector('.home h1').classList.add('show')
	}

	setTimeout(function(){
		if(document.querySelector('.header')){
			document.querySelector('.header').classList.add('hide')
		}
	}, 2000)

	var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

	if(ww < 768){
		document.querySelector('.wrapper').classList.add('warning')
		document.querySelector('.wrapper.warning').addEventListener('click', function(){
			this.classList.remove('warning')
		})
	}

})


/* home */
// if(window.jQuery){
// 	$(function() {
// 		$('#fullpage').fullpage({
// 			scrollOverflow: true,
// 			navigation: true,
// 			navigationPosition: 'right'
// 		});
// 	});
// }

/* audio */
var audios = document.querySelectorAll('audio')
for(var a in audios){
	if(audios[a].style){
		audios[a].addEventListener('timeupdate', function(){

			var time = Math.floor(this.currentTime)

			var seconds = time % 60;
			var minutes = Math.floor(time / 60);

			document.querySelector('[name="'+this.getAttribute('name')+'-player"] .playtime').innerHTML = ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
			document.querySelector('[name="'+this.getAttribute('name')+'-player"] .progress').style.width = 100 / this.duration * this.currentTime + '%'
		})
	}
}
var audioplayers = document.querySelectorAll('.audioplayer')
for(var a in audioplayers){
	if(audioplayers[a].style){
		audioplayers[a].addEventListener('click', function(){
			var audio = document.querySelector('audio[name='+this.dataset.target+']')
			if(audio.paused){
				audio.play()
				this.querySelector('.playbutton').classList.add('hide')
			} else {
				audio.pause()
				this.querySelector('.playbutton').classList.remove('hide')
			}
		})
	}
}
/* photoloop */
var loops = document.querySelectorAll('.photoloop')
for(var p in loops){
	if(loops[p].style){
		create_loop(loops[p])
	}
}
function create_loop(loop){
	var timer, count = loop.nextElementSibling;

	loop.dataset.playing = 'false'
	loop.dataset.total = loop.querySelectorAll('img').length
	loop.dataset.current = 0

	count.innerHTML = (parseInt(loop.dataset.current) + 1) + '/' + loop.dataset.total

	loop.addEventListener('click', function(){
		if(loop.dataset.playing == 'false'){
			loop.dataset.playing = 'true'
			timer = setInterval(function(){
				loop.querySelectorAll('img')[loop.dataset.current].classList.remove('show')
				if(loop.dataset.current < parseInt(loop.dataset.total) - 1){
					loop.dataset.current = parseInt(loop.dataset.current) + 1
				} else {
					loop.dataset.current = 0
				}
				count.innerHTML = (parseInt(loop.dataset.current) + 1) + '/' + loop.dataset.total
				loop.querySelectorAll('img')[loop.dataset.current].classList.add('show')
			}, 3000)
			loop.querySelector('.playbutton').classList.add('hide')
		} else {
			// loop.dataset.playing = 'false'
			// clearInterval(timer)
			// loop.querySelector('.playbutton').classList.remove('hide')

			loop.querySelectorAll('img')[loop.dataset.current].classList.remove('show')
			if(loop.dataset.current < parseInt(loop.dataset.total) - 1){
				loop.dataset.current = parseInt(loop.dataset.current) + 1
			} else {
				loop.dataset.current = 0
			}
			loop.querySelectorAll('img')[loop.dataset.current].classList.add('show')
			count.innerHTML = (parseInt(loop.dataset.current) + 1) + '/' + loop.dataset.total
		}
	})
}

/* hash */
if (location.hash) {
    setTimeout(function(){
        jump()
    }, 250)
}

window.addEventListener('hashchange', function() {
    jump()
});

function jump(){

	if(document.querySelector('.header')){
		document.querySelector('.header').classList.add('hide')
	}

    var hash = location.hash.slice(1),
        target = '[name="'+hash+'"]';

    if(document.querySelector(target) === null) {
        return
    }

    var top = document.querySelector(target).getBoundingClientRect().top;

    setTimeout(function(){
        scroll(document.querySelector('html'), top, 500)

		var popups = document.querySelectorAll('.popup')
		for(var p in popups){
			if(popups[p].style != undefined){ popups[p].classList.remove('open') }
		}
		document.querySelector(target).classList.add('open')
    }, 100);
}

/* event listeners */
document.body.addEventListener('keyup', function(e){
	if(e.keyCode === 27){
		var popups = document.querySelectorAll('.popup')
		for(var p in popups){
			if(popups[p].style != undefined){ popups[p].classList.remove('open') }
		}
	}
})
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
		document.querySelector('[name='+target+']').classList.add('open')

		var top = document.querySelector('[name='+target+']').getBoundingClientRect().top;
		scroll(document.querySelector('html'), top, 500)
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
window.addEventListener('scroll', scrolling)

function scrolling(){
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
				}/* else {
					scrolls[s].classList.add('no')
				}*/
			}
			if(scrolls[s].dataset.scroll == 'phonepiece'){
				if(scrolls[s].getBoundingClientRect().top < c) {
					scrolls[s].classList.add('move')
				} else {
					scrolls[s].classList.remove('move')
				}
			}
			if(scrolls[s].dataset.scroll == 'hash'){
				if(scrolls[s].getBoundingClientRect().top < c && scrolls[s].getBoundingClientRect().top > 0 - c) {
					var toc_items = document.querySelectorAll('.toc li')

					for(var i in toc_items){
						if(toc_items[i].style != undefined){
							toc_items[i].classList.remove('active')
						}
					}

					document.querySelector('.toc li[data-target="'+scrolls[s].dataset.hash+'"]').classList.add('active')
					if(scrolls[s].dataset.hash != 'introduction'){
						document.querySelector('.toc').classList.add('show')
						document.querySelector('.home .nav').classList.add('show')
					}
				}
			}
			if(scrolls[s].dataset.scroll == 'video'){
				if(scrolls[s].getBoundingClientRect().top < c && scrolls[s].getBoundingClientRect().top > 0 - c) {
					var promise = scrolls[s].play();
					if (promise !== undefined) {
					  promise.then(_ => {

					  }).catch(error => {

					  });
					}
				} else {
					scrolls[s].pause()
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
}

scrolling()

/* gallery */
setTimeout(function(){
	var galleries = document.querySelectorAll('.gallery-wrapper')
	for(var g in galleries){

		if(galleries[g].style != undefined){

			galleries[g].addEventListener('click', function(){
				if(this.querySelector('.gallery-caption').classList.contains('show')) {
					this.querySelector('.gallery-caption').classList.remove('show')
				} else {
					this.querySelector('.gallery-caption').classList.add('show')
				}
			})

			var imgs = galleries[g].querySelectorAll('img'), _w = 0;
			for(var i in imgs){
				if(imgs[i].style != undefined){
					_w += Math.ceil(imgs[i].offsetWidth) + 1
					imgs[i].style.top = (-15 + Math.floor(Math.random() * 30)) + 'px'
				}
			}
			galleries[g].querySelector('.gallery').style.width = _w + 'px'
		}
	}
}, 2500)

var skips = document.querySelectorAll('[data-skip]')
for(var s in skips){
	if(skips[s].style != undefined){
		skips[s].addEventListener('click', function(){
			console.log(this.previousElementSibling)
			this.previousElementSibling.scrollLeft += this.previousElementSibling.offsetWidth * 0.5;
		})
	}
}

/* scroll */
function scroll(element, to, duration) {
    var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        change = to,
        increment = 20;

    var animateScroll = function(elapsedTime) {
        elapsedTime += increment;
        var position = easeInOut(elapsedTime, start, change, duration);
        element.scrollTop = position;
        if (elapsedTime < duration) {
            setTimeout(function() {
                animateScroll(elapsedTime);
            }, increment);
        }
    };

    animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

/* video background */
var timeoutId, video_aspect = 1440 / 800;

function video_background() {
	var window_aspect = window.innerWidth / window.innerHeight,
		videos = document.querySelectorAll('.home video');

	for(var v in videos){
		if(videos[v].style != undefined){
			if(videos[v].dataset.video == 'background'){

			} else {
				// videos[v].style.width = (video_aspect / window_aspect) * 102 + '%';
				// videos[v].style.height = (video_aspect / window_aspect) * 102 + '%';
			}

		}
	}
}

window.addEventListener('resize', function() {
	video_background()
});

video_background()
