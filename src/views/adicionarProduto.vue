<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Adicionar Novo Produto</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="createProduto">
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
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="valor">Valor</label>
          <input
            type="number"
            id="valor"
            v-model="produto.valor"
            class="form-control"
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
          <select v-model="produto.status" class="form-control" required>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success btn-sm">
          Adicionar Produto
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AdicionarProduto",
  setup() {
    const produto = ref({
      nome: "",
      marca: "",
      valor: 0,
      quantidadeEstoque: 0,
      descricao: "",
      status: true,
    });
    const router = useRouter();

    const createProduto = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/produto", produto.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Produto criado com sucesso!");
        router.push("/tables");
      } catch (error) {
        console.error("Erro ao criar produto:", error);
        alert("Erro ao criar produto.");
      }
    };

    return {
      produto,
      createProduto,
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
