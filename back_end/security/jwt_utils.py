import jwt
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from security.config import get_settings
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, status, Depends

def create_jwt(
	subject: str,
    expires_in: int | None = None
) -> tuple[str, int]:
	if expires_in is None:
		expires_in = datetime.now() + timedelta(minutes=60)
	
	settings = get_settings()
	payload: dict[str] = {
		"sub": subject,
		'exp': datetime.now(timezone.utc) + timedelta(hours=1)
		}
	
	token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
	return token, expires_in
	
security_schema = HTTPBearer()
def verify_token(token: HTTPAuthorizationCredentials = Depends(security_schema)):
  token_cred = token.credentials
  
  settings = get_settings()
  try:
    payload = jwt.decode(token_cred, settings.jwt_secret, algorithms=settings.jwt_algorithm)
    return payload
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail='Invalid or expired token'
    )
