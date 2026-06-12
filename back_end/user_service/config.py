from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pydantic import Field
import os
class Settings(BaseSettings):
    jwt_key: str
    algorithm: str
    token_expire: int
    # db_name: str
    # db_user: str

    db_password: str
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding = "utf-8",
        extra="allow"
        )
@lru_cache
def get_settings() -> Settings:
    return Settings()