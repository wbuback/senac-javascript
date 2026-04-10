# Gabarito — Código Completo
## Parte 2 — Estrutura inicial do arquivo

Crie um arquivo `exercicio.js` e comece com esta estrutura:

```javascript
// ===================================================
// Exercício — Mini Taskschool
// Nome: ___________________________
// ===================================================

// Lista que vai guardar as tarefas (array vazio por enquanto)
const tarefas = []

// --- Escreva suas funções aqui ---

function criarTarefa(titulo, prioridade) {
  // seu código aqui
}

function adicionarTarefa(lista, titulo, prioridade) {
  // seu código aqui
}

function listarTarefas(lista) {
  // seu código aqui
}

function filtrarPorPrioridade(lista, prioridade) {
  // seu código aqui
}

function gerarRelatorio(lista) {
  // seu código aqui
}

// --- Teste seu código aqui ---

adicionarTarefa(tarefas, "Estudar variáveis",  "alta")
adicionarTarefa(tarefas, "Praticar condicionais", "alta")
adicionarTarefa(tarefas, "Fazer exercícios",   "media")
adicionarTarefa(tarefas, "Revisar anotações",  "baixa")
adicionarTarefa(tarefas, "",                   "alta")   // deve dar erro

listarTarefas(tarefas)

// Marcar a primeira tarefa como concluída manualmente
tarefas[0].concluida = true

console.log("\n--- Somente as urgentes ---")
const urgentes = filtrarPorPrioridade(tarefas, "alta")
urgentes.forEach(t => console.log("  🔴", t.titulo))

gerarRelatorio(tarefas)
```

---

*(Mostrar ao final da aula)*

```javascript
// ===================================================
// Exercício — Mini Taskschool — GABARITO
// ===================================================

const tarefas = []

// ----------------------------------------------------
// FUNÇÃO 1: criarTarefa
// Recebe título e prioridade, retorna objeto ou null
// ----------------------------------------------------
function criarTarefa(titulo, prioridade) {
  // Valida: título não pode ser vazio ou só espaços
  if (!titulo || titulo.trim() === "") {
    console.log("Erro: título obrigatório")
    return null
  }

  // Se não informou prioridade, usa "media" como padrão
  if (!prioridade) {
    prioridade = "media"
  }

  // Retorna o objeto tarefa
  return {
    id:         Date.now(),
    titulo:     titulo.trim(),
    prioridade: prioridade,
    concluida:  false
  }
}

// ----------------------------------------------------
// FUNÇÃO 2: adicionarTarefa
// Chama criarTarefa e empurra na lista se válida
// ----------------------------------------------------
function adicionarTarefa(lista, titulo, prioridade) {
  const nova = criarTarefa(titulo, prioridade)

  // Se criarTarefa retornou null, não faz nada
  if (nova === null) return

  lista.push(nova)
  console.log(`✅ Tarefa adicionada: ${nova.titulo}`)
}

// ----------------------------------------------------
// FUNÇÃO 3: listarTarefas
// Percorre o array e exibe cada tarefa formatada
// ----------------------------------------------------
function listarTarefas(lista) {
  if (lista.length === 0) {
    console.log("Nenhuma tarefa cadastrada.")
    return
  }

  console.log("\n=== Lista de Tarefas ===")

  lista.forEach((tarefa, indice) => {
    // Operador ternário para definir o ícone de status
    const status = tarefa.concluida ? "✅" : "⏳"

    // toUpperCase() coloca a prioridade em maiúsculo
    const prioridade = tarefa.prioridade.toUpperCase()

    console.log(`${indice + 1}. ${status} ${prioridade} — ${tarefa.titulo}`)
  })
}

// ----------------------------------------------------
// FUNÇÃO 4: filtrarPorPrioridade
// Usa .filter() para retornar só as tarefas da prioridade
// ----------------------------------------------------
function filtrarPorPrioridade(lista, prioridade) {
  return lista.filter(tarefa => tarefa.prioridade === prioridade)
}

// ----------------------------------------------------
// FUNÇÃO 5: gerarRelatorio
// Calcula e exibe os números da lista
// ----------------------------------------------------
function gerarRelatorio(lista) {
  const total      = lista.length
  const concluidas = lista.filter(t => t.concluida).length
  const pendentes  = total - concluidas

  console.log("\n=== Relatório Final ===")
  console.log(`Total:       ${total}`)
  console.log(`Concluídas:  ${concluidas}`)
  console.log(`Pendentes:   ${pendentes}`)

  if (pendentes === 0) {
    console.log("🎉 Parabéns! Todas as tarefas foram concluídas.")
  } else {
    console.log(`💪 Continue! Ainda há ${pendentes} tarefa(s) pendente(s).`)
  }
}

// ----------------------------------------------------
// BLOCO DE TESTES
// ----------------------------------------------------

adicionarTarefa(tarefas, "Estudar variáveis",     "alta")
adicionarTarefa(tarefas, "Praticar condicionais", "alta")
adicionarTarefa(tarefas, "Fazer exercícios",      "media")
adicionarTarefa(tarefas, "Revisar anotações",     "baixa")
adicionarTarefa(tarefas, "",                      "alta")   // deve dar erro

listarTarefas(tarefas)

// Marcar a primeira tarefa como concluída
tarefas[0].concluida = true

console.log("\n--- Somente as urgentes ---")
const urgentes = filtrarPorPrioridade(tarefas, "alta")
urgentes.forEach(t => console.log("  🔴", t.titulo))

gerarRelatorio(tarefas)
```

---

## Pontos para explicar ao apresentar o gabarito

**`criarTarefa`** — mostrar que o `return null` é um early return: a função para aqui se o título for inválido. Também mostrar o valor padrão com `if (!prioridade)`.

**`adicionarTarefa`** — mostrar que uma função pode chamar outra. O `if (nova === null) return` é outro early return: não empurra nada inválido na lista.

**`listarTarefas`** — mostrar o `forEach` com dois parâmetros `(tarefa, indice)`. O `indice + 1` evita mostrar "0" como primeiro número. O operador ternário no status é uma boa oportunidade de revisão.

**`filtrarPorPrioridade`** — a função mais curta. Mostrar que `.filter()` retorna um novo array sem alterar o original. Comparar com um `for` manual para mostrar o quanto `.filter()` simplifica.

**`gerarRelatorio`** — mostrar que `filter().length` é o padrão para contar itens que satisfazem uma condição. O `if (pendentes === 0)` é uma condicional simples de verificação de estado.

