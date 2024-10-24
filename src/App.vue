<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { userinfoStore } from "./stores/userinfo.store";
import { ApiService } from "@/services/api.service";

onMounted(() => {
  const userinfo = userinfoStore();
  ApiService.init();
  userinfo.init();
});
</script>
