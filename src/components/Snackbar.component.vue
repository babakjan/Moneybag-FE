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
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  @Prop({ default: "" }) text!: string;
  @PropSync("show", { type: Boolean, default: false }) showLocal!: boolean;
}
</script>

<style scoped></style>
