<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'users.index'}">Users</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'users.create'}">Register</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Add New User</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="createUser" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">     
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Name*</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="formData.name"/>
                </div>
              </div>
              
            </div>
            <div class="form-group mt-2">
            <button v-if="loading" class="btn btn-success">LOGIN</button>
            <button v-else disabled class="btn btn-info"><i class="fas fa-spinner fa-pulse"></i></button>
          </div>
          </form>
          
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
      loading: true,
      formData: {},
      errors: {},
    };
  },
  methods: {
    createUser() {
      this.loading = false;
      this.$store
        .dispatch("createUser", this.formData)
        .then((response) => {
          this.$router.push({ name: "users.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        })
        .finally(() => (this.loading = true));
    },

  },
}
</script>