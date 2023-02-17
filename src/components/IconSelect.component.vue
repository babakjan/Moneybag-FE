<template>
  <v-autocomplete
    v-model="icon"
    prepend-icon="mdi-vector-arrange-above"
    :items="icons"
    :label="label"
    :loading="loading"
  >
    <!--selected item-->
    <template #selection="{ item }">
      <v-icon left>{{ item.value }}</v-icon>
      <span>{{ item.text }}</span>
    </template>

    <!--list of items to chose from-->
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-icon left>{{ item.value }}</v-icon>
        <span>{{ item.text }}</span>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from "vue-property-decorator";

@Component
export default class IconSelect extends Vue {
  @VModel() icon!: string; //material design icon name

  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "Icon" }) label!: string;

  icons = [
    //TODO add more
    {
      text: "Piggy",
      value: "mdi-piggy-bank-outline",
    },
    {
      text: "Money",
      value: "mdi-cash",
    },
    {
      text: "Bitcoin",
      value: "mdi-bitcoin",
    },
    {
      text: "Lite-coin",
      value: "mdi-litecoin",
    },
    {
      text: "Coin",
      value: "mdi-hand-coin",
    },
  ];
}
</script>

<style scoped></style>
