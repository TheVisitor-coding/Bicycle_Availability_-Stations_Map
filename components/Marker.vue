<template>
  <LMarker :lat-lng="[stationInfo.lat, stationInfo.long]">
    <LIcon :icon-url="bicyclePin" :icon-size="[40, 40]"></LIcon>
    <LPopup>
      <div class="space-y-2 w-auto p-4">
        <!-- Header -->
        <div class="flex justify-between gap-4 w-fit items-center border-b pb-2 mb-2">
          <div class="w-fit">
            <h3 class="text-lg font-semibold text-gray-800 text-nowrap">{{ stationInfo.name }}</h3>
            <p class="text-sm text-gray-500 text-nowrap">{{ stationInfo.address }}</p>
          </div>
          <span
            class="px-3 py-1 text-xs font-bold rounded-full"
            :class="stationInfo.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
          >
            {{ stationInfo.status }}
          </span>
        </div>

        <!-- Stats -->
        <div class="space-y-1">
          <p class="flex justify-between text-sm">
            <span class="font-medium">Total Places:</span>
            <span>{{ stationInfo.bikesStands }}</span>
          </p>
          <p class="flex justify-between text-sm">
            <span class="font-medium">Vélos Disponibles:</span>
            <span>{{ stationInfo.availableBikes }}</span>
          </p>
          <p class="flex justify-between text-sm">
            <span class="font-medium">Places Disponibles:</span>
            <span>{{ stationInfo.availableBikeStands }}</span>
          </p>
        </div>

        <!-- Footer -->
        <p class="text-xs text-gray-400 mt-2">
          Dernière mise à jour: {{ new Date(stationInfo.lastUpdate).toLocaleString() }}
        </p>
      </div>
    </LPopup>
  </LMarker>
   
</template>

<script lang="ts" setup>
  const props = defineProps({
    station: {
      type: Object as PropType<Station>,
      required: true
    }
  })

  const bicyclePin = '/placeholder.png'

  const stationInfo = {
    lat: props.station.position.lat,
    long: props.station.position.lon,
    name: props.station.name,
    address: props.station.address,
    status: props.station.status,
    bikesStands: props.station.bike_stands,
    availableBikes: props.station.available_bikes,
    availableBikeStands: props.station.available_bike_stands,
    lastUpdate: props.station.last_update
  }

</script>