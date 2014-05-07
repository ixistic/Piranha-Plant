var GameLayer = cc.LayerColor.extend({

    init: function() {

        this._super();
        this.setPosition( new cc.Point( 0, 0 ) );
        this.initBackground();
        this.initPlayerLifeBar();
        this.initAmmoBar();
        this.initPlayer();
        this.initClock();
        this.initScore();
        this.initEnemy();
        this.initItem();
        this.initMap();
        this.initSound();

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
        var tmp = ""
        if(this.score < 10) 
            tmp = "Score : 0000" + this.score;
        else if(this.score < 100) 
            tmp = "Score : 000" + this.score;
        else if(this.score < 1000) 
            tmp = "Score : 00" + this.score;
        else if(this.score < 10000) 
            tmp = "Score : 0" + this.score;
        else if(this.score < 100000) 
            tmp = "Score : " + this.score;
        this.scoreLabel.setString( tmp );
    },

    updateTime: function( time ) {
        if(time == 0)
            this.timeP = 0;
        else
            this.timeP += time;
        var tmp = ""
        if(this.timeP < 10) 
            tmp = "Time : 0" + this.timeP;
        else if(this.timeP < 100) 
            tmp = "Time : " + this.timeP;
        this.timeLabel.setString( tmp );
    },

    initBackground: function(){
        this.background = cc.Sprite.create ( 'img/bg.png' );
        this.background.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.addChild( this.background, 0 );
    },

    initScore: function(){
        this.score = 0;
        this.scoreLabel = cc.LabelTTF.create( 'Score : 00000', 'Arial', 28 );
        this.scoreLabel.setColor(new cc.Color3B( 255, 255, 255 ) );
        this.scoreLabel.setPosition( cc.p( 475, 60 ) );
        this.scoreLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
        this.addChild( this.scoreLabel, 1000 );
    },

    initClock: function(){
        this.timeP = 60;
        this.timeLabel = cc.LabelTTF.create( 'Time : 60', 'Arial', 28 );
        this.timeLabel.setColor(new cc.Color3B( 255, 255, 255 ) );
        this.timeLabel.setPosition( cc.p( 500, 525 ) );
        this.timeLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
        this.addChild( this.timeLabel, 1000 );

        this.schedule(function() {
            if( this.timeP > 0 ){
                this.updateTime( -1 );
            }
            else if( this.timeP == 0)
                this.endGame();
        },1);
    },

    initEnemy: function() {
        this.enemyFactory = new EnemyFactory( this.player );
    },

    initPlayerLifeBar: function() {
        this.lifeLabel = cc.LabelTTF.create( 'Life : ', 'Arial', 28 );
        this.lifeLabel.setColor(new cc.Color3B( 255, 255, 255 ) );
        this.lifeLabel.setPosition( cc.p( 70, 525 ) );
        this.lifeLabel.enableStroke( new cc.Color3B( 0, 0, 0 ), 3 );
        this.addChild( this.lifeLabel, 1000 );

        this.playerLife = new PlayerLife();
        this.playerLife.setPosition( cc.p( 90, 525 ) );
        this.addChild( this.playerLife , 1000);
    },

    initAmmoBar: function() {
        this.ammoBar = new AmmoBar();
        this.ammoBar.setPosition( cc.p( 30, 550 ) );
        this.addChild( this.ammoBar , 1000);
    },

    initPlayer: function() {
        this.player = new Player( this );
        this.player.setPosition(cc.p( 300 , 35 ));
        this.addChild( this.player , 500 );
        this.player.setLifeBar( this.playerLife );
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

    initSound: function() {
        // cc.AudioEngine.getInstance().playMusic( 'sound/soundBg_1.mp3', true );
    },

    // onTouchesMoved: function( pTouch, pEvent ){
    //     this.player.handleTouchMove( pTouch[0].getLocation() );
    // },

    // onMouseMoved: function( e ) {
    //     this.player.handleTouchMove( e.getLocation() );
    // },

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
    },

    endGame: function() {
        this.map.unscheduleUpdate();
        var message = "Your score is "+this.score+" ! \n\n\"OK\" Restart ";
        alert( message );
        this.restart();
        // var menu = confirm("Your score is "+this.score+" ! \n\n\"OK\" Restart ");
        // if(menu){
        //     var director = cc.Director.getInstance();
        //     director.replaceScene(cc.TransitionFade.create(1.5, new StartScene()));
        // }
    },

    restart: function() {
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create(1.5, new StartScene()));
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


