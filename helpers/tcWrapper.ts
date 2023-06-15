export const tcWrapper = <T extends Function>(fn: T): Function => {
  return function (): T | void {
    try {
      return fn.apply(this, arguments);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
};
