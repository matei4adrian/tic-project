<template>
  <Suspense>
    <TheNavbar />
  </Suspense>
  <Suspense>
    <div class="content">
      <router-view />
    </div>
  </Suspense>
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
