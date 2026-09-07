import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Instagram, Linkedin, Menu, MoveUpRight, X } from 'lucide-react';

type Category = 'Todos' | 'Sites' | 'Identidade' | 'Experiências';
type Project = {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, 'Todos'>;
  year: string;
  intro: string;
  result: string;
  palette: string;
  pattern: string;
  accent: string;
  tags: string[];
  size: 'wide' | 'tall';
};

const projects: Project[] = [
  {
    id: 'casa-nove', title: 'Casa Nove', client: 'Arquitetura e interiores', category: 'Sites', year: '2024',
    intro: 'Uma casa que se apresenta antes de ser visitada.', result: 'O novo site transformou projetos silenciosos em uma narrativa digital tátil, com espaço para o olhar respirar.',
    palette: 'bg-[#d9e4dc]', pattern: 'radial-gradient(circle at 76% 24%,#efa38d 0 17%,transparent 17.4%),linear-gradient(145deg,#a0bcae 0%,#e6efe5 48%,#eab39e 49%,#cf806f 100%)', accent: '#c86e5b', tags: ['Direção criativa', 'Web design', 'Desenvolvimento'], size: 'wide'
  },
  {
    id: 'alto-mar', title: 'Alto Mar', client: 'Hospitalidade costeira', category: 'Experiências', year: '2023',
    intro: 'Uma pausa com endereço, ritmo e sal.', result: 'Uma experiência editorial para reservar com os olhos: o destino aparece aos poucos, como uma manhã de verão.',
    palette: 'bg-[#e9b85d]', pattern: 'linear-gradient(125deg,#f1d58b 0 38%,#d77b50 38% 56%,#164f52 56% 100%)', accent: '#164f52', tags: ['Estratégia', 'UX/UI', 'Motion'], size: 'tall'
  },
  {
    id: 'folha-fina', title: 'Folha Fina', client: 'Editora independente', category: 'Identidade', year: '2024',
    intro: 'Livros, ideias e um lugar para ficar.', result: 'Da marca ao catálogo digital, o sistema cria uma casa consistente para vozes que não cabem em prateleiras óbvias.',
    palette: 'bg-[#e6dac9]', pattern: 'radial-gradient(ellipse at 28% 64%,#e66f54 0 19%,transparent 19.5%),linear-gradient(35deg,#f3e9d7 0 48%,#1d4741 48% 75%,#df9d57 75%)', accent: '#df6f54', tags: ['Identidade visual', 'Direção', 'E-commerce'], size: 'wide'
  },
  {
    id: 'norte-studio', title: 'Norte Studio', client: 'Design de produto', category: 'Sites', year: '2022',
    intro: 'Tecnologia para tocar, não para explicar.', result: 'Uma vitrine com a precisão de um manual e a energia de um lançamento, feita para transformar atenção em conversa.',
    palette: 'bg-[#bdd0d5]', pattern: 'linear-gradient(135deg,#163f42 0 32%,#eaa35f 32% 54%,#d65f49 54% 73%,#bcd5d8 73%)', accent: '#d65f49', tags: ['Web design', 'Copywriting', 'Código'], size: 'tall'
  },
  {
    id: 'soma', title: 'Soma', client: 'Cuidado e movimento', category: 'Experiências', year: '2023',
    intro: 'Um estúdio que começa no corpo.', result: 'Uma plataforma acolhedora para descobrir práticas, pessoas e pequenos rituais que cabem na vida real.',
    palette: 'bg-[#d6dec9]', pattern: 'radial-gradient(ellipse at 70% 30%,#efa66e 0 23%,transparent 23.5%),linear-gradient(120deg,#d2e0c8 0 42%,#53816f 42% 69%,#e77b5b 69%)', accent: '#53816f', tags: ['Pesquisa', 'Produto digital', 'Conteúdo'], size: 'wide'
  },
];

const categories: Category[] = ['Todos', 'Sites', 'Identidade', 'Experiências'];

function Logo() {
  return (
    <a
      href="#topo"
      className="focus-ring flex items-center gap-3"
      data-testid="link-logo"
    >
      <img
        src="/logo.png"
        alt="DerWell Web"
        className="h-9 w-9 rounded-full object-cover"
      />

      <span className="font-mono-custom text-[11px] font-medium uppercase tracking-[.18em]">
        DerWell{" "}
        <span className="text-[hsl(var(--accent))]">Web</span>
      </span>
    </a>
  );
}
function ProjectArt({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <div className={`project-cover relative h-full w-full overflow-hidden ${project.palette}`}>
    <div className="absolute inset-0" style={{ background: project.pattern }} />
    <div className="absolute -right-10 top-8 h-32 w-32 rounded-full border-[1px] border-[hsl(var(--foreground)/.22)]" />
    <div className="absolute bottom-8 left-7 h-20 w-20 rotate-12 border border-[hsl(var(--foreground)/.3)]" />
    <div className={`absolute ${compact ? 'left-5 top-5 text-[10px]' : 'left-8 top-8 text-xs'} font-mono-custom uppercase tracking-[.22em] text-[hsl(var(--foreground)/.75)]`}>DerWell / {project.year}</div>
    <div className={`absolute bottom-7 right-7 max-w-[70%] text-right font-display italic ${compact ? 'text-4xl' : 'text-6xl md:text-8xl'} leading-[.8] text-[hsl(var(--foreground)/.86)]`}>{project.title}</div>
    <div className="absolute bottom-7 left-7 h-2 w-16" style={{ backgroundColor: project.accent }} />
  </div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return <button type="button" onClick={() => onOpen(project)} className={`project-card group focus-ring relative block w-full overflow-hidden text-left ${project.size === 'tall' ? 'md:row-span-2' : ''}`} data-testid={`card-project-${project.id}`}>
    <div className="aspect-[1.12/1] overflow-hidden md:aspect-auto md:h-full md:min-h-[360px]"><ProjectArt project={project} /></div>
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[hsl(var(--foreground)/.72)] to-transparent px-6 pb-5 pt-20 text-[hsl(var(--background))]">
      <div><div className="font-display text-3xl italic">{project.title}</div><div className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.16em] opacity-75">{project.client}</div></div>
      <span className="project-arrow grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--background)/.65)]"><ArrowUpRight size={17} strokeWidth={1.5} /></span>
    </div>
  </button>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return <div className="fixed inset-0 z-40 grid place-items-center bg-[hsl(var(--foreground)/.7)] p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Detalhes de ${project.title}`} onClick={onClose}>
    <div className="relative max-h-[92dvh] w-full max-w-5xl overflow-auto bg-[hsl(var(--background))] shadow-[var(--shadow-lg)]" onClick={(event) => event.stopPropagation()}>
      <button type="button" className="focus-ring absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--background)/.82)]" onClick={onClose} aria-label="Fechar detalhes" data-testid="button-close-project"><X size={19} /></button>
      <div className="grid md:grid-cols-[1.08fr_.92fr]">
        <div className="min-h-[360px] md:min-h-[610px]"><ProjectArt project={project} /></div>
        <div className="flex flex-col justify-between p-7 md:p-12">
          <div><div className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[hsl(var(--accent))]">Projeto selecionado / {project.year}</div><h2 className="mt-5 font-display text-6xl italic leading-[.9] md:text-8xl">{project.title}</h2><p className="mt-6 max-w-sm text-xl leading-tight text-[hsl(var(--muted-foreground))]">{project.intro}</p></div>
          <div className="mt-14"><div className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.2em]">O que fizemos</div><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-[hsl(var(--foreground)/.2)] px-3 py-1.5 text-xs">{tag}</span>)}</div><p className="mt-8 border-t border-[hsl(var(--foreground)/.15)] pt-5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{project.result}</p><a href="#contato" onClick={onClose} className="mt-8 inline-flex items-center gap-3 font-mono-custom text-xs uppercase tracking-[.15em] text-[hsl(var(--accent))]" data-testid="link-modal-contact">Conversar sobre um projeto <ArrowDownRight size={16} /></a></div>
        </div>
      </div>
    </div>
  </div>;
}

function App() {
  const [filter, setFilter] = useState<Category>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const visibleProjects = useMemo(() => filter === 'Todos' ? projects : projects.filter((project) => project.category === filter), [filter]);

  useEffect(() => {
    document.body.classList.add('grain');
    return () => document.body.classList.remove('grain');
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <div id="topo" className="min-h-[100dvh] bg-[hsl(var(--background))]">
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background)/.88)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Logo />
        <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[72px] flex border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background))] p-6' : 'hidden'} flex-col gap-6 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`} aria-label="Navegação principal">
          {['projetos', 'processo', 'sobre', 'contato'].map((item) => <a key={item} href={`#${item}`} onClick={closeMenu} className="focus-ring font-mono-custom text-[10px] uppercase tracking-[.18em] transition-colors hover:text-[hsl(var(--accent))]" data-testid={`link-nav-${item}`}>{item}</a>)}
        </nav>
        <div className="flex items-center gap-3"><a href="#contato" className="hidden rounded-full bg-[hsl(var(--foreground))] px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5 md:block" data-testid="link-header-contact">Vamos conversar</a><button type="button" className="focus-ring grid h-10 w-10 place-items-center md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} data-testid="button-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </div>
    </header>

    <main>
      <section className="relative mx-auto grid min-h-[760px] max-w-[1400px] items-end overflow-hidden px-5 pb-20 pt-36 md:min-h-[850px] md:grid-cols-[1.15fr_.85fr] md:px-10 md:pb-28">
        <div className="pointer-events-none absolute -right-40 -top-28 h-[620px] w-[620px] rounded-full border border-[hsl(var(--primary)/.28)] md:h-[760px] md:w-[760px]" />
        <div className="pointer-events-none absolute right-[-70px] top-[120px] h-[430px] w-[430px] rounded-full bg-[hsl(var(--secondary)/.45)] blur-3xl" />
        <div className="relative z-10 max-w-4xl">
          <div className="reveal flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.24em] text-[hsl(var(--accent))]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />Estúdio independente / São Paulo</div>
          <h1 className="reveal delay-1 mt-8 max-w-4xl font-display text-[clamp(4.6rem,12vw,11rem)] italic leading-[.79] tracking-[-.05em]">Sites que<br /><span className="text-[hsl(var(--primary))]">ficam</span> na<br />memória.</h1>
          <div className="reveal delay-2 mt-10 flex max-w-xl items-start justify-between gap-8 md:ml-[22%]"><p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))]">Direção, design e código para marcas que preferem ser lembradas a serem apenas encontradas.</p><span className="drift hidden shrink-0 md:block"><ArrowDownRight size={44} strokeWidth={1} /></span></div>
        </div>
        <div className="reveal delay-3 relative mt-16 flex justify-end md:mt-0 md:pb-8"><div className="max-w-[280px] border-l border-[hsl(var(--foreground)/.25)] pl-5"><p className="font-display text-3xl leading-none">O detalhe é a diferença entre presença e ruído.</p><div className="mt-5 font-mono-custom text-[9px] uppercase leading-relaxed tracking-[.16em] text-[hsl(var(--muted-foreground))]">Manifesto 01<br />DerWell Web</div></div></div>
      </section>

      <section className="overflow-hidden border-y border-[hsl(var(--foreground)/.15)] py-4" aria-label="Áreas de atuação">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono-custom text-[10px] uppercase tracking-[.2em]"><span>Direção criativa</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>Experiências digitais</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>Identidades com pulso</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>Direção criativa</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>Experiências digitais</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><span>Identidades com pulso</span></div>
      </section>

      <section id="projetos" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.22em] text-[hsl(var(--accent))]">01 / Trabalho selecionado</div><h2 className="mt-5 font-display text-6xl italic leading-[.85] md:text-8xl">Feito para<br />ser visto.</h2></div><p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Uma seleção de identidades, sites e experiências construídas com intenção — e um pouco de obsessão.</p></div>
        <div className="mt-14 flex flex-wrap gap-2 border-b border-[hsl(var(--foreground)/.15)] pb-5">{categories.map((category) => <button type="button" key={category} onClick={() => setFilter(category)} className={`focus-ring rounded-full px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] transition-colors ${filter === category ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'border border-[hsl(var(--foreground)/.2)] hover:border-[hsl(var(--foreground)/.7)]'}`} data-testid={`button-filter-${category.toLowerCase()}`}>{category}</button>)}</div>
        <div className="mt-8 grid auto-rows-[260px] gap-4 md:grid-cols-2 md:auto-rows-[260px] md:gap-5">{visibleProjects.map((project, index) => <div key={project.id} className={`${project.size === 'tall' ? 'md:row-span-2' : ''} reveal`} style={{ animationDelay: `${index * 80}ms` }}><ProjectCard project={project} onOpen={setSelectedProject} /></div>)}</div>
        <div className="mt-9 flex justify-between font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]"><span>Mostrando {visibleProjects.length} projetos</span><span>Arraste para descobrir</span></div>
      </section>

      <section id="processo" className="bg-[hsl(var(--primary))] px-5 py-24 text-[hsl(var(--primary-foreground))] md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]"><div className="grid gap-16 md:grid-cols-[.8fr_1.2fr]"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.22em] text-[hsl(var(--secondary))]">02 / Como acontece</div><h2 className="mt-5 max-w-sm font-display text-6xl italic leading-[.85] md:text-8xl">Menos<br />etapas.<br />Mais<br />clareza.</h2></div><div className="grid gap-0 border-t border-[hsl(var(--primary-foreground)/.25)]">{[['01', 'Escutar antes de desenhar', 'Toda boa interface começa com uma pergunta certa. Investigamos o que sua marca precisa dizer — e o que pode deixar de dizer.'], ['02', 'Dar forma ao ponto de vista', 'Estratégia, narrativa e direção visual se encontram para criar algo que não parece com todo o resto.'], ['03', 'Fazer funcionar de verdade', 'Design e desenvolvimento caminham juntos. O resultado é bonito de olhar, simples de usar e pronto para crescer.']].map(([num, title, text]) => <div key={num} className="grid gap-5 border-b border-[hsl(var(--primary-foreground)/.25)] py-8 md:grid-cols-[80px_1fr] md:gap-10"><span className="font-mono-custom text-xs text-[hsl(var(--secondary))]">{num}</span><div><h3 className="font-display text-4xl italic">{title}</h3><p className="mt-3 max-w-lg text-sm leading-relaxed text-[hsl(var(--primary-foreground)/.68)]">{text}</p></div></div>)}</div></div></div>
      </section>

      <section id="sobre" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36"><div className="grid items-center gap-14 md:grid-cols-[.85fr_1.15fr]"><div className="relative mx-auto aspect-[.85/1] w-full max-w-md overflow-hidden bg-[hsl(var(--secondary))]"><div className="absolute inset-7 border border-[hsl(var(--foreground)/.35)]" /><div className="absolute left-12 top-14 font-mono-custom text-[10px] uppercase tracking-[.2em]">DW / 01</div><div className="absolute bottom-12 left-10 font-display text-[6.5rem] italic leading-[.7] text-[hsl(var(--primary))]">d<br />w</div><div className="absolute bottom-10 right-10 text-right font-mono-custom text-[9px] uppercase tracking-[.12em]">forma<br />encontro<br />presença</div></div><div><div className="font-mono-custom text-[10px] uppercase tracking-[.22em] text-[hsl(var(--accent))]">03 / Sobre o estúdio</div><h2 className="mt-5 max-w-xl font-display text-6xl italic leading-[.86] md:text-8xl">Um estúdio<br />pequeno,<br /><span className="text-[hsl(var(--primary))]">ideias grandes.</span></h2><p className="mt-8 max-w-lg text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">A DerWell Web existe para tirar boas marcas do lugar comum. Somos uma parceria direta, sem camadas desnecessárias, para construir presenças digitais com personalidade e precisão.</p><div className="mt-10 grid max-w-lg grid-cols-2 gap-y-5 border-t border-[hsl(var(--foreground)/.15)] pt-6 font-mono-custom text-[10px] uppercase tracking-[.14em]"><span>São Paulo / Brasil</span><span>Disponível para projetos</span><span>Desde 2019</span><span>Design + código</span></div></div></div></section>

      <section id="contato" className="bg-[hsl(var(--secondary))] px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1400px]"><div className="grid gap-16 md:grid-cols-[1.15fr_.85fr]"><div><div className="font-mono-custom text-[10px] uppercase tracking-[.22em] text-[hsl(var(--accent))]">04 / Vamos fazer algo</div><h2 className="mt-5 max-w-3xl font-display text-[clamp(4rem,9vw,9rem)] italic leading-[.78] tracking-[-.04em]">Sua próxima<br /><span className="text-[hsl(var(--primary))]">boa ideia</span><br />começa aqui.</h2><a href="mailto:oi@derwell.web" className="mt-10 inline-flex items-center gap-3 border-b border-[hsl(var(--foreground))] pb-2 font-mono-custom text-xs uppercase tracking-[.16em]" data-testid="link-email">oi@derwell.web <ArrowUpRight size={15} /></a></div><div className="md:pt-16"><p className="max-w-xs text-lg leading-tight">Conte um pouco do que você está construindo. A gente responde em até dois dias úteis.</p>{sent ? <div className="mt-9 flex items-start gap-3 border-t border-[hsl(var(--foreground)/.25)] pt-5 text-sm"><Check className="mt-0.5 text-[hsl(var(--primary))]" size={18} /><span>Mensagem recebida. Em breve a gente conversa.</span></div> : <form className="mt-9 border-t border-[hsl(var(--foreground)/.25)] pt-6" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label className="block font-mono-custom text-[10px] uppercase tracking-[.14em]" htmlFor="nome">Seu nome</label><input id="nome" required className="mt-3 w-full border-b border-[hsl(var(--foreground)/.35)] bg-transparent py-3 text-lg outline-none placeholder:text-[hsl(var(--foreground)/.4)] focus:border-[hsl(var(--primary))]" placeholder="Como podemos te chamar?" data-testid="input-name" /><label className="mt-7 block font-mono-custom text-[10px] uppercase tracking-[.14em]" htmlFor="email">Seu e-mail</label><input id="email" type="email" required className="mt-3 w-full border-b border-[hsl(var(--foreground)/.35)] bg-transparent py-3 text-lg outline-none placeholder:text-[hsl(var(--foreground)/.4)] focus:border-[hsl(var(--primary))]" placeholder="voce@empresa.com" data-testid="input-email" /><label className="mt-7 block font-mono-custom text-[10px] uppercase tracking-[.14em]" htmlFor="mensagem">O que está na mesa?</label><textarea id="mensagem" required rows={2} className="mt-3 w-full resize-none border-b border-[hsl(var(--foreground)/.35)] bg-transparent py-3 text-lg outline-none placeholder:text-[hsl(var(--foreground)/.4)] focus:border-[hsl(var(--primary))]" placeholder="Um site, uma mudança, uma ideia..." data-testid="input-message" /><button type="submit" className="focus-ring mt-8 flex items-center gap-3 rounded-full bg-[hsl(var(--foreground))] px-6 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--background))] transition-transform hover:-translate-y-1" data-testid="button-submit-contact">Enviar mensagem <ArrowUpRight size={16} /></button></form>}</div></div></div></section>
    </main>

    <footer className="bg-[hsl(var(--foreground))] px-5 py-10 text-[hsl(var(--background))] md:px-10"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 md:flex-row md:items-end"><div><Logo /><p className="mt-5 max-w-xs text-sm leading-relaxed text-[hsl(var(--background)/.6)]">Design com direção. Código com propósito.</p></div><div className="flex items-center gap-5"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="focus-ring transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-instagram"><Instagram size={19} strokeWidth={1.5} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="focus-ring transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-linkedin"><Linkedin size={19} strokeWidth={1.5} /></a><span className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-[hsl(var(--background)/.55)]">© 2024 DerWell Web</span></div></div></footer>
    {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    <a href="#topo" aria-label="Voltar ao topo" className="focus-ring fixed bottom-5 right-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-1" data-testid="link-back-to-top"><ChevronDown size={18} className="rotate-180" /></a>
  </div>;
}

export default App;
