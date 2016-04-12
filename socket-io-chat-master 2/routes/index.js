var express = require('express');
var path = require('path');
var router = express.Router();

router.get( '/', function( req, res ) {
	var id = Math.floor( Math.random() * 10000 );
	res.redirect( '/' + id );
} );

router.get( '/:id([0-9]+)', function( req, res ) {
	res.sendFile( path.resolve( __dirname + '/../views/index.html' ) );
} );

module.exports = router;
