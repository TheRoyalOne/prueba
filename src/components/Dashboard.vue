<template>
  <div class="w-4/5 h-4/5 text-ellipsis">
    <h1>Hospitales</h1>
    <!-- Display the hospital data in a responsive table -->
    <div class="table-container overflow-auto w-full h-full">
      <table class="table bg-white">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Foto</th>
            <th>Logo</th>
            <th>Direccion</th>
            <th>Ubicación</th>
            <th>Telefono</th>
            <th>Horario</th>
            <th>Municipio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital._id">
            <td>{{ hospital.name }}</td>
            <td>
              <img :src="hospital.foto" alt="Foto" width="50" height="50" />
            </td>
            <td>
              <img :src="hospital.logo" alt="Logo" width="50" height="50" />
            </td>
            <td>{{ hospital.direccion }}</td>
            <td>
              <a :href="hospital.urlGoogleMaps" target="_blank"
                >Ubicación en Maps</a
              >
            </td>
            <td>{{ hospital.telefono }}</td>
            <td>{{ hospital.horario }}</td>
            <td>{{ hospital.municipio }}</td>
            <td class="flex space-x-1">
              <button class="bg-green-500 p-2" @click="viewHospital(hospital)">
                <img
                  src="@/assets/eye-solid.svg"
                  alt="SVG Image"
                  class="h-8 w-8"
                />
              </button>
              <button class="bg-orange-500 p-2" @click="editHospital(hospital)">
                <img
                  src="@/assets/pencil-solid.svg"
                  alt="SVG Image"
                  class="h-8 w-8"
                />
              </button>
            </td>
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
  <ModalHospitalUpdate
    :showModal="showModal"
    :selectedHospital="selectedHospital"
    @close-modal="closeModal"
  />
</template>

<script>
import { useStore } from "@/store";
import ModalHospitalUpdate from "@/components/modals/ModalHospitalUpdate.vue"; // Import the ModalHospitalUpdate component here

export default {
  name: "DashBoard",
  components: {
    ModalHospitalUpdate,
  },
  data() {
    return {
      jwtToken: "",
      hospitals: [], // Array to store hospital data
      currentPage: 1, // Current page
      totalPages: 0, // Total number of pages
      rowsPerPage: 100, // Number of rows per page
      showModal: false,
      selectedHospital: null,
    };
  },
  created() {
    const store = useStore();
    // Assign the jwtToken from the store to your component's data property
    this.jwtToken = store.jwtToken;
    console.log(this.jwtToken);
    if (!this.jwtToken) {
      alert("Favor de iniciar sesión");
      this.$router.push({ path: `/` });
    }
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

    // Function to log the complete object when the "View" button is clicked
    viewHospital(hospital) {
      console.log("View Hospital:", hospital);
    },

    // Function to log the complete object when the "Edit" button is clicked

    editHospital(hospital) {
      console.log("Edit Hospital:", hospital);
      console.log(this.showModal);
      this.selectedHospital = hospital;
      this.showModal = true;
    },

    closeModal() {
      this.selectedHospital = null; // Reset the selected hospital
      this.showModal = false; // Close the modal
    },
  },
};
</script>
