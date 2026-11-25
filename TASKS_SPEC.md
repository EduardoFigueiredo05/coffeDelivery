# TASKS_SPEC — Coffee Delivery

O desenvolvimento é feito em **etapas pequenas**: a cada etapa o código é revisado, testado (`npm run lint`, `npm test`, `npm run build`) e versionado com um commit.

Legenda: `[x]` concluída · `[ ]` pendente

## Etapa 1 — Configuração do projeto
- [x] Vite + React + TypeScript (`strict`), alias `@/`
- [x] ESLint, Vitest e Testing Library
- [x] Primeiro teste (`App.test.tsx`)

## Etapa 2 — Documentação
- [x] `PRD_SPEC.md` — produto, requisitos, regras de negócio e critérios de aceite
- [x] `TECH_SPEC.md` — arquitetura, componentes, estado e testes
- [x] `TASKS_SPEC.md` — este planejamento
- [x] `AGENTS.md` — diretrizes e registro de uso da IA

## Etapa 3 — Identidade visual e design system
- [x] Logo original criada com IA (mascote "mago do café") + favicon
- [x] Tailwind 4 com os tokens de cor do Figma (light e dark)
- [x] Fontes Baloo 2 e Roboto
- [x] Imagens dos cafés, hero e ilustração extraídas do Figma sem perda de qualidade
- [x] Componente `Logo`

## Etapa 4 — Catálogo e regras do carrinho
- [x] `data/coffees.ts` com os 14 cafés e a taxa de entrega
- [x] Formatação de moeda (`utils/formatMoney.ts`)
- [x] Actions + `cartReducer` puro e imutável
- [x] Persistência no LocalStorage (`storage.ts`)
- [x] Testes do reducer e da persistência

## Etapa 5 — Estado global
- [x] `CartContext` com `useReducer`, valores derivados (`useMemo`) e `useCallback`
- [x] Hook `useCart`

## Etapa 6 — Layout, rotas e Home
- [x] React Router: `/`, `/checkout`, `/success` com `DefaultLayout`
- [x] `Header` com localização e contador do carrinho
- [x] `IconBadge` e `QuantityInput` reutilizáveis
- [x] Home: `Hero`, `CoffeeList`, `CoffeeCard` responsivos

## Etapa 7 — Checkout
- [x] Schema Zod (endereço + pagamento) e testes
- [x] `AddressForm` e `PaymentOptions` com React Hook Form (`FormProvider`)
- [x] Lista "Cafés selecionados" (`CartItem`), remover item e totais
- [x] Autopreenchimento via ViaCEP

## Etapa 8 — Pedido confirmado
- [x] Confirmar pedido: limpar carrinho e navegar para `/success`
- [x] Página `Success` com endereço, previsão, pagamento e ilustração
- [x] Redirecionar para a home se não houver pedido

## Etapa 9 — Dark Mode
- [x] `ThemeContext` + `ThemeToggle` com persistência e `prefers-color-scheme`
- [x] Revisão de contraste nos dois temas

## Etapa 10 — Qualidade e entrega
- [x] Testes de componente (CoffeeCard e Checkout)
- [x] Revisão de responsividade (320, 390, 768, 1024, 1440px) e acessibilidade
- [x] `README.md` completo com prints em `docs/evidencias`
- [x] Build de produção com code splitting (Checkout e Success sob demanda)
- [ ] Deploy (opcional: Vercel/Netlify)

## Etapa 11 — Melhorias
- [x] Localização clicável no header com mini modal de busca por CEP (`LocationPicker`)
- [x] `LocationContext` com persistência e pré-preenchimento do checkout
- [x] Hook `useCepLookup` compartilhado entre o modal e o checkout
- [x] Feedback de "adicionado à sacola": toast com barra de tempo + animação do carrinho
- [x] Testes das melhorias e prints em `docs/evidencias`

## Acompanhamento

| Data | Etapa | Commit |
|---|---|---|
| 24/11/2026 | 1 | `chore: configura projeto com Vite, React, TypeScript, ESLint e Vitest` |
| 24/11/2026 | 2 | `docs: adiciona especificações do produto, técnica, tarefas e diretrizes de IA` |
| 24/11/2026 | 3 | `feat: aplica identidade visual com logo criada por IA e design system do Figma` |
| 24/11/2026 | 4 a 10 | `feat: implementa catálogo, carrinho, checkout, confirmação e dark mode` |
| 25/11/2026 | 11 | `feat: adiciona seletor de localização por CEP e feedback ao adicionar à sacola` |
