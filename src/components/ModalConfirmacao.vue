<template>
  <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true" v-if="modalAberto">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Sucesso!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="fecharModal"></button>
        </div>
        <div class="modal-body">
          Seus dados foram atualizados com sucesso!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="fecharModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Adicionando a importação do 'ref'

// Controlando a visibilidade do modal
const modalAberto = ref(false);

// Função para fechar o modal
const fecharModal = () => {
  modalAberto.value = false;
};
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
}
</style>
