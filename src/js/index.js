$(function () {
	// 获取数据
	$.ajax({
		url: '../data.json',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			$('.nav').html(template('nav_tpl',{data: data}));
			$('.content').html(template('content_tpl',{data: data}));
		}
	})

	// 处理楼层跳跃
	$('.nav').on('click', 'li a',function () {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		})
		return false;
	})

	// 处理导航栏卷曲到一定高度后固定的效果
	$(document).scroll(function(event) {
		var marginLeft = $('.nav').offset().left;
		if ($(document).scrollTop() >= $('.header').height()) {
			$('.nav').css({
				"position": "fixed",
				"top": 0,
				"left": marginLeft
			})
		}else if ($(document).scrollTop() < $('.header').height()) {
			$('.nav').css({
				"position": "absolute",
				"top": 0,
				"left": 0
			})
		}
		console.log($('.content_items h3').first().offset().top)
		if ($(document).scrollTop() >= $('.content_items h3').first().offset().top) {
			$('.back_to_top').show()
		}else {
			$('.back_to_top').hide()
		}
	});

	$('.nav').on('click', '.nav_item',function () {
		$(this).parent().siblings().children().removeClass('active')
		$(this).addClass('active')
	})

	// 处理返回顶部
	$('.back_to_top').click(function () {
		$('html, body').animate({
			scrollTop: 0
		})
		return false
	})
})