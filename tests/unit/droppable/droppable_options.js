/*
 * droppable_options.js
 */
(function($) {

module( "droppable: options" );

/*
test( "{ accept '*' }, default ", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "{ accept: Selector }", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "{ accept: function(draggable) }", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "activeClass", function() {
	ok(false, 'missing test - untested code is broken code');
});
*/
test( "{ addClasses: true }, default", function() {
	expect( 1 );
	var el = $( "<div />" ).droppable({ addClasses: true });
	ok( el.is( ".ui-droppable" ), "'ui-droppable' class added" );
	el.droppable( "destroy" );
});

test( "{ addClasses: false }", function() {
	expect( 1 );
	var el = $( "<div />" ).droppable({ addClasses: false });
	ok( !el.is( ".ui-droppable" ), "'ui-droppable' class not added" );
	el.droppable( "destroy" );
});

test( "scope", function() {
	expect( 4 );
	var droppableOffset, draggableOffset, oldDraggableOffset, dx, dy,
		draggable1 = $( "<div />" ).appendTo( "#qunit-fixture" ).draggable({ revert: "invalid" }),
		draggable2 = $( "<div />" ).appendTo( "#qunit-fixture" ).droppable(),
		droppable = $( "<div />" ).appendTo( "#qunit-fixture" ).droppable(),
		newScope = "test";

	draggable1.draggable( "option", "scope", newScope );
	droppable.droppable( "option", "scope", newScope );

	// Test that droppable accepts draggable with new scope.
	droppableOffset = droppable.offset();
	draggableOffset = draggable1.offset();
	dx = droppableOffset.left - draggableOffset.left;
	dy = droppableOffset.top - draggableOffset.top;

	draggable1.simulate( "drag", {
		dx: dx,
		dy: dy
	});

	draggableOffset = draggable1.offset();
	equal( draggableOffset.left, droppableOffset.left );
	equal( draggableOffset.top, droppableOffset.top );

	// Test that droppable doesn't accept draggable with old scope.
	draggableOffset = draggable2.offset();
	dx = droppableOffset.left - draggableOffset.left;
	dy = droppableOffset.top - draggableOffset.top;
	oldDraggableOffset = draggableOffset;

	draggable2.simulate( "drag", {
		dx: dx,
		dy: dy
	});

	draggableOffset = draggable2.offset();
	equal( draggableOffset.left, oldDraggableOffset.left );
	equal( draggableOffset.top, oldDraggableOffset.top );
});
/*
test( "greedy", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "hoverClass", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "tolerance, fit", function() {
	ok(false, 'missing test - untested code is broken code');
});

test( "tolerance, intersect", function() {
	ok(false, 'missing test - untested code is broken code');
});
*/

test( "tolerance, pointer", function() {
	expect( 3 );

	var draggable, droppable,
		dataset = [
			[ -1, -1, false, "too far up and left" ],
			[ -1, 0, false, "too far left" ],
			[ 0, -1, false, "too far up" ],
			[ 0, 0, true, "top left corner" ],
			[ 9, 9, true, "bottom right corner" ],
			[ 10, 9, false, "too far right" ],
			[ 9, 10, false, "too far down" ],
			[ 10, 10, false, "too far down and right" ]
		];

	draggable = $( "<div />" )
		.appendTo( "#qunit-fixture" )
		.css({ width: 10, height: 10, position: "absolute" })
		.draggable();

	droppable = $( "<div />" )
		.appendTo( "#qunit-fixture" )
		.css({ width: 10, height: 10, position: "absolute", top: 5, left: 5 })
		.droppable({ tolerance: "pointer" });

	$.each( dataset, function() {
		var data = this;

		droppable.unbind( "drop" ).bind( "drop", function() {
			equal( true, data[ 2 ], data[ 3 ] );
		});

		$( draggable ).simulate( "drag", {
			dx: ( data[ 0 ] - $( draggable ).position().left ),
			dy: ( data[ 1 ] - $( draggable ).position().top )
		});
	});

	// http://bugs.jqueryui.com/ticket/4977 - tolerance, pointer - bug when pointer outside draggable
	draggable.css({ top: 0, left: 0 }).draggable( "option", "axis", "x" );
	droppable.css({ top: 15, left: 15 });

	droppable.unbind( "drop" ).bind( "drop", function() {
		ok( true, "drop fires as long as pointer is within droppable" );
	});

	$( draggable ).simulate( "drag", {
		dx: 10,
		dy: 10
	});
});

/*
test( "tolerance, touch", function() {
	ok(false, 'missing test - untested code is broken code');
});
*/
})(jQuery);
