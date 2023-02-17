<template>
  <v-dialog v-model="showLocal" max-width="400">
    <v-card class="px-2 pb-3">
      <!--title-->
      <v-card-title class="text-h5 justify-center">
        {{ label }}
      </v-card-title>

      <!--buttons-->
      <v-card-actions>
        <v-spacer />

        <!--confirm-->
        <v-btn color="red" class="white--text mr-4" @click="confirm">
          <v-icon left>mdi-trash-can-outline</v-icon>
          <span>{{ confirmLabel }}</span>
        </v-btn>

        <!--cancel-->
        <v-btn color="secondary" @click="cancel">
          <v-icon left>mdi-cancel</v-icon>
          <span>{{ cancelLabel }}</span>
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync, Emit } from "vue-property-decorator";

@Component
export default class ConfirmationDialog extends Vue {
  @PropSync("show", { type: Boolean, default: false }) showLocal!: boolean;
  @Prop({ default: "Are you sure?" }) readonly label!: string;
  @Prop({ default: "Delete" }) readonly confirmLabel!: string;
  @Prop({ default: "Cancel" }) readonly cancelLabel!: string;

  @Emit("cancel")
  cancel(): void {
    this.showLocal = false;
  }

  @Emit("confirm")
  confirm(): void {
    this.showLocal = false;
  }
}
</script>

<style scoped></style>
