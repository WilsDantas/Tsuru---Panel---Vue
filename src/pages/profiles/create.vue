<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'profiles.index'}">Profiles</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'profiles.create'}">Register</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Add New Profile</h1>

      <div class="card">
        <div class="card-body">
          <form class="form" method="POST" enctype="multipart/form-data">
            <div class="form-group">
              <label for>Nome</label>
              <div class="text-danger" v-if="errors.name != undefined">{{this.errors.name[0]}}</div>
              <input
                :class="{'error': errors.name}"
                type="text"
                name="name"
                class="form-control"
                v-model="formData.name"
                placeholder="Nome"
              />
            </div>
          </form>
          <div class="form-group">
            <button class="btn btn-success" v-on:click="createProfile()">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formData: {},
      errors: {}
    };
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    createProfile() {
      this.$store
        .dispatch("createProfile", this.formData)
        .then((response) => {
          this.$router.push({ name: "profiles.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        });
    },
  },
};
</script>