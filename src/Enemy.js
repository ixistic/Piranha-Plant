var Enemy = cc.Sprite.extend({

	ctor: function( player , numType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.numType = numType;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.blooding = false;
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
			this.setPosition( -50 , -50 );
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
		if( !this.blooding ) {
			this.hp -= 1;
			if( this.hp <= 0 ) {
				this.blooding = true;
				this.bloodAction  = this.createBloodAction( );
				this.stopAction( this.standAction );
				this.runAction( this.bloodAction );
				// this.removeFromParent( true );
				this.speed = 0;
				this.scheduleOnce( function() {
					this.setPosition( -50, -50 );
					this.removeFromParent( true );
				}, 0.5);
			}
		}
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

	createBloodAction: function( ) {
		var animation = new cc.Animation.create();
		console.log("create blood");
		if( this.numType == 0 ){
			animation.addSpriteFrameWithFile( 'img/blood/blood_a1.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_a2.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_a3.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_a4.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_a5.png' );
		}
		else if( this.numType == 1 ){
			animation.addSpriteFrameWithFile( 'img/blood/blood_b1.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_b2.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_b3.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_b4.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_b5.png' );
		}
		else if( this.numType == 2 ){
			animation.addSpriteFrameWithFile( 'img/blood/blood_c1.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_c2.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_c3.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_c4.png' );
			animation.addSpriteFrameWithFile( 'img/blood/blood_c5.png' );
		}
		animation.setDelayPerUnit( 0.1 );
		return cc.Animate.create( animation );
	},

});