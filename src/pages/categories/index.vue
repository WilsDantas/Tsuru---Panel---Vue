<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'categories.index'}">Categories</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Categories</span>
        <div class="ml-auto p-2">
          <router-link :to="{name: 'categories.create'}" class="btn btn-outline-success justify-content-end rounded-circle" title="Add Category">
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
      <div v-if="categories.meta.total != 0">
        <span>{{categories.meta.from}} - {{categories.meta.to}} de {{categories.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sub Categories</th>
            <th width="60"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories.data"
            :key="category.identify"
            :item="category"
            :path="'categories'"
          > 
            <td><router-link class="link-edit" :to="{name: 'categories.edit', params: {identify: category.identify}}">{{category.name}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'categories.edit', params: {identify: category.identify}}">{{category.subcategories}}</router-link></td>
            <td>
                <div style="display: inline-block">
                  <router-link :to="{name: 'categories.index'}">
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
    this.$store.dispatch("getCategories", this.params);
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
      categories: (state) => state.categories.categories,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getCategories", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getCategories", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getCategories", this.params);
    },
  },
}
</script>