
var TutorialLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
		this.setTouchEnabled(true);
        this.setTouchMode(1);

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 300, 300 );
       
        var bg = cc.Sprite.create();
		
        bg.createAction = function(){
        	var animation = new cc.Animation.create();
			for (var i = 1 ; i <= 2 ; i++){
				animation.addSpriteFrameWithFile( 'img/tutor_'+i+'.png');
			}
			animation.setDelayPerUnit( 0.5 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
        }

        bg.runAction(bg.createAction());
        bg.setPosition( center );
        this.addChild( bg );
	},

	onTouchBegan:function( touch, event ) {
        // cc.log("==onplay clicked");
        cc.AudioEngine.getInstance().stopMusic();
        cc.AudioEngine.getInstance().playEffect( 'sound/FASTPOP.mp3');
        var director = cc.Director.getInstance();
        director.replaceScene(cc.TransitionFade.create(1.5, new StartScene(true)));
    }
});

var TutorialScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new TutorialLayer();
		layer.init();
		this.addChild( layer );
	}
});