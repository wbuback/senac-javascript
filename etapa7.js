// ============================================================
// ETAPA 7 — ORIENTAÇÃO A OBJETOS (POO / OOP)
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - O que é OOP e por que usar
//   - Classe, constructor, propriedades, métodos
//   - Instâncias com new
//   - Herança com extends e super
//   - Encapsulamento (dados privados com #)
//   - Polimorfismo (sobrescrita de métodos)
// ============================================================

// ------------------------------------------------------------
// POR QUE ORIENTAÇÃO A OBJETOS?
// Sem OOP: dados e funções espalhados, difícil de organizar
// Com OOP: agrupamos dados + comportamentos em um lugar só
// ------------------------------------------------------------

// ------------------------------------------------------------
// 1. CLASSE BÁSICA — Tarefa
// ------------------------------------------------------------

class Tarefa {

  // constructor é chamado automaticamente quando usamos "new Tarefa(...)"
  constructor(titulo, prioridade = "media") {
    // Validação dentro do constructor
    if (!titulo || titulo.trim() === "") {
      throw new Error("Título da tarefa é obrigatório")
    }

    // Propriedades — os dados do objeto
    this.id         = Date.now()          // ID baseado no timestamp
    this.titulo     = titulo.trim()
    this.prioridade = prioridade
    this.concluida  = false               // sempre começa como false
    this.criadaEm   = new Date().toISOString()
  }

  // ------- MÉTODOS — os comportamentos do objeto -------

  // Marcar como concluída
  concluir() {
    this.concluida  = true
    this.concluidaEm = new Date().toISOString()
    return this   // retornar this permite encadear: tarefa.concluir().exibir()
  }

  // Reabrir tarefa
  reabrir() {
    this.concluida   = false
    this.concluidaEm = null
    return this
  }

  // Alterar prioridade
  alterarPrioridade(novaPrioridade) {
    const validas = ["alta", "media", "baixa"]
    if (!validas.includes(novaPrioridade)) {
      throw new Error(`Prioridade inválida: ${novaPrioridade}`)
    }
    this.prioridade = novaPrioridade
    return this
  }

  // Método que gera uma representação em texto — toString
  toString() {
    const status = this.concluida ? "✅" : "⏳"
    return `${status} [${this.prioridade.toUpperCase()}] ${this.titulo}`
  }

  // Método estático — pertence à CLASSE, não ao objeto
  // Chamado como: Tarefa.validarPrioridade("alta")
  static validarPrioridade(valor) {
    return ["alta", "media", "baixa"].includes(valor)
  }
}

// ------------------------------------------------------------
// 2. CRIANDO INSTÂNCIAS com new
// ------------------------------------------------------------

console.log("--- Criando instâncias ---")

const t1 = new Tarefa("Estudar Node.js", "alta")
const t2 = new Tarefa("Escrever README")       // prioridade padrão = "media"
const t3 = new Tarefa("Fazer deploy",    "alta")

console.log(t1.toString())    // ⏳ [ALTA] Estudar Node.js
console.log(t2.toString())    // ⏳ [MEDIA] Escrever README

// Método estático chamado na classe, não no objeto
console.log(Tarefa.validarPrioridade("alta"))  // true
console.log(Tarefa.validarPrioridade("muito")) // false

// Encadeamento de métodos (graças ao return this)
t1.concluir()
console.log(t1.toString())    // ✅ [ALTA] Estudar Node.js

// Erro esperado — título vazio
try {
  const tErro = new Tarefa("")
} catch (erro) {
  console.log(`\nErro esperado: ${erro.message}`)
}

// ------------------------------------------------------------
// 3. HERANÇA com extends — reutilizando e especializando
// ------------------------------------------------------------

console.log("\n--- Herança ---")

// TarefaUrgente herda TUDO de Tarefa e acrescenta comportamentos específicos
class TarefaUrgente extends Tarefa {

  constructor(titulo, prazoEmHoras = 24) {
    // super() chama o constructor da classe pai (Tarefa)
    // OBRIGATÓRIO antes de usar "this" em classes que herdam
    super(titulo, "alta")   // força prioridade "alta"

    this.prazoEmHoras = prazoEmHoras
    this.tipo         = "urgente"
  }

  // Sobrescreve o método toString do pai (polimorfismo)
  toString() {
    return `🚨 URGENTE (${this.prazoEmHoras}h) — ${this.titulo}`
  }

  alertar() {
    console.log(`  ⚠️  ATENÇÃO: "${this.titulo}" precisa ser feita em ${this.prazoEmHoras}h!`)
  }
}

const tuUrgente = new TarefaUrgente("Resolver bug em produção", 4)
console.log(tuUrgente.toString())   // usa o toString de TarefaUrgente
tuUrgente.alertar()
tuUrgente.concluir()               // método herdado de Tarefa
console.log(`Concluída? ${tuUrgente.concluida}`)

// instanceof verifica se um objeto é de uma classe (ou subclasse)
console.log(tuUrgente instanceof TarefaUrgente)  // true
console.log(tuUrgente instanceof Tarefa)          // true — herança!
console.log(t1        instanceof TarefaUrgente)  // false

// ------------------------------------------------------------
// 4. ENCAPSULAMENTO — propriedades privadas com #
// Dados privados só podem ser acessados dentro da classe
// ------------------------------------------------------------

console.log("\n--- Encapsulamento ---")

class Usuario {
  #senha    // declaração de campo privado (sintaxe moderna)
  #tentativas = 0

  constructor(nome, email, senha) {
    this.id    = Date.now()
    this.nome  = nome
    this.email = email
    this.#senha = this.#hashSenha(senha)   // nunca salva em texto puro
  }

  // Método privado — só usável dentro da classe
  #hashSenha(senha) {
    // Em produção real: bcrypt.hashSync(senha, 10)
    return `hash_de_${senha}`
  }

  verificarSenha(tentativa) {
    this.#tentativas++

    if (this.#tentativas > 3) {
      throw new Error("Conta bloqueada após 3 tentativas")
    }

    return this.#hashSenha(tentativa) === this.#senha
  }

  // Getter — acessar dado calculado como se fosse propriedade
  get nomeFormatado() {
    return this.nome.split(" ").map(p => p[0].toUpperCase() + p.slice(1)).join(" ")
  }
}

const usuario = new Usuario("ana paula", "ana@email.com", "minhasenha123")

// console.log(usuario.#senha)  // ❌ SyntaxError — campo privado!
console.log(usuario.email)           // ✅ campo público
console.log(usuario.nomeFormatado)   // ✅ getter
console.log(usuario.verificarSenha("senhaerrada"))  // false
console.log(usuario.verificarSenha("minhasenha123")) // true

// ------------------------------------------------------------
// 5. CLASSE GERENCIADORA — usando as outras classes juntas
// ------------------------------------------------------------

console.log("\n--- Classe GerenciadorDeTarefas ---")

class GerenciadorDeTarefas {
  #tarefas = []    // lista privada

  adicionar(titulo, prioridade) {
    const nova = new Tarefa(titulo, prioridade)
    this.#tarefas.push(nova)
    console.log(`  ➕ Adicionada: ${nova.titulo}`)
    return nova
  }

  adicionarUrgente(titulo, prazo) {
    const nova = new TarefaUrgente(titulo, prazo)
    this.#tarefas.push(nova)
    console.log(`  🚨 Urgente adicionada: ${nova.titulo}`)
    return nova
  }

  concluir(id) {
    const tarefa = this.#tarefas.find(t => t.id === id)
    if (!tarefa) throw new Error(`Tarefa #${id} não encontrada`)
    tarefa.concluir()
    console.log(`  ✅ Concluída: ${tarefa.titulo}`)
  }

  listar() {
    if (this.#tarefas.length === 0) {
      console.log("  Nenhuma tarefa cadastrada.")
      return
    }
    console.log(`  ${this.#tarefas.length} tarefa(s):`)
    this.#tarefas.forEach(t => console.log(`    ${t.toString()}`))
  }

  get resumo() {
    const total      = this.#tarefas.length
    const concluidas = this.#tarefas.filter(t => t.concluida).length
    return { total, concluidas, pendentes: total - concluidas }
  }
}

const gerenciador = new GerenciadorDeTarefas()
const ta = gerenciador.adicionar("Estudar classes JS",   "media")
const tb = gerenciador.adicionar("Criar servidor HTTP",  "alta")
const tc = gerenciador.adicionarUrgente("Resolver bug",  2)

gerenciador.concluir(ta.id)
gerenciador.listar()
console.log("\n  Resumo:", gerenciador.resumo)

console.log("\n--- Fim da Etapa 7 ---")
console.log("Próximo: etapa8.js → Async/Await e Promises")
