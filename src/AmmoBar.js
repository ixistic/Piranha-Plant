var AmmoBar = cc.Node.extend({

	ctor: function() {
		this.started = false;
		this._super();
		this.createAmmoBar();

	},

	createAmmoBar: function() {
		this.ammoLabel = cc.LabelTTF.create( 'Ammo : 50', 'Arial', 28 );
        this.ammoLabel.setColor(new cc.Color3B( 255, 255, 255 ) );
        this.ammoLabel.setPosition( cc.p( 390, 525 ) );
        this.ammoLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
		this.ammoLabel.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.ammoLabel );
	},

	setAmmo: function( ammo ) {
        var tmp = ""
        if(ammo < 10) 
            tmp = "Ammo : 0" + ammo;
        else if(ammo < 100) 
            tmp = "Ammo : " + ammo;
		this.ammoLabel.setString( tmp );
	}
});
