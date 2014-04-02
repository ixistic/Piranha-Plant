var Map = cc.Node.extend({

	ctor: function( player , factory ) {
		this._super();
		this.player = player;
		this.factory = factory;
		this.spawnEnemy( 3 );
	},

	spawnEnemy: function( delay ){
		this.scheduleOnce(function(){
			var enemy = this.factory.getEnemy( 1 );
			for( var i = 0 ; i < enemy.length ; i++ ){
				enemy[i].setPosition(cc.p(enemy[i].sX,enemy[i].sY));
				enemy[i].scheduleUpdate();
				this.addChild(enemy[i]);
			}
			this.player.enemys = enemy;
			this.spawnEnemy( Math.round( Math.random() * 3 ) );
		}, delay);
		// var enemy = this.factory.getEnemy( number );

		// for( var i = 0 ; i < enemy.length ; i++ ){
		// 	enemy[i].setPosition(cc.p(enemy[i].sX,enemy[i].sY));
		// 	enemy[i].scheduleUpdate();
		// 	this.addChild(enemy[i]);
		// }
		// this.player.enemys = enemy;
	}

});