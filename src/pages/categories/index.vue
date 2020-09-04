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
                  <a
                    href="#"
                    @click.prevent="(openModalDestroy(category))"
                    class="text-danger mr-1"
                    title="deletar"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
            </td>
          </tr>
        </tbody>
        <pagination-Component></pagination-Component>
      </table>
      </div>
    </div>

    <modal
      name="destroy"
      class="modal-dialog modal-side modal-bottom-right modal-notify modal-danger"
      role="document"
    >
      <!--Content-->
      <div class="modal-content">
        <!--Header-->
        <div class="modal-header">
          <p class="heading">
            Delete Category:
            <strong>{{category.name}}</strong>
          </p>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click.prevent="(closeModalDestroy())"
          >
            <span aria-hidden="true" class="white-text">&times;</span>
          </button>
        </div>

    <!--Body-->
        <div class="modal-body">
          <div class="row">
            <div class="col-3">
              <p></p>
              <p class="text-center">
                <i class="fas fa-trash fa-4x"></i>
              </p>
            </div>

            <div class="col-9" v-if="category.subcategories > 0">
              <p>There are Sub Categories linked to this Category.</p>
              <p>
                <strong>it is not possible to delete this category. There are Linked Sub Categories.</strong>
              </p>
            </div>

            <div class="col-9" v-else>
              <p>Are you sure you want to delete this Sub Category?</p>
            </div>
          </div>
        </div>

        <!--Footer-->
        <div
          class="modal-footer flex-center"
          style="border: none;"
          v-if="category.subcategories == 0"
        >
          <a href="#" class="btn btn-danger" v-on:click="destroyCategory(category.identify)">
            DELETE
            <i class="fas fa-trash ml-1 white-text"></i>
          </a>
          <a type="button" class="btn btn-warning" @click.prevent="(closeModalDestroy())">Cancel</a>
        </div>
      </div>
    </modal>
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
      category: {},
    };
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  methods: {
    destroyCategory(identify) {
      this.$store.dispatch("destroyCategory", identify).then((response) => {
        this.$store.dispatch("getCategories", this.params);
        this.closeModalDestroy();
      });
    },
    openModalDestroy(category) {
      this.category = category;
      this.$modal.show("destroy");
    },
    closeModalDestroy() {
      this.$modal.hide("destroy");
    },
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