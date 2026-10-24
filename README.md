# Natal Lucrativo em Casa

Site independente em Next.js App Router, TypeScript, Tailwind CSS e Lucide React. Repositório: `adalgizagon-bot/natal-lucrativo`. Não depende do site da Confeitaria Lucrativa.

## Executar

Node.js 24.x (definido em `.nvmrc` e `package.json`):

```sh
npm ci
npm run dev
```

O servidor usa a porta 3000. Para produção local: `npm run build` e `npm start`. No ambiente cloud, use `npm ci --cache /workspace/.npm-cache` caso o cache padrão não seja gravável. Cada tarefa já é isolada; use o checkout existente, sem criar worktree salvo solicitação.

## Rotas e configuração

Páginas: `/`, `/combo-natal-lucrativo`, `/cursos`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso`. A página do combo inclui barra fixa mobile com espaço livre no rodapé.

`lib/config.ts` centraliza os sete materiais, preço, referência, checkout e Instagram. Oferta solicitada: de R$ 197,00 por R$ 29,90; economia de R$ 167,10 e desconto arredondado de 85%, calculados. Manter a comparação comercial verdadeira e atualizada. Todos os botões usam o mesmo checkout Hotmart, com produto terminado em letra **O** e parâmetros preservados. A consulta externa ao preço foi bloqueada pelo proxy (403); o preço no checkout não foi confirmado.

Copie `.env.example` para `.env.local` somente se necessário:

- `SITE_URL`: URL HTTPS final. Sem ela o site funciona, mas o sitemap fica vazio para não anunciar domínio fictício. Configure e faça novo deploy após obter o domínio.
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

## Vercel

Use um **novo projeto** para `adalgizagon-bot/natal-lucrativo`, diretório raiz `.`, framework Next.js, Node.js 24.x, instalação `npm ci` e build `npm run build`; Output Directory padrão. Não reutilize o projeto da Confeitaria Lucrativa.

A implementação está na branch `codex/natal-lucrativo-vercel`, sincronizada com os arquivos enviados à `main`. A Vercel deve usar essa branch para o Preview; a presença das imagens na `main` sozinha não integra os componentes. Mantenha `main` como Production Branch se quiser revisão antes da produção. Atualizações da branch de trabalho podem gerar Preview Deployments quando a integração Git estiver habilitada. Após aprovação para Production, integre a implementação à branch de produção.

A criação inicial de um projeto Vercel pode gerar deploy de produção: revise as opções antes de importar. Nenhum deploy de Production é executado por estes comandos. Nunca envie `.env.local`, `.next` ou `node_modules` ao GitHub.

Validação da integração dos arquivos oficiais: 5 testes unitários, 16 testes de navegador, ESLint, TypeScript e build de produção passaram. Capturas verificadas em 320, 390, 768 e 1440 pixels sem rolagem horizontal; arte, logo, capas e depoimentos carregaram. O diálogo de ampliação foi exercitado com zoom, troca de relato, Escape e retorno do foco. A integração foi preparada para Preview na Vercel; não houve deploy de Production nem confirmação de preço no checkout externo.
