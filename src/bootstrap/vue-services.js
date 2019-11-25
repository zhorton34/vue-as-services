import Vue from 'vue'

class VueServiceContainer {
    constructor(config = {}, container) {
        this.config = config
        this.registeringCallbacks = []
        this.bootingCallbacks = []
        this.RootInstance = {
            options: {
                el: '#app',
                name: 'vue-services',
                data: () => ({}),
                mixins: [],
                methods: {},
                filters: {},
                computed: {},
                directives: {}
            },
            set(options = {}) {
                Object.entries(options).forEach(([key, setting]) => {
                    this.add(key, setting)
                })
            },
            add(key, setting = false) {
                const notAnOption = !Object.keys(this.options).includes(key)
                
                if (notAnOption || !setting) return

                const settingIsArray = Array.isArray(setting)
                const settingIsObject = typeof setting === 'object'
                const settingIsAString = typeof setting === 'string'

                if (settingIsAString) {
                    this.options[key] = setting
                }
                if (settingIsArray) {
                    this.options[key] = [
                        ...setting,
                        ...this.options[key]
                    ]
                }
                if (settingIsObject && !settingIsArray) {
                    this.options[key] = {
                        ...setting,
                        ...this.options[key]
                    }
                }
            },
        }

        const _this = this
        if (container) {
            this.bootingCallbacks = [...container.bootingCallbacks, ...this.bootingCallbacks]
            this.registeringCallbacks = [...container.registeringCallbacks, ...this.registeringCallbacks]
            const rootInstanceOptions = container.rootInstance || { options: {} } 
            const { RootInstance } = this
            this.RootInstance.options = { ...RootInstance.options, ...rootInstanceOptions }
        }
    }


    /**
     * Register a callback to be called before MercatorAdminApi starts. This is used to bootstrap
     * add ons, tools, custom fields, or anything else Mercator Admin needs
     */
    booting(callback) {
        this.bootingCallbacks.push(callback)
    }

    /**
     * Execute all of the booting callbacks.
     */
    boot() {
        this.bootingCallbacks.forEach(callback => callback(this.bootParameters))
        this.bootingCallbacks = []
    }

    /**
     * Register a callback to be called before MercatorAdminApi boots.
     * This is used to register MercatorAdmin properties and relationships
     */
    registering(callback) {
        this.registeringCallbacks.push(callback)
    }

    /**
     * Execute all of the register callbacks.
     */
    register() {
        this.registeringCallbacks.forEach(callback => callback(this.registerParameters))
        this.registeringCallbacks = []
    }

    /**
     *  Register parameters that are available within the MercatorAdmin booting callback
     *  MercatorAdmin.booting(({ ...parametersReturnedHere }))
     */
    setRegisteringParameters(args = {}) {
        const container = this
        const config = this.config
        const root = this.RootInstance
        this.registerParameters = { Vue, container, root, config }
    }
    /**
     *  Register parameters that are available within the MercatorAdmin booting callback
     *  MercatorAdmin.booting(({ ...parametersReturnedHere }))
     */
    setBootingParameters(args = {}) {
        const container = this
        const config = this.config
        const root = this.RootInstance
        this.bootParameters = { Vue, container, root, config }
    }

    /**
     * Start the MercatorAdminApi app by calling each of the tool's callbacks and then creating
     * the underlying Vue instance.
     */
    launch(withRootInstanceOptions = false) {
        // register callbacks
        this.setRegisteringParameters()
        this.register()

        // boot callbacks depend on internally registered properties on MercatorAdmin
        this.setBootingParameters()
        this.boot()

        const { RootInstance } = this
        if (withRootInstanceOptions) {
            console.warn('you can configure your root instance within launch, but the launc vue instance options will override any parrellel RootInstance options set in your booting or registering callbacks')
            this.RootInstance.set(withRootInstanceOptions)
        }

        if (this.RootInstance.options.render) {
            const { el } = this.RootInstance.options
            this.app = new Vue(this.RootInstance.options).$mount(el)
        }
        else {
            this.app = new Vue(this.RootInstance.options)
        }
    }
}

;(function() {
    this.CreateVueApp = function(config = {}, container = false) {
        return new VueServices(config, container)        
    }
}.call(window))

exports.CreateVueServiceContainer = function(config = {}, container = false) {
    return CreateVueApp(config, container)
}

