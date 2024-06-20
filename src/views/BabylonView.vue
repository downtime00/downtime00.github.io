<template>
  <div class="babylon">
    <BabylonScene />
  </div>
</template>

<script>
// @ is an alias to /src
import BabylonScene from "@/components/BabylonScene.vue";

export default {
  name: "BabylonView",
  components: {
    BabylonScene,
  },
};
</script>
