<template>
  <div class="w-4/5 h-full py-4 text-ellipsis flex flex-col space-y-3">
    <div class="w-full flex">
      <h1 class="flex-grow text-4xl font-bold text-teal-200">Hospitales</h1>
      <button
        class="bg-gradient-to-r from-teal-500 via-sky-600 to-blue-950 p-2 flex space-x-1 items-center rounded-md hover:bg-teal-600 font-bold py-1 text-teal-50 focus:ring-2 focus:ring-teal-400"
        @click="createHospital()"
      >
        <h1 class="font-bold text-teal-50">Nuevo</h1>
        <img
          src="@/assets/hospital-regular.svg"
          alt="SVG Image"
          class="h-8 w-8"
        />
      </button>
    </div>
    <div class="table-container overflow-auto w-full h-5/6 rounded-lg">
      <table
        class="table bg-sky-50 text-gray-600 font-bold w-full rounded-lg p-1"
      >
        <thead
          class="sticky top-0 bg-emerald-200 text-black z-10 rounded-lg p-4 text-xl"
        >
          <tr class="text-center">
            <th class="px-2">Nombre</th>
            <th class="px-2">Foto</th>
            <th class="px-2">Logo</th>
            <th class="px-2">Dirección</th>
            <th class="px-2">Ubicación</th>
            <th class="px-2">Telefono</th>
            <th class="px-2">Horario</th>
            <th class="px-2">Municipio</th>
            <th class="px-2">Acciones</th>
          </tr>
        </thead>
        <tbody class="p-4">
          <tr
            v-for="hospital in hospitals"
            :key="hospital._id"
            class="my-2 border-b-2 border-teal-100"
          >
            <td class="px-4 text-center">{{ hospital.name }}</td>
            <td class="px-4 text-center">
              <img
                class="w-28"
                :src="
                  hospital.foto
                    ? hospital.foto
                    : require('@/assets/placeholder.png')
                "
                alt="Foto de Hospital"
              />
            </td>
            <td class="text-center">
              <img
                :src="
                  hospital.logo
                    ? hospital.logo
                    : require('@/assets/placeholder.png')
                "
                alt="Logo de Hospital"
              />
            </td>
            <td class="px-4 text-center">{{ hospital.direccion }}</td>
            <td class="px-4 text-center">
              <a :href="hospital.urlGoogleMaps" target="_blank"
                >Ubicación en Maps</a
              >
            </td>
            <td class="px-4 text-center">{{ hospital.telefono }}</td>
            <td class="px-4 text-center">{{ hospital.horario }}</td>
            <td class="px-4 text-center">{{ hospital.municipio }}</td>
            <td class="content-center">
              <div class="flex space-x-2">
                <button
                  class="bg-green-500 p-2 rounded-full"
                  @click="viewHospital(hospital)"
                >
                  <img
                    src="@/assets/eye-solid.svg"
                    alt="SVG Image"
                    class="h-6 w-6"
                  />
                </button>
                <button
                  class="bg-orange-500 p-2 rounded-full"
                  @click="editHospital(hospital)"
                >
                  <img
                    src="@/assets/pencil-solid.svg"
                    alt="SVG Image"
                    class="h-6 w-6"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="paginator flex p-2 text-teal-100 space-x-2 justify-end">
      <button @click="prevPage" :disabled="currentPage === 1">
        <img src="@/assets/previous.svg" alt="SVG Image" class="h-6 w-6" />
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <img src="@/assets/next.svg" alt="SVG Image" class="h-6 w-6" />
      </button>
    </div>
  </div>
  <ModalHospitalUpdate
    :showModal="showModal"
    :selectedHospital="selectedHospital"
    :selectedModal="selectedModal"
    @close-modal="closeModal"
  />
  <ModalHospitalCreate :showModal="showCreateModal" @close-modal="closeModal" />
</template>

<script>
import { useStore } from "@/store";
import ModalHospitalUpdate from "@/components/modals/ModalHospitalUpdate.vue";
import ModalHospitalCreate from "./modals/ModalHospitalCreate.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  name: "DashBoard",
  components: {
    ModalHospitalUpdate,
    ModalHospitalCreate,
  },
  data() {
    return {
      jwtToken: "",
      hospitals: [],
      currentPage: 1,
      totalPages: 0,
      rowsPerPage: 10,
      showModal: false,
      showCreateModal: false,
      selectedModal: "",
      selectedHospital: null,
    };
  },
  created() {
    const store = useStore();
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
          Swal.fire({
            title: `Error obteniendo hospitales`,
            text: this.response.status,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error obteniendo hospitales`,
          text: error,
          icon: "error",
        });
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
    viewHospital(hospital) {
      this.selectedHospital = hospital;
      this.selectedModal = "view";
      this.showModal = true;
    },

    editHospital(hospital) {
      this.selectedHospital = hospital;
      this.selectedModal = "edit";
      this.showModal = true;
    },

    createHospital() {
      this.showCreateModal = true;
    },

    closeModal() {
      this.selectedHospital = null;
      this.showModal = false;
      this.showCreateModal = false;
      this.getHospitals();
    },
  },
};
</script>
<style>
.table-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.table-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
