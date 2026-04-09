// ============================================================
// ETAPA 2 — VARIÁVEIS, CONSTANTES, TIPOS E OPERADORES
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - var / let / const
//   - Tipos primitivos: string, number, boolean, null, undefined
//   - Operadores: aritméticos, comparação, lógicos
//   - Template literals
// ============================================================

// ------------------------------------------------------------
// 1. COMO DECLARAR DADOS: var, let e const
// ------------------------------------------------------------

// const — valor que NÃO muda. Use sempre que possível.
const PORTA_DO_SERVIDOR = 3000
const NOME_DO_PROJETO   = "Taskschool"

// let — valor que PODE mudar ao longo do código
let totalDeTarefas   = 0
let ultimaAtualizacao = "2026-04-09"

// var — forma antiga, evite usar (tem comportamento estranho)
// var nomeAntigo = "não recomendado"

// Tentativa de mudar uma const → gera ERRO
// PORTA_DO_SERVIDOR = 4000  // TypeError: Assignment to constant variable

totalDeTarefas = 5  // let pode mudar ✅

console.log(`Projeto: ${NOME_DO_PROJETO} | Porta: ${PORTA_DO_SERVIDOR}`)
console.log(`Total de tarefas: ${totalDeTarefas}`)

// ------------------------------------------------------------
// 2. TIPOS PRIMITIVOS
// ------------------------------------------------------------

// string — texto (aspas simples, duplas ou template literal)
const titulo      = "Estudar Node.js"
const prioridade  = 'alta'
const descricao   = `Tarefa do projeto ${NOME_DO_PROJETO}`   // template literal

// number — números inteiros e decimais (não existe int/float separado)
const idTarefa    = 1
const progresso   = 0.75       // 75% concluído

// boolean — verdadeiro ou falso
const concluida   = false
const ativa       = true

// null — ausência INTENCIONAL de valor
const responsavel = null       // tarefa ainda sem responsável

// undefined — variável declarada mas SEM valor atribuído
let dataLimite                 // = undefined automaticamente

// Verificando tipos com typeof
console.log("\n--- Tipos de dados ---")
console.log(typeof titulo)      // "string"
console.log(typeof idTarefa)    // "number"
console.log(typeof concluida)   // "boolean"
console.log(typeof responsavel) // "object"  ← peculiaridade do JS (null)
console.log(typeof dataLimite)  // "undefined"

// ------------------------------------------------------------
// 3. OPERADORES ARITMÉTICOS
// ------------------------------------------------------------

console.log("\n--- Operadores Aritméticos ---")

const tarefasTotal     = 10
const tarefasConcluidas = 3
const tarefasPendentes  = tarefasTotal - tarefasConcluidas   // subtração: 7

// Módulo (%) — resto da divisão. Muito usado em paginação.
const paginaAtual = 11 % 10   // 1  (onze dividido por dez, resto = 1)
console.log(`Página atual: ${paginaAtual}`)

// Porcentagem de conclusão
const percentual = (tarefasConcluidas / tarefasTotal) * 100
console.log(`Progresso: ${percentual}%`)   // 30%

// Incremento / Decremento
let contadorDeAcessos = 0
contadorDeAcessos++    // equivale a: contadorDeAcessos = contadorDeAcessos + 1
contadorDeAcessos++
console.log(`Acessos: ${contadorDeAcessos}`)   // 2

// ------------------------------------------------------------
// 4. OPERADORES DE COMPARAÇÃO
// ------------------------------------------------------------

console.log("\n--- Comparação ---")

// === igualdade ESTRITA (compara valor E tipo) ← USE SEMPRE ESTE
// ==  igualdade frouxa (converte tipos, perigoso)

const idBuscado = "1"           // string "1" (vindo de um formulário HTML)
const idNoBanco = 1             // number 1 (salvo no banco)

console.log(idBuscado ==  idNoBanco)  // true  — perigoso, ignora o tipo
console.log(idBuscado === idNoBanco)  // false — correto, tipos diferentes

// Outros comparadores
console.log(tarefasPendentes > 0)     // true  — há tarefas pendentes?
console.log(tarefasConcluidas >= 10)  // false — todas concluídas?
console.log(prioridade !== "baixa")   // true  — não é baixa prioridade

// ------------------------------------------------------------
// 5. OPERADORES LÓGICOS
// ------------------------------------------------------------

console.log("\n--- Lógicos ---")

const usuarioLogado     = true
const tarefaDoUsuario   = true
const administrador     = false

// && (E) — AMBAS precisam ser verdadeiras
const podeEditar = usuarioLogado && tarefaDoUsuario
console.log(`Pode editar? ${podeEditar}`)   // true

// || (OU) — BASTA UMA ser verdadeira
const temAcesso = usuarioLogado || administrador
console.log(`Tem acesso? ${temAcesso}`)     // true

// ! (NÃO) — inverte o valor
console.log(`Está pendente? ${!concluida}`) // true (concluida = false, !false = true)

// Exemplo prático do Taskschool:
// Exibir alerta se a tarefa for de alta prioridade E ainda não concluída
const exibirAlerta = (prioridade === "alta") && !concluida
console.log(`Exibir alerta de urgência? ${exibirAlerta}`)  // true

// ------------------------------------------------------------
// 6. TEMPLATE LITERALS — interpolação de variáveis em texto
// ------------------------------------------------------------

console.log("\n--- Template Literals ---")

// Sem template literal (concatenação antiga — difícil de ler)
const mensagemAntiga = "Tarefa " + titulo + " está " + (concluida ? "concluída" : "pendente")

// Com template literal (backtick `) — muito mais legível
const mensagemNova = `Tarefa "${titulo}" está ${concluida ? "concluída" : "pendente"}`

console.log(mensagemAntiga)
console.log(mensagemNova)

// Também suporta múltiplas linhas
const relatorio = `
  === Relatório Taskschool ===
  Total:      ${tarefasTotal}
  Concluídas: ${tarefasConcluidas}
  Pendentes:  ${tarefasPendentes}
  Progresso:  ${percentual}%
`
console.log(relatorio)

console.log("--- Fim da Etapa 2 ---")
console.log("Próximo: etapa3.js → Condicionais e estrutura lógica")
