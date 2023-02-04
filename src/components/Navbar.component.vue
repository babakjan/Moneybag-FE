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
            <li v-for="(link, index) in links" :key="index">
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

        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none" />
      </div>
    </v-app-bar>

    <!-- mobile menu -->
    <v-navigation-drawer v-model="drawer" app left temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="drawer"
          active-class="secondary--text text--accent-4"
        >
          <!-- sign btns -->
          <v-list-item class="mb-4">
            <v-btn color="secondary">
              <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
            </v-btn>
            <v-btn plain class="ml-1">
              <v-icon>mdi-account-lock-open-outline</v-icon>Sing-in
            </v-btn>
          </v-list-item>

          <v-divider />

          <!-- navigation -->
          <a
            v-for="(link, index) in links"
            :key="index"
            :href="link.to"
            class="drawer-link"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ link.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "./Logo.component.vue";

interface NavigationLink {
  to: string;
  label: string;
  icon: string;
}

@Component({
  components: { Logo },
})
export default class Navbar extends Vue {
  drawer = false;

  links = [
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

.nav-links li a,
.drawer-link {
  text-decoration: none;
}

.nav-links li a:hover {
  text-decoration: underline;
}

.nav-links li {
  margin: 0 1rem;
}
</style>
