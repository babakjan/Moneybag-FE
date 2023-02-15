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
import { Component, Vue, Prop, ModelSync } from "vue-property-decorator";

@Component
export default class ColorSelect extends Vue {
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "Color" }) label!: string;

  @ModelSync("hidden", "input") color!: string;

  colors = [
    {
      text: "Green",
      value: "#388E3C",
    },
    {
      text: "Orange",
      value: "#FFAB00",
    },
    {
      text: "Purple",
      value: "#6200EA",
    },
    {
      text: "Blue",
      value: "#6290ff",
    },
    {
      text: "Red",
      value: "#F44336",
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
