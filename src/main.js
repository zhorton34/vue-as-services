import VueServices from '@Boot/vue-services'

/*
 * Register Callback To Create Mercator Admin So We Can Handle
 * Bootable Events Before Creating Our Vue Instance
 */
;(function() {
    this.CreateVueApp = function(config = {}, container = false) {
    	return new VueServices(config, container)    	 
    }
}.call(window))


 const DEFAULT = {
	options: {
		info: 'options object can be data passed in from php and json encoded so you can use php data in your register or boot callbacks',
		app: {
			title: 'Example Title',
			description: 'Example Description'
		}
	},
 	container: {
		bootingCallbacks: [],
 		registeringCallbacks: [],
 		rootInstanceOptions: {
 			el: '#app',
 			name: 'vue-services-application',
 		}
	}
}



window.Container = CreateVueApp(DEFAULT.options, DEFAULT.container)


Container.registering(({ container, Vue }) => {
	const $Event = new Vue()
	$Event.listen = $Event.$on
	$Event.fire = $Event.$emit
	$Event.listenOnce = $Event.$once 
	$Event.forget = $Event.$off 

	Vue.prototype['$Event'] = $Event
	container['$Event'] = $Event
})

Container.booting(({ container, Vue }) => {
	Vue.component('hello-world', {
		data: () => ({ title: 'hello world' })
	})
})


Container.launch({
	el: '#app',
	name: 'vue-services-application',
})


