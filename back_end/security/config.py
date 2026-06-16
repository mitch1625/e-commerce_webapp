from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    jwt_secret: str = Field(...,alias="JWT_KEY")
    jwt_algorithm: str = Field(..., alias="ALGORITHM")
    jwt_expires_minutes: int = Field(..., alias="TOKEN_EXPIRE")
    db_name: str = Field(..., alias="DB_NAME")

@lru_cache
def get_settings() -> Settings:
    return Settings()