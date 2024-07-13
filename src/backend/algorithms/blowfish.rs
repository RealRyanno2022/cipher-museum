extern crate blowfish;

use blowfish::{Blowfish, block_cipher_trait::BlockCipher};

pub fn transform(plain_text: &str, key: &str) -> Vec<u8> {
    let cipher = Blowfish::new_varkey(key.as_bytes()).expect("Invalid key length");

    let mut block = [0u8; 8];
    let mut encrypted = Vec::new();
    let bytes = plain_text.as_bytes();
    
    for (i, &byte) in bytes.iter().enumerate() {
        block[i % 8] = byte;
        if i % 8 == 7 || i == bytes.len() - 1 {
            cipher.encrypt_block(&mut block);
            encrypted.extend_from_slice(&block);
        }
    }

    encrypted
}

pub fn display_encrypted_text(encrypted_text: &[u8]) {
    let hex_string: String = encrypted_text.iter().map(|byte| format!("{:02x}", byte)).collect();
    println!("Encrypted: {}", hex_string);
}

