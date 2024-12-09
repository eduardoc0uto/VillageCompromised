var cenaGameoverLose = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function cenaGameOver() {
        Phaser.Scene.call(this, { key: 'cenaGameoverLose' });
    },

    preload: function() {
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
            ease: 'Power1',  // Tipo de easing
        });

        this.add.text(100, 0, 'VILLAGE COMPROMISED', { fontFamily: 'Button', fontSize: '12px', fill: '#FFD700' });
        this.add.text(116, 50, 'MISSÃO FALHADA', { fontFamily: 'Button', fontSize: '12px', fill: '#FF0000' });
        this.add.text(0, 75, 'Não foste capaz de impedir os chefes petrolíferos ', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 85, 'que invadiram a vila. Todos os habitantes foram', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 95, 'obrigados a abandonar as suas casas, e o que antes', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 105, 'era a vila é agora uma área de escavação de petróleo.', { fontSize: '10px', fill: '#fff' });

        this.add.text(65, 145, 'Dica: Joga numa dificuldade mais fÁcil', { fontFamily: "Games", fontSize: '10px', fill: '#fff' });


        let button1 =  this.add.image(172, 163, 'button1').setOrigin(0, 0).setScale(0.26);
        button1 =  this.add.image(69, 163, 'button1').setOrigin(0, 0).setScale(0.26);

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
                    // Após o fade-out, inicia a cena do jogo
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
                    // Após o fade-out, inicia a cena do jogo
                    this.scene.start('cenaHistoria');
                }
            });
        });
    }
});