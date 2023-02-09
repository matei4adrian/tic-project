<template>
  <div
    class="flex min-h-full items-center justify-center mt-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Login to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" method="POST" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>
        <div v-if="error" class="text-red-600">{{ error }}</div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            v-if="!isPending"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Login
          </button>

          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            v-if="isPending"
            disabled
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Loading...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const error = ref(null);
const isPending = ref(false);

const handleSubmit = async () => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await axios.post("http://localhost:3000/api/users/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", JSON.stringify(res.data.idToken));

    error.value = null;
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials";
    isPending.value = false;
  }

  if (!error.value) {
    router.push({ name: "companies" });
  }
};
</script>
