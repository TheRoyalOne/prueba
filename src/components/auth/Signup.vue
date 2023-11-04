<template>
  <div class="flex flex-col items-center first-letter:space-y-4">
    <h1 class="text-4xl font-bold text-teal-200 pb-4">Signup</h1>
    <div
      class="bg-gradient-to-r from-teal-500 via-sky-600 to-blue-950 rounded-lg p-8 flex space-y-3 flex-col"
    >
      <form
        @submit.prevent="signup"
        class="flex flex-col space-y-4 font-semibold"
      >
        <div class="form-group flex flex-col space-y-2">
          <label for="username" class="text-teal-50">Username:</label>
          <input
            type="mail"
            id="username"
            v-model="username"
            @input="validateForm"
            class="rounded-sm"
            :class="{ 'bg-red-200': usernameError }"
          />
        </div>
        <div class="form-group flex flex-col space-y-2">
          <label for="name" class="text-teal-50">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            @input="validateForm"
            class="rounded-sm"
            :class="{ 'bg-red-200': nameError }"
          />
        </div>
        <div class="form-group flex flex-col space-y-2">
          <label for="password" class="text-teal-50">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @input="validateForm"
            class="rounded-sm"
            :class="{ 'bg-red-200': passwordError }"
          />
        </div>
        <div class="form-group flex flex-col space-y-2">
          <label for="cellphone" class="text-teal-50">Cellphone:</label>
          <input
            type="tel"
            id="cellphone"
            v-model="cellphone"
            class="rounded-sm"
            @input="validateForm"
            :class="{ 'bg-red-200': cellphoneError }"
          />
        </div>
        <button
          class="bg-gradient-to-r from-teal-700 via-teal-500 to-teal-300  font-bold rounded-lg py-1 text-teal-50 focus:ring-2 focus:ring-teal-400"
          type="submit"
          :class="{ 'hover:bg-teal-600': !submitDisabled }"
          :disabled="submitDisabled"
        >
          Signup
        </button>
      </form>
      <div class="w-full flex justify-end space-x-2">
        <a class="text-teal-50" href="/">Have an a account?</a>
        <a href="/" class="text-teal-500 underline">Log In</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      name: "",
      password: "",
      cellphone: "",
      usernameError: false,
      nameError: false,
      passwordError: false,
      cellphoneError: false,
    };
  },
  computed: {
    submitDisabled() {
      return !this.username || !this.name || !this.password || !this.cellphone;
    },
  },
  methods: {
    validateForm() {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      const cellphoneRegex = /^[0-9]{10}$/;
      this.usernameError = !emailRegex.test(this.username);
      this.nameError = !this.name;
      this.passwordError = !this.password;
      this.cellphoneError = !cellphoneRegex.test(this.cellphone);
      console.log("user: ", this.usernameError);
      console.log("name: ", this.nameError);
      console.log("pass: ", this.passwordError);
      console.log("cell: ", this.cellphoneError);
    },
    async signup() {
      this.validateForm();

      if (
        this.usernameError ||
        this.nameError ||
        this.passwordError ||
        this.cellphoneError
      ) {
        return;
      }

      const signupData = {
        username: this.username,
        name: this.name,
        password: this.password,
        cellphone: this.cellphone,
      };

      try {
        const response = await fetch(
          "https://meddi-training.vercel.app/api/v1/user/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Usuario creado",
            text: "Inicie sesión",
            icon: "success",
          });
          this.$router.push({ path: `/` });
        } else {
          Swal.fire({
            title: "Error creando usuario",
            text: "Verifique sus datos ingresados",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error encontrado",
          text: error,
          icon: "error",
        });
      }
    },
  },
};
</script>
