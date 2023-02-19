const errorMessage = {
  //error is AxiosError
  // eslint-disable-next-line
  get(error: any): string {
    let result = "";
    if (error.response.status == 401) {
      return "Email or password is incorrect";
    }
    if (error.response.data) {
      for (const [key, value] of Object.entries(
        error.response.data.errors as string[]
      )) {
        if (result !== "") {
          result += "\n";
        }
        result += `${key}: ${value}`;
      }
    }
    return result;
  },
};

export default errorMessage;
