
import React, { useState } from 'react';
import { GlassCard } from '../components/UIComponents';
import { 
  Heart, 
  MessageCircle, 
  Trophy, 
  Share2, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  User, 
  Users, 
  Info, 
  ChevronRight, 
  Zap, 
  Target, 
  Search, 
  Plus, 
  CheckCircle2,
  Globe,
  Flame
} from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'clubs'>('feed');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'alltime'>('weekly');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedClubs, setJoinedClubs] = useState<string[]>(['KLCC Runners Group']);

  const toggleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(p => p !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const toggleJoin = (clubName: string) => {
    if (joinedClubs.includes(clubName)) {
      setJoinedClubs(joinedClubs.filter(c => c !== clubName));
    } else {
      setJoinedClubs([...joinedClubs, clubName]);
    }
  };

  const feedPosts = [
    {
      id: 1,
      user: "Ahmad",
      time: "2h ago",
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=60",
      location: "KLCC Park Loop",
      stats: { dist: "5.2 km", pace: "5:45 /km", time: "28:30" },
      badges: ["Early Bird"],
      likes: 24,
      comments: 4,
      isPro: true
    },
    {
      id: 2,
      user: "Sarah Leo",
      time: "4h ago",
      image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=60",
      location: "Bukit Kiara Trail",
      stats: { dist: "8.5 km", pace: "6:12 /km", time: "52:10" },
      badges: [],
      likes: 42,
      comments: 12,
      isPro: false
    }
  ];

  const runningClubs = [
    { name: "KLCC Runners Group", members: "4.2k", loc: "KLCC Park", vibe: "Performance", trending: true, color: "#00FFFF" },
    { name: "Ampang Running Club", members: "1.8k", loc: "Taman Rimba", vibe: "Community", trending: false, color: "#4169E1" },
    { name: "Kyserun Krew", members: "2.5k", loc: "Bangsar", vibe: "Speed", trending: true, color: "#FFD700" },
    { name: "Antz Colony", members: "950", loc: "Cyberjaya", vibe: "Social", trending: false, color: "#FF00FF" },
    { name: "KL Frontrunners", members: "1.2k", loc: "City Centre", vibe: "Inclusive", trending: false, color: "#FFFFFF" },
    { name: "Challo Running Club", members: "3.1k", loc: "Damansara", vibe: "High Energy", trending: true, color: "#00FFFF" },
    { name: "Pacer Malaysia", members: "5.0k", loc: "Nationwide", vibe: "Pro", trending: true, color: "#4169E1" },
    { name: "Titi Runners", members: "800", loc: "Titiwangsa", vibe: "Endurance", trending: false, color: "#FFD700" },
    { name: "G-Slow Runners", members: "1.5k", loc: "PJ Area", vibe: "Steady State", trending: false, color: "#00FFFF" }
  ];

  const filteredClubs = runningClubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    club.loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-28 pt-6 px-4 min-h-screen bg-[#0A1128]">
      
      {/* Header & Tabs */}
      <div className="sticky top-0 z-40 bg-[#0A1128]/90 backdrop-blur-xl pt-2 pb-4 -mx-4 px-4 border-b border-white/5">
        <h1 className="text-2xl font-black italic text-white mb-4 tracking-tighter uppercase">COMMUNITY <span className="text-[#00FFFF]">HUB</span></h1>
        
        <div className="flex bg-white/5 p-1 rounded-2xl backdrop-blur-md border border-white/10">
          <button 
            className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-tighter ${activeTab === 'feed' ? 'bg-[#00FFFF] text-[#0A1128] shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-tighter ${activeTab === 'leaderboard' ? 'bg-[#4169E1] text-white shadow-[0_0_15px_rgba(65,105,225,0.4)]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Top 10
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-tighter ${activeTab === 'clubs' ? 'bg-[#FFD700] text-[#0A1128] shadow-[0_0_15px_rgba(255,215,0,0.4)]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('clubs')}
          >
            Clubs
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6 animate-fade-in">
        {activeTab === 'clubs' ? (
          <div className="space-y-8 pb-10">
            {/* Search Bar */}
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-500 group-focus-within:text-[#FFD700] transition-colors" />
               </div>
               <input 
                  type="text" 
                  placeholder="Find your squad (name, location...)" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700]/50 focus:bg-white/10 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>

            {/* Featured Clubs Horizontal Scroll */}
            {!searchQuery && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Featured Squads</h2>
                   <div className="flex items-center gap-1 text-[10px] text-[#FFD700] font-bold">
                      <Flame size={12} fill="currentColor" /> TRENDING NOW
                   </div>
                </div>
                <div className="flex overflow-x-auto gap-4 -mx-4 px-4 no-scrollbar snap-x">
                   {runningClubs.filter(c => c.trending).map((club, i) => (
                     <GlassCard key={i} className="min-w-[260px] p-0 overflow-hidden relative group snap-center border-[#FFD700]/20">
                        <div className="absolute top-0 right-0 p-3 z-10">
                           <div className="bg-[#FFD700] text-[#0A1128] text-[8px] font-black px-2 py-0.5 rounded shadow-lg uppercase">Official</div>
                        </div>
                        <div className="p-5 relative z-10">
                           <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700] mb-4 group-hover:scale-110 transition-transform">
                              <Users size={24} />
                           </div>
                           <h4 className="text-white font-black text-lg italic tracking-tight mb-1">{club.name}</h4>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-1">
                              <MapPin size={10} /> {club.loc}
                           </p>
                           <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                 {[1,2,3].map(p => (
                                   <div key={p} className="w-6 h-6 rounded-full border border-[#0A1128] bg-gray-700 flex items-center justify-center overflow-hidden">
                                      <User size={12} className="text-gray-400" />
                                   </div>
                                 ))}
                                 <div className="w-6 h-6 rounded-full border border-[#0A1128] bg-gray-800 flex items-center justify-center">
                                    <span className="text-[8px] text-white font-bold">+{club.members}</span>
                                 </div>
                              </div>
                              <button 
                                onClick={() => toggleJoin(club.name)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${joinedClubs.includes(club.name) ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white text-black hover:bg-[#FFD700]'}`}
                              >
                                {joinedClubs.includes(club.name) ? 'JOINED' : 'JOIN'}
                              </button>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none opacity-50"></div>
                     </GlassCard>
                   ))}
                </div>
              </div>
            )}

            {/* All Clubs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
                    {searchQuery ? `Results for "${searchQuery}"` : "Active Units"}
                 </h2>
                 <span className="text-[10px] text-gray-500 font-mono">{filteredClubs.length} Units Found</span>
              </div>

              <div className="space-y-3">
                 {filteredClubs.length > 0 ? filteredClubs.map((club, idx) => {
                   const isJoined = joinedClubs.includes(club.name);
                   return (
                     <GlassCard key={idx} className={`p-4 flex items-center justify-between group transition-all duration-300 ${isJoined ? 'border-green-500/20 bg-green-500/[0.02]' : 'hover:border-white/20'}`}>
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isJoined ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
                              <Users size={20} />
                           </div>
                           <div>
                              <h4 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                                 {club.name}
                                 {isJoined && <CheckCircle2 size={12} className="text-green-500" />}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 font-bold uppercase border border-white/5">{club.vibe}</span>
                                 <span className="text-[9px] flex items-center gap-1 text-gray-500 font-medium italic"><MapPin size={8} /> {club.loc}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <div className="text-right">
                              <span className="block text-white font-black text-xs">{club.members}</span>
                              <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Runners</span>
                           </div>
                           <button 
                             onClick={() => toggleJoin(club.name)}
                             className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md transition-all ${isJoined ? 'text-green-500 border border-green-500/30' : 'text-gray-400 border border-white/10 hover:text-white hover:border-white/30'}`}
                           >
                             {isJoined ? 'LEAVE' : 'JOIN'}
                           </button>
                        </div>
                     </GlassCard>
                   )
                 }) : (
                   <div className="py-10 text-center">
                      <Search size={40} className="mx-auto text-gray-700 mb-4 opacity-50" />
                      <p className="text-gray-400 font-bold">No squads match your scan.</p>
                      <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">Recalibrate search parameters</p>
                   </div>
                 )}
              </div>
            </div>

            {/* Club Benefits Section (Refined) */}
            <GlassCard className="p-6 border-[#FFD700]/20 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#0A1128] relative overflow-hidden mt-10">
               <div className="absolute -right-10 -bottom-10 text-[#FFD700]/5 pointer-events-none transform rotate-12">
                  <Globe size={180} />
               </div>
               <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#FFD700]/20 rounded-xl text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white italic tracking-tight">POWER OF THE PACK</h3>
                    <p className="text-[10px] text-[#FFD700] font-bold uppercase tracking-widest">Global Protocol</p>
                  </div>
               </div>
               <p className="text-xs text-gray-300 leading-relaxed font-medium mb-6 relative z-10">
                  Join a verified squad to unlock <span className="text-[#FFD700] font-bold">Group Milestones</span>, exclusive local routes, and social accountability. Solo runs build discipline, but the Pack builds legendary endurance.
               </p>
               <div className="grid grid-cols-3 gap-3 relative z-10">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
                     <Target size={14} className="mx-auto text-[#FFD700] mb-1" />
                     <span className="text-[8px] font-bold text-gray-400 uppercase">Focus</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
                     <Users size={14} className="mx-auto text-[#FFD700] mb-1" />
                     <span className="text-[8px] font-bold text-gray-400 uppercase">Social</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
                     <Award size={14} className="mx-auto text-[#FFD700] mb-1" />
                     <span className="text-[8px] font-bold text-gray-400 uppercase">Perks</span>
                  </div>
               </div>
            </GlassCard>

            {/* Register New Club Action */}
            <div className="bg-[#FFD700] rounded-2xl p-0.5 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
               <button className="w-full py-4 bg-[#0A1128] rounded-[calc(1rem+2px)] flex items-center justify-center gap-2 text-white hover:text-[#FFD700] transition-all font-black text-sm uppercase tracking-tighter italic">
                  <Plus size={18} className="text-[#FFD700]" /> REGISTER YOUR SQUAD
               </button>
            </div>
          </div>
        ) : activeTab === 'leaderboard' ? (
          <div className="space-y-8">
             {/* Filter Toggle */}
             <div className="flex justify-center mb-4">
               <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                 <button onClick={() => setTimeFilter('weekly')} className={`${timeFilter === 'weekly' ? 'text-white border-b-2 border-[#00FFFF]' : 'text-gray-500'} pb-1 transition-colors`}>This Week</button>
                 <button onClick={() => setTimeFilter('alltime')} className={`${timeFilter === 'alltime' ? 'text-white border-b-2 border-[#4169E1]' : 'text-gray-500'} pb-1 transition-colors`}>All Time</button>
               </div>
             </div>

             {/* Podium */}
             <div className="flex justify-center items-end gap-3 h-56 pt-4">
               {/* 2nd Place */}
               <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-300 bg-gray-800 flex items-center justify-center mb-2 z-10 relative">
                      <User size={24} className="text-gray-400" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gray-300 text-[#0A1128] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-[#0A1128]">2</div>
                  </div>
                  <div className="w-20 h-28 bg-gradient-to-t from-gray-800 to-gray-600/50 rounded-t-lg flex flex-col justify-end items-center pb-3 relative border-t border-gray-400/30 backdrop-blur-sm">
                     <span className="font-bold text-gray-300 text-sm">Sarah</span>
                     <span className="text-[10px] text-gray-400">85km</span>
                  </div>
               </div>

               {/* 1st Place */}
               <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-2 transition-transform z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFD700] rounded-full blur-md opacity-50 animate-pulse"></div>
                    <div className="w-20 h-20 rounded-full border-4 border-[#FFD700] bg-gray-800 flex items-center justify-center mb-2 z-10 relative shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                       <User size={32} className="text-[#FFD700]" />
                    </div>
                    <Trophy size={20} className="absolute -top-4 left-1/2 -translate-x-1/2 text-[#FFD700] drop-shadow-md animate-bounce" fill="currentColor" />
                  </div>
                  <div className="w-24 h-40 bg-gradient-to-t from-[#FFD700]/20 to-[#FFD700]/5 rounded-t-xl flex flex-col justify-end items-center pb-4 relative border-t border-[#FFD700]/50 backdrop-blur-md shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                     <span className="font-black text-white text-lg tracking-wide">You</span>
                     <span className="text-xs text-[#FFD700] font-mono">92km</span>
                  </div>
               </div>

               {/* 3rd Place */}
               <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-orange-700 bg-gray-800 flex items-center justify-center mb-2 z-10 relative">
                       <User size={24} className="text-orange-700" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-orange-700 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-[#0A1128]">3</div>
                  </div>
                  <div className="w-20 h-24 bg-gradient-to-t from-orange-900/80 to-orange-700/20 rounded-t-lg flex flex-col justify-end items-center pb-3 relative border-t border-orange-600/30 backdrop-blur-sm">
                     <span className="font-bold text-orange-200 text-sm">Mike</span>
                     <span className="text-[10px] text-orange-400">80km</span>
                  </div>
               </div>
             </div>
             
             {/* List */}
             <div className="space-y-3">
               {[4, 5, 6, 7, 8].map((rank) => (
                 <GlassCard key={rank} className="p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-mono font-bold w-4 text-center">{rank}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border border-white/10 text-gray-400">
                         <User size={18} />
                      </div>
                      <div>
                        <span className="text-white font-bold block text-sm">Runner {rank}</span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                          {rank % 2 === 0 ? <TrendingUp size={10} className="text-green-500"/> : <TrendingDown size={10} className="text-red-500"/>}
                          <span>{rank % 2 === 0 ? 'Up 2 spots' : 'Down 1 spot'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[#00FFFF] font-mono font-bold text-sm block">{(80 - rank * 2).toFixed(1)} km</span>
                      <span className="text-[10px] text-gray-500">3 runs</span>
                    </div>
                 </GlassCard>
               ))}
             </div>
          </div>
        ) : (
          <div className="space-y-8">
            {feedPosts.map((post) => {
              const isLiked = likedPosts.includes(post.id);
              return (
                <div key={post.id} className="relative group">
                   {/* Avatar/Header Float */}
                   <div className="flex items-center gap-3 mb-3 px-2">
                     <div className={`w-10 h-10 rounded-full p-[2px] flex items-center justify-center ${post.isPro ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-gray-700'}`}>
                       <div className="w-full h-full rounded-full border-2 border-[#0A1128] bg-gray-800 flex items-center justify-center">
                          <User size={20} className="text-gray-300" />
                       </div>
                     </div>
                     <div className="flex-1">
                       <h4 className="text-sm font-bold text-white flex items-center gap-2">
                         {post.user}
                         {post.isPro && <span className="bg-[#FFD700] text-[#0A1128] text-[8px] font-black px-1.5 py-0.5 rounded uppercase">PRO</span>}
                       </h4>
                       <div className="flex items-center gap-2 text-[10px] text-gray-400">
                         <span>{post.time}</span>
                         <span>•</span>
                         <span className="flex items-center gap-1"><MapPin size={10} /> {post.location}</span>
                       </div>
                     </div>
                   </div>

                   {/* Main Card */}
                   <div className="bg-[#1a233a] rounded-[30px] overflow-hidden border border-white/5 shadow-2xl relative">
                      {/* Image Area */}
                      <div className="relative h-72 w-full">
                        <img src={post.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="run" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent"></div>
                        
                        {/* Mock Map Route Overlay */}
                        <svg className="absolute top-4 right-4 w-16 h-16 drop-shadow-lg opacity-80" viewBox="0 0 100 100">
                          <path d="M10,90 Q40,10 90,50" fill="none" stroke="#00FFFF" strokeWidth="4" strokeLinecap="round" />
                        </svg>

                        {/* Badges */}
                        {post.badges.length > 0 && (
                          <div className="absolute top-4 left-4 flex gap-2">
                            {post.badges.map(badge => (
                              <div key={badge} className="bg-black/50 backdrop-blur-md border border-[#FFD700]/30 rounded-full px-3 py-1 flex items-center gap-1">
                                <Award size={12} className="text-[#FFD700]" />
                                <span className="text-[10px] text-[#FFD700] font-bold">{badge}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Stats Overlay Strip */}
                        <div className="absolute bottom-4 left-4 right-4">
                           <GlassCard className="p-3 flex justify-between items-center bg-black/40 border-white/10 backdrop-blur-xl">
                              <div className="text-center">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Distance</p>
                                <p className="font-black text-white text-lg">{post.stats.dist}</p>
                              </div>
                              <div className="w-[1px] h-6 bg-white/10"></div>
                              <div className="text-center">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Pace</p>
                                <p className="font-bold text-[#00FFFF] text-lg">{post.stats.pace}</p>
                              </div>
                              <div className="w-[1px] h-6 bg-white/10"></div>
                              <div className="text-center">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Time</p>
                                <p className="font-bold text-gray-200 text-lg">{post.stats.time}</p>
                              </div>
                           </GlassCard>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="px-5 py-4 flex items-center justify-between bg-white/[0.02]">
                         <div className="flex items-center gap-6">
                            <button 
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center gap-2 transition-all ${isLiked ? 'text-pink-500 scale-105' : 'text-gray-400 hover:text-white'}`}
                            >
                              <Heart size={22} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
                              <span className="text-sm font-medium">{isLiked ? post.likes + 1 : post.likes}</span>
                            </button>

                            <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFFF] transition-colors">
                              <MessageCircle size={22} />
                              <span className="text-sm font-medium">{post.comments}</span>
                            </button>
                         </div>
                         
                         <button className="text-gray-400 hover:text-white transition-colors">
                           <Share2 size={20} />
                         </button>
                      </div>
                      
                      {/* Micro Comment Preview */}
                      {post.comments > 0 && (
                        <div className="px-5 pb-4 pt-1">
                          <p className="text-xs text-gray-500 truncate">
                            <span className="font-bold text-gray-300 mr-2">Sarah Leo</span>
                            Great pace! Keep pushing 🔥
                          </p>
                        </div>
                      )}
                   </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
