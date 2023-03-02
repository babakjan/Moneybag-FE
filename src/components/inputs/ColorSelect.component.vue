<template>
  <!--color-->
  <v-autocomplete
    v-model="color"
    prepend-icon="mdi-palette"
    :items="colors"
    :label="label"
    :loading="loading"
  >
    <!--selected item-->
    <template #selection="{ item }">
      <div
        :style="'background-color: ' + item.value + ';'"
        class="color-example"
      />
      {{ item.text }}
    </template>

    <!--list of items to chose from-->
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <div
          :style="'background-color: ' + item.value + ';'"
          class="color-example"
        />
        {{ item.text }}
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from "vue-property-decorator";

@Component
export default class ColorSelect extends Vue {
  @VModel() color!: string; //in HEX format

  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "Color" }) label!: string;

  colors = [
    {
      text: "Light Green",
      value: "#6bff01",
    },
    {
      text: "Darker Green",
      value: "#50bf01",
    },
    {
      text: "Pink",
      value: "#ff5379",
    },
    {
      text: "Red",
      value: "#ff4638",
    },
    {
      text: "Dark Red",
      value: "#cf392d",
    },
    {
      text: "Bordeaux",
      value: "#b53227",
    },
    {
      text: "Darker Bordeaux",
      value: "#9e2c22",
    },
    {
      text: "Beige",
      value: "#d59687",
    },
    {
      text: "Light Purple",
      value: "#f077ff",
    },
    {
      text: "Dark Purple",
      value: "#b85bc3",
    },
    {
      text: "Light Blue",
      value: "#94bdff",
    },
    {
      text: "Blue",
      value: "#6290ff",
    },
    {
      text: "Darker Blue",
      value: "#547de0",
    },
    {
      text: "Deep Blue",
      value: "#325bff",
    },
    {
      text: "Dark Blue",
      value: "#294acf",
    },
    {
      text: "Orange",
      value: "#FFAB00",
    },
    {
      text: "Yellow",
      value: "#ffc100",
    },
    {
      text: "Cyan",
      value: "#46ffff",
    },
    {
      text: "Light blue 2",
      value: "#6290ff",
    },
    {
      text: "Black",
      value: "#070513",
    },
  ];
}
</script>

<style scoped>
.color-example {
  height: 1rem;
  min-width: 1rem;
  display: inline-block;
  margin: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e0e0e0;
}
</style>
