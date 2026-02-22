/**
 * themes.js — Reading Heatmap Theme System v3
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
      /* scanlines */
      body::before{content:'';position:fixed;inset:0;
        background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px);
        pointer-events:none;z-index:9999;}
      /* phosphor glow */
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
     FROSTED GLASS — unixporn style
     Philosophy: background IS the art.
     Panels are barely-there frosted panes.
     Everything bleeds through.
  ════════════════════════════════════════ */

  aurora: {
    label: '❄ Aurora',
    preview: { bg: 'linear-gradient(135deg,#041018,#0a1a30,#1a0836)', color: '#88ffcc' },
    vars: {
      '--bg-primary':    'rgba(255,255,255,0.05)',
      '--bg-secondary':  'rgba(255,255,255,0.03)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.10)',
      '--text-primary':  '#ddfff5',
      '--text-secondary':'rgba(180,255,210,0.55)',
      '--accent-color':  '#00e8a2',
      '--accent-hover':  '#00ffb8',
      '--danger-color':  '#ff6ba0',
      '--danger-hover':  '#ff91bb',
      '--level-0': 'rgba(255,255,255,0.04)',
      '--level-1': 'rgba(0,180,110,0.35)',
      '--level-2': 'rgba(0,210,130,0.55)',
      '--level-3': '#00e8a2',
      '--level-4': '#7fffd4',
    },
    extra: `
      /* ── Background — this is what you see through the glass ── */
      html,body{
        background:
          radial-gradient(ellipse 100% 80% at 0% 0%,   #003d28 0%, transparent 55%),
          radial-gradient(ellipse 80%  70% at 100% 100%,#1a004d 0%, transparent 55%),
          radial-gradient(ellipse 60%  55% at 50%  50%, #001428 0%, transparent 70%),
          #020c18 !important;
        background-attachment:fixed!important;
      }
      /* Subtle animated nebula */
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 70% 50% at 20% 20%,rgba(0,230,140,.18) 0%,transparent 60%),
          radial-gradient(ellipse 50% 60% at 80% 75%,rgba(130,0,220,.14) 0%,transparent 55%);
        pointer-events:none;z-index:0;
        animation:auroraDrift 18s ease-in-out infinite alternate;
      }
      @keyframes auroraDrift{
        0%  {opacity:.7;transform:scale(1)   translateY(0px);}
        50% {opacity:.4;transform:scale(1.05)translateY(-12px);}
        100%{opacity:.8;transform:scale(1)   translateY(0px);}
      }
      .container{position:relative;z-index:1;}

      /* ── Glass panels ── */
      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:rgba(6,30,22,.22)!important;
        backdrop-filter:blur(72px) saturate(200%) brightness(1.08)!important;
        -webkit-backdrop-filter:blur(72px) saturate(200%) brightness(1.08)!important;
        border:1px solid rgba(0,230,150,.14)!important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.04) inset,
          0 1px 0   rgba(255,255,255,.09) inset,
          0 24px 48px rgba(0,0,0,.45)!important;
      }
      .modal-content{
        background:rgba(4,20,16,.32)!important;
        backdrop-filter:blur(80px) saturate(210%)!important;
        -webkit-backdrop-filter:blur(80px) saturate(210%)!important;
        border:1px solid rgba(0,230,150,.18)!important;
        box-shadow:0 32px 64px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.05) inset!important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.08)!important;
        backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;
        box-shadow:0 1px 0 rgba(255,255,255,.06) inset!important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(255,255,255,.05)!important;
        border:1px solid rgba(255,255,255,.10)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
        box-shadow:0 1px 0 rgba(255,255,255,.08) inset!important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(0,220,140,.12)!important;
        border-color:rgba(0,230,150,.35)!important;
        box-shadow:0 0 20px rgba(0,220,140,.18),0 1px 0 rgba(255,255,255,.1) inset!important;
      }
      .form-input{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.10)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .form-input:focus{border-color:rgba(0,230,150,.45)!important;box-shadow:0 0 12px rgba(0,220,140,.2)!important;}
      .log-btn{
        background:rgba(0,220,140,.18)!important;
        border:1px solid rgba(0,230,150,.35)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
        box-shadow:0 4px 20px rgba(0,220,140,.3),0 1px 0 rgba(255,255,255,.12) inset!important;
        filter:none!important;
      }
      .log-btn:hover{background:rgba(0,230,150,.28)!important;transform:translateY(-2px)!important;
        box-shadow:0 8px 28px rgba(0,220,140,.4)!important;}
      .tooltip{
        background:rgba(2,14,10,.72)!important;
        backdrop-filter:blur(30px)!important;-webkit-backdrop-filter:blur(30px)!important;
        border:1px solid rgba(0,230,150,.20)!important;
      }
      .metric-toggle{background:rgba(255,255,255,.04)!important;border:1px solid rgba(255,255,255,.10)!important;}
      .metric-option.active{background:rgba(0,220,140,.15)!important;color:#00ffb8!important;}
      h1{color:#88ffcc;text-shadow:0 0 20px rgba(0,255,160,.4);}
      .modal{background:rgba(0,0,0,.55)!important;backdrop-filter:blur(6px)!important;}
    `,
  },

  midnight: {
    label: '❄ Midnight',
    preview: { bg: 'linear-gradient(135deg,#020610,#060c20,#0a0430)', color: '#7aa2f7' },
    vars: {
      '--bg-primary':    'rgba(255,255,255,0.04)',
      '--bg-secondary':  'rgba(255,255,255,0.03)',
      '--bg-tertiary':   'rgba(255,255,255,0.06)',
      '--border-color':  'rgba(255,255,255,0.09)',
      '--text-primary':  '#c8d8ff',
      '--text-secondary':'rgba(160,190,255,0.52)',
      '--accent-color':  '#5b8cff',
      '--accent-hover':  '#7facff',
      '--danger-color':  '#ff5c7a',
      '--danger-hover':  '#ff7f98',
      '--level-0': 'rgba(255,255,255,0.04)',
      '--level-1': 'rgba(30,60,200,0.38)',
      '--level-2': 'rgba(50,90,230,0.58)',
      '--level-3': '#5b8cff',
      '--level-4': '#a0c4ff',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 90% 70% at 10% 10%,  #00063d 0%,transparent 55%),
          radial-gradient(ellipse 70% 80% at 90% 90%,  #1a0060 0%,transparent 55%),
          radial-gradient(ellipse 50% 50% at 50% 50%,  #000820 0%,transparent 70%),
          #01030e !important;
        background-attachment:fixed!important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 65% 55% at 25% 18%,rgba(60,100,255,.16) 0%,transparent 60%),
          radial-gradient(ellipse 50% 60% at 78% 80%,rgba(100,40,255,.12) 0%,transparent 55%);
        pointer-events:none;z-index:0;
        animation:midnightDrift 22s ease-in-out infinite alternate;
      }
      @keyframes midnightDrift{
        0%  {opacity:.65;transform:translateY(0);}
        100%{opacity:.85;transform:translateY(-16px);}
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:rgba(4,8,40,.20)!important;
        backdrop-filter:blur(72px) saturate(200%) brightness(1.06)!important;
        -webkit-backdrop-filter:blur(72px) saturate(200%) brightness(1.06)!important;
        border:1px solid rgba(100,150,255,.12)!important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.03) inset,
          0 1px 0   rgba(255,255,255,.08) inset,
          0 24px 48px rgba(0,0,0,.50)!important;
      }
      .modal-content{
        background:rgba(3,6,30,.30)!important;
        backdrop-filter:blur(80px) saturate(210%)!important;
        -webkit-backdrop-filter:blur(80px) saturate(210%)!important;
        border:1px solid rgba(100,150,255,.16)!important;
        box-shadow:0 32px 64px rgba(0,0,0,.58),0 0 0 1px rgba(255,255,255,.04) inset!important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.07)!important;
        backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;
        box-shadow:0 1px 0 rgba(255,255,255,.05) inset!important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.09)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(60,100,255,.14)!important;
        border-color:rgba(100,150,255,.35)!important;
        box-shadow:0 0 20px rgba(60,100,255,.20)!important;
      }
      .form-input{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.09)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .form-input:focus{border-color:rgba(100,150,255,.45)!important;box-shadow:0 0 12px rgba(60,100,255,.22)!important;}
      .log-btn{
        background:rgba(60,100,255,.18)!important;
        border:1px solid rgba(100,150,255,.32)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
        box-shadow:0 4px 20px rgba(60,100,255,.32),0 1px 0 rgba(255,255,255,.10) inset!important;
        filter:none!important;
      }
      .log-btn:hover{background:rgba(70,115,255,.28)!important;transform:translateY(-2px)!important;}
      .tooltip{
        background:rgba(2,4,20,.72)!important;
        backdrop-filter:blur(30px)!important;-webkit-backdrop-filter:blur(30px)!important;
        border:1px solid rgba(100,150,255,.18)!important;
      }
      .metric-toggle{background:rgba(255,255,255,.04)!important;border:1px solid rgba(255,255,255,.09)!important;}
      .metric-option.active{background:rgba(60,100,255,.16)!important;color:#7facff!important;}
      h1{color:#7aa2f7;text-shadow:0 0 20px rgba(90,140,255,.4);}
      .modal{background:rgba(0,0,0,.58)!important;backdrop-filter:blur(6px)!important;}
    `,
  },

  sunset: {
    label: '❄ Sunset',
    preview: { bg: 'linear-gradient(135deg,#1a0400,#200810,#0e0018)', color: '#ff9f43' },
    vars: {
      '--bg-primary':    'rgba(255,255,255,0.05)',
      '--bg-secondary':  'rgba(255,255,255,0.03)',
      '--bg-tertiary':   'rgba(255,255,255,0.07)',
      '--border-color':  'rgba(255,255,255,0.09)',
      '--text-primary':  '#ffe8c8',
      '--text-secondary':'rgba(255,200,140,0.52)',
      '--accent-color':  '#ff8c32',
      '--accent-hover':  '#ffaa5a',
      '--danger-color':  '#ff3a5a',
      '--danger-hover':  '#ff5a78',
      '--level-0': 'rgba(255,255,255,0.04)',
      '--level-1': 'rgba(180,50,10,0.40)',
      '--level-2': 'rgba(220,80,15,0.58)',
      '--level-3': '#ff8c32',
      '--level-4': '#ffcc80',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 90% 70% at 15% 10%,#3d0a00 0%,transparent 55%),
          radial-gradient(ellipse 70% 75% at 85% 85%,#280040 0%,transparent 55%),
          radial-gradient(ellipse 50% 55% at 50% 45%,#1a0008 0%,transparent 65%),
          #0c0002 !important;
        background-attachment:fixed!important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 70% 50% at 20% 15%,rgba(255,100,20,.18) 0%,transparent 58%),
          radial-gradient(ellipse 55% 60% at 80% 80%,rgba(200,20,80,.14) 0%,transparent 55%);
        pointer-events:none;z-index:0;
        animation:sunsetDrift 20s ease-in-out infinite alternate;
      }
      @keyframes sunsetDrift{
        0%  {opacity:.6;transform:scale(1);}
        100%{opacity:.85;transform:scale(1.04) translateY(-8px);}
      }
      .container{position:relative;z-index:1;}

      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:rgba(30,6,0,.22)!important;
        backdrop-filter:blur(72px) saturate(200%)!important;
        -webkit-backdrop-filter:blur(72px) saturate(200%)!important;
        border:1px solid rgba(255,140,50,.12)!important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.04) inset,
          0 1px 0   rgba(255,200,100,.08) inset,
          0 24px 48px rgba(0,0,0,.48)!important;
      }
      .modal-content{
        background:rgba(24,5,0,.32)!important;
        backdrop-filter:blur(80px) saturate(210%)!important;
        -webkit-backdrop-filter:blur(80px) saturate(210%)!important;
        border:1px solid rgba(255,140,50,.16)!important;
        box-shadow:0 32px 64px rgba(0,0,0,.55)!important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.07)!important;
        backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.09)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(255,100,30,.14)!important;
        border-color:rgba(255,140,50,.35)!important;
        box-shadow:0 0 20px rgba(255,100,30,.22)!important;
      }
      .form-input{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.09)!important;
        backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;
      }
      .form-input:focus{border-color:rgba(255,140,50,.45)!important;}
      .log-btn{
        background:rgba(255,110,30,.18)!important;
        border:1px solid rgba(255,140,50,.32)!important;
        backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;
        box-shadow:0 4px 20px rgba(255,110,30,.32),0 1px 0 rgba(255,255,255,.10) inset!important;
        filter:none!important;
      }
      .log-btn:hover{background:rgba(255,130,50,.28)!important;transform:translateY(-2px)!important;}
      .tooltip{
        background:rgba(18,3,0,.72)!important;
        backdrop-filter:blur(30px)!important;-webkit-backdrop-filter:blur(30px)!important;
        border:1px solid rgba(255,140,50,.18)!important;
      }
      .metric-toggle{background:rgba(255,255,255,.04)!important;border:1px solid rgba(255,255,255,.09)!important;}
      .metric-option.active{background:rgba(255,110,30,.16)!important;color:#ffaa5a!important;}
      h1{color:#ff9f43;text-shadow:0 0 20px rgba(255,130,50,.4);}
      .modal{background:rgba(0,0,0,.55)!important;backdrop-filter:blur(6px)!important;}
    `,
  },

  /* ── Extra-transparent mode — maximum see-through ── */
  crystal: {
    label: '❄ Crystal',
    preview: { bg: 'linear-gradient(135deg,#050514,#080828,#0e0330)', color: '#e0eeff' },
    vars: {
      '--bg-primary':    'rgba(255,255,255,0.03)',
      '--bg-secondary':  'rgba(255,255,255,0.02)',
      '--bg-tertiary':   'rgba(255,255,255,0.04)',
      '--border-color':  'rgba(255,255,255,0.07)',
      '--text-primary':  '#e8f0ff',
      '--text-secondary':'rgba(180,200,255,0.45)',
      '--accent-color':  '#90b8ff',
      '--accent-hover':  '#b4ccff',
      '--danger-color':  '#ff7096',
      '--danger-hover':  '#ff90b0',
      '--level-0': 'rgba(255,255,255,0.03)',
      '--level-1': 'rgba(80,120,255,0.25)',
      '--level-2': 'rgba(100,150,255,0.45)',
      '--level-3': '#90b8ff',
      '--level-4': '#e0ecff',
    },
    extra: `
      html,body{
        background:
          radial-gradient(ellipse 120% 80% at 0% 0%,   #0a0040 0%,transparent 50%),
          radial-gradient(ellipse 100% 90% at 100% 100%,#000530 0%,transparent 50%),
          radial-gradient(ellipse 60%  60% at 50%  50%, #040020 0%,transparent 65%),
          #010008 !important;
        background-attachment:fixed!important;
      }
      body::before{
        content:'';position:fixed;inset:0;
        background:
          radial-gradient(ellipse 60% 50% at 20% 20%,rgba(80,120,255,.12) 0%,transparent 60%),
          radial-gradient(ellipse 50% 55% at 80% 75%,rgba(160,80,255,.09) 0%,transparent 55%),
          radial-gradient(ellipse 40% 40% at 55% 45%,rgba(40,180,255,.06) 0%,transparent 50%);
        pointer-events:none;z-index:0;
        animation:crystalShift 25s ease-in-out infinite alternate;
      }
      @keyframes crystalShift{
        0%  {opacity:.5;transform:scale(1) rotate(0deg);}
        50% {opacity:.8;transform:scale(1.06) rotate(1deg);}
        100%{opacity:.5;transform:scale(1) rotate(0deg);}
      }
      .container{position:relative;z-index:1;}

      /* Panels are nearly invisible — pure frosted air */
      .heatmap-panel,.leaderboard-panel,.goals-section{
        background:rgba(255,255,255,.028)!important;
        backdrop-filter:blur(90px) saturate(220%) brightness(1.04)!important;
        -webkit-backdrop-filter:blur(90px) saturate(220%) brightness(1.04)!important;
        border:1px solid rgba(255,255,255,.08)!important;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.04) inset,
          0 1px 0   rgba(255,255,255,.07) inset,
          0 0 80px rgba(80,120,255,.06),
          0 24px 48px rgba(0,0,0,.40)!important;
      }
      .modal-content{
        background:rgba(255,255,255,.04)!important;
        backdrop-filter:blur(100px) saturate(240%)!important;
        -webkit-backdrop-filter:blur(100px) saturate(240%)!important;
        border:1px solid rgba(255,255,255,.10)!important;
        box-shadow:0 32px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.05) inset!important;
      }
      .entry-item,.leaderboard-entry{
        background:rgba(255,255,255,.03)!important;
        border:1px solid rgba(255,255,255,.06)!important;
        backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;
        box-shadow:0 1px 0 rgba(255,255,255,.05) inset!important;
      }
      .btn,.toggle-section-btn,.quick-book-btn{
        background:rgba(255,255,255,.04)!important;
        border:1px solid rgba(255,255,255,.08)!important;
        backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;
        box-shadow:0 1px 0 rgba(255,255,255,.07) inset!important;
      }
      .btn:hover,.toggle-section-btn:hover{
        background:rgba(120,160,255,.10)!important;
        border-color:rgba(180,210,255,.22)!important;
        box-shadow:0 0 24px rgba(80,140,255,.14)!important;
      }
      .form-input{
        background:rgba(255,255,255,.03)!important;
        border:1px solid rgba(255,255,255,.08)!important;
        backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;
      }
      .form-input:focus{border-color:rgba(160,200,255,.35)!important;box-shadow:0 0 16px rgba(80,140,255,.15)!important;}
      .log-btn{
        background:rgba(100,150,255,.14)!important;
        border:1px solid rgba(160,200,255,.22)!important;
        backdrop-filter:blur(20px)!important;-webkit-backdrop-filter:blur(20px)!important;
        box-shadow:0 4px 24px rgba(80,140,255,.22),0 1px 0 rgba(255,255,255,.10) inset!important;
        filter:none!important;
      }
      .log-btn:hover{background:rgba(120,170,255,.22)!important;transform:translateY(-2px)!important;
        box-shadow:0 8px 32px rgba(80,140,255,.32)!important;}
      .tooltip{
        background:rgba(2,2,20,.68)!important;
        backdrop-filter:blur(40px)!important;-webkit-backdrop-filter:blur(40px)!important;
        border:1px solid rgba(255,255,255,.09)!important;
      }
      .metric-toggle{background:rgba(255,255,255,.04)!important;border:1px solid rgba(255,255,255,.08)!important;}
      .metric-option.active{background:rgba(100,150,255,.14)!important;color:#b4ccff!important;}
      h1{color:#c0d8ff;text-shadow:0 0 24px rgba(100,160,255,.35);}
      .modal{background:rgba(0,0,0,.52)!important;backdrop-filter:blur(6px)!important;}
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

  /* Make the modal content scrollable so the grid never overflows */
  const modalContent = grid.closest('.modal-content');
  if (modalContent) {
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.scrollbarWidth = 'thin';
    modalContent.style.scrollbarColor = 'var(--border-color) transparent';
  }

  /* Custom scrollbar for webkit */
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
    { label: 'Classic',          keys: ['default','nord','dracula','monokai'] },
    { label: 'Community',        keys: ['gruvbox','gruvbox-light','catppuccin','catppuccin-latte','rosepine','kanagawa','solarized'] },
    { label: '> Terminal / TUI', keys: ['tui','tui-amber'] },
    { label: '❄ Frosted Glass',  keys: ['aurora','midnight','sunset','crystal'] },
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