<template>
  <div class="container">
    <div class="flex">
      <slot name="image">{{ image }} </slot>
      <div class="content">
        <slot name="header">
          {{ header }}
        </slot>
        <slot name="text">
          {{ text }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseContainer",
  props: {
    image: {
      type: String,
      required: false,
    },
    header: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  background-color: #f7f7f7;
}

.flex {
  max-width: 75rem;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.content {
  text-align: center;
  padding: 1rem;
  max-width: 20rem;
}

@media (min-width: 40rem) {
  .flex {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
