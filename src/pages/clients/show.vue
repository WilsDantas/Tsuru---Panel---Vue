<template>
    <div>
        <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'clients.index'}">Client</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'clients.show'}">Client {{client.name}}</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Client {{client.name}}</span>
      </div>
      <div class="card">
        <div class="card-body">
          <ul>
            <li v-if="client.image">
                <img :src="client.image" :alt="client.name" style="max-width: 40px;" />
            </li>
            <li v-else>
                <img src="@/assets/images/logo.png" alt="logo.tsuru" style="max-width: 40px;" />
            </li>
            <li>
              <strong>Name:</strong>
              {{client.name}}
            </li>
            <li>
              <strong>Email:</strong>
              {{client.email}}
            </li>
            <li>
              <strong>Phone:</strong>
              {{client.phone}}
            </li>
          </ul>
          <h3>Orders</h3>
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>Total</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Products</th>
                <th width="60"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in client.orders"
                :key="order.identify"
                :item="order"
                :path="'orders'"
              >
                <td>{{order.total}}</td>
                <td>{{order.comment}}</td>
                <td>{{order.status}}</td>
                <td>{{order.products.length}}</td>
                <td>
                  <div style="display: inline-block">
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong><router-link class="link-edit" :to="{name: 'orders.show', params: {identify: order.identify}}">ORDER</router-link></strong></a>
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
      client: (state) => state.clients.client.data,
    }),
  },
  created() {
    this.$store.dispatch("getClient", this.identify);
  },
};
</script>