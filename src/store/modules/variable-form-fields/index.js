import update from 'immutability-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const MODIFY_VAR_FIELDS = 'MODIFY_VAR_FIELDS';

// ------------------------------------
// Actions
// ------------------------------------
export function modifyVarFields(formData) {
  console.log(formData);
  return {
    type: MODIFY_VAR_FIELDS,
    formData,
  };
}

export const actions = {
  modifyVarFields,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MODIFY_VAR_FIELDS]: (state, action) => update(state, {
    $set: action.formData,
  }),
};

// ------------------------------------
// Selectors
// ------------------------------------

export function getFormData(state) {
  return state.variableFormFields;
}

export const selectors = {
  getFormData,
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = [{}];

export default function variableFormFieldsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
