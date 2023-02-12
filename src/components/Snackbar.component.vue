<template>
  <v-snackbar v-model="showLocal">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="showLocal = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  @Prop() show: boolean | undefined;
  @Prop() text: string | undefined;

  get showLocal(): boolean {
    return this.show || false;
  }

  set showLocal(value: boolean) {
    this.$emit("update:show", value);
  }
}
</script>

<style scoped></style>
