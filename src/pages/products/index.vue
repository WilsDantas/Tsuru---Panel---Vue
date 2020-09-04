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
      <div class="d-flex">
        <span class="card-title p2">Products</span>
        <div class="ml-auto p-2">
          <router-link :to="{name: 'products.create'}" class="btn btn-outline-success justify-content-end rounded-circle" title="Add Product">
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
      <div v-if="products.meta.total != 0">
        <span>{{products.meta.from}} - {{products.meta.to}} de {{products.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed">
        <thead>
          <tr>
            <th width="40">#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th width="100"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products.data"
            :key="product.identify"
            :item="product"
            :path="'products'"
          >
            <td v-if="product.images[0]">
              <img :src="product.images[0].image" :alt="product.name" style="max-width: 40px;" />
            </td>
            <td v-else>
              <img src="@/assets/images/logo.png" alt="logo.tsuru" style="max-width: 40px;" />
            </td>
            <td>{{product.name}}</td>
            <td>U$ {{product.price}}</td>
            <td>{{product.quantity}}</td>
            <td v-if="!!product.detail">{{product.detail.description.slice(0, 20)}}</td>
            <td v-else></td>
            <td>
                <div style="display: inline-block">
                  <router-link :to="{name: 'products.index'}">
                    <a href="#" class="text-danger action-btn" title="delete">
                      <i class="fas fa-trash"></i>
                    </a>
                  </router-link>
                </div>
                <div style="display: inline-block">
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong>SHOW</strong></a>
                    </div>
                  </a>
                </div>
            </td>
          </tr>
        </tbody>
        <pagination-component></pagination-component>

      </table>
      </div>
    </div>
  </div>
</template>


<script>
import imagesComponent from "../_partials/Images";
import paginationComponent from "../_partials/Pagination";
import { mapState } from "vuex";
export default {
  components: {
    imagesComponent,
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
      current_page: (state) => state.paginate.pagination.current_page,
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