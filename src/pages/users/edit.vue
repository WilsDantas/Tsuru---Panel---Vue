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
        <router-link :to="{name: 'users.edit'}">Edit</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Edit Users</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="editUser" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">     
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Name*</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="user.name" disabled/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Phone*</label>
                  <div class="text-danger" v-if="errors.phone != undefined" >
                    {{this.errors.phone[0]}}
                  </div>
                  <input :class="{'error': errors.phone}" type="text" class="form-control" placeholder="Phone" v-model="user.phone"/>
                </div>
              </div>
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Salary*</label>
                  <div class="text-danger" v-if="errors.salary != undefined" >
                    {{this.errors.salary[0]}}
                  </div>
                  <input :class="{'error': errors.salary}" type="text" class="form-control" placeholder="Salary" v-model="user.salary"/>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Profile*</label>
                  <div class="text-danger" v-if="errors.profiles != undefined" >
                    {{this.errors.profiles[0]}}
                  </div>
                  <select class="form-control" v-model="user.profile.identify" :class="{'error': errors.profiles}">
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
            <button v-if="loading" class="btn btn-success">UPDATE</button>
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
  props: ["identify"],
  data() {
    return {
      loading: true,
      errors: {},
    };
  },
  created() {
    this.$store.dispatch("getAllProfiles");
    this.$store.dispatch("getUser", this.identify);
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      allProfiles: (state) => state.profiles.allProfiles.data,
    }),
  },
  methods: {
    editUser() {
      this.loading = false;
      this.user.identify = this.identify;
      this.user.profile = this.user.profile.identify
      this.$store
        .dispatch("editUser", this.user)
        .then((response) => {
          this.$router.push({ name: "users.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => (this.loading = true));
    },

  },
}
</script>