<template>
  <section class="max-width main">
    <!--dialog for deleting record-->
    <ConfirmationDialog
      :show.sync="showDialog"
      :label="`Really delete '${record.label}'`"
      @confirm="deleteRecord"
    />

    <h1 class="main">
      {{ update ? `Edit "${record.label}"` : "Create Record" }}
    </h1>

    <v-form class="mt-8" ref="form" @submit.prevent="submit">
      <!--1st row-->
      <div class="row">
        <!--label-->
        <v-text-field
          v-model="record.label"
          :rules="rules.label"
          :counter="40"
          :loading="recordLoading"
          label="Label"
          placeholder="Iphone"
          prepend-icon="mdi-label-outline"
          class="input"
          required
        />

        <!--amount-->
        <v-text-field
          v-model="record.amount"
          :rules="rules.amount"
          :loading="recordLoading"
          label="Amount"
          placeholder="1199"
          hint="Positive numbers are incomes, negative are expenses."
          prepend-icon="mdi-cash"
          :suffix="currency"
          class="input"
          type="number"
          required
        />
      </div>

      <!--2nd row-->
      <div class="row">
        <!--note-->
        <v-text-field
          v-model="record.note"
          :rules="rules.note"
          :counter="128"
          :loading="recordLoading"
          label="Note"
          placeholder="bought from iStyle in Prague"
          prepend-icon="mdi-note-text-outline"
          class="input"
          required
        />
      </div>

      <!--3rd row-->
      <div class="row">
        <!--category-->
        <AutocompleteWitchIcons
          v-model="record.categoryId"
          :items-type="itemType.CATEGORY"
          :required="true"
          label="Category"
          prepend-icon="mdi-shape-outline"
          class="custom-autocomplete"
        />

        <!--account-->
        <AutocompleteWitchIcons
          v-model="record.accountId"
          :items-type="itemType.ACCOUNT"
          :required="true"
          label="Account"
          prepend-icon="mdi-bank-outline"
          class="custom-autocomplete"
        />
      </div>

      <!--4th row-->
      <div class="row">
        <div class="input date-picker-container">
          <DateTimePicker v-model="record.date" :loading="recordLoading" />
        </div>

        <!--buttons-->
        <div>
          <!--delete-->
          <v-btn
            v-if="update"
            :loading="deleteLoading"
            color="red"
            class="white--text ml-4"
            @click="showDialog = true"
          >
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete
          </v-btn>

          <!--submit-->
          <v-btn
            color="secondary"
            :loading="submitLoading"
            type="submit"
            class="mx-4"
          >
            <v-icon left>{{ update ? "mdi-update" : "mdi-plus" }}</v-icon>
            {{ update ? "Update" : "Create" }}
          </v-btn>
        </div>
      </div>
    </v-form>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import recordApi, { CreateUpdateRecordRequest } from "@/api/recordApi";
import ConfirmationDialog from "@/components/ConfirmationDialog.component.vue";
import { Action, Getter } from "vuex-class";
import errorMessage from "@/services/errorMessage";
import AutocompleteWithIcons from "@/components/inputs/AutocompleteWithIcons.component.vue";
import { ItemsType } from "@/components/inputs/AutocompleteWithIcons.component.vue";
import DateTimePicker from "@/components/inputs/DateTimePicker.component.vue";

@Component({
  components: {
    ConfirmationDialog,
    AutocompleteWitchIcons: AutocompleteWithIcons,
    DateTimePicker,
  },
})
export default class CreateUpdateRecord extends Vue {
  @Prop({ default: false }) update!: boolean;

  itemType = ItemsType;
  recordId = null as null | string; //used when updating existing record
  submitLoading = false;
  recordLoading = false;
  deleteLoading = false;
  fieldRequiredErrorMsg = "This field is required.";
  showDialog = false;
  record = {
    id: null,
    amount: 0,
    label: "",
    note: "",
    date: new Date().toISOString(),
    accountId: null,
    categoryId: null,
  } as CreateUpdateRecordRequest;

  //input validation rules
  rules = {
    label: [
      (value: string): boolean | string =>
        !!value || this.fieldRequiredErrorMsg,
      (value: string): boolean | string =>
        (!!value && value.length <= 40) || "Must be less than 40 characters",
    ],
    amount: [
      (value: number): boolean | string =>
        !!value || value === 0 || this.fieldRequiredErrorMsg,
    ],
    note: [
      (value: string): boolean | string =>
        value.length <= 128 || "Must be less than 128 characters",
    ],
  };

  @Getter("user/currency") currency: string | undefined;

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    if (!this.update) {
      return;
    }
    this.recordId = this.$route.params.recordId;
    this.getRecord();
  }

  //submit form
  submit(): void {
    this.submitLoading = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!this.$refs["form"]?.validate()) {
      this.submitLoading = false;
      return;
    }
    if (this.update) {
      this.updateRecord();
    } else {
      this.createRecord();
    }
  }

  //get record from api
  getRecord(): void {
    this.recordLoading = true;
    if (!this.recordId) {
      this.showSnack("Can't load record, id is null");
      this.recordLoading = false;
      return;
    }
    recordApi
      .getById(this.recordId)
      .then((response) => {
        this.record = recordApi.recordToCreateUpdateRecordRequest(
          response.data
        );
      })
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordLoading = false));
  }

  //create record on api
  createRecord(): void {
    this.submitLoading = true;
    recordApi
      .createRecord(this.record)
      .then(() => this.$router.go(-1))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.submitLoading = false));
  }

  //update record on api
  updateRecord(): void {
    this.submitLoading = true;
    if (!this.recordId) {
      this.showSnack("Can't load record, id is null");
      this.submitLoading = false;
      return;
    }
    recordApi
      .updateRecord(this.recordId, this.record)
      .then(() => this.$router.go(-1))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.submitLoading = false));
  }

  //delete record from api
  deleteRecord(): void {
    this.deleteLoading = true;
    if (!this.recordId) {
      this.showSnack("Can't load record, id is null");
      this.deleteLoading = false;
      return;
    }
    recordApi
      .deleteRecord(this.recordId)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.deleteLoading = false));
  }
}
</script>

<style scoped>
.row {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.row .input {
  width: calc(50% - 1rem);
  padding: 0.5rem 1rem;
}

.custom-autocomplete {
  width: calc(50% - 3rem);
  padding: 0.75rem 1rem;
  margin: 0;
}

.date-picker-container {
  display: flex;
  padding-top: 0;
  margin-top: -1rem;
}

@media only screen and (max-width: 750px) {
  .row {
    flex-direction: column;
    align-items: start;
    gap: 0;
  }

  .row .input,
  .custom-autocomplete {
    width: 100%;
  }
}
</style>
