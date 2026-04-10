# Exercício — Mini Taskschool em JavaScript
**Etapas 1 a 5**

---

## Contexto

Você vai construir uma versão simplificada do **Taskschool** diretamente no terminal.
O programa vai permitir criar tarefas, listar, filtrar e mostrar um relatório final.

Não precisa de banco de dados, de servidor nem de Express — só JavaScript puro, rodando com `node exercicio.js`.

---

## O que você vai praticar

- Variáveis e tipos de dados (etapa 2)
- Condicionais com `if` / `else` (etapa 3)
- Loops com `for...of` e `filter` / `map` (etapa 4)
- Funções com parâmetros e retorno (etapa 5)

---

## Parte 1 — Pseudocódigo (leia antes de escrever o código)

Você vai implementar **cinco funções** e um bloco final que chama todas elas.
Leia os algoritmos abaixo e tente traduzir para JavaScript.

---

### Função 1 — `criarTarefa`

```
FUNÇÃO criarTarefa(titulo, prioridade)

  SE titulo estiver vazio
    Exibir "Erro: título obrigatório"
    Retornar NULO

  SE prioridade não for informada
    prioridade = "media"

  Retornar um objeto com:
    - id        → número gerado com Date.now()
    - titulo    → o título informado (sem espaços nas bordas)
    - prioridade → "alta", "media" ou "baixa"
    - concluida  → false (toda tarefa começa pendente)

FIM FUNÇÃO
```

---

### Função 2 — `adicionarTarefa`

```
FUNÇÃO adicionarTarefa(lista, titulo, prioridade)

  Chamar criarTarefa(titulo, prioridade)
  SE o resultado for NULO
    Retornar (não faz nada)

  Adicionar a tarefa criada na lista
  Exibir: "✅ Tarefa adicionada: [título da tarefa]"

FIM FUNÇÃO
```

---

### Função 3 — `listarTarefas`

```
FUNÇÃO listarTarefas(lista)

  SE a lista estiver vazia
    Exibir "Nenhuma tarefa cadastrada."
    Retornar

  Exibir "=== Lista de Tarefas ==="
  PARA CADA tarefa NA lista
    SE tarefa.concluida for verdadeiro
      status = "✅"
    SENÃO
      status = "⏳"

    Exibir: "[número]. [status] [prioridade em maiúsculo] — [titulo]"

FIM FUNÇÃO
```

> **Dica:** use `tarefa.prioridade.toUpperCase()` para colocar em maiúsculo.
> Use o índice do loop para o número (`indice + 1`).

---

### Função 4 — `filtrarPorPrioridade`

```
FUNÇÃO filtrarPorPrioridade(lista, prioridade)

  Filtrar a lista mantendo apenas as tarefas
  onde tarefa.prioridade for igual à prioridade informada

  Retornar a lista filtrada

FIM FUNÇÃO
```

> **Dica:** use o método `.filter()` do array.

---

### Função 5 — `gerarRelatorio`

```
FUNÇÃO gerarRelatorio(lista)

  Calcular total     → tamanho da lista
  Calcular concluidas → quantidade onde tarefa.concluida === true
  Calcular pendentes  → total menos concluidas

  Exibir "=== Relatório Final ==="
  Exibir "Total:       [total]"
  Exibir "Concluídas:  [concluidas]"
  Exibir "Pendentes:   [pendentes]"

  SE todas estiverem concluídas
    Exibir "🎉 Parabéns! Todas as tarefas foram concluídas."
  SENÃO
    Exibir "💪 Continue! Ainda há [pendentes] tarefa(s) pendente(s)."

FIM FUNÇÃO
```

---



## Parte 2 — Saída esperada ao rodar `node exercicio.js`

```
✅ Tarefa adicionada: Estudar variáveis
✅ Tarefa adicionada: Praticar condicionais
✅ Tarefa adicionada: Fazer exercícios
✅ Tarefa adicionada: Revisar anotações
Erro: título obrigatório

=== Lista de Tarefas ===
1. ✅ ALTA — Estudar variáveis
2. ⏳ ALTA — Praticar condicionais
3. ⏳ MEDIA — Fazer exercícios
4. ⏳ BAIXA — Revisar anotações

--- Somente as urgentes ---
  🔴 Estudar variáveis
  🔴 Praticar condicionais

=== Relatório Final ===
Total:       4
Concluídas:  1
Pendentes:   3
💪 Continue! Ainda há 3 tarefa(s) pendente(s).
```

---

## Dicas se travar

| Problema | Dica |
|---|---|
| Como verificar se string está vazia | `if (!titulo \|\| titulo.trim() === "")` |
| Como remover espaços do início/fim | `.trim()` |
| Como gerar um número único | `Date.now()` |
| Como filtrar um array | `lista.filter(t => t.prioridade === prioridade)` |
| Como percorrer com índice | `lista.forEach((t, i) => ...)` |
| Como colocar texto em maiúsculo | `texto.toUpperCase()` |
| Como contar itens que satisfazem condição | `lista.filter(t => t.concluida).length` |

## Cola - Estrutura inicial do arquivo

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


