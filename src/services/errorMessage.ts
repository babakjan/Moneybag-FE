const errorMessage = {
  //error is AxiosError
  get(error: any): string {
    let result = "";
    if (error.response.status == 401) {
      return "Email or password is incorrect";
    }
    if (error.response.data) {
      for (const errorMsg of Object.values(
        error.response.data.errors as string[]
      )) {
        if (result !== "") {
          result += "\n";
        }
        result += errorMsg;
      }
    }
    return result;
  },
};

export default errorMessage;
