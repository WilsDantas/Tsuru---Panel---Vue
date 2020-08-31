<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'brands.index'}">Brand</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'brands.edit'}">Edit</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Edit Brand</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="editBrand" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">     
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Name*</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="brand.name"/>
                </div>
              </div>
              
            </div>
            <div class="form-group mt-2">
            <button v-if="loading" class="btn btn-success">UPDATE</button>
            <button v-else disabled class="btn btn-info"><i class="fas fa-spinner fa-pulse"></i></button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: ["identify"],
  data() {
    return {
      loading: true,
      errors: {},
    };
  },
  created() {
    this.$store.dispatch("getBrand", this.identify);
  },
  computed: {
    ...mapState({
      brand: (state) => state.brands.brand.data,
    }),
  },
  methods: {
    editBrand() {
      this.loading = false;
      this.brand.identify = this.identify;
      this.$store
        .dispatch("editBrand", this.brand)
        .then((response) => {
          this.$router.push({ name: "brands.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => (this.loading = true));
    },

  },
}
</script>