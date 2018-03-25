// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {}

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('background', 'assets/background-city.png');
  this.load.image('building', 'assets/building.png');
  this.load.image('car', 'assets/car.png');
  this.load.image('house', 'assets/house.png');
  this.load.image('tree', 'assets/tree.png');

  this.load.audio('building', [
    'assets/audio/edificio.ogg',
    'assets/audio/edificio.mp3'
  ]);

  this.load.audio('house', [
    'assets/audio/casa.ogg',
    'assets/audio/casa.mp3'
  ]);

  this.load.audio('car', [
    'assets/audio/auto.ogg',
    'assets/audio/auto.mp3'
  ]);

  this.load.audio('tree', [
    'assets/audio/arbol.ogg',
    'assets/audio/arbol.mp3'
  ]);

};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  this.add.sprite(0, 0, 'background').setOrigin(0);

  // group https://github.com/photonstorm/phaser/blob/master/src/gameobjects/group/Group.js
  // setDepth() to determine which goes where
  this.items = this.add.group([{
      key: 'building',
      setXY: {
        x: 100,
        y: 240
      }
    },
    {
      key: 'house',
      setXY: {
        x: 240,
        y: 280
      },
      setScale: {
        x: 0.8,
        y: 0.8,
      }
    },
    {
      key: 'car',
      setXY: {
        x: 400,
        y: 300
      },
      setScale: {
        x: 0.8,
        y: 0.8,
      }
    },
    {
      key: 'tree',
      setXY: {
        x: 550,
        y: 250
      }
    }
  ]);

  // this.add.sprite(240, 280, 'house').setScale(0.8);
  // this.add.sprite(400, 300, 'car').setScale(0.8);
  // this.add.sprite(550, 250, 'tree');

  // text
  this.wordText = this.add.text(30, 20, '', {
    font: '24px Open Sans',
    fill: '#ffffff'
  });

  // input event on each item
  // https://github.com/photonstorm/phaser/blob/master/src/structs/Set.js
  this.items.children.each(function(item) {

    // create audio object
    item.spanishAudio = this.sound.add(item.texture.key);

    // make it respond to input
    item.setInteractive();

    // increase size tween
    item.sizeTween = this.tweens.add({
      targets: item,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true,
      paused: true
    });

    // change alpha tween
    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 0.7,
      duration: 200,
      paused: true
    });

    // animate when hovering the mouse
    item.on('pointerover', function(pointer) {
      item.alphaTween.restart();
    });

    item.on('pointerout', function(pointer) {
      item.alpha = 1;
    });

    item.on('pointerdown', function(pointer) {
      item.sizeTween.restart();
      item.scene.wordText.setText("EDIFICIO");
      item.spanishAudio.play();
    });

  }, this);




};


// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  //pixelArt: true,
  //title	: 'Some Game'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
