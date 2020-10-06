import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
	
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
	},
	
	routes: []
	
});



export default router;