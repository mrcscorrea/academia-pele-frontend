document.addEventListener("DOMContentLoaded", () => {
  // Roteamento baseado nos elementos presentes na página
  const formCadastro = document.getElementById("form-cadastro");
  if (formCadastro) {
    inicializarCadastro(formCadastro);
  }

  const formLoginFuncionario = document.getElementById("form-login-funcionario");
  if (formLoginFuncionario) {
    inicializarLoginFuncionario(formLoginFuncionario);
  }

  const listaPeneirasAbertas = document.getElementById("lista-peneiras-abertas");
  if (listaPeneirasAbertas) {
    inicializarPainelJogador();
  }

  const formMarcarPeneira = document.getElementById("form-marcar-peneira");
  if (formMarcarPeneira) {
    inicializarPainelFuncionario();
  }

  const formChat = document.getElementById("form-chat");
  if (formChat) {
    inicializarChat(formChat);
  }
});

// Cadastro do Jogador (cadastro.html)
function inicializarCadastro(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputDataNasc = document.getElementById("dataNascimento");
    const inputCpf = document.getElementById("cpf");
    const inputSenha = document.getElementById("senha");
    const selectSexo = document.getElementById("sexo");
    const selectPosicao = document.getElementById("posicao");

    const inputs = [inputNome, inputDataNasc, inputCpf, inputSenha, selectSexo, selectPosicao];
    inputs.forEach(input => input.classList.remove("error"));

    let erros = [];

    // Validação do nome completo (mínimo 3 caracteres, sem números)
    if (inputNome.value.trim().length < 3 || /\d/.test(inputNome.value)) {
      inputNome.classList.add("error");
      erros.push("Nome inválido! Deve conter pelo menos 3 caracteres e nenhum número.");
    }

    // Validação da data de nascimento
    if (!inputDataNasc.value) {
      inputDataNasc.classList.add("error");
      erros.push("Selecione sua data de nascimento.");
    } else {
      const dataNasc = new Date(inputDataNasc.value);
      const hoje = new Date();
      if (dataNasc >= hoje) {
        inputDataNasc.classList.add("error");
        erros.push("A data de nascimento não pode ser no futuro ou hoje.");
      }
    }

    // Validação simplificada de CPF (deve conter 11 dígitos)
    const cpfLimpo = inputCpf.value.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      inputCpf.classList.add("error");
      erros.push("CPF inválido! Deve conter exatamente 11 números.");
    }

    // Validação de senha
    if (inputSenha.value.length < 6) {
      inputSenha.classList.add("error");
      erros.push("A senha deve conter no mínimo 6 caracteres.");
    }

    // Validação de seleções obrigatórias
    if (!selectSexo.value) {
      selectSexo.classList.add("error");
      erros.push("Por favor, selecione seu sexo biológico.");
    }
    if (!selectPosicao.value) {
      selectPosicao.classList.add("error");
      erros.push("Por favor, selecione sua posição de jogo.");
    }

    if (erros.length > 0) {
      alert("Atenção! Foram detectados erros no preenchimento:\n\n- " + erros.join("\n- "));
      return;
    }

    localStorage.setItem("jogador_logado_nome", inputNome.value.trim());
    localStorage.setItem("jogador_logado_posicao", selectPosicao.value);

    const botao = form.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Processando cadastro...";

    // Simula tempo de resposta do servidor
    setTimeout(() => {
      alert("Cadastro de jogador realizado com sucesso! Redirecionando para o painel de peneiras...");
      window.location.href = "peneiras.html";
    }, 1500);
  });
}

// Login do Funcionário (login-funcionario.html)
function inicializarLoginFuncionario(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("senha");

    inputEmail.classList.remove("error");
    inputSenha.classList.remove("error");

    let erros = [];

    // Exige e-mail institucional @peleacademia.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value) || !inputEmail.value.endsWith("@peleacademia.com")) {
      inputEmail.classList.add("error");
      erros.push("E-mail corporativo inválido! Utilize seu e-mail institucional @peleacademia.com.");
    }

    if (inputSenha.value.trim() === "") {
      inputSenha.classList.add("error");
      erros.push("Digite sua senha de acesso.");
    }

    if (erros.length > 0) {
      alert("Erro de autenticação:\n\n" + erros.join("\n"));
      return;
    }

    const nomeExibicao = inputEmail.value.split("@")[0];
    localStorage.setItem("funcionario_logado", nomeExibicao.charAt(0).toUpperCase() + nomeExibicao.slice(1));

    const botao = form.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Autenticando...";

    setTimeout(() => {
      alert("Login efetuado com sucesso! Acesso concedido à Área do Funcionário.");
      window.location.href = "funcionario.html";
    }, 1000);
  });
}

// Painel do Jogador / Peneiras (peneiras.html)
function inicializarPainelJogador() {
  const nomeJogador = localStorage.getItem("jogador_logado_nome");
  if (nomeJogador) {
    const titulo = document.querySelector("h1");
    if (titulo) {
      titulo.textContent = `Painel de ${nomeJogador} ⚽`;
    }
  }

  // Carrega peneiras customizadas cadastradas pelo funcionário
  renderizarPeneirasDoLocalStorage("lista-peneiras-abertas", true);

  // Simula recebimento de convocação após 6 segundos
  setTimeout(() => {
    const statusConvocacao = document.getElementById("status-convocacao");
    const detalhesConvocacao = document.getElementById("detalhes-convocacao");
    
    if (statusConvocacao && detalhesConvocacao) {
      statusConvocacao.innerHTML = `<span class="badge badge-verde">CONVOCADO!</span>`;
      statusConvocacao.style.fontWeight = "bold";
      detalhesConvocacao.style.display = "block";
      detalhesConvocacao.style.animation = "fadeIn 1s ease-in-out";

      alert("🔔 URGENTE: O comitê de avaliação acaba de convocar você para o teste presencial! Verifique os detalhes e entre em contato.");
    }
  }, 6000);

  // Simulação de transmissão de sensores wearables em tempo real (a cada 3 segundos)
  const telemetriaBpm = document.getElementById("telemetria-bpm");
  const telemetriaVel = document.getElementById("telemetria-velocidade");
  const telemetriaFadiga = document.getElementById("telemetria-fadiga");
  const statusEsforco = document.getElementById("status-esforco");

  let fadiga = 15;
  let alertaDisparado = false;

  const intervalTelemetria = setInterval(() => {
    if (!telemetriaBpm || !telemetriaVel || !telemetriaFadiga) return;

    const bpm = Math.floor(Math.random() * (195 - 120 + 1)) + 120;
    const vel = (Math.random() * (31.8 - 12.5) + 12.5).toFixed(1);
    
    fadiga = Math.min(fadiga + Math.floor(Math.random() * 4) + 1, 100);
    if (fadiga >= 100) {
      fadiga = 15;
    }

    telemetriaBpm.textContent = bpm;
    telemetriaVel.textContent = vel;
    telemetriaFadiga.textContent = fadiga;

    // Atualização dinâmica de status e cores conforme limites de esforço
    let statusClass = "badge-verde";
    let statusTexto = "Seguro (Esforço Estável)";

    if (bpm > 175) {
      statusClass = "badge-vermelho";
      statusTexto = "PERIGO: Limiar de Lesão Excedido!";
      
      // Alerta crítico de saúde (dispara apenas na transição para o estado crítico)
      if (!alertaDisparado) {
        alertaDisparado = true;
        alert(`🚨 ALERTA DOS BIOSSENSORES:\nFrequência cardíaca crítica detectada (${bpm} bpm)!\nDiminua a intensidade do exercício imediatamente.`);
      }
    } else if (bpm > 155) {
      statusClass = "badge-amarelo";
      statusTexto = "Moderado (Esforço Intenso)";
      alertaDisparado = false;
    } else {
      alertaDisparado = false;
    }

    statusEsforco.className = `badge ${statusClass}`;
    statusEsforco.textContent = statusTexto;

    adicionarLogTelemetria(bpm, statusTexto, statusClass);

  }, 3000);

  window.currentTelemetriaInterval = intervalTelemetria;
}

// Adiciona um registro na tabela de logs (mantém no máximo 5 registros recentes)
function adicionarLogTelemetria(bpm, status, badgeClass) {
  const tbody = document.getElementById("logs-telemetria");
  if (!tbody) return;

  const agora = new Date();
  const horario = agora.toTimeString().split(" ")[0];

  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td style="padding: 5px; color: #94a3b8;">${horario}</td>
    <td style="padding: 5px;">💓 ${bpm} bpm</td>
    <td style="padding: 5px;"><span class="badge ${badgeClass}" style="font-size: 0.65rem;">${status.split(" ")[0]}</span></td>
  `;

  tbody.insertBefore(novaLinha, tbody.firstChild);

  if (tbody.children.length > 5) {
    tbody.removeChild(tbody.lastChild);
  }
}

// Área do Funcionário (funcionario.html)
function inicializarPainelFuncionario() {
  const formMarcar = document.getElementById("form-marcar-peneira");
  const formContatar = document.getElementById("form-contatar-jogador");

  const nomeFunc = localStorage.getItem("funcionario_logado");
  if (nomeFunc) {
    const titulo = document.querySelector("h1");
    if (titulo) {
      titulo.textContent = `Área do Funcionário: ${nomeFunc} 💼`;
    }
  }

  renderizarPeneirasDoLocalStorage("lista-peneiras-funcionario", false);

  if (formMarcar) {
    formMarcar.addEventListener("submit", (e) => {
      e.preventDefault();

      const local = document.getElementById("localidade").value.trim();
      const campos = document.getElementById("campos").value.trim();
      const cap = document.getElementById("capacidade").value.trim();
      const catSelect = document.getElementById("categoria");
      const cat = catSelect.options[catSelect.selectedIndex].text;
      const catVal = catSelect.value;
      const inicio = document.getElementById("inicio").value;
      const fim = document.getElementById("fim").value;

      if (!local || !campos || !cap || !catVal || !inicio || !fim) {
        alert("Erro! Todos os campos da peneira devem ser preenchidos.");
        return;
      }

      if (parseInt(cap) <= 0 || parseInt(campos) <= 0) {
        alert("Erro! Capacidade e quantidade de campos devem ser maiores que zero.");
        return;
      }

      const novaPeneira = {
        id: Date.now().toString(),
        localidade: local,
        campos: campos,
        capacidade: cap,
        categoria: cat,
        horario: `${inicio} às ${fim}`
      };

      const peneirasSalvas = JSON.parse(localStorage.getItem("peneiras_marcadas")) || [];
      peneirasSalvas.push(novaPeneira);
      localStorage.setItem("peneiras_marcadas", JSON.stringify(peneirasSalvas));

      alert(`Peneira para ${cat} marcada com sucesso em ${local}!`);
      formMarcar.reset();
      renderizarPeneirasDoLocalStorage("lista-peneiras-funcionario", false);
    });
  }

  if (formContatar) {
    formContatar.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputJogador = document.getElementById("nomeJogador");
      const nome = inputJogador.value.trim();

      if (nome === "") {
        inputJogador.classList.add("error");
        alert("Por favor, digite o nome do jogador.");
        return;
      }

      window.location.href = `chat.html?nome=${encodeURIComponent(nome)}&role=funcionario`;
    });
  }
}

// Renderiza a listagem de peneiras com base no localStorage
function renderizarPeneirasDoLocalStorage(elementId, viewJogadorOnly) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const peneirasSalvas = JSON.parse(localStorage.getItem("peneiras_marcadas")) || [];

  if (!viewJogadorOnly) {
    container.innerHTML = "";
  } else {
    const customItems = container.querySelectorAll(".peneira-customizada");
    customItems.forEach(el => el.remove());
  }

  if (!viewJogadorOnly && peneirasSalvas.length === 0) {
    container.innerHTML = `<li style="text-align: center; color: #94a3b8;">Nenhuma peneira agendada recentemente.</li>`;
    return;
  }

  peneirasSalvas.forEach(peneira => {
    const li = document.createElement("li");
    
    if (viewJogadorOnly) {
      li.className = "peneira-customizada";
      li.innerHTML = `${peneira.localidade} (${peneira.categoria}) - ${peneira.horario} <span class="badge badge-verde">Aberta (Nova)</span>`;
    } else {
      li.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
          <div>
            <strong>${peneira.localidade}</strong><br>
            <span style="font-size: 0.8rem; color: #cbd5e1;">Cat: ${peneira.categoria} | Horário: ${peneira.horario}</span>
          </div>
          <button class="btn-cancelar" data-id="${peneira.id}" style="width: auto; padding: 5px 10px; background: #ef4444; color: #fff; font-size: 0.8rem; margin: 0; border-radius: 4px;">Excluir</button>
        </div>
      `;
    }
    container.appendChild(li);
  });

  // Configura ação de exclusão da peneira (Área do Funcionário)
  if (!viewJogadorOnly) {
    const botoesCancelar = container.querySelectorAll(".btn-cancelar");
    botoesCancelar.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idExcluir = e.target.getAttribute("data-id");
        if (confirm("Deseja realmente cancelar e excluir este agendamento de peneira?")) {
          let list = JSON.parse(localStorage.getItem("peneiras_marcadas")) || [];
          list = list.filter(item => item.id !== idExcluir);
          localStorage.setItem("peneiras_marcadas", JSON.stringify(list));
          
          alert("Peneira cancelada.");
          renderizarPeneirasDoLocalStorage(elementId, false);
        }
      });
    });
  }
}

// Chat Interativo (chat.html)
function inicializarChat(form) {
  const chatTitulo = document.getElementById("chat-titulo");
  const chatMensagens = document.getElementById("chat-mensagens");
  const msgInput = document.getElementById("msg-input");
  const btnVoltar = document.getElementById("chat-btn-voltar");

  const params = new URLSearchParams(window.location.search);
  const nomeConversa = params.get("nome");
  const roleOrigem = params.get("role");

  if (nomeConversa) {
    chatTitulo.textContent = `Conversa com ${nomeConversa}`;
  } else {
    chatTitulo.textContent = `Conversa com Treinador Silva`;
  }

  // Redireciona o botão de voltar dinamicamente
  if (btnVoltar) {
    if (roleOrigem === "funcionario") {
      btnVoltar.href = "funcionario.html";
    } else {
      btnVoltar.href = "peneiras.html";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = msgInput.value.trim();
    if (!texto) return;

    const msgEu = document.createElement("div");
    msgEu.className = "msg msg-eu";
    msgEu.textContent = texto;
    chatMensagens.appendChild(msgEu);

    msgInput.value = "";
    msgInput.focus();

    chatMensagens.scrollTop = chatMensagens.scrollHeight;

    const interlocutor = nomeConversa || "Treinador Silva";
    
    // Resposta automática simulada após 1.5 segundos
    setTimeout(() => {
      const msgDeles = document.createElement("div");
      msgDeles.className = "msg msg-deles";
      
      let resposta = "Entendido. Vamos analisar seus dados físicos e entraremos em contato em breve.";
      const textoLower = texto.toLowerCase();

      if (textoLower.includes("oi") || textoLower.includes("olá") || textoLower.includes("bom dia") || textoLower.includes("boa tarde")) {
        resposta = `Olá! Tudo bem? Sou o ${interlocutor}. Prontos para as avaliações deste final de semana?`;
      } else if (textoLower.includes("peneira") || textoLower.includes("teste") || textoLower.includes("campo")) {
        resposta = "O teste presencial exige que você chegue com 30 minutos de antecedência. Traga RG, chuteira e atestado médico de aptidão física.";
      } else if (textoLower.includes("horário") || textoLower.includes("hora") || textoLower.includes("quando")) {
        resposta = "Confira a listagem de Peneiras Abertas no seu painel para ver o horário exato da sua localidade.";
      } else if (textoLower.includes("obrigado") || textoLower.includes("valeu") || textoLower.includes("tchau")) {
        resposta = "Disponha! Nos vemos em campo. Boa sorte nos treinos!";
      }

      msgDeles.textContent = resposta;
      chatMensagens.appendChild(msgDeles);
      chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }, 1500);
  });
}
