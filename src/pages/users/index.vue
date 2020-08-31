<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">
        <router-link :to="{name: 'users.index'}">Users</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Users</span>
        <div class="ml-auto p-2">
          <router-link
            :to="{name: 'users.create'}"
            class="btn btn-outline-success justify-content-end rounded-circle"
            title="Add User"
          >
            <i class="fas fa-plus"></i>
          </router-link>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="row mb-3 justify-content-between">
        <div class="col-2">
          <select
            class="form-control form-control-sm"
            v-model="params.per_page"
            style="width: 60px"
          >
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            name="filter"
            placeholder="Search..."
            class="form-control"
            v-model="params.search"
          />
        </div>
      </div>
      <div v-if="users.meta.total != 0">
        <span>{{users.meta.from}} - {{users.meta.to}} de {{users.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th width="60"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users.data" :key="user.identify" :item="user" :path="'users'">
              <td v-if="user.image">
                <img :src="user.image" :alt="user.name" style="max-width: 40px;" />
              </td>
              <td v-else>
                <img src="@/assets/images/user.png" alt="user.tsuru" style="max-width: 40px;" />
              </td>
              <td>
                <router-link
                  class="link-edit"
                  :to="{name: 'users.edit', params: {identify: user.identify}}"
                >{{user.name}}</router-link>
              </td>
              <td>
                <router-link
                  class="link-edit"
                  :to="{name: 'users.edit', params: {identify: user.identify}}"
                >{{user.profile.name}}</router-link>
              </td>
              <td>
                <router-link
                  class="link-edit"
                  :to="{name: 'users.edit', params: {identify: user.identify}}"
                >{{user.email}}</router-link>
              </td>
              <td>
                <router-link
                  class="link-edit"
                  :to="{name: 'users.edit', params: {identify: user.identify}}"
                >{{user.phone}}</router-link>
              </td>
              <td>
                <router-link
                  class="link-edit"
                  :to="{name: 'users.edit', params: {identify: user.identify}}"
                >U$ {{user.salary | formatprice}}</router-link>
              </td>
              <td style="padding-top: 4px;">
                <a class="dropdown">
                  <a
                    class="text-secondary action-btn"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                  >
                    <i class="fas fa-cog"></i>
                  </a>
                  <div
                    class="dropdown-menu border border-dark"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item text-dark" href="#">
                      <strong>SHOW</strong>
                    </a>
                  </div>
                </a>
              </td>
            </tr>
           <pagination-component></pagination-component>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import paginationComponent from "../_partials/Pagination";
import { mapState } from "vuex";
export default {
  components: {
    paginationComponent,
  },
  created() {
    this.$store.dispatch("getUsers", this.params);
  },
  data() {
    return {
      params: {
        per_page: 10,
        search: "",
        page: this.current_page,
      },
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getUsers", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getUsers", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getUsers", this.params);
    },
  },
};
</script>