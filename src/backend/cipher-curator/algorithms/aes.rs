extern crate aes;
extern crate block_modes;
extern crate hex_literal;

use aes::Aes128;
use block_modes::{BlockMode, Cbc};
use block_modes::block_padding::Pkcs7;
use hex_literal::hex;

type Aes128Cbc = Cbc<Aes128, Pkcs7>;

pub fn transform(plain_text: &str, key: &[u8; 16], iv: &[u8; 16]) -> Vec<u8> {
    let cipher = Aes128Cbc::new_from_slices(key, iv).unwrap();
    cipher.encrypt_vec(plain_text.as_bytes())
}

