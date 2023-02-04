<template>
  <div class="d-flex align-center justify-space-between" style="width: 100%">
    <!-- navigation -->
    <ul class="nav-links d-none d-md-flex">
      <li v-for="(link, index) in homeLinks" :key="index">
        <a :href="link.to" class="white--text">{{ link.label }}</a>
      </li>
    </ul>

    <!-- right column -->
    <div class="d-none d-md-flex align-center justify-center">
      <v-btn plain :ripple="false">
        <v-icon>mdi-account-lock-open-outline</v-icon>Sing-in
      </v-btn>
      <v-btn color="secondary">
        <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NavigationLink } from "./Navbar.component.vue";

@Component
export default class NavbarDesktopLinks extends Vue {
  @Prop() readonly homeLinks: NavigationLink[] | undefined;
}
</script>

<style scoped>
.nav-links {
  list-style-type: none;
}

.nav-links li a {
  text-decoration: none;
}

.nav-links li a:hover {
  text-decoration: underline;
}

.nav-links li {
  margin: 0 1rem;
}
</style>
