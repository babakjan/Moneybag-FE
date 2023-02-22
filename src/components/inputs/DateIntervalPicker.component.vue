<template>
  <v-dialog v-model="showDialog" max-width="310">
    <template #activator="{ on }">
      <v-text-field
        :value="formattedDate"
        label="Date interval"
        :prepend-icon="prependIcon"
        readonly
        clearable
        @click:clear="dates = []"
        v-on="on"
      />
    </template>

    <div class="calendars">
      <v-date-picker
        scrollable
        :range="true"
        full-width
        v-model="dates"
        @input="fixIfSwapped"
      />
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";
import { formatDate } from "@/utils/formatDate";

@Component
export default class DateIntervalPicker extends Vue {
  //length 2 - interval boundaries like ISO8601 strings, eg. ["2023-01-31", "2023-02-28"]
  @VModel({ required: true }) dates!: string[];
  @Prop() prependIcon: string | undefined;
  showDialog = false;

  get formattedDate(): string {
    return this.dates.length == 2
      ? `${formatDate(this.dates[0])} - ${formatDate(this.dates[1])}`
      : "";
  }

  //if first date is after second one, swap them
  fixIfSwapped(value: string[]): void {
    if (value.length != 2) {
      return;
    }
    if (new Date(value[0]).getTime() > new Date(value[1]).getTime()) {
      this.dates = [value[1], value[0]];
    }
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
