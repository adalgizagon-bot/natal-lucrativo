# Natal Lucrativo em Casa

Site independente em Next.js App Router, TypeScript, Tailwind CSS e Lucide React. Repositório: `adalgizagon-bot/natal-lucrativo`. Não depende do site da Confeitaria Lucrativa.

## Executar

Node.js 24.x (definido em `.nvmrc` e `package.json`):

```sh
npm ci
npm run dev
```

O servidor usa a porta 3000; abra `/natallucrativo` (a raiz `/` não é a home deste projeto). Para produção local: `npm run build` e `npm start`. No ambiente cloud, use `npm ci --cache /workspace/.npm-cache` caso o cache padrão não seja gravável. Cada tarefa já é isolada; use o checkout existente, sem criar worktree salvo solicitação.

## Rotas e configuração

Páginas relativas ao basePath `/natallucrativo`: `/`, `/combo-natal-lucrativo`, `/cursos`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso`. A página do combo inclui barra fixa mobile com espaço livre no rodapé.

`lib/config.ts` centraliza os sete materiais, preço, referência, checkout e Instagram. Oferta solicitada: de R$ 197,00 por R$ 29,90; economia de R$ 167,10 e desconto arredondado de 85%, calculados. Manter a comparação comercial verdadeira e atualizada. Todos os botões usam o mesmo checkout Hotmart, com produto terminado em letra **O** e parâmetros preservados. A consulta externa ao preço foi bloqueada pelo proxy (403); o preço no checkout não foi confirmado.

Copie `.env.example` para `.env.local` somente se necessário:

- `SITE_URL`: `https://www.confeitarialucrativaoficial.com`, sem sufixo de pasta. Valor público em `.env.production`; mantenha o mesmo valor nas configurações Vercel. Sitemap e canônicos incluem `/natallucrativo` automaticamente.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: opcional, 10 a 15 dígitos com país e DDD. Sem número válido, o canal não aparece. Requer novo build.

Não há coleta de cartão, formulário ou analytics. Os documentos legais são textos-base e ainda precisam de revisão e identificação real do fornecedor antes do uso comercial.

## Imagens oficiais

A `main` foi integrada à branch de implementação preservando o trabalho anterior. Os originais de `public/images` foram mantidos intactos. `lib/images.ts` documenta a associação exata:

| Uso | Arquivo |
| --- | --- |
| Topo | `imagem topo.png` |
| Cabeçalho | `Logo Natal Lucrativo em Casa.png` |
| Cupcakes | `Cupcakes Natalinos_ Receitas para Vender.png` |
| Donuts | `Donuts Natalinos_ Receitas para Encantar e Vender.png` |
| Panetone e Chocotone | `Capa Natalina de Panetone e Chocotone.png` |
| Recheios | `Natal Lucrativo_ Recheios de Chocotone.png` |
| Ceia de Ano Novo | `Natal Lucrativo_ 15 Receitas Festivas.png` |
| Ceia de Natal | `Natal Lucrativo_ Ceia Festiva em Casa.png` |
| Biscoitos | `Biscoitos Decorados Natalinos Lucrativos.png` |

Next Image otimiza a entrega; proporções 3:2 (topo/logo) e 2:3 (capas) preservam todo o conteúdo com `object-fit: contain`. Imagem de topo aparece antes da copy no mobile. Capas ocupam cartões individuais, uma coluna no celular para manter a leitura. Não são exibidos avisos provisórios quando os arquivos estão presentes.

## Depoimentos reais

`lib/testimonials.ts` cadastra `Depo 1.jpg` a `Depo 7.jpg`, arquivos fornecidos pelo responsável, sem nomes, textos, notas ou resultados adicionados. Não existem mais exemplos fictícios, inclusive em desenvolvimento.

As capturas mencionam materiais e cursos de confeitaria da marca. O aviso contextual da seção foi removido conforme solicitado; as mensagens originais não foram alteradas. As capturas são exibidas integralmente, com máscaras visuais somente sobre fotos de perfil e identificadores desnecessários. Essas máscaras se mantêm na ampliação; as mensagens não são reescritas. Os originais continuam públicos no repositório e em `public/images`, conforme recebidos; ocultação visual não remove dados dos arquivos originais. Para retirar dados permanentemente dos arquivos públicos, o responsável deve fornecer versões anonimizadas e considerar o histórico do GitHub.

Carrossel: gesto de arrastar, botões e teclado. Cada cartão abre um diálogo nativo com imagem proporcional, ampliação adicional, navegação anterior/próxima, fechamento por Escape e retorno do foco. Em telas estreitas, use “Ampliar mais” e role a imagem para ler em resolução maior. Não há avaliações com estrelas nem promessas financeiras adicionadas.

## Verificações

```sh
npm test
npm run lint
npm run typecheck
npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npx playwright test --workers=2
```

Para máquinas sem Chromium instalado: `npx playwright install chromium` e `npx playwright test` (o download exige acesso à rede). Os testes percorrem as seis rotas em mobile e desktop, verificam imagens carregadas, ausência de rolagem horizontal, menu, FAQ, oferta, parâmetros do checkout e ampliação dos depoimentos com zoom, teclado, fechamento e retorno do foco. Os testes unitários verificam valores, desconto, catálogo, arquivos oficiais e cadastro dos relatos.

## Vercel e publicação em /natallucrativo

Consulte [o roteiro completo de publicação](docs/VERCEL.md), com configuração do projeto independente, variável SITE_URL, Preview, integração na main e encaminhamento exclusivo da pasta no domínio existente. O site principal não foi alterado. Não associe o domínio principal ao projeto novo: o responsável pela hospedagem existente deve encaminhar somente `/natallucrativo` e seus subcaminhos.

O basePath é fixado no build em `next.config.mjs`. Links internos Next recebem o prefixo automaticamente; imagens e depoimentos usam `lib/paths.ts` e `lib/images.ts`. Originais, recursos otimizados, bundles, sitemap e URLs canônicas usam o mesmo prefixo. As apostilas são entregues pela Hotmart: este repositório contém as capas oficiais e não oferece PDFs públicos.

Validação desta preparação: `npm test` (6 testes), ESLint, TypeScript, build com `.env.production` e 18 testes Playwright em mobile/desktop passaram. As verificações cobrem as seis páginas sob `/natallucrativo`, todas as imagens visíveis, capas, depoimentos com zoom, links internos e Hotmart, sitemap, canônicos/Open Graph e caminhos dos bundles. A raiz do projeto independente retorna 404, evitando assumir a home do domínio compartilhado. Não houve alteração no repositório ou na hospedagem do site principal; a Vercel ainda requer configuração e encaminhamento conforme o roteiro.


## Compatibilidade com o PR de proxy

A branch `feat/proxy-natallucrativo` foi atualizada com a `main`, preservando a interface, imagens oficiais e depoimentos reais. A configuração ativa é somente `next.config.mjs`, com `BASE_PATH` de `lib/routing.mjs`. `lib/paths.ts` e `lib/site.ts` reexportam as mesmas funções para os componentes da main, evitando duas definições independentes.

O Playwright usa a porta local 3031 e aceita `PLAYWRIGHT_BASE_URL` para testar uma implantação/proxy existente. Sem essa variável, inicia automaticamente o próprio servidor de produção natalino. Os testes específicos do host principal só rodam com `PROXY_HOST_UNDER_TEST=1`; sua execução exige uma instância do principal já configurada. Não são necessários para validar este projeto independente e nenhum arquivo do site principal é modificado.

Consulte também `PROXY-NATALLUCRATIVO.md` para o contexto e as instruções da integração do PR. Os resultados ali descritos anteriormente são históricos; o relatório de resolução registra separadamente os testes executados nesta atualização.


Validação da resolução do PR #3: 9 testes unitários, lint, TypeScript, build e 22 testes de navegador passaram. Dois testes específicos do host principal permaneceram pulados por exigirem a aplicação principal em execução. Nenhum arquivo do principal ou imagem original foi alterado. Funcionamento local confirmado sob `/natallucrativo`.
