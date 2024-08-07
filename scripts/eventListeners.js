addEventListener("keypress", (e) =>{
    if(e.key == 'q'){
        mudarSinal()
    }
})

// canvas.addEventListener("click", function(event){
//     let mousePos = posicaoDoMouse(canvas, event)

//     criarParticula({
//         posicao: {
//             x: mousePos.x,
//             y: mousePos.y,  
//         },
//         velocidade:{
//             x: 0,
//             y: 0
//         },
//         sinal: sinalBotao
//     })

// })

botaoMudarSinal.addEventListener("click", mudarSinal)

canvas.addEventListener('mousedown', (e)=>{
    let mousePos = posicaoDoMouse(canvas, e)

    retaModuloPrevisao.visivel = true
    retaModuloPrevisao.inicio.x = mousePos.x
    retaModuloPrevisao.inicio.y = mousePos.y
    retaModuloPrevisao.fim.x = mousePos.x
    retaModuloPrevisao.fim.y = mousePos.y
})

canvas.addEventListener('mousemove', (e)=>{
    if(retaModuloPrevisao.visivel){
        const mousePos = posicaoDoMouse(canvas, e)

        retaModuloPrevisao.fim.x = mousePos.x
        retaModuloPrevisao.fim.y = mousePos.y
    }
})

canvas.addEventListener('mouseup', (e)=>{
    if(retaModuloPrevisao.visivel){
        const mousePos = posicaoDoMouse(canvas, e)

        retaModuloPrevisao.visivel = false

        const proporcaoVelocidade = 0.05

        criarParticula({
            posicao: {
                x: retaModuloPrevisao.inicio.x,
                y: retaModuloPrevisao.inicio.y,  
            },
            velocidade:{
                x: (retaModuloPrevisao.inicio.x - retaModuloPrevisao.fim.x)*proporcaoVelocidade,
                y: (retaModuloPrevisao.inicio.y - retaModuloPrevisao.fim.y)*proporcaoVelocidade
            },
            sinal: sinalBotao
        })


    }
})

function criarPrevisao(e){
    
}