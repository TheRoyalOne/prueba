<template>
  <div class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          @input="validateForm"
          :class="{ error: emailError }"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @input="validateForm"
          :class="{ error: passwordError }"
        />
      </div>
      <button class="bg-red-400" type="submit" :disabled="submitDisabled">
        Login
      </button>
    </form>
    <a class="text-blue-500" href="/signup">Create account</a>
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
      return !this.email || !this.password;
    },
  },
  methods: {
    validateForm() {
      this.emailError = !this.email;
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
            position: "top-right",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Login Fallido",
            text: "Porfavor verifique su información",
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
