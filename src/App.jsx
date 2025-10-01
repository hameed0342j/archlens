import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Package, Search, Stethoscope, Terminal, ChevronRight, Copy, Check,
  Cpu, Monitor, Wifi, Volume2, LayoutDashboard, Code, Library, AppWindow, 
  Wrench, Container, Type
} from 'lucide-react';
import CursorSpotlight from './components/CursorSpotlight';
import { packageData, diagnosticRules } from './data';

const categoryIcons = {
  'System Core': Cpu,
  'Display & Graphics': Monitor,
  'Networking': Wifi,
  'Audio Subsystem': Volume2,
  'Desktop Environment': LayoutDashboard,
  'Development': Code,
  'Libraries': Library,
  'User Applications': AppWindow,
  'Utilities': Wrench,
  'Virtualization': Container,
  'Fonts & Icons': Type
};

const ArchLens = () => {
  const [view, setView] = useState('categories');
  const [mode, setMode] = useState('browser');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [diagnosticQuery, setDiagnosticQuery] = useState('');
  const [diagnosticResults, setDiagnosticResults] = useState([]);
  const [copiedCommand, setCopiedCommand] = useState(null);

  const handleCategorySelect = (category) => {
    console.log('Category selected:', category, 'Current view:', view);
    setSelectedCategory(category);
    setView('packages');
    console.log('View should now be packages');
  };

  const handlePackageSelect = (pkg) => {
    console.log('Package selected:', pkg.name);
    setSelectedPackage(pkg);
    setView('detail');
  };

  const handleBack = () => {
    if (view === 'detail') {
      setView('packages');
      setSelectedPackage(null);
    } else if (view === 'packages') {
      setView('categories');
      setSelectedCategory(null);
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === 'browser' ? 'diagnostic' : 'browser');
    setView('categories');
    setSelectedCategory(null);
    setSelectedPackage(null);
    setDiagnosticQuery('');
    setDiagnosticResults([]);
  };

  const runDiagnostic = () => {
    const query = diagnosticQuery.toLowerCase();
    const results = [];

    Object.entries(diagnosticRules).forEach(([domain, rule]) => {
      const matches = rule.keywords.some(keyword => query.includes(keyword));
      if (matches) {
        rule.packages.forEach(pkgName => {
          Object.entries(packageData).forEach(([category, data]) => {
            const pkg = data.packages.find(p => p.name === pkgName);
            if (pkg) {
              results.push({
                ...pkg,
                category,
                relevance: 90 - results.length * 5,
                command: rule.commands[pkgName],
                reason: `Matches ${domain} issue - ${pkg.shortDesc}`
              });
            }
          });
        });
      }
    });

    setDiagnosticResults(results.slice(0, 5));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const categoryStats = useMemo(() => {
    return Object.entries(packageData).map(([name, data]) => ({
      name,
      count: data.packages.length,
      description: data.description
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-green-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <CursorSpotlight />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Package className="w-10 h-10 text-green-400 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              ArchLens
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Demystifying Your Arch Linux System</p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                if (mode !== 'browser') {
                  handleModeSwitch();
                }
              }}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                mode === 'browser'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 cursor-pointer'
              }`}
            >
              <Search className="w-4 h-4" />
              Package Browser
            </button>
            <button
              onClick={() => {
                if (mode !== 'diagnostic') {
                  handleModeSwitch();
                }
              }}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                mode === 'diagnostic'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 cursor-pointer'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Diagnostic Tool
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          {mode === 'browser' ? (
            <>
              {view !== 'categories' && (
                <div className="p-4 border-b border-gray-800 bg-gray-900/80">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-all transform hover:translate-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Back</span>
                  </button>
                </div>
              )}

              {view === 'categories' && (
                <div className="p-6 animate-fade-slide-in">
                  <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Package Categories ({categoryStats.length} groups)
                  </h2>
                  <div className="grid gap-3">
                    {categoryStats.map((category, idx) => {
                      const IconComponent = categoryIcons[category.name] || Package;
                      return (
                        <div
                          key={category.name}
                          onClick={() => handleCategorySelect(category.name)}
                          className="group p-5 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 transform hover:scale-[1.02]"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <IconComponent className="w-6 h-6 text-green-400 transition-transform group-hover:scale-110" />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-green-500 font-mono text-sm">[{idx + 1}]</span>
                                  <span className="text-green-300 font-bold text-lg">{category.name}</span>
                                  <span className="text-gray-500 text-sm">
                                    ({category.count} packages)
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-green-400 transition-all group-hover:translate-x-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {view === 'packages' && selectedCategory && (
                <div className="p-6 animate-fade-slide-in">
                  <div className="flex items-center gap-3 mb-6">
                    {React.createElement(categoryIcons[selectedCategory] || Package, {
                      className: "w-7 h-7 text-green-400"
                    })}
                    <div>
                      <h2 className="text-2xl font-bold text-green-300">
                        {selectedCategory}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {packageData[selectedCategory].description}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {packageData[selectedCategory].packages.map((pkg, idx) => (
                      <div
                        key={pkg.name}
                        onClick={() => handlePackageSelect(pkg)}
                        className="group p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 hover:bg-gray-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 transform hover:scale-[1.01]"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-green-500 font-mono text-sm">[{idx + 1}]</span>
                              <span className="text-green-300 font-bold">{pkg.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                pkg.reason === 'Explicitly installed'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {pkg.reason === 'Explicitly installed' ? 'explicit' : 'dependency'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm ml-11">
                              {pkg.shortDesc}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-green-400 transition-all group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === 'detail' && selectedPackage && (
                <div className="p-6 animate-fade-slide-in">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-green-300 mb-3 flex items-center gap-3">
                        <Terminal className="w-8 h-8" />
                        {selectedPackage.name}
                      </h2>
                      <div className="text-sm text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-lg inline-block">
                        {selectedPackage.reason}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="p-5 rounded-xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30 transform transition-all hover:scale-[1.01]">
                        <h3 className="text-green-400 font-bold mb-3">📖 What is this?</h3>
                        <p className="text-green-100 leading-relaxed">{selectedPackage.shortDesc}</p>
                      </div>

                      <div className="p-5 rounded-xl bg-gray-800/50 border border-gray-700 transform transition-all hover:scale-[1.01]">
                        <h3 className="text-green-400 font-bold mb-3">📋 Official Description</h3>
                        <p className="text-gray-300">{selectedPackage.officialDesc}</p>
                      </div>

                      {selectedPackage.dependencies.length > 0 && (
                        <div className="p-5 rounded-xl bg-gray-800/50 border border-gray-700 transform transition-all hover:scale-[1.01]">
                          <h3 className="text-green-400 font-bold mb-3">🔗 Required Dependencies ({selectedPackage.dependencies.length})</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPackage.dependencies.map((dep) => (
                              <span
                                key={dep}
                                className="px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-lg text-sm border border-blue-500/20 transition-all hover:bg-blue-500/20 hover:scale-105"
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedPackage.optDeps.length > 0 && (
                        <div className="p-5 rounded-xl bg-gray-800/50 border border-gray-700 transform transition-all hover:scale-[1.01]">
                          <h3 className="text-green-400 font-bold mb-3">⚙️ Optional Dependencies</h3>
                          <div className="space-y-2">
                            {selectedPackage.optDeps.map((dep, idx) => (
                              <div key={idx} className="text-gray-400 text-sm">• {dep}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-700/30 transform transition-all hover:scale-[1.01]">
                        <h3 className="text-blue-400 font-bold mb-3">📚 Learn More</h3>
                        <a
                          href={selectedPackage.wikiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-2 underline"
                        >
                          Arch Wiki: {selectedPackage.name}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-green-950/30 border border-green-700/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        💡 <strong>Tip:</strong> Check which packages depend on this with: <code className="text-green-300 bg-gray-800 px-2 py-0.5 rounded">pactree -r {selectedPackage.name}</code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 animate-fade-slide-in">
              <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-2">
                <Stethoscope className="w-6 h-6" />
                Diagnostic Tool
              </h2>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-gray-300 font-medium">Describe your problem in plain English:</label>
                  <input
                    type="text"
                    value={diagnosticQuery}
                    onChange={(e) => setDiagnosticQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && runDiagnostic()}
                    placeholder="e.g., My bluetooth headphones won't connect"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-green-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                  <button
                    onClick={runDiagnostic}
                    disabled={!diagnosticQuery.trim()}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                  >
                    <Search className="w-5 h-5" />
                    Analyze Problem
                  </button>
                </div>

                {diagnosticResults.length === 0 && (
                  <div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h3 className="text-gray-300 font-medium mb-3">Example queries:</h3>
                    <div className="space-y-2">
                      {[
                        'My bluetooth headphones won\'t connect',
                        'No sound coming from speakers',
                        'Virtual machine fails to start',
                        'Terminal fonts look wrong and icons are missing',
                        'WiFi not connecting'
                      ].map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => setDiagnosticQuery(example)}
                          className="block w-full text-left px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-all text-sm transform hover:translate-x-1"
                        >
                          • {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {diagnosticResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
                      <p className="text-green-300"><strong>Query:</strong> "{diagnosticQuery}"</p>
                      <p className="text-gray-400 text-sm mt-1">Found {diagnosticResults.length} relevant packages</p>
                    </div>

                    {diagnosticResults.map((result, idx) => (
                      <div
                        key={result.name}
                        className="p-5 rounded-xl bg-gray-800/50 border border-gray-700 space-y-4 transform transition-all hover:scale-[1.01]"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-green-500 font-mono text-lg">{idx + 1}.</span>
                              <span className="text-green-300 font-bold text-xl">{result.name}</span>
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                                {result.relevance}% match
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm ml-8">Category: {result.category}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-lg border border-blue-700/30">
                          <h4 className="text-blue-400 font-medium mb-2">Why flagged:</h4>
                          <p className="text-gray-300 text-sm">{result.reason}</p>
                        </div>

                        {result.command && (
                          <div className="space-y-2">
                            <h4 className="text-yellow-400 font-medium">Suggested diagnostic command:</h4>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 px-4 py-2 bg-gray-900 text-green-300 rounded-lg font-mono text-sm border border-gray-700">
                                {result.command}
                              </code>
                              <button
                                onClick={() => copyToClipboard(result.command, result.name)}
                                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all transform hover:scale-110"
                                title="Copy command"
                              >
                                {copiedCommand === result.name ? (
                                  <Check className="w-5 h-5 text-green-400" />
                                ) : (
                                  <Copy className="w-5 h-5 text-gray-300" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setMode('browser');
                            setSelectedCategory(result.category);
                            setView('packages');
                          }}
                          className="w-full px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                        >
                          View Package Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setDiagnosticQuery('');
                        setDiagnosticResults([]);
                      }}
                      className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      New Query
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>ArchLens v0.3.0 • Making Arch Linux understandable, one package at a time</p>
        </div>
      </div>
    </div>
  );
};

export default ArchLens;