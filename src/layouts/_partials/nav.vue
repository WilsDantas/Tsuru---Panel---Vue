<template>
  <!--Navbar -->
<nav class="mb-1 navbar navbar-expand-lg navbar-dark secondary-color lighten-1 mb-3">
  <router-link :to="{name: 'dashboard'}" class="navbar-brand">Tsuru</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link :to="{name: 'dashboard'}" class="nav-link">Dashboard</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'products.index'}" class="nav-link">Products</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Orders</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Clients</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Categories</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Sub Categories</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Brands</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Users</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Profiles</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto nav-flex-icons">
      <li class="nav-item avatar dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <img :src="me.image" class="avatar rounded-circle"
            alt="avatar image" style="width: 40px">
        </a>
        <div class="dropdown-menu dropdown-menu-lg-right dropdown-secondary"
          aria-labelledby="navbarDropdownMenuLink-55">
          <a class="dropdown-item" href="#">Configurations</a>
          <a class="dropdown-item" href="#">Profile</a>
          <a class="dropdown-item" @click="logout">Logout</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
<!--/.Navbar -->
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      me: (state) => state.auth.me,
    }),
  },

  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push({ name: "login" }))
        .catch(() => '')
    },
  },
};
</script>
