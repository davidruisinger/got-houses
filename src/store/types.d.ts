declare module 'StoreTypes' {
  import { Store as ReduxStore } from 'redux'
  import { State } from 'ServicesTypes'

  export type Store = ReduxStore<State>
}
