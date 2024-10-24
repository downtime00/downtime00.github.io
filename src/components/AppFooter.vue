<template>
  <v-footer height="40" app>
    <UserInfo></UserInfo>
    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 1rem"
    >
      <v-spacer></v-spacer>
      &copy; 2024-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">Misa Project</span>
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from "vue";
import { userinfoStore } from "@/stores/userinfo.store";
import UserInfo from "./UserInfo.vue";
const userinfo = userinfoStore();
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
