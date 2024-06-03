export const generateJSChallenge = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const solution = (num1 + num2).toString();
    const challenge = `function solve() { return ${num1} + ${num2}; } solve();`;
    return { challenge, solution };
  };
  