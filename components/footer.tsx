import { Github, Linkedin, Mountain, Mail, MapPin } from "lucide-react"

const footerLinks = {
  skills: [
    { label: "AR/VR Development", href: "#projects" },
    { label: "3D Development", href: "#projects" },
    { label: "Web Development", href: "#projects" },
    { label: "Mobile Development", href: "#projects" },
  ],
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/oNavShaHo", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/navdeep-shah-a56982207", label: "LinkedIn" },
  { icon: Mail, href: "mailto:navdeepshahof@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative bg-secondary/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Mountain className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              <span className="text-lg sm:text-xl font-bold text-foreground">
                Nav<span className="text-primary">deep</span>
              </span>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mb-3 sm:mb-4">
              Software Developer from Dehradun, Uttarakhand. Building immersive digital experiences.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span>Dehradun, Uttarakhand, India</span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Expertise</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.skills.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom - responsive layout */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Navdeep Shah. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
            <Mountain className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            Crafted with passion in Uttarakhand
          </p>
        </div>
      </div>
    </footer>
  )
}
