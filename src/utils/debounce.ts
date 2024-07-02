const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(f: F, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f(...args), delay);
  };
};

export default debounce;
