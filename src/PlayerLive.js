var PlayerLive = cc.Node.extend({

	ctor: function() {
		this.started = false;
		this._super();
		var size = 100;
		this.DEFAULT_SCALE_X = ( size / 40.0 ) + 2;

		this.hpBar = cc.Sprite.create( 'img/hp_green.png' );

		this.hpBar.setScaleX( ( size / 40.0 ) + 2 );
		this.hpBar.setScaleY( 5 );
		this.hpBar.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.hpBar.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.hpBar );

		this.barBoarder = cc.Sprite.create( 'img/enemy_bar_border.png' );
		this.barBoarder.setScaleY( 5 );
		this.barBoarder.setScaleX( ( size / 80.0 ) + 1 );
		this.barBoarder.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.barBoarder.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.barBoarder );
	},

	setLive: function( percent ) {
		this.hpBar.setScaleX( this.DEFAULT_SCALE_X * ( percent / 100 ) );
	}
});