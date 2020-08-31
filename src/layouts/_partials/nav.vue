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
        <router-link :to="{name: 'orders.index'}" class="nav-link">Orders</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'clients.index'}" class="nav-link">Clients</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'categories.index'}" class="nav-link">Categories</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'subcategories.index'}" class="nav-link">Sub Categories</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'brands.index'}" class="nav-link">Brands</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'users.index'}" class="nav-link">Users</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'profiles.index'}" class="nav-link">Profiles</router-link>
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
