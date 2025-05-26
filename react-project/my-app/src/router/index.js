// router/index.js
import Index from '@/container/Index/index.jsx'
import About from '@/container/About/index.jsx'
import Home from '@/container/Home/index.jsx'
import Data from '@/container/Data/index.jsx'
import User from '@/container/User/index.jsx'

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/user",
    component: User,
  },

];

export default routes
