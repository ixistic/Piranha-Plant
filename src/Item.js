var Item = cc.Sprite.extend({

	ctor: function( player , numType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.numType = numType;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.listItem = [
		"103",
		"103",
		"103"];
		this.hp = this.listItem[this.numType][0];
		this.damage = this.listItem[this.numType][1];
		this.speed = this.listItem[this.numType][2];
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 ) {
			this.fall();
			this.removeFromParent( true );
		}
		this.move();
		this.isHit();
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( pos.x , pos.y - this.speed );
	},

	createStandAction: function() {
		var animation = new cc.Animation.create();
		if( this.numType == 0 ){
			animation.addSpriteFrameWithFile( 'img/item_a1.png' );
		}
		else if( this.numType == 1 ){
			animation.addSpriteFrameWithFile( 'img/item_b1.png' );
		}
		else if( this.numType == 2 ){
			animation.addSpriteFrameWithFile( 'img/item_c1.png' );
		}
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		this.hp -= 1;
		if( this.hp <= 0 ) {
			this.setPosition( 0 , 0 );
			this.removeFromParent( true );
		}
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

	isHit: function(){
		// var posP = this.player.getPosition();
		// var posE = this.getPosition();
		// if(posP.x <= posE.x + 50 && posP.x >= posE.x - 50 && posP.y <= posE.y + 150 && posP.y >= posE.y - 150){
		// 	this.removeFromParent( true );
		// }
	},
});