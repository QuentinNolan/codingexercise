const express = require( 'express' );
const bodyParser= require( 'body-parser' )
const app = express()
const MongoClient = require( 'mongodb' ).MongoClient

app.use( bodyParser.urlencoded( { extended:true } ) )
app.set( 'view engine', 'ejs' )
app.use( express.static( 'public' ) )
app.use( bodyParser.json() )

var db
var ObjectId = require( 'mongodb' ).ObjectID;

MongoClient.connect( 'mongodb://quentin:coemobile@ds049171.mlab.com:49171/coemobile-crud', function( err, database ) {
	if ( err ) return console.log( err )
	db = database
	app.listen( 7777, function() {
	  console.log('listening on 7777')
	} )

	// Liste
	app.get( '/', function( req, res ) {
		// Retourne sous array tous les elements de la bd
		db.collection( 'items' ).find().toArray( function( err, results ){
			res.render( 'index.ejs', { items: results } )
		} )
	} )

	// Ajout
	app.post( '/items', function( req, res ){
		// Ajoute a la bd le nouvel item
		db.collection( 'items' ).save( req.body, function( err, result ){
			if ( err ) return console.log( err )

			// Recharge la page
			res.redirect( '/' )
		} )
	} )

	// Modifie
	app.put( '/items', function( req, res ){
		// Modifie selon le id le nom de l'aliment
		db.collection( 'items' )
		.update( 
			{ _id : ObjectId( req.body.ident ) }, 
			{
				$set: {
					nombre: req.body.nombre,
					aliment: req.body.aliment
				}
			}, 
			{
				sort: {_id: -1 },
				upsert: false
			}, 
			function( err, result ){
				if ( err ) return res.send( err )
				res.send( result )
			} 
		)
	} )

	// Supprime
	app.delete( '/items', function( req, res ){
		// Supprimer selon le id
		db.collection( 'items' ).findOneAndDelete( 
			{ _id : ObjectId( req.body.ident ) }, 
			function( err, result ){
				if ( err ) return res.send( 500, err )
				res.send( 'Suppression reussie' )
			} 
		)
	} )
} )