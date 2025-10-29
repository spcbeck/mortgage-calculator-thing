import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import AddAssetPage from '@/pages/AddAssetPage.vue'
import AssetsPage from '@/pages/AssetsPage.vue'
import EditAssetPage from '@/pages/EditAssetPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/asset/edit/:id', component: EditAssetPage },
  { path: '/asset/add', component: AddAssetPage },
  { path: '/asset/:id', component: AssetsPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
