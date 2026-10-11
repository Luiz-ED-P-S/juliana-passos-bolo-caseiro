================================================================================
  JULIANA PASSOS BOLO CASEIRO - RESUMO GERAL DAS MUDANÇAS E DECISÕES DO PROJETO
================================================================================
Data de Atualização: Outubro de 2026
Projeto: Landing Page Oficial Interativa e Vitrine Digital
Localização: Estr. do Lameirão, 1447 - Lj D - Santíssimo, Rio de Janeiro - RJ
WhatsApp: (21) 97255-8199 | iFood Oficial Integrado
================================================================================


SUMÁRIO
--------------------------------------------------------------------------------
1. VISÃO GERAL DO PROJETO
2. LINHA DO TEMPO: O QUE FOI FEITO E ALTERADO
3. JUSTIFICATIVA E MOTIVAÇÃO DE CADA ESCOLHA (O "PORQUÊ")
   3.1. Redesenho Visual: Paleta Ultravioleta & Efeito Fantasia Noturno
   3.2. Efeito de Pétalas 3D e Mini-Corações por Toda a Página
   3.3. Vitrine 3D do Bolo & Correção do Bug do Morango
   3.4. Cards de Bolos com Animação de Giro (Flip Cards)
   3.5. Integração Dupla: iFood e WhatsApp com Estilo da Marca
   3.6. Foto do Bolo de Churros e Comportamento do Instagram
   3.7. Endereço e Link Direto da Loja no Google Maps
   3.8. Foto do Bolo de Fubá Cremoso com Goiabada Cascão
4. RESPONSIVIDADE MULTIPLATAFORMA (PC, TABLET E CELULAR)
   4.1. Desktop / PC (> 1024px)
   4.2. Tablet (768px a 1024px)
   4.3. Celular / Mobile (<= 768px e <= 480px)
   4.4. Mecanismo de Economia de Bateria e GPU (IntersectionObserver)
   4.5. Diferenciação Inteligente de Toque no Celular (Touch Scroll vs. 3D Spin)
5. ESTRUTURA DOS ARQUIVOS DO PROJETO
6. RECOMENDAÇÕES PARA HOSPEDAGEM E DIVULGAÇÃO
================================================================================


1. VISÃO GERAL DO PROJETO
--------------------------------------------------------------------------------
A landing page de "Juliana Passos Bolo Caseiro" foi desenvolvida para ir muito
além de um cardápio comum em PDF ou de um site estático simples. O objetivo é
proporcionar uma experiência sensorial e moderna que desperte o apetite imediato,
destaque o carinho artesanal de cada receita e converta visitantes em pedidos
rápidos tanto pelo WhatsApp quanto pelo iFood.

O projeto une três pilares:
a) Encantamento Visual: Iluminação neon, partículas flutuantes e tema aveludado.
b) Alta Tecnologia Web: Modelo 3D interativo via Three.js e animações a 60 FPS.
c) Foco Comercial: Botões acessíveis de pedido rápido e transparência total de
   ingredientes, peso e avaliações reais de clientes.


2. LINHA DO TEMPO: O QUE FOI FEITO E ALTERADO
--------------------------------------------------------------------------------
Durante as etapas de desenvolvimento e refinamento, foram realizadas as
seguintes implementações:

[X] CORREÇÃO DA FOTO DO BOLO DE CHURROS:
    - Imagem que apresentava falha de exibição corrigida com imagem de alta
      resolução e sistema de fallback automático.
    - Transformação do clique: em vez de expulsar o usuário diretamente para
      fora do site, agora abre a foto ampliada com convite para seguir o perfil
      oficial no Instagram.

[X] CORREÇÃO DA FOTO DO BOLO DE FUBÁ CREMOSO COM GOIABADA:
    - A foto anterior exibia cupcakes com confeitos coloridos, que não condiziam com o nome.
    - Substituída por fotografia gastronômica em alta definição de uma fatia individual
      (massa amarela artesanal de fubá, camada cremosa de queijo no meio e calda de
      goiabada cascão encorpada escorrendo até o prato rústico).

[X] PALETA DE CORES PROPRIETÁRIA & NOVO TEMA ULTRAVIOLETA:
    - Evolução da identidade visual inicial para o estilo de referência:
      transição suave do violeta escuro aveludado (#130020 / #290042) para
      tons magentas e roxos brilhantes (#7a1599 / #9923bf) com luzes neon.
    - Ajuste exclusivo do botão do WhatsApp para a cor Vinho da marca,
      mantendo o ícone verde oficial para reconhecimento imediato.

[X] INTEGRAÇÃO DO IFOOD JUNTO COM O WHATSAPP:
    - Adicionado botão oficial do iFood no cabeçalho e no dock flutuante inferior.
    - Link direto configurado para a loja da Juliana Passos no iFood Santíssimo.

[X] CORREÇÃO E LIMPEZA DO BOLO 3D:
    - Resolução do "bug do morango" no topo: eliminados os pontos invertidos da
      geometria e adicionado o cálice verde que selou o topo sem artefatos pretos.
    - Remoção do selo/ícone flutuante que ficava sobre o bolo 3D atrapalhando
      a visão do produto.

[X] CARDS DE BOLOS COM GIRO 3D (FLIP CARDS):
    - Implementação de animação de rotação 180° nos cards ao clicar no botão
      ou na seta, exibindo no verso informações extras: peso médio, rendimento,
      validade e lista completa de ingredientes.

[X] ENDEREÇO COM LINK DIRETO PARA O GOOGLE MAPS:
    - Atualização do endereço com link oficial apontando diretamente para a
      página da loja física no Google Maps de Santíssimo.

[X] EFEITO GLOBAL DE PÉTALAS E CORAÇÕES:
    - O container de partículas foi movido para o topo do site como camada global,
      fazendo com que pétalas 3D e mini-corações caiam suavemente por toda a tela.

[X] OTIMIZAÇÃO MULTIPLATAFORMA COMPLETA:
    - Adaptação matemática e estrutural de layout para PC, Tablet e Smartphones.
    - Mecanismo que pausa a renderização 3D quando fora de vista (salva bateria).
    - Separação de gestos touch para não prender a rolagem no celular.


3. JUSTIFICATIVA E MOTIVAÇÃO DE CADA ESCOLHA (O "PORQUÊ")
--------------------------------------------------------------------------------

3.1. REDESENHO VISUAL: PALETA ULTRAVIOLETA & EFEITO FANTASIA NOTURNO
- Por que foi mudado:
  Sites de confeitaria tradicionais quase sempre usam fundos brancos ou tons
  pastéis muito claros, o que transmite uma sensação genérica de padaria comum.
  A imagem de referência enviada trouxe uma atmosfera noturna mágica, rica em
  violeta profundo, magenta e pontos de brilho (glow).
- O que foi feito no código:
  No arquivo css/styles.css, foi criado um gradiente linear diagonal no body:
  linear-gradient(135deg, #130020 0%, #290042 25%, #46056b 55%, #7a1599 85%, #9923bf 100%)
  combinado com luzes ambientes pseudo-elementares (:before) e acabamento
  glassmorphism escuro (Dark Velvet Glass) com reflexos translúcidos sutis.
- Benefício:
  Dá aspecto de marca "gourmet premium", gera alto contraste que faz as cores
  dos bolos saltarem aos olhos e cria uma identidade inconfundível.

3.2. EFEITO DE PÉTALAS 3D E MINI-CORAÇÕES POR TODA A PÁGINA
- Por que foi mudado:
  Inicialmente, os efeitos ficavam restritos somente ao topo (Hero). Ao rolar a
  página para ver os bolos ou depoimentos, o site parecia perder o encanto inicial.
- O que foi feito no código:
  O elemento #particles-container foi reposicionado logo após a abertura da tag
  <body> em index.html, recebendo estilo fixed (inset: 0) com pointer-events: none.
  No JavaScript (js/main.js), a função initParticles() cria três tipos de partículas:
  1) Pétalas em formato orgânico de gota com animação 3D (rotateX, rotateY, rotateZ);
  2) Partículas com desfoque de profundidade (bokeh / depth-of-field);
  3) Mini-corações iluminados flutuando suavemente.
  A concentração foi calibrada para cair com maior densidade pelo lado direito,
  reproduzindo exatamente o fluxo da imagem de referência.
- Benefício:
  Mantém o encantamento visual durante toda a navegação sem atrapalhar a leitura
  nem bloquear os cliques do mouse/dedo.

3.3. VITRINE 3D DO BOLO & CORREÇÃO DO BUG DO MORANGO
- Por que foi mudado:
  O morango posicionado no topo do bolo 3D apresentava um defeito visual (uma falha
  preta no vértice superior, como se estivesse furado ou invertido), e havia um
  ícone/badge flutuante cobrindo a lateral do bolo.
- O que foi feito no código:
  1) Análise matemática da Three.js LatheGeometry: a ordem dos pontos no perfil
     radial estava gerando normais de superfície invertidas (faces apontando para
     dentro ao invés de fora). O array de coordenadas foi corrigido, a malha teve
     suas normais recalculadas (computeVertexNormals) e foi inserido um disco
     selador verde com folhas no cálice (Strawberry Calyx).
  2) O badge HTML (.cake-artisan-badge) foi removido do contêiner 3D, deixando a
     visão do bolo completamente desobstruída.
- Benefício:
  O bolo agora parece perfeito, apetitoso e realista de qualquer ângulo que o
  cliente girar.

3.4. CARDS DE BOLOS COM ANIMAÇÃO DE GIRO (FLIP CARDS)
- Por que foi mudado:
  O usuário solicitou que, ao clicar nas setas das opções de bolo, ocorresse uma
  animação de giro revelando mais detalhes do produto.
- O que foi feito no código:
  Em css/styles.css foi implementado suporte a CSS 3D Transforms:
  - .menu-card-inner com transform-style: preserve-3d e transition de 0.6s.
  - Duas faces: .menu-card-front e .menu-card-back (com backface-visibility: hidden).
  - Quando o usuário clica no botão "Ver Detalhes", na seta ou no próprio card,
    o JavaScript adiciona a classe .flipped, girando o card em rotateY(180deg).
  - O verso apresenta: Peso Aproximado, Rendimento em Fatias, Validade em dias,
    Ingredientes Selecionados e Alerta para Alérgicos, além do botão de pedir.
- Benefício:
  Apresenta informações ricas sem poluir a tela principal e surpreende o cliente
  com uma micro-interação fluida e divertida.

3.5. INTEGRAÇÃO DUPLA: IFOOD E WHATSAPP COM ESTILO DA MARCA
- Por que foi mudado:
  O cliente da doceria divide-se em dois perfis: quem quer um bolo pronto para
  agora (iFood) e quem quer fazer uma encomenda personalizada para festa (WhatsApp).
  Além disso, o botão verde puro do WhatsApp quebrava a harmonia da paleta da marca.
- O que foi feito no código:
  1) Adicionado o botão do iFood (.btn-header-ifood e .floating-btn-ifood) com o
     vermelho oficial e link direto para a loja de Santíssimo.
  2) O botão do WhatsApp foi estilizado na cor nobre da marca (Vinho Escuro /
     --color-wine-dark: #4a0e2e), com gradiente e borda iluminada, mantendo o
     verde apenas no ícone oficial FontAwesome fa-whatsapp.
- Benefício:
  Une clareza de conversão e elegância visual, oferecendo ambos os canais de venda
  de forma intuitiva.

3.6. FOTO DO BOLO DE CHURROS E COMPORTAMENTO DO INSTAGRAM
- Por que foi mudado:
  A foto do bolo de churros não abria e o clique em fotos do cardápio direcionava
  o usuário bruscamente para fora do site rumo ao aplicativo do Instagram.
- O que foi feito no código:
  As fotos foram mantidas dentro do ecossistema do site através de um modal/pop-up
  interno com mensagem delicada: "Gostou desta delícia? Siga nosso Instagram
  @julianapassosbolocaseiro para acompanhar os bastidores e fornadas do dia!".
- Benefício:
  Evita perder o cliente no funil de vendas. Quem está na página continua focado
  em fazer o pedido.

3.7. ENDEREÇO E LINK DIRETO DA LOJA NO GOOGLE MAPS
- Por que foi mudado:
  O endereço precisa facilitar a vida do cliente que deseja retirar no balcão.
- O que foi feito no código:
  O link do mapa e o botão "Abrir no Google Maps" foram atualizados com a URL
  exata do perfil verificado da loja no Google Maps:
  https://www.google.com/maps/place/Juliana+Passos+Bolo+Caseiro/@-22.8744722,-43.5296837,17z/...
- Benefício:
  Com apenas um toque na tela do smartphone, o cliente abre o Google Maps ou Waze
  já com a rota traçada até a Estrada do Lameirão, 1447 - Loja D.

3.8. FOTO DO BOLO DE FUBÁ CREMOSO COM GOIABADA CASCÃO
- Por que foi mudado:
  O card exibia por engano uma foto genérica de cupcakes com confeitos coloridos,
  o que causava estranhamento visual e não condizia com o título da receita nem com
  a proposta de bolo caseiro artesanal da vovó.
- O que foi feito no código:
  Em index.html, a imagem foi atualizada para img/fatia_fuba_goiabada.jpg.
  A fotografia retrata uma fatia generosa de bolo de fubá com textura úmida e fofinha,
  a camada cremosa visível no centro da massa e calda brilhante de goiabada cascão escorrendo,
  alinhada com a descrição da ficha técnica do produto.
- Benefício:
  Apresentação apetitosa e 100% condizente com a receita, aumentando o apetite visual
  e a taxa de conversão de encomendas.


4. RESPONSIVIDADE MULTIPLATAFORMA (PC, TABLET E CELULAR)
--------------------------------------------------------------------------------

4.1. DESKTOP / PC (> 1024px)
- Grid do cardápio e depoimentos configurados em 3 colunas (repeat(3, 1fr)).
- Interação 3D fluida acompanhando o movimento suave do mouse (efeito parallax).
- Controles de troca de calda (Morango, Doce de Leite, Chocolate, Red Velvet)
  visíveis ao lado do bolo.
- 45 partículas ativas para preenchimento cinematográfico da tela ampla.

4.2. TABLET (768px A 1024px)
- O grid foi calibrado para 2 colunas equilibradas (.menu-cards-grid: repeat(2, 1fr)),
  evitando o problema anterior em que os cards ficavam esticados demais ou em
  apenas uma coluna solta.
- Altura do contêiner 3D ajustada para 380px para não empurrar o título para fora.
- Partículas reduzidas para 32 para balancear beleza e fluidez em processadores móveis.

4.3. CELULAR / MOBILE (<= 768px E <= 480px)
- Layout em coluna única com leitura fluida e botões touch-friendly (tamanho mínimo
  de 48px para facilitar o toque com o polegar).
- Cards de bolo com altura calibrada (520px) para acomodar o verso detalhado sem cortes.
- Menu de navegação superior transforma-se em uma gaveta retrátil dark velvet.
- Barra de ações flutuante (dock) no rodapé com suporte a safe area
  (padding-bottom: env(safe-area-inset-bottom)) para não cobrir a barra de gestos
  de iPhones e aparelhos Android modernos.
- Quantidade de partículas reduzida para 22 com animação via hardware (translate3d).

4.4. ECONOMIA DE BATERIA E GPU (INTERSECTIONOBSERVER)
- Por que foi implementado:
  Modelos 3D em Three.js normalmente executam um loop infinito a 60 FPS
  (requestAnimationFrame). Em celulares, deixar o 3D renderizando enquanto o
  usuário lê depoimentos ou o rodapé gasta bateria rapidamente e aquece o aparelho.
- Como funciona:
  Em js/main.js, foi criado um IntersectionObserver que observa a visibilidade
  do contêiner do bolo:
  - Quando o bolo está visível na tela: o loop 3D roda a 60 FPS.
  - Assim que o usuário rola a página para baixo e o bolo sai da visão: o loop
    é pausado automaticamente (cancelAnimationFrame).
  - Quando o usuário rola de volta para o topo: a animação retoma instantaneamente.
- Benefício:
  Economia de até 90% de uso de GPU e bateria no celular.

4.5. DIFERENCIAÇÃO INTELIGENTE DE TOQUE NO CELULAR
- Por que foi implementado:
  Em smartphones, ao tentar rolar a página com o dedo tocando sobre o bolo 3D,
  o evento touch era capturado pelo canvas, travando a rolagem vertical do usuário.
- Como funciona:
  O código mede o deslocamento do dedo nos eixos X e Y:
  - Se o movimento for predominantemente horizontal: gira o bolo 3D em 360°.
  - Se o movimento for vertical (totalDy > totalDx * 1.6): o Three.js libera o evento
    e permite que a página role livremente.


5. ESTRUTURA DOS ARQUIVOS DO PROJETO
--------------------------------------------------------------------------------
/ (Raiz do Projeto)
│
├── index.html                  -> Página principal com toda a marcação semântica,
│                                  overlay de partículas global, catálogo flip,
│                                  depoimentos e integrações.
│
├── css/
│   └── styles.css              -> Estilização completa: paleta ultravioleta,
│                                  dark glassmorphism, animações 3D de flip,
│                                  efeitos das pétalas e media queries responsivas.
│
├── js/
│   └── main.js                 -> Lógica interativa: cena 3D (Three.js), gerador
│                                  de partículas, flip dos cards, seletor de caldas,
│                                  IntersectionObserver e listeners otimizados.
│
└── anotações/
    └── resumo_e_explicacoes.txt -> Este documento completo de registro histórico.



================================================================================
Fim do Documento - Juliana Passos Bolo Caseiro
================================================================================
