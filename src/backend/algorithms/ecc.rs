extern crate p256;

use p256::{ecdh, ecdsa::{SigningKey, VerifyingKey, signature::{Signer, Verifier}}, PublicKey, EncodedPoint};

pub fn generate_keys() -> (SigningKey, VerifyingKey) {
    let signing_key = SigningKey::random();
    let verify_key = VerifyingKey::from(&signing_key);
    (signing_key, verify_key)
}

pub fn transform(message: &[u8], signing_key: &SigningKey) -> Vec<u8> {
    signing_key.sign(message).to_der().as_bytes().to_vec()
}

pub fn verify(message: &[u8], signature: &[u8], verify_key: &VerifyingKey) -> bool {
    let signature = ecdsa::Signature::from_der(signature).unwrap();
    verify_key.verify(message, &signature).is_ok()
}

pub fn generate_shared_secret(private_key: &SigningKey, public_key: &PublicKey) -> Vec<u8> {
    let secret = ecdh::EphemeralSecret::random();
    let public_key = secret.public_key();
    let shared_secret = secret.diffie_hellman(public_key.as_affine());
    shared_secret.raw_secret_bytes().to_vec()
}

