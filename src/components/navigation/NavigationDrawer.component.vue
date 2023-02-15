<template>
  <v-navigation-drawer v-model="drawerOpenLocal" app left temporary>
    <v-list nav dense>
      <v-list-item-group
        v-model="drawerOpenLocal"
        active-class="secondary--text text--accent-4"
      >
        <!-- sign btns -->
        <v-list-item class="mb-4">
          <!--signed in-->
          <div v-if="loggedIn" class="mt-2 d-flex align-start flex-column">
            <div>
              <v-avatar color="primary" size="40">
                <span class="white--text">{{
                  (user.firstName[0] + user.lastName[0]).toLocaleUpperCase()
                }}</span>
              </v-avatar>
              <span class="mx-2">
                {{ user.firstName + " " + user.lastName }}
              </span>
            </div>
            <v-btn icon plain router to="/" @click="logOut()" class="ml-8 mt-2">
              Log-out
              <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
          </div>

          <!--not signed in-->
          <div v-else class="d-flex">
            <v-btn color="secondary" router to="/register">
              <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
            </v-btn>
            <v-btn plain class="ml-1" router to="/login">
              <v-icon left>mdi-account-lock-open-outline</v-icon>Sing-in
            </v-btn>
          </div>
        </v-list-item>

        <v-divider />

        <!-- navigation -->

        <!-- app links -->
        <div v-if="loggedIn">
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            link
            :to="link.to"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ link.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item-icon>
          </v-list-item>
        </div>

        <!-- landing links -->
        <div v-else>
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
        </div>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NavigationLink } from "./Navbar.component.vue";
import { Getter, Mutation } from "vuex-class";
import { User } from "@/store/modules/user";

@Component
export default class NavigationDrawer extends Vue {
  @Prop() drawerOpen: boolean | undefined;
  @Prop() links: NavigationLink[] | undefined;

  @Getter("user/loggedIn") loggedIn!: boolean;
  @Getter("user/user") user!: User | null;

  @Mutation("user/logOut") logOut!: () => void;

  get drawerOpenLocal(): boolean {
    return this.drawerOpen || false;
  }

  set drawerOpenLocal(value: boolean) {
    this.$emit("update:drawerOpen", value);
  }
}
</script>

<style scoped>
.drawer-link {
  text-decoration: none;
}
</style>
