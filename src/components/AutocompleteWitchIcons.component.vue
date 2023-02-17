<template>
  <div class="row">
    <v-autocomplete
      v-model="selectedItem"
      :items="items"
      item-text="name"
      item-value="id"
      :label="label"
      :prepend-icon="prependIcon ?? ''"
      :loading="itemsLoading"
      :rules="required ? requiredRule : []"
      class="my-input"
    >
      <!--selected item-->
      <template #selection="{ item }">
        <v-icon :color="item.color" class="mr-2">{{ item.icon }}</v-icon>
        {{ item.name }}
      </template>

      <!--list of items to chose  from-->
      <template #item="{ item, attrs, on }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-icon :color="item.color" class="mr-2">{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue, Prop } from "vue-property-decorator";
import categoryApi from "@/api/categoryApi";
import accountApi from "@/api/accountApi";
import errorMessage from "@/services/errorMessage";
import { Action } from "vuex-class";

interface IconItem {
  id: number;
  icon: string;
  name: string;
}

enum ItemsType {
  CATEGORY,
  ACCOUNT,
}

@Component
export default class AutocompleteWitchIcons extends Vue {
  @VModel({ type: Number }) selectedItem: number | undefined; //id of selected item

  @Prop({ required: true }) itemsType!: ItemsType;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: false }) required!: boolean;
  @Prop({ default: "" }) prependIcon!: string;

  items = [] as IconItem[];
  itemsLoading = false;

  requiredRule = [
    (value: number): boolean | string => {
      return !!value || value === 0 || "This field is required";
    },
  ];

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    switch (this.itemsType) {
      case ItemsType.ACCOUNT:
        this.getAccounts();
        break;
      case ItemsType.CATEGORY:
        this.getCategories();
        break;
    }
  }

  getCategories(): void {
    this.itemsLoading = true;
    categoryApi
      .getAll()
      .then((response) => (this.items = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.itemsLoading = false));
  }

  getAccounts(): void {
    this.itemsLoading = true;
    accountApi
      .getAll()
      .then((response) => (this.items = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.itemsLoading = false));
  }
}

export { ItemsType };
</script>

<style scoped>
.my-input {
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
