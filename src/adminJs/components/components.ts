import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
	MyDashboard: componentLoader.add('MyDashboard', './my-dashboard'),
	CarShow: componentLoader.add('CarShow', './CarShow'),
}

export { componentLoader, Components }
