from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cart_service.routes.cart_routes import router as cart_router

def create_app() -> FastAPI:
    app = FastAPI(
        title="Cart Service Backend",
        description=("Backend service for user cart")
    )
    app.include_router(cart_router)
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