import numpy as np
from sklearn.cluster import DBSCAN
from app.models_loader import routing_model, sla_model, embedding_model
import pandas as pd
from sklearn.preprocessing import LabelEncoder
def process_uploaded_dataset(df):


    # ----------------------------------
    #  Encode Required Columns
    # ----------------------------------
    priority_map = {
        "low": 1,
        "medium": 2,
        "high": 3,
        "critical": 4
    }

    df["priority_encoded"] = df["priority"].str.lower().map(priority_map)


    le_support = LabelEncoder()
    le_source = LabelEncoder()

    df["support_level_encoded"] = le_support.fit_transform(df["support_level"])
    df["source_encoded"] = le_source.fit_transform(df["source"])

    df["impact_score"] = df["priority_encoded"] * df["affected_users"]

    # Generate Embeddings

    embeddings = embedding_model.encode(df["description"].tolist())


    #  Duplicate Detection
    clustering = DBSCAN(eps=0.01, min_samples=2, metric="cosine")
    df["duplicate_cluster_id"] = clustering.fit_predict(embeddings)

    # 4️⃣ Structured Features


    # Routing features
    X_struct_routing = df[[
        "priority_encoded",
        "affected_users",
        "impact_score"
    ]].values

    # SLA features
    X_struct_sla = df[[
        "priority_encoded",
        "affected_users",
        "impact_score",
        "support_level_encoded",
        "source_encoded"
    ]].values


    X_struct_routing = np.nan_to_num(X_struct_routing)


    # Smart Routing

    X_routing = np.hstack((embeddings, X_struct_routing))

    routing_preds = routing_model.predict(X_routing)
    routing_probs = routing_model.predict_proba(X_routing)

    df["predicted_group"] = routing_preds
    df["routing_confidence"] = routing_probs.max(axis=1)

#  SLA Time Prediction

    X_struct_sla = df[[
    "priority_encoded",
    "affected_users",
    "impact_score"
    ]].values

    predicted_time = sla_model.predict(X_struct_sla)
    df["predicted_resolution_time"] = predicted_time

#  SLA Policy
    sla_policy = {
    4: 1.5,
    3: 3.0,
    2: 6.0,
    1: 12.0
}

    df["sla_limit"] = df["priority_encoded"].map(sla_policy)

# 🔥 Critical Fix
    df["sla_limit"] = df["sla_limit"].fillna(6.0)

# Avoid divide by zero
    df["sla_limit"] = df["sla_limit"].replace(0, 1)

# Risk Scoring
    df["risk_ratio"] = df["predicted_resolution_time"] / df["sla_limit"]
    df["risk_ratio"] = df["risk_ratio"].fillna(0)


    def assign_risk(r):
        if r < 0.6:
            return "Low"
        elif r < 0.85:
            return "Medium"
        elif r < 1.1:
            return "High"
        else:
            return "Critical"

    df["risk_level"] = df["risk_ratio"].apply(assign_risk)


    #  Insights
    top_clusters = (
        df.groupby("duplicate_cluster_id")
        .size()
        .sort_values(ascending=False)
        .head(5)
        .to_dict()
    )

    team_load = df["predicted_group"].value_counts().to_dict()
    risk_distribution = df["risk_level"].value_counts().to_dict()
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.where(pd.notnull(df), None)

    #  Final Output
    result = {
        "tickets": df[[
            "ticket id",
            "predicted_group",
            "routing_confidence",
            "duplicate_cluster_id",
            "predicted_resolution_time",
            "sla_limit",
            "risk_level"
        ]].to_dict(orient="records"),

        "insights": {
            "top_recurring_clusters": top_clusters,
            "team_workload": team_load,
            "risk_distribution": risk_distribution
        }
    }





    return result
