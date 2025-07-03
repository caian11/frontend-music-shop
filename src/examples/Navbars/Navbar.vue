<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs from "../Breadcrumbs.vue";

const store = useStore();
const router = useRouter();
const isRTL = computed(() => store.state.isRTL);

const route = useRoute();

const currentRouteName = computed(() => {
  return route.name;
});
const currentDirectory = computed(() => {
  let dir = route.path.split("/")[1];
  return dir.charAt(0).toUpperCase() + dir.slice(1);
});

const minimizeSidebar = () => store.commit("sidebarMinimize");
const toggleConfigurator = () => store.commit("toggleConfigurator");

// Função para verificar se o usuário está autenticado
const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token'); // Verifica se o token existe
});

// Função para fazer o logout
const logout = () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  router.push('/signin'); // Redireciona para a página de login
};
</script>

<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="isRTL ? 'أكتب هنا...' : 'Type here...'"
            />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- Condicionalmente renderiza "Sair" ou "Sign In" -->
          <li class="nav-item d-flex align-items-center">
            <router-link
              v-if="!isAuthenticated"
              :to="{ name: 'Signin' }"
              class="px-0 nav-link font-weight-bold text-white"
            >
              <i class="fa fa-user" :class="isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">يسجل دخول</span>
              <span v-else class="d-sm-inline d-none">Sign In</span>
            </router-link>
            <a
              v-else
              href="#"
              class="px-0 nav-link font-weight-bold text-white"
              @click="logout"
            >
              <i class="fa fa-sign-out-alt" :class="isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">خروج</span>
              <span v-else class="d-sm-inline d-none">Sair</span>
            </a>
          </li>

          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="minimizeSidebar"
              class="p-0 nav-link text-white"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>

          <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
