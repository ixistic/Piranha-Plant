var Fireball = cc.Sprite.extend({

	ctor: function( xP , yP ){
		this._super();
		this.sX = xP;
		this.sY = yP;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.damage = 1;
		this.speed = 3;
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 || pos.y >= 200 ) {
			this.overRange();
		}
		this.move();
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( pos.x , pos.y + this.speed );
	},

	createStandAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/fireball_a1.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a2.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a3.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a4.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a5.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a6.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a7.png' );
		animation.addSpriteFrameWithFile( 'img/fireball_a8.png' );
		animation.setDelayPerUnit( 0.05 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	overRange: function(){
		this.removeFromParent( true );
	},

	isHit: function( enemy ){
		var posE = enemy.getPosition();
		var posF = this.getPosition();
		if(posE.x <= posF.x + 50 && posE.x >= posF.x - 50 && posE.y <= posF.y + 150 && posE.y >= posF.y - 150){
			this.removeFromParent( true );
		}
	},
});