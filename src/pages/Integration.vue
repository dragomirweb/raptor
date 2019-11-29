<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-12">
        <q-breadcrumbs class="q-ma-xs">
          <q-breadcrumbs-el :to="{ name: 'dashboard' }" label="Dashboard" />
          <q-breadcrumbs-el label="Integration" />
        </q-breadcrumbs>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
