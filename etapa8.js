// ============================================================
// ETAPA 8 — ASYNC/AWAIT E PROMISES
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - Por que código assíncrono existe
//   - Callbacks (problema)
//   - Promises (.then / .catch / .finally)
//   - async/await (solução moderna)
//   - Promise.all — executar várias ao mesmo tempo
//   - Tratamento de erros com try/catch
// ============================================================

// ------------------------------------------------------------
// 1. POR QUE ASSINCRONICIDADE?
// O JavaScript é single-thread: executa UMA coisa por vez.
// Operações lentas (banco, API) não podem BLOQUEAR o servidor.
// Solução: "inicia e avisa quando terminar" (non-blocking)
// ------------------------------------------------------------

console.log("=== Demonstração de assincronia ===")
console.log("1 - Início do programa")

// setTimeout simula uma operação demorada (ex: consulta ao banco)
setTimeout(() => {
  console.log("3 - Resultado da operação lenta (chegou depois!)")
}, 100)

console.log("2 - Continuação imediata (não esperou!)")
// Saída: 1, 2, 3 — o JS não parou para esperar o setTimeout

// ------------------------------------------------------------
// 2. CALLBACK — a forma antiga (problemática)
// Funções dentro de funções dentro de funções = "callback hell"
// ------------------------------------------------------------

// Simulando operações com callback
function buscarUsuarioCallback(id, callback) {
  setTimeout(() => {
    if (id === 0) return callback(new Error("ID inválido"), null)
    callback(null, { id, nome: "Ana Paula" })   // (erro, resultado)
  }, 50)
}

function buscarTarefasCallback(usuarioId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, titulo: "Estudar", usuarioId },
      { id: 2, titulo: "Praticar", usuarioId }
    ])
  }, 50)
}

// "Callback hell" — difícil de ler e manter
buscarUsuarioCallback(1, (erro, usuario) => {
  if (erro) { console.log("Erro:", erro.message); return }

  buscarTarefasCallback(usuario.id, (erro2, tarefas) => {
    if (erro2) { console.log("Erro:", erro2.message); return }

    // Imagina mais um nível... e mais um... e mais um...
    console.log(`\n[CALLBACK] ${usuario.nome} tem ${tarefas.length} tarefa(s)`)
  })
})

// ------------------------------------------------------------
// 3. PROMISES — a solução para callbacks
// Uma Promise representa um valor que AINDA NÃO EXISTE,
// mas existirá no futuro (ou falhará).
// Estados: pending (aguardando) → fulfilled (sucesso) ou rejected (falha)
// ------------------------------------------------------------

// Criando uma Promise manualmente
function buscarUsuarioPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 0) {
        reject(new Error("ID inválido"))   // falhou
      } else {
        resolve({ id, nome: "Ana Paula" }) // sucesso
      }
    }, 50)
  })
}

function buscarTarefasPromise(usuarioId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, titulo: "Estudar Node.js", usuarioId },
        { id: 2, titulo: "Criar API REST",  usuarioId }
      ])
    }, 50)
  })
}

// Encadeando com .then() — mais legível que callback, mas ainda verboso
buscarUsuarioPromise(1)
  .then(usuario => {
    return buscarTarefasPromise(usuario.id)
      .then(tarefas => ({ usuario, tarefas }))   // passa os dois adiante
  })
  .then(({ usuario, tarefas }) => {
    console.log(`\n[PROMISE] ${usuario.nome} tem ${tarefas.length} tarefa(s)`)
  })
  .catch(erro => {
    console.log(`[PROMISE] Erro: ${erro.message}`)
  })
  .finally(() => {
    // Executa SEMPRE, com sucesso ou erro (ex: fechar loading)
    // console.log("Finally: sempre executa")
  })

// ------------------------------------------------------------
// 4. ASYNC/AWAIT — a forma moderna (parece código síncrono!)
// async: marca a função como assíncrona
// await: pausa a função ATÉ a Promise resolver
// REGRA: só pode usar await dentro de função async
// ------------------------------------------------------------

async function carregarDadosDoUsuario(id) {
  // try/catch substitui o .catch() das Promises
  try {
    // await "espera" a Promise resolver antes de continuar
    const usuario = await buscarUsuarioPromise(id)
    const tarefas = await buscarTarefasPromise(usuario.id)

    console.log(`\n[ASYNC/AWAIT] ${usuario.nome} tem ${tarefas.length} tarefa(s):`)
    tarefas.forEach(t => console.log(`  - ${t.titulo}`))

    return { usuario, tarefas }  // async functions sempre retornam uma Promise

  } catch (erro) {
    // Captura erros de QUALQUER await acima
    console.log(`[ASYNC/AWAIT] Erro: ${erro.message}`)
    return null
  }
}

// Testando com ID válido e inválido
carregarDadosDoUsuario(1)
carregarDadosDoUsuario(0)   // vai cair no catch

// ------------------------------------------------------------
// 5. PROMISE.ALL — executar várias ao mesmo tempo (paralelo)
// Muito mais rápido do que await um por um quando são independentes
// ------------------------------------------------------------

async function carregarDashboard() {
  console.log("\n--- Promise.all: carregando tudo em paralelo ---")

  // Simulando múltiplas operações independentes
  const buscarTotal     = () => new Promise(r => setTimeout(() => r(42),    80))
  const buscarUrgentes  = () => new Promise(r => setTimeout(() => r(5),     60))
  const buscarUsuarios  = () => new Promise(r => setTimeout(() => r(["Ana","Carlos"]), 70))

  const inicio = Date.now()

  // ❌ Forma lenta (await um por um = soma os tempos: 80+60+70 = ~210ms)
  // const total    = await buscarTotal()
  // const urgentes = await buscarUrgentes()
  // const usuarios = await buscarUsuarios()

  // ✅ Forma rápida (todos ao mesmo tempo = tempo do mais lento: ~80ms)
  const [total, urgentes, usuarios] = await Promise.all([
    buscarTotal(),
    buscarUrgentes(),
    buscarUsuarios()
  ])

  const tempo = Date.now() - inicio
  console.log(`  Total: ${total} tarefas`)
  console.log(`  Urgentes: ${urgentes}`)
  console.log(`  Usuários: ${usuarios.join(", ")}`)
  console.log(`  Tempo total: ~${tempo}ms (em paralelo!)`)
}

carregarDashboard()

// ------------------------------------------------------------
// 6. TRATAMENTO DE ERROS — padrões práticos
// ------------------------------------------------------------

async function criarTarefa(dados) {
  // Simulando validação + salvamento no banco
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dados.titulo) {
        reject(new Error("Título obrigatório"))
        return
      }
      resolve({ id: Date.now(), ...dados, concluida: false })
    }, 30)
  })
}

async function exemploTratamentoDeErros() {
  console.log("\n--- Tratamento de erros ---")

  // Tentar criar tarefa inválida
  try {
    const invalida = await criarTarefa({ titulo: "" })
  } catch (erro) {
    console.log(`  ❌ Erro esperado: ${erro.message}`)
  }

  // Criar tarefa válida
  try {
    const valida = await criarTarefa({ titulo: "Estudar async/await", prioridade: "alta" })
    console.log(`  ✅ Criada: ${valida.titulo} (id: ${valida.id})`)
  } catch (erro) {
    console.log(`  ❌ Erro inesperado: ${erro.message}`)
  }
}

exemploTratamentoDeErros()

// ------------------------------------------------------------
// 7. RESUMO PRÁTICO — quando usar o quê
// ------------------------------------------------------------

/*
  CALLBACK    → evite. Código antigo ou bibliotecas legadas.

  .then()     → use quando não precisar de async/await
               (ex: encadeamentos simples de Promises)

  async/await → use SEMPRE que puder. É o padrão atual.
               - Controllers do Express
               - Operações com banco de dados
               - Chamadas a APIs externas

  Promise.all → use quando tiver múltiplas operações INDEPENDENTES
               rodando ao mesmo tempo (carregamento paralelo)

  REGRA DE OURO:
  - Toda função que usa await precisa ser async
  - Todo await que pode falhar precisa de try/catch
  - Async functions sempre retornam uma Promise
*/

console.log("\n--- Fim da Etapa 8 ---")
console.log("Próximo: etapa9.js → Módulos e organização de projeto")
