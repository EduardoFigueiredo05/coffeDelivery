# TECH_SPEC — Coffee Delivery

## 1. Stack

| Tecnologia | Uso |
|---|---|
| **React 19** | Biblioteca de UI |
| **Vite 8** | Bundler e servidor de desenvolvimento |
| **TypeScript 6** (`strict`) | Tipagem estática |
| **Tailwind CSS 4** | Estilização utilitária com design tokens em variáveis CSS |
| **React Router 7** | Rotas `/`, `/checkout` e `/success` (as duas últimas com *lazy loading*) |
| **Context API + useReducer** | Estado global do carrinho |
| **React Hook Form + Zod** | Formulário de checkout e validação |
| **ViaCEP** (API pública) | Autopreenchimento do endereço pelo CEP |
| **Phosphor Icons** | Ícones (os mesmos do Figma) |
| **@fontsource** | Fontes Baloo 2 e Roboto servidas localmente |
| **Vitest + Testing Library** | Testes unitários e de componentes |
| **ESLint + typescript-eslint** | Padronização de código |

## 2. Arquitetura de pastas

```
src/
├── assets/              # Imagens extraídas do Figma (PNG originais e SVG vetoriais)
│   └── coffees/         # 14 imagens dos cafés
├── components/          # Componentes reutilizáveis (Header, Logo, QuantityInput, IconBadge…)
├── contexts/            # CartContext, ThemeContext, LocationContext e CartFeedbackContext
├── data/                # Catálogo de cafés e constantes de negócio (taxa de entrega)
├── hooks/               # useCart, useTheme, useDeliveryLocation, useCartFeedback, useCepLookup
├── layouts/             # DefaultLayout (Header + <Outlet />)
├── pages/
│   ├── Home/            # Hero + CoffeeList + CoffeeCard
│   ├── Checkout/        # AddressForm, PaymentOptions, OrderSummary, CartItemRow
│   └── Success/         # Pedido confirmado
├── reducers/cart/       # types.ts, actions.ts, reducer.ts, storage.ts + testes
├── routes/              # Definição do router
├── schemas/             # Schema Zod do checkout + testes
├── services/            # viaCep.ts (busca de endereço)
├── test/                # Helper renderRoute para testes de integração
├── styles/global.css    # Tailwind + tokens de cor (light/dark)
└── utils/               # Formatação de moeda e máscara de CEP
```

O alias `@/` aponta para `src/` (configurado no `vite.config.ts` e no `tsconfig.app.json`).

## 3. Componentes

| Componente | Responsabilidade | Props principais |
|---|---|---|
| `Header` | Logo, localização e link do carrinho com contador | — (lê `useCart`) |
| `Logo` | Mascote criado com IA + nome da marca | `compact` |
| `QuantityInput` | Botões − / + com limites | `quantity`, `onIncrement`, `onDecrement`, `min`, `max`, `size` |
| `IconBadge` | Ícone branco em círculo colorido | `icon`, `variant` |
| `Hero` | Banner principal com benefícios | — |
| `CoffeeList` | Grid responsivo do catálogo | — |
| `CoffeeCard` | Card do café com quantidade local e botão de adicionar | `coffee` |
| `Input` | Campo com label acessível, "Opcional" e mensagem de erro | `label`, `error`, `optional` + props de `<input>` |
| `SectionCard` | Card com ícone, título e subtítulo do checkout | `icon`, `title`, `subtitle` |
| `ThemeToggle` | Alterna Light/Dark | — (lê `useTheme`) |
| `LocationPicker` | Botão de localização + mini modal de busca por CEP | `label` |
| `AddedToCartToast` | Aviso "Adicionado à sacola" com barra de tempo | — (lê `useCartFeedback`) |
| `AddressForm` | Campos de endereço, máscara de CEP e ViaCEP | via `useFormContext` |
| `PaymentOptions` | Radio buttons estilizados (crédito, débito, dinheiro) | via `useFormContext` |
| `OrderSummary` | Lista de cafés, totais e botão "Confirmar pedido" | `isSubmitting` |
| `CartItemRow` | Linha do carrinho com quantidade e "Remover" | `item` |

## 4. Gerenciamento de estado

### Carrinho — `CartContext` + `useReducer`

```
CoffeeCard ──addItem()──► CartContext ──dispatch(action)──► cartReducer ──► novo estado
                               │                                              │
                               └──────── useEffect(saveCartState) ◄───────────┘
```

- **Estado:** `{ items: { coffee, quantity }[], order: Order | null }` — `order` é o último pedido confirmado.
- **Ações:** `ADD_ITEM`, `INCREMENT_ITEM`, `DECREMENT_ITEM`, `REMOVE_ITEM`, `CLEAR_CART` e `CHECKOUT` (salva o pedido e esvazia o carrinho). Action creators em `actions.ts`.
- **Reducer puro e imutável** — sempre retorna um novo objeto; quantidades limitadas entre 1 e 99.
- **Valores derivados** (`totalQuantity`, `itemsTotal`, `deliveryFee`, `orderTotal`) são calculados com `useMemo` no provider, nunca armazenados.
- **Funções estáveis** com `useCallback` para evitar re-renderizações desnecessárias.
- O hook `useCart()` lança erro se usado fora do provider, evitando bugs silenciosos.

### Persistência — LocalStorage

- Chaves versionadas: `@coffee-delivery:cart-state-1.0.0` (carrinho) e `@coffee-delivery:last-order-1.0.0` (último pedido).
- O `useReducer` usa **inicialização preguiçosa** (`loadCartState`) para ler o storage apenas uma vez.
- Salvamos somente `{ id, quantity }`; ao carregar, cada item é reidratado a partir do catálogo. Itens desconhecidos ou JSON inválido são descartados.
- `try/catch` em leitura e escrita: se o LocalStorage estiver indisponível, o app segue funcionando em memória.

### Localização — `LocationContext`

- Guarda `{ cep, street, district, city, uf }` escolhidos no `LocationPicker` (chave `@coffee-delivery:location-1.0.0`).
- Hook `useDeliveryLocation` (nome escolhido para não conflitar com o `useLocation` do React Router).
- O header mostra: localização escolhida > cidade do último pedido > "Porto Alegre, RS".
- O checkout usa a localização como `defaultValues` e acompanha mudanças feitas com ele aberto.
- A busca por CEP é o hook `useCepLookup` (status `idle | loading | success | not-found`, com `AbortController`), compartilhado entre o modal e o formulário de checkout.
- O modal fecha com Esc, clique fora e ao confirmar; o foco vai para o campo ao abrir e volta para o botão ao fechar. No mobile vira um painel fixo com fundo escurecido.

### Feedback de sacola — `CartFeedbackContext`

- `notifyAdded(coffee, quantity)` é chamado pelo `CoffeeCard` logo depois do `addItem`.
- O provider guarda só o último evento (`{ id, coffee, quantity }`); o `id` muda a cada adição e é usado como `key` para reiniciar as animações.
- `AddedToCartToast` é renderizado no `DefaultLayout` (dentro do Router, por causa do `<Link>` "Ver sacola"). Some ao fim da animação da barra de progresso (`onAnimationEnd`), que pausa no hover/foco.
- O `Header` usa o mesmo `id` para o "pulo" do ícone do carrinho e do contador.
- Animações definidas com `@keyframes` no `@theme` do Tailwind e desligadas com `prefers-reduced-motion`.

### Tema — `ThemeContext`

- Classe `dark` no `<html>`; as cores são variáveis CSS redefinidas em `.dark` (`styles/global.css`), então os componentes não precisam de classes duplicadas.
- Preferência salva no LocalStorage (`@coffee-delivery:theme`); na primeira visita respeita `prefers-color-scheme`.
- Um script inline no `index.html` aplica a classe antes do React carregar, evitando o "piscar" do tema claro.

### Formulário — React Hook Form + Zod

- Schema único `checkoutSchema` (endereço + pagamento) com `zodResolver`.
- `FormProvider` para os subcomponentes acessarem o formulário sem *prop drilling*.
- Validação `onTouched` (erros aparecem ao sair do campo ou ao enviar).
- CEP com máscara `00000-000`; ao completar 8 dígitos, a API ViaCEP preenche rua, bairro, cidade e UF (requisição cancelável com `AbortController`; se falhar, o usuário digita normalmente).
- Ao confirmar, `checkout(data)` do `CartContext` despacha `CHECKOUT` e a aplicação navega para `/success`, que lê o pedido do contexto (sobrevive a um F5).

## 5. Rotas

| Rota | Página | Observação |
|---|---|---|
| `/` | Home | Catálogo |
| `/checkout` | Checkout | Formulário e carrinho |
| `/success` | Success | Redireciona para `/` se não houver pedido confirmado |
| `*` | — | Redireciona para `/` |

`Checkout` e `Success` usam `lazy` do React Router (code splitting): o bundle inicial fica menor e o formulário só é baixado quando necessário.

## 6. Design system

Tokens extraídos do Figma, definidos em `src/styles/global.css` e expostos ao Tailwind com `@theme inline`:

| Token | Light | Dark |
|---|---|---|
| `yellow-dark` / `yellow` / `yellow-light` | `#C47F17` / `#DBAC2C` / `#F1E9C9` | `#E0A03A` / `#E8BD45` / `#3A3019` |
| `purple-dark` / `purple` / `purple-light` | `#4B2995` / `#8047F8` / `#EBE5F9` | `#B79BFF` / `#9A6BFF` / `#2A2140` |
| `base-title` / `base-subtitle` / `base-text` | `#272221` / `#403937` / `#574F4D` | `#F3EFED` / `#E0DAD8` / `#C9C2BF` |
| `base-card` / `base-input` / `base-button` | `#F3F2F2` / `#EDEDED` / `#E6E5E5` | `#211E1C` / `#2A2624` / `#332E2B` |
| `background` | `#FAFAFA` | `#161412` |
| `danger` (erros de formulário) | `#C9302C` | `#FF7B72` |

Tipografia: **Baloo 2** (títulos, 700/800) e **Roboto** (textos, 400/700).

Breakpoints do catálogo: 1 coluna (mobile), 2 a partir de `600px`, 3 a partir de `900px` e 4 a partir de `1160px`. Hero e checkout passam a 2 colunas em `lg` (1024px). Container máximo de `1120px`.

### Assets

Os assets foram extraídos diretamente do SVG exportado do Figma, sem reamostragem:
- 14 PNGs dos cafés e o PNG do hero, na resolução original embutida no Figma;
- ilustração da página de sucesso como **SVG vetorial** (recortada do arquivo original).

### Identidade visual (logo criada com IA)

- Mascote original — um mago com chapéu roxo segurando uma xícara de café — gerado com IA (arquivo original em `docs/identidade/logo-original.png`).
- As cores do mascote (roxo + dourado) conversam com a paleta do Figma (`purple` e `yellow`).
- Versões otimizadas: `src/assets/logo-mago.png` (192px de altura, para telas retina), `public/favicon-32.png` e `public/apple-touch-icon.png`.
- O componente `Logo` combina o mascote com o nome "Coffee Delivery" escrito em Baloo 2 com tokens de cor, por isso funciona no Light e no Dark Mode sem precisar de uma segunda imagem.

## 7. Estratégia de testes

| Nível | Ferramenta | O que cobre |
|---|---|---|
| Unitário | Vitest | `cartReducer` (adicionar, somar, limites, remover, limpar, imutabilidade) |
| Unitário | Vitest + jsdom | `storage.ts` (salvar, restaurar, JSON inválido, item inexistente) |
| Unitário | Vitest | `checkoutSchema` (CEP, UF, campos obrigatórios, pagamento) |
| Integração | Testing Library + `createMemoryRouter` | Home: adicionar ao carrinho, contador e LocalStorage; troca de tema |
| Integração | Testing Library + `fetch` mockado | Seletor de localização: busca, CEP inexistente, Esc, clique fora, persistência e pré-preenchimento do checkout |
| Integração | Testing Library | Feedback de sacola: conteúdo do aviso, "Ver sacola" e fechar |
| Integração | Testing Library + `fetch` mockado | Checkout: totais, remover item, erros de validação, carrinho vazio, ViaCEP, confirmação e página de sucesso, proteção da rota `/success` |
| Manual | Navegador / DevTools | Responsividade (320, 390, 768, 1024, 1440px) e Dark Mode |

Total: **39 testes** (inclui `LocationPicker`, `AddedToCartToast` e utils de CEP). Comandos: `npm test` (uma execução) e `npm run test:watch`.
