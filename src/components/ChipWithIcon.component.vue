<template>
  <v-chip small :color="config.color" class="white--text">
    <v-icon small left color="white">{{ config.icon }}</v-icon>
    {{ config.name }}
  </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface Chip {
  name: string;
  icon: string;
  color: string;
}

@Component
export default class ChipWithIcon extends Vue {
  @Prop({ required: true }) readonly config!: Chip;
}
</script>

<style scoped></style>
