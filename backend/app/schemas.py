from pydantic import BaseModel
from typing import List, Dict

class TicketOutput(BaseModel):
    ticket_id: str
    predicted_group: str
    routing_confidence: float
    duplicate_cluster_id: int
    predicted_resolution_time: float
    sla_limit: float
    risk_level: str

class Insights(BaseModel):
    top_recurring_clusters: Dict
    team_workload: Dict
    risk_distribution: Dict
