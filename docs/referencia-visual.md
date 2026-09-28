# Referência visual — Skull Clothing (fonte da verdade para a UI da WALLZ)

Extraído de `referencia/Skull Clothing - Home.mhtml` (site: https://skullclothing.com.br/). A WALLZ usa a mesma estrutura de e-commerce da Hotprinti e parte do catálogo da Skull também será vendido na WALLZ — por isso a interface deve ser reconstruída **1:1**, não redesenhada. Este documento é a referência de valores concretos (cores, tipografia, espaçamento) a consultar durante a implementação.

## Regra de fidelidade

- Reconstruir a estrutura, hierarquia visual, proporções, espaçamentos e comportamento responsivo o mais fiel possível ao original.
- O HTML da referência é saída de uma plataforma SaaS (classes genéricas, `!important` em tudo, sem separação em componentes) — **não copiar o código**, recriar em componentes React limpos que produzam o mesmo resultado visual.
- Adaptar apenas: marca (Skull → WALLZ), logo, textos institucionais, contatos/redes sociais, catálogo de produtos.

## Estrutura da Home (ordem vertical)

1. Barra de aviso (marquee com cupom, fixa no topo, `height: 45px`, fundo preto, texto branco uppercase 13px)
2. Header fixo (abaixo da barra de aviso: `top: 40px`; altura `80px`)
3. Menu mobile off-canvas (drawer lateral)
4. Bloco de benefícios (carrossel, 3 itens: parcelamento / troca grátis / garantia)
5. Carrossel "Produtos Exclusivos" (8 cards)
6. Carrossel "Produtos em Destaque" (16 cards)
7. Footer (3 colunas + barra de copyright)

Detalhes de cada bloco (header, dropdowns, off-canvas, cards, footer) estão descritos na análise já compartilhada na conversa — usar como checklist de elementos a reproduzir.

## Tokens de design extraídos

**Cores** (CSS custom properties no tema original — trocar pelos valores da WALLZ mantendo os mesmos papéis):
```
--accent: #000000   /* cor de destaque/botões — definida inline no <html> */
--surface: #ffffff  /* fundo base */
--c1: #ffffff
--c2: #808080        /* cinza médio — texto secundário, bordas */
--c3: #505050        /* cinza escuro — texto terciário */
--c4: #ffffff
--c5: #000000
```
Paleta é essencialmente monocromática (preto/branco/cinzas) com um único acento.

**Tipografia**
- Fonte: `Inter, sans-serif` (usada em quase todo texto: títulos, preços, footer)
- Google Fonts carregadas no original: Inter (400/500/600/700/800), Manrope, Nunito Sans, Ubuntu — mas só Inter é usada nos componentes principais; as demais podem ser dispensadas.
- Título de seção (`.title1`): 24px / weight 700 (mobile: 18–20px)
- Título de produto (`.title-product-all`): 15px / weight 400, single-line com ellipsis
- Preço (`.price-product1-all`): 18px / weight 700
- Parcelamento (`.price-product-credit`): 13px / weight 400 / cinza
- Texto de footer (`.text-footer`): 15px

**Componentes-chave**
- Barra de aviso: `height: 45px`, fundo `#000`, texto branco, uppercase, animação marquee infinita
- Header (`nav-fixed`): fixo no topo (após a barra de aviso), `height: 80px`, fundo branco, borda inferior 1px cinza clara
- Botão carrinho (`btn-cart-new`): ícone 24px, cor cinza `#808080`, sem borda
- Card de produto:
  - Imagem: `width: 98%`, `object-fit: contain`, fundo `#f1f1f1` (cinza claro, não branco puro)
  - Título → preço → parcelamento, empilhados, alinhados à esquerda
- Footer: borda superior 1px cinza, 3 colunas (marca/contato/social+pagamento), barra de copyright com fundo `rgba(0,0,0,0.2)`

**Breakpoints** (grid Bootstrap 5, mesma referência a seguir em CSS/Tailwind):
```
sm: 576px   md: 768px   lg: 992px   xl: 1200px   xxl: 1400px
```

## Fora do que deve ser replicado

- Facebook Pixel / Google Tag Manager (containers vazios na referência, fora de escopo)
- Pilha de ícones excessiva do original (9 variantes de Font Awesome + Boxicons) — usar uma única lib de ícones equivalente
- Qualquer lógica de backend do site original (login, busca, carrinho) — são só links; a lógica real da WALLZ vem do Supabase
