import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
    MyDashboard: componentLoader.add('MyDashboard', './my-dashboard'),
    MyCustomAction: componentLoader.add('MyCustomAction', './my-custom-action'),
}

export { componentLoader, Components }
