<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Detalhes do Produto</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div v-if="loading" class="text-center">
        <p class="text-muted">Carregando dados do produto...</p>
      </div>

      <div v-else-if="produto" class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
          <tbody>
            <tr>
              <td><strong>Produto:</strong></td>
              <td>{{ produto.nome }}</td>
            </tr>
            <tr>
              <td><strong>Marca:</strong></td>
              <td>{{ produto.marca || "Sem Marca" }}</td>
            </tr>
            <tr>
              <td><strong>Valor:</strong></td>
              <td>{{ formatCurrency(produto.valor) }}</td>
            </tr>
            <tr>
              <td><strong>Quantidade em Estoque:</strong></td>
              <td>{{ produto.quantidadeEstoque }}</td>
            </tr>
            <tr>
              <td><strong>Descrição:</strong></td>
              <td>{{ produto.descricao || "Sem descrição" }}</td>
            </tr>
            <tr>
              <td><strong>Status:</strong></td>
              <td>
                <span
                  class="badge"
                  :class="
                    produto.status
                      ? 'bg-gradient-success'
                      : 'bg-gradient-secondary'
                  "
                >
                  {{ produto.status ? "Ativo" : "Inativo" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-3 text-center">
          <router-link to="/Tables" class="btn btn-light btn-sm text-muted">
            <i class="fas fa-arrow-left"></i> Voltar
          </router-link>
        </div>
      </div>

      <div v-else class="text-center">
        <p class="text-danger font-weight-bold">Produto não encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "produto",
  setup() {
    const produto = ref(null);
    const loading = ref(true);
    const route = useRoute();
    const produtoId = route.params.id;

    const fetchProduto = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/produto/${produtoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        produto.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        loading.value = false;
      }
    };

    const formatCurrency = (value) => {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    };

    onMounted(() => {
      fetchProduto();
    });

    return {
      produto,
      loading,
      formatCurrency,
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  font-size: 1.25rem;
}

.card-header .font-weight-bold {
  color: #007bff;
}

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

table .badge {
  font-size: 0.85rem;
}

button,
.router-link-active {
  margin-top: 10px;
  font-size: 0.875rem;
  padding: 10px 20px;
  border-radius: 4px;
}

.text-muted {
  color: #6c757d !important;
}

.text-center {
  text-align: center;
}

.text-danger {
  color: #dc3545;
}
</style>
