var Player = cc.Sprite.extend({ 

	ctor: function( gameLayer ){
		this._super();
		this.setAnchorPoint( cc.p( 0.5,0.0 ) );
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.enemys = [];
		this.items = [];
		this.maxLife = Player.MAXLIFE;
		this.life = Player.MAXLIFE;
		this.vX = 0;
		this.keyLeft = false;
		this.keyRight = false;
		this.keySpace = false;
		this.WIDTH = 600;
		this.HEIGHT = 600;
		this.maxAmmo = Player.MAXAMMO;
		this.ammo = Player.MAXAMMO;
		this.currentRotation = 0;
		this.gameLayer = gameLayer;
		this.keepPosX = [];
		for( var i = 10 ; i < 510 ; i++ ){
			this.keepPosX[i] = false;
		}
		this.unlimitedAmmo = false;
		this.refillAmmo( 3 );

	},

	refillAmmo: function( delay ){
		this.schedule(function() {
			if(this.ammo < this.maxAmmo ){
				this.ammo += 1;
				this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
			}
		}, delay );
	},

	createStandAction: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/player/player_a1.png' );
		animation.addSpriteFrameWithFile( 'img/player/player_a2.png' );
		animation.addSpriteFrameWithFile( 'img/player/player_a3.png' );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	setLifeBar: function( lifeBar ) {
		this.lifeBar = lifeBar;
		this.lifeBar.setMaxLife( this.maxLife );
	},

	setAmmoBar: function( ammoBar ) {
		this.ammoBar = ammoBar;
	},
	
	spawnFireball: function( ){
		var pos = this.getPosition();
		this.map.spawnFireball( pos.x , pos.y );
	},

	attacked: function( damage ){
		if( this.life > 0 ){
			this.life -= damage;
			if( this.life <= 0 ){
				this.life = 0;
				// this.lifeBar.setLife( ( this.life / this.maxLife ) * 100 );
				this.lifeBar.setLife(this.life);
				this.scheduleOnce(function() {
					this.gameLayer.endGame();
				}, 0.5 );
			}
			else
				this.lifeBar.setLife(this.life);
		}
	},

	unlimitedAmmoMode: function( boolean ) {
		if( boolean ){
			this.scheduleOnce( function() {
				this.unlimitedAmmoMode(false);
			}, 3);
		}
		this.unlimitedAmmo = boolean;
	},

	bombMode: function( boolean ) {
		for( var i = 0; i < this.enemys.length; i++ ){
			this.enemys[i].isKilled();
		}
		this.enemys = []
	},

	addTime: function( time ) {
		this.gameLayer.updateTime( time );
	},

	goRight: function() {
		this.setFlippedX( true );
		this.keyRight = true;
		this.vX = Player.SPEED;
	},

	goLeft: function() {
		this.setFlippedX( false );
		this.keyLeft = true;
		this.vX = -Player.SPEED;
	},

	stopRight: function() {
		if(this.keyLeft)
			this.vX = -Player.SPEED;
		else {
			this.vX = 0;
		}
		this.keyRight = false;
	},

	stopLeft: function() {
		if(this.keyRight)
			this.vX = Player.SPEED;
		else {
			this.vX = 0;
		}
		this.keyLeft = false;
	},

	move: function(){
		var pos = this.getPosition();
		if( pos.x + this.vX <= this.WIDTH - 50 && pos.x + this.vX >= 50 ){
			this.setPosition( pos.x + this.vX , pos.y );
		}
	},

	fire: function(  ){
		console.log(this.unlimitedAmmo);
		if( !this.unlimitedAmmo ) {
			if( this.ammo > 0 ){
				this.ammo -= 1;
				this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
				this.spawnFireball();
			}
		}
		else
			this.spawnFireball();
	},

	setMap: function( map ){
		this.map = map;
	},

	update: function( dt ){
		this.setRotation(this.currentRotation);
		this.move();
	},

    handleTouchMove: function( touchLocation ){
        var angle = Math.atan2( touchLocation.x - 300, touchLocation.y - 100 );
        angle = angle * ( 180 / Math.PI );
        // console.log(angle);
        if( angle < -50 )
        	angle = -50;
        else if( angle > 50 )
        	angle = 50;
        this.currentRotation = angle;
    }
});

Player.MAXAMMO = 50;
Player.MAXLIFE = 5;
Player.SPEED = 8;