export const forEach = (obj, fn) => {
  Object.keys(obj).forEach((key) => fn(obj[key], key));
};

export function mapState(stateList) {
  let obj = {};
  stateList.forEach((stateName) => {
    obj[stateName] = function() {
      return this.$store.state[stateName];
    };
  });
  return obj;
}

export const mapGetters = (getterList) => {
  let obj = {};
  getterList.forEach((getterName) => {
    obj[getterName] = function() {
      return this.$store.getters[getterName];
    };
  });
  return obj;
};

export const mapMutations = (mutationsList) => {
  let obj = {};
  mutationsList.forEach((mutationName) => {
    obj[mutationName] = function(payload) {
      this.$store.dispatch(mutationName, payload);
    };
  });
};

export const mapActions = (actionList) => {
  let obj = {};
  actionList.forEach((actionName) => {
    obj[actionName] = function(payload) {
      this.$store.commit(actionName, payload);
    };
  });
};
