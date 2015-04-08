var Main = {
  init: function() {
    var w = 200;
    var h = 75;
    var noise = new ROT.Noise.Simplex();
    var display = new ROT.Display({width:w, height:h, fontSize:7});
    document.body.appendChild(display.getContainer());

    var randomElem = function(list) {
      var idx = ~~(Math.random() * list.length);
      return list[idx];
    };

    var terrainChars = {
      deepWater: {
        char: '~',
        bg: function() {
          return randomElem(['#00003D', '#00004C']);
        },
        fg: function() {
          return randomElem(['#000080', '#000099']);
        }
      },
      shallowWater: {
        char: '=',
        bg: function() {
          return randomElem(['#007AA3', '#008AB8']);
        },
        fg: function() {
          return randomElem(['#19A3D1', '#4DB8DB']);
        }
      },
      sand: {
        char: '.',
        bg: function() {
          return randomElem(['#806600', '#8F6B00']);
        },
        fg: function() {
          return randomElem(['#99997A', '#808066']);
        }
      },
      grassland: {
        char: '.',
        bg: function() {
          return randomElem(['#1e4f3c', '#40783d']);
        },
        fg: function() {
          return randomElem(['#145214', '#1A661A']);
        }
      },
      forest: {
        char: '*',
        bg: function() {
          return randomElem(['#1e4f3c', '#40783d']);
        },
        fg: function() {
          return randomElem(['#0F3D0F', '#145214']);
        }
      },
      mountainRock: {
        char: '#',
        bg: function() {
          return 'gray';
        },
        fg: function() {
          return '#331A00';
        }
      },
      mountainIce: {
        char: '^',
        bg: function() {
          return 'white';
        },
        fg: function() {
          return 'gray';
        }
      }
    };

    for (var j = 0; j < h; j++) {
      for (var i = j%4; i < w; i+=4) {
        var val = noise.get(i/100, j/100);
        // clamp it to be [0.0, 1.0]
        val = (val + 1) / 2;

        var glyph = {};

        if (val < 0.25) {
          glyph = terrainChars.deepWater;
        }
        else if (val < 0.3) {
          glyph = terrainChars.shallowWater;
        }
        else if (val < 0.4) {
          glyph = terrainChars.sand;
        }
        else if (val < 0.6) {
          glyph = terrainChars.grassland;
        }
        else if (val < 0.75) {
          glyph = terrainChars.forest;
        }
        else if (val < 0.9) {
          glyph = terrainChars.mountainRock;
        }       
        else if (val < 1) {
          glyph = terrainChars.mountainIce;
        }

        display.draw(i, j, glyph.char, glyph.bg(), glyph.fg());
      }
    }
  }
};


window.onload = function() {
  if (ROT.isSupported()) {
    Main.init();
    //Game.switchScreen(Game.Screen.startScreen);
  } else {
    alert("The ROT.js library is not supported on your browser.");
  }
};
