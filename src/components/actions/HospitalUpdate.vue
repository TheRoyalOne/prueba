<template>
  <div
    class="form-container h-full overflow-auto bg-opacity-0 p-2 rounded-lg shadow-md items-center w-fit"
  >
    <div
      class="sticky top-0 z-10 rounded-lg p-4 font-bold bg-gradient-to-r from-stone-500 via-gray-600 to-indigo-800 bg-opacity-40 text-white text-xl flex justify-center pb-4"
    >
      <h1 v-if="selectedModal === 'edit'" class="w-fit text-white">
        Editando: {{ hospitalData.name }}
      </h1>
      <h1
        v-if="selectedModal === 'view'"
        class="w-fit text-ellipsis text-white"
      >
        {{ hospitalData.name }}
      </h1>
    </div>
    <form @submit.prevent="updateHospital" class="text-xl">
      <div class="form-group pb-3">
        <label for="name" class="font-bold text-teal-100">Nombre</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="name"
          v-model="hospitalData.name"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group pb-3">
        <label for="direccion" class="font-bold text-teal-100">Dirección</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="direccion"
          v-model="hospitalData.direccion"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group pb-3">
        <label for="urlGoogleMaps" class="font-bold text-teal-100"
          >Google Maps URL</label
        >
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="urlGoogleMaps"
          v-model="hospitalData.urlGoogleMaps"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group pb-3">
        <label for="telefono" class="font-bold text-teal-100">Telefono</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="telefono"
          v-model="hospitalData.telefono"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group pb-3">
        <label for="horario" class="font-bold text-teal-100">Horario</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="horario"
          v-model="hospitalData.horario"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group pb-3">
        <label for="municipio" class="font-bold text-teal-100">Municipio</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="municipio"
          v-model="hospitalData.municipio"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group pb-3">
        <label for="observaciones" class="font-bold text-teal-100"
          >Observaciones</label
        >
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="observaciones"
          v-model="hospitalData.observaciones"
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group pb-3">
        <label for="long" class="font-bold text-teal-100">Longitud</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="long"
          v-model="hospitalData.long"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group pb-3">
        <label for="lat" class="font-bold text-teal-100">Latitud</label>
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="lat"
          v-model="hospitalData.lat"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group pb-3">
        <label for="aseguradora" class="font-bold text-teal-100"
          >Aseguradora</label
        >
        <input
          class="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          id="aseguradora"
          v-model="hospitalData.aseguradora"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>

      <div v-if="selectedModal === 'view'">
        <div class="form-group pb-3">
          <label for="createdAt" class="font-bold text-teal-100"
            >Fecha de creación</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="createdAt"
            v-model="hospitalData.createdAt"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group pb-3">
          <label for="updatedAt" class="font-bold text-teal-100"
            >Fecha de Actualización</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="updatedAt"
            v-model="hospitalData.updatedAt"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group pb-3">
          <label for="Logo" class="font-bold text-teal-100">Logo</label>
          <div class="w-full flex justify-center">
            <img :src="hospitalData.logo" alt="Logo" class="max-w-full" />
          </div>
        </div>
        <div class="form-group pb-3">
          <label for="foto" class="font-bold text-teal-100">Foto</label>
          <div class="w-full flex justify-center">
            <img :src="hospitalData.foto" alt="foto" class="w-1/2" />
          </div>
        </div>
        <div class="form-group pb-3">
          <label for="enabled" class="font-bold text-teal-100">Activo</label>
          <input
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="enabled"
            v-model="hospitalData.enabled"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group pb-3">
          <label for="estadoCode" class="font-bold text-teal-100"
            >Código de Estado</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="estadoCode"
            v-model="hospitalData.estadoCode"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group pb-3">
          <label for="horario" class="font-bold text-teal-100">Horario</label>
          <input
            class="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="horario"
            v-model="hospitalData.horario"
            :disabled="selectedModal === 'view'"
          />
        </div>
      </div>
      <div v-if="selectedModal === 'edit'">
        <button
          type="submit"
          class="w-full bg-gradient-to-r p-4 from-teal-700 via-teal-500 to-teal-300 hover:bg-teal-600 font-bold rounded-lg py-1 text-teal-50 focus:ring-2 focus:ring-teal-400"
        >
          Actualizar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "@/store";
import Swal from "sweetalert2";
export default {
  name: "UpdateHospital",

  props: {
    hospital: Object,
    modal: String,
  },
  created() {
    const store = useStore();
    this.jwtToken = store.jwtToken;
  },
  data() {
    return {
      jwtToken: this.jwtToken,
      hospitalData: { ...this.hospital },
      selectedModal: this.modal,
    };
  },
  methods: {
    async updateHospital() {
      try {
        const response = await fetch(
          `https://meddi-training.vercel.app/api/v1/hospital/update/${this.hospitalData._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${this.jwtToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.hospitalData),
          }
        );
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            title: `Hospital ${this.hospitalData.name} actualizado`,
            icon: "success",
          });
          this.$emit("hospital-updated");
        } else {
          Swal.fire({
            title: `Error actualizando hospital ${this.hospitalData.name}`,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: `Error encontrado`,
          icon: "error",
        });
      }
    },
  },
};
</script>
