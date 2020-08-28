<template>
  <div>
    <nav aria-label="Page navigation example" v-if="pagination.last_page > 1">
      <ul class="pagination">
        <li class="page-item" v-if="pagination.current_page > 1">
          <a class="page-link" href="#" v-on:click="navigate(1)">Primeiro</a>
        </li>
        <li class="page-item" v-if="pagination.current_page > 2">
          <a class="page-link">...</a>
        </li>
        <li
          v-for="n in pagination.paginate"
          :key="n"
          class="page-item"
          :class="{ active: pagination.current_page == n}"
        >
          <a class="page-link" href="#" v-on:click="navigate(n)">{{n}}</a>
        </li>
        <li class="page-item" v-if="pagination.current_page < pagination.last_page - 2">
          <a class="page-link" href="#">...</a>
        </li>
        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
          <a class="page-link" href="#" v-on:click="navigate(pagination.last_page)">Ultimo</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex";
export default {
  computed: {
    ...mapState({
      pagination: (state) => state.paginate.pagination,
    }),
  },

  methods: {
    navigate(page) {
      this.$store.dispatch("setCurrentPage", page);
    },
  },
};
</script>