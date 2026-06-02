export const initialState = {
  email: '',
  password: '',
  confirm: '',
  error: ''
}

export const authReducer = (state, action) => {
  if (action.type === 'SET_EMAIL') {
    return { ...state, email: action.payload }
  } else if (action.type === 'SET_PASSWORD') {
    return { ...state, password: action.payload }
  } else if (action.type === 'SET_CONFIRM') {
    return { ...state, confirm: action.payload }
  } else if (action.type === 'SET_ERROR') {
    return { ...state, error: action.payload }
  } else if (action.type === 'RESET_FORM') {
    return { ...initialState }
  } else {
    return state
  }
}
