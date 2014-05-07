var PlayerLife = cc.Node.extend({

	ctor: function() {
		this.started = false;
		this._super();
		this.maxlife = 0;
		this.life = [];
		// this.size = PlayerLife.SIZE;
		// this.DEFAULT_SCALE_X = ( this.size / 40.0 ) + 2;
		
	},

	createLifeBar: function( maxlife ) {
		for( var i = 1 ; i <= maxlife ; i++){
			var lifeBar = cc.Sprite.create( 'img/life.png' );
			lifeBar.setScaleX( 0.06 );
			lifeBar.setScaleY( 0.06 );
			lifeBar.setPosition( new cc.Point( i*40, 0 ) );
			this.addChild( lifeBar , 1000);
			this.life.push( lifeBar );
		}
	},

	setLife: function( life ) {
		for( var i = 0 ; i < this.maxlife ; i++ ){
			if( i >= life ){
				var heart = this.life[i];
				heart.setOpacity(0);
			}
		}
	},

	setMaxLife: function( maxlife ) {
		this.maxlife = maxlife;
		this.createLifeBar( maxlife );
	},

	// createHpBar: function() {
	// 	this.hpBar = cc.Sprite.create( 'img/hp_green.png' );
	// 	this.hpBar.setScaleX( ( this.size / 40.0 ) + 2 );
	// 	this.hpBar.setScaleY( 5 );
	// 	this.hpBar.setAnchorPoint( new cc.Point( 0, 0 ) );
	// 	this.hpBar.setPosition( new cc.Point( 0, 0 ) );
	// 	this.addChild( this.hpBar );

	// 	this.barBoarder = cc.Sprite.create( 'img/enemy_bar_border.png' );
	// 	this.barBoarder.setScaleY( 5 );
	// 	this.barBoarder.setScaleX( ( this.size / 80.0 ) + 1 );
	// 	this.barBoarder.setAnchorPoint( new cc.Point( 0, 0 ) );
	// 	this.barBoarder.setPosition( new cc.Point( 0, 0 ) );
	// 	this.addChild( this.barBoarder );
	// },

	// setLife: function( percent ) {
	// 	this.hpBar.setScaleX( this.DEFAULT_SCALE_X * ( percent / 100 ) );
	// }
});

//PlayerLife.SIZE = 100;