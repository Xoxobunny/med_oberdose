# uvicorn main:app 
# npm run dev 
from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, firestore, initialize_app
from pydantic import BaseModel
from middleware import add_cors_middleware
from fastapi.responses import JSONResponse
from typing import Optional, Any, Dict, List
from ml_model import predict_risk

app = FastAPI()
add_cors_middleware(app)

# Initialize Firebase
cred = credentials.Certificate("D:/FINAL_PROJECT/serviceAccounKey.json.txt")
initialize_app(cred)
db = firestore.client()
users_ref = db.collection("users")
profiles_ref = db.collection("profiles")
analyses_ref = db.collection("analyses")

class User(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class Profile(BaseModel):
    age: Optional[int] = None
    phn: Optional[str] = None
    name: Optional[str] = None
    gender: Optional[str] = None
    email: str
    medCond: Optional[str] = None
    allergy: Optional[str] = None
    doc: Optional[str] = None
    
class Analysis(BaseModel):
    email: str
    input_data: Optional[Dict[str, Any]] = {}
    result: Optional[Dict[str, Any]] = {}
    pinned: Optional[bool] = False
    summary: Optional[str] = None

class PatientData(BaseModel):
    age: int
    weight: int
    height: int
    gender: str
    medicalHistory: List[str]
    currentMedications: List[str]
    has_chronic_pain: bool
    has_mental_health_dx: bool
    history_of_substance_abuse: bool
    liver_disease: bool
    kidney_disease: bool
    respiratory_disease: bool
    treatment_duration_months: int
    concurrent_benzos: bool
    concurrent_muscle_relaxants: bool
    concurrent_sleep_meds: bool
    concurrent_antidepressants: bool
    tobacco_use: bool
    previous_overdose: bool
    alcohol_use: str
    primary_opioid: str
    daily_dosage_mg: int
    daily_mme: float
    risk_factors_count: int

@app.post("/predict")
async def predict(patient_data: Dict[str, Any] = Body(...)):
    try:
        # Convert boolean fields from string to boolean if necessary
        for key in ['has_chronic_pain', 'has_mental_health_dx', 'history_of_substance_abuse', 'liver_disease', 'kidney_disease', 'respiratory_disease', 'concurrent_benzos', 'concurrent_muscle_relaxants', 'concurrent_sleep_meds', 'concurrent_antidepressants', 'tobacco_use', 'previous_overdose']:
            if isinstance(patient_data.get(key), str):
                patient_data[key] = patient_data[key].lower() in ['true', '1', 't', 'y', 'yes']

        result = predict_risk(patient_data)
        if "error" in result:
            return JSONResponse(status_code=500, content={"detail": result["error"]})
        return {"status": "success", "prediction": result}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})
    
@app.get("/")
def read_root():
    return {"message": "API running!"}

@app.get("/")
def home():
    return {"message": "CORS works fine!"}

@app.post("/add_user")
async def add_user(user: User = Body(...)):
    try:
        user_dict = user.dict()
        # Check if user already exists
        if users_ref.document(user.email).get().exists:
            return JSONResponse(status_code=400, content={"detail": "User with this email already exists"})
        users_ref.document(user.email).set(user_dict)
        return {"status": "success", "user": user_dict}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})
        
@app.get("/get_users")
def get_users():
    docs = users_ref.stream()
    users = [doc.to_dict() for doc in docs]
    return {"users": users}

@app.post("/login")
async def login(credentials: LoginRequest = Body(...)):
    try:
        doc = users_ref.document(credentials.email).get()
        if not doc.exists:
            return JSONResponse(status_code=401, content={"detail": "Invalid credentials"})
        user = doc.to_dict()
        if user.get("password") != credentials.password:
            return JSONResponse(status_code=401, content={"detail": "Invalid credentials"})
        # Remove password before returning
        user.pop("password", None)
        return {"status": "success", "user": user}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.get("/profile/{email}")
async def get_profile(email: str):
    try:
        doc = profiles_ref.document(email).get()
        if not doc.exists:
            return JSONResponse(status_code=404, content={"detail": "Profile not found"})
        return {"status": "success", "profile": doc.to_dict()}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.put("/profile/{email}")
async def upsert_profile(email: str, profile: Profile = Body(...)):
    try:
        profile_dict = profile.dict()
        # Ensure email in body matches URL id (or override)
        profile_dict["email"] = email
        profiles_ref.document(email).set(profile_dict, merge=True)
        return {"status": "success", "profile": profile_dict}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.post("/analysis")
async def save_analysis(analysis: Analysis = Body(...)):
    try:
        data = analysis.dict()
        data["created_at"] = firestore.SERVER_TIMESTAMP

        # ✅ Validation
        if not data.get("email"):
            return JSONResponse(status_code=400, content={"detail": "Missing email"})
        if not data.get("input_data"):
            return JSONResponse(status_code=400, content={"detail": "Missing input data"})
        if not data.get("result"):
            return JSONResponse(status_code=400, content={"detail": "Missing analysis result"})

        # ✅ Firestore .add() returns (write_result, reference)
        _, doc_ref = analyses_ref.add(data)

        return {
            "status": "success",
            "id": doc_ref.id,
            "message": "Analysis saved successfully"
        }

    except Exception as e:
        print(f"🔥 Error in /analysis: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "detail": f"Error saving analysis: {str(e)}"
            }
        )


@app.get("/analysis/{email}")
async def get_user_analysis(email: str):
    try:
        # Simple query without ordering
        query = analyses_ref.where("email", "==", email)
        docs = query.stream()
        
        results = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            
            # Handle timestamp conversion safely
            if "created_at" in data and data["created_at"] is not None:
                try:
                    data["created_at"] = {"seconds": int(data["created_at"].timestamp())}
                except (AttributeError, TypeError):
                    from datetime import datetime
                    data["created_at"] = {"seconds": int(datetime.now().timestamp())}
            else:
                # If no timestamp, use current time
                from datetime import datetime
                data["created_at"] = {"seconds": int(datetime.now().timestamp())}
            
            results.append(data)
        
        # Sort in memory by timestamp (newest first)
        results.sort(key=lambda x: x["created_at"]["seconds"], reverse=True)
        
        return {"analyses": results}
    except Exception as e:
        print(f"Error in get_user_analysis: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Failed to fetch analyses",
                "error": str(e)
            }
        )

@app.put("/analysis/{analysis_id}/pin")
async def pin_analysis(analysis_id: str, payload: Dict[str, bool] = Body(...)):
    try:
        pin = bool(payload.get("pinned", True))
        analyses_ref.document(analysis_id).update({"pinned": pin})
        return {"status": "success", "pinned": pin}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.get("/analysis/pinned/{email}")
def get_pinned_analysis(email: str):
    try:
        query = analyses_ref.where("email", "==", email).where("pinned", "==", True).order_by("created_at", direction=firestore.Query.DESCENDING)
        docs = query.stream()
        results = []
        for doc in docs:
            d = doc.to_dict()
            d["id"] = doc.id
            results.append(d)
        return {"analyses": results}
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": str(e)})

@app.middleware("http")
async def log_requests(request, call_next):
    print("➡️", request.method, request.url)
    response = await call_next(request)
    print("⬅️", response.status_code)
    return response
