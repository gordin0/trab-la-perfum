# Le Parfum — Sistema Web de Loja de Perfumes

## Visão Geral

Sistema web completo para a loja de perfumes **Le Parfum**, desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla JS), sem dependência de frameworks externos. O sistema permite que clientes visualizem o catálogo de fragrâncias, realizem pedidos, se cadastrem e acompanhem seus históricos. O administrador possui um painel completo para gestão de pedidos, produtos e clientes.

---

## Estrutura de Arquivos

```
le-parfum/
├── index.html              → Página inicial (Home)
├── css/
│   └── style.css           → Estilos globais (design luxuoso dourado/escuro)
├── js/
│   └── app.js              → Lógica principal (carrinho, auth, produtos, pedidos)
└── pages/
    ├── catalogo.html       → Catálogo completo com filtros e busca
    ├── checkout.html       → Finalização de pedido com formulário completo
    ├── perfil.html         → Perfil do cliente (pedidos, dados, favoritos)
    ├── admin.html          → Painel administrativo completo
    ├── sobre.html          → Página Sobre Nós
    └── contato.html        → Página de Contato com FAQ
```

---

## Funcionalidades Implementadas

### Para Clientes
| Funcionalidade | Descrição |
|---|---|
| Catálogo de Produtos | 12 fragrâncias premium com filtros por categoria, marca, preço e busca |
| Carrinho de Compras | Drawer lateral com adição, remoção, ajuste de quantidade e cálculo de frete |
| Cadastro de Cliente | Formulário com nome, e-mail, telefone, cidade e senha |
| Login | Autenticação com persistência via localStorage |
| Favoritos (Wishlist) | Marcar/desmarcar produtos favoritos |
| Checkout Completo | Formulário de entrega com busca de CEP automática (ViaCEP) e 4 formas de pagamento |
| Perfil do Cliente | Histórico de pedidos, edição de dados e alteração de senha |
| Modal de Produto | Visualização detalhada com notas olfativas, tamanhos e avaliações |

### Para Administradores
| Funcionalidade | Descrição |
|---|---|
| Dashboard | Métricas de receita, pedidos, clientes e produtos |
| Gestão de Pedidos | Tabela completa com filtro por status e atualização em tempo real |
| Gestão de Produtos | CRUD completo (criar, editar, excluir produtos) |
| Gestão de Clientes | Listagem com busca e visualização detalhada de cada cliente |
| Relatórios | Gráficos de barras por status de pedido e categoria de produto |

---

## Como Executar

### Opção 1 — Servidor Local (Python)
```bash
cd le-parfum
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

### Opção 2 — XAMPP
1. Copie a pasta `le-parfum` para `C:\xampp\htdocs\`
2. Inicie o Apache no painel do XAMPP
3. Acesse: `http://localhost/le-parfum`

### Opção 3 — Abrir diretamente
Abra o arquivo `index.html` diretamente no navegador (algumas funcionalidades como busca de CEP requerem servidor).

---

## Credenciais de Acesso

| Tipo | E-mail | Senha |
|---|---|---|
| Administrador | admin@leperfum.com | admin123 |
| Cliente demo | ana@email.com | qualquer senha (4+ chars) |
| Cliente demo | carlos@email.com | qualquer senha (4+ chars) |

> **Nota:** O sistema usa `localStorage` para persistência de dados. Não há banco de dados real — ideal para demonstração e prototipagem.

---

## Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e acessível
- **CSS3** — Design responsivo com variáveis CSS, Grid, Flexbox e animações
- **JavaScript ES6+** — Módulos de lógica (Cart, Auth, Wishlist, Checkout, ProductsUI)
- **Google Fonts** — Playfair Display (serif) + Lato (sans-serif)
- **ViaCEP API** — Preenchimento automático de endereço por CEP
- **localStorage** — Persistência de dados no navegador

---

## Paleta de Cores

| Nome | Hex | Uso |
|---|---|---|
| Dourado | `#C9A84C` | Destaque, botões primários, acentos |
| Dourado Claro | `#E8C97A` | Hover states |
| Preto | `#0A0A0A` | Fundo escuro, navbar |
| Branco Creme | `#F5F5F0` | Fundo principal |
| Cinza | `#6B6B6B` | Textos secundários |

---

## Responsividade

O sistema é totalmente responsivo para:
- **Desktop** (1200px+) — Layout completo com sidebar
- **Tablet** (768px–1024px) — Layout adaptado, sidebar colapsada
- **Mobile** (< 768px) — Menu hambúrguer, cards empilhados, drawer de carrinho em tela cheia

---

*Desenvolvido como sistema de demonstração para a loja Le Parfum — 2025*
