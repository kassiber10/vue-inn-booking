<template>
  <button><slot /></button>
</template>

<script>
export default {
  name: "PrimaryButton",
};
</script>

<style scoped>
button {
  width: 100%;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
}

button:hover {
  background-color: #66676e;
}
</style>
