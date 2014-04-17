var Enemy = cc.Sprite.extend({

	ctor: function( player , enemyType ){
		this._super();
		this.player = player;
		this.sX = 0;
		this.sY = 0;
		this.enemyType = enemyType;
		this.standAction  = this.createStandAction();
		this.runAction( this.standAction );
		if(this.enemyType == 0){
			this.HP = 1;
			this.damage = 1;
			this.speed = 3;
		}
		else if(this.enemyType == 1){
			this.HP = 2;
			this.damage = 2;
			this.speed = 2;
		}
		else if(this.enemyType == 2){
			this.HP = 3;
			this.damage = 3;
			this.speed = 1;
		}
		
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
		if( this.enemyType == 0 ){
			animation.addSpriteFrameWithFile( 'img/mario_a1.png' );
			animation.addSpriteFrameWithFile( 'img/mario_a2.png' );
			animation.addSpriteFrameWithFile( 'img/mario_a3.png' );
		}
		else if( this.enemyType == 1 ){
			animation.addSpriteFrameWithFile( 'img/mario_b1.png' );
			animation.addSpriteFrameWithFile( 'img/mario_b2.png' );
			animation.addSpriteFrameWithFile( 'img/mario_b3.png' );
		}
		else if( this.enemyType == 2 ){
			animation.addSpriteFrameWithFile( 'img/mario_c1.png' );
			animation.addSpriteFrameWithFile( 'img/mario_c2.png' );
			animation.addSpriteFrameWithFile( 'img/mario_c3.png' );
		}
		animation.setDelayPerUnit( 0.3 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },

	isFired: function(){
		this.HP -= 1;
		if( this.HP <= 0 ) {
			this.setPosition( 0 , 0 );
			this.removeFromParent( true );
		}
	},

	fall: function(){
		this.player.attacked( this.damage );
	},

	isHit: function(){
		// var posP = this.player.getPosition();
		// var posE = this.getPosition();
		// if(posP.x <= posE.x + 50 && posP.x >= posE.x - 50 && posP.y <= posE.y + 150 && posP.y >= posE.y - 150){
		// 	this.removeFromParent( true );
		// }
	},
});