<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'orders.index'}">Orders</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Orders</span>
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
      <div v-if="orders.meta.total != 0">
        <span>{{orders.meta.from}} - {{orders.meta.to}} de {{orders.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed table-hover table-striped">
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Products</th>
            <th width="50"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders.data"
            :key="order.identify"
            :item="order"
            :path="'order'"
          > 
            <td><router-link class="link-edit" :to="{name: 'orders.edit', params: {identify: order.identify}}">{{order.client.name}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'orders.edit', params: {identify: order.identify}}">{{order.client.email}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'orders.edit', params: {identify: order.identify}}">{{order.total}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'orders.edit', params: {identify: order.identify}}">{{order.status}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'orders.edit', params: {identify: order.identify}}">{{order.products.length}}</router-link></td>
            <td>
                <div>
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong><router-link class="link-edit" :to="{name: 'orders.show', params: {identify: order.identify}}">SHOW</router-link></strong></a>
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
    this.$store.dispatch("getOrders", this.params);
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
      orders: (state) => state.orders.orders,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getOrders", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getOrders", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getOrders", this.params);
    },
  },
}
</script>