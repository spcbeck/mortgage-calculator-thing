import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import AddAssetPage from '@/pages/AddAssetPage.vue'
import AssetsPage from '@/pages/AssetsPage.vue'
import EditAssetPage from '@/pages/EditAssetPage.vue'
import GetMortgageRatesPage from './pages/GetMortgageRatesPage.vue'
import DetailedAssetsPage from '@/pages/DetailedAssetsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/assets', component: AssetsPage },
  { path: '/assets/edit/:id', component: EditAssetPage, props: true },
  { path: '/assets/add', component: AddAssetPage },
  { path: '/assets/:id', component: DetailedAssetsPage, props: true },
  { path: '/calculate-mortgage', component: GetMortgageRatesPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
