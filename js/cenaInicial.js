var cenaInicial = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function cenaInicial() {
        Phaser.Scene.call(this, { key: 'cenaInicial' });
    },

    preload: function () {
        this.load.image('background', 'assets/imgs/background.jpg');
        this.load.image('button1', 'assets/imgs/button.png');
        this.load.audio('theme', 'assets/music/theme.mp3');
    },

    create: function () {
        if (!this.theme || !this.theme.isPlaying) {
            this.theme = this.sound.add('theme', { loop: true });
            this.theme.play();
        }
        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível 
            duration: 5000,  // Duração do fade-in 
            ease: 'Power1',  // Tipo de easing 
        });

        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setScale(this.scale.width / bg.width, this.scale.height / bg.height);

        let button1 = this.add.image(133, 129, 'button1').setOrigin(0, 0);
        button1.setScale(this.scale.width / bg.width, this.scale.height / bg.height);

        button1 = this.add.image(133, 150, 'button1').setOrigin(0, 0);
        button1.setScale(this.scale.width / bg.width, this.scale.height / bg.height);

        this.add.text(100, 110, 'VILLAGE COMPROMISED', { fontFamily: 'Button', fontSize: '12px', fill: '#FFD700' });

        let playButton = this.add.text(143, 141, 'Jogar', { fontFamily: 'Games', fontSize: '10px', fill: '#fff' }).setInteractive();
        playButton.on('pointerdown', () => {
            if (this.theme && this.theme.isPlaying) {
                this.theme.stop();
            }
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível 
                duration: 2000,  // Duração do fade-out 
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out, inicia a cena do jogo
                    this.scene.start('cenaHistoria');
                }
            });
        });

        let instructionsButton = this.add.text(135, 165, 'Instruções', { fontSize: '7px', fill: '#fff' }).setInteractive();
        instructionsButton.on('pointerdown', () => {
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível 
                duration: 2000,  // Duração do fade-out 
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaInstrucoes');
                }
            });
        });
    }
});