<template>
  <!--records-->
  <section>
    <div class="heading-and-button mb-6">
      <h2 class="main">Last records</h2>
      <!--add record-->
      <v-btn color="secondary" @click="$router.push('/records/create')">
        <v-icon left>mdi-plus</v-icon>
        <span>Add record</span>
      </v-btn>
    </div>

    <!--cards-->
    <div>
      <div v-if="records.length > 0 || recordsLoading">
        <!--records-->
        <div v-if="!recordsLoading">
          <RecordCard
            v-for="record in records"
            :key="`record${record.id}`"
            :record="record"
            class="mb-4"
          />
        </div>

        <!--skeletons-->
        <div v-else>
          <v-skeleton-loader
            v-for="i in 5"
            :key="'record-loader' + i"
            type="image"
            class="skeleton"
          />
        </div>
      </div>

      <div v-else class="bigger-text">You haven't created any records yet!</div>
    </div>

    <!--no accounts-->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import recordApi, { Record } from "@/api/recordApi";
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
    recordApi
      .getAll([{ name: "sort", value: "date,desc" }])
      .then((response) => (this.records = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordsLoading = false));
  }
}
</script>

<style scoped>
.skeleton {
  height: 5.5rem;
  margin-bottom: 1rem;
}
</style>
