from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# API routes
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}

# Serve React App
app.mount("/", StaticFiles(directory="../../frontend/build", html=True), name="react_app")

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse("../../frontend/build/index.html")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)