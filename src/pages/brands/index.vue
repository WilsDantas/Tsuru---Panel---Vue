<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'brands.index'}">Brands</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Brands</span>
        <div class="ml-auto p-2">
          <router-link :to="{name: 'brands.create'}" class="btn btn-outline-success justify-content-end rounded-circle" title="Add Brand">
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
      <div v-if="brands.meta.total != 0">
        <span>{{brands.meta.from}} - {{brands.meta.to}} de {{brands.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th width="50"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="brand in brands.data"
            :key="brand.identify"
            :item="brand"
            :path="'brand'"
          > 
            <td><router-link class="link-edit" :to="{name: 'brands.edit', params: {identify: brand.identify}}">{{brand.name}}</router-link></td>
            <td>
                <div style="display: inline-block">
                  <router-link :to="{name: 'brand.index'}">
                    <a href="#" class="text-danger action-btn" title="delete">
                      <i class="fas fa-trash"></i>
                    </a>
                  </router-link>
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
    this.$store.dispatch("getBrands", this.params);
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
      brands: (state) => state.brands.brands,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getBrands", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getBrands", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getBrands", this.params);
    },
  },
}
</script>