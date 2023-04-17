<template>
  <div>
    <div class="bg-slate-200 p-5 border-b border-t border-black text-lg mb-10">
      <nav class="flex max-w-6xl mx-auto justify-between items-center">
        <div>
          <h1 class="cursor-pointer" @click="$router.push({ name: 'home' })">
            EuroSkills Concerts
          </h1>
        </div>

        <div class="flex items-center">
          <h1>Already Booked?</h1>
          <button
            class="ml-4 bg-white px-2 py-1 rounded border border-black hover:bg-slate-100"
          >
            Get Tickets
          </button>
        </div>
      </nav>
    </div>
    <header>
      <h1 class="text-2xl text-center mb-5">
        {{ headerText }}
      </h1>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    headerText: {
      type: String,
    },
  },
};
</script>

<style></style>
