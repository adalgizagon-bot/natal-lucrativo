# Natal Lucrativo no domínio principal

## Projetos confirmados

- Principal: `adalgizagon-bot/confeitaria-lucrativa`, domínio público `https://www.confeitarialucrativaoficial.com`.
- Natalino: `adalgizagon-bot/natal-lucrativo`, origem de produção informada pela responsável `https://natal-lucrativo-gamma.vercel.app`.
- Caminho público: `https://www.confeitarialucrativaoficial.com/natallucrativo`.

O acesso HTTPS à origem Vercel retornou HTTP 403 no ambiente de trabalho. A identidade da origem foi confirmada pela responsável, e a integração foi validada com dois servidores reais locais em modo de produção. Isso não substitui a conferência após deploy na Vercel.

## Implementação

`next.config.mjs` do principal registra duas regras `beforeFiles`, restritas à raiz `/natallucrativo` e a `/natallucrativo/:path*`. O destino mantém o prefixo na origem natalina. Nenhuma regra captura `/_next`, `/images`, `/cursos`, `/contato` ou outra rota do principal.

`lib/natal-rewrites.mjs` usa por padrão `https://natal-lucrativo-gamma.vercel.app`. A variável **server-side** `NATAL_UPSTREAM_ORIGIN` pode selecionar uma Preview natalina para homologação. Informe somente a origem HTTPS, sem `/natallucrativo`, sem query e sem credenciais. O próprio domínio principal é rejeitado para evitar loop. HTTP/localhost só é admitido em testes fora da Vercel.

No natalino, `next.config.mjs` define `basePath: '/natallucrativo'`. Esse valor é incorporado ao build: **é obrigatório reconstruir e publicar também o natalino**. Os dois projetos precisam ser publicados em ordem; alterar somente o principal não basta.

- `next/link` adiciona o prefixo automaticamente; não o duplique nos links.
- `lib/images.ts` adiciona o prefixo aos caminhos públicos com `assetPath`, mantendo a busca de arquivos no disco inalterada.
- Scripts, CSS, módulos, fontes geradas pelo Next e o otimizador de imagens usam `/natallucrativo/_next/...`.
- Sitemap, robots e canonical usam o domínio público com o prefixo, sem escapar para a raiz.
- Não foi configurado `assetPrefix`: `basePath` já isola os recursos. Um assetPrefix adicional pode duplicar caminhos.
- Não há redirect entre domínios nem rewrite de volta ao principal. Query strings e requisições RSC são encaminhadas.
- Checkout e links externos permanecem externos e inalterados.

## Revisar em Preview, sem alterar Production

1. Publique a branch `feat/proxy-natallucrativo` do repositório natalino em **Preview**, mantendo `main` como Production Branch.
2. No projeto natalino, configure `SITE_URL=https://www.confeitarialucrativaoficial.com` (somente a origem, sem prefixo) e execute novo build.
3. Abra `https://DOMINIO-REAL-DA-PREVIEW-NATALINA/natallucrativo`. Substitua o marcador pelo endereço real que a Vercel gerar; não é um domínio criado por esta implementação.
4. No projeto principal, configure **somente no ambiente Preview** `NATAL_UPSTREAM_ORIGIN=https://DOMINIO-REAL-DA-PREVIEW-NATALINA`. Não acrescente o prefixo.
5. Crie uma Preview do principal a partir da branch `feat/proxy-natallucrativo`. A política Git atual do principal foi preservada e pode exigir criação manual dessa Preview.
6. Confira `/` e `/cursos` do principal, depois `/natallucrativo`, `/natallucrativo/cursos`, `/natallucrativo/contato`, arquivos públicos e os botões de compra. A barra de endereços deve continuar no domínio da Preview principal.

## Ativação após aprovação

1. Primeiro publique a versão **natalina** com basePath em Production.
2. Confira que `https://natal-lucrativo-gamma.vercel.app/natallucrativo` responde corretamente. O Next passa a servir o natalino sob esse prefixo também no domínio direto; não espere que a raiz antiga continue servindo a aplicação sem prefixo.
3. No principal, deixe `NATAL_UPSTREAM_ORIGIN` ausente para usar o padrão confirmado, ou defina `https://natal-lucrativo-gamma.vercel.app` no ambiente Production.
4. Só então publique a versão principal com os rewrites e valide o endereço público final.
5. Preserve Production Branch `main`, Root Directory `.`, framework Next.js e os comandos de build de cada repositório. Não aponte o domínio principal ao projeto natalino e não altere DNS para compartilhar caminhos.

Não publique o rewrite principal contra uma versão natalina antiga, ainda sem basePath: ela emitirá URLs de recursos na raiz, causando conflito e arquivos ausentes. Um novo domínio de Preview também exige atualizar a variável e refazer o build principal, pois rewrites são resolvidos no build.

Para futuramente ligar o site principal ao natalino no menu, use um link HTML normal (`<a href="/natallucrativo">`) para uma navegação completa entre projetos; não use navegação SPA de um projeto para o outro.

## Validação realizada

- Principal: 8 testes unitários, lint, TypeScript e build.
- Natalino: 6 testes unitários, lint, TypeScript e build.
- 18 testes Playwright pelo host principal: desktop e iPhone, seis rotas natalinas, navegação cliente/RSC, CSS/JS prefixados, arquivo PNG, Next Image, sitemap e isolamento das páginas/checkout/arquivos do principal.
- Nenhuma branch principal foi integrada nem nenhum deploy de Production foi solicitado.

## Reproduzir o teste ponta a ponta

No diretório do natalino:

```bash
npm ci
npm test
npm run lint
npm run typecheck
npm run build
npm start -- --port 3031
```

Em outro terminal, no diretório do principal:

```bash
npm ci
npm test
NATAL_UPSTREAM_ORIGIN=http://127.0.0.1:3031 npm run build
NATAL_UPSTREAM_ORIGIN=http://127.0.0.1:3031 npm start -- --port 3030
```

Com ambos rodando, no diretório natalino:

```bash
PROXY_HOST_UNDER_TEST=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3030 PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npx playwright test --workers=2
```

A variável do executável deve apontar ao Chromium instalado; em outra máquina use `npx playwright install chromium` e omita essa variável. Não leve a origem localhost para as configurações da Vercel. Remova a variável local e refaça o build padrão antes de testar contra a origem de produção.
