extern crate rsa;
extern crate rand;

use rsa::{RsaPrivateKey, RsaPublicKey, PaddingScheme};
use rand::rngs::OsRng;

pub fn generate_keys() -> (RsaPrivateKey, RsaPublicKey) {
    let mut rng = OsRng;
    let bits = 2048;
    let private_key = RsaPrivateKey::new(&mut rng, bits).unwrap();
    let public_key = RsaPublicKey::from(&private_key);
    (private_key, public_key)
}

pub fn transform(public_key: &RsaPublicKey, data: &[u8]) -> Vec<u8> {
    let mut rng = OsRng;
    public_key.encrypt(&mut rng, PaddingScheme::new_pkcs1v15_encrypt(), data).unwrap()
}

