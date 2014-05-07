var EnemyFactory = cc.Node.extend({

	ctor: function( player ){
		this.player = player;
	},

	getEnemy: function( ){
		var generateType = Math.round( Math.random() * 2 );
		var enemy = new Enemy( this.player , generateType );
		this.genPostion( enemy );
		return enemy;
	},

	genPostion: function( enemy ){
		while( enemy.sX == 0 ){
			enemy.sX = Math.round( Math.random() * 500 ) + 10;
			for( var i = enemy.sX - 50 ; i <= enemy.sX + 50 ; i++ ){
				if( this.player.keepPosX[i] ){
					enemy.sX == 0;
					break;
				}
			}
			if(enemy.sX != 0){
				for( var i = enemy.sX - 50 ; i <= enemy.sX + 50 ; i++ ){
					this.player.keepPosX[i] = true;
					this.scheduleOnce(function(){
						this.player.keepPosX[i] = false;
					}, 5);
				}
			}
		}
		enemy.sY = 700;
		// console.log( "sX : " + enemy.sX + " sY : " + enemy.sY );
	}
});