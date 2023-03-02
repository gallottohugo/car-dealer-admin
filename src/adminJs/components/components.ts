import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	MyDashboard: componentLoader.add('MyDashboard', './my-dashboard'),
	CarPropertyNew: componentLoader.add('CarPropertyNew', './CarPropertyNew'),
	CarShow: componentLoader.add('CarShow', './CarShow'),
}

export { componentLoader, Components }
