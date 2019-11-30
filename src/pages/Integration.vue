<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-12">
        <q-breadcrumbs class="q-ma-xs">
          <q-breadcrumbs-el :to="{ name: 'dashboard' }" label="Dashboard" />
          <q-breadcrumbs-el label="Integrations" />
        </q-breadcrumbs>
      </div>
    </div>

    <integration-list v-if="!integration" />

    <div v-if="integration" class="flex justify-center w-100">
      
      <new-integration @cancelIntegration="onCancelIntegration" @newIntegrationAdded="onNewIntegrationAdded">
      </new-integration>
    </div>

    <q-page-sticky v-if="!integration" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="integration = true" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import NewIntegration from '../components/NewIntegration'
import IntegrationList from '../components/IntegrationList'

export default {
  name: 'PageIndex',
  components: {
    'new-integration': NewIntegration,
    'integration-list': IntegrationList
  },
  data() {
    return {
      integration: false
    }
  },
  methods: {
    onNewIntegrationAdded(e) {
      this.integration = e
      this.$q.loading.hide()
    },
    onCancelIntegration(e) {
      this.integration = e
    }
  }
}
</script>
