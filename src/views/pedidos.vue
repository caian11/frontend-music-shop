<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Pedidos</h6>
      <!-- Botão para adicionar novo pedido -->
      <button @click="goToAddPedido" class="btn btn-success btn-sm">Adicionar Novo Pedido</button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div v-if="loading" class="text-center">
        <p class="text-muted">Carregando pedidos...</p>
      </div>

      <div v-else class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Número do Pedido
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Valor
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Data
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Status
            </th>
            <th class="text-secondary opacity-7"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <p class="text-xs font-weight-bold mb-0">{{ pedido.numero }}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">R$ {{ parseFloat(pedido.valor).toFixed(2) }}</p>
            </td>
            <td class="text-xs font-weight-bold mb-0">
              {{ pedido.data }}
            </td>
            <td>
                <span class="badge badge-sm" :class="getStatusClass(pedido.status)">
                  {{ pedido.status }}
                </span>
            </td>
            <td>
              <router-link :to="{ name: 'PedidoDetalhes', params: { id: pedido.id } }" class="btn btn-info btn-sm">
                Detalhes
              </router-link>
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
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "PedidoList",
  setup() {
    const pedidos = ref([]);
    const loading = ref(true);
    const router = useRouter();  // Instanciando o router

    // Função para buscar os pedidos
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token");

        // Verificando se o token está presente
        if (!token) {
          alert("Token não encontrado. Faça login.");
          return;
        }

        // Requisição para obter os pedidos
        const response = await axios.get("http://localhost:3000/pedidos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificando a resposta
        if (response && response.data) {
          pedidos.value = response.data;
        } else {
          alert("Nenhum pedido encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        alert("Erro ao buscar pedidos.");
      } finally {
        loading.value = false;
      }
    };

    // Função para redirecionar para a tela de adicionar novo pedido
    const goToAddPedido = () => {
      router.push({ name: "AdicionarPedido" });
    };

    // Função para obter a classe do status
    const getStatusClass = (status) => {
      switch (status) {
        case "Pendente":
          return "bg-gradient-warning";
        case "Concluído":
          return "bg-gradient-success";
        case "Cancelado":
          return "bg-gradient-danger";
        default:
          return "bg-gradient-secondary";
      }
    };

    // Chama a função quando o componente for montado
    onMounted(() => {
      fetchPedidos();
    });

    return {
      pedidos,
      loading,
      goToAddPedido,
      getStatusClass,
    };
  },
};
</script>

<style scoped>
/* Estilos adicionais para o componente */
.table {
  margin-top: 20px;
}

.badge {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
