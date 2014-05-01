var GameLayer = cc.LayerColor.extend({

    init: function() {

        this._super();
        this.background = cc.Sprite.create ( 'img/bg.png' );
        this.background.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.addChild( this.background, 0 );

        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 32 );
        this.scoreLabel.setColor(new cc.Color3B( 0, 200, 0 ) );
        this.scoreLabel.setPosition( cc.p( 525, 100 ) );
        this.addChild( this.scoreLabel );

        this.timeP = 60;
        this.timeLabel = cc.LabelTTF.create( '60', 'Arial', 32 );
        this.timeLabel.setColor(new cc.Color3B( 255, 0, 0 ) );
        this.timeLabel.setPosition( cc.p( 525, 525 ) );
        this.addChild( this.timeLabel );

        // this.coinLabel = cc.LabelTTF.create( '  x  0', 'Arial', 30 );
        // this.coinLabel.setPosition( new cc.Point( 90, 530 ) );
        // this.coinLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
        // this.addChild( this.coinLabel, 4 );

        this.setPosition( new cc.Point( 0, 0 ) );

        this.player = new Player( this );
        this.player.setPosition(cc.p( 300 , 35 ));
        this.addChild( this.player , 500 );

        this.enemyFactory = new EnemyFactory( this.player );
        this.itemFactory = new ItemFactory( this.player );

        this.map = new Map( this.player, this.enemyFactory, this.itemFactory, this );
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
        this.setTouchEnabled( true );
        this.setMouseEnabled( true );
        this.schedule(this.update);
 
        return true;
    },

    update:function(dt){
    
    },

    updateScore: function( score ) {       
        this.score += score;
        this.scoreLabel.setString( this.score );
    },

    updateTime: function( time ) {
        if(time == 0)
            this.timeP = 0;
        else
            this.timeP += time;
        this.timeLabel.setString( this.timeP );
    },


    onTouchesMoved:function( pTouch, pEvent ){
        this.player.handleTouchMove( pTouch[0].getLocation() );
    },

    onMouseMoved: function( e ) {
        this.player.handleTouchMove( e.getLocation() );
    },

    // onMouseUp: function( e ) {
    //     this.onDrag = false;
    // },

    // onMouseDown: function( e ) {

    //     var mousePosition = e.getLocation();
    //     var uiPosition = this.getPosition();
    //     if ( this.isEventHappenInArea( mousePosition, uiPosition ) ) {
    //         console.log("CLICK!");
    //         this.onDrag = true;
    //         this.offsetPosition = new cc.Point( mousePosition.x - uiPosition.x, mousePosition.y - uiPosition.y );
    //     }
    // },

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


