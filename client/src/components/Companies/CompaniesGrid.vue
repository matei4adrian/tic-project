<template>
  <div class="max-h-[35rem] overflow-y-auto bg-gray-100 rounded-2xl">
    <div class="py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Companies</h1>
            <p class="mt-2 text-sm text-gray-700">A list of all companies</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              @click="handleAdd"
            >
              Add company
            </button>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
              <div class="shadow-sm ring-1 ring-black ring-opacity-5">
                <table
                  class="min-w-full border-separate"
                  style="border-spacing: 0"
                >
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span class="sr-only">Buttons</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      v-for="(company, companyIdx) in state.companies"
                      :key="company.id"
                    >
                      <td
                        :class="[
                          companyIdx !== companies.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                        ]"
                      >
                        {{ company.name }}
                      </td>
                      <td
                        :class="[
                          companyIdx !== companies.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                        ]"
                      >
                        {{ company.phoneContact }}
                      </td>
                      <td
                        :class="[
                          companyIdx !== companies.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                        ]"
                      >
                        {{ company.address }}
                      </td>
                      <td
                        :class="[
                          companyIdx !== companies.length - 1
                            ? 'border-b border-gray-200'
                            : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                        ]"
                      >
                        <button
                          type="button"
                          class="inline-flex items-center text-blue-500 shadow-sm hover:text-blue-700"
                          @click="handleViewOrders(company.id)"
                        >
                          <EyeIcon class="h-5 w-5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          class="inline-flex items-center text-indigo-500 shadow-sm hover:text-indigo-700 ml-3"
                          @click="handleEdit(company.id)"
                        >
                          <PencilIcon class="h-5 w-5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          class="inline-flex items-center text-red-500 shadow-sm hover:text-red-700 ml-3"
                          @click="handleDelete(company.id)"
                        >
                          <TrashIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/vue/20/solid";
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleAdd = () => {
  router.push({ name: "CreateCompany" });
};

const handleEdit = (companyId) => {
  router.push({ name: "EditCompany", params: { id: companyId } });
};

const handleViewOrders = (companyId) => {
  router.push({ name: "OrdersGrid", params: { id: companyId } });
};

const getCompanies = async () => {
  const res = await axios.get("http://localhost:3000/api/companies/");
  return res.data;
};
const companies = await getCompanies();
const state = reactive({ companies: companies });

const handleDelete = async (companyId) => {
  const token = localStorage.getItem("token").slice(1, -1);
  const res = await axios.delete(
    `http://localhost:3000/api/companies/${companyId}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res.data.message);
  state.companies = await getCompanies();
};
</script>
