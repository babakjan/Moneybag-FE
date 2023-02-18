<template>
  <v-dialog
    v-model="showDialog"
    :close-on-content-click="false"
    max-width="310"
  >
    <!--input-->
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="formattedDate"
        :loading="loading"
        label="Date Time Picker"
        prepend-icon="event"
        readonly
        v-on="on"
      />
    </template>

    <!--date picker-->
    <v-date-picker v-if="!showTimePicker" v-model="dateLocal" />

    <!--time picker-->
    <v-time-picker
      v-else
      v-model="timeLocal"
      format="24hr"
      @click:minute="
        showTimePicker = false;
        showDialog = false;
      "
    />
  </v-dialog>
</template>

<script lang="ts">
import { Component, VModel, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

@Component
export default class DateTimePicker extends Vue {
  //date has to be string in ISO8601 format ("2023-01-11T19:52:40.000+00:00")
  @VModel({ required: true }) date!: string;

  @Prop({ default: false }) loading!: boolean;

  private showDialog = false;
  private showTimePicker = false;

  private get formattedDate(): string {
    return moment(this.date).format("D. M. YYYY H:mm");
  }

  //date picker accept date in yyyy-MM-DD format, this extract that from date
  get dateLocal(): string {
    return moment(this.date).format("yyyy-MM-DD");
  }

  set dateLocal(value: string) {
    this.showTimePicker = true;
    this.$emit("input", value + this.date.substr(10, this.date.length - 10));
  }

  //time picker accept time in format H:mm, this extract that from date and adjust to local timezone
  get timeLocal(): string {
    return moment(this.date).format("H:mm");
  }

  //set time from calendar, adjust timezone
  set timeLocal(value: string) {
    const hourInt =
      parseInt(value.substr(0, 2)) + new Date().getTimezoneOffset() / 60;
    const final =
      (hourInt > 9 ? `${hourInt}` : `0${hourInt}`) + value.substr(2, 3);

    this.$emit(
      "input",
      this.date.substr(0, 11) +
        final +
        this.date.substr(16, this.date.length - 15)
    );
  }
}
</script>
