<template>
  <div class="row container text-center">
    <div
      v-for="(image, index) in images"
      :key="image"
      :item="image"
      :path="'image'"
      :index="index"
    >
      <div v-if="index != 'length'" class="col-3">
        <div class="card border-0 d-flex" style="width: 130px;">
          <img
            class="card-img-top rounded align-self-center"
            alt="Card image cap"
            :src="image"
            style="width: 80px;"
          />
          <div class="mt-3 d-flex bd-highlight">
            <a href="#" class="text-dark bd-highlight" @click.prevent="(RemoveImage(index))">
              <i class="fas fa-trash"></i>
            </a>
            <a href="#" class="text-dark ml-auto bd-highlight">
              <i class="fas fa-search-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div else>
      <input
        id="file"
        type="file"
        @change="previewImage"
        class="text-center center-block inputfile"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      images: {
        'length': 0
      }
    };
  },
  computed: {
    ...mapState({
      imagesComputed: (state) => state.products.images,
    }),
  },
  methods: {
    previewImage(e) {
      let image = e.target.files[0];
      if (image) {
        this.computedImage(e);
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {

          let length = this.images['length'] + 1;

          this.$set(this.images, 'length', length)
          this.$set(this.images, this.images['length'] ? this.images['length'] : 0, e.target.result)
        };
      }
    },
    RemoveImage(index) {
      delete this.images[index];
      delete this.imagesComputed[index];
      this.reset();
    },
    reset(){
      this.$set(this.imagesComputed, 'length', this.imagesComputed.length - 1)
      this.$set(this.images, 'length', this.images.length - 1)
    },
    computedImage(e){
      let files = e.target.files || e.dataTransfer.files
      let length = this.imagesComputed['length'] + 1;
      this.$set(this.imagesComputed, 'length', length)
      this.$set(this.imagesComputed, this.imagesComputed['length'] ? this.imagesComputed['length'] : 0, files[0])
    }
  },
};
</script>
