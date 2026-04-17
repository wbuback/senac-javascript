const gerarMocks = (quantidade) => {
    const marcas = ['Volkswagen', 'Chevrolet', 'Fiat', 'Toyota', 'Ford', 'Honda']
    const modelos = {
        'Volkswagen': ['Polo', 'T-Cross', 'Nivus', 'Tera'],
        'Chevrolet': ['Onix', 'Tracker', 'S10'],
        'Fiat': ['Argo', 'Pulse', 'Toro', 'Mobi'],
        'Toyota': ['Corolla', 'Hilux', 'SW4'],
        'Ford': ['Ranger', 'Territory', 'Maverick'],
        'Honda': ['City', 'Civic', 'HRV']
    }

    return Array.from({ length: quantidade }, (_, i) => {
        const marca = marcas[i % marcas.length]
        const marcaModelos = modelos[marca]
        return {
            marca,
            modelo: marcaModelos[i % marcaModelos.length],
            ano: 2020 + (i % 7),
            placa: `ABC-${1000 + i}`,
            valor: 0,
            acessorios: ['Película', 'Antena', 'Multimídia']
        }
    })
}

const carros = gerarMocks(100)

const modelos = carros.map(x => x.placa)
console.log(modelos)

const filtrado = carros.filter(x => x.ano <= 2021)
console.log(filtrado)

const buscado = carros.find(x => x.placa === 'ABC-1010')
console.log(buscado)

buscado.acessorios = ['Cockpit']

carros.forEach((objeto, indice) => {
    const itens = objeto.acessorios.map(x => x).toString()
    console.log(`Carro ${indice+1}: ${objeto.modelo} (${itens})`)
})

function buscarCarroPorPlaca(carros, placa) {
    const carro = carros.find(c => c.placa === placa)

    if (!carro || carro === null) {
        console.log('A placa ' + placa + ' não está cadastrada.')
        return null
    }
    return carro
}

console.log('\n------------- CARROS -------------')
const qtdCarros = carros.length
console.log('Estoque: ', qtdCarros)

const carroFiltradoPorPlaca = buscarCarroPorPlaca(carros, 'ABC-1010')
const carroPrecificado = carroFiltradoPorPlaca 
    ? carroFiltradoPorPlaca.valor = 50000 
    : console.log('Carro não encontrado')

console.log('Carro precificado: ', carroPrecificado)

const qtdVw = carros.filter(c => c.marca === 'Volkswagen').length
console.log('Estoque VW: ', qtdVw)