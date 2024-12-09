var cenaMundo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function cenaMundo() {
            Phaser.Scene.call(this, { key: 'cenaMundo' });
        },

    preload: function () {
        this.load.audio('jogo', 'assets/music/jogo.mp3');
        this.load.audio('windmill', 'assets/music/windmill.mp3');
        this.load.image('tiles', 'assets/map/spritesheet.png');

        // mapa em formato JSON
        this.load.tilemapTiledJSON('map', 'assets/map/map.json', 16, 16);

        this.load.spritesheet('player', 'assets/RPG_assets.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enemy', 'assets/Full_Sheet_Boy.png',
            { frameWidth: 50, frameHeight: 50 });

    },
    create: function () {
        this.cameras.main.setAlpha(0);  // Inicialmente a tela está invisível
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,  // A tela vai tornar-se totalmente visível
            duration: 5000,  // Duração do fade-in (2 segundos)
            ease: 'Power1',  // Tipo de easing (suaviza a animação)
        });
        // criar o "mundo"
        var mapa = this.make.tilemap({ key: 'map' })

        // -- obter o nome de um tileset
        // -- disponível no ficheiro JSON
        var tiles = mapa.addTilesetImage('Spritesheet', 'tiles');

        // -- obter a layer "Relva"
        var relva = mapa.createLayer('Solo', tiles, 0, 0);

        // -- obter a layer "Obstáculos"
        var obstaculos = mapa.createLayer('Objetos', tiles, 0, 0);

        this.timerText = this.add.text(0, this.cameras.main.height - 20, '00:00', {
            fontSize: '14px',
            fill: '#fff'
        }).setScrollFactor(0);

        if (!this.jogo || !this.jogo.isPlaying) {
            this.jogo = this.sound.add('jogo', { loop: true });
            this.jogo.setVolume(0.5);
            this.jogo.play();
        }

        this.startTime = this.time.now;

        // Atualizar a posição do timer ao redimensionar
        this.scale.on('resize', (gameSize) => {
            this.timerText.setPosition(10, gameSize.height - 30);
        });

        this.muteButton = this.add.text(this.cameras.main.width - 30, 5, '🔊', {
            fontSize: '20px',
            fill: '#fff'
        })
            .setInteractive()
            .setScrollFactor(0);

        this.muteButton.on('pointerdown', () => {
            this.isMuted = !this.isMuted;
            if (this.isMuted) {
                this.jogo.setMute(true);
                this.muteButton.setText('🔇').setStyle({ fill: '#ff0000' }); // Vermelho para mudo
            } else {
                this.jogo.setMute(false);
                this.muteButton.setText('🔊').setStyle({ fill: '#00ff00' }); // Verde para som ativo
            }
        });

        this.player = this.physics.add.sprite(377, 55, 'player', 6); // (177,120) (177, 154) (221, 154) (221, 120) (377, 55)
        this.player.setCollideWorldBounds(true);
        this.player.health = 100;
        this.player.maxHealth = 100;

        this.healthBarBackground = this.add.graphics();
        this.healthBarBackground.fillStyle(0x555555, 1);
        this.healthBarBackground.fillRect(-10, -10, 20, 3);
        this.player.healthBar = this.add.graphics();
        this.updateHealthBar();
        this.player.container = this.add.container(this.player.x, this.player.y, [
            this.healthBarBackground,
            this.player.healthBar,
        ]);

        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.physics.world.bounds.width = mapa.widthInPixels;
        this.physics.world.bounds.height = mapa.heightInPixels;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.inimigos = this.physics.add.group();
        // Colisão entre o player e os inimigos
        this.physics.add.collider(this.player, obstaculos);
        this.physics.add.collider(this.inimigos, obstaculos);
        this.physics.add.collider(this.player, this.inimigos, this.colidirInimigo, null, this);

        this.anims.create({
            key: 'esquerdadireita',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({

            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({

            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'golpe',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),  // Ajuste os frames de acordo com a animação de golpe
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'inimigo_direita',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [4, 5, 6, 7] }), // Frames para andar para a direita
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'inimigo_esquerda',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [4, 5, 6, 7] }), // Frames para andar para a esquerda
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'inimigo_cima',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [16, 17, 18, 19] }), // Frames para andar para cima
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'inimigo_baixo',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [12, 13, 14, 15] }), // Frames para andar para baixo
            frameRate: 10,
            repeat: -1
        });

        // colisao com a layer de obstaculos
        obstaculos.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, obstaculos);
        this.physics.add.collider(this.inimigos, obstaculos);

        this.loadingZone = this.add.zone(200, 136, 47, 48); // Centro da zona e dimensões

        // Habilitar física para a zona
        this.physics.world.enable(this.loadingZone);
        this.loadingZone.body.setAllowGravity(false);
        this.loadingZone.body.setImmovable(true);

        this.loadingZoneOutline = this.add.graphics();
        this.loadingZoneOutline.lineStyle(4, 0x800080, 1); // Linha roxa e mais grossa (4 pixels de espessura)
        this.loadingZoneOutline.strokeRect(200 - 47 / 2, 136 - 48 / 2, 47, 48);

        this.tweens.add({
            targets: this.loadingZoneOutline,
            alpha: 0,
            duration: 300, // Duração do fade
            yoyo: true,
            repeat: -1,
            ease: 'Linear'
        });

        this.musicPlayed = false;

        this.physics.add.overlap(this.player, this.loadingZone, (player, zone) => {
            this.onPlayerInZone(player, zone);
        }, null, this);

        // Criar Barra de Progresso
        this.progressBarBackground = this.add.graphics();
        this.progressBarBackground.fillStyle(0x555555, 1);
        this.progressBarBackground.fillRect(120, this.cameras.main.height - 10, 200, 10).setScrollFactor(0); // Fundo fixo no canto inferior direito

        this.progressBar = this.add.graphics();
        this.progressBar.fillStyle(0x00ff00, 1);
        this.progress = 0; // Progresso inicial

        // Atualizar Barra de Progresso
        this.updateProgressBar = () => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0x00ff00, 1);
            this.progressBar.fillRect(120, this.cameras.main.height - 10, 1 / 10 * this.progress, 10).setScrollFactor(0);
        };

        // Detecção de sobreposição
        this.physics.add.overlap(this.player, this.loadingZone, this.onPlayerInZone, null, this);

        this.onPlayerInZone = function (player, zone) {
            if (!this.musicPlayed) {
                this.sound.play('windmill');
                this.musicPlayed = true;
            }

            if (this.inimigos.getLength() === 0) {  // Só gera inimigos se não houver nenhum
                let numInimigos;
                switch (dificuldade) {
                    case "facil":
                        numInimigos = Phaser.Math.Between(5, 7);
                        break;
                    case "normal":
                        numInimigos = Phaser.Math.Between(9, 12);
                        break;
                    case "dificil":
                        numInimigos = Phaser.Math.Between(13, 16);
                        break;
                    default:
                        numInimigos = 0;
                        break;
                }

                // Gerar inimigos
                for (let i = 0; i < numInimigos; i++) {
                    let x = Phaser.Math.Between(0, this.physics.world.bounds.width);
                    let y = Phaser.Math.Between(0, this.physics.world.bounds.height);
                    let inimigo = this.physics.add.sprite(x, y, 'enemy');
                    inimigo.setScale(0.35);
                    inimigo.setCollideWorldBounds(true);
                    this.inimigos.add(inimigo);
                }
            }

            // Atualizar barra de progresso
            if (this.progress < 2000) {
                this.progress += 1;
                this.updateProgressBar();
            } else {
                this.jogo.stop();
                this.scene.start('cenaGameoverWin');
            }
        };

        let playButton = this.add.text(5, 5, 'Sair', { fontFamily: 'Games', fontSize: '20px', fill: '#000' })
            .setInteractive().setScrollFactor(0);
        playButton.on('pointerdown', () => {
            if (this.jogo && this.jogo.isPlaying) {
                this.jogo.stop();
            }
            this.jogo.stop();
            this.scene.start('cenaInicial');
        });
    },

    colidirInimigo: function (player, inimigo) {
        // Lógica ao colidir com inimigos perde vida
        if (!this.lastDamageTime || this.time.now - this.lastDamageTime > 500) {
            // Aplicar dano apenas se passou 1 segundo desde o último
            const damageAmount = 10; // Dano de cada golpe
            player.health -= damageAmount;
            this.updateHealthBar();

            this.lastDamageTime = this.time.now; // Registar o momento do último dano

            if (player.health <= 0) {
                this.jogo.stop();
                this.scene.start('cenaGameoverLose');
            }
        }
    },

    darGolpe: function () {
        const alcanceGolpe = 20; // Distância do golp

        const golpeArea = new Phaser.Geom.Circle(this.player.x, this.player.y, alcanceGolpe);

        // Verificar se algum inimigo está dentro da área de golpe
        this.inimigos.getChildren().forEach((inimigo) => {
            if (Phaser.Geom.Circle.Contains(golpeArea, inimigo.x, inimigo.y)) {
                inimigo.destroy();
            }
        });

        // Adicionar uma animação de golpe no jogador
        this.player.anims.play('golpe', true);
    },

    createLoadingZone: function () {
        // Criar zona de carregamento e lógica correspondente
        this.loadingZone = this.add.zone(200, 136, 47, 48);
        this.physics.world.enable(this.loadingZone);
        this.loadingZone.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.loadingZone, this.onPlayerInZone, null, this);
    },

    updateInimigos: function () {
        this.inimigos.getChildren().forEach((inimigo) => {
            const dx = this.player.x - inimigo.x;
            const dy = this.player.y - inimigo.y;
            const angle = Math.atan2(dy, dx);

            inimigo.setVelocityX(Math.cos(angle) * 50);
            inimigo.setVelocityY(Math.sin(angle) * 50);

            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    inimigo.anims.play('inimigo_direita', true);
                    inimigo.flipX = false;
                } else {
                    inimigo.anims.play('inimigo_esquerda', true);
                    inimigo.flipX = true;
                }
            } else {
                if (dy > 0) {
                    inimigo.anims.play('inimigo_baixo', true);
                } else {
                    inimigo.anims.play('inimigo_cima', true);
                }
            }
        });
    },

    updateHealthBar: function () {
        this.player.healthBar.clear();
        const healthPercentage = this.player.health / this.player.maxHealth;
        this.player.healthBar.fillStyle(0xff0000, 1);
        this.player.healthBar.fillRect(-10, -10, 20 * healthPercentage, 3);
    },

    update: function () {
        const elapsedSeconds = Math.floor((this.time.now - this.startTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        this.timerText.setText(` ${formattedTime}`);

        this.scale.on('resize', (gameSize) => {
            const { width, height } = gameSize;
            this.progressBarBackground.clear();
            this.progressBarBackground.fillRect(10, height - 40, 200, 20);
            this.updateProgressBar();
        });

        this.updateHealthBar();

        this.player.body.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80);
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80);
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = false;
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(80);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.darGolpe();
        }
        this.updateInimigos();
        this.player.container.setPosition(this.player.x, this.player.y);

    }
});