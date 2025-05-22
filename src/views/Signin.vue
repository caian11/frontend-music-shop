<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

import Navbar from '@/examples/PageLayout/Navbar.vue';
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonSwitch from '@/components/ArgonSwitch.vue';
import ArgonButton from '@/components/ArgonButton.vue';

const store = useStore();
const router = useRouter();
const body = document.body;

// visibilidade dos elementos de layout
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove('bg-gray-100');
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add('bg-gray-100');
});

// **Novas refs para o formulário**
const email = ref('');
const senha = ref('');
const lembrar = ref(false);
const error = ref('');

// **Função de login**
async function handleLogin() {
  error.value = '';
  try {
    const { data } = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      senha: senha.value,
      rememberMe: lembrar.value,
    });
    // Armazena o token e configura header
    localStorage.setItem('token', data.access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    // Redireciona para dashboard (ajuste a rota conforme seu router)
    await router.push({ name: 'Dashboard' });
  } catch (err) {
    // Exibe mensagem de erro vinda do backend (ou genérica)
    error.value = err.response?.data?.message || 'Falha no login';
  }
}
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          :darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                  <p class="mb-0">Entre com seu email e senha</p>
                </div>
                <div class="card-body">
                  <!-- form com submit -->
                  <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                      <argon-input
                        v-model="email"
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        v-model="senha"
                        id="password"
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        size="lg"
                      />
                    </div>
                    <argon-switch v-model="lembrar" id="rememberMe" name="remember-me">
                      Mantenha-me conectado
                    </argon-switch>

                    <!-- exibe erro -->
                    <p v-if="error" class="text-danger mt-2">{{ error }}</p>

                    <div class="text-center">
                      <argon-button
                        type="submit"
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                      >
                        Entrar
                      </argon-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Você não tem uma conta?
                    <a
                      href="/cadastro"
                      class="text-success text-gradient font-weight-bold"
                    >
                      Cadastrar
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <!-- coluna da imagem -->
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://images.unsplash.com/photo-1627407661127-fe96129c06dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3'); background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">
                  "Sua paixão em cada nota"
                </h4>
                <p class="text-white position-relative">
                  Sugere que os instrumentos são o meio para expressar a paixão
                  pela música, enfatizando a conexão emocional com o som.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
