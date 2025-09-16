# BlueLine — Site Oficial

Site estático da equipe de robótica BlueLine (E.E. Prof. Amilcare Mattei).

- Deploy: [site-official-one.vercel.app](https://site-official-one.vercel.app/)
- Tecnologias: HTML, CSS e JavaScript puro

## Estrutura

```
Site robotica 2025/
├─ index.html               # Home + feed de Novidades (localStorage)
├─ style.css                # Estilos globais do site
├─ script.js                # Menu responsivo (hambúrguer)
├─ acesso_adm/
│  ├─ adm.html              # Painel do administrador (login + posts)
│  ├─ adm.css               # Estilos do painel
│  └─ adm.js                # Lógica de login e CRUD de posts (localStorage)
├─ sobre/
│  ├─ sobre.html
│  └─ sob.css
├─ comp/                    # Competições
├─ contatos/                # Contatos
└─ imagens/                 # Imagens do site
```

## Executar localmente

1. Baixe/clonar o projeto.
2. Abra o arquivo `index.html` no navegador (duplo clique) ou sirva com um servidor simples:
   - VS Code: extensão "Live Server"
   - Node: `npx serve` (ou qualquer servidor estático)

## Painel Administrativo

O painel simples de administração usa apenas localStorage (lado do cliente) para armazenar posts. É ideal para testes/demonstrações. Para produção, recomenda-se um backend com autenticação real e banco de dados.

- Acesse: `acesso_adm/adm.html`
- Login padrão: `admin`
- Senha padrão: `blueline2025`
- Após login, você pode criar, editar e excluir posts. Eles aparecem em "Novidades" na home (`index.html`).

Para alterar o usuário/senha de teste, edite em `acesso_adm/adm.js`:

```js
const ADMIN_CONFIG = {
  username: 'admin',
  password: 'blueline2025'
};
```

Observação: como os dados estão no localStorage do navegador, cada dispositivo/navegador tem seu próprio conjunto de posts. Limpar cache/apagar dados do site zera o feed local.

## Estilo / UI

- Tema azul com gradientes e bordas luminosas.
- Botão "Acesso ADM" estilizado no header.
- Feed de posts responsivo com imagens opcionais.

## Deploy

O deploy está feito na Vercel:

- Produção: [site-official-one.vercel.app](https://site-official-one.vercel.app/)

Para publicar atualizações:

1. Faça commit/push das mudanças no repositório conectado à Vercel, ou
2. Faça deploy manual via painel da Vercel (import do Git) ou `vercel` CLI.

## Licença

Projeto educacional. Ajuste conforme a necessidade da equipe.
