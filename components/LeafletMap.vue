<template>
  <div class="z-[5000000] h-screen w-screen absolute flex flex-col items-center justify-center" v-if="status === 'pending'">
    <span class="loader"></span>
    <p class="text-lg font-semibold text-gray-800">Actualisation des stations...</p>
  </div>

  <div v-else-if="status === 'error'">
    <p>{{ error }}</p>
  </div>

  <div v-else>
    <LMap class=" z-10" draggable="false" :use-global-leaflet="false" style="height: 100vh" :zoom="14" :minZoom="14" :center="[47.216671, -1.55]">
      <LControl position="topleft">
        <USelect class="bg-white color-black rounded-xl" variant="outline" @change="handleChange" v-model="selectedOption" :options="options" />
      </LControl>
  
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <span v-for="station in stationsArray" :key="station.number">
        <Marker :station="station" />
      </span>
    </LMap>
  </div>
</template>

<script lang="ts" setup>
  interface StationData {
    results: Station[];
  }

  const { data, error, status, refresh } = await useFetch<StationData>('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_stations-velos-libre-service-nantes-metropole-disponibilites/records?limit=100')
  let stationsArray = ref<Station[]>(data.value?.results || []);

  const handleChange = () => {
    if (data.value) {
      if (selectedOption.value === "availableStands") {
        stationsArray.value = data.value.results.filter((station) => station.available_bike_stands > 0)
      } else if (selectedOption.value === "availableBikes") {
        stationsArray.value = data.value.results.filter((station) => station.available_bikes > 0)
      } else {
        stationsArray.value = data.value.results
      }
    }
  }
  
  onMounted(() => {
    setInterval(() => {
      refresh()
    }, 60000)
  })
  
  const options = [{
    value: 'all',
    label: 'Toutes les stations'
  }, {
    value: 'availableStands',
    label: 'Stations avec places disponibles'
  }, {
    value: 'availableBikes',
    label: 'Stations avec vélos disponibles'
  }]
  
  const selectedOption = ref('all')
  watch(selectedOption, handleChange)

</script>
