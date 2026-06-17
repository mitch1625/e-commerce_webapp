from pydantic import BaseModel, Field, EmailStr
  
class RegisterRequest(BaseModel):
  email: EmailStr
  first_name: str
  last_name: str
  password: str

class UserResponse(BaseModel):
  id: int
  email: str
  first_name: str
  last_name: str

class LoginRequest(BaseModel):
  email:str
  password: str