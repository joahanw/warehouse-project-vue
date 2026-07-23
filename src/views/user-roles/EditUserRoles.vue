<template>
  <Layout
    pageTitle="Edit User Roles"
    breadcrumb-text="Edit User Roles"
    breadcrumb-link="/user-roles"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <FormSelect
            v-model="formData.userId"
            label="Select User Id"
            :icon="profileCircleGreyIcon"
            required
          >
            <option
              v-for="user in availableUsers"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }}
            </option>
          </FormSelect>
          <FormSelect
            v-model="formData.roleId"
            label="Select Role Id"
            :icon="profileTickGreyIcon"
            required
          >
            <option
              v-for="role in availableRoles"
              :key="role.id"
              :value="role.id"
            >
              {{ role.name }}
            </option>
          </FormSelect>
          <div class="flex items-center justify-end gap-4">
            <a href="/user-roles" class="btn btn-red font-semibold"> Cancel </a>
            <button type="submit" class="btn btn-primary font-semibold">
              Save Changes
            </button>
          </div>
        </form>
        <div
          class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white"
        >
          <p class="font-semibold">Quick Guide to Assign Role To User</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Choose an available username from the list to ensure uniqueness
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Choose the most suitable role as needed to ensure proper access
                Lorem Ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Review All Details Carefully Before ipsum Creating lorem dummy
                text
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make Sure Not to Assign the Wrong Role or Permissions lorem text
                ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Role is Assigned to the Right Person lorem ipsum
                simply
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
import FormSelect from "@/components/FormSelect.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getUsers, getRoles, updateUserRole } from "@/js/api/users";
import profileCircleGreyIcon from "@/assets/images/icons/profile-circle-grey.svg";
import profileTickGreyIcon from "@/assets/images/icons/profile-tick-grey.svg";

export default {
  name: "EditUserRoles",
  components: {
    Layout,
    FormSelect,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isSubmitting = ref(false);
    const currentAssignment = ref(null);
    const userId = ref(null);
    const oldRoleId = ref(null);

    const availableUsers = ref([]);
    const availableRoles = ref([]);

    const formData = reactive({
      userId: "",
      roleId: "",
    });

    const errors = reactive({
      userId: "",
      roleId: "",
    });

    const validateForm = () => {
      errors.userId = "";
      errors.roleId = "";

      if (!formData.userId) {
        errors.userId = "Please select a user";
      }

      if (!formData.roleId) {
        errors.roleId = "Please select a role";
      }

      return !errors.userId && !errors.roleId;
    };

    const loadCurrentAssignment = async () => {
      userId.value = route.params.userId;
      oldRoleId.value = route.params.roleId;

      if (!userId && !oldRoleId) {
        alert("User role ID is required");
        router.push("/user-roles");
        return;
      }

      formData.userId = userId.value;
      formData.roleId = oldRoleId.value;
    };

    onMounted(async () => {
      await fetchUsers();
      await fetchRoles();
      await loadCurrentAssignment();
    });
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        availableUsers.value = response.data?.content || [];
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        availableRoles.value = response.data || [];
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        return;
      }

      isSubmitting.value = true;

      try {
        const params = new URLSearchParams({
          userId: parseInt(userId.value),
          roleId: parseInt(oldRoleId.value),
          assignedRoleId: parseInt(formData.roleId),
        });
        await updateUserRole(`?${params.toString()}`);
        alert("User role updated successfully!");
        router.push("/user-roles");
      } catch (error) {
        console.error("Error updating user role:", error);
        alert("Failed to update user role");
      } finally {
        isSubmitting.value = false;
      }
    };
    return {
      formData,
      errors,
      isSubmitting,
      currentAssignment,
      loadCurrentAssignment,
      handleSubmit,
      availableUsers,
      availableRoles,
      userId,
      oldRoleId,
      profileCircleGreyIcon,
      profileTickGreyIcon,
    };
  },
};
</script>
