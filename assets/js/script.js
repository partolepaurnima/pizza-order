$(function() {

	// variable declaration
	var mostPopular = '';
	var classic = '';
	var all = '';
	var cartObject = '';
	var popularDataArray = [];
	var classicDataArray = [];
	var allDataArray = [];

	//AJAX call to creation dynamic structure on index and our-menu page
	$.ajax({
		url: 'assets/js/pizzas.json',
		dataType: 'json',
		type: 'get',
		cache: 'false',
		success: function(data) {
			$(data.pizza).each(function(index, value) {
				if(value.category == 'Popular') {
					mostPopular = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(mostPopular).appendTo('#most-popular');
					popularDataArray.push(JSON.stringify(value));
					appendDataSelect(popularDataArray, '#most-popular');
				} else if(value.category == 'Classic') {
					// console.log(value);
					classic = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(classic).appendTo('#classic');
					classicDataArray.push(JSON.stringify(value));
					appendDataSelect(classicDataArray, '#classic');
				}
				if($('.our-menu-page').length > 0) {
					all = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart">add to cart</a></div></li>';
					$(all).appendTo('#pizza-menu');
					allDataArray.push(JSON.stringify(value));
					appendDataSelect(allDataArray, '#pizza-menu');
				}
			});
			// function to set data-select attribute in HTML
			function appendDataSelect(array, idSelector) {
				for(var i=0; i<=array.length; i++) {
					$(''+idSelector+' li:eq('+i+') .add-cart').attr('data-select', array[i]);
				}
			}
      // On click on individual add to cart
			$('.add-cart').click(function(e) {
				e.preventDefault();
				console.log(this);
				var attrData = JSON.parse($(this).attr('data-select'));
				console.log(attrData);
				$.ajax({
					url: 'php/order.php',
					dataType: 'json',
					type: 'post',
					data: attrData,
					cache: 'false',
					success: function(data) {
						console.log(data);
					}
				});
			});
		}
	});


});