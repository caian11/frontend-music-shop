<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Produtos</h6>
      <!-- Botão para Adicionar Novo Produto -->
      <router-link to="/adicionar-produto" class="btn btn-success btn-sm">
        Adicionar Produto
      </router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Produto</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Marca</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Valor</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantidade em Estoque</th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="produto in produtos" :key="produto.id">
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <h6 class="mb-0 text-sm">{{ produto.nome }}</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{ produto.marca || 'Sem Marca' }}</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success">{{ produto.valor }}</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ produto.quantidadeEstoque }}</span>
            </td>
            <td class="align-middle">
              <div class="btn-group" role="group" aria-label="Product Actions">
                <!-- Botão Visualizar -->
                <router-link :to="{ name: 'Produto', params: { id: produto.id } }" class="btn btn-info btn-sm">
                  <i class="fas fa-eye"></i> Visualizar
                </router-link>
                <!-- Botão Excluir -->
                <button @click="deleteProduto(produto.id)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash-alt"></i> Excluir
                </button>
                <!-- Botão Editar -->
                <router-link :to="{ name: 'ProdutoEdit', params: { id: produto.id } }" class="btn btn-warning btn-sm">
                  <i class="fas fa-edit"></i> Editar
                </router-link>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Produto", // Nome do componente
  setup() {
    const produtos = ref([]);

    // Função para pegar os produtos da API
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtém o token do localStorage
        const response = await axios.get("http://localhost:3000/produto", {
          headers: {
            Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
          },
        });
        produtos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    // Função para excluir o produto
    const deleteProduto = async (id) => {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
      if (confirmDelete) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:3000/produto/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Atualiza a lista após a exclusão
          produtos.value = produtos.value.filter((produto) => produto.id !== id);
          alert("Produto excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir produto:", error);
          alert("Erro ao excluir produto.");
        }
      }
    };

    // Chama a função quando o componente for montado
    onMounted(() => {
      fetchProdutos();
    });

    return {
      produtos,
      deleteProduto,
    };
  },
};
</script>

<style scoped>
/* Estilos do card */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tabela */
table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

table th,
table td {
  padding: 15px;
  text-align: left;
}

table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

table td {
  background-color: #f1f3f5;
}

/* Botão e ícones */
.btn-group {
  display: flex;
  gap: 10px;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 5px 10px;
}

.fas {
  margin-right: 5px;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-warning:hover {
  background-color: #e0a800;
}

/* Alinhamento do texto */
.text-center {
  text-align: center;
}

/* Mensagens de erro */
.text-danger {
  color: #dc3545;
}
</style>
