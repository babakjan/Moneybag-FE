<template>
  <v-navigation-drawer v-model="drawerOpenLocal" app left temporary>
    <v-list nav dense>
      <v-list-item-group
        v-model="drawerOpenLocal"
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
          v-for="(link, index) in homeLinks"
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
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { NavigationLink } from "./Navbar.component.vue";

export default Vue.extend({
  name: "NavigationDrawer",
  props: {
    homeLinks: {
      type: Array as PropType<NavigationLink[]>,
      default: () => [],
    },
    drawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    drawerOpenLocal: {
      get(): boolean {
        return this.drawerOpen;
      },
      set(value: boolean) {
        this.$emit("update:drawerOpen", value);
      },
    },
  }
});
</script>

<style scoped>
.drawer-link {
  text-decoration: none;
}
</style>
