export interface LoginResponse{
    success:boolean,
    message?:string
    is_owner?:boolean
  }
  
  
  export interface SignUpResponse extends LoginResponse{
    
  }