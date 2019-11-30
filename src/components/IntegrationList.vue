<template>
  <div class="flex justify-center q-pa-md">
    <q-table
      title="Integrations"
      :data="getIntegrations"
      :columns="columns"
      row-key="name"
      class="w-75 q-mt-xl"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IntegrationList',
  data() {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
        },
        { 
          name: 'customer', 
          align: 'center', 
          label: 'Customer', 
          field: row => row.customerId,
          sortable: true 
        },
        { 
          name: 'status', 
          label: 'Status', 
          align: 'center', 
          field: row => row.customerId,
          format: val => `Imported`,
          sortable: true 
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getIntegrations: 'raptor/GET_INTEGRATIONS'
    })
  },
}
</script>

<style>

</style>