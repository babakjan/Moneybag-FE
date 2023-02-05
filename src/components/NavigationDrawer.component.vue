<template>
  <v-navigation-drawer v-model="drawerOpenLocal" app left temporary>
    <v-list nav dense>
      <v-list-item-group
        v-model="drawerOpenLocal"
        active-class="secondary--text text--accent-4"
      >
        <!-- sign btns -->
        <v-list-item class="mb-4">
          <div v-if="loggedIn" class="mt-2">
            <v-avatar color="primary" size="40">
              <span class="white--text">JB</span>
            </v-avatar>
            <span class="mx-2">Jan Babák</span>
            <v-btn icon plain router to="/" @click="logOut()">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </div>

          <div v-else class="d-flex">
            <v-btn color="secondary">
              <v-icon left>mdi-account-plus-outline</v-icon>Sing-up
            </v-btn>
            <v-btn plain class="ml-1" @click="logIn()" router to="/dashboard">
              <v-icon>mdi-account-lock-open-outline</v-icon>Sing-in
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
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: {
    ...mapGetters(["loggedIn"]),
  },
  methods: {
    ...mapMutations(["setLoggedIn"]),
  },
})
export default class NavigationDrawer extends Vue {
  @Prop() drawerOpen: boolean | undefined;
  @Prop() links: NavigationLink[] | undefined;

  loggedIn!: boolean;

  get drawerOpenLocal(): boolean {
    return this.drawerOpen || false;
  }

  set drawerOpenLocal(value: boolean) {
    this.$emit("update:drawerOpen", value);
  }

  logIn(): void {
    this.$store.commit("setLoggedIn", true);
  }

  logOut(): void {
    this.$store.commit("setLoggedIn", false);
  }
}
</script>

<style scoped>
.drawer-link {
  text-decoration: none;
}
</style>
