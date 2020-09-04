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
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Email*</label>
                  <div class="text-danger" v-if="errors.email != undefined" >
                    {{this.errors.email[0]}}
                  </div>
                  <input :class="{'error': errors.email}" type="email" class="form-control" placeholder="Email" v-model="formData.email"/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Salary*</label>
                  <div class="text-danger" v-if="errors.salary != undefined" >
                    {{this.errors.salary[0]}}
                  </div>
                  <input :class="{'error': errors.salary}" type="text" class="form-control" placeholder="Salary" v-model="formData.salary"/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Phone*</label>
                  <div class="text-danger" v-if="errors.phone != undefined" >
                    {{this.errors.phone[0]}}
                  </div>
                  <input :class="{'error': errors.phone}" type="text" class="form-control" placeholder="phone" v-model="formData.phone"/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Password*</label>
                  <div class="text-danger" v-if="errors.password != undefined" >
                    {{this.errors.password[0]}}
                  </div>
                  <input :class="{'error': errors.password}" type="password" class="form-control" placeholder="Password" v-model="formData.password"/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Confirm Password*</label>
                  <div class="text-danger" v-if="errors.password_confirmation != undefined" >
                    {{this.errors.password_confirmation[0]}}
                  </div>
                  <input :class="{'error': errors.password_confirmation}" type="password" class="form-control" placeholder="Confirm Password" v-model="formData.password_confirmation"/>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Profile*</label>
                  <div class="text-danger" v-if="errors.profile != undefined" >
                    {{this.errors.profile[0]}}
                  </div>
                  <select class="form-control" v-model="formData.profile" :class="{'error': errors.profile}">
                    <option disabled>Select a Profile</option>
                    <option
                      v-for="profile in allProfiles"
                      :key="profile.identify"
                      :item="profile"
                      :path="'profile'"
                      :value="profile.identify">
                      {{profile.name}}
                    </option>
                  </select>
                </div>
              </div>
              
            </div>
            <div class="form-group mt-2">
            <button v-if="loading" class="btn btn-success">REGISTER</button>
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
  created() {
    this.$store.dispatch("getAllProfiles");
  },
  computed: {
    ...mapState({
      allProfiles: (state) => state.profiles.allProfiles.data,
    }),
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