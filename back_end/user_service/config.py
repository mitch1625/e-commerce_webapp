from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pydantic import Field
import os
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore")
    jwt_secret: str = Field(...)
    url_database: str = Field(...)

    algorithm: str = Field(...)
    token_expire: int = Field(...)

@lru_cache
def get_settings() -> Settings:
    return Settings()