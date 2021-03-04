$(document).on('focusout', '#ecrlow, #ecrhigh', function(event){
	event.preventDefault();
	
	//alert('test');
	
	if ($('#ecrlow').val() && $('#ecrhigh').val()) {
		//alert('test');
		$('#tutorial').remove();
	}
	
	healthy();
	
});

//Reset event for calculator
$(document).on('click', '#reset', function(event){
	//alert('reset');
	event.preventDefault();
	var r = confirm("Are you sure you want to reset the calculator?");
	if (r == true) {
		$('#calculator').find('tbody').empty();
		
		$('#results').removeClass();
		$('#results').addClass('unhealthy');
		
		$('#results td').first().next().text('0');
		$('#results td').first().next().next().text('0');
		$('#results td').first().next().next().removeClass();
		$('#results td').first().next().next().addClass('over');
		$('#results td').first().next().next().next().text('0');
		$('#results td').first().next().next().next().next().text('0');
		
		$('#results td').first().next().next().next().next().next().text('∞');
		$('#results td').first().next().next().next().next().next().next().text('∞');
		$('#results td').first().next().next().next().next().next().next().next().text('∞');
		$('#results td').first().next().next().next().next().next().next().next().next().text('∞');
		
		$('#results td').first().next().next().next().next().next().removeClass().addClass('over');
		$('#results td').first().next().next().next().next().next().next().removeClass().addClass('over');
		$('#results td').first().next().next().next().next().next().next().next().removeClass().addClass('over');
		$('#results td').first().next().next().next().next().next().next().next().next().removeClass().addClass('over');
	}
});

//Click event for the plus icon
$(document).on('click', '#add', function(event){
	event.preventDefault();
	
	var low = $('#ecrlow').val();
	var high = $('#ecrhigh').val();
	
	low = parseFloat(low);
	high = parseFloat(high);
	
	if(!low || !high ) {
		alert('Please enter two numbers for your caloric range, low and high.');
		return;
	}
	
	if(low > high ) {
		alert('Please enter the lower number on the left and the higher on the right.');
		return;
	}
	
	var F = $('#results td').first().next().next().next().next().next().text();
	var P = $('#results td').first().next().next().next().next().next().next().text();
	var W = $('#results td').first().next().next().next().next().next().next().next().text();
	var E = $('#results td').first().next().next().next().next().next().next().next().next().text();
	
	var q = "n";
	
	//alert('F is'+F);
	//alert('P is'+P);
	
	/*if(F>50 || F=='∞') {
		q = "f";		
	} else if(P>30 || F=='∞') {
		q = "p";
	} else if(E>1) {
		q = "e";
	}*/
	
	//alert(q);
	
	$.ajax({
	  url: "handlers/add"+q+".php",
	  cache: false
	})
	  .done(function(html) {
		$("#calculator tbody").append(html);
	  });
	
});

//Click event for delete button and handlers
$(document).on('click', 'a.delete', function(event){
	event.preventDefault();
  
	/*if($('#updateevent').html()) {
		alert('Please wait until updating before removing resource.');
		return;
	}*/
	
	var r = confirm("Are you sure you want to delete this resource?");
	if (r == true) {
		$(this).closest('tr').remove();
	}
	agg();
	express($('#results td').first().next());
	healthy();
});

$(document).on('click', 'a.mod', function(event){
	event.preventDefault();
	var c = $(this).closest("td").next().find("select").val();
	if (c == "choose") {
		alert("Please choose a resource.");
		
		return;
	}
	
	/*if(!$('#updating').text()) {
		$('#updating').html('<a id="updateevent" href="#"><img src="images/update.png" /></a>');
	}*/
	
	$(this).closest("td").html('<input class="modinput" type="text" value="" maxlength="6" />');
});


$(document).on('click', '#updateevent', function(event){
	event.preventDefault();
	$('#calculator .u').each(function() {
			
		var data = $(this).html();
		var str = 'input';	
		
		var value = parseFloat($(this).find('input').val());
		
		//alert(data);
		
		if(data.indexOf(str) == 1 && !isNaN(value) && value > 0) {
			
			var factor = parseFloat($(this).find('input').val());
			var cell, dec;
			
			cell = parseFloat($(this).next().next().text());
			dec = factor*cell;
			$(this).next().next().text(dec.toFixed(2));
			
			cell = parseFloat($(this).next().next().next().text());
			dec = factor*cell;
			$(this).next().next().next().text(dec.toFixed(2));
			
			cell = parseFloat($(this).next().next().next().next().text());
			dec = factor*cell;
			$(this).next().next().next().next().text(dec.toFixed(2));
			
			cell = parseFloat($(this).next().next().next().next().next().text());
			dec = factor*cell;
			$(this).next().next().next().next().next().text(dec.toFixed(2));
			
		} else {
			
		}
		
		$(this).empty();
		$(this).html('<a class="mod" href="#"><img src="images/scaleicon.png" /></a>');
		
		//$('#updateevent img').remove();
		agg();
		//Build an expression
		express($('#results td').first().next());
		healthy();
	});	
});

$(document).on('change', '.resources', function(event){
	event.preventDefault();
	//Get the value of the select
	var c = $(this).val();
	
	//If it's becoming default, do the following
	if(c == 'choose') {
	
		//turn everything in the row off and remove colors
		$(this).closest('td').next().empty();
		$(this).closest('td').next().next().empty();
		$(this).closest('td').next().next().next().empty();
		$(this).closest('td').next().next().next().next().empty();
		$(this).closest('td').next().next().next().next().next().empty();
		$(this).closest('td').next().next().next().next().next().next().empty();
		$(this).closest('td').next().next().next().next().next().next().next().empty();
		$(this).closest('td').next().next().next().next().next().next().next().next().empty();
			
		$(this).closest('td').next().next().next().next().next().removeClass();
		$(this).closest('td').next().next().next().next().next().next().removeClass();
		$(this).closest('td').next().next().next().next().next().next().next().removeClass();
		$(this).closest('td').next().next().next().next().next().next().next().next().removeClass();
		
		//Aggregate the matrix
		agg();
		
		//Build an expression
		express($('#results td').first().next());
		
		healthy();

		return;
	}
	
	//Closure
	var that = this;

	//Fetch the four components from the database via a handler
	$.ajax({url: "handlers/components.php?q=" + c + "", success: function(results){
		
		//Break it into an array
		var components = results.split(",");
		
		//Create components as mathematical variables
		var m = parseFloat(components[0]);
		var c = parseFloat(components[1]);
		var f = parseFloat(components[2]);
		var p = parseFloat(components[3]);
		
		//Limit to 2 decimals
		m = m.toFixed(2);
		c = c.toFixed(2);
		f = f.toFixed(2);
		p = p.toFixed(2);
	
		//Place the components inside their corresponding table cells
		$(that).closest('td').next().text(m);
		$(that).closest('td').next().next().text(c);
		$(that).closest('td').next().next().next().text(f);
		$(that).closest('td').next().next().next().next().text(p);
		
		$(that).closest('td').next().next().next().next().next().html();
		$(that).closest('td').next().next().next().next().next().next().html();
		$(that).closest('td').next().next().next().next().next().next().next().html();
		$(that).closest('td').next().next().next().next().next().next().next().next().html();
		
		//Aggregate the matrix
		//
		
		//Build an expression
		express($(that).closest('td').next());
		agg();
		//Build an expression
		express($('#results td').first().next());
		
		healthy();
	}});
});	


function agg () {
//alert('agg');
	//Reset the composite
	$('#results td').first().next().text('0');
	$('#results td').first().next().next().text('0');
	$('#results td').first().next().next().next().text('0');
	$('#results td').first().next().next().next().next().text('0');
	
	$('#results td').first().next().next().next().next().next().text('0');
	$('#results td').first().next().next().next().next().next().next().text('0');
	$('#results td').first().next().next().next().next().next().next().next().text('0');
	$('#results td').first().next().next().next().next().next().next().next().next().text('0');
				
	
	//Traverses column 1 downward and aggregates into the composite
	$('td.c1').each(function() {
		if($(this).text()) {
			
			var num, ans;
							
			num = parseFloat($('#results td').first().next().text());
		
			ans = parseFloat($(this).text())+num;
			
			$('#results td').first().next().text(ans.toFixed(2));
			//
		}
	});
	
	//Traverses column 2 downward and aggregates into the composite
	$('td.c2').each(function() {

		if($(this).text()) {
			
			var num, ans;
							
			num = parseFloat($('#results td').first().next().next().text());
		
			ans = parseFloat($(this).text())+num;
			
			$('#results td').first().next().next().text(ans.toFixed(2));
		} 
	});
	
	//Traverses column 3 downward and aggregates into the composite
	$('td.c3').each(function() {

		if($(this).text()) {
			
			var num, ans;
							
			num = parseFloat($('#results td').first().next().next().next().text());
		
			ans = parseFloat($(this).text())+num;

			$('#results td').first().next().next().next().text(ans.toFixed(2));
		} 
		
	});
	
	//Traverses column 4 downward and aggregates into the composite
	$('td.c4').each(function() {
					
		if($(this).text()) {
						
			var num, ans;
										
			num = parseFloat($('#results td').first().next().next().next().next().text());
					
			ans = parseFloat($(this).text())+num;

			$('#results td').first().next().next().next().next().text(ans.toFixed(2));
		} 			
	});			
}



function express (obj) {
	//alert('express');
	//Create components as mathematical variables
	var m = parseFloat($(obj).text());
	var c = parseFloat($(obj).next().text());
	var f = parseFloat($(obj).next().next().text());
	var p = parseFloat($(obj).next().next().next().text());
	
	//Limit to 2 decimals
	m.toFixed(2);
	c.toFixed(2);
	f.toFixed(2);
	p.toFixed(2);
	
	//The Wellness System
	var F = (c/f);
	var P = (c/p);
	var W = (F+P);
	var E = (c/m);
	
	//Prevents unwanted NaN
	if(isNaN(F) && isNaN(P) && isNaN(W)) {
		F = Infinity;
		P = Infinity;
		W = Infinity;
	}
	
	//Prevents unwanted NaN
	if(isNaN(E)) {
		E = Infinity;
	}

	//F
	if(!isFinite(F)) {
		$(obj).next().next().next().next().html('&infin;');
	} else {
		$(obj).next().next().next().next().html(F.toFixed(2));
	}
	
	$(obj).next().next().next().next().removeClass();
	if(F > 50) {
		$(obj).next().next().next().next().addClass("over");
	} else {
		$(obj).next().next().next().next().addClass("under");
	}
	
	//P
	if(!isFinite(P)) {
		$(obj).next().next().next().next().next().html('&infin;');
	} else {
		$(obj).next().next().next().next().next().html(P.toFixed(2));
	}

	$(obj).next().next().next().next().next().removeClass();
	if(P > 30) {
		$(obj).next().next().next().next().next().addClass("over");
	} else {
		$(obj).next().next().next().next().next().addClass("under");
	}
	
	//W
	if(!isFinite(W)) {
		$(obj).next().next().next().next().next().next().html('&infin;');
	} else {
		$(obj).next().next().next().next().next().next().html(W.toFixed(2));
	}
	
	$(obj).next().next().next().next().next().next().removeClass();
	if(W > 80) {
		$(obj).next().next().next().next().next().next().addClass("over");
	} else {
		$(obj).next().next().next().next().next().next().addClass("under");
	}
	
	//E
	if(!isFinite(E)) {
		$(obj).next().next().next().next().next().next().next().html('&infin;');
	} else {
		$(obj).next().next().next().next().next().next().next().html(E.toFixed(2));
	}
	
	$(obj).next().next().next().next().next().next().next().removeClass();
	if(E > 1) {
		$(obj).next().next().next().next().next().next().next().addClass("over");
	} else {
		$(obj).next().next().next().next().next().next().next().addClass("under");
	}	
}

function healthy ()	{
	//alert('healthy');
	var ans = parseFloat($('#range').text());
	var lin = parseFloat($('#ecrlow').val());
	var lia = parseFloat($('#ecrhigh').val());
	
	if ((lia > ans) && (ans > lin)) {
		$('#range').removeClass();
		$('#range').addClass('under');
	}   else {
			$('#range').removeClass();
			$('#range').addClass('over');
		}
	
	var healthy = $('#range').hasClass('under');
	
	var w = parseFloat($('#range').next().next().next().next().next().text()); //< 80
	var e = parseFloat($('#range').next().next().next().next().next().next().text()); //< 1
	
	if(healthy && (w < 80) && (e < 1)) {
		$('#results').removeClass();
		$('#results').addClass('healthy');
	} else {
		$('#results').removeClass();
		$('#results').addClass('unhealthy');
	}
	
}

$(window).bind('beforeunload', function(){
  return 'Leave?';
});