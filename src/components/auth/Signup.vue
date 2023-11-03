<template>
  <div class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @input="validateForm"
          :class="{ error: usernameError }"
        />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          @input="validateForm"
          :class="{ error: nameError }"
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
      <div class="form-group">
        <label for="cellphone">Cellphone:</label>
        <input
          type="tel"
          id="cellphone"
          v-model="cellphone"
          @input="validateForm"
          :class="{ error: cellphoneError }"
        />
      </div>
      <button class="bg-red-400" type="submit" :disabled="submitDisabled">
        Signup
      </button>
    </form>
    <a class="text-blue-500" href="/">Have an a account?</a>
  </div>
</template>

<script>
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
      this.usernameError = !this.username;
      this.nameError = !this.name;
      this.passwordError = !this.password;
      this.cellphoneError = !this.cellphone;
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
          const data = await response.json();
          console.log(data);
          alert("Se ha creado el usuario correctamente");
          this.$router.push({ path: `/` });
        } else {
          alert("There was an error with the request.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
