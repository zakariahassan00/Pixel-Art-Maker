$(function() {
	// declaring some variables
	 const submit = $('#submit') ;
	 const form = $('#sizePicker') ;
	 const table = $('table') ;
	 let brush = 'true' ;
	 let mouseDown = 'false' ;
	 let eraser = 'false' ;


	// when user submit the height the width create the Grid
	form.submit(function(event) {
		
		makeGrid() ;

		// animation effect on showing the grid
		table.show(1000);
		$("#instructions").slideDown(700);
		
		// disable the submit button after submiting .
		submit.attr('disabled', 'disabled') ;
		event.preventDefault();
	});

	// enable submit button on focusing on input fields .
	$('input').focus(function(){
		submit.removeAttr('disabled') ;
	});

	// brush for fast coloring .
	$('#brush').click(function() {
		eraser = 'false' ;
		brush = 'true' ;
		table.removeAttr('class' , 'eraser');
		table.attr('class' , 'brush') ;		
	});

	// fast eraser .
	$('#eraser').click(function() {
		brush = 'false' ;
		eraser = 'true' ;
		table.removeAttr('class' , 'brush');
		table.attr('class' , 'eraser') ;
	});

	// fill the table .
	$('#fill').click(function() {
		let fillColor = $('#colorPicker').val() ;
		$("td").css('background-color', fillColor) ;
	});



	// hover action 
	table.on('mouseover' , 'td' ,function(event) {
		let color = $('#colorPicker').val() ;	
		let orginal = $(event.target).css('background-color', );
		
		// hover action when brush is active 
		if (mouseDown === 'false' && brush === 'true') {
			// change the color of a cell 
			$(event.target).css('background-color', color);

			// now apply the original color
			table.on('mouseout' , 'td' ,function(event) {
				$(event.target).css('background-color', orginal) ;
			});
		}

		// hover action when eraser is active 		
		if (mouseDown === 'false' && eraser === 'true') {
			// change the color of a cell 
			$(event.target).css('background-color', 'beige');

			// now apply the original color
			table.on('mouseout' , 'td' ,function(event) {
				$(event.target).css('background-color', orginal) ;
			});
		}



		// brush action
		// if the brush was clicked enable fast drawing (brush)
		if (brush === 'true') {

			// on the mousedown color the cells	with preventing default browser action "DRAG and DROP"
			table.on('mousedown' , 'td' ,function(event) {
				mouseDown = 'true' ;
				event.preventDefault() ;
				$(event.target).css('background-color', color);
			
			// keep the color after leaving the cell	
			table.on('mouseout' , 'td' ,function(event) {
					$(event.target).css('background-color', color) ;


					event.preventDefault() ;
				});
			});
		}

		// erasing action .
		// if the eraser was clicked enable fast erasing .
		if (eraser === 'true') {	
			//on mousedown erase the cell .
			table.on('mousedown' , 'td' ,function(event) {
				mouseDown = 'true' ;
				event.preventDefault() ;
				$(event.target).css('background-color', 'beige');

				// on mouseup stop erasing 
				table.on('mouseout' , 'td' ,function(event) {
					$(event.target).css('background-color', 'beige') ;

					event.preventDefault() ;
				});
			});

		}

		// mouseup mean thay mousedown is inActive so mousedown is false .	
		table.on('mouseup' , 'td' ,function(event) {
			event.preventDefault() ;
			mouseDown = 'false' ;
		});	

		// to avoid bugs
		table.on('mouseleave' ,function(event) {
			mouseDown = 'false' ;
		});	

		$('td').contextmenu(function() {
			return false;
		  });
					
	});	




	// when user clicks on reset button create a new Grid
	$('#reset').click(function(){
	
		reset();
		makeGrid();
		$("table").show(1000);
});


// ******** functions declaration ********
// function for reset
function reset () {
	table.empty() ;
}

// function for making the Grid.
function makeGrid() {
	// hide the Grid by defult to show it in an animation style
	table.hide();
	table.empty();

	const width = $('#input_width').val() ;
	const height = $('#input_height').val() ;

	// no create the Grid !!
	// create the rows first (height).
	for(var i = 0; i < height; i++) {
		table.append('<tr class="rows"></tr>') ;
	}
	// then we create the columns(width).
	for(var i = 0; i < width; i++) {
		$('.rows').append('<td class="col"></td>') ;
	}
}
});