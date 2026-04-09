// ============================================================
// ETAPA 5 — FUNÇÕES
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - function declaration vs function expression vs arrow function
//   - Parâmetros, valores padrão e retorno
//   - Escopo (local vs global)
//   - Funções de ordem superior (HOF)
//   - Funções puras vs funções com efeitos colaterais
// ============================================================

// ------------------------------------------------------------
// 1. TRÊS FORMAS DE DECLARAR UMA FUNÇÃO
// ------------------------------------------------------------

// 1a. Function Declaration — pode ser chamada ANTES de ser declarada (hoisting)
function saudar(nome) {
  return `Olá, ${nome}! Bem-vindo ao Taskschool.`
}
console.log(saudar("Ana"))

// 1b. Function Expression — atribuída a uma variável, NÃO tem hoisting
const calcularProgresso = function(concluidas, total) {
  return ((concluidas / total) * 100).toFixed(1) + "%"
}
console.log(calcularProgresso(3, 10))  // "30.0%"

// 1c. Arrow Function (⇒) — forma curta, muito usada no dia a dia
const formatarTitulo = (titulo) => titulo.trim().toUpperCase()
console.log(formatarTitulo("  estudar express  "))  // "ESTUDAR EXPRESS"

// Arrow function com múltiplas linhas precisa de { } e return explícito
const criarTarefa = (titulo, prioridade = "media") => {
  if (!titulo) throw new Error("Título obrigatório")

  return {
    id:         Date.now(),
    titulo:     titulo.trim(),
    prioridade,        // shorthand: prioridade: prioridade
    concluida:  false,
    criadaEm:   new Date().toISOString()
  }
}

// ------------------------------------------------------------
// 2. PARÂMETROS E VALORES PADRÃO
// ------------------------------------------------------------

console.log("\n--- Valores padrão ---")

// Se prioridade não for informada, usa "media"
const t1 = criarTarefa("Estudar Node.js")
const t2 = criarTarefa("Deploy urgente", "alta")

console.log(t1.titulo, "→ prioridade:", t1.prioridade)  // media
console.log(t2.titulo, "→ prioridade:", t2.prioridade)  // alta

// Múltiplos parâmetros com padrão
function buscarTarefas(lista, { prioridade = null, concluida = null } = {}) {
  return lista.filter(t => {
    if (prioridade !== null && t.prioridade !== prioridade) return false
    if (concluida  !== null && t.concluida  !== concluida)  return false
    return true
  })
}

// ------------------------------------------------------------
// 3. ESCOPO — onde a variável existe
// ------------------------------------------------------------

console.log("\n--- Escopo ---")

const nomeGlobal = "Taskschool"  // acessível em qualquer lugar

function exemploEscopo() {
  const nomeLocal = "Ana"        // só existe dentro desta função

  console.log(nomeGlobal)        // ✅ acessa a variável global
  console.log(nomeLocal)         // ✅ acessa a variável local
}

exemploEscopo()
// console.log(nomeLocal)        // ❌ ReferenceError: nomeLocal is not defined

// Escopo de bloco com let/const
for (let i = 0; i < 3; i++) {
  // i existe só dentro do for
}
// console.log(i)  // ❌ ReferenceError: i é local ao bloco do for

// ------------------------------------------------------------
// 4. FUNÇÕES DE ORDEM SUPERIOR (Higher-Order Functions)
// Funções que recebem OU retornam outras funções
// ------------------------------------------------------------

console.log("\n--- Funções de ordem superior ---")

// Exemplo: uma função que recebe outra como parâmetro
function aplicarEmCadaTarefa(lista, acao) {
  lista.forEach(tarefa => acao(tarefa))
}

const minhaLista = [
  { id: 1, titulo: "Estudar Node.js",  concluida: false },
  { id: 2, titulo: "Criar API REST",   concluida: false },
  { id: 3, titulo: "Fazer deploy",     concluida: true  },
]

// Passamos uma função como argumento (callback)
aplicarEmCadaTarefa(minhaLista, (t) => {
  console.log(`  ${t.concluida ? "✅" : "⏳"} ${t.titulo}`)
})

// Exemplo: função que RETORNA outra função (factory/closure)
function criarFiltro(campo, valor) {
  // Retorna uma função que filtra pelo campo e valor especificados
  return function(tarefa) {
    return tarefa[campo] === valor
  }
}

const filtroAlta   = criarFiltro("prioridade", "alta")
const filtroPendente = criarFiltro("concluida", false)

// Agora podemos reutilizar os filtros
const tarefas = [
  { id: 1, titulo: "Urgente A",  prioridade: "alta",  concluida: false },
  { id: 2, titulo: "Urgente B",  prioridade: "alta",  concluida: true  },
  { id: 3, titulo: "Normal C",   prioridade: "media", concluida: false },
]

console.log("\n--- Usando filtros criados pela factory ---")
console.log("Alta prioridade:",  tarefas.filter(filtroAlta).map(t => t.titulo))
console.log("Pendentes:",        tarefas.filter(filtroPendente).map(t => t.titulo))

// ------------------------------------------------------------
// 5. FUNÇÕES PURAS vs FUNÇÕES COM EFEITO COLATERAL
// ------------------------------------------------------------

console.log("\n--- Funções puras vs impuras ---")

// ✅ Função PURA: mesmo input → sempre mesmo output, não altera nada externo
function calcularTotal(lista) {
  return lista.length
}

function calcularConcluidas(lista) {
  return lista.filter(t => t.concluida).length
}

// ❌ Função IMPURA: altera o estado externo (efeito colateral)
// (às vezes necessário, mas bom estar ciente)
const log = []
function registrarAcao(acao) {
  log.push({ acao, horario: new Date().toISOString() })  // altera array externo
}

registrarAcao("criar tarefa")
registrarAcao("editar tarefa")
console.log("Log de ações:", log.length, "entradas")

// ------------------------------------------------------------
// 6. COMPOSIÇÃO DE FUNÇÕES — funções pequenas trabalhando juntas
// Princípio importante: cada função faz UMA coisa bem
// ------------------------------------------------------------

console.log("\n--- Composição de funções ---")

// Três funções pequenas e específicas
const filtrarPendentes   = (lista) => lista.filter(t => !t.concluida)
const ordenarPorPrioridade = (lista) => {
  const ordem = { alta: 0, media: 1, baixa: 2 }
  return [...lista].sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade])
}
const formatarParaExibicao = (lista) => lista.map(t => `[${t.prioridade}] ${t.titulo}`)

// Composição: resultado de uma vira entrada da próxima
const listaFormatada = formatarParaExibicao(
  ordenarPorPrioridade(
    filtrarPendentes(tarefas)
  )
)

listaFormatada.forEach(item => console.log(" ", item))

console.log("\n--- Fim da Etapa 5 ---")
console.log("Próximo: etapa6.js → Objetos e Arrays avançados")
