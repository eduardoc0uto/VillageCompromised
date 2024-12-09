var config = {
    typeof: Phaser.CANVAS,
    parent: 'conteudo',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        cenaEcraprincipal, cenaInicial, cenaInstrucoes, cenaMundo, cenaGameoverWin, cenaHistoria, cenaGameoverLose
    ]
};

var dificuldade = "normal";

var game = new Phaser.Game(config);