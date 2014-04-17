var Map = cc.Node.extend({

	ctor: function( player, factory, gameLayer) {
		this._super();
		this.player = player;
		this.factory = factory;
		this.gameLayer = gameLayer;
		this.spawnEnemy( 3 );
	},

	spawnEnemy: function( delay ){
		this.scheduleOnce(function(){
			var enemy = this.factory.getEnemy();
			enemy.setPosition( cc.p( enemy.sX, enemy.sY ) );
			enemy.scheduleUpdate();
			this.addChild( enemy , 50 );
			this.player.enemys.push( enemy );
			this.spawnEnemy( Math.round( Math.random() * 3 ) );
			if( this.player.end )
				this.getScheduler().unscheduleAllCallbacksForTarget( this );
		}, delay);
	},

	spawnFireball: function( x , y ){
		var fireball = new Fireball( x , y , this.player , this.gameLayer );
		fireball.setPosition( cc.p ( fireball.sX, fireball.sY ) );
		fireball.scheduleUpdate();
		this.addChild( fireball , 100 );
	},

});

