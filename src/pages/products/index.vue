<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'products.index'}">Products</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>
        Products
        <router-link :to="{name: 'products.index'}" class="btn btn-success" title="Adicionar Produto">
          <i class="fas fa-plus"></i>
        </router-link>
      </h1>
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
      <div v-if="products.meta.total != 0">
        <span>{{products.meta.from}} - {{products.meta.to}} de {{products.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed">
        <thead>
          <tr>
            <th width="40">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th width="120">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products.data"
            :key="product.identify"
            :item="product"
            :path="'products'"
          >
            <td>
              <img :src="product.images[0].image" :alt="product.name" style="max-width: 40px;" />
            </td>
            <td>{{product.name}}</td>
            <td>U$ {{product.price || formatPrice}}</td>
            <td>{{product.quantity}}</td>
            <td>{{product.detail.description.slice(0, 20)}}</td>
            <td>
              <router-link :to="{name: 'products.index'}">
                <a href="#" class="btn btn-warning action-btn" title="view">
                  <i class="fas fa-eye"></i>
                </a>
              </router-link>
              <router-link :to="{name: 'products.index'}">
                <a href="#" class="btn btn-danger action-btn" title="delete">
                  <i class="fas fa-trash"></i>
                </a>
              </router-link>
            </td>
          </tr>
          
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
    this.$store.dispatch("getProducts", this.params);
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
      products: (state) => state.products.products,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getProducts", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getProducts", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getProducts", this.params);
    },
  },
}
</script>