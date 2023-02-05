const environment = {
  isDev: function (): boolean {
    return process.env.NODE_ENV === "development";
  },
  isMock: function (): boolean {
    return process.env.NODE_ENV === "mock";
  },
  isProd: function (): boolean {
    return process.env.NODE_ENV === "production";
  },
};

export default environment;
