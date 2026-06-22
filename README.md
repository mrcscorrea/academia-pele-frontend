# Academia Pelé ⚽
### Projeto Front-End Interativo — Global Solution 2026
**Disciplinas:** Web Development & Front-End Design  
**Grupo:** TF3

Este é o portal interativo da **Academia Pelé**, uma plataforma para captação de novos talentos (peneiras) e monitoramento físico de atletas. O projeto iniciou com estrutura estática em HTML e CSS e evoluiu com lógica JavaScript para tornar as páginas dinâmicas e interativas.

---

## 👥 Integrantes — Grupo TF3
As informações de identificação também estão disponíveis no arquivo [integrantes.txt](file:///C:/Users/User/Desktop/academia-pele-frontend/integrantes.txt).

* **Arthur Bergami Lucas** — RM 570679
* **Davi Martins Herculano** — RM 572699
* **Felipe Braga Terzella** — RM 573529
* **Marcos Vinícios Corrêa dos Santos** — RM 571080
* **Victor Lopes Tavares da Fonseca** — RM 571315

---

## 📚 Informações por Disciplina

### 🖥️ 1. Web Development (WEBDEV)
Esta seção descreve os requisitos, o comportamento técnico de manipulação do DOM e BOM, e as validações em JavaScript implementadas para a disciplina de Web Development.

#### 🛠️ Tecnologias Utilizadas
1. **HTML5**: Estrutura semântica das páginas.
2. **CSS3**: Estilização visual (tema moderno dark mode com detalhes esportivos em verde).
3. **JavaScript (ES6+)**: Implementação da interatividade dinâmica do DOM, recursos do BOM e persistência com `localStorage`.

#### 🖥️ Manual de Interatividade (Instruções para Avaliação)
Este guia orienta sobre como testar todas as interações dinâmicas implementadas via JavaScript em cada página do protótipo.

##### A. Fluxo de Cadastro do Jogador ([cadastro.html](file:///C:/Users/User/Desktop/academia-pele-frontend/cadastro.html))
* **Onde clicar**:
  1. Abra a página inicial [index.html](file:///C:/Users/User/Desktop/academia-pele-frontend/index.html) e clique em **"Sou Jogador"** (redireciona para [cadastro.html](file:///C:/Users/User/Desktop/academia-pele-frontend/cadastro.html)).
  2. Preencha o formulário e clique no botão **"Cadastrar"**.
* **Comportamento Lógico/Visual Esperado**:
  * **Validação Dinâmica do DOM**: Se algum campo estiver incorreto (ex: nome curto, senha com menos de 6 caracteres ou CPF que não possua 11 números), a borda do input ficará vermelha (aplicando a classe `.error`) e um **alerta do navegador (BOM)** detalhará os erros encontrados.
  * **Simulação de Comunicação com Servidor (BOM & DOM)**: Ao preencher os campos corretamente e clicar em "Cadastrar", o botão mudará seu texto para *"Processando cadastro..."* e ficará temporariamente desabilitado.
  * **BOM setTimeout & Navigation**: Após um atraso simulado de **1.5 segundos** (simulando latência de rede), um alerta informará que o cadastro foi um sucesso e o navegador redirecionará automaticamente para [peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html).
  * **Persistência local (`localStorage`)**: O nome digitado e a posição são guardados para personalizar as telas seguintes.

##### B. Painel do Jogador & Cockpit de Telemetria ([peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html))
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

##### C. Acesso e Área do Funcionário ([login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html) e [funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/funcionario.html))
* **Onde clicar/observar**:
  1. Acesse [login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html) e tente realizar o login.
  2. No campo **E-mail**, digite um e-mail institucional corporativo que termine obrigatoriamente com `@peleacademia.com`.
  3. Clique em **"Entrar"** para acessar a área administrativa.
* **Comportamento Lógico/Visual Esperado**:
  * **Validação do Login**: Se o e-mail não pertencer ao domínio corporativo, o sistema bloqueia o acesso e alerta o erro de domínio corporativo.
  * **Simulação de Carregamento**: Após 1 segundo, o sistema autentica, salva o nome del funcionário e o encaminha para o painel de controle administrativo ([funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/funcionario.html)).
  * **Agendamento de Peneiras (CRUD dinâmico via LocalStorage)**: Na seção *"Marcar Peneira"*, preencha os dados e clique em **"Marcar Peneira"**. O item será inserido na lista *"Peneiras Marcadas"* abaixo na mesma hora.
  * **Comunicação entre páginas**: Ao agendar uma peneira no painel do funcionário, ela é salva no `localStorage`. Ao acessar o painel do jogador ([peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html)), a nova peneira cadastrada aparecerá listada lá automaticamente em tempo real!
  * **Exclusão de Registros**: O funcionário pode clicar em **"Excluir"** ao lado de qualquer peneira criada para removê-la instantaneamente da persistência e da interface.
  * **Iniciar Conversa com Jogador**: Digite um nome no campo *"Contatar Jogador"* e clique em *"Iniciar conversa"*. Você será redirecionado para a página de chat já personalizada com o nome do jogador.

##### D. Chat Interativo ([chat.html](file:///C:/Users/User/Desktop/academia-pele-frontend/chat.html))
* **Onde clicar**:
  1. Digite uma mensagem na caixa de texto na parte inferior e pressione **Enter** ou clique em **"Enviar"**.
* **Comportamento Lógico/Visual Esperado**:
  * **DOM Dinâmico**: A mensagem enviada é inserida na caixa de chat imediatamente no lado direito da tela (com balão verde de identificação do remetente).
  * **Simulação de Chat (BOM `setTimeout`)**: Exatamente **1.5 segundos** após o seu envio, o interlocutor responde dinamicamente com mensagens inteligentes pré-configuradas baseadas nas suas palavras-chave (ex: digite *"olá"*, *"peneira"*, *"horário"* ou *"obrigado"* para obter respostas correspondentes contextuais).
  * **Navegação Dinâmica**: O botão de retorno "← Voltar" sabe dinamicamente se você veio do painel do jogador ou do painel de funcionário, redirecionando para a página correta correspondente.

#### 📂 Organização dos Arquivos
* [cadastro.html](file:///C:/Users/User/Desktop/academia-pele-frontend/cadastro.html) - Formulário de cadastro de novos jogadores com validações robustas.
* [login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html) - Autenticação restrita com e-mail corporativo.
* [funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/funcionario.html) - Central de agendamento de peneiras e contatos de recrutamento.
* [peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html) - Visualização do atleta, acompanhamento de convocações e dashboard de biometria/wearables.
* [chat.html](file:///C:/Users/User/Desktop/academia-pele-frontend/chat.html) - Canal de comunicação interativo entre atletas e avaliadores.
* [css/style.css](file:///C:/Users/User/Desktop/academia-pele-frontend/css/style.css) - Centralização das regras de design responsivo e interações visuais.
* [js/app.js](file:///C:/Users/User/Desktop/academia-pele-frontend/js/app.js) - Arquivo unificado contendo toda a lógica de programação JavaScript de manipulação do DOM e BOM.
* [integrantes.txt](file:///C:/Users/User/Desktop/academia-pele-frontend/integrantes.txt) - Identificação dos componentes da equipe.

---

### 🎨 2. Front-End Design
Esta seção apresenta o escopo, a usabilidade, a responsividade e as especificações de design do portal interativo da Academia Pelé para a disciplina de Front-End Design.

#### 🎯 O Que o Site Faz
O sistema atende a dois perfis de usuários com fluxos distintos:
* **Jogador**: Realiza o cadastro, consulta as peneiras disponíveis e acompanha seus dados de telemetria física.
* **Funcionário**: Realiza o login corporativo, gerencia (agenda/exclui) peneiras e comunica-se com os atletas.

#### 🛠️ Tecnologias e Design Responsivo
* **HTML5**: Estruturação semântica do layout.
* **CSS3 (Design e Customização)**: Estilização com tema moderno *dark mode* e detalhes em verde esportivo. Totalmente responsivo, adaptando-se a telas de computadores e smartphones.
* **JavaScript (UX & Transição)**: Transições dinâmicas de estados e manipulação do DOM para enriquecer a experiência do usuário.

#### 🚀 Como Abrir e Executar o Projeto
1. Faça o download de todos os arquivos do projeto e mantenha-os na mesma estrutura de diretórios.
2. Dê dois cliques no arquivo [index.html](file:///C:/Users/User/Desktop/academia-pele-frontend/index.html).
3. O portal será exibido no seu navegador web padrão.
4. Navegue entre as telas utilizando os botões interativos.
*(Não é necessária instalação de pacotes, dependências ou servidores locais).*

#### 📁 Tabela de Organização dos Arquivos

| Arquivo / Caminho | Função na Interface / Experiência do Usuário (UX) |
| :--- | :--- |
| [index.html](file:///C:/Users/User/Desktop/academia-pele-frontend/index.html) | Tela inicial de boas-vindas para seleção de perfil (Jogador ou Funcionário). |
| [cadastro.html](file:///C:/Users/User/Desktop/academia-pele-frontend/cadastro.html) | Formulário de cadastro de novos jogadores com validações visuais em tempo real. |
| [login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html) | Tela de login restrito para acesso da equipe administrativa. |
| [funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/funcionario.html) | Painel administrativo para agendamento de peneiras e contato com jogadores. |
| [peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html) | Painel do atleta contendo telemetria em tempo real e notificações de convocações. |
| [chat.html](file:///C:/Users/User/Desktop/academia-pele-frontend/chat.html) | Canal de conversa entre atletas e avaliadores. |
| [css/style.css](file:///C:/Users/User/Desktop/academia-pele-frontend/css/style.css) | Folha de estilos centralizando a identidade visual, responsividade e estilos. |
| [js/app.js](file:///C:/Users/User/Desktop/academia-pele-frontend/js/app.js) | Lógica de comportamento visual, alertas e simulações. |
| [integrantes.txt](file:///C:/Users/User/Desktop/academia-pele-frontend/integrantes.txt) | Arquivo de texto contendo a listagem dos integrantes do grupo. |

#### 🖥️ Manual de Interatividade e Fluxos (Perspectiva de Usabilidade)

##### A. Cadastro do Jogador ([cadastro.html](file:///C:/Users/User/Desktop/academia-pele-frontend/cadastro.html))
* **Fluxo**: O usuário inicia em [index.html](file:///C:/Users/User/Desktop/academia-pele-frontend/index.html), acessa "Sou Jogador", preenche o formulário e clica em "Cadastrar".
* **Comportamento e Feedback Visual**:
  * **Validação dos campos**: Caso haja erro em algum campo (como nome curto, senha com menos de 6 caracteres ou CPF sem 11 números), a borda do input fica vermelha e é exibido um alerta explicativo.
  * **Simulação de Envio**: Quando os dados estão corretos, o botão muda para "Processando cadastro..." e fica desabilitado para indicar o estado de processamento da ação.
  * **Feedback Visual e Redirecionamento**: Após 1.5 segundos, é gerado um feedback de sucesso e o usuário é redirecionado para a página [peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html).
  * **Persistência de Sessão**: O nome e a posição do jogador ficam guardados para personalizar o cabeçalho e outras telas.

##### B. Painel do Jogador ([peneiras.html](file:///C:/Users/User/Desktop/academia-pele-frontend/peneiras.html))
* **Fluxo**: Ao acessar a tela, o título se altera dinamicamente com o nome do jogador. Após 6 segundos sem interação, a convocação é acionada.
* **Comportamento e Feedback Visual**:
  * **Sensores de Monitoramento**: Simulação a cada 3 segundos das métricas de batimento, velocidade e fadiga (wearables).
  * **Cores de Status (Feedback Visual)**:
    * Batimento seguro: Badge **Verde** (`badge-verde`).
    * Batimento moderado (acima de 155 bpm): Badge **Amarelo** (`badge-amarelo`).
    * Batimento de perigo (acima de 175 bpm): Badge **Vermelho** (`badge-vermelho`) com disparo de alerta de emergência.
  * **Histórico/Tabela**: Uma tabela na parte inferior registra as últimas 5 atualizações com os respectivos horários.
  * **Status de Convocação**: O status muda de "Aguardando análise..." para "CONVOCADO!" (destacado em verde) e exibe o botão "Falar com Treinador".

##### C. Área do Funcionário ([login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html) e [funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/funcionario.html))
* **Fluxo**: Em [login-funcionario.html](file:///C:/Users/User/Desktop/academia-pele-frontend/login-funcionario.html), insira um e-mail com domínio `@peleacademia.com` para acessar a central.
* **Comportamento e Feedback Visual**:
  * **Validação de Domínio**: Garante que apenas funcionários acessem a área administrativa.
  * **Marcar Peneiras**: Agendamento dinâmico que atualiza a tabela de peneiras e se reflete no painel do jogador (via `localStorage`).
  * **Exclusão de Registros**: Botão "Excluir" remove os registros instantaneamente da visualização e do armazenamento.
  * **Acesso ao Chat**: Possibilita iniciar um chat pré-configurado com o nome do jogador digitado.

##### D. Chat ([chat.html](file:///C:/Users/User/Desktop/academia-pele-frontend/chat.html))
* **Fluxo**: Digite uma mensagem e envie.
* **Comportamento e Feedback Visual**:
  * **Balões de Mensagens**: Mensagens enviadas aparecem à direita em balão verde.
  * **Respostas Inteligentes**: O sistema responde automaticamente após 1.5s com base em palavras-chave.
  * **Voltar Inteligente**: O botão de retorno rastreia a página de origem e redireciona adequadamente.
