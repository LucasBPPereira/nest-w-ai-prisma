# Explicação do Modelo de Dados

- User: A tabela de usuários armazena informações sobre os clientes da loja, como e-mail, senha e nome. O relacionamento com as ordens é feito através do campo orders, que conecta o usuário a várias compras feitas.

- Book: A tabela de livros armazena informações sobre cada livro, como título, autor, preço, estoque disponível e categoria. Ela se relaciona com a tabela de Category (livros podem pertencer a uma categoria específica) e OrderItem (um pedido pode conter múltiplos livros).

- Category: A tabela de categorias armazena as categorias de livros (ex.: ficção, não-ficção, acadêmicos). Ela tem um relacionamento com os livros, onde cada livro pertence a uma categoria.

- Order: A tabela de pedidos armazena informações sobre as compras feitas pelos usuários. Cada pedido tem um status (`PENDING`, `COMPLETED`, `CANCELLED`) e está associado a um usuário. Ele também tem um relacionamento com os itens do pedido (livros comprados).

- OrderItem: Cada item de pedido representa um livro específico dentro de um pedido. Ele registra a quantidade e o preço de cada livro adquirido.

- UserPreferences: Essa tabela armazena as preferências de categoria de livros de cada usuário. Por exemplo, se um usuário tem interesse em livros de ficção científica, essas preferências podem ser usadas para sugerir livros de forma mais personalizada.

- OrderStatus (Enum): Um enum para representar os possíveis status de um pedido, que pode ser PENDING (pendente), COMPLETED (completado) ou CANCELLED (cancelado).

