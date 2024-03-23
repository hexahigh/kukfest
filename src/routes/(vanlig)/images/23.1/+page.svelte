<script>
  import Nav from "$lib/components/nav.svelte";
  import ImagesNav from "$lib/components/images-nav.svelte";

  const pictureModules = import.meta.glob(
    "$lib/img/image-archive/23.1/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    {
      eager: true,
      query: {
        enhanced: true,
      },
    }
  );

  const pictures = Object.values(pictureModules).map(
    (module) => module.default
  );

  // Distribute the images as evenly as possible into 4 columns
  let columns = [[], [], [], []];
  for (let i = 0; i < pictures.length; i++) {
    columns[i % columns.length].push(pictures[i]);
  }
  console.log(columns);
</script>

<ImagesNav />

<div>
  <div class="row">
    {#each columns as column, columnIndex}
      <div class="column">
        {#each column as image, index}
          <enhanced:img
            class="image-item rounded"
            src={image}
            alt="High Resolution Image"
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create four equal columns that sits next to each other */
  .column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
  }

  .column img {
    margin-top: 8px;
    vertical-align: middle;
    width: 100%;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .column {
      flex: 50%;
      max-width: 50%;
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }
</style>
