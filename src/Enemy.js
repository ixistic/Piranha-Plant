var Enemy = cc.Sprite.extend({

	ctor: function( player , numType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.numType = numType;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.listEnemy = [
		"113",
		"222",
		"331"];
		this.hp = this.listEnemy[this.numType][0];
		this.damage = this.listEnemy[this.numType][1];
		this.speed = this.listEnemy[this.numType][2];
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 35 ) {
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
			animation.addSpriteFrameWithFile( 'img/enemy/mario_a1.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_a2.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_a3.png' );
		}
		else if( this.numType == 1 ){
			animation.addSpriteFrameWithFile( 'img/enemy/mario_b1.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_b2.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_b3.png' );
		}
		else if( this.numType == 2 ){
			animation.addSpriteFrameWithFile( 'img/enemy/mario_c1.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_c2.png' );
			animation.addSpriteFrameWithFile( 'img/enemy/mario_c3.png' );
		}
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		this.hp -= 1;
		if( this.hp <= 0 ) {
			this.setPosition( -50 , -50 );
			this.removeFromParent( true );
		}
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

});