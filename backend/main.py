from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Literal

from database import init_db, insert_delivery, get_all_deliveries

app = FastAPI()
init_db()

# 🌐 Allow frontend connection (React Vite Dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📊 In-memory mock dashboard data
dashboard_data = {
    "total_deliveries": 25,
    "eco_deliveries": 8,
    "fuel_saved_liters": 13.4,
    "co2_reduced_kg": 31.2,
    "eco_points": 240
}

# 📦 Delivery data model
class DeliveryData(BaseModel):
    pickup: str
    dropoff: str
    date: str
    time: str
    packageType: Literal["small", "medium", "large"]
    ecoFriendly: bool

# 🚀 Submit delivery endpoint
@app.post("/submit-delivery")
def submit_delivery(data: DeliveryData):
    print("✅ Received Delivery Data:", data.dict())
    
    # Save to SQLite DB
    insert_delivery(data)

    # Simulated dashboard metrics update
    dashboard_data["total_deliveries"] += 1
    if data.ecoFriendly:
        dashboard_data["eco_deliveries"] += 1
        dashboard_data["fuel_saved_liters"] += 1.7
        dashboard_data["co2_reduced_kg"] += 3.2
        dashboard_data["eco_points"] += 25

    return {
        "status": "success",
        "message": "Delivery route received and stored.",
        "ecoMatch": data.ecoFriendly,
        "estimated_co2_saved": 3.2 if data.ecoFriendly else 0.0,
        "delivery_group": "cust_1 + cust_2" if data.ecoFriendly else None
    }

# 📊 Dashboard summary endpoint
@app.get("/dashboard-summary")
def get_dashboard_summary():
    return dashboard_data

# 📜 Delivery History endpoint
@app.get("/deliveries")
def fetch_all_deliveries():
    deliveries = get_all_deliveries()
    delivery_list = [
        {
            "id": d[0],
            "pickup": d[1],
            "dropoff": d[2],
            "date": d[3],
            "time": d[4],
            "packageType": d[5],
            "ecoFriendly": bool(d[6])
        }
        for d in deliveries
    ]
    return JSONResponse(content=delivery_list)
