use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use std::sync::Mutex;

struct AppState {
    algorithm: Mutex<String>,
    history: Mutex<Vec<HistoryItem>>,
}

struct HistoryItem {
    input: String,
    output: String,
    algorithm: String,
}

#[get("/api/getAlgorithmData")]
async fn get_algorithm_data(data: web::Data<AppState>) -> impl Responder {
    let algorithm = data.algorithm.lock().unwrap();
    HttpResponse::Ok().json(&*algorithm)
}

#[derive(Deserialize)]
struct ProcessData {
    algorithm: String,
    input: String,
}

#[post("/api/process")]
async fn process_data(data: web::Data<AppState>, input: web::Json<ProcessData>) -> impl Responder {
    let output = format!("Processed {} with {}", input.input, input.algorithm); // Placeholder for actual processing
    let history_item = HistoryItem {
        input: input.input.clone(),
        output: output.clone(),
        algorithm: input.algorithm.clone(),
    };

    {
        let mut history = data.history.lock().unwrap();
        history.push(history_item.clone());
    }

    HttpResponse::Ok().json(history_item)
}

#[derive(Deserialize)]
struct AlgorithmSelection {
    algorithm: String,
}

#[post("/api/selectAlgorithm")]
async fn select_algorithm(data: web::Data<AppState>, input: web::Json<AlgorithmSelection>) -> impl Responder {
    let mut algorithm = data.algorithm.lock().unwrap();
    *algorithm = input.algorithm.clone();
    HttpResponse::Ok().json(&*algorithm)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let state = web::Data::new(AppState {
        algorithm: Mutex::new(String::new()),
        history: Mutex::new(Vec::new()),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(state.clone())
            .service(get_algorithm_data)
            .service(process_data)
            .service(select_algorithm)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

