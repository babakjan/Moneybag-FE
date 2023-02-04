<template>
  <div>
    <v-app-bar app color="primary" dark class="ma0">
      <div class="d-flex align-center justify-space-between max-width">
        <!-- left column -->
        <div class="d-flex align-center justify-center">
          <!-- branding -->
          <Logo class="logo" />
          <v-toolbar-title>Moneybag</v-toolbar-title>

          <!-- navigation -->
          <ul class="nav-links d-none d-md-flex">
            <li v-for="(link, index) in homeLinks" :key="index">
              <a :href="link.to" class="white--text">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- right column -->
        <div class="d-none d-md-flex align-center justify-center">
          <v-btn plain :ripple="false">
            <v-icon>mdi-account-lock-open-outline</v-icon>Sing-in
          </v-btn>
          <v-btn color="secondary">
            <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
          </v-btn>
        </div>

        <v-app-bar-nav-icon
          @click="drawerOpen = true"
          class="d-flex d-md-none"
        />
      </div>
    </v-app-bar>

    <NavigationDrawer :homeLinks="homeLinks" :drawerOpen.sync="drawerOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "./Logo.component.vue";
import NavigationDrawer from "./NavigationDrawer.component.vue";

interface NavigationLink {
  to: string;
  label: string;
  icon: string;
}

@Component({
  components: {
    Logo,
    NavigationDrawer,
  },
})
export default class Navbar extends Vue {
  drawerOpen = false;

  homeLinks = [
    {
      to: "/#start",
      label: "Home",
      icon: "mdi-home-outline",
    },
    {
      to: "/#about",
      label: "About",
      icon: "mdi-information-outline",
    },
    {
      to: "/#contact",
      label: "Contact",
      icon: "mdi-email-outline",
    },
  ] as NavigationLink[];
}

export { NavigationLink };
</script>

<style scoped>
.logo {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
}

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
