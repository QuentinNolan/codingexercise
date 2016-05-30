$(document).ready(function(){

   	$( '.update_item' ).click( function (){
		var elem = $( this )
		fetch( 
			'items', 
			{
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( {
					'ident': elem.parent().attr('data'),
					'nombre': elem.parent().find( '.item_nombre' ).val(),
					'aliment': elem.parent().find( '.item_aliment' ).val()
				} )
			}
		).then( 
			function( res ){
				if ( res.ok ) return res.json()
			} 
		)
		.then( 
			function( data ){
				console.log( data )
				window.location.reload( true )
			}
		)
	} )

	$( '.delete_item' ).click( function (){
		var elem = $( this )
		fetch( 
			'items', 
			{
				method: 'delete',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( {
					'ident': elem.parent().attr('data')
				} )
			}
		).then( 
			function( response ){
				window.location.reload( true )
			}
		)
	} )

});