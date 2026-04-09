// ============================================================
// ETAPA 1 — ALGORITMO E LÓGICA DE PROGRAMAÇÃO
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - O que é um algoritmo
//   - Pensamento computacional (decomposição de problema)
//   - Pseudocódigo → código real
// ============================================================

// ------------------------------------------------------------
// O QUE É UM ALGORITMO?
// Um algoritmo é uma sequência finita de passos para resolver
// um problema. Antes de escrever código, pensamos em palavras.
// ------------------------------------------------------------

/*
  PROBLEMA: Um aluno quer adicionar uma tarefa no Taskschool.

  ALGORITMO em pseudocódigo:
  ─────────────────────────
  INÍCIO
    1. Receber o título da tarefa
    2. SE o título estiver vazio
         Exibir erro: "Título obrigatório"
         PARAR
    3. Criar um objeto tarefa com:
         - id único
         - título informado
         - prioridade "media" (padrão)
         - concluída = false
    4. Adicionar a tarefa na lista
    5. Exibir: "Tarefa criada com sucesso!"
  FIM
*/

// Agora vamos transformar o pseudocódigo em JavaScript real:

// Passo 1 — temos a entrada do usuário
const tituloDigitado = "Estudar Node.js"

// Passo 2 — verificar se está vazio
if (tituloDigitado === "") {
  console.log("Erro: Título obrigatório")
  // Em código real usaríamos return para parar aqui
}

// Passo 3 — criar o objeto tarefa
const novaTarefa = {
  id:         1,
  titulo:     tituloDigitado,
  prioridade: "media",
  concluida:  false
}

// Passo 4 — adicionar na lista (array)
const listaDeTarefas = []
listaDeTarefas.push(novaTarefa)

// Passo 5 — exibir resultado
console.log("Tarefa criada com sucesso!")
console.log("Lista atual:", listaDeTarefas)

// ------------------------------------------------------------
// PENSAMENTO COMPUTACIONAL — Os 4 pilares
// ------------------------------------------------------------

// 1. DECOMPOSIÇÃO: quebrar o problema em partes menores
//    Problema: "Gerenciar tarefas"
//    Partes:   criar / listar / marcar como feita / remover

// 2. RECONHECIMENTO DE PADRÕES: identificar semelhanças
//    Todas as tarefas têm: id, título, prioridade, concluída
//    → isso vira a estrutura do nosso objeto

// 3. ABSTRAÇÃO: ignorar detalhes desnecessários agora
//    Não precisamos saber COMO o banco salva, só que ele salva

// 4. ALGORITMO: definir a sequência exata de passos
//    → o que fizemos acima com o pseudocódigo

console.log("\n--- Fim da Etapa 1 ---")
console.log("Próximo: etapa2.js → Variáveis, tipos e operadores")
