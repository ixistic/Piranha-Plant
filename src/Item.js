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
		this.isDestroyed = false;
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 ) {
			this.setPosition( -50 , -50 );
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
		if(!this.isDestroyed){
			this.isDestroyed = true;
			if( this.numType == 0 ) {
				this.player.unlimitedAmmoMode(true);
			}
			else if( this.numType == 1 ) {
				this.player.bombMode(true);
			}
			else if( this.numType == 2 ) {
				this.player.addTime( 10 );
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
		}
	},

	isHit: function() {
		var boxPlayer = this.player.getBoundingBoxToWorld();
		var boxItem = this.getBoundingBoxToWorld();

		if(cc.rectOverlapsRect(boxPlayer,boxItem)){
			this.isFired();
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