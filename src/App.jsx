import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Parser from 'rss-parser'
import {
  Cpu, Server, Zap, Shield, BarChart3,
  ExternalLink, Layers, Network,
  Activity, GitBranch, Rocket, TrendingUp,
  Menu, X, Users, DollarSign, CheckCircle,
  ArrowRight, Database, Cloud, Code,
  Target, Award, Briefcase
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts'
import './App.css'

// Real Performance Data from Report
const performanceData = [
  { name: 'DeepSpeed', throughput: 100, color: '#71717a' },
  { name: 'Megatron', throughput: 175, color: '#71717a' },
  { name: 'SHE (Best Decentralized)', throughput: 231, color: '#8b5cf6' },
  { name: 'Yotta', throughput: 280, color: '#6366f1' },
]

const radarData = [
  { subject: 'Reliability', A: 95, fullMark: 100 },
  { subject: 'Scalability', A: 98, fullMark: 100 },
  { subject: 'Latency', A: 88, fullMark: 100 },
  { subject: 'Cost Efficiency', A: 92, fullMark: 100 },
  { subject: 'Flexibility', A: 90, fullMark: 100 },
  { subject: 'Security', A: 94, fullMark: 100 },
]

const revenueData = [
  { name: 'May', value: 0 },
  { name: 'Jun', value: 300 },
  { name: 'Jul', value: 600 },
  { name: 'Aug', value: 1100 },
  { name: 'Sep', value: 1500 },
  { name: 'Oct', value: 1900 },
  { name: 'Nov', value: 2300 },
]

const parallelismTypes = [
  { name: 'Data', value: 20, color: '#6366f1' },
  { name: 'Pipeline', value: 25, color: '#8b5cf6' },
  { name: 'Tensor', value: 20, color: '#06b6d4' },
  { name: 'Sequence', value: 15, color: '#10b981' },
  { name: 'Expert', value: 20, color: '#f59e0b' },
]

// Particle field and GPU grid removed for article style

// Navigation
const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sections = ['Overview', 'Problem', 'Solution', 'Architecture', 'Performance', 'Business', 'Developments', 'Team']

  return (
    <motion.nav
      className="nav glass"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="nav-brand">
        <Cpu className="nav-icon" />
        <span className="gradient-text">YOTTA</span>
      </div>

      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section.toLowerCase()}`}
            className={activeSection === section.toLowerCase() ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {section}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}

// Hero Section - Technical Introduction
const HeroSection = () => {
  return (
    <section id="overview" className="hero">
      <div className="hero-content">
        <h1>
          Solving Decentralized Compute
          <br />
          <span className="gradient-text">A Systems Perspective</span>
        </h1>

        <p className="hero-subtitle">
          An independent analysis by Chain of Thought on how distributed heterogeneous GPUs can be coordinated to run training and inference at scale—with architecture, not marketplace mechanics.
        </p>

        <div className="hero-quote">
          <p><strong>Thesis:</strong> Decentralized compute hasn't achieved production viability because it requires a complete operating system redesign. This is the systems story of how Yotta achieves it.</p>
        </div>
      </div>
    </section>
  )
}

// Thesis Section
const ThesisSection = () => {
  return (
    <section className="thesis-section">
      <div className="container">
        <motion.div
          className="thesis-card glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="thesis-icon">
            <Target size={32} />
          </div>
          <h3>Why This Matters</h3>
          <p>
            Understanding how Yotta's architecture solves decentralized compute reveals the fundamental systems challenges in distributed AI infrastructure: heterogeneous hardware orchestration, network-aware scheduling, fault tolerance at scale, and verification in untrusted environments.
          </p>
          <p className="thesis-highlight">
            This is an <span className="gradient-text">engineering deep dive</span>—not a business narrative.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Methodology Section
const MethodologySection = () => {
  return (
    <section className="methodology-section">
      <div className="container">
        <motion.div
          className="methodology-card glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>About This Analysis</h3>
          <p>
            This is an <span className="gradient-text">independent technical analysis</span> by Chain of Thought. We examine Yotta's architecture through first principles systems design—evaluating design decisions, trade-offs, and implementation approaches without commercial bias.
          </p>
          <p>
            Our assessment is based on publicly available documentation, architectural patterns, and distributed systems theory. This is a technical deep dive into engineering challenges and solutions, not an endorsement or critique of the company or protocol.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Problem Section
const ProblemSection = () => {
  const constraints = [
    { icon: Cpu, name: 'Heterogeneous Compute', desc: 'GPUs span H100s to consumer cards with 2-10x FLOP variance' },
    { icon: Database, name: 'Memory & Locality', desc: 'VRAM ranges 4GB–48GB, requiring adaptive model sharding' },
    { icon: Activity, name: 'Network Unreliability', desc: 'Internet latency (100ms–1s) and packet loss make synchronization expensive' },
    { icon: Layers, name: 'Distributed Coordination', desc: 'Requires fault tolerance, speculation, and intelligent scheduling across heterogeneous resources' },
  ]

  const questions = [
    { num: '01', question: 'Adaptive Scheduling', desc: 'How do you assign model shards to heterogeneous GPUs and dynamically rebalance based on network conditions?' },
    { num: '02', question: 'Fault Tolerance', desc: 'How do you maintain training progress when nodes fail regularly without constant resnapshotting?' },
    { num: '03', question: 'Latency Mitigation', desc: 'How do you hide cross-region network latency (100ms–1s) in the compute pipeline?' },
  ]

  return (
    <section id="problem" className="section problem-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Fundamental Challenges</span>
          <h2>Why Decentralized GPU Networks Are Hard</h2>
          <p>The systems problems that prevent heterogeneous hardware from running real workloads reliably</p>
        </motion.div>

        <div className="problem-intro">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Decentralized GPUs are fundamentally heterogeneous: varying VRAM (4GB–48GB), bandwidth constraints, unpredictable network conditions, diverse failure modes, and dynamic availability. Building a system that can schedule and execute complex distributed training or inference on this substrate requires solving interconnected systems problems simultaneously—coordination, reliability, latency hiding, and trust.
          </motion.p>
          <p className="problem-emphasis">
            <strong>No component can be solved in isolation.</strong>
          </p>
        </div>

        <figure className="figure-inline">
          <img
            src="/gpu-heterogeneity.png"
            alt="Illustration of a GPU network with diverse hardware"
            className="screenshot-illustration"
          />
          <figcaption>
            The heterogeneous nature of decentralized GPU resources presents fundamental coordination challenges.
          </figcaption>
        </figure>

        <div className="constraints-grid">
          <h4>Four Interdependent Constraints</h4>
          <div className="constraints-cards">
            {constraints.map((c, index) => (
              <motion.div
                key={c.name}
                className={`constraint-card ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <c.icon size={24} />
                <h5>{c.name}</h5>
                <p>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="evaluation-framework">
          <h4>Evaluating Decentralized Compute Networks</h4>
          <div className="questions-list">
            {questions.map((q, index) => (
              <motion.div
                key={q.num}
                className={`question-card ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <span className="question-num">{q.num}</span>
                <div className="question-content">
                  <h5>{q.question}</h5>
                  <p>{q.desc}</p>
                </div>
                {index === 0 && <span className="priority-badge">Most Critical</span>}
              </motion.div>
            ))}
          </div>
        </div>

        <figure className="figure-wide">
          <img
            src="/key-differences.png"
            alt="Comparison table of centralized vs decentralized AI compute across four key dimensions"
            className="screenshot-table"
          />
          <figcaption>
            The four interdependent constraints distinguish decentralized from centralized infrastructure.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

// Solution Section - Yotta OS Components
const SolutionSection = () => {
  const [activeComponent, setActiveComponent] = useState(0)

  const components = [
    {
      id: 'S',
      name: 'Yotta-S',
      title: 'Adaptive Scheduling',
      color: '#6366f1',
      icon: GitBranch,
      description: 'Profiles each GPU and dynamically selects from 5D parallelism configurations based on current heterogeneity, network state, and model topology.',
      details: [
        'Data parallelism for colocated high-BW networks',
        'Pipeline parallelism across high-latency regions',
        'Tensor parallelism for compute-heavy layers',
        'Sequence parallelism for long context windows',
        'Expert parallelism for MoE models'
      ],
      metric: '2.8x vs DeepSpeed on same hardware'
    },
    {
      id: 'C',
      name: 'Yotta-C',
      title: 'Network-Aware Streaming',
      color: '#8b5cf6',
      icon: Network,
      description: 'Overlaps computation with communication by streaming KV cache in small chunks with selective compression (3–5x SVD compression on attention weights).',
      details: [
        'Continuous KV cache streaming during prefill/decode',
        'Aggressive compression reduces WAN by 90%+',
        'Small messages mitigate tail latency variance',
        'Computation pipeline masks network delays'
      ],
      metric: 'Hides 100ms–1s internet latency'
    },
    {
      id: 'O',
      name: 'Yotta-O',
      title: 'Dynamic CPU-GPU Offloading',
      color: '#06b6d4',
      icon: Database,
      description: 'Measures PCIe bandwidth at runtime and dynamically decides which layers stay GPU-resident vs. offload to CPU to maximize throughput given local hardware constraints.',
      details: [
        'Measures PCIe throughput per machine',
        'Adapts to heterogeneous configurations',
        '23–37% faster than prior work',
        'Reduces CPU↔GPU traffic 7x vs naive'
      ],
      metric: 'Enables 30B models on 16GB GPUs'
    },
    {
      id: 'F',
      name: 'Yotta-F',
      title: 'Fault Recovery',
      color: '#10b981',
      icon: Shield,
      description: 'Expects node failures and handles them through selective checkpointing of activation states and distributed redundancy for partial recovery without full recomputation.',
      details: [
        'Fast failure detection via heartbeats',
        'Selective activation checkpointing',
        'Reroute failed nodes to nearby GPU clusters',
        'Partial redundancy amortizes cost'
      ],
      metric: 'Recovers from node loss in seconds'
    },
    {
      id: 'V',
      name: 'Yotta-V',
      title: 'Economic Verification',
      color: '#f59e0b',
      icon: CheckCircle,
      description: 'Embeds verification into speculative inference—auditing token predictions across random positions to detect misbehavior with low overhead, making cheating economically irrational.',
      details: [
        'Verification piggybacks on spec inference',
        'Random token-position auditing',
        'Convergence pattern anomaly detection',
        'Minimal performance overhead'
      ],
      metric: 'Cheating costs more than computing'
    },
  ]

  return (
    <section id="solution" className="section solution-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">The Architecture</span>
          <h2>Yotta DeOS: Five Interconnected Systems</h2>
          <p>How to build an OS for heterogeneous, distributed, unreliable GPU clusters</p>
        </motion.div>

        <figure className="figure-wide">
          <img
            src="/deos-stack.png"
            alt="The Yotta DeOS Stack diagram showing five interconnected components"
            className="screenshot-stack"
          />
          <figcaption>
            The five-component Yotta architecture: Scheduling, Communication, Offloading, Fault Tolerance, and Verification.
          </figcaption>
        </figure>

        <div className="yotta-os-diagram">
          <div className="os-components">
            {components.map((comp, index) => (
              <motion.div
                key={comp.id}
                className={`os-component ${activeComponent === index ? 'active' : ''} ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
                onClick={() => setActiveComponent(index)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ '--accent-color': comp.color }}
              >
                <div className="component-header">
                  <div className="component-badge" style={{ background: comp.color }}>
                    {comp.id}
                  </div>
                  <div className="component-title">
                    <h4>{comp.name}</h4>
                    <span>{comp.title}</span>
                  </div>
                  <comp.icon size={20} style={{ color: comp.color }} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="os-detail glass"
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="detail-header" style={{ borderColor: components[activeComponent].color }}>
              <h3>{components[activeComponent].name}: {components[activeComponent].title}</h3>
              <span className="metric-badge" style={{ background: `${components[activeComponent].color}20`, color: components[activeComponent].color }}>
                {components[activeComponent].metric}
              </span>
            </div>
            <p className="detail-description">{components[activeComponent].description}</p>
            <ul className="detail-list">
              {components[activeComponent].details.map((detail, i) => (
                <li key={i}>
                  <CheckCircle size={14} style={{ color: components[activeComponent].color }} />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Architecture Section - 5D Parallelism & Prefill/Decode
const ArchitectureSection = () => {
  const parallelisms = [
    {
      name: 'Data Parallelism',
      desc: 'Each GPU holds full model copy, processes different data slice',
      best: 'Fast local networks',
      color: '#6366f1'
    },
    {
      name: 'Pipeline Parallelism',
      desc: 'Model split into stages like assembly line',
      best: 'Cross-region with limited bandwidth',
      color: '#8b5cf6'
    },
    {
      name: 'Tensor Parallelism',
      desc: 'Large computations split across GPUs',
      best: 'Models too large for single GPU',
      color: '#06b6d4'
    },
    {
      name: 'Sequence Parallelism',
      desc: 'Token sequence split for long contexts',
      best: 'Long context windows',
      color: '#10b981'
    },
    {
      name: 'Expert Parallelism',
      desc: 'Different experts on different GPUs',
      best: 'Mixture-of-Experts models',
      color: '#f59e0b'
    },
  ]

  return (
    <section id="architecture" className="section architecture-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">How It Works</span>
          <h2>5D Parallelism: Optimal Model Decomposition</h2>
          <p>How Yotta dynamically selects parallelism strategy based on GPU topology and network conditions</p>
        </motion.div>

        <div className="parallelism-grid">
          {parallelisms.map((p, index) => (
            <motion.div
              key={p.name}
              className={`parallelism-card glass ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ borderTopColor: p.color }}
            >
              <div className="parallelism-indicator" style={{ background: p.color }} />
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
              <span className="best-for">Best for: {p.best}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="prefill-decode glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>The Prefill/Decode Split</h3>
          <p className="intro-text">
            When you ask ChatGPT a question, it switches between two very different phases:
          </p>

          <div className="phase-comparison">
            <div className="phase prefill">
              <div className="phase-header">
                <span className="phase-badge" style={{ background: '#6366f1' }}>Prefill</span>
                <h4>The Heavy Thinking</h4>
              </div>
              <ul>
                <li>Reads entire prompt</li>
                <li>Builds internal context</li>
                <li>Touches every layer</li>
                <li>Most memory & bandwidth</li>
              </ul>
              <div className="phase-assignment">
                <ArrowRight size={16} />
                <span>Assigned to <strong>H100s, B200s</strong></span>
              </div>
            </div>

            <div className="phase decode">
              <div className="phase-header">
                <span className="phase-badge" style={{ background: '#10b981' }}>Decode</span>
                <h4>The Sequential Writing</h4>
              </div>
              <ul>
                <li>Produces tokens one at a time</li>
                <li>Reuses stored context (KV cache)</li>
                <li>Less computation</li>
                <li>Inherently sequential</li>
              </ul>
              <div className="phase-assignment">
                <ArrowRight size={16} />
                <span>Assigned to <strong>RTX 4090s, L40s</strong></span>
              </div>
            </div>
          </div>

          <p className="insight">
            <Zap size={16} />
            <span>This split lets weak GPUs be productive while strong GPUs aren't dragged down, dramatically boosting overall throughput.</span>
          </p>
        </motion.div>

        <figure className="figure-wide">
          <img
            src="/latency-diagram.png"
            alt="Diagram showing Yotta's approach to reducing latency through prefill/decode separation"
            className="screenshot-diagram"
          />
          <figcaption>
            Yotta's communication layer hides network latency by streaming KV cache in small chunks during computation.
          </figcaption>
        </figure>

        <motion.div
          className="speculation-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Speculative Inference</h3>
          <p>
            How do you keep GPUs busy while waiting for data across continents?
            <strong> Make educated guesses and do useful work in advance.</strong>
          </p>
          <div className="speculation-flow">
            <div className="spec-step">
              <div className="spec-icon">
                <Rocket size={20} />
              </div>
              <span>Scout model predicts next tokens</span>
            </div>
            <ArrowRight size={20} className="flow-arrow" />
            <div className="spec-step">
              <div className="spec-icon">
                <CheckCircle size={20} />
              </div>
              <span>Main model catches up</span>
            </div>
            <ArrowRight size={20} className="flow-arrow" />
            <div className="spec-step">
              <div className="spec-icon">
                <Zap size={20} />
              </div>
              <span>Accept correct / rollback wrong</span>
            </div>
          </div>
          <p className="result-text">
            This turns global GPU scatter from a liability into something the runtime can absorb.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Performance Section
const PerformanceSection = () => {
  const benchmarks = [
    { label: 'vs DeepSpeed', value: '2.8x', desc: 'Higher throughput' },
    { label: 'vs Megatron', value: '1.6x', desc: 'Higher throughput' },
    { label: 'vs SHE (best decentralized)', value: '21%', desc: 'Higher throughput' },
    { label: 'Gap to centralized', value: '~15%', desc: 'Within reach' },
  ]

  const yottaOBenchmarks = [
    { name: 'vs SwapAdvisor', value: 37, unit: '%', desc: 'faster' },
    { name: 'vs Microsoft L2L', value: 14, unit: '%', desc: 'faster' },
    { name: 'CPU-GPU Transfer', value: 7, unit: 'x', desc: 'less' },
  ]

  return (
    <section id="performance" className="section performance-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Empirical Results</span>
          <h2>Performance Comparison: Decentralized vs Centralized</h2>
          <p>Measured throughput and latency on heterogeneous clusters across AWS regions</p>
        </motion.div>

        <motion.div
          className="performance-chart glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="chart-header">
            <h4>Training Throughput (Effective FLOPs) — Yotta vs Traditional Distributed Frameworks</h4>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
              <XAxis type="number" tick={{ fill: '#718096' }} domain={[0, 300]} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#718096' }} width={160} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${value}%`, 'Relative Throughput']}
              />
              <Bar dataKey="throughput" radius={[0, 4, 4, 0]}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="chart-note">DeepSpeed = 100% baseline</p>
        </motion.div>

        <div className="benchmark-grid">
          {benchmarks.map((b, index) => (
            <motion.div
              key={b.label}
              className={`benchmark-card glass ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="benchmark-value gradient-text">{b.value}</div>
              <div className="benchmark-label">{b.label}</div>
              <div className="benchmark-desc">{b.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="yotta-o-benchmarks glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4>Yotta-O Offloading Performance</h4>
          <div className="yotta-o-grid">
            {yottaOBenchmarks.map((b, i) => (
              <div key={i} className="yotta-o-item">
                <span className="value">{b.value}{b.unit}</span>
                <span className="desc">{b.desc}</span>
                <span className="label">{b.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="economics-insight glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <DollarSign size={32} className="insight-icon" />
          <div className="insight-content">
            <h4>The Economic Shift</h4>
            <p>
              Once decentralized compute is close enough on throughput, the inefficiency stops being decisive.
              A small performance penalty is easily offset by <strong>50-80% lower GPU costs</strong>,
              cheaper regional power prices, and higher availability.
            </p>
            <span className="quote">"Flexibility matters more than raw speed."</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Business Section
const BusinessSection = () => {
  const revenueLines = [
    {
      icon: Server,
      name: 'Serverless & Compute',
      margin: '20-30%',
      desc: 'GPU aggregation from micro data centers. Lower margin but generates execution data.',
      strategic: 'Data flywheel for OptimuX'
    },
    {
      icon: Code,
      name: 'Model APIs',
      margin: 'Higher',
      desc: 'Production-ready APIs with Intelligent Model Routing across models/regions/hardware.',
      strategic: 'Wedge into enterprise inference'
    },
    {
      icon: Cloud,
      name: 'OptimuX Control Plane',
      margin: '60-80%+',
      desc: 'Pure SaaS orchestration across AWS, GCP, Azure, on-prem. Coming Q2 2026.',
      strategic: 'Primary revenue driver long-term'
    },
  ]

  const achievements = [
    { icon: Award, label: 'AMD Developer Challenge', value: '1st Place', desc: 'MI300X kernels' },
    { icon: Zap, label: 'RL Breakthrough', value: '4.3x', desc: 'Faster rollout with Verl' },
    { icon: Cpu, label: 'NeuronMM on Trainium', value: '1.66x', desc: 'vs AWS baseline' },
  ]

  return (
    <section id="business" className="section business-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">The Business</span>
          <h2>From Architecture to Product</h2>
          <p>Two products, one intelligence loop</p>
        </motion.div>

        <div className="products-overview">
          <motion.div
            className="product-card glass card-rotated-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="product-header">
              <Cloud size={28} />
              <h3>OptimuX</h3>
              <span className="product-badge">Control Plane</span>
            </div>
            <p>AI-powered optimization layer that continuously optimizes how workloads execute across clouds, regions, and accelerator types.</p>
            <ul>
              <li>Which accelerator fits best</li>
              <li>Where to run geographically</li>
              <li>How to adjust precision/batching</li>
              <li>When to reroute or recover</li>
            </ul>
          </motion.div>

          <motion.div
            className="product-card glass card-rotated-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="product-header">
              <Server size={28} />
              <h3>GPU Network</h3>
              <span className="product-badge">Execution Layer</span>
            </div>
            <p>Decentralized GPU supply network from individuals and micro data centers worldwide, incentivized by crypto economics.</p>
            <ul>
              <li>Real-world execution data</li>
              <li>Heterogeneous hardware exposure</li>
              <li>Continuous learning dataset</li>
              <li>Feeds back into OptimuX</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="intelligence-loop glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>The Intelligence Loop</h3>
          <div className="loop-diagram">
            <div className="loop-step">
              <span className="step-num">1</span>
              <p>Optimizer learns from network</p>
            </div>
            <ArrowRight size={24} className="loop-arrow" />
            <div className="loop-step">
              <span className="step-num">2</span>
              <p>Network improves optimizer</p>
            </div>
            <ArrowRight size={24} className="loop-arrow" />
            <div className="loop-step">
              <span className="step-num">3</span>
              <p>Data moat compounds</p>
            </div>
          </div>
          <p className="loop-insight">
            "The best companies let everyday product usage create a proprietary data asset,
            pushing marginal data acquisition costs toward zero."
          </p>
        </motion.div>

        <div className="revenue-model">
          <h4>Three Revenue Lines</h4>
          <div className="revenue-grid">
            {revenueLines.map((r, index) => (
              <motion.div
                key={r.name}
                className="revenue-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <r.icon size={24} className="revenue-icon" />
                <h5>{r.name}</h5>
                <span className="margin-badge">{r.margin} margin</span>
                <p>{r.desc}</p>
                <span className="strategic-role">{r.strategic}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="traction-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4>Traction & Validation</h4>
          <div className="traction-grid">
            <div className="traction-stat glass">
              <DollarSign size={32} />
              <div className="traction-value">$2.3M+</div>
              <div className="traction-label">Revenue since May 2025</div>
            </div>
            <div className="traction-stat glass">
              <TrendingUp size={32} />
              <div className="traction-value">$7M</div>
              <div className="traction-label">ARR Run Rate</div>
            </div>
            <div className="traction-stat glass">
              <Users size={32} />
              <div className="traction-value">10+</div>
              <div className="traction-label">Paid Enterprise Pilots</div>
            </div>
            <div className="traction-stat glass">
              <Award size={32} />
              <div className="traction-value">$300K</div>
              <div className="traction-label">NSF SBIR Grant</div>
            </div>
          </div>
        </motion.div>

        <div className="achievements-section">
          <h4>Technical Achievements</h4>
          <div className="achievements-grid">
            {achievements.map((a, index) => (
              <motion.div
                key={a.label}
                className={`achievement-card glass ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a.icon size={24} />
                <div className="achievement-value gradient-text">{a.value}</div>
                <div className="achievement-label">{a.label}</div>
                <div className="achievement-desc">{a.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function for formatting dates
const formatDate = (date) => {
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

// Latest Developments Section
const LatestDevelopmentsSection = () => {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDevelopments = async () => {
      try {
        setLoading(true)
        setError(null)

        // Call backend API for AI-summarized developments
        const response = await fetch('/api/yotta/developments')

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch developments')
        }

        // Extract summaries from the response
        const updates = result.data.summaries || []

        if (updates.length === 0) {
          setError('No developments found')
          setSummaries([])
          setLoading(false)
          return
        }

        setSummaries(updates)
      } catch (err) {
        console.error('Failed to fetch developments:', err)
        setError(err.message || 'Unable to load key developments. Check back soon.')
        setSummaries([])
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopments()
  }, [])

  return (
    <section id="developments" className="section developments-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Latest Updates</span>
          <h2>Latest Developments</h2>
          <p>Recent announcements and updates from the Yotta team</p>
        </motion.div>

        {loading && (
          <motion.div
            className="loading-state glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-spinner" />
            <p>Loading latest updates...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="error-state glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {!loading && !error && summaries.length > 0 && (
          <div className="announcements-grid">
            {summaries.map((update, index) => (
              <motion.div
                key={index}
                className={`announcement-card glass ${
                  index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="announcement-date">
                  <span className="date-badge">
                    {update.category}
                  </span>
                  <span className={`impact-badge impact-${update.impact || 'medium'}`}>
                    {update.impact ? update.impact.toUpperCase() : ''}
                  </span>
                </div>
                <h4 className="announcement-title">{update.title}</h4>
                {update.summary && (
                  <p className="announcement-summary">{update.summary}</p>
                )}
                {update.key_points && update.key_points.length > 0 && (
                  <ul className="key-points">
                    {update.key_points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && summaries.length === 0 && (
          <motion.div
            className="empty-state glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No developments found. Make sure the backend server is running and ANTHROPIC_API_KEY is set.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Team Section
const TeamSection = () => {
  const team = [
    {
      name: 'Daniel Li',
      role: 'CEO & Co-Founder',
      background: 'Sony (GPU engineer) → Meta (infra for FB/IG) → Chainlink Labs (CCIP Lead)',
      insight: 'Compute scarcity is mostly a coordination failure.',
      color: '#6366f1'
    },
    {
      name: 'Dr. Dong Li',
      role: 'Chief Scientist',
      background: 'UC Merced (HPC Lab) → Oak Ridge National Lab → NVIDIA GPU Research Center',
      insight: 'GPUs getting faster, but moving data between them isn\'t.',
      color: '#8b5cf6'
    },
    {
      name: 'Johnny Liu',
      role: 'CTO & Co-Founder',
      background: 'Amazon (Rufus AI) → TikTok (KubeRay founder) → Berkeley Lab (supercomputers)',
      insight: 'Turn ambitious AI research into production-grade systems.',
      color: '#06b6d4'
    },
  ]

  return (
    <section id="team" className="section team-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">The Team</span>
          <h2>Research + Industry Depth</h2>
          <p>A rare combination for a problem at this intersection</p>
        </motion.div>

        <div className="team-grid">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className={`team-card glass ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              style={{ borderTopColor: member.color }}
            >
              <div className="team-header">
                <div className="team-avatar" style={{ background: `${member.color}30` }}>
                  <Users size={32} style={{ color: member.color }} />
                </div>
                <div>
                  <h4>{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                </div>
              </div>
              <div className="team-background">
                <Briefcase size={14} />
                <span>{member.background}</span>
              </div>
              <div className="team-insight">
                <p>"{member.insight}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="funding-section glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4>$3.5M Seed Round</h4>
          <p>Co-led by <strong>Big Brain Holdings</strong> and <strong>Eden Block</strong></p>
          <div className="investors">
            <span>Mysten Labs</span>
            <span>KuCoin Ventures</span>
            <span>Generative Ventures</span>
            <span>MH Ventures</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Conclusion Section
const ConclusionSection = () => {
  const takeaways = [
    'Yotta transforms fragmented GPU resources into a unified, reliable computing platform',
    'The abstraction layer eliminates complexity while maintaining near-centralized performance',
    'The intelligence loop creates a compounding data moat from operational knowledge',
    'Not fighting hyperscalers—capturing the optimization consulting market ($40B+)',
  ]

  return (
    <section className="section conclusion-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Conclusion</span>
          <h2>Key Takeaways</h2>
        </motion.div>

        <div className="takeaways-grid">
          {takeaways.map((takeaway, index) => (
            <motion.div
              key={index}
              className={`takeaway-card glass ${index % 2 === 0 ? 'card-rotated-left' : 'card-rotated-right'}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="takeaway-number">{String(index + 1).padStart(2, '0')}</span>
              <p>{takeaway}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="final-quote glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="quote-text">
            "If Yotta succeeds, decentralized compute will not feel radical.
            It will feel <span className="gradient-text">boring</span>.
            Boring the way electricity feels boring. Invisible, dependable, everywhere."
          </p>
        </motion.div>

        <motion.div
          className="yotta-name-section glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4>Why "Yotta"?</h4>
          <div className="scale-comparison">
            <div className="scale-item">
              <span className="scale-value">10<sup>18</sup></span>
              <span className="scale-label">Exascale (Today's frontier)</span>
            </div>
            <ArrowRight size={24} />
            <div className="scale-item highlight">
              <span className="scale-value gradient-text">10<sup>24</sup></span>
              <span className="scale-label">Yotta Scale (1M x larger)</span>
            </div>
          </div>
          <p>You cannot build a yottascale computer inside a single data center. The only way to reach that scale is by coordinating the latent, idle silicon spread across the planet.</p>
        </motion.div>

        <motion.div
          className="conclusion-cta glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Read the Full Research Report</h3>
          <p>Deep dive into the systems story of decentralized compute</p>
          <div className="cta-buttons">
            <a
              href="https://chainofthought.xyz/p/yotta-the-operating-system-for-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read on Chain of Thought
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-brand">
          <Cpu className="footer-icon" />
          <span>Chain of Thought</span>
        </div>
        <p className="footer-credit">
          Independent Analysis: Yotta Operating System. Research by <span className="gradient-text">Teng Yan</span> and <span className="gradient-text">0xAce</span>
        </p>
      </div>
    </div>
  </footer>
)

// Main App
function App() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'problem', 'solution', 'architecture', 'performance', 'business', 'developments', 'team']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <div className="bg-grid" />
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <ThesisSection />
        <MethodologySection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <PerformanceSection />
        <BusinessSection />
        <LatestDevelopmentsSection />
        <TeamSection />
        <ConclusionSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
