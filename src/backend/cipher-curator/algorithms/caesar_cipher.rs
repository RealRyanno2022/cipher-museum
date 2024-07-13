pub fn transform(text: &str, shift: u8) -> String {
    text.chars()
        .map(|c| {
            let shift = shift % 26;
            let base = if c.is_ascii_lowercase() { b'a' } else { b'A' };
            (((c as u8 - base + shift) % 26) + base) as char
        })
        .collect()
}
