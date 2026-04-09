// ============================================================
// ETAPA 3 — CONDICIONAIS E ESTRUTURA LÓGICA
// Projeto: Taskschool — Gerenciador de Tarefas
// ============================================================
// Conceitos desta etapa:
//   - if / else if / else
//   - switch
//   - Operador ternário
//   - Lógica booleana aplicada
// ============================================================

// ------------------------------------------------------------
// 1. IF / ELSE — tomando decisões no código
// ------------------------------------------------------------

// Condicional simples: executar algo SE uma condição for verdadeira
function validarTitulo(titulo) {
  if (titulo === "") {
    console.log("Erro: o título não pode ser vazio")
    return false   // interrompe a função aqui
  }

  console.log(`Título válido: "${titulo}"`)
  return true
}

validarTitulo("")              // Erro: o título não pode ser vazio
validarTitulo("Estudar APIs") // Título válido: "Estudar APIs"

// ------------------------------------------------------------
// Condicional composta: if / else if / else
// ------------------------------------------------------------

function classificarPrioridade(prioridade) {
  if (prioridade === "alta") {
    console.log("⚠️  Tarefa urgente! Faça hoje.")
  } else if (prioridade === "media") {
    console.log("📋 Tarefa normal. Faça esta semana.")
  } else if (prioridade === "baixa") {
    console.log("🕐 Tarefa tranquila. Quando der.")
  } else {
    // else captura qualquer outro valor — boa prática sempre incluir
    console.log("❓ Prioridade desconhecida. Use: alta, media ou baixa.")
  }
}

console.log("\n--- Classificando prioridades ---")
classificarPrioridade("alta")
classificarPrioridade("media")
classificarPrioridade("baixa")
classificarPrioridade("urgentissima")  // cai no else

// ------------------------------------------------------------
// 2. SWITCH — alternativa para múltiplos valores fixos
// Mais legível que vários else if quando os valores são conhecidos
// ------------------------------------------------------------

function definirPrazo(prioridade) {
  let diasParaConcluir

  switch (prioridade) {
    case "alta":
      diasParaConcluir = 1
      break   // IMPORTANTE: sem break, cai no próximo case

    case "media":
      diasParaConcluir = 7
      break

    case "baixa":
      diasParaConcluir = 30
      break

    default:
      // default é como o "else" do switch — executa se nenhum case bateu
      diasParaConcluir = 7
      console.log("  (prioridade não reconhecida, usando padrão)")
  }

  return diasParaConcluir
}

console.log("\n--- Prazos por prioridade ---")
console.log(`Alta:  ${definirPrazo("alta")} dia(s)`)
console.log(`Media: ${definirPrazo("media")} dia(s)`)
console.log(`Baixa: ${definirPrazo("baixa")} dia(s)`)

// ------------------------------------------------------------
// 3. OPERADOR TERNÁRIO — if/else em uma linha
// Sintaxe: condição ? valorSeVerdadeiro : valorSeFalso
// Use para casos simples. Não aninhe ternários — fica ilegível.
// ------------------------------------------------------------

const concluida    = true
const statusTexto  = concluida ? "✅ Concluída" : "⏳ Pendente"
console.log(`\nStatus: ${statusTexto}`)

// Exemplo prático: definir a prioridade padrão se não informada
function criarTarefa(titulo, prioridade) {
  // Se prioridade não foi passada (undefined), usa "media"
  const prioridadeFinal = prioridade ? prioridade : "media"

  // Forma mais moderna do mesmo padrão (nullish coalescing):
  // const prioridadeFinal = prioridade ?? "media"

  return {
    id:         Date.now(),
    titulo,
    prioridade: prioridadeFinal,
    concluida:  false
  }
}

console.log("\n--- Criando tarefas ---")
console.log(criarTarefa("Estudar Express"))         // prioridade = "media"
console.log(criarTarefa("Deploy urgente", "alta"))  // prioridade = "alta"

// ------------------------------------------------------------
// 4. LÓGICA BOOLEANA — combinando condições
// ------------------------------------------------------------

console.log("\n--- Lógica booleana no Taskschool ---")

function podeExcluirTarefa(usuario, tarefa) {
  // Pode excluir SE for o dono da tarefa OU SE for administrador
  const ehDono          = usuario.id === tarefa.usuarioId
  const ehAdministrador = usuario.perfil === "admin"

  if (ehDono || ehAdministrador) {
    console.log(`  ${usuario.nome} pode excluir a tarefa.`)
    return true
  }

  console.log(`  ${usuario.nome} NÃO tem permissão.`)
  return false
}

const usuario1 = { id: 1, nome: "Ana",    perfil: "aluno" }
const usuario2 = { id: 2, nome: "Carlos", perfil: "admin" }
const tarefa1  = { id: 10, titulo: "Estudar SQL", usuarioId: 1 }

podeExcluirTarefa(usuario1, tarefa1) // Ana é dona → pode
podeExcluirTarefa(usuario2, tarefa1) // Carlos é admin → pode
podeExcluirTarefa({ id: 3, nome: "Beto", perfil: "aluno" }, tarefa1) // nem dono nem admin

// ------------------------------------------------------------
// 5. GUARDAR COM EARLY RETURN — padrão profissional
// Em vez de aninhar vários if/else, retorne cedo quando der erro
// Deixa o código mais limpo e fácil de ler
// ------------------------------------------------------------

// ❌ Forma com aninhamento (difícil de ler)
function validarTarefaRuim(titulo, prioridade) {
  if (titulo !== "") {
    if (prioridade !== "") {
      console.log("Tarefa válida")
      return true
    } else {
      console.log("Prioridade obrigatória")
      return false
    }
  } else {
    console.log("Título obrigatório")
    return false
  }
}

// ✅ Forma com early return (limpo e profissional)
function validarTarefaBoa(titulo, prioridade) {
  if (!titulo)     { console.log("Título obrigatório"); return false }
  if (!prioridade) { console.log("Prioridade obrigatória"); return false }

  console.log("Tarefa válida!")
  return true
}

console.log("\n--- Validações com early return ---")
validarTarefaBoa("",             "alta")  // Título obrigatório
validarTarefaBoa("Estudar REST", "")      // Prioridade obrigatória
validarTarefaBoa("Estudar REST", "alta")  // Tarefa válida!

console.log("\n--- Fim da Etapa 3 ---")
console.log("Próximo: etapa4.js → Loops e repetição")
