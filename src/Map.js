var Map = cc.Node.extend({

	ctor: function( player, enemyFactory, itemFactory, gameLayer) {
		this._super();
		this.player = player;
		this.enemyFactory = enemyFactory;
		this.itemFactory = itemFactory;
		this.gameLayer = gameLayer;
		this.spawnEnemy();
		this.spawnItem();
	},

	spawnEnemy: function( ){
		this.scheduleOnce(function(){
			var enemy = this.enemyFactory.getEnemy();
			enemy.setPosition( cc.p( enemy.sX, enemy.sY ) );
			enemy.scheduleUpdate();
			this.addChild( enemy , 50 );
			this.player.enemys.push( enemy );
			var randomTime = Math.round( Math.random() * 5 );
			this.spawnEnemy( randomTime );
			if( this.player.live == 0 )
				this.getScheduler().unscheduleAllCallbacksForTarget( this );
		}, 1);
	},

	spawnItem: function( ){
		this.scheduleOnce(function(){
			console.log("do")
			var item = this.itemFactory.getItem();
			item.setPosition( cc.p( item.sX, item.sY ) );
			item.scheduleUpdate();
			this.addChild( item , 60 );
			this.player.items.push( item );
			var randomTime = Math.round( Math.random() * 1 );
			this.spawnEnemy( randomTime );
			if( this.player.live == 0 )
				this.getScheduler().unscheduleAllCallbacksForTarget( this );
		}, 1);
	},

	spawnFireball: function( x , y ){
		var fireball = new Fireball( x , y , this.player , this.gameLayer );
		fireball.setPosition( cc.p ( fireball.sX, fireball.sY ) );
		fireball.scheduleUpdate();
		this.addChild( fireball , 100 );
	},

});
