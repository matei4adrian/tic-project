<template>
  <div class="p-5 mt-20">
    <Suspense>
      <CompaniesGrid />
    </Suspense>
  </div>
</template>

<script>
// @ is an alias to /src
import CompaniesGrid from "@/components/Companies/CompaniesGrid.vue";

export default {
  name: "CompaniesView",
  components: {
    CompaniesGrid,
  },
};
</script>
