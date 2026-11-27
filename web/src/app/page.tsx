import type { Metadata } from "next";
import Script from "next/script";
import type { CSSProperties } from "react";

import { ProposalLoop } from "@/components/home/proposal-loop";

/*
 * Home do Lume, portada do protótipo em design/home-v2 (feito com o taste-skill).
 * O kit visual fica em public/taste/ e só esta página o carrega. Os links que saem daqui são <a> comuns,
 * que recarregam a página, para o CSS do kit não continuar ativo nas outras telas do app.
 */
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

export const metadata: Metadata = {
  title: { absolute: "Lume: marketplace de serviços para quem contrata e para quem sabe fazer" },
  description:
    "Publique o que você precisa, receba propostas de prestadores e escolha com avaliações dos dois lados. Uma conta para contratar e para oferecer serviços no Lume.",
};

const stylesheets = [
  "system.css",
  "ui/cards.css",
  "motion/motion.css",
  "backgrounds/backgrounds.css",
  "layout/layout.css",
  "layout/demo.css",
  "icons/icon.css",
  "ui/base.css",
  "ui/window/fragment.css",
  "ui/toggles/fragment.css",
  "home.css",
];

const modules = ["system.js", "motion/motion.js", "layout/layout.js"];

const enterScript =
  "document.documentElement.classList.add('m-enter','mo-js');" +
  "setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);" +
  "setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);";

export default function HomePage() {
  return (
    <>
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={`/taste/${href}`} precedence="taste" />
      ))}
      <script dangerouslySetInnerHTML={{ __html: enterScript }} />
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="nav__logo" href="/" aria-label="Lume, início"><img src="/images/brand/logo-lume.png" alt="Lume" width="80" height="26" /></a>
          <nav className="nav__links site-nav" aria-label="Principal">
            <div className="nav__item">
              <a className="nav__link" href="/como-funciona">Como funciona <svg className="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
              <div className="nav__menu">
                <div className="wrap grid">
                  <div className="menu-col span-3">
                    <p className="t-label">Para quem contrata</p>
                    <a href="/para-clientes">Publicar um pedido<span>Diga o que precisa e onde</span></a>
                    <a href="/como-funciona">Comparar propostas<span>Preço, prazo e avaliações lado a lado</span></a>
                  </div>
                  <div className="menu-col span-3">
                    <p className="t-label">Para quem presta serviço</p>
                    <a href="/para-prestadores">Publicar um serviço<span>Rascunho, publicado ou pausado</span></a>
                    <a href="/para-prestadores">Responder a pedidos<span>Envie propostas na sua área</span></a>
                  </div>
                  <a className="menu-card span-3 start-10" href="/ofertas">
                    <div className="panel"><img className="frame__img" src="/images/home-repair.jpg" alt="Mãos fazendo um reparo em madeira" /></div>
                    <span className="t-card">Ver todos os serviços</span>
                    <span className="t-small muted">Da casa ao digital</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="nav__item"><a className="nav__link" href="/explorar">Explorar</a></div>
            <div className="nav__item"><a className="nav__link" href="/para-clientes">Para clientes</a></div>
            <div className="nav__item"><a className="nav__link" href="/para-prestadores">Para prestadores</a></div>
          </nav>
          <div className="nav__actions">
            <a className="nav__link" href="/entrar">Entrar</a>
            <a className="btn btn--primary" href="/criar-conta">Criar sua conta</a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero hero--collage" data-enter aria-labelledby="hero-h">
          <div className="wrap"><div className="hero-text grid hero__grid">
            <div className="hero__text span-5">
              <h1 id="hero-h">Serviços de quem sabe fazer, na sua cidade</h1>
              <p className="hero__lead">Publique o que você precisa, receba propostas de prestadores de Recife a Porto Alegre e escolha pelo preço, pelo prazo e pelas avaliações.</p>
              <div className="btn-row"><a className="btn btn--primary" href="/criar-conta">Criar sua conta<svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path className="m-arrow__stem" d="M1 6h8" /><path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a><a className="btn btn--secondary" href="/ofertas">Ver os serviços</a></div>
              <p className="hero__proof">6 áreas de serviço, presencial ou remoto, com uma conta só.</p>
            </div>
            <div className="hero__art span-6 start-7" role="img" aria-label="Um pedido de instalação de ventilador recebendo quatro propostas no Lume, e uma delas aceita">
              <div className="ly-piece ly-piece--main d-win" aria-hidden="true">
                <div className="d-win__bar"><span className="d-win__dots"><i></i><i></i><i></i></span><span>Lume · Meus pedidos</span></div>
                <div className="d-win__body">
                  <div className="d-side">
                    <span><i></i>Início</span><span className="is-on"><i></i>Pedidos</span><span><i></i>Propostas</span><span><i></i>Serviços</span><span><i></i>Perfil</span>
                    <span className="d-side__label">Pedidos abertos</span><span><i></i>Ventilador</span><span><i></i>Fotos da loja</span>
                  </div>
                  <div className="d-main">
                    <div className="d-main__head"><h4>Instalar ventilador de teto</h4><span className="d-btn">Editar pedido</span></div>
                    <div className="d-tabs"><span className="is-on">Propostas 4</span><span>Detalhes</span><span>Presencial · Rio de Janeiro</span></div>
                    <div className="d-rows">
                      <div className="d-row"><span className="d-thumb av" style={{ "--av": "#f6d9e6", "--avi": "#9c1254" } as CSSProperties}>TC</span><div><b>Tiago Correia</b><small><span className="stars">★ 4,8</span> · 35 avaliações</small></div><span className="num">R$ 180</span><span className="d-chip d-chip--new">Nova</span></div>
                      <div className="d-row"><span className="d-thumb av" style={{ "--av": "#e3e6f2", "--avi": "#27345d" } as CSSProperties}>JM</span><div><b>João Matos</b><small><span className="stars">★ 4,7</span> · 46 avaliações</small></div><span className="num">R$ 210</span><span className="d-chip d-chip--wait">Pendente</span></div>
                      <div className="d-row"><span className="d-thumb av" style={{ "--av": "#e2efe7", "--avi": "#17673f" } as CSSProperties}>RN</span><div><b>Rodrigo Neves</b><small><span className="stars">★ 4,9</span> · 31 avaliações</small></div><span className="num">R$ 195</span><span className="d-chip d-chip--wait">Pendente</span></div>
                      <div className="d-row"><span className="d-thumb av" style={{ "--av": "#f4e8d6", "--avi": "#8a5300" } as CSSProperties}>SL</span><div><b>Sara Lopes</b><small><span className="stars">★ 4,8</span> · 52 avaliações</small></div><span className="num">R$ 240</span><span className="d-chip d-chip--wait">Pendente</span></div>
                      <div className="d-row"><span className="d-thumb av" style={{ "--av": "#ecebe7", "--avi": "#5a6280" } as CSSProperties}>HS</span><div><b>Helena Souza</b><small><span className="stars">★ 4,9</span> · 19 avaliações</small></div><span className="num">R$ 230</span><span className="d-chip d-chip--off">Retirada</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ly-piece ly-piece--note d-card" aria-hidden="true" data-ly-steps="700">
                <div className="d-card__row"><h5>Ventilador de teto</h5><span className="d-chip" data-step data-step-at="4">Aceita</span></div>
                <div className="d-note__line" data-step><i>✓</i><span>Pedido publicado às <b>9:12</b></span></div>
                <div className="d-note__line" data-step><i>✓</i><span><b>4 propostas</b> até as 11:40</span></div>
                <div className="d-note__line" data-step><i>✓</i><span><b>Tiago</b> aceito por <b>R$ 180</b></span></div>
              </div>
            </div>
          </div></div>
        </section>

        <section className="section" id="produto" aria-labelledby="produto-h">
          <div className="wrap">
            <div className="grid">
              <h2 className="span-5" id="produto-h">Pedido, propostas e escolha num lugar só</h2>
              <p className="span-6 start-7 muted">Cada proposta chega com preço, prazo e as avaliações de quem enviou. Você compara, aceita uma e as outras se encerram sozinhas. <a className="link" href="#confianca">Ver como protegemos seus dados</a></p>
            </div>
            <div className="ui app fill" role="img" aria-label="A lista de propostas de um pedido ao lado da proposta aberta de Tiago Correia, com o botão Aceitar proposta" data-ui-pause-host>
              <div className="app__pane app__pane--list">
                <div className="ui ui-panel ui-win" data-ui="window" data-open="Nova" data-work="Pendente" data-done="Aceita">
                  <div className="ui-win__bar">
                    <span className="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                    <span className="ui-win__crumb">Pedidos <i>/</i> <b>Ventilador de teto</b></span>
                    <span className="ui-spacer"></span>
                  </div>
                  <div className="ui-win__body">
                    <nav className="ui-win__side" aria-hidden="true">
                      <span className="ui-win__nav is-on"><svg className="ui-icon" viewBox="0 0 16 16"><path d="M2.5 9h3l1 1.5h3l1-1.5h3" /><path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z" /></svg>Propostas<em>4</em></span>
                      <span className="ui-win__nav"><svg className="ui-icon" viewBox="0 0 16 16"><circle cx="8" cy="6" r="2.5" /><path d="M3.5 13.5c.6-2.3 2.4-3.5 4.5-3.5s3.9 1.2 4.5 3.5" /></svg>Pedidos<em>2</em></span>
                      <span className="ui-win__nav"><svg className="ui-icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" /><path d="M8 5v3l2 1.5" /></svg>Em andamento<em>1</em></span>
                      <span className="ui-win__nav"><svg className="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg>Concluídos</span>
                      <span className="ui-win__label">Áreas</span>
                      <span className="ui-win__nav"><span className="ui-win__hash">#</span>Casa e reparos</span>
                      <span className="ui-win__nav"><span className="ui-win__hash">#</span>Fotografia</span>
                    </nav>
                    <div className="ui-win__main">
                      <div className="ui-win__cols" aria-hidden="true"><span>Prestador</span><span>Proposta</span><span>Situação</span><span>Há</span></div>
                      <ul className="ui-win__rows">
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="1">TC</span><span className="ui-win__who">Tiago Correia</span><span className="ui-win__sub">R$ 180 · amanhã às 9h</span><span className="ui-win__st" data-st>Nova</span><span className="ui-win__age">2 min</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="3">RN</span><span className="ui-win__who">Rodrigo Neves</span><span className="ui-win__sub">R$ 195 · sexta à tarde</span><span className="ui-win__st" data-st>Pendente</span><span className="ui-win__age">40 min</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="4">JM</span><span className="ui-win__who">João Matos</span><span className="ui-win__sub">R$ 210 · sábado de manhã</span><span className="ui-win__st" data-st>Pendente</span><span className="ui-win__age">1 h</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="2">SL</span><span className="ui-win__who">Sara Lopes</span><span className="ui-win__sub">R$ 240 · com material</span><span className="ui-win__st" data-st>Pendente</span><span className="ui-win__age">2 h</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="5">HS</span><span className="ui-win__who">Helena Souza</span><span className="ui-win__sub">R$ 230 · semana que vem</span><span className="ui-win__st is-done" data-st>Retirada</span><span className="ui-win__age">3 h</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="1">MF</span><span className="ui-win__who">Miguel Ferreira</span><span className="ui-win__sub">Site da loja · R$ 3.500</span><span className="ui-win__st" data-st>Pendente</span><span className="ui-win__age">1 dia</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="3">BA</span><span className="ui-win__who">Beatriz Alves</span><span className="ui-win__sub">Fotos da loja · R$ 650</span><span className="ui-win__st is-done" data-st>Aceita</span><span className="ui-win__age">2 dias</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="4">CR</span><span className="ui-win__who">Carolina Reis</span><span className="ui-win__sub">Fotos da loja · R$ 800</span><span className="ui-win__st" data-st>Encerrada</span><span className="ui-win__age">2 dias</span></li>
                        <li className="ui-win__row" data-row><span className="ui-avatar" data-tone="2">MP</span><span className="ui-win__who">Marta Pires</span><span className="ui-win__sub">Textos do site · R$ 1.200</span><span className="ui-win__st" data-st>Pendente</span><span className="ui-win__age">3 dias</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="app__pane app__pane--open">
                <div className="prop" id="prop-open">
                  <div className="prop__head">
                    <span className="prop__av">TC</span>
                    <div className="prop__who"><b>Tiago Correia</b><small>Manutenção e reparos · Rio de Janeiro, RJ · ★ 4,8 (35)</small></div>
                    <span className="prop__state"><span className="d-chip d-chip--new">Nova</span></span>
                  </div>
                  <div className="prop__req">Para o seu pedido <b>Instalar ventilador de teto</b> · presencial, Zona Sul do Rio</div>
                  <dl className="prop__facts">
                    <div><dt>Valor</dt><dd>R$ 180</dd></div>
                    <div><dt>Quando</dt><dd>Amanhã, 9h</dd></div>
                    <div><dt>Duração</dt><dd>2 horas</dd></div>
                  </dl>
                  <p className="prop__msg">Levo escada e as ferramentas. Se a fiação do teto já estiver pronta, o valor inclui a instalação, o teste e a limpeza no final.</p>
                  <div className="prop__actions"><span className="prop__btn prop__btn--go">Aceitar proposta</span><span className="prop__btn">Recusar</span></div>
                  <div className="prop__done"><b>✓</b> Proposta aceita. As outras 3 foram encerradas e o pedido não recebe novas propostas.</div>
                  <div className="prop__others"><span>Rodrigo Neves<em>R$ 195</em></span><span>João Matos<em>R$ 210</em></span><span>Sara Lopes<em>R$ 240</em></span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="dois-lados" aria-labelledby="dois-lados-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="dois-lados-h">Uma conta para os dois lados. <span className="muted">Contrate hoje, ofereça o que você sabe fazer amanhã.</span></h2>
            </div>
            <div className="grid open-cards">
              <article className="card card--row">
                <h3>Publique um pedido</h3>
                <p>Diga o serviço, se é presencial ou remoto e, se quiser, uma faixa de orçamento.</p>
                <div className="panel panel--inset" role="img" aria-label="Um pedido de aulas de violão com orçamento de 60 a 90 reais por aula">
                  <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                    <div className="d-card__row"><h5>Aulas de violão</h5><span className="d-chip">Aberto</span></div>
                    <div className="d-note__line"><i>✓</i><span><b>Remoto</b> ou em Campinas, SP</span></div>
                    <div className="d-note__line"><i>✓</i><span>Orçamento de <b>R$ 60 a R$ 90</b> por aula</span></div>
                    <div className="d-note__line"><i>✓</i><span>Duas vezes por semana, à noite</span></div>
                  </div></div></div>
                </div>
              </article>
              <article className="card card--row">
                <h3>Ofereça seu serviço</h3>
                <p>Monte a oferta com calma, publique quando estiver pronta e pause quando a agenda encher.</p>
                <div className="panel panel--inset" role="img" aria-label="Uma oferta de limpeza residencial publicada, com a opção de pausar">
                  <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                    <div className="d-card__row"><h5>Limpeza residencial</h5><span className="d-chip">Publicada</span></div>
                    <div className="d-note__line"><i>✓</i><span>A partir de <b>R$ 180</b> · Belo Horizonte</span></div>
                    <div className="d-note__line"><i>✓</i><span>Vagas aos sábados</span></div>
                    <div className="d-note__line"><i>‖</i><span>Pausar quando a agenda encher</span></div>
                  </div></div></div>
                </div>
              </article>
              <article className="card card--row">
                <h3>Troque de lado sem outra conta</h3>
                <p>Comece como cliente ou prestador e ative o outro lado no seu perfil quando quiser.</p>
                <div className="panel panel--inset" role="img" aria-label="O perfil de Marta Pires com as capacidades cliente e prestadora ativas">
                  <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                    <div className="d-card__row"><h5>Marta Pires</h5><span className="d-chip">Florianópolis, SC</span></div>
                    <div className="cap"><span className="is-on"><b>Cliente</b>Contrata serviços</span><span className="is-on"><b>Prestadora</b>Oferece serviços</span></div>
                  </div></div></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="areas" aria-labelledby="areas-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="areas-h">Seis áreas de serviço para começar</h2>
            </div>
            <div className="grid areas">
              <a className="area span-4" href="/ofertas?category=casa"><div className="area__ph"><img src="/images/home-repair.jpg" alt="Mãos lixando uma peça de madeira" loading="lazy" /></div><h3>Casa e reparos</h3><p>Montagem, pintura e pequenos consertos</p></a>
              <a className="area span-4" href="/ofertas?category=digital"><div className="area__ph"><img src="/images/web-design.jpg" alt="Tela com o layout de um site em criação" loading="lazy" /></div><h3>Digital e web</h3><p>Sites, design e conteúdo</p></a>
              <a className="area span-4" href="/ofertas?category=fotografia"><div className="area__ph"><img src="/images/photography.jpg" alt="Câmera fotográfica profissional" loading="lazy" /></div><h3>Fotografia</h3><p>Marcas, pessoas e eventos</p></a>
              <a className="area span-4" href="/ofertas?category=limpeza"><div className="area__ph"><img src="/images/cleaning.jpg" alt="Profissional limpando uma bancada clara" loading="lazy" /></div><h3>Limpeza</h3><p>Casas e escritórios</p></a>
              <a className="area span-4" href="/ofertas?category=jardim"><div className="area__ph"><img src="/images/garden.jpg" alt="Mãos cuidando de plantas num jardim" loading="lazy" /></div><h3>Jardim e áreas externas</h3><p>Manutenção, poda e projeto</p></a>
              <a className="area span-4" href="/ofertas?category=tecnologia"><div className="area__ph"><img src="/images/tech-support.jpg" alt="Pessoa recebendo ajuda com um notebook" loading="lazy" /></div><h3>Suporte de informática</h3><p>Computadores, redes e backup</p></a>
            </div>
          </div>
        </section>

        <section className="section statement" id="missao" data-moment="word-highlight" aria-label="Por que o Lume existe">
          <div className="wrap">
            <p className="t-label">Por que o Lume existe</p>
            <p className="mo-wh__text">Muita gente sabe consertar, ensinar, fotografar ou programar e não tem onde mostrar. Do outro lado, alguém precisa disso hoje e não sabe em quem confiar. O Lume junta os dois para que <strong>quem sabe fazer</strong> encontre quem precisa.</p>
          </div>
        </section>

        <section className="section ground-inverse" id="confianca" style={{ "--hm": "2" } as CSSProperties} data-moment="line-carries-colour" data-moment-opts='{"from": "base"}' aria-labelledby="confianca-h">
          <div className="wrap">
              <div className="section-head">
                <h2 id="confianca-h">Confiança antes do primeiro contato</h2>
              </div>
              <div className="grid trust">
                <article className="card card--row card--open span-6">
                  <h3>Avaliações dos dois lados</h3>
                  <p>Cliente e prestador se avaliam depois que os dois confirmam que o serviço foi feito.</p>
                  <div className="panel" role="img" aria-label="Uma avaliação de cinco estrelas liberada depois da confirmação dos dois lados">
                    <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                      <div className="d-card__row"><h5>Serviço concluído</h5><span className="d-chip">2 de 2</span></div>
                      <div className="d-note__line"><i>✓</i><span><b>Você</b> confirmou</span></div>
                      <div className="d-note__line"><i>✓</i><span><b>Tiago</b> confirmou</span></div>
                      <div className="d-note__line"><span className="stars5">★★★★★</span><span>Avaliação liberada</span></div>
                    </div></div></div>
                  </div>
                </article>
                <article className="card card--row card--open span-6">
                  <h3>Seu endereço fica com você</h3>
                  <p>O perfil mostra só cidade e estado. O endereço vai apenas para quem você aceitar.</p>
                  <div className="panel" role="img" aria-label="Quem vê o quê: o público vê a cidade, usuários autenticados a região, e o endereço fica restrito">
                    <div className="stage"><div className="at-rise fit"><div className="d-card loc" aria-hidden="true">
                      <div className="d-card__row"><h5>Quem vê o quê</h5></div>
                      <div className="loc__row"><span>Visitantes</span><em>Niterói, RJ</em></div>
                      <div className="loc__row"><span>Quem entrou na conta</span><em>Icaraí, Niterói</em></div>
                      <div className="loc__row"><span>Endereço completo</span><em className="lock">Só após aceite</em></div>
                    </div></div></div>
                  </div>
                </article>
              <article className="card card--row card--open span-6">
                <h3>Propostas privadas</h3>
                <p>Só quem enviou e quem recebeu veem uma proposta. Aceitar uma encerra as outras na hora.</p>
                <div className="panel" role="img" aria-label="Uma proposta visível apenas para duas pessoas">
                  <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                    <div className="d-card__row"><h5>Proposta de R$ 650</h5><span className="d-chip">Privada</span></div>
                    <div className="d-note__line"><i>✓</i><span>Visível para <b>Beatriz</b> e <b>você</b></span></div>
                    <div className="d-note__line"><i>✓</i><span>Outras 2 propostas encerradas</span></div>
                  </div></div></div>
                </div>
              </article>
              <article className="card card--row card--open span-6">
                <h3>E-mail confirmado para publicar</h3>
                <p>Navegar é livre. Para publicar um pedido, um serviço ou uma proposta, a conta precisa de e-mail verificado.</p>
                <div className="panel" role="img" aria-label="Uma conta com e-mail verificado e publicação liberada">
                  <div className="stage"><div className="at-rise fit"><div className="d-card" aria-hidden="true">
                    <div className="d-card__row"><h5>Sua conta</h5><span className="d-chip">Verificada</span></div>
                    <div className="d-note__line"><i>✓</i><span>E-mail confirmado</span></div>
                    <div className="d-note__line"><i>✓</i><span>Pedidos, serviços e propostas liberados</span></div>
                  </div></div></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="perguntas" aria-labelledby="perguntas-h">
          <div className="wrap">
            <div className="grid grid--top">
              <div className="span-5 stack-6"><h2 id="perguntas-h">Perguntas frequentes</h2><div className="faq__ph"><img src="/images/tech-support.jpg" alt="Uma pessoa ajudando outra a usar um notebook" loading="lazy" /></div></div>
              <div className="faq span-6 start-7">
                <div className="faq__item"><h3>Quem pode oferecer serviços?</h3><p>Qualquer pessoa com uma habilidade para oferecer, de eletricistas e diaristas a designers e professores, presencial ou à distância.</p></div>
                <div className="faq__item"><h3>Preciso de duas contas para contratar e prestar?</h3><p>Não. Você escolhe por onde começar no cadastro e ativa o outro lado depois, no seu perfil.</p></div>
                <div className="faq__item"><h3>O que acontece quando aceito uma proposta?</h3><p>Ela passa a aceita, as outras propostas pendentes se encerram e o pedido deixa de receber novas.</p></div>
                <div className="faq__item"><h3>Posso desistir de uma proposta que enviei?</h3><p>Pode, enquanto ela estiver pendente. Depois de aceita, a proposta não é retirada por um lado só.</p></div>
                <div className="faq__item"><h3>Meu endereço aparece no perfil?</h3><p>Não. O perfil público mostra cidade e estado. Serviços remotos nem pedem endereço.</p></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing footer--dark ground-inverse site-footer" id="contato" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div><h2 id="close-h">Crie sua conta no Lume</h2><p className="t-lead">Comece como cliente ou prestador e ative o outro lado quando quiser.</p></div>
              <a className="btn btn--primary" href="/criar-conta">Criar sua conta<svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path className="m-arrow__stem" d="M1 6h8" /><path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg></a>
            </div>
            <p className="close__word" aria-hidden="true">Lume</p>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <a className="nav__logo" href="/" aria-label="Lume, início"><img src="/images/brand/logo-lume-white.png" alt="Lume" width="93" height="30" /></a>
                <p className="footer__lede">Marketplace de serviços presenciais e remotos, feito no Brasil.</p>
              </div>
              <div className="span-2 footer__col"><h3>Contratar</h3><ul><li><a href="/para-clientes">Para clientes</a></li><li><a href="/ofertas">Serviços</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Prestar</h3><ul><li><a href="/para-prestadores">Para prestadores</a></li><li><a href="/criar-conta">Criar conta</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Descobrir</h3><ul><li><a href="/explorar">Explorar</a></li><li><a href="/como-funciona">Como funciona</a></li></ul></div>
              <div className="span-2 footer__col"><h3>Nesta página</h3><ul><li><a href="#confianca">Confiança</a></li><li><a href="#perguntas">Perguntas</a></li></ul></div>
            </div>
            <div className="footer__legal">
              <span>© 2026 Lume · Versão de demonstração: contas reais, ofertas e perfis fictícios</span>
              <div className="socials"></div>
            </div>
          </div>
        </div>
      </footer>
      <ProposalLoop targetId="prop-open" />
      {modules.map((src) => (
        <Script key={src} src={`/taste/${src}`} type="module" strategy="afterInteractive" />
      ))}
    </>
  );
}
