<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Editar Produto</h6>
    </div>
    <div class="card-body">
      <div v-if="loading" class="text-center">
        <p class="text-muted">Carregando dados do produto...</p>
      </div>

      <div v-else-if="produto" class="form-group">
        <form @submit.prevent="updateProduto">
          <div class="form-group mb-3">
            <label for="nome">Nome do Produto</label>
            <input
              type="text"
              id="nome"
              v-model="produto.nome"
              class="form-control"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="marca">Marca</label>
            <input
              type="text"
              id="marca"
              v-model="produto.marca"
              class="form-control"
            />
          </div>
          <div class="form-group mb-3">
            <label for="valor">Valor</label>
            <input
              type="text"
              id="valor"
              v-model="produto.valor"
              class="form-control"
              @input="formatValue"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="quantidadeEstoque">Quantidade em Estoque</label>
            <input
              type="number"
              id="quantidadeEstoque"
              v-model="produto.quantidadeEstoque"
              class="form-control"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="descricao">Descrição</label>
            <textarea
              id="descricao"
              v-model="produto.descricao"
              class="form-control"
            ></textarea>
          </div>
          <div class="form-group mb-3">
            <label>Status</label>
            <select v-model="produto.status" class="form-control">
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success btn-sm">
            Salvar alterações
          </button>
        </form>
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
  name: "ProdutoEdit",
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

    const updateProduto = async () => {
      try {
        const token = localStorage.getItem("token");

        const valorConvertido = produto.value.valor.replace(",", ".");

        const produtoData = {
          nome: produto.value.nome,
          marca: produto.value.marca,
          valor: parseFloat(valorConvertido),
          quantidadeEstoque: produto.value.quantidadeEstoque,
          descricao: produto.value.descricao,
          status: produto.value.status,
        };

        await axios.patch(
          `http://localhost:3000/produto/${produtoId}`,
          produtoData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert("Produto atualizado com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto.");
      }
    };

    onMounted(() => {
      fetchProduto();
    });

    return {
      produto,
      loading,
      updateProduto,
    };
  },
};
</script>

<style scoped></style>
