var cenaGameoverWin = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function cenaGameOver() {
        Phaser.Scene.call(this, { key: 'cenaGameoverWin' });
    },

    preload: function () {
        this.load.audio('final', 'assets/music/final.mp3');
    },

    create: function () {
        if (!this.final || !this.final.isPlaying) {
            this.final = this.sound.add('final', { loop: true });
            this.final.play();
        }

        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível 
            duration: 5000,  // Duração do fade-in 
            ease: 'Power1',
        });

        this.add.text(100, 0, 'VILLAGE COMPROMISED', { fontFamily: 'Button', fontSize: '12px', fill: '#FFD700' });
        this.add.text(110, 50, 'MISSÃO COMPLETA', { fontFamily: 'Button', fontSize: '12px', fill: '#00ff00' });
        this.add.text(0, 75, 'Conseguiste ligar o moinho e derrotar os chefes ', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 85, 'pretolíferos que queriam transformar-la numa área', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 95, 'de petróleo.', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 105, 'A vila está salva e a funcionar através dos seus', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 115, 'recursos autónomos graças a ti.', { fontSize: '10px', fill: '#fff' });

        this.add.text(110, 150, 'ÉS O HERÓI DA VILA!', { fontFamily: 'Button', fontSize: '12px', fill: '#fff' });

        let button1 = this.add.image(172, 163, 'button1').setOrigin(0, 0).setScale(0.26);
        button1 = this.add.image(69, 163, 'button1').setOrigin(0, 0).setScale(0.26);

        let texto = this.add.text(197, 180, 'Menu', { fontFamily: 'Games', fontSize: '10px', fill: '#fff' }).setInteractive();
        texto.on('pointerdown', () => {
            if (this.final && this.final.isPlaying) {
                this.final.stop();
            }
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

        let texto2 = this.add.text(73, 183, 'Jogar Novamente', { fontFamily: 'Games', fontSize: '8px', fill: '#fff' }).setInteractive();
        texto2.on('pointerdown', () => {
            if (this.final && this.final.isPlaying) {
                this.final.stop();
            }
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível 
                duration: 2000,  // Duração do fade-out 
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaHistoria');
                }
            });
        });
    }
});