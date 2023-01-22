<template>
  <button><slot /></button>
</template>

<script>
export default {
  name: "SecondaryButton",
};
</script>

<style scoped>
button {
  width: 100%;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #fff;
  color: #1a1a1a;
  border: none;
  outline: 0.08rem solid #1a1a1a;
}

button:hover {
  background-color: #66676e;
  color: #fff;
  outline: none;
}
</style>
