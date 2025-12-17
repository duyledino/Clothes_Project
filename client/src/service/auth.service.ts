import { myAxios } from "../config/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await myAxios.post("/user/login",{
        email,password,name
    });
    console.log(response,'>>>>>>>>>>>>>>>>>>>>>>');
    return response.data;
  },
  signup:async(email: string,name:string,password:string)=>{
    const respone = await myAxios.post("/user/createAUser",{email,password,name});
    return respone.data;
  },
  logout:async()=>{
    const respone = await myAxios.post("/user/logout",{});
    return respone.data;
  }
};
