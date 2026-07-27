<template>
  <main
    class="flex flex-1 h-screen items-center justify-center bg-monday-background p-6"
  >
    <div
      class="flex w-full max-w-[1040px] max-h-[92vh] rounded-[32px] shadow-xl overflow-hidden bg-white"
    >
      <div
        class="flex flex-col w-full lg:w-[460px] shrink-0 px-10 lg:px-14 py-9 gap-7 justify-center overflow-y-auto"
      >
        <div class="flex items-center gap-3">
          <img
            src="../../assets/images/logos/logo.png"
            class="size-16 shrink-0 object-contain -my-2"
            alt="Bakedbyerina"
          />
          <div class="flex flex-col leading-tight">
            <span
              class="font-extrabold text-2xl tracking-tight text-monday-black"
            >
              Baked<span class="italic text-monday-blue">byErina</span>
            </span>
            <span
              class="font-semibold text-[11px] uppercase tracking-[0.16em] text-monday-gray"
            >
              Manage Stock and Merchants
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-3">
            <h1 class="font-extrabold text-4xl leading-tight">
              Holla,<br />Welcome Back
            </h1>
            <p class="font-medium text-monday-gray">
              Hey, welcome back to your special place
            </p>
          </div>

          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
            <div class="flex flex-col gap-4">
              <input
                v-model="form.username"
                type="email"
                placeholder="Email Address"
                required
                :disabled="loading"
                class="w-full h-[56px] px-5 rounded-2xl border-[1.5px] border-monday-border font-medium placeholder:text-monday-gray focus:border-monday-black outline-none transition-300 disabled:opacity-50"
              />
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  required
                  :disabled="loading"
                  class="w-full h-[56px] px-5 pr-14 rounded-2xl border-[1.5px] border-monday-border font-medium placeholder:text-monday-gray focus:border-monday-black outline-none transition-300 disabled:opacity-50"
                />
                <button
                  type="button"
                  @click="togglePassword"
                  tabindex="-1"
                  class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  <img
                    :src="eyeGreyIcon"
                    class="size-5 shrink-0"
                    alt="toggle password visibility"
                  />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="size-4 rounded accent-monday-blue cursor-pointer"
                />
                <span class="font-medium text-sm text-monday-gray"
                  >Remember me</span
                >
              </label>
              <a
                href="#"
                class="font-medium text-sm text-monday-blue hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full font-bold"
              :disabled="loading"
            >
              {{ loading ? "Signing in..." : "Sign In" }}
            </button>
          </form>

          <p class="font-medium text-sm text-monday-gray">
            Don't have an account?
            <a href="#" class="font-semibold text-monday-blue hover:underline"
              >Sign Up</a
            >
          </p>
        </div>
      </div>

      <div class="hidden lg:flex flex-1 overflow-hidden">
        <img
          src="../../assets/images/backgrounds/bg-salt-bread.png"
          class="size-full object-cover object-left-top"
          alt="image"
        />
      </div>
    </div>
  </main>
</template>

<script>
import eyeGreyIcon from "@/assets/images/icons/eye-grey.svg";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Login",
  data() {
    return {
      eyeGreyIcon,
      form: {
        username: "",
        password: "",
      },
      loading: false,
      showPassword: false,
      rememberMe: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const authStore = useAuthStore();
        await authStore.login(this.form);

        const redirectUrl = authStore.getRedirectUrl();
        this.$router.push(redirectUrl);
      } catch (error) {
        this.errorMessage =
          error.message || "An error occurred while logging in";
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
