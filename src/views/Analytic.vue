<template>
  <section class="max-width main">
    <h1 class="main">Analytic</h1>
    <apexchart width="380" type="donut" :options="options" :series="series" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Analytic extends Vue {
  options = {
    labels: ["cat1", "nakup", "dite", "nwm", "last"],
  };
  series = [44, 55, 41, 17, 15];
}
</script>

<style scoped></style>
