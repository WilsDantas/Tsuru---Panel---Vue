<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'orders.index'}">Orders</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'orders.edit'}">Edit</router-link>
      </li>
    </ol>
    <div class="card-header">
      <h1>Edit Order</h1>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="editOrder" class="form" method="POST" enctype="multipart/form-data">
            <div class="row">     
              <div class="col-lg-12 pt-12">
                <div class="form-group">
                  <label for>Cliente</label>
                  <div class="text-danger" v-if="errors.name != undefined" >
                    {{this.errors.name[0]}}
                  </div>
                  <input :class="{'error': errors.name}" type="text" class="form-control" placeholder="Name" v-model="order.client.name" disabled/>
                </div>
              </div>
              <div class="col-lg-12">
                <div>
              <p class="mb-0">
                <label for="status">Status*</label>
              </p>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="status1"
                  value="open"
                  v-model="order.status"
                />
                <label class="form-check-label" for="status1">Open</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="status2"
                  value="delivery"
                  v-model="order.status"
                />
                <label class="form-check-label" for="status2">Delivery</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="status3"
                  value="done"
                  v-model="order.status"
                />
                <label class="form-check-label" for="status3">Done</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="status4"
                  value="rejected"
                  v-model="order.status"
                />
                <label class="form-check-label" for="status4">Rejected</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="status"
                  id="status5"
                  value="canceled"
                  v-model="order.status"
                />
                <label class="form-check-label" for="status5">Canceled</label>
              </div>
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
    this.$store.dispatch("getOrder", this.identify);
  },
  computed: {
    ...mapState({
      order: (state) => state.orders.order,
    }),
  },
  methods: {
    editOrder() {
      this.loading = false;
      this.order.identify = this.identify;
      this.$store
        .dispatch("editOrder", this.order)
        .then((response) => {
          this.$router.push({ name: "orders.index" });
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => (this.loading = true));
    },

  },
}
</script>