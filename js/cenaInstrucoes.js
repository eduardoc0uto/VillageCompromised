var cenaInstrucoes = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function cenaInstrucoes() {
        Phaser.Scene.call(this, { key: 'cenaInstrucoes' });
    },

    preload: function () {
        this.load.image('background', 'assets/imgs/background.jpg');
        this.load.image('button1', 'assets/imgs/button.png');
        this.load.image('spacebar', 'assets/imgs/spacebar.webp');
        this.load.image('arrows', 'assets/imgs/arrows.png')
        this.load.image('moinho', 'assets/imgs/moinho.png')
        this.load.image('healthbar', 'assets/imgs/healthbar.png')
        this.load.image('progressBar', 'assets/imgs/progressBar.png')
    },

    create: function () {
        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível
            duration: 5000,  // Duração do fade-in (2 segundos)
            ease: 'Power1',
        });

        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        bg.setAlpha(0.5);

        let spacebar = this.add.image(70, 90, 'spacebar').setOrigin(0, 0);
        spacebar.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        let scaleX = this.scale.width / bg.width;
        let scaleY = this.scale.height / bg.height;
        spacebar.setScale(scaleX, scaleY);

        let arrows = this.add.image(80, 150, 'arrows').setOrigin(0, 0);
        arrows.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        scaleX = this.scale.width / bg.width;
        scaleY = this.scale.height / bg.height;
        arrows.setScale(scaleX, scaleY);

        let moinho = this.add.image(80, 40, 'moinho').setOrigin(0, 0);
        moinho.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        scaleX = this.scale.width / bg.width * 1.2;
        scaleY = this.scale.height / bg.height * 1.2;
        moinho.setScale(scaleX, scaleY);

        let healthbar = this.add.image(83, 190, 'healthbar').setOrigin(0, 0);
        healthbar.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        scaleX = this.scale.width / bg.width * 2.5;
        scaleY = this.scale.height / bg.height * 2.5;
        healthbar.setScale(scaleX, scaleY);

        let progressBar = this.add.image(80, 228, 'progressBar').setOrigin(0, 0);
        progressBar.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        scaleX = this.scale.width / bg.width;
        scaleY = this.scale.height / bg.height;
        progressBar.setScale(scaleX, scaleY);

        let button1 = this.add.image(-6, -12, 'button1').setOrigin(0, 0);
        button1.setScale(this.scale.width / bg.width, this.scale.height / bg.height);
        scaleX = this.scale.width / bg.width * 2.1;
        scaleY = this.scale.height / bg.height;
        button1.setScale(scaleX, scaleY);

        this.add.text(140, 125, 'Usa o espaço para golpear \nos inimigos.', {
            fontSize: '10px',
            color: '#fff'
        });

        this.add.text(107, 157, ' Usa as setas para mover o jogador. \n Evita obstáculos.', {
            fontSize: '10px',
            color: '#fff'
        });

        this.add.text(155, 219, ' Carrega a barra de \n carregamento do moinho.', {
            fontSize: '10px',
            color: '#fff'
        });

        this.add.text(105, 191, ' Não deixes que os inimigos ataquem \n para não esgotar a barra de vida.', {
            fontSize: '10px',
            color: '#fff'
        });

        this.add.text(115, 55, ' Dirige-te para o \n moinho e fica dentro da \n zona roxa para o carregar.', {
            fontSize: '9px',
            color: '#fff'
        });


        let backButton = this.add.text(2, 0, 'Menu Principal', { fontSize: '10px', fill: '#f00' }).setInteractive();
        backButton.on('pointerdown', () => {
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível 
                duration: 2000,  // Duração do fade-out 
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaInicial');
                }
            });
        });
    }
});