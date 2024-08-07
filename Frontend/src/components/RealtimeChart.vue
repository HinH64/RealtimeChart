<template>
  <div>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    sensorName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const series = ref([{
      name: 'Temperature',
      data: []
    }]);

    const chartOptions = ref({
      chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: `Temperature for ${props.sensorName}`,
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Temperature'
        }
      },
      legend: {
        show: false
      },
    });

    let intervalId;

    const fetchSensorData = async () => {
      try {
        const response = await fetch(`/api/sensor?sensorName=${props.sensorName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sensor data');
        }
        const data = await response.json();
        series.value[0].data = data.map(item => ({
          x: new Date(item.createdAt).getTime(),
          y: item.temperature
        }));
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    onMounted(() => {
      fetchSensorData();
      intervalId = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      series,
      chartOptions,
    };
  },
});
</script>