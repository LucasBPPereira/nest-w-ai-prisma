# Fluxo de Dados

- Cadastro de Usuário: O usuário se registra com um e-mail e senha. Os dados são armazenados na tabela User.

- Cadastro de Livro: Os livros são adicionados ao catálogo com informações como título, autor, preço e categoria. Esses dados ficam na tabela Book e são relacionados a uma Category.

- Compra de Livro: O usuário faz um pedido, que é armazenado na tabela Order. Cada item do pedido (livro) é registrado na tabela OrderItem, com a quantidade comprada.

- Preferências do Usuário: O sistema pode sugerir livros de acordo com as preferências do usuário armazenadas em UserPreferences.

