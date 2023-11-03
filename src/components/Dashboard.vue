<template>
  <div class="w-4/5 h-4/5 text-ellipsis">
    <h1>Hospitales</h1>

    <!-- Display the hospital data in a responsive table -->
    <div class="table-container overflow-auto w-full h-full">
      <table class="table bg-white ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Foto</th>
            <th>Logo</th>
            <th>Direccion</th>
            <th>Google Maps URL</th>
            <th>Enabled</th>
            <th>Telefono</th>
            <th>Horario</th>
            <th>Estado Code</th>
            <th>Municipio</th>
            <th>Observaciones</th>
            <th>Aseguradora</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital._id">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.location.coordinates.join(", ") }}</td>
            <td>
              <img :src="hospital.foto" alt="Foto" width="50" height="50" />
            </td>
            <td>
              <img :src="hospital.logo" alt="Logo" width="50" height="50" />
            </td>
            <td>{{ hospital.direccion }}</td>
            <td>
              <a :href="hospital.urlGoogleMaps" target="_blank">Google Maps</a>
            </td>
            <td>{{ hospital.enabled }}</td>
            <td>{{ hospital.telefono }}</td>
            <td>{{ hospital.horario }}</td>
            <td>{{ hospital.estadoCode }}</td>
            <td>{{ hospital.municipio }}</td>
            <td>{{ hospital.observaciones }}</td>
            <td>{{ hospital.aseguradora }}</td>
            <td>{{ hospital.createdAt }}</td>
            <td>{{ hospital.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginator controls -->
    <div class="paginator">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      jwtToken: "",
      hospitals: [], // Array to store hospital data
      currentPage: 1, // Current page
      totalPages: 0, // Total number of pages
      rowsPerPage: 100, // Number of rows per page
    };
  },
  created() {
    // Access the jwtToken from route parameters
    this.jwtToken = this.$route.params.jwtToken;
    this.getHospitals();
  },
  methods: {
    async getHospitals() {
      try {
        const response = await fetch(
          `https://meddi-training.vercel.app/api/v1/hospital/get/all?page=${this.currentPage}&rowsPerPage=${this.rowsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.jwtToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          this.hospitals = data.data.data;
          this.totalPages = data.data.totalPages;
        } else {
          console.error("Failed to fetch hospital data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getHospitals();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getHospitals();
      }
    },
  },
};
</script>
