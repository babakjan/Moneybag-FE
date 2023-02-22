<template>
  <div class="container">
    <!--predefined intervals-->
    <v-autocomplete
      label="Interval"
      prepend-icon="mdi-calendar-range"
      :items="options"
      v-model="valueLocal"
      @input="onInput"
    />

    <!--custom interval-->
    <DateIntervalPicker
      v-model="dateInterval"
      prepend-icon="mdi-calendar-range"
      @input="setToCustomInterval"
    />
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { formatYYYYMMDD } from "@/utils/formatDate";
import DateIntervalPicker from "@/components/inputs/DateIntervalPicker.component.vue";

@Component({
  components: { DateIntervalPicker },
})
export default class AnalyticIntervalPicker extends Vue {
  @VModel({ required: true }) dateInterval!: string[];

  optionValues = {
    thisMonth: "This month",
    lastMonth: "Last month",
    thisYear: "This year",
    lastYear: "Last year",
    custom: "Custom",
  };

  valueLocal = this.optionValues.thisMonth;

  get options(): string[] {
    return Object.values(this.optionValues);
  }

  onInput(value: string): void {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    if (value === this.optionValues.thisMonth) {
      const firstDayOfMonth = new Date(thisYear, thisMonth, 1);
      const lastDayOfMonth = new Date(thisYear, thisMonth + 1, 0);
      this.$emit("input", [
        formatYYYYMMDD(firstDayOfMonth),
        formatYYYYMMDD(lastDayOfMonth),
      ]);
      return;
    }

    if (value === this.optionValues.lastMonth) {
      const firstDayOfLastMonth = new Date(thisYear, thisMonth - 1, 1);
      const lastDayOfLastMonth = new Date(thisYear, thisMonth, 0);
      this.$emit("input", [
        formatYYYYMMDD(firstDayOfLastMonth),
        formatYYYYMMDD(lastDayOfLastMonth),
      ]);
      return;
    }

    if (value === this.optionValues.thisYear) {
      const firstDayOfYear = new Date(thisYear, 0, 1);
      const lastDayOfYear = new Date(thisYear, 11, 31);
      this.$emit("input", [
        formatYYYYMMDD(firstDayOfYear),
        formatYYYYMMDD(lastDayOfYear),
      ]);
      return;
    }

    if (value === this.optionValues.lastYear) {
      const firstDayOfLastYear = new Date(thisYear - 1, 0, 1);
      const lastDayOfLastYear = new Date(thisYear - 1, 11, 31);
      this.$emit("input", [
        formatYYYYMMDD(firstDayOfLastYear),
        formatYYYYMMDD(lastDayOfLastYear),
      ]);
      return;
    }
  }

  setToCustomInterval(): void {
    this.valueLocal = this.optionValues.custom;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

@media only screen and (max-width: 600px) {
  .container {
    flex-direction: column;
    gap: 0;
    padding-bottom: 1rem;
  }

  /*.container >*/
}
</style>
