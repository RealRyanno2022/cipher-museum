use std::sync::{Arc, Mutex};
use axum::Server;
use api::{create_router, AppState};
use hyper::Server;

mod api;

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState {
        algorithm: Mutex::new(String::new()),
        history: Mutex::new(Vec::new()),
    });

    let app = create_router(state);

    let addr = "127.0.0.1:8080".parse().unwrap();
    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
