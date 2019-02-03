import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Needs a default export in order to work: https://facebook.github.io/create-react-app/docs/running-tests#src-setuptestsjs
export default undefined
