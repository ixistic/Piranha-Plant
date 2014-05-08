var Player = cc.Sprite.extend({ 

	ctor: function( gameLayer ){
		this._super();
		this.setAnchorPoint( cc.p( 0.5,0.0 ) );
		this.initStaticColor();
		this.standAction  = this.createStandAction();
		this.fireAction = this.createFireAction();
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
		this.endGame = false;
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
				this.ammoBar.setAmmo( this.ammo );
			}
		}, delay );
	},

	createStandAction: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/player/player_a1.png' );
		animation.addSpriteFrameWithFile( 'img/player/player_a2.png' );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	createFireAction: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/player/player_a3.png' );
		animation.setDelayPerUnit( 0.3 );
		return  cc.Animate.create( animation ) ;
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
			cc.AudioEngine.getInstance().playEffect( 'sound/CUTECAT.mp3');
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
			cc.AudioEngine.getInstance().playEffect( 'sound/ROUND3.mp3');
			this.popup("Unlimited Ammo 5 s",Player.COLOR.WHITE);
			this.scheduleOnce( function() {
				this.unlimitedAmmoMode(false);
			}, 5);
		}
		this.unlimitedAmmo = boolean;
	},

	bombMode: function( boolean ) {
		for( var i = 0; i < this.enemys.length; i++ ){
			this.enemys[i].isKilled();
			this.gameLayer.updateScore(1);
		}
		this.enemys = []
		cc.AudioEngine.getInstance().playEffect( 'sound/CAT_HISS.mp3');
		this.scheduleOnce( function() {
			this.popup("BOMB!",Player.COLOR.WHITE);
		},0.1);
	},

	addTime: function( time ) {
		this.gameLayer.updateTime( time );
		cc.AudioEngine.getInstance().playEffect( 'sound/YAHOO.mp3');
		this.scheduleOnce( function() {
			this.popup("Time +10",Player.COLOR.WHITE);
		},0.1);
	},

	popup: function( text, color ) {
		var label = DimLabel.create( '0', 'Arial', 13 );
		this.gameLayer.addChild( label );
		// this.getParent().addChild( label, 100 );
		// label.setScale( 3 );
		label.setPosition( new cc.Point( this.getPositionX() - this.gameLayer.getPositionX(), (this.getPositionY()+130  - this.gameLayer.getPositionY() ) ));
		label.setColor( color );
		// label.enableStroke( color, 2 );
		// label.setColor( Player.COLOR.BLACK );
		label.enableStroke( Player.COLOR.BLACK, 2 );
		label.popup( text );
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
		this.runAction( this.fireAction );
		console.log(this.unlimitedAmmo);

		if( !this.unlimitedAmmo ) {
			if( this.ammo > 0 ){
				this.ammo -= 1;
				this.ammoBar.setAmmo( this.ammo );
				this.spawnFireball();
				cc.AudioEngine.getInstance().playEffect( 'sound/SHOT4.mp3');
			}
		}
		else{
			this.spawnFireball();
			cc.AudioEngine.getInstance().playEffect( 'sound/SHOT4.mp3');
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
        // console.log(angle);
        if( angle < -50 )
        	angle = -50;
        else if( angle > 50 )
        	angle = 50;
        this.currentRotation = angle;
    },

    initStaticColor: function() {
		Player.COLOR.RED = new cc.Color3B( 255, 0, 0 );
		Player.COLOR.BLUE = new cc.Color3B( 0, 0, 255 );
		Player.COLOR.GREEN = new cc.Color3B( 0, 255, 0 );
		Player.COLOR.BLACK = new cc.Color3B( 0, 0, 0 );
		Player.COLOR.GRAY = new cc.Color3B( 100, 100, 100 );
		Player.COLOR.YELLOW = new cc.Color3B( 255, 255, 0 );
		Player.COLOR.WHITE = new cc.Color3B( 255, 255, 255 );

	},

	isEndGame: function() {
		this.endGame = true;
	},

});

Player.MAXAMMO = 50;
Player.MAXLIFE = 5;
Player.SPEED = 8;
Player.COLOR = {
	RED: null,
	BLUE: null,
	GREEN: null,
	BLACK: null,
	GRAY: null,
	YELLOW: null,
	WHITE: null,
}
