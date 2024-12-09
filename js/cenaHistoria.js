var cenaHistoria = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { key: 'cenaHistoria' });
    },

    preload: function () {
        this.load.image('button1', 'assets/imgs/button.png');
    },

    create: function () {
        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível 
            duration: 5000,  // Duração do fade-in
            ease: 'Power1',
        });

        this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000).setOrigin(0, 0);
        this.add.text(100, 0, 'VILLAGE COMPROMISED', { fontFamily: 'Button', fontSize: '12px', fill: '#FFD700' });
        this.add.text(0, 50, 'Durante anos esta vila só conhecia paz e prosperava ', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 60, 'através dos seus próprios recursos de forma autónoma.', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 70, 'O moinho principal da vila alimenta as casas de quem', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 80, 'a habita, mas para este funcionar foste encarregue de', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 90, 'o ligar.', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 100, 'Porém existem chefes petrolíferos que querem ', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 110, 'transformar a vila numa área de petróleo e impedem-te de ligar o moinho. Impede-os antes que eles te impeçam.', { fontSize: '10px', fill: '#fff' });
        this.add.text(0, 120, 'de ligar o moinho.', { fontSize: '10px', fill: '#fff' });
        this.add.text(63, 145, 'Impede-os antes que eles te impeçam.', { fontFamily: 'Button', fontSize: '15px', fill: '#FF0000' });

        let button1 = this.add.image(125, 187, 'button1').setOrigin(0, 0).setScale(0.21);
        button1 = this.add.image(42, 187, 'button1').setOrigin(0, 0).setScale(0.21);
        button1 = this.add.image(208, 187, 'button1').setOrigin(0, 0).setScale(0.21);

        this.add.text(113.5, 177, 'Escolhe a dificuldade:', { fontFamily: 'Button', fontSize: '12px', fill: '#fff' });

        // Adiciona o botão de começar o jogo
        let texto = this.add.text(138, 200, 'Normal', { fontFamily: 'Games', fontSize: '10px', fill: '#fff' }).setInteractive();
        texto.on('pointerdown', () => {
            dificuldade = "normal";
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível
                duration: 2000,  // Duração do fade-out
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaMundo');
                }
            });
        });

        let texto2 = this.add.text(60, 200, 'FÁcil', { fontFamily: 'Games', fontSize: '10px', fill: '#fff' }).setInteractive();
        texto2.on('pointerdown', () => {
            dificuldade = "facil";
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível
                duration: 2000,  // Duração do fade-out
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaMundo');
                }
            });
        });

        let texto3 = this.add.text(224, 200, 'DifÍcil', { fontFamily: 'Games', fontSize: '10px', fill: '#fff' }).setInteractive();
        texto3.on('pointerdown', () => {
            dificuldade = "dificil"
            this.tweens.add({
                targets: this.cameras.main,
                alpha: 0,  // A tela ficará invisível
                duration: 2000,  // Duração do fade-out 
                ease: 'Power2',
                onComplete: () => {
                    // Após o fade-out inicia a cena do jogo
                    this.scene.start('cenaMundo');
                }
            });
        });
    }
});
