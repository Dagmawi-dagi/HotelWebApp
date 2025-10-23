<script setup lang="ts">

</script>

<template>
  <div>
    <NuxtTime :datetime="Date.now()" />
    <NuxtLoadingIndicator :color="'red'"/>
    <NavigationsTopNav1/>
    <NuxtRouteAnnouncer/>
    <NuxtPage/>
  </div>
</template>
