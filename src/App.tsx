/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Network, 
  Code2, 
  FileText,
  Users,
  Lightbulb,
  CheckCircle2,
  Clock,
  ExternalLink,
  Menu,
  X,
  CheckSquare,
  Square
} from 'lucide-react';
import { courseData } from './data/courseData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  
  // Progress tracking state
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const savedWeeks = localStorage.getItem('completedWeeks');
    const savedTopics = localStorage.getItem('completedTopics');
    if (savedWeeks) setCompletedWeeks(JSON.parse(savedWeeks));
    if (savedTopics) setCompletedTopics(JSON.parse(savedTopics));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completedWeeks', JSON.stringify(completedWeeks));
  }, [completedWeeks]);

  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleWeekCompletion = (weekNum: number, e: MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling
    setCompletedWeeks(prev => 
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  // Set RTL direction on mount
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
  }, []);

  const tabs = [
    { id: 'overview', label: 'معرفی مضمون', icon: Info },
    { id: 'weekly', label: 'پلان هفته‌وار', icon: Calendar },
    { id: 'evaluation', label: 'ارزیابی', icon: BarChart3 },
    { id: 'resources', label: 'منابع', icon: BookOpen },
    { id: 'instructor', label: 'معلومات استاد', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Network className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <h1 className="font-bold text-lg">{courseData.title}</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
          aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 h-screen glass border-l border-slate-200/50 z-40 transition-all duration-500 ease-in-out
          ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 lg:w-24 -translate-x-full lg:translate-x-0'}
          overflow-hidden flex flex-col
        `}>
          <div className="p-8 border-b border-slate-100 hidden lg:block">
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200/50">
                <Network className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tight text-slate-900">پورتال درسی</span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Network Prog</span>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1.5" role="tablist" aria-label="بخش‌های پورتال">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none group
                  ${activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200/50 scale-[1.02]' 
                    : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'}
                `}
              >
                <tab.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
                {isSidebarOpen && <span className="font-bold text-sm">{tab.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-100">
            <div className={`
              glass-dark rounded-[2rem] p-5 text-white relative overflow-hidden group
              ${!isSidebarOpen && 'hidden lg:block lg:p-3'}
            `}>
              {isSidebarOpen ? (
                <>
                  <div className="relative z-10">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">کود مضمون</p>
                    <p className="font-mono font-black text-lg">{courseData.code}</p>
                  </div>
                  <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500">
                    <Code2 className="w-24 h-24" />
                  </div>
                </>
              ) : (
                <div className="text-center font-mono text-xs font-black">
                  {courseData.code.split('.')[1]}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-slate-50/50">
          <div className="max-w-6xl mx-auto p-6 lg:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  id="panel-overview"
                  role="tabpanel"
                  aria-labelledby="tab-overview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-10"
                >
                  <section className="bento-card p-10 lg:p-14 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                          سمستر {courseData.semester}
                        </span>
                        <span className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                          {courseData.credits} کریدت
                        </span>
                      </div>
                      <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                        {courseData.title}
                      </h2>
                      <p className="text-xl text-slate-500 leading-relaxed max-w-3xl font-medium">
                        {courseData.description}
                      </p>
                    </div>
                  </section>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                      { label: 'پوهنتون', value: courseData.university, icon: GraduationCap, color: 'blue' },
                      { label: 'پوهنځی', value: courseData.faculty, icon: Users, color: 'indigo' },
                      { label: 'برنامه', value: courseData.program, icon: FileText, color: 'emerald' },
                      { label: 'پیش‌نیاز', value: courseData.prerequisite, icon: Code2, color: 'amber' },
                    ].map((item, i) => (
                      <div key={i} className="bento-card p-6 flex flex-col items-center text-center group">
                        <div className={`p-3 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 bg-${item.color}-50 text-${item.color}-600`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{item.label}</p>
                        <p className="font-black text-slate-800">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bento-card p-8 group">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600 group-hover:rotate-12 transition-transform">
                          <Lightbulb className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-2xl">اهداف آموزشی</h3>
                      </div>
                      <ul className="space-y-5">
                        {courseData.goals.map((goal, i) => (
                          <li key={i} className="flex gap-4 text-slate-600 group/item">
                            <div className="bg-blue-50 p-1 rounded-full shrink-0 mt-1 group-hover/item:bg-blue-600 transition-colors">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover/item:text-white" />
                            </div>
                            <span className="font-medium leading-relaxed">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bento-card p-8 group">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 group-hover:-rotate-12 transition-transform">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="font-black text-2xl">نتایج متوقعه</h3>
                      </div>
                      <ul className="space-y-5">
                        {courseData.outcomes.map((outcome, i) => (
                          <li key={i} className="flex gap-4 text-slate-600 group/item">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2.5 group-hover/item:scale-150 transition-transform" />
                            <span className="font-medium leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <section className="bento-card p-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-2xl">فصل‌های مضمون</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                      {(courseData as any).chapters.map((chapter: string, i: number) => (
                        <div key={i} className="flex items-center gap-5 group cursor-default">
                          <span className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="glass-dark rounded-[3rem] p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="bg-white/10 p-3 rounded-2xl">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-black text-2xl">شیوه‌های تدریس</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {courseData.teachingMethods.map((method, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300">
                            <span className="font-black text-sm tracking-wide">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'weekly' && (
                <motion.div
                  key="weekly"
                  id="panel-weekly"
                  role="tabpanel"
                  aria-labelledby="tab-weekly"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 mb-2">پلان هفته‌وار</h2>
                      <p className="text-lg text-slate-500 font-medium">جزئیات ۱۶ هفته آموزشی و پیگیری پیشرفت</p>
                    </div>
                    <div className="glass p-5 rounded-[2rem] flex items-center gap-5 shadow-xl shadow-blue-100/20">
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">پیشرفت کلی</p>
                        <p className="text-lg font-black text-blue-600">
                          {Math.round((completedWeeks.length / courseData.weeklyPlan.length) * 100)}%
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center relative">
                        <svg className="w-full h-full transform -rotate-90 absolute inset-0 p-1">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="125.6"
                            strokeDashoffset={125.6 - (125.6 * completedWeeks.length) / courseData.weeklyPlan.length}
                            className="text-blue-600 transition-all duration-700 ease-out"
                          />
                        </svg>
                        <span className="text-sm font-black text-slate-900 z-10">{completedWeeks.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {courseData.weeklyPlan.map((week) => (
                      <div 
                        key={week.week}
                        className={`
                          bento-card transition-all duration-500 overflow-hidden group
                          ${selectedWeek === week.week ? 'ring-2 ring-blue-500 border-transparent shadow-2xl scale-[1.01]' : ''}
                          ${completedWeeks.includes(week.week) ? 'bg-emerald-50/20 border-emerald-100' : ''}
                        `}
                      >
                        <div className="flex items-stretch">
                          <button 
                            onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                            className="flex-1 p-6 lg:p-8 flex items-center justify-between text-right outline-none focus-visible:bg-slate-50 group-hover:bg-slate-50/50 transition-colors"
                            aria-expanded={selectedWeek === week.week}
                            aria-controls={`week-content-${week.week}`}
                          >
                            <div className="flex items-center gap-6">
                              <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500
                                ${completedWeeks.includes(week.week) 
                                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                                  : selectedWeek === week.week ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500'}
                              `}>
                                {completedWeeks.includes(week.week) ? <CheckCircle2 className="w-7 h-7" /> : String(week.week).padStart(2, '0')}
                              </div>
                              <div>
                                <h4 className={`font-black text-xl mb-1.5 transition-colors ${completedWeeks.includes(week.week) ? 'text-emerald-900' : 'text-slate-900'}`}>
                                  {week.title}
                                </h4>
                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" /> {week.theory + week.practical} ساعت
                                  </span>
                                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">{week.theory} نظری</span>
                                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">{week.practical} عملی</span>
                                </div>
                              </div>
                            </div>
                            <div className={`transition-all duration-500 ${selectedWeek === week.week ? 'rotate-90 text-blue-600' : 'text-slate-300'}`}>
                              <ChevronLeft className="w-6 h-6" />
                            </div>
                          </button>
                          
                          <div className="px-6 border-r border-slate-100 flex items-center bg-slate-50/30">
                            <button
                              onClick={(e) => toggleWeekCompletion(week.week, e)}
                              className={`
                                p-3 rounded-2xl transition-all duration-300
                                ${completedWeeks.includes(week.week) 
                                  ? 'text-emerald-600 bg-emerald-100 shadow-inner' 
                                  : 'text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-md'}
                              `}
                              aria-label={completedWeeks.includes(week.week) ? "علامت‌گذاری هفته به عنوان ناتمام" : "علامت‌گذاری هفته به عنوان تمام شده"}
                            >
                              {completedWeeks.includes(week.week) ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {selectedWeek === week.week && (
                            <motion.div
                              id={`week-content-${week.week}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-8 pt-0 border-t border-slate-50 bg-slate-50/30">
                                <div className="space-y-4 mt-8">
                                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">موضوعات این هفته:</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {week.topics.map((topic, i) => {
                                      const topicId = `${week.week}-${i}`;
                                      const isCompleted = completedTopics.includes(topicId);
                                      return (
                                        <button 
                                          key={i} 
                                          onClick={() => toggleTopicCompletion(topicId)}
                                          className={`
                                            flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 text-right group/topic
                                            ${isCompleted 
                                              ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                                              : 'bg-white border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-md'}
                                          `}
                                          aria-pressed={isCompleted}
                                        >
                                          <div className={`
                                            mt-0.5 shrink-0 transition-all duration-300
                                            ${isCompleted ? 'text-emerald-500 scale-110' : 'text-slate-300 group-hover/topic:text-blue-400'}
                                          `}>
                                            {isCompleted ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                          </div>
                                          <span className={`text-sm font-bold leading-relaxed transition-all duration-300 ${isCompleted ? 'text-emerald-800 line-through opacity-50' : 'text-slate-700'}`}>
                                            {topic}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'evaluation' && (
                <motion.div
                  key="evaluation"
                  id="panel-evaluation"
                  role="tabpanel"
                  aria-labelledby="tab-evaluation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-12"
                >
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">سیستم ارزیابی</h2>
                    <p className="text-lg text-slate-500 font-medium">توزیع نمرات و معیارهای موفقیت در این مضمون بر اساس استانداردهای پوهنتون</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courseData.evaluation.map((item, i) => (
                      <div key={i} className="bento-card p-8 text-center group hover:scale-105">
                        <div className="relative inline-block mb-6">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="10"
                              fill="transparent"
                              className="text-slate-100"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray={351.8}
                              strokeDashoffset={351.8 - (351.8 * item.percentage) / 100}
                              className="text-blue-600 transition-all duration-1000 ease-out group-hover:text-indigo-600"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black text-slate-900">{item.percentage}%</span>
                          </div>
                        </div>
                        <h4 className="font-black text-slate-700 text-lg">{item.label}</h4>
                      </div>
                    ))}
                  </div>

                  <div className="glass-dark rounded-[3rem] p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/30 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="space-y-4">
                        <h3 className="text-4xl font-black">مجموع نمرات: ۱۰۰ نمره</h3>
                        <p className="text-xl text-blue-200 font-medium">حداقل نمره برای کامیابی ۵۵ نمره می‌باشد.</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-2xl px-10 py-6 rounded-[2rem] border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-2">امتحان نهایی</span>
                        <span className="text-4xl font-black">۶۰٪ کل نمره</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'resources' && (
                <motion.div
                  key="resources"
                  id="panel-resources"
                  role="tabpanel"
                  aria-labelledby="tab-resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="mb-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-2">منابع درسی</h2>
                    <p className="text-lg text-slate-500 font-medium">کتب و مراجع اصلی معرفی شده توسط دپارتمان</p>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {courseData.resources.map((book, i) => (
                      <div key={i} className="bento-card overflow-hidden flex flex-col lg:flex-row group">
                        <div className="bg-slate-100 w-full lg:w-64 flex items-center justify-center p-12 group-hover:bg-blue-50 transition-colors duration-500">
                          <BookOpen className="w-24 h-24 text-slate-300 group-hover:text-blue-200 transition-colors duration-500" />
                        </div>
                        <div className="p-10 lg:p-12 flex-1 relative">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                            <div>
                              <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{book.title}</h3>
                              <p className="text-xl text-blue-600 font-bold">{book.author}</p>
                            </div>
                            <span className="bg-slate-900 text-white px-5 py-2 rounded-2xl text-xs font-black tracking-widest">
                              {book.year}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">ویرایش</p>
                              <p className="font-black text-slate-800 text-lg">{book.edition}</p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">ناشر</p>
                              <p className="font-black text-slate-800 text-lg">{book.publisher}</p>
                            </div>
                          </div>

                          <button className="flex items-center gap-3 text-slate-900 font-black hover:text-blue-600 transition-all group/btn">
                            <span className="bg-slate-100 p-2 rounded-xl group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </span>
                            <span className="text-lg">مشاهده در کتابخانه پوهنتون</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-50/50 border border-amber-100 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="bg-amber-100 p-4 rounded-[1.5rem] text-amber-600 shadow-lg shadow-amber-200/50">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="text-center md:text-right">
                      <h4 className="text-2xl font-black text-amber-900 mb-3">یادداشت نظارتی</h4>
                      <p className="text-lg text-amber-800 leading-relaxed font-medium">
                        محتوا و کتب درسی جدید مطابق با مفردات تعیین شده تحت سرپرستی و نظارت وزارت تحصیلات عالی تهیه شده است. رعایت این مفردات در تمام پوهنتون‌های کشور الزامی می‌باشد.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'instructor' && (
                <motion.div
                  key="instructor"
                  id="panel-instructor"
                  role="tabpanel"
                  aria-labelledby="tab-instructor"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-10"
                >
                  <div className="bento-card overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-48 relative">
                      <div className="absolute -bottom-20 right-12">
                        <div className="w-44 h-44 rounded-[2.5rem] bg-white p-2 shadow-2xl">
                          <div className="w-full h-full rounded-[2rem] bg-slate-100 flex items-center justify-center overflow-hidden">
                            <Users className="w-16 h-16 text-slate-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-24 p-12">
                      <div className="mb-12">
                        <h2 className="text-5xl font-black text-slate-900 mb-3">{(courseData as any).instructor.name}</h2>
                        <p className="text-2xl text-blue-600 font-bold">استاد دپارتمان تکنالوژی معلوماتی</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-10">
                          <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">بیوگرافی و تخصص</h3>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                              {(courseData as any).instructor.bio}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { label: 'ایمیل آدرس', value: (courseData as any).instructor.email, icon: FileText },
                              { label: 'شماره تماس', value: (courseData as any).instructor.phone, icon: Clock },
                              { label: 'موقعیت دفتر', value: (courseData as any).instructor.office, icon: Info },
                            ].map((info, i) => (
                              <div key={i} className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 flex items-center gap-5 group hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className="bg-white p-3 rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <info.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{info.label}</p>
                                  <p className="font-bold text-slate-800">{info.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="glass p-8 rounded-[2.5rem] border border-slate-200/50 shadow-2xl">
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            ساعات حضور (Office Hours)
                          </h3>
                          <div className="space-y-4">
                            {(courseData as any).instructor.officeHours.map((slot: any, i: number) => (
                              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                                <span className="font-black text-slate-900">{slot.days}</span>
                                <span className="text-blue-600 font-bold text-sm">{slot.time}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 p-6 bg-blue-600 rounded-[1.5rem] text-white shadow-lg shadow-blue-200">
                            <p className="text-sm font-bold leading-relaxed">
                              جهت هماهنگی برای جلسات آنلاین یا ملاقات در خارج از ساعات تعیین شده، لطفاً ۲۴ ساعت قبل ایمیل بفرستید.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
