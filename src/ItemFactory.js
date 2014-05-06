var ItemFactory = cc.Node.extend({

	ctor: function( player ){
		this.player = player;
	},

	getItem: function( ){
		var generateType = Math.round( Math.random() * 2 );
		var item = new Item( this.player , generateType );
		this.generatePosition( item );
		console.log("ffff");
		return item;
	},

	generatePosition: function( item ){
		item.sX = Math.round( Math.random() * 500 );
		item.sY = 700;
		// console.log( "sX : " + enemy.sX + " sY : " + enemy.sY );
	}
});