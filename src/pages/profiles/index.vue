<template>
  <div>
    <ol class="breadcrumb bg-light">
      <li class="breadcrumb-item">
        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active" >
        <router-link :to="{name: 'profiles.index'}">Profiles</router-link>
      </li>
    </ol>
    <div class="card-header">
      <div class="d-flex">
        <span class="card-title p2">Profiles</span>
        <div class="ml-auto p-2">
          <router-link :to="{name: 'profiles.create'}" class="btn btn-outline-success justify-content-end rounded-circle" title="Add Profile">
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

        <div class="col-3">
          <input
            type="text"
            name="filter"
            placeholder="Pesquisar..."
            class="form-control"
            v-model="params.search"
          />
        </div>
      </div>
      <div v-if="profiles.meta.total != 0">
        <span>{{profiles.meta.from}} - {{profiles.meta.to}} de {{profiles.meta.total}}</span>
      </div>

      <table class="table table-condensed">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Permissions</th>
            <th>Users</th>
            <th width="100">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="profile in profiles.data"
            :key="profile.identify"
            :item="profile"
            :path="'profiles'"
          >
            <td>
              <router-link
                class="link-edit" :to="{name: 'profiles.edit', params: {identify: profile.identify}}"
              >{{profile.name}}</router-link>
            </td>
            <td>
              <router-link
                class="link-edit" :to="{name: 'profiles.edit', params: {identify: profile.identify}}"
              >{{profile.permissions.length}}</router-link>
            </td>
            <td>
              <router-link
                class="link-edit" :to="{name: 'profiles.edit', params: {identify: profile.identify}}"
              >{{profile.users}}</router-link>
            </td>
            <td>
                <div style="display: inline-block">
                  <a
                    href="#"
                    @click.prevent="(openModalDestroy(profile))"
                    class="text-danger mr-1"
                    title="deletar"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
                <div style="display: inline-block">
                  <a class="dropdown">
                    <a class="text-secondary action-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu border border-dark" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item text-dark" href="#"><strong><router-link
                      class="link-edit" :to="{name: 'profiles.permissions', params: {identify: profile.identify}}"
                    >PERMISSIONS</router-link></strong></a>
                    </div>
                  </a>
                </div>
            </td>
          </tr>
          <pagination-component></pagination-component>
        </tbody>
      </table>
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
            Delete Profile:
            <strong>{{profile.name}}</strong>
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

            <div class="col-9" v-if="profile.users > 0">
              <p>There are Users linked to this Profile.</p>
              <p>
                <strong>it is not possible to delete this Profile. There are Linked Users.</strong>
              </p>
            </div>

            <div class="col-9" v-else>
              <p>Are you sure you want to delete this Profile?</p>
            </div>
          </div>
        </div>

        <!--Footer-->
        <div
          class="modal-footer flex-center"
          style="border: none;"
          v-if="profile.users == 0"
        >
          <a href="#" class="btn btn-danger" v-on:click="destroyProfile(profile.identify)">
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
    this.$store.dispatch("checkLogin");
    this.$store.dispatch("getProfiles", this.params);
  },
  data() {
    return {
      params: {
        per_page: 10,
        search: "",
        page: this.current_page,
      },
      profile: {},
    };
  },
  computed: {
    ...mapState({
      profiles: (state) => state.profiles.profiles,
      current_page: (state) => state.paginate.pagination.current_page,
    }),
  },
  methods: {
    destroyProfile(identify) {
      this.$store.dispatch("destroyProfile", identify).then((response) => {
        this.$store.dispatch("getProfiles", this.params);
        this.closeModalDestroy();
      });
    },
    openModalDestroy(profile) {
      this.profile = profile;
      this.$modal.show("destroy");
    },
    closeModalDestroy() {
      this.$modal.hide("destroy");
    },
  },
  watch: {
    "params.per_page"() {
      this.params.page = 1;
      this.$store.dispatch("getProfiles", this.params);
    },
    "params.search"() {
      this.params.page = 1;
      this.$store.dispatch("getProfiles", this.params);
    },
    current_page() {
      this.params.page = this.current_page;
      this.$store.dispatch("getProfiles", this.params);
    },
  },
};
</script>