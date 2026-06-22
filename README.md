# Academia Pelé ⚽
### Projeto Front-End Interativo - Global Solution 2026

Este projeto representa o portal interativo da **Academia Pelé**, uma plataforma voltada para captação de novos talentos (peneiras) e monitoramento físico de atletas. Ele foi desenvolvido originalmente em HTML/CSS e evoluído com lógica de programação **JavaScript** dinâmica para atender aos requisitos da disciplina de **Web Development**.

---

## 📋 Integrantes do Grupo
*Os nomes completos e RMs dos integrantes estão disponíveis no arquivo [integrantes.txt](file:///C:/Users/User/Desktop/CHALLENGE/integrantes.txt).*

---

## 🛠️ Tecnologias Utilizadas
1. **HTML5**: Estrutura semântica das páginas.
2. **CSS3**: Estilização visual (tema moderno dark mode com detalhes esportivos em verde).
3. **JavaScript (ES6+)**: Implementação da interatividade dinâmica do DOM, recursos do BOM e persistência com `localStorage`.

---

## 🖥️ Manual de Interatividade (Instruções para Avaliação)

Este guia orienta o professor sobre como testar todas as interações dinâmicas implementadas via JavaScript em cada página do protótipo.

### 1. Fluxo de Cadastro do Jogador (`cadastro.html`)
* **Onde clicar**:
  1. Abra a página inicial `login.html` e clique em **"Sou Jogador"** (redireciona para `cadastro.html`).
  2. Preencha o formulário e clique no botão **"Cadastrar"**.
* **Comportamento Lógico/Visual Esperado**:
  * **Validação Dinâmica do DOM**: Se algum campo estiver incorreto (ex: nome curto, senha com menos de 6 caracteres ou CPF que não possua 11 números), a borda do input ficará vermelha (aplicando a classe `.error`) e um **alerta do navegador (BOM)** detalhará os erros encontrados.
  * **Simulação de Comunicação com Servidor (BOM & DOM)**: Ao preencher os campos corretamente e clicar em "Cadastrar", o botão mudará seu texto para *"Processando cadastro..."* e ficará temporariamente desabilitado.
  * **BOM setTimeout & Navigation**: Após um atraso simulado de **1.5 segundos** (simulando latência de rede), um alerta informará que o cadastro foi um sucesso e o navegador redirecionará automaticamente para `peneiras.html`.
  * **Persistência local (`localStorage`)**: O nome digitado e a posição são guardados para personalizar as telas seguintes.

---

### 2. Painel do Jogador & Cockpit de Telemetria (`peneiras.html`)
* **Onde clicar/observar**:
  1. O título da página será alterado dinamicamente para mostrar o nome do jogador cadastrado (ex: *"Painel de João da Silva ⚽"*).
  2. Aguarde **6 segundos** na página sem clicar em nada.
  3. Observe o bloco **"Telemetria do Atleta (Sensores)"** no centro da tela.
* **Comportamento Lógico/Visual Esperado**:
  * **Simulação de Sensor Fisiológico (BOM `setInterval` & DOM)**: A cada **3 segundos**, os valores de *Frequência Cardíaca*, *Velocidade Instantânea* e *Fadiga* mudam aleatoriamente simulando a transmissão de dados por sensores vestíveis (*wearables*).
  * **Mudança Dinâmica de Estilos (DOM)**:
    * Se a frequência cardíaca (bpm) estiver normal, o status do atleta exibe um badge **verde** (`badge-verde` - Seguro).
    * Se subir acima de 155 bpm, o badge muda para **amarelo** (`badge-amarelo` - Moderado).
    * Se exceder o limiar crítico de 175 bpm, o badge passa para **vermelho** (`badge-vermelho` - Perigo) e, na primeira ocorrência crítica, dispara um **alerta nativo (BOM)** simulando aviso de emergência de saúde do atleta.
  * **Logs de Sincronização Dinâmicos**: A tabela de logs na parte inferior é preenchida dinamicamente no DOM com um novo registro contendo carimbo de data/hora a cada medição. A tabela armazena no máximo 5 registros para manter a performance.
  * **Notificação de Convocação (BOM `setTimeout`)**: Exatamente após **6 segundos** do carregamento da página, surge um **alerta do navegador (BOM)** informando sobre a convocação. Logo em seguida, o status no DOM muda de *"Aguardando análise..."* para *"CONVOCADO!"* (com destaque verde) e o botão oculto **"Falar com Treinador"** torna-se visível na tela.

---

### 3. Acesso e Área do Funcionário (`login-funcionario.html` e `funcionario.html`)
* **Onde clicar/observar**:
  1. Acesse `login-funcionario.html` e tente realizar o login.
  2. No campo **E-mail**, digite um e-mail institucional corporativo que termine obrigatoriamente com `@peleacademia.com`.
  3. Clique em **"Entrar"** para acessar a área administrativa.
* **Comportamento Lógico/Visual Esperado**:
  * **Validação do Login**: Se o e-mail não pertencer ao domínio corporativo, o sistema bloqueia o acesso e alerta o erro de domínio corporativo.
  * **Simulação de Carregamento**: Após 1 segundo, o sistema autentica, salva o nome do funcionário e o encaminha para o painel de controle administrativo (`funcionario.html`).
  * **Agendamento de Peneiras (CRUD dinâmico via LocalStorage)**: Na seção *"Marcar Peneira"*, preencha os dados e clique em **"Marcar Peneira"**. O item será inserido na lista *"Peneiras Marcadas"* abaixo na mesma hora.
  * **Comunicação entre páginas**: Ao agendar uma peneira no painel do funcionário, ela é salva no `localStorage`. Ao acessar o painel do jogador (`peneiras.html`), a nova peneira cadastrada aparecerá listada lá automaticamente em tempo real!
  * **Exclusão de Registros**: O funcionário pode clicar em **"Excluir"** ao lado de qualquer peneira criada para removê-la instantaneamente da persistência e da interface.
  * **Iniciar Conversa com Jogador**: Digite um nome no campo *"Contatar Jogador"* e clique em *"Iniciar conversa"*. Você será redirecionado para a página de chat já personalizada com o nome do jogador.

---

### 4. Chat Interativo (`chat.html`)
* **Onde clicar**:
  1. Digite uma mensagem na caixa de texto na parte inferior e pressione **Enter** ou clique em **"Enviar"**.
* **Comportamento Lógico/Visual Esperado**:
  * **DOM Dinâmico**: A mensagem enviada é inserida na caixa de chat imediatamente no lado direito da tela (com balão verde de identificação do remetente).
  * **Simulação de Chat (BOM `setTimeout`)**: Exatamente **1.5 segundos** após o seu envio, o interlocutor responde dinamicamente com mensagens inteligentes pré-configuradas baseadas nas suas palavras-chave (ex: digite *"olá"*, *"peneira"*, *"horário"* ou *"obrigado"* para obter respostas correspondentes contextuais).
  * **Navegação Dinâmica**: O botão de retorno "← Voltar" sabe dinamicamente se você veio do painel do jogador ou do painel de funcionário, redirecionando para a página correta correspondente.

---

## 📂 Organização dos Arquivos
* `cadastro.html` - Formulário de cadastro de novos jogadores com validações robustas.
* `login-funcionario.html` - Autenticação restrita com e-mail corporativo.
* `funcionario.html` - Central de agendamento de peneiras e contatos de recrutamento.
* `peneiras.html` - Visualização do atleta, acompanhamento de convocações e dashboard de biometria/wearables.
* `chat.html` - Canal de comunicação interativo entre atletas e avaliadores.
* `style.css` - Centralização das regras de design responsivo e interações visuais.
* `app.js` - Arquivo unificado contendo toda a lógica de programação JavaScript de manipulação do DOM e BOM.
* `integrantes.txt` - Identificação dos componentes da equipe.
