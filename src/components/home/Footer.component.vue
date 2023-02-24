<template>
  <footer>
    <ul class="max-width">
      <li><a href="#start">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contacts</a></li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
footer {
  background: #ddd;
  width: 100%;
  padding: 1.5rem 0;
}

ul {
  padding: 0;
  width: 100%;
  list-style: none;
  display: flex;
  gap: 3rem;
}

ul li a {
  text-decoration: none;
  color: black;
}

ul li a:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 960px) {
  ul {
    justify-content: center;
  }
}
</style>
