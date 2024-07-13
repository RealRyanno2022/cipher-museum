pub fn transform(text: &str, key: &str) -> String {
    let mut result = String::new();
    for (i, c) in text.chars().enumerate() {
        let key_char = key.chars().nth(i % key.len()).unwrap();
        let transformed_char = (((c as u8 - 'A' as u8) + (key_char as u8 - 'A' as u8)) % 26 + 'A' as u8) as char;
        result.push(transformed_char);
    }
    result
}

