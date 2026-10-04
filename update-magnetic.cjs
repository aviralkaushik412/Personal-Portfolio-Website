const fs = require('fs');

// Update Hero.tsx
let hero = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');
hero = hero.replace(/import \{ ChevronDown/g, 'import { MagneticButton } from \'../ui/MagneticButton\';\nimport { ChevronDown');

hero = hero.replace(/<a[\s\n]+href="#projects"[\s\S]*?<\/a>/, `<MagneticButton 
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-mono font-medium text-sm tracking-wide rounded-sm overflow-hidden transition-transform"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>`);
          
hero = hero.replace(/<a[\s\n]+href=\{personalInfo\?\.resumeUrl[\s\S]*?<\/a>/, `<MagneticButton 
            href={personalInfo?.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-accent)] text-[var(--color-accent)] font-mono font-medium text-sm tracking-wide rounded-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-colors"
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4" />
          </MagneticButton>`);

fs.writeFileSync('src/components/sections/Hero.tsx', hero);

// Update Contact.tsx
let contact = fs.readFileSync('src/components/sections/Contact.tsx', 'utf8');
contact = contact.replace(/import \{ ArrowRight/g, 'import { MagneticButton } from \'../ui/MagneticButton\';\nimport { ArrowRight');

contact = contact.replace(/<a[\s\n]+href=\{\`mailto:\$\{personalInfo\.email\}\`\}[\s\S]*?<\/a>/, `<MagneticButton 
              href={\`mailto:\${personalInfo.email}\`}
              className="group relative inline-flex items-center gap-2 px-10 py-5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-mono font-medium rounded-sm overflow-hidden transition-transform"
            >
              <span>Say Hello</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>`);

fs.writeFileSync('src/components/sections/Contact.tsx', contact);
