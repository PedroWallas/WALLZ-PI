# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

WALLZ-PI é o e-commerce da marca WALLZ. O projeto está em estágio pré-scaffold: ainda não há código, `package.json` ou repositório git inicializado — apenas esta documentação e o material de referência abaixo.

## Material de referência

- `referencia/Skull Clothing - Home.mhtml` — página salva do e-commerce Skull Clothing (https://skullclothing.com.br/), referência **direta e obrigatória** da interface da WALLZ.
- **Fidelidade visual é requisito principal**: a interface deve ser reconstruída praticamente 1:1 (estrutura, header, barra de aviso, busca, navegação, menu mobile, carrinho, seção de benefícios, carrosséis de produtos, ProductCard, tipografia, espaçamentos, proporções, comportamento responsivo, footer). Isso não é um redesign nem uma "inspiração livre" — é reconstrução fiel. A WALLZ usa a mesma estrutura de e-commerce da Hotprinti e parte do catálogo da Skull também será vendida na WALLZ.
- Adaptação fica restrita a: marca (Skull → WALLZ), logo, textos institucionais, contatos/redes sociais, catálogo de produtos, informações específicas da Skull → equivalentes da WALLZ.
- O HTML da referência é saída de uma plataforma SaaS de loja (classes genéricas, `!important` em tudo, sem componentização, sem `<script>` no snapshot) — **não copiar o código-fonte**. Reconstruir em componentes React limpos que produzam o mesmo resultado visual.
- Valores concretos de design (cores, tipografia, espaçamentos, breakpoints) já extraídos estão em `docs/referencia-visual.md` — consultar esse arquivo como fonte de verdade ao implementar UI, em vez de reabrir o `.mhtml`.
- É um arquivo `.mhtml` grande (~19 MB, imagens embutidas em base64) — se precisar reabrir, extrair a estrutura/HTML relevante em vez de carregar o arquivo inteiro de uma vez.
- Hotprinti é referência **apenas de ideias para a área administrativa** (não é integrada ao sistema).

## Stack definida

- Frontend: React + JavaScript (não TypeScript).
- Backend: Supabase (banco de dados, autenticação e storage quando necessário).
- Sem outras dependências além do necessário — não introduzir libs, serviços ou camadas extras sem necessidade real comprovada.

## Escopo inicial (v1)

- Página inicial / loja
- Catálogo de produtos
- Página de produto
- Carrinho
- Área administrativa básica (gerenciamento de produtos e pedidos)
- Autenticação, quando necessária para as áreas acima
- Estrutura simples, mas preparada para evoluir depois

## Fora de escopo (por enquanto)

- Pagamentos
- Qualquer integração externa (inclusive Hotprinti)
- Qualquer funcionalidade além do escopo inicial listado acima

## Regras de desenvolvimento

- Evitar overengineering: escolher sempre a solução mais simples que atenda ao escopo; projeto de porte acadêmico/pequeno.
- Não adicionar tecnologia, dependência ou abstração que não seja estritamente necessária ao escopo atual.
- Antes de implementar qualquer funcionalidade importante ou tomar decisão de arquitetura relevante, explicar o plano e aguardar orientação antes de agir.
- Primeiro entender a referência visual existente, depois definir a base do projeto — não partir direto para implementação sem essa análise.
- Fidelidade visual à referência Skull Clothing é requisito principal da UI (ver seção acima e `docs/referencia-visual.md`) — ao construir qualquer tela, comparar layout, espaçamento e hierarquia com a referência antes de considerar concluído, não apenas "algo parecido".

## Estado do projeto / comandos

Scaffold React (Vite, JavaScript) inicializado na raiz do repo. Comandos:

- `npm run dev` — servidor de desenvolvimento (http://localhost:5173)
- `npm run build` — build de produção
- `npm run preview` — serve o build de produção localmente

Dependências instaladas: `react-router-dom`, `bootstrap` (apenas CSS), `swiper`, `@fortawesome/fontawesome-free`. Sem TypeScript, sem linter configurado, sem Supabase ainda.

Estrutura de código:
- `src/components/` — Layout, TopBar, Header, OffcanvasMenu, Footer, SearchForm (chrome global do site, presente em todas as páginas via `Layout` + rotas aninhadas no `App.jsx`); BenefitsBar, ProductCard, ProductCarousel (seções de conteúdo da Home, usando `swiper`)
- `src/pages/` — Home (benefícios + Produtos Exclusivos + Produtos em Destaque), Catalogo (`/produtos`, grid paginado reaproveitando ProductCard), Produto (`/produtos/:slug`, detalhe com seleção de tamanho/quantidade — visual apenas), Carrinho (`/carrinho`, item de demonstração com estado local — visual apenas), Login (`/login`, formulário visual, sem autenticação real), Admin (`/admin`, listagem de produtos + ações visuais, sem CRUD/Supabase real)
- `Login` e `Admin` **não** usam o `Layout` da loja (sem TopBar/Header/Footer) — a própria referência mostra o login como página cheia, e um admin é ferramenta interna, não página de vitrine; ver rotas em `App.jsx`.
- `src/data/products.js` — catálogo de produtos temporário (dados + imagens), consumido por Catalogo e Produto; a Home mantém seus próprios arrays locais (não foi alterada para usar este módulo)
- `src/styles/global.css` — tokens de design (cores, fontes) e estilos de todos os componentes/páginas acima, com base em `docs/referencia-visual.md`
- `src/assets/products/` — fotos de produto extraídas diretamente do `.mhtml` de referência (dados temporários de desenvolvimento; ver nota abaixo)

Nota: como o `.mhtml` de referência só cobre a Home, a estrutura do catálogo (`/produto/`) e da página de produto foi levantada navegando o site ao vivo (https://skullclothing.com.br) com um browser headless, já que essas páginas carregam via JS (o HTML estático não contém a listagem).

Nota sobre fidelidade: o logo é um wordmark de texto "WALLZ" provisório (não há arquivo de logo da marca ainda); ícones usam apenas os estilos `solid` e `brands` do Font Awesome Free (o estilo `regular` da referência exige o plano pago, então os ícones equivalentes foram trocados para `solid`).

Nota sobre imagens de produto: as fotos em `src/assets/products/` foram extraídas dos bytes reais embutidos no `.mhtml` (o "save complete" do Chrome guarda cada imagem como parte MIME própria) — são as fotos de produto reais da Skull Clothing, usadas como dado temporário de desenvolvimento porque parte do catálogo é compartilhado com a WALLZ. Antes de qualquer uso em produção, confirmar se essas fotos podem ser usadas pela WALLZ ou substituí-las por fotografia própria.
