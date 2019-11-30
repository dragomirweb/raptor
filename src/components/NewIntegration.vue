<template>
  <div class="q-pa-md w-75">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          :name="1"
          title="Create new integration"
          icon="settings"
          :done="newIntegration"
        >
          <div class="flex column items-center q-mt-lg" style="min-height: 300px;">
            <q-input
              dense
              v-model="data.name"
              label="Name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="w-50"
            />

            <q-select
              dense
              v-model="data.customerId"
              :options="customers"
              label="Choose Customer"
              emit-value
              map-options
              class="q-mt-md w-50"
              :option-value="opt => opt === null ? null : opt.id"
              :option-label="opt => opt === null ? '- Null -' : opt.desc"
              :option-disable="opt => opt === null ? true : opt.inactive"
            />

            <q-input
              dense
              type="textarea"
              v-model="data.description"
              label="Description"
              class="q-mt-md w-50"
            />
          </div>

          <q-stepper-navigation class="flex justify-end">
            <q-btn flat color="primary" @click="resetIntegration()" label="Cancel" class="q-ml-sm" />
            <q-btn  @click="stepNewIntegration" color="primary" label="Next" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Add feed"
          icon="create_new_folder"
          :done="addFeed"
        >
          <div class="flex column items-center q-mt-lg" style="min-height: 300px;">
            <h5 v-if="newIntegration">
              <span class="text-capitalize">{{ data.name }}</span>
               - for customer: 
               <span class="text-capitalize">
                 {{ customers[data.customerId - 1].desc }}
               </span>
            </h5>
            <q-input
              dense
              v-model="data.url"
              type="url"
              label="Feed url"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="w-50"
            />
          </div>

          <q-stepper-navigation class="flex justify-end">
            <q-btn v-if="step > 1" flat color="primary" @click="resetIntegration()" label="Cancel" class="q-ml-sm" />
            <q-btn v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            <q-btn @click="stepAddFeed" color="primary" label="Next" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Map feed"
          icon="assignment"
          :done="mapFeed"
        >
        <div class="flex column items-center q-mt-lg" style="min-height: 300px;">
          <mapper @mapperUpdated="onMappingsUpdate" :feed="data.originalFeed" />
        </div>


          <q-stepper-navigation class="flex justify-end">
            <q-btn v-if="step > 1" flat color="primary" @click="resetIntegration()" label="Cancel" class="q-ml-sm" />
            <q-btn v-if="step > 1" color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            <q-btn @click="stepMapFeed" color="primary" label="Confirm" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

      </q-stepper>
    </q-form>
  </div>
</template>

<script>
import Mapper from '../components/Mapper'
import { mapGetters } from 'vuex'

export default {
  name: "NewIntegration",
  components: {
    'mapper': Mapper
  },
  data() {
    return {
      step: 1,
      newIntegration: false,
      addFeed: false,
      mapFeed: false,
      data: {
        name: '',
        customerId: null,
        url: 'https://my-json-server.typicode.com/dragomirweb/mockserver/db',
        description: '',
        originalFeed: null,
        mappings: []
      },
      customers: [
        {
          id: 1,
          desc: 'Google'
        },
        {
          id: 2,
          desc: 'Facebook'
        },
        {
          id: 3,
          desc: 'Twitter'
        }
      ],
      baseData: null,
      validMappings: true,
      mappingsChanged: false
    }
  },
  mounted() {
    this.baseData = Object.assign({}, this.data);
  },
  methods: {
    resetIntegration() {
      this.step = 1
      this.newIntegration = false
      this.addFeed = false
      this.mapFeed = false
      this.data = Object.assign({}, this.baseData);
      this.$emit('cancelIntegration', false);
    },
    onSubmit() {

    },
    onReset() {

    },
    stepNewIntegration() {
      const name = this.data.name
      const id = this.data.customerId

      if(id && name.length > 0) {
        this.newIntegration = true; 
        this.step = 2
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Feed name and Customer is required'
        })
      }
    },
    stepAddFeed() {
      const url = this.data.url;
      const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(url);
      this.$q.loading.show()


      if(url.length > 0 && urlRegex) {
        this.$axios.get(url)
          .then(res => {
            this.addFeed = true
            this.step = 3
            this.data.originalFeed = res.data.data
            this.$q.loading.hide()
          })
          .catch(error => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Feed is invalid'
            })
          })
      } else {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Feed url is required'
        })
      }

    },
    stepMapFeed() {
      this.$q.loading.show()
      if (!this.mappingsChanged) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Feed is not mapped'
        })
      } else if (!this.validMappings) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Required fields are not mapped'
        })
      } else {
        this.mapFeed = true;
        this.step = 3;
        this.$store.dispatch('raptor/setIntegration', this.data)
        this.$emit('newIntegrationAdded', false);
      }
    },
    onMappingsUpdate(e) {
      let data = [];

      this.mappingsChanged = true;

      e.map(el => {
        let name = el.schemaName;
        let feed = el.feedName;

        if(
          name === 'productId' ||
          name === 'productName' ||
          name === 'Price' ||
          name === 'Price' ||
          name === 'ProductUrl'
        ) {
          if(feed && feed.length <= 0) {
            this.validMappings = false;
          } else {
            this.validMappings = true;
          }
        }
        data.push({
          schemaName: el.schemaName,
          feedName: el.feedName
        });
      })

      this.data.mappings = data;
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