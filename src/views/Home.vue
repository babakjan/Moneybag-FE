<template>
  <section id="start" class="max-width">
    <Landing />
    <div id="about" style="height: 100vh">
      <h2 class="pt-16">About</h2>
    </div>
    <div id="contact" style="height: 100vh">
      <h2 class="pt-16">Contact</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Landing from "@/components/home/Landing.component.vue";

@Component({
  components: { Landing },
})
export default class Home extends Vue {}
</script>
