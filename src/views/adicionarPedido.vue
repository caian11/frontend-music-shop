<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Adicionar Novo Pedido</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="createPedido">
        <!-- Número do Pedido - Gerado automaticamente -->
        <div class="form-group mb-3">
          <label for="numero">Número do Pedido</label>
          <input
            type="text"
            id="numero"
            v-model="pedido.numero"
            class="form-control"
            readonly
          />
        </div>

        <!-- Outros campos do pedido -->
        <div class="form-group mb-3">
          <label for="valor">Valor</label>
          <input type="number" id="valor" v-model="pedido.valor" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="data">Data</label>
          <input type="date" id="data" v-model="pedido.data" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="formaPagamento">Forma de Pagamento</label>
          <select id="formaPagamento" v-model="pedido.formaPagamento" class="form-control" required>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Boleto">Boleto</option>
            <option value="Pix">Pix</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="status">Status</label>
          <select id="status" v-model="pedido.status" class="form-control" required>
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <!-- Tabela de Produtos -->
        <div class="form-group mb-3">
          <label for="produtos">Selecione os Produtos</label>
          <table class="table table-striped">
            <thead>
            <tr>
              <th><input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" /></th>
              <th>Produto</th>
              <th>Marca</th>
              <th>Valor</th>
              <th>Estoque</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td><input type="checkbox" :value="produto.id" v-model="pedido.produtos" /></td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.marca }}</td>
              <td>R$ {{ parseFloat(produto.valor).toFixed(2) }}</td>
              <td>{{ produto.quantidadeEstoque }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <button type="submit" class="btn btn-success btn-sm">Criar Pedido</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AdicionarPedido",
  setup() {
    const pedido = ref({
      numero: "",  // Este campo será preenchido automaticamente
      valor: 0,
      data: "",
      formaPagamento: "Cartão de Crédito",
      status: "Pendente",
      produtos: [], // Array para armazenar os IDs dos produtos selecionados
    });
    const produtos = ref([]);
    const isAllSelected = ref(false);  // Controle para seleção de todos os produtos
    const router = useRouter();

    // Função para buscar os produtos disponíveis
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        produtos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    // Função para gerar o número do pedido automaticamente
    const generateNumeroPedido = () => {
      const date = new Date();
      const timestamp = date.getTime();  // Gera um número único baseado no timestamp
      pedido.value.numero = `PED-${timestamp}`;  // Exemplo de formato, como "PED-1626152192345"
    };

    // Função para criar o pedido
    const createPedido = async () => {
      try {
        const token = localStorage.getItem("token");

        // Garantir que os produtos sejam passados como um array de números inteiros
        const produtosIds = pedido.value.produtos.map(Number);  // Converte os valores para inteiros

        await axios.post(
          "http://localhost:3000/pedidos",
          {
            ...pedido.value,
            produtos: produtosIds,  // Passa os IDs dos produtos como inteiros
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Pedido criado com sucesso!");
        router.push("/pedidos");  // Redireciona de volta para a listagem de pedidos
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
        alert("Erro ao criar pedido.");
      }
    };

    // Função para selecionar/deselecionar todos os produtos
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        pedido.value.produtos = produtos.value.map(produto => produto.id);
      } else {
        pedido.value.produtos = [];
      }
    };

    // Função para verificar se todos os produtos estão selecionados
    const checkAllSelected = () => {
      isAllSelected.value = pedido.value.produtos.length === produtos.value.length;
    };

    // Chama a função quando o componente for montado
    onMounted(() => {
      fetchProdutos();
      generateNumeroPedido();  // Gera o número do pedido automaticamente
    });

    return {
      pedido,
      produtos,
      isAllSelected,
      createPedido,
      toggleSelectAll,
      checkAllSelected,
    };
  },
};
</script>

<style scoped>
/* Estilos adicionais para o componente */
.form-group {
  margin-bottom: 1rem;
}
.table {
  margin-top: 20px;
}
</style>
