<template>
  <div class="row">
    <div class="col-7">
      <draggable class="flex justify-evenly mt-150" tag="div" :list="data" :group="{ name: 'g1' }">
        <q-chip square class="q-ma-sm" v-for="el in data" :key="el.name">
          {{ el }}
        </q-chip>
      </draggable>
    </div>
    <div class="col-5">
      <draggable 
        class="flex column content-center" 
        tag="div" 
        :list="mappings" 
        :group="{ name: 'g1' }"
      >
        <div class="w-50" v-for="el in mappings" :key="el.key">
          <p class="q-my-xs">
            <q-icon v-if="el.required" name="star" class="text-primary" />
            {{ el.schemaName }}
          </p>
          <draggable @change="onChange" class="dragArea flex items-center" tag="div" :list="el.feedName" :group="{ name: 'g1' }"
            v-bind:style="el.feedName && el.feedName.length > 0 ? 'outline: 2px dashed green;' : ''"
          >
            <q-chip square class="q-ml-xs" v-for="el in el.feedName" :key="el.name">
              {{ el }}
            </q-chip>
          </draggable>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "mapper",
  props: {
    feed: {
      required: true,
      type: Object,
      default: {}
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      data: [],
      mappings: [
        {
          schemaName: "ProductId",
          feedName: [],
          required: true
        },
        {
          schemaName: "productName",
          feedName: [],
          required: true
        },
        {
          schemaName: "ProductDescription",
          feedName: []
        },
        {
          schemaName: "InStock",
          feedName: []
        },
        {
          schemaName: "Price",
          feedName: [],
          required: true
        },
        {
          schemaName: "OnSalePrice",
          feedName: []
        },
        {
          schemaName: "RetailPrice",
          feedName: []
        },
        {
          schemaName: "LastDeliveryDate",
          feedName: []
        },
        {
          schemaName: "BrandId",
          feedName: []
        },
        {
          schemaName: "BrandName",
          feedName: []
        },
        {
          schemaName: "ProductUrl",
          feedName: [],
          required: true
        },
        {
          schemaName: "ImageUrl",
          feedName: []
        }
      ]
    };
  },
  mounted() {
    this.data = Object.keys(this.feed)
  },
  methods: {
    onChange() {
      this.$emit('mapperUpdated', this.mappings); 
    }
  }
};
</script>
<style scoped>
.dragArea {
  min-height: 40px;
  outline: 1px dashed black;
}
</style>