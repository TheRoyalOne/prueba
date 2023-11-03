<template>
  <div class="form-container h-full overflow-auto">
    <h1>Update Hospital</h1>
    <form @submit.prevent="updateHospital">
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
        <label for="urlGoogleMaps">Google Maps URL</label>
        <input
          type="text"
          id="urlGoogleMaps"
          v-model="hospitalData.urlGoogleMaps"
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
        <label for="municipio">Municipio</label>
        <input
          type="text"
          id="municipio"
          v-model="hospitalData.municipio"
          required
        />
      </div>
      <div class="form-group">
        <label for="observaciones">Observaciones</label>
        <input
          type="text"
          id="observaciones"
          v-model="hospitalData.observaciones"
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
      <div class="form-group">
        <label for="aseguradora">Aseguradora</label>
        <input
          type="text"
          id="aseguradora"
          v-model="hospitalData.aseguradora"
          required
        />
      </div>
      <button type="submit">Update Hospital</button>
    </form>
  </div>
</template>

<script>
import { useStore } from "@/store";
export default {
  name: "UpdateHospital",

  props: {
    hospital: Object,
  },
  created() {
    const store = useStore();
    this.jwtToken = store.jwtToken;
    console.log(this.jwtToken);
  },
  data() {
    return {
      jwtToken: this.jwtToken,
      hospitalData: { ...this.hospital },
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
          const data = await response.json();
          console.log("Hospital updated:", data);
        } else {
          console.error("Failed to update hospital:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
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
