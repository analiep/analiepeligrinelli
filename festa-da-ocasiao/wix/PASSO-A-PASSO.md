# Festa da Ocasião: página oculta no site Dra Cleo Lobos So 3

Site: **Dra Cleo Lobos So 3** (solucoescontabeissjc.com, Premium, Wix Editor).

## Arquivos desta pasta

| Arquivo | Para quê |
|---|---|
| `convite-wix.html` | Código do convite. Cole no elemento Embed HTML da página do convite. |
| `telao-wix.html` | Mesmo convite, aberto direto no modo telão. Cole na página do telão. |
| `codigo-da-pagina.js` | Código da página (Velo). Grava confirmações e fotos no banco do site. Cole nas duas páginas. |

## 1. Criar a página do convite

1. Abra o editor do site.
2. Clique em **Pages & Menu** (Páginas e Menu), à esquerda, e adicione uma página em branco.
3. Dê a ela o nome **Festa da Ocasião**.

## 2. Esconder a página do menu

1. Em **Pages & Menu**, clique no ícone **More Actions** (Mais ações) ao lado da página.
2. Escolha **Hide from menu** (Ocultar do menu).

A página some do menu, mas abre por quem tiver o link. Ela continua aparecendo no Google, por isso o próximo passo.

Fonte: https://support.wix.com/en/article/wix-editor-hiding-and-unhiding-a-page-from-your-site-menu

## 3. Tirar a página do Google

1. Em **Pages & Menu**, clique em **More Actions** ao lado da página.
2. Clique em **SEO basics**.
3. Desligue **Let search engines index this page**.

Fonte: https://support.wix.com/en/article/wix-editor-preventing-search-engines-from-indexing-your-page

## 4. Colocar o convite na página

1. Clique em **Add Elements** (Adicionar), à esquerda.
2. Clique em **Embed Code** > **Popular Embeds** > **Embed HTML**.
3. Clique no elemento, depois em **Enter Code**.
4. Cole todo o conteúdo de `convite-wix.html` e clique em **Apply**.
5. Estique o elemento na largura toda da página, com cerca de 900 px de altura.
6. No editor de celular, ajuste a altura do mesmo elemento para ocupar a tela do celular.

O convite rola dentro do próprio quadro. Os pop-ups e a explosão ficam dentro dele.

Fonte: https://support.wix.com/en/article/wix-editor-embedding-a-site-or-a-widget

## 5. Ligar o código no site

Confirmação e fotos precisam do código da página (Velo), que hoje está desligado nesse site.

Siga o passo "Enable coding" deste guia oficial:
https://dev.wix.com/docs/develop-websites/articles/getting-started/quick-start#step-1--enable-coding

## 6. Criar as coleções do banco

Depois do passo 5, avise o Claude para criar estas duas coleções pela API. Se preferir, crie no CMS:

| Coleção | Campos | Permissões |
|---|---|---|
| `FestaRSVP` | nome, resposta, ocasioes, criadoEm | Qualquer pessoa pode **adicionar**; só administradores **leem** |
| `FestaFotos` | autor, autorKey, dataUrl, criadoEm | Qualquer pessoa pode **adicionar** e **ler** |

## 7. Colar o código da página

1. Com a página do convite aberta, abra o painel de código no rodapé do editor.
2. Cole todo o conteúdo de `codigo-da-pagina.js`.
3. Clique no elemento Embed HTML e confira o ID dele no painel de propriedades. O código espera `html1`. Se for outro, troque na linha marcada.
4. Se o editor reclamar do `@wix/data`, instale o pacote pelo gerenciador de pacotes:
   https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/packages/work-with-npm-packages-in-the-editor

## 8. Página do telão

1. Crie outra página, oculta e fora do Google (passos 1 a 3), chamada **Telão**.
2. Adicione um Embed HTML com o conteúdo de `telao-wix.html`, ocupando a página inteira.
3. Cole o mesmo `codigo-da-pagina.js`, conferindo o ID do elemento.
4. No dia da festa, abra essa página no notebook ligado ao HDMI e clique em **Tela cheia**. As fotos novas aparecem a cada 15 segundos.

## 9. Publicar e testar

1. Publique o site.
2. Abra o link da página do convite no celular e faça o fluxo inteiro: uma resposta, um nome e uma foto.
3. Confira no CMS se a resposta e a foto chegaram.
4. Apague os registros de teste antes de enviar o link aos convidados.

## Limites conhecidos

- **Fotos no banco:** elas ficam como texto na coleção `FestaFotos`, já comprimidas, e não aparecem no Gerenciador de Mídia.
- **Telão:** mostra as 60 fotos mais recentes.
- **Quadro do convite:** como o convite está dentro de um quadro de altura fixa, no celular a rolagem acontece dentro dele.
