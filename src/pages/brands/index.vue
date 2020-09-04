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
            <th>Products</th>
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
            <td><router-link class="link-edit" :to="{name: 'brands.edit', params: {identify: brand.identify}}">{{brand.products}}</router-link></td>
            <td>
                <div style="display: inline-block">
                  <a
                    href="#"
                    @click.prevent="(openModalDestroy(brand))"
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
            Delete Brand:
            <strong>{{brand.name}}</strong>
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

            <div class="col-9" v-if="brand.products > 0">
              <p>There are Brand linked to this Products.</p>
              <p>
                <strong>it is not possible to delete this Products. There are Linked Brand.</strong>
              </p>
            </div>

            <div class="col-9" v-else>
              <p>Are you sure you want to delete this Sub Products?</p>
            </div>
          </div>
        </div>

        <!--Footer-->
        <div
          class="modal-footer flex-center"
          style="border: none;"
          v-if="brand.products == 0"
        >
          <a href="#" class="btn btn-danger" v-on:click="destroyBrand(brand.identify)">
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
    this.$store.dispatch("getBrands", this.params);
  },
  data() {
    return {
      params: {
        per_page: 10,
        search: "",
        page: this.current_page,
      },
      brand: {}
    };
  },
  computed: {
    ...mapState({
      brands: (state) => state.brands.brands,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  methods: {
    destroyBrand(identify) {
      this.$store.dispatch("destroyBrand", identify).then((response) => {
        this.$store.dispatch("getBrands", this.params);
        this.closeModalDestroy();
      });
    },
    openModalDestroy(brand) {
      this.brand = brand;
      this.$modal.show("destroy");
    },
    closeModalDestroy() {
      this.$modal.hide("destroy");
    },
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