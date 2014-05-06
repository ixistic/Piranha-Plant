var Item = cc.Sprite.extend({

	ctor: function( player , numType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.numType = numType;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 ) {
			this.fall();
			this.removeFromParent( true );
		}
		this.move();
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( pos.x , pos.y - this.speed );
	},

	createStandAction: function() {
		var animation = new cc.Animation.create();
		if( this.numType == 0 ){
			animation.addSpriteFrameWithFile( 'img/item/item_a1.png' );
		}
		else if( this.numType == 1 ){
			animation.addSpriteFrameWithFile( 'img/item/item_b1.png' );
		}
		else if( this.numType == 2 ){
			animation.addSpriteFrameWithFile( 'img/item/item_c1.png' );
		}
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		this.setPosition( -50 , -50 );
		this.removeFromParent( true );
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

});