use prost::Message;
use termcolor::{Color, ColorChoice, ColorSpec, StandardStream, WriteColor};

mod mapbox_glyphs {
    include!(concat!(env!("OUT_DIR"), "/mapbox.glyphs.rs"));
}

// TODO: I don't know where this comes from...
const BORDER: u32 = 3;

fn main() {
    let file = std::env::args().nth(1).expect("Usage: cli FILE");
    let data: Vec<u8> = std::fs::read(&file).expect("Failed to read file");
    let glyphset = mapbox_glyphs::GlyphSet::decode(data.as_slice()).expect("Failed to parse");

    for (i, stack) in glyphset.stacks.iter().enumerate() {
        println!("=== stack {i} ===");
        println!("name: {}", stack.name);
        println!("range: {}", stack.range);

        for g in stack.glyphs.iter() {
            let w = g.width + 2 * BORDER;
            let h = g.height + 2 * BORDER;
            println!(
                "id: {} ({w}x{h}, left: {}, top: {}, advance: {})",
                g.id, g.left, g.top, g.advance
            );
            let Some(bitmap) = &g.bitmap else {
                continue;
            };
            let mut stdout = StandardStream::stdout(ColorChoice::Always);
            let mut color_spec = ColorSpec::new();
            for bytes in bitmap.chunks(w as _) {
                for b in bytes {
                    let v = u8::MAX - *b;
                    color_spec.set_bg(Some(Color::Rgb(v, v, v)));
                    stdout.set_color(&color_spec).unwrap();
                    print!("  ");
                }
                color_spec.set_bg(None);
                stdout.set_color(&color_spec).unwrap();
                println!("");
            }
        }
    }
}
