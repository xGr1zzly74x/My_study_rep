var _ = require("lodash")

const createStore = (reducer) => {
  let state = reducer(undefined, { type: "__INIT" })
  let subscribers = []

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action)
      subscribers.forEach((callback) => callback())
    },
    subsribe: (callback) => subscribers.push(callback),
  }
}

const ACTIONS = {
  ADD_EVENT:    "ADD_EVENT",
  REMOVE_EVENT: "REMOVE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  SORT_EVENT:   "SORT_EVENT",
}

const initialStateEvents = {
  eventsWorld: [],
}

const reducerEvents = (state = initialStateEvents, action) => {
  const new_state = { eventsWorld: [] }

  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      new_state.eventsWorld = [...state.eventsWorld]
      new_state.eventsWorld.push(action.payload)

      return new_state

    case ACTIONS.REMOVE_EVENT:
      new_state.eventsWorld = state.eventsWorld.filter((item) => {
        return item.id !== action.payload.id
      })

      return new_state

    case ACTIONS.UPDATE_EVENT:
      new_state.eventsWorld = state.eventsWorld.map((item) => {
        item.id == action.payload.id ? (item.text = action.payload.text) : item
        return item
      })

      return new_state

    case ACTIONS.SORT_EVENT:
      new_state.eventsWorld = _.sortBy(state.eventsWorld, "id")
      return new_state

    default:
      return state
  }
}

const store = createStore(reducerEvents)
store.subsribe(() => console.log("Изменились события..."))

//Пример с удалением событий
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '1', text: "Событие 1" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '2', text: "Событие 2" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '3', text: "Событие 3" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '3', text: "Событие 4" }})
//console.log("store до", store.getState())
//store.dispatch({ type: ACTIONS.REMOVE_EVENT, payload: { id: '2', text: "Событие 2" }})
//console.log("store после", store.getState())

//Пример с изменение событий
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '1', text: "Событие 1" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '2', text: "Событие 2" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '3', text: "Событие 3" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '3', text: "Событие 4" }})
//console.log("store до", store.getState())
//store.dispatch({ type: ACTIONS.UPDATE_EVENT, payload: { id: '2', text: "Событие 2 изменено" }})
//console.log("store после", store.getState())

//Пример с сортировкой событий
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '1', text: "Событие 1" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '3', text: "Событие 3" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '4', text: "Событие 4" }})
// store.dispatch({ type: ACTIONS.ADD_EVENT, payload: { id: '2', text: "Событие 2" }})
//console.log("store до", store.getState())
// store.dispatch({ type: ACTIONS.SORT_EVENT, payload: {}})
//console.log("store после", store.getState())
