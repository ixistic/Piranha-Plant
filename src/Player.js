var Player = cc.Sprite.extend({ 

	ctor: function(){
		this._super();
		this.setAnchorPoint( cc.p( 0.5,0 ) );
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.enemys = null;
		this.maxLive = 10;
		this.live = 10;
		this.end = false;
		this.vX = 0;
		this.keyLeft = false;
		this.keyRight = false;
		this.keySpace = false;
		this.WIDTH = 600;
		this.HEIGHT = 600;
		this.maxAmmo = 10;
		this.ammo = 10;
		this.schedule(function() {
			if(this.ammo < this.maxAmmo){
				this.ammo += 1;
				this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
			}
		},3);

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

	attacked: function( damage ){
		if( this.live > 0 ){
			this.live -= damage;
			if( this.live <= 0 )
				this.end = true;
			this.liveBar.setLive( ( this.live / this.maxLive ) * 100 );
		}
	},

	goRight: function() {
		this.setFlippedX( true );
		this.keyRight = true;
		this.vX = 4;
	},

	goLeft: function() {
		this.setFlippedX( false );
		this.keyLeft = true;
		this.vX = -4;
	},

	stopRight: function() {
		this.keyRight = false;
		this.vX = 0;
	},

	stopLeft: function() {
		this.keyLeft = false;
		this.vX = 0;
	},

	move: function(){
		var pos = this.getPosition();
		if( pos.x + this.vX <= this.WIDTH - 50 && pos.x + this.vX >= 50 ){
			this.setPosition( pos.x + this.vX , pos.y );
		}
	},

	fire: function(){
		console.log("Fire!!");
		if( this.ammo > 0 ){
			this.ammo -= 1;
			this.ammoBar.setAmmo( ( this.ammo / this.maxAmmo ) * 100 );
			for( var i = 0 ; i < this.enemys.length ; i++ ){
				this.enemys[i].isFired();
			}
		}
	},

	setMap: function( map ){
		this.map = map;
	},

	update: function( dt ){
		this.move();
	},
});