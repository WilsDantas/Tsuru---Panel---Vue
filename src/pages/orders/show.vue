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
        <router-link :to="{name: 'orders.show'}">Client {{order.client.name}} Order</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2"><router-link class="link-edit" :to="{name: 'clients.show', params: {identify: order.client.identify}}">Client {{order.client.name}} Order</router-link></span>
      </div>
      <div class="card">
        <div class="card-body">
          <ul>
            <li>
              <strong>Name:</strong>
              {{order.client.name}}
            </li>
            <li>
              <strong>Email:</strong>
              {{order.client.email}}
            </li>
            <li>
              <strong>Total:</strong>
              {{order.total}}
            </li>
            <li>
              <strong>Status:</strong>
              {{order.status}}
            </li>
            <li>
              <strong>Created At:</strong>
              {{order.created_at}}
            </li>
            <li>
              <strong>Delivery At:</strong>
              Delivery At
            </li>
          </ul>
          <h3>Products</h3>
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Brand</th>
                <th width="60"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in order.products"
                :key="product.identify"
                :item="product"
                :path="'products'"
              >
                <td v-if="product.images">
                    <img :src="product.images[0].image" :alt="product.name" style="max-width: 40px;" />
                </td>
                <td v-else>
                    <img src="@/assets/images/logo.png" alt="logo.tsuru" style="max-width: 40px;" />
                </td>
                <td>{{product.name}}</td>
                <td>U$ {{(product.price * product.pivot.quantity) | formatprice}}</td>
                <td>{{product.pivot.quantity}}</td>
                <td>U$ {{product.price}}</td>
                <td>{{product.brand.name}}</td>
                <td>
                  <div style="display: inline-block">
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong><router-link class="link-edit" :to="{name: 'products.show', params: {identify: product.identify}}">PRODUCT</router-link></strong></a>
                    </div>
                  </a>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["identify"],
  computed: {
    ...mapState({
      order: (state) => state.orders.order,
    }),
  },
  created() {
    this.$store.dispatch("getOrder", this.identify);
  },
};
</script>