<template>
  <div class="p-5 mt-20">
    <form
      class="space-y-8 divide-y divide-gray-200"
      @submit.prevent="handleSubmit"
    >
      <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Edit company
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Use a real company
            </p>
          </div>
          <div class="space-y-6 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Name</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  v-model="name"
                  required="true"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Address</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  v-model="address"
                  required="true"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Phone</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  v-model="phone"
                  required="true"
                />
              </div>

              <div v-if="error" class="text-red-600">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="handleClose"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            v-if="!isPending"
          >
            Save
          </button>
          <button
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            v-if="isPending"
            disabled
          >
            Loading...
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { defineProps, toRefs, ref } from "vue";
import axios from "axios";

const props = defineProps({
  id: String,
});

const { id } = toRefs(props);

const getCompanyById = async () => {
  const res = await axios.get(
    `http://localhost:3000/api/companies/${id.value}`
  );
  return res.data;
};

const company = await getCompanyById();

const name = ref(company.name);
const address = ref(company.address);
const phone = ref(company.phoneContact);

const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
  error.value = null;
  isPending.value = true;
  try {
    const token = localStorage.getItem("token").slice(1, -1);
    const res = await axios.put(
      `http://localhost:3000/api/companies/${id.value}`,
      {
        name: name.value,
        address: address.value,
        phoneContact: phone.value,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res) {
      throw new Error("Could not complete edit");
    }
    error.value = null;
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }

  if (!error.value) {
    router.push({ name: "companies" });
  }
};

const router = useRouter();
const handleClose = () => {
  router.push({ name: "companies" });
};
</script>
