<template>
  <section class="max-width main" @keyup.enter="getRecords">
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
      mobile-breakpoint="900"
      show-expand
      class="elevation-1 mb-8"
      @update:options="getRecords"
    >
      <template #top>
        <!--filters-->
        <div class="filters">
          <!--label-->
          <div class="filter-input">
            <v-text-field
              v-model="filterValues.label"
              label="Label"
              placeholder="Iphone"
              clearable
              class="mr-0 pr-0"
              @blur="getRecords"
              hint="Hit enter to search"
              @click:clear="
                filterValues.label = '';
                getRecords();
              "
            />
          </div>

          <!--category-->
          <div class="filter-input">
            <AutocompleteWithIcons
              v-model="filterValues.categoryId"
              :items-type="itemType.CATEGORY"
              label="Category"
              class="pt-4 ma-0"
              clearable
              @input="getRecords"
            />
          </div>

          <!--account-->
          <div class="filter-input">
            <AutocompleteWithIcons
              v-model="filterValues.accountId"
              :items-type="itemType.ACCOUNT"
              label="Account"
              class="pt-4 ma-0"
              clearable
              @input="getRecords"
            />
          </div>

          <!--date interval-->
          <div class="filter-input">
            <DateIntervalPicker
              v-model="filterValues.dateInterval"
              @input="getRecords"
            />
          </div>

          <!--income type-->
          <div class="filter-input">
            <v-autocomplete
              v-model="filterValues.transactionType"
              :items="transactionTypes"
              label="Income / Expense"
              clearable
              @input="getRecords"
            />
          </div>

          <!--delete filters-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="resetFilterValues">
                mdi-trash-can-outline
              </v-icon>
            </template>
            <span>Delete filters</span>
          </v-tooltip>
        </div>
      </template>

      <!--label-->
      <!--eslint-disable-next-line-->
      <template #item.label="{ item }">
        <span class="font-weight-bold">{{ item.label }}</span>
      </template>

      <!--category-->
      <!--eslint-disable-next-line-->
      <template #item.category="{ item }">
        <ChipWithIcon :config="item.category" />
      </template>

      <!--account-->
      <!--eslint-disable-next-line-->
      <template #item.account="{ item }">
        <ChipWithIcon :config="item.account" />
      </template>

      <!--date-->
      <!--eslint-disable-next-line-->
      <template #item.date="{ item }">
        {{ formatDateAndTime(item.date) }}
      </template>

      <!--amount-->
      <!--eslint-disable-next-line-->
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
          <span class="font-weight-bold ml-4">Note:</span>
          {{ item.note }}
        </td>
      </template>

      <!--actions-->
      <!--eslint-disable-next-line-->
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
import { ApiParameter } from "@/api/api";
import errorMessage from "@/services/errorMessage";
import { formatDateAndTime } from "@/utils/formatDate";
import VuetifyDataTablePagination from "@/definitions/VuetifyDataTablePagination";
import { ItemsType } from "@/components/AutocompleteWithIcons.component.vue";
import ChipWithIcon from "@/components/ChipWithIcon.component.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.component.vue";
import AutocompleteWithIcons from "@/components/AutocompleteWithIcons.component.vue";
import DateIntervalPicker from "@/components/DateIntervalPicker.component.vue";

@Component({
  components: {
    ChipWithIcon,
    ConfirmationDialog,
    AutocompleteWithIcons,
    DateIntervalPicker,
  },
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
  filterValues = {
    label: null as null | string,
    categoryId: null as null | number,
    accountId: null as null | number,
    transactionType: null as null | string,
    dateInterval: [] as string[],
  };

  dates = ["2023-02-01", "2023-02-10"];

  itemType = ItemsType;

  transactionTypeOption = {
    INCOMES: "incomes",
    EXPENSES: "expenses",
  };
  transactionTypes = [
    this.transactionTypeOption.INCOMES,
    this.transactionTypeOption.EXPENSES,
  ];

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
    this.resetFilterValues();
    this.getRecords();
  }

  //load records from api
  getRecords(): void {
    console.log("get records called");
    this.recordsLoading = true;
    //this.pagination.page - 1, because vuetify indexes from 1
    recordApi
      .getAll(this.pagination.page - 1, this.pagination.itemsPerPage, [
        { name: "sort", value: this.sortParameterValue },
        ...this.filterParameters,
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

  //reset filter values and update records
  resetFilterValues(): void {
    this.filterValues = {
      label: null,
      categoryId: null,
      accountId: null,
      transactionType: null,
      dateInterval: [],
    };
    this.getRecords();
  }

  get filterParameters(): ApiParameter[] {
    let parameters = [];

    if (this.filterValues.dateInterval.length === 2) {
      parameters.push({
        name: "dateGt",
        value: this.filterValues.dateInterval[0],
      });
      parameters.push({
        name: "dateLt",
        value: this.filterValues.dateInterval[1],
      });
    }

    if (
      this.filterValues.transactionType === this.transactionTypeOption.EXPENSES
    ) {
      parameters.push({
        name: "amountLt",
        value: 0,
      });
    } else if (
      this.filterValues.transactionType === this.transactionTypeOption.INCOMES
    ) {
      parameters.push({
        name: "amountGt",
        value: 0,
      });
    }

    if (this.filterValues.label) {
      parameters.push({ name: "label", value: this.filterValues.label });
    }

    if (this.filterValues.categoryId != null) {
      parameters.push({
        name: "categoryId",
        value: this.filterValues.categoryId,
      });
    }

    if (this.filterValues.accountId != null) {
      parameters.push({
        name: "accountId",
        value: this.filterValues.accountId,
      });
    }

    return parameters;
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem 0 2rem;
}

.filter-input {
  width: 100%;
}

@media only screen and (max-width: 900px) {
  .filters {
    flex-direction: column;
  }
}
</style>
