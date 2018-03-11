$(function() {

	// variable declaration
	var mostPopular = '';
	var classic = '';
	var all = '';
	var cartObject = '';
	var popularDataArray = [];
	var classicDataArray = [];
	var allDataArray = [];
  var sum = 0;

	//AJAX call to creation dynamic structure on index and our-menu page
	$.ajax({
		url: 'assets/js/pizzas.json',
		dataType: 'json',
		type: 'get',
		cache: false,
		success: function(data) {
			$(data.pizza).each(function(index, value) {
				var category = value.category.replace(/ /g,"-");
				category += ' ' + value.vegNonveg.replace(/ /g, "-");
				category = category.toLowerCase();
				if(value.category == 'Popular') {
					mostPopular = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html#pizza-order" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(mostPopular).appendTo('#most-popular');
					popularDataArray.push(JSON.stringify(value));
					appendDataSelect(popularDataArray, '#most-popular');
				} else if(value.category == 'Classic') {
					classic = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html#pizza-order" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(classic).appendTo('#classic-list');
					classicDataArray.push(JSON.stringify(value));
					appendDataSelect(classicDataArray, '#classic-list');
				}
				if($('.our-menu-page').length > 0) {
					all = '<li class="'+category+' visible all"><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html#pizza-order" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(all).appendTo('#pizza-menu');
					allDataArray.push(JSON.stringify(value));
					appendDataSelect(allDataArray, '#pizza-menu');
				}
			});


      // On click on individual add to cart
			$('.add-cart').click(function(e) {
				// e.preventDefault();
				var attrData = JSON.parse($(this).attr('data-select'));
				$.ajax({
					url: 'php/order.php',
					dataType: 'json',
					type: 'post',
					data: attrData,
					cache: false,
					success: function(data) {
						console.log(data);
					}
				});
			});
		}
	});



	// AJAX call to create dynamic structure on checkout page
	if($('.checkout').length > 0) {
		$.ajax({
			url: 'php/order.json',
			dataType: 'json',
			type: 'get',
			cache: false,
			success: function(data) {
				console.log(data);
				allDataArray = [];
				var total = [];
		
				$(data.pizza).each(function(index, value) {
					if($('.checkout').length > 0) {						
						total.push(value.price.amount); 
						all = '<li><img src='+value.image+' alt='+value.name+'><h3>'+value.name+'</h3><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span></div><span class="label">Quantity: </span><span class="label-value">1</span></li>';
						$(all).appendTo('#pizza-order');
						// allDataArray.push(JSON.stringify(value));
						// appendDataSelect(allDataArray, '#pizza-order');
						$('.empty').addClass('hidden');
						$('.grand-total').addClass('visible');
					}
				});	
				for( i=0; i<total.length;i++) {
					sum = Number(total[i]) + Number(sum); 
				}
				///discount
				if(sum > 500) {
					$('#total').text(sum+ ' INR');
					discount = (sum*10)/100;
					sum = sum - discount;
					$('#discount').text(sum+ ' INR');
					$('#total').addClass('strikeout');
				}
				else {
					$('#total').text(sum+ ' INR');
				}
				
				$('.confirm').addClass('visible');
				$('.confirm').click(function() {
					$('.order-delivery').addClass('visible');

					$.ajax({
						url: 'php/order-remove.php',
						type: 'delete',
						cache: false,
						success: function() {
							console.log('done');
							$('.order-delivery, body').click(function(){
							$('.order-delivery').removeClass('visible');
								window.location.replace('index.html');
							});
							
						}
					});

				});
			}
		});
	}


	// function to set data-select attribute in HTML
	function appendDataSelect(array, idSelector) {
		for(var i=0; i<=array.length; i++) {
			$(''+idSelector+' li:eq('+i+') .add-cart').attr('data-select', array[i]);
		}
	}

	$('#search').click(function() {
		$('#search-form').toggleClass('visible');
	});

	// flexslider
	$('.flexslider').flexslider({
    animation: "slide"
  });

  // back to top
  $(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.back-top').fadeIn();
		} else {
			$('.back-top').fadeOut();
		}
	});

	$('.back-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


	// filter list
	$('#sort-list li').click(function(e) {
		$('#sort-list li').removeClass('active-filter');
		e.preventDefault();
		id = $(this).attr('id');
		$(this).addClass('active-filter');
		$('#pizza-menu li').removeClass('visible');
		$('#pizza-menu li').each(function() {
			if($(this).hasClass(id)) {
				$(this).addClass('visible');
			}
		});
	});

	//Hamburger
	$('.hamburger').click(function() {
		$('.hamburger').toggleClass('close');
		$('nav').toggleClass('expanded');
	});	

});