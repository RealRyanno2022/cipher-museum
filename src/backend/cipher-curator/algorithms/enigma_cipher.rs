pub struct Enigma {
    pub rotors: Vec<Vec<char>>,
    pub reflector: Vec<char>,
    pub rotor_positions: Vec<usize>,
}

impl Enigma {
    pub fn transform(&mut self, text: &str) -> String {
        text.chars().map(|c| self.transform_char(c)).collect()
    }

    fn transform_char(&mut self, c: char) -> char {
        let mut index = (c as u8 - b'A') as usize;
        
        for (i, rotor) in self.rotors.iter().enumerate() {
            index = (rotor[(index + self.rotor_positions[i]) % 26] as u8 - b'A') as usize;
        }
        
        index = (self.reflector[index] as u8 - b'A') as usize;
        
        for (i, rotor) in self.rotors.iter().rev().enumerate() {
            index = rotor.iter().position(|&r| r == (b'A' + index as u8) as char).unwrap();
            index = (index + 26 - self.rotor_positions[self.rotors.len() - 1 - i]) % 26;
        }
        
        self.step_rotors();
        
        (b'A' + index as u8) as char
    }

    fn step_rotors(&mut self) {
        for position in &mut self.rotor_positions {
            *position = (*position + 1) % 26;
            if *position != 0 {
                break;
            }
        }
    }
}

