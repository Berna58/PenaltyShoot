// Variavel para ao microfone
let mic;

// Variavel para a imagem de fundo
let bg;

// Variavel para a imagem de fundo da entrada
let bg2;

// Variavel para a imagem do guarda redes
let gk;

// Variavel da imagem bola
let bola;

// Variavel para imagem do logo ecgm
let ecgm;

// Variavel do background do menu instruções
let bg3;

// Variavel para a fonte de texto
let fonteTexto;

// Variavel para o som de fundo
let somFundo;

let somIniciar;

let somGolo;

let somEndApito;

let somClaque;

let somContagem;


// Variável para a imagem da mira
let mira;



// Variavel para a posicaço do eixo do x da bola
let posX, posY;
let difCentro = 50;
let asBolas = [];


let timer = 3;


// Variaveis para a posicao, direcao e velocidade do guarda redes
var xPos;
var xDir = 1;
var speed = 1;
var yGk = 300;
var circLargura = 200;
var circAltura = 200;
var circDiam = 16;

// Variavel para as telas
var tela = 0;

// Variavel para definir a posicao do menu
var largura = 200;
var altura = 100;
var xMenu = 600;
var yMenu1 = 250;


// Variaveis da posicao em relaçao ao eixo do x e y do retangulo(baliza)
var xRect = 700;
var yRect = 400;
var rectLargura = 450;
var rectAltura = 230;


// Variavel para a colisao
var colisao = false;

// Variavel para a contagem de golos
var golos = 0;
var gameOver;

// Variaveis botao back
var bLargura = 100;
var bAltura = 50;
var xBotao = 1250;
var yBotao = 20;


let teste = 0;



function preload()
{
    bola = loadImage('media/bola.png');
    gk = loadImage('media/keeper.png');
    bg = loadImage('media/soccerfield.jpg');
    bg2 = loadImage('media/bgentrada.jpg');
    bg3 = loadImage('media/bginstr.jpeg');
    ecgm = loadImage('media/ecgm.png');
    mira = loadImage('media/mira.png');


    fonteTexto = loadFont("assets/LTEnergy.ttf");

    

  // --o audio devera ser pre-carregado para depois ser ativado
   soundFormats('mp3', 'wav', 'ogg');
   
   somFundo = loadSound("audio/ucl.mp3");

   somIniciar = loadSound("audio/apito.mp3");
    
   somGolo = loadSound("audio/cr7.mp3");

   somEndApito = loadSound("audio/endApito.mp3");

   somClaque = loadSound("audio/crowd.wav");

   somContagem = loadSound("audio/fiveseconds.mp3");
}

function setup()
{
    createCanvas(1400, 750);


    mic = new p5.AudioIn();
    mic.start();

    xPos = width / 2;
    xDir = 1;

    somFundo.setVolume(0.05);

    somIniciar.setVolume(0.05);

    somGolo.setVolume(0.10);

    somEndApito.setVolume(0.05);

    somClaque.setVolume(0.05);

    somContagem.setVolume(0.15);

    initJogo();

    initAudio();


}

function initAudio()
{
  somFundo.loop();
}

// --initJogo
function initJogo() 
{
    textAlign(CENTER);

    posX = width / 2.05 - difCentro;
    posY = height / 1 - difCentro;
    golos = 0;

    gameOver = false;

}


function draw()
{
  
  if (!gameOver)
  {
    
   cursor(CROSS);
    // --obter o volume
    let volume = mic.getLevel();

    let threshold = 0.1;

    background(bg2);

    textAlign(CENTER);
    textSize(26);
   

    // Ciclo para a selecão do menu
    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu1 && mouseY < yMenu1 + altura) 
    {
      stroke(255);
      fill(0, 0);
      rect(xMenu, yMenu1, largura, altura, 15);
      if(mouseIsPressed)
      {
        tela = 1;
      }
    }

    fill(255);
    noStroke();
    textFont(fonteTexto);
    text('Iniciar', 700, 308);

    
    textSize(20);
    textFont('Arial Bold');
    text('José Bernardo Silva Azevedo', 159, 680);
    text('23791', 65, 720);
    image(ecgm, 1030, -100);

  
    // Ciclo quando a seleção do menu foi o "Iniciar"
    if (tela==1)
    {
        somFundo.stop();
  
        
        
        background(bg);

        textAlign(CENTER, CENTER);
        textSize(300);
        fill(255, 255, 255,);
        text(timer, width/2 + teste, height/2);


        if (frameCount % 60 == 0 && timer > 0) 
        {
          somContagem.play();
          
          timer --;
        }

        if (timer == 0) 
        {
          somContagem.stop();
           teste = 2000;
         

        // Bola
        if (asBolas.length == 0 )
        {
            
          if (volume > threshold)
          {
            var dx = mouseX - posX - difCentro;
            var dy = mouseY - posY - difCentro;

            var ang = atan2(dy, dx);

            b = new Bola (posX + difCentro, posY + difCentro, ang, 10);
            asBolas.push(b);


          }
        }
       


        // Baliza
        fill(0, 0, 0, 0);
        rect(xRect, yRect, rectLargura, rectAltura);

        movimentaBolas();

        desenhaMira();

        desenhaTexto();


        
        // Guarda Redes
        image(gk, xPos, yGk, circLargura, circAltura);
        this.speed = random(3);
        xPos = xPos + xDir * speed;

        if (xPos > width - 600 || xPos < 420) 
        {
            xDir = -xDir;

        }

        
        
       
        // Botao Back
        if (mouseX > xBotao && mouseX < xBotao + bLargura && mouseY > yBotao && mouseY < yBotao + bAltura) 
        {
          stroke(255);
          fill(0, 0);
          rect(xBotao, yBotao, bLargura, bAltura, 20);
          if(mouseIsPressed)
          {
              tela = 0;
              initAudio();
          }
        }

        fill(255);
        noStroke();
        textSize(26);
        textFont(fonteTexto);
        text('Back', 1300, 45);
        
      }
        
    }
  }
  else
  {
    cursor(CROSS);

    textAlign(CENTER);
    fill(255);
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(0);
    text("GAME  OVER", width/2, height/2);
    text("Clique  no   rato  para  jogar  novamente.", width/2, height/2 + 50);

    if (mouseIsPressed)
    {
      tela = 1;
    }
    
  }

}



// -- desenhaMira
function desenhaMira() {
  imageMode(CENTER);
  image(mira, mouseX, mouseY);
  imageMode(CORNER);
}


// --desenhaTexto
function desenhaTexto() 
{
  fill(255);
  textSize(20);
  text("Golos: " + golos, 100, 50);
  noCursor();
}


function movimentaBolas() 
{
  // --desenhaBalas
  if (asBolas.length > 0)
  {
      for(let i=0; i < asBolas.length; i++)
      {
          aBola = asBolas[i];
          aBola.moveBola();
      }
  
      // --testar a colisao com a bola
      if (asBolas.length > 0)
      {
          for (var k=0; k < asBolas.length; k++)
          {
              abola = asBolas[k];
              
              if (rectBall(xRect, yRect, rectLargura, rectAltura, abola.x, abola.y, abola.diam))
              {
                  removeBola(abola);

                  // --display de um som de colisao
                  somGolo.play();
                  
                  golos++;

                  // --interromper o ciclo for
                  break;
              }
              else if (circuloCirculo(xPos, yGk, circDiam, abola.x, abola.y, abola.diam ))
              {
                removeBola(abola);

                golos--;
                break;
              }
          }
      }
      else
      {
        gameOver = true;
        somEndApito.play();
        golos--;
      }
  }
}


// --removeBala
function removeBola(obj) {
  var index = asBolas.indexOf(obj);
  if (index > -1)
  {
      asBolas.splice(index, 1)
  }
}

// -- keyPressed
function mousePressed() {

  if (gameOver)
  {
      initJogo();
  }
}


// --necessario para ativar o audio apos click no canvas
function touchStarted()
{
    if (getAudioContext().state != 'running')
    {
        getAudioContext().resume();
    }

}