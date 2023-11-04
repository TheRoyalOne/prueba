<template>
  <div class="flex flex-col items-center space-y-4">
    <h1 class="text-4xl font-bold text-teal-200">Inicia sesión</h1>
    <div
      class="bg-gradient-to-r from-teal-500 via-sky-600 to-blue-950 rounded-lg p-8 flex space-y-3 flex-col"
    >
      <form
        @submit.prevent="login"
        class="flex flex-col space-y-4 font-semibold text-xl"
      >
        <div class="form-group flex flex-col space-y-2">
          <label for="email" class="text-teal-50">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @input="validateForm"
            :class="{ 'ring-red-500 ring-2': emailError }"
            class="rounded-sm focus:ring-2"
          />
        </div>
        <div class="form-group flex flex-col space-y-2">
          <label for="password" class="text-teal-50">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @input="validateForm"
            class="rounded-sm focus:ring-2"
          />
        </div>
        <button
          class="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300 font-bold rounded-lg py-1 text-teal-50 focus:ring-2 focus:ring-teal-400"
          :class="{ 'hover:bg-teal-600': !submitDisabled }"
          type="submit"
          :disabled="submitDisabled"
        >
          Login
        </button>
      </form>
      <div class="w-full flex justify-end">
        <a class="text-teal-500 underline" href="/signup">Crea una cuenta</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store";
import Swal from "sweetalert2";

export default {
  name: "LogIn",
  created() {
    const store = useStore();
    this.jwtToken = store.jwtToken;
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
    };
  },
  computed: {
    submitDisabled() {
      return !this.email || !this.password || this.emailError;
    },
  },
  methods: {
    validateForm() {
      // Use regular expression to check the email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email);
      this.passwordError = !this.password;
    },
    async login() {
      this.validateForm();

      if (this.emailError || this.passwordError) {
        return;
      }

      const loginData = {
        username: this.email,
        password: this.password,
      };

      try {
        const response = await fetch(
          "https://meddi-training.vercel.app/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          const jwtToken = data.data.jwtToken;
          const store = useStore();
          store.setJwtToken(jwtToken);
          this.$router.push({ path: `/dashboard` });
          Swal.fire({
            title: "Bienvenido",
            text: this.email,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Login Fallido",
            text: "Por favor verifique su información",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error iniciando sesión",
          text: error,
          icon: "error",
        });
      }
    },
  },
};
</script>
