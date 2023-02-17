<template>
  <v-dialog v-model="showMenu" :close-on-content-click="false" max-width="310">
    <!--input-->
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="formattedDate"
        label="Date Time Picker"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
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
        showMenu = false;
      "
    />
  </v-dialog>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import moment from "moment";

@Component
export default class DateTimePicker extends Vue {
  @VModel({ required: true }) date!: string;

  private showMenu = false;
  private showTimePicker = false;

  private get formattedDate(): string {
    return moment(this.date).format("D. M. YYYY H:mm");
  }

  get dateLocal(): string {
    return moment(this.date).format("yyyy-MM-DD");
  }

  set dateLocal(value: string) {
    this.$emit("input", value + this.date.substr(10, this.date.length - 10));
    this.showTimePicker = true;
  }

  //get time in format h:mm but recalculate it to local timezone
  get timeLocal(): string {
    return moment(this.date).format("H:mm");
  }

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
