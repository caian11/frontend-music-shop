<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];
const store = useStore();

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const name = ref('');
const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/usuarios', {
      nome: name.value,
      email: email.value,
      senha: password.value
    });
    console.log('Usuário cadastrado com sucesso:', response.data);
    successMessage.value = 'Usuário cadastrado com sucesso!';
    errorMessage.value = '';
    // Opcional: limpar os campos após o cadastro
    name.value = '';
    email.value = '';
    password.value = '';
  } catch (error) {
    if (error.response) {
      // Verifica se o erro é de validação (status 400)
      if (error.response.status === 400) {
        // Supondo que o back-end retorne um objeto com erros detalhados, por exemplo:
        // { errors: [{ field: 'email', message: 'Email já existe' }, { field: 'senha', message: 'A senha deve conter...' }] }
        const errors = error.response.data.errors;
        if (errors && Array.isArray(errors)) {
          const emailError = errors.find(e => e.field === 'email');
          const passwordError = errors.find(e => e.field === 'senha');
          if (emailError) {
            errorMessage.value = 'O email informado já está em uso.';
          } else if (passwordError) {
            errorMessage.value = `Erro na senha: ${passwordError.message}`;
          } else {
            errorMessage.value = 'Erro ao cadastrar usuário. Verifique os dados informados.';
          }
        } else {
          // Se não houver array de erros, usa a mensagem padrão
          errorMessage.value = error.response.data.message || 'Erro ao cadastrar usuário.';
        }
      } else {
        errorMessage.value = 'Erro ao cadastrar usuário. Tente novamente mais tarde.';
      }
    } else {
      errorMessage.value = 'Não foi possível conectar ao servidor.';
    }
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Bem vindo!</h1>
            <p class="text-lead text-white">
              Faça login ou crie uma conta.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Registre-se</h5>
            </div>
            <div class="card-body">
              <!-- Exibe a mensagem de sucesso se existir -->
              <div v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>
              <!-- Exibe a mensagem de erro seexistir -->
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
              <form role="form" @submit.prevent="register">
                <argon-input
                  v-model="name"
                  id="name"
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                />
                <argon-input
                  v-model="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                />
                <argon-input
                  v-model="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                />
                <argon-checkbox checked>
                  <label class="form-check-label" for="flexCheckDefault">
                    Eu aceito os
                    <a href="javascript:;" class="text-dark font-weight-bolder">
                      termos e condições
                    </a>
                  </label>
                </argon-checkbox>
                <div class="text-center">
                  <argon-button
                    type="submit"
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                  >
                    Sign up
                  </argon-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Já tem uma conta?
                  <a href="javascript:;" class="text-dark font-weight-bolder">
                    Entrar
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>
