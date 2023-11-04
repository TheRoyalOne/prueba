<template>
  <div
    class="form-container h-full overflow-auto bg-white p-4 rounded-lg shadow-md"
  >
    <h1>Crea Hospital</h1>
    <form @submit.prevent="createHospital">
      <div class="form-group mb-4">
        <label for="name" class="font-bold">Nombre</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="name"
          v-model="hospitalData.name"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="direccion" class="font-bold">Dirección</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="direccion"
          v-model="hospitalData.direccion"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="telefono" class="font-bold">Telefono</label>
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
          id="telefono"
          v-model="hospitalData.telefono"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="horario" class="font-bold">Horario</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="horario"
          v-model="hospitalData.horario"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="urlGoogleMaps" class="font-bold">Google Maps URL</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="urlGoogleMaps"
          v-model="hospitalData.urlGoogleMaps"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="long" class="font-bold">Longitud</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="long"
          v-model="hospitalData.long"
          required
        />
      </div>
      <div class="form-group mb-4">
        <label for="lat" class="font-bold">Latitud</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="lat"
          v-model="hospitalData.lat"
          required
        />
      </div>
      <button
        class="w-full p-2 border bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300 hover:bg-teal-600 font-bold rounded-lg py-1 text-teal-50 focus:ring-2 focus:ring-teal-400"
        type="submit"
      >
        Crear Hospital
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from "@/store";
import Swal from "sweetalert2";

export default {
  name: "CreateHospital",
  created() {
    const store = useStore();
    this.jwtToken = store.jwtToken;
  },
  data() {
    return {
      jwtToken: this.jwtToken,
      hospitalData: {
        name: "Nuevo Hospital",
        direccion: "Prueba 65, La Villa, 45100 Guadalajara, Jal.",
        telefono: "3314244142",
        horario: "Abierto 24 Hrs",
        urlGoogleMaps: "https://maps.app.goo.gl/RiqfseK5FeYE63Kq8",
        long: "-103.3947719",
        lat: "20.7244687",
      },
    };
  },
  methods: {
    async createHospital() {
      try {
        const response = await fetch(
          "https://meddi-training.vercel.app/api/v1/hospital/create",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.hospitalData),
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: `Hospital ${this.hospitalData.name} creado`,
            icon: "success",
          });
          this.$emit("hospital-created");
        } else {
          Swal.fire({
            title: `Error creando hospital ${this.hospitalData.name}`,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error encontrado `,
          text: error,
          icon: "error",
        });
      }
    },
  },
};
</script>
