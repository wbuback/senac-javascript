// ============================================================
// ETAPA 9 — MÓDULOS E ORGANIZAÇÃO DE PROJETO
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - CommonJS: require e module.exports
//   - Exportar funções, objetos e classes
//   - Por que dividir em módulos
//   - Estrutura de pastas de um projeto real
// ============================================================

// ------------------------------------------------------------
// CONTEXTO: Por que usar módulos?
//
// Sem módulos: tudo num arquivo gigante — caos.
// Com módulos: cada arquivo tem UMA responsabilidade clara.
// ------------------------------------------------------------

// ------------------------------------------------------------
// Este arquivo demonstra COMO os módulos funcionam.
// Em um projeto real, cada parte abaixo estaria em arquivo próprio.
// ------------------------------------------------------------

// ─── Simulando: src/utils/validadores.js ─────────────────────

// module.exports exporta o que outros arquivos podem importar
const validadores = {

  titulo(valor) {
    if (!valor || valor.trim() === "")    return "Título obrigatório"
    if (valor.trim().length < 3)          return "Título muito curto (mínimo 3 caracteres)"
    if (valor.trim().length > 100)        return "Título muito longo (máximo 100 caracteres)"
    return null   // null = sem erro
  },

  prioridade(valor) {
    const validas = ["alta", "media", "baixa"]
    if (!validas.includes(valor)) return `Prioridade inválida. Use: ${validas.join(", ")}`
    return null
  },

  email(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(valor)) return "E-mail inválido"
    return null
  }
}

// module.exports = validadores   // <-- em arquivo real

// ─── Simulando: src/models/Tarefa.js ─────────────────────────

class Tarefa {
  constructor({ titulo, prioridade = "media", usuarioId }) {
    this.id         = Date.now()
    this.titulo     = titulo.trim()
    this.prioridade = prioridade
    this.usuarioId  = usuarioId
    this.concluida  = false
    this.criadaEm   = new Date().toISOString()
  }

  concluir()  { this.concluida = true;  return this }
  reabrir()   { this.concluida = false; return this }

  toJSON() {
    // Controla o que é exportado quando faz JSON.stringify(tarefa)
    return {
      id:         this.id,
      titulo:     this.titulo,
      prioridade: this.prioridade,
      concluida:  this.concluida,
      criadaEm:   this.criadaEm
    }
  }
}

// module.exports = Tarefa  // <-- em arquivo real

// ─── Simulando: src/repositories/tarefaRepository.js ─────────
// Repository: responsável por persistir e buscar dados
// Isso abstrai o banco de dados do resto do código

class TarefaRepository {
  #banco = []    // em produção: conexão com banco real

  async criar(dados) {
    const erro = validadores.titulo(dados.titulo)
    if (erro) throw new Error(erro)

    const tarefa = new Tarefa(dados)
    this.#banco.push(tarefa)
    return tarefa
  }

  async buscarPorId(id) {
    return this.#banco.find(t => t.id === id) || null
  }

  async listarPorUsuario(usuarioId) {
    return this.#banco.filter(t => t.usuarioId === usuarioId)
  }

  async atualizar(id, campos) {
    const tarefa = await this.buscarPorId(id)
    if (!tarefa) throw new Error(`Tarefa #${id} não encontrada`)

    Object.assign(tarefa, campos)   // aplica só os campos enviados
    return tarefa
  }

  async remover(id) {
    const indice = this.#banco.findIndex(t => t.id === id)
    if (indice === -1) throw new Error(`Tarefa #${id} não encontrada`)

    this.#banco.splice(indice, 1)
    return true
  }
}

// ─── Simulando: src/services/tarefaService.js ─────────────────
// Service: regras de negócio da aplicação

class TarefaService {
  #repo

  constructor(repository) {
    this.#repo = repository   // injeção de dependência
  }

  async criarTarefa(titulo, prioridade, usuarioId) {
    // Validar
    const erroTitulo     = validadores.titulo(titulo)
    const erroPrioridade = validadores.prioridade(prioridade)

    if (erroTitulo)     throw new Error(erroTitulo)
    if (erroPrioridade) throw new Error(erroPrioridade)

    // Salvar
    const tarefa = await this.#repo.criar({ titulo, prioridade, usuarioId })
    console.log(`  [Service] Tarefa criada: #${tarefa.id}`)
    return tarefa
  }

  async concluirTarefa(id) {
    const tarefa = await this.#repo.buscarPorId(id)
    if (!tarefa) throw new Error(`Tarefa #${id} não encontrada`)

    if (tarefa.concluida) {
      throw new Error("Tarefa já está concluída")
    }

    await this.#repo.atualizar(id, { concluida: true })
    console.log(`  [Service] Tarefa #${id} marcada como concluída`)
    return tarefa
  }

  async listarPendentes(usuarioId) {
    const todas = await this.#repo.listarPorUsuario(usuarioId)
    return todas.filter(t => !t.concluida)
  }
}

// ─── Simulando: src/controllers/tarefaController.js ──────────
// Controller: recebe a requisição HTTP, chama o service, responde

class TarefaController {
  #service

  constructor(service) {
    this.#service = service
  }

  // Em Express real: async (req, res) => { ... }
  async criar(req) {
    try {
      const { titulo, prioridade } = req.body
      const { usuarioId }          = req.usuario   // token JWT decodificado

      const tarefa = await this.#service.criarTarefa(titulo, prioridade, usuarioId)

      return { status: 201, body: tarefa.toJSON() }

    } catch (erro) {
      return { status: 400, body: { erro: erro.message } }
    }
  }

  async listarPendentes(req) {
    try {
      const { usuarioId } = req.usuario
      const pendentes     = await this.#service.listarPendentes(usuarioId)

      return { status: 200, body: pendentes.map(t => t.toJSON()) }

    } catch (erro) {
      return { status: 500, body: { erro: "Erro interno" } }
    }
  }
}

// ─── Demonstração: tudo funcionando junto ─────────────────────

async function demonstracao() {
  console.log("\n=== Demonstração da arquitetura em camadas ===\n")

  // Montar as dependências (em produção: feito no arquivo principal)
  const repo        = new TarefaRepository()
  const service     = new TarefaService(repo)
  const controller  = new TarefaController(service)

  // Simulando uma requisição HTTP POST /tarefas
  const req1 = {
    body:    { titulo: "Estudar módulos Node.js", prioridade: "alta" },
    usuario: { usuarioId: 1 }
  }

  const resposta1 = await controller.criar(req1)
  console.log(`\nResposta POST /tarefas: status ${resposta1.status}`)
  console.log("Body:", JSON.stringify(resposta1.body, null, 2))

  // Simulando POST com dados inválidos
  const req2 = {
    body:    { titulo: "", prioridade: "extrema" },
    usuario: { usuarioId: 1 }
  }

  const resposta2 = await controller.criar(req2)
  console.log(`\nResposta POST inválida: status ${resposta2.status}`)
  console.log("Body:", resposta2.body)

  // Criando mais tarefas e listando
  await controller.criar({ body: { titulo: "Fazer deploy", prioridade: "media" }, usuario: { usuarioId: 1 } })
  await controller.criar({ body: { titulo: "Escrever testes", prioridade: "baixa" }, usuario: { usuarioId: 1 } })

  const listagem = await controller.listarPendentes({ usuario: { usuarioId: 1 } })
  console.log(`\nGET /tarefas/pendentes: ${listagem.body.length} tarefa(s)`)
  listagem.body.forEach(t => console.log(`  - [${t.prioridade}] ${t.titulo}`))
}

demonstracao()

// ------------------------------------------------------------
// ESTRUTURA REAL DO PROJETO TASKSCHOOL
// ------------------------------------------------------------

/*
  taskschool-backend/
  │
  ├── src/
  │   ├── controllers/
  │   │   ├── tarefas.controller.js    ← recebe req/res
  │   │   └── usuarios.controller.js
  │   │
  │   ├── services/
  │   │   ├── tarefas.service.js       ← regras de negócio
  │   │   └── usuarios.service.js
  │   │
  │   ├── repositories/
  │   │   └── tarefas.repository.js    ← acesso ao banco
  │   │
  │   ├── models/
  │   │   └── Tarefa.js                ← estrutura dos dados
  │   │
  │   ├── routes/
  │   │   ├── tarefas.routes.js        ← define as URLs
  │   │   └── usuarios.routes.js
  │   │
  │   ├── middlewares/
  │   │   ├── autenticar.js            ← verifica JWT
  │   │   └── tratarErros.js           ← middleware global de erro
  │   │
  │   ├── utils/
  │   │   └── validadores.js           ← funções auxiliares
  │   │
  │   └── database/
  │       └── conexao.js               ← conexão com o banco
  │
  ├── .env                              ← variáveis de ambiente
  ├── .gitignore
  ├── index.js                          ← ponto de entrada
  └── package.json
*/

console.log("\n--- Fim da Etapa 9 ---")
console.log("Projeto de exemplos concluído! 🎉")
console.log("\nOrdem de estudo:")
console.log("  etapa1.js → Algoritmos e pensamento computacional")
console.log("  etapa2.js → Variáveis, tipos e operadores")
console.log("  etapa3.js → Condicionais (if/else/switch)")
console.log("  etapa4.js → Loops e métodos de array")
console.log("  etapa5.js → Funções")
console.log("  etapa6.js → Objetos e arrays avançados")
console.log("  etapa7.js → Orientação a Objetos (classes)")
console.log("  etapa8.js → Async/Await e Promises")
console.log("  etapa9.js → Módulos e organização de projeto")
