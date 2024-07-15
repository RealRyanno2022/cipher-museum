use axum::{
    extract::Json,
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use hyper::StatusCode;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use warp::Filter;

#[derive(Deserialize)]
pub struct ProcessData {
    pub input: String,
    pub algorithm: String,
}

#[derive(Deserialize)]
pub struct AlgorithmSelection {
    pub algorithm: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct HistoryItem {
    pub input: String,
    pub output: String,
    pub algorithm: String,
}

pub struct AppState {
    pub algorithm: Mutex<String>,
    pub history: Mutex<Vec<HistoryItem>>,
}

pub async fn get_algorithm_data(state: Arc<AppState>) -> impl IntoResponse {
    let algorithm = state.algorithm.lock().unwrap();
    Json(algorithm.clone())
}

pub async fn process_data(
    state: Arc<AppState>,
    Json(payload): Json<ProcessData>,
) -> impl IntoResponse {
    if !payload.input.chars().all(|c| c.is_ascii_alphabetic()) {
        return (StatusCode::BAD_REQUEST, "Please use alphabetic characters!").into_response();
    }

    let output = format!("Processed {} with {}", payload.input, payload.algorithm); // Placeholder for actual processing
    let history_item = HistoryItem {
        input: payload.input.clone(),
        output: output.clone(),
        algorithm: payload.algorithm.clone(),
    };

    let mut history = state.history.lock().unwrap();
    history.push(history_item.clone());

    Json(history_item).into_response()
}

pub async fn select_algorithm(
    state: Arc<AppState>,
    Json(payload): Json<AlgorithmSelection>,
) -> impl IntoResponse {
    let mut algorithm = state.algorithm.lock().unwrap();
    *algorithm = payload.algorithm.clone();
    Json(algorithm.clone()).into_response()
}

pub fn create_router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/getAlgorithmData", get(get_algorithm_data))
        .route("/api/process", post(process_data))
        .route("/api/selectAlgorithm", post(select_algorithm))
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::new()
                    .allow_origin(Any)
                    .allow_methods(Any)
                    .allow_headers(Any)
                )
                .into_inner(),
        )
        .with_state(state)
}

