var Map = cc.Node.extend({

	ctor: function( player, enemyFactory, itemFactory, gameLayer) {
		this._super();
		this.player = player;
		this.enemyFactory = enemyFactory;
		this.itemFactory = itemFactory;
		this.gameLayer = gameLayer;
		this.upperBound = 5;
		this.schedule( this.updateUpperBound , 10 );
		this.spawnEnemy( 1 );
		this.spawnItem( 1 );
	},

	updateUpperBound: function() {
		// console.log("ice");
		this.upperBound -= 0.5;
			if(this.upperBound == 0){
				this.getScheduler().unscheduleCallbackForTarget(this,this.updateUpperBound);
			}
	},

	spawnEnemy: function( delay ){
		this.scheduleOnce(function(){
			var enemy = this.enemyFactory.getEnemy();
			enemy.setPosition( cc.p( enemy.sX, enemy.sY ) );
			enemy.scheduleUpdate();
			this.addChild( enemy , 50 );
			this.player.enemys.push( enemy );
			var randomTime = Math.round( Math.random() * 2 ) + this.upperBound;
			this.spawnEnemy( randomTime );
		}, delay );
	},

	spawnItem: function( delay ){
		this.scheduleOnce(function(){
			var item = this.itemFactory.getItem();
			item.setPosition( cc.p( item.sX, item.sY ) );
			// console.log(item.sX + " " + item.sY);
			item.scheduleUpdate();
			this.addChild( item , 60 );
			this.player.items.push( item );
			var randomTime = Math.round( Math.random() * 5 ) + 5;
			this.spawnItem( randomTime );
			// if( this.player.endGame )
			// 	this.getScheduler().unscheduleAllCallbacksForTarget( this );
		}, delay );
	},

	spawnFireball: function( x , y ){
		var fireball = new Fireball( x , y , this.player , this.gameLayer );
		fireball.setPosition( cc.p ( fireball.sX, fireball.sY ) );
		fireball.scheduleUpdate();
		this.addChild( fireball , 100 );
	},

});
