// ============================================================
// ETAPA 4 — LOOPS E REPETIÇÃO
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - for clássico
//   - for...of (arrays)
//   - while
//   - forEach, map, filter, find, reduce
//   - break e continue
// ============================================================

const tarefas = [
  { id: 1, titulo: "Estudar Node.js",   prioridade: "alta",  concluida: true  },
  { id: 2, titulo: "Criar API REST",    prioridade: "alta",  concluida: false },
  { id: 3, titulo: "Montar banco SQL",  prioridade: "media", concluida: false },
  { id: 4, titulo: "Fazer deploy",      prioridade: "baixa", concluida: false },
  { id: 5, titulo: "Escrever README",   prioridade: "baixa", concluida: true  },
]

// ------------------------------------------------------------
// 1. FOR CLÁSSICO — quando precisamos do índice
// Sintaxe: for (início; condição; incremento)
// ------------------------------------------------------------

console.log("--- for clássico: numerando as tarefas ---")
for (let i = 0; i < tarefas.length; i++) {
  console.log(`  ${i + 1}. ${tarefas[i].titulo}`)
}

// ------------------------------------------------------------
// 2. FOR...OF — percorre arrays de forma legível
// Use quando não precisar do índice
// ------------------------------------------------------------

console.log("\n--- for...of: listando todas as tarefas ---")
for (const tarefa of tarefas) {
  const status = tarefa.concluida ? "✅" : "⏳"
  console.log(`  ${status} ${tarefa.titulo} [${tarefa.prioridade}]`)
}

// ------------------------------------------------------------
// 3. WHILE — repete ENQUANTO a condição for verdadeira
// Use quando não sabe quantas vezes vai repetir
// ------------------------------------------------------------

console.log("\n--- while: tentativas de login ---")
let tentativas  = 0
const maxTentativas = 3
let logouEntrou   = false

while (tentativas < maxTentativas && !logouEntrou) {
  tentativas++
  console.log(`  Tentativa ${tentativas} de ${maxTentativas}...`)

  if (tentativas === 2) {  // simula login correto na 2ª tentativa
    logouEntrou = true
    console.log("  Login bem-sucedido!")
  }
}

if (!logouEntrou) {
  console.log("  Conta bloqueada após 3 tentativas.")
}

// ------------------------------------------------------------
// 4. BREAK e CONTINUE — controlando o fluxo do loop
// ------------------------------------------------------------

console.log("\n--- break: parar ao encontrar a primeira de alta prioridade ---")
for (const tarefa of tarefas) {
  if (tarefa.prioridade === "alta" && !tarefa.concluida) {
    console.log(`  Próxima urgente: "${tarefa.titulo}"`)
    break  // para o loop assim que encontra
  }
}

console.log("\n--- continue: pular as já concluídas ---")
for (const tarefa of tarefas) {
  if (tarefa.concluida) continue  // pula para a próxima iteração

  console.log(`  Pendente: ${tarefa.titulo}`)
}

// ------------------------------------------------------------
// 5. MÉTODOS FUNCIONAIS DE ARRAY — a forma moderna e profissional
// ------------------------------------------------------------

// forEach — executar algo para cada item (não retorna nada)
console.log("\n--- forEach ---")
tarefas.forEach((tarefa, indice) => {
  console.log(`  [${indice}] ${tarefa.titulo}`)
})

// map — TRANSFORMAR cada item, retorna novo array
// Regra: mesmo tamanho de entrada, mesma tamanho de saída
console.log("\n--- map: extraindo só os títulos ---")
const titulos = tarefas.map(tarefa => tarefa.titulo)
console.log(titulos)

// map com transformação real: adicionar campo "prazo"
const tarefasComPrazo = tarefas.map(tarefa => ({
  ...tarefa,                                             // copia os campos existentes
  prazo: tarefa.prioridade === "alta" ? "Hoje" : "Esta semana"
}))
console.log("\n--- map: adicionando campo prazo ---")
tarefasComPrazo.forEach(t => console.log(`  ${t.titulo} → ${t.prazo}`))

// filter — FILTRAR itens que atendem uma condição, retorna subconjunto
console.log("\n--- filter: só as pendentes ---")
const pendentes = tarefas.filter(tarefa => !tarefa.concluida)
console.log(`  ${pendentes.length} tarefas pendentes:`)
pendentes.forEach(t => console.log(`  - ${t.titulo}`))

console.log("\n--- filter: alta prioridade E pendente ---")
const urgentes = tarefas.filter(t => t.prioridade === "alta" && !t.concluida)
urgentes.forEach(t => console.log(`  🔴 ${t.titulo}`))

// find — encontrar o PRIMEIRO item que satisfaz a condição
// Retorna o objeto (ou undefined se não encontrar)
console.log("\n--- find: buscar tarefa por id ---")
function buscarTarefaPorId(id) {
  const encontrada = tarefas.find(tarefa => tarefa.id === id)

  if (!encontrada) {
    console.log(`  Tarefa #${id} não encontrada.`)
    return null
  }

  console.log(`  Encontrada: "${encontrada.titulo}"`)
  return encontrada
}

buscarTarefaPorId(3)   // encontra
buscarTarefaPorId(99)  // não encontra

// reduce — ACUMULAR, transformar array em um único valor
console.log("\n--- reduce: contando por prioridade ---")
const contagem = tarefas.reduce((acumulador, tarefa) => {
  // acumulador começa como {} (segundo argumento do reduce)
  const p = tarefa.prioridade
  acumulador[p] = (acumulador[p] || 0) + 1   // incrementa o contador
  return acumulador
}, {})  // <-- valor inicial do acumulador

console.log("  Contagem por prioridade:", contagem)
// { alta: 2, media: 1, baixa: 2 }

// ------------------------------------------------------------
// 6. ENCADEANDO MÉTODOS — filter + map + forEach
// Isso é muito comum em código profissional
// ------------------------------------------------------------

console.log("\n--- encadeamento: títulos das tarefas pendentes em maiúsculo ---")
tarefas
  .filter(t => !t.concluida)          // só pendentes
  .map(t => t.titulo.toUpperCase())   // converte título para maiúsculo
  .forEach(titulo => console.log(`  📌 ${titulo}`))

console.log("\n--- Fim da Etapa 4 ---")
console.log("Próximo: etapa5.js → Funções")
