import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  ArrowLeft, 
  User, 
  Link as LinkIcon, 
  BookOpen, 
  Sparkles, 
  Search, 
  HelpCircle,
  Eye,
  Settings,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface SocialLinkInput {
  platform: string;
  url: string;
}

export default function SchemaGenerator() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [university, setUniversity] = useState('');
  const [skills, setSkills] = useState('');
  
  const [socialLinks, setSocialLinks] = useState<SocialLinkInput[]>([
    { platform: 'GitHub', url: '' },
    { platform: 'LinkedIn', url: '' }
  ]);

  const [siteName, setSiteName] = useState('');
  const [potentialAction, setPotentialAction] = useState(true);

  // Set page meta on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Free JSON-LD Schema Generator for Portfolios | Dharwin S";
    
    // Smooth scroll to top
    window.scrollTo(0, 0);

    // Update meta description dynamically
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate perfectly structured JSON-LD Person and WebSite schema markup for your developer portfolio to boost SEO and search visibility.');
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  const handleAddSocial = () => {
    setSocialLinks([...socialLinks, { platform: 'GitHub', url: '' }]);
  };

  const handleRemoveSocial = (index: number) => {
    const updated = [...socialLinks];
    updated.splice(index, 1);
    setSocialLinks(updated);
  };

  const handleSocialChange = (index: number, field: keyof SocialLinkInput, value: string) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  // Prepopulate example developer data (Dharwin's profile)
  const handleLoadExample = () => {
    setName('Dharwin S');
    setJobTitle('Full-Stack Developer & ML Engineer');
    setDescription('Aspiring AI Specialist and Full-Stack Developer specializing in building intelligent, scalable, and responsive web applications.');
    setImageUrl('https://dharwin.tech/dharwin-s-profile.jpg');
    setWebsiteUrl('https://dharwin.tech/');
    setEmail('dharwinsangamani@gmail.com');
    setPhone('+91 8072126400');
    setLocation('TamilNadu, India');
    setUniversity('University');
    setSkills('React, TypeScript, Python, Machine Learning, Full-Stack Development, AI, Cloud Computing');
    setSocialLinks([
      { platform: 'GitHub', url: 'https://github.com/Dharwin77' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/dharwin-s/' },
      { platform: 'LeetCode', url: 'https://leetcode.com/u/dharwins/' }
    ]);
    setSiteName('Dharwin S Portfolio');
    setPotentialAction(true);
    toast.success('Successfully loaded example developer schema data!');
  };

  // Clear Form
  const handleClear = () => {
    setName('');
    setJobTitle('');
    setDescription('');
    setImageUrl('');
    setWebsiteUrl('');
    setEmail('');
    setPhone('');
    setLocation('');
    setUniversity('');
    setSkills('');
    setSocialLinks([
      { platform: 'GitHub', url: '' },
      { platform: 'LinkedIn', url: '' }
    ]);
    setSiteName('');
    toast.info('Form cleared.');
  };

  // Generate JSON-LD object structure
  const generateSchema = () => {
    const cleanSocials = socialLinks
      .map(s => s.url.trim())
      .filter(url => url !== '');

    const personSchema: any = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": name || "Your Name",
      "url": websiteUrl || "https://yourdomain.com/"
    };

    if (jobTitle) personSchema.jobTitle = jobTitle;
    if (description) personSchema.description = description;
    
    if (imageUrl) {
      personSchema.image = {
        "@type": "ImageObject",
        "url": imageUrl,
        "caption": `${name || "Developer"} - Portrait`
      };
    }

    if (email || phone || location) {
      const contact: any = {};
      if (email) personSchema.email = email;
      if (phone) personSchema.telephone = phone;
      if (location) {
        personSchema.address = {
          "@type": "PostalAddress",
          "addressLocality": location
        };
      }
    }

    if (cleanSocials.length > 0) {
      personSchema.sameAs = cleanSocials;
    }

    if (university) {
      personSchema.alumniOf = {
        "@type": "CollegeOrUniversity",
        "name": university
      };
    }

    if (skills) {
      personSchema.knowsAbout = skills.split(',').map(s => s.trim()).filter(s => s !== '');
    }

    // Website Schema
    const websiteSchema: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName || name || "My Developer Portfolio",
      "url": websiteUrl || "https://yourdomain.com/"
    };

    if (potentialAction && websiteUrl) {
      websiteSchema.potentialAction = {
        "@type": "ReadAction",
        "target": websiteUrl
      };
    }

    // Combine in an array if both are configured
    return [personSchema, websiteSchema];
  };

  const schemaObj = generateSchema();
  const schemaString = JSON.stringify(schemaObj, null, 2);
  const scriptTagString = `<script type="application/ld+json">\n${schemaString}\n</script>`;

  const copyToClipboard = async (text: string, isTag: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isTag) {
        setCopiedTag(true);
        setTimeout(() => setCopiedTag(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      toast.success('Markup copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy markup.');
    }
  };

  const downloadJsonLd = () => {
    const blob = new Blob([schemaString], { type: 'application/ld+json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}-schema.jsonld`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded schema markup file!');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] rounded-full bg-cosmic-purple/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] rounded-full bg-cosmic-cyan/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/30 pb-6">
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-xs font-orbitron text-muted-foreground hover:text-cosmic-cyan transition-colors"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </button>
            <h1 className="text-2xl md:text-4xl font-orbitron font-extrabold uppercase tracking-wide flex items-center gap-3">
              <Code2 className="text-cosmic-cyan animate-pulse" size={28} />
              JSON-LD Schema <span className="text-cosmic-cyan cosmic-glow-sm">Generator</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl font-medium">
              Create structured data for your portfolio page to achieve rich snippet results, boost search rankings, and increase click-throughs from search engines.
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleLoadExample}
              className="font-orbitron text-xs border-cosmic-cyan/30 hover:border-cosmic-cyan hover:bg-cosmic-cyan/10 text-cosmic-cyan flex items-center gap-2"
            >
              <Sparkles size={14} /> Load Example
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleClear}
              className="font-orbitron text-xs hover:bg-white/5"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Forms */}
          <div className="lg:col-span-6 space-y-6">
            <Card className="glass-card shadow-xl border-white/5">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="font-orbitron text-sm uppercase tracking-wider flex items-center gap-2 text-cosmic-cyan">
                  <Settings size={16} /> Configuration Panel
                </CardTitle>
                <CardDescription>Configure details for Person and WebSite schema</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid grid-cols-3 bg-muted/30 rounded-xl p-1 mb-6">
                    <TabsTrigger value="personal" className="font-orbitron text-[10px] sm:text-xs">Personal</TabsTrigger>
                    <TabsTrigger value="social" className="font-orbitron text-[10px] sm:text-xs">Socials</TabsTrigger>
                    <TabsTrigger value="website" className="font-orbitron text-[10px] sm:text-xs">WebSite</TabsTrigger>
                  </TabsList>

                  {/* Personal Information Tab */}
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="e.g. Dharwin S" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="jobTitle" className="text-xs font-semibold">Job Title</Label>
                        <Input 
                          id="jobTitle" 
                          placeholder="e.g. Full-Stack Developer" 
                          value={jobTitle} 
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="desc" className="text-xs font-semibold">Professional Bio / Description</Label>
                      <Textarea 
                        id="desc" 
                        placeholder="Brief overview of your specialty and focus areas..." 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-background/40 border-white/10 min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="imageUrl" className="text-xs font-semibold">Profile Photo URL</Label>
                        <Input 
                          id="imageUrl" 
                          placeholder="e.g. https://domain.com/photo.jpg" 
                          value={imageUrl} 
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="webUrl" className="text-xs font-semibold">Website URL</Label>
                        <Input 
                          id="webUrl" 
                          placeholder="e.g. https://dharwin.tech/" 
                          value={websiteUrl} 
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="e.g. dharwin@gmail.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="e.g. +91 8072126400" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs font-semibold">Location / Address</Label>
                        <Input 
                          id="location" 
                          placeholder="e.g. TamilNadu, India" 
                          value={location} 
                          onChange={(e) => setLocation(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="university" className="text-xs font-semibold">Alma Mater / College</Label>
                        <Input 
                          id="university" 
                          placeholder="e.g. University" 
                          value={university} 
                          onChange={(e) => setUniversity(e.target.value)}
                          className="bg-background/40 border-white/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="skills" className="text-xs font-semibold flex items-center justify-between">
                        <span>Skills & Specializations</span>
                        <span className="text-[10px] text-muted-foreground">(Comma-separated list)</span>
                      </Label>
                      <Input 
                        id="skills" 
                        placeholder="React, TypeScript, Python, ML, Cloud" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)}
                        className="bg-background/40 border-white/10"
                      />
                    </div>
                  </TabsContent>

                  {/* Social Profiles Tab */}
                  <TabsContent value="social" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-semibold">Social & Professional Profile Links</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        onClick={handleAddSocial}
                        className="h-8 text-xs font-orbitron border-white/10 hover:border-cosmic-cyan hover:text-cosmic-cyan flex items-center gap-1.5"
                      >
                        <Plus size={12} /> Add Link
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Linking sameAs social profiles helps search engines map your site directly to your digital identities.
                    </p>

                    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                      {socialLinks.map((social, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <select 
                            value={social.platform} 
                            onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                            className="bg-background/40 border border-white/10 rounded-lg p-2 text-xs font-orbitron w-28 h-9 outline-none focus:border-cosmic-cyan"
                          >
                            <option value="GitHub" className="bg-[#0b1120] text-white">GitHub</option>
                            <option value="LinkedIn" className="bg-[#0b1120] text-white">LinkedIn</option>
                            <option value="LeetCode" className="bg-[#0b1120] text-white">LeetCode</option>
                            <option value="Twitter" className="bg-[#0b1120] text-white">Twitter</option>
                            <option value="Instagram" className="bg-[#0b1120] text-white">Instagram</option>
                            <option value="Medium" className="bg-[#0b1120] text-white">Medium</option>
                            <option value="Portfolio" className="bg-[#0b1120] text-white">Other Portfolio</option>
                          </select>
                          <Input 
                            placeholder="Link URL..." 
                            value={social.url} 
                            onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                            className="bg-background/40 border-white/10 text-xs flex-1"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveSocial(idx)}
                            disabled={socialLinks.length <= 1}
                            className="text-muted-foreground hover:text-destructive h-9 w-9"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* WebSite Tab */}
                  <TabsContent value="website" className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="siteName" className="text-xs font-semibold">Website Name</Label>
                      <Input 
                        id="siteName" 
                        placeholder="e.g. Dharwin S Portfolio" 
                        value={siteName} 
                        onChange={(e) => setSiteName(e.target.value)}
                        className="bg-background/40 border-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <input
                          id="potentialAction"
                          type="checkbox"
                          checked={potentialAction}
                          onChange={(e) => setPotentialAction(e.target.checked)}
                          className="h-4 w-4 accent-cosmic-cyan rounded bg-background/40 border-white/10 cursor-pointer"
                        />
                        <Label htmlFor="potentialAction" className="text-xs font-semibold cursor-pointer select-none">
                          Include potentialAction (ReadAction)
                        </Label>
                      </div>
                      <p className="text-[11px] text-muted-foreground pl-6">
                        Signals to crawlers that search users can directly view and read content on your site, enabling rich interaction metrics in Webmasters.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Schema Code & Visual Rich Snippet Preview */}
          <div className="lg:col-span-6 space-y-6">
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid grid-cols-2 bg-muted/30 rounded-xl p-1 mb-6">
                <TabsTrigger value="visual" className="font-orbitron text-xs flex items-center gap-2">
                  <Eye size={14} /> Visual Google Snippet
                </TabsTrigger>
                <TabsTrigger value="code" className="font-orbitron text-xs flex items-center gap-2">
                  <Code2 size={14} /> Generated Code
                </TabsTrigger>
              </TabsList>

              {/* Visual Preview (Simulated Google Card) */}
              <TabsContent value="visual">
                <Card className="glass-card shadow-xl border-white/5 overflow-hidden">
                  <CardHeader className="bg-muted/10 border-b border-white/5 py-4">
                    <CardTitle className="text-xs font-orbitron uppercase tracking-wider flex items-center gap-2 text-cosmic-cyan">
                      <Search size={14} /> Knowledge Graph Simulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <p className="text-xs text-muted-foreground">
                      Structured data helps Google generate rich Knowledge Cards or enhanced profiles for your name queries:
                    </p>

                    {/* Google Knowledge Panel Sandbox */}
                    <div className="bg-[#171717] dark:bg-[#151515] border border-white/15 rounded-xl p-4 sm:p-6 text-white font-sans max-w-md mx-auto shadow-2xl space-y-4">
                      <div className="flex items-start gap-4">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={name || 'Avatar'} 
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-white/15 shadow-md flex-shrink-0"
                            onError={(e) => {
                              // If image fails, hide it or use generic
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cosmic-purple/20 flex items-center justify-center border border-white/10 flex-shrink-0 text-cosmic-purple">
                            <User size={28} />
                          </div>
                        )}
                        <div className="space-y-1">
                          <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-normal leading-tight">{name || 'Your Name'}</h3>
                          <p className="text-xs text-[#9aa0a6] leading-snug">{jobTitle || 'Your Job Title'}</p>
                          {location && <p className="text-[11px] text-[#9aa0a6]">{location}</p>}
                        </div>
                      </div>

                      {description && (
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-xs text-[#bdc1c6] leading-relaxed">
                            {description}
                          </p>
                        </div>
                      )}

                      <div className="border-t border-white/10 pt-3 space-y-2 text-xs">
                        {university && (
                          <div className="flex gap-2">
                            <span className="text-[#9aa0a6] w-20 flex-shrink-0">Education:</span>
                            <span className="text-[#bdc1c6]">{university}</span>
                          </div>
                        )}
                        {skills && (
                          <div className="flex gap-2">
                            <span className="text-[#9aa0a6] w-20 flex-shrink-0">Skills:</span>
                            <span className="text-[#bdc1c6] line-clamp-2">{skills}</span>
                          </div>
                        )}
                        {websiteUrl && (
                          <div className="flex gap-2">
                            <span className="text-[#9aa0a6] w-20 flex-shrink-0">Website:</span>
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-cosmic-cyan hover:underline flex items-center gap-1">
                              {websiteUrl.replace(/https?:\/\/(www\.)?/, '')} <ExternalLink size={10} />
                            </a>
                          </div>
                        )}
                      </div>

                      {socialLinks.filter(s => s.url).length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <span className="text-[10px] text-[#9aa0a6] uppercase tracking-wider block mb-2 font-semibold">Profiles</span>
                          <div className="flex flex-wrap gap-2">
                            {socialLinks.filter(s => s.url).map((soc, i) => (
                              <a 
                                key={i}
                                href={soc.url}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-2.5 py-1 text-[10px] text-[#bdc1c6] hover:text-white transition-all flex items-center gap-1"
                              >
                                {soc.platform}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Generated JSON Code Tab */}
              <TabsContent value="code">
                <Card className="glass-card shadow-xl border-white/5 overflow-hidden">
                  <CardHeader className="bg-muted/10 border-b border-white/5 py-4 flex flex-row justify-between items-center flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xs font-orbitron uppercase tracking-wider flex items-center gap-2 text-cosmic-cyan">
                        <Code2 size={14} /> Schema Code Output
                      </CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => copyToClipboard(scriptTagString, true)}
                        className="h-8 font-orbitron text-[10px] hover:bg-cosmic-cyan hover:text-black transition-colors"
                      >
                        {copiedTag ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                        Copy Script
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard(schemaString, false)}
                        className="h-8 font-orbitron text-[10px] bg-cosmic-cyan text-black hover:bg-cosmic-cyan/85"
                      >
                        {copied ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                        Copy JSON
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={downloadJsonLd}
                        className="h-8 font-orbitron text-[10px] border-white/10 hover:border-cosmic-cyan hover:text-cosmic-cyan"
                      >
                        <Download size={12} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <pre className="p-6 text-xs text-[#38bdf8] bg-[#020617] font-mono overflow-auto max-h-[460px] scrollbar-thin">
                        <code>{scriptTagString}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Informational Guidance Panel */}
        <Card className="bg-[#0c1223] dark:bg-[#070b16] border border-cosmic-cyan/20 rounded-2xl p-6 shadow-md">
          <div className="flex gap-4">
            <div className="p-2.5 bg-cosmic-cyan/10 rounded-xl text-cosmic-cyan h-fit">
              <HelpCircle size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="font-orbitron font-bold text-sm text-cosmic-cyan uppercase tracking-wide">How to use this structured data:</h3>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1.5 leading-relaxed">
                <li>Copy the entire code block using the <strong>Copy Script</strong> button.</li>
                <li>Paste the script tag directly inside the <code>&lt;head&gt;</code> element of your website's main <code>index.html</code>.</li>
                <li>Validate the deployment by using Google's official <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer" className="text-cosmic-cyan hover:underline inline-flex items-center gap-0.5">Schema Validator <ExternalLink size={10} /></a> or <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-cosmic-cyan hover:underline inline-flex items-center gap-0.5">Rich Results Test <ExternalLink size={10} /></a>.</li>
                <li>Over the next few weeks, as search engines re-crawl your webpage, they will pick up these tags and establish a direct connection between your domain name and your credentials, which boosts search visibility.</li>
              </ul>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
