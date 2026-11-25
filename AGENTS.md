# AGENTS.md — Diretrizes para o assistente de IA

Este arquivo orienta qualquer assistente de IA (Claude, Copilot, Cursor, etc.) que trabalhe neste repositório e registra como a IA foi usada no projeto.

## 1. Contexto do projeto
- SPA de e-commerce **Coffee Delivery** — projeto final da disciplina de Single Page Application.
- Leia antes de alterar código: `PRD_SPEC.md` (o quê), `TECH_SPEC.md` (como) e `TASKS_SPEC.md` (o que falta).
- O layout do Figma é a fonte da verdade visual (`docs/evidencias/figma-layout.png`).

## 2. Comandos
```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento
npm run lint       # ESLint
npm test           # Vitest
npm run build      # checagem de tipos + build de produção
```
Antes de sugerir um commit, `npm run lint`, `npm test` e `npm run build` devem passar.

## 3. Regras de código
- TypeScript `strict`; não usar `any`. Tipos de domínio ficam junto dos dados (`data/coffees.ts`) ou do reducer.
- Componentes em PascalCase, um por arquivo, exportação nomeada (`export function Header`).
- Imports internos com o alias `@/`.
- Estilo **somente** com Tailwind usando os tokens (`bg-base-card`, `text-purple`…). Nunca escrever cores hexadecimais em componentes — isso quebra o Dark Mode.
- Estado global do carrinho só via `useCart()`; nunca acessar o `localStorage` direto em componentes.
- Reducer deve continuar **puro e imutável**; toda nova ação precisa de teste em `reducer.test.ts`.
- Validação de formulário somente com Zod (schemas em `src/schemas`).
- Textos da interface em português do Brasil, iguais aos do Figma.
- Acessibilidade: `alt` em imagens, `aria-label` em botões só com ícone, sem remover o foco visível.

## 4. Git
- Conventional Commits em português: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
- Commits pequenos, um assunto por commit. A IA **sugere** a mensagem; o aluno revisa e executa o commit.
- Nunca commitar `node_modules`, `dist` ou `.env`.

## 5. O que a IA não deve fazer
- Adicionar bibliotecas novas sem justificar no `TECH_SPEC.md`.
- Alterar regras de negócio (preço, taxa de entrega, limites) sem atualizar o `PRD_SPEC.md`.
- Apagar ou enfraquecer testes para fazê-los passar.

## 6. Registro de uso da IA

| Etapa | Ferramenta | Como foi usada | Revisão humana |
|---|---|---|---|
| Planejamento | Claude (Anthropic) | Leitura dos requisitos e do Figma; proposta de arquitetura, fases e critérios de aceite | Ajustes de escopo e prioridades |
| Assets | Claude | Script para extrair os PNGs originais e recortar a ilustração em SVG a partir do export do Figma | Conferência visual com o protótipo |
| Desenvolvimento | Claude | Código produzido em etapas pequenas; a cada etapa o aluno revisa, testa e faz o commit | Leitura do código, testes manuais, commits |
| Testes | Claude | 39 testes: reducer, LocalStorage, schema Zod e integração (Home, Checkout, Success) com Vitest + Testing Library | Execução local e validação dos cenários |
| Revisão | Claude | Lint, build e prints automatizados de desktop/mobile | Comparação com o Figma |
| Melhorias | Claude | Seletor de localização por CEP no header e feedback animado de "adicionado à sacola", com testes | Definição das melhorias e validação visual |
| Logo | _(preencher: ferramenta de IA usada)_ | Geração do mascote "mago do café" (roxo e dourado) — _(preencher: prompt utilizado)_ | Escolha da versão final; Claude gerou favicon e versões otimizadas |

### Prompts de exemplo usados
- "Leia os requisitos do projeto e o layout do Figma e monte a estrutura do Coffee Delivery em React + Vite + TypeScript, deixando pontos de commit."
- "Escreva testes para o cartReducer cobrindo adicionar, somar quantidades, limites e imutabilidade."
