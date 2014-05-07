var Fireball = cc.Sprite.extend({

	ctor: function( xP, yP, player, gameLayer ){
		this._super();
		this.sX = xP - 15;
		this.sY = yP + 85;
		this.player = player;
		this.gameLayer = gameLayer;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		this.damage = Fireball.DAMAGE;
		this.speed = Fireball.SPEED;
	},

	update: function( dt ){
		var pos = this.getPosition();
		if( pos.y <= 30 || pos.y >= 600 ) {
			this.overRange();
		}
		for( var i = 0 ; i < this.player.enemys.length ; i++ ){
			this.isHitEnemy( this.player.enemys[i] );
		}
		for( var j = 0 ; j < this.player.items.length ; j++ ){
			this.isHitItem( this.player.items[j] );
		}
		this.move();
	},

	move: function(){
		var pos = this.getPosition();
		this.setPosition( pos.x , pos.y + this.speed );
	},

	createStandAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a1.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a2.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a3.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a4.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a5.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a6.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a7.png' );
		animation.addSpriteFrameWithFile( 'img/fireball/fireball_a8.png' );
		animation.setDelayPerUnit( 0.05 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	overRange: function(){
		this.removeFromParent( true );
	},

	isHitEnemy: function( enemy ){
		var boxEnemy = enemy.getBoundingBoxToWorld();
		var boxFireBall = this.getBoundingBoxToWorld();

		if(cc.rectOverlapsRect(boxEnemy,boxFireBall)){
			console.log("fireball hit enemy");
			// this.initWithFile( 'images/obstacle_bomb.png' );
			enemy.isFired();
			this.gameLayer.updateScore( 1 );
			this.speed = 0;
			this.setPosition( -50, -50 );
			this.removeFromParent( true );			
		}
	},

	isHitItem: function( item ){
		var boxItem = item.getBoundingBoxToWorld();
		var boxFireBall = this.getBoundingBoxToWorld();

		if(cc.rectOverlapsRect(boxItem,boxFireBall)){
			console.log("fireball hit item");
			item.isFired();
			this.removeFromParent( true );
			this.gameLayer.updateScore( 1 );
		}
	},

});

Fireball.DAMAGE = 1;
Fireball.SPEED = 3;