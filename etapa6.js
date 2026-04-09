// ============================================================
// ETAPA 6 — OBJETOS E ARRAYS AVANÇADOS
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - Desestruturação de objetos e arrays
//   - Spread e rest operator
//   - Objetos aninhados
//   - Cópia vs referência
//   - Métodos úteis: Object.keys, Object.values, Object.entries
// ============================================================

// ------------------------------------------------------------
// 1. DESESTRUTURAÇÃO DE OBJETOS
// Extrair propriedades em variáveis de forma concisa
// ------------------------------------------------------------

console.log("--- Desestruturação de objetos ---")

const tarefa = {
  id:         42,
  titulo:     "Criar API REST",
  prioridade: "alta",
  concluida:  false,
  usuario:    { id: 1, nome: "Ana Paula", email: "ana@email.com" }
}

// Sem desestruturação (repetitivo)
const tituloAntigo    = tarefa.titulo
const prioridadeAntiga = tarefa.prioridade

// Com desestruturação (limpo e direto)
const { titulo, prioridade, concluida } = tarefa
console.log(titulo, prioridade, concluida)

// Renomear durante a desestruturação
const { titulo: nomeDaTarefa, id: idDaTarefa } = tarefa
console.log(`Tarefa #${idDaTarefa}: ${nomeDaTarefa}`)

// Valor padrão durante a desestruturação
const { descricao = "Sem descrição" } = tarefa
console.log(`Descrição: ${descricao}`)

// Desestruturação aninhada — acessar objeto dentro de objeto
const { usuario: { nome: nomeDoUsuario } } = tarefa
console.log(`Responsável: ${nomeDoUsuario}`)

// Desestruturação em parâmetros de função — muito comum em controllers
function exibirTarefa({ titulo, prioridade, concluida }) {
  const status = concluida ? "✅" : "⏳"
  console.log(`  ${status} [${prioridade}] ${titulo}`)
}

exibirTarefa(tarefa)

// ------------------------------------------------------------
// 2. DESESTRUTURAÇÃO DE ARRAYS
// ------------------------------------------------------------

console.log("\n--- Desestruturação de arrays ---")

const prioridades = ["alta", "media", "baixa"]

// Extrai pelo índice (posição)
const [primeira, segunda, terceira] = prioridades
console.log(primeira, segunda, terceira)   // alta media baixa

// Pular elementos com vírgula
const [maisAlta, , maisAlta2] = prioridades
console.log(maisAlta, maisAlta2)           // alta baixa

// Pegar o resto em um array
const [cabeca, ...resto] = prioridades
console.log(cabeca)   // "alta"
console.log(resto)    // ["media", "baixa"]

// ------------------------------------------------------------
// 3. SPREAD OPERATOR (...) — expandir / copiar
// ------------------------------------------------------------

console.log("\n--- Spread operator ---")

// Copiar um objeto (raso) sem modificar o original
const tarefaOriginal = { id: 1, titulo: "Original", concluida: false }
const tarefaCopia    = { ...tarefaOriginal }

tarefaCopia.titulo = "Cópia modificada"
console.log(tarefaOriginal.titulo)  // "Original" — não foi alterado ✅
console.log(tarefaCopia.titulo)     // "Cópia modificada"

// Sobrescrever campos ao copiar — muito usado para atualizar tarefas
const tarefaAtualizada = { ...tarefaOriginal, concluida: true, titulo: "Atualizada" }
console.log(tarefaAtualizada)

// Spread em arrays — juntar listas
const urgentes = [{ id: 1, titulo: "Deploy" }]
const normais  = [{ id: 2, titulo: "Docs"   }]
const todas    = [...urgentes, ...normais]
console.log("Total:", todas.length)

// Spread para passar array como argumentos
const numeros = [3, 1, 4, 1, 5, 9, 2, 6]
console.log("Maior:", Math.max(...numeros))  // 9

// ------------------------------------------------------------
// 4. REST OPERATOR (...) — agrupar o restante
// ------------------------------------------------------------

console.log("\n--- Rest operator ---")

// Em funções: capturar número variável de argumentos
function registrarTarefas(responsavel, ...titulos) {
  console.log(`Responsável: ${responsavel}`)
  console.log(`Tarefas (${titulos.length}):`)
  titulos.forEach(t => console.log(`  - ${t}`))
}

registrarTarefas("Ana", "Criar API", "Fazer deploy", "Escrever testes")

// ------------------------------------------------------------
// 5. REFERÊNCIA vs CÓPIA — erro muito comum em iniciantes
// ------------------------------------------------------------

console.log("\n--- Referência vs cópia ---")

// Tipos primitivos são copiados por VALOR
let a = 10
let b = a
b = 99
console.log(a)  // 10 — a não mudou ✅

// Objetos e arrays são copiados por REFERÊNCIA
const lista1 = ["Tarefa A", "Tarefa B"]
const lista2 = lista1          // lista2 aponta para o MESMO array!

lista2.push("Tarefa C")
console.log(lista1)  // ["Tarefa A", "Tarefa B", "Tarefa C"] — lista1 também mudou! ⚠️

// Solução: copiar com spread (cópia rasa)
const lista3 = ["Tarefa X"]
const lista4 = [...lista3]     // cópia real
lista4.push("Tarefa Y")
console.log(lista3)  // ["Tarefa X"] — não foi alterada ✅

// ATENÇÃO: spread faz cópia RASA (shallow).
// Objetos aninhados ainda são referências.
const obj1 = { info: { nivel: 1 } }
const obj2 = { ...obj1 }
obj2.info.nivel = 99
console.log(obj1.info.nivel)  // 99 — o objeto interno ainda é referência! ⚠️

// Para cópia profunda (deep copy): JSON.parse(JSON.stringify(obj))
// ou bibliotecas como lodash cloneDeep

// ------------------------------------------------------------
// 6. MÉTODOS DE OBJETO — inspecionar e manipular objetos
// ------------------------------------------------------------

console.log("\n--- Métodos de Object ---")

const resumo = {
  total:      10,
  concluidas: 3,
  pendentes:  7,
  urgentes:   2
}

// Object.keys — retorna array com os nomes das propriedades
const campos = Object.keys(resumo)
console.log("Campos:", campos)

// Object.values — retorna array com os valores
const valores = Object.values(resumo)
console.log("Valores:", valores)

// Object.entries — retorna array de [chave, valor]
console.log("\nRelatório completo:")
Object.entries(resumo).forEach(([chave, valor]) => {
  console.log(`  ${chave}: ${valor}`)
})

// ------------------------------------------------------------
// 7. OBJETO COMO MAPA — muito útil para buscas rápidas
// ------------------------------------------------------------

console.log("\n--- Objeto como mapa (lookup) ---")

// Em vez de vários if/else ou switch, use um objeto
const mensagemPorStatus = {
  200: "Requisição bem-sucedida",
  201: "Recurso criado",
  400: "Dados inválidos",
  401: "Não autenticado",
  403: "Sem permissão",
  404: "Não encontrado",
  500: "Erro interno do servidor"
}

function obterMensagem(status) {
  return mensagemPorStatus[status] || "Status desconhecido"
}

console.log(obterMensagem(201))  // Recurso criado
console.log(obterMensagem(404))  // Não encontrado
console.log(obterMensagem(418))  // Status desconhecido

console.log("\n--- Fim da Etapa 6 ---")
console.log("Próximo: etapa7.js → Orientação a Objetos (Classes)")
