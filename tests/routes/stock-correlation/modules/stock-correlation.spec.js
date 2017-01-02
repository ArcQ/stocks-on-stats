import counterReducer, {
  COUNTER_INCREMENT,
  increment,
} from 'routes/stock-correlation/modules/stock-correlation';

describe('(Redux Module) Counter', () => {
  it('Should export a constant COUNTER_INCREMENT.', () => {
    expect(COUNTER_INCREMENT).to.equal('COUNTER_INCREMENT');
  });

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(counterReducer).to.be.a('function');
    });

    it('Should initialize with a state of 0 (Number).', () => {
      expect(counterReducer(undefined, {})).to.equal(0);
    });

    it('Should return the previous state if an action was not matched.', () => {
      let state = counterReducer(undefined, {});
      expect(state).to.equal(0);
      state = counterReducer(state, { type: '@@@@@@@' });
      expect(state).to.equal(0);
      state = counterReducer(state, increment(5));
      expect(state).to.equal(5);
      state = counterReducer(state, { type: '@@@@@@@' });
      expect(state).to.equal(5);
    });
  });

  describe('(Action Creator) increment', () => {
    it('Should be exported as a function.', () => {
      expect(increment).to.be.a('function');
    });

    it('Should return an action with type "COUNTER_INCREMENT".', () => {
      expect(increment()).to.have.property('type', COUNTER_INCREMENT);
    });

    it('Should assign the first argument to the "payload" property.', () => {
      expect(increment(5)).to.have.property('payload', 5);
    });

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(increment()).to.have.property('payload', 1);
    });
  });
});
