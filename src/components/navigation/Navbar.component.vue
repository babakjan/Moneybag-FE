<template>
  <div>
    <v-app-bar app color="primary" dark class="ma0">
      <div class="d-flex align-center justify-space-between max-width">
        <!-- branding -->
        <div class="d-flex align-center justify-center">
          <Logo class="logo" />
          <v-toolbar-title>Moneybag</v-toolbar-title>
        </div>

        <NavbarDesktopLinks :links="links" />

        <v-app-bar-nav-icon
          @click="drawerOpen = true"
          class="d-flex d-md-none"
        />
      </div>
    </v-app-bar>

    <NavigationDrawer :links="links" :drawerOpen.sync="drawerOpen" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "../Logo.component.vue";
import NavigationDrawer from "./NavigationDrawer.component.vue";
import NavbarDesktopLinks from "./NavbarDesktopLinks.component.vue";
import { Getter } from "vuex-class";

interface NavigationLink {
  to: string;
  label: string;
  icon: string;
}

@Component({
  components: {
    Logo,
    NavigationDrawer,
    NavbarDesktopLinks,
  },
})
export default class Navbar extends Vue {
  drawerOpen = false;

  @Getter("user/loggedIn") loggedIn!: boolean;

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

  appLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: "mdi-view-dashboard-outline",
    },
    {
      to: "/records",
      label: "Records",
      icon: "mdi-view-list-outline",
    },
    {
      to: "/analytic",
      label: "Analytic",
      icon: "mdi-finance",
    },
  ] as NavigationLink[];

  //computed
  get links(): NavigationLink[] {
    return this.loggedIn ? this.appLinks : this.homeLinks;
  }
}

export { NavigationLink };
</script>

<style scoped>
.logo {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
}
</style>
