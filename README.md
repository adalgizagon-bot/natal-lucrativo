# Natal Lucrativo em Casa

Projeto independente de página de vendas com Next.js App Router, TypeScript, Tailwind CSS e Lucide React. Não altera nem depende do site da Confeitaria Lucrativa.

## Executar

Requer Node.js 20.9+ (validado com 24). No diretório deste projeto:

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

Abra a porta 3000 no recurso de visualização do seu ambiente, ou acesse `http://localhost:3000` em uma máquina local. Para produção local: `npm run build` e `npm start`.

## Páginas

`/`, `/combo-natal-lucrativo`, `/cursos`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso`. A barra fixa mobile aparece na página do combo. Cabeçalho e rodapé preservam os destinos de navegação e contato.

## Configuração comercial

`lib/config.ts` centraliza os preços, checkout, Instagram e sete materiais. O produto Hotmart termina com a letra **O**; todos os botões usam a mesma URL com os parâmetros preservados. O preço externo não foi confirmado: a rede retornou 403.

O preço de referência R$ 197,00 está configurado, mas a comparação está oculta por padrão (`referencePriceConfirmed: false`). Ative apenas após confirmar sua veracidade comercial. O desconto de aproximadamente 85% é calculado, não fixado. O preço promocional é R$ 29,90.

Copie `.env.example` para `.env.local` e preencha apenas valores reais:

- `SITE_URL`: domínio HTTPS final, sem barra ao final. Sem ele, o sitemap fica vazio para não anunciar um domínio inventado. Configure antes de publicar e faça novo build.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: opcional, 10 a 15 dígitos, com país e DDD. Na ausência de número válido, o botão não aparece. Requer novo build.

Nenhum segredo, dado de cartão, formulário ou analytics é incluído.

## Imagens pendentes

Nenhuma imagem foi fornecida nesta sessão; somente o arquivo de requisitos em texto foi recebido. O bloco editorial no topo informa claramente a ausência da arte e não representa uma capa oficial. Não há fotografias ou galeria fictícias.

Para incluir os originais, sem remover arquivos existentes:

- Arte: `public/images/combo-oficial.webp`, `.png` ou `.jpg` (nessa ordem de prioridade).
- Capas: `public/images/ebook-01.webp` até `ebook-07.webp`, na ordem de `lib/config.ts`.

Esses são nomes de integração previstos, não arquivos existentes. Os componentes só exibem arquivos encontrados, com Next Image, proporção preservada e `object-fit: contain`, sem textos sobrepostos. Execute novo build após adicionar imagens e confirme visualmente a arte original. Fotografias de receitas devem ser fornecidas e identificadas por categoria antes de implementar uma galeria.

## Validação

```sh
npm test
npm run lint
npm run typecheck
npm run build
PLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=/workspace/.playwright npx playwright test
```

Os testes de navegador iniciam o servidor de produção e verificam as seis rotas em mobile e desktop, menu mobile, FAQ, ausência de rolagem horizontal, erros de JavaScript e URLs de compra. Os testes unitários verificam produto, parâmetros do checkout, cálculo e composição do combo. Imagens oficiais precisam de revisão adicional quando forem recebidas.

## Vercel

Crie um **novo projeto** associado a este repositório, framework Next.js, diretório raiz deste projeto, instalação `npm ci` e build `npm run build`. Configure as variáveis acima. Use uma implantação Preview para revisão antes de decidir por Production. Não reutilize o projeto da Confeitaria Lucrativa. Nada foi publicado nem enviado ao GitHub por esta implementação.

Antes do uso comercial: fornecer arte e capas, confirmar preço/entrega/acesso no checkout e revisar os textos-base legais com identificação real do fornecedor e condições aplicáveis. Não há depoimentos, promessas financeiras, certificados ou bônus inventados.

## Resultado desta implementação

- Instalação concluída; 3 testes unitários passaram.
- ESLint, TypeScript e build de produção passaram.
- 12 testes Playwright passaram: seis páginas em 390 × 664 (perfil iPhone 13) e 1440 × 1000. Chromium instalado no sistema foi usado com `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npx playwright test --workers=2`.
- Capturas adicionais em 390 × 844 e 1440 × 1000 foram geradas para inspeção.
- Não há imagens fornecidas para validar; o comportamento sem arquivos foi testado. A arte deve ser revisada após recebimento.
- Checkout externo: tentativa bloqueada por HTTP 403 no proxy. URL, produto, parâmetros e preço local foram validados; preço externo não confirmado.
- Nenhum deploy ou push foi executado.

## Conectar este projeto ao GitHub e à Vercel

O repositório independente é `adalgizagon-bot/natal-lucrativo`. A implementação foi preparada na branch `codex/natal-lucrativo-vercel` para revisão antes de Production.

1. Na Vercel, escolha **Add New → Project** e importe **adalgizagon-bot/natal-lucrativo**. Não selecione o projeto antigo.
2. Selecione a branch `codex/natal-lucrativo-vercel` na importação, se disponível. Revise a criação do primeiro deploy: importar um projeto pode publicar a primeira versão em Production. Para revisar somente em Preview, configure o projeto para manter `main` como Production Branch e solicite um deploy da branch `codex/natal-lucrativo-vercel` pelo recurso de deploy por referência Git da Vercel.
3. Use framework **Next.js**, Root Directory **.**, Node.js **24.x**, instalação **npm ci**, build **npm run build** e Output Directory padrão do Next.js.
4. Não há variáveis obrigatórias para o site abrir. Após obter a URL real, configure `SITE_URL` e faça um novo deploy para preencher o sitemap. WhatsApp continua opcional.
5. Atualizações enviadas à branch de revisão podem gerar novos Preview Deployments com a integração Git habilitada. Após revisar e autorizar Production, faça o merge para a branch definida como Production Branch. Atualizações nessa branch passam a gerar deploys de produção automaticamente.

Não adicione `node_modules`, `.next` ou arquivos `.env.local` ao Git. O lockfile está versionado para instalação reproduzível.

## Publicação sob /natallucrativo

Esta versão usa `basePath: '/natallucrativo'` para ser acessada pelo reverse proxy do domínio `https://www.confeitarialucrativaoficial.com`. Os recursos e a navegação permanecem no prefixo. O endereço de produção upstream confirmado é `https://natal-lucrativo-gamma.vercel.app`; após o novo build, a aplicação direta fica em `/natallucrativo`, não na raiz antiga. Configure `SITE_URL=https://www.confeitarialucrativaoficial.com`.

Leia `PROXY-NATALLUCRATIVO.md` para o roteiro de Preview e a ordem de deploy: primeiro este projeto com o prefixo, depois o rewrite no principal. Checkout, textos, preços e apresentação foram preservados.
