<template>
  <ul>
    <li v-for="(page, index) in pages" :key="page + index">
      <button @click="$emit('changePage', page)">
        <span :class="activePage(page)">{{ page }}</span>
      </button>
      <span v-if="!lastPage(page)" class="spacer">/</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RoomsPagination",
  emits: ["changePage"],
  props: {
    pages: { type: Object, required: true },
    currentPage: { type: Number, required: true },
  },
  methods: {
    lastPage(page) {
      if (page === this.pages[this.pages.length - 1]) {
        return true;
      }
      return false;
    },
    activePage(page) {
      if (page === this.currentPage) {
        return "active";
      }
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  justify-content: center;
  width: 100%;
}

button {
  all: unset;
  cursor: pointer;
  color: #666;
  font-size: 1.6rem;
  margin: 0;
}
.active {
  text-decoration: underline;
}
.spacer {
  margin: 0.5rem;
  color: #666;
  font-size: 1.6rem;
}
</style>
