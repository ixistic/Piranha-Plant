var AmmoBar = cc.Node.extend({

	ctor: function() {
		this.started = false;
		this._super();
		this.size = AmmoBar.SIZE;
		this.DEFAULT_SCALE_X = ( this.size / 40.0 ) + 2;
		this.createAmmoBar();

	},

	createAmmoBar: function() {
		this.ammoBar = cc.Sprite.create( 'img/hp_green.png' );
		this.ammoBar.setScaleX( ( this.size / 40.0 ) + 2 );
		this.ammoBar.setScaleY( 5 );
		this.ammoBar.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.ammoBar.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.ammoBar );

		this.barBoarder = cc.Sprite.create( 'img/enemy_bar_border.png' );
		this.barBoarder.setScaleY( 5 );
		this.barBoarder.setScaleX( ( this.size / 80.0 ) + 1 );
		this.barBoarder.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.barBoarder.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.barBoarder );
	},

	setAmmo: function( percent ) {
		this.ammoBar.setScaleX( this.DEFAULT_SCALE_X * ( percent / 100 ) );
	}
});

AmmoBar.SIZE = 450;