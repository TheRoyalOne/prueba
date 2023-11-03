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
export default {
  name: "LogIn",
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
          console.log(data);
          const jwtToken = data.data.jwtToken;
          console.log(jwtToken);
          this.$router.push({ path: `/dashboard/${jwtToken}` });
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
