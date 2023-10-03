class Bola {
    constructor (px, py, dir, vel) {
        // --posição
        this.x, this.y;

        // --velocidade
        this.myvx;
        this.myvy;

        // --diametro
        this.diam = 16;

        // --imagem da bala
        this.bola = loadImage("media/bola.png");

        // --posicionar a bala
        this.x = px;
        this.y = py;

        // --calcular a velocidade e direção
        this.myvx = vel * cos (dir);
        this.myvy = vel * sin (dir);

    }

    // --moveBala
    moveBola() 
    {
        this.x += this.myvx;
        this.y += this.myvy;

        imageMode(CENTER);
        image(this.bola, this.x, this.y);
        imageMode(CORNER);

        // --verificar se saiu fora do canvas
        if(this.x > width || this.x < 0 || this.y > height || this.y < 0 )
        {
            // --remover a bala
            this.eliminaBola();
        }
            
    }

    // --eliminaBala
    eliminaBola() 
    {
        
        removeBola(this);
    }
}
