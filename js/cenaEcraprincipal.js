var cenaEcraprincipal = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function cenaEcraprincipal() {
        Phaser.Scene.call(this, { key: 'cenaEcraprincipal' });
    },

    preload: function () {
        this.load.image('background', 'assets/imgs/background.jpg');
        this.load.audio('clique', 'assets/music/clique.mp3');
    },

    create: function () {

        if (!this.clique || !this.clique.isPlaying) {
            this.clique = this.sound.add('clique', { loop: true });
            this.clique.play();
        }

        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível 
            duration: 5000,  // Duração do fade-in 
            ease: 'Power1',
        });

        // Configuração do background
        let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
        bg.setScale(this.scale.width / bg.width, this.scale.height / bg.height);

        // Criar o texto no centro da tela
        this.instructionText = this.add.text(160, 57, 'Clica numa tecla para iniciar o jogo', {
            fontSize: '12px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5, 0.5);

        this.blinkEvent = null;
        // Detetar qualquer tecla pressionada
        this.input.keyboard.on('keydown', () => {
            if (!this.blinkEvent) {
                // Iniciar o efeito de piscar
                this.blinkEvent = this.time.addEvent({
                    delay: 200,
                    loop: true,
                    callback: () => {
                        // Alterna a visibilidade do texto
                        this.instructionText.setAlpha(this.instructionText.alpha === 1 ? 0 : 1);
                    }
                });

                // Após o efeito de piscar começar, mudar para a cenaInicial
                this.time.delayedCall(3800, () => {
                    this.blinkEvent.remove(); // Remover o evento de piscar
                    this.instructionText.setAlpha(1); // Garantir que o texto esteja visível
                    this.tweens.add({
                        targets: this.cameras.main,
                        alpha: 0,  // A tela vai se tornar invisível
                        duration: 1000,  // Duração do fade-out 
                        ease: 'Power1',  // Tipo de easing
                        onComplete: () => {
                            this.clique.stop();
                            this.scene.start('cenaInicial'); // Transição para a cena inicial
                        }
                    });
                });
            }
        });
    }
});