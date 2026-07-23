<template>
  <Layout
    pageTitle="Edit Users"
    breadcrumb-text="Edit Users"
    breadcrumb-link="/users"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Edit the form</h2>
          <div class="flex items-center justify-between w-full">
            <div
              class="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background"
            >
              <img
                :src="photoPreview || user.photo || defaultUserPhoto"
                data-default="@/assets/images/icons/gallery-default.svg"
                class="size-full object-contain"
                alt="icon"
              />
              <input
                ref="fileInput"
                type="file"
                @change="handlePhotoUpload"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="btn btn-black w-[152px] font-semibold text-nowrap"
            >
              Add Photo
            </button>
          </div>
          <FormInput
            v-model="form.name"
            label="Full Name"
            :icon="profileGreyIcon"
            required="true"
          />
          <FormInput
            v-model="form.phone"
            label="Phone Number"
            :icon="callGreyIcon"
            type="tel"
            required="true"
          />
          <FormInput
            v-model="form.email"
            label="Email Address"
            :icon="smsGreyIcon"
            type="email"
            required="true"
          />
          <FormInput
            v-model="form.password"
            label="Password"
            :icon="keyGreyIcon"
            type="password"
          />
          <FormInput
            v-model="form.passwordConfirmation"
            label="PasswordConfirmation"
            :icon="keyGreyIcon"
            type="password"
          />

          <div class="flex items-center justify-end gap-4">
            <router-link to="/users" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button
              type="submit"
              class="btn btn-primary font-semibold"
              :disabled="loading"
            >
              {{ loading ? "Updating..." : "Update Now" }}
            </button>
          </div>
        </form>
        <div
          class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white"
        >
          <p class="font-semibold">Quick Guide to Add User</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Enter user details accurately and dummy completely to ensure
                proper lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Assign a role if necessary to ensure proper access lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Create an initial password to ensure secure user access while
                maintaining account protection
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure Email and Phone Number Are Correct text lorem ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Thoroughly review all details before creating to ensure accuracy
                and prevent potential errors.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import FormInput from "@/components/FormInput.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getUserById, updateUser, uploadUserImage } from "@/js/api/users";
import defaultUserPhoto from "@/assets/images/photos/photos-2.png";
import profileGreyIcon from "@/assets/images/icons/profile-grey.svg";
import callGreyIcon from "@/assets/images/icons/call-grey.svg";
import smsGreyIcon from "@/assets/images/icons/sms-grey.svg";
import keyGreyIcon from "@/assets/images/icons/key-grey.svg";

export default {
  name: "EditUsers",
  components: {
    Layout,
    FormInput,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const user = reactive({
      id: null,
      name: "",
      phone: "",
      email: "",
      photo: "",
    });

    const form = reactive({
      name: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const photoPreview = ref(null);
    const fileInput = ref(null);
    const selectedFile = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);

    const fetchUserData = async () => {
      const userId = route.params.id;

      if (!userId) {
        error.value = "User ID not found";
        return;
      }

      loading.value = true;
      error.value = null;
      try {
        const response = await getUserById(userId);
        console.log(response);
        user.id = response.data.id;
        user.name = response.data.name;
        user.phone = response.data.phone || "";
        user.email = response.data.email;
        user.photo = response.data.photo || "";

        form.name = user.name;
        form.phone = user.phone;
        form.email = user.email;
        form.password = "";
        form.passwordConfirmation = "";
      } catch (error) {
        console.error("Error fetching user data:", error);
        error.value = error.message || "Failed to fetch user data";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          photoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async () => {
      if (!form.name || !form.email) {
        alert("Please fill in all required fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (form.password) {
        if (form.password.length < 6) {
          alert("Password must be at least 6 characters long");
          return;
        }

        if (form.password !== form.passwordConfirmation) {
          alert("Password confirmation does not match");
          return;
        }
      }

      loading.value = true;
      error.value = null;

      try {
        let photoUrl = user.photo;

        if (selectedFile.value) {
          const response = await uploadUserImage(selectedFile.value);
          photoUrl = response.data.url || response.data.photo;
        }

        const requestData = {
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          photo: photoUrl || "",
        };

        if (form.password) {
          requestData.password = form.password;
        }

        await updateUser(user.id, requestData);
        alert("User updated successfully!");
        router.push("/users");
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user " + error.message);
        return;
      } finally {
        loading.value = false;
      }
    };

    return {
      user,
      form,
      photoPreview,
      fileInput,
      selectedFile,
      loading,
      error,
      showPassword,
      showPasswordConfirmation,
      handlePhotoUpload,
      handleSubmit,
      defaultUserPhoto,
      profileGreyIcon,
      callGreyIcon,
      smsGreyIcon,
      keyGreyIcon,
    };
  },
};
</script>
