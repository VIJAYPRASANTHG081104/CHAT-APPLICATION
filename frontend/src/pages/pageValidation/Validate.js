import {toast} from 'react-toastify'

export const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

export const handleValidationRegister = (values) => {
    const {password,confirmPassword,email,username} = values;
    if(password !== confirmPassword){
    toast.error("Password does not match! ",toastOptions);
    return false;
    }
    else if( username.length < 5|| username.length == ""){
      toast.error("Username should be greater than 5 characters",toastOptions);
      return false;
    }
    else if (password.length < 5|| password.length == ""){
      toast.error("Password should be greater than 5 characters",toastOptions);
      return false;
    }
    else if(email === ""){
      toast.error("Email Must!",toastOptions)
    }
    return true;
  }
export const registerResponesValidate = (data) => {
  
  if(data.status === false){

    toast.error(data.err,toastOptions);
    return false;
  }
  if(data.status === true){
    
    toast.success("Created Successfully",toastOptions);
    localStorage.setItem("chat-app-user",JSON.stringify(data.user));
    return true;
  }
}

export const handleValidationLogin = (values) => {
  const {password,username} = values;

  if(username.length == ""){
    toast.error("Username Required",toastOptions);
    return false;
  }
  else if (password.length == ""){
    toast.error("Password Required",toastOptions);
    return false;
  }
  return true;
}

export const toCheckAllreadyExist = (values) =>{
  if(values.msg === "Request already sent"){
    toast.error("Request already sent",toastOptions);
  }
  if(values.msg === "Request sent successfully"){
    toast.success("Request sent successfully",toastOptions);
  }
}
export const accepted = (values) =>{
  if(values.msg === "Added successfully"){
    toast.success("Added to the contact",toastOptions)
  }else{
    toast.error("Not added",toastOptions)
  }
}

export const rejected = (values) =>{
  if(values.msg === "Removed successfully"){
    toast.warning("Removed successfully",toastOptions)
  }else{
    toast.error("Not added",toastOptions)
  }
}