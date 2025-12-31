import { myAxios } from "../config/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await myAxios.post("/user/login",{
        email,password,name
    });
    console.log(response,'>>>>>>>>>>>>>>>>>>>>>>');
    return response.data;
  },
  signup:async(email: string,name:string,password:string,phone:string)=>{
    const respone = await myAxios.post("/user/createAUser",{email,password,name,phone});
    return respone.data;
  },
  logout:async()=>{
    const respone = await myAxios.post("/user/logout",{});
    console.log("respone.data: ",respone.data);
    return respone.data;
  }
};
