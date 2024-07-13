use std::collections::HashMap;

pub struct GreatCipher {
    pub table: HashMap<(char, char), char>,
}

impl GreatCipher {
    pub fn transform(&self, text: &str) -> String {
        let mut result = String::new();
        let chars: Vec<char> = text.chars().collect();
        for i in (0..chars.len()).step_by(2) {
            if i + 1 < chars.len() {
                if let Some(&cipher) = self.table.get(&(chars[i], chars[i + 1])) {
                    result.push(cipher);
                }
            } else {
                result.push(chars[i]);
            }
        }
        result
    }
}

