<template>
  <div class="form-container h-full overflow-auto">
    <h1>Create Hospital</h1>
    <form @submit.prevent="createHospital">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="hospitalData.name" required />
      </div>
      <div class="form-group">
        <label for="direccion">Direccion</label>
        <input
          type="text"
          id="direccion"
          v-model="hospitalData.direccion"
          required
        />
      </div>
      <div class="form-group">
        <label for="telefono">Telefono</label>
        <input
          type="text"
          id="telefono"
          v-model="hospitalData.telefono"
          required
        />
      </div>
      <div class="form-group">
        <label for="horario">Horario</label>
        <input
          type="text"
          id="horario"
          v-model="hospitalData.horario"
          required
        />
      </div>
      <div class="form-group">
        <label for="urlGoogleMaps">Google Maps URL</label>
        <input
          type="text"
          id="urlGoogleMaps"
          v-model="hospitalData.urlGoogleMaps"
          required
        />
      </div>
      <div class="form-group">
        <label for="long">Longitude</label>
        <input type="text" id="long" v-model="hospitalData.long" required />
      </div>
      <div class="form-group">
        <label for="lat">Latitude</label>
        <input type="text" id="lat" v-model="hospitalData.lat" required />
      </div>
      <button type="submit">Create Hospital</button>
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
