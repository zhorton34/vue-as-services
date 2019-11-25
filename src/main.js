var exports=module.exports={};
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

exports.CreateVueServiceContainer = CreateVueApp


// ~~~~~~~~~~~~~~~~~
// Example Usage
// ~~~~~~~~~~~~~~~~~~
//  const DEFAULT = {
// 		options: {
// 			info: 'options object can be data passed in from php and json encoded so you can use php data in your register or boot callbacks',
// 			app: {
// 				title: 'Example Title',
// 				description: 'Example Description'
// 			}
// 		},
//  	container: {
// 			bootingCallbacks: [],
//  		registeringCallbacks: [],
//  		rootInstanceOptions: {
//  			el: '#app',
//  			name: 'vue-services-application',
//  		}
// 		}
// 	}

// 1. import { CreateVueServiceContainer } from 'vue-as-services'

// 2. Create vue container
// window.Container = VueServiceContainer(DEFAULT.options, DEFAULT.container)

// 3. Provide Register callbacks  
// Container.registering(({ container, Vue }) => {
// 	const $Event = new Vue()
// 	$Event.listen = $Event.$on
// 	$Event.fire = $Event.$emit
// 	$Event.listenOnce = $Event.$once 
// 	$Event.forget = $Event.$off 
// 	Vue.prototype['$Event'] = $Event
// 	container['$Event'] = $Event
// })

// 4. Provide booting callbacks
// Container.booting(({ container, Vue }) => {
// 	Vue.component('hello-world', {
// 		data: () => ({ title: 'hello world' })
// 	})
// })

// 5. Launch app with defined root instance
// Container.launch({
// 	el: '#app',
// 	name: 'vue-services-application',
// })


