<template>
  <Suspense>
    <TheNavbar />
  </Suspense>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
export default {
  components: { TheNavbar },
};
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
