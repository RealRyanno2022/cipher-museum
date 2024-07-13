use axum::{
    body::Body,
    http::{Request, Response, StatusCode},
    Router,
};
use hyper::Server;
use serde::{Deserialize, Serialize};
use std::fs;
use std::net::SocketAddr;
use warp::Filter;

#[derive(Deserialize)]
struct AlgorithmInput {
    algorithm: String,
    input: String,
}

#[derive(Serialize)]
struct AlgorithmOutput {
    output: String,
}

fn get_algorithm_json(name: warp::filters::path::Tail) -> impl warp::Reply {
    let algorithm_name = name.as_str();
    let file_path = format!("src/backend/cipher-curator/history/{}.rs.json", algorithm_name);
    match fs::read_to_string(file_path) {
        Ok(content) => warp::reply::json(&content),
        Err(_) => warp::reply::with_status("File not found", StatusCode::NOT_FOUND).into_response(),
    }
}

fn process_input(input: AlgorithmInput) -> impl warp::Reply {
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
    let api = warp::path("algorithm")
        .and(warp::path::tail())
        .and_then(|name: warp::filters::path::Tail| {
            let response = get_algorithm_json(name);
            std::future::ready(Ok::<_, warp::Rejection>(response))
        })
        .or(warp::path("process")
            .and(warp::post())
            .and(warp::body::json())
            .and_then(|input: AlgorithmInput| {
                let response = process_input(input);
                std::future::ready(Ok::<_, warp::Rejection>(response))
            }));

    let routes = Router::new().nest("/", warp::service(api));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    let server = Server::bind(&addr).serve(routes.into_make_service());

    hyper::rt::run(server.map_err(|e| eprintln!("server error: {}", e)));
}

