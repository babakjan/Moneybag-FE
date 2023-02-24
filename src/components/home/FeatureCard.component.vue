<template>
  <v-card class="card">
    <v-card-title>{{ content.title }}</v-card-title>
    <v-card-text>{{ content.text }}</v-card-text>
    <v-icon x-large class="icon" color="primary">{{ content.icon }}</v-icon>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface FeatureCardContent {
  title: string;
  text: string;
  icon: string;
}

@Component
export default class FeatureCard extends Vue {
  @Prop({ required: true }) content!: FeatureCardContent;
}

export { FeatureCardContent };
</script>

<style scoped>
.card {
  padding: 1rem;
  width: 25rem;
}

.icon {
  width: 100%;
  padding-bottom: 1rem;
}

@media only screen and (max-width: 925px) {
  .card {
    width: 100%;
  }
}
</style>
