import React, { useMemo, useState, useRef, useEffect } from "react";
import "./styles.css";

// NOTE: Replacing the external import with the provided JSON data
const filmsData = [
    {
        "titre": "La Grande Illusion",
        "annee_production": 1937,
        "pays": "France",
        "nombre_mots_scenario": 12450,
        "analyse_sentiment": "positive/Hopeful war drama"
    },
    {
        "titre": "Citizen Kane",
        "annee_production": 1941,
        "pays": "États-Unis",
        "nombre_mots_scenario": 18200,
        "analyse_sentiment": "neutral/Complex character study"
    },
    {
        "titre": "Rashomon",
        "annee_production": 1950,
        "pays": "Japon",
        "nombre_mots_scenario": 9800,
        "analyse_sentiment": "neutral/Philosophical mystery"
    },
    {
        "titre": "Les Quatre Cents Coups",
        "annee_production": 1959,
        "pays": "France",
        "nombre_mots_scenario": 11300,
        "analyse_sentiment": "negative/Melancholic coming-of-age"
    },
    {
        "titre": "Psycho",
        "annee_production": 1960,
        "pays": "États-Unis",
        "nombre_mots_scenario": 14500,
        "analyse_sentiment": "negative/Suspenseful thriller"
    },
    {
        "titre": "8½",
        "annee_production": 1963,
        "pays": "Italie",
        "nombre_mots_scenario": 13700,
        "analyse_sentiment": "neutral/Introspective drama"
    },
    {
        "titre": "The Graduate",
        "annee_production": 1967,
        "pays": "États-Unis",
        "nombre_mots_scenario": 15600,
        "analyse_sentiment": "neutral/Satirical comedy-drama"
    },
    {
        "titre": "2001: A Space Odyssey",
        "annee_production": 1968,
        "pays": "Royaume-Uni",
        "nombre_mots_scenario": 8900,
        "analyse_sentiment": "neutral/Philosophical sci-fi"
    },
    {
        "titre": "Le Parrain",
        "annee_production": 1972,
        "pays": "États-Unis",
        "nombre_mots_scenario": 21400,
        "analyse_sentiment": "negative/Dark crime saga"
    },
    {
        "titre": "Aguirre, la colère de Dieu",
        "annee_production": 1972,
        "pays": "Allemagne",
        "nombre_mots_scenario": 10200,
        "analyse_sentiment": "negative/Descent into madness"
    },
    {
        "titre": "Taxi Driver",
        "annee_production": 1976,
        "pays": "États-Unis",
        "nombre_mots_scenario": 16800,
        "analyse_sentiment": "negative/Psychological thriller"
    },
    {
        "titre": "Star Wars",
        "annee_production": 1977,
        "pays": "États-Unis",
        "nombre_mots_scenario": 19300,
        "analyse_sentiment": "positive/Epic space adventure"
    },
    {
        "titre": "Apocalypse Now",
        "annee_production": 1979,
        "pays": "États-Unis",
        "nombre_mots_scenario": 17500,
        "analyse_sentiment": "negative/War horror"
    },
    {
        "titre": "Raging Bull",
        "annee_production": 1980,
        "pays": "États-Unis",
        "nombre_mots_scenario": 14900,
        "analyse_sentiment": "negative/Tragic biography"
    },
    {
        "titre": "E.T. l'extra-terrestre",
        "annee_production": 1982,
        "pays": "États-Unis",
        "nombre_mots_scenario": 13200,
        "analyse_sentiment": "positive/Heartwarming adventure"
    },
    {
        "titre": "Ran",
        "annee_production": 1985,
        "pays": "Japon",
        "nombre_mots_scenario": 15800,
        "analyse_sentiment": "negative/Tragic epic"
    },
    {
        "titre": "Le Fabuleux Destin d'Amélie Poulain",
        "annee_production": 2001,
        "pays": "France",
        "nombre_mots_scenario": 16700,
        "analyse_sentiment": "positive/Whimsical romance"
    },
    {
        "titre": "Spirited Away",
        "annee_production": 2001,
        "pays": "Japon",
        "nombre_mots_scenario": 11900,
        "analyse_sentiment": "positive/Magical adventure"
    },
    {
        "titre": "La Vie des autres",
        "annee_production": 2006,
        "pays": "Allemagne",
        "nombre_mots_scenario": 18600,
        "analyse_sentiment": "neutral/Political drama"
    },
    {
        "titre": "Inception",
        "annee_production": 2010,
        "pays": "États-Unis",
        "nombre_mots_scenario": 22100,
        "analyse_sentiment": "positive/Mind-bending thriller"
    },
    {
        "titre": "The Artist",
        "annee_production": 2011,
        "pays": "France",
        "nombre_mots_scenario": 8500,
        "analyse_sentiment": "positive/Nostalgic romance"
    },
    {
        "titre": "Parasite",
        "annee_production": 2019,
        "pays": "Corée du Sud",
        "nombre_mots_scenario": 19800,
        "analyse_sentiment": "negative/Social satire"
    },
    {
        "titre": "Roma",
        "annee_production": 2018,
        "pays": "Mexique",
        "nombre_mots_scenario": 12700,
        "analyse_sentiment": "neutral/Personal memoir"
    },
    {
        "titre": "La La Land",
        "annee_production": 2016,
        "pays": "États-Unis",
        "nombre_mots_scenario": 17200,
        "analyse_sentiment": "positive/Musical romance"
    },
    {
        "titre": "Moonlight",
        "annee_production": 2016,
        "pays": "États-Unis",
        "nombre_mots_scenario": 14300,
        "analyse_sentiment": "neutral/Coming-of-age drama"
    },
    {
        "titre": "Toni Erdmann",
        "annee_production": 2016,
        "pays": "Allemagne",
        "nombre_mots_scenario": 20400,
        "analyse_sentiment": "positive/Quirky comedy-drama"
    },
    {
        "titre": "Call Me by Your Name",
        "annee_production": 2017,
        "pays": "Italie",
        "nombre_mots_scenario": 13900,
        "analyse_sentiment": "positive/Romantic drama"
    },
    {
        "titre": "The Shawshank Redemption",
        "annee_production": 1994,
        "pays": "États-Unis",
        "nombre_mots_scenario": 19700,
        "analyse_sentiment": "positive/Uplifting prison drama"
    },
    {
        "titre": "Pulp Fiction",
        "annee_production": 1994,
        "pays": "États-Unis",
        "nombre_mots_scenario": 21900,
        "analyse_sentiment": "neutral/Dark comedy crime"
    },
    {
        "titre": "La Haine",
        "annee_production": 1995,
        "pays": "France",
        "nombre_mots_scenario": 13500,
        "analyse_sentiment": "negative/Social commentary"
    }
];


/* ---------- Helpers ---------- */
const sentimentToScore = (s) => {
  if (s == null) return 0;
  // Use the first word before the '/' as the main sentiment
  const mainSentiment = s.split('/')[0].trim().toLowerCase(); 
  
  if (mainSentiment === "positive") return 1;
  if (mainSentiment === "neutral") return 0;
  if (mainSentiment === "negative") return -1;
  
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

/* NEW: Normalizes sentiment score from [-1, 1] to [0, 1] */
const normalizeSentiment = (score) => (score + 1) / 2;

/* Pearson correlation */
function pearsonCorrelation(xs, ys) {
  const n = xs.length;
  if (n === 0 || ys.length !== n) return 0;
  let sumX = 0, sumY = 0;
  for (let i = 0; i < n; i++) {
    sumX += xs[i];
    sumY += ys[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;
  let cov = 0, varX = 0, varY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  const denom = Math.sqrt(varX * varY);
  if (denom === 0) return 0;
  return cov / denom;
}

/* MOCK DATA GENERATOR (Simulates Summary, Comments, and Segmented Sentiment) */
const augmentFilmData = (film) => {
    // Determine sentiment and genre/hint from existing data
    const [sentiment, hint] = film.analyse_sentiment.split('/');
    const mainSentiment = sentiment.trim().toLowerCase();
    const genreHint = (hint || film.titre).trim();
    
    // Simple hash based on title length for variety
    const hash = film.titre.length % 5; 

    let segmentedSentiment = "Consistent, largely " + mainSentiment + " tone throughout.";
    let summary = `A compelling ${genreHint} that defines the era.`;
    let comments = `The execution of the ${genreHint} is near-perfect, a true classic.`;

    // Contextual mock data generation based on sentiment and hash
    if (mainSentiment === 'positive') {
        if (hash === 0) {
            segmentedSentiment = "Starts happy, faces a challenge, and ends with an uplifting, positive resolution.";
            summary = `An emotionally satisfying ${genreHint} focusing on the human spirit's resilience.`;
        } else if (hash === 1) {
            segmentedSentiment = "The sentiment gradually escalates from neutral to intensely positive as the core conflict is resolved.";
            comments = "A must-see! The final sequence is incredibly moving and joyful.";
        }
    } else if (mainSentiment === 'negative') {
        if (hash === 0) {
            segmentedSentiment = "Begins neutral, but quickly descends into a relentlessly grim and negative conclusion.";
            summary = `A dark, powerful ${genreHint} exploring themes of isolation and despair.`;
        } else if (hash === 1) {
            segmentedSentiment = "A brutal rollercoaster: moments of false hope quickly give way to tragic inevitability.";
            comments = "Viscerally intense and beautifully shot, though deeply disturbing.";
        }
    } else { // neutral
        if (hash === 0) {
            segmentedSentiment = "Alternates between moments of quiet introspection and intense, brief emotional outbursts.";
            summary = `An observational ${genreHint} that prefers ambiguity over concrete answers.`;
        } else if (hash === 1) {
            segmentedSentiment = "A detached, objective tone maintains neutrality, even during dramatic events.";
            comments = "A technically brilliant film, though emotionally reserved and complex.";
        }
    }

    // New field to group years by decade for the chart
    const decade = Math.floor(film.annee_production / 10) * 10;

    return {
        ...film,
        summary: summary,
        comments: comments,
        // The original sentiment is maintained for the sentiment analysis,
        // but the segmented version is a new field based on the hint.
        analyse_sentiment: sentiment.trim().toLowerCase(), // Clean up the original field for display
        segmentedSentiment: segmentedSentiment,
        decade: `${decade}s` // New field for grouping
    };
};

/* Grouped Average Sentiment - NOW RETURNS NORMALIZED SCORE [0, 1] */
const calculateGroupAvgSentiment = (films, groupKey) => {
  const groups = {};
  films.forEach(film => {
    const key = film[groupKey] || 'Unknown';
    const score = sentimentToScore(film.analyse_sentiment); 
    if (!groups[key]) {
      groups[key] = { sum: 0, count: 0 };
    }
    groups[key].sum += score;
    groups[key].count += 1;
  });

  return Object.entries(groups).map(([key, data]) => {
    const avgScore = data.sum / data.count;
    return {
      group: key,
      value: avgScore, // [-1, 1] scale
      normalizedValue: normalizeSentiment(avgScore), // [0, 1] scale
      count: data.count,
    }
  }).filter(d => d.count > 0);
};

/* Grouped Average Word Count (Unchanged) */
const calculateGroupAvgWordCount = (films, groupKey) => {
  const groups = {};
  films.forEach(film => {
    const key = film[groupKey] || 'Unknown';
    const words = Number(film.nombre_mots_scenario || 0);
    if (!groups[key]) {
      groups[key] = { sum: 0, count: 0 };
    }
    groups[key].sum += words;
    groups[key].count += 1;
  });

  return Object.entries(groups).map(([key, data]) => ({
    group: key,
    value: data.sum / data.count, 
    count: data.count,
  })).filter(d => d.count > 0);
};

/* NEW: Alluvial Data Calculation */
const calculateAlluvialData = (films, groupKey1, groupKey2, valueKey) => {
    const paths = {};
    let totalValue = 0;

    films.forEach(film => {
        const key1 = film[groupKey1] || 'Unknown1';
        const key2 = film[groupKey2] || 'Unknown2';
        const pathKey = `${key1}_${key2}`;
        
        let value = 1; // Default to count
        if (valueKey === 'words') {
            value = Number(film.nombre_mots_scenario || 0);
        }

        if (!paths[pathKey]) {
            paths[pathKey] = {
                group1: key1,
                group2: key2,
                count: 0,
                valueSum: 0,
            };
        }
        paths[pathKey].count += 1;
        paths[pathKey].valueSum += value;
        totalValue += value;
    });

    // Aggregate nodes and calculate normalized sizes
    const group1Nodes = {};
    const group2Nodes = {};

    Object.values(paths).forEach(path => {
        const pathValue = path.valueSum; // Use sum of words or count

        if (!group1Nodes[path.group1]) group1Nodes[path.group1] = { totalValue: 0, paths: [] };
        group1Nodes[path.group1].totalValue += pathValue;
        group1Nodes[path.group1].paths.push(path);

        if (!group2Nodes[path.group2]) group2Nodes[path.group2] = { totalValue: 0, paths: [] };
        group2Nodes[path.group2].totalValue += pathValue;
        group2Nodes[path.group2].paths.push(path);
    });
    
    // Sort nodes for consistent display
    const sortedGroup1 = Object.entries(group1Nodes)
        .sort(([, a], [, b]) => b.totalValue - a.totalValue)
        .map(([group, data]) => ({ group, ...data }));
    
    const sortedGroup2 = Object.entries(group2Nodes)
        // Group 2 (Sentiment) should be sorted consistently: Positive, Neutral, Negative
        .sort(([gA], [gB]) => {
            const order = { 'positive': 3, 'neutral': 2, 'negative': 1 };
            return order[gB.toLowerCase()] - order[gA.toLowerCase()];
        })
        .map(([group, data]) => ({ group, ...data }));

    return { 
        group1: sortedGroup1, 
        group2: sortedGroup2, 
        paths: Object.values(paths), 
        totalValue 
    };
};

/* NEW: Quick Analytics Banner Component - NO LONGER CLICKABLE */
const QuickAnalyticsBanner = React.memo(({ stats }) => {
    
    const SummaryTile = ({ label, value, note, className = '' }) => (
        <div className={`summary-tile ${className}`}>
            <div className="tile-label">{label}</div>
            <div className="tile-value">{value}</div>
            <div className="tile-note">{note}</div>
        </div>
    );

    return (
        <div className="quick-analytics-banner">
            {/* Global Stats */}
            <div className="analytics-summary global-stats">
                <SummaryTile label="Total Films" value={filmsData.length} note="in dataset" />
                <SummaryTile label="Avg Sentiment" value={stats.avgSentimentNormalized.toFixed(2)} note="0 → 1 scale" />
                <SummaryTile label="Avg Words" value={Math.round(stats.avgWords).toLocaleString()} note="per script" />
                <SummaryTile label="Correlation" value={stats.correlation.toFixed(2)} note="sentiment vs words" />
            </div>
        </div>
    );
});


/* Movie Frame with detail card - UPDATED to include new fields */
const MovieFrame = React.forwardRef(({ movie, isSelected, onSelect, onDetailClick }, ref) => {
  const augmentedMovie = useMemo(() => augmentFilmData(movie), [movie]);

  const sentiment = (augmentedMovie.analyse_sentiment || "").toLowerCase();
  const sentimentClass = `sentiment-${sentiment}`;
  const wordCount = Number(augmentedMovie.nombre_mots_scenario || 0);

  const handleDetailClick = (e, type, value) => {
    e.stopPropagation();
    onDetailClick(type, value);
  };
  
  // NOTE: Increased card height to 250px in styles.css
  return (
    <div
      className={`movie-frame-wrapper ${isSelected ? "selected-wrapper" : ""}`}
      ref={ref}
      onClick={() => onSelect(augmentedMovie)}
    >
      <div className={`movie-frame ${isSelected ? "selected" : ""}`} role="button" tabIndex={0}>
        <div className="sprocket-col left">
          <div className="sprocket-hole" />
          <div className="sprocket-hole" />
          <div className="sprocket-hole" />
        </div>

        <div className="movie-inner">
          <div className="movie-header">
            <div className="movie-title">{augmentedMovie.titre}</div>
            <div className="movie-year">{augmentedMovie.annee_production}</div>
          </div>
          <div className="movie-sub">
            <div className="movie-country">{augmentedMovie.pays}</div>
            <div className={`movie-sentiment ${sentimentClass}`}>
              {augmentedMovie.analyse_sentiment.toUpperCase()}
            </div>
          </div>
          <div className="movie-length">
            {wordCount.toLocaleString()} words
          </div>
        </div>

        <div className="sprocket-col right">
          <div className="sprocket-hole" />
          <div className="sprocket-hole" />
          <div className="sprocket-hole" />
        </div>
      </div>

      <div className={`movie-details-card ${isSelected ? "open" : ""}`}>
        {/* NEW: Movie Summary */}
        <div className="detail-row full-width">
          <div className="label">Summary:</div>
          <div className="value detail-text">{augmentedMovie.summary}</div>
        </div>
        
        {/* NEW: Segmented Sentiment */}
        <div className="detail-row full-width">
          <div className="label">Script Sentiment Analysis:</div>
          <div className="value detail-text segmented">{augmentedMovie.segmentedSentiment}</div>
        </div>
        
        {/* NEW: Comments/Review */}
        <div className="detail-row full-width" style={{marginBottom: 10}}>
          <div className="label">Critic Comments:</div>
          <div className="value detail-text comments">{augmentedMovie.comments}</div>
        </div>
        
        <div className="detail-divider"/>

        {/* Existing Details */}
        <div className="detail-row clickable" onClick={(e) => handleDetailClick(e, 'country', augmentedMovie.pays)}>
          <div className="label">Country:</div>
          <div className="value detail-chip">{augmentedMovie.pays}</div>
        </div>
        <div className="detail-row clickable" onClick={(e) => handleDetailClick(e, 'year', augmentedMovie.annee_production)}>
          <div className="label">Year:</div>
          <div className="value detail-chip">{augmentedMovie.annee_production}</div>
        </div>
        <div className="detail-row clickable" onClick={(e) => handleDetailClick(e, 'sentiment', sentiment)}>
          <div className="label">Sentiment:</div>
          <div className={`value detail-chip ${sentimentClass}`}>{augmentedMovie.analyse_sentiment.toUpperCase()}</div>
        </div>
        <div className="detail-row clickable" onClick={(e) => handleDetailClick(e, 'words', wordCount)}>
          <div className="label">Script Length:</div>
          <div className="value detail-chip">{wordCount.toLocaleString()}</div>
        </div>
        <div className="detail-note">Click any detail to explore similar films</div>
      </div>
    </div>
  );
});

/* Simple SVG scatter plot (Unchanged) */
const ScatterPlot = ({ points, width = 460, height = 300, padding = 36 }) => {
  if (!points || !points.length) {
    return <div className="scatter-empty">No points to plot</div>;
  }
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs) || 1;
  const minY = -1;
  const maxY = 1;

  const rangeX = maxX - minX;
  const denominatorX = rangeX === 0 ? 1 : rangeX;

  const scaleX = (val) =>
    padding + ((val - minX) / denominatorX) * (width - padding * 2);
  const scaleY = (val) =>
    height - padding - ((val - minY) / (maxY - minY || 1)) * (height - padding * 2);

  return (
    <svg className="scatter-plot" viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      <rect x="0" y="0" width={width} height={height} fill="var(--paper)" />
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#ccc" />
      <line x1={padding} x2={width - padding} y1={scaleY(0)} y2={scaleY(0)} stroke="#eee" strokeDasharray="4 3" />
      {points.map((p, i) => (
        <g key={i} className="scatter-point" transform={`translate(${scaleX(p.x)}, ${scaleY(p.y)})`}>
          <circle r={4} fill={p.color || "var(--accent)"} opacity={0.9} />
        </g>
      ))}
      <text x={padding} y={height - 6} fontSize="10" fill="var(--muted)">{Math.round(minX).toLocaleString()}</text>
      <text x={width - padding - 36} y={height - 6} fontSize="10" fill="var(--muted)">{Math.round(maxX).toLocaleString()}</text>
      <text x={6} y={scaleY(1) + 4} fontSize="10" fill="var(--muted)">+1</text>
      <text x={6} y={scaleY(-1) + 4} fontSize="10" fill="var(--muted)">-1</text>
      <text x={6} y={scaleY(0) + 4} fontSize="10" fill="var(--muted)">0</text>
    </svg>
  );
};

//* NEW Alluvial Chart Component (Horizontal Layout) */
const AlluvialChart = ({ films, groupKey1, groupKey2, title, valueKey = 'count' }) => {
    
    const [hoveredGroup, setHoveredGroup] = useState(null);
    const [showAllLabels, setShowAllLabels] = useState(false);
    
  
    const colorMap = useMemo(() => ({
        'positive': 'var(--green)',
        'neutral': 'var(--blue)',
        'negative': 'var(--red)',
        'unknown': 'var(--muted)'
    }), []);
    
    const augmentedFilms = useMemo(() => films.map(f => augmentFilmData(f)), [films]);

    const alluvialData = useMemo(() => {
   
        const key1 = groupKey1 === 'annee_production' ? 'decade' : groupKey1;

        const key2 = 'analyse_sentiment';
        return calculateAlluvialData(augmentedFilms, key1, key2, valueKey);
    }, [augmentedFilms, groupKey1, valueKey]);
    
    const { group1: bottomNodes, group2: topNodes, totalValue } = alluvialData;

    // Reduce threshold to show more nodes
    const significantBottomNodes = bottomNodes.filter(n => n.totalValue / totalValue > 0.005);
    const significantTopNodes = topNodes.filter(n => n.totalValue / totalValue > 0.005);

    const significantTotalValue = significantBottomNodes.reduce((sum, n) => sum + n.totalValue, 0);

    if (!significantBottomNodes.length || !significantTopNodes.length) return <div className="comparison-area">No data for comparison.</div>;
    
    const width = 700;
    const height = 350;
    const padding = 40;
    const innerWidth = width - padding * 2;
    const nodeHeight = 30;

    
    // Function to calculate the SVG path (horizontal Bezier curve)
    const getCurvePath = (start, end, startXOffset, endXOffset, pathWidth) => {
        // start is bottom node {x, y}, end is top node {x, y}
        // startXOffset and endXOffset are the position of the ribbon within the node
        
        const x1 = start.x + startXOffset;
        const y1 = start.y;
        const x2 = end.x + endXOffset;
        const y2 = end.y + nodeHeight;
        
        // Control points for the Bezier curve
        const c1y = y1 - (y1 - y2) * 0.5;
        const c2y = y2 + (y1 - y2) * 0.5;
        
        const leftPath = `M${x1},${y1} C${x1},${c1y} ${x2},${c2y} ${x2},${y2}`;
        const rightPath = `L${x2 + pathWidth},${y2} C${x2 + pathWidth},${c2y} ${x1 + pathWidth},${c1y} ${x1 + pathWidth},${y1} Z`;

        return leftPath + rightPath;
    };

    // Calculate node and path positions
    let currentXBottom = padding;
    let currentXTop = padding;
    
    const positionedBottomNodes = significantBottomNodes.map(node => {
        const nodeWidth = (node.totalValue / significantTotalValue) * innerWidth;
        const x = currentXBottom;
        currentXBottom += nodeWidth;
        return { ...node, x, nodeWidth, paths: node.paths.sort((a, b) => b.valueSum - a.valueSum) };
    });

    const positionedTopNodes = significantTopNodes.map(node => {
        const nodeWidth = (node.totalValue / significantTotalValue) * innerWidth;
        const x = currentXTop;
        currentXTop += nodeWidth;
        return { ...node, x, nodeWidth, paths: node.paths };
    });

    // Helper to find a node by group name
    const findNode = (nodes, group) => nodes.find(n => n.group === group);
    
    // First Pass to build path data and set bottom offsets
    const allPaths = positionedBottomNodes.flatMap(bottomNode => {
        let currentXOffsetBottom = 0;
        
        return bottomNode.paths.map(path => {
            const topNode = findNode(positionedTopNodes, path.group2);
            if (!topNode) return null;
            
            const pathWidth = (path.valueSum / significantTotalValue) * innerWidth;
            
            const pathColor = colorMap[path.group2.toLowerCase()] || colorMap['unknown'];

            const pathData = {
                bottom: { x: bottomNode.x, y: height - padding, offset: currentXOffsetBottom },
                top: { x: topNode.x, y: padding, offset: 0 }, 
                width: pathWidth,
                color: pathColor,
                path,
                sourceGroup: bottomNode.group,
            };
            
            currentXOffsetBottom += pathWidth;
            return pathData;
        }).filter(p => p != null && p.width > 1);
    });

    // Second Pass to calculate accurate top-side offsets
    const topNodeOffsets = {};
    positionedTopNodes.forEach(n => topNodeOffsets[n.group] = 0);
    
    allPaths.sort((a, b) => {
        const topA = a.path.group2.localeCompare(b.path.group2);
        if (topA !== 0) return topA;
        return b.path.valueSum - a.path.valueSum;
    });

    allPaths.forEach(p => {
        const targetGroup = p.path.group2;
        p.top.offset = topNodeOffsets[targetGroup];
        topNodeOffsets[targetGroup] += p.width;
    });

    return (
        <div className="comparison-area alluvial-chart-horizontal">
            <h4 className="comparison-heading">{title}</h4>
            <div className="alluvial-wrap-horizontal">
                
                {/* SVG for Curves */}
                <svg className="alluvial-svg-horizontal" width={width} height={height}>
                    {allPaths.map((p, i) => {
                        const isHovered = hoveredGroup === p.sourceGroup;
                        const shouldDim = hoveredGroup && !isHovered;
                        
                        return (
                            <path
                                key={i}
                                d={getCurvePath(
                                    p.bottom, p.top, 
                                    p.bottom.offset, p.top.offset, 
                                    p.width
                                )}
                                fill={p.color}
                                opacity={shouldDim ? 0.1 : 0.6}
                                stroke={p.color}
                                strokeWidth={0.5}
                                className="alluvial-path-horizontal"
                                title={`${p.path.group1} to ${p.path.group2}: ${valueKey === 'count' ? p.path.count + ' films' : Math.round(p.path.valueSum).toLocaleString() + ' words'}`}
                            />
                        );
                    })}
                </svg>

                {/* Top Nodes (Sentiment) */}
                <div className="alluvial-nodes-horizontal top-nodes-horizontal">
                    {positionedTopNodes.map(node => (
                        <div 
                            key={node.group} 
                            className={`alluvial-node-horizontal sentiment-node sentiment-${node.group.toLowerCase()}`} 
                            style={{ 
                                left: `${node.x}px`, 
                                width: `${node.nodeWidth}px`,
                                top: `${padding}px`
                            }}
                            title={`${node.group} (Total ${valueKey === 'count' ? node.totalValue + ' films' : Math.round(node.totalValue).toLocaleString() + ' words'})`}
                        >
                            <span className="node-label-horizontal top">{node.group}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Nodes (Country/Decade) */}
                <div className="alluvial-nodes-horizontal bottom-nodes-horizontal">
                    {positionedBottomNodes.map(node => (
                        <div 
                            key={node.group} 
                            className="alluvial-node-horizontal bottom-node" 
                            style={{ 
                                left: `${node.x}px`, 
                                width: `${node.nodeWidth}px`,
                                bottom: `${padding}px`
                            }}
                            title={`${node.group} (Total ${valueKey === 'count' ? node.totalValue + ' films' : Math.round(node.totalValue).toLocaleString() + ' words'})`}
                            onMouseEnter={() => setHoveredGroup(node.group)}
                            onMouseLeave={() => setHoveredGroup(null)}
                        >
                            <span className="node-label-horizontal bottom">{node.group}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="comparison-note">
                Ribbon width represents the total {valueKey === 'count' ? 'number of films' : 'script word count'} in that path. Hover over countries/decades to highlight their flows.
            </div>
        </div>
    );
};

// NEW: Component to hold the main page charts
const AnalyticsView = React.memo(({ augmentedFilmsData }) => {
    return (
        <div className="main-analytics-view">
            <AlluvialChart 
                films={augmentedFilmsData}
                groupKey1={'pays'} 
                groupKey2={'analyse_sentiment'}
                title={`Film Count Flow: Country → Sentiment`}
                valueKey={'count'}
            />
            <AlluvialChart 
                films={augmentedFilmsData}
                groupKey1={'pays'} 
                groupKey2={'analyse_sentiment'}
                title={`Total Word Count Flow: Country → Sentiment`}
                valueKey={'words'}
            />
            <AlluvialChart 
                films={augmentedFilmsData}
                groupKey1={'annee_production'} // Uses the 'decade' field internally
                groupKey2={'analyse_sentiment'}
                title={`Film Count Flow: Decade → Sentiment`}
                valueKey={'count'}
            />
        </div>
    );
});


/* Mini Movie Card for filtered list (Unchanged) */
const MiniMovieCard = ({ movie, onClick }) => {
  const augmentedMovie = useMemo(() => augmentFilmData(movie), [movie]);

  const sentiment = (augmentedMovie.analyse_sentiment || "").toLowerCase();
  const sentimentClass = `sentiment-${sentiment}`;
  const wordCount = Number(augmentedMovie.nombre_mots_scenario || 0);

  return (
    <div className="mini-movie-card" onClick={() => onClick(augmentedMovie)}>
      <div className="mini-movie-header">
        <div className="mini-movie-title">{augmentedMovie.titre}</div>
        <div className={`mini-sentiment-indicator ${sentimentClass}`} title={`Sentiment: ${augmentedMovie.analyse_sentiment.toUpperCase()}`}/>
      </div>
      <div className="mini-movie-info">
        <span className="mini-info-item"><span className="mini-label">Year:</span> {augmentedMovie.annee_production}</span>
        <span className="mini-info-item"><span className="mini-label">Country:</span> {augmentedMovie.pays}</span>
        <span className="mini-info-item"><span className="mini-label">Words:</span> {wordCount.toLocaleString()}</span>
      </div>
    </div>
  );
};

/* ---------- Main App - Augmenting film data for use in UI ---------- */
export default function App() {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filterPanel, setFilterPanel] = useState(null); 

  const centerColRef = useRef(null);
  const movieRefs = useRef({});

  // Use the augmented data for the main list
  const augmentedFilmsData = useMemo(() => filmsData.map(augmentFilmData), []);

  const wordCounts = useMemo(() => filmsData.map((f) => Number(f.nombre_mots_scenario || 0)).filter(w => w > 0).sort((a, b) => a - b), []);
  const Q1 = wordCounts[Math.floor(wordCounts.length / 4)] || 0;
  const Q3 = wordCounts[Math.floor(wordCounts.length * 3 / 4)] || 0;
  const maxWordsGlobal = wordCounts[wordCounts.length - 1] || 1;

  const wordBuckets = useMemo(() => [
    { label: `Low (< ${Q1.toLocaleString()})`, min: 0, max: Q1 },
    { label: `Medium (${Q1.toLocaleString()} - ${Q3.toLocaleString()})`, min: Q1, max: Q3 },
    { label: `High (> ${Q3.toLocaleString()})`, min: Q3, max: maxWordsGlobal + 1 },
  ], [Q1, Q3, maxWordsGlobal]);
  
  // Generic panel click handler that uses JSON.stringify for complex objects
  const handlePanelClick = (type, value) => {
    const valueString = typeof value === 'object' ? JSON.stringify(value) : String(value);

    // If clicking the same filter/value, close it
    if (filterPanel && filterPanel.type === type && filterPanel.value === valueString) {
      setFilterPanel(null);
      return;
    }
    // Only open the panel for detail filters
    if (['country', 'year', 'sentiment', 'words', 'words_bucket'].includes(type)) {
        setFilterPanel({ type, value: valueString });
    }
  };
  
  // Existing film detail click handler simplified to use the generic handler
  const handleDetailClick = (type, value) => {
    handlePanelClick(type, value);
  };
  
  // Get filtered movies based on filter panel 
  const filteredByPanel = useMemo(() => {
    if (!filterPanel) return [];

    const { type, value: stringValue } = filterPanel;
    let value;
    try {
        value = JSON.parse(stringValue);
    } catch (e) {
        value = stringValue; // Assume simple primitive string/number if JSON parsing fails
    }

    if (type === 'country') {
      return augmentedFilmsData.filter(f => f.pays === value);
    } else if (type === 'year') {
      return augmentedFilmsData.filter(f => f.annee_production === value);
    } else if (type === 'sentiment') {
      return augmentedFilmsData.filter(f => (f.analyse_sentiment || '').toLowerCase() === value);
    } else if (type === 'words') {
      // Film detail 'words' click (finds films +/- 20% of the film's word count)
      const targetWords = Number(value);
      const range = targetWords * 0.2;
      return augmentedFilmsData.filter(f => {
        const words = Number(f.nombre_mots_scenario || 0);
        return Math.abs(words - targetWords) <= range;
      }).sort((a, b) => {
        const aWords = Number(a.nombre_mots_scenario || 0);
        const bWords = Number(b.nombre_mots_scenario || 0);
        return Math.abs(aWords - targetWords) - Math.abs(bWords - targetWords);
      });
    } else if (type === 'words_bucket') {
        // Handles click on Low/Medium/High bucket
        const { min, max } = value;
        return augmentedFilmsData.filter(f => {
            const words = Number(f.nombre_mots_scenario || 0);
            return words >= min && words < max;
        });
    }

    return [];
  }, [filterPanel, augmentedFilmsData]);

  // Search filtering 
  const filtered = useMemo(() => {
    if (!searchTerm) return augmentedFilmsData;

    const term = searchTerm.toLowerCase();
    return augmentedFilmsData.filter(f =>
      f.titre.toLowerCase().includes(term) ||
      f.pays.toLowerCase().includes(term) ||
      String(f.annee_production).includes(term)
    );
  }, [searchTerm, augmentedFilmsData]);

  // Stats 
  const stats = useMemo(() => {
    const n = augmentedFilmsData.length;
    if (n === 0) {
      const maxWords = Math.max(...filmsData.map((f) => Number(f.nombre_mots_scenario || 0)), 1);
      return { avgSentiment: 0, avgWords: 0, correlation: 0, maxWords, avgSentimentNormalized: 0 };
    }
    const words = augmentedFilmsData.map((f) => Number(f.nombre_mots_scenario || 0));
    const sent = augmentedFilmsData.map((f) => sentimentToScore(f.analyse_sentiment));
    const sumWords = words.reduce((a, b) => a + b, 0);
    const avgWords = sumWords / n;
    const avgSentiment = sent.reduce((a, b) => a + b, 0) / n;
    const avgSentimentNormalized = normalizeSentiment(avgSentiment); 
    const fullWords = augmentedFilmsData.map((f) => Number(f.nombre_mots_scenario || 0));
    const maxWords = Math.max(...fullWords, 1);
    const corr = pearsonCorrelation(words, sent);
    return { avgSentiment, avgWords, correlation: corr, maxWords, avgSentimentNormalized };
  }, [augmentedFilmsData]);

  // Scatter points (only used in the Filter Panel now)
  const scatterPoints = useMemo(() => {
    // Scatter points still use the SEARCHED/FILTERED list (not the panel filtered list)
    return filtered.map((f) => ({
      x: Number(f.nombre_mots_scenario || 0),
      y: sentimentToScore(f.analyse_sentiment),
      label: f.titre,
      color: f.analyse_sentiment === "positive" ? "#16a34a" : f.analyse_sentiment === "neutral" ? "#2563eb" : "#ef4444",
    }));
  }, [filtered]);


  // Effect for Intersection Observer (scroll snapping)
  useEffect(() => {
    if (filtered.length === 0 || !centerColRef.current) return;
    if (filterPanel) return;

    const options = {
      root: centerColRef.current,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          setSelected(filtered[index]);
        }
      });
    }, options);

    filtered.forEach((_, index) => {
      const element = movieRefs.current[index];
      if (element) {
        element.setAttribute('data-index', index);
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      setSelected(null);
    };
  }, [filtered, filterPanel]); 

  // Effect for Keybinds
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && filterPanel) {
        setFilterPanel(null);
      }

      if (e.key === '/') {
        e.preventDefault();
        document.querySelector('.search-input')?.focus();
      }
      
      if (e.key === 't' || e.key === 'T') {
        setDarkMode(d => !d);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filterPanel]); 

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);


  const handleMiniCardClick = (movie) => {
    setSelected(movie);
    setFilterPanel(null);
    const index = filtered.findIndex(f => f.titre === movie.titre);
    if (index !== -1 && movieRefs.current[index]) {
      movieRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getPanelTitle = () => {
    if (!filterPanel) return '';
    const { type, value: stringValue } = filterPanel;
    let value;
    try {
        value = JSON.parse(stringValue);
    } catch (e) {
        value = stringValue;
    }
    
    if (type === 'country') return `Films from ${value}`;
    if (type === 'year') return `Films from ${value}`;
    if (type === 'sentiment') return `${String(value).charAt(0).toUpperCase() + String(value).slice(1)} films`;
    if (type === 'words') return `Similar Script Length (~${Number(value).toLocaleString()})`;
    if (type === 'words_bucket') return `Films with ${value.label.trim()} Script Length`; 
    
    return '';
  };

  const panelFilms = filteredByPanel;
  
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">
          <div className="logo-text">FLM</div> 
          <div>
            <h1 className="title">Roll Explorer</h1>
            <div className="subtitle">Explore cinema through interactive data visualization</div>
          </div>
        </div>

        <div className="controls">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'} 
          </button>
        </div>
      </header>

      <div className="search-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search films by title, country, or year... (press / to focus)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-results-count">
            Found {filtered.length} film{filtered.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {/* Quick Analytics Banner (Global Placement) */}
      <QuickAnalyticsBanner 
          stats={stats} 
          augmentedFilmsData={augmentedFilmsData} 
      />
      
      {/* NEW: Analytics View - Charts on Main Page (Horizontal Layout) */}
      <AnalyticsView augmentedFilmsData={augmentedFilmsData} />

      <div className={`content-grid-wrap ${filterPanel ? 'filter-active' : ''}`}>
        <div className="content-grid-single">
          <main className="center-col-full" ref={centerColRef}>
            <div className="film-area">
              <div className="film-strip">
                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon-text">!</div> 
                    <h3 className="empty-title">No films found</h3>
                    <p className="empty-description">
                      {searchTerm ? `No results for "${searchTerm}"` : 'No movies to display'}
                    </p>
                    {searchTerm && (
                      <button className="empty-action" onClick={() => setSearchTerm('')}>
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  filtered.map((m, i) => (
                    <MovieFrame
                      ref={el => movieRefs.current[i] = el}
                      key={`${m.titre}-${i}`}
                      movie={m}
                      isSelected={selected?.titre === m.titre}
                      onSelect={(mv) => setSelected(mv)}
                      onDetailClick={handleDetailClick}
                    />
                  ))
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Filter Panel (Opens upon request/detail click) */}
        {filterPanel && (
          <div className="filter-panel">
            <div className="filter-panel-header">
              <h2 className="filter-panel-title">{getPanelTitle()}</h2>
              <button className="close-filter-btn" onClick={() => setFilterPanel(null)} aria-label="Close filter panel">
                ✕
              </button>
            </div>

            <div className="filter-panel-stats">
              <div className="filter-stat">
                <span className="filter-stat-value">{filteredByPanel.length}</span>
                <span className="filter-stat-label">Films</span>
              </div>
              <div className="filter-stat">
                <span className="filter-stat-value">
                  {normalizeSentiment(filteredByPanel.reduce((sum, f) => sum + sentimentToScore(f.analyse_sentiment), 0) / filteredByPanel.length || 0).toFixed(2)}
                </span>
                <span className="filter-stat-label">Avg Sentiment (0-1)</span>
              </div>
              <div className="filter-stat">
                <span className="filter-stat-value">
                  {Math.round(filteredByPanel.reduce((sum, f) => sum + Number(f.nombre_mots_scenario || 0), 0) / filteredByPanel.length || 0).toLocaleString()}
                </span>
                <span className="filter-stat-label">Avg Words</span>
              </div>
            </div>

            {/* Comparison/Analysis Plot based on filterPanel type */}
            {filterPanel.type === 'words' && (
                <div className="comparison-area">
                    <h4 className="comparison-heading">Sentiment vs Script Length (Scatter)</h4>
                    <ScatterPlot 
                        points={filteredByPanel.map((f) => ({
                            x: Number(f.nombre_mots_scenario || 0),
                            y: sentimentToScore(f.analyse_sentiment),
                            label: f.titre,
                            color: f.analyse_sentiment === "positive" ? "#16a34a" : (f.analyse_sentiment === "neutral" ? "#2563eb" : "#ef4444"),
                        }))} 
                        width={360} 
                        height={200} 
                    />
                </div>
            )}
            
            <div className="filter-panel-content">
              {panelFilms.length === 0 ? (
                <div className="empty-state-small">
                  <div className="empty-icon-text-small">!</div>
                  <p>No films found</p>
                </div>
              ) : (
                panelFilms.map((movie, idx) => (
                  <MiniMovieCard 
                    key={`${movie.titre}-${idx}`} 
                    movie={movie} 
                    onClick={handleMiniCardClick}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p><strong>Tip:</strong> Click on movie details to explore similar films by country, year, sentiment, or script length</p>
          <p className="footer-shortcuts">
            <kbd>Esc</kbd> Close panels • <kbd>/</kbd> Search • <kbd>T</kbd> Toggle theme
          </p>
        </div>
      </footer>
    </div>
  );
}