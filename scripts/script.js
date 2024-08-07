let canvas = document.querySelector("canvas")
let ctx = canvas.getContext('2d')

let botaoMudarSinal = document.querySelector('.botaoMudarSinal')
let rangeDissipacao = document.querySelector('.range')
let labelDissipacao = document.querySelector('#labelDissipacao')

canvas.width = 1000
canvas.height = 500

let raio = 15
let sinalBotao = 1;
let dissipacaoParede = 1
const k = 10000

let particulas = []

let retaModuloPrevisao = {
    visivel: false,
    inicio:{
        x:0,
        y:0
    },
    fim:{
        x:0,
        y:0
    }
}

function posicaoDoMouse(canvas, event){
    let rect = canvas.getBoundingClientRect()
    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function calcularVelocidade(){
    for (let i = 0; i < particulas.length; i++) {
        for(let j=0; j < particulas.length; j++){
            if(j!=i){
                let distX = particulas[j].x-particulas[i].x
                let distY = particulas[j].y-particulas[i].y
                let distGeral = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))//sempre positivo

                if (distGeral<raio*2){
                    continue
                }

                let forca = -(k*particulas[i].sinal*particulas[j].sinal)/(distGeral*distGeral)
                let cos = distX / distGeral
                let sen = distY / distGeral

                particulas[i].velocidadeX += forca * cos
                particulas[i].velocidadeY += forca * sen
                

            }
        }
    }
}

function calcularColisoes() {
    particulas.forEach(particula1 => {
        //colisao parede

        if(!estaNoIntervalo(particula1.x + particula1.velocidadeX, 0, canvas.width, raio)){
            particula1.velocidadeX *= -1*dissipacaoParede
            
        }
        if(!estaNoIntervalo(particula1.y + particula1.velocidadeY, 0, canvas.height, raio)){
                particula1.velocidadeY *= -1*dissipacaoParede
            }
        
        
        //colisao com particulas
        particulas.forEach(particula2 =>{
            if(particula1!=particula2){
                if(seColisao(particula1.x + particula1.velocidadeX, particula1.y + particula1.velocidadeY, particula2)){
                    // while(!seColisao(
                    //         particula1.x + particula1.velocidadeX/particula1.velocidadeX, 
                    //         particula1.y + particula1.velocidadeY/particula1/velocidadeY,
                    //         particula2
                    //     ))
                    //     {
                    //         particula1.velocidadeX/=particula1.velocidadeX
                    //         particula1.velocidadeY/=particula1.velocidadeY
                    //     }

                    // particula1.velocidadeX *= -1*dissipacaoParede
                    // particula1.velocidadeY *= -1*dissipacaoParede

                    const backupVelocidade = [particula1.velocidadeX, particula1.velocidadeY]

                    particula1.velocidadeX = particula1.velocidadeX - (1+ dissipacaoParede)/2 * (particula1.velocidadeX - particula2.velocidadeX)

                    particula1.velocidadeY = particula1.velocidadeY - (1+ dissipacaoParede)/2 * (particula1.velocidadeY - particula2.velocidadeY)



                    particula2.velocidadeX = particula2.velocidadeX
                    particula2.velocidadeY = backupVelocidade[1]*dissipacaoParede

                }
            }
        })
    })
}

function estaNoIntervalo(num, min, max,raio=0) {
    return (num-raio > min && num+raio < max)
}

function seColisao(x, y, objeto) {
    return(
        Math.sqrt(Math.pow(x-objeto.x,2) + Math.pow(y-objeto.y,2)) < raio*2
    )
}

function mudarSinal() {
    sinalBotao *= -1
    sinalBotao == 1 ? botaoMudarSinal.style.backgroundColor = 'red' : botaoMudarSinal.style.backgroundColor = 'blue'
}

function mudarDissipacao() {
    dissipacaoParede = rangeDissipacao.value
    labelDissipacao.innerHTML = rangeDissipacao.value

}

function criarParticula({posicao, velocidade, sinal}) {
    particulas.push({
        x: posicao.x,
        y: posicao.y,
        velocidadeX: velocidade.x,
        velocidadeY: velocidade.y,
        sinal: sinal
    })
}

function renderizar(){
    window.requestAnimationFrame(renderizar)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(retaModuloPrevisao.visivel){
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.moveTo(retaModuloPrevisao.inicio.x, retaModuloPrevisao.inicio.y)
        ctx.lineTo(retaModuloPrevisao.fim.x, retaModuloPrevisao.fim.y)
        ctx.stroke()

    }

    calcularVelocidade()
    calcularColisoes()

    particulas.forEach(particula => { 
        
        particula.x += particula.velocidadeX
        particula.y += particula.velocidadeY


        ctx.beginPath();
        particula.sinal == 1 ? ctx.fillStyle = 'red' : ctx.fillStyle = 'blue'
        ctx.arc(particula.x, particula.y, raio, 0, 2*Math.PI)
        ctx.fill()
    })
}