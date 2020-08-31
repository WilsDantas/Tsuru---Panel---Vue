<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'subcategories.index'}">Sub Category</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'subcategories.edit'}">Edit</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Edit Sub Category</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="editSubCategory" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">     
              <div class="col-lg-12">
                <div class="form-group">
                  <label for>Name*</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="subcategory.name"/>
                </div>
              </div>
              <div class="col-lg-12">
                  <div class="form-group">
                  <label>Categoria</label>
                  <div class="text-danger" v-if="errors.category != undefined">{{this.errors.category[0]}}</div>
                  <select class="form-control" v-model="subcategory.category.identify" :class="{'error': errors.category}" required>
                    <option v-for="category in Allcategories" 
                            :key="category.identify"
                            :item="category"
                            :path="'categories'"
                            :value="category.identify">{{category.name}}</option>
                  </select>
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
    this.$store.dispatch("getAllCategories");
    this.$store.dispatch("getSubCategory", this.identify);

  },
  computed: {
    ...mapState({
      Allcategories: (state) => state.categories.allCategories,
      subcategory: (state) => state.subcategories.subCategory,
    }),
  },
  methods: {
    editSubCategory() {
      this.loading = false;
      this.subcategory.identify = this.identify;
      this.subcategory.category = this.subcategory.category.identify
      this.$store
        .dispatch("editSubCategory", this.subcategory)
        .then((response) => {
          this.$router.push({ name: "subcategories.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => (this.loading = true));
    },

  },
}
</script>