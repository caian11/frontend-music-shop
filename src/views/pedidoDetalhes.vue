<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6 v-if="pedido">Detalhes do Pedido #{{ pedido.numero }}</h6>
      <p v-else>Carregando detalhes do pedido...</p>
    </div>
    <div class="card-body">
      <div v-if="loading" class="text-center">
        <p class="text-muted">Carregando detalhes do pedido...</p>
      </div>

      <div v-else>
        <div v-if="pedido">
          <p>
            <strong>Valor:</strong> R$ {{ parseFloat(pedido.valor).toFixed(2) }}
          </p>
          <p><strong>Data:</strong> {{ pedido.data }}</p>
          <p>
            <strong>Forma de Pagamento:</strong> {{ pedido.formaPagamento }}
          </p>
          <p><strong>Status:</strong> {{ pedido.status }}</p>

          <h6>Produtos:</h6>
          <ul>
            <li v-for="produto in pedido.produtos" :key="produto.id">
              <strong>{{ produto.nome }}</strong> - R$
              {{ parseFloat(produto.valor).toFixed(2) }}
              <br />
              Marca: {{ produto.marca }} | Estoque:
              {{ produto.quantidadeEstoque }}
              <br />
              Descrição: {{ produto.descricao }}
            </li>
          </ul>
        </div>

        <div v-else>
          <p class="text-danger">Pedido não encontrado.</p>
        </div>

        <button @click="goBack" class="btn btn-secondary btn-sm">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "PedidoDetalhes",
  setup() {
    const pedido = ref(null);
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const pedidoId = route.params.id;

    const fetchPedido = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/pedidos/${pedidoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        pedido.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        alert("Erro ao buscar pedido.");
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.push("/pedidos");
    };

    onMounted(() => {
      fetchPedido();
    });

    return {
      pedido,
      loading,
      goBack,
    };
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
