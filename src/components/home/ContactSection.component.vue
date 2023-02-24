<template>
  <section id="contact">
    <h2>Contact</h2>

    <ul>
      <!-- email -->
      <li>
        <v-icon left>mdi-email-outline</v-icon>
        <a href="mailto:babakhonza@gmail.com">babakhonza@gmail.com</a>
      </li>

      <!-- linked-in -->
      <li>
        <v-icon left>mdi-linkedin</v-icon>
        <a href="https://www.linkedin.com/in/janbabak/">@janbabak</a>
      </li>

      <!-- github -->
      <li>
        <v-icon left>mdi-github</v-icon>
        <a href="https://github.com/babakjan">@babakjan</a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ContactSection extends Vue {}
</script>

<style scoped>
section {
  padding-top: 7rem;
}

h2 {
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  font-size: 1.25rem;
  padding: 0;
}

ul li {
  margin-bottom: 1rem;
}

@media only screen and (max-width: 400px) {
  section {
    padding-top: 3rem;
  }
}
</style>
