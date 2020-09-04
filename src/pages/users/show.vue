<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'users.index'}">Users</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'users.show'}">{{user.name}}</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="card">
        <div class="card-body">
          <h1>Usuário</h1>
          <ul>
            <li v-if="user.image">
                <img :src="user.image" :alt="user.name" style="max-width: 40px;" />
            </li>
            <li v-else>
                <img src="@/assets/images/logo.png" alt="logo.tsuru" style="max-width: 40px;" />
            </li>
            <li>
              <strong>Name:</strong>{{user.name}}
            </li>
            <li>
              <strong>Email:</strong>{{user.email}}
            </li>
            <li>
                <strong>Phone: </strong>{{user.phone}}
            </li>
            <li>
              <strong>Profile:</strong>{{user.profile.name}}
            </li>
            <li v-if="user.status == 'y'">
              <strong>Status:</strong>Ativo
            </li>
            <li v-if="user.status == 'n'">
              <strong>Status:</strong>Inativo
            </li>
            <li>
              <strong>Salary:</strong>U$ {{user.salary | formatprice}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState} from "vuex";
export default {
  props: ["identify"],
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
  },
  created() {
    this.$store.dispatch("getUser", this.identify);
  },
};
</script>