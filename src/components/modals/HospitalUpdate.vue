<template>
  <div class="form-container h-4/5 overflow-auto">
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
export default {
  name: "UpdateHospital",
  data() {
    return {
      jwtToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTQ0N2QxN2NhMmYzMjBiOWU0NDIxYzIiLCJpYXQiOjE2OTg5ODk3ODMuOTQ3LCJleHAiOjE2OTg5OTMzODMuOTQ3fQ.XBBd0qLxTUhjmLIZFRCZ6g6eQ8dj4LYeM8Jw6HAYkZM", // Replace with your JWT token
      hospitalData: {
        name: "Hospital meddi zapopan",
        foto: "",
        logo: "",
        direccion: "C. Cuauhtémoc 65, La Villa, 45100 Zapopan, Jal.",
        urlGoogleMaps: "https://maps.app.goo.gl/RiqfseK5FeYE63Kq8",
        enabled: true,
        telefono: "3314244142",
        horario: "Abierto 24 Hrs",
        municipio: "ZAPOPAN",
        observaciones:
          "Este hospital atiende todo tipo de pacientes y cuenta con diversas especialidades",
        long: -103.3947719,
        lat: 20.7244687,
        aseguradora: [4],
        _id: "65417d8ee043617e9cb1d836",
        createdAt: "2023-10-31T22:19:58.417Z",
        updatedAt: "2023-10-31T22:19:58.417Z",
        __v: 0,
      },
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
