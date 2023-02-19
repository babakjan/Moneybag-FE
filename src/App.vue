<template>
  <v-app>
    <Snackbar />

    <Navbar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/navigation/Navbar.component.vue";
import Snackbar from "@/components/Snackbar.component.vue";
import { Mutation } from "vuex-class";

@Component({
  components: {
    Navbar,
    Snackbar,
  },
})
export default class App extends Vue {
  beforeMount(): void {
    this.loadFromLocalStorage();
  }

  @Mutation("user/loadFromLocalStorage") loadFromLocalStorage!: () => void;
}
</script>
