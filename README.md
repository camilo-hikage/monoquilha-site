# Monoquilha Bar n' Brunch — site

Site estático (HTML + CSS + JS, sem build). Brunch cosmopolita e bar de alta
coquetelaria, na orla do Itaguá, Ubatuba/SP.

Conteúdo (endereço, telefones, e-mail, horário, cardápio e depoimentos)
levantado a partir do Tripadvisor, Instagram (@monoquilha_) e Facebook da casa
em set/2026.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
```

## Estrutura

```
index.html         Página única (hero, sobre, cardápio, depoimentos, galeria, local/contato, footer)
assets/styles.css  Estilo — paleta areia + petróleo + terracota + mostarda
assets/script.js   Header ao rolar, menu mobile, abas do cardápio, reveal, ano
```

## O que ainda é placeholder (trocar)

- **Fotos** — todos os blocos com `.ph` (hero, sobre, galeria) são placeholders
  em CSS. Baixe fotos reais do Instagram/Facebook da casa (com autorização) e
  troque por `<img>`/`background-image`.
- **Cardápio e preços** — os pratos listados vieram de menções em avaliações
  reais (Tripadvisor), não do cardápio oficial. Não há preços porque não foram
  divulgados publicamente — confirme com a casa e atualize os itens/valores.
- **Horário por dia da semana** — só temos o horário agregado do Tripadvisor
  (08h–01h). Confirme a grade real (dias fechados, horário de cada turno).
- **Números de telefone** — (12) 99182-8250 usado como WhatsApp principal;
  +55 12 99198-6634 como contato secundário (ambos do Facebook da casa) —
  confirme qual é o WhatsApp certo antes de publicar.
- **Depoimentos** — resumidos a partir de avaliações públicas do Tripadvisor,
  com nome e mês/ano de quem avaliou. Se preferir, troque por depoimentos que
  a própria casa selecionar.

## Deploy

Qualquer host de site estático: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
No GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
