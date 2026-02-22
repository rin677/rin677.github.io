/**
 * themes.js — Reading Heatmap Theme System v4
 *
 * Drop next to index.html, include as:
 *   <script src="themes.js"></script>
 *
 * index.html wrappers (keep as-is):
 *   function setTheme(t,s=true){ window.applyTheme(t,s); }
 *   function loadTheme(){ window.applyTheme(localStorage.getItem('reading_heatmap_theme')||'default',false); }
 *
 * Selector target: <div id="themeSelectorGrid" class="theme-selector"></div>
 */

window.THEMES = {

  /* ════════════════════════════════════════
     CLASSIC FLAT
  ════════════════════════════════════════ */

  default: {
    label: 'GitHub Dark',
    preview: { bg: 'linear-gradient(135deg,#0d1117,#161b22)', color: '#c9d1d9' },
    vars: {
      '--bg-primary':    '#0d1117', '--bg-secondary': '#161b22',
      '--bg-tertiary':   '#21262d', '--border-color': '#30363d',
      '--text-primary':  '#c9d1d9', '--text-secondary':'#8b949e',
      '--accent-color':  '#238636', '--accent-hover':  '#2ea043',
      '--danger-color':  '#da3633', '--danger-hover':  '#f85149',
      '--level-0':'#161b22','--level-1':'#0e4429',
      '--level-2':'#006d32','--level-3':'#26a641','--level-4':'#39d353',
    },
  },

  nord: {
    label: 'Nord',
    preview: { bg: 'linear-gradient(135deg,#2e3440,#3b4252)', color: '#88c0d0' },
    vars: {
      '--bg-primary':    '#2e3440', '--bg-secondary': '#3b4252',
      '--bg-tertiary':   '#434c5e', '--border-color': '#4c566a',
      '--text-primary':  '#eceff4', '--text-secondary':'#d8dee9',
      '--accent-color':  '#88c0d0', '--accent-hover':  '#8fbcbb',
      '--danger-color':  '#bf616a', '--danger-hover':  '#d08770',
      '--level-0':'#3b4252','--level-1':'#4d6780',
      '--level-2':'#5e81ac','--level-3':'#7a99c4','--level-4':'#96b1dc',
    },
  },

  dracula: {
    label: 'Dracula',
    preview: { bg: 'linear-gradient(135deg,#282a36,#44475a)', color: '#bd93f9' },
    vars: {
      '--bg-primary':    '#282a36', '--bg-secondary': '#21222c',
      '--bg-tertiary':   '#343746', '--border-color': '#44475a',
      '--text-primary':  '#f8f8f2', '--text-secondary':'#6272a4',
      '--accent-color':  '#50fa7b', '--accent-hover':  '#69ff94',
      '--danger-color':  '#ff5555', '--danger-hover':  '#ff6e6e',
      '--level-0':'#44475a','--level-1':'#1a4a2e',
      '--level-2':'#1f6b3f','--level-3':'#50fa7b','--level-4':'#69ff94',
    },
    extra: `.month-label,.day-label{color:#bd93f9;}`,
  },

  monokai: {
    label: 'Monokai',
    preview: { bg: 'linear-gradient(135deg,#272822,#49483e)', color: '#a6e22e' },
    vars: {
      '--bg-primary':    '#272822', '--bg-secondary': '#3e3d32',
      '--bg-tertiary':   '#49483e', '--border-color': '#75715e',
      '--text-primary':  '#f8f8f2', '--text-secondary':'#75715e',
      '--accent-color':  '#a6e22e', '--accent-hover':  '#e6db74',
      '--danger-color':  '#f92672', '--danger-hover':  '#fd971f',
      '--level-0':'#3e3d32','--level-1':'#3d5a1a',
      '--level-2':'#5a8024','--level-3':'#a6e22e','--level-4':'#c8f55a',
    },
    extra: `h1{color:#e6db74;}`,
  },

  /* ════════════════════════════════════════
     COMMUNITY NAMED
  ════════════════════════════════════════ */

  gruvbox: {
    label: 'Gruvbox Dark',
    preview: { bg: 'linear-gradient(135deg,#282828,#32302f)', color: '#ebdbb2' },
    vars: {
      '--bg-primary':    '#282828', '--bg-secondary': '#32302f',
      '--bg-tertiary':   '#3c3836', '--border-color': '#504945',
      '--text-primary':  '#ebdbb2', '--text-secondary':'#a89984',
      '--accent-color':  '#b8bb26', '--accent-hover':  '#98971a',
      '--danger-color':  '#fb4934', '--danger-hover':  '#fe8019',
      '--level-0':'#32302f','--level-1':'#3c5a1e',
      '--level-2':'#5a7a28','--level-3':'#b8bb26','--level-4':'#d5c4a1',
    },
    extra: `h1{color:#ebdbb2;}`,
  },

  'gruvbox-light': {
    label: 'Gruvbox Light',
    preview: { bg: 'linear-gradient(135deg,#fbf1c7,#f2e5bc)', color: '#3c3836' },
    vars: {
      '--bg-primary':    '#fbf1c7', '--bg-secondary': '#f2e5bc',
      '--bg-tertiary':   '#ebdbb2', '--border-color': '#d5c4a1',
      '--text-primary':  '#3c3836', '--text-secondary':'#7c6f64',
      '--accent-color':  '#79740e', '--accent-hover':  '#98971a',
      '--danger-color':  '#9d0006', '--danger-hover':  '#cc241d',
      '--level-0':'#f2e5bc','--level-1':'#d5c4a1',
      '--level-2':'#bdae93','--level-3':'#79740e','--level-4':'#427b58',
    },
    extra: `h1{color:#3c3836;}.heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.12);}`,
  },

  catppuccin: {
    label: 'Catppuccin Mocha',
    preview: { bg: 'linear-gradient(135deg,#1e1e2e,#181825)', color: '#cba6f7' },
    vars: {
      '--bg-primary':    '#1e1e2e', '--bg-secondary': '#181825',
      '--bg-tertiary':   '#313244', '--border-color': '#45475a',
      '--text-primary':  '#cdd6f4', '--text-secondary':'#6c7086',
      '--accent-color':  '#a6e3a1', '--accent-hover':  '#94e2d5',
      '--danger-color':  '#f38ba8', '--danger-hover':  '#fab387',
      '--level-0':'#181825','--level-1':'#2a4a2e',
      '--level-2':'#3d7a45','--level-3':'#a6e3a1','--level-4':'#cba6f7',
    },
    extra: `h1{color:#cdd6f4;}`,
  },

  'catppuccin-latte': {
    label: 'Catppuccin Latte',
    preview: { bg: 'linear-gradient(135deg,#eff1f5,#e6e9ef)', color: '#8839ef' },
    vars: {
      '--bg-primary':    '#eff1f5', '--bg-secondary': '#e6e9ef',
      '--bg-tertiary':   '#dce0e8', '--border-color': '#ccd0da',
      '--text-primary':  '#4c4f69', '--text-secondary':'#9ca0b0',
      '--accent-color':  '#40a02b', '--accent-hover':  '#179299',
      '--danger-color':  '#d20f39', '--danger-hover':  '#e64553',
      '--level-0':'#e6e9ef','--level-1':'#c0ddb5',
      '--level-2':'#8dcc78','--level-3':'#40a02b','--level-4':'#179299',
    },
    extra: `h1{color:#4c4f69;}.heatmap-panel,.leaderboard-panel,.modal-content{box-shadow:0 2px 8px rgba(0,0,0,.08);}`,
  },

  rosepine: {
    label: 'Rosé Pine',
    preview: { bg: 'linear-gradient(135deg,#191724,#26233a)', color: '#ebbcba' },
    vars: {
      '--bg-primary':    '#191724', '--bg-secondary': '#1f1d2e',
      '--bg-tertiary':   '#26233a', '--border-color': '#403d52',
      '--text-primary':  '#e0def4', '--text-secondary':'#6e6a86',
      '--accent-color':  '#31748f', '--accent-hover':  '#9ccfd8',
      '--danger-color':  '#eb6f92', '--danger-hover':  '#f6c177',
      '--level-0':'#1f1d2e','--level-1':'#1c4a5e',
      '--level-2':'#256880','--level-3':'#31748f','--level-4':'#9ccfd8',
    },
    extra: `h1{color:#e0def4;}`,
  },

  kanagawa: {
    label: 'Kanagawa',
    preview: { bg: 'linear-gradient(135deg,#1f1f28,#16161d)', color: '#7e9cd8' },
    vars: {
      '--bg-primary':    '#1f1f28', '--bg-secondary': '#16161d',
      '--bg-tertiary':   '#2a2a37', '--border-color': '#363646',
      '--text-primary':  '#dcd7ba', '--text-secondary':'#727169',
      '--accent-color':  '#76946a', '--accent-hover':  '#98bb6c',
      '--danger-color':  '#c34043', '--danger-hover':  '#e82424',
      '--level-0':'#16161d','--level-1':'#2d4a2a',
      '--level-2':'#4a6e42','--level-3':'#76946a','--level-4':'#98bb6c',
    },
    extra: `h1{color:#dcd7ba;}`,
  },

  solarized: {
    label: 'Solarized Dark',
    preview: { bg: 'linear-gradient(135deg,#002b36,#073642)', color: '#2aa198' },
    vars: {
      '--bg-primary':    '#002b36', '--bg-secondary': '#073642',
      '--bg-tertiary':   '#0d3d4a', '--border-color': '#1a5261',
      '--text-primary':  '#839496', '--text-secondary':'#586e75',
      '--accent-color':  '#2aa198', '--accent-hover':  '#859900',
      '--danger-color':  '#dc322f', '--danger-hover':  '#cb4b16',
      '--level-0':'#073642','--level-1':'#1a5261',
      '--level-2':'#257a6f','--level-3':'#2aa198','--level-4':'#859900',
    },
    extra: `h1{color:#93a1a1;}`,
  },

  /* ════════════════════════════════════════
     TUI — TERMINAL
  ════════════════════════════════════════ */

  tui: {
    label: '> TUI [green]',
    preview: { bg: '#080808', color: '#00ff41', border: '2px solid #00ff41' },
    vars: {
      '--bg-primary':    '#080808', '--bg-secondary': '#0d0d0d',
      '--bg-tertiary':   '#111',    '--border-color': '#00aa2b',
      '--text-primary':  '#00ff41', '--text-secondary':'#008f11',
      '--accent-color':  '#00ff41', '--accent-hover':  '#39ff6e',
      '--danger-color':  '#ff0000', '--danger-hover':  '#ff4444',
      '--level-0':'#0d0d0d','--level-1':'#003b0f',
      '--level-2':'#006b1c','--level-3':'#00aa2b','--level-4':'#00ff41',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      html,body{background:#080808!important;}
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px);
        pointer-events:none;z-index:9999;}
      body::after{content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(0,255,65,.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;animation:tuiPulse 4s ease-in-out infinite alternate;}
      @keyframes tuiPulse{0%{opacity:.7}100%{opacity:1}}
      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace!important;
        text-shadow:0 0 5px rgba(0,255,65,.6);}
      h1{color:#00ff41;letter-spacing:.14em;text-transform:uppercase;}
      h1::before{content:'> ';color:#008f11;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option,.modal-content{border-radius:0!important;}
      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #00aa2b!important;background:#080808!important;
        box-shadow:0 0 12px rgba(0,255,65,.12),inset 0 0 6px rgba(0,0,0,.9)!important;}
      .modal-content{
        border:1px solid #00ff41!important;background:#080808!important;
        box-shadow:0 0 28px rgba(0,255,65,.28)!important;}
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#080808!important;border:1px solid #00aa2b!important;
        color:#00ff41!important;box-shadow:none!important;}
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(0,255,65,.08)!important;border-color:#00ff41!important;transform:none!important;}
      .log-btn{background:rgba(0,255,65,.08)!important;border:1px solid #00ff41!important;
        color:#00ff41!important;filter:none!important;box-shadow:0 0 10px rgba(0,255,65,.25)!important;}
      .log-btn:hover{background:rgba(0,255,65,.16)!important;transform:none!important;
        box-shadow:0 0 20px rgba(0,255,65,.45)!important;}
      .form-input{background:#0d0d0d!important;border:1px solid #00aa2b!important;
        color:#00ff41!important;box-shadow:none!important;}
      .form-input:focus{border-color:#00ff41!important;box-shadow:0 0 8px rgba(0,255,65,.28)!important;}
      .entry-item,.leaderboard-entry{background:#0d0d0d!important;border:1px solid #00aa2b!important;box-shadow:none!important;}
      .metric-toggle{background:#080808!important;border:1px solid #00aa2b!important;}
      .metric-option.active{background:rgba(0,255,65,.1)!important;border-radius:0!important;}
      .day:hover{outline-color:#00ff41!important;box-shadow:0 0 6px rgba(0,255,65,.6)!important;}
      .day.today{outline-color:#ffff00!important;}
      .user-profile{border:1px solid #00aa2b;}
      .container{position:relative;z-index:1;}
    `,
  },

  'tui-amber': {
    label: '> TUI [amber]',
    preview: { bg: '#090700', color: '#ffb000', border: '2px solid #ffb000' },
    vars: {
      '--bg-primary':    '#090700', '--bg-secondary': '#0e0c00',
      '--bg-tertiary':   '#141100', '--border-color': '#b07800',
      '--text-primary':  '#ffb000', '--text-secondary':'#8a6000',
      '--accent-color':  '#ffb000', '--accent-hover':  '#ffd050',
      '--danger-color':  '#ff4400', '--danger-hover':  '#ff6622',
      '--level-0':'#0e0c00','--level-1':'#3d2c00',
      '--level-2':'#7a5800','--level-3':'#b07800','--level-4':'#ffb000',
    },
    extra: `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      html,body{background:#090700!important;}
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.22) 2px,rgba(0,0,0,.22) 4px);
        pointer-events:none;z-index:9999;}
      body::after{content:'';position:fixed;inset:0;
        background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(255,176,0,.04) 0%,transparent 70%);
        pointer-events:none;z-index:0;animation:amberPulse 5s ease-in-out infinite alternate;}
      @keyframes amberPulse{0%{opacity:.6}100%{opacity:1}}
      body,h1,h2,h3,button,input,select,textarea,
      .btn,.log-btn,.form-input,.stat-value,.leaderboard-value{
        font-family:'Share Tech Mono','Courier New',monospace!important;
        text-shadow:0 0 5px rgba(255,176,0,.5);}
      h1{color:#ffb000;letter-spacing:.14em;text-transform:uppercase;}
      h1::before{content:'> ';color:#8a6000;}
      h1::after{content:'█';animation:blink 1s step-end infinite;font-size:.8em;margin-left:4px;}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      .heatmap-panel,.leaderboard-panel,.goals-section,.modal-content,
      .entry-item,.leaderboard-entry,.btn,.form-input,
      .quick-book-btn,.toggle-section-btn,.day,.user-profile,
      .metric-toggle,.metric-option{border-radius:0!important;}
      .heatmap-panel,.leaderboard-panel,.goals-section{
        border:1px solid #b07800!important;background:#090700!important;
        box-shadow:0 0 12px rgba(255,176,0,.1),inset 0 0 6px rgba(0,0,0,.9)!important;}
      .modal-content{border:1px solid #ffb000!important;background:#090700!important;
        box-shadow:0 0 28px rgba(255,176,0,.22)!important;}
      .btn,.toggle-section-btn,.quick-book-btn{
        background:#090700!important;border:1px solid #b07800!important;
        color:#ffb000!important;box-shadow:none!important;}
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:rgba(255,176,0,.08)!important;border-color:#ffb000!important;transform:none!important;}
      .log-btn{background:rgba(255,176,0,.08)!important;border:1px solid #ffb000!important;
        color:#ffb000!important;filter:none!important;}
      .log-btn:hover{background:rgba(255,176,0,.16)!important;transform:none!important;}
      .form-input{background:#0e0c00!important;border:1px solid #b07800!important;
        color:#ffb000!important;box-shadow:none!important;}
      .entry-item,.leaderboard-entry{background:#0e0c00!important;border:1px solid #b07800!important;box-shadow:none!important;}
      .metric-toggle{background:#090700!important;border:1px solid #b07800!important;}
      .metric-option.active{background:rgba(255,176,0,.1)!important;}
      .day.today{outline-color:#fff!important;}
      .user-profile{border-radius:0!important;border:1px solid #b07800;}
      .container{position:relative;z-index:1;}
    `,
  },

  /* ════════════════════════════════════════
     LIQUID GLASS — Apple visionOS style
     Philosophy: panels are actual glass —
     refractive, specular, caustic. The light
     bends through them. Not milky. Not matte.
     Wet, glossy, dimensional.
  ════════════════════════════════════════ */

  aurora: {
    label: '🫧 Aurora Glass',
    preview: { bg: 'linear-gradient(135deg,#041018,#0a1a30,#1a0836)', color: '#88ffcc' },
    vars: {
      '--bg-primary':    'transparent',
      '--bg-secondary':  'rgba(0,230,150,0.04)',
      '--bg-tertiary':   'rgba(0,230,150,0.08)',
      '--border-color':  'rgba(255,255,255,0.18)',
      '--text-primary':  '#e8fff5',
      '--text-secondary':'rgba(160,255,210,0.6)',
      '--accent-color':  '#00e8a2',
      '--accent-hover':  '#00ffb8',
      '--danger-color':  '#ff6ba0',
      '--danger-hover':  '#ff91bb',
      '--level-0': 'rgba(255,255,255,0.05)',
      '--level-1': 'rgba(0,180,110,0.4)',
      '--level-2': 'rgba(0,210,130,0.6)',
      '--level-3': '#00e8a2',
      '--level-4': '#7fffd4',
    },
    extra: `
      /* ── Vivid animated background ── */
      html,body{
        background:
          radial-gradient(ellipse 110% 90% at 5%  5%,   #00301e 0%, transparent 50%),
          radial-gradient(ellipse 90%  80% at 95% 95%,  #200040 0%, transparent 50%),
          radial-gradient(ellipse 70%  70% at 50% 50%,  #001428 0%, transparent 65%),
          radial-gradient(ellipse 50%  40% at 80% 20%,  #002a40 0%, transparent 55%),
          #020c14 !important;
        background-attachment:fixed!important;
      }

      /* Flowing aurora light — the "liquid" in the background */
      body::before{
        content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
        background:
          radial-gradient(ellipse 80% 55% at 15% 25%,rgba(0,255,140,.22) 0%,transparent 55%),
          radial-gradient(ellipse 60% 70% at 85% 70%,rgba(140,0,255,.16) 0%,transparent 55%),
          radial-gradient(ellipse 40% 35% at 55% 10%,rgba(0,200,255,.10) 0%,transparent 50%);
        animation:auroraFlow 14s ease-in-out infinite alternate;
        will-change:transform,opacity;
      }
      @keyframes auroraFlow{
        0%  {opacity:.65;transform:scale(1)    translateY(0px)  rotate(0deg);}
        33% {opacity:.85;transform:scale(1.04) translateY(-14px)rotate(.4deg);}
        66% {opacity:.55;transform:scale(.98)  translateY(8px)  rotate(-.3deg);}
        100%{opacity:.80;transform:scale(1.02) translateY(-6px) rotate(.2deg);}
      }
      .container{position:relative;z-index:1;}

      /* ── LIQUID GLASS PANELS ──
         Key: refractive tint + specular ridge at top + caustic inner glow
      */
      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:
          linear-gradient(
            160deg,
            rgba(255,255,255,0.13) 0%,
            rgba(0,230,150,0.07)  30%,
            rgba(0,180,120,0.04)  60%,
            rgba(140,0,255,0.04)  100%
          )!important;
        backdrop-filter:blur(40px) saturate(280%) brightness(1.12) contrast(1.05)!important;
        -webkit-backdrop-filter:blur(40px) saturate(280%) brightness(1.12) contrast(1.05)!important;
        border:1px solid rgba(255,255,255,0.22)!important;
        border-top-color:rgba(255,255,255,0.40)!important;   /* specular top edge */
        border-bottom-color:rgba(0,0,0,0.20)!important;
        box-shadow:
          /* specular highlight ridge at top */
          0 1px 0 rgba(255,255,255,0.35) inset,
          /* caustic side glow left */
          2px 0 0 rgba(0,255,160,0.08) inset,
          /* depth shadow */
          0 20px 60px rgba(0,0,0,0.55),
          /* subtle colored halo */
          0 0 40px rgba(0,220,140,0.08)!important;
      }

      .modal-content{
        background:
          linear-gradient(
            150deg,
            rgba(255,255,255,0.16) 0%,
            rgba(0,230,150,0.09)   35%,
            rgba(0,150,120,0.05)   70%,
            rgba(120,0,220,0.05)   100%
          )!important;
        backdrop-filter:blur(60px) saturate(300%) brightness(1.14)!important;
        -webkit-backdrop-filter:blur(60px) saturate(300%) brightness(1.14)!important;
        border:1px solid rgba(255,255,255,0.25)!important;
        border-top-color:rgba(255,255,255,0.45)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.40) inset,
          0 32px 80px rgba(0,0,0,0.65),
          0 0 60px rgba(0,220,140,0.12)!important;
      }

      /* Smaller glass surfaces — lighter treatment */
      .entry-item,.leaderboard-entry{
        background:linear-gradient(135deg,rgba(255,255,255,.10),rgba(0,220,140,.04))!important;
        backdrop-filter:blur(20px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(20px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        border-top-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.18) inset,0 4px 16px rgba(0,0,0,0.35)!important;
      }
      .entry-item:hover,.leaderboard-entry:hover{
        background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(0,230,150,.08))!important;
        border-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.30) inset,0 8px 24px rgba(0,0,0,0.40),0 0 20px rgba(0,220,140,0.12)!important;
      }

      .btn,.toggle-section-btn,.quick-book-btn{
        background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(0,200,120,.05))!important;
        backdrop-filter:blur(16px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.18)!important;
        border-top-color:rgba(255,255,255,0.35)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 3px 12px rgba(0,0,0,0.30)!important;
        color:#e8fff5!important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:linear-gradient(145deg,rgba(0,230,150,.20),rgba(0,200,120,.12))!important;
        border-color:rgba(0,255,160,0.45)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.30) inset,0 6px 20px rgba(0,0,0,0.35),0 0 24px rgba(0,230,150,0.20)!important;
      }

      .form-input{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,180,120,.04))!important;
        backdrop-filter:blur(12px) saturate(180%)!important;
        -webkit-backdrop-filter:blur(12px) saturate(180%)!important;
        border:1px solid rgba(255,255,255,0.16)!important;
        border-top-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.16) inset!important;
        color:#e8fff5!important;
      }
      .form-input:focus{
        border-color:rgba(0,255,160,0.55)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 0 20px rgba(0,220,140,0.25)!important;
      }
      .form-input::placeholder{color:rgba(160,255,210,0.35)!important;}

      .log-btn{
        background:linear-gradient(145deg,rgba(0,230,150,.35),rgba(0,180,120,.25))!important;
        border:1px solid rgba(0,255,160,0.50)!important;
        border-top-color:rgba(255,255,255,0.40)!important;
        backdrop-filter:blur(16px) saturate(220%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(220%)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.35) inset,
          0 6px 24px rgba(0,180,120,0.40),
          0 0 40px rgba(0,230,150,0.20)!important;
        filter:none!important;color:#ffffff!important;
      }
      .log-btn:hover{
        background:linear-gradient(145deg,rgba(0,255,160,.45),rgba(0,210,140,.35))!important;
        transform:translateY(-2px)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.45) inset,
          0 10px 32px rgba(0,200,130,0.50),
          0 0 60px rgba(0,255,160,0.28)!important;
      }

      .goals-section{
        background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(0,200,140,.06))!important;
        backdrop-filter:blur(30px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(30px) saturate(240%)!important;
        border:1px solid rgba(255,255,255,0.18)!important;
        border-top-color:rgba(255,255,255,0.32)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 12px 40px rgba(0,0,0,0.40)!important;
      }

      .tooltip{
        background:linear-gradient(135deg,rgba(2,20,12,.88),rgba(0,30,20,.78))!important;
        backdrop-filter:blur(40px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(40px) saturate(200%)!important;
        border:1px solid rgba(0,255,160,0.30)!important;
        border-top-color:rgba(255,255,255,0.25)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.12) inset,0 8px 24px rgba(0,0,0,0.50)!important;
      }

      .metric-toggle{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(0,180,120,.04))!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .metric-option.active{
        background:linear-gradient(135deg,rgba(0,230,150,.22),rgba(0,180,120,.15))!important;
        color:#00ffb8!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset!important;
      }

      h1{color:#7fffd4;text-shadow:0 0 24px rgba(0,255,160,0.45),0 2px 8px rgba(0,0,0,0.6);}
      .modal{background:rgba(0,0,0,.50)!important;backdrop-filter:blur(8px)!important;}

      /* Glass shimmer on heatmap panel hover */
      .heatmap-panel::before{
        content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
        background:linear-gradient(105deg,rgba(255,255,255,0) 30%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0) 70%);
        opacity:0;transition:opacity 0.4s;
      }
      .heatmap-panel{position:relative;overflow:hidden;}
      .heatmap-panel:hover::before{opacity:1;}
    `,
  },

  midnight: {
    label: '🫧 Midnight Glass',
    preview: { bg: 'linear-gradient(135deg,#020610,#060c20,#0a0430)', color: '#7aa2f7' },
    vars: {
      '--bg-primary':    'transparent',
      '--bg-secondary':  'rgba(60,100,255,0.04)',
      '--bg-tertiary':   'rgba(80,120,255,0.08)',
      '--border-color':  'rgba(255,255,255,0.18)',
      '--text-primary':  '#d0e0ff',
      '--text-secondary':'rgba(160,190,255,0.60)',
      '--accent-color':  '#5b8cff',
      '--accent-hover':  '#7facff',
      '--danger-color':  '#ff5c7a',
      '--danger-hover':  '#ff7f98',
      '--level-0': 'rgba(255,255,255,0.05)',
      '--level-1': 'rgba(30,60,200,0.40)',
      '--level-2': 'rgba(50,90,230,0.60)',
      '--level-3': '#5b8cff',
      '--level-4': '#a0c4ff',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 110% 80% at 8%  8%,  #00053d 0%,transparent 50%),
          radial-gradient(ellipse 80%  90% at 92% 92%,  #1a0055 0%,transparent 52%),
          radial-gradient(ellipse 60%  60% at 50% 45%,  #000820 0%,transparent 65%),
          radial-gradient(ellipse 45%  35% at 75% 15%,  #000d40 0%,transparent 55%),
          #010308 !important;
        background-attachment:fixed!important;
      }

      body::before{
        content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
        background:
          radial-gradient(ellipse 75% 60% at 22% 20%,rgba(60,100,255,.22) 0%,transparent 58%),
          radial-gradient(ellipse 55% 65% at 80% 78%,rgba(120,50,255,.16) 0%,transparent 55%),
          radial-gradient(ellipse 35% 40% at 60% 5%, rgba(0,180,255,.08) 0%,transparent 50%);
        animation:midnightShift 18s ease-in-out infinite alternate;
        will-change:transform,opacity;
      }
      @keyframes midnightShift{
        0%  {opacity:.60;transform:scale(1)    translateY(0px);}
        40% {opacity:.80;transform:scale(1.05) translateY(-18px);}
        70% {opacity:.55;transform:scale(.97)  translateY(10px);}
        100%{opacity:.75;transform:scale(1.03) translateY(-8px);}
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:
          linear-gradient(
            155deg,
            rgba(255,255,255,0.12) 0%,
            rgba(80,120,255,0.07)  35%,
            rgba(50,80,220,0.04)   65%,
            rgba(130,60,255,0.04)  100%
          )!important;
        backdrop-filter:blur(40px) saturate(280%) brightness(1.10) contrast(1.04)!important;
        -webkit-backdrop-filter:blur(40px) saturate(280%) brightness(1.10) contrast(1.04)!important;
        border:1px solid rgba(255,255,255,0.20)!important;
        border-top-color:rgba(255,255,255,0.38)!important;
        border-bottom-color:rgba(0,0,0,0.22)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.32) inset,
          2px 0 0 rgba(80,140,255,0.06) inset,
          0 20px 60px rgba(0,0,0,0.60),
          0 0 40px rgba(60,110,255,0.08)!important;
      }

      .modal-content{
        background:
          linear-gradient(
            148deg,
            rgba(255,255,255,0.15) 0%,
            rgba(80,130,255,0.09)  40%,
            rgba(50,80,220,0.05)   75%,
            rgba(140,60,255,0.04)  100%
          )!important;
        backdrop-filter:blur(60px) saturate(300%) brightness(1.12)!important;
        -webkit-backdrop-filter:blur(60px) saturate(300%) brightness(1.12)!important;
        border:1px solid rgba(255,255,255,0.22)!important;
        border-top-color:rgba(255,255,255,0.42)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.38) inset,
          0 32px 80px rgba(0,0,0,0.68),
          0 0 60px rgba(70,120,255,0.12)!important;
      }

      .entry-item,.leaderboard-entry{
        background:linear-gradient(135deg,rgba(255,255,255,.10),rgba(70,110,255,.05))!important;
        backdrop-filter:blur(20px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(20px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.14)!important;
        border-top-color:rgba(255,255,255,0.26)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.16) inset,0 4px 16px rgba(0,0,0,0.40)!important;
      }
      .entry-item:hover,.leaderboard-entry:hover{
        background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(80,130,255,.10))!important;
        border-color:rgba(255,255,255,0.26)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.28) inset,0 8px 24px rgba(0,0,0,0.45),0 0 20px rgba(70,120,255,0.14)!important;
      }

      .btn,.toggle-section-btn,.quick-book-btn{
        background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(60,100,255,.06))!important;
        backdrop-filter:blur(16px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.17)!important;
        border-top-color:rgba(255,255,255,0.32)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 3px 12px rgba(0,0,0,0.35)!important;
        color:#d0e0ff!important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:linear-gradient(145deg,rgba(80,130,255,.22),rgba(60,100,220,.14))!important;
        border-color:rgba(120,170,255,0.45)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.28) inset,0 6px 20px rgba(0,0,0,0.40),0 0 24px rgba(80,130,255,0.22)!important;
      }

      .form-input{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(60,100,255,.04))!important;
        backdrop-filter:blur(12px) saturate(180%)!important;
        -webkit-backdrop-filter:blur(12px) saturate(180%)!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        border-top-color:rgba(255,255,255,0.26)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.14) inset!important;
        color:#d0e0ff!important;
      }
      .form-input:focus{
        border-color:rgba(120,170,255,0.55)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 0 20px rgba(80,130,255,0.25)!important;
      }
      .form-input::placeholder{color:rgba(160,190,255,0.35)!important;}

      .log-btn{
        background:linear-gradient(145deg,rgba(80,130,255,.38),rgba(60,100,220,.26))!important;
        border:1px solid rgba(120,170,255,0.50)!important;
        border-top-color:rgba(255,255,255,0.40)!important;
        backdrop-filter:blur(16px) saturate(220%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(220%)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.35) inset,
          0 6px 24px rgba(60,110,255,0.45),
          0 0 40px rgba(80,130,255,0.22)!important;
        filter:none!important;color:#ffffff!important;
      }
      .log-btn:hover{
        background:linear-gradient(145deg,rgba(100,155,255,.48),rgba(80,120,240,.36))!important;
        transform:translateY(-2px)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.45) inset,
          0 10px 32px rgba(70,120,255,0.52),
          0 0 60px rgba(100,150,255,0.30)!important;
      }

      .goals-section{
        background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(70,110,255,.06))!important;
        backdrop-filter:blur(30px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(30px) saturate(240%)!important;
        border:1px solid rgba(255,255,255,0.16)!important;
        border-top-color:rgba(255,255,255,0.30)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 12px 40px rgba(0,0,0,0.45)!important;
      }

      .tooltip{
        background:linear-gradient(135deg,rgba(2,4,22,.90),rgba(5,10,40,.82))!important;
        backdrop-filter:blur(40px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(40px) saturate(200%)!important;
        border:1px solid rgba(100,150,255,0.32)!important;
        border-top-color:rgba(255,255,255,0.22)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.10) inset,0 8px 24px rgba(0,0,0,0.55)!important;
      }

      .metric-toggle{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(60,100,255,.04))!important;
        border:1px solid rgba(255,255,255,0.14)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .metric-option.active{
        background:linear-gradient(135deg,rgba(80,130,255,.24),rgba(60,100,220,.16))!important;
        color:#a0c4ff!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.18) inset!important;
      }

      h1{color:#7aa2f7;text-shadow:0 0 24px rgba(100,150,255,0.50),0 2px 8px rgba(0,0,0,0.6);}
      .modal{background:rgba(0,0,0,.52)!important;backdrop-filter:blur(8px)!important;}

      .heatmap-panel{position:relative;overflow:hidden;}
      .heatmap-panel::before{
        content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
        background:linear-gradient(110deg,rgba(255,255,255,0) 30%,rgba(255,255,255,0.05) 50%,rgba(255,255,255,0) 70%);
        opacity:0;transition:opacity 0.4s;
      }
      .heatmap-panel:hover::before{opacity:1;}
    `,
  },

  sunset: {
    label: '🫧 Sunset Glass',
    preview: { bg: 'linear-gradient(135deg,#1a0400,#200810,#0e0018)', color: '#ff9f43' },
    vars: {
      '--bg-primary':    'transparent',
      '--bg-secondary':  'rgba(255,100,20,0.04)',
      '--bg-tertiary':   'rgba(255,120,30,0.08)',
      '--border-color':  'rgba(255,255,255,0.18)',
      '--text-primary':  '#ffe8d0',
      '--text-secondary':'rgba(255,200,150,0.60)',
      '--accent-color':  '#ff8c32',
      '--accent-hover':  '#ffaa5a',
      '--danger-color':  '#ff3a5a',
      '--danger-hover':  '#ff5a78',
      '--level-0': 'rgba(255,255,255,0.05)',
      '--level-1': 'rgba(180,50,10,0.42)',
      '--level-2': 'rgba(220,80,15,0.60)',
      '--level-3': '#ff8c32',
      '--level-4': '#ffcc80',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 110% 80% at 10% 8%,  #3d0800 0%,transparent 50%),
          radial-gradient(ellipse 85%  85% at 90% 90%,  #280038 0%,transparent 52%),
          radial-gradient(ellipse 60%  60% at 50% 45%,  #1a0006 0%,transparent 65%),
          radial-gradient(ellipse 50%  35% at 70% 5%,   #240014 0%,transparent 55%),
          #0c0002 !important;
        background-attachment:fixed!important;
      }

      body::before{
        content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
        background:
          radial-gradient(ellipse 80% 58% at 18% 18%,rgba(255,100,20,.24) 0%,transparent 56%),
          radial-gradient(ellipse 60% 68% at 82% 78%,rgba(200,20,90,.18) 0%,transparent 54%),
          radial-gradient(ellipse 40% 38% at 58% 8%, rgba(255,60,120,.08) 0%,transparent 50%);
        animation:sunsetFlow 16s ease-in-out infinite alternate;
        will-change:transform,opacity;
      }
      @keyframes sunsetFlow{
        0%  {opacity:.60;transform:scale(1)    translateY(0px);}
        35% {opacity:.82;transform:scale(1.05) translateY(-16px);}
        70% {opacity:.52;transform:scale(.97)  translateY(9px);}
        100%{opacity:.76;transform:scale(1.03) translateY(-7px);}
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:
          linear-gradient(
            158deg,
            rgba(255,255,255,0.13) 0%,
            rgba(255,120,40,0.08)  35%,
            rgba(220,80,20,0.05)   65%,
            rgba(200,20,100,0.05)  100%
          )!important;
        backdrop-filter:blur(40px) saturate(280%) brightness(1.12) contrast(1.05)!important;
        -webkit-backdrop-filter:blur(40px) saturate(280%) brightness(1.12) contrast(1.05)!important;
        border:1px solid rgba(255,255,255,0.20)!important;
        border-top-color:rgba(255,255,255,0.38)!important;
        border-bottom-color:rgba(0,0,0,0.22)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.32) inset,
          2px 0 0 rgba(255,140,60,0.06) inset,
          0 20px 60px rgba(0,0,0,0.58),
          0 0 40px rgba(255,100,30,0.08)!important;
      }

      .modal-content{
        background:
          linear-gradient(
            150deg,
            rgba(255,255,255,0.15) 0%,
            rgba(255,130,50,0.10)  38%,
            rgba(200,70,20,0.06)   72%,
            rgba(180,20,90,0.05)   100%
          )!important;
        backdrop-filter:blur(60px) saturate(300%) brightness(1.13)!important;
        -webkit-backdrop-filter:blur(60px) saturate(300%) brightness(1.13)!important;
        border:1px solid rgba(255,255,255,0.22)!important;
        border-top-color:rgba(255,255,255,0.42)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.38) inset,
          0 32px 80px rgba(0,0,0,0.65),
          0 0 60px rgba(255,110,40,0.12)!important;
      }

      .entry-item,.leaderboard-entry{
        background:linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,100,30,.05))!important;
        backdrop-filter:blur(20px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(20px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        border-top-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.18) inset,0 4px 16px rgba(0,0,0,0.38)!important;
      }
      .entry-item:hover,.leaderboard-entry:hover{
        background:linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,120,50,.10))!important;
        border-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.30) inset,0 8px 24px rgba(0,0,0,0.42),0 0 20px rgba(255,120,40,0.14)!important;
      }

      .btn,.toggle-section-btn,.quick-book-btn{
        background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,100,30,.06))!important;
        backdrop-filter:blur(16px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.17)!important;
        border-top-color:rgba(255,255,255,0.32)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 3px 12px rgba(0,0,0,0.32)!important;
        color:#ffe8d0!important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:linear-gradient(145deg,rgba(255,130,50,.22),rgba(220,90,20,.14))!important;
        border-color:rgba(255,160,80,0.45)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.28) inset,0 6px 20px rgba(0,0,0,0.38),0 0 24px rgba(255,120,50,0.22)!important;
      }

      .form-input{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,100,30,.04))!important;
        backdrop-filter:blur(12px) saturate(180%)!important;
        -webkit-backdrop-filter:blur(12px) saturate(180%)!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        border-top-color:rgba(255,255,255,0.26)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.14) inset!important;
        color:#ffe8d0!important;
      }
      .form-input:focus{
        border-color:rgba(255,160,80,0.55)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 0 20px rgba(255,130,50,0.25)!important;
      }
      .form-input::placeholder{color:rgba(255,200,150,0.35)!important;}

      .log-btn{
        background:linear-gradient(145deg,rgba(255,130,50,.38),rgba(220,90,20,.26))!important;
        border:1px solid rgba(255,160,80,0.50)!important;
        border-top-color:rgba(255,255,255,0.40)!important;
        backdrop-filter:blur(16px) saturate(220%)!important;
        -webkit-backdrop-filter:blur(16px) saturate(220%)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.35) inset,
          0 6px 24px rgba(220,100,30,0.45),
          0 0 40px rgba(255,130,50,0.22)!important;
        filter:none!important;color:#ffffff!important;
      }
      .log-btn:hover{
        background:linear-gradient(145deg,rgba(255,160,70,.48),rgba(240,110,30,.36))!important;
        transform:translateY(-2px)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.45) inset,
          0 10px 32px rgba(230,110,40,0.52),
          0 0 60px rgba(255,150,60,0.30)!important;
      }

      .goals-section{
        background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,100,30,.06))!important;
        backdrop-filter:blur(30px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(30px) saturate(240%)!important;
        border:1px solid rgba(255,255,255,0.16)!important;
        border-top-color:rgba(255,255,255,0.30)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 12px 40px rgba(0,0,0,0.42)!important;
      }

      .tooltip{
        background:linear-gradient(135deg,rgba(20,4,0,.90),rgba(30,8,0,.82))!important;
        backdrop-filter:blur(40px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(40px) saturate(200%)!important;
        border:1px solid rgba(255,140,60,0.32)!important;
        border-top-color:rgba(255,255,255,0.22)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.10) inset,0 8px 24px rgba(0,0,0,0.52)!important;
      }

      .metric-toggle{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,100,30,.04))!important;
        border:1px solid rgba(255,255,255,0.14)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .metric-option.active{
        background:linear-gradient(135deg,rgba(255,130,50,.24),rgba(220,90,20,.16))!important;
        color:#ffaa5a!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.18) inset!important;
      }

      h1{color:#ff9f43;text-shadow:0 0 24px rgba(255,140,60,0.50),0 2px 8px rgba(0,0,0,0.6);}
      .modal{background:rgba(0,0,0,.50)!important;backdrop-filter:blur(8px)!important;}

      .heatmap-panel{position:relative;overflow:hidden;}
      .heatmap-panel::before{
        content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
        background:linear-gradient(108deg,rgba(255,255,255,0) 28%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0) 72%);
        opacity:0;transition:opacity 0.4s;
      }
      .heatmap-panel:hover::before{opacity:1;}
    `,
  },

  crystal: {
    label: '🫧 Crystal Glass',
    preview: { bg: 'linear-gradient(135deg,#050514,#080828,#0e0330)', color: '#e0eeff' },
    vars: {
      '--bg-primary':    'transparent',
      '--bg-secondary':  'rgba(140,160,255,0.04)',
      '--bg-tertiary':   'rgba(160,180,255,0.08)',
      '--border-color':  'rgba(255,255,255,0.18)',
      '--text-primary':  '#eaf0ff',
      '--text-secondary':'rgba(190,210,255,0.58)',
      '--accent-color':  '#90b8ff',
      '--accent-hover':  '#b4ccff',
      '--danger-color':  '#ff7096',
      '--danger-hover':  '#ff90b0',
      '--level-0': 'rgba(255,255,255,0.05)',
      '--level-1': 'rgba(80,120,255,0.28)',
      '--level-2': 'rgba(100,150,255,0.48)',
      '--level-3': '#90b8ff',
      '--level-4': '#e0ecff',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 130% 90% at 2%  2%,  #08003e 0%,transparent 48%),
          radial-gradient(ellipse 110% 95% at 98% 98%,  #000535 0%,transparent 50%),
          radial-gradient(ellipse 70%  70% at 52% 52%,  #040020 0%,transparent 65%),
          radial-gradient(ellipse 55%  42% at 60% 5%,   #060028 0%,transparent 52%),
          radial-gradient(ellipse 45%  38% at 5%  90%,  #000e40 0%,transparent 52%),
          #010008 !important;
        background-attachment:fixed!important;
      }

      body::before{
        content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
        background:
          radial-gradient(ellipse 65% 55% at 22% 22%,rgba(80,120,255,.18) 0%,transparent 58%),
          radial-gradient(ellipse 55% 60% at 80% 75%,rgba(160,80,255,.13) 0%,transparent 55%),
          radial-gradient(ellipse 42% 42% at 55% 48%,rgba(40,180,255,.08) 0%,transparent 50%),
          radial-gradient(ellipse 30% 28% at 35% 80%,rgba(120,200,255,.06) 0%,transparent 48%);
        animation:crystalShimmer 22s ease-in-out infinite alternate;
        will-change:transform,opacity;
      }
      @keyframes crystalShimmer{
        0%  {opacity:.50;transform:scale(1)    rotate(0deg)   translateY(0px);}
        25% {opacity:.72;transform:scale(1.04) rotate(.5deg)  translateY(-12px);}
        55% {opacity:.60;transform:scale(.97)  rotate(-.4deg) translateY(8px);}
        80% {opacity:.78;transform:scale(1.03) rotate(.3deg)  translateY(-6px);}
        100%{opacity:.52;transform:scale(1)    rotate(0deg)   translateY(0px);}
      }
      .container{position:relative;z-index:1;}

      /* Crystal — maximum clarity, prismatic light split */
      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:
          linear-gradient(
            162deg,
            rgba(255,255,255,0.14) 0%,
            rgba(160,190,255,0.07) 30%,
            rgba(100,140,255,0.04) 58%,
            rgba(200,100,255,0.03) 85%,
            rgba(80,220,255,0.04)  100%
          )!important;
        backdrop-filter:blur(50px) saturate(320%) brightness(1.14) contrast(1.06)!important;
        -webkit-backdrop-filter:blur(50px) saturate(320%) brightness(1.14) contrast(1.06)!important;
        border:1px solid rgba(255,255,255,0.22)!important;
        border-top-color:rgba(255,255,255,0.42)!important;
        border-left-color:rgba(255,255,255,0.28)!important;
        border-bottom-color:rgba(0,0,0,0.18)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.38) inset,
          1px 0 0 rgba(200,220,255,0.12) inset,   /* prismatic left edge */
          -1px 0 0 rgba(120,200,255,0.06) inset,  /* prismatic right edge */
          0 20px 60px rgba(0,0,0,0.55),
          0 0 50px rgba(120,160,255,0.08),
          0 0 100px rgba(80,100,255,0.04)!important;
      }

      .modal-content{
        background:
          linear-gradient(
            150deg,
            rgba(255,255,255,0.16) 0%,
            rgba(180,210,255,0.09) 35%,
            rgba(120,160,255,0.05) 68%,
            rgba(220,120,255,0.04) 88%,
            rgba(80,230,255,0.04)  100%
          )!important;
        backdrop-filter:blur(70px) saturate(340%) brightness(1.16)!important;
        -webkit-backdrop-filter:blur(70px) saturate(340%) brightness(1.16)!important;
        border:1px solid rgba(255,255,255,0.25)!important;
        border-top-color:rgba(255,255,255,0.48)!important;
        border-left-color:rgba(255,255,255,0.30)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.42) inset,
          1px 0 0 rgba(200,220,255,0.16) inset,
          0 32px 80px rgba(0,0,0,0.65),
          0 0 80px rgba(120,160,255,0.12)!important;
      }

      .entry-item,.leaderboard-entry{
        background:linear-gradient(135deg,rgba(255,255,255,.11),rgba(150,180,255,.05),rgba(80,220,255,.03))!important;
        backdrop-filter:blur(24px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(24px) saturate(240%)!important;
        border:1px solid rgba(255,255,255,0.16)!important;
        border-top-color:rgba(255,255,255,0.30)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset,0 4px 16px rgba(0,0,0,0.38)!important;
      }
      .entry-item:hover,.leaderboard-entry:hover{
        background:linear-gradient(135deg,rgba(255,255,255,.17),rgba(160,200,255,.10),rgba(80,230,255,.05))!important;
        border-color:rgba(255,255,255,0.30)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.32) inset,0 8px 24px rgba(0,0,0,0.42),0 0 24px rgba(120,170,255,0.14)!important;
      }

      .btn,.toggle-section-btn,.quick-book-btn{
        background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(140,180,255,.06),rgba(60,200,255,.03))!important;
        backdrop-filter:blur(18px) saturate(220%)!important;
        -webkit-backdrop-filter:blur(18px) saturate(220%)!important;
        border:1px solid rgba(255,255,255,0.19)!important;
        border-top-color:rgba(255,255,255,0.35)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 3px 12px rgba(0,0,0,0.32)!important;
        color:#eaf0ff!important;
      }
      .btn:hover,.toggle-section-btn:hover,.quick-book-btn:hover{
        background:linear-gradient(145deg,rgba(180,210,255,.20),rgba(140,180,255,.12),rgba(60,220,255,.06))!important;
        border-color:rgba(200,220,255,0.40)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.30) inset,0 6px 20px rgba(0,0,0,0.38),0 0 28px rgba(140,180,255,0.20)!important;
      }

      .form-input{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(140,170,255,.04))!important;
        backdrop-filter:blur(14px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(14px) saturate(200%)!important;
        border:1px solid rgba(255,255,255,0.16)!important;
        border-top-color:rgba(255,255,255,0.28)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.15) inset!important;
        color:#eaf0ff!important;
      }
      .form-input:focus{
        border-color:rgba(180,210,255,0.55)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 0 24px rgba(140,180,255,0.22)!important;
      }
      .form-input::placeholder{color:rgba(190,210,255,0.32)!important;}

      .log-btn{
        background:linear-gradient(145deg,rgba(140,180,255,.38),rgba(100,150,255,.26),rgba(60,200,255,.16))!important;
        border:1px solid rgba(180,210,255,0.50)!important;
        border-top-color:rgba(255,255,255,0.45)!important;
        backdrop-filter:blur(18px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(18px) saturate(240%)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.40) inset,
          1px 0 0 rgba(200,230,255,0.15) inset,
          0 6px 24px rgba(100,150,255,0.42),
          0 0 50px rgba(140,180,255,0.20)!important;
        filter:none!important;color:#ffffff!important;
      }
      .log-btn:hover{
        background:linear-gradient(145deg,rgba(180,210,255,.48),rgba(140,180,255,.36),rgba(80,220,255,.22))!important;
        transform:translateY(-2px)!important;
        box-shadow:
          0 1px 0 rgba(255,255,255,0.50) inset,
          0 10px 32px rgba(120,170,255,0.50),
          0 0 70px rgba(160,200,255,0.28)!important;
      }

      .goals-section{
        background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(140,180,255,.06),rgba(60,200,255,.03))!important;
        backdrop-filter:blur(32px) saturate(260%)!important;
        -webkit-backdrop-filter:blur(32px) saturate(260%)!important;
        border:1px solid rgba(255,255,255,0.17)!important;
        border-top-color:rgba(255,255,255,0.32)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.22) inset,0 12px 40px rgba(0,0,0,0.42)!important;
      }

      .tooltip{
        background:linear-gradient(135deg,rgba(2,2,18,.92),rgba(4,6,32,.85))!important;
        backdrop-filter:blur(50px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(50px) saturate(240%)!important;
        border:1px solid rgba(160,200,255,0.28)!important;
        border-top-color:rgba(255,255,255,0.20)!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.10) inset,0 8px 24px rgba(0,0,0,0.55)!important;
      }

      .metric-toggle{
        background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(140,170,255,.04))!important;
        border:1px solid rgba(255,255,255,0.15)!important;
        backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;
      }
      .metric-option.active{
        background:linear-gradient(135deg,rgba(150,190,255,.24),rgba(110,160,255,.16),rgba(60,210,255,.08))!important;
        color:#b4ccff!important;
        box-shadow:0 1px 0 rgba(255,255,255,0.20) inset!important;
      }

      h1{color:#c0d8ff;text-shadow:0 0 28px rgba(140,180,255,0.50),0 0 60px rgba(80,140,255,0.20),0 2px 8px rgba(0,0,0,0.6);}
      .modal{background:rgba(0,0,0,.50)!important;backdrop-filter:blur(8px)!important;}

      /* Prismatic shimmer on hover */
      .heatmap-panel{position:relative;overflow:hidden;}
      .heatmap-panel::before{
        content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
        background:linear-gradient(
          112deg,
          rgba(255,255,255,0) 20%,
          rgba(200,220,255,0.06) 40%,
          rgba(255,255,255,0.08) 50%,
          rgba(180,240,255,0.05) 60%,
          rgba(255,255,255,0) 80%
        );
        opacity:0;transition:opacity 0.5s;
      }
      .heatmap-panel:hover::before{opacity:1;}
    `,
  },

};

/* ═══════════════════════════════════════════
   CORE API
═══════════════════════════════════════════ */

window.applyTheme = function(name, save=true) {
  const theme = window.THEMES[name] || window.THEMES['default'];
  document.body.className = name === 'default' ? '' : `theme-${name}`;

  let css = ':root{\n';
  for (const [p,v] of Object.entries(theme.vars)) css += `  ${p}:${v};\n`;
  css += '}\n';
  if (theme.extra) css += theme.extra;

  let el = document.getElementById('applied-theme');
  if (!el) { el = document.createElement('style'); el.id='applied-theme'; document.head.appendChild(el); }
  el.textContent = css;

  if (save) { localStorage.setItem('reading_heatmap_theme', name); window.renderThemeSelector(); }
};

/* ═══════════════════════════════════════════
   SELECTOR — grouped + scrollable
═══════════════════════════════════════════ */

window.renderThemeSelector = function() {
  const grid = document.getElementById('themeSelectorGrid');
  if (!grid) return;

  const current = localStorage.getItem('reading_heatmap_theme') || 'default';

  const modalContent = grid.closest('.modal-content');
  if (modalContent) {
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.scrollbarWidth = 'thin';
    modalContent.style.scrollbarColor = 'var(--border-color) transparent';
  }

  if (!document.getElementById('theme-scrollbar-style')) {
    const s = document.createElement('style');
    s.id = 'theme-scrollbar-style';
    s.textContent = `
      .modal-content::-webkit-scrollbar{width:5px;}
      .modal-content::-webkit-scrollbar-track{background:transparent;}
      .modal-content::-webkit-scrollbar-thumb{background:var(--border-color);border-radius:3px;}
      .modal-content::-webkit-scrollbar-thumb:hover{background:var(--text-secondary);}
    `;
    document.head.appendChild(s);
  }

  const groups = [
    { label: 'Classic',           keys: ['default','nord','dracula','monokai'] },
    { label: 'Community',         keys: ['gruvbox','gruvbox-light','catppuccin','catppuccin-latte','rosepine','kanagawa','solarized'] },
    { label: '> Terminal / TUI',  keys: ['tui','tui-amber'] },
    { label: '🫧 Liquid Glass',   keys: ['aurora','midnight','sunset','crystal'] },
  ];

  grid.innerHTML = '';

  groups.forEach(group => {
    const h = document.createElement('div');
    h.style.cssText = `
      grid-column:1/-1;font-size:10px;font-weight:700;letter-spacing:.1em;
      text-transform:uppercase;color:var(--text-secondary);opacity:.75;
      padding:10px 0 4px;border-bottom:1px solid var(--border-color);margin-top:8px;
    `;
    h.textContent = group.label;
    grid.appendChild(h);

    group.keys.forEach(key => {
      const t = window.THEMES[key]; if (!t) return;
      const p = t.preview || {};
      const active = key === current;

      const el = document.createElement('div');
      el.style.cssText = `
        padding:14px 8px;border-radius:8px;cursor:pointer;
        border:2px solid ${active ? 'var(--accent-color)' : (p.border||'rgba(255,255,255,0.07)')};
        background:${p.bg||'#111'};color:${p.color||'#fff'};
        text-align:center;font-size:11px;font-weight:600;letter-spacing:.02em;
        transition:transform .15s,border-color .15s,box-shadow .15s;
        box-shadow:${active?'0 0 0 3px rgba(255,255,255,.08)':'0 2px 6px rgba(0,0,0,.4)'};
        min-height:52px;display:flex;align-items:center;justify-content:center;
        user-select:none;line-height:1.35;
      `;
      el.textContent = t.label;
      el.onclick = () => window.applyTheme(key);
      el.onmouseenter = () => { el.style.transform='scale(1.06)'; el.style.boxShadow='0 6px 18px rgba(0,0,0,.5)'; };
      el.onmouseleave = () => { el.style.transform='scale(1)'; el.style.boxShadow=active?'0 0 0 3px rgba(255,255,255,.08)':'0 2px 6px rgba(0,0,0,.4)'; };
      grid.appendChild(el);
    });
  });
};

/* ═══════════════════════════════════════════
   AUTO-INIT
═══════════════════════════════════════════ */
(function(){
  const saved = localStorage.getItem('reading_heatmap_theme') || 'default';
  window.applyTheme(saved, false);
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', window.renderThemeSelector);
  else window.renderThemeSelector();
})();