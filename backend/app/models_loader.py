import joblib
from sentence_transformers import SentenceTransformer
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

routing_model = joblib.load(os.path.join(BASE_DIR, "models", "routing_model.pkl"))
sla_model = joblib.load(os.path.join(BASE_DIR, "models", "sla_time_model1.pkl"))

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


