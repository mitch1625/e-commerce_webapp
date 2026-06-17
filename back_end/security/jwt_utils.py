# import jwt
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from security.config import get_settings
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, status, Depends, Header

def create_jwt(subject: str, expires_in_minutes: int = 60):
    settings = get_settings()

    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)
    print('ENCODE:', settings.jwt_secret)

    payload = {
        "sub": subject,
        "exp": expire
    }

    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return token, expires_in_minutes
	
security_schema = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security_schema)):
  token_cred = credentials.credentials
  
  settings = get_settings()
  try:
    payload = jwt.decode(
       token_cred, 
       settings.jwt_secret, 
       algorithms=[settings.jwt_algorithm])
    return payload
  
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail='Invalid or expired token'
    )


def get_current_user(authorization: HTTPAuthorizationCredentials = Depends(security_schema)):
    if authorization.scheme != "Bearer":
        raise HTTPException(status_code=401, detail="Invalid auth header")
        
    token = authorization.credentials
    settings = get_settings()

    try:
        content = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        return content["sub"]

    except JWTError as e:
        print("JWTError:", repr(e))

        raise HTTPException(status_code=401, detail="Invalid token")