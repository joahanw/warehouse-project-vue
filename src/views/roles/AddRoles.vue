<template>
  <Layout
    pageTitle="Add Roles"
    breadcrumb-text="Add Roles"
    breadcrumb-link="/roles"
  >
    <main class="flex flex-col gap-6 flex-1">
      <div class="flex gap-6">
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 class="font-semibold text-xl capitalize">Complete the form</h2>
          <FormInput
            v-model="form.name"
            label="Role Name"
            icon="../../src/assets/images/icons/user-octagon-grey.svg"
            required="true"
          />
          <div class="flex items-center justify-end gap-4">
            <router-link to="/roles" class="btn btn-red font-semibold">
              Cancel
            </router-link>
            <button
              type="submit"
              class="btn btn-primary font-semibold"
              :disabled="loading"
            >
              <template v-if="loading">
                <span>Saving...</span>
              </template>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
        <div
          class="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white"
        >
          <p class="font-semibold">Quick Guide to Add New Role</p>
          <ul class="flex flex-col gap-4">
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Clearly and accurately define role responsibilities to ensure
                accountability
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Grant the appropriate permissions to ensure users have the right
                level of access for their roles
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Verify that no duplicate roles are Lorem assigned to maintain
                clarity, efficiency
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Ensure naming is clear, concise, and specific to enhance
                understanding
              </p>
            </li>
            <li class="flex gap-[6px]">
              <img
                src="../../assets/images/icons/Checklist-green-circle.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
              <p class="font-medium leading-[140%]">
                Thoroughly review all details before creating to ensure accuracy
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
import { useRolesStore } from "@/stores/roles";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";

export default {
  name: "AddRoles",
  components: {
    Layout,
    FormInput,
  },
  setup() {
    const router = useRouter();
    const rolesStore = useRolesStore();

    const form = reactive({
      name: "",
    });

    const loading = computed(() => rolesStore.loading);
    const error = computed(() => rolesStore.error);

    const handleSubmit = async () => {
      if (!form.name.trim()) {
        alert("Please enter a role name");
        return;
      }

      try {
        await rolesStore.createRole({
          name: form.name.trim(),
        });

        alert("Role created successfully!");
        router.push("/roles");
      } catch (error) {
        console.error("Error creating role:", error);
        alert(error.message || "Failed to create role");
      }
    };

    return {
      form,
      loading,
      error,
      handleSubmit,
    };
  },
};
</script>
