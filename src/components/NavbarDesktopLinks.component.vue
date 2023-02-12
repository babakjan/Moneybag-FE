<template>
  <div class="d-flex align-center justify-space-between" style="width: 100%">
    <!-- navigation -->
    <ul class="nav-links d-none d-md-flex">
      <li v-for="(link, index) in links" :key="index">
        <span v-if="loggedIn">
          <router-link :to="link.to" class="white--text">{{
            link.label
          }}</router-link>
        </span>
        <span v-else>
          <a :href="link.to" class="white--text">{{ link.label }}</a>
        </span>
      </li>
    </ul>

    <div class="d-none d-md-flex align-center justify-center">
      <!-- account -->
      <div v-if="loggedIn">
        <v-btn text router to="/user">
          <v-icon>mdi-account-outline</v-icon>
          <span v-if="loggedIn">{{ user.email }}</span>
        </v-btn>
        <v-btn icon plain router to="/" @click="logOut()">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>

      <!-- sign btns -->
      <div v-else>
        <v-btn plain :ripple="false" router to="/login">
          <v-icon>mdi-account-lock-open-outline</v-icon>Sing-in
        </v-btn>

        <v-btn color="secondary" router to="/register">
          <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NavigationLink } from "./Navbar.component.vue";
import { Getter, Mutation } from "vuex-class";
import { User } from "@/store/modules/user";

@Component
export default class NavbarDesktopLinks extends Vue {
  @Prop() links: NavigationLink[] | undefined;

  @Getter loggedIn: boolean | undefined;
  @Getter user: User | null | undefined;

  @Mutation setLoggedIn!: (data: boolean) => void;
  @Mutation logOut!: () => void;
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
