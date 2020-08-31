<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'home'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'profiles'}">Perfis</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'profile.permissions'}">Permissões</router-link>
      </li>
    </ol>

    <h1>Permissões do Perfil {{profile.name}}</h1>
    <div class="card">
      <div class="card-body">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th width="150px">Permissões</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="permission in permissions"
              :key="permission.identify"
              :item="permission"
              :path="'permissions'"
            >
              <td>
                <input
                  type="checkbox"
                  v-model="profile.permissions"
                  :id="permission"
                  :value="permission"
                />
                <label class="ml-2">{{ permission.name }}</label>
              </td>
              
            </tr>

            <tr>
              <td colspan="500">
                <button
                  type="submit"
                  class="btn btn-success"
                  v-on:click="editProfilePermissions()"
                >Atualizar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: ["identify"],
  created() {
    this.$store.dispatch("getPermissions");
    this.$store.dispatch("getProfile", this.identify);
  },
  data() {
    return {
      params: {
        identify: this.identify,
        permissions: {},
      },
    };
  },
  computed: {
    ...mapState({
      profile: (state) => state.profiles.profile,
      permissions: (state) => state.permissions.permissions.data,
    }),
  },
  methods: {
    editProfilePermissions() {
      this.params.permissions = this.profile.permissions;
      this.$store
        .dispatch("editProfilePermissions", this.params)
        .then((response) => {
          this.$vToastify.success(
            "Permissões Atualizada com Sucesso!",
            "Parabéns"
          );
          this.$router.push({ name: "profiles" });
        })
        .catch((error) => {
          this.$vToastify.error("Dados inválidos", "Falha ao Atualizar Perfil");
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>