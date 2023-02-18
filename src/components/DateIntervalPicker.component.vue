<template>
  <v-dialog v-model="showDialog" max-width="310">
    <template #activator="{ on }">
      <v-text-field
        :value="formattedDate"
        label="Date interval"
        readonly
        clearable
        @click:clear="dates = []"
        v-on="on"
      />
    </template>

    <div class="calendars">
      <v-date-picker scrollable :range="true" full-width v-model="dates" />
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { formatDate } from "@/utils/formatDate";

@Component
export default class DateIntervalPicker extends Vue {
  @VModel({ required: true }) dates!: string[];
  showDialog = false;

  get formattedDate(): string {
    return this.dates.length == 2
      ? `${formatDate(this.dates[0])} - ${formatDate(this.dates[1])}`
      : "";
  }
}
</script>

<style scoped>
.calendars {
  display: flex;
  width: 100%;
  gap: 1rem;
}
</style>
