$(function() {
	var mostPopular = '';
	$.ajax({
		url: 'assets/js/pizzas.json',
		dataType: 'json',
		type: 'get',
		cache: 'false',
		success: function(data) {
			$(data.pizza).each(function(index, value) {
				if(value.category == 'Popular') {
					// console.log(value);
					mostPopular = '<li>' + value.name+ '</li>';
					$(mostPopular).appendTo('#most-popular');
				}
				// console.log(value.name);
			});
		}
	});
});