# PRD_SPEC — Coffee Delivery

## 1. Visão do produto

O **Coffee Delivery** é uma Single Page Application de e-commerce para uma cafeteria fictícia. O usuário navega por um catálogo de cafés, monta o carrinho, informa o endereço de entrega, escolhe a forma de pagamento e finaliza um pedido fictício (sem cobrança real).

- **Público-alvo:** pessoas que querem pedir café pelo celular ou computador de forma rápida.
- **Objetivo acadêmico:** aplicar React, TypeScript, Context API, `useReducer`, Hooks, Props, React Router, React Hook Form, Zod e LocalStorage, seguindo fielmente o protótipo do Figma.
- **Referência visual:** protótipo "Coffee Delivery • Projeto Final React" no Figma (ver `docs/evidencias/figma-layout.png`).

## 2. Escopo

| Dentro do escopo | Fora do escopo |
|---|---|
| Catálogo com 14 cafés | Pagamento real / gateway |
| Carrinho com quantidade e remoção | Login e cadastro de usuário |
| Checkout com endereço e pagamento | Back-end / banco de dados |
| Página de pedido confirmado | Rastreamento real da entrega |
| Persistência do carrinho no LocalStorage | Painel administrativo |
| Dark Mode / Light Mode | Internacionalização |
| Layout responsivo (mobile, tablet, desktop) | |

## 3. Requisitos funcionais (RF)

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | Exibir o catálogo de cafés com imagem, tags, nome, descrição e preço | Alta |
| RF02 | Permitir escolher a quantidade (1 a 99) no card antes de adicionar ao carrinho | Alta |
| RF03 | Adicionar o café ao carrinho; se já existir, somar a quantidade | Alta |
| RF04 | Exibir no header um contador com o total de unidades no carrinho | Alta |
| RF05 | Na tela de checkout, listar os cafés selecionados com controle de quantidade e botão "Remover" | Alta |
| RF06 | Calcular total dos itens, taxa de entrega e total do pedido | Alta |
| RF07 | Formulário de endereço: CEP, Rua, Número, Complemento (opcional), Bairro, Cidade e UF | Alta |
| RF08 | Seleção obrigatória da forma de pagamento: Cartão de crédito, Cartão de débito ou Dinheiro | Alta |
| RF09 | Validar o formulário com React Hook Form + Zod e exibir mensagens de erro | Alta |
| RF10 | Ao confirmar, limpar o carrinho e redirecionar para a página de sucesso | Alta |
| RF11 | Página de sucesso exibe endereço, previsão (20–30 min) e forma de pagamento escolhida | Alta |
| RF12 | Persistir o carrinho no LocalStorage e restaurá-lo ao recarregar a página | Alta |
| RF13 | Alternar entre Light Mode e Dark Mode, lembrando a escolha do usuário | Alta |
| RF14 | Preencher Rua/Bairro/Cidade/UF automaticamente a partir do CEP (ViaCEP), sem bloquear o preenchimento manual | Baixa |
| RF15 | Exibir no header a localização de entrega (escolhida > último pedido > padrão "Porto Alegre, RS") | Média |
| RF16 | Ao clicar na localização do header, abrir um mini modal para buscar o endereço pelo CEP e definir a nova localização | Média |
| RF17 | A localização escolhida fica salva e pré-preenche o endereço do checkout | Média |
| RF18 | Exibir um feedback visual ao adicionar um café à sacola (aviso com o café e a quantidade, atalho "Ver sacola" e animação do ícone do carrinho) | Média |

## 4. Requisitos não funcionais (RNF)

| ID | Requisito |
|---|---|
| RNF01 | Desenvolvido com React 19, Vite e TypeScript em modo `strict` |
| RNF02 | Interface responsiva a partir de 320px de largura (mobile, tablet e desktop) |
| RNF03 | Fidelidade visual ao Figma (cores, tipografia Baloo 2 + Roboto, espaçamentos) |
| RNF04 | Acessibilidade: textos alternativos, `aria-label` em botões só com ícone, foco visível, contraste adequado nos dois temas |
| RNF05 | Código organizado em componentes reutilizáveis, sem lógica de negócio duplicada |
| RNF06 | Lint sem erros (`npm run lint`) e testes passando (`npm test`) antes de cada commit |
| RNF07 | Versionamento com Git usando commits pequenos e descritivos (Conventional Commits) |
| RNF08 | Imagens servidas na resolução original do Figma (sem perda de qualidade) |

## 5. Regras de negócio (RN)

| ID | Regra |
|---|---|
| RN01 | Todos os cafés custam **R$ 9,90** |
| RN02 | A taxa de entrega é fixa em **R$ 3,50** e só é cobrada se houver itens no carrinho |
| RN03 | A quantidade de cada café fica entre **1 e 99**; para tirar o item usa-se "Remover" |
| RN04 | Não é possível confirmar o pedido com o carrinho vazio |
| RN05 | O carrinho salvo guarda apenas `id` e `quantidade`; nome, preço e imagem sempre vêm do catálogo |
| RN06 | Dados inválidos no LocalStorage são descartados sem quebrar a aplicação |
| RN07 | Após a confirmação, o carrinho é esvaziado |
| RN08 | O pagamento é feito na entrega (pedido fictício) |
| RN09 | Só é possível confirmar uma nova localização depois que o CEP for encontrado |
| RN10 | O aviso de "adicionado à sacola" some sozinho em ~3 s (pausa com o mouse em cima) e é substituído a cada nova adição |

## 6. Critérios de aceite

**Catálogo e carrinho**
- [x] Dado que acesso a home, vejo os 14 cafés do Figma com imagem, tags, nome, descrição e preço.
- [x] Dado que escolho 3 unidades e clico no carrinho do card, o contador do header aumenta 3.
- [x] Dado que adiciono um café que já está no carrinho, a quantidade é somada (não duplica o item).
- [x] Dado que recarrego a página, o carrinho continua com os mesmos itens.

**Checkout**
- [x] Dado que deixo campos obrigatórios vazios e clico em "Confirmar pedido", vejo as mensagens de erro de cada campo.
- [x] Dado que digito um CEP com menos de 8 dígitos, vejo "Informe um CEP válido".
- [x] Dado que não escolho a forma de pagamento, vejo o erro correspondente.
- [x] Dado que altero a quantidade de um item, os totais são recalculados na hora.
- [x] Dado que clico em "Remover", o item sai do carrinho e os totais são recalculados.
- [x] Dado que o carrinho está vazio, o botão "Confirmar pedido" fica desabilitado e há um link para voltar ao catálogo.

**Sucesso**
- [x] Dado que o formulário é válido, sou levado para `/success` com endereço e pagamento que informei.
- [x] Dado que acesso `/success` sem ter feito pedido, sou redirecionado para a home.

**Localização**
- [x] Dado que clico em "Porto Alegre, RS" no header, abre um mini modal com o campo de CEP já focado.
- [x] Dado que digito um CEP válido, vejo rua, bairro e cidade encontrados e posso clicar em "Usar este endereço".
- [x] Dado que confirmo, o header passa a mostrar a nova cidade/UF e o checkout já vem preenchido.
- [x] Dado que digito um CEP inexistente, vejo "CEP não encontrado" e o botão fica desabilitado.
- [x] Dado que aperto Esc ou clico fora, o modal fecha.

**Feedback de sacola**
- [x] Dado que adiciono um café, vejo um aviso com a imagem, "N× Nome do café" e o link "Ver sacola", e o ícone do carrinho dá um pequeno pulo.
- [x] Dado que clico em "Ver sacola", vou para o checkout e o aviso fecha.

**Tema e responsividade**
- [x] Dado que clico no botão de tema, as cores mudam para o Dark Mode e a escolha é lembrada ao recarregar.
- [x] Dado que acesso em um celular (390px), o layout se reorganiza em uma coluna sem rolagem horizontal.
- [x] Dado que acesso em um tablet (768px), o catálogo aparece em 2 colunas; a partir de 900px em 3 e de 1160px em 4.
