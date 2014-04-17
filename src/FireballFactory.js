var FireBallFactory = cc.Node.extend({

	ctor: function( player ){
		this.player = player;
	},

	getFireball: function( number ){
		array = [];
		for( var i = 0 ; i < number ; i++ ){
			var enemy = new Enemy( this.player );
			this.genPostion( enemy );
			array.push( enemy );
		}
		return array;
	},

	setPostion: function( enemy ){
		enemy.sX = Math.round( Math.random() * 500 );
		enemy.sY = 500;
		console.log( "sX : " + enemy.sX + " sY : " + enemy.sY );
	}
});