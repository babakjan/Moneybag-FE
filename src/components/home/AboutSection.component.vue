<template>
  <section id="about">
    <h2>About</h2>
    <p>
      Moneybag is a simple application for managing personal finance. It allows
      you to track your income and expenses, analyze your records and visualize
      them in charts. You can create multiple accounts, add transactions to
      these accounts and categorize them into a variety of categories.
    </p>

    <p>
      Managing your finance is very important if your want to be great at
      budgeting and if you want to achieve your financial goals, so take it
      seriously!
    </p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AboutSection extends Vue {}
</script>

<style scoped>
section {
  padding-top: 8rem;
}

p {
  max-width: 50rem;
  font-size: 1.25rem;
  line-height: 175%;
}

h2 {
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 1rem;
}
</style>
