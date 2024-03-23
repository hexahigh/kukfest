<script>
  import Footer from "$lib/components/footer.svelte";
  import Nav from "$lib/components/nav2.svelte";
</script>

<main class="dark:bg-ctp-base dark:text-white">
  <Nav />
  
  <slot />

  <Footer />
</main>