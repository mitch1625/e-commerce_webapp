from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user_service.routes.auth import router as auth_router

def create_app() -> FastAPI:

    app = FastAPI(
        title="User Service Backend",
        description=("User service for e-commerce site"),
    )
    app.include_router(auth_router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
        "https://e-commerce-webapp-3lmc.vercel.app",
        "http://localhost:5173",
        ], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app

app = create_app()
