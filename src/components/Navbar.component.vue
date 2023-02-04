<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center justify-space-between max-width">
      <!-- left column -->
      <div class="d-flex align-center justify-center">
        <!-- branding -->
        <Logo class="logo" />
        <v-toolbar-title>Moneybag</v-toolbar-title>

        <!-- navigation -->
        <ul class="nav-links">
          <li>
            <a href="#start" class="white--text">Home</a>
          </li>
          <li>
            <a href="#about" class="white--text">About</a>
          </li>
          <li>
            <a href="#contact" class="white--text">Contact</a>
          </li>
        </ul>
      </div>

      <!-- right column -->
      <div class="d-flex align-center justify-center">
        <v-btn plain :ripple="false"> Sing-in </v-btn>
        <v-btn color="secondary">
          <v-icon left>mdi-account-plus-outline</v-icon> Sing-up
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "./Logo.component.vue";

interface NavigationLink {
  to: string;
  label: string;
}

@Component({
  components: { Logo },
})
export default class Navbar extends Vue {
  links = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/#about",
      label: "About",
    },
    {
      to: "/#contact",
      label: "Contact",
    },
  ] as NavigationLink[];
}
</script>

<style scoped>
.logo {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
}

.nav-links {
  display: flex;
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
