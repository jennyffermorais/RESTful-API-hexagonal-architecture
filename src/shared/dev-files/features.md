# Detalhamento das Funcionalidades

### Cadastro do Cliente
- **Arquivo:** `src/adapters/in/api/v1/controller/ClientController.ts`
  - **Descrição:** Endpoints para cadastro de clientes.
- **Arquivo:** `src/application/service/ClientService.ts`
  - **Descrição:** Lógica de cadastro de clientes.
- **Arquivo:** `src/domain/model/Client.ts`
  - **Descrição:** Entidade de cliente.

### Identificação do Cliente via CPF
- **Arquivo:** `src/adapters/in/api/v1/controller/ClientController.ts`
  - **Descrição:** Endpoint para identificação via CPF.
- **Arquivo:** `src/application/service/ClientService.ts`
  - **Descrição:** Lógica de identificação de clientes.
- **Arquivo:** `src/domain/repository/ClientRepository.ts`
  - **Descrição:** Repositório para acessar dados do cliente.

### Criar, editar e remover produtos
- **Arquivo:** `src/adapters/in/api/v1/controller/ProductController.ts`
  - **Descrição:** Endpoints para CRUD de produtos.
- **Arquivo:** `src/application/service/ProductService.ts`
  - **Descrição:** Lógica de negócios para produtos.
- **Arquivo:** `src/domain/model/Product.ts`
  - **Descrição:** Entidade de produto.

### Buscar produtos por categoria
- **Arquivo:** `src/adapters/in/api/v1/controller/ProductController.ts`
  - **Descrição:** Endpoint para buscar produtos por categoria.
- **Arquivo:** `src/application/service/ProductService.ts`
  - **Descrição:** Lógica para busca de produtos.
- **Arquivo:** `src/domain/repository/ProductRepository.ts`
  - **Descrição:** Repositório para acesso a produtos.

### Fake checkout, apenas enviar os produtos escolhidos para a fila
- **Arquivo:** `src/adapters/in/api/v1/controller/CheckoutController.ts`
  - **Descrição:** Endpoint para checkout.
- **Arquivo:** `src/application/service/CheckoutService.ts`
  - **Descrição:** Lógica para o checkout.
- **Arquivo:** `src/adapters/out/messaging/CheckoutPublisher.ts`
  - **Descrição:** Publicador de mensagens para fila de checkout.

### Listar os pedidos
- **Arquivo:** `src/adapters/in/api/v1/controller/OrderController.ts`
  - **Descrição:** Endpoint para listar pedidos.
- **Arquivo:** `src/application/service/OrderService.ts`
  - **Descrição:** Lógica para listagem de pedidos.
- **Arquivo:** `src/domain/model/Order.ts`
  - **Descrição:** Entidade de pedido.
