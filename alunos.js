
const listaAlunos = []

function validarAluno(nome, email){
    const erros = []

    if(!nome || nome.trim() === '') {
       erros.push('O campo nome é obrigatório!')
    }
    if(!email || email.trim() === '') {
       erros.push('O campo email é obrigatório!')
    }

    if(erros.length > 0) {
        console.log(erros)
        return null
    }

    return {
        id: Date.now(),
        nome: nome.trim(),
        email: email.trim(),
        idade: 0,
        matricula: Math.random(1000,9999),
        faltante: false
    }
}

function adicionarAluno(inputNome, inputEmail, listaAlunos) {
    const alunoExiste = listaAlunos.find(x => x.email === inputEmail);
    
    if(alunoExiste !== null && alunoExiste !== undefined) {
        console.log('Aluno já cadastrado.')
        return
    }

    const aluno = validarAluno(inputNome, inputEmail)
    if(aluno === null) return
    
    listaAlunos.push(aluno)
    console.log(`O aluno "${inputNome}" foi adicionado com sucesso!`)
}

adicionarAluno(
    'João da Silva', 
    'joao.silva@edu.senac.es.br', 
    listaAlunos
)

adicionarAluno(
    'Pedro Manso', 
    'pedro.manso@edu.senac.es.br', 
    listaAlunos
)

const retorno = listaAlunos.find(x => x.email === 'pedro.manso@edu.senac.es.br')
console.log('Filtro: ', retorno)
console.log('Lista: ', listaAlunos)

