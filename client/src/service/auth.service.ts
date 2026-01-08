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
  },
  sendVerifyMail:async(user_id:string)=>{
    const respone = await myAxios.post("/user/sendVerifyMail?user_id="+user_id);
    return respone.data;
  },
  sendVerifyForgetPasswordMail:async(email:string)=>{
    const respone = await myAxios.post("/user/sendVerifyForgetPasswordMail?email="+email);
    return respone.data;
  },
  verify:async(token:string,user_id:string)=>{
    const respone = await myAxios.post("/user/verify?token="+token+"&user_id="+user_id);
    return respone.data;
  },
  forgetPassword:async(token:string,user_id:string,password:string)=>{
    const respone = await myAxios.post("/user/verifyForgetPassword?token="+token+"&user_id="+user_id,{password});
    return respone.data;
  },
};
