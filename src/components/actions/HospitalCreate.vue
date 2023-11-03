<template>
  <div class="form-container h-4/5 overflow-auto">
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
export default {
  name: "CreateHospital",
  created() {
    const store = useStore();
    // Assign the jwtToken from the store to your component's data property
    this.jwtToken = store.jwtToken;
    console.log(this.jwtToken);
  },
  data() {
    return {
      jwtToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTQ0N2QxN2NhMmYzMjBiOWU0NDIxYzIiLCJpYXQiOjE2OTg5OTM5MzguODQsImV4cCI6MTY5ODk5NzUzOC44NH0.y6MefIlCA75flTHT2xYqPyM0_eNgGeFF0OsBo7eR2yc",
      hospitalData: {
        name: "Hospital meddi de prueba 2",
        direccion: "C. Cuauhtémoc 65, La Villa, 45100 Zapopan, Jal.",
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

        if (response.status === 201) {
          const data = await response.json();
          console.log("Hospital created:", data);
        } else {
          console.error("Failed to create hospital:", response.status);
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
