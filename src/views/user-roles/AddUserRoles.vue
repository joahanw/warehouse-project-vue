<template>
  <Layout
    pageTitle="Add User Roles"
    breadcrumb-text="Add User Roles"
    breadcrumb-link="/user-roles"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex flex-col lg:flex-row gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <FormSelect
            v-model="form.selectedUser"
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
            v-model="form.selectedRole"
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
          class="flex flex-col w-full lg:w-[392px] lg:shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white"
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
                Select an Available Username from the List lorem ipsum simply
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
                Select the Most Appropriate Role as Needed text lorem ipsum
                dummy
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Review All Details Carefully Before Creating dummy image
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Make Sure Not to Assign the Wrong Role or Permissions text lorem
                si ipsum
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="@/assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure the Role is Assigned to the Right Person color dot amet
                ipsum lorem
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import FormSelect from "@/components/FormSelect.vue";
import Layout from "@/components/Layout.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { createUserRole, getRoles, getUsers } from "@/js/api/users";
import profileCircleGreyIcon from "@/assets/images/icons/profile-circle-grey.svg";
import profileTickGreyIcon from "@/assets/images/icons/profile-tick-grey.svg";

export default {
  name: "AddUserRoles",
  components: {
    Layout,
    FormSelect,
  },
  setup() {
    const router = useRouter();

    const form = reactive({
      selectedUser: "",
      selectedRole: "",
    });

    const availableUsers = ref([]);
    const availableRoles = ref([]);
    const loading = ref(false);

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

    onMounted(async () => {
      try {
        await Promise.all([fetchUsers(), fetchRoles()]);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    });

    const handleSubmit = async () => {
      if (!form.selectedUser || !form.selectedRole) {
        alert("Please select both user and role");
        return;
      }

      loading.value = true;

      const user = availableUsers.value.find(
        (user) => user.id == form.selectedUser,
      );
      const role = availableRoles.value.find(
        (role) => role.id == form.selectedRole,
      );

      try {
        const params = new URLSearchParams({
          userId: parseInt(form.selectedUser),
          roleId: parseInt(form.selectedRole),
        });
        await createUserRole(`?${params.toString()}`);
        alert(`Role "${role?.name}" assigned to "${user?.name}" successfully!`);
        router.push("/user-roles");
      } catch (error) {
        console.error("Error assigning role:", error);
        alert(`Failed to assign role: ${error.message}`);
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      availableUsers,
      availableRoles,
      handleSubmit,
      profileCircleGreyIcon,
      profileTickGreyIcon,
    };
  },
};
</script>
