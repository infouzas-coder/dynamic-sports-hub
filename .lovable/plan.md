# UZAS black-and-gold retheme

## Scope
- Replace the current dark/crimson palette with the exact logo-derived black, white, and gold values through the global design tokens.
- Keep all page structure, wording, imagery, animations, forms, links, and behavior unchanged.
- Replace the current display, body, and label fonts with Saira Condensed and Saira.

## Changes
- Update `src/styles.css` with the requested semantic palette, retain red only for destructive/error states, map the legacy crimson role to gold, and add gold shade/highlight utilities.
- Style all display headings as Saira Condensed, italic, weight 800, with 0.01em letter spacing.
- Update the root font stylesheet URL and add the black browser theme colour.
- Check shared navigation/footer, homepage, six category pages, catalogues, wholesale, about, AI studio, and contact for any visual red values outside the shared token system.
- Confirm primary gold controls retain black text and validate major headlines at mobile and desktop widths.

## Validation
- Check the generated preview for build/runtime errors.
- Visually inspect representative pages at mobile and desktop sizes, including hero headlines, forms, cards, overlays, and gold controls.
