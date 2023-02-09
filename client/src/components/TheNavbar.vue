<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          v-if="state.isLoggedIn"
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  <div
                    class="block px-4 py-2 text-sm text-gray-700 w-full text-center"
                  >
                    Welcome, {{ user.email }}
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100 w-full' : '',
                      'block px-4 py-2 text-sm text-gray-700 w-full',
                    ]"
                    @click="handleLogout"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div v-else>
          <button
            type="button"
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="handleRegister"
          >
            Register
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="handleLogin"
          >
            Login
          </button>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import axios from "axios";
import { reactive } from "vue";
// import { ref } from "vue";

const getCurrentUser = async () => {
  const res = await axios.get("http://localhost:3000/api/users/currentUser");
  return res.data;
};

const logout = async () => {
  const res = await axios.post("http://localhost:3000/api/users/logout");
  return res;
};

let user = await getCurrentUser();
const state = reactive({ isLoggedIn: !!user });

const router = useRouter();

let curVal = localStorage.getItem("token");
setInterval(async function () {
  const newVal = localStorage.getItem("token");
  if (newVal !== curVal) {
    curVal = newVal;
    user = await getCurrentUser();
    state.isLoggedIn = !!user;
  }
}, 500);

const handleLogout = async () => {
  const res = await logout();
  console.log(res);
  localStorage.removeItem("token");
  router.push({ name: "TheLogin" });
};

const handleRegister = () => {
  router.push({ name: "TheRegister" });
};

const handleLogin = () => {
  router.push({ name: "TheLogin" });
};

const navigation = [{ name: "Companies", href: "/" }];
</script>

<!-- <script>
// challenge
//   - only show the logout button if we are logged in
//   - only show the signup and login links if we are not logged in
//   - use the getUser composable to help
//   import getUser from '../composables/getUser'
//   import useLogout from '../composables/useLogout'
//   import { useRouter } from 'vue-router'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
// import { ref } from "vue";

export default {
  setup() {
    //   const { user } = getUser()
    //   const { logout } = useLogout()
    //   const router = useRouter()
    const handleClick = async () => {
      // await logout()
      console.log("logged out");
      // router.push({ name: 'Login' })
    };

    const navigation = [
      { name: "Home", href: "/", current: true },
      { name: "About", href: "/about", current: false },
    ];

    return {
      navigation,
      handleClick,
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      Bars3Icon,
      BellIcon,
      XMarkIcon,
    };
  },
};
</script> -->
