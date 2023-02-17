<template>
  <!--records-->
  <section>
    <div class="heading-container">
      <h2 class="main pb-4">Last records</h2>
      <!--add account-->
      <v-btn color="secondary" @click="$router.push('/records/create')">
        <v-icon left>mdi-plus</v-icon>
        <span>Add record</span>
      </v-btn>
    </div>

    <RecordCard
      v-for="record in records"
      :key="`record${record.id}`"
      :record="record"
      class="mb-4"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import RecordApi, { Record } from "@/api/recordApi";
import errorMessage from "@/services/errorMessage";
import RecordCard from "@/components/dahboard/RecordCard.component.vue";

@Component({
  components: { RecordCard },
})
export default class RecordsSection extends Vue {
  records = [] as Record[];
  recordsLoading = false;

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.recordsLoading = true;
    RecordApi.getAll([{ name: "sort", value: "date,desc" }])
      .then((response) => (this.records = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordsLoading = false));
  }
}
</script>

<style scoped>
.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

@media only screen and (max-width: 440px) {
  .heading-container {
    flex-direction: column;
    align-items: start;
  }

  .heading-container h1 {
    margin-bottom: 1rem;
  }
}
</style>
