<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'products.index'}">Products</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'products.create'}">Register</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Add New Product</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="createProduct" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">            



              <div class="col-lg-12 pt-3">
                <div class="form-group">
                  <label for>Name*</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="formData.name"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Quantity*</label>
                  <div class="text-danger" v-if="errors.quantity != undefined" >
                    {{this.errors.quantity[0]}}
                  </div>
                  <input :class="{'error': errors.quantity}" type="text" class="form-control" placeholder="Quantity" v-model="formData.quantity"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Price*</label>
                  <div class="text-danger" v-if="errors.price != undefined" >
                    {{this.errors.price[0]}}
                  </div>
                  <input :class="{'error': errors.price}" type="text" class="form-control" placeholder="Price" v-model="formData.price"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Category*</label>
                  <div class="text-danger" v-if="errors.sub_category != undefined" >
                    {{this.errors.sub_category[0]}}
                  </div>
                  <select class="form-control" v-model="formData.sub_category" :class="{'error': errors.sub_category}">
                    <option disabled>Select a category</option>
                    <option
                      v-for="subcategory in Allsubcategories"
                      :key="subcategory.identify"
                      :item="subcategory"
                      :path="'subcategories'"
                      :value="subcategory.identify">
                      {{subcategory.name}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Brand*</label>
                  <div class="text-danger" v-if="errors.brand != undefined" >
                    {{this.errors.brand[0]}}
                  </div>
                  <select class="form-control" v-model="formData.brand" :class="{'error': errors.brand}">
                    <option value="" disabled selected>Select a brand</option>
                    <option
                      v-for="brand in Allbrands"
                      :key="brand.identify"
                      :item="brand"
                      :path="'brands'"
                      :value="brand.identify">
                      {{brand.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <hr style="height:2px;border-width:0;color:gray;background-color:gray" />

            <h3>Details</h3>

            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label>Pet</label>
                  <div class="text-danger" v-if="errors.pet != undefined" >
                    {{this.errors.pet[0]}}
                  </div>
                  <select class="form-control" v-model="formData.pet" :class="{'error': errors.pet}">
                    <option disabled>select the type of pet</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Birds">Birds</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Size</label>
                  <div class="text-danger" v-if="errors.size != undefined">
                    {{this.errors.size[0]}}
                  </div>
                  <input :class="{'error': errors.size}" type="text" class="form-control" placeholder="Size" v-model="formData.size"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Age</label>
                  <div class="text-danger" v-if="errors.age != undefined">
                    {{this.errors.age[0]}}
                  </div>
                  <input :class="{'error': errors.age}" type="text" class="form-control" placeholder="Age" v-model="formData.age"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Material</label>
                  <div class="text-danger" v-if="errors.material != undefined">
                    {{this.errors.material[0]}}
                  </div>
                  <input :class="{'error': errors.material}" type="text" class="form-control" placeholder="Material" v-model="formData.material"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Dimension</label>
                  <div class="text-danger" v-if="errors.dimension != undefined">
                    {{this.errors.dimension[0]}}
                  </div>
                  <input :class="{'error': errors.dimension}" type="text" class="form-control" placeholder="Dimension" v-model="formData.dimension"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for>Weight</label>
                  <div class="text-danger" v-if="errors.weight != undefined">
                    {{this.errors.weight[0]}}
                  </div>
                  <input :class="{'error': errors.weight}" type="text" class="form-control" placeholder="Weight" v-model="formData.weight"/>
                </div>
              </div>
              <div class="col-lg-12">
                <label for>Description*</label>
                <div class="text-danger" v-if="errors.description != undefined">
                    {{this.errors.description[0]}}
                  </div>
                <textarea :class="{'error': errors.description}" name="description" cols="30" rows="5" class="form-control" v-model="formData.description"></textarea>
              </div>
            </div>
            <div class="form-group mt-2">
            <button class="btn btn-dark">Enviar</button>
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
  data() {
    return {
      formData: {},
      errors: {},
    };
  },
  created() {
    this.$store.dispatch("getAllSubCategories");
    this.$store.dispatch("getAllBrands");
  },
  computed: {
    ...mapState({
      Allsubcategories: (state) => state.subcategories.AllSubCategories,
      Allbrands: (state) => state.brands.Allbrands,
    }),
  },
  methods: {
    createProduct() {
      this.$store
        .dispatch("createProduct", this.formData)
        .then((response) => {
          this.$router.push({ name: "products.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },

  },
}
</script>