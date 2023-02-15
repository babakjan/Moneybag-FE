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
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

@Component
export default class Snackbar extends Vue {
  @Getter("snackbar/show") show!: boolean;
  @Getter("snackbar/text") text!: string;

  @Mutation("snackbar/setShow") setShow!: (date: boolean) => void;

  get showLocal(): boolean {
    return this.show;
  }

  set showLocal(value: boolean) {
    this.setShow(value);
  }
}
</script>

<style scoped></style>
