<template>
  <div id="start" class="home max-width">
    <div id="about" style="height: 100vh">
      <h2 class="pt-16">About</h2>
    </div>
    <div id="contact" style="height: 100vh">
      <h2 class="pt-16">Contact</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
