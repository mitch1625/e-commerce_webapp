from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):

    db_password: str
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding = "utf-8",
        extra="allow"
        )
    
@lru_cache
def get_settings() -> Settings:
    return Settings()