uuse axum::{
    body::Body,
    handler::get,
    http::{Request, Response, StatusCode},
    Router,
};
use hyper::Server;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::{fs, net::SocketAddr};
use warp::Filter;
use tokio::signal;

#[derive(Deserialize)]
struct AlgorithmInput {
    algorithm: String,
    input: String,
}

#[derive(Serialize)]
struct AlgorithmOutput {
    output: String,
}

struct AppState {
    request_count: usize,
    max_requests: usize,
    is_shutdown: bool,
}

fn get_algorithm_json(state: Arc<Mutex<AppState>>, name: warp::filters::path::Tail) -> impl warp::Reply {
    let mut state = state.lock().unwrap();
    if state.is_shutdown || state.request_count > state.max_requests {
        state.is_shutdown = true;
        return warp::reply::with_status("Service Unavailable", StatusCode::SERVICE_UNAVAILABLE);
    }
    state.request_count += 1;
    
    let algorithm_name = name.as_str();
    let file_path = format!("src/backend/cipher-curator/history/{}.rs.json", algorithm_name);
    match fs::read_to_string(file_path) {
        Ok(content) => warp::reply::json(&content),
        Err(_) => warp::reply::with_status("File not found", StatusCode::NOT_FOUND).into_response(),
    }
}

fn process_input(state: Arc<Mutex<AppState>>, input: AlgorithmInput) -> impl warp::Reply {
    let mut state = state.lock().unwrap();
    if state.is_shutdown || state.request_count > state.max_requests {
        state.is_shutdown = true;
        return warp::reply::with_status("Service Unavailable", StatusCode::SERVICE_UNAVAILABLE);
    }
    state.request_count += 1;

    let algorithm = input.algorithm;
    let input_text = input.input;

    let output = process_algorithm(&algorithm, &input_text);

    warp::reply::json(&AlgorithmOutput { output })
}

fn process_algorithm(algorithm: &str, input: &str) -> String {
    // Implement the logic to call the .rs file and get the encrypted output
    format!("Encrypted output for {} using {}", input, algorithm)
}

fn main() {
    let state = Arc::new(Mutex::new(AppState {
        request_count: 0,
        max_requests: 1000,
        is_shutdown: false,
    }));

    let api = warp::path("algorithm")
        .and(warp::path::tail())
        .and_then({
            let state = state.clone();
            move |name: warp::filters::path::Tail| {
                let response = get_algorithm_json(state.clone(), name);
                std::future::ready(Ok::<_, warp::Rejection>(response))
            }
        })
        .or(warp::path("process")
            .and(warp::post())
            .and(warp::body::json())
            .and_then({
                let state = state.clone();
                move |input: AlgorithmInput| {
                    let response = process_input(state.clone(), input);
                    std::future::ready(Ok::<_, warp::Rejection>(response))
                }
            }));

    let routes = Router::new().nest("/", warp::service(api));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    let server = Server::bind(&addr).serve(routes.into_make_service());

    let shutdown_signal = async {
        signal::ctrl_c().await.expect("failed to install CTRL+C signal handler");
        println!("Shutting down gracefully...");
    };

    hyper::rt::run(async {
        tokio::select! {
            res = server => {
                if let Err(e) = res {
                    eprintln!("server error: {}", e);
                }
            },
            _ = shutdown_signal => {},
        }
    });
}

