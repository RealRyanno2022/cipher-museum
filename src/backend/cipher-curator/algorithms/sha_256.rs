extern crate sha2;

use sha2::{Sha256, Digest};

pub fn transform(input: &str) -> String {
    // Create a SHA-256 object
    let mut hasher = Sha256::new();
    
    // Write input data
    hasher.update(input);
    
    // Read hash digest and consume hasher
    let result = hasher.finalize();
    
    // Convert the result to a hexadecimal string
    format!("{:x}", result)
}

pub fn display_hashed_text(hashed_text: &str) {
    println!("SHA-256 Hash: {}", hashed_text);
}

