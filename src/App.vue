<template>
  <v-app>
    <Navbar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.component.vue";

@Component({
  components: { Navbar },
})
export default class App extends Vue {}
</script>
