$(function() {

	// variable declaration
	var mostPopular = '';
	var classic = '';
	var all = '';

	//AJAX call to creation dynamic structure on index and our-menu page
	$.ajax({
		url: 'assets/js/pizzas.json',
		dataType: 'json',
		type: 'get',
		cache: 'false',
		success: function(data) {
			$(data.pizza).each(function(index, value) {
				if(value.category == 'Popular') {
					// console.log(value);
					mostPopular = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart" data-select="'+JSON.stringify(value)+'">add to cart</a></div></li>';
					$(mostPopular).appendTo('#most-popular');
				} else if(value.category == 'Classic') {
					// console.log(value);
					classic = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart" data-select="'+JSON.stringify(value)+'">add to cart</a></div></li>';
					$(classic).appendTo('#classic');
				}
				console.log(value);
				all = '<li><img src='+value.image+' alt='+value.name+'><span class="category">'+value.category+'</span><h3>'+value.name+'</h3><span class="ingredients">'+value.ingredients+'</span><div><span class="label">size: </span><span class="label-value">'+value.size+'</span></div><div class="cart-overlay"><span class="label">price: </span><span class="label-value">'+value.price.amount+ ' ' +value.price.currency+'</span><a href="checkout.html" title="Add to Cart" class="add-cart" data-select="'+JSON.stringify(value)+'">add to cart</a></div></li>';
				$(all).appendTo('#pizza-menu');
			});
			$('.add-cart').click(function() {
				alert("hello");
			});
		}
	});


});