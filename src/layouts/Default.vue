<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          <span class="text-capitalize">
            {{ currentPath }}
          </span>
        </q-toolbar-title>

        <div>
          <q-icon size="sm" name="more_vert" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-scroll-area
        class="nav-h mt-150"
      >
        <q-list padding>
          <q-item to="/" clickable v-ripple
            :active="link === 'dahboard'"
            @click="link = 'dahboard'"
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item to="/profile" clickable v-ripple
            :active="link === 'profile'"
            @click="link = 'profile'"
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section>
              Profile
            </q-item-section>
          </q-item>

          <q-item to="/integration" clickable v-ripple
            :active="link === 'integration'"
            @click="link = 'integration'"
            active-class="active-link"
          >
            <q-item-section avatar>
              <q-icon name="build" />
            </q-item-section>

            <q-item-section>Integrations</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top h-150"
        :src="background"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="80px" class="q-mb-sm">
            <img src="~assets/giphy.gif" />
          </q-avatar>
          <div class="text-weight-bold">Tyrannosaurus Rex</div>
          <div>@treeex2201</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "Default",

  data() {
    return {
      background: require('../assets/material.png'),
      leftDrawerOpen: false,
      link: 'dashboard'
    }
  },
  computed: {
    currentPath() {
        return this.$route.name;
    }
  }
};
</script>
