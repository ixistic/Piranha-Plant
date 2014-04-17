var EnemyFactory = cc.Node.extend({

	ctor: function( player ){
		this.player = player;
	},

	getEnemy: function( ){
		var genType = Math.round( Math.random() * 2 );

		var enemy = new Enemy( this.player , genType );
		this.genPostion( enemy );
		return enemy;
	},

	genPostion: function( enemy ){
		enemy.sX = Math.round( Math.random() * 500 );
		enemy.sY = 500;
		console.log( "sX : " + enemy.sX + " sY : " + enemy.sY );
	}
});