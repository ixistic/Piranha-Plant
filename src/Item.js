var Item = cc.Sprite.extend({

	ctor: function( player , numType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.numType = numType;
		this.standAction = this.createStandAction();
		this.runAction( this.standAction );
		this.speed = 3;
		this.glowing = false;
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 ) {
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
			animation.addSpriteFrameWithFile( 'img/item/item_unlimit.png' );
		}
		else if( this.numType == 1 ){
			animation.addSpriteFrameWithFile( 'img/item/item_bomb.png' );
		}
		else if( this.numType == 2 ){
			animation.addSpriteFrameWithFile( 'img/item/item_time.png' );
		}
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		if( this.numType == 0 ) {
			this.player.unlimitMode = true;
			this.scheduleOnce( function() {
				this.player.unlimitMode = false;
				console.log("doooo");
			}, 3);
		}
		else if( this.numType == 1 ) {

		}
		else if( this.numType == 2 ) {

		}

		if( !this.glowing ) {
			this.glowing = true;
			this.glowAction = this.createGlowAction( );
			this.stopAction( this.standAction );
			this.runAction( this.glowAction );
			this.speed = 0;
			this.scheduleOnce( function() {
				this.setPosition( -50, -50 );
				this.removeFromParent( true );
			}, 0.6);
		}
	},

	createGlowAction: function( ) {
		var animation = new cc.Animation.create();
		console.log("create grow");
		for( var i=1;i<=16;i++ ){
			animation.addSpriteFrameWithFile( 'img/glow/vox_'+i+'.png' );
		}
		animation.setDelayPerUnit( 0.1 );
		return cc.Animate.create( animation );
	},

});