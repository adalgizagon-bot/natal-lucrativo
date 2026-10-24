# Publicar Natal Lucrativo sem substituir o site principal

## Configuração preparada

- Repositório independente: `adalgizagon-bot/natal-lucrativo`.
- Branch para integração: `feat/proxy-natallucrativo` → `main`.
- Next.js: `basePath: '/natallucrativo'` em `next.config.mjs`, constante central em `lib/routing.mjs`.
- `SITE_URL=https://www.confeitarialucrativaoficial.com`, sem sufixo de pasta. Valor público em `.env.production`; configure o mesmo valor na Vercel para evitar overrides antigos.
- Página final: `https://www.confeitarialucrativaoficial.com/natallucrativo`.
- Todas as rotas, imagens originais, otimização de imagens e bundles funcionam dentro de `/natallucrativo`. Links `next/link` recebem o prefixo automaticamente. Hotmart e Instagram mantêm suas URLs externas.
- Sitemap: `/natallucrativo/sitemap.xml`; robots deste projeto: `/natallucrativo/robots.txt`. Canônicos e Open Graph incluem a pasta e o domínio final.

## 1. Validar em Preview

1. Na Vercel, crie ou use o projeto **independente natal-lucrativo**, conectado a este repositório. Não reutilize o projeto da Confeitaria Lucrativa.
2. Use Next.js; Root Directory `.`; Node.js `24.x`; Install Command `npm ci`; Build Command `npm run build`; Output Directory padrão do framework.
3. Em Settings → Environment Variables, defina `SITE_URL` como `https://www.confeitarialucrativaoficial.com`. Não inclua `/natallucrativo`. Aplique a Production e Preview; verifique se não existe valor antigo conflitante. WhatsApp é opcional.
4. Gere um Preview da branch `feat/proxy-natallucrativo`. Abra a URL fornecida pela Vercel **acrescentando `/natallucrativo`**. A raiz `/` deste projeto retorna 404 intencionalmente: este app usa uma pasta.
5. Teste `/natallucrativo`, `/natallucrativo/combo-natal-lucrativo`, `/natallucrativo/cursos`, `/natallucrativo/contato`, `/natallucrativo/politica-de-privacidade` e `/natallucrativo/termos-de-uso`. Confira imagens, carrossel e zoom, menu, FAQ e checkout. Os links canônicos do Preview apontam ao domínio final por decisão de configuração.

## 2. Integrar ao main e criar deploy do projeto Natal

1. Abra o pull request da branch de trabalho para `main` **no repositório natal-lucrativo**. Revise o diff e as verificações.
2. Após revisão, faça Merge. Na Vercel desse projeto, deixe `main` como Production Branch e confirme a integração Git ativa.
3. O merge gera o deploy de produção **do projeto Natal**, com endereço próprio `*.vercel.app`. Caso deploys automáticos estejam desativados, use Deployments → Redeploy no commit integrado.
4. Anote o domínio de produção estável desse novo projeto. Não use URL temporária de Preview para o encaminhamento definitivo.
5. Não atribua `www.confeitarialucrativaoficial.com` ao novo projeto: isso substituiria a associação do domínio do site principal. A pasta é encaminhada na camada que atualmente atende o domínio.

## 3. Encaminhar somente a pasta no domínio existente

O `basePath` não publica sozinho uma pasta em outro projeto. O responsável pela hospedagem do domínio precisa criar um proxy/rewrite exclusivo para os dois padrões abaixo, preservando `/natallucrativo` no destino:

| Origem no domínio principal | Destino no projeto Natal |
| --- | --- |
| `/natallucrativo` | `https://DOMINIO-ESTAVEL-DO-PROJETO-NATAL.vercel.app/natallucrativo` |
| `/natallucrativo/:path*` | `https://DOMINIO-ESTAVEL-DO-PROJETO-NATAL.vercel.app/natallucrativo/:path*` |

O domínio acima é um marcador: substitua pelo endereço real entregue pela Vercel. Se a camada que atende o site principal é um projeto Vercel, o responsável pode **adicionar** as regras abaixo à configuração de roteamento existente, sem sobrescrever regras, redirects ou arquivos do site principal:

```json
{
  "rewrites": [
    {
      "source": "/natallucrativo",
      "destination": "https://DOMINIO-ESTAVEL-DO-PROJETO-NATAL.vercel.app/natallucrativo"
    },
    {
      "source": "/natallucrativo/:path*",
      "destination": "https://DOMINIO-ESTAVEL-DO-PROJETO-NATAL.vercel.app/natallucrativo/:path*"
    }
  ]
}
```

Este é um trecho para incorporar à configuração existente, não um arquivo para substituir cegamente a configuração principal. Se há regra abrangente para todas as rotas, o responsável deve garantir a precedência destas duas regras específicas. Em Next.js com rotas abrangentes, pode ser necessário usar `rewrites().beforeFiles` na configuração do projeto responsável pelo domínio. Se o domínio está em outro provedor, configure as mesmas duas rotas em seu reverse proxy. DNS não encaminha pastas e não precisa ser trocado.

**Nenhuma configuração do site principal foi alterada por este projeto.** Sem a etapa de encaminhamento por quem controla o domínio, o Preview e o domínio `*.vercel.app/natallucrativo` podem funcionar, mas a URL final compartilhada ainda não estará publicada. Essa etapa depende da infraestrutura existente e não foi executada aqui.

O robots efetivo para rastreadores é o `/robots.txt` da raiz do domínio, controlado pela hospedagem principal. Este projeto oferece seu arquivo no prefixo sem substituir o arquivo principal. O responsável pode cadastrar diretamente o sitemap completo no Search Console, sem alterar o robots principal; deve verificar se as regras existentes da raiz permitem o rastreamento da pasta.

## 4. Conferência após a publicação

- A home da Confeitaria Lucrativa continua com o mesmo conteúdo.
- `/natallucrativo` e as cinco páginas internas respondem corretamente.
- `.../natallucrativo/images/imagem%20topo.png` responde com imagem.
- Os recursos `.../natallucrativo/_next/...` e o otimizador `.../natallucrativo/_next/image?...` respondem sem 404 (incluídos pela regra de subcaminhos).
- Capas e depoimentos carregam, o zoom fecha com Escape e os botões mantêm a URL Hotmart original.
- `.../natallucrativo/sitemap.xml` lista seis URLs do domínio final, com o prefixo uma única vez.

As apostilas vendidas são entregues pelo fluxo da Hotmart; este repositório contém suas capas, não PDFs para download público. Não foram criados links de download fictícios.
