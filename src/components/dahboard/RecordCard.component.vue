<template>
  <v-card
    class="elevation-2 records px-6 py-2"
    @click="
      $router.push({ name: 'UpdateRecord', params: { recordId: record.id } })
    "
  >
    <div class="row">
      <div>
        <!--name-->
        <span class="record-name mr-4 font-weight-bold">
          {{ record.label }}
        </span>

        <!--note on bigger screen-->
        <span class="note">{{ record.note }}</span>
      </div>

      <!--date-->
      <span class="record-date">
        {{ formattedDateAndTime }}
      </span>
    </div>

    <!--note on mobile-->
    <span class="note-mobile">{{ record.note }}</span>

    <div class="row row2">
      <div>
        <!--category-->
        <ChipWithIcon :config="record.category" class="mr-4" />

        <!--account-->
        <ChipWithIcon :config="record.account" />
      </div>

      <!--amount-->
      <span
        class="amount"
        :class="record.amount < 0 ? 'red--text' : 'green--text'"
      >
        {{ record.amount.toFixed(2) }} {{ record.account.currency }}
      </span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Record } from "@/api/recordApi";
import ChipWithIcon from "@/components/ChipWithIcon.component.vue";
import { formatDate } from "@/utils/formatDate";

@Component({
  components: { ChipWithIcon },
})
export default class RecordCard extends Vue {
  @Prop({ required: true }) readonly record!: Record;

  get formattedDateAndTime(): string {
    return formatDate(this.record.date);
  }
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.note-mobile {
  display: none;
}

.amount {
  font-weight: bold;
}

@media only screen and (max-width: 750px) {
  .note {
    display: none;
  }

  .note-mobile {
    display: inline-flex;
  }
}

@media only screen and (max-width: 500px) {
  .row2 {
    flex-direction: column;
  }

  .amount {
    margin-top: 0.5rem;
  }
}
</style>
