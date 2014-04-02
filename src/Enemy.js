var Enemy = cc.Sprite.extend({

	ctor: function(player){
		this._super();
		this.player = player;
		this.HP = 3;
		this.sX = 0;
		this.sY = 0;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.damage = 1;
		this.speed = 3;

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
		animation.addSpriteFrameWithFile( 'img/mario_a1.png' );
		animation.addSpriteFrameWithFile( 'img/mario_a2.png' );
		animation.addSpriteFrameWithFile( 'img/mario_a3.png' );
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		this.HP -= 1;
		if( this.HP <= 0 )
			this.removeFromParent( true );
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

	isHit: function(){
		var posP = this.player.getPosition();
		var posE = this.getPosition();
		if(posP.x <= posE.x + 50 && posP.x >= posE.x - 50 && posP.y <= posE.y + 150 && posP.y >= posE.y - 150){
			this.removeFromParent( true );
		}
	},
});