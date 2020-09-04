<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'clients.index'}">Clients</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Clients</span>
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
      <div v-if="clients.meta.total != 0">
        <span>{{clients.meta.from}} - {{clients.meta.to}} de {{clients.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
            <th width="50"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in clients.data"
            :key="client.identify"
            :item="client"
            :path="'client'"
          > 
            <td v-if="client.image">
              <img :src="client.image" :alt="client.name" style="max-width: 40px;" />
            </td>
            <td v-else>
              <img src="@/assets/images/logo.png" alt="logo.tsuru" style="max-width: 40px;" />
            </td>
            <td><router-link class="link-edit" :to="{name: 'clients.edit', params: {identify: client.identify}}">{{client.name}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'clients.edit', params: {identify: client.identify}}">{{client.email}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'clients.edit', params: {identify: client.identify}}">{{client.phone}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'clients.edit', params: {identify: client.identify}}">{{client.orders.length}}</router-link></td>
            <td>
                <div style="display: inline-block">
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong><router-link class="link-edit" :to="{name: 'clients.show', params: {identify: client.identify}}">SHOW</router-link></strong></a>
                    </div>
                  </a>
                </div>
            </td>
          </tr>
        </tbody>
        <pagination-Component></pagination-Component>
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
    this.$store.dispatch("getClients", this.params);
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
      clients: (state) => state.clients.clients,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getClients", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getClients", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getClients", this.params);
    },
  },
}
</script>