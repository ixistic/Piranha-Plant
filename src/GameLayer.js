var GameLayer = cc.LayerColor.extend({
    init: function() {

        // this.debugLabel = cc.LabelTTF.create( 'Piranha Plant', 'Arial', 20 );
        // this.debugLabel.setPosition( new cc.Point( screenWidth / 2,screenHeight - 30 ) );
        // this.addChild( this.debugLabel, 2 );
        this._super();
        this.background = cc.Sprite.create ( 'img/bg.png' );
        this.background.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.addChild( this.background, 0 );

        // this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.player = new Player();
        this.player.setPosition(cc.p( 300 , 35 ));
        this.addChild( this.player );

        this.factory = new EnemyFactory( this.player );

        this.map = new Map( this.player,this.factory );
        this.addChild( this.map );

        this.playerLive = new PlayerLive();
        this.playerLive.setPosition( cc.p( 30, 50 ) );
        this.addChild( this.playerLive );

        this.ammoBar = new AmmoBar();
        this.ammoBar.setPosition( cc.p( 30, 550 ) );
        this.addChild( this.ammoBar );

        this.player.setLiveBar( this.playerLive );
        this.player.setAmmoBar( this.ammoBar );
        this.player.setMap( this.map );
        this.player.scheduleUpdate();
        this.setKeyboardEnabled( true );
 
        return true;
    },

    onKeyDown: function( e ){
        switch ( e ) {
            case cc.KEY.space:
                this.player.fire();
                break;

            case cc.KEY.right:
                this.player.goRight();
                break;

            case cc.KEY.left:
                this.player.goLeft();
                break;

            default:
                break;
        }
    },

    onKeyUp: function( e ){
        if ( e == cc.KEY.right ) {
            this.player.stopRight();
        }

        if ( e == cc.KEY.left ) {
            this.player.stopLeft();
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


