/* @module */
import { call, delay } from 'redux-saga/effects';
import { mapObjIndexed, path } from 'ramda';
import { createActions } from 'redux-actions';
import constants from 'namespace-constants';
import { ignoreActions } from 'redux-ignore';

// run ignore actions on actions in all reducers outside of notIgnoredReducerName
export const ignoreOutside = (notIgnoredReducerName, actions) => (
  combinedReducers,
) =>
  Object.entries(combinedReducers).reduce(
    (acc, [k, reducer]) => ({
      ...acc,
      [k]:
        k === notIgnoredReducerName ? reducer : ignoreActions(reducer, actions),
    }),
    combinedReducers,
  );

export const retryHoc = (maxTries, retryDelay) =>
  function* retrySaga(generator, ...args) {
    const n = 0;
    while (n <= maxTries) {
      try {
        yield call(generator, ...args);
        break;
      } catch (e) {
        if (n < maxTries) {
          yield console.warn(
            `saga failed ${maxTries} times, rerunning, error was: `,
            e,
          );
          break;
        } else {
          yield console.warn('saga failed, rerunning, error was: ', e);
        }
      }
      yield delay(retryDelay);
    }
  };

function actionsNamespaceWrapper(namespace) {
  return (obj) =>
    Object.keys(obj).reduce(
      (newActions, key) =>
        Object.assign(newActions, {
          [key]: (payload) => {
            const action = obj[key](payload);
            return Object.assign(action, {
              type: `${namespace}/${action.type}`,
            });
          },
        }),
      {},
    );
}

export function createConstantsAndActions(nameSpace, constArr) {
  const wrapNamespace = actionsNamespaceWrapper(nameSpace);
  const _createConstantsAndActions = (arr) => ({
    actions: wrapNamespace(createActions(...arr)),
    constants: constants(nameSpace, arr, { separator: '/' }),
  });
  return _createConstantsAndActions(constArr);
}

export function createSelectorsAndState(nameSpace, stateTemplate) {
  return {
    initialState: stateTemplate,
    selectors: mapObjIndexed(
      (_, k) => (state) => path([nameSpace, k], state),
      stateTemplate,
    ),
  };
}
