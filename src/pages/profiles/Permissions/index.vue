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
        <router-link :to="{name: 'profiles.permissions'}">Permissions</router-link>
      </li>
    </ol>

    <h1>{{profile.name}} Permissions</h1>
    <div class="card">
      <div class="card-body">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th width="150px">Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="permission in allpermissions"
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
                >UPDATE</button>
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
    this.$store.dispatch("getAllPermissions");
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
      profile: (state) => state.profiles.profile.data,
      allpermissions: (state) => state.permissions.AllPermissions,
    }),
  },
  methods: {
    editProfilePermissions() {
      this.params.permissions = this.profile.permissions;
      this.params.identify = this.identify;
      this.$store
        .dispatch("editProfilePermissions", this.params)
        .then((response) => {
          this.$router.push({ name: "profiles.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>