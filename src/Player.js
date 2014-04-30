var Player = cc.Sprite.extend({ 

	ctor: function( gameLayer ){
		this._super();
		this.setAnchorPoint( cc.p( 0.5,0.0 ) );
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.enemys = [];
		this.maxLive = Player.MAXLIFE;
		this.live = Player.MAXLIFE;
		this.endGame = false;
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

		this.schedule(function() {
			if( this.gameLayer.timeP > 0 && !this.endGame ){
				this.gameLayer.updateTime(-1);
			}
			else
				this.endGame = true;
		},1);

		this.schedule(function() {
			if(this.ammo < this.maxAmmo){
				this.ammo += 1;
				this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
			}
		},2);

	},

	createStandAction: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/player_a1.png' );
		animation.addSpriteFrameWithFile( 'img/player_a2.png' );
		animation.addSpriteFrameWithFile( 'img/player_a3.png' );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	setLiveBar: function( liveBar ) {
		this.liveBar = liveBar;
	},

	setAmmoBar: function( ammoBar ) {
		this.ammoBar = ammoBar;
	},
	
	spawnFireball: function( ){
		var pos = this.getPosition();
		this.map.spawnFireball( pos.x , pos.y );
	},

	attacked: function( damage ){
		if( this.live > 0 ){
			this.live -= damage;
			if( this.live <= 0 ){
				this.endGame = true;
				this.gameLayer.updateTime(0);
				this.live = 0;
			}
			this.liveBar.setLive( ( this.live / this.maxLive ) * 100 );
		}
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
		console.log("Fire!!");
		if( this.ammo > 0 && this.enemys != null){
			this.ammo -= 1;
			this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
			this.spawnFireball();
		}
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
        console.log(angle);
        if( angle < -50 )
        	angle = -50;
        else if( angle > 50 )
        	angle = 50;
        this.currentRotation = angle;
    }
});

Player.MAXAMMO = 100;
Player.MAXLIFE = 10;
Player.SPEED = 8;