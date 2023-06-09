const { reducer } = require("./application");

describe("application", () => {
   it("throws an error with unsupported action type", () => {
      // Set unsupported action type to be pushed to reducer
      const unsupportedAction = {
         type: "UNSUPPORTED_ACTION_TYPE",
      };

      expect(() => {
         reducer({}, unsupportedAction);
      }).toThrowError(`Tried to reduce with unsupported action type: ${unsupportedAction.type}`);
   });
});
