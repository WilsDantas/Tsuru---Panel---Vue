<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'subcategories.index'}">Sub Categories</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Sub Categories</span>
        <div class="ml-auto p-2">
          <router-link :to="{name: 'subcategories.create'}" class="btn btn-outline-success justify-content-end rounded-circle" title="Add Sub Category">
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
      <div v-if="subcategories.meta.total != 0">
        <span>{{subcategories.meta.from}} - {{subcategories.meta.to}} de {{subcategories.meta.total}}</span>
      </div>
      <div class="table-responsive">
        <table class="table table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Products</th>
            <th width="60"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="subcategory in subcategories.data"
            :key="subcategory.identify"
            :item="subcategory"
            :path="'subcategories'"
          > 
            <td><router-link class="link-edit" :to="{name: 'subcategories.edit', params: {identify: subcategory.identify}}">{{subcategory.name}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'subcategories.edit', params: {identify: subcategory.identify}}">{{subcategory.category.name}}</router-link></td>
            <td><router-link class="link-edit" :to="{name: 'subcategories.edit', params: {identify: subcategory.identify}}">{{subcategory.products}}</router-link></td>
            <td>
                <div style="display: inline-block">
                  <a
                    href="#"
                    @click.prevent="(openModalDestroy(subcategory))"
                    class="text-danger mr-1"
                    title="deletar"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
            </td>
          </tr>
          <pagination-component></pagination-component>
        </tbody>
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
            Delete Sub Category:
            <strong>{{subcategory.name}}</strong>
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

            <div class="col-9" v-if="subcategory.products > 0">
              <p>There are products linked to this Sub Category.</p>
              <p>
                <strong>it is not possible to delete this category. There are Linked Products.</strong>
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
          v-if="subcategory.products == 0"
        >
          <a href="#" class="btn btn-danger" v-on:click="destroySubCategory(subcategory.identify)">
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
    this.$store.dispatch("getSubCategories", this.params);
  },
  data() {
    return {
      params: {
        per_page: 10,
        search: "",
        page: this.current_page,
      },
      subcategory: {},
    };
  },
  computed: {
    ...mapState({
      subcategories: (state) => state.subcategories.subCategories,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },

  methods: {
    destroySubCategory(identify) {
      this.$store.dispatch("destroySubCategory", identify).then((response) => {
        this.$store.dispatch("getSubCategories", this.params);
        this.closeModalDestroy();
      });
    },
    openModalDestroy(subcategory) {
      this.subcategory = subcategory;
      this.$modal.show("destroy");
    },
    closeModalDestroy() {
      this.$modal.hide("destroy");
    },
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getSubCategories", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getSubCategories", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getSubCategories", this.params);
    },
  },
}
</script>