var ItemFactory = cc.Node.extend({

	ctor: function( player ){
		this.player = player;
	},

	getItem: function( ){
		var generateType = Math.round( Math.random() * 2 );
		var item = new Item( this.player , generateType );
		this.generatePosition( item );
		return item;
	},

	generatePosition: function( item ){
		while( item.sX == 0 ){
			item.sX = Math.round( Math.random() * 500 ) + 10;
			for( var i = item.sX - 50 ; i <= item.sX + 50 ; i++ ){
				if( this.player.keepPosX[i] ){
					item.sX == 0;
					break;
				}
			}
			if(item.sX != 0){
				for( var i = item.sX - 50 ; i <= item.sX + 50 ; i++ ){
					this.player.keepPosX[i] = true;
					this.scheduleOnce(function(){
						this.player.keepPosX[i] = false;
					}, 5);
				}
			}		
		}
		item.sY = 700;
		// console.log( "sX : " + item.sX + " sY : " + item.sY );
	}
});