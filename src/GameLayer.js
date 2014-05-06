var GameLayer = cc.LayerColor.extend({

    init: function() {

        this._super();
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initPlayerLiveBar();
        this.initAmmoBar();
        this.initPlayer();
        this.initClock();
        this.initScore();
        this.initEnemy();
        this.initItem();
        this.initMap();

        // this.coinLabel = cc.LabelTTF.create( '  x  0', 'Arial', 30 );
        // this.coinLabel.setPosition( new cc.Point( 90, 530 ) );
        // this.coinLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
        // this.addChild( this.coinLabel, 4 );

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

    initBackground: function(){
        this.background = cc.Sprite.create ( 'img/bg.png' );
        this.background.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.addChild( this.background, 0 );
    },

    initScore: function(){
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 32 );
        this.scoreLabel.setColor(new cc.Color3B( 0, 200, 0 ) );
        this.scoreLabel.setPosition( cc.p( 525, 100 ) );
        this.addChild( this.scoreLabel );
    },

    initClock: function(){
        this.timeP = 60;
        this.timeLabel = cc.LabelTTF.create( '60', 'Arial', 32 );
        this.timeLabel.setColor(new cc.Color3B( 255, 0, 0 ) );
        this.timeLabel.setPosition( cc.p( 525, 525 ) );
        this.addChild( this.timeLabel );

        this.schedule(function() {
            if( this.timeP > 0 && !this.player.endGame ){
                this.updateTime(-1);
            }
            else
                this.player.endGame = true;
        },1);
    },

    initEnemy: function() {
        this.enemyFactory = new EnemyFactory( this.player );
    },

    initPlayerLiveBar: function() {
        this.playerLive = new PlayerLive();
        this.playerLive.setPosition( cc.p( 30, 50 ) );
        this.addChild( this.playerLive );
    },

    initAmmoBar: function() {
        this.ammoBar = new AmmoBar();
        this.ammoBar.setPosition( cc.p( 30, 550 ) );
        this.addChild( this.ammoBar );
    },

    initPlayer: function() {
        this.player = new Player( this );
        this.player.setPosition(cc.p( 300 , 35 ));
        this.addChild( this.player , 500 );
        this.player.setLiveBar( this.playerLive );
        this.player.setAmmoBar( this.ammoBar );
        this.player.scheduleUpdate();
    },

    initItem: function() {
        this.itemFactory = new ItemFactory( this.player );
    },

    initMap: function() {
        this.map = new Map( this.player, this.enemyFactory, this.itemFactory, this );
        this.addChild( this.map );
        this.player.setMap( this.map );
    },

    onTouchesMoved: function( pTouch, pEvent ){
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


