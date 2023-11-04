<template>
  <div class="form-container h-full overflow-auto">
    <h1 v-if="selectedModal === 'edit'">Modifica Hospital</h1>
    <h1 v-if="selectedModal === 'view'">Ver Hospital</h1>
    <form @submit.prevent="updateHospital">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          v-model="hospitalData.name"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          v-model="hospitalData.direccion"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group">
        <label for="urlGoogleMaps">Google Maps URL</label>
        <input
          type="text"
          id="urlGoogleMaps"
          v-model="hospitalData.urlGoogleMaps"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group">
        <label for="telefono">Telefono</label>
        <input
          type="text"
          id="telefono"
          v-model="hospitalData.telefono"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group">
        <label for="horario">Horario</label>
        <input
          type="text"
          id="horario"
          v-model="hospitalData.horario"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group">
        <label for="municipio">Municipio</label>
        <input
          type="text"
          id="municipio"
          v-model="hospitalData.municipio"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>
      <div class="form-group">
        <label for="observaciones">Observaciones</label>
        <input
          type="text"
          id="observaciones"
          v-model="hospitalData.observaciones"
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group">
        <label for="long">Longitud</label>
        <input
          type="text"
          id="long"
          v-model="hospitalData.long"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group">
        <label for="lat">Latitud</label>
        <input
          type="text"
          id="lat"
          v-model="hospitalData.lat"
          required
          :disabled="selectedModal === 'view'"
        />
      </div>
      <div class="form-group">
        <label for="aseguradora">Aseguradora</label>
        <input
          type="text"
          id="aseguradora"
          v-model="hospitalData.aseguradora"
          :disabled="selectedModal === 'view'"
          required
        />
      </div>

      <div v-if="selectedModal === 'view'">
        <div class="form-group">
          <label for="createdAt">Fecha de creación</label>
          <input
            type="text"
            id="createdAt"
            v-model="hospitalData.createdAt"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group">
          <label for="updatedAt">Fecha de Actualización</label>
          <input
            type="text"
            id="updatedAt"
            v-model="hospitalData.updatedAt"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group">
          <label for="Logo">Logo</label>
          <img :src="hospitalData.logo" alt="Logo" width="50" height="50" />
        </div>
        <div class="form-group">
          <label for="foto">Foto</label>
          <img :src="hospitalData.foto" alt="foto" width="50" height="50" />
        </div>
        <div class="form-group">
          <label for="enabled">Activo</label>
          <input
            type="text"
            id="enabled"
            v-model="hospitalData.enabled"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group">
          <label for="estadoCode">Código de Estado</label>
          <input
            type="text"
            id="estadoCode"
            v-model="hospitalData.estadoCode"
            :disabled="selectedModal === 'view'"
          />
        </div>
        <div class="form-group">
          <label for="horario">Horario</label>
          <input
            type="text"
            id="horario"
            v-model="hospitalData.horario"
            :disabled="selectedModal === 'view'"
          />
        </div>
      </div>
      <div v-if="selectedModal === 'edit'">
        <button type="submit">Actualizar </button>
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

<style scoped>
.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
