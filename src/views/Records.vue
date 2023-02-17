<template>
  <section class="max-width main">
    <!--dialog for deleting record-->
    <ConfirmationDialog
      :show.sync="showDialog"
      :label="`Really delete '${recordToDelete?.label}'`"
      @confirm="deleteRecord"
    />

    <div class="heading-and-button">
      <h1 class="main">Records</h1>

      <!--add record-->
      <v-btn color="secondary" @click="$router.push('/records/create')">
        <v-icon left>mdi-plus</v-icon>
        <span>Add record</span>
      </v-btn>
    </div>

    <!--table-->
    <v-data-table
      :items="records"
      item-key="id"
      :headers="tableHeaders"
      :loading="recordsLoading"
      :single-expand="true"
      :options.sync="pagination"
      :server-items-length="pagination.itemsLength"
      :footer-props="{ itemsPerPageOptions: [15, 20, 50] }"
      show-expand
      class="elevation-1"
      @update:options="getRecords"
    >
      <!--label-->
      <template #item.label="{ item }">
        <span class="font-weight-bold">{{ item.label }}</span>
      </template>

      <!--category-->
      <template #item.category="{ item }">
        <ChipWithIcon :config="item.category" />
      </template>

      <!--account-->
      <template #item.account="{ item }">
        <ChipWithIcon :config="item.account" />
      </template>

      <!--date-->
      <template #item.date="{ item }">
        {{ formatDateAndTime(item.date) }}
      </template>

      <!--amount-->
      <template #item.amount="{ item }">
        <span
          class="font-weight-bold"
          :class="item.amount < 0 ? 'red--text' : 'green--text'"
        >
          {{ item.amount.toFixed(2) }} {{ item.account.currency }}
        </span>
      </template>

      <!--note-->
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <span class="font-weight-bold">Note:</span>
          {{ item.note }}
        </td>
      </template>

      <!--actions-->
      <template #item.actions="{ item }">
        <!--delete-->
        <v-icon
          small
          @click="
            recordToDelete = item;
            showDialog = true;
          "
          >mdi-trash-can-outline</v-icon
        >

        <!--update-->
        <v-icon
          small
          class="ml-4"
          @click="
            $router.push({
              name: 'UpdateRecord',
              params: { recordId: item.id },
            })
          "
          >mdi-pencil</v-icon
        >
      </template>
    </v-data-table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import recordApi, { Record } from "@/api/recordApi";
import errorMessage from "@/services/errorMessage";
import ChipWithIcon from "@/components/ChipWithIcon.component.vue";
import { formatDateAndTime } from "@/utils/formatDate";
import ConfirmationDialog from "@/components/ConfirmationDialog.component.vue";
import VuetifyDataTablePagination from "@/definitions/VuetifyDataTablePagination";

@Component({
  components: { ChipWithIcon, ConfirmationDialog },
})
export default class Records extends Vue {
  records = [] as Record[];
  recordsLoading = false;
  showDialog = false;
  recordToDelete = null as null | Record; //record, which will be deleted

  pagination = {
    page: 1,
    itemsPerPage: 15,
    pageCount: 1,
    itemsLength: 0,
    sortBy: ["date"],
    sortDesc: [true],
  } as VuetifyDataTablePagination;

  tableHeaders = [
    {
      text: "",
      value: "data-table-expand",
    },
    {
      text: "Label",
      align: "start",
      value: "label",
    },
    {
      text: "Category",
      align: "start",
      sortable: false,
      value: "category",
    },
    {
      text: "Account",
      align: "start",
      sortable: false,
      value: "account",
    },
    {
      text: "Date",
      align: "end",
      value: "date",
    },
    {
      text: "Amount",
      align: "end",
      value: "amount",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      align: "center",
    },
  ];

  formatDateAndTime(date: string): string {
    return formatDateAndTime(date);
  }

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.getRecords();
  }

  //load records from api
  getRecords(): void {
    this.recordsLoading = true;
    //this.pagination.page - 1, because vuetify indexes from 1
    recordApi
      .getAll(this.pagination.page - 1, this.pagination.itemsPerPage, [
        { name: "sort", value: this.sortParameterValue },
      ])
      .then((response) => {
        this.records = response.data.items;
        this.pagination.page = response.data.page + 1; //server index from 0, vuetify from 1
        this.pagination.itemsPerPage = response.data.size;
        this.pagination.pageCount = response.data.pageCount;
        this.pagination.itemsLength = response.data.totalElements;
      })
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordsLoading = false));
  }

  //delete record of id: this.deleteRecordId from api
  deleteRecord(): void {
    this.recordsLoading = true;
    if (!this.recordToDelete) {
      this.showSnack("Can't delete record, id is null."); //shouldn't happen
      return;
    }
    recordApi
      .deleteRecord(`${this.recordToDelete?.id}`)
      .then(() => this.getRecords())
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordsLoading = false));
  }

  //sorting parameter for api
  get sortParameterValue(): string {
    let sort = "date,desc";
    if (this.pagination.sortBy.length > 0) {
      sort = this.pagination.sortBy[0];
      if (this.pagination.sortDesc[0]) {
        sort += ",desc";
      }
    }
    return sort;
  }
}
</script>

<!--deliberately not scoped, because scoped can't modify vuetify classes-->
<style>
.v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none !important;
}
</style>
